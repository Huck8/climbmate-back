import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ExcursionModel } from './Excursion-schema';
import {
  createExcursionController,
  getAllExcursionsController,
  getExcursionByIdController,
} from './Excursion-controller';
import { CustomHTTPError } from '../utils/errors/custom-http-error';

describe('Given a controller to create excursions', () => {
  const request = {
    body: {
      _id: new mongoose.Types.ObjectId('123456789123456789123456'),
      // NameExcursion: 'string',
      // date: Date,
      // difficultyLevel: 'string',
      // needEquipment: true,

      nameExcursion: 'string',
      date: Date,
      difficultyLevel: 'string',
      needEquipment: true,
      creator: 'string',
    },

    imgExcursion: { buffer: Buffer.from('mockBuffer') },
  } as Partial<Request>;

  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    locals: {
      email: 'example@example.com',
    },
  } as Partial<Response>;

  describe('When the user wants to create his excursion', () => {
    test('Then he should do it', async () => {
      ExcursionModel.create = jest.fn().mockResolvedValue(request);

      await createExcursionController(
        request as Request,
        response as Response,
        jest.fn(),
      );

      expect(ExcursionModel.create).toHaveBeenCalledWith({
        ...request.body,
      });

      expect(response.status).toHaveBeenCalledWith(201);
    });
  });
});

describe('Given a controller to get all excursions', () => {
  const request = {} as Request;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;
  const next = jest.fn();

  const excursion = [
    {
      // NameExcursion: 'Moclin',
      // date: Date,
      // difficultyLevel: 'Hard',
      // needEquipment: 'true',

      nameExcursion: 'Moclin',
      date: Date,
      difficultyLevel: 'Hard',
      needEquipment: 'true',
      creator: 'string',
    },
  ];

  describe('When the user wants get all excursions', () => {
    test('Then should get all excursions', async () => {
      ExcursionModel.find = jest.fn().mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue(excursion),
      }));

      await getAllExcursionsController(
        request as Request,
        response as Response,
        next,
      );

      expect(response.json).toHaveBeenCalledWith({
        excursions: excursion,
      });
    });

    test('when an error is thrown, it should be passed on to be handled', async () => {
      ExcursionModel.find = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockRejectedValue(null) });

      await getAllExcursionsController(
        request as Request,
        response as Response,
        next,
      );

      expect(next).toHaveBeenCalled();
    });
  });
});

describe('Given a getByIdcontroller business', () => {
  const request = {
    params: { id: 'mockId' },
  } as Partial<Request>;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;
  const next = jest.fn();

  const excursion = [
    {
      // NameExcursion: 'Moclin',
      // date: Date,
      // difficultyLevel: 'Hard',
      // needEquipment: 'true',

      nameExcursion: 'Moclin',
      date: Date,
      difficultyLevel: 'Hard',
      needEquipment: 'true',
      creator: 'string',
    },
  ];
  ExcursionModel.findById = jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockResolvedValue(excursion),
  }));

  describe('When the user tries to search for a excursion by id', () => {
    test('Then it should be found', async () => {
      await getExcursionByIdController(
        request as Request,
        response as Response,
        next,
      );

      expect(response.json).toHaveBeenCalledWith(excursion);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(ExcursionModel.findById).toHaveBeenCalledWith('mockId');
    });
  });
  describe('When the user tries to search  for a excursion by id and dont exist', () => {
    test('Then it should recived a 404 error', async () => {
      ExcursionModel.findById = jest.fn().mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue(null),
      }));
      await getExcursionByIdController(
        request as Request,
        response as Response,
        next,
      );
      expect(next).toHaveBeenCalledWith(
        new CustomHTTPError(404, 'The excursion does not exist'),
      );
    });
  });
});
