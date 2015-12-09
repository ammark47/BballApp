var fontFaceAttrs = require('font-face-attrs');
var indexOf = require('indexof');

module.exports = function(family, options) {
  var output = [
    '@font-face {',
    'font-family: ' + family + ';'
  ];
  var src = options.src || [];

  if (src.length === 0) {
    throw new Error('At least one font source (SRC) must be present!');
  }

  // re: local see http://www.paulirish.com/2009/bulletproof-font-face-implementation-syntax/
  output.push('src: local("☺︎"), ' + src.join(', ') + ';');
  Object.keys(options).forEach(function(key) {
    if (key !== 'src' && indexOf(fontFaceAttrs, key) !== -1) {
      output.push(key + ': ' + options[key] + ';');
    }
  });

  output.push('}');
  return output.join('\n');
};
