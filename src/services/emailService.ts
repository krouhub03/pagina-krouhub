import nodemailer from 'nodemailer';

export class EmailService {
    private transporter;

    constructor() {
        const port = parseInt(process.env.SMTP_PORT || '465', 10);
        const smtpUser = process.env.SMTP_USER || "admin@krouhub.com";
        const smtpPass = process.env.SMTP_PASSWORD || "2lN&Lpr6?|";
        const smtpHost = process.env.SMTP_HOST || "smtp.hostinger.com";

        console.log('EmailService: Initializing with host:', smtpHost, 'port:', port, 'user:', smtpUser);

        this.transporter = nodemailer.createTransport({
            host: smtpHost,
            port: port,
            secure: port === 465, // En Hostinger: true para 465 (SSL), false para 587 (TLS/STARTTLS)
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
        console.log(`EmailService: Attempting to send email to ${to} from ${fromEmail}`);

        try {
            const info = await this.transporter.sendMail({
                from: `"Krouhub" <${fromEmail}>`,
                to,
                subject,
                html,
                replyTo
            });
            console.log('EmailService: Email sent successfully. MessageId:', info.messageId);
            return info;
        } catch (error) {
            console.error('EmailService: Error sending email:', error);
            throw error;
        }
    }
}
