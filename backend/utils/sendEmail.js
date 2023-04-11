import nodeMailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

const sendEmail = async(options) => {
 

const transporter = nodeMailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const mailOptions={
    from:  'DUKAAN - future of indian e-commerce< '+process.env.SMTP_USER+'>',
    to:options.email,
    subject:options.subject,
    text:options.message,
};

await transporter.sendMail(mailOptions);

};

export default sendEmail