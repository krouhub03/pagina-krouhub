import { NextResponse } from 'next/server';
import { EmailService } from '../../../services/emailService';

export async function POST(request: Request) {
    try {
        const { nombre, email, telefono, servicio, mensaje } = await request.json();

        const smtpUser = process.env.SMTP_USER;
        const adminEmail = process.env.ADMIN_EMAIL;
        const smtpPassword = process.env.SMTP_PASSWORD;
        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = process.env.SMTP_PORT;

        // Verificar que las variables de entorno existan
        if (!smtpUser || !smtpPassword || !adminEmail || !smtpHost || !smtpPort) {
            console.error("Faltan variables de entorno SMTP");
            console.error({
                SMTP_USER: !!smtpUser,
                SMTP_PASSWORD: !!smtpPassword,
                ADMIN_EMAIL: !!adminEmail,
                SMTP_HOST: !!smtpHost,
                SMTP_PORT: !!smtpPort
            });
            return NextResponse.json({
                error: "Configuración del servidor incompleta"
            }, { status: 500 });
        }

        // Crear el servicio de email DESPUÉS de verificar las variables
        const emailService = new EmailService();

        // Email para el administrador
        const adminHtml = `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #0891b2; border-bottom: 2px solid #0891b2; padding-bottom: 10px;">Nuevo mensaje de contacto</h2>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Teléfono:</strong> ${telefono}</p>
                <p><strong>Servicio solicitado:</strong> ${servicio}</p>
                <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-top: 15px;">
                    <p><strong>Mensaje:</strong></p>
                    <p style="white-space: pre-wrap;">${mensaje}</p>
                </div>
                <p style="font-size: 0.8em; color: #888; margin-top: 20px;">Este mensaje fue enviado desde el formulario de contacto de Krouhub.</p>
            </div>
        `;

        // Email de confirmación para el cliente
        const userHtml = `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #eef2f3; border-radius: 16px; background: #fff; color: #1a202c;">
                <h2 style="color: #0891b2; margin-top: 0;">¡Hola ${nombre}!</h2>
                <p style="font-size: 16px; line-height: 1.6;">Gracias por contactar con <strong>Krouhub</strong>. Hemos recibido correctamente tu solicitud sobre <strong>${servicio}</strong>.</p>
                <p style="font-size: 16px; line-height: 1.6;">Un especialista de nuestro equipo revisará tu caso y se pondrá en contacto contigo en las próximas <strong>24 horas</strong> para agendar una llamada o enviarte más información.</p>
                
                <div style="margin: 30px 0; padding: 20px; background: #f7fafc; border-radius: 12px; border-left: 4px solid #0891b2;">
                    <p style="margin: 0; color: #4a5568; font-size: 14px;"><strong>Resumen de tu mensaje:</strong></p>
                    <p style="margin: 10px 0 0; font-style: italic; color: #2d3748;">"${mensaje}"</p>
                </div>

                <p style="font-size: 16px; line-height: 1.6;">Mientras tanto, puedes seguirnos en nuestras redes sociales para ver nuestros últimos proyectos.</p>
                
                <hr style="border: none; border-top: 1px solid #edf2f7; margin: 30px 0;" />
                
                <p style="margin: 0; font-weight: bold; color: #0891b2;">El equipo de Krouhub</p>
                <p style="margin: 5px 0 0; color: #718096; font-size: 14px;">Transformando ideas en experiencias digitales.</p>
            </div>
        `;

        // Enviar ambos correos
        await Promise.all([
            emailService.sendEmail(adminEmail, `🚀 Nuevo Proyecto: ${nombre} - ${servicio}`, adminHtml, email),
            emailService.sendEmail(email, `¡Hemos recibido tu mensaje, ${nombre}!`, userHtml)
        ]);

        return NextResponse.json({ message: "Mensajes enviados con éxito" }, { status: 200 });
    } catch (error: any) {
        console.error("Error en API Contacto:", error);
        return NextResponse.json(
            { error: "Error al enviar el correo", details: error.message },
            { status: 500 }
        );
    }
}
