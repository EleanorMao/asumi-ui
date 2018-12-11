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

        var _this = _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).call(this, props));

        _this.timer = null;
        return _this;
    }

    _createClass(Message, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var duration = this.props.duration;

            if (duration) {
                this.timer = setTimeout(function () {
                    if (_this2.timer) {
                        _this2.handleDestroy();
                    }
                }, duration);
            }
        }
    }, {
        key: 'handleDestroy',
        value: function handleDestroy() {
            this.props.onDestroy();
            window.clearTimeout(this.timer);
            this.timer = null;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                icon = _props.icon,
                type = _props.type,
                content = _props.content;

            var _className = (0, _classnames2['default'])('el-message', 'el-move-down', type ? 'el-' + type : '');
            return _react2['default'].createElement(
                'div',
                { className: _className, onClick: this.handleDestroy.bind(this) },
                !!icon && _react2['default'].createElement(
                    'span',
                    { className: 'el-message-icon' },
                    icon
                ),
                _react2['default'].createElement('span', { className: 'el-message-content', dangerouslySetInnerHTML: { __html: content } })
            );
        }
    }]);

    return Message;
}(_react.Component);

exports['default'] = Message;


Message.propTypes = {
    onDestroy: _propTypes2['default'].func,
    duration: _propTypes2['default'].number,
    type: _propTypes2['default'].oneOf(['info', 'success', 'warning', 'danger', 'error'])
};

Message.defaultProps = {
    onDestroy: function onDestroy() {},
    duration: 3000
};

var MessageGroup = function (_Component2) {
    _inherits(MessageGroup, _Component2);

    function MessageGroup(props) {
        _classCallCheck(this, MessageGroup);

        var _this3 = _possibleConstructorReturn(this, (MessageGroup.__proto__ || Object.getPrototypeOf(MessageGroup)).call(this, props));

        _this3.state = {
            list: []
        };
        return _this3;
    }

    _createClass(MessageGroup, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.getRef(this);
        }
    }, {
        key: 'removeMessage',
        value: function removeMessage(_ref) {
            var key = _ref.key,
                onClose = _ref.onClose;

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
            }, function () {
                onClose && onClose();
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

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
                            onDestroy: _this4.removeMessage.bind(_this4, props)
                        }));
                    })
                )
            );
        }
    }]);

    return MessageGroup;
}(_react.Component);

MessageGroup.defaultProps = {
    getRef: function getRef() {}
};

function confirm(props) {
    if (!_el_message_content) {
        var div = document.createElement('div');
        document.body.appendChild(div);
        var renderToDom = _reactDom2['default'].render || _reactDom2['default'].hydrate;
        renderToDom(_react2['default'].createElement(MessageGroup, { getRef: function getRef(c) {
                _el_message_content = c;
                pushMessage(props);
            } }), div);
    } else {
        pushMessage(props);
    }
}

function pushMessage(props) {
    if (!_el_message_content) return;
    _el_message_content.setState(function (prev) {
        prev.list = prev.list.concat(props);
        return prev;
    });
}

Message.confirm = function (props) {
    if (typeof props === "string") {
        props = { content: props };
    }
    return confirm(props);
};

Message.info = function (props) {
    if (typeof props === "string") {
        props = { content: props };
    }
    props = (0, _util.extend)({ type: 'info', icon: _react2['default'].createElement('i', { className: 'fa fa-info-circle' }) }, props);
    return confirm(props);
};

Message.warning = function (props) {
    if (typeof props === "string") {
        props = { content: props };
    }
    props = (0, _util.extend)({ type: 'warning', icon: _react2['default'].createElement('i', { className: 'fa fa-exclamation-triangle' }) }, props);
    return confirm(props);
};

Message.success = function (props) {
    if (typeof props === "string") {
        props = { content: props };
    }
    props = (0, _util.extend)({ type: 'success', icon: _react2['default'].createElement('i', { className: 'fa fa-smile-o' }) }, props);
    return confirm(props);
};

Message.danger = Message.error = function (props) {
    if (typeof props === "string") {
        props = { content: props };
    }
    props = (0, _util.extend)({ type: 'danger', icon: _react2['default'].createElement('i', { className: 'fa fa-close' }) }, props);
    return confirm(props);
};

Message.loading = function (props) {
    if (typeof props === "string") {
        props = { content: props };
    }
    props = (0, _util.extend)({ icon: _react2['default'].createElement('i', { className: 'fa fa-circle-o-notch fa-spin' }) }, props);
    return confirm(props);
};