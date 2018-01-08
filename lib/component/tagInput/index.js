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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _tag = require('../tag');

var _tag2 = _interopRequireDefault(_tag);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/12/4.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var TagInput = function (_Component) {
    _inherits(TagInput, _Component);

    function TagInput(props) {
        _classCallCheck(this, TagInput);

        var _this = _possibleConstructorReturn(this, (TagInput.__proto__ || Object.getPrototypeOf(TagInput)).call(this, props));

        _this.state = {
            input: "",
            active: false,
            hidePlaceholder: false
        };
        return _this;
    }

    _createClass(TagInput, [{
        key: 'handleRemove',
        value: function handleRemove(index, remain, e) {
            e.preventDefault();
            e.stopPropagation();
            var _props = this.props,
                value = _props.value,
                name = _props.name,
                onChange = _props.onChange,
                disabled = _props.disabled,
                readOnly = _props.readOnly,
                onRemove = _props.onRemove;

            if (disabled || readOnly) return;
            var _value = value.slice();
            var input = _value.splice(index, 1)[0];
            onRemove({ e: e, value: input, index: index });
            onChange({ name: name, value: _value, e: e });
            remain && this.handleInput(input);
        }
    }, {
        key: 'handleAdd',
        value: function handleAdd(input, e) {
            var _props2 = this.props,
                name = _props2.name,
                value = _props2.value,
                onChange = _props2.onChange,
                disabled = _props2.disabled,
                readOnly = _props2.readOnly,
                onSeparate = _props2.onSeparate;

            if (disabled || readOnly) return;
            var _value = value.slice();
            _value.push(input);
            onSeparate(input, e);
            onChange({ name: name, value: _value, e: e });
            this.handleInput("");
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var value = e.target.value;
            var _props3 = this.props,
                maxLength = _props3.maxLength,
                disabled = _props3.disabled,
                disabledInput = _props3.disabledInput,
                readOnly = _props3.readOnly;

            if (disabledInput || disabled || readOnly || maxLength && value.length > maxLength) return;
            this.handleInput(value);
        }
    }, {
        key: 'handleInput',
        value: function handleInput(input) {
            var _props4 = this.props,
                name = _props4.name,
                onInput = _props4.onInput;

            onInput && onInput({ value: input, name: name });
            this.setState({ input: input, hidePlaceholder: !!input });
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            var input = this.state.input;
            var _props5 = this.props,
                value = _props5.value,
                separator = _props5.separator,
                onKeyDown = _props5.onKeyDown,
                remainTagValue = _props5.remainTagValue;

            var isStr = typeof separator === "string";
            var isSeparate = e.which === (isStr ? _util.KeyCode[separator.toUpperCase()] : separator);
            if (input && isSeparate) {
                this.handleAdd(input, e);
            }
            if (!input && e.which === _util.KeyCode.DELETE && value && value.length) {
                this.handleRemove(value.length - 1, remainTagValue == null ? true : remainTagValue, e);
            }
            onKeyDown(e);
        }
    }, {
        key: 'handleClick',
        value: function handleClick(e) {
            if (!this.props.disabled && !this.props.readOnly) {
                this._el_separate_input.focus();
            }
            this.props.onClick && this.props.onClick(e);
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(e) {
            this.setState(function (prev) {
                prev.active = true;
                return prev;
            });
            this.props.onFocus(e);
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(e) {
            this.setState(function (prev) {
                prev.active = false;
                return prev;
            });
            this.props.onBlur && this.props.onBlur(e);
        }
    }, {
        key: 'render',
        value: function render() {
            var _classnames,
                _this2 = this;

            var _state = this.state,
                active = _state.active,
                hidePlaceholder = _state.hidePlaceholder,
                input = _state.input;
            var _props6 = this.props,
                value = _props6.value,
                placeholder = _props6.placeholder,
                tagProps = _props6.tagProps,
                size = _props6.size,
                remainTagValue = _props6.remainTagValue,
                className = _props6.className,
                style = _props6.style,
                readOnly = _props6.readOnly,
                disabled = _props6.disabled;

            if (disabled) {
                if (tagProps) {
                    tagProps.type = "default";
                } else {
                    tagProps = { type: "default" };
                }
            }
            var _className = (0, _classnames3['default'])((_classnames = {
                "el-taginput-wrapper": true,
                "el-taginput-active": active,
                "el-taginput-readonly": readOnly,
                "el-taginput-disabled": disabled
            }, _defineProperty(_classnames, 'el-' + size, !!size), _defineProperty(_classnames, className, !!className), _classnames));
            return _react2['default'].createElement(
                'div',
                { className: _className, style: style,
                    onClick: this.handleClick.bind(this) },
                !!placeholder && !hidePlaceholder && (!value || !value.length) && !input && _react2['default'].createElement(
                    'div',
                    { unselectable: 'unselectable', className: 'el-taginput-placeholder' },
                    placeholder
                ),
                _react2['default'].createElement(
                    'ul',
                    { className: 'el-taginput-list clearfix' },
                    value.map(function (item, index) {
                        return _react2['default'].createElement(
                            'li',
                            { key: index },
                            _react2['default'].createElement(
                                _tag2['default'],
                                _extends({ closeable: true,
                                    type: 'primary'
                                }, tagProps, {
                                    onClose: _this2.handleRemove.bind(_this2, index, remainTagValue)
                                }),
                                item
                            )
                        );
                    }),
                    _react2['default'].createElement(
                        'li',
                        { className: 'el-taginput-input-wrapper' },
                        _react2['default'].createElement('input', {
                            type: 'text',
                            value: input,
                            autoComplete: 'off',
                            disabled: disabled,
                            readOnly: readOnly,
                            ref: function ref(c) {
                                return _this2._el_separate_input = c;
                            },
                            onBlur: this.handleBlur.bind(this),
                            onFocus: this.handleFocus.bind(this),
                            onChange: this.handleChange.bind(this),
                            onKeyDown: this.handleKeyDown.bind(this),
                            style: input && input.length ? { width: input.length * 15 } : null
                        })
                    )
                )
            );
        }
    }]);

    return TagInput;
}(_react.Component);

exports['default'] = TagInput;


TagInput.propTypes = {
    onBlur: _propTypes2['default'].func,
    value: _propTypes2['default'].array,
    name: _propTypes2['default'].string,
    disabled: _propTypes2['default'].bool,
    readOnly: _propTypes2['default'].bool,
    onInput: _propTypes2['default'].func,
    onRemove: _propTypes2['default'].func,
    onChange: _propTypes2['default'].func,
    onKeyDown: _propTypes2['default'].func,
    tagProps: _propTypes2['default'].object,
    onSeparate: _propTypes2['default'].func,
    maxLength: _propTypes2['default'].number,
    placeholder: _propTypes2['default'].string,
    disabledInput: _propTypes2['default'].bool,
    remainTagValue: _propTypes2['default'].bool,
    size: _propTypes2['default'].oneOf(['default', 'large', 'small']),
    separator: _propTypes2['default'].oneOfType([_propTypes2['default'].oneOf(['enter', 'space']), _propTypes2['default'].number])
};

TagInput.defaultProps = {
    value: [],
    onBlur: _util.noop,
    onFocus: _util.noop,
    onInput: _util.noop,
    onRemove: _util.noop,
    onChange: _util.noop,
    onKeyDown: _util.noop,
    onSeparate: _util.noop,
    placeholder: "",
    separator: 'enter'
};