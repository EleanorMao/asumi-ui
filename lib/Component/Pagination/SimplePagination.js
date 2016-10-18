'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PageButton = require('./PageButton');

var _PageButton2 = _interopRequireDefault(_PageButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimplePagination = function (_Component) {
    _inherits(SimplePagination, _Component);

    function SimplePagination(props) {
        _classCallCheck(this, SimplePagination);

        return _possibleConstructorReturn(this, (SimplePagination.__proto__ || Object.getPrototypeOf(SimplePagination)).call(this, props));
    }

    _createClass(SimplePagination, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var current = _props.current;
            var dataSize = _props.dataSize;
            var prevLabel = _props.prevLabel;
            var nextLabel = _props.nextLabel;
            var sizePerPage = _props.sizePerPage;
            var onPageChange = _props.onPageChange;
            var showTotalPages = _props.showTotalPages;

            var totalPages = sizePerPage && Math.ceil(dataSize / sizePerPage) || 1;
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'ul',
                    { className: 'pagination' },
                    _react2.default.createElement(_PageButton2.default, { label: prevLabel, disabled: current - 1 <= 0,
                        onClick: function onClick() {
                            return onPageChange(current - 1, sizePerPage);
                        } }),
                    _react2.default.createElement(_PageButton2.default, { label: nextLabel, disabled: current + 1 > totalPages,
                        onClick: function onClick() {
                            return onPageChange(current + 1, sizePerPage);
                        } })
                ),
                showTotalPages && _react2.default.createElement(
                    'span',
                    { className: 'totalPages' },
                    '\u5171 ',
                    totalPages,
                    ' \u9875'
                )
            );
        }
    }]);

    return SimplePagination;
}(_react.Component);

SimplePagination.PropTypes = {
    current: _react.PropTypes.number,
    dataSize: _react.PropTypes.number,
    sizePerPage: _react.PropTypes.number,
    showTotalPages: _react.PropTypes.bool,
    onPageChange: _react.PropTypes.func
};

SimplePagination.defaultProps = {
    current: 1,
    dataSize: 0,
    sizePerPage: 10,
    showTotalPages: true,
    prevLabel: _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement('span', { className: 'caret left' }),
        '\u4E0A\u4E00\u9875'
    ),
    nextLabel: _react2.default.createElement(
        'span',
        null,
        '\u4E0B\u4E00\u9875',
        _react2.default.createElement('span', { className: 'caret right' })
    )
};

exports.default = SimplePagination;