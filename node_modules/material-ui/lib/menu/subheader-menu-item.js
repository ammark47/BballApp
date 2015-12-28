'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesTypography = require('../styles/typography');

var _stylesTypography2 = _interopRequireDefault(_stylesTypography);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var SubheaderMenuItem = _react2['default'].createClass({
  displayName: 'SubheaderMenuItem',

  mixins: [_mixinsStylePropable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  propTypes: {
    className: _react2['default'].PropTypes.string,
    firstChild: _react2['default'].PropTypes.bool,
    index: _react2['default'].PropTypes.number.isRequired,
    style: _react2['default'].PropTypes.object,
    text: _react2['default'].PropTypes.string.isRequired
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

  getTheme: function getTheme() {
    return this.state.muiTheme.menuSubheader;
  },

  getSpacing: function getSpacing() {
    return this.state.muiTheme.rawTheme.spacing;
  },

  getStyles: function getStyles() {
    var gutterMini = this.getSpacing().desktopGutterMini;
    var subheaderHeight = this.getSpacing().desktopSubheaderHeight;
    var styles = {
      root: {
        boxSizing: 'border-box',
        fontSize: '13px',
        letterSpacing: 0,
        fontWeight: _stylesTypography2['default'].fontWeightMedium,
        margin: 0,
        height: subheaderHeight + gutterMini,
        lineHeight: subheaderHeight + 'px',
        color: this.getTheme().textColor,
        borderTop: 'solid 1px ' + this.getTheme().borderColor,
        paddingTop: gutterMini,
        marginTop: gutterMini
      },
      rootWhenFirstChild: {
        height: subheaderHeight,
        borderTop: 'none',
        paddingTop: 0,
        marginTop: 0
      }
    };

    return styles;
  },

  render: function render() {
    return _react2['default'].createElement(
      'div',
      {
        key: this.props.index,
        className: this.props.className,
        style: this.prepareStyles(this.getStyles().root, this.props.firstChild && this.getStyles().rootWhenFirstChild, this.props.style) },
      this.props.text
    );
  }

});

exports['default'] = SubheaderMenuItem;
module.exports = exports['default'];