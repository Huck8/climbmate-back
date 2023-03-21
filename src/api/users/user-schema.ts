import mongoose, { Schema } from 'mongoose';

export interface User {
  name: string;
  email: string;
  password: string;
  imageURL: string | undefined;
}

export type UserRegistration = Pick<User, 'name' | 'email' | 'password'>;

const userSchema = new Schema<User>({
  name: String,
  email: String,
  password: String,
  imageURL: String,
});

export const UserModel = mongoose.model<User>('User', userSchema, 'users');
