import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

export default function createVerificationToken(
  userId: mongoose.Types.ObjectId,
  email: String,
  experationMinutes: number = 15
) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + experationMinutes * 60;

  const payload = { userId, email, iat, exp, purpose: 'email_verification' };

  const JWT_SECRET = process.env.JWT_SECRET as string;

  const token = jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256' });

  return token;
}
