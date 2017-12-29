'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 16/9/19.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Dropdown = function (_Component) {
    _inherits(Dropdown, _Component);

    function Dropdown(props) {
        _classCallCheck(this, Dropdown);

        var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

        _this.state = { toggle: false, className: props.placement === 'top' ? 'el-dropdown-menu-bottom' : '' };
        return _this;
    }

    _createClass(Dropdown, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var placement = this.props.placement;
            if (!placement || placement === 'auto') {
                this.getClassName();
                (0, _util.addEvent)(window, 'resize', this.getClassName.bind(this));
            }
            (0, _util.addEvent)(window, 'click', this.clickToClose.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            (0, _util.removeEvent)(window, 'click', this.clickToClose.bind(this));
            (0, _util.removeEvent)(window, 'resize', this.getClassName.bind(this));
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(_ref) {
            var list = _ref.list,
                placement = _ref.placement;

            if (this.state.toggle) {
                this.setState(function (old) {
                    old.toggle = false;
                    return old;
                });
            }
            if ((!placement || placement === 'auto') && this._dropdown && list.length !== this.props.list.length) {
                this.getClassName(list);
            } else if (placement !== this.props.placement) {
                this.setState({ className: placement === 'top' ? 'el-dropdown-menu-bottom' : '' });
            }
        }
    }, {
        key: 'getClassName',
        value: function getClassName() {
            var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.list;

            var className = '';
            if (this._dropdown && this._dropdown_menu && this._dropdown.getBoundingClientRect) {
                var _dropdown$getBounding = this._dropdown.getBoundingClientRect(),
                    bottom = _dropdown$getBounding.bottom,
                    top = _dropdown$getBounding.top;

                var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                var bodyHeight = document.body.offsetHeight || document.documentElement.offsetHeight;
                var offsetBottom = bodyHeight - bottom - scrollTop;
                if (top + scrollTop > offsetBottom && offsetBottom < list.length * 40) {
                    className = 'el-dropdown-menu-bottom';
                }
            }
            this.setState({ className: className });
        }
    }, {
        key: 'handleToggle',
        value: function handleToggle() {
            this.setState(function (old) {
                old.toggle = !old.toggle;
                return old;
            });
        }
    }, {
        key: 'clickToClose',
        value: function clickToClose(e) {
            var target = this._dropdown;
            if (target && !(0, _util.contains)(target, e.target)) {
                this.setState(function (old) {
                    old.toggle = false;
                    return old;
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                list = _props.list,
                type = _props.type,
                className = _props.className,
                style = _props.style,
                children = _props.children,
                _onClick = _props.onClick;

            var _className = (0, _classnames3['default'])(_defineProperty({
                'el-btn': true,
                'el-dropdown-toggle': true,
                'el-success': type === 'success',
                'el-primary': type === 'primary',
                'el-danger': type === 'danger' || type === 'error',
                'el-secondary': type === 'secondary' || type === 'warning'
            }, className, !!className));
            return _react2['default'].createElement(
                'div',
                { className: 'el-dropdown', style: style, ref: function ref(c) {
                        _this2._dropdown = c;
                    } },
                _react2['default'].createElement(
                    'button',
                    {
                        type: 'button',
                        className: _className,
                        onClick: this.handleToggle.bind(this) },
                    children,
                    _react2['default'].createElement('span', {
                        className: 'el-caret',
                        style: this.state.toggle ? { borderTop: 0, borderBottom: '4px solid' } : null })
                ),
                _react2['default'].createElement(
                    'ul',
                    { className: "el-dropdown-menu " + this.state.className, ref: function ref(c) {
                            _this2._dropdown_menu = c;
                        }, style: { display: this.state.toggle && 'block' || null } },
                    list.map(function (item, index) {
                        return _react2['default'].createElement(
                            'li',
                            { key: index },
                            _react2['default'].createElement(
                                'a',
                                { href: item.href || 'javascript:;',
                                    onClick: function onClick(e) {
                                        if (!item.href) {
                                            e.preventDefault();
                                        }
                                        _onClick(item);
                                    } },
                                item.label || item
                            )
                        );
                    })
                )
            );
        }
    }]);

    return Dropdown;
}(_react.Component);

exports['default'] = Dropdown;


Dropdown.propTypes = {
    style: _propTypes2['default'].object,
    onClick: _propTypes2['default'].func,
    className: _propTypes2['default'].string,
    placement: _propTypes2['default'].oneOf(['auto', 'top', 'bottom']),
    type: _propTypes2['default'].oneOf(['default', 'danger', 'success', 'primary', 'secondary', 'warning', 'error']),
    list: _propTypes2['default'].oneOfType([_propTypes2['default'].array, _propTypes2['default'].shape({
        href: _propTypes2['default'].string,
        label: _propTypes2['default'].any
    })])

};
Dropdown.defaultProps = {
    placement: 'auto',
    type: 'default',
    onClick: _util.noop
};