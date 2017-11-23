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

var YearView = function (_React$Component) {
    _inherits(YearView, _React$Component);

    function YearView(props) {
        _classCallCheck(this, YearView);

        return _possibleConstructorReturn(this, (YearView.__proto__ || Object.getPrototypeOf(YearView)).call(this, props));
    }

    _createClass(YearView, [{
        key: 'handleClickOutside',
        value: function handleClickOutside() {
            this.props.handleClickOutside();
        }
    }, {
        key: 'alwaysValidDate',
        value: function alwaysValidDate() {
            return 1;
        }
    }, {
        key: 'renderYear',
        value: function renderYear(props, year) {
            return _react2['default'].createElement(
                'td',
                props,
                year
            );
        }
    }, {
        key: 'updateSelectedYear',
        value: function updateSelectedYear(event) {
            this.props.updateSelectedDate(event);
        }
    }, {
        key: 'renderYears',
        value: function renderYears(year) {
            var _props = this.props,
                renderYear = _props.renderYear,
                selectedDate = _props.selectedDate,
                isValidDate = _props.isValidDate,
                viewDate = _props.viewDate,
                updateOn = _props.updateOn,
                setDate = _props.setDate,
                years = [],
                i = -1,
                rows = [],
                renderer = renderYear || this.renderYear,
                isValid = isValidDate || this.alwaysValidDate,
                classes = void 0,
                props = void 0,
                currentYear = void 0,
                isDisabled = void 0,
                noOfDaysInYear = void 0,
                daysInYear = void 0,
                validDay = void 0,
                irrelevantMonth = 0,
                irrelevantDate = 1;


            year--;
            while (i < 11) {
                classes = 'el-datetime-year';
                currentYear = viewDate.clone().set({ year: year, month: irrelevantMonth, date: irrelevantDate });

                noOfDaysInYear = currentYear.endOf('year').format('DDD');
                daysInYear = Array.from({ length: noOfDaysInYear }, function (e, i) {
                    return i + 1;
                });

                validDay = daysInYear.find(function (d) {
                    var day = currentYear.clone().dayOfYear(d);
                    return isValid(day);
                });

                isDisabled = validDay === undefined;

                isDisabled && (classes += ' el-datetime-disabled');
                selectedDate && selectedDate.year() === year && classes != ' el-datetime-active';

                props = {
                    key: year,
                    'data-value': year,
                    className: classes
                };

                if (!isDisabled) {
                    props.onClick = updateOn === 'years' ? this.updateSelectedYear.bind(this) : setDate('year');
                }
                years.push(renderer(props, year, selectedDate && selectedDate.clone()));
                if (years.length === 4) {
                    rows.push(_react2['default'].createElement(
                        'tr',
                        { key: i },
                        years
                    ));
                    years = [];
                }
                year++;
                i++;
            }
            return rows;
        }
    }, {
        key: 'render',
        value: function render() {
            var year = parseInt(this.props.viewDate.year() / 10, 10) * 10;
            return _react2['default'].createElement(
                'div',
                { className: 'el-datetime-years' },
                _react2['default'].createElement(
                    'table',
                    null,
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
                                    { onClick: this.props.subtractTime(10, 'years') },
                                    '\u2039'
                                )
                            ),
                            _react2['default'].createElement(
                                'th',
                                { key: 'year', className: 'el-datetime-switch' },
                                _react2['default'].createElement(
                                    'span',
                                    { onClick: this.props.showView('years'), colSpan: '2' },
                                    year + '-' + (year + 9)
                                )
                            ),
                            _react2['default'].createElement(
                                'th',
                                { key: 'next', className: 'el-datetime-next' },
                                _react2['default'].createElement(
                                    'span',
                                    { onClick: this.props.addTime(10, 'years') },
                                    '\u203A'
                                )
                            )
                        )
                    )
                ),
                _react2['default'].createElement(
                    'table',
                    { key: 'years' },
                    _react2['default'].createElement(
                        'tbody',
                        null,
                        this.renderYears(year)
                    )
                )
            );
        }
    }]);

    return YearView;
}(_react2['default'].Component);

exports['default'] = (0, _reactOnclickoutside2['default'])(YearView);