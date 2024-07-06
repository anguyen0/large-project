import mongoose from 'mongoose';
import * as nodemailer from 'nodemailer';

export default function sendVerifyEmail(
  email: string,
  user_id: mongoose.Types.ObjectId
) {
  try {
    // Get the Nodemailer config variables
    const service = process.env.NODEMAILER_SERVICE as string;
    const host = process.env.NODEMAILER_HOST as string;
    const port = parseInt(process.env.NODEMAILER_PORT as string, 10);
    const user = process.env.NODEMAILER_USER as string;
    const pass = process.env.NODEMAILER_PASS as string;

    // Create a nodemailer transporter
    const transporter: nodemailer.Transporter = nodemailer.createTransport({
      service,
      host,
      port,
      secure: true,
      auth: {
        user,
        pass,
      },
    });

    // Construct the verify account email
    const mailOptions = {
      from: host,
      to: email,
      subject: 'Verify InScribe Social Account',
      html: `
        <h1>Verify your InScribe Social Account</h1>
        <p>Click the link to verify your account: <a href='http://www.google.com'>Verify</a></p>
        <p>This link will expire in 15 minutes. If you need a new link request a new link here: <a href='http://www.google.com'>New Verify Email</a></p>

    `,
    };

    // Send the verify email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`Error while sending verify email: ${error}`);
      }
    });
  } catch (error) {
    console.error(`Failed to send verify email: ${error}`);
  }
}
