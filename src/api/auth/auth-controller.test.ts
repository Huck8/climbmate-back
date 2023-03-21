import { Request, Response } from 'express';
import { encryptPassword, generateJWTToken } from './auth-utils';
import { UserModel } from '../users/user-schema';
import { loginUserController, registerUserController } from './auth-controller';
import { CustomHTTPError } from '../utils/errors/custom-http-error';

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
  const next = jest.fn();

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
    await loginUserController(request as Request, response as Response, next);

    expect(next).toHaveBeenCalledWith(
      new CustomHTTPError(404, 'User or password does no exists'),
    );
  });
});

describe('Given a registerUserController', () => {
  const request = {
    body: {
      name: 'antonio',
      email: 'antonio@gmail.com',
      password: 'secreto123',
    },
  } as Partial<Request>;

  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    sendStatus: jest.fn(),
  } as Partial<Response>;

  const next = jest.fn();

  const userRegister = {
    ...request.body,
    password: encryptPassword('secreto123'),
  };

  test('When the user does not exits, it shoud be responde with status 201', async () => {
    UserModel.create = jest.fn();

    await registerUserController(
      request as Request,
      response as Response,
      next,
    );
    expect(UserModel.create).toBeCalledWith(userRegister);
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({
      msg: 'User has been successfully registered',
    });
  });

  test('When the user exits, it should be respond with a with status 409', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(userRegister),
    }));

    await registerUserController(
      request as Request,
      response as Response,
      next,
    );
    expect(next).toHaveBeenCalledWith(
      new CustomHTTPError(
        409,
        'A user account already exits with this email address',
      ),
    );
  });
});
