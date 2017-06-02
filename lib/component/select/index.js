'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _option = require('./option');

var _option2 = _interopRequireDefault(_option);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/8.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Select = function (_Component) {
    _inherits(Select, _Component);

    function Select(props) {
        _classCallCheck(this, Select);

        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

        _this.state = {
            data: [],
            focus: false,
            allValue: [],
            visible: false,
            searchValue: '',
            renderValue: '',
            selectedValue: [],
            selectedLabel: []
        };
        return _this;
    }

    _createClass(Select, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.getData(this.props);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            (0, _util.addEvent)(window, 'resize', this.addStyle.bind(this));
            (0, _util.addEvent)(document, 'click', this.handleClose.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.container) {
                document.body.removeChild(this.container);
                this.container = null;
            }
            (0, _util.removeEvent)(window, 'resize', this.addStyle.bind(this));
            (0, _util.removeEvent)(document, 'click', this.handleClose.bind(this));
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.getData(nextProps);
        }
    }, {
        key: 'getData',
        value: function getData(props) {
            var data = [],
                renderData = [],
                allValue = [],
                selectedLabel = [],
                selectedValue = [];
            var value = props.value;
            var defaultValue = props.defaultValue;
            var children = props.children;

            value = (0, _util.isArr)(value) ? value : !value && value != '0' ? [] : [value];
            defaultValue = (0, _util.isArr)(defaultValue) ? defaultValue : !defaultValue && defaultValue != '0' ? [] : [defaultValue];
            selectedValue = value.length ? value : defaultValue;
            if (children) {
                _react2['default'].Children.map(children, function (elm) {
                    var _elm$props = elm.props;
                    var value = _elm$props.value;
                    var disabled = _elm$props.disabled;
                    var label = _elm$props.label;
                    var children = _elm$props.children;

                    var index = selectedValue.indexOf(value);
                    allValue.push(value);
                    if (~index) {
                        selectedLabel[index] = children || label;
                    }
                    data.push({ value: value, disabled: disabled, label: children || label });
                    renderData.push({ value: value, disabled: disabled, label: children || label });
                });
            }
            this.setState({
                data: data,
                allValue: allValue,
                renderData: renderData,
                selectedValue: selectedValue,
                selectedLabel: selectedLabel,
                renderValue: selectedLabel.join(", ")
            });
        }
    }, {
        key: 'getPosition',
        value: function getPosition() {
            if (!this.container) return;
            var clientHeight = this.container.clientHeight;

            var _el_select$getBoundin = this.el_select.getBoundingClientRect();

            var top = _el_select$getBoundin.top;
            var left = _el_select$getBoundin.left;
            var bottom = _el_select$getBoundin.bottom;
            var width = _el_select$getBoundin.width;

            var scrollLeft = document.body.scrollLeft || document.documentElement.scrollTop;
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            top += scrollTop;
            left += scrollLeft;
            bottom += scrollTop;
            var leftHeight = Math.max(window.innerHeight, document.body.clientHeight);
            var leftTopHeight = leftHeight - top;
            var leftBottomHeight = leftHeight - bottom;
            this.style = {
                width: width + 'px',
                top: bottom + 'px',
                left: left + 'px'
            };
            if (clientHeight > leftTopHeight && clientHeight > leftBottomHeight && leftBottomHeight < leftTopHeight) {
                this.style.top = top - clientHeight + 'px';
            }
        }
    }, {
        key: 'handleClose',
        value: function handleClose(e) {
            if (this.state.visible && this.el_select && !(0, _util.contains)(this.el_select, e.target)) {
                this.hideComponent();
            }
        }
    }, {
        key: 'handleToggle',
        value: function handleToggle() {
            if (this.props.disabled) return;
            if (this.state.visible) {
                this.hideComponent();
            } else {
                this.renderComponent();
            }
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var _this2 = this;

            var value = e.value;
            var _props = this.props;
            var onMatch = _props.onMatch;
            var matchCase = _props.matchCase;

            this.setState(function (prev) {
                prev.renderValue = value;
                var renderData = onMatch ? onMatch(value) : _this2.handleTryMatch(value, matchCase, [].concat(prev.data));
                prev.renderData = renderData || [];
                return prev;
            }, function () {
                _this2.renderComponent();
            });
        }
    }, {
        key: 'handleTryMatch',
        value: function handleTryMatch(value, matchCase, data) {
            var output = [];
            value = matchCase ? value : ('' + value).toLowerCase();
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var label = matchCase ? item.label : ('' + item.label).toLowerCase();
                if (~label.indexOf(value)) {
                    output.push((0, _util.extend)({}, item));
                }
            }
            return output;
        }
    }, {
        key: 'handleToggleInput',
        value: function handleToggleInput(focus) {
            this.setState(function (prev) {
                prev.focus = focus;
                if (!focus) {
                    prev.renderData = [].concat(prev.data);
                    prev.renderValue = prev.selectedLabel.join(", ");
                }
                return prev;
            });
        }
    }, {
        key: 'handleSelect',
        value: function handleSelect(e, value, selected) {
            var _props2 = this.props;
            var name = _props2.name;
            var onChange = _props2.onChange;
            var readOnly = _props2.readOnly;

            if (readOnly) return;
            onChange({ e: e, name: name, value: value, selected: selected });
            this.handleToggle();
        }
    }, {
        key: 'handleSelectAll',
        value: function handleSelectAll(e, allValue, selected) {
            var selectedValue = this.state.selectedValue;
            var _props3 = this.props;
            var name = _props3.name;
            var onChange = _props3.onChange;
            var onSelectAll = _props3.onSelectAll;
            var readOnly = _props3.readOnly;

            if (readOnly) return;
            if (!onSelectAll) {
                allValue.map(function (value) {
                    if (selected && ~selectedValue.indexOf(value)) return;
                    onChange({ e: e, name: name, value: value, selected: selected });
                });
            } else {
                if (!selected) allValue = [];
                onSelectAll({ e: e, name: name, value: allValue.slice(), selected: selected });
            }
            this.handleToggle();
        }
    }, {
        key: 'renderComponent',
        value: function renderComponent() {
            var _this3 = this;

            if (!this.container) {
                this.container = document.createElement('div');
                this.container.style.position = 'absolute';
                this.container.style.left = '-9999px';
                this.container.style.top = '-9999px';
                this.container.style.width = 0;
                document.body.appendChild(this.container);
            }
            _reactDom2['default'].unstable_renderSubtreeIntoContainer(this, this.optionsRender(), this.container);
            this.setState({ visible: true }, function () {
                _this3.addStyle();
            });
        }
    }, {
        key: 'hideComponent',
        value: function hideComponent() {
            if (this.container) {
                this.container.style.display = 'none';
            }
            this.setState({ visible: false });
        }
    }, {
        key: 'addStyle',
        value: function addStyle() {
            if (!this.state.visible || !this.container) return;
            this.getPosition();
            for (var style in this.style) {
                this.container.style[style] = this.style[style];
            }
            this.container.style.display = 'block';
        }
    }, {
        key: 'optionsRender',
        value: function optionsRender() {
            var _this4 = this;

            var _state = this.state;
            var data = _state.data;
            var renderData = _state.renderData;
            var allValue = _state.allValue;
            var selectedValue = _state.selectedValue;
            var _props4 = this.props;
            var multiple = _props4.multiple;
            var searchable = _props4.searchable;
            var selectedAll = _props4.selectedAll;
            var selectedAllText = _props4.selectedAllText;
            var noMatchText = _props4.noMatchText;

            return _react2['default'].createElement(
                'div',
                { className: 'el-select-dropdown' },
                _react2['default'].createElement(
                    'ul',
                    null,
                    searchable && !renderData.length && _react2['default'].createElement(
                        'li',
                        { key: 'no-data', className: 'el-select-no-data' },
                        noMatchText
                    ),
                    multiple && selectedAll && renderData.length === data.length && _react2['default'].createElement(_option2['default'], {
                        key: 'all',
                        multiple: multiple,
                        label: selectedAllText,
                        value: allValue.slice(),
                        onChange: this.handleSelectAll.bind(this),
                        selected: allValue.slice().sort().join("") === selectedValue.slice().sort().join("")
                    }),
                    renderData.map(function (props) {
                        return _react2['default'].createElement(_option2['default'], _extends({}, props, {
                            key: props.value,
                            multiple: multiple,
                            onChange: _this4.handleSelect.bind(_this4),
                            selected: !!~selectedValue.indexOf(props.value)
                        }));
                    })
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var _state2 = this.state;
            var renderValue = _state2.renderValue;
            var visible = _state2.visible;

            var icon = visible ? _react2['default'].createElement('i', { className: 'el-caret el-select-open' }) : _react2['default'].createElement('i', { className: 'el-caret' });
            var _props5 = this.props;
            var size = _props5.size;
            var style = _props5.style;
            var value = _props5.value;
            var noMatchText = _props5.noMatchText;
            var matchCase = _props5.matchCase;
            var searchable = _props5.searchable;
            var selectedAll = _props5.selectedAll;
            var defaultValue = _props5.defaultValue;
            var selectedAllText = _props5.selectedAllText;
            var multiple = _props5.multiple;
            var onChange = _props5.onChange;
            var className = _props5.className;
            var children = _props5.children;

            var other = _objectWithoutProperties(_props5, ['size', 'style', 'value', 'noMatchText', 'matchCase', 'searchable', 'selectedAll', 'defaultValue', 'selectedAllText', 'multiple', 'onChange', 'className', 'children']);

            var _className = (0, _classnames2['default'])('el-select-wrapper', className, size ? 'el-' + size : '');
            return _react2['default'].createElement(
                'div',
                { className: _className, style: style, ref: function ref(c) {
                        _this5.el_select = c;
                    } },
                _react2['default'].createElement(_input2['default'], _extends({}, other, {
                    size: size,
                    icon: icon,
                    value: renderValue,
                    readOnly: searchable ? false : true,
                    onClick: this.handleToggle.bind(this),
                    onChange: this.handleChange.bind(this),
                    onFocus: this.handleToggleInput.bind(this, true),
                    onBlur: this.handleToggleInput.bind(this, false)
                }))
            );
        }
    }]);

    return Select;
}(_react.Component);

exports['default'] = Select;


Select.propTypes = {
    onMatch: _propTypes2['default'].func,
    multiple: _propTypes2['default'].bool,
    matchCase: _propTypes2['default'].bool,
    searchable: _propTypes2['default'].bool,
    selectedAll: _propTypes2['default'].bool,
    onSelectedAll: _propTypes2['default'].func,
    noMatchText: _propTypes2['default'].string,
    selectedAllText: _propTypes2['default'].string,
    size: _propTypes2['default'].oneOf(['default', 'large', 'small'])
};

Select.defaultProps = {
    value: "",
    selectedAllText: "全选",
    noMatchText: "暂无匹配数据",
    onChange: function onChange() {},
    defaultValue: ""
};