'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pageButton = require('./pageButton');

var _pageButton2 = _interopRequireDefault(_pageButton);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/28.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Pagination = function (_Component) {
    _inherits(Pagination, _Component);

    function Pagination(props) {
        _classCallCheck(this, Pagination);

        var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props));

        _this.startPage = 1;
        _this.finalStartPage = Math.ceil(props.dataSize / props.sizePerPage) - props.paginationSize + 1;
        _this.lastPage = props.paginationSize;
        _this.center = Math.floor(props.paginationSize / 2);
        return _this;
    }

    _createClass(Pagination, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            this.finalStartPage = Math.ceil(props.dataSize / props.sizePerPage) - props.paginationSize + 1;
            this.lastPage = props.paginationSize;
            this.center = Math.floor(props.paginationSize / 2);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                current = _props.current,
                dataSize = _props.dataSize,
                endLabel = _props.endLabel,
                nextLabel = _props.nextLabel,
                prevLabel = _props.prevLabel,
                startLabel = _props.startLabel,
                sizePerPage = _props.sizePerPage,
                onPageChange = _props.onPageChange,
                hideEndLabel = _props.hideEndLabel,
                hideStartLabel = _props.hideStartLabel,
                paginationSize = _props.paginationSize,
                showTotalPages = _props.showTotalPages;

            var totalPages = Math.ceil(dataSize / sizePerPage);
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
            //逻辑修改为只要当前页不是首页，则可点击(原逻辑：看不见首页才能点击首页)
            var PageButtons = [_react2['default'].createElement(_pageButton2['default'], {
                disabled: current === 1,
                label: startLabel, hidden: hideStartLabel, pgBtn: true,
                key: 'start', onClick: function onClick() {
                    return onPageChange(1, sizePerPage);
                } }), _react2['default'].createElement(_pageButton2['default'], {
                label: prevLabel, disabled: current === 1, pgBtn: true,
                key: 'prev', onClick: function onClick() {
                    return onPageChange(current - 1, sizePerPage);
                } })];

            var _loop = function _loop(i) {
                PageButtons.push(_react2['default'].createElement(_pageButton2['default'], { label: i, active: current === i, key: i,
                    onClick: function onClick() {
                        return onPageChange(i, sizePerPage);
                    } }));
            };

            for (var i = this.startPage; i < this.lastPage + 1; i++) {
                _loop(i);
            }
            PageButtons.push(_react2['default'].createElement(_pageButton2['default'], {
                label: nextLabel, disabled: current === totalPages || totalPages < 1, pgBtn: true,
                key: 'next', onClick: function onClick() {
                    return onPageChange(current + 1, sizePerPage);
                } }));
            //逻辑修改为只要当前页不是尾页，则可点击(原逻辑：看不见尾页才能点击尾页)
            PageButtons.push(_react2['default'].createElement(_pageButton2['default'], {
                label: endLabel, hidden: hideEndLabel,
                disabled: this.lastPage === current && totalPages < 1, pgBtn: true,
                key: 'end', onClick: function onClick() {
                    return onPageChange(totalPages, sizePerPage);
                } }));

            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'ul',
                    { className: 'el-pagination' },
                    PageButtons
                ),
                showTotalPages && _react2['default'].createElement(
                    'span',
                    { className: 'el-totalPages' },
                    '\u5171 ',
                    totalPages,
                    ' \u9875'
                )
            );
        }
    }]);

    return Pagination;
}(_react.Component);

exports['default'] = Pagination;


Pagination.propTypes = {
    endLabel: _propTypes2['default'].any,
    nextLabel: _propTypes2['default'].any,
    prevLabel: _propTypes2['default'].any,
    startLabel: _propTypes2['default'].any,
    current: _propTypes2['default'].number,
    dataSize: _propTypes2['default'].number,
    onPageChange: _propTypes2['default'].func,
    hideEndLabel: _propTypes2['default'].bool,
    sizePerPage: _propTypes2['default'].number,
    hideStartLabel: _propTypes2['default'].bool,
    showTotalPages: _propTypes2['default'].bool,
    paginationSize: _propTypes2['default'].number
};

Pagination.defaultProps = {
    current: 1,
    dataSize: 0,
    sizePerPage: 10,
    paginationSize: 6,
    hideEndLabel: false,
    hideStartLabel: false,
    showTotalPages: true,
    prevLabel: _react2['default'].createElement(
        'span',
        null,
        _react2['default'].createElement('span', { className: 'el-caret el-left' }),
        '\u4E0A\u4E00\u9875'
    ),
    nextLabel: _react2['default'].createElement(
        'span',
        null,
        '\u4E0B\u4E00\u9875',
        _react2['default'].createElement('span', { className: 'el-caret el-right' })
    ),
    startLabel: '首页',
    endLabel: '尾页',
    onPageChange: _util.noop
};