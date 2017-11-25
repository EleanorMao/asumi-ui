/**
 * Created by elly on 2017/4/7.
 */
import React, {Component, PropTypes} from 'react';
import {
    Modal,
    Button,
    Table,
    Col
} from '../../../src';
import Panel from './panel';
import {confirm, basic, size, footer, mask, api} from "../constants/modal";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible1: false,
            visible2: false,
            visible3: false,
            visible4: false,
            visible5: false
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
            onOk: () => {
                alert('没毛病！')
            },
            onClose: () => {
                alert('╮(╯_╰)╭')
            },
            okText: '吃',
            closeText: '( *^-^)ρ(*╯^╰)不吃'
        });
    }

    render() {
        let {visible1, visible2, visible3, visible4, visible5, visible6} = this.state;
        return (
            <div className="content">
                <h1>Modal 摸态框</h1>
                <Panel
                    title="confirm"
                    code={confirm}
                >
                    <Button
                        type="primary"
                        onClick={this.handleShow.bind(this)}
                    >confirm</Button>
                    <p style={{marginTop: 10}}>Modal.confirm(props)</p>
                </Panel>
                <Panel
                    title="basic"
                    code={basic}
                >
                    <Button
                        type="primary"
                        onClick={this.handleClick.bind(this, 'visible1', true)}
                    >basic modal</Button>

                    <Modal
                        visible={visible1}
                        title="Normal Modal"
                        onOk={this.handleClick.bind(this, 'visible1', false)}
                        onClose={this.handleClick.bind(this, 'visible1', false)}
                    >
                        Modal Content
                    </Modal>
                </Panel>
                <Panel
                    title="size"
                    code={size}
                >
                    <Button
                        type="success"
                        style={{marginRight: 10}}
                        onClick={this.handleClick.bind(this, 'visible3', true)}
                    >small modal</Button>
                    <Modal
                        size="small"
                        visible={visible3}
                        title="Small Modal"
                        onOk={this.handleClick.bind(this, 'visible3', true)}
                        onClose={this.handleClick.bind(this, 'visible3', false)}
                    >
                        Modal Content
                    </Modal>

                    <Button
                        type="warning"
                        onClick={this.handleClick.bind(this, 'visible4', true)}
                    >large modal</Button>
                    <Modal
                        size="large"
                        title="Large Modal"
                        visible={visible4}
                        onOk={this.handleClick.bind(this, 'visible4', false)}
                        onClose={this.handleClick.bind(this, 'visible4', false)}
                    >
                        Modal Content
                    </Modal>
                </Panel>
                <Panel
                    title="customer footer"
                    code={footer}
                >
                    <Button
                        type="success"
                        style={{marginRight: 10}}
                        onClick={this.handleClick.bind(this, 'visible2', true)}
                    >no footer</Button>
                    <Modal
                        footer={null}
                        visible={visible2}
                        title="No Footer Modal"
                        onOk={this.handleClick.bind(this, 'visible2', false)}
                        onClose={this.handleClick.bind(this, 'visible2', false)}
                    >
                        Modal Content
                    </Modal>

                    <Button
                        type="warning"
                        onClick={this.handleClick.bind(this, 'visible6', true)}
                    >modal</Button>
                    <Modal
                        okText="OK"
                        closeText="Cancel"
                        title="Customer Footer Text Modal"
                        visible={visible6}
                        onOk={this.handleClick.bind(this, 'visible6', false)}
                        onClose={this.handleClick.bind(this, 'visible6', false)}
                    >
                        Modal Content
                    </Modal>
                </Panel>
                <Panel
                    title="mask"
                    code={mask}
                >
                    <Button type="danger" onClick={this.handleClick.bind(this, 'visible5', true)}>no mask</Button>
                    <Modal
                        mask={false}
                        title="No Mask Modal"
                        visible={visible5}
                        onOk={this.handleClick.bind(this, 'visible5', false)}
                        onClose={this.handleClick.bind(this, 'visible5', false)}
                    >
                        Modal Content
                    </Modal>
                </Panel>
                <h1>API</h1>
                <Table isKey="property" data={api} lineWrap="break">
                    <Col dataField="property">Property</Col>
                    <Col dataField="description">Description</Col>
                    <Col dataField="type">Type</Col>
                    <Col dataField="default">Default</Col>
                </Table>
            </div>
        )
    }
}
