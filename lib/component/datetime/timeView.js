'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('../util');

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeView = function (_React$Component) {
    _inherits(TimeView, _React$Component);

    function TimeView(props) {
        _classCallCheck(this, TimeView);

        var _this = _possibleConstructorReturn(this, (TimeView.__proto__ || Object.getPrototypeOf(TimeView)).call(this, props));

        _this.state = _this.calculateState(_this.props);
        _this.padValues = {
            hours: 1,
            minutes: 2,
            seconds: 2,
            milliseconds: 3
        };
        return _this;
    }

    _createClass(TimeView, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var me = this;
            me.timeConstraints = {
                hours: { min: 0, max: 23, step: 1 },
                minutes: { min: 0, max: 59, step: 1 },
                seconds: { min: 0, max: 59, step: 1 },
                milliseconds: { min: 0, max: 999, step: 1 }
            };
            Object.keys(me.timeConstraints).forEach(function (type) {
                (0, _util.extend)(me.timeConstraints[type], me.props.timeConstraints[type]);
            });
            this.setState(this.calculateState(this.props));
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState(this.calculateState(nextProps));
        }
    }, {
        key: 'onStartClicking',
        value: function onStartClicking(action, type) {
            var me = this;
            return function () {
                var update = {};
                update[type] = me[action](type);
                me.setState(update);
                me.timer = setTimeout(function () {
                    me.increaseTimer = setInterval(function () {
                        update[type] = me[action](type);
                        me.setState(update);
                    }, 70);
                }, 500);

                me.mouseUpListener = function () {
                    clearTimeout(me.timer);
                    clearInterval(me.increaseTimer);
                    me.props.setTime(type, me.state[type]);
                    document.body.removeEventListener('mouseup', me.mouseUpListener);
                };
                document.body.addEventListener('mouseup', me.mouseUpListener);
            };
        }
    }, {
        key: 'calculateState',
        value: function calculateState(props) {
            var date = props.selectedDate || props.viewDate,
                format = props.timeFormat,
                counters = [];

            if (format.toLowerCase().indexOf('h') !== -1) {
                counters.push('hours');
                format.indexOf('m') !== -1 && counters.push('minutes');
                format.indexOf('s') !== -1 && counters.push('seconds');
            }

            var daypart = false;
            if (this.state !== null && this.props.timeFormat.toLowerCase().indexOf(' a') !== -1) {
                if (this.props.timeFormat.indexOf(' A') !== -1) {
                    daypart = this.state.hours >= 12 ? 'PM' : 'AM';
                } else {
                    daypart = this.state.hours >= 12 ? 'pm' : 'am';
                }
            }
            return {
                hours: date.format('H'),
                minutes: date.format('mm'),
                seconds: date.format('ss'),
                milliseconds: date.format('SSS'),
                daypart: daypart,
                counters: counters
            };
        }
    }, {
        key: 'updateMilli',
        value: function updateMilli(e) {
            var milli = parseInt(e.target.value, 10);
            if (milli === e.target.value && milli >= 0 && milli < 1000) {
                this.props.setTime('milliseconds', milli);
                this.setState({ milliseconds: milli });
            }
        }
    }, {
        key: 'toggleDayPart',
        value: function toggleDayPart(type) {
            var value = parseInt(this.state[type], 10) + 12;
            if (value > this.timeConstraints[type].max) {
                value = this.timeConstraints[type].min + (value - (this.timeConstraints[type].max + 1));
            }
            return this.pad(type, value);
        }
    }, {
        key: 'increase',
        value: function increase(type) {
            var value = parseInt(this.state[type], 10) + this.timeConstraints[type].step;
            if (value > this.timeConstraints[type].max) {
                value = this.timeConstraints[type].min + (value - (this.timeConstraints[type].max + 1));
            }
            return this.pad(type, value);
        }
    }, {
        key: 'decrease',
        value: function decrease(type) {
            var value = parseInt(this.state[type], 10) - this.timeConstraints[type].step;
            if (value < this.timeConstraints[type].min) {
                value = this.timeConstraints[type].max + 1 - (this.timeConstraints[type].min - value);
            }
            return this.pad(type, value);
        }
    }, {
        key: 'pad',
        value: function pad(type, value) {
            var str = value + '';
            while (str.length < this.padValues[type]) {
                str = '0' + str;
            }
            return str;
        }
    }, {
        key: 'renderHeader',
        value: function renderHeader() {
            if (!this.props.dateFormat) {
                return null;
            }
            var date = this.props.selectedDate || this.props.viewDate;
            return _react2['default'].createElement(
                'thead',
                { key: 'h' },
                _react2['default'].createElement(
                    'tr',
                    null,
                    _react2['default'].createElement(
                        'th',
                        { className: 'el-datetime-switch', colSpan: '4',
                            onClick: this.props.showView('days') },
                        date.format(this.props.dateFormat)
                    )
                )
            );
        }
    }, {
        key: 'renderCounter',
        value: function renderCounter(type) {
            if (type !== 'daypart') {
                var value = this.state[type];
                if (type === 'hours' && this.props.timeFormat.toLowerCase().indexOf(' a') !== -1) {
                    value = (value - 1) % 12 + 1;
                    value = value === 0 ? 12 : value;
                }
                return _react2['default'].createElement(
                    'div',
                    { key: type, className: 'el-datetime-counter' },
                    _react2['default'].createElement(
                        'span',
                        { key: 'up', className: 'el-datetime-btn',
                            onMouseDown: this.onStartClicking('increase', type) },
                        '\u25B2'
                    ),
                    _react2['default'].createElement(
                        'div',
                        { key: 'c', className: 'el-datetime-count' },
                        value
                    ),
                    _react2['default'].createElement(
                        'span',
                        { key: 'do', className: 'el-datetime-btn',
                            onMouseDown: this.onStartClicking('decrease', type) },
                        '\u25BC'
                    )
                );
            }
            return '';
        }
    }, {
        key: 'renderDayPart',
        value: function renderDayPart() {
            return _react2['default'].createElement(
                'div',
                { key: 'dayPart', className: 'el-datetimeCounter' },
                _react2['default'].createElement(
                    'span',
                    { key: 'up', className: 'el-datetimeBtn',
                        onMouseDown: this.onStartClicking('toggleDayPart', 'hours') },
                    '\u25B2'
                ),
                _react2['default'].createElement(
                    'div',
                    { key: this.state.daypart, className: 'el-datetimeCount' },
                    this.state.daypart
                ),
                _react2['default'].createElement(
                    'span',
                    { key: 'do', className: 'el-datetimeBtn',
                        onMouseDown: this.onStartClicking('toggleDayPart', 'hours') },
                    '\u25BC'
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var me = this,
                counters = [];
            this.state.counters.forEach(function (c) {
                if (counters.length) {
                    counters.push(_react2['default'].createElement(
                        'div',
                        { key: 'sep' + counters.length, className: 'el-datetime-counter-separator' },
                        ':'
                    ));
                }
                counters.push(me.renderCounter(c));
            });

            if (this.state.daypart !== false) {
                counters.push(me.renderDayPart());
            }

            if (this.state.counters.length === 3 && this.props.timeFormat.indexOf('S') !== -1) {
                counters.push(_react2['default'].createElement(
                    'div',
                    { className: 'el-datetimeCounterSeparator', key: 'sep5' },
                    ':'
                ));
                counters.push(_react2['default'].createElement(
                    'div',
                    { className: 'el-datetimeCounter el-datetimeMilli', key: 'm' },
                    _react2['default'].createElement('input', { type: 'text', value: this.state.milliseconds, onChange: this.updateMilli.bind(this) })
                ));
            }
            return _react2['default'].createElement(
                'div',
                { className: 'el-datetimeTime' },
                _react2['default'].createElement(
                    'table',
                    null,
                    this.renderHeader(),
                    _react2['default'].createElement(
                        'tbody',
                        { key: 'b' },
                        _react2['default'].createElement(
                            'tr',
                            null,
                            _react2['default'].createElement(
                                'td',
                                null,
                                _react2['default'].createElement(
                                    'div',
                                    { className: 'el-datetime-counters' },
                                    counters
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return TimeView;
}(_react2['default'].Component);

exports['default'] = (0, _reactOnclickoutside2['default'])(TimeView);