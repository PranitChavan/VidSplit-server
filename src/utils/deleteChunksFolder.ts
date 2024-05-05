import path from 'path';
import fs from 'fs';
import { logger } from '../Logger/logger';

export default function deleteChunksFolder(sessionId: string) {
  const rootOutputDir = path.join(process.cwd(), 'outputs'); // root outputs folder path
  const outputDir = path.join(rootOutputDir, sessionId.toString());
  fs.rm(outputDir, { recursive: true, force: true }, (deleteError: NodeJS.ErrnoException) => {
    if (deleteError) {
      logger.info('Failed to delete chunks folder', { Information: `Failed to delete chunks folder for ${sessionId}` });
      throw new Error('Failed to delete chunks folder');
    }
  });
}
