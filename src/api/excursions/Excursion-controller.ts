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
