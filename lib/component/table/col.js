'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2016/9/19.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var SortGroup = function SortGroup() {
    return _react2['default'].createElement(
        'span',
        { className: 'el-order', key: 'sort-group' },
        _react2['default'].createElement(
            'span',
            { className: 'el-dropdown' },
            _react2['default'].createElement('span', { className: 'el-caret', style: { margin: '10px 0 10px 5px', color: '#ccc' } })
        ),
        _react2['default'].createElement(
            'span',
            { className: 'el-dropup' },
            _react2['default'].createElement('span', { className: 'el-caret', style: { margin: '10px 0', color: '#ccc' } })
        )
    );
};

var singleSort = function singleSort(sortOrder) {
    return _react2['default'].createElement(
        'span',
        { key: 'single-sort',
            className: "el-order " + (sortOrder === 'desc' ? '' : 'el-dropup') },
        _react2['default'].createElement('span', { className: 'el-caret', key: 'asc-cart', style: { margin: '10px 0 10px 5px' } })
    );
};

var Col = function (_Component) {
    _inherits(Col, _Component);

    function Col(props) {
        _classCallCheck(this, Col);

        return _possibleConstructorReturn(this, (Col.__proto__ || Object.getPrototypeOf(Col)).call(this, props));
    }

    _createClass(Col, [{
        key: 'caretRender',
        value: function caretRender(dataField, sortName, sortOrder) {
            return dataField === sortName && sortOrder ? singleSort(sortOrder) : SortGroup();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                width = _props.width,
                hidden = _props.hidden,
                onSort = _props.onSort,
                colSpan = _props.colSpan,
                children = _props.children,
                dataSort = _props.dataSort,
                sortName = _props.sortName,
                sortOrder = _props.sortOrder,
                dataField = _props.dataField,
                dataAlign = _props.dataAlign;


            var style = {
                width: width,
                maxWidth: width,
                textAlign: dataAlign,
                display: hidden && 'none'
            };

            return _react2['default'].createElement(
                'th',
                { style: style, colSpan: colSpan || null,
                    onClick: dataSort ? function () {
                        return onSort(dataField, sortOrder === 'asc' ? 'desc' : 'asc');
                    } : function () {
                        return false;
                    } },
                _react2['default'].createElement(
                    'span',
                    null,
                    children
                ),
                dataSort && this.caretRender(dataField, sortName, sortOrder)
            );
        }
    }]);

    return Col;
}(_react.Component);

Col.defaultProps = {
    render: null,
    colSpan: null,
    dataSort: false,
    dataFixed: 'auto',
    dataAlign: 'left'
};

Col.propTypes = {
    hidden: _propTypes2['default'].bool,
    dataSort: _propTypes2['default'].bool,
    colSpan: _propTypes2['default'].number,
    dataFormat: _propTypes2['default'].func,
    dataFixed: _propTypes2['default'].oneOf(['left', 'right', 'auto']),
    dataAlign: _propTypes2['default'].oneOf(['left', 'right', 'center']),
    width: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number])
};

exports['default'] = Col;