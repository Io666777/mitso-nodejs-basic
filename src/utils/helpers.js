import path from 'path';
import fs from 'fs/promises';

export function parseArgs(argsString) {
  // Парсинг аргументов для будущего использования
  return argsString;
}

export async function resolvePath(currentDir, targetPath) {
  if (!targetPath) return currentDir;
  if (path.isAbsolute(targetPath)) {
    return targetPath;
  }
  return path.join(currentDir, targetPath);
}

export async function isValidPath(dirPath) {
  try {
    await fs.access(dirPath);
    return true;
  } catch {
    return false;
  }
}

export async function getFileType(filePath) {
  const stats = await fs.stat(filePath);
  return stats.isDirectory() ? 'directory' : 'file';
}

export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}