import bcrypt from 'bcrypt';

const NUM_SALT_ROUNDS:number = 10;

const hashPassword = async (password:string):Promise<string | null> => {

    try {

        // Generate a salt for the password
        const salt = await bcrypt.genSalt(NUM_SALT_ROUNDS);

        // Hash the passwors using the salt
        const hash = await bcrypt.hash(password, salt);

        return hash;

    }
    catch(error) {

        console.error(`Error while hashing password: ${error}`);

        return null;

    }

}; 

export default hashPassword;