(function() {
  var ExecutedModulesFinder, ModuleNameParser, _, async, asyncHandlers, fs, path,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ = require('lodash');

  async = require('async');

  asyncHandlers = require('async-handlers');

  fs = require('fs');

  ModuleNameParser = require('./module_name_parser');

  path = require('path');

  ExecutedModulesFinder = (function() {
    function ExecutedModulesFinder() {
      this.findModuleExecutableUsage = bind(this.findModuleExecutableUsage, this);
    }

    ExecutedModulesFinder.prototype.find = function(dir, done) {
      var callback, dependencies, devDependencies, ref, scripts;
      ref = require(path.join(dir, 'package.json')), scripts = ref.scripts, dependencies = ref.dependencies, devDependencies = ref.devDependencies;
      if (!scripts) {
        scripts = {};
      }
      callback = (function(_this) {
        return function(arg) {
          var _, moduleExecutables;
          _ = arg[0], moduleExecutables = arg[1];
          return _this.findModuleExecutableUsage({
            moduleExecutables: moduleExecutables,
            scripts: scripts
          });
        };
      })(this);
      return async.parallel([
        (function(_this) {
          return function(next) {
            var modulesListed;
            modulesListed = _.keys(dependencies).concat(_.keys(devDependencies));
            return _this.ensureAllModulesInstalled({
              dir: dir,
              modulesListed: modulesListed
            }, next);
          };
        })(this), (function(_this) {
          return function(next) {
            return _this.getModuleExecutables(dir, next);
          };
        })(this)
      ], asyncHandlers.transform(callback, done));
    };

    ExecutedModulesFinder.prototype.ensureAllModulesInstalled = function(arg, done) {
      var callback, dir, iterator, missing, modulesListed;
      dir = arg.dir, modulesListed = arg.modulesListed;
      missing = [];
      iterator = function(moduleName, next) {
        return fs.access(path.join(dir, 'node_modules', moduleName), function(err) {
          if (err) {
            missing.push(moduleName);
          }
          return next();
        });
      };
      callback = function(err) {
        if (err) {
          return done(err);
        }
        if (missing.length === 0) {
          return done();
        }
        return done(new Error("The following modules are listed in your `package.json` but are not installed.\n  " + (missing.join('\n  ')) + "\nAll modules need to be installed to properly check for the usage of a module's executables."));
      };
      return async.each(modulesListed, iterator, callback);
    };

    ExecutedModulesFinder.prototype.findInScript = function(script, moduleExecutables) {
      var executable, executables, i, len, moduleName, result;
      result = [];
      for (moduleName in moduleExecutables) {
        executables = moduleExecutables[moduleName];
        for (i = 0, len = executables.length; i < len; i++) {
          executable = executables[i];
          if (ModuleNameParser.isGlobalExecutable(executable)) {
            continue;
          }
          if (script.match(executable) && indexOf.call(result, moduleName) < 0) {
            result.push(moduleName);
          }
        }
      }
      return result;
    };

    ExecutedModulesFinder.prototype.findModuleExecutableUsage = function(arg) {
      var i, len, moduleExecutables, moduleName, ref, result, script, scriptName, scripts;
      moduleExecutables = arg.moduleExecutables, scripts = arg.scripts;
      result = [];
      for (scriptName in scripts) {
        script = scripts[scriptName];
        ref = this.findInScript(script, moduleExecutables);
        for (i = 0, len = ref.length; i < len; i++) {
          moduleName = ref[i];
          result.push({
            name: moduleName,
            script: scriptName
          });
        }
      }
      return result;
    };

    ExecutedModulesFinder.prototype.getModuleExecutables = function(dir, done) {
      var binPath;
      binPath = path.join(dir, 'node_modules', '.bin');
      return async.auto({
        executables: function(next) {
          return fs.access(binPath, function(err) {
            if (err) {
              return done(null, []);
            }
            return fs.readdir(binPath, next);
          });
        },
        links: [
          'executables', function(next, arg) {
            var executables, files;
            executables = arg.executables;
            files = executables.map(function(file) {
              return path.join(binPath, file);
            });
            return async.map(files, fs.readlink, next);
          }
        ]
      }, asyncHandlers.transform(this.parseModuleExecutables, done));
    };

    ExecutedModulesFinder.prototype.parseModuleExecutables = function(arg) {
      var executables, links, result;
      executables = arg.executables, links = arg.links;
      result = {};
      links.forEach(function(link, index) {
        var name;
        name = ModuleNameParser.stripSubpath(path.relative('..', link));
        if (!result[name]) {
          result[name] = [];
        }
        return result[name].push(path.basename(executables[index]));
      });
      return result;
    };

    return ExecutedModulesFinder;

  })();

  module.exports = ExecutedModulesFinder;

}).call(this);
