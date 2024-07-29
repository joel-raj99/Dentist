"use server"
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

export async function sendmail(email, id, password) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Admin Your Account Information',
    text: `Admin ID: ${id}\nYour Password: ${password}\nYour email :${email}`
  };

  await transporter.sendMail(mailOptions);
}
