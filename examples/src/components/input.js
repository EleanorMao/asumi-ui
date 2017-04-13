/**
 * Created by elly on 2017/4/6.
 */
import React, {Component} from 'react';
import {
    Input,
    Group
} from '../../../src';

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

    handleChange(event) {
        let {name, value} = event;
        this.setState(prev=> {
            prev[name] = value;
            return prev;
        })
    }

    render() {
        let style = {
            width: 500,
            marginBottom: 10,
            verticalAlign: 'top'
        };
        let {demo, color, price, nature, positiveInt} = this.state;
        return (
            <div className="content">
                <h1>Normal Input</h1>
                <Group style={style} name="normal">
                    <Input placeholder="normal input"/>
                    <Input type="textarea" placeholder="normal textarea"/>
                </Group>
                <h1>Disabled Input</h1>
                <Group style={style} name="normal" disabled>
                    <Input placeholder="disabled input"/>
                    <Input type="textarea" placeholder="disabled textarea"/>
                </Group>
                <h1>Large Input</h1>
                <Group style={style} size="large" name="normal">
                    <Input placeholder="large input"/>
                    <Input type="textarea" placeholder="large textarea"/>
                </Group>
                <h1>Small Input</h1>
                <Group style={style} size="small" name="normal">
                    <Input placeholder="small input"/>
                    <Input type="textarea" placeholder="small textarea"/>
                </Group>
                <h1>Icon Input</h1>
                <div>
                    <Input icon={<i className="fa fa-bed"/>}/>
                </div>
                <h1>RegExp Input</h1>
                <Group style={style} onChange={this.handleChange.bind(this)}>
                    <Input name="color" value={color} placeholder="color" rule="color"/>
                    <Input name="price" value={price} placeholder="price" rule="price"/>
                    <Input name="nature" value={nature} placeholder="nature" rule="nature"/>
                    <Input name="positiveInt" value={positiveInt} placeholder="positiveInt" rule="positiveInt"/>
                    <Input name="demo" value={demo} placeholder="customer regexp /^[a-z]*$/" regExp={/^[a-z]*$/}/>
                </Group>
                <h1>Prefix Input</h1>
                <Group style={style}>
                    <Input placeholder="prefix input" prepend="Http://"/>
                    <Input placeholder="prefix input" append=".com"/>
                    <Input placeholder="prefix input" prepend="Http://" append=".com"/>
                </Group>
            </div>
        )
    }
}