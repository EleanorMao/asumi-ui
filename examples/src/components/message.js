/**
 * Created by elly on 2017/4/10.
 */
import React, {Component, PropTypes} from 'react';
import Panel from './panel';
import {
    Message,
    Button,
    Group,
    Table,
    Col
} from '../../../src';
import {basic, api} from "../constants/message";

export default class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content">
                <h1>Message 消息</h1>
                <Panel
                    title="basic"
                    code={basic}
                >
                    <Group style={{display: 'block', marginBottom: 10}}>
                        <pre><code>{`Message.confirm({content: 'confirm', type: null, icon: null})`}</code></pre>
                        <pre><code>{`Message.confirm('confirm')`}</code></pre>
                        <Button onClick={() => {
                            Message.confirm({content: 'confirm'})
                        }}>default</Button>
                        <pre><code>{`Message.confirm({content: 'custom icon', type: null, icon:  <i className="fa fa-leaf"/>})`}</code></pre>
                        <Button onClick={() => {
                            Message.confirm({content: 'custom icon', icon: <i className="fa fa-leaf"/>})
                        }}>custom icon</Button>
                        <pre><code>{`Message.warning({content: 'warning'})`}</code></pre>
                        <pre><code>{`Message.warning('warning')`}</code></pre>
                        <Button type="secondary" onClick={() => {
                            Message.warning({content: 'warning'})
                        }}>secondary</Button>
                        <pre><code>{`Message.info({content: 'info'})`}</code></pre>
                        <pre><code>{`Message.info('info')`}</code></pre>
                        <Button type="primary" onClick={() => {
                            Message.info({content: 'info'})
                        }}>primary</Button>
                        <pre><code>{`Message.danger({content: 'danger'})`}</code></pre>
                        <pre><code>{`Message.danger('danger')`}</code></pre>
                        <Button type="danger" onClick={() => {
                            Message.danger({content: 'danger'})
                        }}>danger</Button>
                        <pre><code>{`Message.success({content: 'success'})`}</code></pre>
                        <pre><code>{`Message.success('success')`}</code></pre>
                        <Button type="success" onClick={() => {
                            Message.success({content: 'success'})
                        }}>success</Button>
                        <pre><code>{`Message.loading({content: 'loading'})`}</code></pre>
                        <pre><code>{`Message.loading('loading')`}</code></pre>
                        <Button type="warning" onClick={() => {
                            Message.loading({content: 'loading'})
                        }}><i className="fa fa-circle-o-notch fa-spin"/></Button>
                        <pre><code>{`Message.info({content: 'info',duration: null})`}</code></pre>
                        <Button type="primary" onClick={() => {
                            Message.info({content: 'info',duration: null})
                        }}>primary</Button>
                        <pre><code>{`Message.error({content: 'error', duration: 2000, onClose: ()=>{console.log('closed')}})`}</code></pre>
                        <Button type="error" onClick={() => {
                            Message.error({
                                content: 'error. and duration is 2000',
                                duration: 2000,
                                onClose: () => {
                                    console.log('closed')
                                }
                            })
                        }}>danger</Button>
                    </Group>
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
