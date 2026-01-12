import { NextResponse } from 'next/server';
import { EmailService } from '@/services/emailService';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message, subject } = body;

        if (!email || !message) {
            return NextResponse.json(
                { error: "Faltan campos obligatorios" },
                { status: 400 }
            );
        }

        // 3. Verificar que las variables de entorno existan ANTES de intentar enviar
        if (!process.env.SMTP_USER || (!process.env.SMTP_PASSWORD && !process.env.SMTP_PASS)) {
            // ESTE ES EL ERROR QUE ESTABAS VIENDO
            return NextResponse.json(
                { error: "Configuración del servidor incompleta" },
                { status: 500 }
            );
        }

        // 4. Instanciar tu servicio
        const emailService = new EmailService();

        // 5. Preparar el HTML del correo
        const emailHtml = `
      <h2>Nuevo mensaje de contacto desde Krouhub</h2>
      <p><strong>De:</strong> ${name} (${email})</p>
      <p><strong>Asunto:</strong> ${subject || "Consulta general"}</p>
      <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px;">
        <p>${message}</p>
      </div>
    `;

        // 6. Enviar el correo (A ti mismo, o al admin)
        await emailService.sendEmail(
            process.env.SMTP_USER as string, // Destinatario (usualmente el mismo admin)
            `Nuevo mensaje: ${subject || "Contacto Web"}`, // Asunto
            emailHtml, // Cuerpo HTML
            email // ReplyTo: Para que al responder, le respondas al cliente
        );

        return NextResponse.json({ success: true, message: "Correo enviado con éxito" });

    } catch (error: any) {
        console.error("Error en API Route:", error);
        return NextResponse.json(
            { error: error.message || "Error interno del servidor" },
            { status: 500 }
        );
    }
}