import nodemailer from "nodemailer";

const sendMail = async options => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL, // generated ethereal user
      pass: process.env.SMTP_PASSWORD, // generated ethereal password
    },
  });

  const message = {
    from: `${process.env.FROM_NAME} ${process.env.FROM_EMAIL}`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(message);

  console.log("Verification Email has been send");
};

export default sendMail;
