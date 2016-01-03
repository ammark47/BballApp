(function() {
  var DependencyLinter, _, minimatch,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ = require('lodash');

  minimatch = require('minimatch');

  DependencyLinter = (function() {
    function DependencyLinter(arg) {
      this.allowUnused = arg.allowUnused, this.devFilePatterns = arg.devFilePatterns, this.devScripts = arg.devScripts;
      this.isDevScript = bind(this.isDevScript, this);
      this.isDevFile = bind(this.isDevFile, this);
      this.lint = bind(this.lint, this);
    }

    DependencyLinter.prototype.lint = function(arg) {
      var i, j, key, len, len1, listedModule, listedModules, modules, name, ref, ref1, result, status, usedModule, usedModules;
      listedModules = arg.listedModules, usedModules = arg.usedModules;
      result = {
        dependencies: [],
        devDependencies: []
      };
      for (i = 0, len = usedModules.length; i < len; i++) {
        usedModule = usedModules[i];
        status = {
          isDependency: !this.isDevDependency(usedModule),
          listedAsDependency: (ref = usedModule.name, indexOf.call(listedModules.dependencies, ref) >= 0),
          listedAsDevDependency: (ref1 = usedModule.name, indexOf.call(listedModules.devDependencies, ref1) >= 0)
        };
        this.parseUsedModule(usedModule, status, result);
      }
      for (key in listedModules) {
        modules = listedModules[key];
        for (j = 0, len1 = modules.length; j < len1; j++) {
          name = modules[j];
          if (!(!_.any(usedModules, function(moduleData) {
            return moduleData.name === name;
          }))) {
            continue;
          }
          listedModule = {
            name: name
          };
          if (this.allowedToBeUnused(name)) {
            listedModule.warning = 'unused - allowed';
          } else {
            listedModule.error = 'unused';
          }
          result[key].push(listedModule);
        }
      }
      result.dependencies = _.sortBy(result.dependencies, 'name');
      result.devDependencies = _.sortBy(result.devDependencies, 'name');
      return result;
    };

    DependencyLinter.prototype.allowedToBeUnused = function(name) {
      return _.any(this.allowUnused, function(regex) {
        return name.match(regex);
      });
    };

    DependencyLinter.prototype.isDevDependency = function(arg) {
      var files, scripts;
      files = arg.files, scripts = arg.scripts;
      return _.all(files, this.isDevFile) && _.all(scripts, this.isDevScript);
    };

    DependencyLinter.prototype.isDevFile = function(file) {
      return _.any(this.devFilePatterns, function(pattern) {
        return minimatch(file, pattern);
      });
    };

    DependencyLinter.prototype.isDevScript = function(script) {
      return _.any(this.devScripts, function(regex) {
        return script.match(regex);
      });
    };

    DependencyLinter.prototype.parseUsedModule = function(usedModule, status, result) {
      var isDependency, listedAsDependency, listedAsDevDependency;
      isDependency = status.isDependency, listedAsDependency = status.listedAsDependency, listedAsDevDependency = status.listedAsDevDependency;
      if (isDependency) {
        if (listedAsDependency) {
          result.dependencies.push(usedModule);
        }
        if (listedAsDevDependency) {
          result.devDependencies.push(_.assign({}, usedModule, {
            error: 'should be dependency'
          }));
        }
        if (!(listedAsDependency || listedAsDevDependency)) {
          return result.dependencies.push(_.assign({}, usedModule, {
            error: 'missing'
          }));
        }
      } else {
        if (listedAsDependency) {
          result.dependencies.push(_.assign({}, usedModule, {
            error: 'should be devDependency'
          }));
        }
        if (listedAsDevDependency) {
          result.devDependencies.push(usedModule);
        }
        if (!(listedAsDependency || listedAsDevDependency)) {
          return result.devDependencies.push(_.assign({}, usedModule, {
            error: 'missing'
          }));
        }
      }
    };

    return DependencyLinter;

  })();

  module.exports = DependencyLinter;

}).call(this);
