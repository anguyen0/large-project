import { Request, Response } from 'express';
import User from '../../models/UserModel';
import bcrpyt from 'bcrypt';
import generateLoginToken from '../../utils/generateLoginToken';

const loginController = async (req:Request, res:Response) => {

    try {

        // Extract the email and the password from the request body
        const { email, password } = req.body;

        // Find the user by the email supplied
        const user = await User.findOne({email});

        if(!user) {

            return res.status(404).json({
                message: 'Invalid login credentials. Try again.'
            });

        }

        // Check if the user's account is locked
        if(user.locked) {

            return res.status(403).json({
                message: 'Account is locked due to multiple unsuccessful login attempts. Please reset your password.'
            });

        }

        // Check if the password supplied matches the password on record
        const check = await bcrpyt.compare(password, user.password);

        if(!check) {

            user.login_attempts++;

            if(user.login_attempts >= 5) {
                user.locked = true;
            }

            await user.save();

            return res.status(404).json({
                message: 'Invalid login credentials. Try again.'
            });

        }

        // Reset the number of login attempts to zero if not already
        if(user.login_attempts !== 0) {
            user.login_attempts = 0;
            await user.save();
        }

        // Generate a user login token
        const token = generateLoginToken(user.id, user.username, user.email, 3600);

        // Return token to the user
        return res.status(200).json({
            message: 'User logged in successfully',
            token: token
        });

    }
    catch(error) {

        console.error(`Error occured while logging in user: ${error}`);

        return res.status(500).json({
            message: 'Internal server error'
        });

    }

};

export default loginController;