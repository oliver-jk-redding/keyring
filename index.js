#!/usr/bin/env node

var keyring = require('commander');
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

var storeCredentials = function(appName, options) {
  if(!options.userName) { 
    console.log(chalk.red("\nerror: missing required argument 'userName'. see help below."));
    exec('keyring store -h', function(err, out) {
      if(err) console.log(chalk.red("exec error: ") + err);
      if(out) console.log(out);
    });
    return;
  }

  var cmd = 'security add-generic-password -s ' + appName + ' -a ' + options.userName;
  if(options.password) cmd = cmd + ' -w ' + options.password;

  exec(cmd, function(err, stdout, stderr) {
    if(err) console.log(chalk.red("exec error: ") + err);
    if(stdout) console.log(chalk.green("Credentials saved successfully."));
    if(stderr) console.log(chalk.red("shell error: ") + stderr);
  });
}

keyring
  .version('0.0.1')
  .command('store <appName>')
  .description('Store credentials for an application by app name, username, and password')
  .option('-u, --userName <userName>', 'The username for the application (required)')
  .option('-p, --password <password>', 'The password for the user account (optional)')
  .action(storeCredentials);

keyring
  .command('speak')
  .description('speak the words to the user')
  .action(function() {
    speak();
  });

keyring.parse(process.argv);

if(keyring.args.length === 0) keyring.help();

