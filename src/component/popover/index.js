/**
 * Created by elly on 2017/4/10.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Popover from './popover';
import {extend} from '../util';

export default class Wrap extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        if (this.container) {
            ReactDOM.unmountComponentAtNode(this.container);
            document.body.removeChild(this.container);
            this.container = null;
        }
    }

    getPosition() {
        let {placement} = this.props;
        let {right, left, top, bottom, width, height} = ReactDOM.findDOMNode(this).getBoundingClientRect();
        let {clientHeight, clientWidth} = this.container;
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        let scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
        top += scrollTop;
        left += scrollLeft;
        right += scrollLeft;
        bottom += scrollTop;
        if (placement === 'left') {
            this.style = {
                left: left - clientWidth + 'px',
                top: top + (height / 2 - clientHeight / 2) + 'px'
            }
        } else if (placement === 'right') {
            this.style = {
                left: right + 'px',
                top: top + (height / 2 - clientHeight / 2) + 'px'
            }
        } else if (placement === 'top') {
            this.style = {
                top: top - clientHeight + 'px',
                left: left + (width / 2 - clientWidth / 2) + 'px'
            }
        } else if (placement === 'bottom') {
            this.style = {
                top: bottom + 'px',
                left: left + (width / 2 - clientWidth / 2) + 'px'
            }
        }
        this.style.visibility = "visible";
    }

    handleClick() {
        if (!this.visible) {
            this.renderComponent();
        } else {
            this.hideComponent();
        }
    }

    renderComponent() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = `el-popover-wrapper${this.props.content ? '' : ' el-tooltip-wrapper'}`;
            document.body.appendChild(this.container);
        }
        let props = extend({}, {style: this.props.content ? {maxWidth: 200} : null}, this.props);
        ReactDOM.unstable_renderSubtreeIntoContainer(this, <Popover {...props} />, this.container);
        this.addStyle();
        this.visible = true;
    }

    hideComponent() {
        if (this.container) {
            ReactDOM.unmountComponentAtNode(this.container);
            this.container.style.visibility = 'hidden';
            this.visible = false;
        }
    }

    addStyle() {
        this.getPosition();
        for (let style in this.style) {
            this.container.style[style] = this.style[style];
        }
    }

    render() {
        let {children, trigger, hideTrigger} = this.props;
        const child = React.isValidElement(children) ? children : <span>{children}</span>;
        const props = {};
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

        return React.cloneElement(child, props);
    }
}

Wrap.propTypes = {
    title: PropTypes.any,
    content: PropTypes.any,
    trigger: PropTypes.oneOf(['click', 'hover']),
    hideTrigger: PropTypes.oneOf(['click', 'hover']),
    placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom'])
};

Wrap.defaultProps = {
    hideTrigger: 'hover',
    placement: "left",
    trigger: 'hover',
    title: ''
};