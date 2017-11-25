/**
 * Created by elly on 2017/4/10.
 */
import React, {Component, PropTypes} from 'react';
import {
    Popover,
    Button,
    Table,
    Col
} from '../../../src';
import Panel from './panel';
import {basic, trigger, api} from "../constants/popover";

export default class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let style = {marginLeft: 10};
        return (
            <div className="content">
                <h1>Popover 气泡卡片</h1>
                <Panel
                    title="basic"
                    code={basic}
                >
                    <Popover title="tooltip" content="left">
                        <Button type="primary" style={style}>left</Button>
                    </Popover>
                    <Popover title="tooltip" content="right" placement="right">
                        <Button type="primary" style={style}>right</Button>
                    </Popover>
                    <Popover title="tooltip" content="top" placement="top">
                        <Button type="primary" style={style}>top</Button>
                    </Popover>
                    <Popover title="tooltip" content="bottom" placement="bottom">
                        <Button type="primary" style={style}>bottom</Button>
                    </Popover>
                </Panel>
                <Panel
                    title="trigger"
                    code={trigger}
                >
                    <Popover title="tooltip" trigger="click" content="trigger click">
                        <Button type="secondary" style={style}>trigger by click</Button>
                    </Popover>
                    <Popover title="tooltip" trigger="click" content="hideTrigger click" hideTrigger="click">
                        <Button type="secondary" style={style}>hide trigger by click</Button>
                    </Popover>
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
