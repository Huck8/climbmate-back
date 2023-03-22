import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import {
  createExcursionController,
  getAllExcursionsController,
} from './Excursion-controller';
import { Excursion, ExcursionModel } from './Excursion-schema';

describe('Given a controller to create excursions', () => {
  const next = jest.fn();

  const request = {
    _id: new mongoose.Types.ObjectId('123456789123456789123456'),
    nameExcursion: 'Moclin',
    date: Date,
    difficultyLevel: 'Hard',
    needEquipment: 'true',
  } as Partial<Request>;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response<Excursion[] | { msg: string }>>;

  ExcursionModel.create = jest.fn().mockResolvedValue(response);

  test('When the database response is successfull it, then it should respond with a message', async () => {
    await createExcursionController(
      request as Request,
      response as Response,
      next as NextFunction,
    );

    await expect(response.status).toHaveBeenCalledWith(201);
  });

  describe('Given a controller to get all projects', () => {
    const mockRequest = {} as Partial<Request>;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;

    const next = jest.fn();

    const mockProjects = {
      nameExcursion: 'Moclin',
      date: Date,
      difficultyLevel: 'Hard',
      needEquipment: 'true',
    };

    test('when the database response is successful, the user should receive a list of projects', async () => {
      ExcursionModel.find = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(mockProjects) });

      await getAllExcursionsController(
        mockRequest as Request,
        mockResponse as Response,
        next,
      );

      expect(mockResponse.json).toHaveBeenCalledWith(mockProjects);
    });

    test('when an error is thrown, it should be passed on to be handled', async () => {
      ExcursionModel.find = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockRejectedValue(null) });

      await getAllExcursionsController(
        mockRequest as Request,
        mockResponse as Response,
        next,
      );

      expect(next).toHaveBeenCalled();
    });
  });
});
