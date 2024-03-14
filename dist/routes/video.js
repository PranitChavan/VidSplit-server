"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const video_1 = require("../middlewares/video");
const error_handler_1 = require("../middlewares/error-handler");
const videoRouter = express_1.default.Router();
videoRouter.use(express_1.default.json());
videoRouter.post('/split', video_1.splitVideoMiddleWare, (req, res) => {
    res.send({ message: 'done' });
});
videoRouter.use(error_handler_1.errorHandler);
exports.default = videoRouter;
//# sourceMappingURL=video.js.map