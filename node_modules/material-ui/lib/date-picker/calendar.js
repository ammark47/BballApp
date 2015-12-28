'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _mixinsWindowListenable = require('../mixins/window-listenable');

var _mixinsWindowListenable2 = _interopRequireDefault(_mixinsWindowListenable);

var _utilsDateTime = require('../utils/date-time');

var _utilsDateTime2 = _interopRequireDefault(_utilsDateTime);

var _utilsKeyCode = require('../utils/key-code');

var _utilsKeyCode2 = _interopRequireDefault(_utilsKeyCode);

var _stylesTransitions = require('../styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

var _calendarMonth = require('./calendar-month');

var _calendarMonth2 = _interopRequireDefault(_calendarMonth);

var _calendarYear = require('./calendar-year');

var _calendarYear2 = _interopRequireDefault(_calendarYear);

var _calendarToolbar = require('./calendar-toolbar');

var _calendarToolbar2 = _interopRequireDefault(_calendarToolbar);

var _dateDisplay = require('./date-display');

var _dateDisplay2 = _interopRequireDefault(_dateDisplay);

var _transitionGroupsSlideIn = require('../transition-groups/slide-in');

var _transitionGroupsSlideIn2 = _interopRequireDefault(_transitionGroupsSlideIn);

var _clearfix = require('../clearfix');

var _clearfix2 = _interopRequireDefault(_clearfix);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var Calendar = _react2['default'].createClass({
  displayName: 'Calendar',

  mixins: [_mixinsStylePropable2['default'], _mixinsWindowListenable2['default']],

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

  propTypes: {
    DateTimeFormat: _react2['default'].PropTypes.func.isRequired,
    disableYearSelection: _react2['default'].PropTypes.bool,
    initialDate: _react2['default'].PropTypes.object,
    locale: _react2['default'].PropTypes.string.isRequired,
    maxDate: _react2['default'].PropTypes.object,
    minDate: _react2['default'].PropTypes.object,
    mode: _react2['default'].PropTypes.oneOf(['portrait', 'landscape']),
    onDayTouchTap: _react2['default'].PropTypes.func,
    open: _react2['default'].PropTypes.bool,
    shouldDisableDate: _react2['default'].PropTypes.func
  },

  windowListeners: {
    keydown: '_handleWindowKeyDown'
  },

  getDefaultProps: function getDefaultProps() {
    return {
      disableYearSelection: false,
      initialDate: new Date(),
      minDate: _utilsDateTime2['default'].addYears(new Date(), -100),
      maxDate: _utilsDateTime2['default'].addYears(new Date(), 100)
    };
  },

  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default']),
      displayDate: _utilsDateTime2['default'].getFirstDayOfMonth(this.props.initialDate),
      displayMonthDay: true,
      selectedDate: this.props.initialDate,
      transitionDirection: 'left',
      transitionEnter: true
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });

    if (nextProps.initialDate !== this.props.initialDate) {
      var d = nextProps.initialDate || new Date();
      this.setState({
        displayDate: _utilsDateTime2['default'].getFirstDayOfMonth(d),
        selectedDate: d
      });
    }
  },

  render: function render() {
    var yearCount = _utilsDateTime2['default'].yearDiff(this.props.maxDate, this.props.minDate) + 1;
    var weekCount = _utilsDateTime2['default'].getWeekArray(this.state.displayDate).length;
    var toolbarInteractions = this._getToolbarInteractions();
    var isLandscape = this.props.mode === 'landscape';
    var styles = {
      root: {
        fontSize: 12
      },
      calendarContainer: {
        width: isLandscape ? 320 : '100%',
        height: weekCount === 5 ? 284 : weekCount === 6 ? 324 : 244,
        float: isLandscape ? 'right' : 'none',
        transition: _stylesTransitions2['default'].easeOut('150ms', 'height'),
        overflow: 'hidden'
      },
      yearContainer: {
        width: 280,
        overflow: 'hidden',
        height: yearCount < 6 ? yearCount * 56 + 10 : weekCount === 5 ? 284 : weekCount === 6 ? 324 : 244,
        float: isLandscape ? 'right' : 'none'
      },
      dateDisplay: {
        width: isLandscape ? 120 : '',
        height: isLandscape ? weekCount === 5 ? 238 : weekCount === 6 ? 278 : 198 : 'auto',
        float: isLandscape ? 'left' : 'none'
      },
      weekTitle: {
        padding: '0 14px',
        lineHeight: '12px',
        opacity: '0.5',
        height: 12,
        fontWeight: '500',
        margin: 0
      },
      weekTitleDay: {
        listStyle: 'none',
        float: 'left',
        width: 37,
        textAlign: 'center',
        margin: '0 2px'
      }
    };

    var weekTitleDayStyle = this.prepareStyles(styles.weekTitleDay);
    var _props = this.props;
    var DateTimeFormat = _props.DateTimeFormat;
    var locale = _props.locale;

    return _react2['default'].createElement(
      _clearfix2['default'],
      { style: this.mergeStyles(styles.root) },
      _react2['default'].createElement(_dateDisplay2['default'], {
        DateTimeFormat: DateTimeFormat,
        locale: locale,
        disableYearSelection: this.props.disableYearSelection,
        style: styles.dateDisplay,
        selectedDate: this.state.selectedDate,
        handleMonthDayClick: this._handleMonthDayClick,
        handleYearClick: this._handleYearClick,
        monthDaySelected: this.state.displayMonthDay,
        mode: this.props.mode,
        weekCount: weekCount }),
      this.state.displayMonthDay && _react2['default'].createElement(
        'div',
        { style: this.prepareStyles(styles.calendarContainer) },
        _react2['default'].createElement(_calendarToolbar2['default'], {
          DateTimeFormat: DateTimeFormat,
          locale: locale,
          displayDate: this.state.displayDate,
          onMonthChange: this._handleMonthChange,
          prevMonth: toolbarInteractions.prevMonth,
          nextMonth: toolbarInteractions.nextMonth }),
        _react2['default'].createElement(
          _clearfix2['default'],
          {
            elementType: 'ul',
            style: styles.weekTitle },
          _react2['default'].createElement(
            'li',
            { style: weekTitleDayStyle },
            'S'
          ),
          _react2['default'].createElement(
            'li',
            { style: weekTitleDayStyle },
            'M'
          ),
          _react2['default'].createElement(
            'li',
            { style: weekTitleDayStyle },
            'T'
          ),
          _react2['default'].createElement(
            'li',
            { style: weekTitleDayStyle },
            'W'
          ),
          _react2['default'].createElement(
            'li',
            { style: weekTitleDayStyle },
            'T'
          ),
          _react2['default'].createElement(
            'li',
            { style: weekTitleDayStyle },
            'F'
          ),
          _react2['default'].createElement(
            'li',
            { style: weekTitleDayStyle },
            'S'
          )
        ),
        _react2['default'].createElement(
          _transitionGroupsSlideIn2['default'],
          {
            direction: this.state.transitionDirection },
          _react2['default'].createElement(_calendarMonth2['default'], {
            key: this.state.displayDate.toDateString(),
            ref: 'calendar',
            displayDate: this.state.displayDate,
            onDayTouchTap: this._handleDayTouchTap,
            selectedDate: this.state.selectedDate,
            minDate: this.props.minDate,
            maxDate: this.props.maxDate,
            shouldDisableDate: this.props.shouldDisableDate })
        )
      ),
      !this.state.displayMonthDay && _react2['default'].createElement(
        'div',
        { style: this.prepareStyles(styles.yearContainer) },
        this._yearSelector()
      )
    );
  },

  _yearSelector: function _yearSelector() {
    if (this.props.disableYearSelection) return;

    return _react2['default'].createElement(_calendarYear2['default'], {
      key: 'years',
      displayDate: this.state.displayDate,
      onYearTouchTap: this._handleYearTouchTap,
      selectedDate: this.state.selectedDate,
      minDate: this.props.minDate,
      maxDate: this.props.maxDate });
  },

  getSelectedDate: function getSelectedDate() {
    return this.state.selectedDate;
  },

  isSelectedDateDisabled: function isSelectedDateDisabled() {
    if (!this.state.displayMonthDay) {
      return false;
    }

    return this.refs.calendar.isSelectedDateDisabled();
  },

  _addSelectedDays: function _addSelectedDays(days) {
    this._setSelectedDate(_utilsDateTime2['default'].addDays(this.state.selectedDate, days));
  },

  _addSelectedMonths: function _addSelectedMonths(months) {
    this._setSelectedDate(_utilsDateTime2['default'].addMonths(this.state.selectedDate, months));
  },

  _addSelectedYears: function _addSelectedYears(years) {
    this._setSelectedDate(_utilsDateTime2['default'].addYears(this.state.selectedDate, years));
  },

  _setDisplayDate: function _setDisplayDate(d, newSelectedDate) {
    var newDisplayDate = _utilsDateTime2['default'].getFirstDayOfMonth(d);
    var direction = newDisplayDate > this.state.displayDate ? 'left' : 'right';

    if (newDisplayDate !== this.state.displayDate) {
      this.setState({
        displayDate: newDisplayDate,
        transitionDirection: direction,
        selectedDate: newSelectedDate || this.state.selectedDate
      });
    }
  },

  _setSelectedDate: function _setSelectedDate(date) {
    var adjustedDate = date;
    if (_utilsDateTime2['default'].isBeforeDate(date, this.props.minDate)) {
      adjustedDate = this.props.minDate;
    } else if (_utilsDateTime2['default'].isAfterDate(date, this.props.maxDate)) {
      adjustedDate = this.props.maxDate;
    }

    var newDisplayDate = _utilsDateTime2['default'].getFirstDayOfMonth(adjustedDate);
    if (newDisplayDate !== this.state.displayDate) {
      this._setDisplayDate(newDisplayDate, adjustedDate);
    } else {
      this.setState({
        selectedDate: adjustedDate
      });
    }
  },

  _handleDayTouchTap: function _handleDayTouchTap(e, date) {
    this._setSelectedDate(date);
    if (this.props.onDayTouchTap) this.props.onDayTouchTap(e, date);
  },

  _handleMonthChange: function _handleMonthChange(months) {
    this.setState({ displayDate: _utilsDateTime2['default'].addMonths(this.state.displayDate, months) });
  },

  _handleYearTouchTap: function _handleYearTouchTap(e, year) {
    var date = _utilsDateTime2['default'].clone(this.state.selectedDate);
    date.setFullYear(year);
    this._setSelectedDate(date, e);
  },

  _getToolbarInteractions: function _getToolbarInteractions() {
    return {
      prevMonth: _utilsDateTime2['default'].monthDiff(this.state.displayDate, this.props.minDate) > 0,
      nextMonth: _utilsDateTime2['default'].monthDiff(this.state.displayDate, this.props.maxDate) < 0
    };
  },

  _handleMonthDayClick: function _handleMonthDayClick() {
    this.setState({
      displayMonthDay: true
    });
  },

  _handleYearClick: function _handleYearClick() {
    this.setState({
      displayMonthDay: false
    });
  },

  _handleWindowKeyDown: function _handleWindowKeyDown(e) {
    if (this.props.open) {

      switch (e.keyCode) {
        case _utilsKeyCode2['default'].UP:
          if (e.altKey && e.shiftKey) {
            this._addSelectedYears(-1);
          } else if (e.shiftKey) {
            this._addSelectedMonths(-1);
          } else {
            this._addSelectedDays(-7);
          }
          break;

        case _utilsKeyCode2['default'].DOWN:
          if (e.altKey && e.shiftKey) {
            this._addSelectedYears(1);
          } else if (e.shiftKey) {
            this._addSelectedMonths(1);
          } else {
            this._addSelectedDays(7);
          }
          break;

        case _utilsKeyCode2['default'].RIGHT:
          if (e.altKey && e.shiftKey) {
            this._addSelectedYears(1);
          } else if (e.shiftKey) {
            this._addSelectedMonths(1);
          } else {
            this._addSelectedDays(1);
          }
          break;

        case _utilsKeyCode2['default'].LEFT:
          if (e.altKey && e.shiftKey) {
            this._addSelectedYears(-1);
          } else if (e.shiftKey) {
            this._addSelectedMonths(-1);
          } else {
            this._addSelectedDays(-1);
          }
          break;
      }
    }
  }

});

exports['default'] = Calendar;
module.exports = exports['default'];