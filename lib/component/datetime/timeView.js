'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('../util');

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeView = function (_React$Component) {
    _inherits(TimeView, _React$Component);

    function TimeView(props) {
        _classCallCheck(this, TimeView);

        var _this = _possibleConstructorReturn(this, (TimeView.__proto__ || Object.getPrototypeOf(TimeView)).call(this, props));

        _this.state = _this.getState(props);
        _this.padValues = {
            hours: 1,
            minutes: 2,
            seconds: 2,
            milliseconds: 3
        };
        _this.timeConstraints = {
            hours: { min: 0, max: 23, step: 1 },
            minutes: { min: 0, max: 59, step: 1 },
            seconds: { min: 0, max: 59, step: 1 },
            milliseconds: { min: 0, max: 999, step: 1 }
        };
        return _this;
    }

    _createClass(TimeView, [{
        key: 'getState',
        value: function getState(props) {
            var date = props.selectedDate || props.viewDate,
                format = props.timeFormat,
                counters = [];

            if (~format.toLowerCase().indexOf('h')) {
                counters.push('hours');
                ~format.indexOf('m') && counters.push('minutes');
                ~format.indexOf('s') && counters.push('seconds');
            }

            var daypart = false;
            if (this.state && ~this.props.timeFormat.toLowerCase().indexOf(' a')) {
                if (~this.props.timeFormat.indexOf(' A')) {
                    daypart = this.state.hours >= 12 ? 'PM' : 'AM';
                } else {
                    daypart = this.state.hours >= 12 ? 'pm' : 'am';
                }
            }
            return {
                daypart: daypart,
                counters: counters,
                hours: date.format('H'),
                minutes: date.format('mm'),
                seconds: date.format('ss'),
                milliseconds: date.format('SSS')
            };
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            Object.keys(this.timeConstraints).forEach(function (type) {
                (0, _util.extend)(_this2.timeConstraints[type], _this2.props.timeConstraints[type]);
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState(this.getState(nextProps));
        }
    }, {
        key: 'onStartClicking',
        value: function onStartClicking(action, type) {
            var _this3 = this;

            var update = {};
            update[type] = this[action](type);
            this.setState(update);
            this.timer = setTimeout(function () {
                _this3.increaseTimer = setInterval(function () {
                    update[type] = _this3[action](type);
                    _this3.setState(update);
                }, 70);
            }, 500);

            this.mouseUpListener = function () {
                clearTimeout(_this3.timer);
                clearInterval(_this3.increaseTimer);
                _this3.props.setTime(type, _this3.state[type]);
                document.body.removeEventListener('mouseup', _this3.mouseUpListener);
            };
            document.body.addEventListener('mouseup', this.mouseUpListener);
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var milli = parseInt(e.target === null ? e : e.value, 10);
            if (!isNaN(milli) && milli >= 0 && milli < 1000) {
                this.props.setTime('milliseconds', milli);
                this.setState({ milliseconds: milli });
            }
        }
    }, {
        key: 'toggleDayPart',
        value: function toggleDayPart(type) {
            var timeConstraints = this.timeConstraints[type];
            var value = parseInt(this.state[type], 10) + 12;
            if (value > timeConstraints.max) {
                value = timeConstraints.min + (value - (timeConstraints.max + 1));
            }
            return this.pad(type, value);
        }
    }, {
        key: 'increase',
        value: function increase(type) {
            var timeConstraints = this.timeConstraints[type];
            var value = parseInt(this.state[type], 10) + timeConstraints.step;
            if (value > timeConstraints.max) {
                value = timeConstraints.min + (value - (timeConstraints.max + 1));
            }
            return this.pad(type, value);
        }
    }, {
        key: 'decrease',
        value: function decrease(type) {
            var timeConstraints = this.timeConstraints[type];
            var value = parseInt(this.state[type], 10) - timeConstraints.step;
            if (value < timeConstraints.min) {
                value = timeConstraints.max + 1 - (timeConstraints.min - value);
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
            var _props = this.props,
                dateFormat = _props.dateFormat,
                selectedDate = _props.selectedDate,
                viewDate = _props.viewDate,
                showView = _props.showView;

            if (!dateFormat) {
                return null;
            }
            var date = selectedDate || viewDate;
            return _react2['default'].createElement(
                'thead',
                { key: 'h' },
                _react2['default'].createElement(
                    'tr',
                    null,
                    _react2['default'].createElement(
                        'th',
                        { className: 'el-datetime-switch', colSpan: '4',
                            onClick: function onClick(e) {
                                return showView("days");
                            } },
                        date.format(dateFormat)
                    )
                )
            );
        }
    }, {
        key: 'renderCounter',
        value: function renderCounter(type) {
            if (type !== 'daypart') {
                var value = this.state[type];
                if (type === 'hours' && ~this.props.timeFormat.toLowerCase().indexOf(' a')) {
                    value = (value - 1) % 12 + 1;
                    value = value === 0 ? 12 : value;
                }
                return _react2['default'].createElement(
                    'div',
                    { key: type, className: 'el-datetime-counter' },
                    _react2['default'].createElement(
                        'span',
                        { key: 'up', className: 'el-datetime-btn',
                            onMouseDown: this.onStartClicking.bind(this, "increase", type) },
                        _react2['default'].createElement('i', { className: 'fa fa-caret-up fa-2x' })
                    ),
                    _react2['default'].createElement(
                        'div',
                        { key: 'c', className: 'el-datetime-count' },
                        value
                    ),
                    _react2['default'].createElement(
                        'span',
                        { key: 'do', className: 'el-datetime-btn',
                            onMouseDown: this.onStartClicking.bind(this, "decrease", type) },
                        _react2['default'].createElement('i', {
                            className: 'fa fa-caret-down fa-2x' })
                    )
                );
            }
            return "";
        }
    }, {
        key: 'renderDayPart',
        value: function renderDayPart() {
            var daypart = this.state.daypart;
            return _react2['default'].createElement(
                'div',
                { key: 'dayPart', className: 'el-datetime-counter' },
                _react2['default'].createElement(
                    'span',
                    { key: 'up', className: 'el-datetime-btn',
                        onMouseDown: this.onStartClicking.bind(this, "toggleDayPart", "hours") },
                    _react2['default'].createElement('i', { className: 'fa fa-caret-up fa-2x' })
                ),
                _react2['default'].createElement(
                    'div',
                    { key: daypart, className: 'el-datetime-count' },
                    daypart
                ),
                _react2['default'].createElement(
                    'span',
                    { key: 'do', className: 'el-datetime-btn',
                        onMouseDown: this.onStartClicking.bind(this, "toggleDayPart", "hours") },
                    _react2['default'].createElement('i', {
                        className: 'fa fa-caret-down fa-2x' })
                )
            );
        }
    }, {
        key: 'renderBody',
        value: function renderBody() {
            var _this4 = this;

            var output = [];
            var _state = this.state,
                counters = _state.counters,
                daypart = _state.daypart,
                milliseconds = _state.milliseconds;


            counters.forEach(function (c) {
                if (output.length) {
                    output.push(_react2['default'].createElement(
                        'div',
                        { key: "sep" + output.length, className: 'el-datetime-counter-separator' },
                        ':'
                    ));
                }
                output.push(_this4.renderCounter(c));
            });

            if (daypart !== false) {
                output.push(this.renderDayPart());
            }

            if (counters.length === 3 && ~this.props.timeFormat.indexOf("S")) {
                output.push(_react2['default'].createElement(
                    'div',
                    { className: 'el-datetime-counter-separator', key: 'sep5' },
                    ':'
                ));
                output.push(_react2['default'].createElement(
                    'div',
                    { className: 'el-datetime-counter el-datetime-milli', key: 'm' },
                    _react2['default'].createElement(_input2['default'], { value: milliseconds, onChange: this.handleChange.bind(this) })
                ));
            }
            return output;
        }
    }, {
        key: 'render',
        value: function render() {
            var uid = this.props.uid;

            return _react2['default'].createElement(
                'div',
                { className: 'el-datetimeTime', 'data-value': uid },
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
                                    this.renderBody()
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

exports['default'] = TimeView;