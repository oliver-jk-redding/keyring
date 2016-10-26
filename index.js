#!/usr/bin/env node

var keyring = require('commander');
var chalk = require('chalk');
var exec = require('child_process').exec;
var pkg = require('./package.json');
var printHelp = require('./printHelp');

var saveFilePath = '~/.keys'

keyring
  .version(pkg.version)
  .command('store <appName>', 'store credentials by appName, username, and password')
  .command('fetch <appName>', 'get credentials by appName')
  .command('delete <appName>', 'delete credentials by appName')
  .command('list', 'list appNames')
  .command('reset', 'delete all credentials and app storage')
  .parse(process.argv);

if(keyring.args.length === 0) keyring.help();

var checkCommandIsValid = function(commandList) {
  for(var i=0; i<commandList.length; i++) {
    if( commandList[i] == keyring.args[0]) {
      return
    }
  }
  console.log(chalk.red("\nerror: no valid arguments. see help below."));
  printHelp();
}

checkCommandIsValid(['store', 'fetch', 'delete', 'list', 'reset']);


