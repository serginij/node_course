const readline = require('readline');

const input = readline.createInterface(process.stdin);

console.log('Загадано число в диапазоне от 0 до 100');

const target = Math.ceil(Math.random() * 100);

const processInput = (input) => {
  const number = +input;

  if (number === 'NaN') return console.log('Некорректный ввод');

  if (number > target) {
    console.log('Меньше');
  } else if (number < target) {
    console.log('Больше');
  } else {
    console.log(`Отгадано число ${target}`);
    process.exit();
  }
};

input.on('line', processInput);
