'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _timeDisplay = require('./time-display');

var _timeDisplay2 = _interopRequireDefault(_timeDisplay);

var _clockButton = require('./clock-button');

var _clockButton2 = _interopRequireDefault(_clockButton);

var _clockHours = require('./clock-hours');

var _clockHours2 = _interopRequireDefault(_clockHours);

var _clockMinutes = require('./clock-minutes');

var _clockMinutes2 = _interopRequireDefault(_clockMinutes);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var Clock = _react2['default'].createClass({
  displayName: 'Clock',

  mixins: [_mixinsStylePropable2['default']],

  propTypes: {
    format: _react2['default'].PropTypes.oneOf(['ampm', '24hr']),
    initialTime: _react2['default'].PropTypes.object,
    isActive: _react2['default'].PropTypes.bool,
    mode: _react2['default'].PropTypes.oneOf(['hour', 'minute']),
    onChangeHours: _react2['default'].PropTypes.func,
    onChangeMinutes: _react2['default'].PropTypes.func
  },

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      initialTime: new Date()
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
      selectedTime: nextProps.initialTime
    });
  },

  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default']),
      selectedTime: this.props.initialTime,
      mode: 'hour'
    };
  },

  _setMode: function _setMode(mode) {
    var _this = this;

    setTimeout(function () {
      _this.setState({
        mode: mode
      });
    }, 100);
  },

  _setAffix: function _setAffix(affix) {
    if (affix === this._getAffix()) return;

    var hours = this.state.selectedTime.getHours();

    if (affix === 'am') {
      this.handleChangeHours(hours - 12, affix);
      return;
    }

    this.handleChangeHours(hours + 12, affix);
  },

  _getAffix: function _getAffix() {
    if (this.props.format !== 'ampm') return '';

    var hours = this.state.selectedTime.getHours();
    if (hours < 12) {
      return 'am';
    }

    return 'pm';
  },

  _getButtons: function _getButtons() {
    var buttons = [];
    var isAM = this._getIsAM();

    if (this.props.format === 'ampm') {
      buttons = [_react2['default'].createElement(
        _clockButton2['default'],
        { key: 'AM', position: 'left', onTouchTap: this._setAffix.bind(this, 'am'), selected: isAM },
        "AM"
      ), _react2['default'].createElement(
        _clockButton2['default'],
        { key: 'PM', position: 'right', onTouchTap: this._setAffix.bind(this, 'pm'), selected: !isAM },
        "PM"
      )];
    }
    return buttons;
  },

  _getIsAM: function _getIsAM() {
    return this._getAffix() === 'am';
  },

  render: function render() {
    var clock = null;
    var buttons = this._getButtons();

    var styles = {
      root: {},

      container: {
        height: 280,
        padding: 10,
        position: 'relative'
      },

      circle: {
        position: 'absolute',
        top: 20,
        width: 260,
        height: 260,
        borderRadius: '100%',
        backgroundColor: this.state.muiTheme.timePicker.clockCircleColor
      }
    };

    if (this.state.mode === 'hour') {
      clock = _react2['default'].createElement(_clockHours2['default'], { key: 'hours',
        format: this.props.format,
        onChange: this.handleChangeHours,
        initialHours: this.state.selectedTime.getHours() });
    } else {
      clock = _react2['default'].createElement(_clockMinutes2['default'], { key: 'minutes',
        onChange: this.handleChangeMinutes,
        initialMinutes: this.state.selectedTime.getMinutes() });
    }

    return _react2['default'].createElement(
      'div',
      { style: this.prepareStyles(styles.root) },
      _react2['default'].createElement(_timeDisplay2['default'], {
        selectedTime: this.state.selectedTime,
        mode: this.state.mode,
        format: this.props.format,
        affix: this._getAffix(),
        onSelectHour: this._setMode.bind(this, 'hour'),
        onSelectMin: this._setMode.bind(this, 'minute') }),
      _react2['default'].createElement(
        'div',
        { style: this.prepareStyles(styles.container) },
        _react2['default'].createElement('div', { style: this.prepareStyles(styles.circle) }),
        clock
      ),
      buttons
    );
  },

  handleChangeHours: function handleChangeHours(hours, finished) {
    var _this2 = this;

    var time = new Date(this.state.selectedTime);
    var affix = undefined;

    if (typeof finished === 'string') {
      affix = finished;
      finished = undefined;
    }
    if (!affix) {
      affix = this._getAffix();
    }
    if (affix === 'pm' && hours < 12) {
      hours += 12;
    }

    time.setHours(hours);
    this.setState({
      selectedTime: time
    });

    var onChangeHours = this.props.onChangeHours;

    if (finished) {
      setTimeout(function () {
        _this2.setState({
          mode: 'minute'
        });
        if (typeof onChangeHours === 'function') {
          onChangeHours(time);
        }
      }, 100);
    }
  },

  handleChangeMinutes: function handleChangeMinutes(minutes) {
    var time = new Date(this.state.selectedTime);
    time.setMinutes(minutes);
    this.setState({
      selectedTime: time
    });

    var onChangeMinutes = this.props.onChangeMinutes;

    if (typeof onChangeMinutes === 'function') {
      setTimeout(function () {
        onChangeMinutes(time);
      }, 0);
    }
  },

  getSelectedTime: function getSelectedTime() {
    return this.state.selectedTime;
  }
});

exports['default'] = Clock;
module.exports = exports['default'];