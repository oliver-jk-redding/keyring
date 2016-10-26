#!/usr/bin/env node

var keyring = require('commander');
var chalk = require('chalk');
var exec = require('child_process').exec;
var printHelp = require('./printHelp');
var fs = require('fs');

keyring
  .parse(process.argv);

if (!keyring.args.length) {
  console.log(chalk.red("\nerror: missing required argument 'appName'. see help below."));
  printHelp('delete');
  return;
}

if (keyring.args.length > 1) {
  console.log(chalk.red("\nerror: too many arguments. see help below."));
  printHelp('delete');
  return;
}

var appName = keyring.args[0];

var cmd = 'security delete-generic-password -s ' + appName;

exec(cmd, function(err, stdout, stderr) {
  if(err) { console.log(chalk.red("exec error: ") + err); process.exit(1); }
  if(stderr)
    deleteAppName();
    console.log(chalk.green('\nCredentials for ' + appName + ' deleted\n'));
});

var deleteAppName = function() {
  fs.readFile('/Applications/Keyring.app/apps', 'utf8', function(err, data) {
    if(err) { console.log(chalk.red("Error: " + err)); process.exit(1); }
    data = data.replace(appName + '\n', '');
    writeToFile(data);
  });

  function writeToFile(data) {
    fs.writeFile('/Applications/Keyring.app/apps', data, function(err) {
      if(err) console.log(chalk.red("Error: " + err));
    });
  }
}

