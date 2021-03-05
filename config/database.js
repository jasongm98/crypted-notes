import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { dbConstants } from '../constants';

dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD
} = dbConstants[process.env.NODE_ENV];

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  define: {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  },
  timezone: 'Europe/Madrid',
});

export default sequelize;
