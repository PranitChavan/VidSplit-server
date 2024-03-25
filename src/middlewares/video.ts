import { Request, Response, NextFunction } from 'express';
import { ISplitReqBody } from '../models/types';
import splitVideo from '../services/splitVideo';
import uploadChunksToStorage from '../services/uploadChunks';
import deleteChunksFolder from '../utils/deleteChunksFolder';
import { logger } from '../Logger/logger';
import { formatDate } from '../utils/utils';

export async function splitVideoMiddleWare(req: Request, _res: Response, next: NextFunction) {
  const requestBody = <ISplitReqBody>req.body;

  logger.info('Process init', { Information: `Process started for id: ${requestBody.sessionId}`, Timestamp: formatDate(new Date()), chunkDuration: requestBody.chunkDuration, url: requestBody.videoUrl });

  try {
    await splitVideo(requestBody);
    await uploadChunksToStorage(requestBody.sessionId);
    logger.info('Upload Process', { Information: `Upload process completed for id: ${requestBody.sessionId}`, Timestamp: formatDate(new Date()) });
  } catch (error) {
    next(error);
  } finally {
    deleteChunksFolder(requestBody.sessionId);
  }

  next();
}
