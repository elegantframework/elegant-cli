#! /usr/bin/env node
const fs =  require('fs');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const params = process.argv.slice(2)
const shell = require('shelljs');

clear();

let outputPath = "./";

// set the output folder path if the user has provided one
if(params[0] !== undefined && params[0] !== '')
{  
  outputPath = params[0];

  // check if a leading slash has already been provided
  if(outputPath.slice(0, 1) === '/')
  {
    outputPath = "." + outputPath;
  }

  // add a dot period if one does not exist
  if(outputPath.slice(0, 2) !== './' && outputPath.slice(0, 1) !== '/')
  {
    outputPath = './' + outputPath;
  }

  // add a trailing slash if one hasn't been provided
  if(outputPath.slice(-1) !== '/')
  {
    outputPath = outputPath + '/';
  }
}

// set our node module path
let module_path = '';

if(process.env.JEST_WORKER_ID === undefined && process.env.NODE_ENV !== 'test')
{
  module_path = 'node_modules/elegant-cli/';
}
else
{
  outputPath = "./test/"
}

// copy the git ignore file over
fs.cp(module_path + 'source/elegant-docs/.gitignore.example', outputPath + '.gitignore', (err) => {
  if (err) {
    console.error(err);
  }
});

// copy the docs project into the users project
fs.cp(module_path + 'source/elegant-docs/', outputPath + './', { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  }
});

// copy the sample env file into the users project as their env file
fs.cp(module_path + 'source/elegant-docs/.env.example', outputPath + './.env', (err) => {
  if (err) {
    console.error(err);
  }
});

console.log(
  chalk.green.bgBlack(
    figlet.textSync("Let's create some docs :)")
  )
);