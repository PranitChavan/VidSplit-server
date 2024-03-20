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
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
}));
app.use(express_1.default.json());
app.get('/health', (_req, res) => {
    res.status(200).json({ message: 'Hello, World! Working fine!' });
});
app.post('/api/video/split', video_1.splitVideoMiddleWare, (_req, res) => {
    res.send({ message: 'done' });
});
app.use(error_handler_1.errorHandler);
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
//# sourceMappingURL=app.js.map