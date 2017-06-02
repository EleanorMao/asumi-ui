'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 16/9/26.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var NestedHeader = function (_Component) {
    _inherits(NestedHeader, _Component);

    function NestedHeader(props) {
        _classCallCheck(this, NestedHeader);

        return _possibleConstructorReturn(this, (NestedHeader.__proto__ || Object.getPrototypeOf(NestedHeader)).call(this, props));
    }

    _createClass(NestedHeader, [{
        key: 'nestedHeadRender',
        value: function nestedHeadRender() {
            var output = [];
            var nestedHead = this.props.nestedHead;

            nestedHead.map(function (throws, index) {
                var item = _react2['default'].createElement(
                    'tr',
                    { key: 'trow' + index },
                    throws.map(function (cell, i) {
                        var obj = (0, _util.isObj)(cell);
                        return _react2['default'].createElement(
                            'th',
                            { colSpan: obj && cell.colspan || null,
                                rowSpan: obj && cell.rowspan || null,
                                key: i },
                            obj ? cell.label : cell
                        );
                    })
                );
                output.push(item);
            });
            return output;
        }
    }, {
        key: 'colgroupRender',
        value: function colgroupRender() {
            var cols = this.props.cols;

            var output = [];
            cols.map(function (item, i) {
                output.push(_react2['default'].createElement('col', { key: i, style: { display: item.hidden && 'none' } }));
            });
            return output;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2['default'].createElement(
                'div',
                { className: "el-table el-table-nestedHead el-" + this.props.lineWrap, ref: function ref(c) {
                        _this2._header = c;
                    } },
                _react2['default'].createElement(
                    'table',
                    { className: 'el-table-bordered' },
                    _react2['default'].createElement(
                        'colgroup',
                        { ref: function ref(c) {
                                _this2._colgroup = c;
                            } },
                        this.colgroupRender()
                    ),
                    _react2['default'].createElement(
                        'thead',
                        null,
                        this.nestedHeadRender()
                    )
                )
            );
        }
    }]);

    return NestedHeader;
}(_react.Component);

exports['default'] = NestedHeader;


NestedHeader.defaultProps = {
    nestedHead: _propTypes2['default'].arrayOf(_propTypes2['default'].array)
};