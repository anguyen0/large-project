import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/UserModel';
import hashPassword from '../../utils/hashPassword';

const resetPasswordController = async (req:Request, res:Response) => {

    try {

        // Get the token from the auth headers
        const token = req.headers.authorization?.split(' ')[1];
        
        if(!token) {
            return res.status(400).json({
                message: 'Password reset token is required'
            });
        }

        // validate the reset token
        const JWT_SECRET = process.env.JWT_SECRET as string;
        const decoded    = jwt.verify(token, JWT_SECRET) as { user_id:string };

        if(!decoded || !decoded.user_id) {

            return res.status(400).json({
                message: 'Invalid reset token'
            });

        }

        // Find the user by user_id
        const user = await User.findById(decoded.user_id);

        if(!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Extract password from request body
        const { password } = req.body; 

        // Hash the new password
        const hash = await hashPassword(password);

        // Update the user's password, unlock the account, and reset the login attempts
        user.password       = hash;
        user.locked         = false;
        user.login_attempts = 0;

        await user.save();

        // redirect to login page
        res.redirect('http://localhost:5000/login');

    }
    catch(error) {

        console.error(`Error occured when resetting user's password: ${error}`);

        return res.status(500).json({
            message: 'Internal server error'
        });

    }

};

export default resetPasswordController;