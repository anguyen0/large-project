import mongoose, { Schema } from 'mongoose';
import { UserDocument, UserModel } from '../types/User.type';

const UserSchema = new Schema<UserDocument>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
  last_login: { type: Date, default: null },
  verifed: { type: Boolean, default: false },
  locked: { type: Boolean, default: false },
  login_attempts: { type: Number, default: 0 },
});

// Create and export the user model
export const User: UserModel = mongoose.model<UserDocument>('User', UserSchema);
