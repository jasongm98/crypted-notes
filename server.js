import dotenv from 'dotenv';
import app from './app';
import logger from './logger';
import { database } from './config';
import { dbConstants } from './constants';

dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = dbConstants[process.env.NODE_ENV];

const { PORT } = process.env;

export default database.sync().then(() => {
  logger.info(`Connected to ${DB_NAME} database (${DB_HOST}:${DB_PORT})`);
  app.listen(PORT, () => {
    logger.info(`App listening on port ${PORT}!`);
  });
}).catch((err) => {
  logger.error(err, 'Error launching APP');
});
