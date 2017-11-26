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


var SubMenu = function (_Component) {
    _inherits(SubMenu, _Component);

    function SubMenu(props) {
        _classCallCheck(this, SubMenu);

        var _this = _possibleConstructorReturn(this, (SubMenu.__proto__ || Object.getPrototypeOf(SubMenu)).call(this, props));

        _this.state = {
            open: props.open || props.openAll
        };
        return _this;
    }

    _createClass(SubMenu, [{
        key: 'handleToggle',
        value: function handleToggle(e) {
            e.preventDefault();
            this.setState(function (prev) {
                prev.open = !prev.open;
                return prev;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                title = _props.title,
                openAll = _props.openAll,
                openIds = _props.openIds,
                children = _props.children;

            return _react2['default'].createElement(
                'li',
                { className: 'el-submenu' + (this.state.open ? ' el-submenu-expand' : ' el-submenu-closed') },
                _react2['default'].createElement(
                    'div',
                    { className: 'el-submenu-title', onClick: this.handleToggle.bind(this) },
                    title
                ),
                _react2['default'].createElement(
                    'ul',
                    { className: 'el-submenu-list' },
                    _react2['default'].Children.map(_react2['default'].Children.toArray(children), function (elm) {
                        if (!elm) return;
                        var open = openAll || elm.props.openAll;
                        if (!open && ~openIds.indexOf(elm.props.id)) open = true;
                        return _react2['default'].cloneElement(elm, { open: open, openAll: openAll, openIds: openIds });
                    })
                )
            );
        }
    }]);

    return SubMenu;
}(_react.Component);

exports['default'] = SubMenu;


SubMenu.propTypes = {
    title: _propTypes2['default'].any,
    openAll: _propTypes2['default'].bool,
    openIds: _propTypes2['default'].array,
    id: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string])
};

SubMenu.defaultProps = {
    openIds: []
};