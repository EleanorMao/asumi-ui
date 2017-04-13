/**
 * Created by elly on 2017/4/7.
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {extend} from '../util';
import Modal from './modal';
import confirm from './confirm';

export default  class Wrap extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps({visible}) {
        if (visible) {
            this.renderComponent();
        } else {
            this.removeComponent();
        }
    }

    componentWillUnmount() {
        this.removeComponent();
    }

    renderComponent() {
        this.container || (this.container = document.createElement('div'));
        document.body.appendChild(this.container);
        ReactDOM.unstable_renderSubtreeIntoContainer(this,
            <Modal {...this.props}/>, this.container
        )
    }

    removeComponent() {
        if (this.container) {
            document.body.removeChild(this.container);
            this.container = null;
        }
    };

    render() {
        return null;
    }
}


Wrap.confirm = (props)=> {
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