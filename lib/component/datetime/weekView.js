'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WeekView = function (_React$Component) {
    _inherits(WeekView, _React$Component);

    function WeekView(props) {
        _classCallCheck(this, WeekView);

        return _possibleConstructorReturn(this, (WeekView.__proto__ || Object.getPrototypeOf(WeekView)).call(this, props));
    }

    _createClass(WeekView, [{
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
                i = 0;
            days.forEach(function (day) {
                dow[(7 + i++ - first) % 7] = day;
            });
            return dow;
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
                days = [],
                renderer = this.props.renderDay || this.renderDay.bind(this),
                isValid = this.props.isValidDate || this.alwaysValidDate,
                classes = void 0,
                isDisabled = void 0,
                dayProps = void 0,
                currentdate = void 0;

            prevMonth.date(prevMonth.daysInMonth()).startOf('week');
            var lastDay = prevMonth.clone().add(42, 'd');
            while (prevMonth.isBefore(lastDay)) {
                classes = 'el-datetime-week';
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
                    classes += ' el-datetime-week';
                }

                isDisabled = !isValid(currentdate, selected);
                isDisabled && (classes += ' el-datetime-disabled');

                dayProps = {
                    key: prevMonth.format('M_D'),
                    'data-value': prevMonth.date(),
                    className: classes
                };

                !isDisabled && (dayProps.onClick = this.updateSelectedDate.bind(this));
                days.push(renderer(dayProps, currentdate, selected));
                if (days.length === 7) {
                    weeks.push(_react2['default'].createElement(
                        'tr',
                        { key: prevMonth.format('M_D') },
                        days
                    ));
                    days = [];
                }
                prevMonth.add(1, 'd');
            }
            return weeks;
        }
    }, {
        key: 'render',
        value: function render() {
            var date = this.props.viewDate,
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
                        { key: 's', className: 'el-datetime-switch', onClick: this.props.showView('months'), colSpan: '5', 'data-value': this.props.viewDate.month() },
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
                    this.getDaysOfWeek(locale).map(function (day, index) {
                        return _react2['default'].createElement(
                            'th',
                            { key: day + index, className: 'dow' },
                            day
                        );
                    })
                )
            )];
            tableChildren.push(_react2['default'].createElement(
                'tbody',
                { key: 'tb' },
                this.renderDays()
            ));
            return _react2['default'].createElement(
                'div',
                { className: 'el-datetime-weeks' },
                _react2['default'].createElement(
                    'table',
                    null,
                    tableChildren
                )
            );
        }
    }]);

    return WeekView;
}(_react2['default'].Component);

exports['default'] = WeekView;