import crypto from 'crypto';
import fs from 'fs';
import { resolvePath, isValidPath } from '../utils/helpers.js';

export async function handleHash(currentDir, filePath) {
  const fullPath = await resolvePath(currentDir, filePath);
  
  if (!await isValidPath(fullPath)) {
    console.log('Operation failed');
    return;
  }
  
  const hash = crypto.createHash('sha256');
  const stream = fs.createReadStream(fullPath);
  
  return new Promise((resolve) => {
    stream.on('data', (data) => hash.update(data));
    stream.on('end', () => {
      console.log(hash.digest('hex'));
      resolve();
    });
    stream.on('error', () => {
      console.log('Operation failed');
      resolve();
    });
  });
}