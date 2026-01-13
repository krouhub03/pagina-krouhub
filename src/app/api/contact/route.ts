import { NextResponse } from 'next/server';
import { EmailService } from '@/services/emailService';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message, subject, phone, recaptchaToken } = body;

        // --- VERIFICACIÓN RECAPTCHA ENTERPRISE ---
        if (!recaptchaToken) {
            return NextResponse.json({ error: "Verificación de seguridad ausente (reCAPTCHA)" }, { status: 400 });
        }

        try {
            const projectID = process.env.RECAPTCHA_PROJECT_ID;
            const apiKey = process.env.RECAPTCHA_API_KEY;
            const siteKey = "6Ldg3EgsAAAAAFMJ1c9b5fA-MswgA2EbKpyxnrps";

            // Si no hay configuración, saltamos (para desarrollo o si el usuario aún no lo ha puesto)
            if (projectID && apiKey) {
                const verifyUrl = `https://recaptchaenterprise.googleapis.com/v1/projects/${projectID}/assessments?key=${apiKey}`;

                const verifyResponse = await fetch(verifyUrl, {
                    method: 'POST',
                    body: JSON.stringify({
                        event: {
                            token: recaptchaToken,
                            siteKey: siteKey,
                            expectedAction: 'submit'
                        }
                    })
                });

                const verifyData = await verifyResponse.json();

                if (!verifyResponse.ok || !verifyData.tokenProperties.valid) {
                    console.error("reCAPTCHA Invalid:", verifyData);
                    return NextResponse.json({ error: "Fallo en la verificación de seguridad" }, { status: 403 });
                }

                // Puedes ajustar el umbral del score (0.0 a 1.0)
                if (verifyData.riskAnalysis.score < 0.5) {
                    return NextResponse.json({ error: "Actividad sospechosa detectada" }, { status: 403 });
                }
            }
        } catch (err) {
            console.error("Error verificando reCAPTCHA:", err);
            // En caso de error de red o similar, decidimos si dejar pasar o bloquear. 
            // Aquí dejamos pasar para no romper el formulario si falla el servicio de Google.
        }

        // --- VALIDACIÓN ---
        if (!email || !message) {
            return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
        }

        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;
        const adminEmail = process.env.ADMIN_EMAIL || smtpUser;

        if (!smtpUser || !smtpPass) {
            return NextResponse.json({ error: "Error de configuración del servidor" }, { status: 500 });
        }

        // --- CONFIGURACIÓN DE TEMA (KrouHub Style) ---
        const theme = {
            bgMain: "#dbedf1ff",     // Fondo oscuro profundo (como tu web)
            bgCard: "#0f172a",     // Fondo de la tarjeta (un poco más claro)
            primary: "#0ea5e9",    // Azul Cian (similar a tus botones)
            textMain: "#ffffff",   // Texto blanco
            textSec: "#94a3b8",    // Texto gris claro
            border: "#1e293b"      // Bordes sutiles
        };

        const logoUrl = "https://krouhub.com/KrouHub_Logo_blanco.png"; // Asegúrate que sea un PNG transparente
        const safeName = name || "Usuario";
        const safeSubject = subject || "Consulta General";
        const emailService = new EmailService();

        // --- COMPONENTES REUTILIZABLES ---

        // Logo con protección básica
        const logoHtml = `
            <a href="https://krouhub.com" target="_blank" style="text-decoration: none; display: block;">
                <img 
                    src="${logoUrl}" 
                    alt="KrouHub" 
                    width="150" 
                    style="display: block; margin: 0 auto; user-select: none; pointer-events: none;"
                >
            </a>
        `;

        // Footer estándar
        const footerHtml = `
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid ${theme.border}; text-align: center; font-size: 12px; color: ${theme.textSec};">
                <p style="margin: 0;">© ${new Date().getFullYear()} KrouHub. Servicios digitales</p>
            </div>
        `;

        // --- 1. HTML ADMINISTRADOR (Notificación Interna) ---
        // Diseño limpio y de alto contraste para lectura rápida
        const adminHtml = `
            <div style="background-color: ${theme.bgMain}; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px 0;">
                <div style="background-color: ${theme.bgCard}; max-width: 600px; margin: 0 auto; padding: 30px; border-radius: 12px; border: 1px solid ${theme.border}; color: ${theme.textMain}; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);">
                    
                    ${logoHtml}
                    
                    <h2 style="color: ${theme.primary}; text-align: center; margin-top: 20px;">🚀 Nuevo Lead Recibido</h2>
                    
                    <div style="margin-top: 30px;">
                        <p style="margin: 5px 0; color: ${theme.textSec}; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Cliente</p>
                        <p style="margin: 0 0 15px 0; font-size: 18px; font-weight: bold;">${safeName}</p>
                        
                        <p style="margin: 5px 0; color: ${theme.textSec}; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Contacto</p>
                        <p style="margin: 0 0 5px 0;">📧 <a href="mailto:${email}" style="color: ${theme.primary}; text-decoration: none;">${email}</a></p>
                        <p style="margin: 0 0 15px 0;">📱 ${phone || 'No especificado'}</p>

                        <p style="margin: 5px 0; color: ${theme.textSec}; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Asunto</p>
                        <p style="margin: 0 0 15px 0;">${safeSubject}</p>
                    </div>

                    <div style="background-color: rgba(14, 165, 233, 0.1); padding: 20px; border-radius: 8px; border-left: 4px solid ${theme.primary}; margin-top: 20px;">
                        <p style="margin: 0; color: ${theme.textSec}; font-size: 12px; margin-bottom: 5px;">Mensaje:</p>
                        <p style="white-space: pre-wrap; margin: 0; font-size: 15px; line-height: 1.6;">${message}</p>
                    </div>
                </div>
            </div>
        `;

        // --- 2. HTML USUARIO (Confirmación Automática) ---
        // Diseño visual alineado con la landing page (Dark Mode)
        const userHtml = `
            <div style="background-color: ${theme.bgMain}; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px 0;">
                <div style="background-color: ${theme.bgCard}; max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 12px; border: 1px solid ${theme.border}; color: ${theme.textMain}; text-align: center; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);">
                    
                    ${logoHtml}

                    <h1 style="color: ${theme.textMain}; margin-top: 30px; font-size: 24px;">¡Gracias por contactarnos!</h1>
                    
                    <p style="color: ${theme.textSec}; font-size: 16px; line-height: 1.6; margin: 25px 0;">
                        Hola <strong>${safeName}</strong>, hemos recibido tu mensaje correctamente. 
                        Nos pondremos en contacto contigo muy pronto.
                    </p>

                    ${footerHtml}
                </div>
            </div>
        `;
        // --- ENVIAR ---
        await Promise.all([
            emailService.sendEmail(adminEmail as string, `🚀 Lead KrouHub: ${safeName}`, adminHtml, email),
            emailService.sendEmail(email, `👋 Recibimos tu mensaje - KrouHub`, userHtml)
        ]);

        return NextResponse.json({ success: true, message: "Enviado correctamente" });

    } catch (error: any) {
        console.error("Error en API Contact:", error);
        return NextResponse.json({ error: error.message || "Error interno" }, { status: 500 });
    }
}