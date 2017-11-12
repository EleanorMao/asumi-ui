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

var _animateChild = require('./animateChild');

var _animateChild2 = _interopRequireDefault(_animateChild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/28.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var uuid = 'el_animate_' + Date.now();

function isValid(props) {
    var children = props.children;
    if (_react2['default'].isValidElement(children)) {
        if (!children.key) {
            return _react2['default'].cloneElement(children, {
                key: uuid
            });
        }
    }
    return children;
}

function toArray(children) {
    var output = [];
    if (children) {
        output = _react2['default'].Children.toArray(children);
    }
    return output;
}

function findChild(children, key) {
    var output = null;
    if (children) {
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child && child.key === key) {
                output = child;
                break;
            }
        }
    }
    return output;
}

function mergeChildren(prev, next) {
    var output = [];
    var pendingChildren = [];
    var nextChildrenPending = {};
    prev.map(function (child) {
        if (child && findChild(next, child.key)) {
            if (pendingChildren.length) {
                nextChildrenPending[child.key] = pendingChildren;
                pendingChildren = [];
            }
        } else {
            pendingChildren.push(child);
        }
    });

    next.forEach(function (child) {
        if (child && nextChildrenPending.hasOwnProperty(child.key)) {
            output = output.concat(nextChildrenPending[child.key]);
        }
        output.push(child);
    });

    output = output.concat(pendingChildren);
    return output;
}

function isSameChildren(c1, c2) {
    var same = c1.length === c2.length;
    if (same) {
        c1.forEach(function (child, index) {
            var child2 = c2[index];
            if (child && child2) {
                if (child && !child2 || !child && child2) {
                    same = false;
                } else if (child.key !== child2.key) {
                    same = false;
                }
            }
        });
    }
    return same;
}

var Animate = function (_Component) {
    _inherits(Animate, _Component);

    function Animate(props) {
        _classCallCheck(this, Animate);

        var _this = _possibleConstructorReturn(this, (Animate.__proto__ || Object.getPrototypeOf(Animate)).call(this, props));

        _this._children = {};
        _this.keysToLeave = [];
        _this.keysToEnter = [];
        _this.animatingKeys = {};
        //初始化children为数组
        _this.state = {
            children: toArray(isValid(props))
        };
        return _this;
    }

    //渲染完触发appear事件


    _createClass(Animate, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.state.children.map(function (child) {
                if (child) _this2.performAppear(child.key);
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this3 = this;

            var animatingKeys = this.animatingKeys;
            var currentChildren = this.state.children;
            var nextChildren = toArray(isValid(nextProps));
            var newChildren = mergeChildren(currentChildren, nextChildren);

            this.setState({ children: newChildren });

            nextChildren.forEach(function (child) {
                var key = child && child.key;
                if (child && animatingKeys[key]) return;
                if (!(child && findChild(currentChildren, key))) {
                    _this3.keysToEnter.push(key);
                }
            });

            currentChildren.forEach(function (child) {
                var key = child && child.key;
                if (child && animatingKeys[key]) return;
                if (!(child && findChild(nextChildren, key))) {
                    _this3.keysToLeave.push(key);
                }
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var keysToEnter = this.keysToEnter;
            this.keysToEnter = [];
            keysToEnter.map(this.performEnter.bind(this));
            var keysToLeave = this.keysToLeave;
            this.keysToLeave = [];
            keysToLeave.map(this.performLeave.bind(this));
        }
    }, {
        key: 'performAppear',
        value: function performAppear(key) {
            if (this._children[key]) {
                this.animatingKeys[key] = true;
                this._children[key].componentWillAppear(this.handleJoin.bind(this, key, 'appear'));
            }
        }
    }, {
        key: 'performEnter',
        value: function performEnter(key) {
            if (this._children[key]) {
                this.animatingKeys[key] = true;
                this._children[key].componentWillEnter(this.handleJoin.bind(this, key, 'enter'));
            }
        }
    }, {
        key: 'performLeave',
        value: function performLeave(key) {
            if (this._children[key]) {
                this.animatingKeys[key] = true;
                this._children[key].componentWillLeave(this.handleLeave.bind(this, key));
            }
        }
    }, {
        key: 'handleJoin',
        value: function handleJoin(key, type) {
            var _props = this.props,
                transitionAppear = _props.transitionAppear,
                transitionEnter = _props.transitionEnter,
                onAppear = _props.onAppear,
                onEnter = _props.onEnter,
                onEnd = _props.onEnd;

            delete this.animatingKeys[key];
            var currentChildren = toArray(isValid(this.props));
            if (!findChild(currentChildren, key)) {
                this.performLeave(key);
            } else {
                if (type === 'appear') {
                    if (transitionAppear) {
                        onAppear(key);
                        onEnd(key, true);
                    }
                } else {
                    if (transitionEnter) {
                        onEnter(key);
                        onEnd(key, true);
                    }
                }
            }
        }
    }, {
        key: 'handleLeave',
        value: function handleLeave(key) {
            delete this.animatingKeys[key];
            var _props2 = this.props,
                transitionLeave = _props2.transitionLeave,
                onLeave = _props2.onLeave,
                onEnd = _props2.onEnd;

            var currentChildren = toArray(isValid(this.props));
            if (findChild(currentChildren, key)) {
                this.performEnter(key);
            } else {
                var end = function end() {
                    if (transitionLeave) {
                        onLeave(key);
                        onEnd(key, false);
                    }
                };
                if (!isSameChildren(this.state.children, currentChildren)) {
                    this.setState({ children: currentChildren }, end);
                } else {
                    end();
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var children = null;
            var stateChildren = this.state.children;
            var _props3 = this.props,
                component = _props3.component,
                className = _props3.className,
                style = _props3.style,
                componentProps = _props3.componentProps;

            if (stateChildren) {
                children = stateChildren.map(function (child) {
                    if (!child.key) {
                        throw Error('must set key for children');
                    }
                    return _react2['default'].createElement(
                        _animateChild2['default'],
                        _extends({
                            key: child.key,
                            ref: function ref(c) {
                                _this4._children[child.key] = c;
                            }
                        }, _this4.props),
                        child
                    );
                });
            }
            if (component) {
                var props = _extends({
                    style: style,
                    className: className
                }, componentProps);
                var _Component2 = component;
                return _react2['default'].createElement(
                    _Component2,
                    props,
                    children
                );
            }
            return children[0] || null;
        }
    }]);

    return Animate;
}(_react.Component);

exports['default'] = Animate;


Animate.propTypes = {
    onEnd: _propTypes2['default'].func,
    onEnter: _propTypes2['default'].func,
    onLeave: _propTypes2['default'].func,
    onAppear: _propTypes2['default'].func,
    component: _propTypes2['default'].any,
    transitionLeave: _propTypes2['default'].bool,
    componentProps: _propTypes2['default'].object,
    transitionAppear: _propTypes2['default'].bool,
    transitionName: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].shape({
        appear: _propTypes2['default'].string,
        appearActive: _propTypes2['default'].string,
        enter: _propTypes2['default'].string,
        enterActive: _propTypes2['default'].string,
        leave: _propTypes2['default'].string,
        leaveActive: _propTypes2['default'].string
    })])
};

Animate.defaultProps = {
    onEnd: function onEnd() {},
    onLeave: function onLeave() {},
    onAppear: function onAppear() {},
    onEnter: function onEnter() {},
    component: 'span',
    transitionEnter: true,
    transitionLeave: true,
    transitionAppear: false
};