import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const generateUserIdToken = (user_id:mongoose.Types.ObjectId, expires:number):string | null => {

    try {

        const JWT_SECRET = process.env.JWT_SECRET as string;
        
        const token_params = {
            user_id
        };

        const token = jwt.sign(token_params, JWT_SECRET, { expiresIn:expires });

        return token;

    }
    catch(error) {

        console.error(`Error while generating token: ${error}`);
        return null;

    }

};

export default generateUserIdToken;