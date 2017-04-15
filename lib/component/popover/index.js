'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _popover = require('./popover');

var _popover2 = _interopRequireDefault(_popover);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/10.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Wrap = function (_Component) {
    _inherits(Wrap, _Component);

    function Wrap(props) {
        _classCallCheck(this, Wrap);

        return _possibleConstructorReturn(this, (Wrap.__proto__ || Object.getPrototypeOf(Wrap)).call(this, props));
    }

    _createClass(Wrap, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.container) {
                _reactDom2['default'].unmountComponentAtNode(this.container);
                document.body.removeChild(this.container);
                this.container = null;
            }
        }
    }, {
        key: 'getPosition',
        value: function getPosition() {
            var placement = this.props.placement;

            var _ReactDOM$findDOMNode = _reactDom2['default'].findDOMNode(this).getBoundingClientRect();

            var right = _ReactDOM$findDOMNode.right;
            var left = _ReactDOM$findDOMNode.left;
            var top = _ReactDOM$findDOMNode.top;
            var bottom = _ReactDOM$findDOMNode.bottom;
            var width = _ReactDOM$findDOMNode.width;
            var height = _ReactDOM$findDOMNode.height;
            var _container = this.container;
            var clientHeight = _container.clientHeight;
            var clientWidth = _container.clientWidth;

            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            var scrollLeft = document.body.scrollLeft || document.documentElement.scrollTop;
            top += scrollTop;
            left += scrollLeft;
            right += scrollLeft;
            bottom += scrollTop;
            if (placement === 'left') {
                this.style = {
                    left: left - clientWidth + 'px',
                    top: top + (height / 2 - clientHeight / 2) + 'px'
                };
            } else if (placement === 'right') {
                this.style = {
                    left: right + 'px',
                    top: top + (height / 2 - clientHeight / 2) + 'px'
                };
            } else if (placement === 'top') {
                this.style = {
                    top: top - clientHeight + 'px',
                    left: left + (width / 2 - clientWidth / 2) + 'px'
                };
            } else if (placement === 'bottom') {
                this.style = {
                    top: bottom + 'px',
                    left: left + (width / 2 - clientWidth / 2) + 'px'
                };
            }
        }
    }, {
        key: 'handleClick',
        value: function handleClick() {
            if (!this.visible) {
                this.renderComponent();
            } else {
                this.hideComponent();
            }
        }
    }, {
        key: 'renderComponent',
        value: function renderComponent() {
            if (!this.container) {
                this.container = document.createElement('div');
                this.container.className = 'el-popover-wrapper' + (this.props.content ? '' : ' el-tooltip-wrapper');
                document.body.appendChild(this.container);
            }
            var props = (0, _util.extend)({}, { style: this.props.content ? { maxWidth: 200 } : null }, this.props);
            _reactDom2['default'].unstable_renderSubtreeIntoContainer(this, _react2['default'].createElement(_popover2['default'], this.props), this.container);
            this.addStyle();
            this.visible = true;
        }
    }, {
        key: 'hideComponent',
        value: function hideComponent() {
            if (this.container) {
                _reactDom2['default'].unmountComponentAtNode(this.container);
                this.container.style.display = 'none';
                this.visible = false;
            }
        }
    }, {
        key: 'addStyle',
        value: function addStyle() {
            if (!this.style) {
                this.getPosition();
            }
            for (var style in this.style) {
                this.container.style[style] = this.style[style];
            }
            this.container.style.display = 'block';
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var children = _props.children;
            var trigger = _props.trigger;
            var hideTrigger = _props.hideTrigger;

            var child = _react2['default'].isValidElement(children) ? children : _react2['default'].createElement(
                'span',
                null,
                children
            );
            var props = {};
            if (trigger === 'hover') {
                props.onMouseEnter = this.renderComponent.bind(this);
            } else {
                props.onClick = this.handleClick.bind(this);
            }

            if (hideTrigger === 'hover') {
                props.onMouseLeave = this.hideComponent.bind(this);
            } else {
                props.onClick = this.handleClick.bind(this);
            }

            return _react2['default'].cloneElement(child, props);
        }
    }]);

    return Wrap;
}(_react.Component);

exports['default'] = Wrap;


Wrap.propTypes = {
    trigger: _react.PropTypes.oneOf(['click', 'hover']),
    hideTrigger: _react.PropTypes.oneOf(['click', 'hover']),
    placement: _react.PropTypes.oneOf(['left', 'right', 'top', 'bottom'])
};

Wrap.defaultProps = {
    hideTrigger: 'hover',
    placement: "left",
    trigger: 'click',
    title: ''
};