const readline = require('readline');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const fs = require('fs/promises');
const path = require('path');

const { argv } = yargs(hideBin(process.argv));

const logName = argv.l || argv.log;
let logPath;

if (logName) {
  logPath = path.join(__dirname, logName);
}

const input = readline.createInterface(process.stdin);

const createLog = async (input, target) => {
  if (!logName) return;
  try {
    await fs.appendFile(logPath, `${input}target=${target},`, { encoding: 'utf-8' });
  } catch (err) {
    console.error("Can't write file", err);
  }
};

console.log('Загадан орел (1) или решка (2), 0 - выход');

const processInput = (input) => {
  const target = Math.ceil(Math.random() * 2);

  const number = +input;

  if (number === NaN) return console.log('Некорректный ввод');

  if (number === 0) process.exit();

  if (number === target) {
    console.log('Вы угадали!');
  } else {
    console.log('Вы не угадали');
  }

  createLog(number, target);
  console.log('Загадан орел (1) или решка (2), 0 - выход');
};

input.on('line', processInput);
