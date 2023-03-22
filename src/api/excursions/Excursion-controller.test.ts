import { Request, Response, NextFunction } from 'express';
import { createExcursionController } from './Excursion-controller';
import { Excursion, ExcursionModel } from './Excursion-schema';

describe('Given a controller to create excursions', () => {
  const next = jest.fn();

  const request = {
    nameExcursion: 'Moclin',
    date: Date,
    difficultyLevel: 'Hard',
    needEquipment: 'true',
  } as Partial<Request>;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response<Excursion | { msg: string }>>;

  ExcursionModel.create = jest.fn().mockResolvedValue(response);

  test('When the database response is successfull it, then it should respond with a message', async () => {
    await createExcursionController(
      request as Request,
      response as Response,
      next as NextFunction,
    );

    await expect(response.status).toHaveBeenCalledWith(201);
  });
});
