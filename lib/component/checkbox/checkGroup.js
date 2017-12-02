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

var _checkbox = require('../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/10.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var CheckGroup = function (_Component) {
    _inherits(CheckGroup, _Component);

    function CheckGroup(props) {
        _classCallCheck(this, CheckGroup);

        return _possibleConstructorReturn(this, (CheckGroup.__proto__ || Object.getPrototypeOf(CheckGroup)).call(this, props));
    }

    _createClass(CheckGroup, [{
        key: 'handleChange',
        value: function handleChange(_ref, e) {
            var onChange = _ref.onChange;
            var checked = e.checked,
                value = e.value;
            var _props = this.props,
                min = _props.min,
                max = _props.max,
                name = _props.name;

            var checkedList = this.getValue.slice();
            if (max != null && checkedList.length === max) return;
            if (min != null && !checked && checkedList.length === min + 1) return;
            var index = checkedList.indexOf(value);
            checked ? checkedList.push(value) : checkedList.splice(index, 1);
            onChange && onChange(e);
            this.props.onChange({ e: e, name: name, value: checkedList });
        }
    }, {
        key: 'handleToggle',
        value: function handleToggle(e) {
            var checked = e.checked;
            var _props2 = this.props,
                options = _props2.options,
                name = _props2.name;

            var checkedList = [];
            if (checked) {
                checkedList = options.map(function (item) {
                    if (typeof item === "string" || typeof item === "number") {
                        return item;
                    }
                    return item.value;
                });
            }
            this.props.onChange({ e: e, name: name, value: checkedList });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props3 = this.props,
                disableAll = _props3.disableAll,
                options = _props3.options,
                style = _props3.style,
                checkAllLabel = _props3.checkAllLabel,
                className = _props3.className;

            var _className = (0, _classnames2['default'])('el-checkbox-group', className);
            var isCheckedAll = this.isCheckedAll;
            var checkedList = this.getValue;
            return _react2['default'].createElement(
                'div',
                { className: _className, style: style },
                _react2['default'].createElement(
                    'div',
                    { className: 'el-checkbox-row el-check-all' },
                    this.hasCheckAll && _react2['default'].createElement(_checkbox2['default'], {
                        label: checkAllLabel,
                        disabled: disableAll,
                        onChange: this.handleToggle.bind(this),
                        checked: options.length && isCheckedAll,
                        indeterminate: checkedList.length && !isCheckedAll
                    })
                ),
                _react2['default'].createElement(
                    'div',
                    { className: 'el-checkbox-row' },
                    options && options.map(function (item, index) {
                        if (typeof item === 'string' || typeof item === "number") {
                            item = { label: item, name: item, value: item, disabled: disableAll };
                        }
                        return _react2['default'].createElement(_checkbox2['default'], _extends({
                            key: index,
                            disabled: disableAll,
                            checked: ~checkedList.indexOf(item.value)
                        }, item, {
                            onChange: _this2.handleChange.bind(_this2, item)
                        }));
                    })
                )
            );
        }
    }, {
        key: 'getValue',
        get: function get() {
            return this.props.value || this.props.checkedList;
        }
    }, {
        key: 'isCheckedAll',
        get: function get() {
            var options = this.props.options;

            var checkedList = this.getValue;
            return !options.filter(function (v) {
                if (typeof v === 'string' || typeof v === "number") {
                    return !~checkedList.indexOf(v);
                } else {
                    return !~checkedList.indexOf(v.value || v.children);
                }
            }).length;
        }
    }, {
        key: 'hasCheckAll',
        get: function get() {
            var _props4 = this.props,
                hasCheckAll = _props4.hasCheckAll,
                max = _props4.max,
                min = _props4.min;

            return hasCheckAll && (max == null || max != null && max >= options.length) && !min;
        }
    }]);

    return CheckGroup;
}(_react.Component);

exports['default'] = CheckGroup;


CheckGroup.propTypes = {
    min: _propTypes2['default'].number,
    max: _propTypes2['default'].number,
    options: _propTypes2['default'].array,
    value: _propTypes2['default'].array,
    disableAll: _propTypes2['default'].bool,
    hasCheckAll: _propTypes2['default'].bool,
    checkedList: _propTypes2['default'].array,
    style: _propTypes2['default'].object,
    onChange: _propTypes2['default'].func,
    className: _propTypes2['default'].string,
    checkAllLabel: _propTypes2['default'].any
};

CheckGroup.defaultProps = {
    options: [],
    checkedList: [],
    disableAll: false,
    hasCheckAll: true,
    checkAllLabel: "全选",
    onChange: _util.noop
};