#!/usr/bin/env node

var keyring = require('commander');
var chalk = require('chalk');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var printHelp = require('./printHelp');

keyring
  .option('-u, --copyUserName', 'Copy userName to clipboard')
  .option('-p, --copyPassword', 'Copy password to clipboard')
  .parse(process.argv);

if (!keyring.args.length) {
  console.log(chalk.red("\nerror: missing required argument 'appName'. see help below."));
  printHelp('fetch');
  return;
}

if (keyring.args.length > 1) {
  console.log(chalk.red("\nerror: too many arguments. see help below."));
  printHelp('fetch');
  return;
}

var appName = keyring.args[0];

var cmd = 'security find-generic-password -gs ' + appName;

exec(cmd, function(err, stdout, stderr) {
  if(err) { console.log(chalk.red("exec error: ") + err); process.exit(1); }
  if(stdout) {
    var res = stdout + stderr;
    var appName;
    var userName;
    var password;
    res = res.split('"');
    for(var i = 0; i < res.length; i++) {
      if(res[i] == '\nattributes:\n    0x00000007 <blob>=')
        appName = res[i+1];
      if(res[i] == 'acct' && res[i+1] == '<blob>=')
        userName = res[i+2];
      if(res[i] == '<uint32>=<NULL>\npassword: ')
        password = res[i+1];
    }
    if(keyring.copyUserName) {
      var cp = spawn('pbcopy');
      cp.stdin.write(userName);
      cp.stdin.end();
    }
    else if(keyring.copyPassword) {
      if(password) {
        var cp = spawn('pbcopy');
        cp.stdin.write(password);
        cp.stdin.end();
      }
      else {
        console.log('No password saved for this account');
      }
    }
    else {
      console.log('appName:    ', appName);
      console.log('userName:   ', userName);
      if(password)
        console.log('password:   ', password);
      else
        console.log('No password saved for this account');
    }
  }
});
