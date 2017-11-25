/**
 * Created by elly on 2017/4/5.
 */
import React, {Component} from 'react';
import {
    Group,
    Dropdown,
    Table, Col
} from '../../../src';
import Panel from './panel';
import {basic, link, select, api} from "../constants/dropdown";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'Dropdown'
        }
    }

    handleClick(item) {
        console.log(item);
    }

    handleSelect(current) {
        this.setState({current});
    }

    render() {
        const basicList = ['HOME', 'Dropdown'];
        const linkList = [{label: 'HOME', href: '/'}, {label: 'Dropdown', href: '/dropdown'}];
        return (
            <div className="content">
                <h1>Dropdown 下拉列表</h1>
                <Panel
                    title="basic"
                    code={basic}
                >
                    <Group>
                        <Dropdown
                            list={basicList}
                            onClick={this.handleClick.bind(this)}>
                            Menu
                        </Dropdown>
                        <Dropdown
                            type="primary"
                            list={basicList}
                            onClick={this.handleClick.bind(this)}>
                            Menu
                        </Dropdown>
                        <Dropdown
                            type="secondary"
                            list={basicList}
                            onClick={this.handleClick.bind(this)}>
                            Menu
                        </Dropdown>
                        <Dropdown
                            type="success"
                            list={basicList}
                            onClick={this.handleClick.bind(this)}>
                            Menu
                        </Dropdown>
                        <Dropdown
                            type="danger"
                            list={basicList}
                            onClick={this.handleClick.bind(this)}>
                            Menu
                        </Dropdown>
                    </Group>
                </Panel>
                <Panel
                    title="link"
                    code={link}
                >
                    <Dropdown
                        type="success"
                        list={linkList}
                        onClick={this.handleClick.bind(this)}>
                        Menu
                    </Dropdown>
                </Panel>
                <Panel
                    title="select"
                    code={select}
                >
                    <Dropdown
                        type="primary"
                        list={basicList}
                        onClick={this.handleSelect.bind(this)}>
                        {this.state.current}
                    </Dropdown>
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