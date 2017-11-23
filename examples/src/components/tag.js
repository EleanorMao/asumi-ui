/**
 * Created by elly on 2017/4/7.
 */
import React, {Component} from 'react';
import {Tag, Table, Col} from '../../../src';
import Panel from './panel';
import {basic, closeable, api} from "../constants/tag";

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
                <h1>Tag 标签</h1>
                <Panel
                    title="basic"
                    code={basic}
                >
                    <Tag>tag</Tag>
                    <Tag type="primary">tag</Tag>
                    <Tag type="warning">tag</Tag>
                    <Tag type="success">tag</Tag>
                </Panel>
                <Panel
                    title="closeable"
                    code={closeable}
                >
                    {this.state.arr.map((c, i) => {
                        return (
                            <Tag type="success" key={i} closeable={true}
                                 onClose={this.handleClose.bind(this)}>closeable</Tag>)
                    })}
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
