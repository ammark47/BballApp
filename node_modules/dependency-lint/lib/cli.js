(function() {
  var asyncHandlers, docopt, extensions, fs, generateConfig, options, path;

  asyncHandlers = require('async-handlers');

  docopt = require('docopt').docopt;

  fs = require('fs-extra');

  path = require('path');

  extensions = require('./configuration_loader/supported_file_extensions');

  options = docopt("Usage:\n  dependency-lint [--generate-config (" + (extensions.join(' | ')) + ")]\n\nOptions:\n  -h, --help           Show this screen\n  --generate-config    Generate a configuration file");

  generateConfig = function() {
    var callback, dest, destFilename, extension, i, len, src;
    for (i = 0, len = extensions.length; i < len; i++) {
      extension = extensions[i];
      if (options[extension]) {
        break;
      }
    }
    src = path.join(__dirname, '..', 'config', "default." + extension);
    destFilename = "dependency-lint." + extension;
    dest = path.join(process.cwd(), destFilename);
    callback = function(err) {
      asyncHandlers.exitOnError(err);
      return console.log("Configuration file generated at \"" + destFilename + "\"");
    };
    return fs.copy(src, dest, callback);
  };

  if (options['--generate-config']) {
    generateConfig();
  } else {
    require('./run');
  }

}).call(this);
