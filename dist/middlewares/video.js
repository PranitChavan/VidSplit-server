"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitVideoMiddleWare = void 0;
const splitVideo_1 = __importDefault(require("../services/splitVideo"));
const uploadChunks_1 = __importDefault(require("../services/uploadChunks"));
const deleteChunksFolder_1 = __importDefault(require("../utils/deleteChunksFolder"));
async function splitVideoMiddleWare(req, _res, next) {
    const requestBody = req.body;
    try {
        await (0, splitVideo_1.default)(requestBody);
        await (0, uploadChunks_1.default)(requestBody.sessionId);
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