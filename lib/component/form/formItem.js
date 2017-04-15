'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _radio = require('../radio');

var _radio2 = _interopRequireDefault(_radio);

var _select = require('../select');

var _select2 = _interopRequireDefault(_select);

var _popover = require('../popover');

var _popover2 = _interopRequireDefault(_popover);

var _option = require('../select/option');

var _option2 = _interopRequireDefault(_option);

var _radioGroup = require('../radio/radioGroup');

var _radioGroup2 = _interopRequireDefault(_radioGroup);

var _checkGroup = require('../checkbox/checkGroup');

var _checkGroup2 = _interopRequireDefault(_checkGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/13.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var rules = {
    price: /^((0|[1-9]\d{0,7})(\.\d{0,2})?)?$/,
    positiveInt: /^([1-9]\d{0,7})?$/,
    nature: /^(0?|[1-9]\d{0,7})$/,
    color: /^#[0-9a-fA-F]{0,6}$/
};
function isRequired(_ref) {
    var validate = _ref.validate;
    var required = _ref.required;

    return required || validate && validate.some(function (item) {
        return item.required;
    });
}

var FormItem = function (_Component) {
    _inherits(FormItem, _Component);

    function FormItem(props) {
        _classCallCheck(this, FormItem);

        var _this = _possibleConstructorReturn(this, (FormItem.__proto__ || Object.getPrototypeOf(FormItem)).call(this, props));

        _this.state = {
            message: ""
        };
        return _this;
    }

    _createClass(FormItem, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(_ref2) {
            var _this2 = this;

            var beforeSubmit = _ref2.beforeSubmit;
            var data = _ref2.data;
            var validate = _ref2.validate;
            var validator = _ref2.validator;

            if (beforeSubmit && validate && validate.length) {
                (function () {
                    var disabled = false;
                    validate.map(function (item) {
                        if (!disabled && item.trigger === "submit") {
                            disabled = _this2.validator(item, data);
                        }
                    });
                    validator && validator(disabled);
                })();
            }
        }
    }, {
        key: 'validator',
        value: function validator(item, data) {
            var max = item.max;
            var len = item.len;
            var min = item.min;
            var message = item.message;
            var regExp = item.regExp;
            var rule = item.rule;
            var required = item.required;
            var validator = item.validator;
            var type = item.type;

            var reg = void 0,
                fail = validator && validator(this.props);
            var valueType = typeof data === 'undefined' ? 'undefined' : _typeof(data);
            var hasLen = valueType === "array" && (!type || type === "array") || valueType === "string" && (!type || type === "string");
            if (!fail && required && (data == null || data === "")) {
                fail = true;
            }
            if (!fail && type && valueType !== type) {
                fail = true;
            }
            if (!fail && len != null && hasLen && data.length !== len) {
                fail = true;
            }
            if (!fail && min != null && hasLen && data.length < min) {
                fail = true;
            }
            if (!fail && max != null && hasLen && data.length > max) {
                fail = true;
            }
            if (!fail && Object.prototype.toString.call(regExp) === '[object RegExp]') {
                reg = regExp;
            } else if (!fail && rule) {
                reg = rules[rule];
            }
            if (!fail && reg && !reg.test(data)) {
                fail = true;
            }
            if (fail) {
                this.setState(function (prev) {
                    prev.message = message;
                    return prev;
                });
            }
            return fail;
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur() {
            var _this3 = this;

            var _props = this.props;
            var data = _props.data;
            var onBlur = _props.onBlur;
            var validate = _props.validate;
            var validator = _props.validator;

            var disabled = false;
            if (validate && validate.length) {
                validate.map(function (item) {
                    if (!disabled && item.trigger === "blur") {
                        disabled = _this3.validator(item, data);
                    }
                });
            }
            if (!disabled) {
                this.setState({ message: "" });
            }
            validator && validator(disabled);
            onBlur && onBlur.apply(null, arguments);
        }
    }, {
        key: 'handleChange',
        value: function handleChange() {
            var _this4 = this;

            var _props2 = this.props;
            var data = _props2.data;
            var onChange = _props2.onChange;
            var validate = _props2.validate;
            var validator = _props2.validator;

            var disabled = false;
            if (validate && validate.length) {
                validate.map(function (item) {
                    if (!disabled && item.trigger === "change") {
                        disabled = _this4.validator(item, data);
                    }
                });
            }
            if (!disabled) {
                this.setState({ message: "" });
            }
            validator && validator(disabled);
            onChange && onChange.apply(null, arguments);
        }
    }, {
        key: 'itemRender',
        value: function itemRender() {
            var _props3 = this.props;
            var on = _props3.on;
            var off = _props3.off;
            var tips = _props3.tips;
            var name = _props3.name;
            var data = _props3.data;
            var type = _props3.type;
            var onBlur = _props3.onBlur;
            var beforeSubmit = _props3.beforeSubmit;
            var onChange = _props3.onChange;
            var children = _props3.children;
            var options = _props3.options;
            var validate = _props3.validate;
            var validateType = _props3.validateType;
            var validator = _props3.validator;

            var config = _objectWithoutProperties(_props3, ['on', 'off', 'tips', 'name', 'data', 'type', 'onBlur', 'beforeSubmit', 'onChange', 'children', 'options', 'validate', 'validateType', 'validator']);

            if (children) return children;
            var output = null;
            switch (type) {
                case "textarea":
                    output = _react2['default'].createElement(_input2['default'], _extends({}, config, {
                        type: 'textarea',
                        name: name,
                        value: data,
                        onBlur: this.handleBlur.bind(this),
                        onChange: this.handleChange.bind(this) }));
                    break;
                case "select":
                    output = _react2['default'].createElement(
                        _select2['default'],
                        _extends({}, config, {
                            name: name,
                            value: data,
                            onBlur: this.handleBlur.bind(this),
                            onChange: this.handleChange.bind(this) }),
                        !!options && options.map(function (item) {
                            return _react2['default'].createElement(_option2['default'], _extends({ key: item.value }, item));
                        })
                    );
                    break;
                case "switch":
                    output = _react2['default'].createElement(_radio2['default'], _extends({}, config, {
                        type: 'switch',
                        value: on,
                        name: name,
                        label: null,
                        onBlur: this.handleBlur.bind(this),
                        onChange: this.handleChange.bind(this),
                        checked: typeof data === "boolean" ? data : on === data
                    }));
                    break;
                case "radio":
                    output = _react2['default'].createElement(_radioGroup2['default'], _extends({}, config, {
                        name: name,
                        value: data,
                        options: options,
                        onBlur: this.handleBlur.bind(this),
                        onChange: this.handleChange.bind(this)
                    }));
                    break;
                case "radiogroup":
                    output = _react2['default'].createElement(_radioGroup2['default'], _extends({}, config, {
                        name: name,
                        value: data,
                        options: options,
                        onBlur: this.handleBlur.bind(this),
                        onChange: this.handleChange.bind(this)
                    }));
                    break;
                case "checkbox":
                    output = _react2['default'].createElement(_checkGroup2['default'], _extends({}, config, {
                        name: name,
                        options: options,
                        checkedList: data,
                        onBlur: this.handleBlur.bind(this),
                        onChange: this.handleChange.bind(this)
                    }));
                    break;
                case "checkgroup":
                    output = _react2['default'].createElement(_checkGroup2['default'], _extends({}, config, {
                        name: name,
                        options: options,
                        checkedList: data,
                        onBlur: this.handleBlur.bind(this),
                        onChange: this.handleChange.bind(this)
                    }));
                    break;
                default:
                    output = _react2['default'].createElement(_input2['default'], _extends({}, config, {
                        type: type,
                        name: name,
                        value: data,
                        onBlur: this.handleBlur.bind(this),
                        onChange: this.handleChange.bind(this)
                    }));
                    break;
            }
            return output;
        }
    }, {
        key: 'render',
        value: function render() {
            var message = this.state.message;
            var _props4 = this.props;
            var tips = _props4.tips;
            var label = _props4.label;
            var validateType = _props4.validateType;

            var _className = (0, _classnames2['default'])('el-form-item', message ? 'el-form-item-' + validateType : '');
            if (tips && typeof tips === "string") {
                tips = { title: tips };
            }
            var required = isRequired(this.props);
            return _react2['default'].createElement(
                'div',
                { className: _className },
                !label && required && _react2['default'].createElement(
                    'span',
                    { className: 'el-required' },
                    '*'
                ),
                !!label && _react2['default'].createElement(
                    'label',
                    { className: 'el-form-label' },
                    required && _react2['default'].createElement(
                        'span',
                        { className: 'el-required' },
                        '*'
                    ),
                    label,
                    !!tips && _react2['default'].createElement(
                        _popover2['default'],
                        _extends({}, tips, { trigger: 'hover', placement: 'top' }),
                        _react2['default'].createElement('span', { className: 'fa fa-question-circle-o', style: { paddingLeft: 4 } })
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    { className: 'el-form-control' },
                    this.itemRender(),
                    !!message && _react2['default'].createElement(
                        'div',
                        { className: 'el-form-message' },
                        message
                    )
                )
            );
        }
    }]);

    return FormItem;
}(_react.Component);

exports['default'] = FormItem;


FormItem.propTypes = {
    data: _react.PropTypes.any,
    name: _react.PropTypes.string,
    label: _react.PropTypes.string,
    required: _react.PropTypes.bool,
    onChange: _react.PropTypes.func,
    tips: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.shape({
        title: _react.PropTypes.string,
        content: _react.PropTypes.any
    })]),
    validateType: _react.PropTypes.oneOf(['error', 'warning']),
    validate: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        max: _react.PropTypes.any,
        min: _react.PropTypes.any,
        len: _react.PropTypes.number,
        strict: _react.PropTypes.bool,
        validator: _react.PropTypes.func,
        regExp: _react.PropTypes.instanceOf(RegExp),
        trigger: _react.PropTypes.oneOf(['blur', 'change', 'submit']),
        rule: _react.PropTypes.oneOf(['color', 'price', 'nature', 'positiveInt']),
        type: _react.PropTypes.oneOf(['boolean', 'array', 'string', 'object', 'number'])
    })),
    type: _react.PropTypes.oneOf(['text', 'color', 'password', 'textarea', 'select', 'checkbox', 'radio', 'switch', 'uploader', 'radiogroup', 'checkgroup'])
};

FormItem.defaultProps = {
    type: "text",
    validateType: "error"
};