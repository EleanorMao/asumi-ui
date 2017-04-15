'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/7.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Message = function (_Component) {
    _inherits(Message, _Component);

    function Message(props) {
        _classCallCheck(this, Message);

        var _this = _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).call(this, props));

        _this.state = {
            className: ''
        };
        return _this;
    }

    _createClass(Message, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({ className: 'el-move-down' });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var _props = this.props;
            var duration = _props.duration;
            var onDestroy = _props.onDestroy;

            this.timer = setTimeout(function () {
                _this2.setState({ className: 'el-move-up' }, function () {
                    onDestroy();
                });
            }, duration);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props;
            var icon = _props2.icon;
            var type = _props2.type;
            var content = _props2.content;

            var _className = (0, _classnames2['default'])('el-message', this.state.className, type ? 'el-' + type : '');
            return _react2['default'].createElement(
                'div',
                { className: _className },
                !!icon && _react2['default'].createElement(
                    'span',
                    { className: 'el-message-icon' },
                    icon
                ),
                _react2['default'].createElement(
                    'span',
                    { className: 'el-message-content' },
                    content
                )
            );
        }
    }]);

    return Message;
}(_react.Component);

exports['default'] = Message;


Message.propTypes = {
    onDestroy: _react.PropTypes.func,
    duration: _react.PropTypes.number,
    type: _react.PropTypes.oneOf(['info', 'success', 'warning', 'danger'])
};

Message.defaultProps = {
    duration: 3000
};

function confirm(props) {
    var content = document.querySelector('.el-message-wrapper');
    var div = document.createElement('div');
    if (!content) {
        content = document.createElement('div');
        content.className = 'el-message-wrapper';
        document.body.appendChild(content);
    }

    function remove() {
        setTimeout(function () {
            _reactDom2['default'].unmountComponentAtNode(div);
        }, 300);
    }

    _reactDom2['default'].render(_react2['default'].createElement(Message, _extends({}, props, { onDestroy: remove })), div);
    content.appendChild(div);
}

Message.confirm = function (props) {
    return confirm(props);
};

Message.info = function (props) {
    props = (0, _util.extend)({}, { type: 'info', icon: _react2['default'].createElement('i', { className: 'fa fa-info-circle' }) }, props);
    return confirm(props);
};

Message.warning = function (props) {
    props = (0, _util.extend)({}, { type: 'warning', icon: _react2['default'].createElement('i', { className: 'fa fa-exclamation-triangle' }) }, props);
    return confirm(props);
};

Message.success = function (props) {
    props = (0, _util.extend)({}, { type: 'success', icon: _react2['default'].createElement('i', { className: 'fa fa-smile-o' }) }, props);
    return confirm(props);
};

Message.danger = function (props) {
    props = (0, _util.extend)({}, { type: 'danger', icon: _react2['default'].createElement('i', { className: 'fa fa-close' }) }, props);
    return confirm(props);
};