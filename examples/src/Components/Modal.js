/**
 * Created by elly on 2017/4/7.
 */
import React, {Component, PropTypes} from 'react';
import {
    Modal,
    Button
} from '../../../src/Index.js';

export default  class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible1: false,
            visible2: false,
            visible3: false,
            visible4: false
        }
    }

    handleClick(name, visible) {
        this.setState(prev => {
            prev[name] = visible;
            return prev;
        })
    }

    render() {
        let {visible1, visible2, visible3, visible4}=this.state;
        return (
            <div className="content">
                <h1>Normal Modal</h1>
                <div>
                    <Button onClick={this.handleClick.bind(this, 'visible1', true)}>modal</Button>
                    <Modal
                        title="Normal Modal"
                        visible={visible1}
                        onClose={this.handleClick.bind(this, 'visible1', false)}
                    >
                        Modal Content
                    </Modal>
                </div>
                <h1>No Footer Modal</h1>
                <div>
                    <Button onClick={this.handleClick.bind(this, 'visible2', true)}>modal</Button>
                    <Modal
                        footer={null}
                        title="No Footer Modal"
                        visible={visible2}
                        onClose={this.handleClick.bind(this, 'visible2', false)}
                    >
                        Modal Content
                    </Modal>
                </div>
                <h1>Small Modal</h1>
                <div>
                    <Button onClick={this.handleClick.bind(this, 'visible3', true)}>modal</Button>
                    <Modal
                        size="small"
                        title="Small Modal"
                        visible={visible3}
                        onClose={this.handleClick.bind(this, 'visible3', false)}
                    >
                        Modal Content
                    </Modal>
                </div>
                <h1>Large Modal</h1>
                <div>
                    <Button onClick={this.handleClick.bind(this, 'visible4', true)}>modal</Button>
                    <Modal
                        size="large"
                        title="Large Modal"
                        visible={visible4}
                        onClose={this.handleClick.bind(this, 'visible4', false)}
                    >
                        Modal Content
                    </Modal>
                </div>
            </div>
        )
    }
}
