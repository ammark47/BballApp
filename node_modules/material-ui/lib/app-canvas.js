'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mixinsStylePropable = require('./mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesRawThemesLightRawTheme = require('./styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('./styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var AppCanvas = _react2['default'].createClass({
  displayName: 'AppCanvas',

  mixins: [_mixinsStylePropable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  propTypes: {
    children: _react2['default'].PropTypes.node
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

  render: function render() {
    var _this = this;

    var styles = {
      height: '100%',
      backgroundColor: this.state.muiTheme.rawTheme.palette.canvasColor,
      WebkitFontSmoothing: 'antialiased',
      direction: 'ltr'
    };

    var newChildren = _react2['default'].Children.map(this.props.children, function (currentChild) {
      if (!currentChild) {
        // If undefined, skip it
        return null;
      }

      switch (currentChild.type.displayName) {
        case 'AppBar':
          return _react2['default'].cloneElement(currentChild, {
            style: _this.mergeStyles(currentChild.props.style, {
              position: 'fixed'
            })
          });
        default:
          return currentChild;
      }
    }, this);

    return _react2['default'].createElement(
      'div',
      { style: this.prepareStyles(styles) },
      newChildren
    );
  }

});

exports['default'] = AppCanvas;
module.exports = exports['default'];