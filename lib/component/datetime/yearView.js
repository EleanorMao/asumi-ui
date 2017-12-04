'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

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
        key: 'handleClick',
        value: function handleClick(item, e) {
            var _props = this.props,
                updateOn = _props.updateOn,
                setDate = _props.setDate,
                updateSelectedDate = _props.updateSelectedDate;

            if (!item.disabled) {
                updateOn === 'years' ? updateSelectedDate(item) : setDate('year', item);
            }
        }
    }, {
        key: 'renderTbody',
        value: function renderTbody(year) {
            var _props2 = this.props,
                renderYear = _props2.renderYear,
                selectedDate = _props2.selectedDate;

            var yearArr = this.renderYears(year);
            var tds = [],
                trs = [],
                props = {};
            for (var i = 0; i < 12; i++) {
                var item = yearArr[i];
                if (!item) {
                    tds.push(_react2['default'].createElement('td', { key: i }));
                } else {
                    props = {
                        key: item.value,
                        className: (0, _classnames2['default'])('el-datetime-year', {
                            'el-datetime-disabled': item.disabled,
                            'el-datetime-active': item.active
                        }),
                        onClick: this.handleClick.bind(this, item)
                    };
                    tds.push(renderYear(props, item.value, selectedDate && selectedDate.clone()));
                }
                if ((i + 1) % 4 === 0) {
                    trs.push(_react2['default'].createElement(
                        'tr',
                        { key: i },
                        tds
                    ));
                    tds = [];
                }
            }
            return trs;
        }
    }, {
        key: 'renderYears',
        value: function renderYears(year) {
            var _props3 = this.props,
                selectedDate = _props3.selectedDate,
                isValidDate = _props3.isValidDate,
                viewDate = _props3.viewDate;

            var rows = [],
                endYear = year + 10;

            var _loop = function _loop() {
                var row = {};
                var currentYear = viewDate.clone().set({ year: year }).startOf('year');
                row = {
                    value: year,
                    disabled: !~new Array(currentYear.endOf('year').dayOfYear()).findIndex(function (d, idx) {
                        return isValidDate(currentYear.clone().dayOfYear(idx + 1));
                    }),
                    active: selectedDate && selectedDate.year() === year
                };
                rows.push(row);
                year++;
            };

            while (year < endYear) {
                _loop();
            }
            return rows;
        }
    }, {
        key: 'render',
        value: function render() {
            var type = "years";
            var _props4 = this.props,
                viewDate = _props4.viewDate,
                showView = _props4.showView,
                updateTime = _props4.updateTime,
                uid = _props4.uid;

            var year = parseInt(viewDate.year() / 10, 10) * 10;
            return _react2['default'].createElement(
                'div',
                { className: 'el-datetime-years', 'data-value': uid },
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
                        this.renderTbody(year)
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

exports['default'] = YearView;