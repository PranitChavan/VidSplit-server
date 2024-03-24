"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const supabase_1 = __importDefault(require("../supabase/supabase"));
const deleteChunks_1 = __importDefault(require("./deleteChunks"));
const SupabaseStorageExceptions_1 = require("../Exceptions/SupabaseStorageExceptions");
const logger_1 = require("../Logger/logger");
const utils_1 = require("../utils/utils");
async function uploadChunksToStorage(sessionId) {
    const chunksDir = path_1.default.join(process.cwd(), 'outputs', sessionId);
    await (0, deleteChunks_1.default)(sessionId);
    //  Read the list of files in the directory
    const files = fs_1.default.readdirSync(chunksDir);
    logger_1.logger.info('Upload Process', { information: `Upload process started for id: ${sessionId}`, Timestamp: (0, utils_1.formatDate)(new Date()) });
    for (const fileName of files) {
        const filePath = path_1.default.join(chunksDir, fileName);
        const videoFile = fs_1.default.readFileSync(filePath);
        const { error } = await supabase_1.default.storage.from(process.env.STORAGE_BUCKET).upload(`${sessionId}/Chunks/${fileName}`, videoFile, {
            cacheControl: '3600',
            upsert: true,
            contentType: 'video/mp4',
        });
        if (error) {
            logger_1.logger.error('Upload Process', { information: `Upload process failed for id: ${sessionId} : ${error.message}`, Timestamp: (0, utils_1.formatDate)(new Date()) });
            throw new SupabaseStorageExceptions_1.SupabaseStorageExceptions(`FAILED TO UPLOAD VIDEO CHUNKS : ${error.message}`);
        }
    }
}
exports.default = uploadChunksToStorage;
//# sourceMappingURL=uploadChunks.js.map