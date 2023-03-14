import dotenv from 'dotenv';
import log from './logger.js';
import app from './app.js';

dotenv.config();

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  log.info(`Server started in port ${port}`);
});
