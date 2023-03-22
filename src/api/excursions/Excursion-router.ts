import express from 'express';
import { createExcursionController } from './Excursion-controller.js';

export const excursionRouter = express.Router();

excursionRouter.route('/').post(createExcursionController);
