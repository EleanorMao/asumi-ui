'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _formItem = require('./formItem');

var _formItem2 = _interopRequireDefault(_formItem);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/13.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


function isRequired(_ref) {
    var validate = _ref.validate;
    var required = _ref.required;

    return required || validate && validate.some(function (item) {
        return item.required;
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
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props;
            var data = _props.data;
            var options = _props.options;

            this.validator(data, options);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(_ref2) {
            var data = _ref2.data;
            var options = _ref2.options;

            this.validator(data, options);
        }
    }, {
        key: 'validator',
        value: function validator(data, options) {
            if (!options) return;
            for (var i = options.length; i--;) {
                var item = options[i];
                if (isRequired(item) && !data[item.name] && data[item.name] != '0') {
                    this.handleDisabled(item, true);
                    break;
                }
            }
        }
    }, {
        key: 'handleDisabled',
        value: function handleDisabled(props, _disabled) {
            var _state = this.state;
            var disabled = _state.disabled;
            var disabledName = _state.disabledName;

            if (props.name === disabledName && _disabled != disabled) {
                this.setState({ disabled: _disabled });
            } else if (!disabled && _disabled && props.name !== disabledName) {
                this.setState({ disabled: _disabled, disabledName: props.name });
            }
        }
    }, {
        key: 'handleChange',
        value: function handleChange(_ref3, _ref4) {
            var name = _ref3.name;
            var type = _ref3.type;
            var off = _ref3.off;
            var value = _ref4.value;
            var checked = _ref4.checked;
            var selected = _ref4.selected;

            if (this.props.onChange) {
                if (type === "switch" && !checked) {
                    this.props.onChange({ name: name, type: type, value: off, checked: checked, selected: selected });
                } else {
                    this.props.onChange({ name: name, type: type, value: value, checked: checked, selected: selected });
                }
            }
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit() {
            var _this2 = this;

            var _props2 = this.props;
            var validator = _props2.validator;
            var onSubmit = _props2.onSubmit;

            this.setState({ beforeSubmit: true }, function () {
                if (_this2.state.disabled) {} else {
                    var disabled = validator && validator();
                    if (disabled) {
                        _this2.setState({ disabled: true });
                    } else {
                        onSubmit && onSubmit();
                    }
                }
                _this2.setState({ beforeSubmit: false });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state2 = this.state;
            var disabled = _state2.disabled;
            var beforeSubmit = _state2.beforeSubmit;
            var _props3 = this.props;
            var data = _props3.data;
            var error = _props3.error;
            var options = _props3.options;
            var layout = _props3.layout;
            var title = _props3.title;
            var className = _props3.className;
            var submitText = _props3.submitText;
            var children = _props3.children;

            var _className = (0, _classnames2['default'])('el-form', layout ? 'el-' + layout : null, className);
            return _react2['default'].createElement(
                'form',
                { className: _className },
                !!title && _react2['default'].createElement(
                    'div',
                    { className: 'el-form-title' },
                    title
                ),
                options.map(function (props, index) {
                    return _react2['default'].createElement(_formItem2['default'], _extends({
                        onChange: _this3.handleChange.bind(_this3, props)
                    }, props, {
                        key: index,
                        data: data[props.name],
                        beforeSubmit: beforeSubmit,
                        required: isRequired(props),
                        validator: _this3.handleDisabled.bind(_this3, props)
                    }));
                }),
                children,
                _react2['default'].createElement(
                    _formItem2['default'],
                    null,
                    _react2['default'].createElement(
                        _button2['default'],
                        {
                            disabled: disabled,
                            type: disabled ? null : "success",
                            onClick: this.handleSubmit.bind(this) },
                        submitText
                    ),
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
    error: _react.PropTypes.string,
    onChange: _react.PropTypes.func,
    onSubmit: _react.PropTypes.func,
    validator: _react.PropTypes.func,
    id: _react.PropTypes.string.isRequired,
    data: _react.PropTypes.object.isRequired,
    options: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        label: _react.PropTypes.string,
        required: _react.PropTypes.bool,
        onChange: _react.PropTypes.func,
        name: _react.PropTypes.string.isRequired,
        tips: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.shape({
            title: _react.PropTypes.string,
            content: _react.PropTypes.any
        })]),
        validateType: _react.PropTypes.oneOf(['error', 'warning']),
        validate: _react.PropTypes.arrayOf(_react.PropTypes.shape({
            max: _react.PropTypes.any,
            min: _react.PropTypes.any,
            len: _react.PropTypes.number,
            required: _react.PropTypes.bool,
            validator: _react.PropTypes.func,
            message: _react.PropTypes.string,
            regExp: _react.PropTypes.instanceOf(RegExp),
            trigger: _react.PropTypes.oneOf(['blur', 'change', 'submit']),
            rule: _react.PropTypes.oneOf(['color', 'price', 'nature', 'positiveInt']),
            type: _react.PropTypes.oneOf(['boolean', 'array', 'string', 'object', 'number'])
        })),
        type: _react.PropTypes.oneOf(['text', 'color', 'password', 'textarea', 'select', 'checkbox', 'radio', 'switch', 'uploader', 'radiogroup', 'checkgroup'])
    })),
    layout: _react.PropTypes.oneOf(['horizontal', 'vertical', 'inline'])
};

Form.defaultProps = {
    id: "id",
    onChange: function onChange() {},
    submitText: '提交',
    layout: "horizontal"
};