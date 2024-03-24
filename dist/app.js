"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const video_1 = require("./middlewares/video");
const error_handler_1 = require("./middlewares/error-handler");
const logger_1 = require("./Logger/logger");
const utils_1 = require("./utils/utils");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
}));
app.use(express_1.default.json());
app.get('/health', (_req, res) => {
    logger_1.logger.info('Health check', { Information: 'Performing health check.' });
    res.status(200).json({ message: 'Working fine!', Timestamp: (0, utils_1.formatDate)(new Date()) });
});
app.post('/api/video/split', video_1.splitVideoMiddleWare, (req, res) => {
    logger_1.logger.info('Request completed', { Information: `Process completed for id: ${req.body.sessionId}`, Timestamp: (0, utils_1.formatDate)(new Date()) });
    res.send({ message: 'done' });
});
app.use(error_handler_1.errorHandler);
app.listen(process.env.PORT, () => {
    logger_1.logger.info('Init', { Information: `Server started on port ${process.env.PORT}`, Timestamp: (0, utils_1.formatDate)(new Date()) });
});
//# sourceMappingURL=app.js.map