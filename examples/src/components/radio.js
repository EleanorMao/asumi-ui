/**
 * Created by elly on 2017/4/10.
 */
import React, {Component, PropTypes} from 'react';
import {
    Radio,
    Table,
    Col
} from '../../../src';
import Panel from './panel';
import {basic, _switch, disabled, radioGroup, api, apiofgroup} from '../constants/radio'

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            swi: true,
            normal: true,
            groupValue: 1,
            groupValue1: 1
        }
    }

    handleChange(e) {
        let {name, value, checked} = e;
        this.setState(prev => {
            prev[name] = checked;
            return prev;
        })
    }

    handleSelect({value}) {
        this.setState({groupValue: value});
    }

    render() {
        return (
            <div className="content">
                <h1>Radio 单选按钮</h1>
                <Panel
                    title="Basic"
                    code={basic}
                >
                    <Radio
                        value={1}
                        label="radio"
                        name="normal"
                        checked={this.state.normal}
                        onChange={this.handleChange.bind(this)}/>
                </Panel>
                <Panel
                    title="Switch"
                    code={_switch}
                >
                    <Radio
                        value={1}
                        name="swi"
                        type="switch"
                        label="switch"
                        checked={this.state.swi}
                        onChange={this.handleChange.bind(this)}/>
                </Panel>
                <Panel
                    title="Disabled"
                    code={disabled}
                >
                    <Radio
                        disabled
                        label="label"
                        checked={false}
                    />
                    <Radio
                        disabled
                        label="label"
                        checked={true}
                    />
                    <Radio
                        label="switch"
                        type="switch"
                        disabled
                        checked={false}/>
                    <Radio
                        label="switch"
                        type="switch"
                        disabled
                        checked={true}/>
                </Panel>
                <Panel
                    title="RadioGroup"
                    code={radioGroup}
                >
                    <Radio.Group
                        options={[{
                            label: '选项1',
                            value: 1
                        }, {
                            label: '选项2',
                            value: 2
                        }, {
                            label: '选项3',
                            value: 3
                        }]}
                        value={this.state.groupValue}
                        onChange={this.handleSelect.bind(this)}
                    />
                    <Radio.Group
                        options={[{
                            label: '选项1',
                            value: 1
                        }, {
                            label: '选项2',
                            value: 2
                        }, {
                            label: '选项3',
                            value: 3
                        }]}
                        disableAll={true}
                    />
                </Panel>
                <h1>API</h1>
                <Table isKey="property" data={api} lineWrap="break">
                    <Col dataField="property">Property</Col>
                    <Col dataField="description">Description</Col>
                    <Col dataField="type">Type</Col>
                    <Col dataField="default">Default</Col>
                </Table>
                <h1>API of RadioGroup</h1>
                <Table isKey="property" data={apiofgroup} lineWrap="break">
                    <Col dataField="property">Property</Col>
                    <Col dataField="description">Description</Col>
                    <Col dataField="type">Type</Col>
                    <Col dataField="default">Default</Col>
                </Table>
            </div>
        )
    }
}
