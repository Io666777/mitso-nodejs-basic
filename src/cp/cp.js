import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spawnChildProcess = async (args) => {
    const scriptPath = path.join(__dirname, 'files', 'script.js');
    const child = spawn('node', [scriptPath, ...args], {
        stdio: ['pipe', 'pipe', 'inherit', 'ipc']
    });
    
    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);
    
    return new Promise((resolve) => {
        child.on('close', resolve);
    });
};

await spawnChildProcess(['someArgument1', 'someArgument2']);