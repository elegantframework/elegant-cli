#! /usr/bin/env node
const fs =  require('fs');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const program = require('commander');

clear();

fs.cp('node_modules/elegant-cli/source/elegant-docs/', './', { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  }
});

console.log(
  chalk.yellow.bgBlack(
    figlet.textSync("Let's create some docs!", { horizontalLayout: 'full' })
  )
);