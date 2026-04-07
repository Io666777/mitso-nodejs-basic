import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { resolvePath, isValidPath } from '../utils/helpers.js';

export async function handleFileOperation(operation, currentDir, ...args) {
  switch (operation) {
    case 'cat': {
      const filePath = await resolvePath(currentDir, args[0]);
      
      if (!await isValidPath(filePath)) {
        console.log('Operation failed');
        return;
      }
      
      const stats = await fsPromises.stat(filePath);
      if (stats.isDirectory()) {
        console.log('Operation failed');
        return;
      }
      
      try {
        const readStream = createReadStream(filePath, 'utf8');
        readStream.pipe(process.stdout);
        
        await new Promise((resolve, reject) => {
          readStream.on('end', () => {
            console.log('\n');
            resolve();
          });
          readStream.on('error', reject);
        });
      } catch (error) {
        console.log('Operation failed');
      }
      break;
    }
    
    case 'add': {
      const fileName = args[0];
      if (!fileName) {
        console.log('Invalid input');
        return;
      }
      
      const filePath = path.join(currentDir, fileName);
      
      try {
        await fsPromises.writeFile(filePath, '');
        console.log(`File ${fileName} created successfully`);
      } catch (error) {
        console.log('Operation failed');
      }
      break;
    }
    
    case 'rn': {
      const oldPath = await resolvePath(currentDir, args[0]);
      const newFileName = args[1];
      
      if (!oldPath || !newFileName) {
        console.log('Invalid input');
        return;
      }
      
      const newPath = path.join(path.dirname(oldPath), newFileName);
      
      try {
        await fsPromises.rename(oldPath, newPath);
      } catch (error) {
        console.log('Operation failed');
      }
      break;
    }
    
    case 'cp': {
      const sourcePath = await resolvePath(currentDir, args[0]);
      const destDir = await resolvePath(currentDir, args[1]);
      
      if (!sourcePath || !destDir) {
        console.log('Invalid input');
        return;
      }
      
      const fileName = path.basename(sourcePath);
      const destPath = path.join(destDir, fileName);
      
      try {
        const readStream = createReadStream(sourcePath);
        const writeStream = createWriteStream(destPath);
        
        await pipeline(readStream, writeStream);
        console.log(`File copied successfully`);
      } catch (error) {
        console.log('Operation failed');
      }
      break;
    }
    
    case 'mv': {
      const sourcePath = await resolvePath(currentDir, args[0]);
      const destDir = await resolvePath(currentDir, args[1]);
      
      if (!sourcePath || !destDir) {
        console.log('Invalid input');
        return;
      }
      
      const fileName = path.basename(sourcePath);
      const destPath = path.join(destDir, fileName);
      
      try {
        const readStream = createReadStream(sourcePath);
        const writeStream = createWriteStream(destPath);
        
        await pipeline(readStream, writeStream);
        await fsPromises.unlink(sourcePath);
        console.log(`File moved successfully`);
      } catch (error) {
        console.log('Operation failed');
      }
      break;
    }
    
    case 'rm': {
      const filePath = await resolvePath(currentDir, args[0]);
      
      if (!filePath) {
        console.log('Invalid input');
        return;
      }
      
      try {
        await fsPromises.unlink(filePath);
      } catch (error) {
        console.log('Operation failed');
      }
      break;
    }
  }
}