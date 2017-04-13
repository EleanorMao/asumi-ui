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


var Form = function (_Component) {
    _inherits(Form, _Component);

    function Form(props) {
        _classCallCheck(this, Form);

        return _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));
    }

    _createClass(Form, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var data = _props.data;
            var options = _props.options;
            var layout = _props.layout;
            var title = _props.title;
            var className = _props.className;
            var submitText = _props.submitText;
            var onSubmit = _props.onSubmit;
            var children = _props.children;

            var _className = (0, _classnames2['default'])('el-form', layout ? 'el-' + layout : null, className);
            return _react2['default'].createElement(
                'div',
                { className: _className },
                !!title && _react2['default'].createElement(
                    'div',
                    { className: 'el-form-title' },
                    title
                ),
                options.map(function (props, index) {
                    return _react2['default'].createElement(_formItem2['default'], _extends({ key: index }, props, { data: data[props.name] }));
                }),
                children,
                _react2['default'].createElement(
                    _formItem2['default'],
                    null,
                    _react2['default'].createElement(
                        _button2['default'],
                        { onClick: onSubmit },
                        submitText
                    )
                )
            );
        }
    }]);

    return Form;
}(_react.Component);

exports['default'] = Form;


Form.propTypes = {
    id: _react.PropTypes.string.isRequired,
    data: _react.PropTypes.object.isRequired,
    options: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        rule: _react.PropTypes.any,
        label: _react.PropTypes.string,
        error: _react.PropTypes.string,
        required: _react.PropTypes.bool,
        config: _react.PropTypes.object,
        tips: _react.PropTypes.oneOf([_react.PropTypes.string, _react.PropTypes.shape({
            title: _react.PropTypes.string,
            content: _react.PropTypes.any
        })]),
        warning: _react.PropTypes.string,
        name: _react.PropTypes.string.isRequired,
        type: _react.PropTypes.oneOf(['text', 'textarea', 'select', 'radio', 'checkbox', 'switch', 'uploader', 'radiogroup', 'checkboxgroup'])
    })),
    layout: _react.PropTypes.oneOf(['horizontal', 'vertical', 'inline'])
};

Form.defaultProps = {
    id: "id",
    submitText: '提交',
    layout: "horizontal"
};