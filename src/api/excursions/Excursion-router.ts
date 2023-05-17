import express from 'express';
import { validate } from 'express-validation';

import { excursionValidation } from '../auth/entry-validation.js';
import {
  createExcursionController,
  getAllExcursionsController,
  getExcursionByIdController,
} from './Excursion-controller.js';
import { upload } from './image-upload-middleware.js';
import { supabaseMiddleware } from './supabase-middleware.js';

export const excursionRouter = express.Router();

excursionRouter
  .route('/')
  .post(
    validate(excursionValidation),
    upload.single('excursion'),
    supabaseMiddleware,
    createExcursionController,
  )
  .get(getAllExcursionsController);

excursionRouter.route('/:id').get(getExcursionByIdController);
