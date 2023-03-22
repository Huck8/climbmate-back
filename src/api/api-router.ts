import express from 'express';
import { excursionRouter } from './excursions/Excursion-router.js';

const apiRouter = express.Router();
apiRouter.use('/Excursion', excursionRouter);
export default apiRouter;
