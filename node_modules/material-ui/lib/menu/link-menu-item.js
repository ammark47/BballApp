'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var LinkMenuItem = _react2['default'].createClass({
  displayName: 'LinkMenuItem',

  mixins: [_mixinsStylePropable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  propTypes: {
    active: _react2['default'].PropTypes.bool,
    className: _react2['default'].PropTypes.string,
    disabled: _react2['default'].PropTypes.bool,
    index: _react2['default'].PropTypes.number.isRequired,
    onMouseEnter: _react2['default'].PropTypes.func,
    onMouseLeave: _react2['default'].PropTypes.func,
    payload: _react2['default'].PropTypes.string.isRequired,
    selected: _react2['default'].PropTypes.bool,
    style: _react2['default'].PropTypes.object,
    target: _react2['default'].PropTypes.string,
    text: _react2['default'].PropTypes.string.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      active: false,
      disabled: false
    };
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
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default']),
      hovered: false
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  getTheme: function getTheme() {
    return this.state.muiTheme.menuItem;
  },

  getStyles: function getStyles() {
    var style = {
      root: {
        userSelect: 'none',
        cursor: 'pointer',
        display: 'block',
        lineHeight: this.getTheme().height + 'px',
        paddingLeft: this.getTheme().padding,
        paddingRight: this.getTheme().padding
      },
      rootWhenHovered: {
        backgroundColor: this.getTheme().hoverColor
      },
      rootWhenSelected: {
        color: this.getTheme().selectedTextColor
      },
      rootWhenDisabled: {
        cursor: 'default',
        color: this.state.muiTheme.rawTheme.palette.disabledColor
      }
    };

    return style;
  },

  render: function render() {
    var onClickHandler = this.props.disabled ? this._stopLink : undefined;
    // Prevent context menu 'Open In New Tab/Window'
    var linkAttribute = this.props.disabled ? 'data-href' : 'href';
    var link = {};
    link[linkAttribute] = this.props.payload;

    var styles = this.getStyles();

    var linkStyles = this.prepareStyles(styles.root, this.props.selected && styles.rootWhenSelected, this.props.selected && styles.rootWhenSelected, this.props.active && !this.props.disabled && styles.rootWhenHovered, this.props.style, this.props.disabled && styles.rootWhenDisabled);

    return _react2['default'].createElement(
      'a',
      _extends({
        key: this.props.index,
        target: this.props.target,
        style: linkStyles }, link, {
        className: this.props.className,
        onClick: onClickHandler,
        onMouseEnter: this._handleMouseEnter,
        onMouseLeave: this._handleMouseLeave }),
      this.props.text
    );
  },

  _stopLink: function _stopLink(event) {
    event.preventDefault();
  },

  _handleMouseEnter: function _handleMouseEnter(e) {
    this.setState({ hovered: true });
    if (!this.props.disabled && this.props.onMouseEnter) this.props.onMouseEnter(e);
  },

  _handleMouseLeave: function _handleMouseLeave(e) {
    this.setState({ hovered: false });
    if (!this.props.disabled && this.props.onMouseLeave) this.props.onMouseLeave(e);
  }
});

exports['default'] = LinkMenuItem;
module.exports = exports['default'];