import express, { Express, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import videoRouter from './routes/video';

dotenv.config();
const app: Express = express();

export function init() {
  app.use(
    cors({
      origin: 'http://localhost:5173',
    })
  );

  app.get('/', (_, res: Response) => {
    res.status(200).json({ message: 'Hello, World!' });
  });

  app.use('/api/video', videoRouter);

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}
