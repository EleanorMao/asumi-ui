'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

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
        key: 'renderMonths',
        value: function renderMonths() {
            var _props = this.props,
                isValidDate = _props.isValidDate,
                selectedDate = _props.selectedDate,
                viewDate = _props.viewDate,
                renderMonth = _props.renderMonth,
                rows = [],
                i = 0,
                months = [],
                renderer = renderMonth || this.renderMonth.bind(this),
                props = void 0,
                currentMonth = void 0,
                isDisabled = void 0,
                daysInMonth = void 0,
                validDay = void 0;


            while (i < 12) {
                currentMonth = this.props.viewDate.clone().set({ year: viewDate.year(), month: i, date: 1 });
                var daysLength = currentMonth.endOf('month').format('D');
                daysInMonth = [];
                for (var d = 1; d <= daysLength; d++) {
                    daysInMonth.push(d);
                }
                isDisabled = !daysInMonth.find(function (d) {
                    var day = currentMonth.clone().set('date', d);
                    return isValidDate(day);
                });
                props = {
                    key: i,
                    'data-value': i,
                    className: (0, _classnames2['default'])('el-datetime-month', { 'el-datetime-disabled': isDisabled,
                        'el-datetime-active': selectedDate && i === selectedDate.month() && viewDate.year() === selectedDate.year() })
                };
                if (!isDisabled) {
                    props.onClick = this.props.updateOn === 'months' ? this.updateSelectedMonth.bind(this) : this.props.setDate('month');
                }

                months.push(renderer(props, i, viewDate.year(), selectedDate && selectedDate.clone()));

                if (months.length === 4) {
                    rows.push(_react2['default'].createElement(
                        'tr',
                        { key: viewDate.month() + '_' + rows.length },
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
            var _props2 = this.props,
                updateTime = _props2.updateTime,
                showView = _props2.showView;

            var type = 'years';
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
                                    { onClick: function onClick(e) {
                                            return updateTime('subtract', 1, type);
                                        } },
                                    '\u2039'
                                )
                            ),
                            _react2['default'].createElement(
                                'th',
                                { key: 'year', className: 'el-datetime-switch', onClick: function onClick(e) {
                                        return showView(type);
                                    }, colSpan: '2', 'data-value': this.props.viewDate.year() },
                                this.props.viewDate.year()
                            ),
                            _react2['default'].createElement(
                                'th',
                                { key: 'next', className: 'el-datetime-next' },
                                _react2['default'].createElement(
                                    'span',
                                    { onClick: function onClick(e) {
                                            return updateTime('add', 1, type);
                                        } },
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

MonthView.defaultProps = {
    isValidDate: function isValidDate() {
        return 1;
    }
};
exports['default'] = (0, _reactOnclickoutside2['default'])(MonthView);