#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const dateFns = require('date-fns');
const locale = require('date-fns/locale');

const { argv } = yargs(hideBin(process.argv));
const { _: flags } = argv;

const years = argv.y || argv.year || 0;
const months = argv.m || argv.month || 0;
const days = argv.d || argv.date || 0;
const date = new Date();

if (flags.includes('current')) {
  if (years) {
    return console.log(dateFns.getYear(date));
  }
  if (months) {
    return console.log(date.toLocaleDateString('en', { month: 'long' }));
  }
  if (days) {
    return console.log(dateFns.getDate(date));
  }

  console.log(date);
} else {
  if (flags.includes('add')) {
    console.log(
      dateFns.add(date, {
        years,
        months,
        days,
      })
    );
  } else if (flags.includes('sub')) {
    console.log(
      dateFns.sub(date, {
        years,
        months,
        days,
      })
    );
  }
}
