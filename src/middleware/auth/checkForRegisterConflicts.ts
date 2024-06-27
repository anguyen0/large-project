import { Request, Response, NextFunction } from 'express';
import User from '../../models/UserModel';

const checkForRegisterConflicts = async (req:Request, res:Response, next:NextFunction) => {

    try {

        // Extract the user's email and username from the request body
        const { email, username } = req.body;

        const conflict_errors: { [field_name: string]: string[] } = {};


        // Attempt to find the user by their email address
        let user = await User.findOne({email});

        if(user) {

            if(!conflict_errors['email']) {
                conflict_errors['email'] = [];
            }

            conflict_errors['email'].push('Email already in use');

        }

        // Attempt to find the user by username
        user = await User.findOne({username});

        if(user) {

            if(!conflict_errors['username']) {
                conflict_errors['username'] = [];
            }

            conflict_errors['username'].push('Username is taken');

        }

        // Return a confict error if any occured
        if(Object.keys(conflict_errors).length > 0) {

            return res.status(409).json({
                conflict_errors: conflict_errors
            });

        }

        next();

    }
    catch(error) {

        return res.status(500).json({
            message: `Internal server error: ${error}`
        });

    }

};

export default checkForRegisterConflicts;