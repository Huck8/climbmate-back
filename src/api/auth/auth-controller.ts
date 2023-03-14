import { RequestHandler } from 'express';

import logger from '../../logger.js';
import { UserModel } from '../users/user-schema.js';
import { AuthRequest, LoginResponse } from './auth-types.js';
import { encryptPassword, generateJWTToken } from './auth-utils.js';

export const loginUserController: RequestHandler<
  unknown,
  LoginResponse,
  AuthRequest
> = async (req, res) => {
  const { email, password } = req.body;
  try {
    const filterUser = {
      email,
      password: encryptPassword(password),
    };

    const existingUser = await UserModel.findOne(filterUser).exec();

    if (existingUser === null) {
      return res.sendStatus(404);
    }

    const tokenJWT = generateJWTToken(email);
    res.status(201).json({
      accessToken: tokenJWT,
    });
  } catch (err) {
    logger.error(err);
    res.sendStatus(500);
  }
};
