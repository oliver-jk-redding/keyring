#!/usr/bin/env node

var keyring = require('commander');
var chalk = require('chalk');
var exec = require('child_process').exec;
var prompt = require('prompt');
var printHelp = require('./printHelp');
var fs = require('fs');

keyring
  .parse(process.argv);

if (keyring.args.length > 0) {
  console.log(chalk.red("\nerror: too many arguments. see help below."));
  printHelp('reset');
  return;
}

console.log(chalk.magenta('Warning: This action will remove all saved credentials and remove all persistent data. Are you sure you want to proceed? [y/N]'));
prompt.start();
prompt.get('answer', function(err, res) {
 if(err) { console.log(chalk.red("error: ") + err); process.exit(1); }
  var res = res.answer.toLowerCase();
  if(res === 'y')
    removeAll();
});

var removeAll = function() {
  fs.readFile('/Applications/Keyring.app/apps', 'utf8', function(err, data) {
    if(err) { console.log(chalk.red("\nError: No data to remove\n")); process.exit(1); }
    data = data.split('\n');
    data.pop();
    for(var i = 0; i < data.length; i++) {
      var cmd = 'security delete-generic-password -s' + data[i];
      exec(cmd, function(err, stdout, stderr) {
        if(err) console.log(chalk.red("exec error: ") + err);
      });
    }
    exec('./keyring-reset.sh', function(err, stdout, stderr) {
      if(err) { console.log(chalk.red("exec error: ") + err); process.exit(1); }
      if(stdout) console.log(chalk.green('\nFinished removing all data\n'));
    });
  });
}
