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

var MonthView = function (_React$Component) {
    _inherits(MonthView, _React$Component);

    function MonthView(props) {
        _classCallCheck(this, MonthView);

        return _possibleConstructorReturn(this, (MonthView.__proto__ || Object.getPrototypeOf(MonthView)).call(this, props));
    }

    _createClass(MonthView, [{
        key: 'handleClick',
        value: function handleClick(item, e) {
            var _props = this.props,
                updateOn = _props.updateOn,
                setDate = _props.setDate,
                updateSelectedDate = _props.updateSelectedDate;

            if (!item.disabled) {
                updateOn === 'months' ? updateSelectedDate(item) : setDate('month', item);
            }
        }
    }, {
        key: 'renderTbody',
        value: function renderTbody() {
            var _props2 = this.props,
                renderMonth = _props2.renderMonth,
                selectedDate = _props2.selectedDate;

            var monthArr = this.renderMonths();
            var tds = [],
                trs = [],
                props = {};
            var renderer = renderMonth || this.renderMonth.bind(this);
            for (var i = 0; i < 12; i++) {
                var item = monthArr[i];
                if (!item) {
                    tds.push(_react2['default'].createElement('td', { key: i }));
                } else {
                    props = {
                        key: item.value,
                        className: (0, _classnames2['default'])('el-datetime-month', {
                            'el-datetime-disabled': item.disabled,
                            'el-datetime-active': item.active
                        }),
                        onClick: this.handleClick.bind(this, item)
                    };
                    tds.push(renderer(props, item.value, selectedDate && selectedDate.clone()));
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
        key: 'renderMonths',
        value: function renderMonths() {
            var _props3 = this.props,
                isValidDate = _props3.isValidDate,
                selectedDate = _props3.selectedDate,
                viewDate = _props3.viewDate,
                rows = [],
                i = 0,
                currentMonth = void 0;

            while (i < 12) {
                currentMonth = viewDate.clone().set({ month: i, date: 1 });
                rows.push({
                    value: i,
                    disabled: !~new Array(currentMonth.daysInMonth()).findIndex(function (d, idx) {
                        return isValidDate(currentMonth.clone().date(idx + 1));
                    }),
                    active: selectedDate && i === selectedDate.month() && viewDate.year() === selectedDate.year()
                });
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
            var _props4 = this.props,
                updateTime = _props4.updateTime,
                showView = _props4.showView,
                uid = _props4.uid;

            var type = 'years';
            return _react2['default'].createElement(
                'div',
                { className: 'el-datetime-months', 'data-value': uid },
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
                                    {
                                        onClick: function onClick(e) {
                                            return updateTime('subtract', 1, type);
                                        } },
                                    '\u2039'
                                )
                            ),
                            _react2['default'].createElement(
                                'th',
                                { key: 'year', className: 'el-datetime-switch', onClick: function onClick(e) {
                                        return showView(type);
                                    }, colSpan: '2',
                                    'data-value': this.props.viewDate.year() },
                                this.props.viewDate.year()
                            ),
                            _react2['default'].createElement(
                                'th',
                                { key: 'next', className: 'el-datetime-next' },
                                _react2['default'].createElement(
                                    'span',
                                    {
                                        onClick: function onClick(e) {
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
                        this.renderTbody()
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
exports['default'] = MonthView;