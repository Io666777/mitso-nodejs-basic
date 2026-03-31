import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
    const sourceDir = path.join(__dirname, 'files');
    const destDir = path.join(__dirname, 'files_copy');
    
    try {
        // Проверяем существование исходной папки
        await fs.access(sourceDir);
        
        // Проверяем, не существует ли папка назначения
        try {
            await fs.access(destDir);
            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code === 'ENOENT') {
                // Копируем папку
                await fs.cp(sourceDir, destDir, { recursive: true });
            } else {
                throw new Error('FS operation failed');
            }
        }
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await copy();