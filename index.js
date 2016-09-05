#!/usr/bin/env node

var cli = require('commander');
var chalk = require('chalk');
var exec = require('child_process').exec;
var pkg = require('./package.json');

var speak = require('./speak.js');

var list = function(directory, options) {
  var cmd = 'ls';
  var params = [];

  if(options.all) params.push('a');
  if(options.long) params.push('1');
  var parameterizedCommand = params.length
                    ? cmd + ' -' + params.join('')
                    : cmd
  if(directory) parameterizedCommand += ' ' + directory;

  var output = function(error, stdout, stderr) {
    if(error) console.log(chalk.red.bold.underline("exec error: ") + error);
    if(stdout) console.log(chalk.green.bold.underline("Result: ") + stdout);
    if(stderr) console.log(chalk.red("Error: ") + stderr);
  };

  console.log(parameterizedCommand);
  exec(parameterizedCommand, output);

};

var saveFilePath = '~/.keys'

var storeCredentials = function(appName) {
  if(options.userName) 
}


cli
  .version('0.0.1')
  .command('store <appName>')
  .description('Store credentials for an application')
  .option('-u, --userName', 'Store your username')
  .option('-p, --password', 'Store you password')
  .action(storeCredentials);

cli
  .command('speak')
  .description('speak the words to the user')
  .action(function() {
    speak();
  });

cli.parse(process.argv);

if(cli.args.length === 0) cli.help();

