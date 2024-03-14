"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseStorageExceptions = void 0;
const storage_js_1 = require("@supabase/storage-js");
class SupabaseStorageExceptions extends storage_js_1.StorageError {
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.SupabaseStorageExceptions = SupabaseStorageExceptions;
//# sourceMappingURL=SupabaseStorageExceptions.js.map