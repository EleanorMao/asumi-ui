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

var YearView = function (_React$Component) {
    _inherits(YearView, _React$Component);

    function YearView(props) {
        _classCallCheck(this, YearView);

        return _possibleConstructorReturn(this, (YearView.__proto__ || Object.getPrototypeOf(YearView)).call(this, props));
    }

    _createClass(YearView, [{
        key: 'renderYears',
        value: function renderYears(year) {
            var i = 0;
            var rows = [];
            var years = [];
            var _props = this.props,
                renderYear = _props.renderYear,
                selectedDate = _props.selectedDate,
                isValidDate = _props.isValidDate,
                viewDate = _props.viewDate,
                updateOn = _props.updateOn,
                setDate = _props.setDate,
                updateSelectedDate = _props.updateSelectedDate;


            year--;

            var _loop = function _loop() {
                var currentYear = viewDate.clone().set({ year: year, month: 0, day: 1 });
                var daysLength = currentYear.endOf('year').format('DDD');
                var daysInYear = [];
                for (var d = 1; d <= daysLength; d++) {
                    daysInYear.push(d);
                }
                var isDisabled = !daysInYear.find(function (d) {
                    return isValidDate(currentYear.clone().dayOfYear(d));
                });
                var props = {
                    key: year,
                    'data-value': year,
                    className: (0, _classnames2['default'])('el-datetime-year', {
                        'el-datetime-disabled': isDisabled,
                        'el-datetime-active': selectedDate && selectedDate.year() === year
                    })
                };
                if (!isDisabled) {
                    props.onClick = updateOn === 'years' ? updateSelectedDate : setDate('year');
                }

                years.push(renderYear(props, year, selectedDate && selectedDate.clone()));

                if (years.length === 4) {
                    rows.push(_react2['default'].createElement(
                        'tr',
                        { key: i },
                        years
                    ));
                    years = [];
                }

                year++;
            };

            for (; i < 12; i++) {
                _loop();
            }
            return rows;
        }
    }, {
        key: 'render',
        value: function render() {
            var type = "years";
            var _props2 = this.props,
                viewDate = _props2.viewDate,
                showView = _props2.showView,
                updateTime = _props2.updateTime;

            var year = parseInt(viewDate.year() / 10, 10) * 10;
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
                                    { onClick: function onClick(e) {
                                            return updateTime('subtract', 10, type);
                                        } },
                                    '\u2039'
                                )
                            ),
                            _react2['default'].createElement(
                                'th',
                                { key: 'year', className: 'el-datetime-switch' },
                                _react2['default'].createElement(
                                    'span',
                                    { onClick: function onClick(e) {
                                            return showView(type);
                                        },
                                        colSpan: '2' },
                                    year + "-" + (year + 9)
                                )
                            ),
                            _react2['default'].createElement(
                                'th',
                                { key: 'next', className: 'el-datetime-next' },
                                _react2['default'].createElement(
                                    'span',
                                    { onClick: function onClick(e) {
                                            return updateTime('add', 10, type);
                                        } },
                                    '\u203A'
                                )
                            )
                        )
                    )
                ),
                _react2['default'].createElement(
                    'table',
                    { key: type },
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

YearView.defaultProps = {
    isValidDate: function isValidDate() {
        return 1;
    },
    renderYear: function renderYear(props, year) {
        return _react2['default'].createElement(
            'td',
            props,
            year
        );
    }
};

exports['default'] = (0, _reactOnclickoutside2['default'])(YearView);