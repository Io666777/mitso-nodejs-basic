import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
    const sourcePath = path.join(__dirname, 'files', 'fileToCompress.txt');
    const destPath = path.join(__dirname, 'files', 'archive.gz');
    
    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destPath);
    const gzipStream = zlib.createGzip();
    
    readStream.pipe(gzipStream).pipe(writeStream);
    
    writeStream.on('finish', () => {
        console.log('File compressed successfully');
    });
    
    writeStream.on('error', () => {
        throw new Error('FS operation failed');
    });
    
    readStream.on('error', () => {
        throw new Error('FS operation failed');
    });
};

await compress();