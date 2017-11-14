/**
 * Created by elly on 2017/4/6.
 */
import React, {Component} from 'react';
import {
    Select,
    Option,
    Group,
    Table,
    Col
} from '../../../src';
import Panel from './panel';
import {basic, size, searchable, multiple, api} from '../constants/select';


export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fruit1: "",
            fruit2: "",
            flower1: "",
            flower2: "",
            flower3: "",
            flower4: "",
            animal1: [],
            animal2: [],
            animal3: [],
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
        let {fruit1, fruit2, flower1, flower2, flower3, flower4, animal1, animal2, animal3} = this.state;
        return (
            <div className="content">
                <h1>Select 选择框</h1>
                <Panel
                    title="basic"
                    code={basic}
                >
                    <Group style={style}
                           onChange={this.handleChange.bind(this)}>
                        <Select placeholder="请选择" name="fruit1" value={fruit1}>
                            <Option value="apple">Apple</Option>
                            <Option value="banana">Banana</Option>
                            <Option value="watermelon">Watermelon</Option>
                            <Option value="peach">Peach</Option>
                            <Option value="disabled" disabled>Disabled</Option>
                        </Select>
                        <Select placeholder="请选择" name="fruit2" value={fruit2} defaultValue="banana">
                            <Option value="apple">Apple</Option>
                            <Option value="banana">Banana</Option>
                            <Option value="watermelon">Watermelon</Option>
                            <Option value="peach">Peach</Option>
                        </Select>
                        <Select placeholder="请选择" name="fruit3" disabled>
                            <Option value="apple">Apple</Option>
                            <Option value="banana">Banana</Option>
                            <Option value="watermelon">Watermelon</Option>
                            <Option value="peach">Peach</Option>
                        </Select>
                    </Group>
                </Panel>
                <Panel
                    title="size"
                    code={size}
                >
                    <Group style={style}
                           onChange={this.handleChange.bind(this)}>
                        <Select placeholder="small select" size="small" name="flower1" value={flower1}>
                            <Option value="iris">Iris</Option>
                            <Option value="jasmine">Jasmine</Option>
                            <Option value="poppy">Peach</Option>
                            <Option value="rose">Rose</Option>
                        </Select>
                        <Select placeholder="default select" name="flower2" value={flower2}>
                            <Option value="iris">Iris</Option>
                            <Option value="jasmine">Jasmine</Option>
                            <Option value="poppy">Peach</Option>
                            <Option value="rose">Rose</Option>
                        </Select>
                        <Select placeholder="large select" size="large" name="flower3" value={flower3}>
                            <Option value="iris">Iris</Option>
                            <Option value="jasmine">Jasmine</Option>
                            <Option value="poppy">Peach</Option>
                            <Option value="rose">Rose</Option>
                        </Select>
                    </Group>
                </Panel>
                <Panel
                    title="multiple"
                    code={multiple}
                >
                    <Group style={style}
                           multiple onChange={this.handleChange.bind(this)}>
                        <Select placeholder="请选择" name="animal1" value={animal1} closeAfterSelect={false}>
                            <Option value="monkey">Monkey</Option>
                            <Option value="lion">Lion</Option>
                            <Option value="elephant">Elephant</Option>
                            <Option value="chicken">Chicken</Option>
                        </Select>
                        <Select placeholder="请选择" selectedAll name="animal2" value={animal2}>
                            <Option value="monkey">Monkey</Option>
                            <Option value="lion">Lion</Option>
                            <Option value="elephant">Elephant</Option>
                            <Option value="chicken">Chicken</Option>
                        </Select>
                    </Group>
                </Panel>
                <Panel
                    title="searchable"
                    code={searchable}
                >
                    <Group
                        searchable
                        style={style}
                        placeholder="请输入搜索"
                    >
                        <Select name="flower4" value={flower4} onChange={this.handleChange.bind(this)}>
                            <Option value="iris">Iris</Option>
                            <Option value="jasmine">Jasmine</Option>
                            <Option value="poppy">Peach</Option>
                            <Option value="rose">Rose</Option>
                        </Select>
                        <Select
                            name="animal3"
                            value={animal3}
                            multiple selectedAll closeAfterSelect={false}
                            onChange={this.handleChange.bind(this)}>
                            <Option value="monkey">Monkey</Option>
                            <Option value="lion">Lion</Option>
                            <Option value="elephant">Elephant</Option>
                            <Option value="chicken">Chicken</Option>
                        </Select>
                    </Group>
                </Panel>
                <h1>API of Select</h1>
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