/**
 * Created by elly on 2017/4/7.
 */
import React, {Component, PropTypes} from 'react';
import {
    Tabs,
    TabPanel
} from '../../../src';

export default  class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content">
                <h1>Normal Tabs</h1>
                <Tabs defaultActiveKey="1">
                    <TabPanel label="Tab1" key="1">Tab1</TabPanel>
                    <TabPanel label="Tab2" key="2">Tab2</TabPanel>
                </Tabs>
                <h1>Card Type Tabs</h1>
                <Tabs defaultActiveKey="1" type="card">
                    <TabPanel label="Tab1" key="1">Tab1</TabPanel>
                    <TabPanel label="Tab2" key="2">Tab2</TabPanel>
                </Tabs>
            </div>
        )
    }
}
