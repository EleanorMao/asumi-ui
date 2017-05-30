import React, {Component} from 'react';
import Radio from '../radio';
import Checkbox from '../checkbox';

export default class Row extends Component {
    constructor(props) {
        super(props);
    }

    cellRender() {
        let output = [];
        let {
            data,
            cols,
            isKey,
            checked,
            isSelect,
            colIndex,
            selectRow,
            hideSelectColumn
        } = this.props;

        const _key = data[isKey];
        let colSpan, colTarget;

        if (isSelect && !hideSelectColumn) {
            output.push(
                <td key={_key} style={{backgroundColor: checked && selectRow.bgColor, textAlign: 'center'}}>
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
                backgroundColor: isSelect && checked && selectRow.bgColor
            };

            if (dataFormat) {
                cell = dataFormat(data[key.id], data, colIndex, i, col);
            }
            if (colSpan && colTarget < i && i < colSpan) return;
            if (key.render) {
                props = key.render(colIndex, data[key.id], data, col) || props;
                colSpan = props.colSpan + i;
                colTarget = i;
            }
            if (props.colSpan === 0 || props.rowSpan === 0)return;
            output.push(
                <td style={style}
                    key={'' + _key + i}
                    colSpan={props.colSpan}
                    rowSpan={props.rowSpan}
                    title={typeof cell === 'string' || typeof cell === 'number' ? cell : null}
                >
                    {cell}
                </td>
            )
        });
        return output;
    }

    render() {
        let {
            data,
            hover,
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
                onClick={isSelect ? () => selectRow.onSelect(!checked, data) : () => {
                    return false;
                }}>
                {this.cellRender()}
            </tr>
        )
    }
}

Row.defaultProps = {
    hideSelectColumn: false,
};