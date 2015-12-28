'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var ClockPointer = _react2['default'].createClass({
  displayName: 'ClockPointer',

  mixins: [_mixinsStylePropable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  propTypes: {
    hasSelected: _react2['default'].PropTypes.bool,
    type: _react2['default'].PropTypes.oneOf(['hour', 'minute']),
    value: _react2['default'].PropTypes.number
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },

  getInitialState: function getInitialState() {
    return {
      inner: this.isInner(this.props.value),
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      value: null,
      type: 'minute',
      hasSelected: false
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      inner: this.isInner(nextProps.value),
      muiTheme: newMuiTheme
    });
  },

  isInner: function isInner(value) {
    if (this.props.type !== 'hour') {
      return false;
    }
    return value < 1 || value > 12;
  },

  getAngle: function getAngle() {
    if (this.props.type === 'hour') {
      return this.calcAngle(this.props.value, 12);
    }

    return this.calcAngle(this.props.value, 60);
  },

  calcAngle: function calcAngle(value, base) {
    value %= base;
    var angle = 360 / base * value;
    return angle;
  },

  getTheme: function getTheme() {
    return this.state.muiTheme.timePicker;
  },

  render: function render() {
    if (this.props.value === null) {
      return _react2['default'].createElement('span', null);
    }

    var angle = this.getAngle();

    var styles = {
      root: {
        height: '30%',
        background: this.getTheme().accentColor,
        width: 2,
        left: 'calc(50% - 1px)',
        position: 'absolute',
        bottom: '50%',
        transformOrigin: 'bottom',
        pointerEvents: 'none',
        transform: 'rotateZ(' + angle + 'deg)'
      },
      mark: {
        background: this.getTheme().selectTextColor,
        border: '4px solid ' + this.getTheme().accentColor,
        width: 7,
        height: 7,
        position: 'absolute',
        top: -5,
        left: -6,
        borderRadius: '100%'
      }
    };

    if (!this.state.inner) {
      styles.root.height = '40%';
    }

    if (this.props.hasSelected) {
      styles.mark.display = 'none';
    }

    return _react2['default'].createElement(
      'div',
      { style: this.prepareStyles(styles.root) },
      _react2['default'].createElement('div', { style: this.prepareStyles(styles.mark) })
    );
  }
});

exports['default'] = ClockPointer;
module.exports = exports['default'];