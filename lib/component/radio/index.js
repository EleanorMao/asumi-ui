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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/8.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Radio = function (_Component) {
    _inherits(Radio, _Component);

    function Radio(props) {
        _classCallCheck(this, Radio);

        return _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).call(this, props));
    }

    _createClass(Radio, [{
        key: 'handleChange',
        value: function handleChange(e) {
            var _props = this.props,
                name = _props.name,
                value = _props.value,
                checked = _props.checked,
                disabled = _props.disabled;

            if (disabled) return;
            this.props.onChange({ e: e, name: name, value: value, checked: !checked });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                label = _props2.label,
                type = _props2.type,
                checked = _props2.checked,
                className = _props2.className,
                onChange = _props2.onChange,
                disabled = _props2.disabled,
                children = _props2.children,
                other = _objectWithoutProperties(_props2, ['label', 'type', 'checked', 'className', 'onChange', 'disabled', 'children']);

            var _className = (0, _classnames2['default'])('el-checkbox-wrapper', disabled ? 'el-disabled' : '', className);
            var _innerClassName = (0, _classnames2['default'])('el-checkbox', type ? 'el-switch' : 'el-radio');
            return _react2['default'].createElement(
                'label',
                { className: _className },
                _react2['default'].createElement(
                    'span',
                    { className: _innerClassName },
                    _react2['default'].createElement('input', _extends({}, other, {
                        type: 'radio',
                        checked: checked,
                        disabled: disabled,
                        className: 'el-checkbox-input',
                        onChange: function onChange() {},
                        onClick: this.handleChange.bind(this) })),
                    _react2['default'].createElement('span', null)
                ),
                _react2['default'].createElement(
                    'span',
                    null,
                    children || label
                )
            );
        }
    }]);

    return Radio;
}(_react.Component);

exports['default'] = Radio;


Radio.propTypes = {
    type: _propTypes2['default'].oneOf(['switch'])
};

Radio.defaultProps = {
    checked: false,
    onChange: function onChange() {}
};