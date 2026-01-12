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

        if (!smtpUser || !smtpPass) {
            console.error('API Contact: SMTP environment variables are missing (SMTP_USER or SMTP_PASSWORD).');
            return NextResponse.json(
                { error: "Configuración del servidor incompleta" },
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

        console.log('API Contact: Email sent successfully to admin');
        return NextResponse.json({ success: true, message: "Correo enviado con éxito" });

    } catch (error: any) {
        console.error("API Contact: Error caught in route handler:", error);
        return NextResponse.json(
            { error: error.message || "Error interno del servidor" },
            { status: 500 }
        );
    }
}