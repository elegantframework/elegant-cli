#! /usr/bin/env node
const fs =  require('fs');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const params = process.argv.slice(2)
const path = require("path");

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
  // delete any previous build artifacts
  fs.rm(module_path + '.dist/.next/', { recursive: true }, () => {});
  fs.rm(module_path + '.dist/', { recursive: true }, () => {});

  outputPath = "./.dist/";
}

console.log(
  chalk.white(
    "Creating a new Elegant application in ", chalk.green(path.resolve(outputPath)), "."
  ),
  "\n",
  "\n",
  "Initializing project with a base template.",
  "\n",
  "\n"
);

// copy the docs project into the users project
fs.cp(module_path + 'source/elegant/', outputPath, { recursive: true}, (err) => {
  if (err) {
    
  }
  else
  {
    // copy the starter env file into the users project as their env file
    fs.cp(module_path + 'source/elegant/.env.starter', outputPath + '.env', (err) => {
      if (err) {
        console.error(err);
      }
    });

    // copy the sample env file into the users project as their env file
    fs.cp(module_path + 'source/elegant/.env.example', outputPath + '.env.example', (err) => {
      if (err) {
        console.error(err);
      }
    });


    // copy the git ignore file over
    fs.cp(module_path + 'source/elegant/.gitignore.starter', outputPath + '.gitignore', (err) => {
      if (err) {
        console.error(err);
      }
    });

    // delete the example git ignore file
    fs.unlink(outputPath + '.gitignore.starter', function(err,results){
      // do nothing
    });

    // delete the started .env file
    fs.unlink(outputPath + '.env.starter', function(err,results){
      // do nothing
    });

    console.log(
      "\n",
      chalk.white("Installing dependencies:"),
      "\n",
      "\n"
    );

    // install node packages
    const spawn = require('cross-spawn'); 
    const child = spawn("npm", ["install"], {
      stdio: 'inherit',
      env: {
        ...process.env,
        ADBLOCK: '1',
        // we set NODE_ENV to development as pnpm skips dev
        // dependencies when production
        NODE_ENV: 'development',
        DISABLE_OPENCOLLECTIVE: '1',
      },
    });

    child.on('close', (code) => {
      if (code !== 0) {
        return;
      }

      console.log(
        "\n",
        "\n",
        chalk.white(chalk.green("Success! "), "Created your Elegant application at ", path.resolve(outputPath)),
        '\n',
        '\n',
        chalk.white("The next steps are to run ", chalk.green( `npm run dev`)," to start your app locally."),
        '\n',
        '\n',
        chalk.white("For more information, check out our install guide: "),chalk.underline.white("https://www.elegantframework.com/docs/installation#your-first-elegant-application"),
        '\n',
        '\n',
        chalk.bgBlue.bold.white("Thank you for supporting Elegant :)"),
        '\n',
        '\n'
      );
      
      process.exit(0);
    });
  }
});