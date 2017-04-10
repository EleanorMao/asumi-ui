/**
 * Created by elly on 2017/4/10.
 */
import React, {Component, PropTypes} from 'react';
import {
    Popover,
    Button
} from '../../../src/Index.js';

export default  class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content">
                <h1>Normal Tooltip</h1>
                <div>
                    <Popover title="popover" content="popover content">
                        <Button type="success">LEFT</Button>
                    </Popover>
                    <Popover title="popover" content="popover content" placement="right">
                        <Button type="success" style={{marginLeft: 10}}>RIGHT</Button>
                    </Popover>
                    <Popover title="popover" content="popover content" placement="top">
                        <Button type="success" style={{marginLeft: 10}}>TOP</Button>
                    </Popover>
                    <Popover title="popover" content="popover content" placement="bottom">
                        <Button type="success" style={{marginLeft: 10}}>BOTTOM</Button>
                    </Popover>
                </div>
                <h1>Customer Trigger Tooltip</h1>
                <div>
                    <Popover title="popover" content="popover content" trigger="hover">
                        <Button type="success">HOVER</Button>
                    </Popover>
                </div>
            </div>
        )
    }
}
