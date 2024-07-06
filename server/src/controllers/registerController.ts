import { Request, Response } from 'express';

export default async function registerController(req: Request, res: Response) {
  try {
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
