import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { pipeline } from 'stream/promises';
import { resolvePath, isValidPath } from '../utils/helpers.js';

export async function handleCompress(currentDir, source, destination) {
  const sourcePath = await resolvePath(currentDir, source);
  const destPath = await resolvePath(currentDir, destination);
  
  if (!await isValidPath(sourcePath)) {
    console.log('Operation failed');
    return;
  }
  
  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(destPath);
  const brotliStream = zlib.createBrotliCompress();
  
  try {
    await pipeline(readStream, brotliStream, writeStream);
    console.log('File compressed successfully');
  } catch (error) {
    console.log('Operation failed');
  }
}

export async function handleDecompress(currentDir, source, destination) {
  const sourcePath = await resolvePath(currentDir, source);
  const destPath = await resolvePath(currentDir, destination);
  
  if (!await isValidPath(sourcePath)) {
    console.log('Operation failed');
    return;
  }
  
  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(destPath);
  const brotliStream = zlib.createBrotliDecompress();
  
  try {
    await pipeline(readStream, brotliStream, writeStream);
    console.log('File decompressed successfully');
  } catch (error) {
    console.log('Operation failed');
  }
}