'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _transferPanel = require('./transferPanel');

var _transferPanel2 = _interopRequireDefault(_transferPanel);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Transfer = function (_Component) {
    _inherits(Transfer, _Component);

    function Transfer(props) {
        _classCallCheck(this, Transfer);

        var _this = _possibleConstructorReturn(this, (Transfer.__proto__ || Object.getPrototypeOf(Transfer)).call(this, props));

        _this.state = {
            leftChecked: [],
            rightChecked: []
        };
        return _this;
    }

    _createClass(Transfer, [{
        key: 'handleChange',
        value: function handleChange(isLeft, value) {
            isLeft ? this.setState({ leftChecked: value }) : this.setState({ rightChecked: value });
        }
    }, {
        key: 'addToLeft',
        value: function addToLeft() {
            var _this2 = this;

            var value = this.props.value;
            var rightChecked = this.state.rightChecked;

            var currentValue = value.slice();
            rightChecked.forEach(function (item) {
                var index = currentValue.indexOf(item);
                if (index > -1) {
                    currentValue.splice(index, 1);
                }
            });
            this.setState({ leftChecked: [], rightChecked: [] }, function () {
                return _this2.props.onChange(currentValue);
            });
        }
    }, {
        key: 'addToRight',
        value: function addToRight() {
            var _this3 = this;

            var value = this.props.value;
            var leftChecked = this.state.leftChecked;

            var currentValue = value.slice();
            leftChecked.forEach(function (item) {
                if (!value.includes(item)) {
                    currentValue = currentValue.concat(item);
                }
            });
            this.setState({ rightChecked: [], leftChecked: [] }, function () {
                return _this3.props.onChange(currentValue);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                data = _props.data,
                titles = _props.titles,
                others = _objectWithoutProperties(_props, ['data', 'titles']);

            var _state = this.state,
                leftChecked = _state.leftChecked,
                rightChecked = _state.rightChecked;


            var isTopBtnDisabled = leftChecked.length === 0;
            var isBottomBtnDisabled = rightChecked.length === 0;
            return _react2['default'].createElement(
                'div',
                { className: 'el-transfer' },
                _react2['default'].createElement(_transferPanel2['default'], _extends({
                    data: this.sourceData,
                    checkedList: leftChecked,
                    title: titles[0],
                    changeChecked: this.handleChange.bind(this, true)
                }, others)),
                _react2['default'].createElement(
                    'div',
                    { className: 'el-transfer-buttons' },
                    _react2['default'].createElement(
                        _button2['default'],
                        {
                            type: 'primary',
                            className: 'el-transfer-button',
                            disabled: isTopBtnDisabled,
                            onClick: this.addToRight.bind(this)
                        },
                        _react2['default'].createElement('i', { className: 'fa fa-chevron-right' })
                    ),
                    _react2['default'].createElement(
                        _button2['default'],
                        {
                            type: 'primary',
                            className: 'el-transfer-button',
                            disabled: isBottomBtnDisabled,
                            onClick: this.addToLeft.bind(this)
                        },
                        _react2['default'].createElement('i', { className: 'fa fa-chevron-left' })
                    )
                ),
                _react2['default'].createElement(_transferPanel2['default'], _extends({
                    data: this.targetData,
                    checkedList: rightChecked,
                    title: titles[1],
                    changeChecked: this.handleChange.bind(this, false)
                }, others))
            );
        }
    }, {
        key: 'sourceData',
        get: function get() {
            var _props2 = this.props,
                data = _props2.data,
                value = _props2.value,
                propsAlias = _props2.propsAlias;

            return data.filter(function (item) {
                return !value.includes(item[propsAlias.value]);
            });
        }
    }, {
        key: 'targetData',
        get: function get() {
            var _props3 = this.props,
                data = _props3.data,
                value = _props3.value,
                propsAlias = _props3.propsAlias;

            return data.filter(function (item) {
                return value.includes(item[propsAlias.value]);
            });
        }
    }]);

    return Transfer;
}(_react.Component);

exports['default'] = Transfer;


Transfer.propTypes = {
    data: _propTypes2['default'].array, //array[{ value, label, disabled }]
    filterable: _propTypes2['default'].bool,
    filterPlaceholder: _propTypes2['default'].string,
    filterMethod: _propTypes2['default'].func,
    titles: _propTypes2['default'].array,
    props: _propTypes2['default'].object,
    onChange: _propTypes2['default'].func,
    propsAlias: _propTypes2['default'].object,
    value: _propTypes2['default'].array
};

Transfer.defaultProps = {
    filterable: false,
    filterPlaceholder: '请输入搜索内容',
    titles: ['', ''],
    props: {},
    onChange: _util.noop,
    propsAlias: {
        label: 'label',
        value: 'value',
        disabled: 'false'
    },
    value: []
};