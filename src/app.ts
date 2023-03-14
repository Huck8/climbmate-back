import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRouter from './api/auth/auth-router.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.disable('x-powered-by');
app.get('/', (req, res) => {
  res.json('Server is working!!');
});

app.use(express.json());
app.use('/auth', authRouter);

export default app;
