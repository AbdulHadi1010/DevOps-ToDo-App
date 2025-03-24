import * as winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(), // Logs to stdout
    new winston.transports.File({ filename: 'logs/app.log' }), // Logs to a file
  ],
});

export default logger;