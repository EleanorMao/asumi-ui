/**
 * Created by elly on 2017/4/28.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AnimateChild from './animateChild';
let uuid = `el_animate_${Date.now()}`;

function isValid(props) {
    let children = props.children;
    if (React.isValidElement(children)) {
        if (!children.key) {
            return React.cloneElement(children, {
                key: uuid
            })
        }
    }
    return children;
}

function toArray(children) {
    let output = [];
    if (children) {
        output = React.Children.toArray(children)
    }
    return output;
}

function findChild(children, key) {
    let output = null;
    if (children) {
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            if (child && child.key === key) {
                output = child;
                break;
            }
        }
    }
    return output;
}

function mergeChildren(prev, next) {
    let output = [];
    let pendingChildren = [];
    let nextChildrenPending = {};
    prev.map((child) => {
        if (child && findChild(next, child.key)) {
            if (pendingChildren.length) {
                nextChildrenPending[child.key] = pendingChildren;
                pendingChildren = [];
            }
        } else {
            pendingChildren.push(child);
        }
    });

    next.forEach((child) => {
        if (child && nextChildrenPending.hasOwnProperty(child.key)) {
            output = output.concat(nextChildrenPending[child.key]);
        }
        output.push(child);
    });

    output = output.concat(pendingChildren);
    return output;
}

function isSameChildren(c1, c2) {
    let same = c1.length === c2.length;
    if (same) {
        c1.forEach((child, index) => {
            const child2 = c2[index];
            if (child && child2) {
                if ((child && !child2) || (!child && child2)) {
                    same = false;
                } else if (child.key !== child2.key) {
                    same = false;
                }
            }
        });
    }
    return same;
}

export default  class Animate extends Component {
    constructor(props) {
        super(props);
        this._children = {};
        this.keysToLeave = [];
        this.keysToEnter = [];
        this.animatingKeys = {};
        //初始化children为数组
        this.state = {
            children: toArray(isValid(props))
        }
    }

    //渲染完触发appear事件
    componentDidMount() {
        this.state.children.map(child => {
            if (child) this.performAppear(child.key)
        })
    }

    componentWillReceiveProps(nextProps) {
        let animatingKeys = this.animatingKeys;
        let currentChildren = this.state.children;
        let nextChildren = toArray(isValid(nextProps));
        let newChildren = mergeChildren(currentChildren, nextChildren);

        this.setState({children: newChildren});

        nextChildren.forEach((child) => {
            let key = child && child.key;
            if (child && animatingKeys[key]) return;
            if (!(child && findChild(currentChildren, key))) {
                this.keysToEnter.push(key);
            }
        });

        currentChildren.forEach((child) => {
            let key = child && child.key;
            if (child && animatingKeys[key]) return;
            if (!(child && findChild(nextChildren, key))) {
                this.keysToLeave.push(key);
            }
        });
    }

    componentDidUpdate() {
        let keysToEnter = this.keysToEnter;
        this.keysToEnter = [];
        keysToEnter.map(this.performEnter.bind(this));
        let keysToLeave = this.keysToLeave;
        this.keysToLeave = [];
        keysToLeave.map(this.performLeave.bind(this));
    }

    performAppear(key) {
        if (this._children[key]) {
            this.animatingKeys[key] = true;
            this._children[key].componentWillAppear(this.handleJoin.bind(this, key, 'appear'))
        }
    }

    performEnter(key) {
        if (this._children[key]) {
            this.animatingKeys[key] = true;
            this._children[key].componentWillEnter(this.handleJoin.bind(this, key, 'enter'));
        }
    }

    performLeave(key) {
        if (this._children[key]) {
            this.animatingKeys[key] = true;
            this._children[key].componentWillLeave(this.handleLeave.bind(this, key));
        }
    }

    handleJoin(key, type) {
        let {transitionAppear, transitionEnter, onAppear, onEnter, onEnd} = this.props;
        delete this.animatingKeys[key];
        let currentChildren = toArray(isValid(this.props));
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

    handleLeave(key) {
        delete this.animatingKeys[key];
        let {transitionLeave, onLeave, onEnd} = this.props;
        let currentChildren = toArray(isValid(this.props));
        if (findChild(currentChildren, key)) {
            this.performEnter(key);
        } else {
            const end = () => {
                if (transitionLeave) {
                    onLeave(key);
                    onEnd(key, false);
                }
            };
            if (!isSameChildren(this.state.children, currentChildren)) {
                this.setState({children: currentChildren}, end);
            } else {
                end();
            }
        }
    }

    render() {
        let children = null;
        let stateChildren = this.state.children;
        let {component, className, style, componentProps} = this.props;
        if (stateChildren) {
            children = stateChildren.map(child => {
                if (!child.key) {
                    throw Error('must set key for children');
                }
                return (
                    <AnimateChild
                        key={child.key}
                        ref={(c) => {
                            this._children[child.key] = c
                        }}
                        {...this.props}
                    >
                        {child}
                    </AnimateChild>
                )

            })
        }
        if (component) {
            let props = {
                style,
                className,
                ...componentProps
            };
            let Component = component;
            return <Component {...props}>{children}</Component>;
        }
        return children[0] || null;
    }
}

Animate.propTypes = {
    onEnd: PropTypes.func,
    onEnter: PropTypes.func,
    onLeave: PropTypes.func,
    onAppear: PropTypes.func,
    component: PropTypes.any,
    transitionLeave: PropTypes.bool,
    componentProps: PropTypes.object,
    transitionAppear: PropTypes.bool,
    transitionName: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
        appear: PropTypes.string,
        appearActive: PropTypes.string,
        enter: PropTypes.string,
        enterActive: PropTypes.string,
        leave: PropTypes.string,
        leaveActive: PropTypes.string
    })]),
};

Animate.defaultProps = {
    onEnd: () => {
    },
    onLeave: () => {
    },
    onAppear: () => {
    },
    onEnter: () => {
    },
    component: 'span',
    transitionEnter: true,
    transitionLeave: true,
    transitionAppear: false
};