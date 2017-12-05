import React, { Component } from 'react';
import {
    Transfer,
    Group,
    Table,
    Col
} from '../../../src';
import {
    basic,
    searchable,
    dataAliasName,
    api
} from '../constants/transfer';
import Panel from './panel';

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            dataAlias: [],
            titles: ["列表1", "列表2"],
            basicValue: [],
            searchValue: [],
            aliasValue: []
        }
    }

    componentDidMount() {
        let data = [], dataAlias = [];
        for (let i = 0; i <= 5; i++) {
            data.push({
                value: i + 1,
                label: `选项${i + 1}`
            })
            dataAlias.push({
                key: i + 1,
                name: `选项${i + 1}`
            })
        }
        this.setState({ data: data, dataAlias: dataAlias })
    }

    handleChangeBasic({ value }) {
        this.setState({ basicValue: value })
    }

    handleChangeSearch({ value }) {
        this.setState({ searchValue: value })
    }

    handleChangeAlias({ value }) {
        this.setState({ aliasValue: value })
    }

    render() {
        let style = {
            width: 300,
            marginBottom: 10,
            verticalAlign: 'top'
        };
        const { data, dataAlias, titles, basicValue, searchValue, aliasValue } = this.state;
        return (
            <div className="content">
                <h1>Transfer 穿梭框</h1>
                <Panel
                    title="basic"
                    code={basic}
                >
                    <Group style={style} name="normal">
                        <Transfer
                            data={data}
                            titles={titles}
                            value={basicValue}
                            onChange={this.handleChangeBasic.bind(this)}
                        />
                    </Group>
                </Panel>
                <Panel
                    title="searchable"
                    code={searchable}
                >
                    <Group style={style} name="normal">
                        <Transfer
                            data={data}
                            titles={titles}
                            value={searchValue}
                            filterable={true}
                            onChange={this.handleChangeSearch.bind(this)}
                        />
                    </Group>
                </Panel>
                <Panel
                    title="data alias"
                    code={dataAliasName}
                >
                    <Group style={style} name="normal">
                        <Transfer
                            data={dataAlias}
                            titles={titles}
                            value={aliasValue}
                            propsAlias={{ label: 'name', value: 'key', disabled: 'false' }}
                            onChange={this.handleChangeAlias.bind(this)}
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