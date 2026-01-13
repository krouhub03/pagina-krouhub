import nodemailer from 'nodemailer';

// Definimos la interfaz para los adjuntos (opcional, ayuda con TypeScript)
interface Attachment {
    filename: string;
    content: Buffer | string;
    cid?: string;
}

export class EmailService {
    private transporter;

    constructor() {
        const port = Number(process.env.SMTP_PORT) || 587; // Por defecto 587 si falla la variable

        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: port,
            // AQUÍ ESTÁ EL CAMBIO CLAVE:
            // Solo usar secure: true si el puerto es 465. Para 587 debe ser false.
            secure: port === 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD || process.env.SMTP_PASS,
            },
            // Opcional: Esto ayuda si tienes problemas con certificados auto-firmados en desarrollo
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    async sendEmail(
        to: string,
        subject: string,
        html: string,
        replyTo?: string,
        attachments?: Attachment[]
    ) {
        const mailOptions = {
            from: `"KrouHub Web" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
            replyTo,
            attachments,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log("Message sent: %s", info.messageId);
            return info;
        } catch (error) {
            console.error("Error sending email: ", error);
            throw error;
        }
    }
}