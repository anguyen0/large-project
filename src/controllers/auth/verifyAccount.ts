import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/UserModel';

const verifyAccountController = async (req:Request, res:Response) => {

    try {

        const JWT_SECRET = process.env.JWT_SECRET as string;

        // Get the verification token from the url
        const token = req.params.token as string;

        if(!token) {
            return res.status(400).json({
                message: 'Verification token is required'
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET) as {user_id:string};

        if(!decoded || !decoded.user_id) {

            return res.status(400).json({
                message: 'Invalid verification token'
            });

        }

        // Find the user by user_id
        const user = await User.findById(decoded.user_id);

        if(!user) {
            return res.status(404).json({
                message: 'User not found. Could not verifiy'
            });
        }

        // Update the verification status
        user.verifed = true;
        await user.save();

        // Redirect to login page
        res.redirect('http://localhost:5000/login');

    }
    catch(error) {

        console.error(`Error while verifying user account: ${error}`);

        return res.status(500).json({
            message: 'Internal server error'
        });

    }

};

export default verifyAccountController;