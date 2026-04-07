import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
    const filePath = path.join(__dirname, 'files_copy', 'fresh.txt');
    
    try {
        await fs.unlink(filePath);
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await remove();