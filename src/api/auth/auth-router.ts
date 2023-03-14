import express from 'express';
import { validate } from 'express-validation';
import { loginUserController } from './auth-controller.js';
import authValidation from './entry-validation.js';

const router = express.Router();

router.route('/login').post(validate(authValidation), loginUserController);

export default router;
