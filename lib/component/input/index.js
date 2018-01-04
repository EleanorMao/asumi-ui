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

var _util = require('../util');

var _calcNodeHeight = require('./calcNodeHeight');

var _calcNodeHeight2 = _interopRequireDefault(_calcNodeHeight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/6.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


function onNextFrame(cb) {
    if (window.requestAnimationFrame) {
        return window.requestAnimationFrame(cb);
    }
    return window.setTimeout(cb, 1);
}

function clearNextFrameAction(nextFrameId) {
    if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(nextFrameId);
    } else {
        window.clearTimeout(nextFrameId);
    }
}

var Input = function (_Component) {
    _inherits(Input, _Component);

    function Input(props) {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

        _this.nextFrameActionId = void 0;
        _this.state = {
            textareaStyles: {}
        };
        return _this;
    }

    _createClass(Input, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.resizeHeight();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(_ref) {
            var value = _ref.value;

            if (this.props.value !== value) {
                if (this.nextFrameActionId) {
                    clearNextFrameAction(this.nextFrameActionId);
                }
                this.nextFrameActionId = onNextFrame(this.resizeHeight.bind(this));
            }
        }
    }, {
        key: 'resizeHeight',
        value: function resizeHeight() {
            var elm = this._el_textarea;
            var _props = this.props,
                type = _props.type,
                autoSize = _props.autoSize;

            if (elm && autoSize && type === 'textarea') {
                var _isObj = (0, _util.isObj)(autoSize);
                var minRows = _isObj ? autoSize.minRows : null;
                var maxRows = _isObj ? autoSize.maxRows : null;
                this.setState({ textareaStyles: (0, _calcNodeHeight2['default'])(elm, minRows, maxRows) });
            }
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            if (!('value' in this.props)) {
                this.resizeHeight();
            }
            var _e$target = e.target,
                name = _e$target.name,
                value = _e$target.value;
            var _props2 = this.props,
                rule = _props2.rule,
                pattern = _props2.pattern,
                maxLength = _props2.maxLength,
                onChange = _props2.onChange;

            if (rule && _util.rules[rule] && !_util.rules[rule].test(value)) return;
            if (pattern && !pattern.test(value)) return;
            if (value.length > maxLength) return;
            onChange({ e: e, name: name, value: value });
        }
    }, {
        key: 'handleKeyPress',
        value: function handleKeyPress(e) {
            if (e.which === _util.KeyCode.ENTER) {
                this.props.onPressEnter(e);
            }
            this.props.onKeyPress(e);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props3 = this.props,
                type = _props3.type,
                size = _props3.size,
                rule = _props3.rule,
                autoSize = _props3.autoSize,
                icon = _props3.icon,
                style = _props3.style,
                inputStyle = _props3.inputStyle,
                append = _props3.append,
                prepend = _props3.prepend,
                onPressEnter = _props3.onPressEnter,
                className = _props3.className,
                other = _objectWithoutProperties(_props3, ['type', 'size', 'rule', 'autoSize', 'icon', 'style', 'inputStyle', 'append', 'prepend', 'onPressEnter', 'className']);

            var _other = _extends({}, other),
                onClick = _other.onClick;

            var _className = (0, _classnames2['default'])('el-input', className, size ? 'el-' + size : '');
            if (type === 'textarea') {
                return _react2['default'].createElement(
                    'div',
                    { className: _className, style: style },
                    !!icon && _react2['default'].createElement(
                        'span',
                        { className: 'el-input-icon', onClick: onClick },
                        icon
                    ),
                    _react2['default'].createElement('textarea', _extends({}, other, {
                        className: _className,
                        ref: function ref(c) {
                            return _this2._el_textarea = c;
                        },
                        onChange: this.handleChange.bind(this),
                        style: (0, _util.extend)(inputStyle, this.state.textareaStyles)
                    }))
                );
            } else {
                var input = _react2['default'].createElement(
                    'div',
                    { className: _className, style: style },
                    !!icon && _react2['default'].createElement(
                        'span',
                        { className: 'el-input-icon', onClick: onClick },
                        icon
                    ),
                    _react2['default'].createElement('input', _extends({}, other, {
                        type: type,
                        style: inputStyle,
                        onChange: this.handleChange.bind(this),
                        onKeyPress: this.handleKeyPress.bind(this)
                    }))
                );
                if (prepend || append) {
                    var _wrapperClass = (0, _classnames2['default'])('el-input-wrapper', className, size ? 'el-' + size : '');
                    return _react2['default'].createElement(
                        'div',
                        { className: _wrapperClass, style: style },
                        prepend && _react2['default'].createElement(
                            'span',
                            { className: 'el-input-prepend' },
                            prepend
                        ),
                        input,
                        append && _react2['default'].createElement(
                            'span',
                            { className: 'el-input-append' },
                            append
                        )
                    );
                } else {
                    return input;
                }
            }
        }
    }]);

    return Input;
}(_react.Component);

exports['default'] = Input;


Input.propTypes = {
    icon: _propTypes2['default'].any,
    append: _propTypes2['default'].any,
    prepend: _propTypes2['default'].any,
    type: _propTypes2['default'].string,
    onChange: _propTypes2['default'].func,
    onPressEnter: _propTypes2['default'].func,
    pattern: _propTypes2['default'].instanceOf(RegExp),
    size: _propTypes2['default'].oneOf(['large', 'small']),
    autoSize: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].shape({
        minRows: _propTypes2['default'].number,
        maxRows: _propTypes2['default'].number
    })]),
    rule: _propTypes2['default'].oneOf(['color', 'price', 'nature', 'positiveInt'])
};

Input.defaultProps = {
    type: 'text',
    onChange: _util.noop,
    onKeyPress: _util.noop,
    onPressEnter: _util.noop
};