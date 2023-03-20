import express from 'express';
// Aimport { validate } from 'express-validation';
import { loginUserController } from './auth-controller.js';
// Aimport authValidation from './auth-validation.js';

const router = express.Router();

router.route('/login').post(loginUserController);

export default router;
