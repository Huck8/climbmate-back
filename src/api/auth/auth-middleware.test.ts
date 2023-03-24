import jwt from 'jsonwebtoken';
import { authMiddleware } from '../auth/auth-middleware';

import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { CustomHTTPError } from '../utils/errors/custom-http-error.js';
dotenv.config();

describe('Given an authMiddleware function', () => {
  test('When no JWT token is provided, then it should throw an 401 error', () => {
    const mockReq = { headers: {} } as Request;
    const mockRes = {} as Response;
    const mockNext = jest.fn() as NextFunction;

    expect(() => {
      authMiddleware(mockReq, mockRes, mockNext);
    }).toThrow(new CustomHTTPError(401, 'Unauthorized'));
  });

  test('When a JWT_SECRET environment variable is not defined, then it should throw an 500 error', () => {
    const mockReq = {
      headers: { authorization: 'Bearer jwtToken' },
    } as Request;
    const mockRes = {} as Response;
    const mockNext = jest.fn() as NextFunction;
    process.env.JWT_SECRET = '';

    expect(() => {
      authMiddleware(mockReq, mockRes, mockNext);
    }).toThrow(
      new CustomHTTPError(
        500,
        'JWT_SECRET environment variable is not defined',
      ),
    );
  });

  test('When a JWT token is provided and valid, then it should set res.locals.email and call next', () => {
    const email = 'angel@gmail.com';
    process.env.JWT_SECRET = 'secret';
    const jwtToken = jwt.sign({ email }, process.env.JWT_SECRET!);
    const mockReq = {
      headers: { authorization: `Bearer ${jwtToken}` },
    } as Request;
    const mockRes = { locals: {} } as Response;
    const mockNext = jest.fn() as NextFunction;

    authMiddleware(mockReq, mockRes, mockNext);

    expect(mockRes.locals.email).toBe(email);
    expect(mockNext).toHaveBeenCalled();
  });
});
