import { authValidation, registerValidation } from './entry-validation.js';
import express from 'express';
// Aimport { validate } from 'express-validation';
import {
  loginUserController,
  registerUserController,
} from './auth-controller.js';
import { validate } from 'express-validation';

const router = express.Router();

router
  .route('/register')
  .post(validate(registerValidation), registerUserController);
router.route('/login').post(validate(authValidation), loginUserController);

export default router;
