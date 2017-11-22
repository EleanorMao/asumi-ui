'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _calendarContainer = require('./calendarContainer');

var _calendarContainer2 = _interopRequireDefault(_calendarContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TTYPES = _react2['default'].PropTypes,
    nof = function nof() {};

var Datetime = function (_React$Component) {
    _inherits(Datetime, _React$Component);

    function Datetime(props) {
        _classCallCheck(this, Datetime);

        var _this = _possibleConstructorReturn(this, (Datetime.__proto__ || Object.getPrototypeOf(Datetime)).call(this, props));

        _this.moment = _moment2['default'];
        _this.componentProps = {
            fromProps: ['value', 'isValidDate', 'renderDay', 'renderMonth', 'renderYear', 'timeConstraints', 'showWeeks', 'isWeek'],
            fromState: ['viewDate', 'selectedDate', 'updateOn'],
            fromThis: ['setDate', 'setTime', 'showView', 'addTime', 'subtractTime', 'updateSelectedDate', 'localMoment', 'handleClickOutside']
        };
        _this.allowedSetTime = ['hours', 'minutes', 'seconds', 'milliseconds'];
        var state = _this.getStateFromProps(props);
        state.currentView = props.dateFormat ? props.viewMode || state.updateOn || 'days' : 'time';
        _this.state = state;
        return _this;
    }

    _createClass(Datetime, [{
        key: 'getStateFromProps',
        value: function getStateFromProps(props) {
            var formats = this.getFormats(props),
                date = props.value || props.defaultValue,
                selectedDate,
                viewDate,
                updateOn,
                inputValue;

            if (date && typeof date === 'string') {
                selectedDate = this.localMoment(date, formats.datetime);
            } else if (date) {
                selectedDate = this.localMoment(date);
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
                updateOn: updateOn,
                inputFormat: formats.datetime,
                viewDate: viewDate,
                selectedDate: selectedDate,
                inputValue: inputValue,
                open: props.open
            };
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var formats = this.getFormats(nextProps),
                updatedState = {};
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
                    var updateSelectedDate = this.state.selectedDate.clone().locale(nextProps.locale);
                    updatedState.selectedDate = updateSelectedDate;
                    updatedState.inputValue = updateSelectedDate.format(formats.datetime);
                }
            }

            if (nextProps.utc !== this.props.utc) {
                if (nextProps.utc) {
                    if (this.state.viewDate) {
                        updatedState.viewDate = this.state.viewDate.clone().utc();
                    }
                    if (this.state.selectedDate) {
                        updatedState.selectedDate = this.state.selectedDate.clone().utc();
                        updatedState.inputValue = updatedState.selectedDate.format(formats.datetime);
                    }
                } else {
                    if (this.state.viewDate) {
                        updatedState.viewDate = this.state.viewDate.clone().locale();
                    }
                    if (this.state.selectedDate) {
                        updatedState.selectedDate = this.state.selectedDate.clone().local();
                        updatedState.inputValue = updatedState.selectedDate.format(formats.datetime);
                    }
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
            } else if (formats.date.indexOf('M') !== -1) {
                return 'months';
            } else if (formats.date.indexOf('Y') !== -1) {
                return 'years';
            }
            return 'days';
        }
    }, {
        key: 'handleClickOutside',
        value: function handleClickOutside() {
            var _this2 = this;

            var _state = this.state,
                open = _state.open,
                selectedDate = _state.selectedDate,
                inputValue = _state.inputValue;

            if (this.props.input && open && !this.props.open) {
                this.setState({ open: false }, function () {
                    _this2.props.onBlur(selectedDate || inputValue);
                });
            }
        }
    }, {
        key: 'setDate',
        value: function setDate(type) {
            var me = this,
                nextView = {
                month: 'days',
                year: 'months'
            };
            return function (e) {
                me.setState({
                    viewDate: me.state.viewDate.clone()[type](parseInt(e.target.getAttribute('data-value'), 10)).startOf(type),
                    currentView: nextView[type]
                });
            };
        }
    }, {
        key: 'addTime',
        value: function addTime() {
            for (var _len = arguments.length, opt = Array(_len), _key = 0; _key < _len; _key++) {
                opt[_key] = arguments[_key];
            }

            return this.updateTime.apply(this, ['add'].concat(opt));
        }
    }, {
        key: 'subtractTime',
        value: function subtractTime() {
            for (var _len2 = arguments.length, opt = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                opt[_key2] = arguments[_key2];
            }

            return this.updateTime.apply(this, ['subtract'].concat(opt));
        }
    }, {
        key: 'setTime',
        value: function setTime(type, value) {
            var index = this.allowedSetTime.indexOf(type) + 1,
                state = this.state,
                date = (state.selectedDate || state.viewDate).clone(),
                nextType = void 0;
            date[type](value);
            for (; index < this.allowedSetTime.length; index++) {
                nextType = this.allowedSetTime[index];
                date[nextType](date[nextType]());
            }
            if (!this.props.value) {
                this.setState({
                    selectedDate: date,
                    inputValue: date.format(state.inputFormat)
                });
            }
            this.props.onChange(date);
        }
    }, {
        key: 'showView',
        value: function showView(view) {
            var me = this;
            return function () {
                me.setState({ currentView: view });
            };
        }
    }, {
        key: 'updateTime',
        value: function updateTime(op, amount, type, toSelected) {
            var me = this;
            return function () {
                var update = {},
                    date = toSelected ? 'selectedDate' : 'viewDate';
                update[date] = me.state[date].clone()[op](amount, type);
                me.setState(update);
            };
        }
    }, {
        key: 'updateSelectedDate',
        value: function updateSelectedDate(e, close) {
            var target = e.target,
                modifier = 0,
                viewDate = this.state.viewDate,
                currentDate = this.state.selectedDate || viewDate,
                date = void 0;
            if (target.className.indexOf('rdtDay') !== -1) {
                if (target.className.indexOf('rdtNew') !== -1) {
                    modifier = 1;
                } else if (target.className.indexOf('rdtOld') !== -1) {
                    modifier = -1;
                }
                date = viewDate.clone().month(viewDate.month() + modifier).date(parseInt(target.getAttribute('data-value'), 10));
            } else if (target.className.indexOf('rdtMonth') !== -1) {
                date = viewDate.clone().month(parseInt(target.getAttribute('data-value'), 10)).date(currentDate.date());
            } else if (target.className.indexOf('rdtYear') !== -1) {
                date = viewDate.clone().month(currentDate.month()).date(currentDate.date()).year(parseInt(target.getAttribute('data-value'), 10));
            }
            date.hours(currentDate.hours()).minutes(currentDate.minutes()).seconds(currentDate.seconds()).milliseconds(currentDate.milliseconds());
            if (!this.props.value) {
                var open = !(this.props.closeOnSelect && close);
                if (!open) {
                    this.props.onBlur(date);
                }
                this.setState({
                    selectedDate: date,
                    viewDate: date.clone().startOf('month'),
                    inputValue: date.format(this.state.inputFormat),
                    open: open
                });
            } else {
                if (this.props.closeOnSelect && close) {
                    this.closeCalendar();
                }
            }
            this.props.onChange(date);
        }
    }, {
        key: 'openCalendar',
        value: function openCalendar() {
            var _this3 = this;

            if (!this.state.open) {
                this.setState({ open: true }, function () {
                    _this3.props.onFocus();
                });
            }
        }
    }, {
        key: 'localMoment',
        value: function localMoment(date, format, props) {
            props = props || this.props;
            var momentFn = props.utc ? _moment2['default'].utc : _moment2['default'];
            var m = momentFn(date, format, props.strictParsing);
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
        key: 'onInputChange',
        value: function onInputChange(e) {
            var _this5 = this;

            var value = e.target === null ? e : e.target.value,
                localMoment = this.localMoment(value, this.state.inputFormat),
                update = { inputValue: value };

            if (localMoment.isValid() && !this.props.value) {
                update.selectedDate = localMoment;
                update.viewDate = localMoment.clone().startOf('month');
            } else {
                update.selectedDate = null;
            }
            return this.setState(update, function () {
                return _this5.props.onChange(localMoment.isValid() ? localMoment : _this5.state.inputValue);
            });
        }
    }, {
        key: 'renderInput',
        value: function renderInput(value) {
            return this.props.renderInput ? this.props.renderInput(this.state.selectedDate) : value;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                input = _props.input,
                _state2 = this.state,
                inputValue = _state2.inputValue,
                open = _state2.open,
                currentView = _state2.currentView,
                classNames = 'rdt' + (className ? Array.isArray(className) ? ' ' + className.join(' ') : ' ' + className : ''),
                children = [];

            if (input) {
                children.push(_react2['default'].createElement('input', { key: 'i', type: 'text', className: 'input-control',
                    onFocus: this.openCalendar.bind(this), onChange: this.onInputChange,
                    onKeyDown: this.onInputKey, value: this.renderInput(inputValue) }));
            } else {
                classNames += ' rdtStatic';
            }
            open && (classNames += ' rdtOpen');
            return _react2['default'].createElement(
                'div',
                { ref: 'gaga', className: classNames },
                children,
                _react2['default'].createElement(
                    'div',
                    { key: 'dt', className: 'rdtPicker' },
                    _react2['default'].createElement(_calendarContainer2['default'], {
                        view: currentView,
                        viewProps: this.getComponentProps(),
                        onClickOutside: this.handleClickOutside.bind(this)
                    })
                )
            );
        }
    }]);

    return Datetime;
}(_react2['default'].Component);

exports['default'] = Datetime;


Datetime.propTypes = {
    onFoucus: TTYPES.func,
    onBlur: TTYPES.func,
    onChange: TTYPES.func,
    locale: TTYPES.string,
    utc: TTYPES.bool,
    input: TTYPES.bool,
    inputProps: TTYPES.object,
    timeConstraints: TTYPES.object,
    viewMode: TTYPES.oneOf(['years', 'months', 'days', 'time']),
    isValidDate: TTYPES.func,
    open: TTYPES.bool,
    strictParsing: TTYPES.bool,
    closeOnSelect: TTYPES.bool,
    closeOnTab: TTYPES.bool,
    showWeeks: TTYPES.bool,
    isWeek: TTYPES.bool,
    renderInput: TTYPES.func
};
Datetime.defaultProps = {
    className: '',
    defaultValue: '',
    inputProps: {},
    input: true,
    onFocus: nof,
    onBlur: nof,
    onChange: nof,
    timeFormat: true,
    timeConstraints: {},
    dateFormat: true,
    strictParsing: true,
    closeOnSelect: false,
    closeOnTab: true,
    utc: false,
    showWeeks: false,
    isWeek: false
};