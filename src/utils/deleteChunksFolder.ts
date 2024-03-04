import path from 'path';
import fs from 'fs';

export default function deleteChunksFolder(sessionId: string) {
  const rootOutputDir = path.join(process.cwd(), 'outputs'); // root outputs folder path
  const outputDir = path.join(rootOutputDir, sessionId.toString());
  fs.rmSync(outputDir, { recursive: true, force: true }); // Remove existing folder of the current sessionId
}
