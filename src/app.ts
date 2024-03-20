import express, { Express, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { splitVideoMiddleWare } from './middlewares/video';
import { errorHandler } from './middlewares/error-handler';

dotenv.config();
const app: Express = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use(express.json());

app.get('/health', (_req, res: Response) => {
  res.status(200).json({ message: 'Hello, World! Working fine!' });
});

app.post('/api/video/split', splitVideoMiddleWare, (_req, res: Response) => {
  res.send({ message: 'done' });
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
