/**
 * Created by Elly on 2016/5/26.
 * EL Table
 * Author: Eleanor Mao
 */
import React, {
    Component,
    PropTypes
} from 'react';
import Row from './Row';
import Header from './Header';
import classnames from 'classnames';
import Dropdown from '../Dropdown';
import Paging from '../Pagination';
import NestedHeader from './NestedHeader';
import SimplePaging from '../Pagination/SimplePagination';
import {
    empty,
    sort,
    diff,
    addEvent,
    removeEvent,
    getScrollBarWidth
} from '../Util';

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHover: null,
            order: undefined,
            sortField: undefined,
            data: props.data.slice(),
            currentPage: (props.pagination || props.topPagination) && props.options.page || 1,
            length: (props.pagination || props.topPagination) && props.options.sizePerPage || props.data.length
        }
    }


    _initColumnData(props) {
        let columnData = [];
        React.Children.map(props.children, function (column) {
            columnData.push({
                width: column.props.width,
                id: column.props.dataField,
                name: column.props.children,
                hidden: column.props.hidden,
                render: column.props.render,
                colSpan: column.props.colSpan,
                showArrow: column.props.showArrow,
                dataAlign: column.props.dataAlign,
                dataFixed: column.props.dataFixed,
                dataFormat: column.props.dataFormat
            });
        });
        let sortedData = sort(columnData);
        this.columnData = sortedData.sorted;
        this.leftColumnData = sortedData.left;
        this.rightColumnData = sortedData.right;
    }

    _getAllValue(data, isKey) {
        let output = [];
        for (let i = 0, len = data.length; i < len; i++) {
            output.push(data[i][isKey]);
        }
        return output;
    }

    _getLastChild(data) {
        let unavail = [],
            list = [];
        for (let i = 0, len = data.length; i < len; i++) {
            if (data[i].hidden) {
                unavail.push(i);
            }
            list.push(i);
        }
        let diffList = diff(list, unavail);
        return diffList[diffList.length - 1];
    }

    _sliceData(data, page, length) {
        return data.slice((page - 1) * length, page * length);
    }

    _adjustWidth(me) {
        const refs = this.refs || me,
            firstRow = refs.colgroup.childNodes,
            cells = refs.thead.refs.thead.childNodes,
            fixedLeftRow = refs.left && refs.left.childNodes,
            fixedRightRow = refs.right && refs.right.childNodes,
            nestedRow = refs.nested && refs.nested.refs.colgroup.childNodes,
            fixedLeftHeadRow = refs.lthead && refs.lthead.refs.colgroup.childNodes,
            fixedRightHeadRow = refs.rthead && refs.rthead.refs.colgroup.childNodes,
            isNoData = refs.tbody.firstChild.childElementCount === 1,
            length = cells.length,
            rightFixedLength = fixedRightRow ? length - fixedRightRow.length : 0;

        if (firstRow.length !== length)return;

        const scrollBarWidth = getScrollBarWidth(),
            haveScrollBar = refs.body.offsetWidth !== refs.thead.refs.header.offsetWidth;

        let lastChild = this._getLastChild(this.columnData), fixedRightWidth = 0;
        lastChild = this.props.selectRow.mode !== 'none' ? lastChild + 1 : lastChild;

        for (let i = 0; i < length; i++) {
            const cell = cells[i];
            const rightIndex = i - rightFixedLength;
            const computedStyle = getComputedStyle(cell);
            let width = parseFloat(computedStyle.width.replace('px', ''));
            if (!-[1,]) {
                const paddingLeftWidth = parseFloat(computedStyle.paddingLeft.replace('px', ''));
                const paddingRightWidth = parseFloat(computedStyle.paddingRight.replace('px', ''));
                const borderRightWidth = parseFloat(computedStyle.borderRightWidth.replace('px', ''));
                const borderLeftWidth = parseFloat(computedStyle.borderLeftWidth.replace('px', ''));
                width = width + paddingLeftWidth + paddingRightWidth + borderRightWidth + borderLeftWidth;
            }

            const lastPaddingWidth = -(lastChild === i && haveScrollBar ? scrollBarWidth : 0);

            if (!width) {
                width = 120;
                cell.width = width + lastPaddingWidth + 'px';
            }

            const result = (width + lastPaddingWidth).toFixed(2) + 'px';

            if (!isNoData) {
                firstRow[i].style.width = result;
                firstRow[i].style.maxWidth = result;
            }

            if (nestedRow && nestedRow[i]) {
                const display = computedStyle.display;
                nestedRow[i].style.width = width.toFixed(2) + 'px';
                nestedRow[i].style.maxWidth = width.toFixed(2) + 'px';
                if (display === 'none') nestedRow[i].style.display = display;
            }

            if (fixedLeftRow && fixedLeftRow[i]) {
                fixedLeftRow[i].style.width = result;
                fixedLeftRow[i].style.maxWidth = result;
                fixedLeftHeadRow[i].style.width = result;
                fixedLeftHeadRow[i].style.maxWidth = result;
            }

            if (fixedRightRow && fixedRightRow[rightIndex] && !cell.dataset.input) {
                fixedRightWidth += width;
                fixedRightRow[rightIndex].style.width = result;
                fixedRightRow[rightIndex].style.maxWidth = result;
                fixedRightHeadRow[rightIndex].style.width = width.toFixed(2) + 'px';
                fixedRightHeadRow[rightIndex].style.maxWidth = width.toFixed(2) + 'px';
            }

        }

        if (fixedRightWidth) {
            refs.rightBody.style.width = fixedRightWidth - (haveScrollBar ? scrollBarWidth : 0) + 'px';
        }

        if (fixedLeftRow || fixedRightRow) {
            const tbody = refs.tbody.childNodes;
            const ltbody = refs.ltbody && refs.ltbody.childNodes;
            const rtbody = refs.rtbody && refs.rtbody.childNodes;
            const headHeight = getComputedStyle(refs.thead.refs.thead).height;
            if (refs.lthead)  refs.lthead.refs.thead.style.height = headHeight;
            if (refs.rthead)  refs.rthead.refs.thead.style.height = headHeight;
            for (let i = 0; i < tbody.length; i++) {
                let row = tbody[i];
                let height = getComputedStyle(row).height;
                if (ltbody && ltbody[i]) {
                    ltbody[i].style.height = height;
                    ltbody[i].style.maxHeight = height;
                }
                if (rtbody && rtbody[i]) {
                    rtbody[i].style.height = height;
                    rtbody[i].style.maxHeight = height;
                }
            }
        }
    }

    _scrollHeader(e) {
        this.refs.thead.refs.header.scrollLeft = e.currentTarget.scrollLeft;
        if (this.refs.nested) this.refs.nested.refs.header.scrollLeft = e.currentTarget.scrollLeft;
    }

    _scrollHeight(e) {
        if (this.refs.leftContainer) {
            this.refs.leftContainer.scrollTop = e.currentTarget.scrollTop;
        }
        if (this.refs.rightContainer && this.refs.leftContainer) {
            this.refs.container.scrollTop = e.currentTarget.scrollTop;
        }
    }

    _tryRender() {
        const {
            selectRow,
            nestedHead
        } = this.props;
        const warning = 'color:red';

        if (nestedHead.length && (this.leftColumnData.length || this.rightColumnData.length)) {
            console.warn('%c!Warning: Since you set props `nestedHead`, it\'s better not set `dataFixed` in `TreeHeadCol`', warning);
        }
        if (selectRow.mode !== 'none') {
            if (selectRow.mode === 'radio' && selectRow.selected.length > 1) {
                console.warn(
                    '%c!Warning: Since you set `selectRow.mode` to `radio`,' +
                    '`selectRow.selected` should only have one child, if not `TreeTable` will use the first child of `selectRow.selected`',
                    warning
                );
            }
        }
    }

    componentWillMount() {
        this._initColumnData(this.props);
        this._tryRender();
    }

    componentDidMount() {
        this._adjustWidth(this.refs);
        addEvent(window, 'resize', this._adjustWidth.bind(this));
        addEvent(this.refs.container, 'scroll', this._scrollHeader.bind(this));
        // window.addEventListener('resize', this._adjustWidth.bind(this));
        // this.refs.container.addEventListener('scroll', this._scrollHeader.bind(this));
        if (this.refs.rightContainer) {
            addEvent(this.refs.rightContainer, 'scroll', this._scrollHeight.bind(this));
            // this.refs.rightContainer.addEventListener('scroll', this._scrollHeight.bind(this));
        }
        if (this.refs.leftContainer && !this.refs.rightContainer) {
            addEvent(this.refs.container, 'scroll', this._scrollHeight.bind(this));
            // this.refs.container.addEventListener('scroll', this._scrollHeight.bind(this));
        }
    }

    componentWillUnmount() {
        removeEvent(window, 'resize', this._adjustWidth.bind(this));
        removeEvent(this.refs.container, 'scroll', this._scrollHeader.bind(this));
        // window.removeEventListener('resize', this._adjustWidth.bind(this));
        // this.refs.container.removeEventListener('scroll', this._scrollHeader.bind(this));
        if (this.refs.rightContainer) {
            removeEvent(this.refs.rightContainer, 'scroll', this._scrollHeight.bind(this));
            // this.refs.rightContainer.removeEventListener('scroll', this._scrollHeight.bind(this));
        }
        if (this.refs.leftContainer && !this.refs.rightContainer) {
            removeEvent(this.refs.container, 'scroll', this._scrollHeight.bind(this));
            // this.refs.container.removeEventListener('scroll', this._scrollHeight.bind(this));
        }
    }

    componentDidUpdate() {
        this._adjustWidth(this.refs);
        if (this.refs.rightContainer) {
            addEvent(this.refs.rightContainer, 'scroll', this._scrollHeight.bind(this));
            // this.refs.rightContainer.addEventListener('scroll', this._scrollHeight.bind(this));
        }
        if (this.refs.leftContainer && !this.refs.rightContainer) {
            addEvent(this.refs.container, 'scroll', this._scrollHeight.bind(this));
            // this.refs.container.addEventListener('scroll', this._scrollHeight.bind(this));
        }
    }

    componentWillReceiveProps(nextProps) {
        this._initColumnData(nextProps);

        this.setState(prevState => {
            prevState.data = nextProps.data.slice();
            prevState.length = (nextProps.pagination || nextProps.topPagination) && nextProps.options.sizePerPage || nextProps.data.length;
            prevState.currentPage = (nextProps.pagination || nextProps.topPagination) && nextProps.options.page || this.state.currentPage;
            return prevState;
        });
    }

    handleSelectAll(checked) {
        if (checked) {
            this.props.selectRow.onSelectAll(checked, this.state.data.slice())
        } else {
            this.props.selectRow.onSelectAll(checked, [])
        }
    }

    handleSort(sortField, order) {
        const {
            remote,
            onSortChange
        } = this.props;
        if (remote) {
            onSortChange(sortField, order)
        } else {
            let data = this.state.data.slice();

            data.sort((a, b) => {
                let ValueA = a[sortField];
                let ValueB = b[sortField];
                if (order === 'asc') {
                    if (typeof ValueA === 'string') {
                        return ValueA.localeCompare(ValueB);
                    } else {
                        return ValueA < ValueB ? -1 : (ValueA > ValueB ? 1 : 0);
                    }
                } else {
                    if (typeof ValueB === 'string') {
                        return ValueB.localeCompare(ValueA);
                    } else {
                        return ValueB < ValueA ? -1 : (ValueB > ValueA ? 1 : 0);
                    }
                }
            });

            this.setState(prevState => {
                prevState.data = data;
                prevState.order = order;
                prevState.sortField = sortField;
                return prevState;
            });

            onSortChange(sortField, order);
        }
    }

    handleClick(page, sizePerPage) {
        this.setState(prevState => {
            prevState.currentPage = page;
            return prevState;
        });
        this.props.options.onPageChange(page, sizePerPage);
    }

    handleFlip(length) {
        const {
            remote,
            options
        } = this.props;
        const page = remote ? options.page : this.state.currentPage;
        if (!remote) {
            this.setState(prevState => {
                prevState.length = length;
                if (!remote && (page - 1) * length > prevState.data.length) {
                    prevState.currentPage = 1;
                }
                return prevState;
            });
        }

        options.onPageChange && options.onPageChange(page, length);
        options.onSizePageChange && options.onSizePageChange(length);
    }

    handleHover(hover) {
        this.setState(prevState => {
            prevState.isHover = hover;
            return prevState;
        })
    }

    colgroupRender(data, mode) {
        let output = [];
        if (mode !== 'none') {
            output.push(<col key="select" style={{textAlign: 'center', width: 46}}/>)
        }
        data.map((item, index) => {
            let style = {
                width: item.width,
                maxWidth: item.width,
                textAlign: item.dataAlign,
                display: item.hidden && 'none'
            };
            output.push(
                <col style={style} key={index}/>
            )
        });
        return output;
    }

    rowsRender(data, cols, hideSelectColumn) {
        const {
            isHover
        } = this.state;
        const {
            hover,
            isKey,
            selectRow,
            hoverStyle,
        } = this.props;
        const isSelect = selectRow.mode !== 'none';
        let output = [];

        if (data && data.length) {
            for (let i = 0; i < data.length; i++) {
                let node = data[i];
                let key = node[isKey];
                output.push(
                    <Row
                        key={key}
                        data={node}
                        cols={cols}
                        colIndex={i}
                        isKey={isKey}
                        isSelect={isSelect}
                        selectRow={selectRow}
                        hover={isHover === key}
                        hoverStyle={hoverStyle}
                        hideSelectColumn={hideSelectColumn}
                        onMouseOut={hover ? this.handleHover.bind(this, null) : () => {
                        }}
                        onMouseOver={hover ? this.handleHover.bind(this, key) : () => {
                        }}
                        checked={selectRow.mode === 'checkbox' ?
                            !!~selectRow.selected.indexOf(key) : selectRow.selected[0] === key}
                    />
                );
            }
        }
        return output;
    }

    blankRender(data, colSpan, showText) {
        if (data.length) return null;
        return (
            <tr>
                <td className="el-text-center" colSpan={colSpan}>{showText && this.props.noDataText}</td>
            </tr>
        );
    }

    bodyRender(data, className, height, selectRow) {
        return (
            <div className="el-table-container el-table-body-container" style={{height: height || 'auto'}}
                 ref="container">
                <table className={className} ref="body">
                    <colgroup ref="colgroup">
                        {this.colgroupRender(this.columnData, selectRow.hideSelectColumn ? 'none' : selectRow.mode)}
                    </colgroup>
                    <tbody ref="tbody">
                    {this.blankRender(data, this.columnData.length, true)}
                    {this.rowsRender(data, this.columnData, selectRow.hideSelectColumn)}
                    </tbody>
                </table>
            </div>
        )
    }

    leftBodyRender(data, className, height, selectRow) {
        if (this.leftColumnData.length) {
            return (
                <div className="el-table-container el-table-body-container" style={{height: height || 'auto'}}
                     ref="leftContainer">
                    <table className={className}>
                        <colgroup ref="left">
                            {this.colgroupRender(this.leftColumnData, selectRow.hideSelectColumn ? 'none' : selectRow.mode)}
                        </colgroup>
                        <tbody ref="ltbody">
                        {this.blankRender(data, this.leftColumnData.length)}
                        {this.rowsRender(data, this.leftColumnData, selectRow.hideSelectColumn)}
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    rightBodyRender(data, className, height) {
        if (this.rightColumnData.length) {
            return (
                <div className="el-table-container el-table-body-container" style={{height: height || 'auto'}}
                     ref="rightContainer">
                    <table className={className} ref="rightBody">
                        <colgroup ref="right">
                            {this.colgroupRender(this.rightColumnData, 'none')}
                        </colgroup>
                        <tbody ref="rtbody">
                        {this.blankRender(data, this.rightColumnData.length)}
                        {this.rowsRender(data, this.rightColumnData, true, true)}
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    paginationTotalRender() {
        const {
            data,
            remote,
            options,
            dataSize,
            pagination
        } = this.props;
        if (pagination && options.paginationShowsTotal) {
            const len = remote ? options.sizePerPage : this.state.length;
            const current = remote ? (options.page - 1) * len : (this.state.currentPage - 1) * len;
            const start = remote ? current + 1 : Math.min(data.length, current + 1);
            const to = remote ? current + data.length : Math.min(data.length, current + len);
            return (
                <div style={{margin: '20px 0 0 20px ', display: 'inline-block'}}>
                    {
                        options.paginationShowsTotal === true ?
                            <div>显示 {start} 至 {to}条 共{remote ? dataSize : data.length}条</div> :
                            options.paginationShowsTotal(start, to, dataSize)
                    }
                </div>
            )
        }
    }

    dropDownListRender() {
        const {
            remote,
            options,
            pagination
        } = this.props;
        const sizePageList = options.sizePageList;
        const length = sizePageList && sizePageList.length;
        if (pagination && (length > 1 || length === 1 && sizePageList[0] !== options.sizePerPage)) {
            if (remote) {
                return (
                    <Dropdown list={sizePageList}
                              onClick={this.handleFlip.bind(this)}>
                        {options.sizePerPage}
                    </Dropdown>);
            } else {
                return (
                    <Dropdown list={sizePageList} onClick={this.handleFlip.bind(this)}>
                        {this.state.length}
                    </Dropdown>
                );
            }
        }
    }

    pagingRender() {
        const {
            remote,
            options,
            dataSize,
        } = this.props;
        return (
            <div className="el-fr">
                {  remote ?
                    <Paging
                        dataSize={dataSize}
                        current={options.page}
                        endLabel={options.endLabel}
                        prevLabel={options.prevLabel}
                        nextLabel={options.nextLabel}
                        startLabel={options.startLabel}
                        sizePerPage={options.sizePerPage}
                        hideEndLabel={options.hideEndLabel}
                        paginationSize={options.paginationSize}
                        hideStartLabel={options.hideStartLabel}
                        showTotalPages={options.showTotalPages}
                        onPageChange={options.onPageChange}
                    />
                    :
                    <Paging
                        endLabel={options.endLabel}
                        prevLabel={options.prevLabel}
                        nextLabel={options.nextLabel}
                        sizePerPage={this.state.length}
                        startLabel={options.startLabel}
                        current={this.state.currentPage}
                        dataSize={this.props.data.length}
                        hideEndLabel={options.hideEndLabel}
                        paginationSize={options.paginationSize}
                        hideStartLabel={options.hideStartLabel}
                        showTotalPages={options.showTotalPages}
                        onPageChange={this.handleClick.bind(this)}
                    />
                }
            </div>
        )
    }

    topPagingRender() {
        const {
            remote,
            options,
            dataSize
        } = this.props;
        return (
            <div className="el-fr">
                {  remote ?
                    <SimplePaging
                        dataSize={dataSize}
                        current={options.page}
                        showTotalPages={false}
                        prevLabel={options.prevLabel}
                        nextLabel={options.nextLabel}
                        sizePerPage={options.sizePerPage}
                        onPageChange={options.onPageChange}
                    />
                    :
                    <SimplePaging
                        showTotalPages={false}
                        prevLabel={options.prevLabel}
                        nextLabel={options.nextLabel}
                        sizePerPage={this.state.length}
                        current={this.state.currentPage}
                        dataSize={this.props.data.length}
                        onPageChange={this.handleClick.bind(this)}
                    />
                }
            </div>
        )
    }

    pagingRowRender() {
        if (!this.props.pagination || !this.props.data.length) return null;
        return (
            <div className="el-row">
                <div className="el-fl">
                    {this.dropDownListRender()}
                    {this.paginationTotalRender()}
                </div>
                <div className="el-fr">
                    {this.pagingRender()}
                </div>
            </div>
        )
    }

    topPagingRowRender() {
        if (!this.props.topPagination || !this.props.data.length) return null;
        return (
            <div className="el-row">
                <div className="el-fr">
                    {this.topPagingRender()}
                </div>
            </div>
        )
    }

    titleRender() {
        const title = this.props.title;
        if (!title) return null;
        return (
            <div className="el-table-title">
                {typeof title === 'function' ? title(this.props.data.slice()) : title}
            </div>
        );
    }

    footerRender() {
        const footer = this.props.footer;
        if (!footer) return null;
        return (
            <div className="el-table-footer">
                {typeof footer === 'function' ? footer(this.props.data.slice()) : footer}
            </div>
        );
    }

    render() {
        const {
            width,
            isKey,
            remote,
            height,
            striped,
            children,
            sortName,
            lineWrap,
            selectRow,
            sortOrder,
            nestedHead,
            pagination,
            topPagination
        } = this.props;
        const {
            data,
            order,
            length,
            sortField,
            currentPage
        } = this.state;

        let checked = false;
        const className = classnames({
            'el-table-bordered': true,
            'el-table-striped': striped
        });
        const renderList = (topPagination || pagination) && !remote ? this._sliceData(data, currentPage, length) : data.slice();
        if (selectRow.mode !== 'none') {
            checked = this._getAllValue(renderList.slice(), isKey).sort().toString() === selectRow.selected.slice().sort().toString();
        }
        return (
            <div className={"el-table-group el-" + lineWrap}>
                {this.titleRender()}
                {this.topPagingRowRender()}
                {
                    !!nestedHead.length &&
                    <NestedHeader
                        ref="nested" nestedHead={nestedHead}
                        selectRow={selectRow} lineWrap={lineWrap}
                        cols={this.columnData}
                    />
                }
                <div className="el-table-wrapper" style={{width: width || '100%'}}>
                    <div className="el-table">
                        <Header
                            ref="thead"
                            onSelectAll={this.handleSelectAll.bind(this)}
                            selectRow={selectRow} checked={checked}
                            sortOrder={remote ? sortOrder : order}
                            sortName={remote ? sortName : sortField}
                            onSort={this.handleSort.bind(this)}
                        >
                            {children}
                        </Header>
                        {this.bodyRender(renderList, className, height, selectRow)}
                    </div>
                    {
                        !!this.leftColumnData.length &&
                        <div className="el-table el-table-fixed el-table-left-fixed">
                            <Header
                                ref="lthead" left={this.leftColumnData.length}
                                onSelectAll={this.handleSelectAll.bind(this)}
                                selectRow={selectRow} checked={checked}
                                sortName={remote ? sortName : sortField}
                                sortOrder={remote ? sortOrder : order}
                                onSort={this.handleSort.bind(this)}
                            >
                                {children}
                            </Header>
                            {this.leftBodyRender(renderList, className, height, selectRow)}
                        </div>
                    }
                    {
                        !!this.rightColumnData.length &&
                        <div className="el-table el-table-fixed el-table-right-fixed">
                            <Header
                                ref="rthead" right={this.rightColumnData.length}
                                sortName={remote ? sortName : sortField}
                                sortOrder={remote ? sortOrder : order}
                                onSort={this.handleSort.bind(this)}
                            >
                                {children}
                            </Header>
                            {this.rightBodyRender(renderList, className, height)}
                        </div>
                    }
                    {this.footerRender()}
                </div>
                {this.pagingRowRender()}
            </div>
        )

    }
}

Table.defaultProps = {
    data: [],
    dataSize: 0,
    hover: false,
    remote: false,
    striped: false,
    nestedHead: [],
    pagination: false,
    topPagination: false,
    onSortChange: empty,
    sortName: undefined,
    sortOrder: undefined,
    lineWrap: 'ellipsis',
    noDataText: <span>暂无数据</span>,
    hoverStyle: {
        backgroundColor: '#EEF7FE'
    },
    selectRow: {
        mode: 'none',
        selected: [],
        onSelect: empty,
        onSelectAll: empty,
        bgColor: '#E1F5FE',
        hideSelectColumn: false
    },
    options: {
        sizePerPage: 10,
        paginationSize: 6,
        sizePageList: [10],
        onPageChange: empty,
        onSizePageChange: empty
    },
};

Table.propTypes = {
    data: PropTypes.array,
    remote: PropTypes.bool,
    hover: PropTypes.bool,
    striped: PropTypes.bool,
    dataSize: PropTypes.number,
    pagination: PropTypes.bool,
    onSortChange: PropTypes.func,
    hoverStyle: PropTypes.object,
    topPagination: PropTypes.bool,
    isKey: PropTypes.string.isRequired,
    nestedHead: PropTypes.arrayOf(PropTypes.array),
    lineWrap: PropTypes.oneOf(['ellipsis', 'break']),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node, PropTypes.func, PropTypes.element]),
    footer: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node, PropTypes.func, PropTypes.element]),
    noDataText: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node, PropTypes.func, PropTypes.element]),
    selectRow: PropTypes.shape({
        mode: PropTypes.oneOf([
            'none',
            'radio',
            'checkbox'
        ]),
        onSelect: PropTypes.func,
        bgColor: PropTypes.string,
        selected: PropTypes.array,
        onSelectAll: PropTypes.func,
        hideSelectColumn: PropTypes.bool
    }),
    options: PropTypes.shape({
        page: PropTypes.number,
        onPageChange: PropTypes.func,
        sizePerPage: PropTypes.number,
        sizePageList: PropTypes.array,
        onSizePageChange: PropTypes.func,
        paginationSize: PropTypes.number,
        paginationShowsTotal: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
    })
};