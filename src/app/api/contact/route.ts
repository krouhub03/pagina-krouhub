import { NextResponse } from 'next/server';
import { EmailService } from '@/services/emailService';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log('API Contact: Received request body:', JSON.stringify(body, null, 2));

        const { name, email, message, subject, phone } = body;

        if (!email || !message) {
            console.log('API Contact: Missing required fields (email or message)');
            return NextResponse.json(
                { error: "Faltan campos obligatorios" },
                { status: 400 }
            );
        }

        // 3. Verificar que las variables de entorno existan
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;
        const adminEmail = process.env.ADMIN_EMAIL || smtpUser;

        console.log('[API Contact] Environment Check:', {
            SMTP_USER: smtpUser ? 'Defined' : 'MISSING',
            SMTP_PASS: smtpPass ? 'Defined' : 'MISSING',
            ADMIN_EMAIL: process.env.ADMIN_EMAIL ? 'Defined' : (smtpUser ? 'Using fallback' : 'MISSING')
        });

        if (!smtpUser || !smtpPass) {
            console.error('[API Contact] Critical Configuration Missing: SMTP_USER or SMTP_PASSWORD.');
            return NextResponse.json(
                {
                    error: "Configuración del servidor incompleta",
                    details: "Faltan variables de entorno SMTP en el servidor."
                },
                { status: 500 }
            );
        }

        // 4. Instanciar tu servicio
        console.log('API Contact: Initializing EmailService.');
        const emailService = new EmailService();

        // 5. Preparar el HTML del correo para el administrador
        const adminHtml = `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #0891b2; border-bottom: 2px solid #0891b2; padding-bottom: 10px;">Nuevo mensaje de contacto</h2>
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
                <p><strong>Asunto/Servicio:</strong> ${subject || 'Consulta general'}</p>
                <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-top: 15px;">
                    <p><strong>Mensaje:</strong></p>
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
            </div>
        `;

        // 6. Enviar el correo al administrador
        console.log('API Contact: Sending email to:', adminEmail);

        await emailService.sendEmail(
            adminEmail as string,
            `🚀 Nuevo Contacto: ${name} - ${subject || "Web"}`,
            adminHtml,
            email // ReplyTo
        );

        console.log('[API Contact] Email successfully dispatched to admin.');
        return NextResponse.json({ success: true, message: "Correo enviado con éxito" });

    } catch (error: any) {
        console.error("[API Contact] CATCH ERROR:", {
            error: error.message,
            stack: error.stack
        });
        return NextResponse.json(
            {
                error: error.message || "Error interno del servidor",
                diagnostic: {
                    message: error.message,
                    code: error.code,
                    stack: error.stack?.split('\n').slice(0, 3).join('\n')
                }
            },
            { status: 500 }
        );
    }
}