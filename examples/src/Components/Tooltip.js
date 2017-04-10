/**
 * Created by elly on 2017/4/10.
 */
import React, {Component, PropTypes} from 'react';
import {
    Tooltip,
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
                    <Tooltip title="tooltip">
                        <Button type="success">LEFT</Button>
                    </Tooltip>
                    <Tooltip title="tooltip" placement="right">
                        <Button type="success" style={{marginLeft: 10}}>RIGHT</Button>
                    </Tooltip>
                    <Tooltip title="tooltip" placement="top">
                        <Button type="success" style={{marginLeft: 10}}>TOP</Button>
                    </Tooltip>
                    <Tooltip title="tooltip" placement="bottom">
                        <Button type="success" style={{marginLeft: 10}}>BOTTOM</Button>
                    </Tooltip>
                </div>
                <h1>Customer Trigger Tooltip</h1>
                <div>
                    <Tooltip title="tooltip" hideTrigger="hover">
                        <Button type="success">HOVER</Button>
                    </Tooltip>
                </div>
            </div>
        )
    }
}
