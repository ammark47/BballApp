'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _utilsColorManipulator = require('../utils/color-manipulator');

var _utilsColorManipulator2 = _interopRequireDefault(_utilsColorManipulator);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var SelectableContainerEnhance = function SelectableContainerEnhance(Component) {
  var composed = _react2['default'].createClass({

    mixins: [_mixinsStylePropable2['default']],

    contextTypes: {
      muiTheme: _react2['default'].PropTypes.object
    },

    displayName: 'Selectable' + Component.displayName,

    propTypes: {
      children: _react2['default'].PropTypes.node,
      selectedItemStyle: _react2['default'].PropTypes.object,
      valueLink: _react2['default'].PropTypes.shape({
        value: _react2['default'].PropTypes.any,
        requestChange: _react2['default'].PropTypes.func
      }).isRequired
    },

    childContextTypes: {
      muiTheme: _react2['default'].PropTypes.object
    },

    getChildContext: function getChildContext() {
      return {
        muiTheme: this.state.muiTheme
      };
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
      var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
      this.setState({ muiTheme: newMuiTheme });
    },

    getInitialState: function getInitialState() {
      return {
        muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
      };
    },

    getValueLink: function getValueLink(props) {
      return props.valueLink || {
        value: props.value,
        requestChange: props.onChange
      };
    },

    render: function render() {
      var _this = this;

      var _props = this.props;
      var children = _props.children;
      var selectedItemStyle = _props.selectedItemStyle;

      var listItems = undefined;
      var keyIndex = 0;
      var styles = {};

      if (!selectedItemStyle) {
        var textColor = this.state.muiTheme.rawTheme.palette.textColor;
        var selectedColor = _utilsColorManipulator2['default'].fade(textColor, 0.2);
        styles = {
          backgroundColor: selectedColor
        };
      }

      listItems = _react2['default'].Children.map(children, function (child) {
        if (child.type.displayName === 'ListItem') {
          var selected = _this._isChildSelected(child, _this.props);
          var selectedChildrenStyles = {};
          if (selected) {
            selectedChildrenStyles = _this.mergeStyles(styles, selectedItemStyle);
          }

          var mergedChildrenStyles = _this.mergeStyles(child.props.style || {}, selectedChildrenStyles);

          keyIndex += 1;

          return _react2['default'].cloneElement(child, {
            onTouchTap: function onTouchTap(e) {
              _this._handleItemTouchTap(e, child);
              if (child.props.onTouchTap) {
                child.props.onTouchTap(e);
              }
            },
            key: keyIndex,
            style: mergedChildrenStyles
          });
        } else {
          return child;
        }
      });
      var newChildren = listItems;

      return _react2['default'].createElement(
        Component,
        _extends({}, this.props, this.state),
        newChildren
      );
    },

    _isChildSelected: function _isChildSelected(child, props) {
      var itemValue = this.getValueLink(props).value;
      var childValue = child.props.value;

      return itemValue && itemValue === childValue;
    },

    _handleItemTouchTap: function _handleItemTouchTap(e, item) {
      var valueLink = this.getValueLink(this.props);
      var itemValue = item.props.value;
      var menuValue = valueLink.value;
      if (itemValue !== menuValue) {
        valueLink.requestChange(e, itemValue);
      }
    }
  });

  return composed;
};
exports.SelectableContainerEnhance = SelectableContainerEnhance;