(function() {
  var ListedModuleFinder, _, asyncHandlers, fsExtra, path,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ = require('lodash');

  asyncHandlers = require('async-handlers');

  fsExtra = require('fs-extra');

  path = require('path');

  ListedModuleFinder = (function() {
    function ListedModuleFinder() {
      this.find = bind(this.find, this);
    }

    ListedModuleFinder.prototype.find = function(dir, done) {
      var callback, filePath;
      filePath = path.join(dir, 'package.json');
      callback = asyncHandlers.transform(this.extractListedModules, done);
      return fsExtra.readJson(filePath, callback);
    };

    ListedModuleFinder.prototype.extractListedModules = function(packageJson) {
      var result;
      result = {};
      ['dependencies', 'devDependencies'].forEach(function(value) {
        return result[value] = _.keys(packageJson[value]);
      });
      return result;
    };

    return ListedModuleFinder;

  })();

  module.exports = ListedModuleFinder;

}).call(this);
