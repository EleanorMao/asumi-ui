'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/6/4.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Tag = function (_Component) {
    _inherits(Tag, _Component);

    function Tag(props) {
        _classCallCheck(this, Tag);

        return _possibleConstructorReturn(this, (Tag.__proto__ || Object.getPrototypeOf(Tag)).call(this, props));
    }

    _createClass(Tag, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                type = _props.type,
                children = _props.children,
                closeable = _props.closeable,
                onClose = _props.onClose;

            var className = (0, _classnames2['default'])({
                'el-tag': true,
                'el-success': type === 'success',
                'el-primary': type === 'primary',
                'el-danger': type === 'danger' || type === 'error',
                'el-secondary': type === 'secondary' || type === 'warning'
            });
            return _react2['default'].createElement(
                'div',
                { className: className },
                children,
                closeable && _react2['default'].createElement('i', { className: 'fa fa-close el-tag-close', onClick: onClose })
            );
        }
    }]);

    return Tag;
}(_react.Component);

exports['default'] = Tag;


Tag.propTypes = {
    type: _propTypes2['default'].oneOf(['default', 'danger', 'success', 'primary', 'secondary', 'error', 'warning']),
    onClose: _propTypes2['default'].func,
    closeable: _propTypes2['default'].bool
};

Tag.defaultProps = {
    type: 'default',
    onClose: _util.noop,
    closeable: false
};