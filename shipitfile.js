var chalk = require('chalk');

module.exports = function(shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/demo-workspace',
      deployTo: '/tmp/demo-deploy',
      repositoryUrl: 'git@github.com:napunapu/js-tools-skeleton.git',
      branch: 'master',
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      deleteOnRollback: false,
      shallowClone: true
    },
    master: {
      servers: ['user@company.com:12345'],
      branch: 'master',
      deployTo: '/home/root/www',
      runConfig: ''
    }
  });


  shipit.blTask('stop-server', function() {
    var current = shipit.config.deployTo + '/current';
    // check if directory exists, then stop server; else do nothing
    return shipit.remote('([ -d ' + current + ' ] && cd ' + current +
      ' && forever stop server.js) || :').then(function(res) {
      shipit.log(chalk.green('Server stopped.'));
    });
  });

  shipit.blTask('build', function() {
    var current = shipit.config.deployTo + '/current';
    return shipit.remote(
      'cd ' + current +
      ' && npm install' +
      ' && gulp deploy --production' +
      ' && mkdir log'
    ).then(function(res) {
      shipit.log(chalk.green('Build successful.'));
      return shipit.start('start-server');
    });
  });

  shipit.blTask('start-server', function() {
    var current = shipit.config.deployTo + '/current';
    return shipit.remote(
      'source ~/.bash_profile' +
      ' && cd ' + current +
      ' && ' + shipit.config.runConfig + ' forever start server.js'
    ).then(function(res) {
      shipit.log(chalk.green('Server started.'));
    });

  });

  shipit.on('fetched', function() {
    shipit.start('stop-server');
  });

  shipit.on('published', function() {
    shipit.start('build');
  });
};
