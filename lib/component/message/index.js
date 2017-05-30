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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _animate = require('../animate');

var _animate2 = _interopRequireDefault(_animate);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/7.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var uuid = 1;
var _el_message_content = null;

var Message = function (_Component) {
    _inherits(Message, _Component);

    function Message(props) {
        _classCallCheck(this, Message);

        return _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).call(this, props));
    }

    _createClass(Message, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props;
            var duration = _props.duration;
            var onDestroy = _props.onDestroy;

            setTimeout(function () {
                onDestroy();
            }, duration);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props;
            var icon = _props2.icon;
            var type = _props2.type;
            var content = _props2.content;

            var _className = (0, _classnames2['default'])('el-message', 'el-move-down', type ? 'el-' + type : '');
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
    onDestroy: _propTypes2['default'].func,
    duration: _propTypes2['default'].number,
    type: _propTypes2['default'].oneOf(['info', 'success', 'warning', 'danger'])
};

Message.defaultProps = {
    onDestroy: function onDestroy() {},
    duration: 3000
};

var MessageGroup = function (_Component2) {
    _inherits(MessageGroup, _Component2);

    function MessageGroup(props) {
        _classCallCheck(this, MessageGroup);

        var _this2 = _possibleConstructorReturn(this, (MessageGroup.__proto__ || Object.getPrototypeOf(MessageGroup)).call(this, props));

        _this2.state = {
            list: []
        };
        return _this2;
    }

    _createClass(MessageGroup, [{
        key: 'removeMessage',
        value: function removeMessage(key) {
            var index = -1,
                list = this.state.list;
            for (var i = 0, len = list.length; i < len; i++) {
                var props = list[i];
                if (props.key === key) {
                    index = i;
                    break;
                }
            }
            this.setState(function (prev) {
                prev.list.splice(index, 1);
                return prev;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2['default'].createElement(
                'div',
                { className: 'el-message-wrapper' },
                _react2['default'].createElement(
                    _animate2['default'],
                    { transitionName: { leaveActive: 'el-move-up' } },
                    this.state.list.map(function (props) {
                        if (!props.key) {
                            props.key = uuid++;
                        }
                        return _react2['default'].createElement(Message, _extends({}, props, {
                            key: props.key,
                            onDestroy: _this3.removeMessage.bind(_this3, props.key)
                        }));
                    })
                )
            );
        }
    }]);

    return MessageGroup;
}(_react.Component);

function confirm(props) {
    if (!_el_message_content) {
        var div = document.createElement('div');
        document.body.appendChild(div);
        _el_message_content = _reactDom2['default'].render(_react2['default'].createElement(MessageGroup, null), div);
    }
    _el_message_content.setState(function (prev) {
        prev.list = prev.list.concat(props);
        return prev;
    });
}

Message.confirm = function (props) {
    return confirm(props);
};

Message.info = function (props) {
    props = (0, _util.extend)({ type: 'info', icon: _react2['default'].createElement('i', { className: 'fa fa-info-circle' }) }, props);
    return confirm(props);
};

Message.warning = function (props) {
    props = (0, _util.extend)({ type: 'warning', icon: _react2['default'].createElement('i', { className: 'fa fa-exclamation-triangle' }) }, props);
    return confirm(props);
};

Message.success = function (props) {
    props = (0, _util.extend)({ type: 'success', icon: _react2['default'].createElement('i', { className: 'fa fa-smile-o' }) }, props);
    return confirm(props);
};

Message.danger = function (props) {
    props = (0, _util.extend)({ type: 'danger', icon: _react2['default'].createElement('i', { className: 'fa fa-close' }) }, props);
    return confirm(props);
};