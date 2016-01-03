(function() {
  var ConfigurationLoader, DefaultFormatter, Linter, _, async, asyncHandlers, dir, hasError;

  _ = require('lodash');

  async = require('async');

  asyncHandlers = require('async-handlers');

  ConfigurationLoader = require('./configuration_loader');

  Linter = require('./linter');

  DefaultFormatter = require('./formatters/default_formatter');

  hasError = function(results) {
    return _.any(results, function(modules) {
      return _.any(modules, function(arg) {
        var error;
        error = arg.error;
        return error;
      });
    });
  };

  dir = process.cwd();

  async.waterfall([
    function(next) {
      return new ConfigurationLoader().load(dir, next);
    }, function(config, next) {
      return new Linter(config).lint(dir, next);
    }, function(results, next) {
      new DefaultFormatter({
        stream: process.stdout
      }).print(results);
      if (hasError(results)) {
        return process.exit(1);
      }
    }
  ], asyncHandlers.exitOnError);

}).call(this);
