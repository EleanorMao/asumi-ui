/**
 * Created by elly on 16/9/26.
 */
import React, {
    Component,
    PropTypes
} from 'react';

import {isObj} from './Util';

export default class NestedTreeHeader extends Component {
    constructor(props) {
        super(props);
    }

    nestedHeadRender() {
        let output = [];
        const {nestedHead} = this.props;
        nestedHead.map((throws, index) => {
            let item =
                <tr key={'trow' + index}>
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
        const {cols} = this.props;
        let output = [];
        cols.map((item, i)=> {
            output.push(<col key={i} style={{display: item.hidden && 'none'}}/>)
        });
        return output;
    }

    render() {
        return (
            <div className={"el-table table-nestedHead " + this.props.lineWrap} ref="header">
                <table className="table table-bordered table-striped">
                    <colgroup ref="colgroup">{this.colgroupRender()}</colgroup>
                    <thead>{this.nestedHeadRender()}</thead>
                </table>
            </div>
        )
    }
}

NestedTreeHeader.defaultProps = {
    nestedHead: PropTypes.arrayOf(PropTypes.array)
};