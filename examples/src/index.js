import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    TreeTable,
    TreeHeadCol
} from '../../src/Index.js';
import {
    data,
    list
} from './fackData';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            list: [],
            length: 10,
            data: data,
            selected: [],
        }
    }

    headRender() {
        return [{
            id: 'columnName',
            name: ' '
        }, {
            id: 'rate',
            name: '提货费率'
        }, {
            id: 'averageCost',
            name: '提货单均成本'
        }, {
            id: 'cost',
            name: '提货成本'
        }, {
            id: 'orderMoney',
            name: '提货订单金额'
        }, {
            id: 'orderNum',
            name: '提货订单量'
        }, {
            id: 'customerNum',
            name: '提货客户数'
        }, {
            id: 'volume',
            name: '提货体积'
        }, {
            id: 'weight',
            name: '提货重量'
        }];
    }

    render() {
        const dataFormat = {
            "a": function (cell, level, row) {
                return cell + ' I am level ' + level
            },
            "b": function (cell, level, row, index, col) {
                if (level != 0) {
                    // let key = col[index - 1];
                    // return row[key.id || key];
                    return '';
                } else {
                    return cell + ' I am row b'
                }
            },
            "c": function (cell, level, row, index, col) {
                if (level != 0) {
                    let key = col[index - 2];
                    return row[key.id || key];
                } else {
                    return cell
                }
            },
            "d": function (cell, level, row, index, col) {
                if (level != 0) {
                    let key = col[index - 1];
                    return row[key.id || key];
                } else {
                    return cell + 1
                }
            }
        };
        const options = {
            page: 1,
            sizePerPage: 1,
            sizePageList: [10, 20, 30],
            paginationShowsTotal: true,
            onPageChange: function (page, sizePerPage) {

            }
        };

        const selectRow = {
            mode: "checkbox",
            bgColor: "rgb(238, 193, 213)",
            selected: this.state.selected,
            hideSelectColumn: false,
            onSelectAll: (checked, currentSelected) => {
                if (checked) {
                    let checkedList = currentSelected.map(item => {
                        return item.id;
                    });
                    this.setState(old => {
                        old.selected = checkedList;
                        return old;
                    })
                } else {
                    this.setState(old => {
                        old.selected = [];
                        return old;
                    })
                }
            },
            onSelect: (checked, row) => {
                if (checked) {
                    this.setState(old => {
                        old.selected.push(row.id);
                        return old
                    })
                } else {
                    this.setState(old => {
                        old.selected.splice(old.selected.indexOf(row.id), 1);
                        return old;
                    })
                }
            }
        };
        const style = {
            margin: "20px",
            background: "#fff"
        };
        return (
            <div>
                <div style={style}>
                    <TreeTable
                        isKey="id"
                        data={list}
                        pagination={false}
                        selectRow={selectRow}
                        nestedHead={[[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]]}
                    >
                        <TreeHeadCol dataField="id" dataAlign="center" dataFixed="auto">id</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='regionRoleName'
                                     dataFixed="auto">区域角色</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='systemRoleName'>系统角色</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='systemRoleName'>系统角色</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='systemRoleName'>系统角色</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='systemRoleName'>系统角色</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='systemRoleName'>系统角色</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataSort={true}
                                     dataField='systemRoleName'>系统角色</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='systemRoleName'>系统角色</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='systemRoleName'>系统角色</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='region'
                                     dataFixed="auto">区域</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='createTime'>创建时间</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='createTime'>创建时间</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='createTime'>创建时间</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='createTime'>创建时间</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='createTime'>创建时间</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='createTime'>创建时间</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='createTime'>创建时间</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='createTime'>创建时间</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='createTime'>创建时间</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='createTime'>创建时间</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='description'
                                     dataFixed="auto">描述</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataFormat={()=> {
                            return <a href="#">freedom!</a>
                        }}>操作</TreeHeadCol>
                    </TreeTable>
                </div>
            </div>
        )
    }
}


ReactDOM.render(<Main/>, document.querySelector('.main'));