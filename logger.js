import bunyan from 'bunyan';
import PrettyStream from 'bunyan-prettystream';
import dotenv from 'dotenv';

dotenv.config();

const prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

export default bunyan.createLogger({
  name: process.env.PROJECT_NAME || process.env.npm_package_name,
  streams: [{
    level: 'debug',
    type: 'raw',
    stream: prettyStdOut,
  }],
});
