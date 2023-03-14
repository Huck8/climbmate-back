import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.disabled('x-powered-by');

app.get('/', (req, res) => {
  res.json({ hello: 'Server is working!!' });
});
app.use(express.json());

export default app;
