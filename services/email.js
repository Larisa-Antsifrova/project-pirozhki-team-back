const Mailgen = require("mailgen");
require("dotenv").config();

class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    switch (env) {
      case "development":
        this.link = process.env.API_URL;
        break;
      case "production":
        this.link = process.env.CLIENT_URL;
        break;
      default:
        this.link = process.env.API_URL;
        break;
    }
  }

  #createTemplateVerificationEmail(activationLink, name) {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Wallet App",
        link: this.link,
      },
    });


    const emailSend = {
      body: {
        name: `, my dear ${name}`,
        intro: "Welcome to Wallet App! We are very excited to have you on board.",
        action: {
          instructions: "To get started with Wallet App, please click here:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Confirm your account",
            link: `${this.link}/auth/verify/${activationLink}`,
          },
        },
        outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    return mailGenerator.generate(emailSend);
  }
  async sendVerifyEmail(activationLink, email) {
    const emailHtml = this.#createTemplateVerificationEmail(activationLink, email);
    const msg = {
      to: email,
      subject: "Verify your account",
      html: emailHtml,
    };
    const result = await this.sender.send(msg);
    console.log(result);
  }
}

module.exports = EmailService;