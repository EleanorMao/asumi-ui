/**
 * Created by elly on 2017/4/7.
 */
import React, {Component} from 'react';
import Panel from './panel';
import {Editor, Table, Col} from '../../../src';
import {basic, api} from "../constants/editor";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originText: ''
        }
    }

    handleChange({name, value, parsedValue}) {
        this.setState({originText: value})
    }

    render() {
        return (
            <div className="content">
                <h1>Editor MarkDown编辑器</h1>
                <Panel
                    title="basic"
                    code={basic}
                >
                    <Editor
                        value={this.state.originText}
                        onChange={this.handleChange.bind(this)}
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
