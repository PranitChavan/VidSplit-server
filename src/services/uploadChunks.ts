import path from 'path';
import fs from 'fs';
import supabase from '../supabase/supabase';
import { StorageError } from '@supabase/storage-js';
import deleteExistingChunksFromStorage from './deleteChunks';
import { SupabaseStorageExceptions } from '../Exceptions/SupabaseStorageExceptions';
import { logger } from '../Logger/logger';

async function readChunksFromDir(chunksDir: string, sessionId: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(chunksDir, (readError: NodeJS.ErrnoException, files: string[]) => {
      if (readError) {
        logger.info('Failed to read chunks', { Information: `Failed to read chunks for id: ${sessionId}` });
        reject(readError);
      }
      resolve(files);
    });
  });
}

async function readChunkFile(filePath: string, sessionId: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (readError: NodeJS.ErrnoException, videoFile: Buffer) => {
      if (readError) {
        logger.info('Failed to read chunk file', { Information: `Failed to read chunk file for ${sessionId}` });
        reject(readError);
      }

      resolve(videoFile);
    });
  });
}

export default async function uploadChunksToStorage(sessionId: string): Promise<StorageError | void> {
  const chunksDir: string = path.join(process.cwd(), 'outputs', sessionId, 'Chunks');

  await deleteExistingChunksFromStorage(sessionId);

  const files: string[] = await readChunksFromDir(chunksDir, sessionId);

  logger.info('Upload Process started', { Information: `Upload process started for id: ${sessionId}` });

  for (const fileName of files) {
    const filePath = path.join(chunksDir, fileName);

    const videoFile: Buffer = await readChunkFile(filePath, sessionId);

    const { error } = await supabase.storage.from(process.env.STORAGE_BUCKET).upload(`${sessionId}/Chunks/${fileName}`, videoFile, {
      cacheControl: '3600',
      upsert: true,
      contentType: 'video/mp4',
    });

    if (error) {
      logger.info('Upload Process failed', { Information: `Upload process failed for id: ${sessionId} : ${error.message}` });
      throw new SupabaseStorageExceptions(`FAILED TO UPLOAD VIDEO CHUNKS : ${error.message}`);
    }
  }
}
