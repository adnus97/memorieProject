import nodemailer from "nodemailer";
import dotenv from "dotenv";

// create reusable transporter object using the default SMTP transport
dotenv.config();
let transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SENDINBLUE_USERNAME, // generated SMTP user
    pass: process.env.SENDINBLUE_PASSWORD, // generated SMTP password
  },
});

// send mail with defined transport object
export const sendConfirmationCode = (email, activationCode) => {
  transporter.sendMail(
    {
      from: "adnus97@gmail.com",
      to: email,
      subject: "Verify Your Email Address",
      html: `
          <p>Hello!</p>
          <p>Thank you for signing up for our service. Please click the button below to verify your email address:</p>
          <a href=http://http://localhost:5173/verify/${activationCode}>Verify Email</a>
        `,
    },
    (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    }
  );
};
