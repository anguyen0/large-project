import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';

export default async function verifyAccountController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Extract the validation token from the request
    const { validationToken } = req.params;

    // Get the JWT secret used to verify token
    const JWT_SECRET = process.env.JWT_SECRET as string;

    // If there is no validation token present return an error response
    if (!validationToken) {
      return res.status(400).json({
        message:
          'Validation token is required. Please request a verify email and use the provided link',
      });
    }

    // Validate the token
    const decoded = jwt.verify(validationToken, JWT_SECRET) as JwtPayload;

    // Assuming that the token did not throw a error and is valid, get the user id from the token
    const userId = decoded.userId as string;

    // Update the verified status for the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    user.verified = true;
    await user.save();

    // Redirect to login page
    res.redirect('/login');
  } catch (error) {
    console.error(
      `An error occured while validating the user's account: ${error}`
    );

    return res.status(500).json({
      message: 'Failed to verify account',
    });
  }
}
