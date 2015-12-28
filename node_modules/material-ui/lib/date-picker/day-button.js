'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesTransitions = require('../styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

var _utilsDateTime = require('../utils/date-time');

var _utilsDateTime2 = _interopRequireDefault(_utilsDateTime);

var _enhancedButton = require('../enhanced-button');

var _enhancedButton2 = _interopRequireDefault(_enhancedButton);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var DayButton = _react2['default'].createClass({
  displayName: 'DayButton',

  mixins: [_mixinsStylePropable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  propTypes: {
    date: _react2['default'].PropTypes.object,
    disabled: _react2['default'].PropTypes.bool,
    onKeyboardFocus: _react2['default'].PropTypes.func,
    onTouchTap: _react2['default'].PropTypes.func,
    selected: _react2['default'].PropTypes.bool
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

  getDefaultProps: function getDefaultProps() {
    return {
      selected: false,
      disabled: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      hover: false,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  getTheme: function getTheme() {
    return this.state.muiTheme.datePicker;
  },

  render: function render() {
    var _props = this.props;
    var date = _props.date;
    var onTouchTap = _props.onTouchTap;
    var selected = _props.selected;

    var other = _objectWithoutProperties(_props, ['date', 'onTouchTap', 'selected']);

    var styles = {
      root: {
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        position: 'relative',
        float: 'left',
        width: 41,
        padding: '4px 2px'
      },

      label: {
        position: 'relative',
        color: this.state.muiTheme.rawTheme.palette.textColor
      },

      buttonState: {
        position: 'absolute',
        height: 36,
        width: 36,
        top: 2,
        opacity: 0,
        borderRadius: '50%',
        transform: 'scale(0)',
        transition: _stylesTransitions2['default'].easeOut(),
        backgroundColor: this.getTheme().selectColor
      }
    };

    if (this.state.hover) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.buttonState.opacity = '0.6';
      styles.buttonState.transform = 'scale(1)';
    }

    if (this.props.selected) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.buttonState.opacity = 1;
      styles.buttonState.transform = 'scale(1)';
    } else if (this.props.disabled) {
      styles.root.opacity = '0.6';
    }

    if (_utilsDateTime2['default'].isEqualDate(this.props.date, new Date()) && !this.props.selected) {
      styles.label.color = this.getTheme().color;
    }

    return this.props.date ? _react2['default'].createElement(
      _enhancedButton2['default'],
      _extends({}, other, {
        style: styles.root,
        hoverStyle: styles.hover,
        disabled: this.props.disabled,
        disableFocusRipple: true,
        disableTouchRipple: true,
        onMouseEnter: this._handleMouseEnter,
        onMouseLeave: this._handleMouseLeave,
        onTouchTap: this._handleTouchTap,
        onKeyboardFocus: this._handleKeyboardFocus }),
      _react2['default'].createElement('div', { style: this.prepareStyles(styles.buttonState) }),
      _react2['default'].createElement(
        'span',
        { style: this.prepareStyles(styles.label) },
        this.props.date.getDate()
      )
    ) : _react2['default'].createElement('span', { style: this.prepareStyles(styles.root) });
  },

  _handleMouseEnter: function _handleMouseEnter() {
    if (!this.props.disabled) this.setState({ hover: true });
  },

  _handleMouseLeave: function _handleMouseLeave() {
    if (!this.props.disabled) this.setState({ hover: false });
  },

  _handleTouchTap: function _handleTouchTap(e) {
    if (!this.props.disabled && this.props.onTouchTap) this.props.onTouchTap(e, this.props.date);
  },

  _handleKeyboardFocus: function _handleKeyboardFocus(e, keyboardFocused) {
    if (!this.props.disabled && this.props.onKeyboardFocus) {
      this.props.onKeyboardFocus(e, keyboardFocused, this.props.date);
    }
  }

});

exports['default'] = DayButton;
module.exports = exports['default'];