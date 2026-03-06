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
    const host = getFirstEnv(["SMTP_HOST", "MAIL_HOST"]);
    const port = Number(getFirstEnv(["SMTP_PORT", "MAIL_PORT"]) || "587");
    const user = getFirstEnv(["SMTP_USER", "MAIL_USER"]);
    const pass = getFirstEnv([
      "SMTP_PASSWORD",
      "SMTP_PASS",
      "MAIL_PASSWORD",
      "MAIL_PASS",
    ]);

    if (!user || !pass) {
      throw new Error(
        "Missing SMTP credentials: define SMTP_USER/SMTP_PASSWORD (or MAIL_USER/MAIL_PASSWORD)."
      );
    }

    if (!service && !host) {
      throw new Error("Missing SMTP host: define SMTP_HOST (or SMTP_SERVICE).");
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
