import nodemailer from 'nodemailer';

export class EmailService {
    private transporter;

    constructor() {
        // En Hostinger, 465 con SSL (secure: true) es lo más común y seguro
        const port = parseInt(process.env.SMTP_PORT || '465', 10);
        const smtpUser = process.env.SMTP_USER || "admin@krouhub.com";
        const smtpPass = process.env.SMTP_PASSWORD || "2lN&Lpr6?|";
        const smtpHost = process.env.SMTP_HOST || "smtp.hostinger.com";

        console.log(`[EmailService] Initializing: ${smtpHost}:${port} | User: ${smtpUser} | SSL: ${port === 465}`);

        this.transporter = nodemailer.createTransport({
            host: smtpHost,
            port: port,
            secure: port === 465,
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    async sendEmail(to: string, subject: string, html: string, replyTo?: string): Promise<any> {
        const fromEmail = process.env.SMTP_USER || "admin@krouhub.com";
        console.log(`[EmailService] Attempting send to: ${to} | From: ${fromEmail}`);

        try {
            const info = await this.transporter.sendMail({
                from: `"Krouhub" <${fromEmail}>`,
                to,
                subject,
                html,
                replyTo
            });
            console.log('[EmailService] Success! MessageId:', info.messageId);
            return info;
        } catch (error: any) {
            console.error('[EmailService] CRITICAL FAILURE:', {
                message: error.message,
                code: error.code,
                command: error.command,
                response: error.response,
                stack: error.stack
            });
            throw error;
        }
    }
}
