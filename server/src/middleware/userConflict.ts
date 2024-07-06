import { Request, Response, NextFunction } from 'express';
import ErrorResponse from '../interfaces/ErrorResponse';
import User from '../models/User';

export default async function userConflict(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Extract the email address and the username from the request body
    const { email, username } = req.body;

    const errorResponse: ErrorResponse = {
      timestamp: Date.now(),
      message: 'Conflict error',
      code: 409,
      fields: {},
    };

    // Check to see if the email address is already in use by another user
    const emailCheck = await User.findOne({ email });

    if (emailCheck) {
      errorResponse.fields['email'] = ['Email address already in use'];
    }

    // Check to see if the username is already in use by another user
    const usernameCheck = await User.findOne({ username });

    if (usernameCheck) {
      errorResponse.fields['username'] = ['Username already in use'];
    }

    // If any conflicts occured return a error response
    if (Object.keys(errorResponse.fields).length > 0) {
      return res.status(409).json(errorResponse);
    }

    next();
  } catch (error) {}
}
