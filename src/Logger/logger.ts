import { createLogger, format, transports } from 'winston';
import path from 'path';

const { combine, json, prettyPrint, colorize } = format;

export const logger = createLogger({
  format: combine(json(), prettyPrint(), colorize()),
  transports: [new transports.File({ filename: path.join(process.cwd(), 'Logs', 'logs.log') })],
});
