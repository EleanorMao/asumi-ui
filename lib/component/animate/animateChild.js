'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _cssAnimation = require('css-animation');

var _cssAnimation2 = _interopRequireDefault(_cssAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/28.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var transitionMap = {
    enter: 'transitionEnter',
    leave: 'transitionLeave',
    appear: 'transitionAppear'
};

var AnimateChild = function (_Component) {
    _inherits(AnimateChild, _Component);

    function AnimateChild(props) {
        _classCallCheck(this, AnimateChild);

        return _possibleConstructorReturn(this, (AnimateChild.__proto__ || Object.getPrototypeOf(AnimateChild)).call(this, props));
    }

    _createClass(AnimateChild, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.stop();
        }
    }, {
        key: 'componentWillAppear',
        value: function componentWillAppear(done) {
            var _props = this.props;
            var transitionName = _props.transitionName;
            var transitionAppear = _props.transitionAppear;

            if (transitionName && transitionAppear) {
                this.transition('appear', done);
            } else {
                done();
            }
        }
    }, {
        key: 'componentWillEnter',
        value: function componentWillEnter(done) {
            var _props2 = this.props;
            var transitionName = _props2.transitionName;
            var transitionEnter = _props2.transitionEnter;

            if (transitionName && transitionEnter) {
                this.transition('enter', done);
            } else {
                done();
            }
        }
    }, {
        key: 'componentWillLeave',
        value: function componentWillLeave(done) {
            var _props3 = this.props;
            var transitionName = _props3.transitionName;
            var transitionLeave = _props3.transitionLeave;

            if (transitionName && transitionLeave) {
                this.transition('leave', done);
            } else {
                done();
            }
        }
    }, {
        key: 'transition',
        value: function transition(type, done) {
            var _this2 = this;

            var props = this.props;
            var node = _reactDom2['default'].findDOMNode(this);
            var transitionName = props.transitionName;
            var isObj = (typeof transitionName === 'undefined' ? 'undefined' : _typeof(transitionName)) === 'object';
            this.stop();
            var end = function end() {
                _this2.stopper = null;
                done();
            };
            if (transitionName && props[transitionMap[type]]) {
                var name = isObj ? transitionName[type] : transitionName + '-' + type;
                var activeName = name + '-active';
                if (isObj && transitionName[type + 'Active']) {
                    activeName = transitionName[type + 'Active'];
                }
                this.stopper = (0, _cssAnimation2['default'])(node, {
                    active: activeName,
                    name: name
                }, end);
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            var stopper = this.stopper;
            if (stopper) {
                this.stopper = null;
                stopper.stop();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return this.props.children;
        }
    }]);

    return AnimateChild;
}(_react.Component);

exports['default'] = AnimateChild;


AnimateChild.propTypes = {};

AnimateChild.defaultProps = {};