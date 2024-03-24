"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
const { combine, json, prettyPrint, colorize } = winston_1.format;
exports.logger = (0, winston_1.createLogger)({
    format: combine(json(), prettyPrint(), colorize()),
    transports: [new winston_1.transports.File({ filename: path_1.default.join(process.cwd(), 'Logs', 'logs.log') })],
});
//# sourceMappingURL=logger.js.map