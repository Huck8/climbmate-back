import { Request, Response } from 'express';
import { ValidationError } from 'express-validation';
import { CustomHTTPError } from './custom-http-error.js';

import { errorHandler } from './error-handler.js';

describe('Given an errorHandler', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
  });

  test('It should return a status code 500 (server error) and an error message if the error is not a validation error.', () => {
    const mockError = new Error('An error occurred');

    errorHandler(
      mockError,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith('An error occurred');
  });

  test('should handle ValidationError', () => {
    const mockError = new ValidationError({}, { statusCode: 400 });
    const expectedResponse = {
      statusCode: 400,
      message: 'Validation Error',
      error: mockError.details,
    };

    errorHandler(
      mockError,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(
      expectedResponse.statusCode,
    );
    expect(nextFunction).not.toHaveBeenCalled();
  });
  test('When there is an error of type customHTTPError', () => {
    const mockError = new CustomHTTPError(400, 'Custom error message');
    const expectedResponse = {
      httpCode: 400,
      message: 'CustomHTTPError Error',
      error: mockError.toBodyJSON,
    };

    errorHandler(
      mockError,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(expectedResponse.httpCode);
    expect(nextFunction).not.toHaveBeenCalled();
  });
});
