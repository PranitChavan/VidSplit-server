import { Request, Response, NextFunction } from 'express';
import { ISplitReqBody } from '../models/types';
import splitVideo from '../services/splitVideo';
import uploadChunksToStorage from '../services/uploadChunks';
import deleteChunksFolder from '../utils/deleteChunksFolder';

export async function splitVideoMiddleWare(req: Request, _res: Response, next: NextFunction) {
  const requestBody = <ISplitReqBody>req.body;

  try {
    await splitVideo(requestBody);
    await uploadChunksToStorage(requestBody.sessionId);
  } catch (error) {
    next(error);
  } finally {
    deleteChunksFolder(requestBody.sessionId);
  }

  next();
}
