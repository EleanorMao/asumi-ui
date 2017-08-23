/**
 * Created by elly on 2017/4/7.
 */
import React, {Component, PropTypes} from 'react';
import {
    Tabs,
    TabPanel,
    Table,
    Col
} from '../../../src';
import {basic, card, api, apiOfTabPanel}from'../constants/tabs';
import Panel from './panel';

export default  class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content">
                <h1>Tabs</h1>
                <Panel
                    title="Basic"
                    code={basic}
                >
                    <Tabs defaultActiveKey="1">
                        <TabPanel label="Tab1" key="1">Tab1</TabPanel>
                        <TabPanel label="Tab2" key="2">Tab2</TabPanel>
                    </Tabs>
                </Panel>
                <Panel
                    title="Card Type"
                    code={card}
                >
                    <Tabs defaultActiveKey="1" type="card">
                        <TabPanel label="Tab1" key="1">Tab1</TabPanel>
                        <TabPanel label="Tab2" key="2">Tab2</TabPanel>
                    </Tabs>
                </Panel>
                <h1>API of Tabs</h1>
                <Table isKey="property" data={api} lineWrap="break">
                    <Col dataField="property">Property</Col>
                    <Col dataField="description">Description</Col>
                    <Col dataField="type">Type</Col>
                    <Col dataField="default">Default</Col>
                </Table>
                <h1>API of TabPanel</h1>
                <Table isKey="property" data={apiOfTabPanel} lineWrap="break">
                    <Col dataField="property">Property</Col>
                    <Col dataField="description">Description</Col>
                    <Col dataField="type">Type</Col>
                    <Col dataField="default">Default</Col>
                </Table>
            </div>
        )
    }
}
