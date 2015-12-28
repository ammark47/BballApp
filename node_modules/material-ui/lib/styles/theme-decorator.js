'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

exports['default'] = function (customTheme) {

  return function (Component) {

    return _react2['default'].createClass({

      childContextTypes: {
        muiTheme: _react2['default'].PropTypes.object
      },

      getChildContext: function getChildContext() {
        return {
          muiTheme: customTheme
        };
      },

      render: function render() {
        return _react2['default'].createElement(Component, this.props);
      }
    });
  };
};

module.exports = exports['default'];