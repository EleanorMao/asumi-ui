'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/5.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Menu = function (_Component) {
    _inherits(Menu, _Component);

    function Menu(props) {
        _classCallCheck(this, Menu);

        return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));
    }

    _createClass(Menu, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var width = _props.width;
            var children = _props.children;
            var openAll = _props.openAll;
            var defaultOpenKey = _props.defaultOpenKey;
            var style = _props.style;

            return _react2['default'].createElement(
                'div',
                { className: 'el-side-menu', style: (0, _util.extend)({}, { width: width }, style) },
                _react2['default'].createElement(
                    'ul',
                    { className: 'el-menu' },
                    _react2['default'].Children.map(children, function (elm) {
                        if (!elm) return;
                        var open = openAll;
                        if (!open && defaultOpenKey === elm.key) open = true;
                        return _react2['default'].cloneElement(elm, { open: open, openAll: openAll, defaultOpenKey: defaultOpenKey });
                    })
                )
            );
        }
    }]);

    return Menu;
}(_react.Component);

exports['default'] = Menu;

Menu.propTypes = {
    openAll: _propTypes2['default'].bool,
    defaultOpenKey: _propTypes2['default'].any
};
Menu.defaultProps = {
    width: 220
};