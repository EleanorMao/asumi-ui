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

var _grid = require('../grid');

var _grid2 = _interopRequireDefault(_grid);

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
                if (state.disabled && state.disabledName && item.name === state.disabledName) {
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
            } else if (!disabled && _disabled && props.name !== disabledName) {
                this.setState({ disabled: _disabled, disabledName: props.name });
            }
        }
    }, {
        key: 'handleChange',
        value: function handleChange(_ref3, _ref4) {
            var name = _ref3.name,
                type = _ref3.type,
                off = _ref3.off;
            var value = _ref4.value,
                checked = _ref4.checked,
                selected = _ref4.selected;

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

            var _props2 = this.props,
                validator = _props2.validator,
                onSubmit = _props2.onSubmit;

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
        key: 'itemsRender',
        value: function itemsRender() {
            var _this3 = this;

            var items = [];
            var beforeSubmit = this.state.beforeSubmit;
            var _props3 = this.props,
                data = _props3.data,
                options = _props3.options,
                colNum = _props3.colNum;

            var col = colNum ? Math.ceil(12 / colNum) : 0;
            options.map(function (props, index) {
                var item = _react2['default'].createElement(_formItem2['default'], _extends({
                    onChange: _this3.handleChange.bind(_this3, props)
                }, props, {
                    key: index,
                    data: data[props.name],
                    beforeSubmit: beforeSubmit,
                    required: isRequired(props),
                    validator: _this3.handleDisabled.bind(_this3, props)
                }));
                if (col) {
                    items.push(_react2['default'].createElement(
                        _grid2['default'].Col,
                        { col: col * (props.colSpan || 1), key: index, inline: true },
                        item
                    ));
                } else {
                    items.push(item);
                }
            });
            if (col) {
                return _react2['default'].createElement(
                    _grid2['default'].Row,
                    null,
                    items
                );
            }
            return items;
        }
    }, {
        key: 'render',
        value: function render() {
            var disabled = this.state.disabled;
            var _props4 = this.props,
                error = _props4.error,
                style = _props4.style,
                hideSubmitButton = _props4.hideSubmitButton,
                layout = _props4.layout,
                title = _props4.title,
                className = _props4.className,
                submitText = _props4.submitText,
                submitItems = _props4.submitItems,
                submitButtonOptions = _props4.submitButtonOptions,
                children = _props4.children;

            var _className = (0, _classnames2['default'])('el-form', layout ? 'el-' + layout : null, className);
            return _react2['default'].createElement(
                'form',
                { className: _className, style: style },
                !!title && _react2['default'].createElement(
                    'div',
                    { className: 'el-form-title' },
                    title
                ),
                this.itemsRender(),
                children,
                _react2['default'].createElement(
                    _formItem2['default'],
                    null,
                    !hideSubmitButton && _react2['default'].createElement(
                        _button2['default'],
                        _extends({}, submitButtonOptions, {
                            disabled: disabled,
                            onClick: this.handleSubmit.bind(this),
                            type: disabled ? null : submitButtonOptions.type || "success"
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
    error: _propTypes2['default'].string,
    colNum: _propTypes2['default'].number,
    onChange: _propTypes2['default'].func,
    onSubmit: _propTypes2['default'].func,
    validator: _propTypes2['default'].func,
    id: _propTypes2['default'].string.isRequired,
    hideSubmitButton: _propTypes2['default'].bool,
    data: _propTypes2['default'].object.isRequired,
    submitButtonOptions: _propTypes2['default'].object,
    options: _propTypes2['default'].arrayOf(_propTypes2['default'].shape({
        label: _propTypes2['default'].string,
        required: _propTypes2['default'].bool,
        onChange: _propTypes2['default'].func,
        colSpan: _propTypes2['default'].number,
        name: _propTypes2['default'].string.isRequired,
        tips: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].shape({
            title: _propTypes2['default'].string,
            content: _propTypes2['default'].any
        })]),
        validateType: _propTypes2['default'].oneOf(['error', 'warning']),
        validate: _propTypes2['default'].arrayOf(_propTypes2['default'].shape({
            max: _propTypes2['default'].any,
            min: _propTypes2['default'].any,
            len: _propTypes2['default'].number,
            required: _propTypes2['default'].bool,
            validator: _propTypes2['default'].func,
            message: _propTypes2['default'].string,
            regExp: _propTypes2['default'].instanceOf(RegExp),
            trigger: _propTypes2['default'].oneOf(['blur', 'change', 'submit']),
            rule: _propTypes2['default'].oneOf(['color', 'price', 'nature', 'positiveInt']),
            type: _propTypes2['default'].oneOf(['boolean', 'array', 'string', 'object', 'number'])
        })),
        type: _propTypes2['default'].oneOf(['text', 'color', 'password', 'component', 'textarea', 'select', 'checkbox', 'radio', 'switch', 'uploader', 'radiogroup', 'checkgroup'])
    })),
    layout: _propTypes2['default'].oneOf(['horizontal', 'vertical', 'inline'])
};

Form.defaultProps = {
    id: "id",
    onChange: _util.noop,
    submitText: '提交',
    layout: "horizontal",
    submitButtonOptions: {}
};