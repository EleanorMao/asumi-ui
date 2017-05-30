'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/5/26.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var MenuItemGroup = function (_Component) {
    _inherits(MenuItemGroup, _Component);

    function MenuItemGroup(props) {
        _classCallCheck(this, MenuItemGroup);

        return _possibleConstructorReturn(this, (MenuItemGroup.__proto__ || Object.getPrototypeOf(MenuItemGroup)).call(this, props));
    }

    _createClass(MenuItemGroup, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var title = _props.title;
            var children = _props.children;

            return _react2['default'].createElement(
                'li',
                { className: 'el-menu-item-group' },
                _react2['default'].createElement(
                    'div',
                    { className: 'el-menu-item-group-title' },
                    title
                ),
                _react2['default'].createElement(
                    'ul',
                    { className: 'el-menu-item-group-list' },
                    children
                )
            );
        }
    }]);

    return MenuItemGroup;
}(_react.Component);

exports['default'] = MenuItemGroup;


MenuItemGroup.propTypes = {};

MenuItemGroup.defaultProps = {};