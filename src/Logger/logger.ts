// import { createLogger, format, transports } from 'winston';
// import path from 'path';

// // Imports the Google Cloud client library for Winston
// import { LoggingWinston } from '@google-cloud/logging-winston';

// const { combine, json, prettyPrint, colorize } = format;

// export const logger = createLogger({
//   format: combine(json(), prettyPrint(), colorize()),
//   transports: [new transports.File({ filename: path.join(process.cwd(), 'Logs', 'logs.log') })],
// });

import winston from 'winston';

// Imports the Google Cloud client library for Winston
import { LoggingWinston } from '@google-cloud/logging-winston';

const loggingWinston = new LoggingWinston();

// Create a Winston logger that streams to Cloud Logging
// Logs will be written to: "projects/YOUR_PROJECT_ID/logs/winston_log"
export const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    // Add Cloud Logging
    loggingWinston,
  ],
});
