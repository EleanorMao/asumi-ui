import React, {
    Component,
    PropTypes
} from 'react';
import PageButton from './PageButton';

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
                <ul className="pagination">
                    <PageButton label={prevLabel} disabled={current - 1 <= 0} pgBtn={true}
                                onClick={() =>onPageChange(current - 1, sizePerPage)}/>
                    <PageButton label={nextLabel} disabled={current + 1 > totalPages} pgBtn={true}
                                onClick={() =>onPageChange(current + 1, sizePerPage)}/>
                </ul>
                {showTotalPages &&
                <span className="totalPages">共 {totalPages} 页</span>}
            </div>
        );
    }
}

SimplePagination.PropTypes = {
    current: PropTypes.number,
    dataSize: PropTypes.number,
    sizePerPage: PropTypes.number,
    showTotalPages: PropTypes.bool,
    onPageChange: PropTypes.func
}

SimplePagination.defaultProps = {
    current: 1,
    dataSize: 0,
    sizePerPage: 10,
    showTotalPages: true,
    prevLabel: <span><span className="caret left"></span>上一页</span>,
    nextLabel: <span>下一页<span className="caret right"></span></span>,
}

export default SimplePagination;