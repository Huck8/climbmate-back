import express from 'express';
import cors from 'cors';

import authRouter from './api/auth/auth-router.js';
import { errorHandler } from './api/utils/errors/error-handler.js';
import apiRouter from './api/api-router.js';
import { authMiddleware } from './api/auth/auth-middleware.js';

const app = express();

app.use(cors());

app.disable('x-powered-by');
app.get('/', (req, res) => {
  res.json('Server is working!!');
});

app.use(express.json());
app.use('/auth', authRouter);
app.use('/api/v1', authMiddleware, apiRouter);
app.use(errorHandler);
export default app;
