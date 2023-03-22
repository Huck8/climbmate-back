import mongoose, { Schema } from 'mongoose';

export interface User {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>({
  name: String,
  email: String,
  password: String,
});

export const UserModel = mongoose.model<User>('User', userSchema, 'users');
