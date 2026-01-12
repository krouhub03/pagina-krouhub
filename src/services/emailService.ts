import nodemailer from 'nodemailer';

export class EmailService {
    private transporter;

    constructor() {
        const port = parseInt(process.env.SMTP_PORT || '465', 10);

        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.hostinger.com",
            port: port,
            secure: port === 587, // true for 465 (SSL), false for other ports (587 uses STARTTLS)
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    async sendEmail(to: string, subject: string, html: string, replyTo?: string): Promise<any> {
        try {
            const info = await this.transporter.sendMail({
                from: `"Krouhub" <${process.env.SMTP_USER}>`,
                to,
                subject,
                html,
                replyTo
            });
            return info;
        } catch (error) {
            console.error('Error in EmailService:', error);
            throw error;
        }
    }
}
