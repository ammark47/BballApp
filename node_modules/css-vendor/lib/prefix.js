/**
 * Export javascript style and css style vendor prefixes.
 * Based on "transform" support test.
 */

'use strict';

exports.__esModule = true;
var js = '';
var css = '';

// We should not do anything if required serverside.
if (typeof document != 'undefined') {
  var jsCssMap = {
    Webkit: '-webkit-',
    Moz: '-moz-',
    // IE did it wrong again ...
    ms: '-ms-',
    O: '-o-'
  };
  var style = document.createElement('p').style;
  var testProp = 'Transform';

  for (var key in jsCssMap) {
    if (key + testProp in style) {
      js = key;
      css = jsCssMap[key];
      break;
    }
  }
}

/**
 * Vendor prefix string for the current browser.
 *
 * @type {{js: String, css: String}}
 * @api public
 */
exports['default'] = { js: js, css: css };
module.exports = exports['default'];