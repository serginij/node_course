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

if (!logName) {
  console.log('No file was provided');
  process.exit();
}

(async function () {
  try {
    const data = await fs.readFile(logPath, { encoding: 'utf-8' });
    const array = data.split(',').slice(0, -1);

    let count = array.length;
    let win = 0;
    let defeat = 0;

    array.forEach((el) => {
      let res = el.split('target=');

      if (res[0] === res[1]) {
        win++;
      } else {
        defeat++;
      }
    });

    console.log(`Общее кол-во партий: ${count}`);
    console.log(`Кол-во выигранных партий: ${win}`);
    console.log(`Кол-во проигранных партий: ${defeat}`);
    console.log(`Процентное соотношение выигранных партий: ${Math.ceil((win / count) * 100)}`);
  } catch (err) {
    console.error('An error occurred while reading file', err);
  }
})();
