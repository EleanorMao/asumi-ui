'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _row = require('./row');

var _row2 = _interopRequireDefault(_row);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dropdown = require('../dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

var _pagination = require('../pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _nestedHeader = require('./nestedHeader');

var _nestedHeader2 = _interopRequireDefault(_nestedHeader);

var _simplePagination = require('../pagination/simplePagination');

var _simplePagination2 = _interopRequireDefault(_simplePagination);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Elly on 2016/5/26.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * EL Table
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author: Eleanor Mao
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


function sliceData(data, page, length) {
    return data.slice((page - 1) * length, page * length);
}

function getAllValue(data, isKey) {
    if (data && data.length) {
        return data.map(function (row) {
            return row[isKey];
        });
    }
    return [];
}

function getAllKey(data, hashKey, keyName, childrenPropertyName) {
    var output = [];
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (hashKey && !item[keyName]) item[keyName] = (0, _util.uniqueID)(); //引用大法好
        if (item[childrenPropertyName] && item[childrenPropertyName].length) {
            output.push(item[keyName]);
            data = data.concat(item[childrenPropertyName]);
        }
    }
    return output;
}

function initDictionary(props) {
    var dictionary = [],
        data = props.data.slice();
    if (props.isTree) {
        var uid = props.uid,
            isKey = props.isKey,
            hashKey = props.hashKey,
            expandAll = props.expandAll,
            expandRowKeys = props.expandRowKeys,
            childrenPropertyName = props.childrenPropertyName;

        var keyName = hashKey ? uid : isKey;
        if (expandAll) {
            dictionary = getAllKey(data, hashKey, keyName, childrenPropertyName);
        } else if (expandRowKeys && expandRowKeys.length) {
            dictionary = expandRowKeys.slice();
        }
    }
    return { data: data, dictionary: dictionary };
}

function getLastChild(data, selectRow) {
    var invalid = [],
        list = [],
        cellIndex = 0;
    for (var i = 0, len = data.length; i < len; i++) {
        if (data[i].hidden) {
            invalid.push(i);
        }
        list.push(i);
    }
    var diffList = (0, _util.diff)(list, invalid);
    cellIndex = diffList[diffList.length - 1];
    if (selectRow && selectRow.mode && selectRow.mode !== 'none' && !selectRow.hideSelectColumn) {
        cellIndex++;
    }
    return cellIndex;
}

function getDefLength(props) {
    if (props.pagination || props.topPagination) {
        if (props.options) {
            var _props$options = props.options,
                sizePerPage = _props$options.sizePerPage,
                sizePageList = _props$options.sizePageList;

            return sizePerPage || (sizePageList && sizePageList.length ? sizePageList[0] : 10);
        }
    }
    return 10;
}

var Table = function (_Component) {
    _inherits(Table, _Component);

    function Table(props) {
        _classCallCheck(this, Table);

        var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

        _this.isIE = !-[1];
        _this.lastChild = 0;
        _this._instance = {};
        _this.currentCell = null;

        var _initDictionary = initDictionary(props),
            data = _initDictionary.data,
            dictionary = _initDictionary.dictionary;

        _this.state = {
            dictionary: dictionary,
            isHover: null,
            columnData: [],
            order: undefined,
            renderedList: data,
            leftColumnData: [],
            rightColumnData: [],
            sortField: undefined,
            allChecked: _this._isAllChecked(data, props.selectRow),
            currentPage: (props.pagination || props.topPagination) && props.options.page || 1,
            length: getDefLength(props)
        };
        return _this;
    }

    _createClass(Table, [{
        key: '_isAllChecked',
        value: function _isAllChecked(list, selectRow) {
            if (list && list.length && selectRow && selectRow.mode && selectRow.mode !== 'node' && selectRow.selected && selectRow.selected.length) {
                return !getAllValue(list.slice(), this._getKeyName()).filter(function (v) {
                    return !~selectRow.selected.indexOf(v);
                }).length;
            }
            return false;
        }
    }, {
        key: '_initColumnData',
        value: function _initColumnData(props) {
            var columnData = [];
            _react2['default'].Children.map(props.children, function (column) {
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
            var sortedData = (0, _util.sort)(columnData);
            this.setState({
                columnData: sortedData.sorted,
                leftColumnData: sortedData.left,
                rightColumnData: sortedData.right
            });
        }
    }, {
        key: '_getKeyName',
        value: function _getKeyName() {
            var _props = this.props,
                hashKey = _props.hashKey,
                isKey = _props.isKey,
                uid = _props.uid;

            return hashKey ? uid : isKey;
        }
    }, {
        key: '_removeStretchWidth',
        value: function _removeStretchWidth() {
            var refs = this._instance;
            if (!refs.colgroup || !refs.table_wrapper) return;
            var rows = (0, _util.toArray)(refs.table_wrapper.querySelectorAll('tr'));
            if (!rows.length) return;
            for (var j = 0; j <= rows.length; j++) {
                if (!rows[j]) continue;
                var bodyCells = rows[j].cells;
                for (var k = 0; k < bodyCells.length; k++) {
                    var bodyCell = bodyCells[k];
                    (0, _util.removeEvent)(bodyCell, 'mousedown', this._handleMouseDown.bind(this, bodyCell));
                    (0, _util.removeEvent)(bodyCell, 'mousemove', this._handleMouseMove.bind(this, bodyCell));
                    (0, _util.removeEvent)(bodyCell, 'mouseup', this._handleMouseUp.bind(this, bodyCell));
                }
            }
        }
    }, {
        key: '_stretchWidth',
        value: function _stretchWidth() {
            var refs = this._instance;
            if (!refs.colgroup || !refs.table_wrapper) return;
            var rows = (0, _util.toArray)(refs.table_wrapper.querySelectorAll('tr'));
            if (!rows.length) return;
            for (var j = 0; j <= rows.length; j++) {
                if (!rows[j]) continue;
                var bodyCells = rows[j].cells;
                for (var k = 0; k < bodyCells.length; k++) {
                    var bodyCell = bodyCells[k];
                    if (bodyCell.getAttribute('data-input')) continue;
                    if (k < this.lastChild) {
                        (0, _util.addEvent)(bodyCell, 'mousedown', this._handleMouseDown.bind(this, bodyCell));
                    }
                    (0, _util.addEvent)(bodyCell, 'mousemove', this._handleMouseMove.bind(this, bodyCell));
                    (0, _util.addEvent)(bodyCell, 'mouseup', this._handleMouseUp.bind(this, bodyCell));
                }
            }
        }
    }, {
        key: '_handleMouseDown',
        value: function _handleMouseDown(cell, e) {
            this.currentCell = cell;
            var clientX = e.clientX;
            var offsetWidth = this.currentCell.offsetWidth;
            if (e.offsetX > offsetWidth - 10) {
                this.currentCell._mouse_down = true;
                this.currentCell._old_clientX = clientX;
                this.currentCell._old_offsetWidth = offsetWidth;
            }
        }
    }, {
        key: '_handleMouseUp',
        value: function _handleMouseUp(cell) {
            if (this.currentCell == null) {
                this.currentCell = cell;
            }
            this.currentCell._mouse_down = false;
            this.currentCell.style.cursor = '';
            this.currentCell._old_clientX = '';
            this.currentCell._old_offsetWidth = '';
        }
    }, {
        key: '_handleMouseMove',
        value: function _handleMouseMove(cell, e) {
            var clientX = e.clientX;
            var currentCell = this.currentCell;
            var offsetWidth = cell.offsetWidth;
            var colgroup = this._instance.thead._colgroup.childNodes;
            cell.style.cursor = cell.cellIndex < this.lastChild && e.offsetX > offsetWidth - 10 ? 'col-resize' : '';
            if (currentCell == null) {
                currentCell = cell;
            }
            if (currentCell._mouse_down) {
                var width = currentCell._old_offsetWidth + clientX - currentCell._old_clientX;
                if (width > 10) {
                    cell.style.cursor = 'col-resize';
                    colgroup[currentCell.cellIndex].style.width = width + 'px';
                    colgroup[currentCell.cellIndex].style.maxWidth = width + 'px';
                    this._adjustWidth();
                }
            }
        }
    }, {
        key: '_adjustWidth',
        value: function _adjustWidth() {
            var refs = this._instance;
            if (!refs.colgroup || !refs.container) return;
            var firstRow = (0, _util.toArray)(refs.colgroup.childNodes);
            var cells = (0, _util.toArray)(refs.thead._thead.childNodes);
            var fixedLeftRow = refs.left && (0, _util.toArray)(refs.left.childNodes);
            var fixedRightRow = refs.right && (0, _util.toArray)(refs.right.childNodes);
            var nestedRow = refs.nested && (0, _util.toArray)(refs.nested._colgroup.childNodes);
            var fixedLeftHeadRow = refs.lthead && (0, _util.toArray)(refs.lthead._colgroup.childNodes);
            var fixedRightHeadRow = refs.rthead && (0, _util.toArray)(refs.rthead._colgroup.childNodes);
            var isNoData = !refs.tbody || refs.tbody.firstChild.childElementCount === 1;
            var length = cells.length;
            var rightFixedLength = fixedRightRow ? length - fixedRightRow.length : 0;

            if (firstRow.length !== length) return;

            var scrollBarWidth = (0, _util.getScrollBarWidth)();
            var haveScrollBar = refs.container.offsetHeight < refs.container.scrollHeight;

            var lastChild = this.lastChild = getLastChild(this.state.columnData, this.props.selectRow);
            var fixedRightWidth = 0;

            for (var i = 0; i < length; i++) {
                var cell = cells[i];
                var rightIndex = i - rightFixedLength;
                var computedStyle = getComputedStyle(cell);
                var width = parseFloat(computedStyle.width.replace('px', ''));

                if (this.isIE) {
                    //IE
                    var paddingLeftWidth = parseFloat(computedStyle.paddingLeft.replace('px', ''));
                    var paddingRightWidth = parseFloat(computedStyle.paddingRight.replace('px', ''));
                    var borderLeftWidth = parseFloat(computedStyle.borderLeftWidth.replace('px', ''));
                    var borderRightWidth = parseFloat(computedStyle.borderRightWidth.replace('px', ''));
                    width = width + paddingLeftWidth + paddingRightWidth + borderRightWidth + borderLeftWidth;
                }

                var lastPaddingWidth = -(lastChild === i && haveScrollBar ? scrollBarWidth : 0);

                if (!width) {
                    width = 120;
                    cell.width = width + lastPaddingWidth + 'px';
                }

                var result = (width + lastPaddingWidth).toFixed(2) + 'px';

                if (!isNoData) {
                    firstRow[i].style.width = result;
                    firstRow[i].style.maxWidth = result;
                }

                if (nestedRow && nestedRow[i]) {
                    var display = computedStyle.display;
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
                refs.rightContainer.style.width = fixedRightWidth + 'px';
            }

            if (fixedLeftRow || fixedRightRow) {
                var getBoundingClientRect = refs.container.getBoundingClientRect;
                var height = getBoundingClientRect ? refs.container.getBoundingClientRect().height : refs.container.offsetHeight;
                var haveVerticalScrollBar = refs.container.offsetWidth < refs.container.scrollWidth;
                var fixedTableHeight = height - (haveVerticalScrollBar ? scrollBarWidth : 0);
                refs.leftContainer.style.height = fixedTableHeight + 'px';
                refs.rightContainer.style.height = fixedTableHeight + 'px';
                var tbody = (0, _util.toArray)(refs.tbody.childNodes);
                var ltbody = refs.ltbody && (0, _util.toArray)(refs.ltbody.childNodes);
                var rtbody = refs.rtbody && (0, _util.toArray)(refs.rtbody.childNodes);
                var headHeight = getComputedStyle(refs.thead._thead).height;
                if (refs.lthead) refs.lthead._thead.style.height = headHeight;
                if (refs.rthead) refs.rthead._thead.style.height = headHeight;
                for (var _i = 0; _i < tbody.length; _i++) {
                    var row = tbody[_i];
                    var _height = getComputedStyle(row).height;
                    if (ltbody && ltbody[_i]) {
                        ltbody[_i].style.height = _height;
                        ltbody[_i].style.maxHeight = _height;
                    }
                    if (rtbody && rtbody[_i]) {
                        rtbody[_i].style.height = _height;
                        rtbody[_i].style.maxHeight = _height;
                    }
                }
            }
        }
    }, {
        key: '_scrollHeader',
        value: function _scrollHeader(e) {
            this._instance.thead._header.scrollLeft = e.currentTarget.scrollLeft;
            if (this._instance.nested) this._instance.nested._header.scrollLeft = e.currentTarget.scrollLeft;
        }
    }, {
        key: '_scrollHeight',
        value: function _scrollHeight(e) {
            this._instance.leftContainer.scrollTop = e.currentTarget.scrollTop;
            if (e.currentTarget === this._instance.rightContainer) {
                this._instance.container.scrollTop = e.currentTarget.scrollTop;
            }
            if (e.currentTarget === this._instance.container) {
                this._instance.rightContainer.scrollTop = e.currentTarget.scrollTop;
            }
        }
    }, {
        key: '_tryRender',
        value: function _tryRender() {
            var _props2 = this.props,
                isTree = _props2.isTree,
                isKey = _props2.isKey,
                hashKey = _props2.hashKey,
                selectRow = _props2.selectRow,
                nestedHead = _props2.nestedHead;
            var _state = this.state,
                leftColumnData = _state.leftColumnData,
                rightColumnData = _state.rightColumnData;

            var warning = 'color:red';

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
                if (selectRow.mode === 'radio' && selectRow.selected && selectRow.selected.length > 1) {
                    console.warn('%c!Warning: Since you set `selectRow.mode` to `radio`,' + '`selectRow.selected` should only have one child, if not `Table` will use the first child of `selectRow.selected`', warning);
                }
            }
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this._initColumnData(this.props);
            this._tryRender();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._adjustWidth();
            if (this.props.stretchable) this._stretchWidth();
            (0, _util.addEvent)(window, 'resize', this._adjustWidth.bind(this));
            var _instance = this._instance,
                rightContainer = _instance.rightContainer,
                container = _instance.container;

            (0, _util.addEvent)(container, 'scroll', this._scrollHeader.bind(this));
            (0, _util.addEvent)(container, 'scroll', this._scrollHeight.bind(this));
            (0, _util.addEvent)(rightContainer, 'scroll', this._scrollHeight.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._removeStretchWidth();
            (0, _util.removeEvent)(window, 'resize', this._adjustWidth.bind(this));
            var _instance2 = this._instance,
                rightContainer = _instance2.rightContainer,
                container = _instance2.container;

            (0, _util.removeEvent)(container, 'scroll', this._scrollHeader.bind(this));
            (0, _util.removeEvent)(container, 'scroll', this._scrollHeight.bind(this));
            (0, _util.removeEvent)(rightContainer, 'scroll', this._scrollHeight.bind(this));
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            this._adjustWidth();
            if (prevProps.stretchable && !this.props.stretchable) {
                this._removeStretchWidth();
            } else if (this.props.stretchable && (!prevProps.stretchable || prevProps.data.length < this.props.data.length)) {
                this._stretchWidth();
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            this._initColumnData(nextProps);

            var _initDictionary2 = initDictionary(nextProps),
                data = _initDictionary2.data,
                dictionary = _initDictionary2.dictionary;

            this.setState(function (prevState) {
                prevState.renderedList = data;
                prevState.dictionary = dictionary;
                prevState.length = getDefLength(nextProps);
                prevState.allChecked = _this2._isAllChecked(data, nextProps.selectRow);
                prevState.currentPage = (nextProps.pagination || nextProps.topPagination) && nextProps.options.page || _this2.state.currentPage;
                return prevState;
            });
        }
    }, {
        key: 'handleToggle',
        value: function handleToggle(option) {
            var data = option.data,
                open = option.open,
                parent = option.parent;

            var that = this;
            var _props3 = this.props,
                hashKey = _props3.hashKey,
                clickToCloseAll = _props3.clickToCloseAll,
                childrenPropertyName = _props3.childrenPropertyName;

            var keyName = this._getKeyName();
            var callback = function callback(data) {
                var childList = data && data[childrenPropertyName] || [];
                if (clickToCloseAll) {
                    childList = getAllKey(childList, hashKey, keyName, childrenPropertyName);
                }
                if (!open) {
                    that.setState(function (old) {
                        if (hashKey && !data[keyName]) data[keyName] = (0, _util.uniqueID)();
                        old.dictionary.push(data[keyName]);
                        return old;
                    });
                } else {
                    that.setState(function (old) {
                        old.dictionary.splice(old.dictionary.indexOf(data[keyName]), 1);
                        clickToCloseAll && childList && childList.forEach(function (item) {
                            var index = old.dictionary.indexOf(item);
                            if (~index) {
                                old.dictionary.splice(index, 1);
                            }
                        });
                        return old;
                    });
                }
            };
            this.props.onArrowClick(open, data, callback, parent);
        }
    }, {
        key: 'handleSelectAll',
        value: function handleSelectAll(checked) {
            if (checked) {
                this.props.selectRow.onSelectAll(checked, this.state.renderedList.slice());
            } else {
                this.props.selectRow.onSelectAll(checked, []);
            }
        }
    }, {
        key: 'handleSort',
        value: function handleSort(sortField, order) {
            var _props4 = this.props,
                remote = _props4.remote,
                onSortChange = _props4.onSortChange;

            if (remote) {
                onSortChange(sortField, order);
            } else {
                var data = this.state.renderedList.slice();

                data.sort(function (a, b) {
                    var ValueA = a[sortField];
                    var ValueB = b[sortField];
                    if (order === 'asc') {
                        if (typeof ValueA === 'string') {
                            return ValueA.localeCompare(ValueB);
                        } else {
                            return ValueA < ValueB ? -1 : ValueA > ValueB ? 1 : 0;
                        }
                    } else {
                        if (typeof ValueB === 'string') {
                            return ValueB.localeCompare(ValueA);
                        } else {
                            return ValueB < ValueA ? -1 : ValueB > ValueA ? 1 : 0;
                        }
                    }
                });

                this.setState(function (prevState) {
                    prevState.order = order;
                    prevState.renderedList = data;
                    prevState.sortField = sortField;
                    return prevState;
                });

                onSortChange(sortField, order);
            }
        }
    }, {
        key: 'handleClick',
        value: function handleClick(page, sizePerPage) {
            this.setState(function (prevState) {
                prevState.currentPage = page;
                return prevState;
            });
            this.props.options.onPageChange(page, sizePerPage);
        }
    }, {
        key: 'handleFlip',
        value: function handleFlip(length) {
            var _props5 = this.props,
                remote = _props5.remote,
                options = _props5.options;

            var page = remote ? options.page : this.state.currentPage;
            if (!remote) {
                this.setState(function (prevState) {
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
    }, {
        key: 'handleHover',
        value: function handleHover(hover) {
            this.setState(function (prevState) {
                prevState.isHover = hover;
                return prevState;
            });
        }
    }, {
        key: 'colgroupRender',
        value: function colgroupRender(data, mode) {
            var output = [];
            if (mode && mode !== 'none') {
                output.push(_react2['default'].createElement('col', { key: 'select', style: { textAlign: 'center', width: 46 } }));
            }
            data.map(function (item, index) {
                var style = {
                    width: item.width,
                    maxWidth: item.width,
                    textAlign: item.dataAlign,
                    display: item.hidden && 'none'
                };
                output.push(_react2['default'].createElement('col', { style: style, key: index }));
            });
            return output;
        }
    }, {
        key: 'rowsRender',
        value: function rowsRender(data, cols, level, parent, hideSelectColumn, right) {
            var _state2 = this.state,
                isHover = _state2.isHover,
                dictionary = _state2.dictionary;
            var _props6 = this.props,
                hover = _props6.hover,
                isKey = _props6.isKey,
                isTree = _props6.isTree,
                hashKey = _props6.hashKey,
                selectRow = _props6.selectRow,
                hoverStyle = _props6.hoverStyle,
                arrowRender = _props6.arrowRender,
                startArrowCol = _props6.startArrowCol,
                childrenPropertyName = _props6.childrenPropertyName;

            var isSelect = selectRow.mode && selectRow.mode !== 'none';
            var keyName = this._getKeyName();
            var output = [];

            if (data && data.length) {
                for (var i = 0; i < data.length; i++) {
                    var node = data[i];
                    if (hashKey && !node[keyName]) node[keyName] = (0, _util.uniqueID)();
                    var key = node[keyName];
                    var opened = !!~dictionary.indexOf(key);
                    output.push(_react2['default'].createElement(_row2['default'], {
                        key: key,
                        data: node,
                        cols: cols,
                        colIndex: i,
                        level: level,
                        isKey: isKey,
                        open: opened,
                        parent: parent,
                        isTree: isTree,
                        hashKey: hashKey,
                        selectRow: selectRow,
                        hover: isHover === key,
                        hoverStyle: hoverStyle,
                        arrowRender: arrowRender,
                        isSelect: !isTree && isSelect,
                        hideSelectColumn: hideSelectColumn,
                        onClick: this.handleToggle.bind(this),
                        arrowCol: right ? null : startArrowCol,
                        childrenPropertyName: childrenPropertyName,
                        onMouseOut: hover ? this.handleHover.bind(this, null) : function () {},
                        onMouseOver: hover ? this.handleHover.bind(this, key) : function () {},
                        checked: selectRow.selected && (selectRow.mode === 'checkbox' ? !!~selectRow.selected.indexOf(key) : selectRow.selected[0] === key)
                    }));
                    if (opened) {
                        output = output.concat(this.rowsRender(node[childrenPropertyName], cols, level + 1, node, hideSelectColumn, right));
                    }
                }
            }
            return output;
        }
    }, {
        key: 'blankRender',
        value: function blankRender(data, colSpan, showText) {
            if (data.length) return null;
            return _react2['default'].createElement(
                'tr',
                null,
                _react2['default'].createElement(
                    'td',
                    { className: 'el-text-center', colSpan: colSpan },
                    showText && this.props.noDataText
                )
            );
        }
    }, {
        key: 'bodyRender',
        value: function bodyRender(data, className, height, selectRow) {
            var _this3 = this;

            var columnData = this.state.columnData;
            return _react2['default'].createElement(
                'div',
                { className: 'el-table-container el-table-body-container', style: { height: height || 'auto' },
                    ref: function ref(c) {
                        _this3._instance.container = c;
                    } },
                _react2['default'].createElement(
                    'table',
                    { className: className, ref: function ref(c) {
                            _this3._instance.body = c;
                        } },
                    _react2['default'].createElement(
                        'colgroup',
                        { ref: function ref(c) {
                                _this3._instance.colgroup = c;
                            } },
                        this.colgroupRender(columnData, selectRow.hideSelectColumn ? 'none' : selectRow.mode)
                    ),
                    _react2['default'].createElement(
                        'tbody',
                        { ref: function ref(c) {
                                _this3._instance.tbody = c;
                            } },
                        this.blankRender(data, columnData.length, true),
                        this.rowsRender(data, columnData, 0, null, selectRow.hideSelectColumn)
                    )
                )
            );
        }
    }, {
        key: 'leftBodyRender',
        value: function leftBodyRender(data, className, selectRow) {
            var _this4 = this;

            var leftColumnData = this.state.leftColumnData;
            if (leftColumnData.length) {
                return _react2['default'].createElement(
                    'table',
                    { className: className },
                    _react2['default'].createElement(
                        'colgroup',
                        { ref: function ref(c) {
                                _this4._instance.left = c;
                            } },
                        this.colgroupRender(leftColumnData, selectRow.hideSelectColumn ? 'none' : selectRow.mode)
                    ),
                    _react2['default'].createElement(
                        'tbody',
                        { ref: function ref(c) {
                                _this4._instance.ltbody = c;
                            } },
                        this.blankRender(data, leftColumnData.length),
                        this.rowsRender(data, leftColumnData, 0, null, selectRow.hideSelectColumn)
                    )
                );
            }
        }
    }, {
        key: 'rightBodyRender',
        value: function rightBodyRender(data, className) {
            var _this5 = this;

            var rightColumnData = this.state.rightColumnData;
            if (rightColumnData.length) {
                return _react2['default'].createElement(
                    'table',
                    { className: className, ref: function ref(c) {
                            _this5._instance.rightBody = c;
                        } },
                    _react2['default'].createElement(
                        'colgroup',
                        { ref: function ref(c) {
                                _this5._instance.right = c;
                            } },
                        this.colgroupRender(rightColumnData, 'none')
                    ),
                    _react2['default'].createElement(
                        'tbody',
                        { ref: function ref(c) {
                                _this5._instance.rtbody = c;
                            } },
                        this.blankRender(data, rightColumnData.length),
                        this.rowsRender(data, rightColumnData, 0, null, true, true)
                    )
                );
            }
        }
    }, {
        key: 'paginationTotalRender',
        value: function paginationTotalRender() {
            var _props7 = this.props,
                data = _props7.data,
                remote = _props7.remote,
                options = _props7.options,
                dataSize = _props7.dataSize,
                pagination = _props7.pagination;

            if (pagination && options.paginationShowsTotal) {
                var len = remote ? options.sizePerPage : this.state.length;
                var current = remote ? (options.page - 1) * len : (this.state.currentPage - 1) * len;
                var start = remote ? current + 1 : Math.min(data.length, current + 1);
                var to = remote ? current + data.length : Math.min(data.length, current + len);
                return _react2['default'].createElement(
                    'div',
                    { style: { margin: '20px 0 0 20px ', display: 'inline-block' } },
                    options.paginationShowsTotal === true ? _react2['default'].createElement(
                        'div',
                        null,
                        '\u663E\u793A ',
                        start,
                        ' \u81F3 ',
                        to,
                        '\u6761 \u5171',
                        remote ? dataSize : data.length,
                        '\u6761'
                    ) : options.paginationShowsTotal(start, to, dataSize)
                );
            }
        }
    }, {
        key: 'dropDownListRender',
        value: function dropDownListRender() {
            var _props8 = this.props,
                remote = _props8.remote,
                options = _props8.options,
                pagination = _props8.pagination;

            var sizePageList = options.sizePageList;
            var length = sizePageList && sizePageList.length;
            if (pagination && (length > 1 || length === 1 && sizePageList[0] !== options.sizePerPage)) {
                if (remote) {
                    return _react2['default'].createElement(
                        _dropdown2['default'],
                        {
                            list: sizePageList,
                            dropdownPlacement: options.dropdownPlacement,
                            onClick: this.handleFlip.bind(this) },
                        options.sizePerPage
                    );
                } else {
                    return _react2['default'].createElement(
                        _dropdown2['default'],
                        {
                            list: sizePageList,
                            onClick: this.handleFlip.bind(this),
                            dropdownPlacement: options.dropdownPlacement },
                        this.state.length
                    );
                }
            }
        }
    }, {
        key: 'pagingRender',
        value: function pagingRender() {
            var _props9 = this.props,
                remote = _props9.remote,
                options = _props9.options,
                dataSize = _props9.dataSize;

            return _react2['default'].createElement(
                'div',
                { className: 'el-fr' },
                remote ? _react2['default'].createElement(_pagination2['default'], {
                    dataSize: dataSize,
                    current: options.page,
                    endLabel: options.endLabel,
                    prevLabel: options.prevLabel,
                    nextLabel: options.nextLabel,
                    startLabel: options.startLabel,
                    sizePerPage: options.sizePerPage,
                    hideEndLabel: options.hideEndLabel,
                    paginationSize: options.paginationSize,
                    hideStartLabel: options.hideStartLabel,
                    showTotalPages: options.showTotalPages,
                    onPageChange: options.onPageChange
                }) : _react2['default'].createElement(_pagination2['default'], {
                    endLabel: options.endLabel,
                    prevLabel: options.prevLabel,
                    nextLabel: options.nextLabel,
                    sizePerPage: this.state.length,
                    startLabel: options.startLabel,
                    current: this.state.currentPage,
                    dataSize: this.props.data.length,
                    hideEndLabel: options.hideEndLabel,
                    paginationSize: options.paginationSize,
                    hideStartLabel: options.hideStartLabel,
                    showTotalPages: options.showTotalPages,
                    onPageChange: this.handleClick.bind(this)
                })
            );
        }
    }, {
        key: 'topPagingRender',
        value: function topPagingRender() {
            var _props10 = this.props,
                remote = _props10.remote,
                options = _props10.options,
                dataSize = _props10.dataSize;

            return _react2['default'].createElement(
                'div',
                { className: 'el-fr ' },
                remote ? _react2['default'].createElement(_simplePagination2['default'], {
                    dataSize: dataSize,
                    current: options.page,
                    showTotalPages: false,
                    prevLabel: options.prevLabel,
                    nextLabel: options.nextLabel,
                    sizePerPage: options.sizePerPage,
                    onPageChange: options.onPageChange
                }) : _react2['default'].createElement(_simplePagination2['default'], {
                    showTotalPages: false,
                    prevLabel: options.prevLabel,
                    nextLabel: options.nextLabel,
                    sizePerPage: this.state.length,
                    current: this.state.currentPage,
                    dataSize: this.props.data.length,
                    onPageChange: this.handleClick.bind(this)
                })
            );
        }
    }, {
        key: 'pagingRowRender',
        value: function pagingRowRender() {
            if (!this.props.pagination || !this.props.data.length) return null;
            return _react2['default'].createElement(
                'div',
                { className: 'el-row' },
                _react2['default'].createElement(
                    'div',
                    { className: 'el-fl' },
                    this.dropDownListRender(),
                    this.paginationTotalRender()
                ),
                _react2['default'].createElement(
                    'div',
                    { className: 'el-fr' },
                    this.pagingRender()
                )
            );
        }
    }, {
        key: 'topPagingRowRender',
        value: function topPagingRowRender() {
            if (!this.props.topPagination || !this.props.data.length) return null;
            return _react2['default'].createElement(
                'div',
                { className: 'el-row' },
                this.topPagingRender()
            );
        }
    }, {
        key: 'titleRender',
        value: function titleRender() {
            var title = this.props.title;
            if (!title) return null;
            return _react2['default'].createElement(
                'div',
                { className: 'el-table-title' },
                typeof title === 'function' ? title(this.props.data.slice()) : title
            );
        }
    }, {
        key: 'footerRender',
        value: function footerRender() {
            var footer = this.props.footer;
            if (!footer) return null;
            return _react2['default'].createElement(
                'div',
                { className: 'el-table-footer' },
                typeof footer === 'function' ? footer(this.props.data.slice()) : footer
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var _props11 = this.props,
                width = _props11.width,
                style = _props11.style,
                isTree = _props11.isTree,
                remote = _props11.remote,
                height = _props11.height,
                striped = _props11.striped,
                children = _props11.children,
                sortName = _props11.sortName,
                lineWrap = _props11.lineWrap,
                selectRow = _props11.selectRow,
                sortOrder = _props11.sortOrder,
                nestedHead = _props11.nestedHead,
                pagination = _props11.pagination,
                topPagination = _props11.topPagination;
            var _state3 = this.state,
                order = _state3.order,
                length = _state3.length,
                sortField = _state3.sortField,
                columnData = _state3.columnData,
                allChecked = _state3.allChecked,
                currentPage = _state3.currentPage,
                renderedList = _state3.renderedList,
                leftColumnData = _state3.leftColumnData,
                rightColumnData = _state3.rightColumnData;


            var className = (0, _classnames2['default'])({
                'el-table-bordered': true,
                'el-table-striped': striped
            });
            var renderList = (topPagination || pagination) && !remote ? sliceData(renderedList, currentPage, length) : renderedList;
            return _react2['default'].createElement(
                'div',
                { className: "el-table-group el-" + lineWrap, style: style },
                this.titleRender(),
                this.topPagingRowRender(),
                !!nestedHead.length && _react2['default'].createElement(_nestedHeader2['default'], {
                    ref: function ref(c) {
                        _this6._instance.nested = c;
                    }, nestedHead: nestedHead, isTree: isTree,
                    selectRow: selectRow, lineWrap: lineWrap,
                    cols: columnData
                }),
                _react2['default'].createElement(
                    'div',
                    { className: 'el-table-wrapper', style: { width: width || '100%' },
                        ref: function ref(c) {
                            return _this6._instance.table_wrapper = c;
                        } },
                    _react2['default'].createElement(
                        'div',
                        { className: 'el-table' },
                        _react2['default'].createElement(
                            _header2['default'],
                            {
                                ref: function ref(c) {
                                    _this6._instance.thead = c;
                                }, isTree: isTree,
                                onSelectAll: this.handleSelectAll.bind(this),
                                selectRow: selectRow, checked: allChecked,
                                sortOrder: remote ? sortOrder : order,
                                sortName: remote ? sortName : sortField,
                                onSort: this.handleSort.bind(this),
                                dataLength: renderList.length
                            },
                            children
                        ),
                        this.bodyRender(renderList, className, height, selectRow)
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: 'el-table el-table-fixed el-table-left-fixed' },
                        !!leftColumnData.length && _react2['default'].createElement(
                            _header2['default'],
                            {
                                ref: function ref(c) {
                                    _this6._instance.lthead = c;
                                }, left: leftColumnData.length, isTree: isTree,
                                onSelectAll: this.handleSelectAll.bind(this),
                                selectRow: selectRow, checked: allChecked,
                                sortName: remote ? sortName : sortField,
                                sortOrder: remote ? sortOrder : order,
                                onSort: this.handleSort.bind(this),
                                dataLength: renderList.length },
                            children
                        ),
                        _react2['default'].createElement(
                            'div',
                            {
                                ref: function ref(c) {
                                    _this6._instance.leftContainer = c;
                                }, className: 'el-table-container el-table-body-container',
                                style: { height: height || 'auto' } },
                            this.leftBodyRender(renderList, className, selectRow)
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: 'el-table el-table-fixed el-table-right-fixed' },
                        !!rightColumnData.length && _react2['default'].createElement(
                            _header2['default'],
                            {
                                ref: function ref(c) {
                                    _this6._instance.rthead = c;
                                }, right: rightColumnData.length, isTree: isTree,
                                sortName: remote ? sortName : sortField,
                                sortOrd: true, er: remote ? sortOrder : order,
                                onSort: this.handleSort.bind(this),
                                dataLength: renderList.length },
                            children
                        ),
                        _react2['default'].createElement(
                            'div',
                            { ref: function ref(c) {
                                    _this6._instance.rightContainer = c;
                                }, className: 'el-table-container el-table-body-container',
                                style: { height: height || 'auto' } },
                            this.rightBodyRender(renderList, className)
                        )
                    ),
                    this.footerRender()
                ),
                this.pagingRowRender()
            );
        }
    }]);

    return Table;
}(_react.Component);

exports['default'] = Table;


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
    onSortChange: _util.noop,
    sortName: undefined,
    sortOrder: undefined,
    lineWrap: 'ellipsis',
    clickToCloseAll: true,
    childrenPropertyName: 'list',
    noDataText: _react2['default'].createElement(
        'span',
        null,
        '\u6682\u65E0\u6570\u636E'
    ),
    hoverStyle: {
        backgroundColor: '#EEF7FE'
    },
    selectRow: {
        mode: 'none',
        selected: [],
        onSelect: _util.noop,
        onSelectAll: _util.noop,
        bgColor: '#E1F5FE',
        hideSelectColumn: false
    },
    options: {
        sizePerPage: 10,
        paginationSize: 6,
        sizePageList: [10],
        onPageChange: _util.noop,
        onSizePageChange: _util.noop,
        dropdownPlacement: 'auto'
    },
    onArrowClick: function onArrowClick(opened, data, callback) {
        callback(data);
    }
};

Table.propTypes = {
    data: _propTypes2['default'].array,
    hover: _propTypes2['default'].bool,
    remote: _propTypes2['default'].bool,
    striped: _propTypes2['default'].bool,
    dataSize: _propTypes2['default'].number,
    pagination: _propTypes2['default'].bool,
    onSortChange: _propTypes2['default'].func,
    hoverStyle: _propTypes2['default'].object,
    topPagination: _propTypes2['default'].bool,
    uid: _propTypes2['default'].string,
    isTree: _propTypes2['default'].bool,
    hashKey: _propTypes2['default'].bool,
    expandAll: _propTypes2['default'].bool,
    arrowRender: _propTypes2['default'].func,
    onArrowClick: _propTypes2['default'].func,
    stretchable: _propTypes2['default'].bool,
    isKey: _propTypes2['default'].string,
    nestedHead: _propTypes2['default'].arrayOf(_propTypes2['default'].array),
    expandRowKeys: _propTypes2['default'].array,
    startArrowCol: _propTypes2['default'].number,
    clickToCloseAll: _propTypes2['default'].bool,
    childrenPropertyName: _propTypes2['default'].string,
    lineWrap: _propTypes2['default'].oneOf(['ellipsis', 'break']),
    width: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    height: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    title: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number, _propTypes2['default'].node, _propTypes2['default'].func, _propTypes2['default'].element]),
    footer: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number, _propTypes2['default'].node, _propTypes2['default'].func, _propTypes2['default'].element]),
    noDataText: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number, _propTypes2['default'].node, _propTypes2['default'].func, _propTypes2['default'].element]),
    selectRow: _propTypes2['default'].shape({
        mode: _propTypes2['default'].oneOf(['none', 'radio', 'checkbox']),
        onSelect: _propTypes2['default'].func,
        bgColor: _propTypes2['default'].string,
        selected: _propTypes2['default'].array,
        onSelectAll: _propTypes2['default'].func,
        hideSelectColumn: _propTypes2['default'].bool
    }),
    options: _propTypes2['default'].shape({
        page: _propTypes2['default'].number,
        onPageChange: _propTypes2['default'].func,
        sizePerPage: _propTypes2['default'].number,
        sizePageList: _propTypes2['default'].array,
        onSizePageChange: _propTypes2['default'].func,
        paginationSize: _propTypes2['default'].number,
        dropdownPlacement: _propTypes2['default'].oneOf(['auto', 'top', 'bottom']),
        paginationShowsTotal: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].func])
    })
};