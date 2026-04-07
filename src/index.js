import readline from 'readline';
import { homedir } from 'os';
import { parseArgs } from './utils/helpers.js';
import { handleNavigation } from './commands/navigation.js';
import { handleFileOperation } from './commands/fileOperations.js';
import { handleOSCommand } from './commands/osInfo.js';
import { handleHash } from './commands/hash.js';
import { handleCompress, handleDecompress } from './commands/compress.js';

let currentDir = homedir();
let username = '';

// Парсинг аргументов командной строки
const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
if (usernameArg) {
  username = usernameArg.split('=')[1];
} else {
  username = 'User';
}

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${currentDir}`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

rl.prompt();

rl.on('line', async (input) => {
  const [command, ...args] = input.trim().split(' ');
  
  try {
    switch (command) {
      case '.exit':
        rl.close();
        break;
      case 'up':
        currentDir = await handleNavigation('up', currentDir);
        break;
      case 'cd':
        currentDir = await handleNavigation('cd', currentDir, args[0]);
        break;
      case 'ls':
        await handleNavigation('ls', currentDir);
        break;
      case 'cat':
        await handleFileOperation('cat', currentDir, args[0]);
        break;
      case 'add':
        await handleFileOperation('add', currentDir, args[0]);
        break;
      case 'rn':
        await handleFileOperation('rn', currentDir, args[0], args[1]);
        break;
      case 'cp':
        await handleFileOperation('cp', currentDir, args[0], args[1]);
        break;
      case 'mv':
        await handleFileOperation('mv', currentDir, args[0], args[1]);
        break;
      case 'rm':
        await handleFileOperation('rm', currentDir, args[0]);
        break;
      case 'os':
        await handleOSCommand(args[0]);
        break;
      case 'hash':
        await handleHash(currentDir, args[0]);
        break;
      case 'compress':
        await handleCompress(currentDir, args[0], args[1]);
        break;
      case 'decompress':
        await handleDecompress(currentDir, args[0], args[1]);
        break;
      default:
        console.log('Invalid input');
    }
  } catch (error) {
    console.log('Operation failed');
  }
  
  console.log(`You are currently in ${currentDir}`);
  rl.prompt();
});

rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});

// Обработка Ctrl+C
process.on('SIGINT', () => {
  rl.close();
});