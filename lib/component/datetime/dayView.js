'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

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
        key: 'updateSelectedDate',
        value: function updateSelectedDate(event) {
            this.props.updateSelectedDate(event, true);
        }
    }, {
        key: 'alwaysValidDate',
        value: function alwaysValidDate() {
            return 1;
        }
    }, {
        key: 'getDaysOfWeek',
        value: function getDaysOfWeek(locale) {
            var days = locale._weekdaysMin,
                first = locale.firstDayOfWeek(),
                dow = [],
                i = 0,
                classnames = void 0;
            days.forEach(function (day) {
                dow[(7 + i++ - first) % 7] = day;
            });
            this.props.showWeeks && dow.unshift('周');
            return dow.map(function (day, index) {
                classnames = day === '周' ? 'dow dow-week' : 'dow';
                return _react2['default'].createElement(
                    'th',
                    { key: day + index, className: classnames },
                    day
                );
            });
        }
    }, {
        key: 'renderFooter',
        value: function renderFooter() {
            if (!this.props.timeFormat) {
                return '';
            }
            var date = this.props.selectedDate || this.props.viewDate;

            return _react2['default'].createElement(
                'tfoot',
                { key: 'tf' },
                _react2['default'].createElement(
                    'tr',
                    null,
                    _react2['default'].createElement(
                        'td',
                        { onClick: this.props.showView('time'), colSpan: this.props.showWeeks ? '8' : '7', className: 'el-datetime-timetoggle' },
                        date.format(this.props.timeFormat)
                    )
                )
            );
        }
    }, {
        key: 'renderDay',
        value: function renderDay(props, currentdate) {
            return _react2['default'].createElement(
                'td',
                props,
                currentdate.date()
            );
        }
    }, {
        key: 'renderDays',
        value: function renderDays() {
            var date = this.props.viewDate,
                selected = this.props.selectedDate && this.props.selectedDate.clone(),
                prevMonth = date.clone().subtract(1, 'months'),
                currentYear = date.year(),
                currentMonth = date.month(),
                weeks = [],
                renderer = this.props.renderDay || this.renderDay.bind(this),
                isValid = this.props.isValidDate || this.alwaysValidDate,
                showWeeks = this.props.showWeeks,
                isWeek = this.props.isWeek,
                classes = void 0,
                isDisabled = void 0,
                dayArr = [],
                dayProps = void 0,
                currentdate = void 0,
                filterArr = void 0;

            prevMonth.date(prevMonth.daysInMonth()).startOf('week');
            var lastDay = prevMonth.clone().add(42, 'd');
            while (prevMonth.isBefore(lastDay)) {
                classes = 'el-datetime-day';
                currentdate = prevMonth.clone();

                if (prevMonth.year() === currentYear && prevMonth.month() < currentMonth || prevMonth.year() < currentYear) {
                    classes += ' el-datetime-old';
                } else if (prevMonth.year() === currentYear && prevMonth.month() > currentMonth || prevMonth.year() > currentYear) {
                    classes += ' el-datetime-new';
                }
                if (selected && prevMonth.isSame(selected, 'day')) {
                    classes += ' el-datetime-active';
                }
                if (prevMonth.isSame((0, _moment2['default'])(), 'day')) {
                    classes += ' el-datetime-today';
                }

                isDisabled = !isValid(currentdate, selected);
                isDisabled && (classes += ' el-datetime-disabled');

                dayProps = {
                    key: prevMonth.clone().format('M_D'),
                    'data-value': prevMonth.clone().date(),
                    className: classes,
                    'data-currentdate': currentdate.clone()
                };

                !isDisabled && (dayProps.onClick = this.updateSelectedDate.bind(this));

                dayArr.push(dayProps);
                if (dayArr.length === 7) {
                    if (isWeek) {
                        filterArr = dayArr.filter(function (item) {
                            return item.className.indexOf('el-datetime-active') !== -1;
                        });
                        if (filterArr.length) {
                            dayArr.map(function (item) {
                                if (item.className.indexOf('el-datetime-active') === -1) {
                                    item.className += ' el-datetime-active';
                                }
                            });
                        }
                    }

                    dayArr = dayArr.map(function (item) {
                        return renderer(item, item['data-currentdate'], selected);
                    });
                    showWeeks && dayArr.unshift(_react2['default'].createElement(
                        'td',
                        { key: currentdate.valueOf(), className: 'el-datetime-week' },
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
            var footer = this.renderFooter(),
                date = this.props.viewDate,
                locale = date.localeData(),
                tableChildren = [_react2['default'].createElement(
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
                            { onClick: this.props.subtractTime(1, 'months') },
                            '\u2039'
                        )
                    ),
                    _react2['default'].createElement(
                        'th',
                        { key: 's', className: 'el-datetime-switch', onClick: this.props.showView('months'), colSpan: this.props.showWeeks ? '6' : '5', 'data-value': this.props.viewDate.month() },
                        locale.months(date) + ' ' + date.year()
                    ),
                    _react2['default'].createElement(
                        'th',
                        { key: 'n', className: 'el-datetime-next' },
                        _react2['default'].createElement(
                            'span',
                            { onClick: this.props.addTime(1, 'months') },
                            '\u203A'
                        )
                    )
                ),
                _react2['default'].createElement(
                    'tr',
                    { key: 'd' },
                    this.getDaysOfWeek(locale)
                )
            )];
            tableChildren.push(_react2['default'].createElement(
                'tbody',
                { key: 'tb' },
                this.renderDays()
            ));
            if (footer) {
                tableChildren.push(footer);
            }
            return _react2['default'].createElement(
                'div',
                { className: 'el-datetime-days' },
                _react2['default'].createElement(
                    'table',
                    null,
                    tableChildren
                )
            );
        }
    }]);

    return DayView;
}(_react2['default'].Component);

exports['default'] = (0, _reactOnclickoutside2['default'])(DayView);