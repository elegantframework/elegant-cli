#! /usr/bin/env node
const fs =  require('fs');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const program = require('commander');
const shell = require("shelljs");

clear();

// copy the docs project into the users project
fs.cp('node_modules/elegant-cli/source/elegant-docs/', './', { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  }
});

// copy the sample env file into the users project as their env file
fs.cp('node_modules/elegant-cli/source/elegant-docs/.env.example', './.env', (err) => {
  if (err) {
    console.error(err);
  }
});

// copy the git ignore file over
fs.cp('node_modules/elegant-cli/source/elegant-docs/.gitignore', './.gitignore', (err) => {
  if (err) {
    console.error(err);
  }
});

// install the required packages for the user
shell.exec("npm install");

console.log(
  chalk.yellow.bgBlack(
    figlet.textSync("Let's create some docs :)")
  )
);