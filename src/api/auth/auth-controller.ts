import { RequestHandler } from 'express';

import { UserModel } from '../users/user-schema.js';
import { CustomHTTPError } from '../utils/errors/custom-http-error.js';
import { AuthRequest, LoginResponse } from './auth-types.js';
import { encryptPassword, generateJWTToken } from './auth-utils.js';

export const loginUserController: RequestHandler<
  unknown,
  LoginResponse,
  AuthRequest
> = async (req, res, next) => {
  const { email, password } = req.body;

  const filterUser = {
    email,
    password: encryptPassword(password),
  };

  const existingUser = await UserModel.findOne(filterUser).exec();

  if (existingUser === null) {
    return next(new CustomHTTPError(404, 'User or password does no exists'));
  }

  const tokenJWT = generateJWTToken(email);
  res.status(201).json({
    accessToken: tokenJWT,
  });
};
