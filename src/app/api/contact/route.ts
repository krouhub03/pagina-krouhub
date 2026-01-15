import { NextResponse } from 'next/server';
import { EmailService } from '@/services/emailService';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message, subject, phone, recaptchaToken } = body;

        // --- 1. VERIFICACIÓN RECAPTCHA (MODO TOLERANTE) ---
        // Intentamos verificar, pero si falla la config de Google, dejamos pasar el correo.
        let isHuman = true; // Asumimos humano por defecto si falla la config

        try {
            const projectID = process.env.RECAPTCHA_PROJECT_ID;
            const apiKey = process.env.RECAPTCHA_API_KEY;
            const siteKey = "6Ldg3EgsAAAAAFMJ1c9b5fA-MswgA2EbKpyxnrps";

            // Solo verificamos si existen las variables
            if (projectID && apiKey && recaptchaToken) {
                const verifyUrl = `https://recaptchaenterprise.googleapis.com/v1/projects/${projectID}/assessments?key=${apiKey}`;

                const verifyResponse = await fetch(verifyUrl, {
                    method: 'POST',
                    body: JSON.stringify({
                        event: {
                            token: recaptchaToken,
                            siteKey: siteKey,
                            expectedAction: 'submit_survey' // O 'submit', debe coincidir con el frontend
                        }
                    })
                });

                const verifyData = await verifyResponse.json();

                // Si Google responde error (ej: Project ID incorrecto), solo lo logueamos
                if (!verifyResponse.ok) {
                    console.warn("⚠️ Advertencia Config reCAPTCHA:", verifyData.error?.message);
                    console.warn(">> Se permite el envío para no bloquear al usuario por error de servidor.");
                } else if (!verifyData.tokenProperties.valid) {
                    console.warn("❌ Token reCAPTCHA inválido");
                    // Aquí sí podríamos bloquear si quisieramos ser estrictos
                    // isHuman = false; 
                } else if (verifyData.riskAnalysis.score < 0.3) {
                    console.warn("🤖 Bot detectado (Score bajo)");
                    isHuman = false;
                }
            } else {
                console.log("ℹ️ Saltando verificación reCAPTCHA: Faltan variables de entorno.");
            }
        } catch (err) {
            console.error("Error de conexión con reCAPTCHA (Ignorado):", err);
        }

        if (!isHuman) {
            return NextResponse.json({ error: "Actividad sospechosa detectada" }, { status: 403 });
        }

        // --- 2. VALIDACIÓN DE CAMPOS ---
        // Para la encuesta, a veces el email es interno (placeholder), así que somos flexibles
        if (!message) {
            return NextResponse.json({ error: "El mensaje no puede estar vacío" }, { status: 400 });
        }

        // --- 3. PREPARACIÓN DE CORREO ---
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;
        const adminEmail = process.env.ADMIN_EMAIL || smtpUser;

        if (!smtpUser || !smtpPass) {
            return NextResponse.json({ error: "Error de configuración del servidor de correo" }, { status: 500 });
        }

        // Estilos
        const theme = {
            bgMain: "#dbedf1ff",
            bgCard: "#0f172a",
            primary: "#0ea5e9",
            textMain: "#ffffff",
            textSec: "#94a3b8",
            border: "#1e293b"
        };

        const logoUrl = "https://krouhub.com/KrouHub_Logo_blanco.png";
        const safeName = name || "Usuario";
        const safeSubject = subject || "Nuevo Mensaje";
        const emailService = new EmailService();

        // Componentes HTML
        const logoHtml = `
            <a href="https://krouhub.com" target="_blank" style="text-decoration: none; display: block;">
                <img src="${logoUrl}" alt="KrouHub" width="150" style="display: block; margin: 0 auto;">
            </a>
        `;

        const footerHtml = `
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid ${theme.border}; text-align: center; font-size: 12px; color: ${theme.textSec};">
                <p style="margin: 0;">© ${new Date().getFullYear()} KrouHub. Servicios digitales</p>
            </div>
        `;

        // --- 4. HTML CORREO ADMIN ---
        const adminHtml = `
            <div style="background-color: ${theme.bgMain}; font-family: sans-serif; padding: 40px 0;">
                <div style="background-color: ${theme.bgCard}; max-width: 600px; margin: 0 auto; padding: 30px; border-radius: 12px; border: 1px solid ${theme.border}; color: ${theme.textMain};">
                    ${logoHtml}
                    <h2 style="color: ${theme.primary}; text-align: center; margin-top: 20px;">🚀 ${safeSubject}</h2>
                    
                    <div style="margin-top: 30px;">
                        <p style="color: ${theme.textSec}; font-size: 12px; text-transform: uppercase;">Cliente</p>
                        <p style="font-size: 18px; font-weight: bold; margin: 0 0 10px 0;">${safeName}</p>
                        <p style="margin: 0;">📧 ${email}</p>
                        <p style="margin: 0;">📱 ${phone || 'N/A'}</p>
                    </div>

                    <div style="background-color: rgba(14, 165, 233, 0.1); padding: 20px; border-radius: 8px; border-left: 4px solid ${theme.primary}; margin-top: 20px;">
                        <p style="white-space: pre-wrap; margin: 0; font-size: 15px; line-height: 1.6;">${message}</p>
                    </div>
                </div>
            </div>
        `;

        // --- 5. HTML CORREO USUARIO (Confirmación) ---
        // Solo enviamos confirmación si el email parece real (contiene @ y .)
        const userHtml = `
            <div style="background-color: ${theme.bgMain}; font-family: sans-serif; padding: 40px 0;">
                <div style="background-color: ${theme.bgCard}; max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 12px; border: 1px solid ${theme.border}; color: ${theme.textMain}; text-align: center;">
                    ${logoHtml}
                    <h1 style="margin-top: 30px; font-size: 24px;">¡Recibido!</h1>
                    <p style="color: ${theme.textSec}; font-size: 16px; line-height: 1.6; margin: 25px 0;">
                        Hola <strong>${safeName}</strong>, gracias por tu tiempo. Hemos recibido tu información correctamente.
                    </p>
                    ${footerHtml}
                </div>
            </div>
        `;

        // --- 6. ENVÍO ---
        const emailsToSend = [
            emailService.sendEmail(adminEmail as string, `🔔 Admin: ${safeSubject}`, adminHtml, email)
        ];

        // Si el usuario puso un email válido, le enviamos copia
        if (email && email.includes('@') && email !== 'cliente@encuesta.com') {
            emailsToSend.push(emailService.sendEmail(email, `✅ Recibido - KrouHub`, userHtml));
        }

        await Promise.all(emailsToSend);

        return NextResponse.json({ success: true, message: "Enviado correctamente" });

    } catch (error: any) {
        console.error("Error CRÍTICO en API:", error);
        return NextResponse.json({ error: error.message || "Error interno" }, { status: 500 });
    }
}