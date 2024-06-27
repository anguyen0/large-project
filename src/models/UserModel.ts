import mongoose, { Document, Schema } from 'mongoose';

export interface UserModel extends Document {

    first_name:     string;
    last_name:      string;
    email:          string;
    username:       string;
    password:       string;
    verifed:        boolean;
    locked:         boolean;
    login_attempts: number;
    created_at:     Date;
    last_login:     Date;
    
};

const UserSchema = new Schema<UserModel>({

    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    verifed: {
        type: Boolean,
        default: false
    },

    locked: {
        type: Boolean,
        default: false
    },

    login_attempts: {
        type: Number,
        default: 0
    },

    created_at: {
        type: Date,
        default: Date.now()
    },

    last_login: {
        type: Date,
        default: null
    }

});

const User = mongoose.model<UserModel>('User', UserSchema);

export default User;