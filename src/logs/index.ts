import winston from 'winston';
import { SERVICE_NAME } from '../configs';

const { combine, timestamp, printf, colorize, align } = winston.format;

export const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
  ),
  defaultMeta: {
    service: SERVICE_NAME,
  },
  transports: [
    new winston.transports.File({
      filename: 'logs.log',
    }),
    new winston.transports.File({
      level: 'error',
      filename: 'logs_error.log',
    }),
    new (winston.transports.Console)({
      level: 'info',
      format: combine(
        colorize({ all: true }),
        align(),
      ),
    }),
  ],
});
