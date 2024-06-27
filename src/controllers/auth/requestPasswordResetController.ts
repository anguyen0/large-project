import { Request, Response } from 'express';
import User from '../../models/UserModel';
import sendPasswordResetEmail from '../../utils/sendPasswordResetEmail';

const requestPasswordResetController = async (req:Request, res:Response) => {

    try {

        // Extract email from request body
        const { email } = req.body;
 
        // Find the users account by the supplied email
        const user = await User.findOne({email});

        if(!user) {

            return res.status(404).json({
                message: 'User not found'
            });

        }

        // Send a password reset email
        await sendPasswordResetEmail(email, user.id);

        // Return success message
        return res.status(200).json({
            message: 'Password reset email sent'
        });

    }
    catch(error) {

        console.error(`Error while requesting a password reset: ${error}`);

        return res.status(500).json({
            message: 'Internal server error'
        });

    }

};

export default requestPasswordResetController;