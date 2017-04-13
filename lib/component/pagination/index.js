'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pageButton = require('./pageButton');

var _pageButton2 = _interopRequireDefault(_pageButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
            var _props = this.props;
            var current = _props.current;
            var dataSize = _props.dataSize;
            var endLabel = _props.endLabel;
            var nextLabel = _props.nextLabel;
            var prevLabel = _props.prevLabel;
            var startLabel = _props.startLabel;
            var sizePerPage = _props.sizePerPage;
            var onPageChange = _props.onPageChange;
            var hideEndLabel = _props.hideEndLabel;
            var hideStartLabel = _props.hideStartLabel;
            var paginationSize = _props.paginationSize;
            var showTotalPages = _props.showTotalPages;

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
            var PageButtons = [_react2['default'].createElement(_pageButton2['default'], {
                disabled: this.startPage === 1,
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
            PageButtons.push(_react2['default'].createElement(_pageButton2['default'], {
                label: endLabel, hidden: hideEndLabel,
                disabled: this.lastPage === totalPages, pgBtn: true,
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
    current: _react.PropTypes.number,
    dataSize: _react.PropTypes.number,
    sizePerPage: _react.PropTypes.number,
    hideEndLabel: _react.PropTypes.bool,
    hideStartLabel: _react.PropTypes.bool,
    showTotalPages: _react.PropTypes.bool,
    paginationSize: _react.PropTypes.number
};

Pagination.defaultProps = {
    current: 1,
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
    endLabel: '尾页'
};