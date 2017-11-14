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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 16/9/19.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Dropdown = function (_Component) {
    _inherits(Dropdown, _Component);

    function Dropdown(props) {
        _classCallCheck(this, Dropdown);

        var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

        _this.state = { toggle: false, className: '' };
        return _this;
    }

    _createClass(Dropdown, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            (0, _util.addEvent)(window, 'click', this.clickToClose.bind(this));
            (0, _util.addEvent)(window, 'resize', this.getClassName.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            (0, _util.removeEvent)(window, 'click', this.clickToClose.bind(this));
            (0, _util.removeEvent)(window, 'resize', this.getClassName.bind(this));
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            if (this.state.toggle) {
                this.setState(function (old) {
                    old.toggle = false;
                    return old;
                });
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (prevProps.list.length !== this.props.list.length) {
                this.getClassName();
            }
        }
    }, {
        key: 'getClassName',
        value: function getClassName() {
            var className = '';
            if (this._dropdown && this._dropdown_menu && this._dropdown.getBoundingClientRect) {
                var bottom = (document.body.offsetHeight || document.documentElement.offsetHeight) - this._dropdown.getBoundingClientRect().bottom;
                if (bottom < this._dropdown_menu.offsetHeight) {
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
                style = _props.style,
                children = _props.children,
                _onClick = _props.onClick;

            var className = (0, _classnames2['default'])({
                'el-btn': true,
                'el-dropdown-toggle': true,
                'el-danger': type === 'danger',
                'el-success': type === 'success',
                'el-primary': type === 'primary',
                'el-secondary': type === 'secondary'
            });
            return _react2['default'].createElement(
                'div',
                { className: 'el-dropdown', style: style, ref: function ref(c) {
                        _this2._dropdown = c;
                    } },
                _react2['default'].createElement(
                    'button',
                    {
                        type: 'button',
                        className: className,
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
    onClick: _propTypes2['default'].func,
    type: _propTypes2['default'].oneOf(['default', 'danger', 'success', 'primary', 'secondary']),
    list: _propTypes2['default'].oneOfType([_propTypes2['default'].array, _propTypes2['default'].shape({
        href: _propTypes2['default'].string,
        label: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number, _propTypes2['default'].node, _propTypes2['default'].func, _propTypes2['default'].element])
    })])

};
Dropdown.defaultProps = {
    type: 'default',
    onClick: _util.noop
};