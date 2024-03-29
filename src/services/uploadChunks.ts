import path from 'path';
import fs from 'fs';
import supabase from '../supabase/supabase';
import { StorageError } from '@supabase/storage-js';
import deleteExistingChunks from './deleteChunks';
import { SupabaseStorageExceptions } from '../Exceptions/SupabaseStorageExceptions';
import { logger } from '../Logger/logger';
import { formatDate } from '../utils/utils';

export default async function uploadChunksToStorage(sessionId: string): Promise<StorageError | void> {
  const chunksDir: string = path.join(process.cwd(), 'outputs', sessionId);

  await deleteExistingChunks(sessionId);

  //  Read the list of files in the directory
  const files: string[] = fs.readdirSync(chunksDir);

  logger.info('Upload Process', { Information: `Upload process started for id: ${sessionId}` });

  for (const fileName of files) {
    const filePath = path.join(chunksDir, fileName);
    const videoFile = fs.readFileSync(filePath);

    const { error } = await supabase.storage.from(process.env.STORAGE_BUCKET).upload(`${sessionId}/Chunks/${fileName}`, videoFile, {
      cacheControl: '3600',
      upsert: true,
      contentType: 'video/mp4',
    });

    if (error) {
      logger.info('Upload Process', { Information: `Upload process failed for id: ${sessionId} : ${error.message}` });
      throw new SupabaseStorageExceptions(`FAILED TO UPLOAD VIDEO CHUNKS : ${error.message}`);
    }
  }
}
