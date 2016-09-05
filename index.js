#!/usr/bin/env node

var cli = require('commander');
var chalk = require('chalk');
var exec = require('child_process').exec;
var pkg = require('./package.json')

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
  // exec(parameterizedCommand, output);

};


cli
  .version('0.0.1')
  .command('list [directory]')
  .description('List files and folders')
  .option('-a, --all', 'List all files and folders')
  .option('-l, --long','long list format')
  .action(list);

cli.parse(process.argv);

if(cli.args.length === 0) cli.help();

