/**
 * Created by elly on 2017/4/10.
 */
import React, {Component, PropTypes} from 'react';
import {
    Message,
    Button,
    Group
} from '../../../lib';

export default  class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content">
                <h1>Normal Message</h1>
                <Group style={{display: 'block', marginBottom: 10}}>
                    <Button onClick={() => {
                        Message.confirm({content: 'confirm'})
                    }}>default</Button>
                    <Button type="secondary" onClick={() => {
                        Message.warning({content: 'warning'})
                    }}>secondary</Button>
                    <Button type="primary" onClick={() => {
                        Message.info({content: 'info'})
                    }}>primary</Button>
                    <Button type="danger" onClick={() => {
                        Message.danger({content: 'danger'})
                    }}>danger</Button>
                    <Button type="success" onClick={() => {
                        Message.success({content: 'success'})
                    }}>success</Button>
                </Group>
            </div>
        )
    }
}
