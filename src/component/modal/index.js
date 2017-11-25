/**
 * Created by elly on 2017/4/7.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {extend} from '../util';
import Modal from './modal';
import confirm from './confirm';

function renderComponent(instance) {
    if (instance.props.visible) {
        if (!instance.container) {
            instance.container = instance.getContainer();
        }
        ReactDOM.unstable_renderSubtreeIntoContainer(instance,
            <Modal{...instance.props} key="el-modal"/>, instance.container)
    }
}

export default class Wrap extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        renderComponent(this);
    }

    componentDidUpdate() {
        renderComponent(this);
    }

    shouldComponentUpdate({visible}) {
        return !!(this.props.visible || visible);
    }

    componentWillReceiveProps({visible}) {
        if (!visible) {
            this.removeComponent();
        }
    }

    componentWillUnmount() {
        this.removeComponent();
    }

    getContainer() {
        this.container || (this.container = document.createElement('div'));
        document.body.appendChild(this.container);
        return this.container;
    }

    removeComponent() {
        if (this.container) {
            ReactDOM.unmountComponentAtNode(this.container);
            document.body.removeChild(this.container);
            this.container = null;
        }
    };

    render() {
        return null;
    }
}


Wrap.confirm = (props) => {
    props = extend({}, {
        title: 'confirm',
        content: '',
        size: 'default'
    }, props);
    return confirm(props)
};

Wrap.propTypes = {
    visible: PropTypes.bool
};

Wrap.defaultProps = {
    visible: false
};