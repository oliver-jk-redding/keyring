#!/usr/bin/env node

var keyring = require('commander');
var chalk = require('chalk');
var exec = require('child_process').exec;
var printHelp = require('./printHelp');
var fs = require('fs');

keyring
  .option('-u, --userName <userName>', 'The username for the application (required)')
  .option('-p, --password <password>', 'The password for the user account (optional)')
  .parse(process.argv);

if (!keyring.args.length) {
  console.log(chalk.red("\nerror: missing required argument 'appName'. see help below."));
  printHelp('store');
  return;
}

if (keyring.args.length > 1) {
  console.log(chalk.red("\nerror: too many arguments. see help below."));
  printHelp('store');
  return;
}

if(!keyring.userName) { 
  console.log(chalk.red("\nerror: missing required argument 'userName'. see help below."));
  printHelp('store');
  return;
}

var appName = keyring.args[0];

var cmd = 'security add-generic-password -s ' + appName + ' -a ' + keyring.userName;
if(keyring.password) cmd = cmd + ' -w ' + keyring.password;

exec(cmd, function(err, stdout, stderr) {
  if(err) { console.log(chalk.red("exec error: ") + err); process.exit(1); }
  if(stderr) { console.log(chalk.red("shell error: ") + stderr); process.exit(1); }
  saveAppName();
  console.log(chalk.green("Credentials saved successfully.")); 
});

var saveAppName = function() {
  var cmd = process.argv[1].replace('/keyring-store', '') + '/keyring-file-setup.sh';
  exec(cmd, function(err, stdout, stderr) {
    if(err) console.log(chalk.red("exec error: ") + err);
    if(stdout) writeToFile();
  });
  
  function writeToFile() {
    fs.appendFile('/Applications/Keyring.app/apps', appName + '\n', function(err) {
      if(err) console.log(chalk.red("Error: " + err));
    });
  }
}



