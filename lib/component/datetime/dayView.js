'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DayView = function (_React$Component) {
    _inherits(DayView, _React$Component);

    function DayView(props) {
        _classCallCheck(this, DayView);

        return _possibleConstructorReturn(this, (DayView.__proto__ || Object.getPrototypeOf(DayView)).call(this, props));
    }

    _createClass(DayView, [{
        key: 'getDaysOfWeek',
        value: function getDaysOfWeek(locale) {
            var first = locale.firstDayOfWeek(),
                days = locale._weekdaysMin,
                dow = [],
                i = 0;
            days.forEach(function (day) {
                dow[(7 + i++ - first) % 7] = day;
            });
            var _props = this.props,
                showWeeks = _props.showWeeks,
                renderWeeksTitle = _props.renderWeeksTitle;

            showWeeks && dow.unshift(renderWeeksTitle());
            return dow.map(function (day, index) {
                return _react2['default'].createElement(
                    'th',
                    { key: day + index,
                        className: (0, _classnames2['default'])(showWeeks && index === 0 ? 'dow dow-week' : 'dow') },
                    day
                );
            });
        }
    }, {
        key: 'renderFooter',
        value: function renderFooter() {
            var _props2 = this.props,
                timeFormat = _props2.timeFormat,
                selectedDate = _props2.selectedDate,
                viewDate = _props2.viewDate,
                showWeeks = _props2.showWeeks,
                showView = _props2.showView;

            if (!timeFormat) {
                return '';
            }
            var date = selectedDate || viewDate;
            return _react2['default'].createElement(
                'tfoot',
                { key: 'tf' },
                _react2['default'].createElement(
                    'tr',
                    null,
                    _react2['default'].createElement(
                        'td',
                        { onClick: function onClick(e) {
                                return showView("time");
                            }, colSpan: showWeeks ? "8" : "7",
                            className: 'el-datetime-timetoggle' },
                        date.format(timeFormat)
                    )
                )
            );
        }
    }, {
        key: 'renderDays',
        value: function renderDays() {
            var _props3 = this.props,
                renderDay = _props3.renderDay,
                isValidDate = _props3.isValidDate,
                viewDate = _props3.viewDate,
                selectedDate = _props3.selectedDate,
                showWeeks = _props3.showWeeks,
                updateSelectedDate = _props3.updateSelectedDate,
                isWeek = _props3.isWeek;

            var prevMonth = viewDate.clone().subtract(1, 'months');
            var selected = selectedDate && selectedDate.clone();
            var currentMonth = viewDate.month();
            var currentYear = viewDate.year();
            var weeks = [],
                dayArr = [],
                filterArr = void 0;

            prevMonth.date(prevMonth.daysInMonth()).startOf('week');
            var lastDay = prevMonth.clone().add(42, 'd');

            while (prevMonth.isBefore(lastDay)) {
                var currentdate = prevMonth.clone();
                var isDisabled = !isValidDate(currentdate, selected);
                var dayProps = {
                    key: prevMonth.clone().format('M_D'),
                    'data-value': prevMonth.clone().date(),
                    className: (0, _classnames2['default'])('el-datetime-day', {
                        'el-datetime-old': prevMonth.year() === currentYear && prevMonth.month() < currentMonth || prevMonth.year() < currentYear,
                        'el-datetime-new': prevMonth.year() === currentYear && prevMonth.month() > currentMonth || prevMonth.year() > currentYear,
                        'el-datetime-active': selected && prevMonth.isSame(selected, 'day'),
                        'el-datetime-today': prevMonth.isSame((0, _moment2['default'])(), 'day'),
                        'el-datetime-disabled': isDisabled
                    }),
                    'data-currentdate': currentdate.clone()
                };
                !isDisabled && (dayProps.onClick = function (e) {
                    updateSelectedDate(e, true);
                });

                dayArr.push(dayProps);

                if (dayArr.length === 7) {
                    if (isWeek) {
                        filterArr = dayArr.filter(function (item) {
                            return ~item.className.indexOf('el-datetime-active');
                        });

                        if (filterArr.length) {
                            dayArr.map(function (item) {
                                if (!~item.className.indexOf('el-datetime-active')) {
                                    item.className += ' el-datetime-active';
                                }
                            });
                        }
                    }

                    dayArr = dayArr.map(function (item) {
                        return renderDay(item, item['data-currentdate'], selected);
                    });

                    showWeeks && dayArr.unshift(_react2['default'].createElement(
                        'td',
                        { key: currentdate.valueOf(),
                            className: 'el-datetime-week' },
                        currentdate.isoWeek()
                    ));

                    weeks.push(_react2['default'].createElement(
                        'tr',
                        { key: prevMonth.format('M_D') },
                        dayArr
                    ));
                    dayArr = [];
                }
                prevMonth.add(1, 'd');
            }
            return weeks;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props4 = this.props,
                viewDate = _props4.viewDate,
                showWeeks = _props4.showWeeks,
                showView = _props4.showView,
                updateTime = _props4.updateTime;

            var locale = viewDate.localeData();
            var nextViewType = "months";
            return _react2['default'].createElement(
                'div',
                { className: 'el-datetime-days' },
                _react2['default'].createElement(
                    'table',
                    null,
                    _react2['default'].createElement(
                        'thead',
                        { key: 'th' },
                        _react2['default'].createElement(
                            'tr',
                            { key: 'h' },
                            _react2['default'].createElement(
                                'th',
                                { key: 'p', className: 'el-datetime-prev' },
                                _react2['default'].createElement(
                                    'span',
                                    { onClick: function onClick(e) {
                                            return updateTime('subtract', 1, nextViewType);
                                        } },
                                    '\u2039'
                                )
                            ),
                            _react2['default'].createElement(
                                'th',
                                { key: 's', className: 'el-datetime-switch',
                                    colSpan: showWeeks ? "6" : "5",
                                    onClick: function onClick(e) {
                                        return showView(nextViewType);
                                    },
                                    'data-value': viewDate.month() },
                                locale.months(viewDate) + " " + viewDate.year()
                            ),
                            _react2['default'].createElement(
                                'th',
                                { key: 'n', className: 'el-datetime-next' },
                                _react2['default'].createElement(
                                    'span',
                                    { onClick: function onClick(e) {
                                            return updateTime('add', 1, nextViewType);
                                        } },
                                    '\u203A'
                                )
                            )
                        ),
                        _react2['default'].createElement(
                            'tr',
                            { key: 'd' },
                            this.getDaysOfWeek(locale)
                        )
                    ),
                    _react2['default'].createElement(
                        'tbody',
                        { key: 'tb' },
                        this.renderDays()
                    ),
                    this.renderFooter()
                )
            );
        }
    }]);

    return DayView;
}(_react2['default'].Component);

DayView.defaultProps = {
    renderDay: function renderDay(props, currentDate) {
        return _react2['default'].createElement(
            'td',
            props,
            currentDate.date()
        );
    },
    renderWeeksTitle: function renderWeeksTitle() {
        return '周';
    },
    isValidDate: function isValidDate() {
        return 1;
    }
};

exports['default'] = (0, _reactOnclickoutside2['default'])(DayView);