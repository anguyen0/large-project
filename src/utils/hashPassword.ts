import bcrypt from 'bcrypt';

export class HashingError extends Error {

    constructor(message:string) {
        super(message),
        this.name = 'HashingError'
    }

};

const NUM_SALT_ROUNDS:number = 10;

const hashPassword = async (password:string):Promise<string> => {

    try {

        // Generate a salt for the password
        const salt = await bcrypt.genSalt(NUM_SALT_ROUNDS);

        // Hash the passwors using the salt
        const hash = await bcrypt.hash(password, salt);

        return hash;

    }
    catch(error) {

        console.error(`Error while hashing password: ${error}`);

        throw new HashingError('Error while hashing password');

    }

}; 

export default hashPassword;