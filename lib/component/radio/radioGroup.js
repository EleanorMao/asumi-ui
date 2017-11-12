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

var _radio = require('../radio');

var _radio2 = _interopRequireDefault(_radio);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/10.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var RadioGroup = function (_Component) {
    _inherits(RadioGroup, _Component);

    function RadioGroup(props) {
        _classCallCheck(this, RadioGroup);

        return _possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).call(this, props));
    }

    _createClass(RadioGroup, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                disableAll = _props.disableAll,
                options = _props.options,
                value = _props.value,
                onChange = _props.onChange,
                className = _props.className;

            var _className = (0, _classnames2['default'])('el-checkbox-group', className);
            return _react2['default'].createElement(
                'div',
                { className: _className },
                _react2['default'].createElement(
                    'div',
                    { className: 'el-checkbox-row' },
                    !!options && options.map(function (item, index) {
                        if (typeof item === 'string') {
                            item = { label: item, name: item, value: item, disabled: disableAll };
                        }
                        return _react2['default'].createElement(_radio2['default'], _extends({}, item, {
                            key: index,
                            onChange: onChange,
                            disabled: disableAll,
                            checked: value === item.value
                        }));
                    })
                )
            );
        }
    }]);

    return RadioGroup;
}(_react.Component);

exports['default'] = RadioGroup;


RadioGroup.propTypes = {
    options: _propTypes2['default'].array,
    disableAll: _propTypes2['default'].bool,
    checkedList: _propTypes2['default'].array
};

RadioGroup.defaultProps = {
    disableAll: false
};