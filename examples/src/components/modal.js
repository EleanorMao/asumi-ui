/**
 * Created by elly on 2017/4/7.
 */
import React, {Component, PropTypes} from 'react';
import {
    Modal,
    Button
} from '../../../src';

export default  class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible1: false,
            visible2: false,
            visible3: false,
            visible4: false,
            visible5: false,
        }
    }

    handleClick(name, visible) {
        this.setState(prev => {
            prev[name] = visible;
            return prev;
        })
    }

    handleShow() {
        Modal.confirm({
            title: 'Confirm Title',
            content: '今天吃不吃龙虾饭？',
            onOk: ()=> {
                alert('没毛病！')
            },
            onClose: ()=> {
                alert('╮(╯_╰)╭')
            },
            okText: '吃',
            closeText: '( *^-^)ρ(*╯^╰)不吃'
        });
    }

    render() {
        let {visible1, visible2, visible3, visible4, visible5, visible6}=this.state;
        return (
            <div className="content">
                <h1>Confirm Modal</h1>
                <div>
                    <Button type="primary" onClick={this.handleShow.bind(this)}>click</Button>
                </div>
                <h1>Normal Modal</h1>
                <div>
                    <Button onClick={this.handleClick.bind(this, 'visible1', true)}>modal</Button>
                    <Modal
                        visible={visible1}
                        title="Normal Modal"
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
                        visible={visible2}
                        title="No Footer Modal"
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
                        visible={visible3}
                        title="Small Modal"
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
                <h1>No Mask Modal</h1>
                <div>
                    <Button onClick={this.handleClick.bind(this, 'visible5', true)}>modal</Button>
                    <Modal
                        mask={false}
                        title="No Mask Modal"
                        visible={visible5}
                        onClose={this.handleClick.bind(this, 'visible5', false)}
                    >
                        Modal Content
                    </Modal>
                </div>
                <h1>Customer Footer Text Modal</h1>
                <div>
                    <Button onClick={this.handleClick.bind(this, 'visible6', true)}>modal</Button>
                    <Modal
                        okText="OK"
                        closeText="Cancel"
                        title="Customer Footer Text Modal"
                        visible={visible6}
                        onClose={this.handleClick.bind(this, 'visible6', false)}
                    >
                        Modal Content
                    </Modal>
                </div>
            </div>
        )
    }
}
