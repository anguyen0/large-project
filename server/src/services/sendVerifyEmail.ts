import mongoose from 'mongoose';
import jwt, { JwtPayload } from 'jsonwebtoken';
import nodemailer, { SentMessageInfo, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const sendVerifyEmail = async (
  userId: mongoose.Types.ObjectId,
  email: string,
  expiresInMinutes: number = 15
): Promise<void> => {
  // create a verification token for the user
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + (expiresInMinutes + 60);

  const payload: any = {
    userId: userId,
    email: email,
    iat: iat,
    exp: exp,
    purpose: 'email verification',
  };

  const JWT_SECRET: string = process.env.JWT_SECRET as string;

  const token: string = jwt.sign(payload, JWT_SECRET, {
    algorithm: 'HS256',
  });

  // Create a nodemailer transporter that will be used to send the verify email
  const transporter: Transporter<SMTPTransport.SentMessageInfo> =
    nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST as string,
      port: parseInt(process.env.NODEMAILER_PORT as string, 10),
      secure: true,
      auth: {
        user: process.env.NODEMAILER_USER as string,
        pass: process.env.NODEMAILER_PASS as string,
      },
    });

  // Construct the verify account link to send in email
  const verifyLink: string = `${
    process.env.BASE_URL as string
  }/api/auth/verify-account/${token}`;

  // Send verify account email to the user
  const info: SentMessageInfo = await transporter.sendMail({
    from: process.env.NODEMAILER_USER as string,
    to: email,
    subject: 'Verfiy your Inscribed account',
    html: `
        <h1>Verify your Inscribed account</h1>
        <p>Click the link to verify your account: <a href=${verifyLink}>Verify</a></p>
        <p>This link is valid for 15 minutes. If it expires just login and request a new one :)</p>
    `,
  });
};

export default sendVerifyEmail;
