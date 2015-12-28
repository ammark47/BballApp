'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mixinsStylePropable = require('./mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesTransitions = require('./styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

var _paper = require('./paper');

var _paper2 = _interopRequireDefault(_paper);

var _enhancedSwitch = require('./enhanced-switch');

var _enhancedSwitch2 = _interopRequireDefault(_enhancedSwitch);

var _stylesRawThemesLightRawTheme = require('./styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('./styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var Toggle = _react2['default'].createClass({
  displayName: 'Toggle',

  mixins: [_mixinsStylePropable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  propTypes: {
    defaultToggled: _react2['default'].PropTypes.bool,
    disabled: _react2['default'].PropTypes.bool,
    elementStyle: _react2['default'].PropTypes.object,
    iconStyle: _react2['default'].PropTypes.object,
    labelPosition: _react2['default'].PropTypes.oneOf(['left', 'right']),
    labelStyle: _react2['default'].PropTypes.object,
    onToggle: _react2['default'].PropTypes.func,
    rippleStyle: _react2['default'].PropTypes.object,
    thumbStyle: _react2['default'].PropTypes.object,
    toggled: _react2['default'].PropTypes.bool,
    trackStyle: _react2['default'].PropTypes.object,
    valueLink: _react2['default'].PropTypes.object
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
      switched: this.props.toggled || this.props.defaultToggled || this.props.valueLink && this.props.valueLink.value || false,
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
    return this.state.muiTheme.toggle;
  },

  getStyles: function getStyles() {
    var toggleSize = 20;
    var toggleTrackWidth = 36;
    var styles = {
      icon: {
        width: 36,
        padding: '4px 0px 6px 2px'
      },
      toggleElement: {
        width: toggleTrackWidth
      },
      track: {
        transition: _stylesTransitions2['default'].easeOut(),
        width: '100%',
        height: 14,
        borderRadius: 30,
        backgroundColor: this.getTheme().trackOffColor
      },
      thumb: {
        transition: _stylesTransitions2['default'].easeOut(),
        position: 'absolute',
        top: 1,
        left: 0,
        width: toggleSize,
        height: toggleSize,
        lineHeight: '24px',
        borderRadius: '50%',
        backgroundColor: this.getTheme().thumbOffColor
      },
      trackWhenSwitched: {
        backgroundColor: this.getTheme().trackOnColor
      },
      thumbWhenSwitched: {
        backgroundColor: this.getTheme().thumbOnColor,
        left: '100%'
      },
      trackWhenDisabled: {
        backgroundColor: this.getTheme().trackDisabledColor
      },
      thumbWhenDisabled: {
        backgroundColor: this.getTheme().thumbDisabledColor
      },
      label: {
        color: this.props.disabled ? this.getTheme().labelDisabledColor : this.getTheme().labelColor,
        width: 'calc(100% - ' + (toggleTrackWidth + 10) + 'px)'
      }
    };

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var onToggle = _props.onToggle;

    var other = _objectWithoutProperties(_props, ['onToggle']);

    var styles = this.getStyles();

    var trackStyles = this.mergeStyles(styles.track, this.props.trackStyle, this.state.switched && styles.trackWhenSwitched, this.props.disabled && styles.trackWhenDisabled);

    var thumbStyles = this.mergeStyles(styles.thumb, this.props.thumbStyle, this.state.switched && styles.thumbWhenSwitched, this.props.disabled && styles.thumbWhenDisabled);

    if (this.state.switched) {
      thumbStyles.marginLeft = '-' + thumbStyles.width;
    }

    var toggleElementStyles = this.mergeStyles(styles.toggleElement, this.props.elementStyle);

    var toggleElement = _react2['default'].createElement(
      'div',
      { style: this.prepareStyles(toggleElementStyles) },
      _react2['default'].createElement('div', { style: this.prepareStyles(trackStyles) }),
      _react2['default'].createElement(_paper2['default'], { style: thumbStyles, circle: true, zDepth: 1 })
    );

    var customRippleStyle = this.mergeStyles({
      top: -10,
      left: -10
    }, this.props.rippleStyle);

    var rippleColor = this.state.switched ? this.getTheme().thumbOnColor : this.state.muiTheme.textColor;

    var iconStyle = this.mergeStyles(styles.icon, this.props.iconStyle);

    var labelStyle = this.mergeStyles(styles.label, this.props.labelStyle);

    var enhancedSwitchProps = {
      ref: 'enhancedSwitch',
      inputType: 'checkbox',
      switchElement: toggleElement,
      rippleStyle: customRippleStyle,
      rippleColor: rippleColor,
      iconStyle: iconStyle,
      trackStyle: trackStyles,
      thumbStyle: thumbStyles,
      labelStyle: labelStyle,
      switched: this.state.switched,
      onSwitch: this._handleToggle,
      onParentShouldUpdate: this._handleStateChange,
      defaultSwitched: this.props.defaultToggled,
      labelPosition: this.props.labelPosition ? this.props.labelPosition : 'left'
    };

    if (this.props.hasOwnProperty('toggled')) enhancedSwitchProps.checked = this.props.toggled;

    return _react2['default'].createElement(_enhancedSwitch2['default'], _extends({}, other, enhancedSwitchProps));
  },

  isToggled: function isToggled() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setToggled: function setToggled(newToggledValue) {
    this.refs.enhancedSwitch.setSwitched(newToggledValue);
  },

  _handleToggle: function _handleToggle(e, isInputChecked) {
    if (this.props.onToggle) this.props.onToggle(e, isInputChecked);
  },

  _handleStateChange: function _handleStateChange(newSwitched) {
    this.setState({ switched: newSwitched });
  }

});

exports['default'] = Toggle;
module.exports = exports['default'];