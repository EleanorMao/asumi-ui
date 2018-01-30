'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _shortcuts = require('./shortcuts');

var _shortcuts2 = _interopRequireDefault(_shortcuts);

var _calendarContainer = require('./calendarContainer');

var _calendarContainer2 = _interopRequireDefault(_calendarContainer);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var allowedSetTime = ['hours', 'minutes', 'seconds', 'milliseconds'];

var DateTime = function (_React$Component) {
    _inherits(DateTime, _React$Component);

    function DateTime(props) {
        _classCallCheck(this, DateTime);

        var _this = _possibleConstructorReturn(this, (DateTime.__proto__ || Object.getPrototypeOf(DateTime)).call(this, props));

        _this.componentProps = {
            fromState: ['viewDate', 'selectedDate', 'updateOn'],
            fromThis: ['setDate', 'setTime', 'updateTime', 'showView', 'updateSelectedDate', 'localMoment', 'uid'],
            fromProps: ['value', 'isValidDate', 'renderDay', 'renderMonth', 'renderYear', 'timeConstraints', 'showWeeks', 'isWeek', 'shortcuts']
        };
        var state = _this.getStateFromProps(props);
        state.currentView = props.dateFormat ? props.viewMode || state.updateOn || 'days' : 'time';
        _this.uid = new Date().getTime() + Math.random();
        _this.state = state;

        return _this;
    }

    _createClass(DateTime, [{
        key: 'getStateFromProps',
        value: function getStateFromProps(props) {
            var formats = this.getFormats(props),
                date = props.value || props.defaultValue,
                selectedDate = void 0,
                viewDate = void 0,
                updateOn = void 0,
                inputValue = void 0;

            if (date) {
                selectedDate = this.localMoment(date, date === 'string' ? formats.datetime : undefined);
            }

            if (selectedDate && !selectedDate.isValid()) {
                selectedDate = null;
            }
            viewDate = selectedDate ? selectedDate.clone().startOf('month') : this.localMoment().startOf('month');
            updateOn = this.getUpdateOn(formats);

            if (selectedDate) {
                inputValue = selectedDate.format(formats.datetime);
            } else if (date.isValid && !date.isValid()) {
                inputValue = '';
            } else {
                inputValue = date || '';
            }
            return {
                open: props.open,
                updateOn: updateOn,
                viewDate: viewDate,
                inputValue: inputValue,
                selectedDate: selectedDate,
                inputFormat: formats.datetime
            };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            (0, _util.addEvent)(window, 'click', this.clickToClose.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            (0, _util.removeEvent)(window, 'click', this.clickToClose.bind(this));
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var formats = this.getFormats(nextProps),
                updatedState = {},
                tag = '';
            if (nextProps.value !== this.props.value || formats.datetime !== this.getFormats(this.props).datetime) {
                updatedState = this.getStateFromProps(nextProps);
            }
            if (updatedState.open === undefined) {
                if (this.props.closeOnSelect && this.state.currentView !== 'time') {
                    updatedState.open = false;
                } else {
                    updatedState.open = this.state.open;
                }
            }
            if (nextProps.viewMode !== this.props.viewMode) {
                updatedState.currentView = nextProps.viewMode;
            }

            if (nextProps.locale !== this.props.locale) {
                if (this.state.viewDate) {
                    updatedState.viewDate = this.state.viewDate.clone().locale(nextProps.locale);
                }
                if (this.state.selectedDate) {
                    updatedState.selectedDate = this.state.selectedDate.clone().locale(nextProps.locale);
                    updatedState.inputValue = updatedState.selectedDate.format(formats.datetime);
                }
            }

            if (nextProps.utc !== this.props.utc) {
                tag = nextProps.utc ? 'utc' : 'local';

                if (this.state.viewDate) {
                    updatedState.viewDate = this.state.viewDate.clone()[tag]();
                }
                if (this.state.selectedDate) {
                    updatedState.selectedDate = this.state.selectedDate.clone()[tag]();
                    updatedState.inputValue = updatedState.selectedDate.format(formats.datetime);
                }
            }
            this.setState(updatedState);
        }
    }, {
        key: 'getFormats',
        value: function getFormats(props) {
            var formats = {
                date: props.dateFormat || '',
                time: props.timeFormat || ''
            },
                locale = this.localMoment(props.date, null, props).localeData();

            if (formats.date === true) {
                formats.date = locale.longDateFormat('L');
            } else if (this.getUpdateOn(formats) !== 'days') {
                formats.time = '';
            }
            if (formats.time === true) {
                formats.time = locale.longDateFormat('LT');
            }

            formats.datetime = formats.date && formats.time ? formats.date + ' ' + formats.time : formats.date || formats.time;

            return formats;
        }
    }, {
        key: 'getUpdateOn',
        value: function getUpdateOn(formats) {
            if (formats.date.match(/[1LD]/)) {
                return 'days';
            } else if (formats.date.indexOf('w') !== -1 || formats.date.indexOf('W') !== -1) {
                return 'weeks';
            } else if (formats.date.indexOf('M') !== -1) {
                return 'months';
            } else if (formats.date.indexOf('Y') !== -1) {
                return 'years';
            }
            return 'days';
        }
    }, {
        key: 'clickToClose',
        value: function clickToClose(e) {
            if (!this._el_datetime) return;
            var _state = this.state,
                updateOn = _state.updateOn,
                selectedDate = _state.selectedDate,
                inputValue = _state.inputValue;
            var _props = this.props,
                input = _props.input,
                onBlur = _props.onBlur;

            var el = e.target,
                _isContains = void 0;
            while (el = el.parentNode) {
                if (el.getAttribute && el.getAttribute('data-value') === updateOn + this.uid) {
                    _isContains = true;
                }
            }
            if (input && !_isContains) {
                this.setState({ open: false });
                onBlur(selectedDate || inputValue);
            }
        }
    }, {
        key: 'setDate',
        value: function setDate(type, item) {
            var _state2 = this.state,
                updateOn = _state2.updateOn,
                viewDate = _state2.viewDate;

            var nextView = {
                month: updateOn,
                year: 'months'
            };
            this.setState({
                viewDate: viewDate.clone()[type](item.value).startOf(type),
                currentView: nextView[type]
            });
        }
    }, {
        key: 'setTime',
        value: function setTime(type, value) {
            var nextType = void 0,
                state = this.state,
                index = allowedSetTime.indexOf(type) + 1,
                date = (state.selectedDate || state.viewDate).clone();
            date[type](value);
            for (; index < allowedSetTime.length; index++) {
                nextType = allowedSetTime[index];
                date[nextType](date[nextType]());
            }
            if (!this.props.value) {
                this.setState({
                    selectedDate: date,
                    inputValue: date.format(state.inputFormat)
                });
            }
            this.props.onChange({ name: this.props.name, value: date });
        }
    }, {
        key: 'showView',
        value: function showView(view) {
            this.setState({ currentView: view });
        }
    }, {
        key: 'updateTime',
        value: function updateTime(op, amount, type, toSelected) {
            var date = toSelected ? 'selectedDate' : 'viewDate';
            this.setState(function (old) {
                old[date] = old[date].clone()[op](amount, type);
                return old;
            });
        }
    }, {
        key: 'updateSelectedDate',
        value: function updateSelectedDate(item, close) {
            var _this2 = this;

            var _state3 = this.state,
                viewDate = _state3.viewDate,
                selectedDate = _state3.selectedDate,
                updateOn = _state3.updateOn,
                inputFormat = _state3.inputFormat,
                modifier = 0,
                currentdate = selectedDate || viewDate,
                date = void 0;

            if (updateOn === 'days') {
                item['new'] && (modifier = 1);
                item.old && (modifier = -1);
                date = viewDate.clone().set({ month: viewDate.month() + modifier, date: item.value.date() });
            } else if (updateOn === 'weeks') {
                item['new'] && (modifier = 1);
                item.old && (modifier = -1);
                date = viewDate.clone().set({ month: viewDate.month() + modifier, date: item.value.date() });
            } else if (updateOn === 'months') {
                date = viewDate.clone().set({ month: item.value, date: currentdate.date() });
            } else if (updateOn === 'years') {
                date = viewDate.clone().set({ year: item.value, month: currentdate.month(), date: currentdate.date() });
            }
            date.set({
                hour: currentdate.hours(),
                minute: currentdate.minutes(),
                second: currentdate.seconds(),
                millisecond: currentdate.milliseconds()
            });
            if (!this.props.value) {
                var open = !(this.props.closeOnSelect && close);
                if (!open) {
                    this.props.onBlur(date);
                }
                this.setState({
                    selectedDate: date,
                    viewDate: date.clone().startOf('month'),
                    inputValue: date.format(inputFormat),
                    open: open
                });
            } else {
                if (this.props.closeOnSelect && close) {
                    this.closeCalendar();
                }
            }
            setTimeout(function () {
                _this2.props.onChange({ name: _this2.props.name, value: date });
            }, 0);
        }
    }, {
        key: 'openCalendar',
        value: function openCalendar(e) {
            var _this3 = this;

            var open = this.state.open;

            if (!open) {
                this.setState({
                    open: true
                }, function () {
                    _this3.props.onFocus(e);
                });
            }
        }
    }, {
        key: 'closeCalendar',
        value: function closeCalendar() {
            var _state4 = this.state,
                selectedDate = _state4.selectedDate,
                inputValue = _state4.inputValue;

            this.setState({
                open: false
            });
            this.props.onBlur(selectedDate || inputValue);
        }
    }, {
        key: 'localMoment',
        value: function localMoment(date, format) {
            var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.props;

            var m = (props.utc ? _moment2['default'].utc : _moment2['default'])(date, format, props.strictParsing);
            if (props.locale) {
                m.locale(props.locale);
            }
            return m;
        }
    }, {
        key: 'getComponentProps',
        value: function getComponentProps() {
            var _this4 = this;

            var me = this,
                formats = this.getFormats(this.props),
                props = { dateFormat: formats.date, timeFormat: formats.time };

            this.componentProps.fromProps.forEach(function (name) {
                props[name] = me.props[name];
            });
            this.componentProps.fromState.forEach(function (name) {
                props[name] = me.state[name];
            });
            this.componentProps.fromThis.forEach(function (name) {
                props[name] = typeof me[name] === 'function' ? me[name].bind(_this4) : me[name];
            });
            return props;
        }
    }, {
        key: 'onInputKey',
        value: function onInputKey(e) {
            if (e.which === _util.KeyCode.TAB && this.props.closeOnTab) {
                this.closeCalendar();
            }
        }
    }, {
        key: 'onInputChange',
        value: function onInputChange(e) {
            var _this5 = this;

            var value = e.value,
                localMoment = this.localMoment(value, this.state.inputFormat),
                update = { inputValue: value };

            if (localMoment.isValid() && !this.props.value) {
                update.selectedDate = localMoment;
                update.viewDate = localMoment.clone().startOf('month');
            } else {
                update.selectedDate = null;
            }
            return this.setState(update, function () {
                return _this5.props.onChange({
                    value: localMoment.isValid() ? localMoment : _this5.state.inputValue,
                    name: _this5.props.name
                });
            });
        }
    }, {
        key: 'renderInput',
        value: function renderInput(value) {
            var renderInput = this.props.renderInput;

            return renderInput ? renderInput(this.state.selectedDate) : value;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var _props2 = this.props,
                className = _props2.className,
                input = _props2.input,
                shortcuts = _props2.shortcuts,
                style = _props2.style,
                _state5 = this.state,
                inputValue = _state5.inputValue,
                open = _state5.open,
                currentView = _state5.currentView,
                updateOn = _state5.updateOn;

            return _react2['default'].createElement(
                'div',
                { className: (0, _classnames2['default'])('el-datetime', className, { 'el-static': input }, { 'el-datetime-open': open }),
                    ref: function ref(c) {
                        return _this6._el_datetime = c;
                    }, style: style,
                    'data-value': updateOn + this.uid },
                input && _react2['default'].createElement(_input2['default'], { key: 'i', icon: _react2['default'].createElement('i', { className: 'fa fa-calendar-minus-o' }), autoComplete: 'off',
                    onFocus: this.openCalendar.bind(this), onChange: this.onInputChange.bind(this),
                    onKeyDown: this.onInputKey.bind(this), value: this.renderInput(inputValue) }),
                _react2['default'].createElement(
                    'div',
                    { key: 'dt', className: 'el-datetime-picker' },
                    !!shortcuts && !!shortcuts.length && _react2['default'].createElement(_shortcuts2['default'], { shortcuts: shortcuts }),
                    _react2['default'].createElement(_calendarContainer2['default'], { view: currentView, viewProps: this.getComponentProps() })
                )
            );
        }
    }]);

    return DateTime;
}(_react2['default'].Component);

exports['default'] = DateTime;


DateTime.propTypes = {
    onFocus: _propTypes2['default'].func,
    onBlur: _propTypes2['default'].func,
    onChange: _propTypes2['default'].func,
    locale: _propTypes2['default'].string,
    utc: _propTypes2['default'].bool,
    name: _propTypes2['default'].string,
    input: _propTypes2['default'].bool,
    style: _propTypes2['default'].object,
    inputProps: _propTypes2['default'].object,
    timeConstraints: _propTypes2['default'].object,
    viewMode: _propTypes2['default'].oneOf(['years', 'months', 'days', 'time', 'weeks']),
    isValidDate: _propTypes2['default'].func,
    open: _propTypes2['default'].bool,
    strictParsing: _propTypes2['default'].bool,
    closeOnSelect: _propTypes2['default'].bool,
    closeOnTab: _propTypes2['default'].bool,
    showWeeks: _propTypes2['default'].bool,
    isWeek: _propTypes2['default'].bool,
    renderInput: _propTypes2['default'].func,
    shortcuts: _propTypes2['default'].array
};
DateTime.defaultProps = {
    className: '',
    defaultValue: '',
    inputProps: {},
    input: true,
    onFocus: _util.noop,
    onBlur: _util.noop,
    onChange: _util.noop,
    timeFormat: true,
    timeConstraints: {},
    dateFormat: true,
    strictParsing: true,
    closeOnSelect: false,
    closeOnTab: true,
    utc: false,
    showWeeks: false,
    isWeek: false,
    shortcuts: []
};