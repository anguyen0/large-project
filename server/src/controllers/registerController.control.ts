import { Request, Response } from 'express';
import {
  RegisterFields,
  RegisterResponse,
} from '../types/registerRequest.type';
import { UserDocument } from '../types/User.type';
import { User } from '../models/User.model';
import bcrpyt from 'bcrypt';
import logger from '../utils/logger.util';

const registerController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Get the users request fields from the request body
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      confirm_password,
    }: RegisterFields = req.body;

    // check to see if the username and/or email address is already in use
    const existingUser: UserDocument | null = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      const response: RegisterResponse = {
        timestamp: Date.now(),
        message: 'Confict Error',
        code: 409,
        errors: [],
      };

      if (existingUser.email === email) {
        response.errors?.push({ field: 'email', message: 'Email is taken' });
      }

      if (existingUser.username === username) {
        response.errors?.push({
          field: 'username',
          message: 'Username is taken',
        });
      }

      return res.status(409).json(response);
    }

    // Hash the user's password for safe storgae
    const hash = await bcrpyt.hash(password, 10);

    // Create the new user object
    const user: UserDocument = new User({
      first_name,
      last_name,
      username,
      email,
      password: hash,
    });

    // Save the new user to the database
    await user.save();

    // Send a verify email to the new user

    // Return success message
    const response: RegisterResponse = {
      timestamp: Date.now(),
      message: 'User Registered Successfully',
      code: 200,
    };

    return res.status(200).json(response);
  } catch (error) {
    logger(
      'ERROR',
      `Something went wrong while registering a new user: ${error}`,
      undefined,
      true
    );

    const response: RegisterResponse = {
      timestamp: Date.now(),
      message: 'Internal Server Error',
      code: 500,
      errors: [],
    };

    return res.status(500).json(response);
  }
};

export default registerController;
