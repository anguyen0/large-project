import { Request, Response } from 'express';
import logger from '../utils/logger';
import { CustomResponse } from '../types/ErrorResponseTypes';
import jwt, { Jwt, JwtPayload } from 'jsonwebtoken';
import { User } from '../models/User';
import { DecodedToken } from '../types/verifyAccountTypes';

const verifyAccountController = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    // Get the JWT from the request and the secret key from enviroment variables
    const { token } = req.params;
    const JWT_SECRET = process.env.JWT_SECRET as string;

    // Ensure their is a validation token (Should not be possible to get here, but who knows ¯\_(ツ)_/¯)
    if (!token) {
      const response: CustomResponse = {
        timestamp: Date.now(),
        message: 'Account verification error',
        code: 400,
      };

      return res.status(400).json(response);
    }

    // Validate the verification token
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    // If we get to this point, congrats your token is valid, find the user by id
    const user = await User.findById(decoded.userId);

    // If there is not user ¯\(◉◡◔)/¯
    if (!user) {
      const response: CustomResponse = {
        timestamp: Date.now(),
        message: 'User not found',
        code: 404,
        errors: [],
      };

      return res.status(404).json(response);
    }

    // check to see if the user is already verfied
    if (user.verifed) {
      return res.status(200).redirect('/login');
    }

    // Update the user's verified status and save to db
    user.verifed = true;
    await user.save();

    // Redirect to login page
    return res.status(200).redirect('/login');
  } catch (error) {
    logger(
      'ERROR',
      `Something went wrong when verifying a account: ${error}`,
      undefined,
      true
    );

    const response: CustomResponse = {
      timestamp: Date.now(),
      message: 'Internal Server Error',
      code: 500,
    };

    return res.status(500).json(response);
  }
};

export default verifyAccountController;
