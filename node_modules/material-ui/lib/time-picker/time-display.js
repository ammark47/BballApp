'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var TimeDisplay = _react2['default'].createClass({
  displayName: 'TimeDisplay',

  mixins: [_mixinsStylePropable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  propTypes: {
    affix: _react2['default'].PropTypes.oneOf(['', 'pm', 'am']),
    format: _react2['default'].PropTypes.oneOf(['ampm', '24hr']),
    mode: _react2['default'].PropTypes.oneOf(['hour', 'minute']),
    onSelectHour: _react2['default'].PropTypes.func,
    onSelectMin: _react2['default'].PropTypes.func,
    selectedTime: _react2['default'].PropTypes.object.isRequired
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
      transitionDirection: 'up',
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      mode: 'hour',
      affix: ''
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var direction = undefined;
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });

    if (nextProps.selectedTime !== this.props.selectedTime) {
      direction = nextProps.selectedTime > this.props.selectedTime ? 'up' : 'down';

      this.setState({
        transitionDirection: direction
      });
    }
  },

  sanitizeTime: function sanitizeTime() {
    var hour = this.props.selectedTime.getHours();
    var min = this.props.selectedTime.getMinutes().toString();

    if (this.props.format === 'ampm') {
      hour %= 12;
      hour = hour || 12;
    }

    hour = hour.toString();
    if (hour.length < 2) hour = '0' + hour;
    if (min.length < 2) min = '0' + min;

    return [hour, min];
  },

  getTheme: function getTheme() {
    return this.state.muiTheme.timePicker;
  },

  render: function render() {
    var _props = this.props;
    var selectedTime = _props.selectedTime;
    var mode = _props.mode;

    var other = _objectWithoutProperties(_props, ['selectedTime', 'mode']);

    var styles = {
      root: {
        textAlign: 'center',
        position: 'relative',
        width: 280,
        height: '100%'
      },

      time: {
        margin: '6px 0',
        lineHeight: '58px',
        height: 58,
        fontSize: '58px'
      },

      box: {
        padding: '16px 0',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        backgroundColor: this.getTheme().headerColor,
        color: this.getTheme().textColor
      },

      text: {
        color: 'white',
        opacity: 0.7
      },

      hour: {},

      minute: {}
    };

    var _sanitizeTime = this.sanitizeTime();

    var _sanitizeTime2 = _slicedToArray(_sanitizeTime, 2);

    var hour = _sanitizeTime2[0];
    var min = _sanitizeTime2[1];

    styles[mode].opacity = 1.0;

    return _react2['default'].createElement(
      'div',
      _extends({}, other, { style: this.prepareStyles(styles.root) }),
      _react2['default'].createElement(
        'div',
        { style: this.prepareStyles(styles.box) },
        _react2['default'].createElement(
          'div',
          { style: this.prepareStyles(styles.time) },
          _react2['default'].createElement(
            'span',
            { style: this.prepareStyles(styles.text, styles.hour), onTouchTap: this.props.onSelectHour },
            hour
          ),
          _react2['default'].createElement(
            'span',
            { style: this.prepareStyles(styles.text) },
            ':'
          ),
          _react2['default'].createElement(
            'span',
            { style: this.prepareStyles(styles.text, styles.minute), onTouchTap: this.props.onSelectMin },
            min
          )
        ),
        _react2['default'].createElement(
          'span',
          { key: "affix" },
          this.props.affix.toUpperCase()
        )
      )
    );
  }

});

exports['default'] = TimeDisplay;
module.exports = exports['default'];