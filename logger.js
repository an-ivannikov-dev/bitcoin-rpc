const log4js = require('log4js');



function configureLogger(opts = {}) {
  const options = {
    appenders: {
      stdout: { type: 'stdout' },
      stderr: { type: 'stderr' },
    },
    categories: {
      default: {
        appenders: ['stdout'],
        level: opts.level || 'info',
      }
    }
  };

  log4js.configure(options);

  return log4js;
}

module.exports = configureLogger;
