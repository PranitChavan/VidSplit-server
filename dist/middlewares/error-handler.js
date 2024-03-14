"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const SupabaseStorageExceptions_1 = require("../Exceptions/SupabaseStorageExceptions");
const errorHandler = function (error, req, res, next) {
    if (error.message.includes('ffmpeg') || error instanceof SupabaseStorageExceptions_1.SupabaseStorageExceptions) {
        return res.status(500).json({ error: error.message });
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map