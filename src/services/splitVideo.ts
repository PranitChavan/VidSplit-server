import path from 'path';
import fs from 'fs';
import { ISplitReqBody } from '../models/types';
import Ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

Ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const rootOutputDir = path.join(process.cwd(), 'outputs'); // root outputs folder path

export default async function splitVideo(videoParams: ISplitReqBody): Promise<string> {
  const { videoUrl, chunkDuration, sessionId } = videoParams;

  return new Promise((resolve, reject) => {
    const outputDir = path.join(rootOutputDir, sessionId.toString());
    fs.mkdirSync(path.join(outputDir), { recursive: true }); // create folder in outputs folder, name will be the current sessionId
    const outputPath = path.join(outputDir, 'output-%d.mp4'); // Files in the sessionId folder

    Ffmpeg(videoUrl)
      .videoCodec('libx264')
      .audioCodec('aac')
      .outputOptions(['-map 0', '-f segment', `-segment_time ${chunkDuration}`, '-g 30', '-reset_timestamps 1'])
      .output(outputPath)
      .on('end', () => {
        resolve('Done');
      })
      .on('error', (err) => {
        reject(err);
      })
      .run();
  });
}
