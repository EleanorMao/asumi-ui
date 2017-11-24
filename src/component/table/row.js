/**
 * Created by elly on 2016/9/19.
 */
import React, {Component} from 'react';
import Radio from '../radio';
import Checkbox from '../checkbox';
import {extend, noop} from "../util";

export default class Row extends Component {
    constructor(props) {
        super(props);
    }

    handleToggle(e) {
        const {open, data, parent} = this.props;
        e.stopPropagation();
        let options = extend({}, {
            open, data, parent
        });
        this.props.onClick(options);
    }

    cellRender() {
        let output = [];
        let arrow = -1;
        let {
            open,
            data,
            cols,
            isKey,
            level,
            isTree,
            hashKey,
            checked,
            isSelect,
            arrowCol,
            colIndex,
            selectRow,
            arrowRender,
            hideSelectColumn,
            childrenPropertyName
        } = this.props;

        const _key = hashKey ? data.__uid : data[isKey];
        let colSpan, colTarget;

        if (isSelect && !hideSelectColumn) {
            output.push(
                <td key={_key}
                    style={{backgroundColor: checked && (selectRow.bgColor || "#E1F5FE"), textAlign: 'center'}}>
                    {selectRow.mode === "radio" && <Radio checked={checked} readOnly={true}/>}
                    {selectRow.mode === "checkbox" && <Checkbox checked={checked} readOnly={true}/>}
                </td>
            )
        }

        cols.map((key, i, col) => {
            let cell = data[key.id], dataFormat = key.dataFormat, props = {colSpan: null, rowSpan: null};

            const style = {
                width: key.width,
                maxWidth: key.width,
                textAlign: key.dataAlign,
                display: key.hidden && 'none',
                backgroundColor: isSelect && checked && (selectRow.bgColor || "#E1F5FE")
            };

            if (dataFormat) {
                cell = dataFormat(data[key.id], data, level, colIndex, i, col)
            }
            if (colSpan && colTarget < i && i < colSpan) return;
            if (key.render) {
                props = key.render(colIndex, data[key.id], data, col) || props;
                colSpan = props.colSpan + i;
                colTarget = i;
            }
            if (props.colSpan === 0 || props.rowSpan === 0) return;
            if (i > arrowCol) {
                arrow++;
            } else if (i === arrowCol) {
                arrow = cell || cell === 0 ? 0 : -1;
            }

            let showArrow = data[childrenPropertyName];
            showArrow = showArrow && showArrow.length > 0;

            const type = typeof key.showArrow;

            if (type === 'function') {
                showArrow = key.showArrow.call(null, data[key.id], level, data, i, col);
            } else if (type === 'boolean') {
                showArrow = key.showArrow;
            }

            output.push(
                <td style={style}
                    key={'' + _key + i}
                    colSpan={props.colSpan}
                    rowSpan={props.rowSpan}
                    title={typeof cell === 'string' || typeof cell === 'number' ? cell : null}
                >
                      <span style={{marginLeft: level * 10 + 'px'}}>
                        {cell}
                          {isTree && showArrow && !arrow &&
                          <span className="el-table-arrow" onClick={this.handleToggle.bind(this)}>
                            {arrowRender(open)}
                        </span>
                          }
                    </span>
                </td>
            )
        });
        return output;
    }

    render() {
        let {
            data,
            level,
            hover,
            isTree,
            checked,
            isSelect,
            selectRow,
            hoverStyle,
            onMouseOut,
            onMouseOver
        } = this.props;
        return (
            <tr
                style={hover ? hoverStyle : {}}
                onMouseOut={onMouseOut}
                onMouseOver={onMouseOver}
                className={isTree && !level && "el-tree-ancestor" || null}
                onClick={isSelect ? () => selectRow.onSelect(!checked, data) : () => {
                    return false;
                }}>
                {this.cellRender()}
            </tr>
        )
    }
}

Row.defaultProps = {
    level: 0,
    hashKey: false,
    hideSelectColumn: false,
    selectRow: {
        mode: 'none',
        bgColor: '#E1F5FE',
        selected: [],
        onSelect: noop,
        onSelectAll: noop
    },
    arrowRender: (open) => {
        return (
            <i
                className="fa fa-chevron-down"
                style={open ? {transform: 'rotate(-90deg)'} : {}}
            > </i>
        )
    }
};