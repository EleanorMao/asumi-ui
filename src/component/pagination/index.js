import React, {
    Component,
    PropTypes
} from 'react';
import PageButton from './pageButton';

export default class Pagination extends Component {
    constructor(props) {
        super(props);
        this.startPage = 1;
        this.finalStartPage = Math.ceil(props.dataSize / props.sizePerPage) - props.paginationSize + 1;
        this.lastPage = props.paginationSize;
        this.center = Math.floor(props.paginationSize / 2);
    }

    componentWillReceiveProps(props) {
        this.finalStartPage = Math.ceil(props.dataSize / props.sizePerPage) - props.paginationSize + 1;
        this.lastPage = props.paginationSize;
        this.center = Math.floor(props.paginationSize / 2);
    }

    render() {
        const {
            current,
            dataSize,
            endLabel,
            nextLabel,
            prevLabel,
            startLabel,
            sizePerPage,
            onPageChange,
            hideEndLabel,
            hideStartLabel,
            paginationSize,
            showTotalPages
        } = this.props;
        const totalPages = Math.ceil(dataSize / sizePerPage);
        if (current > paginationSize - 1) {
            this.lastPage = Math.min(totalPages, current + paginationSize - this.center - 1);
            if (current > this.finalStartPage) {
                this.startPage = this.finalStartPage;
            }
            if (this.lastPage - this.startPage !== paginationSize - 1) {
                this.startPage = current - this.center;
            }
        } else {
            this.startPage = 1;
            this.lastPage = Math.min(totalPages, paginationSize);
        }
        let PageButtons = [
            <PageButton
                disabled={this.startPage === 1}
                label={startLabel} hidden={hideStartLabel} pgBtn={true}
                key='start' onClick={() =>onPageChange(1, sizePerPage)}/>,
            <PageButton
                label={prevLabel} disabled={current === 1} pgBtn={true}
                key='prev' onClick={() =>onPageChange(current - 1, sizePerPage)}/>
        ];
        for (let i = this.startPage; i < this.lastPage + 1; i++) {
            PageButtons.push(<PageButton label={i} active={current === i} key={i}
                                         onClick={() =>onPageChange(i, sizePerPage)}/>);
        }
        PageButtons.push(
            <PageButton
                label={nextLabel} disabled={current === totalPages || totalPages < 1} pgBtn={true}
                key='next' onClick={() =>onPageChange(current + 1, sizePerPage)}/>
        );
        PageButtons.push(
            <PageButton
                label={endLabel} hidden={hideEndLabel}
                disabled={this.lastPage === totalPages} pgBtn={true}
                key='end' onClick={() =>onPageChange(totalPages, sizePerPage)}/>
        );

        return (
            <div>
                <ul className="el-pagination">
                    {PageButtons}
                </ul>
                {showTotalPages &&
                <span className="el-totalPages">共 {totalPages} 页</span>}
            </div>
        )
    }
}

Pagination.propTypes = {
    current: PropTypes.number,
    dataSize: PropTypes.number,
    sizePerPage: PropTypes.number,
    hideEndLabel: PropTypes.bool,
    hideStartLabel: PropTypes.bool,
    showTotalPages: PropTypes.bool,
    paginationSize: PropTypes.number
}

Pagination.defaultProps = {
    current: 1,
    sizePerPage: 10,
    paginationSize: 6,
    hideEndLabel: false,
    hideStartLabel: false,
    showTotalPages: true,
    prevLabel: <span><span className="el-caret el-left"></span>上一页</span>,
    nextLabel: <span>下一页<span className="el-caret el-right"></span></span>,
    startLabel: '首页',
    endLabel: '尾页'
}