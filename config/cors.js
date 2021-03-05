import dotenv from 'dotenv';
import { split } from 'ramda';
import logger from '../logger';

dotenv.config();

const whitelist = split(',', process.env.CORS_WHITELIST);

const corsOptions = {
  origin(origin, callback) {
    logger.info('Request from origin: ', origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

export default corsOptions;
