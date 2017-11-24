/**
 * Created by elly on 2016/9/19.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../checkbox';

import {noop, sort, isArr} from '../util';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    selectRender(mode, onSelectAll, checked) {
        if (mode === 'checkbox') {
            return (
                <th onClick={() => onSelectAll(!checked)} style={{textAlign: 'center', width: 46}} data-input={mode}>
                    <Checkbox checked={checked} readOnly={true}/>
                </th>
            )
        } else if (mode === 'radio') {
            return <th data-input={mode}/>
        } else {
            return false;
        }
    }

    colgroupRender(renderChildren, selectRow, isTree, left, right) {
        let i = 0;
        return (
            <colgroup ref={(c) => {
                this._colgroup = c
            }}>
                {selectRow.mode && selectRow.mode !== 'none' && !selectRow.hideSelectColumn && !isTree &&
                <col key="select" style={{textAlign: 'center', width: 46}}/>}
                {React.Children.map(renderChildren, (elm) => {
                    if (!elm) return;
                    if (left && elm.props.dataFixed !== 'left') return;
                    if (right && elm.props.dataFixed !== 'right') return;
                    let style = {
                        width: elm.props.width,
                        maxWidth: elm.props.width,
                        textAlign: elm.props.dataAlign,
                        display: elm.props.hidden && 'none'
                    };
                    return <col key={i} style={style}/>
                })}
            </colgroup>
        )
    }

    render() {
        const {
            left,
            right,
            onSort,
            isTree,
            checked,
            children,
            sortName,
            sortOrder,
            selectRow,
            dataLength,
            onSelectAll
        } = this.props;
        let i = 0, colSpan, target;
        let renderChildren = isArr(children) ? children : [children];
        renderChildren = sort(renderChildren).sorted;
        return (
            <div className="el-table-container el-table-header-container" ref={(c) => {
                this._header = c
            }}>
                <table className="el-table-bordered">
                    {this.colgroupRender(renderChildren, selectRow, isTree, left, right)}
                    <thead>
                    <tr ref={(c) => {
                        this._thead = c
                    }}>
                        {!isTree && !selectRow.hideSelectColumn && this.selectRender(selectRow.mode, onSelectAll, dataLength && checked)}
                        {React.Children.map(renderChildren, (elm) => {
                            if (!elm) return;
                            if (left && elm.props.dataFixed !== 'left') return;
                            if (right && elm.props.dataFixed !== 'right') return;
                            if (colSpan && target < i && i < colSpan) {
                                i++;
                                return;
                            }
                            if (elm.props.colSpan) {
                                target = i;
                                colSpan = elm.props.colSpan + i;
                            }
                            return React.cloneElement(elm, {key: i++, onSort, sortName, sortOrder});
                        })}
                    </tr>
                    </thead>
                </table>
            </div>
        )
    }
}

Header.defaultProps = {
    left: 0,
    right: 0,
    selectRow: {
        mode: 'none',
        bgColor: '#E1F5FE',
        selected: [],
        onSelect: noop,
        onSelectAll: noop
    }
};
