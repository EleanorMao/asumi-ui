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


function renderComponent(instance) {
    if (!instance.container) {
        instance.container = instance.getContainer();
    }
    _reactDom2['default'].unstable_renderSubtreeIntoContainer(instance, instance.optionsRender(), instance.container);
}

var Select = function (_Component) {
    _inherits(Select, _Component);

    function Select(props) {
        _classCallCheck(this, Select);

        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

        _this.index = -1;
        _this.state = {
            data: [],
            focus: false,
            allValue: [],
            visible: false,
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
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.state.visible && !this.props.closeAfterSelect) renderComponent(this);
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
        key: 'setPreSelect',
        value: function setPreSelect(length, minus) {
            length = this.hasSelectAll() ? length + 1 : length;
            if (minus) {
                if (this.index === 0) {
                    this.index = length;
                }
                this.index--;
            } else {
                if (this.index === length - 1) {
                    this.index = -1;
                }
                this.index++;
            }
        }
    }, {
        key: 'hasSelectAll',
        value: function hasSelectAll() {
            var _state = this.state,
                data = _state.data,
                renderData = _state.renderData;
            var _props = this.props,
                multiple = _props.multiple,
                selectAll = _props.selectAll;

            return !!(multiple && selectAll && renderData.length === data.length);
        }
    }, {
        key: 'getData',
        value: function getData(props) {
            var data = [],
                renderData = [],
                allValue = [],
                selectedLabel = [],
                selectedValue = [];
            var value = props.value,
                defaultValue = props.defaultValue,
                children = props.children;

            value = (0, _util.isArr)(value) ? value : !value && value != '0' ? [] : [value];
            defaultValue = (0, _util.isArr)(defaultValue) ? defaultValue : !defaultValue && defaultValue != '0' ? [] : [defaultValue];
            selectedValue = value.length ? value : defaultValue;
            if (children) {
                _react2['default'].Children.map(children, function (elm) {
                    if (!elm) return;
                    var _elm$props = elm.props,
                        value = _elm$props.value,
                        disabled = _elm$props.disabled,
                        label = _elm$props.label,
                        children = _elm$props.children;

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
        key: 'getMatchData',
        value: function getMatchData(value, matchCase, data) {
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
        key: 'getPosition',
        value: function getPosition() {
            if (!this.container) return;
            var clientHeight = this.container.clientHeight;

            var _el_select$getBoundin = this.el_select.getBoundingClientRect(),
                top = _el_select$getBoundin.top,
                left = _el_select$getBoundin.left,
                bottom = _el_select$getBoundin.bottom,
                width = _el_select$getBoundin.width;

            var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
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
            if (document.querySelector('.el-modal-wrapper')) {
                this.style.zIndex = 99999;
            }
        }
    }, {
        key: 'getContainer',
        value: function getContainer() {
            this.container = document.createElement('div');
            this.container.style.position = 'absolute';
            this.container.style.left = '-9999px';
            this.container.style.top = '-9999px';
            this.container.style.width = 0;
            document.body.appendChild(this.container);
            return this.container;
        }
    }, {
        key: 'handleClose',
        value: function handleClose(e) {
            if (this.state.visible && this.el_select && !(0, _util.contains)(this.el_select, e.target)) {
                var closeAfterSelect = this.props.closeAfterSelect;
                if (closeAfterSelect || !closeAfterSelect && !(0, _util.contains)(this.el_select_ul, e.target)) {
                    this.hideComponent();
                }
            }
        }
    }, {
        key: 'handleToggle',
        value: function handleToggle() {
            if (this.props.disabled) return;
            if (this.state.visible) {
                this.hideComponent();
            } else {
                renderComponent(this);
                this.showComponent();
            }
        }
    }, {
        key: 'handleRemoveClass',
        value: function handleRemoveClass() {
            if (this.index >= 0 && this.el_select_ul.children[this.index]) {
                this.el_select_ul.children[this.index].classList.remove('el-select-selected');
            }
        }
    }, {
        key: 'handleAddClass',
        value: function handleAddClass() {
            if (this.index >= 0 && this.el_select_ul.children[this.index]) {
                this.el_select_ul.children[this.index].classList.add('el-select-selected');
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            var _props2 = this.props,
                onKeyDown = _props2.onKeyDown,
                disabled = _props2.disabled;

            var renderData = this.state.renderData;
            var length = renderData.length;
            var keyCode = e.keyCode;
            if (this.state.visible && !disabled && length) {
                if (keyCode === _util.KeyCode.DOWN) {
                    e.preventDefault();
                    this.handleRemoveClass();
                    this.setPreSelect(length);
                    this.handleAddClass();
                } else if (keyCode === _util.KeyCode.UP) {
                    e.preventDefault();
                    this.handleRemoveClass();
                    this.setPreSelect(length, true);
                    this.handleAddClass();
                } else if (keyCode === _util.KeyCode.ENTER && this.index >= 0) {
                    this.el_select_ul.children[this.index].click();
                }
            } else if (keyCode === _util.KeyCode.ENTER) {
                this.handleToggle();
            }
            if (onKeyDown) onKeyDown(e);
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var _this2 = this;

            var value = e.value;
            var _props3 = this.props,
                onMatch = _props3.onMatch,
                matchCase = _props3.matchCase;

            this.setState(function (prev) {
                prev.renderValue = value;
                var renderData = onMatch ? onMatch(value) : _this2.getMatchData(value, matchCase, [].concat(prev.data));
                prev.renderData = renderData || [];
                return prev;
            }, function () {
                renderComponent(_this2);
                if (!_this2.state.visible) _this2.showComponent();
            });
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
            var _props4 = this.props,
                name = _props4.name,
                multiple = _props4.multiple,
                onChange = _props4.onChange,
                readOnly = _props4.readOnly;

            if (readOnly) return;
            if (multiple) {
                var _value = this.props.value.slice();
                if (selected) {
                    _value.push(value);
                } else {
                    _value.splice(_value.indexOf(value), 1);
                }
                onChange({ e: e, name: name, value: _value, selectedValue: value, selected: selected });
            } else {
                onChange({ e: e, name: name, value: value, selectedValue: value, selected: selected });
            }
        }
    }, {
        key: 'handleSelectAll',
        value: function handleSelectAll(e, allValue, selected) {
            var _props5 = this.props,
                name = _props5.name,
                onChange = _props5.onChange,
                onSelectAll = _props5.onSelectAll,
                readOnly = _props5.readOnly;

            if (readOnly) return;
            if (!selected) allValue = [];
            onChange({ e: e, name: name, value: allValue.slice(), selectedValue: allValue.slice(), selected: selected });
            if (onSelectAll) {
                onSelectAll({ e: e, name: name, value: allValue.slice(), selectedValue: allValue.slice(), selected: selected });
            }
        }
    }, {
        key: 'handleDisableSelect',
        value: function handleDisableSelect() {
            this.handleRemoveClass();
            this.index = -1;
        }
    }, {
        key: 'showComponent',
        value: function showComponent() {
            this.setState({ visible: true }, this.addStyle.bind(this));
        }
    }, {
        key: 'hideComponent',
        value: function hideComponent() {
            if (this.container) {
                this.container.style.display = 'none';
            }
            this.handleRemoveClass();
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
            var _this3 = this;

            var _state2 = this.state,
                renderData = _state2.renderData,
                allValue = _state2.allValue,
                selectedValue = _state2.selectedValue;
            var _props6 = this.props,
                multiple = _props6.multiple,
                searchable = _props6.searchable,
                selectAllText = _props6.selectAllText,
                noMatchText = _props6.noMatchText;

            return _react2['default'].createElement(
                'div',
                { className: 'el-select-dropdown' },
                _react2['default'].createElement(
                    'ul',
                    { ref: function ref(c) {
                            _this3.el_select_ul = c;
                        } },
                    searchable && !renderData.length && _react2['default'].createElement(
                        'li',
                        { key: 'no-data', className: 'el-select-no-data' },
                        noMatchText
                    ),
                    this.hasSelectAll() && _react2['default'].createElement(_option2['default'], {
                        key: 'all',
                        multiple: multiple,
                        label: selectAllText,
                        value: allValue.slice(),
                        onChange: this.handleSelectAll.bind(this),
                        selected: allValue.slice().sort().join("") === selectedValue.slice().sort().join("")
                    }),
                    renderData.map(function (props) {
                        return _react2['default'].createElement(_option2['default'], _extends({}, props, {
                            key: props.value,
                            multiple: multiple,
                            onChange: _this3.handleSelect.bind(_this3),
                            onDisableChange: _this3.handleDisableSelect.bind(_this3),
                            selected: !!~selectedValue.indexOf(props.value)
                        }));
                    })
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _state3 = this.state,
                renderValue = _state3.renderValue,
                visible = _state3.visible;

            var icon = visible ? _react2['default'].createElement('i', { className: 'el-caret el-select-open' }) : _react2['default'].createElement('i', { className: 'el-caret' });

            var _props7 = this.props,
                size = _props7.size,
                style = _props7.style,
                value = _props7.value,
                noMatchText = _props7.noMatchText,
                matchCase = _props7.matchCase,
                onMatch = _props7.onMatch,
                searchable = _props7.searchable,
                selectAll = _props7.selectAll,
                defaultValue = _props7.defaultValue,
                selectAllText = _props7.selectAllText,
                multiple = _props7.multiple,
                onChange = _props7.onChange,
                className = _props7.className,
                children = _props7.children,
                closeAfterSelect = _props7.closeAfterSelect,
                other = _objectWithoutProperties(_props7, ['size', 'style', 'value', 'noMatchText', 'matchCase', 'onMatch', 'searchable', 'selectAll', 'defaultValue', 'selectAllText', 'multiple', 'onChange', 'className', 'children', 'closeAfterSelect']);

            var _className = (0, _classnames2['default'])('el-select-wrapper', className, size ? 'el-' + size : '');
            return _react2['default'].createElement(
                'div',
                { className: _className, style: style, ref: function ref(c) {
                        _this4.el_select = c;
                    } },
                _react2['default'].createElement(_input2['default'], _extends({}, other, {
                    size: size,
                    icon: icon,
                    autoComplete: 'off',
                    value: renderValue,
                    readOnly: !searchable,
                    onClick: this.handleToggle.bind(this),
                    onChange: this.handleChange.bind(this),
                    onKeyDown: this.handleKeyDown.bind(this),
                    onFocus: this.handleToggleInput.bind(this, true),
                    onBlur: closeAfterSelect ? this.handleToggleInput.bind(this, false) : null
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
    selectAll: _propTypes2['default'].bool,
    onSelectAll: _propTypes2['default'].func,
    noMatchText: _propTypes2['default'].string,
    closeAfterSelect: _propTypes2['default'].bool,
    selectAllText: _propTypes2['default'].string,
    size: _propTypes2['default'].oneOf(['default', 'large', 'small'])
};

Select.defaultProps = {
    value: "",
    closeAfterSelect: true,
    selectAllText: "全选",
    noMatchText: "暂无匹配数据",
    onChange: _util.noop,
    defaultValue: ""
};