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

var _enhancedSwitch = require('./enhanced-switch');

var _enhancedSwitch2 = _interopRequireDefault(_enhancedSwitch);

var _svgIconsToggleRadioButtonUnchecked = require('./svg-icons/toggle/radio-button-unchecked');

var _svgIconsToggleRadioButtonUnchecked2 = _interopRequireDefault(_svgIconsToggleRadioButtonUnchecked);

var _svgIconsToggleRadioButtonChecked = require('./svg-icons/toggle/radio-button-checked');

var _svgIconsToggleRadioButtonChecked2 = _interopRequireDefault(_svgIconsToggleRadioButtonChecked);

var _stylesRawThemesLightRawTheme = require('./styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('./styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var RadioButton = _react2['default'].createClass({
  displayName: 'RadioButton',

  mixins: [_mixinsStylePropable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
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
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  propTypes: {
    checked: _react2['default'].PropTypes.bool,
    disabled: _react2['default'].PropTypes.bool,
    iconStyle: _react2['default'].PropTypes.object,
    labelPosition: _react2['default'].PropTypes.oneOf(['left', 'right']),
    labelStyle: _react2['default'].PropTypes.object,
    onCheck: _react2['default'].PropTypes.func,
    value: _react2['default'].PropTypes.string
  },

  getTheme: function getTheme() {
    return this.state.muiTheme.radioButton;
  },

  getStyles: function getStyles() {
    var styles = {
      icon: {
        height: this.getTheme().size,
        width: this.getTheme().size
      },
      target: {
        transition: _stylesTransitions2['default'].easeOut(),
        position: 'absolute',
        opacity: 1,
        transform: 'scale(1)',
        fill: this.getTheme().borderColor
      },
      fill: {
        position: 'absolute',
        opacity: 1,
        transform: 'scale(0)',
        transformOrigin: '50% 50%',
        transition: _stylesTransitions2['default'].easeOut(),
        fill: this.getTheme().checkedColor
      },
      targetWhenChecked: {
        opacity: 0,
        transform: 'scale(0)'
      },
      fillWhenChecked: {
        opacity: 1,
        transform: 'scale(1)'
      },
      targetWhenDisabled: {
        fill: this.getTheme().disabledColor
      },
      fillWhenDisabled: {
        fill: this.getTheme().disabledColor
      },
      label: {
        color: this.props.disabled ? this.getTheme().labelDisabledColor : this.getTheme().labelColor
      }
    };

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var onCheck = _props.onCheck;

    var other = _objectWithoutProperties(_props, ['onCheck']);

    var styles = this.getStyles();
    var onStyles = this.mergeStyles(styles.target, this.props.checked && styles.targetWhenChecked, this.props.iconStyle, this.props.disabled && styles.targetWhenDisabled);
    var offStyles = this.mergeStyles(styles.fill, this.props.checked && styles.fillWhenChecked, this.props.iconStyle, this.props.disabled && styles.fillWhenDisabled);

    var radioButtonElement = _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement(_svgIconsToggleRadioButtonUnchecked2['default'], { style: onStyles }),
      _react2['default'].createElement(_svgIconsToggleRadioButtonChecked2['default'], { style: offStyles })
    );

    var rippleColor = this.props.checked ? this.getTheme().checkedColor : this.getTheme().borderColor;

    var iconStyle = this.mergeStyles(styles.icon, this.props.iconStyle);

    var labelStyle = this.mergeStyles(styles.label, this.props.labelStyle);

    var enhancedSwitchProps = {
      ref: 'enhancedSwitch',
      inputType: 'radio',
      switched: this.props.checked || false,
      switchElement: radioButtonElement,
      rippleColor: rippleColor,
      iconStyle: iconStyle,
      labelStyle: labelStyle,
      onSwitch: this._handleCheck,
      onParentShouldUpdate: this._handleStateChange,
      labelPosition: this.props.labelPosition ? this.props.labelPosition : 'right'
    };

    return _react2['default'].createElement(_enhancedSwitch2['default'], _extends({}, other, enhancedSwitchProps));
  },

  // Only called when selected, not when unselected.
  _handleCheck: function _handleCheck(e) {
    if (this.props.onCheck) this.props.onCheck(e, this.props.value);
  },

  _handleStateChange: function _handleStateChange() {},

  isChecked: function isChecked() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  // Use RadioButtonGroup.setSelectedValue(newSelectionValue) to set a
  // RadioButton's checked value.
  setChecked: function setChecked(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
  },

  getValue: function getValue() {
    return this.refs.enhancedSwitch.getValue();
  }

});

exports['default'] = RadioButton;
module.exports = exports['default'];