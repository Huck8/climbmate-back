import { RequestHandler } from 'express';

import { Excursion, ExcursionModel } from './Excursion-schema.js';
import { CustomHTTPError } from '../utils/errors/custom-http-error.js';

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

export const getExcursionByIdController: RequestHandler = async (
  req,
  res,
  next,
) => {
  const { id } = req.params;

  const excursion = await ExcursionModel.findById(id).exec();
  if (excursion === null) {
    return next(new CustomHTTPError(404, 'The excursion does not exist'));
  }

  res.status(200).json(excursion);
};
