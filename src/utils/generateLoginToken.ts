import jwt from 'jsonwebtoken';

const generateLoginToken = (user_id:string, username:string, email:string, expires:number) => {

    try {

        const token_payload = { user_id, username, email };
        const JWT_SECRET    = process.env.JWT_SECRET as string;
        const token         = jwt.sign(token_payload, JWT_SECRET, {expiresIn: expires});

        return token;

    }
    catch(error) {

        console.error(`Error while generating a login token: ${error}`);
        throw new Error('Could not generate login token');

    }

};

export default generateLoginToken;