'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _formItem = require('./formItem');

var _formItem2 = _interopRequireDefault(_formItem);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/13.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


function isRequired(_ref) {
    var validate = _ref.validate,
        required = _ref.required;

    return required || validate && validate.some(function (item) {
        return item.trigger !== "submit" && item.required;
    });
}

//TODO#1: 多个Form打字很卡
var validateMap = {
    "null": function _null() {
        return true;
    },
    "undefined": function undefined() {
        return true;
    },
    "array": function array(v) {
        return !v.length;
    },
    "string": function string(v) {
        return !v.length;
    }
};

var Form = function (_Component) {
    _inherits(Form, _Component);

    function Form(props) {
        _classCallCheck(this, Form);

        var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        _this.names = [];
        _this._pending = false;
        _this._submitted = [];
        _this._requiredMap = {};
        _this._disabledMap = {};
        _this.state = {
            disabled: false,
            beforeSubmit: false
        };
        return _this;
    }

    _createClass(Form, [{
        key: 'getOptions',
        value: function getOptions(options, children) {
            var output = options ? options.slice() : [];
            if (children) {
                _react2['default'].Children.forEach(children, function (elm) {
                    if (elm && elm.type && elm.type._component_name === "FormItem") {
                        output.push(elm.props);
                    }
                });
            }
            return output;
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                data = _props.data,
                options = _props.options,
                stopValidate = _props.stopValidate,
                children = _props.children;

            if (stopValidate) return;
            this.validator(data, this.getOptions(options, children));
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(_ref2) {
            var data = _ref2.data,
                options = _ref2.options,
                stopValidate = _ref2.stopValidate,
                children = _ref2.children;

            if (stopValidate) return;
            this.validator(data, this.getOptions(options, children));
        }
    }, {
        key: 'validator',
        value: function validator(data, options) {
            var _this2 = this;

            if (!options) return;
            var names = [];
            var disabled = false;
            options.forEach(function (item) {
                if (item.hidden || item.type && item.type === 'hidden') return;
                var value = typeof item.value === "undefined" && data ? data[item.name] : item.value;
                var valueType = (0, _util.getType)(value);
                if (isRequired(item)) {
                    var func = validateMap[valueType];
                    var validateValue = func ? func(value) : false;
                    _this2._requiredMap[item.name] = validateValue;
                    if (!disabled) disabled = validateValue;
                } else {
                    _this2._requiredMap[item.name] = false;
                }
                names.push(item.name);
            });
            this.names.forEach(function (name) {
                if (!~names.indexOf(name)) {
                    delete _this2._disabledMap[name];
                    delete _this2._requiredMap[name];
                }
            });
            this.names = names;
            disabled = disabled || !!(~(0, _util.getValues)(this._disabledMap).indexOf(true) || ~(0, _util.getValues)(this._requiredMap).indexOf(true));
            if (disabled !== this.state.disabled) this.setState({ disabled: disabled });
        }
    }, {
        key: 'cancelSubmitPending',
        value: function cancelSubmitPending(disabled, props, cb) {
            if (typeof cb === "function") {
                cb();
                this._submitted.push(props.name);
                if (this._submitted.sort().toString() === this.names.sort().toString()) {
                    if (!disabled && this._pending) {
                        this._pending = false;
                        this._submitted = [];
                        this.handleSubmit();
                    } else {
                        this._pending = false;
                        this._submitted = [];
                        this.setState({ beforeSubmit: false });
                    }
                }
            }
        }
    }, {
        key: 'handleDisabled',
        value: function handleDisabled(props, _disabled, cb) {
            this._disabledMap[props.name] = !!_disabled;
            if (isRequired(props)) {
                var valueType = (0, _util.getType)(props.value);
                var func = validateMap[valueType];
                this._requiredMap[props.name] = func ? func(props.value) : false;
            }
            var disabled = !!_disabled || !!(~(0, _util.getValues)(this._disabledMap).indexOf(true) || ~(0, _util.getValues)(this._requiredMap).indexOf(true));
            if (disabled !== this.state.disabled) {
                this.setState({ disabled: disabled });
            }
            this.cancelSubmitPending(disabled, props, cb);
        }
    }, {
        key: 'handleChange',
        value: function handleChange(_ref3, e) {
            var name = _ref3.name,
                type = _ref3.type,
                off = _ref3.off;

            if (this.props.onChange) {
                if (type === "switch" && !e.checked) {
                    (0, _util.extend)(e, { name: name, type: type, value: off, originName: e.name, originValue: e.value });
                } else {
                    (0, _util.extend)(e, { name: name, type: type, originName: e.name, originValue: e.value });
                }
                this.props.onChange(e);
            }
        }
    }, {
        key: 'handleBeforeSubmit',
        value: function handleBeforeSubmit(_disabled, e) {
            if (this.props.preventDefault) {
                e.preventDefault();
            }
            if (this.props.stopValidate) {
                this.handleSubmit();
            } else {
                if (_disabled || this._pending) return;
                this._pending = true;
                this.setState({ beforeSubmit: true });
            }
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit() {
            var _this3 = this;

            var _props2 = this.props,
                validator = _props2.validator,
                onSubmit = _props2.onSubmit,
                preventMultipleSubmit = _props2.preventMultipleSubmit;

            if (preventMultipleSubmit && this._pending) return;
            this.setState({ beforeSubmit: false });
            if (validator && validator()) {
                this.setState({ disabled: true });
            } else {
                var cb = _util.noop;
                if (preventMultipleSubmit) {
                    this._pending = true;
                    cb = function cb() {
                        _this3._pending = false;
                    };
                }
                onSubmit && onSubmit(cb);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _props3 = this.props,
                data = _props3.data,
                options = _props3.options,
                colNum = _props3.colNum,
                error = _props3.error,
                requiredMark = _props3.requiredMark,
                colon = _props3.colon,
                disabled = _props3.disabled,
                labelWidth = _props3.labelWidth,
                hideSubmitButton = _props3.hideSubmitButton,
                layout = _props3.layout,
                title = _props3.title,
                className = _props3.className,
                submitText = _props3.submitText,
                name = _props3.name,
                submitItems = _props3.submitItems,
                submitButtonProps = _props3.submitButtonProps,
                children = _props3.children,
                style = _props3.style,
                encType = _props3.encType,
                action = _props3.action,
                method = _props3.method,
                autoComplete = _props3.autoComplete,
                target = _props3.target,
                noValidate = _props3.noValidate,
                acceptCharset = _props3.acceptCharset,
                stopValidate = _props3.stopValidate; //哎..这么写自己都看着烦啊，但是我就是控制不了我叽己啊

            var col = colNum ? Math.ceil(24 / colNum) : 0;
            var _disabled = this.state.disabled || disabled || submitButtonProps.disabled;
            var _className = (0, _classnames2['default'])('el-form', layout ? 'el-' + layout : null, col ? 'el-grid-row' : null, className);
            return _react2['default'].createElement(
                'form',
                { className: _className, style: style, encType: encType,
                    action: action, method: method, autoComplete: autoComplete,
                    name: name, target: target, noValidate: noValidate, acceptCharset: acceptCharset },
                !!title && _react2['default'].createElement(
                    'div',
                    { className: 'el-form-title' },
                    title
                ),
                options && options.map(function (props, index) {
                    var onChange = props.onChange,
                        value = props.value,
                        name = props.name,
                        others = _objectWithoutProperties(props, ['onChange', 'value', 'name']);

                    return _react2['default'].createElement(_formItem2['default'], _extends({
                        value: 'value' in props ? value : data && data[name],
                        onChange: onChange || _this4.handleChange.bind(_this4, props),
                        key: name + '.' + index,
                        requiredMark: requiredMark,
                        labelWidth: labelWidth,
                        colon: colon,
                        name: name
                    }, others, {
                        col: col,
                        beforeSubmit: _this4.state.beforeSubmit,
                        formValidator: stopValidate ? null : _this4.handleDisabled.bind(_this4)
                    }));
                }),
                children && _react2['default'].Children.map(children, function (elm) {
                    if (elm && elm.type && elm.type._component_name === "FormItem") {
                        var props = elm.props;
                        var newProps = {
                            col: col,
                            beforeSubmit: _this4.state.beforeSubmit,
                            formValidator: stopValidate ? null : _this4.handleDisabled.bind(_this4)
                        };
                        if (!props.onChange) {
                            newProps.onChange = _this4.handleChange.bind(_this4, props);
                        }
                        if (typeof props.colon !== "boolean") {
                            newProps.colon = colon;
                        }
                        if (typeof props.value === "undefined" && data) {
                            newProps.value = data[props.name];
                        }
                        if (props.requiredMark == null) {
                            newProps.requiredMark = requiredMark;
                        }
                        if (typeof props.labelWidth !== "number" && typeof props.labelWidth !== "string") {
                            newProps.labelWidth = labelWidth;
                        }
                        return _react2['default'].cloneElement(elm, newProps);
                    } else if (elm) {
                        return elm;
                    }
                }),
                _react2['default'].createElement(
                    _formItem2['default'],
                    { labelWidth: labelWidth },
                    !hideSubmitButton && _react2['default'].createElement(
                        _button2['default'],
                        _extends({}, submitButtonProps, {
                            disabled: _disabled,
                            onClick: this.handleBeforeSubmit.bind(this, _disabled),
                            type: _disabled ? null : submitButtonProps.type || "success"
                        }),
                        submitText
                    ),
                    submitItems,
                    !!error && _react2['default'].createElement(
                        'div',
                        { className: 'el-form-error' },
                        error
                    )
                )
            );
        }
    }]);

    return Form;
}(_react.Component);

exports['default'] = Form;


Form.propTypes = {
    colon: _propTypes2['default'].bool,
    name: _propTypes2['default'].string,
    data: _propTypes2['default'].object,
    error: _propTypes2['default'].string,
    action: _propTypes2['default'].string,
    method: _propTypes2['default'].string,
    target: _propTypes2['default'].string,
    colNum: _propTypes2['default'].number,
    disabled: _propTypes2['default'].bool,
    onChange: _propTypes2['default'].func,
    onSubmit: _propTypes2['default'].func,
    encType: _propTypes2['default'].string,
    validator: _propTypes2['default'].func,
    submitText: _propTypes2['default'].any,
    submitItems: _propTypes2['default'].any,
    requiredMark: _propTypes2['default'].any,
    novalidate: _propTypes2['default'].string,
    stopValidate: _propTypes2['default'].bool,
    id: _propTypes2['default'].string.isRequired,
    hideSubmitButton: _propTypes2['default'].bool,
    submitButtonProps: _propTypes2['default'].object,
    preventDefault: _propTypes2['default'].bool,
    preventMultipleSubmit: _propTypes2['default'].bool,
    labelWidth: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
    options: _propTypes2['default'].arrayOf(_propTypes2['default'].shape({
        colon: _propTypes2['default'].bool,
        hidden: _propTypes2['default'].bool,
        label: _propTypes2['default'].string,
        required: _propTypes2['default'].bool,
        onChange: _propTypes2['default'].func,
        colSpan: _propTypes2['default'].number,
        name: _propTypes2['default'].string,
        dataFormat: _propTypes2['default'].func,
        labelWidth: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
        component: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].func]),
        tips: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].shape({
            title: _propTypes2['default'].string,
            content: _propTypes2['default'].any
        })]),
        validateType: _propTypes2['default'].oneOf(['error', 'warning']),
        validate: _propTypes2['default'].arrayOf(_propTypes2['default'].shape({
            maxLength: _propTypes2['default'].any,
            minLength: _propTypes2['default'].any,
            length: _propTypes2['default'].number,
            instance: _propTypes2['default'].any,
            required: _propTypes2['default'].bool,
            validator: _propTypes2['default'].func,
            message: _propTypes2['default'].string,
            pattern: _propTypes2['default'].instanceOf(RegExp),
            min: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
            max: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
            trigger: _propTypes2['default'].oneOf(['blur', 'change', 'submit']),
            rule: _propTypes2['default'].oneOf(['color', 'price', 'nature', 'positiveInt']),
            type: _propTypes2['default'].oneOf(['boolean', 'array', 'string', 'object', 'number', 'moment'])
        })),
        type: _propTypes2['default'].oneOf(['text', 'color', 'password', 'datetime', 'number', 'static', 'component', 'textarea', 'select', 'checkbox', 'radio', 'switch', 'upload', 'radiogroup', 'checkgroup', 'checkboxgroup', 'transfer', 'taginput', 'hidden', 'custom'])
    })),
    layout: _propTypes2['default'].oneOf(['horizontal', 'vertical', 'inline'])
};

Form.defaultProps = {
    id: "id",
    options: [],
    onChange: _util.noop,
    submitText: '提交',
    layout: "horizontal",
    submitButtonProps: {}
};