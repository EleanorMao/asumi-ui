'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _animate = require('../animate');

var _animate2 = _interopRequireDefault(_animate);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/7.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Modal = function (_Component) {
    _inherits(Modal, _Component);

    function Modal(props) {
        _classCallCheck(this, Modal);

        return _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));
    }

    _createClass(Modal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if ((window.innerHeight || document.documentElement.clientHeight) < document.body.scrollHeight) {
                document.body.style.overflow = 'hidden';
                document.body.style.paddingRight = (0, _util.getScrollBarWidth)() + 'px';
            }
            (0, _util.addEvent)(document, 'keydown', this.handleKeyDown.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            var keyCode = e.keyCode;
            if (keyCode === _util.KeyCode.ESC) {
                this.close(e);
            }
        }
    }, {
        key: 'handleMaskClose',
        value: function handleMaskClose(e) {
            if (e.target === e.currentTarget) {
                this.close(e);
            }
        }
    }, {
        key: 'close',
        value: function close(e) {
            if (this.props.onClose) {
                this.props.onClose(e);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                size = _props.size,
                mask = _props.mask,
                title = _props.title,
                style = _props.style,
                okText = _props.okText,
                closeText = _props.closeText,
                className = _props.className,
                footer = _props.footer,
                children = _props.children,
                close = _props.close,
                ok = _props.ok,
                onOk = _props.onOk,
                maskCloseable = _props.maskCloseable;

            var _classNames = (0, _classnames3['default'])(_defineProperty({
                'el-modal-content': true
            }, className, className));
            var _modalClassName = (0, _classnames3['default'])({
                'el-modal': true,
                'el-small': size === "small",
                'el-large': size === "large"
            });
            return _react2['default'].createElement(
                'div',
                null,
                !!mask && _react2['default'].createElement('div', { className: 'el-mask' }),
                _react2['default'].createElement(
                    'div',
                    { className: 'el-modal-wrapper', role: 'dialog', tabIndex: -1,
                        onClick: maskCloseable ? this.handleMaskClose.bind(this) : null },
                    _react2['default'].createElement(
                        _animate2['default'],
                        { key: 'modal', component: '', transitionAppear: true,
                            transitionName: { appear: 'el-zoom-enter', leave: 'el-zoom-leave' } },
                        _react2['default'].createElement(
                            'div',
                            { className: _modalClassName, role: 'document' },
                            _react2['default'].createElement(
                                'div',
                                { className: _classNames, style: style },
                                _react2['default'].createElement(
                                    'div',
                                    { className: 'el-modal-close',
                                        onClick: this.close.bind(this), 'aria-label': 'Close' },
                                    '\xD7'
                                ),
                                !!title && _react2['default'].createElement(
                                    'div',
                                    { className: 'el-modal-header' },
                                    title
                                ),
                                _react2['default'].createElement(
                                    'div',
                                    { className: 'el-modal-body' },
                                    children
                                ),
                                footer !== null && _react2['default'].createElement(
                                    'div',
                                    { className: 'el-modal-footer' },
                                    footer || _react2['default'].createElement(
                                        'div',
                                        null,
                                        close && _react2['default'].createElement(
                                            _button2['default'],
                                            {
                                                style: { marginRight: 10 },
                                                size: size === "large" ? "default" : "small",
                                                onClick: this.close.bind(this) },
                                            closeText
                                        ),
                                        ok && _react2['default'].createElement(
                                            _button2['default'],
                                            {
                                                type: 'primary',
                                                size: size === "large" ? "default" : "small",
                                                onClick: onOk },
                                            okText
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Modal;
}(_react.Component);

exports['default'] = Modal;


Modal.propTypes = {
    ok: _propTypes2['default'].bool,
    mask: _propTypes2['default'].bool,
    onOk: _propTypes2['default'].func,
    title: _propTypes2['default'].any,
    okText: _propTypes2['default'].any,
    footer: _propTypes2['default'].any,
    close: _propTypes2['default'].bool,
    onClose: _propTypes2['default'].func,
    style: _propTypes2['default'].object,
    closeText: _propTypes2['default'].any,
    className: _propTypes2['default'].string,
    maskCloseable: _propTypes2['default'].bool,
    size: _propTypes2['default'].oneOf(['default', 'small', 'large'])
};

Modal.defaultProps = {
    ok: true,
    mask: true,
    close: true,
    maskCloseable: true,
    okText: '确定',
    closeText: '取消',
    onOk: _util.noop,
    onClose: _util.noop
};