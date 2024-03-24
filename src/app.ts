import express, { Express, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { splitVideoMiddleWare } from './middlewares/video';
import { errorHandler } from './middlewares/error-handler';
import { logger } from './Logger/logger';
import { formatDate } from './utils/utils';

dotenv.config();
const app: Express = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use(express.json());

app.get('/health', (_req, res: Response) => {
  logger.info('Health check', { Information: 'Performing health check.' });
  res.status(200).json({ message: 'Working fine!', Timestamp: formatDate(new Date()) });
});

app.post('/api/video/split', splitVideoMiddleWare, (req, res: Response) => {
  logger.info('Request completed', { Information: `Process completed for id: ${req.body.sessionId}`, Timestamp: formatDate(new Date()) });
  res.send({ message: 'done' });
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  logger.info('Init', { Information: `Server started on port ${process.env.PORT}`, Timestamp: formatDate(new Date()) });
});
