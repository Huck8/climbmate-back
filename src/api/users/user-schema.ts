import mongoose, { Schema } from 'mongoose';

export interface User {
  email: string;
  password: string;
}

const userSchema = new Schema<User>({
  email: String,
  password: String,
});

export const UserModel = mongoose.model<User>('User', userSchema, 'users');
