import React, {Component} from 'react';
import PropTypes from 'prop-types';

const SortGroup = () => {
    return (
        <span className="el-order" key="sort-group">
                <span className="el-dropdown">
                    <span className="el-caret" style={{margin: '10px 0 10px 5px', color: '#ccc'}}/>
                </span>
                <span className="el-dropup">
                    <span className="el-caret" style={{margin: '10px 0', color: '#ccc'}}/>
                </span>
           </span>
    );
};

const singleSort = (sortOrder) => {
    return (
        <span key="single-sort"
              className={"el-order " + (sortOrder === 'desc' ? '' : 'el-dropup')}>
            <span className="el-caret" key="asc-cart" style={{margin: '10px 0 10px 5px'}}/>
        </span>
    )
};

class Col extends Component {
    constructor(props) {
        super(props);
    }

    caretRender(dataField, sortName, sortOrder) {
        return dataField === sortName && sortOrder ? singleSort(sortOrder) : SortGroup();
    }

    render() {
        const {
            width,
            hidden,
            onSort,
            colSpan,
            children,
            dataSort,
            sortName,
            sortOrder,
            dataField,
            dataAlign
        } = this.props;

        const style = {
            width: width,
            maxWidth: width,
            textAlign: dataAlign,
            display: hidden && 'none'
        };

        return (
            <th style={style} colSpan={colSpan || null}
                onClick={dataSort ? () => onSort(dataField, sortOrder === 'asc' ? 'desc' : 'asc') : () => {
                    return false;
                }}>
                <span>{children}</span>{dataSort && this.caretRender(dataField, sortName, sortOrder)}
            </th>
        );
    }
}

Col.defaultProps = {
    render: null,
    colSpan: null,
    dataSort: false,
    dataFixed: 'auto',
    dataAlign: 'left'
};

Col.propTypes = {
    hidden: PropTypes.bool,
    dataSort: PropTypes.bool,
    colSpan: PropTypes.number,
    dataFormat: PropTypes.func,
    dataFixed: PropTypes.oneOf(['left', 'right', 'auto']),
    dataAlign: PropTypes.oneOf(['left', 'right', 'center']),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Col;