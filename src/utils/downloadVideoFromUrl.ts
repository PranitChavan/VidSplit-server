import { logger } from '../Logger/logger';
import path from 'path';
import fs from 'fs';

export default async function downloadVideoFromUrl(videoUrl: string, sessionId: string): Promise<string> {
  try {
    const response = await fetch(videoUrl);
    if (!response.ok) {
      logger.info('Unable to download video', { videoUrl: videoUrl });
      throw new Error('Unable to download video from provided url!');
    }

    logger.info('Video downloaded successfully', { videoUrl: videoUrl });

    return await writeFileToDisk(response, sessionId);
  } catch (err) {
    throw new Error(err);
  }
}

async function writeFileToDisk(response: Response, sessionId: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const videoData = await response.arrayBuffer();

    const rootOutputDir = path.join(process.cwd(), 'outputs');
    const outputDir = path.join(rootOutputDir, sessionId.toString());
    fs.mkdirSync(path.join(outputDir), { recursive: true });

    const videoFileName = path.basename(`${sessionId}.mp4`);
    const videoFilePath = path.join(outputDir, videoFileName);
    const fileStream = fs.createWriteStream(videoFilePath);

    fileStream.on('error', (err) => {
      logger.info('Failed to write video to disk', { err: err });
      reject(err);
    });

    fileStream.write(Buffer.from(videoData));
    fileStream.end();

    fileStream.on('finish', () => {
      resolve(videoFilePath);
    });
  });
}
