"use server"
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

export async function sendemail(email, password) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Admin Your Account Information',
    text: `Your Password: ${password}\nYour email: ${email}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    if (error.response) {
      console.error('Response:', error.response);
    }
    if (error.stack) {
      console.error('Stack:', error.stack);
    }
    return false;
  }
}
