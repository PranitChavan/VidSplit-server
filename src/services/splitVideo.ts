import path from 'path';
import fs from 'fs';
import { ISplitReqBody } from '../models/types';
import FFmpeg from 'fluent-ffmpeg';
import { logger } from '../Logger/logger';
import pathToFfmpeg from 'ffmpeg-static';

FFmpeg.setFfmpegPath(pathToFfmpeg);

const rootOutputDir = path.join(process.cwd(), 'outputs'); // root outputs folder path

export default async function splitVideo(videoParams: ISplitReqBody, videoFilePath: string): Promise<string> {
  const { chunkDuration, sessionId } = videoParams;

  let splitVideoStartTimeStamp: Date;

  logger.info('Split process started', { Information: `Split process started for id: ${sessionId}` });

  return new Promise((resolve, reject) => {
    const outputDir = path.join(rootOutputDir, sessionId.toString(), 'Chunks');
    fs.mkdirSync(path.join(outputDir), { recursive: true });
    const outputPath = path.join(outputDir, 'output-%d.mp4');

    FFmpeg(videoFilePath)
      .videoCodec('libx264')
      .audioCodec('aac')
      .outputOptions(['-map 0', '-f segment', `-segment_time ${chunkDuration}`, '-g 30', '-reset_timestamps 1'])
      .output(outputPath)
      .on('end', () => {
        if (splitVideoStartTimeStamp) {
          const splittingDuration = (new Date().getTime() - splitVideoStartTimeStamp.getTime()) / 1000;
          logger.info(`Split process duration took ${splittingDuration} seconds`);
        }
        logger.info('Split process completed', { Information: `Split process completed for id: ${sessionId}` });
        resolve('Done');
      })
      .on('error', (err, stdout, stderr) => {
        logger.info('Split process error', { Information: `Split process failed for id: ${sessionId}: ${err} ${stdout} ${stderr}` });
        reject(err);
      })
      .on('start', () => {
        splitVideoStartTimeStamp = new Date();
      })
      .run();
  });
}
