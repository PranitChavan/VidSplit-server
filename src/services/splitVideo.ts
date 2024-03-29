import path from 'path';
import fs from 'fs';
import { ISplitReqBody } from '../models/types';
import FFmpeg from 'fluent-ffmpeg';
import { logger } from '../Logger/logger';
import { formatDate } from '../utils/utils';

const rootOutputDir = path.join(process.cwd(), 'outputs'); // root outputs folder path

export default async function splitVideo(videoParams: ISplitReqBody): Promise<string> {
  const { videoUrl, chunkDuration, sessionId } = videoParams;

  logger.info('Split process started', { Information: `Split process started for id: ${sessionId}` });

  return new Promise((resolve, reject) => {
    const outputDir = path.join(rootOutputDir, sessionId.toString());
    fs.mkdirSync(path.join(outputDir), { recursive: true }); // create folder in outputs folder, name will be the current sessionId
    const outputPath = path.join(outputDir, 'output-%d.mp4'); // Files in the sessionId folder

    FFmpeg(videoUrl)
      .videoCodec('libx264')
      .audioCodec('aac')
      .outputOptions(['-map 0', '-f segment', `-segment_time ${chunkDuration}`, '-g 30', '-reset_timestamps 1'])
      .output(outputPath)
      .on('end', () => {
        logger.info('Split process completed', { Information: `Split process completed for id: ${sessionId}` });
        resolve('Done');
      })
      .on('error', (err) => {
        logger.info('Split process error', { Information: `Split process failed for id: ${sessionId}: ${err}` });
        reject(err);
      })
      .run();
  });
}
