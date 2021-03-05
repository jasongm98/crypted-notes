import { json, urlencoded } from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import csrf from 'csurf';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import { createServer } from 'http';
import { join } from 'path';
import { corsOptions } from './config';
import { httpCodes } from './helpers';
import { apiRoutes, interfaceRoutes } from './routes';
import { errorResponse } from './utils';

dotenv.config();

const app = express();

const server = createServer(app);

app.set('view engine', 'pug');
app.use(helmet());
app.use(compression());
app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/api/v1', cors(corsOptions), apiRoutes);
app.options('/api/v1', cors());

app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.use(express.static(join(__dirname, 'public')));

app.use('/', interfaceRoutes);

app.use('/api/*', (req, res) => {
  errorResponse(res, {
    code: httpCodes.HTTP_NOT_FOUND,
    message: `Page not found : ${req.baseUrl}`,
    customMessage: `Page not found : ${req.baseUrl}`,
  });
});

export default server;
