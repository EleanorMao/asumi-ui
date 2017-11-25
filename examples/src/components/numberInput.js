/**
 * Created by elly on 2017/4/6.
 */
import React, {Component} from 'react';
import {
    NumberInput,
    Group,
    Table,
    Col
} from '../../../src';
import Panel from './panel';
import {basic, icon, size, prefix, _step, api} from '../constants/numberinput';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: "",
            step: 5
        }
    }

    handleChange({name, value}) {
        this.setState(prev => {
            prev[name] = value;
            return prev;
        })
    }

    render() {
        let style = {
            marginBottom: 10,
            verticalAlign: 'top'
        };
        let {price, step} = this.state;
        return (
            <div className="content">
                <h1>Number Input 数字输入框</h1>
                <Panel
                    title="basic"
                    code={basic}
                >
                    <Group style={style} name="normal">
                        <NumberInput placeholder="normal"/>
                        <NumberInput placeholder="disabled" disabled/>
                    </Group>
                </Panel>
                <Panel
                    title="step"
                    code={_step}
                >
                    <NumberInput step={5} value={step} name="step" onChange={this.handleChange.bind(this)}/>
                </Panel>
                <Panel
                    title="size"
                    code={size}
                >
                    <Group style={style} name="normal">
                        <NumberInput placeholder="large" size="large"/>
                        <NumberInput placeholder="default"/>
                        <NumberInput placeholder="small" size="small"/>
                    </Group>
                </Panel>
                <Panel
                    title="icon"
                    code={icon}
                >
                    <NumberInput icon={"%"}/>
                </Panel>
                <Panel
                    title="prefix & dataFormat"
                    code={prefix}
                >
                    <Group style={style}>
                        <NumberInput
                            prepend="￥"
                            name="price"
                            value={price}
                            onChange={this.handleChange.bind(this)}
                            dataFormat={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        />
                    </Group>
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