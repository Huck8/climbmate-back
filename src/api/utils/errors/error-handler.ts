import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'express-validation';
import { CustomHTTPError } from './custom-http-error.js';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ValidationError) {
    return res
      .status(err.statusCode)
      .json({ msg: err.details.body?.[0].message ?? err.message });
  }

  if (err instanceof CustomHTTPError) {
    return res.status(err.httpCode).json(err.toBodyJSON());
  }

  return res.status(500).json(err.message);
};
