const nodemailer = require("nodemailer");
require("dotenv").config();

class CreateSenderNodemailer {
  async send(msg) {
    const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASSWORD,
            },
          });

    return await transporter.sendMail({ ...msg, from: process.env.SMTP_USER });
  }
}

module.exports = CreateSenderNodemailer;
