import { Request, Response, NextFunction } from 'express';
import { ISplitReqBody } from '../models/types';
import splitVideo from '../services/splitVideo';
import uploadChunksToStorage from '../services/uploadChunks';
import deleteChunksFolder from '../utils/deleteChunksFolder';
import { logger } from '../Logger/logger';
import downloadVideoFromUrl from '../utils/downloadVideoFromUrl';

export async function splitVideoMiddleWare(req: Request, _res: Response, next: NextFunction) {
  const requestBody = <ISplitReqBody>req.body;

  logger.info('Process init', { Information: `Process started for id: ${requestBody.sessionId}`, chunkDuration: requestBody.chunkDuration, url: requestBody.videoUrl });

  try {
    const videoFilePath = await downloadVideoFromUrl(requestBody.videoUrl, requestBody.sessionId);
    await splitVideo(requestBody, videoFilePath);
    await uploadChunksToStorage(requestBody.sessionId);
    logger.info('Upload Process', { Information: `Upload process completed for id: ${requestBody.sessionId}` });
  } catch (error) {
    next(error);
  } finally {
    deleteChunksFolder(requestBody.sessionId);
  }

  next();
}
