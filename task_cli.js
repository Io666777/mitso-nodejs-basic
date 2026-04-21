const { program } = require('commander');
const fs = require('fs');
const { pipeline } = require('stream');
const { TaskTransform } = require('./tasks');

// Настройка опций CLI [cite: 241, 242, 243, 244]
program
  .option('-i, --input <path>', 'путь к входному файлу')
  .option('-o, --output <path>', 'путь к выходному файлу')
  .requiredOption('-t, --task <type>', 'выбор задачи: s2 (строки) или a2 (массивы)')
  .parse(process.argv);

const options = program.opts();

// Выбор потоков ввода/вывода [cite: 251, 254]
const inputStream = options.input 
  ? fs.createReadStream(options.input) 
  : process.stdin;

const outputStream = options.output 
  ? fs.createWriteStream(options.output, { flags: 'a' }) 
  : process.stdout;

// Проверка существования файла [cite: 255]
if (options.input && !fs.existsSync(options.input)) {
  process.stderr.write('Ошибка: Входной файл не найден\n');
  process.exit(1);
}

// Выполнение через pipeline [cite: 260, 262]
pipeline(
  inputStream,
  new TaskTransform(options.task),
  outputStream,
  (err) => {
    if (err) {
      process.stderr.write(`Ошибка выполнения: ${err.message}\n`);
      process.exit(1);
    }
  }
);