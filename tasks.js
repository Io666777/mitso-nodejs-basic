const { Transform } = require('stream');

// Вариант 2 (Строки): Вывернуть слова наизнанку [cite: 356]
function insideOut(str) {
  return str.split(' ').map(word => {
    const len = word.length;
    const mid = Math.floor(len / 2);
    if (len <= 3) return word;

    let left = word.substring(0, mid).split('').reverse().join('');
    let right = word.substring(len % 2 === 0 ? mid : mid + 1).split('').reverse().join('');
    let center = len % 2 === 0 ? '' : word[mid];

    return left + center + right;
  }).join(' ');
}

// Вариант 2 (Массивы): Найти строку треугольника нечетных чисел [cite: 439]
function oddRow(n) {
  const start = n * n - n + 1; // Формула первого числа в строке n
  let row = [];
  for (let i = 0; i < n; i++) {
    row.push(start + i * 2);
  }
  return JSON.stringify(row);
}

// Transform Stream для интеграции в pipeline [cite: 261]
class TaskTransform extends Transform {
  constructor(taskNum) {
    super();
    this.taskNum = taskNum;
  }
  _transform(chunk, encoding, callback) {
    const input = chunk.toString().trim();
    if (!input) return callback();

    let result;
    if (this.taskNum === 's2') result = insideOut(input);
    else if (this.taskNum === 'a2') result = oddRow(Number(input));
    
    callback(null, result + '\n');
  }
}

module.exports = { TaskTransform };