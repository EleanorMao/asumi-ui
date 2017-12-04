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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/7.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


function toArr(v) {
    if ((0, _util.isArr)(v)) {
        return v;
    } else {
        return v ? [v] : [];
    }
}

var Tabs = function (_Component) {
    _inherits(Tabs, _Component);

    function Tabs(props) {
        _classCallCheck(this, Tabs);

        var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

        var child = toArr(props.children)[0];
        var activeId = props.activeId == null ? child ? child.props.id : null : props.activeId;
        _this.state = {
            activeId: activeId
        };
        return _this;
    }

    _createClass(Tabs, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            if (props.activeId != this.props.activeId) {
                this.setState({ activeId: props.activeId });
            }
        }
    }, {
        key: 'handleClick',
        value: function handleClick(id) {
            this.setState({ activeId: id });
            this.props.onClick && this.props.onClick(id);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                type = _props.type,
                children = _props.children;
            var activeId = this.state.activeId;

            var isCard = type === "card" ? " el-card" : "";
            var renderChildren = _react2['default'].Children.toArray(children);
            return _react2['default'].createElement(
                'div',
                { className: "el-tabs" },
                _react2['default'].createElement(
                    'ul',
                    { className: 'el-tabs-nav' + isCard + ' clearfix' },
                    _react2['default'].Children.map(renderChildren, function (elm) {
                        if (!elm) return;
                        var _elm$props = elm.props,
                            label = _elm$props.label,
                            id = _elm$props.id;

                        return _react2['default'].createElement(
                            'li',
                            {
                                key: id,
                                onClick: _this2.handleClick.bind(_this2, id),
                                className: activeId === id ? "el-tabs-nav-active" : "" },
                            _react2['default'].createElement(
                                'a',
                                { href: 'javascript:;' },
                                label
                            )
                        );
                    })
                ),
                _react2['default'].createElement(
                    'div',
                    { className: 'el-tabs-content' + isCard },
                    _react2['default'].Children.map(renderChildren, function (elm) {
                        if (!elm) return;
                        var id = elm.props.id;

                        return _react2['default'].cloneElement(elm, { _active: activeId === id });
                    })
                )
            );
        }
    }]);

    return Tabs;
}(_react.Component);

exports['default'] = Tabs;


Tabs.propTypes = {
    onClick: _propTypes2['default'].func,
    type: _propTypes2['default'].oneOf(['default', 'line', 'card']),
    activeId: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number])
};

Tabs.defaultProps = {};