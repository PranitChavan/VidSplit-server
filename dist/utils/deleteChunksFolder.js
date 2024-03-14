"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function deleteChunksFolder(sessionId) {
    const rootOutputDir = path_1.default.join(process.cwd(), 'outputs'); // root outputs folder path
    const outputDir = path_1.default.join(rootOutputDir, sessionId.toString());
    fs_1.default.rmSync(outputDir, { recursive: true, force: true }); // Remove existing folder of the current sessionId
}
exports.default = deleteChunksFolder;
//# sourceMappingURL=deleteChunksFolder.js.map