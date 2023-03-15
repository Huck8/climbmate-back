import { Request, Response } from 'express';
import { encryptPassword, generateJWTToken } from './auth-utils';
import { UserModel } from '../users/user-schema';
import { loginUserController } from './auth-controller';

describe('Given a login controller', () => {
  const request = {
    body: {
      email: 'angel@gmail.com',
      password: 'hola',
    },
  } as Partial<Request>;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    sendStatus: jest.fn(),
  } as Partial<Response>;
  const tokenJWT = {
    accessToken: generateJWTToken(request.body.email),
  };
  const encrypRequest = {
    email: 'angel@gmail.com',
    password: encryptPassword('hola'),
  };
  test('When the user tries to login and the response is successful, a token is returned', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(1),
    }));
    await loginUserController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(UserModel.findOne).toHaveBeenCalledWith(encrypRequest);
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith(tokenJWT);
  });

  test('When the user tries to login and the user is not found, a 404 is returned', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(null),
    }));
    await loginUserController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.sendStatus).toHaveBeenCalledWith(404);
  });
});
