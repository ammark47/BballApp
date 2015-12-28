"use strict";

exports.__esModule = true;
exports["default"] = clone;
var stringify = JSON.stringify;
var parse = JSON.parse;

/**
 * Deeply clone object using serialization.
 * Expects object to be plain and without cyclic dependencies.
 *
 * http://jsperf.com/lodash-deepclone-vs-jquery-extend-deep/6
 *
 * @type {Object} obj
 * @return {Object}
 */

function clone(obj) {
  return parse(stringify(obj));
}

module.exports = exports["default"];