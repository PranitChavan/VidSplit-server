"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const logger_1 = require("../Logger/logger");
const utils_1 = require("../utils/utils");
const rootOutputDir = path_1.default.join(process.cwd(), 'outputs'); // root outputs folder path
async function splitVideo(videoParams) {
    const { videoUrl, chunkDuration, sessionId } = videoParams;
    logger_1.logger.info('Split process started', { information: `Split process started for id: ${sessionId}`, Timestamp: (0, utils_1.formatDate)(new Date()) });
    return new Promise((resolve, reject) => {
        const outputDir = path_1.default.join(rootOutputDir, sessionId.toString());
        fs_1.default.mkdirSync(path_1.default.join(outputDir), { recursive: true }); // create folder in outputs folder, name will be the current sessionId
        const outputPath = path_1.default.join(outputDir, 'output-%d.mp4'); // Files in the sessionId folder
        (0, fluent_ffmpeg_1.default)(videoUrl)
            .videoCodec('libx264')
            .audioCodec('aac')
            .outputOptions(['-map 0', '-f segment', `-segment_time ${chunkDuration}`, '-g 30', '-reset_timestamps 1'])
            .output(outputPath)
            .on('end', () => {
            logger_1.logger.info('Split process completed', { information: `Split process completed for id: ${sessionId}`, Timestamp: (0, utils_1.formatDate)(new Date()) });
            resolve('Done');
        })
            .on('error', (err) => {
            logger_1.logger.error('Split process error', { information: `Split process failed for id: ${sessionId}: ${err}`, Timestamp: (0, utils_1.formatDate)(new Date()) });
            reject(err);
        })
            .run();
    });
}
exports.default = splitVideo;
//# sourceMappingURL=splitVideo.js.map