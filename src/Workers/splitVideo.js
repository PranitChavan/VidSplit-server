const path = require('path');
const fs = require('fs');
const FFmpeg = require('fluent-ffmpeg');
const pathToFfmpeg = require('ffmpeg-static');
const { workerData, parentPort } = require('worker_threads');

FFmpeg.setFfmpegPath(pathToFfmpeg);

const rootOutputDir = path.join(process.cwd(), 'outputs'); // root outputs folder path

async function splitVideo() {
  const { chunkDuration, sessionId, videoFilePath } = workerData;

  return new Promise((resolve, reject) => {
    const outputDir = path.join(rootOutputDir, sessionId.toString(), 'Chunks');
    fs.mkdirSync(path.join(outputDir), { recursive: true });
    const outputPath = path.join(outputDir, 'output-%d.mp4');
    let splitVideoStartTimeStamp;

    FFmpeg(videoFilePath)
      .videoCodec('libx264')
      .audioCodec('aac')
      .outputOptions(['-map 0', '-f segment', `-segment_time ${chunkDuration}`, '-g 30', '-reset_timestamps 1'])
      .output(outputPath)
      .on('end', () => {
        const splittingDuration = (new Date().getTime() - splitVideoStartTimeStamp.getTime()) / 1000;
        parentPort.postMessage({ splittingDuration: splittingDuration });
        resolve('Done');
      })
      .on('error', (err) => {
        reject(err);
      })
      .on('start', () => {
        splitVideoStartTimeStamp = new Date();
      })
      .run();
  });
}

splitVideo();
