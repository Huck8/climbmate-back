import { RequestHandler } from 'express';

import { Excursion, ExcursionModel } from './Excursion-schema.js';

const queryProjection = { __v: 0 };

export const createExcursionController: RequestHandler<
  unknown,
  unknown,
  Excursion
> = async (req, resp) => {
  const excursion: Excursion = {
    ...req.body,
    imgExcursion: resp.locals.picture,
  };
  await ExcursionModel.create(excursion);
  resp.status(201).json(excursion);
};

export const getAllExcursionsController: RequestHandler<
  unknown,
  { excursions: Excursion[] } | { msg: string }
> = async (_req, res, next) => {
  try {
    const foundExcursions = await ExcursionModel.find(
      {},
      queryProjection,
    ).exec();
    res.json({ excursions: foundExcursions });
  } catch (error) {
    next(error);
  }
};
