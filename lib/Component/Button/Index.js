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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/5.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Button = function (_Component) {
    _inherits(Button, _Component);

    function Button(props) {
        _classCallCheck(this, Button);

        return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));
    }

    _createClass(Button, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var type = _props.type;
            var size = _props.size;
            var disabled = _props.disabled;
            var children = _props.children;
            var href = _props.href;

            var other = _objectWithoutProperties(_props, ['type', 'size', 'disabled', 'children', 'href']);

            var className = (0, _classnames2['default'])({
                btn: true,
                disabled: disabled,
                text: type === 'text',
                small: size === 'small',
                large: size === 'large',
                danger: type === 'danger',
                success: type === 'success',
                primary: type === 'primary',
                secondary: type === 'secondary'
            });
            if (href) {
                return _react2['default'].createElement(
                    'a',
                    _extends({ href: disabled ? 'javascript:;' : href, className: className }, other),
                    children
                );
            } else {
                return _react2['default'].createElement(
                    'button',
                    _extends({ type: 'button', className: className, disabled: disabled }, other),
                    children
                );
            }
        }
    }]);

    return Button;
}(_react.Component);

exports['default'] = Button;


Button.defaultProps = {
    size: 'normal',
    type: 'default',
    disabled: false
};