'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsImmutabilityHelper = require('../utils/immutability-helper');

var _utilsImmutabilityHelper2 = _interopRequireDefault(_utilsImmutabilityHelper);

var _utilsStyles = require('../utils/styles');

var _utilsStyles2 = _interopRequireDefault(_utilsStyles);

// This mixin isn't necessary and will be removed

/**
 *	@params:
 *	styles = Current styles.
 *  props = New style properties that will override the current style.
 */
exports['default'] = {

  propTypes: {
    style: _react2['default'].PropTypes.object
  },

  //Moved this function to ImmutabilityHelper.merge
  mergeStyles: function mergeStyles() {
    return _utilsImmutabilityHelper2['default'].merge.apply(this, arguments);
  },

  //Moved this function to /utils/styles.js
  mergeAndPrefix: function mergeAndPrefix() {
    return _utilsStyles2['default'].mergeAndPrefix.apply(this, arguments);
  },

  // prepareStyles is used to merge multiple styles, make sure they are flipped to rtl
  // if needed, and then autoprefix them. It should probably always be used instead of
  // mergeAndPrefix.
  //
  // Never call this on the same style object twice. As a rule of thumb,
  // only call it when passing style attribute to html elements.
  // If you call it twice you'll get a warning anyway.
  prepareStyles: function prepareStyles() {
    return _utilsStyles2['default'].prepareStyles.apply(_utilsStyles2['default'], [this.state && this.state.muiTheme || this.context.muiTheme].concat([].slice.apply(arguments)));
  }
};
module.exports = exports['default'];