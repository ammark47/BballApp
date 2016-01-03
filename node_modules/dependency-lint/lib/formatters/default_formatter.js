(function() {
  var DefaultFormatter, _, colors;

  _ = require('lodash');

  colors = require('colors/safe');

  DefaultFormatter = (function() {
    function DefaultFormatter(arg) {
      this.stream = arg.stream;
    }

    DefaultFormatter.prototype.print = function(results) {
      var i, len, module, modules, title;
      for (title in results) {
        modules = results[title];
        if (!(modules.length !== 0)) {
          continue;
        }
        this.write('');
        this.write(title + ":", 1);
        for (i = 0, len = modules.length; i < len; i++) {
          module = modules[i];
          this.write(this.moduleOutput(module), 2);
        }
      }
      this.write('');
      this.write(this.summaryOutput(results), 1);
      return this.write('');
    };

    DefaultFormatter.prototype.moduleOutput = function(arg) {
      var error, files, name, scripts, warning;
      error = arg.error, files = arg.files, name = arg.name, scripts = arg.scripts, warning = arg.warning;
      if (error) {
        return colors.red("✖ " + name + " (" + error + ")") + colors.gray(this.errorSuffix({
          files: files,
          scripts: scripts
        }));
      } else if (warning) {
        return colors.yellow("- " + name + " (" + warning + ")");
      } else {
        return (colors.green('✓')) + " " + name;
      }
    };

    DefaultFormatter.prototype.indent = function(str, count) {
      var i, prefix, ref;
      prefix = '';
      for (i = 1, ref = count; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
        prefix += '  ';
      }
      return prefix + str;
    };

    DefaultFormatter.prototype.write = function(data, indent) {
      if (indent == null) {
        indent = 0;
      }
      data = data.split('\n').map((function(_this) {
        return function(str) {
          return _this.indent(str, indent);
        };
      })(this)).join('\n') + '\n';
      return this.stream.write(data, 'utf8');
    };

    DefaultFormatter.prototype.errorCount = function(results) {
      var error, errors, i, len, modules, title;
      errors = 0;
      for (title in results) {
        modules = results[title];
        for (i = 0, len = modules.length; i < len; i++) {
          error = modules[i].error;
          if (error) {
            errors += 1;
          }
        }
      }
      return errors;
    };

    DefaultFormatter.prototype.errorSuffix = function(usage) {
      var i, item, len, list, suffix, type;
      suffix = '';
      for (type in usage) {
        list = usage[type];
        if (!(list && list.length > 0)) {
          continue;
        }
        suffix += '\n' + this.indent("used in " + type + ":", 2);
        for (i = 0, len = list.length; i < len; i++) {
          item = list[i];
          suffix += '\n' + this.indent(item, 3);
        }
      }
      return suffix;
    };

    DefaultFormatter.prototype.summaryOutput = function(results) {
      var errors, msg, prefix;
      errors = this.errorCount(results);
      prefix = colors.green('✓');
      if (errors > 0) {
        prefix = colors.red('✖');
      }
      msg = prefix + " " + errors + " error";
      if (errors !== 1) {
        msg += 's';
      }
      return msg;
    };

    return DefaultFormatter;

  })();

  module.exports = DefaultFormatter;

}).call(this);
