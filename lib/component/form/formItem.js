'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _radio = require('../radio');

var _radio2 = _interopRequireDefault(_radio);

var _select = require('../select');

var _select2 = _interopRequireDefault(_select);

var _checkbox = require('../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _option = require('../select/option');

var _option2 = _interopRequireDefault(_option);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/13.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var FormItem = function (_Component) {
    _inherits(FormItem, _Component);

    function FormItem(props) {
        _classCallCheck(this, FormItem);

        return _possibleConstructorReturn(this, (FormItem.__proto__ || Object.getPrototypeOf(FormItem)).call(this, props));
    }

    _createClass(FormItem, [{
        key: 'itemRender',
        value: function itemRender() {
            var _props = this.props;
            var name = _props.name;
            var data = _props.data;
            var type = _props.type;
            var config = _props.config;
            var onChange = _props.onChange;
            var children = _props.children;

            if (children) return;
            var output = null;
            switch (type) {
                case "text":
                    output = _react2['default'].createElement(_input2['default'], _extends({}, config, { name: name, value: data, onChange: onChange }));
                    break;
                case "textarea":
                    output = _react2['default'].createElement(_input2['default'], _extends({}, config, { type: 'textarea', name: name, value: data, onChange: onChange }));
                    break;
                case "select":
                    output = _react2['default'].createElement(
                        _select2['default'],
                        { name: name, value: data, onChange: onChange },
                        config.options.map(function (item) {
                            return _react2['default'].createElement(_option2['default'], _extends({ key: item.value }, item));
                        })
                    );
                    break;
                case "radio":
                    output = _react2['default'].createElement(_radio2['default'], {
                        name: name,
                        onChange: onChange,
                        value: config.value,
                        checked: typeof data === "boolean" ? data : config.value === data
                    });
                    break;
                case "checkbox":
                    output = _react2['default'].createElement(_checkbox2['default'], {
                        name: name,
                        onChange: onChange,
                        value: config.value,
                        checked: typeof data === "boolean" ? data : config.value === data
                    });
                    break;
                default:
                    break;
            }
            return output;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props;
            var label = _props2.label;
            var required = _props2.required;
            var children = _props2.children;

            return _react2['default'].createElement(
                'div',
                { className: 'el-form-item' },
                required && _react2['default'].createElement(
                    'span',
                    { className: 'el-required' },
                    '*'
                ),
                !!label && _react2['default'].createElement(
                    'label',
                    { className: 'el-form-label' },
                    label,
                    ':\xA0\xA0'
                ),
                children,
                this.itemRender()
            );
        }
    }]);

    return FormItem;
}(_react.Component);

exports['default'] = FormItem;


FormItem.propTypes = {};

FormItem.defaultProps = {};