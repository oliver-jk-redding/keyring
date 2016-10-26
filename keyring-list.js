#!/usr/bin/env node

var keyring = require('commander');
var chalk = require('chalk');
var exec = require('child_process').exec;
var printHelp = require('./printHelp');

keyring
  .parse(process.argv);

if (keyring.args.length > 0) {
  console.log(chalk.red("\nerror: too many arguments. see help below."));
  printHelp('list');
  return;
}

var cmd =   'if [[ -f "/Applications/Keyring.app/apps" ]]; then ' +
              'cat "/Applications/Keyring.app/apps"; ' +
            'else ' +
              '>&2 echo "No credentials saved"; ' +
            'fi';

exec(cmd, function(err, stdout, stderr) {
  if(err) { console.log(chalk.red("exec error: ") + err); process.exit(1); }
  if(stderr) { console.log(chalk.red("shell error: ") + stderr); process.exit(1); }
  if(stdout == '') { console.log(chalk.red("\nNo credentials saved\n")); process.exit(1); }
  console.log(chalk.green("\nList of appNames:\n") + stdout);
});

