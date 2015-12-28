'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utilsEvents = require('../utils/events');

var _utilsEvents2 = _interopRequireDefault(_utilsEvents);

var _utilsDom = require('../utils/dom');

var _utilsDom2 = _interopRequireDefault(_utilsDom);

exports['default'] = {

  //When the component mounts, listen to click events and check if we need to
  //Call the componentClickAway function.
  componentDidMount: function componentDidMount() {
    if (!this.manuallyBindClickAway) this._bindClickAway();
  },

  componentWillUnmount: function componentWillUnmount() {
    this._unbindClickAway();
  },

  _checkClickAway: function _checkClickAway(event) {
    if (this.isMounted()) {
      var el = _reactDom2['default'].findDOMNode(this);

      // Check if the target is inside the current component
      if (event.target !== el && !_utilsDom2['default'].isDescendant(el, event.target) && document.documentElement.contains(event.target)) {
        if (this.componentClickAway) this.componentClickAway(event);
      }
    }
  },

  _bindClickAway: function _bindClickAway() {
    // On touch-enabled devices, both events fire, and the handler is called twice,
    // but it's fine since all operations for which the mixin is used
    // are idempotent.
    _utilsEvents2['default'].on(document, 'mouseup', this._checkClickAway);
    _utilsEvents2['default'].on(document, 'touchend', this._checkClickAway);
  },

  _unbindClickAway: function _unbindClickAway() {
    _utilsEvents2['default'].off(document, 'mouseup', this._checkClickAway);
    _utilsEvents2['default'].off(document, 'touchend', this._checkClickAway);
  }

};
module.exports = exports['default'];