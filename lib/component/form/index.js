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

var Form = function (_Component) {
    _inherits(Form, _Component);

    function Form(props) {
        _classCallCheck(this, Form);

        var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        _this.state = {
            disabled: false,
            disabledName: "",
            beforeSubmit: false
        };
        return _this;
    }

    _createClass(Form, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                data = _props.data,
                options = _props.options;

            this.validator(data, options);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(_ref2) {
            var data = _ref2.data,
                options = _ref2.options;

            this.validator(data, options);
        }
    }, {
        key: 'validator',
        value: function validator(data, options) {
            if (!options) return;
            var disabledIndex = -1;
            var _disabledIndex = -1;
            var state = this.state;
            var disabled = options.some(function (item, index) {
                if (!~_disabledIndex && state.disabled && state.disabledName && item.name === state.disabledName) {
                    _disabledIndex = index;
                }
                if (isRequired(item) && (data[item.name] == null || data[item.name] === "")) {
                    disabledIndex = index;
                    return true;
                }
            });
            if (disabled) {
                this.handleDisabled(options[disabledIndex], true);
            } else if (~_disabledIndex) {
                this.handleDisabled(options[_disabledIndex], false);
            }
        }
    }, {
        key: 'handleDisabled',
        value: function handleDisabled(props, _disabled) {
            var _state = this.state,
                disabled = _state.disabled,
                disabledName = _state.disabledName;

            if (props.name === disabledName && _disabled != disabled) {
                this.setState({ disabled: _disabled });
            } else if (_disabled && props.name !== disabledName) {
                this.setState({ disabled: _disabled, disabledName: props.name });
            }
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
        key: 'handleSubmit',
        value: function handleSubmit(_disabled) {
            var _this2 = this;

            var loading = this.state.loading;
            var _props2 = this.props,
                validator = _props2.validator,
                onSubmit = _props2.onSubmit,
                preventMultipleSubmit = _props2.preventMultipleSubmit;

            if (preventMultipleSubmit && loading) return;
            this.setState({ beforeSubmit: true }, function () {
                if (_disabled) {} else {
                    var disabled = validator && validator();
                    if (disabled) {
                        _this2.setState({ disabled: true });
                    } else {
                        var cb = preventMultipleSubmit ? function () {
                            _this2.setState({ loading: false });
                        } : (0, _util.noop)();
                        onSubmit && onSubmit(cb);
                    }
                }
                _this2.setState({ beforeSubmit: false });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

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
                acceptCharset = _props3.acceptCharset; //哎..这么写自己都看着烦啊，但是我就是控制不了我叽己啊

            var col = colNum ? Math.ceil(12 / colNum) : 0;
            var _disabled = this.state.disabled || disabled || submitButtonProps.disabled;
            var _className = (0, _classnames2['default'])('el-form', layout ? 'el-' + layout : null, col ? 'el-grid-row' : null, className);
            var renderChildren = (0, _util.isArr)(children) ? children : [children];
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
                options.map(function (props, index) {
                    return _react2['default'].createElement(_formItem2['default'], _extends({
                        onChange: _this3.handleChange.bind(_this3, props),
                        requiredMark: requiredMark,
                        labelWidth: labelWidth,
                        colon: colon
                    }, props, {
                        col: col,
                        key: index,
                        data: data[props.name],
                        beforeSubmit: _this3.state.beforeSubmit,
                        validator: _this3.handleDisabled.bind(_this3, props)
                    }));
                }),
                _react2['default'].Children.map(renderChildren, function (elm, index) {
                    if (elm && elm.type && elm.type._component_name === "FormItem") {
                        var props = elm.props;
                        var newProps = {
                            col: col,
                            data: data[props.name],
                            beforeSubmit: _this3.state.beforeSubmit,
                            validator: _this3.handleDisabled.bind(_this3, props)
                        };
                        if (!props.onChange) {
                            newProps.onChange = _this3.handleChange.bind(_this3, props);
                        }
                        if (typeof props.colon !== "boolean") {
                            newProps.colon = colon;
                        }
                        if (props.requiredMark == null) {
                            newProps.requiredMark = requiredMark;
                        }
                        if (typeof props.labelWidth !== "number" && typeof props.labelWidth !== "string") {
                            newProps.labelWidth = labelWidth;
                        }
                        return _react2['default'].cloneElement(elm, newProps);
                    } else if (elm) {
                        return _react2['default'].cloneElement(elm, { key: index });
                    }
                }),
                _react2['default'].createElement(
                    _formItem2['default'],
                    { labelWidth: labelWidth },
                    !hideSubmitButton && _react2['default'].createElement(
                        _button2['default'],
                        _extends({}, submitButtonProps, {
                            disabled: _disabled,
                            onClick: this.handleSubmit.bind(this, _disabled),
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
    id: _propTypes2['default'].string.isRequired,
    hideSubmitButton: _propTypes2['default'].bool,
    data: _propTypes2['default'].object.isRequired,
    submitButtonProps: _propTypes2['default'].object,
    preventMultipleSubmit: _propTypes2['default'].bool,
    labelWidth: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
    options: _propTypes2['default'].arrayOf(_propTypes2['default'].shape({
        colon: _propTypes2['default'].bool,
        label: _propTypes2['default'].string,
        required: _propTypes2['default'].bool,
        onChange: _propTypes2['default'].func,
        colSpan: _propTypes2['default'].number,
        name: _propTypes2['default'].string,
        dataFormat: _propTypes2['default'].func,
        labelWidth: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
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
        type: _propTypes2['default'].oneOf(['text', 'color', 'password', 'datetime', 'number', 'static', 'component', 'textarea', 'select', 'checkbox', 'radio', 'switch', 'upload', 'radiogroup', 'checkgroup', 'checkboxgroup'])
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