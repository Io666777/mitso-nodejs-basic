import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
    const sourcePath = path.join(__dirname, 'files', 'archive.gz');
    const destPath = path.join(__dirname, 'files', 'fileToCompress.txt');
    
    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destPath);
    const gunzipStream = zlib.createGunzip();
    
    readStream.pipe(gunzipStream).pipe(writeStream);
    
    writeStream.on('finish', () => {
        console.log('File decompressed successfully');
    });
    
    writeStream.on('error', () => {
        throw new Error('FS operation failed');
    });
    
    readStream.on('error', () => {
        throw new Error('FS operation failed');
    });
};

await decompress();