'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MonthView = function (_React$Component) {
    _inherits(MonthView, _React$Component);

    function MonthView(props) {
        _classCallCheck(this, MonthView);

        return _possibleConstructorReturn(this, (MonthView.__proto__ || Object.getPrototypeOf(MonthView)).call(this, props));
    }

    _createClass(MonthView, [{
        key: 'updateSelectedMonth',
        value: function updateSelectedMonth(event) {
            this.props.updateSelectedDate(event);
        }
    }, {
        key: 'alwaysValidDate',
        value: function alwaysValidDate() {
            return 1;
        }
    }, {
        key: 'renderMonths',
        value: function renderMonths() {
            var date = this.props.selectedDate,
                month = this.props.viewDate.month(),
                year = this.props.viewDate.year(),
                rows = [],
                i = 0,
                months = [],
                renderer = this.props.renderMonth || this.renderMonth.bind(this),
                isValid = this.props.isValidDate || this.alwaysValidDate,
                classes = void 0,
                props = void 0,
                currentMonth = void 0,
                isDisabled = void 0,
                noOfDaysInMonth = void 0,
                daysInMonth = void 0,
                validDay = void 0,
                irrelevantDate = 1;

            while (i < 12) {
                classes = 'el-datetime-month';
                currentMonth = this.props.viewDate.clone().set({ year: year, month: i, date: irrelevantDate });
                noOfDaysInMonth = currentMonth.endOf('month').format('D');
                daysInMonth = Array.from({ length: noOfDaysInMonth }, function (e, i) {
                    return i + 1;
                });
                validDay = daysInMonth.find(function (d) {
                    var day = currentMonth.clone().set('date', d);
                    return isValid(day);
                });

                isDisabled = validDay === undefined;

                isDisabled && (classes += ' el-datetime-disabled');
                date && i === month && year === date.year() && (classes += ' el-datetime-active');

                props = {
                    key: i,
                    'data-value': i,
                    className: classes
                };
                if (!isDisabled) {
                    props.onClick = this.props.updateOn === 'months' ? this.updateSelectedMonth.bind(this) : this.props.setDate('month');
                }

                months.push(renderer(props, i, year, date && date.clone()));

                if (months.length === 4) {
                    rows.push(_react2['default'].createElement(
                        'tr',
                        { key: month + '_' + rows.length },
                        months
                    ));
                    months = [];
                }
                i++;
            }
            return rows;
        }
    }, {
        key: 'renderMonth',
        value: function renderMonth(props, month) {
            var localMoment = this.props.viewDate,
                monthStr = localMoment.localeData().monthsShort(localMoment.month(month)),
                strLength = 3,
                monthStrFixedLength = monthStr.substring(0, strLength);
            return _react2['default'].createElement(
                'td',
                props,
                this.capitalize(monthStrFixedLength)
            );
        }
    }, {
        key: 'capitalize',
        value: function capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2['default'].createElement(
                'div',
                { className: 'el-datetime-months' },
                _react2['default'].createElement(
                    'table',
                    { key: 'a' },
                    _react2['default'].createElement(
                        'thead',
                        null,
                        _react2['default'].createElement(
                            'tr',
                            null,
                            _react2['default'].createElement(
                                'th',
                                { key: 'prev', className: 'el-datetime-prev' },
                                _react2['default'].createElement(
                                    'span',
                                    { onClick: this.props.subtractTime(1, 'years') },
                                    '\u2039'
                                )
                            ),
                            _react2['default'].createElement(
                                'th',
                                { key: 'year', className: 'el-datetime-switch', onClick: this.props.showView('years'), colSpan: '2', 'data-value': this.props.viewDate.year() },
                                this.props.viewDate.year()
                            ),
                            _react2['default'].createElement(
                                'th',
                                { key: 'next', className: 'el-datetime-next' },
                                _react2['default'].createElement(
                                    'span',
                                    { onClick: this.props.addTime(1, 'years') },
                                    '\u203A'
                                )
                            )
                        )
                    )
                ),
                _react2['default'].createElement(
                    'table',
                    { key: 'months' },
                    _react2['default'].createElement(
                        'tbody',
                        { key: 'b' },
                        this.renderMonths()
                    )
                )
            );
        }
    }]);

    return MonthView;
}(_react2['default'].Component);

exports['default'] = (0, _reactOnclickoutside2['default'])(MonthView);