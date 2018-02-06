import React, {Component}                                                                   from "react";
import {Table, Col}                                                                         from "../../../src";
import {data, list, noKeyData,}                                                             from "../mock/data";
import Panel                                                                                from "./panel";
import {basic, sort, fixed, tree, pagination, stretchable, colspan_rowspan, checkbox_radio} from "../constants/table";

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            list: [],
            data: data,
            length: 10,
            selected: [],
            radioSelected: [],
            hideSelectColumn: []
        };
    }

    timeRender(cell) {
        return new Date(cell).toDateString();
    }

    levelRender(cell, row, level, colIndex, i, col) {
        return cell + " I am level " + level;
    }

    controlRender(cell, row, level, colIndex, i, col) {
        console.log(cell, row, level);
        return <a href="#">启用</a>;
    }

    render() {
        const options = {
            page: 1,
            sizePerPage: 3,
            onPageChange: function (page, sizePerPage) {
                console.log(page, sizePerPage);
            }
        };

        const selectRow = {
            mode: "checkbox",
            selected: this.state.selected,
            onSelectAll: (checked, currentSelected) => {
                if (checked) {
                    let checkedList = currentSelected.map(item => {
                        return item.id;
                    });
                    this.setState(old => {
                        old.selected = checkedList;
                        return old;
                    });
                } else {
                    this.setState(old => {
                        old.selected = [];
                        return old;
                    });
                }
            },
            onSelect: (checked, row) => {
                if (checked) {
                    this.setState(old => {
                        old.selected.push(row.id);
                        return old;
                    });
                } else {
                    this.setState(old => {
                        old.selected.splice(old.selected.indexOf(row.id), 1);
                        return old;
                    });
                }
            }
        };

        const radioSelectRow = {
            mode: "radio",
            bgColor: "pink",
            selected: this.state.radioSelected,
            onSelect: (checked, row) => {
                if (checked) {
                    this.setState({radioSelected: [row.id]});
                } else {
                    this.setState({radioSelected: []});
                }
            }
        };

        const hideSelectColumn = {
            mode: "radio",
            hideSelectColumn: true,
            selected: this.state.hideSelectColumn,
            onSelect: (checked, row) => {
                if (checked) {
                    this.setState({hideSelectColumn: [row.id]});
                } else {
                    this.setState({hideSelectColumn: []});
                }
            }
        };

        return (
            <div className="content">
                <h1>Table 表格</h1>
                <Panel
                    title="basic"
                    code={basic}
                >
                    <Table
                        isKey="id"
                        data={list}
                        hover={true}
                        striped={true}
                    >
                        <Col dataField="id" dataAlign="center" hidden={true}>ID</Col>
                        <Col dataAlign="center" dataField="regionRoleName" width={150}>区域角色</Col>
                        <Col dataAlign="center" dataField="systemRoleName">系统角色</Col>
                        <Col dataAlign="center" dataField="createTime"
                             dataFormat={this.timeRender.bind(this)}>创建时间</Col>
                    </Table>
                </Panel>
                <Panel
                    title="pagination"
                    code={pagination}
                >
                    <Table
                        isKey="id"
                        data={list}
                        hover={true}
                        striped={true}
                        pagination={true}
                        topPagination={true}
                        options={options}
                    >
                        <Col dataField="id" dataAlign="center" width={50}>ID</Col>
                        <Col dataAlign="center" dataField="regionRoleName">区域角色</Col>
                        <Col dataAlign="center" dataField="systemRoleName">系统角色</Col>
                        <Col dataAlign="center" dataField="createTime"
                             dataFormat={this.timeRender.bind(this)}>创建时间</Col>
                    </Table>
                </Panel>
                <Panel
                    title="sort"
                    code={sort}
                >
                    <Table
                        isKey="id"
                        data={list}
                        hover={true}
                        striped={true}
                    >
                        <Col dataField="id" dataAlign="center" width={50} dataSort={true}>ID</Col>
                        <Col dataAlign="center" dataField="regionRoleName">区域角色</Col>
                        <Col dataAlign="center" dataField="systemRoleName">系统角色</Col>
                        <Col dataAlign="center" dataField="createTime"
                             dataFormat={this.timeRender.bind(this)}>创建时间</Col>
                    </Table>
                </Panel>
                <Panel
                    title="colspan & rowspan"
                    code={colspan_rowspan}
                >
                    <Table
                        isKey="id"
                        data={list}
                    >
                        <Col dataField="id" dataAlign="center">ID</Col>
                        <Col dataAlign="center" dataField="systemRoleName" colSpan={2}>区域角色</Col>
                        <Col dataAlign="center" dataField="region"
                             render={(index) => {
                                 if (index === 3) {
                                     return {colSpan: 2, rowSpan: 2};
                                 }
                                 if (index === 4) {
                                     return {rowSpan: 0};
                                 }
                             }}>区域</Col>
                        <Col dataAlign="center" dataField="createTime"
                             dataFormat={this.timeRender.bind(this)}
                             render={(index) => {
                                 if (index === 4) {
                                     return {rowSpan: 0};
                                 }
                             }}>创建时间</Col>
                        <Col dataAlign="center" dataField="description">描述</Col>
                    </Table>
                </Panel>
                <Panel
                    title="checkbox & radio"
                    code={checkbox_radio}
                >
                    <Table
                        isKey="id"
                        data={list}
                        selectRow={selectRow}
                        title="checkbox"
                    >
                        <Col dataField="id" dataAlign="center">ID</Col>
                        <Col dataAlign="center" dataField="regionRoleName">区域角色</Col>
                        <Col dataAlign="center" dataField="systemRoleName">系统角色</Col>
                        <Col dataAlign="center" dataField="region">区域</Col>
                        <Col dataAlign="center" width="150px" dataFormat={this.controlRender.bind(this)}>操作</Col>
                    </Table>
                    <Table
                        isKey="id"
                        data={list}
                        selectRow={radioSelectRow}
                        title="radio"
                    >
                        <Col dataField="id" dataAlign="center">ID</Col>
                        <Col dataAlign="center" dataField="regionRoleName">区域角色</Col>
                        <Col dataAlign="center" dataField="systemRoleName">系统角色</Col>
                        <Col dataAlign="center" dataField="region">区域</Col>
                        <Col dataAlign="center" width="150px" dataFormat={this.controlRender.bind(this)}>操作</Col>
                    </Table>
                    <Table
                        isKey="id"
                        data={list}
                        style={{marginTop: 10}}
                        title="hideSelectColumn"
                        selectRow={hideSelectColumn}
                    >
                        <Col dataField="id" dataAlign="center">ID</Col>
                        <Col dataAlign="center" dataField="regionRoleName">区域角色</Col>
                        <Col dataAlign="center" dataField="systemRoleName">系统角色</Col>
                        <Col dataAlign="center" dataField="region">区域</Col>
                        <Col dataAlign="center" width="150px" dataFormat={this.controlRender.bind(this)}>操作</Col>
                    </Table>
                </Panel>
                <Panel
                    title="fixed column"
                    code={fixed}
                >
                    <Table
                        isKey="id"
                        data={list}
                    >
                        <Col dataField="id" width="150px" dataAlign="center" dataFixed="left">id</Col>
                        <Col dataAlign="center" width="200px" dataField="regionRoleName">区域角色</Col>
                        <Col dataAlign="center" width="200px" dataField="systemRoleName">系统角色</Col>
                        <Col dataAlign="center" width="200px" dataField="systemRoleId">系统角色ID</Col>
                        <Col dataAlign="center" width="200px" dataField="region">区域</Col>
                        <Col dataAlign="center" width="200px" dataField="version">版本号</Col>
                        <Col dataAlign="center" width="200px" dataField="createTime"
                             dataFormat={this.timeRender.bind(this)}>创建时间</Col>
                        <Col dataAlign="center" width="200px" dataField="lastUpdateTime"
                             dataFormat={this.timeRender.bind(this)}>更新时间</Col>
                        <Col dataAlign="center" width="150px" dataField="description"
                             dataFixed="right">描述</Col>
                    </Table>
                </Panel>
                <Panel
                    title="tree table"
                    code={tree}
                >
                    <Table
                        isKey="a"
                        data={data}
                        isTree={true}
                        title="has key value"
                    >
                        <Col width={200} dataField="a" dataFormat={this.levelRender.bind(this)}>第一列</Col>
                        <Col dataField="b" dataFormat={this.levelRender.bind(this)}>第二列</Col>
                        <Col width={200} dataField="c" dataFormat={this.levelRender.bind(this)}>第三列</Col>
                        <Col width={200} dataField="d">第四列</Col>
                        <Col width={200} dataField="d">第五列</Col>
                        <Col dataField="d">第六列</Col>
                        <Col dataField="d">第七列</Col>
                    </Table>
                    <Table
                        isTree={true}
                        hashKey={true}
                        data={noKeyData}
                        title="has no key value"
                    >
                        <Col width={200} dataField="a" dataFormat={this.levelRender.bind(this)}>第一列</Col>
                        <Col dataField="b" dataFormat={this.levelRender.bind(this)}>第二列</Col>
                        <Col width={200} dataField="c" dataFormat={this.levelRender.bind(this)}>第三列</Col>
                        <Col width={200} dataField="d">第四列</Col>
                        <Col width={200} dataField="d">第五列</Col>
                        <Col dataField="d">第六列</Col>
                        <Col dataField="d">第七列</Col>
                    </Table>
                </Panel>
                <Panel
                    title="stretchable"
                    code={stretchable}
                >
                    <Table
                        isKey="id"
                        data={list}
                        hover={true}
                        striped={true}
                        stretchable={true}
                    >
                        <Col dataField="id" dataAlign="center" hidden={true}>ID</Col>
                        <Col dataAlign="center" dataField="regionRoleName" width={150}>区域角色</Col>
                        <Col dataAlign="center" dataField="systemRoleName">系统角色</Col>
                        <Col dataAlign="center" dataField="createTime"
                             dataFormat={this.timeRender.bind(this)}>创建时间</Col>
                    </Table>
                </Panel>
                <h1>API</h1>
                <div>
                    <p>Almost same as <a
                        href="https://github.com/EleanorMao/React-TreeTable/blob/master/README.md">React-TreeTable</a>.
                    </p>
                    <p>But, 'isTree' default value is false.</p>
                    <p>'stretchable': if column stretchable</p>
                </div>
            </div>
        );
    }
}

