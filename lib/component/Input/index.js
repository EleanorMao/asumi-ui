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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/6.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Input = function (_Component) {
    _inherits(Input, _Component);

    function Input(props) {
        _classCallCheck(this, Input);

        return _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));
    }

    _createClass(Input, [{
        key: 'handleChange',
        value: function handleChange(e) {
            var _e$target = e.target;
            var name = _e$target.name;
            var value = _e$target.value;
            var _props = this.props;
            var rule = _props.rule;
            var regExp = _props.regExp;

            if (rule === 'price') {
                //金额相关 8+2
                var reg = /^((0|[1-9]\d{0,7})(\.\d{0,2})?)?$/;
                if (!reg.test(value)) {
                    return;
                }
            } else if (rule === 'positiveInt') {
                //正整数 8
                var _reg = /^([1-9]\d{0,7})?$/;
                if (!_reg.test(value)) {
                    return;
                }
            } else if (rule === 'nature') {
                //自然数 非负整数
                var _reg2 = /^(0?|[1-9]\d{0,7})$/;
                if (!_reg2.test(value)) {
                    return;
                }
            } else if (rule === 'color') {
                //颜色
                var _reg3 = /^#[0-9a-fA-F]{0,6}$/;
                if (!_reg3.test(value)) {
                    return;
                }
            }

            if (Object.prototype.toString.call(regExp) === '[object RegExp]') {
                if (!regExp.test(value)) {
                    return;
                }
            }

            this.props.onChange && this.props.onChange({ e: e, name: name, value: value });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props;
            var type = _props2.type;
            var size = _props2.size;
            var rule = _props2.rule;
            var regExp = _props2.regExp;
            var icon = _props2.icon;
            var style = _props2.style;
            var inputStyle = _props2.inputStyle;
            var append = _props2.append;
            var prepend = _props2.prepend;
            var className = _props2.className;

            var other = _objectWithoutProperties(_props2, ['type', 'size', 'rule', 'regExp', 'icon', 'style', 'inputStyle', 'append', 'prepend', 'className']);

            var _other = _extends({}, other);

            var onClick = _other.onClick;

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
                        style: inputStyle,
                        className: _className,
                        onChange: this.handleChange.bind(this)
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
                        type: 'text',
                        style: inputStyle,
                        onChange: this.handleChange.bind(this)
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
    type: _react.PropTypes.string,
    onChange: _react.PropTypes.func,
    regExp: _react.PropTypes.instanceOf(RegExp),
    size: _react.PropTypes.oneOf(['large', 'small']),
    rule: _react.PropTypes.oneOf(['color', 'price', 'nature', 'positiveInt'])
};

Input.defaultProps = {
    type: 'text'
};