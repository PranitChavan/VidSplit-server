import express, { Request, Response, NextFunction } from 'express';
import { splitVideoMiddleWare } from '../middlewares/video';
import { errorHandler } from '../middlewares/error-handler';

const videoRouter = express.Router();
videoRouter.use(express.json());

videoRouter.post('/split', splitVideoMiddleWare, (req: Request, res: Response) => {
  res.send({ message: 'done' });
});

videoRouter.use(errorHandler);

export default videoRouter;
