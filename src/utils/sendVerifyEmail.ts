import mongoose from "mongoose";
import { logger } from "../logs/logger";
import generateVerificationToken from "./generateVerificationToken";
import nodemailer from 'nodemailer';


const sendVerifyEmail = async (user_id:mongoose.Types.ObjectId, email:string) => {

    try {

        // Generate a verification token
        const token = generateVerificationToken(user_id);

        // Creare a transporter
        const transporter = nodemailer.createTransport({

            host: process.env.NODEMAILER_HOST,
            port: parseInt(process.env.NODEMAILER_PORT as string, 10),
            secure: true,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }

        });

        // Create verify message
        const message = {
            from: process.env.NODEMAILER_USER,
            to: email,
            subject: 'Verifiy your account',
            html: 
            `
                <p>Hello,</p>
                <p>Please click the link to verify your account: <a href="${process.env.VERIFY_BASE_URL}/api/auth/verify/${token}">Verify</a></p>
                <p>This link will expire in 1 hour.</p>
            `
        };

        // Send the email
        await transporter.sendMail(message);

    }
    catch(error) {

        logger('ERROR', `Error sending verification email: ${error}`, true);
        return null;

    }

};

export default sendVerifyEmail;