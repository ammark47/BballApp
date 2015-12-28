'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsEvents = require('../utils/events');

var _utilsEvents2 = _interopRequireDefault(_utilsEvents);

var Sizes = {
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 3
};

exports['default'] = {

  statics: {
    Sizes: Sizes
  },

  getInitialState: function getInitialState() {
    return {
      deviceSize: Sizes.SMALL
    };
  },

  componentDidMount: function componentDidMount() {
    this._updateDeviceSize();
    if (!this.manuallyBindResize) this._bindResize();
  },

  componentWillUnmount: function componentWillUnmount() {
    this._unbindResize();
  },

  isDeviceSize: function isDeviceSize(desiredSize) {
    return this.state.deviceSize >= desiredSize;
  },

  _updateDeviceSize: function _updateDeviceSize() {
    var width = window.innerWidth;
    if (width >= 992) this.setState({ deviceSize: Sizes.LARGE });else if (width >= 768) this.setState({ deviceSize: Sizes.MEDIUM });else this.setState({ deviceSize: Sizes.SMALL }); // width < 768
  },

  _bindResize: function _bindResize() {
    _utilsEvents2['default'].on(window, 'resize', this._updateDeviceSize);
  },

  _unbindResize: function _unbindResize() {
    _utilsEvents2['default'].off(window, 'resize', this._updateDeviceSize);
  }
};
module.exports = exports['default'];