'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _checkbox = require('../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TransferPanel = function (_Component) {
    _inherits(TransferPanel, _Component);

    function TransferPanel(props) {
        _classCallCheck(this, TransferPanel);

        var _this = _possibleConstructorReturn(this, (TransferPanel.__proto__ || Object.getPrototypeOf(TransferPanel)).call(this, props));

        _this.state = {
            query: ''
        };
        return _this;
    }

    _createClass(TransferPanel, [{
        key: 'handleChange',
        value: function handleChange(_ref) {
            var value = _ref.value;

            this.props.changeChecked(value);
        }
    }, {
        key: 'handleInputChange',
        value: function handleInputChange(e) {
            this.setState({ query: e.value });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                data = _props.data,
                title = _props.title,
                checkedList = _props.checkedList,
                filterable = _props.filterable,
                filterPlaceholder = _props.filterPlaceholder;

            return _react2['default'].createElement(
                'div',
                { className: 'el-transfer-panel' },
                _react2['default'].createElement(
                    'p',
                    { className: 'el-transfer-panel-header' },
                    _react2['default'].createElement(
                        'span',
                        null,
                        title
                    ),
                    _react2['default'].createElement(
                        'span',
                        null,
                        checkedList.length,
                        '/',
                        data.length
                    )
                ),
                filterable && _react2['default'].createElement(_input2['default'], {
                    size: 'small',
                    placeholder: filterPlaceholder,
                    onChange: this.handleInputChange.bind(this)
                }),
                _react2['default'].createElement(
                    'div',
                    null,
                    data.length === 0 ? _react2['default'].createElement(
                        'span',
                        { className: 'el-transfer-no-data' },
                        '\u65E0\u6570\u636E'
                    ) : this.filterData.length === 0 ? _react2['default'].createElement(
                        'span',
                        { className: 'el-transfer-no-data' },
                        '\u65E0\u5339\u914D\u6570\u636E'
                    ) : null,
                    _react2['default'].createElement(_checkbox2['default'].Group, {
                        className: 'el-transfer-check-group',
                        options: this.filterData,
                        checkedList: checkedList,
                        onChange: this.handleChange.bind(this)
                    })
                )
            );
        }
    }, {
        key: 'filterData',
        get: function get() {
            var _this2 = this;

            var _props2 = this.props,
                data = _props2.data,
                propsAlias = _props2.propsAlias,
                filterMethod = _props2.filterMethod;

            return data.filter(function (item) {
                if (typeof filterMethod === 'function') {
                    return filterMethod(_this2.state.query, item);
                } else {
                    var label = item[propsAlias.label] || item[propsAlias.value].toString();
                    return ~label.toLowerCase().indexOf(_this2.state.query.toLowerCase());
                }
            });
        }
    }]);

    return TransferPanel;
}(_react.Component);

exports['default'] = TransferPanel;


TransferPanel.propTypes = {
    data: _propTypes2['default'].array, //array[{ value, label, disabled }]
    filterable: _propTypes2['default'].bool,
    filterPlaceholder: _propTypes2['default'].string,
    filterMethod: _propTypes2['default'].func,
    title: _propTypes2['default'].string,
    props: _propTypes2['default'].object,
    checkedList: _propTypes2['default'].array,
    onChange: _propTypes2['default'].func,
    changeChecked: _propTypes2['default'].func
};

TransferPanel.defaultProps = {
    data: [],
    filterable: false,
    filterPlaceholder: '请输入搜索内容',
    title: '',
    props: {},
    checkedList: [],
    onChange: function onChange() {}
};