import mongoose from 'mongoose';
import generateUserIdToken from './generateUserIdToken';
import nodemailer from 'nodemailer';

const sendPasswordResetEmail = async (email:string, user_id:mongoose.Types.ObjectId) => {

    try {

        // Generate the verification token
        const token = generateUserIdToken(user_id, 3600);

        // Email credentials
        const host = process.env.NODEMAILER_HOST as string;
        const port = parseInt(process.env.NODEMAILER_PORT as string, 10);
        const user = process.env.NODEMAILER_USER;
        const pass = process.env.NODEMAILER_PASS;

        // Create a transporter
        const transporter = nodemailer.createTransport({
            host: host,
            port: port,
            secure: true,
            auth: {
                user: user,
                pass: pass
            }
        });

        // Create the verify message
        const message = {
            from: user,
            to: email,
            subject: 'Reset your password',
            html: 
                `
                    <p>Hello,</p>
                    <p>Please click the link to reset your password: <a href="${process.env.VERIFY_BASE_URL}/reset-password/${token}">Reset Password</a></p>
                    <p>This link will expire in 1 hour.</p>
                    <strong>If you did not request this please ignore, and secure your account.</strong>
                `
        };

        // Send the mail
        await transporter.sendMail(message);

    }
    catch(error) {

        console.error(`Error while sending verification email: ${error}`);
        throw new Error('Error sending password reset email');

    }

};

export default sendPasswordResetEmail;