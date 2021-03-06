/**
 * Created by elly on 16/9/26.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {isObj} from '../util';

export default class NestedHeader extends Component {
    constructor(props) {
        super(props);
    }

    nestedHeadRender() {
        let output = [];
        const {nestedHead, isTree, selectRow} = this.props;
        const select = !isTree && selectRow.mode && selectRow.mode !== 'none';
        nestedHead.map((throws, index) => {
            let item =
                <tr key={'trow' + index}>
                    {select && <th key='trow-1'/>}
                    {throws.map((cell, i) => {
                        let obj = isObj(cell);
                        return <th colSpan={obj && cell.colspan || null}
                                   rowSpan={obj && cell.rowspan || null}
                                   key={i}>{obj ? cell.label : cell}</th>
                    })}
                </tr>;
            output.push(item);
        });
        return output;
    }

    colgroupRender() {
        const cols = this.props.cols;
        let output = [];
        cols.map((item, i) => {
            output.push(<col key={i} style={{display: item.hidden && 'none'}}/>)
        });
        return output;
    }

    render() {
        return (
            <div className={"el-table el-table-nestedHead el-" + this.props.lineWrap} ref={(c) => {
                this._header = c
            }}>
                <table className="el-table-bordered">
                    <colgroup ref={(c) => {
                        this._colgroup = c
                    }}>{this.colgroupRender()}</colgroup>
                    <thead>{this.nestedHeadRender()}</thead>
                </table>
            </div>
        )
    }
}

NestedHeader.defaultProps = {
    nestedHead: PropTypes.arrayOf(PropTypes.array)
};