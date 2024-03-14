"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const video_1 = __importDefault(require("./routes/video"));
dotenv_1.default.config();
const app = (0, express_1.default)();
function init() {
    app.use((0, cors_1.default)({
        origin: 'http://localhost:5173',
    }));
    app.get('/', (_, res) => {
        res.status(200).json({ message: 'Hello, World!' });
    });
    app.use('/api/video', video_1.default);
    app.listen(process.env.PORT);
}
exports.init = init;
//# sourceMappingURL=init.js.map