/**
 * Created by elly on 2017/4/28.
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from  'react-dom';
import cssAnimate from 'css-animation';

const transitionMap = {
    enter: 'transitionEnter',
    leave: 'transitionLeave',
    appear: 'transitionAppear',
};

export default  class AnimateChild extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.stop();
    }

    componentWillAppear(done) {
        let {transitionName, transitionAppear} = this.props;
        if (transitionName && transitionAppear) {
            this.transition('appear', done);
        } else {
            done();
        }
    }

    componentWillEnter(done) {
        let {transitionName, transitionEnter} = this.props;
        if (transitionName && transitionEnter) {
            this.transition('enter', done);
        } else {
            done();
        }
    }

    componentWillLeave(done) {
        let {transitionName, transitionLeave} = this.props;
        if (transitionName && transitionLeave) {
            this.transition('leave', done);
        } else {
            done();
        }
    }

    transition(type, done) {
        let props = this.props;
        let node = ReactDOM.findDOMNode(this);
        let transitionName = props.transitionName;
        let isObj = typeof transitionName === 'object';
        this.stop();
        let end = () => {
            this.stopper = null;
            done();
        };
        if (transitionName && props[transitionMap[type]]) {
            let name = isObj ? transitionName[type] : `${transitionName}-${type}`;
            let activeName = `${name}-active`;
            if (isObj && transitionName[`${type}Active`]) {
                activeName = transitionName[`${type}Active`];
            }
            this.stopper = cssAnimate(node, {
                active: activeName,
                name,
            }, end);
        }
    }

    stop() {
        let stopper = this.stopper;
        if (stopper) {
            this.stopper = null;
            stopper.stop();
        }
    }

    render() {
        return this.props.children;
    }
}

AnimateChild.propTypes = {};

AnimateChild.defaultProps = {};