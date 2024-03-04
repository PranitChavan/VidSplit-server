import supabase from '../supabase/supabase';
import { SupabaseStorageExceptions } from '../Exceptions/SupabaseStorageExceptions';

export default async function deleteExistingChunks(sessionId: string): Promise<void> {
  let { data: fileList, error: fileListError } = await supabase.storage.from(process.env.STORAGE_BUCKET).list(`${sessionId}/Chunks`);
  if (fileListError) throw new SupabaseStorageExceptions(`FAILED TO FETCH EXISIING FILE LIST : ${fileListError.message}`);

  if (!fileList.length) return;

  const filesToRemove = fileList.map((x) => `${sessionId}/Chunks/${x.name}`);

  const { error: fileRemovalError } = await supabase.storage.from(process.env.STORAGE_BUCKET).remove(filesToRemove);
  if (fileRemovalError) throw new SupabaseStorageExceptions(`FAILED TO DELETE EXISITNG FILES : ${fileRemovalError.message}`);
}
