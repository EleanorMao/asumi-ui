/**
 * Created by elly on 2017/4/7.
 */
import React, {Component} from 'react';
import {Tag} from '../../../src';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [1, 2, 3, 4, 5, 6, 7]
        }
    }

    handleClose(index) {
        this.setState(prev => {
            prev.arr.splice(index, 1);
            return prev;
        })
    }

    render() {
        return (
            <div className="content">
                <Tag>tag</Tag>
                <Tag type="primary">tag</Tag>
                <Tag type="warning">tag</Tag>
                <Tag type="success">tag</Tag>
                {this.state.arr.map((c, i) => {
                    return <Tag type="success" key={i} closeable={true}
                                onClose={this.handleClose.bind(this)}>closeable</Tag>
                })}
            </div>
        )
    }
}
