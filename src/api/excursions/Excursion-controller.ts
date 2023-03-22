import { RequestHandler } from 'express';

import { Excursion, ExcursionModel } from './Excursion-schema.js';

export const createExcursionController: RequestHandler<
  unknown,
  Excursion | { msg: string },
  Excursion
> = async (req, resp) => {
  const excursion: Excursion = {
    ...req.body,
  };
  await ExcursionModel.create(excursion);
  resp.status(201).json({ msg: 'Your excursion has been created!' });
};

const queryProjection = { __v: 0 };

export const getAllExcursionsController: RequestHandler<
  unknown,
  Excursion[] | { msg: string }
> = async (_req, res, next) => {
  try {
    const foundExcursions = await ExcursionModel.find(
      {},
      queryProjection,
    ).exec();
    res.json(foundExcursions);
  } catch (error) {
    next(error);
  }
};
