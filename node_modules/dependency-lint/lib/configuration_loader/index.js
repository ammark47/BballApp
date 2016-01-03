(function() {
  var ConfigurationLoader, _, async, asyncHandlers, extensions, fs, fsExtra, path, yaml,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    slice = [].slice;

  _ = require('lodash');

  async = require('async');

  asyncHandlers = require('async-handlers');

  extensions = require('./supported_file_extensions');

  fs = require('fs');

  fsExtra = require('fs-extra');

  path = require('path');

  yaml = require('js-yaml');

  require('coffee-script/register');

  require('fs-cson/register');

  ConfigurationLoader = (function() {
    function ConfigurationLoader() {
      this.loadUserConfig = bind(this.loadUserConfig, this);
      this.loadDefaultConfig = bind(this.loadDefaultConfig, this);
      this.loadConfig = bind(this.loadConfig, this);
    }

    ConfigurationLoader.prototype.defaultConfigPath = path.join(__dirname, '..', '..', 'config', 'default.json');

    ConfigurationLoader.prototype.load = function(dir, done) {
      var merge;
      merge = function(args) {
        return _.assign.apply(_, [{}].concat(slice.call(args)));
      };
      return async.parallel([
        this.loadDefaultConfig, (function(_this) {
          return function(next) {
            return _this.loadUserConfig(dir, next);
          };
        })(this)
      ], asyncHandlers.transform(merge, done));
    };

    ConfigurationLoader.prototype.loadConfig = function(filePath, done) {
      var handler;
      if (!filePath) {
        return done();
      }
      handler = asyncHandlers.prependToError(filePath, done);
      switch (path.extname(filePath)) {
        case '.coffee':
        case '.cson':
        case '.js':
        case '.json':
          return this.toAsync((function() {
            return require(filePath);
          }), handler);
        case '.yml':
        case '.yaml':
          return async.waterfall([
            function(next) {
              return fs.readFile(filePath, 'utf8', next);
            }, (function(_this) {
              return function(content, next) {
                return _this.toAsync((function() {
                  return yaml.safeLoad(content);
                }), next);
              };
            })(this)
          ], handler);
      }
    };

    ConfigurationLoader.prototype.loadDefaultConfig = function(done) {
      return fsExtra.readJson(this.defaultConfigPath, done);
    };

    ConfigurationLoader.prototype.loadUserConfig = function(dir, done) {
      var filePaths;
      filePaths = _.map(extensions, function(ext) {
        return path.join(dir, "dependency-lint." + ext);
      });
      return async.waterfall([
        function(next) {
          return async.detect(filePaths, fs.exists, function(result) {
            return next(null, result);
          });
        }, this.loadConfig
      ], done);
    };

    ConfigurationLoader.prototype.toAsync = function(fn, done) {
      var err, error, result;
      try {
        result = fn();
      } catch (error) {
        err = error;
        done(err);
      }
      return done(null, result);
    };

    return ConfigurationLoader;

  })();

  module.exports = ConfigurationLoader;

}).call(this);
