'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = confirm;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function confirm(props) {
    var div = document.createElement('div');
    document.body.appendChild(div);

    var onOk = props.onOk;
    var onClose = props.onClose;
    props.onClose = close;
    props.onOk = ok;

    function remove() {
        if (_reactDom2['default'].unmountComponentAtNode(div) && div) {
            document.body.removeChild(div);
        }
    }

    function ok() {
        remove();
        onOk && onOk();
    }

    function close() {
        remove();
        onClose && onClose();
    }

    _reactDom2['default'].render(_react2['default'].createElement(
        _modal2['default'],
        props,
        props.content
    ), div);
} /**
   * Created by elly on 2017/4/10.
   */