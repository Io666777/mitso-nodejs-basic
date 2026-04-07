import fs from 'fs/promises';
import path from 'path';
import { resolvePath, isValidPath, getFileType } from '../utils/helpers.js';

export async function handleNavigation(command, currentDir, target = null) {
  switch (command) {
    case 'up': {
      const parentDir = path.dirname(currentDir);
      const rootDir = path.parse(currentDir).root;
      
      // Не можем выйти выше корневого каталога
      if (parentDir === currentDir || parentDir === rootDir) {
        return currentDir;
      }
      return parentDir;
    }
    
    case 'cd': {
      if (!target) {
        console.log('Invalid input');
        return currentDir;
      }
      
      const newPath = await resolvePath(currentDir, target);
      
      if (await isValidPath(newPath)) {
        const stats = await fs.stat(newPath);
        if (stats.isDirectory()) {
          return newPath;
        }
      }
      
      console.log('Invalid input');
      return currentDir;
    }
    
    case 'ls': {
      try {
        const files = await fs.readdir(currentDir);
        const items = [];
        
        for (const file of files) {
          const filePath = path.join(currentDir, file);
          try {
            const type = await getFileType(filePath);
            items.push({ name: file, type });
          } catch (err) {
            // Пропускаем файлы, к которым нет доступа
          }
        }
        
        // Сортировка: папки первые, потом файлы, по алфавиту
        items.sort((a, b) => {
          if (a.type !== b.type) {
            return a.type === 'directory' ? -1 : 1;
          }
          return a.name.localeCompare(b.name);
        });
        
        // Вывод в виде таблицы
        console.table(items);
      } catch (error) {
        console.log('Operation failed');
      }
      break;
    }
  }
  
  return currentDir;
}