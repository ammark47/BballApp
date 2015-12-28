'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesColors = require('../styles/colors');

var _stylesColors2 = _interopRequireDefault(_stylesColors);

var _utilsDateTime = require('../utils/date-time');

var _utilsDateTime2 = _interopRequireDefault(_utilsDateTime);

var _yearButton = require('./year-button');

var _yearButton2 = _interopRequireDefault(_yearButton);

var CalendarYear = _react2['default'].createClass({
  displayName: 'CalendarYear',

  mixins: [_mixinsStylePropable2['default']],

  propTypes: {
    displayDate: _react2['default'].PropTypes.object.isRequired,
    maxDate: _react2['default'].PropTypes.object,
    minDate: _react2['default'].PropTypes.object,
    onYearTouchTap: _react2['default'].PropTypes.func,
    selectedDate: _react2['default'].PropTypes.object.isRequired
  },

  componentDidMount: function componentDidMount() {
    this._scrollToSelectedYear();
  },

  componentDidUpdate: function componentDidUpdate() {
    this._scrollToSelectedYear();
  },

  render: function render() {
    var years = this._getYears();
    var styles = {
      position: 'relative',
      height: 'inherit',
      lineHeight: '36px',
      textAlign: 'center',
      padding: '8px 14px 0 14px',
      backgroundColor: _stylesColors2['default'].white,
      overflowX: 'hidden',
      overflowY: 'scroll'
    };

    return _react2['default'].createElement(
      'div',
      { style: styles },
      years
    );
  },

  _getYears: function _getYears() {
    var minYear = this.props.minDate.getFullYear();
    var maxYear = this.props.maxDate.getFullYear();

    var years = [];
    var dateCheck = _utilsDateTime2['default'].clone(this.props.selectedDate);
    for (var year = minYear; year <= maxYear; year++) {
      dateCheck.setFullYear(year);
      if (!_utilsDateTime2['default'].isBetweenDates(dateCheck, this.props.minDate, this.props.maxDate)) continue;
      var selected = this.props.selectedDate.getFullYear() === year;
      var selectedProps = {};
      if (selected) {
        selectedProps = { ref: 'selectedYearButton' };
      }

      var yearButton = _react2['default'].createElement(_yearButton2['default'], _extends({
        key: 'yb' + year,
        year: year,
        onTouchTap: this._handleYearTouchTap,
        selected: selected
      }, selectedProps));

      years.push(yearButton);
    }

    return years;
  },

  _scrollToSelectedYear: function _scrollToSelectedYear() {
    if (this.refs.selectedYearButton === undefined) return;

    var container = _reactDom2['default'].findDOMNode(this);
    var yearButtonNode = _reactDom2['default'].findDOMNode(this.refs.selectedYearButton);

    var containerHeight = container.clientHeight;
    var yearButtonNodeHeight = yearButtonNode.clientHeight || 32;

    var scrollYOffset = yearButtonNode.offsetTop + yearButtonNodeHeight / 2 - containerHeight / 2;
    container.scrollTop = scrollYOffset;
  },

  _handleYearTouchTap: function _handleYearTouchTap(e, year) {
    if (this.props.onYearTouchTap) this.props.onYearTouchTap(e, year);
  }

});

exports['default'] = CalendarYear;
module.exports = exports['default'];