import express, { Express, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { splitVideoMiddleWare } from './middlewares/video';
import { errorHandler } from './middlewares/error-handler';
import { logger } from './Logger/logger';

dotenv.config();
const app: Express = express();

const allowedOrigins: string[] = ['https://www.vidsplitter.online', 'https://vidsplit-dev.vercel.app'];

app.use(
  cors({
    origin: process.env.NODE_ENV ? allowedOrigins : '*',
  })
);

app.use(express.json());

app.get('/health', (_req, res: Response) => {
  logger.info('Health check', { Information: 'Performing health check.' });
  res.status(200).json({ message: 'Working fine!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' });
});

app.post('/api/video/split', splitVideoMiddleWare, (req, res: Response) => {
  logger.info('Request completed', { Information: `Process completed for id: ${req.body.sessionId}` });
  res.send({ message: 'done' });
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  logger.info('Init', { Information: `Server started on port ${process.env.PORT}` });
});
