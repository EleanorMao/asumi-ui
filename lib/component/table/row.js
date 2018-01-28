'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radio = require('../radio');

var _radio2 = _interopRequireDefault(_radio);

var _checkbox = require('../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2016/9/19.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Row = function (_Component) {
    _inherits(Row, _Component);

    function Row(props) {
        _classCallCheck(this, Row);

        return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).call(this, props));
    }

    _createClass(Row, [{
        key: 'handleToggle',
        value: function handleToggle(e) {
            var _props = this.props,
                open = _props.open,
                data = _props.data,
                parent = _props.parent;

            e.stopPropagation();
            var options = (0, _util.extend)({}, {
                open: open, data: data, parent: parent
            });
            this.props.onClick(options);
        }
    }, {
        key: 'cellRender',
        value: function cellRender() {
            var _this2 = this;

            var output = [];
            var arrow = -1;
            var _props2 = this.props,
                open = _props2.open,
                data = _props2.data,
                cols = _props2.cols,
                isKey = _props2.isKey,
                level = _props2.level,
                isTree = _props2.isTree,
                hashKey = _props2.hashKey,
                checked = _props2.checked,
                isSelect = _props2.isSelect,
                arrowCol = _props2.arrowCol,
                colIndex = _props2.colIndex,
                selectRow = _props2.selectRow,
                arrowRender = _props2.arrowRender,
                hideSelectColumn = _props2.hideSelectColumn,
                childrenPropertyName = _props2.childrenPropertyName;


            var _key = hashKey ? data.__uid : data[isKey];
            var colSpan = void 0,
                colTarget = void 0;

            if (isSelect && !hideSelectColumn) {
                output.push(_react2['default'].createElement(
                    'td',
                    { key: _key, 'data-input': selectRow.mode,
                        style: { backgroundColor: checked && (selectRow.bgColor || "#E1F5FE"), textAlign: 'center' } },
                    selectRow.mode === "radio" && _react2['default'].createElement(_radio2['default'], { checked: checked, readOnly: true }),
                    selectRow.mode === "checkbox" && _react2['default'].createElement(_checkbox2['default'], { checked: checked, readOnly: true })
                ));
            }

            cols.map(function (key, i, col) {
                var cell = data[key.id],
                    dataFormat = key.dataFormat,
                    props = { colSpan: null, rowSpan: null };

                var style = {
                    width: key.width,
                    maxWidth: key.width,
                    textAlign: key.dataAlign,
                    display: key.hidden && 'none',
                    backgroundColor: isSelect && checked && (selectRow.bgColor || "#E1F5FE")
                };

                if (dataFormat) {
                    cell = dataFormat(data[key.id], data, level, colIndex, i, col);
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

                var showArrow = data[childrenPropertyName];
                showArrow = showArrow && showArrow.length > 0;

                var type = _typeof(key.showArrow);

                if (type === 'function') {
                    showArrow = key.showArrow.call(null, data[key.id], level, data, i, col);
                } else if (type === 'boolean') {
                    showArrow = key.showArrow;
                }

                output.push(_react2['default'].createElement(
                    'td',
                    { style: style,
                        key: '' + _key + i,
                        colSpan: props.colSpan,
                        rowSpan: props.rowSpan,
                        title: typeof cell === 'string' || typeof cell === 'number' ? cell : null
                    },
                    _react2['default'].createElement(
                        'span',
                        { style: { marginLeft: level * 10 + 'px' } },
                        cell,
                        isTree && showArrow && !arrow && _react2['default'].createElement(
                            'span',
                            { className: 'el-table-arrow', onClick: _this2.handleToggle.bind(_this2) },
                            arrowRender(open)
                        )
                    )
                ));
            });
            return output;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                data = _props3.data,
                level = _props3.level,
                hover = _props3.hover,
                isTree = _props3.isTree,
                checked = _props3.checked,
                isSelect = _props3.isSelect,
                selectRow = _props3.selectRow,
                hoverStyle = _props3.hoverStyle,
                onMouseOut = _props3.onMouseOut,
                onMouseOver = _props3.onMouseOver;

            return _react2['default'].createElement(
                'tr',
                {
                    style: hover ? hoverStyle : {},
                    onMouseOut: onMouseOut,
                    onMouseOver: onMouseOver,
                    className: isTree && !level && "el-tree-ancestor" || null,
                    onClick: isSelect ? function () {
                        return selectRow.onSelect(!checked, data);
                    } : function () {
                        return false;
                    } },
                this.cellRender()
            );
        }
    }]);

    return Row;
}(_react.Component);

exports['default'] = Row;


Row.defaultProps = {
    level: 0,
    hashKey: false,
    hideSelectColumn: false,
    selectRow: {
        mode: 'none',
        bgColor: '#E1F5FE',
        selected: [],
        onSelect: _util.noop,
        onSelectAll: _util.noop
    },
    arrowRender: function arrowRender(open) {
        return _react2['default'].createElement(
            'i',
            {
                className: 'fa fa-chevron-down',
                style: open ? { transform: 'rotate(-90deg)' } : {}
            },
            ' '
        );
    }
};