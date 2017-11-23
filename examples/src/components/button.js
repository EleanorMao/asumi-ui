/**
 * Created by elly on 2017/4/5.
 */
import React, {Component} from 'react';
import {
    Group,
    Button,
    Table,
    Col
} from '../../../src';
import Panel from './panel';
import {basic, link, size, api}from'../constants/button'

export default  class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content">
                <h1>Button 按钮</h1>
                <Panel
                    title="Basic"
                    code={basic}
                >
                    <Group>
                        <Button>default</Button>
                        <Button type="secondary">secondary</Button>
                        <Button type="warning">warning</Button>
                        <Button type="primary">primary</Button>
                        <Button type="danger">danger</Button>
                        <Button type="error">error</Button>
                        <Button type="success">success</Button>
                        <Button disabled>disabled</Button>
                        <Button type="text">text</Button>
                    </Group>
                </Panel>
                <Panel
                    title="Link"
                    code={link}
                >
                    <Group>
                        <Button href="#">default</Button>
                        <Button href="#" type="secondary">secondary</Button>
                        <Button href="#" type="warning">warning</Button>
                        <Button href="#" type="primary">primary</Button>
                        <Button href="#" type="danger">danger</Button>
                        <Button href="#" type="error">error</Button>
                        <Button href="#" type="success">success</Button>
                        <Button href="#" disabled>disabled</Button>
                        <Button href="#" type="text">text</Button>
                    </Group>
                </Panel>
                <Panel
                    title="Size"
                    code={size}
                >
                    <Group size="large" style={{marginBottom: 10}}>
                        <Button>default large</Button>
                        <Button type="secondary">secondary large</Button>
                        <Button type="warning">warning large</Button>
                        <Button type="primary">primary large</Button>
                        <Button type="danger">danger large</Button>
                        <Button type="error">error large</Button>
                        <Button type="success">success large</Button>
                        <Button disabled>disabled large</Button>
                        <Button type="text">text large</Button>
                    </Group>
                    <Group style={{marginBottom: 10}}>
                        <Button >default default</Button>
                        <Button type="secondary">secondary default</Button>
                        <Button type="warning">warning default</Button>
                        <Button type="primary">primary default</Button>
                        <Button type="danger">danger default</Button>
                        <Button type="error">error default</Button>
                        <Button type="success">success default</Button>
                        <Button disabled>disabled default</Button>
                        <Button type="text">text default</Button>
                    </Group>
                    <Group size="small" style={{marginBottom: 10}}>
                        <Button >default small</Button>
                        <Button type="secondary">secondary small</Button>
                        <Button type="warning">warning small</Button>
                        <Button type="primary">primary small</Button>
                        <Button type="danger">danger small</Button>
                        <Button type="error">error small</Button>
                        <Button type="success">success small</Button>
                        <Button disabled>disabled small</Button>
                        <Button type="text">text small</Button>
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