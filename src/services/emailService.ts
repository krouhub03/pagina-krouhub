import nodemailer from "nodemailer";
import { getFirstEnv } from "@/lib/server/env";

interface Attachment {
  filename: string;
  content: Buffer | string;
  cid?: string;
}

export class EmailService {
  private transporter;
  private mailUser: string;

  constructor() {
    const service = getFirstEnv(["SMTP_SERVICE", "MAIL_SERVICE"]);
    const host =
      getFirstEnv(["SMTP_HOST", "MAIL_HOST", "EMAIL_HOST", "HOSTINGER_SMTP_HOST"]) ||
      "smtp.hostinger.com";
    const port = Number(
      getFirstEnv(["SMTP_PORT", "MAIL_PORT", "EMAIL_PORT", "HOSTINGER_SMTP_PORT"]) || "587"
    );
    const user = getFirstEnv([
      "SMTP_USER",
      "MAIL_USER",
      "EMAIL_USER",
      "HOSTINGER_EMAIL",
      "HOSTINGER_SMTP_USER",
    ]);
    const pass = getFirstEnv([
      "SMTP_PASSWORD",
      "SMTP_PASS",
      "MAIL_PASSWORD",
      "MAIL_PASS",
      "EMAIL_PASSWORD",
      "EMAIL_PASS",
      "HOSTINGER_PASSWORD",
      "HOSTINGER_SMTP_PASSWORD",
    ]);

    if (!user || !pass) {
      throw new Error(
        "Missing SMTP credentials: define SMTP_USER/SMTP_PASSWORD (or MAIL_USER/MAIL_PASSWORD)."
      );
    }

    this.mailUser = user;

    const transportConfig = service
      ? {
          service,
          auth: { user, pass },
        }
      : {
          host,
          port,
          secure: port === 465,
          auth: { user, pass },
        };

    this.transporter = nodemailer.createTransport({
      ...transportConfig,
      tls: {
        rejectUnauthorized: false,
      },
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
      from: `"KrouHub Web" <${this.mailUser}>`,
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
      console.error("Error sending email:", error);
      throw error;
    }
  }
}
