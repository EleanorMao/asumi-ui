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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/7.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Tabs = function (_Component) {
    _inherits(Tabs, _Component);

    function Tabs(props) {
        _classCallCheck(this, Tabs);

        var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

        var activeKey = props.defaultActiveKey == null ? props.children[0].key : props.defaultActiveKey;
        _this.state = {
            activeKey: activeKey
        };
        return _this;
    }

    _createClass(Tabs, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            if (props.defaultActiveKey != this.props.defaultActiveKey) {
                this.setState({ activeKey: props.defaultActiveKey });
            }
        }
    }, {
        key: 'handleClick',
        value: function handleClick(key) {
            this.setState({ activeKey: key });
            this.props.onClick && this.props.onClick(key);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var type = _props.type;
            var children = _props.children;
            var activeKey = this.state.activeKey;

            var isCard = type === "card" ? " el-card" : "";
            return _react2['default'].createElement(
                'div',
                { className: "el-tabs" },
                _react2['default'].createElement(
                    'ul',
                    { className: 'el-tabs-nav' + isCard + ' clearfix' },
                    _react2['default'].Children.map(children, function (elm) {
                        var key = elm.key;
                        var label = elm.props.label;

                        return _react2['default'].createElement(
                            'li',
                            {
                                key: key,
                                onClick: _this2.handleClick.bind(_this2, key),
                                className: activeKey === key ? "el-tabs-nav-active" : "" },
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
                    _react2['default'].Children.map(children, function (elm) {
                        var key = elm.key;
                        return _react2['default'].cloneElement(elm, { _active: activeKey === key });
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
    defaultActiveKey: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number])
};

Tabs.defaultProps = {};