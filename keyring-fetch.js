#!/usr/bin/env node

var keyring = require('commander');
var chalk = require('chalk');
var exec = require('child_process').exec;
var printHelp = require('./printHelp');

keyring
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

var appName = keyring.args[0];

var cmd = 'security find-generic-password -gs ' + appName;

exec(cmd, function(err, stdout, stderr) {
  if(err) console.log(chalk.red("exec error: ") + err);

  var result = stdout + stderr;
  console.log(result);
  console.log(typeof result);
  // if(stderr) console.log(chalk.red("shell error: ") + stderr);
  // if(stdout) console.log(chalk.green("Credentials: "), stdout);
});

