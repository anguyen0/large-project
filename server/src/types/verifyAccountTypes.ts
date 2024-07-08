import mongoose from 'mongoose';

export interface DecodedToken {
  userId: mongoose.Types.ObjectId;
  email: string;
  iat: number;
  exp: number;
  purpose: string;
}
