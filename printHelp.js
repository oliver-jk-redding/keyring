var chalk = require('chalk');
var exec = require('child_process').exec;

module.exports = function(topic) {
	if(!topic) topic = '';
	var cmd = 'keyring ' + topic + ' -h';
	exec(cmd, function(err, stdout, stderr) {
    if(err) console.log(chalk.red("exec error: ") + err);
    if(stdout) console.log(stdout);
    if(stderr) console.log(chalk.red("shell error: ") + stderr);
    process.exit(1);
  });
}
