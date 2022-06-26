import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const options = {
  from: process.env.USER,
  to: "",
  subject: "",
  text: "",
};

export const sendMail = async (email, subject, message) => {
  options.to = email;
  options.subject = subject;
  options.text = message;
  return new Promise((resolve, reject) => {
    transporter.sendMail(options, (err, info) => {
      if (err) {
        resolve(false);
      }
      resolve(true);
    });
  });
};
