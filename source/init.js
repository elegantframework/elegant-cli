#! /usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const program = require('commander');

clear();
console.log(
  chalk.green.bold(
    figlet.textSync('Elegant CLI :)', { horizontalLayout: 'full' })
  )
);
console.log(
  chalk.yellow.bgBlack(
    figlet.textSync("Let's create some docs!", { horizontalLayout: 'full' })
  )
);