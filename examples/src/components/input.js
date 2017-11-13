/**
 * Created by elly on 2017/4/6.
 */
import React, {Component} from 'react';
import {
    Input,
    Group,
    Table,
    Col
} from '../../../src';
import Panel from './panel';
import {basic, icon, size, prefix, pattern, api} from '../constants/input';

export default  class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            demo: "",
            color: "",
            price: "",
            nature: "",
            positiveInt: ""
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
            width: 300,
            marginBottom: 10,
            verticalAlign: 'top'
        };
        let {demo, color, price, nature, positiveInt} = this.state;
        return (
            <div className="content">
                <h1>Input 输入框</h1>
                <Panel
                    title="basic"
                    code={basic}
                >
                    <Group style={style} name="normal">
                        <Input placeholder="normal input"/>
                        <Input type="textarea" placeholder="normal textarea"/>
                        <Input placeholder="disabled input" disabled/>
                        <Input type="textarea" placeholder="disabled textarea" disabled/>
                    </Group>
                </Panel>
                <Panel
                    title="icon"
                    code={icon}
                >
                    <Input size="large" icon={<i className="fa fa-envelope-o"/>}/>
                </Panel>
                <Panel
                    title="size"
                    code={size}
                >
                    <Group style={style} size="large" name="normal">
                        <Input placeholder="large input"/>
                        <Input type="textarea" placeholder="large textarea"/>
                    </Group>
                    <Group style={style} name="normal">
                        <Input placeholder="default input"/>
                        <Input type="textarea" placeholder="default textarea"/>
                    </Group>
                    <Group style={style} size="small" name="normal">
                        <Input placeholder="small input"/>
                        <Input type="textarea" placeholder="small textarea"/>
                    </Group>
                </Panel>
                <Panel
                    title="pattern"
                    code={pattern}
                >
                    <Group style={style} onChange={this.handleChange.bind(this)}>
                        <Input name="color" value={color} placeholder="color" rule="color"/>
                        <Input name="price" value={price} placeholder="price" rule="price"/>
                        <Input name="nature" value={nature} placeholder="nature" rule="nature"/>
                        <Input name="positiveInt" value={positiveInt} placeholder="positiveInt" rule="positiveInt"/>
                        <Input name="demo" value={demo} placeholder="customer pattern /^[a-z]*$/" pattern={/^[a-z]*$/}/>
                    </Group>
                </Panel>
                <Panel
                    title="prefix"
                    code={prefix}
                >
                    <Group style={style}>
                        <Input placeholder="prefix input" prepend="Http://"/>
                        <Input placeholder="prefix input" append=".com"/>
                        <Input placeholder="prefix input" prepend="Http://" append=".com"/>
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