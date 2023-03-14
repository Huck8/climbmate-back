import express from 'express';
import { loginUserController } from './auth-controller.js';

const router = express.Router();

router.route('/login').post(loginUserController);

export default router;
