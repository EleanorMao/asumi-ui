/**
 * Created by Elly on 2016/5/26.
 * EL Table
 * Author: Eleanor Mao
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Row from './row';
import Header from './header';
import classnames from 'classnames';
import Dropdown from '../dropdown';
import Paging from '../pagination';
import NestedHeader from './nestedHeader';
import SimplePaging from '../pagination/simplePagination';
import {
    diff,
    sort,
    noop,
    uniqueID,
    addEvent,
    removeEvent,
    getScrollBarWidth
} from '../util';

export default class Table extends Component {
    constructor(props) {
        super(props);
        this._instance = {};
        let data = this._initDictionary(props);
        this.state = {
            isHover: null,
            columnData: [],
            order: undefined,
            leftColumnData: [],
            rightColumnData: [],
            sortField: undefined,
            renderedList: data.data,
            dictionary: data.dictionary,
            currentPage: (props.pagination || props.topPagination) && props.options.page || 1,
            length: (props.pagination || props.topPagination) && props.options.sizePerPage || data.data.length
        }
    }

    _initDictionary(props) {
        let dictionary = [], data = props.data.slice();
        const {
            uid,
            isKey,
            isTree,
            hashKey,
            expandAll,
            expandRowKeys,
            childrenPropertyName
        } = props;
        let keyName = hashKey ? uid : isKey;
        if (isTree) {
            if (expandAll) {
                dictionary = this._recursion(data, hashKey, keyName, childrenPropertyName);
            } else if (expandRowKeys && expandRowKeys.length) {
                dictionary = expandRowKeys.slice();
            }
        }
        return {data, dictionary};
    }

    _recursion(data, hashKey, keyName, childrenPropertyName) {
        let dictionary = [];
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            if (hashKey && !item[keyName]) item[keyName] = uniqueID(); //引用大法好
            if (item[childrenPropertyName] && item[childrenPropertyName].length) {
                dictionary.push(item[keyName]);
                data = data.concat(item[childrenPropertyName]);
            }
        }
        return dictionary;
    }

    _flatten(data, childrenPropertyName, hashKey, keyName) {
        let output = [];
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            if (hashKey && !item[keyName]) item[keyName] = uniqueID();
            if (item[childrenPropertyName]) {
                output.push(item[keyName]);
                data = data.concat(item[childrenPropertyName]);
            }
        }
        return output;
    }

    _initColumnData(props) {
        let columnData = [];
        React.Children.map(props.children, function (column) {
            if (!column) return;
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
        this.setState({
            columnData: sortedData.sorted,
            leftColumnData: sortedData.left,
            rightColumnData: sortedData.right
        });
    }

    _getAllValue(data, isKey) {
        let output = [];
        for (let i = 0, len = data.length; i < len; i++) {
            output.push(data[i][isKey]);
        }
        return output;
    }

    _getLastChild(data) {
        let invalid = [],
            list = [];
        for (let i = 0, len = data.length; i < len; i++) {
            if (data[i].hidden) {
                invalid.push(i);
            }
            list.push(i);
        }
        let diffList = diff(list, invalid);
        return diffList[diffList.length - 1];
    }

    _sliceData(data, page, length) {
        return data.slice((page - 1) * length, page * length);
    }

    _getKeyName() {
        const {hashKey, isKey, uid} = this.props;
        return hashKey ? uid : isKey;
    }

    _adjustWidth() {
        const refs = this._instance;
        if (!refs.colgroup) return;
        const firstRow = refs.colgroup.childNodes;
        const cells = refs.thead._thead.childNodes;
        const fixedLeftRow = refs.left && refs.left.childNodes;
        const fixedRightRow = refs.right && refs.right.childNodes;
        const nestedRow = refs.nested && refs.nested._colgroup.childNodes;
        const fixedLeftHeadRow = refs.lthead && refs.lthead._colgroup.childNodes;
        const fixedRightHeadRow = refs.rthead && refs.rthead._colgroup.childNodes;
        const isNoData = refs.tbody.firstChild.childElementCount === 1;
        const length = cells.length;
        const rightFixedLength = fixedRightRow ? length - fixedRightRow.length : 0;

        if (firstRow.length !== length) return;

        const scrollBarWidth = getScrollBarWidth();
        const haveScrollBar = refs.body.offsetWidth !== refs.thead._header.offsetWidth;

        let lastChild = this._getLastChild(this.state.columnData), fixedRightWidth = 0;
        lastChild = this.props.selectRow.mode && this.props.selectRow.mode !== 'none' ? lastChild + 1 : lastChild;

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
            refs.rightBody.style.width = fixedRightWidth + 'px';
        }

        if (fixedLeftRow || fixedRightRow) {
            const tbody = refs.tbody.childNodes;
            const ltbody = refs.ltbody && refs.ltbody.childNodes;
            const rtbody = refs.rtbody && refs.rtbody.childNodes;
            const headHeight = getComputedStyle(refs.thead._thead).height;
            if (refs.lthead) refs.lthead._thead.style.height = headHeight;
            if (refs.rthead) refs.rthead._thead.style.height = headHeight;
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
        this._instance.thead._header.scrollLeft = e.currentTarget.scrollLeft;
        if (this._instance.nested) this._instance.nested._header.scrollLeft = e.currentTarget.scrollLeft;
    }

    _scrollHeight(e) {
        this._instance.leftContainer.scrollTop = e.currentTarget.scrollTop;
        if (e.currentTarget === this._instance.rightContainer) {
            this._instance.container.scrollTop = e.currentTarget.scrollTop;
        }
        if (e.currentTarget === this._instance.container) {
            this._instance.rightContainer.scrollTop = e.currentTarget.scrollTop;
        }
    }

    _tryRender() {
        const {isTree, isKey, hashKey, selectRow, nestedHead} = this.props;
        const {leftColumnData, rightColumnData} = this.state;
        const warning = 'color:red';

        if (isTree && !(isKey || hashKey)) {
            throw new Error('You need choose one configuration to set key field: `isKey` or `hashkey`!!');
        }

        if (!isTree && hashKey) {
            console.warn('%c!Warning: If you set props `isTree` to `false`, `hashKey` need to be false and set props `isKey` instead!!', warning);
        }

        if (nestedHead.length && (leftColumnData.length || rightColumnData.length)) {
            console.warn('%c!Warning: Since you set props `nestedHead`, it\'s better not set `dataFixed` in `TreeHeadCol`', warning);
        }
        if (selectRow.mode && selectRow.mode !== 'none') {
            if (isTree) {
                console.warn('%c!Warning: You need set prop `isTree` to `false`, if not `Table` will not render select rows', warning);
            }
            if (selectRow.mode === 'radio' && selectRow.selected.length > 1) {
                console.warn(
                    '%c!Warning: Since you set `selectRow.mode` to `radio`,' +
                    '`selectRow.selected` should only have one child, if not `Table` will use the first child of `selectRow.selected`',
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
        this._adjustWidth();
        addEvent(window, 'resize', this._adjustWidth.bind(this));
        let {rightContainer, container} = this._instance;
        addEvent(container, 'scroll', this._scrollHeader.bind(this));
        addEvent(container, 'scroll', this._scrollHeight.bind(this));
        addEvent(rightContainer, 'scroll', this._scrollHeight.bind(this));
    }

    componentWillUnmount() {
        removeEvent(window, 'resize', this._adjustWidth.bind(this));
        let {rightContainer, container} = this._instance;
        removeEvent(container, 'scroll', this._scrollHeader.bind(this));
        removeEvent(container, 'scroll', this._scrollHeight.bind(this));
        removeEvent(rightContainer, 'scroll', this._scrollHeight.bind(this));
    }

    componentDidUpdate() {
        this._adjustWidth();
        this._adjustWidth();
    }

    componentWillReceiveProps(nextProps) {
        this._initColumnData(nextProps);
        let data = this._initDictionary(nextProps);
        this.setState(prevState => {
            prevState.renderedList = data.data;
            prevState.dictionary = data.dictionary;
            prevState.length = (nextProps.pagination || nextProps.topPagination) && nextProps.options.sizePerPage || data.data.length;
            prevState.currentPage = (nextProps.pagination || nextProps.topPagination) && nextProps.options.page || this.state.currentPage;
            return prevState;
        });
    }

    handleToggle(option) {
        const {
            data,
            open,
            parent
        } = option;
        const that = this;
        const {hashKey, clickToCloseAll, childrenPropertyName} = this.props;
        const keyName = this._getKeyName();
        let callback = (data) => {
            let childList = data && data[childrenPropertyName] || [];
            if (clickToCloseAll) {
                childList = this._flatten(childList, childrenPropertyName, hashKey, keyName);
            }
            if (!open) {
                that.setState(old => {
                    if (hashKey && !data[keyName]) data[keyName] = uniqueID();
                    old.dictionary.push(data[keyName]);
                    return old;
                })
            } else {
                that.setState(old => {
                    old.dictionary.splice(old.dictionary.indexOf(data[keyName]), 1);
                    clickToCloseAll && childList && childList.forEach(item => {
                        let index = old.dictionary.indexOf(item);
                        if (~index) {
                            old.dictionary.splice(index, 1);
                        }
                    });
                    return old;
                })
            }
        };
        this.props.onArrowClick(open, data, callback, parent);
    }

    handleSelectAll(checked) {
        if (checked) {
            this.props.selectRow.onSelectAll(checked, this.state.renderedList.slice())
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
            let data = this.state.renderedList.slice();

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
                prevState.order = order;
                prevState.renderedList = data;
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
                if (!remote && (page - 1) * length > prevState.renderedList.length) {
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

    rowsRender(data, cols, level, parent, hideSelectColumn, right) {
        const {
            isHover,
            dictionary
        } = this.state;
        const {
            hover,
            isKey,
            isTree,
            hashKey,
            selectRow,
            hoverStyle,
            arrowRender,
            startArrowCol,
            childrenPropertyName
        } = this.props;
        const isSelect = selectRow.mode && selectRow.mode !== 'none';
        const keyName = this._getKeyName();
        let output = [];

        if (data && data.length) {
            for (let i = 0; i < data.length; i++) {
                let node = data[i];
                if (hashKey && !node[keyName]) node[keyName] = uniqueID();
                let key = node[keyName];
                let opened = !!~dictionary.indexOf(key);
                output.push(
                    <Row
                        key={key}
                        data={node}
                        cols={cols}
                        colIndex={i}
                        level={level}
                        isKey={isKey}
                        open={opened}
                        parent={parent}
                        isTree={isTree}
                        hashKey={hashKey}
                        selectRow={selectRow}
                        hover={isHover === key}
                        hoverStyle={hoverStyle}
                        arrowRender={arrowRender}
                        isSelect={!isTree && isSelect}
                        hideSelectColumn={hideSelectColumn}
                        onClick={this.handleToggle.bind(this)}
                        arrowCol={right ? null : startArrowCol}
                        childrenPropertyName={childrenPropertyName}
                        onMouseOut={hover ? this.handleHover.bind(this, null) : () => {
                        }}
                        onMouseOver={hover ? this.handleHover.bind(this, key) : () => {
                        }}
                        checked={selectRow.mode === 'checkbox' ?
                            !!~selectRow.selected.indexOf(key) : selectRow.selected[0] === key}
                    />
                );
                if (opened) {
                    output = output.concat(this.rowsRender(node[childrenPropertyName], cols, level + 1, node, hideSelectColumn, right));
                }
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
        let columnData = this.state.columnData;
        return (
            <div className="el-table-container el-table-body-container" style={{height: height || 'auto'}}
                 ref={(c) => {
                     this._instance.container = c
                 }}>
                <table className={className} ref={(c) => {
                    this._instance.body = c
                }}>
                    <colgroup ref={(c) => {
                        this._instance.colgroup = c
                    }}>
                        {this.colgroupRender(columnData, selectRow.hideSelectColumn ? 'none' : selectRow.mode)}
                    </colgroup>
                    <tbody ref={(c) => {
                        this._instance.tbody = c
                    }}>
                    {this.blankRender(data, columnData.length, true)}
                    {this.rowsRender(data, columnData, 0, null, selectRow.hideSelectColumn)}
                    </tbody>
                </table>
            </div>
        )
    }

    leftBodyRender(data, className, selectRow) {
        let leftColumnData = this.state.leftColumnData;
        if (leftColumnData.length) {
            return (
                <table className={className}>
                    <colgroup ref={(c) => {
                        this._instance.left = c
                    }}>
                        {this.colgroupRender(leftColumnData, selectRow.hideSelectColumn ? 'none' : selectRow.mode)}
                    </colgroup>
                    <tbody ref={(c) => {
                        this._instance.ltbody = c
                    }}>
                    {this.blankRender(data, leftColumnData.length)}
                    {this.rowsRender(data, leftColumnData, 0, null, selectRow.hideSelectColumn)}
                    </tbody>
                </table>
            )
        }
    }


    rightBodyRender(data, className) {
        let rightColumnData = this.state.rightColumnData;
        if (rightColumnData.length) {
            return (
                <table className={className} ref={(c) => {
                    this._instance.rightBody = c
                }}>
                    <colgroup ref={(c) => {
                        this._instance.right = c
                    }}>
                        {this.colgroupRender(rightColumnData, 'none')}
                    </colgroup>
                    <tbody ref={(c) => {
                        this._instance.rtbody = c
                    }}>
                    {this.blankRender(data, rightColumnData.length)}
                    {this.rowsRender(data, rightColumnData, 0, null, true, true)}
                    </tbody>
                </table>
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
            dataSize
        } = this.props;
        return (
            <div className="el-fr">
                {remote ?
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
            <div className="el-fr ">
                {remote ?
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
                {this.topPagingRender()}
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
            style,
            isTree,
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
            topPagination,
        } = this.props;
        const {
            order,
            length,
            sortField,
            columnData,
            currentPage,
            renderedList,
            leftColumnData,
            rightColumnData,
        } = this.state;

        let checked = false;
        let className = classnames({
            'el-table-bordered': true,
            'el-table-striped': striped
        });
        let renderList = (topPagination || pagination) && !remote ? this._sliceData(renderedList, currentPage, length) : renderedList.slice();
        if (selectRow.mode && selectRow.mode !== 'none') {
            checked = this._getAllValue(renderList.slice(), this._getKeyName()).sort().toString() === selectRow.selected.slice().sort().toString();
        }
        let paddingBottom = 0;
        let container = this._instance.container;
        if (container && typeof parseFloat(height) === "number" && (container.scrollWidth > container.clientWidth)) {
            paddingBottom = parseFloat(height) - container.clientHeight;
        }
        if (isNaN(paddingBottom)) {
            paddingBottom = 0;
        }
        return (
            <div className={"el-table-group el-" + lineWrap} style={style}>
                {this.titleRender()}
                {this.topPagingRowRender()}
                {
                    !!nestedHead.length &&
                    <NestedHeader
                        ref={(c) => {
                            this._instance.nested = c
                        }} nestedHead={nestedHead} isTree={isTree}
                        selectRow={selectRow} lineWrap={lineWrap}
                        cols={columnData}
                    />
                }
                <div className="el-table-wrapper" style={{width: width || '100%'}}>
                    <div className="el-table">
                        <Header
                            ref={(c) => {
                                this._instance.thead = c
                            }} isTree={isTree}
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
                    <div className="el-table el-table-fixed el-table-left-fixed">
                        {
                            !!leftColumnData.length &&
                            <Header
                                ref={(c) => {
                                    this._instance.lthead = c
                                }} left={leftColumnData.length} isTree={isTree}
                                onSelectAll={this.handleSelectAll.bind(this)}
                                selectRow={selectRow} checked={checked}
                                sortName={remote ? sortName : sortField}
                                sortOrder={remote ? sortOrder : order}
                                onSort={this.handleSort.bind(this)}
                            >
                                {children}
                            </Header>
                        }
                        <div
                            ref={(c) => {
                                this._instance.leftContainer = c
                            }} className="el-table-container el-table-body-container"
                            style={{height: height || 'auto', paddingBottom: paddingBottom}}
                        >
                            {this.leftBodyRender(renderList, className, selectRow)}
                        </div>
                    </div>
                    <div className="el-table el-table-fixed el-table-right-fixed">
                        {
                            !!rightColumnData.length &&
                            <Header
                                ref={(c) => {
                                    this._instance.rthead = c
                                }} right={rightColumnData.length} isTree={isTree}
                                sortName={remote ? sortName : sortField}
                                sortOrd er={remote ? sortOrder : order}
                                onSort={this.handleSort.bind(this)}
                            >
                                {children}
                            </Header>
                        }
                        <div
                            ref={(c) => {
                                this._instance.rightContainer = c
                            }} className="el-table-container el-table-body-container"
                            style={{height: height || 'auto', paddingBottom: paddingBottom}}
                        >
                            {this.rightBodyRender(renderList, className)}
                        </div>
                    </div>
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
    uid: '__uid',
    hover: false,
    isTree: false,
    remote: false,
    striped: false,
    nestedHead: [],
    startArrowCol: 0,
    expandAll: false,
    pagination: false,
    topPagination: false,
    onSortChange: noop,
    sortName: undefined,
    sortOrder: undefined,
    lineWrap: 'ellipsis',
    clickToCloseAll: true,
    childrenPropertyName: 'list',
    noDataText: <span>暂无数据</span>,
    hoverStyle: {
        backgroundColor: '#EEF7FE'
    },
    selectRow: {
        mode: 'none',
        selected: [],
        onSelect: noop,
        onSelectAll: noop,
        bgColor: '#E1F5FE',
        hideSelectColumn: false
    },
    options: {
        sizePerPage: 10,
        paginationSize: 6,
        sizePageList: [10],
        onPageChange: noop,
        onSizePageChange: noop
    },
    onArrowClick: (opened, data, callback) => {
        callback(data);
    }
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
    uid: PropTypes.string,
    isTree: PropTypes.bool,
    hashKey: PropTypes.bool,
    expandAll: PropTypes.bool,
    arrowRender: PropTypes.func,
    onArrowClick: PropTypes.func,
    isKey: PropTypes.string,
    nestedHead: PropTypes.arrayOf(PropTypes.array),
    expandRowKeys: PropTypes.array,
    startArrowCol: PropTypes.number,
    clickToCloseAll: PropTypes.bool,
    childrenPropertyName: PropTypes.string,
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