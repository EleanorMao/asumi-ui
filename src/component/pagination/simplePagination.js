/**
 * Created by elly on 2017/4/28.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PageButton from './pageButton';
import {noop} from "../util";

class SimplePagination extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            current,
            dataSize,
            prevLabel,
            nextLabel,
            sizePerPage,
            onPageChange,
            showTotalPages
        } = this.props;
        const totalPages = sizePerPage && Math.ceil(dataSize / sizePerPage) || 1;
        return (
            <div>
                <ul className="el-pagination">
                    <PageButton label={prevLabel} disabled={current - 1 <= 0} pgBtn={true}
                                onClick={() => onPageChange(current - 1, sizePerPage)}/>
                    <PageButton label={nextLabel} disabled={current + 1 > totalPages} pgBtn={true}
                                onClick={() => onPageChange(current + 1, sizePerPage)}/>
                </ul>
                {showTotalPages &&
                <span className="el-totalPages">共 {totalPages} 页</span>}
            </div>
        );
    }
}

SimplePagination.PropTypes = {
    prevLabel: PropTypes.any,
    nextLabel: PropTypes.any,
    current: PropTypes.number,
    dataSize: PropTypes.number,
    onPageChange: PropTypes.func,
    sizePerPage: PropTypes.number,
    showTotalPages: PropTypes.bool,
};

SimplePagination.defaultProps = {
    current: 1,
    dataSize: 0,
    sizePerPage: 10,
    onPageChange: noop,
    showTotalPages: true,
    prevLabel: <span><span className="el-caret el-left"/>上一页</span>,
    nextLabel: <span>下一页<span className="el-caret el-right"/></span>,
};

export default SimplePagination;