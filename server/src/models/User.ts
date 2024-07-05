import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },

  last_name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  verified: {
    type: Boolean,
    default: false,
  },

  locked: {
    type: Boolean,
    default: false,
  },

  login_attempts: {
    type: Number,
    default: 0,
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },

  last_login: {
    type: Date,
    default: null,
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
