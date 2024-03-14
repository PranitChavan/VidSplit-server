"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_1 = __importDefault(require("../../supabase/supabase"));
const SupabaseStorageExceptions_1 = require("../../Exceptions/SupabaseStorageExceptions");
async function deleteExistingChunks(sessionId) {
    let { data: fileList, error: fileListError } = await supabase_1.default.storage.from(process.env.STORAGE_BUCKET).list(`${sessionId}/Chunks`);
    if (fileListError)
        throw new SupabaseStorageExceptions_1.SupabaseStorageExceptions(`FAILED TO FETCH EXISIING FILE LIST : ${fileListError.message}`);
    const filesToRemove = fileList.map((x) => `${sessionId}/Chunks/${x.name}`);
    const { error: fileRemovalError } = await supabase_1.default.storage.from(process.env.STORAGE_BUCKET).remove(filesToRemove);
    if (fileRemovalError)
        throw new SupabaseStorageExceptions_1.SupabaseStorageExceptions(`FAILED TO DELETE EXISITNG FILES : ${fileRemovalError.message}`);
}
exports.default = deleteExistingChunks;
//# sourceMappingURL=deleteChunks.js.map