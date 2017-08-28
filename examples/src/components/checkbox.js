/**
 * Created by elly on 2017/4/10.
 */
import React, {Component, PropTypes} from 'react';
import {
    Checkbox,
    Table,
    Col
} from '../../../src';
import Panel from './panel';
import {basic, _switch, disabled, indeterminate, checkboxGroup, api, apiofgroup} from '../constants/checkbox'

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            swi: true,
            normal: true,
            checkedList: [1, 2]
        }
    }

    handleChange(e) {
        let {name, checked} = e;
        this.setState(prev => {
            prev[name] = checked;
            return prev;
        })
    }

    handleSelect({value}) {
        this.setState({checkedList: value});
    }

    render() {
        return (
            <div className="content">
                <h1>Checkbox 多选框</h1>
                <Panel
                    title="Basic"
                    code={basic}
                >
                    <Checkbox
                        value="1"
                        label="normal"
                        name="normal"
                        checked={this.state.normal}
                        onChange={this.handleChange.bind(this)}/>
                </Panel>
                <Panel
                    title="Switch"
                    code={_switch}
                >
                    <Checkbox
                        value="1"
                        label="switch"
                        name="swi"
                        type="switch"
                        checked={this.state.swi}
                        onChange={this.handleChange.bind(this)}/>
                </Panel>
                <Panel
                    title="Disabled"
                    code={disabled}
                >
                    <Checkbox
                        disabled
                        label="label"
                        checked={false}
                    />
                    <Checkbox
                        disabled
                        label="label"
                        checked={true}
                    />
                    <Checkbox
                        label="switch"
                        type="switch"
                        disabled
                        checked={false}/>
                    <Checkbox
                        label="switch"
                        type="switch"
                        disabled
                        checked={true}/>
                </Panel>
                <Panel
                    title="Indeterminate"
                    code={indeterminate}
                >
                    <Checkbox
                        label="indeterminate"
                        indeterminate={true}
                    />
                </Panel>
                <Panel
                    title="CheckboxGroup"
                    code={checkboxGroup}
                >
                    <Checkbox.Group
                        options={[{
                            label: '组别1',
                            value: 1
                        }, {
                            label: '组别2',
                            value: 2
                        }, {
                            label: '组别3',
                            value: 3
                        }]}
                        checkedList={this.state.checkedList}
                        onChange={this.handleSelect.bind(this)}
                    />
                    <Checkbox.Group
                        options={[{
                            label: '组别1',
                            value: 1
                        }, {
                            label: '组别2',
                            value: 2
                        }, {
                            label: '组别3',
                            value: 3
                        }]}
                        disableAll={true}
                        checkedList={[]}
                    />
                </Panel>
                <h1>API</h1>
                <Table isKey="property" data={api} lineWrap="break">
                    <Col dataField="property">Property</Col>
                    <Col dataField="description">Description</Col>
                    <Col dataField="type">Type</Col>
                    <Col dataField="default">Default</Col>
                </Table>
                <h1>API of CheckboxGroup</h1>
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
