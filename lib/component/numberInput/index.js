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

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/11/25.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var NumberInput = function (_Component) {
    _inherits(NumberInput, _Component);

    function NumberInput(props) {
        _classCallCheck(this, NumberInput);

        var _this = _possibleConstructorReturn(this, (NumberInput.__proto__ || Object.getPrototypeOf(NumberInput)).call(this, props));

        var value = 'value' in props ? props.value : props.defaultValue;
        _this.state = {
            value: value,
            inputting: false,
            renderValue: props.dataFormat(value)
        };
        return _this;
    }

    _createClass(NumberInput, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('value' in nextProps && this.validate(nextProps.value)) {
                this.setState({
                    value: nextProps.value,
                    renderValue: nextProps.dataFormat(nextProps.value)
                });
            }
        }
    }, {
        key: 'validate',
        value: function validate(value) {
            if (value === null || isNaN(value)) {
                return false;
            }
            if (value && !/^(-)?\d*$/.test(value) && !/^((0|[1-9]\d*)(\.\d*)?)?$/.test(value)) {
                return false;
            }
            if (value !== "-") {
                var _props = this.props,
                    min = _props.min,
                    max = _props.max;

                if (value < min || value > max) {
                    return false;
                }
            }
            return true;
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(e) {
            this.setState({ inputting: true });
            this.props.onFocus && this.props.onFocus(e);
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(e) {
            this.setState({ inputting: false });
            this.props.onBlur && this.props.onBlur(e);
        }
    }, {
        key: 'handleChange',
        value: function handleChange(_ref) {
            var name = _ref.name,
                value = _ref.value,
                e = _ref.e;

            if (!this.validate(value)) {
                return;
            }
            this.setState({ value: value, renderValue: this.props.dataFormat(value) });
            this.props.onChange && this.props.onChange({ e: e, name: name, value: value });
        }
    }, {
        key: 'handleClick',
        value: function handleClick(plus, e) {
            var _props2 = this.props,
                onChange = _props2.onChange,
                name = _props2.name,
                disabled = _props2.disabled,
                dataFormat = _props2.dataFormat,
                step = _props2.step;

            if (disabled) return;
            var newValue = void 0,
                value = this.state.value,
                strValue = value.toString();
            var index = strValue.indexOf('.');
            if (~index) {
                var length = strValue.slice(index, -1).length;
                var pow = Math.pow(10, length);
                newValue = ((Number(this.state.value) || 0) * pow + (plus ? step : -step) * pow) / pow;
            } else {
                newValue = (Number(this.state.value) || 0) + (plus ? step : -step);
            }
            if (!this.validate(newValue)) {
                return;
            }
            this.setState({ value: newValue, renderValue: dataFormat(newValue) });
            onChange && onChange({ e: e, name: name, value: newValue });
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                inputting = _state.inputting,
                renderValue = _state.renderValue,
                value = _state.value;

            var _props3 = this.props,
                step = _props3.step,
                type = _props3.type,
                onChange = _props3.onChange,
                dataFormat = _props3.dataFormat,
                defaultValue = _props3.defaultValue,
                disabled = _props3.disabled,
                className = _props3.className,
                other = _objectWithoutProperties(_props3, ['step', 'type', 'onChange', 'dataFormat', 'defaultValue', 'disabled', 'className']);

            return _react2['default'].createElement(_input2['default'], _extends({}, other, {
                disabled: disabled,
                value: inputting ? value : renderValue,
                onBlur: this.handleBlur.bind(this),
                onFocus: this.handleFocus.bind(this),
                onChange: this.handleChange.bind(this),
                className: (0, _classnames2['default'])("el-number-input", disabled ? "el-number-input-disabled" : "", className),
                append: _react2['default'].createElement(
                    'span',
                    { className: 'el-number-input-handler' },
                    _react2['default'].createElement('span', { className: 'fa fa-angle-up el-number-input-up',
                        onClick: this.handleClick.bind(this, true) }),
                    _react2['default'].createElement('span', { className: 'fa fa-angle-down el-number-input-down',
                        onClick: this.handleClick.bind(this, false) })
                )
            }));
        }
    }]);

    return NumberInput;
}(_react.Component);

exports['default'] = NumberInput;


NumberInput.propTypes = {
    min: _propTypes2['default'].number,
    max: _propTypes2['default'].number,
    step: _propTypes2['default'].number,
    onChange: _propTypes2['default'].func,
    onPressEnter: _propTypes2['default'].func,
    size: _propTypes2['default'].oneOf(['large', 'small']),
    value: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number])
};

NumberInput.defaultProps = {
    step: 1,
    defaultValue: "",
    dataFormat: function dataFormat(value) {
        return value;
    },
    min: -_util.MAX_SAFE_INTEGER,
    max: _util.MAX_SAFE_INTEGER
};