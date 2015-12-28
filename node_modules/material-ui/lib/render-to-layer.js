'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utilsDom = require('./utils/dom');

var _utilsDom2 = _interopRequireDefault(_utilsDom);

var _stylesRawThemesLightRawTheme = require('./styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('./styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

// heavily inspired by https://github.com/Khan/react-components/blob/master/js/layered-component-mixin.jsx
var RenderToLayer = _react2['default'].createClass({
  displayName: 'RenderToLayer',

  propTypes: {
    componentClickAway: _react2['default'].PropTypes.func,
    open: _react2['default'].PropTypes.bool.isRequired,
    render: _react2['default'].PropTypes.func.isRequired,
    useLayerForClickAway: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      useLayerForClickAway: true
    };
  },

  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

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

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme
    });
  },

  componentDidMount: function componentDidMount() {
    this._renderLayer();
  },

  componentDidUpdate: function componentDidUpdate() {
    this._renderLayer();
  },

  componentWillUnmount: function componentWillUnmount() {
    if (this._layer) {
      this._unrenderLayer();
    }
  },

  onClickAway: function onClickAway(event) {
    if (event.defaultPrevented) {
      return;
    }

    if (!this.props.componentClickAway) {
      return;
    }

    if (!this.props.open) {
      return;
    }

    var el = this._layer;
    if (event.target !== el && event.target === window || document.documentElement.contains(event.target) && !_utilsDom2['default'].isDescendant(el, event.target)) {
      this.props.componentClickAway(event);
    }
  },

  getLayer: function getLayer() {
    return this._layer;
  },

  render: function render() {
    return null;
  },

  _renderLayer: function _renderLayer() {
    var _this = this;

    var _props = this.props;
    var open = _props.open;
    var render = _props.render;

    if (open) {
      if (!this._layer) {
        this._layer = document.createElement('div');
        document.body.appendChild(this._layer);

        if (this.props.useLayerForClickAway) {
          this._layer.addEventListener('touchstart', this.onClickAway);
          this._layer.addEventListener('click', this.onClickAway);
          this._layer.style.position = 'fixed';
          this._layer.style.top = 0;
          this._layer.style.bottom = 0;
          this._layer.style.left = 0;
          this._layer.style.right = 0;
          this._layer.style.zIndex = this.state.muiTheme.zIndex.layer;
        } else {
          setTimeout(function () {
            window.addEventListener('touchstart', _this.onClickAway);
            window.addEventListener('click', _this.onClickAway);
          }, 0);
        }
      }

      // By calling this method in componentDidMount() and
      // componentDidUpdate(), you're effectively creating a "wormhole" that
      // funnels React's hierarchical updates through to a DOM node on an
      // entirely different part of the page.

      var layerElement = render();

      if (layerElement === null) {
        this.layerElement = _reactDom2['default'].unstable_renderSubtreeIntoContainer(this, null, this._layer);
      } else {
        this.layerElement = _reactDom2['default'].unstable_renderSubtreeIntoContainer(this, layerElement, this._layer);
      }
    } else {
      if (this._layer) {
        if (this.props.useLayerForClickAway) {
          this._layer.style.position = 'relative';
          this._layer.removeEventListener('touchstart', this.onClickAway);
          this._layer.removeEventListener('click', this.onClickAway);
        } else {
          window.removeEventListener('touchstart', this.onClickAway);
          window.removeEventListener('click', this.onClickAway);
        }

        this._unrenderLayer();
      }
    }
  },

  _unrenderLayer: function _unrenderLayer() {
    _reactDom2['default'].unmountComponentAtNode(this._layer);
    document.body.removeChild(this._layer);
    this._layer = null;
  }

});

exports['default'] = RenderToLayer;
module.exports = exports['default'];