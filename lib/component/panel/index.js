'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _popover = require('../popover');

var _popover2 = _interopRequireDefault(_popover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2018/2/4.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Panel = function (_Component) {
    _inherits(Panel, _Component);

    function Panel(props) {
        _classCallCheck(this, Panel);

        var _this = _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this, props));

        _this.state = {
            open: props.defaultOpen
        };
        return _this;
    }

    _createClass(Panel, [{
        key: 'handleToggle',
        value: function handleToggle() {
            if (!this.props.closeable) return;
            this.setState({ open: !this.state.open });
        }
    }, {
        key: 'render',
        value: function render() {
            var popover = void 0;
            var open = this.state.open;
            var _props = this.props,
                title = _props.title,
                className = _props.className,
                closeable = _props.closeable,
                hoverTips = _props.hoverTips,
                children = _props.children;

            var _className = (0, _classnames3['default'])(_defineProperty({
                'el-panel': true,
                'el-expand': closeable && open
            }, className, className));

            if (closeable) {
                if (hoverTips && typeof hoverTips === "string") {
                    hoverTips = { title: hoverTips };
                }

                popover = hoverTips ? _react2['default'].createElement(
                    _popover2['default'],
                    _extends({}, hoverTips, { trigger: 'hover', placement: 'top' }),
                    _react2['default'].createElement(_icon2['default'], { className: 'el-panel-button', type: 'angle-down' })
                ) : _react2['default'].createElement(_icon2['default'], { className: 'el-panel-button', type: "angle-down" });
            }

            return _react2['default'].createElement(
                'div',
                { className: _className },
                !!title && _react2['default'].createElement(
                    'div',
                    { className: 'el-panel-title', onClick: this.handleToggle.bind(this) },
                    title,
                    popover
                ),
                _react2['default'].createElement(
                    'div',
                    { className: 'el-panel-body', style: closeable ? { display: open ? 'block' : 'none' } : null },
                    children
                )
            );
        }
    }]);

    return Panel;
}(_react.Component);

exports['default'] = Panel;


Panel.propTypes = {
    title: _propTypes2['default'].any,
    closeable: _propTypes2['default'].bool,
    className: _propTypes2['default'].string,
    defaultOpen: _propTypes2['default'].bool
};

Panel.defaultProps = {
    defaultOpen: false,
    closeable: false
};