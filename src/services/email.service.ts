import nodemailer from "nodemailer";
import htmlToText from "html-to-text";
import env from "@config/env.config";

module.exports = class Email {
  from: string;
  to: string;
  firstName: string;
  url: string;

  constructor(user, url) {
    this.from = `Locale <${process.env.Email}>`;
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // Gmail
      return nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_PASSWORD,
        },
      });
    }

    // Mailtrap
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(html, subject) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };
    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }
};
