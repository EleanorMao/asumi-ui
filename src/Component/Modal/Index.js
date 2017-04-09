/**
 * Created by elly on 2017/4/7.
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';

export default  class ModalWrap extends Component {
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

ModalWrap.propTypes = {
    visible: PropTypes.bool
};

ModalWrap.defaultProps = {
    visible: false
};