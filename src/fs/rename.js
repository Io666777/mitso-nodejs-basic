import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
    const oldPath = path.join(__dirname, 'files', 'fresh.txt');
    const newPath = path.join(__dirname, 'files', 'properFilename.md');
    
    try {
        // Проверяем существование исходного файла
        await fs.access(oldPath);
        
        // Проверяем, не существует ли файл назначения
        try {
            await fs.access(newPath);
            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code === 'ENOENT') {
                // Переименовываем файл
                await fs.rename(oldPath, newPath);
            } else {
                throw new Error('FS operation failed');
            }
        }
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await rename();