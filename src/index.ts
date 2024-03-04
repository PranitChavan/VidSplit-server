import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import videoRouter from './routes/video';

dotenv.config();
const app: Express = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use('/api/video', videoRouter);

app.listen(process.env.PORT);

export default app;
