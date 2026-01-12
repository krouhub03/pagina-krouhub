import nodemailer from 'nodemailer';

export class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true,
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
