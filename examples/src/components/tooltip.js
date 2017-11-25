/**
 * Created by elly on 2017/4/10.
 */
import React, {Component, PropTypes} from 'react';
import {
    Tooltip,
    Button,
    Table,
    Col
} from '../../../src';
import Panel from './panel';
import {basic, trigger, api} from "../constants/tooltip";

export default class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let style = {marginLeft: 10};
        return (
            <div className="content">
                <h1>Tooltip 工具提示</h1>
                <Panel
                    title="basic"
                    code={basic}
                >
                    <Tooltip title="tooltip">
                        <Button type="primary" style={style}>left</Button>
                    </Tooltip>
                    <Tooltip title="tooltip" placement="right">
                        <Button type="primary" style={style}>right</Button>
                    </Tooltip>
                    <Tooltip title="tooltip" placement="top">
                        <Button type="primary" style={style}>top</Button>
                    </Tooltip>
                    <Tooltip title="tooltip" placement="bottom">
                        <Button type="primary" style={style}>bottom</Button>
                    </Tooltip>
                </Panel>
                <Panel
                    title="trigger"
                    code={trigger}
                >
                    <Tooltip title="tooltip" trigger="click">
                        <Button type="secondary" style={style}>trigger by click</Button>
                    </Tooltip>
                    <Tooltip title="tooltip" trigger="click" hideTrigger="click">
                        <Button type="secondary" style={style}>hide trigger by click</Button>
                    </Tooltip>
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
