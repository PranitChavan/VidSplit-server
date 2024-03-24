"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitVideoMiddleWare = void 0;
const splitVideo_1 = __importDefault(require("../services/splitVideo"));
const uploadChunks_1 = __importDefault(require("../services/uploadChunks"));
const deleteChunksFolder_1 = __importDefault(require("../utils/deleteChunksFolder"));
const logger_1 = require("../Logger/logger");
const utils_1 = require("../utils/utils");
async function splitVideoMiddleWare(req, _res, next) {
    const requestBody = req.body;
    logger_1.logger.info('Process init', { information: `Process started for id: ${requestBody.sessionId}`, Timestamp: (0, utils_1.formatDate)(new Date()), chunkDuration: requestBody.chunkDuration, url: requestBody.videoUrl });
    try {
        await (0, splitVideo_1.default)(requestBody);
        await (0, uploadChunks_1.default)(requestBody.sessionId);
        logger_1.logger.info('Upload Process', { information: `Upload process completed for id: ${requestBody.sessionId}`, Timestamp: (0, utils_1.formatDate)(new Date()) });
    }
    catch (error) {
        next(error);
    }
    finally {
        (0, deleteChunksFolder_1.default)(requestBody.sessionId);
    }
    next();
}
exports.splitVideoMiddleWare = splitVideoMiddleWare;
//# sourceMappingURL=video.js.map