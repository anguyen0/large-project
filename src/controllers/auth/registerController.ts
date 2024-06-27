import { Request, Response } from 'express';
import { request_logger } from '../../logs/logger';
import bcrypt from 'bcrypt';
import User from '../../models/UserModel';
import hashPassword from '../../utils/hashPassword';
import sendVerifyEmail from '../../utils/sendVerifyEmail';

const registerController = async (req:Request, res:Response):Promise<any> => {

    try {

        // Extract the request fields from the body
        const { first_name, last_name, email, username, password } = req.body;
 
        // Hash the user's password for safe storage
        const hash = await hashPassword(password);

        // Create new user
        const user = new User({first_name, last_name, email, username, password:hash});
        await user.save();

        // Send a verify email
        await sendVerifyEmail(user.id, email);

        return res.status(201).json({
            message: 'User registered successfully'
        });

    }
    catch(error) {

        request_logger('ERROR', `Error while registering new user: ${error}`, req, true);

        return res.status(500).json({
            message: 'Internal server error'
        });

    }

};

export default registerController;