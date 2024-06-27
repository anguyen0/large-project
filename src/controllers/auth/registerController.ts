import { Request, Response } from 'express';
import User from '../../models/UserModel';
import hashPassword, { HashingError } from '../../utils/hashPassword';

export interface RegisterRequestBody extends Request {

    first_name       : string;
    last_name        : string;
    email            : string;
    username         : string;
    password         : string;
    confirm_password : string;

};

const registerController = async (req:Request, res:Response) => {

    try {

        // Extract the request fields from the body
        const { first_name, last_name, email, username, password }:RegisterRequestBody = req.body;

        // Hash the user's password
        const hash = await hashPassword(password);

        // Crate a new user object
        const user = new User({first_name, last_name, email, username, password:hash});

        // Save the new user to the database
        await user.save();

        // Return success message
        return res.status(201).json({
            message: 'User created successfully'
        });


    }
    catch(error) {

        if(error instanceof HashingError) {

            console.error(`Error while hashing password: ${error}`);

        }
        else {

            console.error(`Error while registering user: ${error}`);

        }

        return res.status(500).json({
            message: 'Internal server error'
        });

    }

};

export default registerController;