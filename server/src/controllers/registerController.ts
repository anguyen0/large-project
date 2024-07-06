import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import User from '../models/User';

export default async function registerController(req: Request, res: Response) {
  try {
    // Exract the register fields from the request body
    const { first_name, last_name, username, email, password } = req.body;

    // Hash the user's password using bcrypt
    const hash = await bcrypt.hash(password, 10);

    // Create the new user
    const user = new User({
      first_name,
      last_name,
      username,
      email,
      password: hash,
    });

    // Save the new user to the db
    await user.save();

    res.status(200).json({
      timestamp: Date.now(),
      message: 'User registered successfully',
      code: 200,
    });
  } catch (error) {
    console.error(`Failed to register user: ${error}`);

    res.status(500).json({
      timestamp: Date.now(),
      message: 'Failed to register user',
      code: 500,
    });
  }
}
