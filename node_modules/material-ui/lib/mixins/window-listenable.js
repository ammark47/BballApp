'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsEvents = require('../utils/events');

var _utilsEvents2 = _interopRequireDefault(_utilsEvents);

exports['default'] = {

  componentDidMount: function componentDidMount() {
    var listeners = this.windowListeners;

    for (var eventName in listeners) {
      var callbackName = listeners[eventName];
      _utilsEvents2['default'].on(window, eventName, this[callbackName]);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    var listeners = this.windowListeners;

    for (var eventName in listeners) {
      var callbackName = listeners[eventName];
      _utilsEvents2['default'].off(window, eventName, this[callbackName]);
    }
  }

};
module.exports = exports['default'];