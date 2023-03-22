import express from 'express';
import {
  createExcursionController,
  getAllExcursionsController,
} from './Excursion-controller.js';

export const excursionRouter = express.Router();

excursionRouter
  .route('/')
  .post(createExcursionController)
  .get(getAllExcursionsController);
