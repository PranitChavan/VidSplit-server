import { Request, Response, NextFunction } from 'express';
import { ISplitReqBody } from '../models/types';
import uploadChunksToStorage from '../services/uploadChunks';
import deleteChunksFolder from '../utils/deleteChunksFolder';
import { logger } from '../Logger/logger';
import downloadVideoFromUrl from '../utils/downloadVideoFromUrl';
import { Worker } from 'worker_threads';
import path from 'path';

async function initSplitVideoWorker(splitVideoParams: { chunkDuration: string; sessionId: string; videoFilePath: string }, next: NextFunction) {
  return new Promise((resolve, reject) => {
    const workerFile = path.resolve(process.cwd(), 'dist', 'Workers', 'splitVideo.js');
    const splitVideoWorker = new Worker(workerFile, { workerData: { chunkDuration: splitVideoParams.chunkDuration, sessionId: splitVideoParams.sessionId, videoFilePath: splitVideoParams.videoFilePath } });

    splitVideoWorker.on('message', (dataFromWorker) => {
      const { splittingDuration } = dataFromWorker;
      logger.info(`Split process duration took ${splittingDuration} seconds`);
      resolve('Done');
    });

    splitVideoWorker.on('error', (error: Error) => {
      logger.info('Split process error', { Information: `Split process failed for id: ${splitVideoParams.sessionId}: ${error}` });
      reject(error);
    });
  });
}

export async function splitVideoMiddleWare(req: Request, _res: Response, next: NextFunction) {
  const requestBody = <ISplitReqBody>req.body;

  logger.info('Process init', { Information: `Process started for id: ${requestBody.sessionId}`, chunkDuration: requestBody.chunkDuration, url: requestBody.videoUrl });

  try {
    const videoFilePath = await downloadVideoFromUrl(requestBody.videoUrl, requestBody.sessionId);
    await initSplitVideoWorker({ chunkDuration: requestBody.chunkDuration, sessionId: requestBody.sessionId, videoFilePath: videoFilePath }, next);
    await uploadChunksToStorage(requestBody.sessionId);
  } catch (error) {
    console.log('CTACHCHACA');
    console.log(error);
    next(error);
  } finally {
    deleteChunksFolder(requestBody.sessionId);
  }

  next();
}
