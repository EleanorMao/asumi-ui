/**
 * Created by elly on 2017/4/7.
 */
import React, {Component} from 'react';
import {TagInput, Table, Col} from '../../../src';
import Panel from './panel';
import {basic, disabled_readOnly, api} from "../constants/taginput";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ['二次元', '三次元']
        }
    }

    handleChange({value, name}) {
        this.setState({value})
    }

    render() {
        return (
            <div className="content">
                <h1>TagInput 标签输入框</h1>
                <Panel
                    title="basic"
                    code={basic}
                >
                    <TagInput
                        value={this.state.value} name="value"
                        onChange={this.handleChange.bind(this)}
                        placeholder="输入回车分割字符"
                    />
                </Panel>
                <Panel
                    title="disabled & readOnly"
                    code={disabled_readOnly}
                >
                    <TagInput
                        disabled
                        value={this.state.value} name="value"
                        onChange={this.handleChange.bind(this)}
                        placeholder="输入回车分割字符"
                    />
                    <TagInput
                        readOnly
                        value={this.state.value} name="value"
                        onChange={this.handleChange.bind(this)}
                        placeholder="输入回车分割字符"
                    />
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
