/**
 * Created by elly on 2017/4/6.
 */
import React, {Component}                            from 'react';
import {
    Select,
    Option,
    Group,
    Table,
    Col
}                                                    from '../../../src';
import Panel                                         from './panel';
import {basic, size, searchable, multiple, tag, api} from '../constants/select';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.lastFetchId = 0;
        this.state = {
            data: [],
            picked: [],
            fetching: false,
            remote: [],
            fruit1: "",
            fruit2: "",
            flower1: "",
            flower2: "",
            flower3: "",
            flower4: "",
            animal1: [],
            animal2: [],
            animal3: [],
        };
    }

    handleSearch(value) {
        console.log('fetching user', value);
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
        this.setState({data: [], fetching: true});
        fetch('https://randomuser.me/api/?results=5')
            .then(response => response.json())
            .then((body) => {
                if (fetchId !== this.lastFetchId) { // for fetch callback order
                    return;
                }
                const data = body.results.map(user => ({
                    label: `${user.name.first} ${user.name.last}`,
                    value: user.login.username,
                }));
                this.setState({data, fetching: false});
            });
    }

    handleChange({name, value}) {
        this.setState(prev => {
            prev[name] = value;
            prev.fetching = false;
            return prev;
        });
    }

    render() {
        let style = {
            marginBottom: 10,
            verticalAlign: 'top'
        };
        let {remote, data, fetching, fruit1, fruit2, flower1, flower2, flower3, flower4, animal1, animal2, animal3} = this.state;
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
                        <Select placeholder="请选择" name="animal1" value={animal1}>
                            <Option value="monkey">Monkey</Option>
                            <Option value="lion">Lion</Option>
                            <Option value="elephant">Elephant</Option>
                            <Option value="chicken">Chicken</Option>
                        </Select>
                        <Select placeholder="请选择" selectAll name="animal2" value={animal2}>
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
                        <Select name="flower4" value={flower4}
                                onChange={this.handleChange.bind(this)}>
                            <Option value="iris">Iris</Option>
                            <Option value="jasmine">Jasmine</Option>
                            <Option value="poppy">Peach</Option>
                            <Option value="rose">Rose</Option>
                        </Select>
                        <Select
                            name="animal3" value={animal3}
                            multiple selectAll onChange={this.handleChange.bind(this)}>
                            <Option value="monkey">Monkey</Option>
                            <Option value="lion">Lion</Option>
                            <Option value="elephant">Elephant</Option>
                            <Option value="chicken">Chicken</Option>
                            <Option value="chicken1">Chicken1</Option>
                            <Option value="chicken2">Chicken2</Option>
                            <Option value="chicken3">Chicken3</Option>
                            <Option value="chicken4">Chicken4</Option>
                            <Option value="chicken5">Chicken5</Option>
                            <Option value="chicken6">Chicken6</Option>
                            <Option value="chicken7">Chicken7</Option>
                        </Select>
                        {/*<Select*/}
                        {/*name="remote" value={remote} mode={"tag"}*/}
                        {/*onSearch={this.handleSearch.bind(this)}*/}
                        {/*onChange={this.handleChange.bind(this)}*/}
                        {/*remote={true} noMatchText={fetching ? '搜索中...' : null}*/}
                        {/*>*/}
                        {/*{data.map(d => <Option key={d.value} {...d}/>)}*/}
                        {/*</Select>*/}
                    </Group>
                </Panel>
                <Panel
                    title="tag"
                    code={tag}
                >
                    <Group
                        mode="tag"
                        searchable
                        style={style}
                        placeholder="请输入搜索"
                        multiple selectAll
                    >
                        <Select
                            name="animal3" value={animal3}
                            onChange={this.handleChange.bind(this)}>
                            <Option value="monkey">猴子</Option>
                            <Option value="lion">狮子</Option>
                            <Option value="elephant">大象</Option>
                            <Option value="chicken">小鸡仔</Option>
                            <Option value="chicken1">小母鸡</Option>
                            <Option value="chicken2">小公鸡</Option>
                            <Option value="chicken3">烤鸡</Option>
                            <Option value="chicken4">炸鸡</Option>
                            <Option value="chicken5">清炖鸡</Option>
                            <Option value="chicken6">炒鸡</Option>
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
        );
    }
}