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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _tagInput = require('../tagInput');

var _tagInput2 = _interopRequireDefault(_tagInput);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _option = require('./option');

var _option2 = _interopRequireDefault(_option);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/8.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


function getMatchData(value, matchCase, data, strict) {
    var output = [];
    value = matchCase ? value : ('' + value).toLowerCase();
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var label = matchCase ? item.label : ('' + item.label).toLowerCase();
        if (!strict && ~label.indexOf(value)) {
            output.push((0, _util.extend)({}, item));
        } else if (strict && label === value) {
            output.push((0, _util.extend)({}, item));
        }
    }
    return output;
}

var Select = function (_Component) {
    _inherits(Select, _Component);

    function Select(props) {
        _classCallCheck(this, Select);

        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

        _this.value = void 0;
        _this.allValue = [];
        _this.isOverDropDown = false;
        _this.state = {
            data: [],
            visible: false,
            preSelected: 0,
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
            (0, _util.addEvent)(document, 'click', this.handleClose.bind(this));
            (0, _util.addEvent)(document, 'keydown', this.handleGlobalKeyDown.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            (0, _util.removeEvent)(document, 'click', this.handleClose.bind(this));
            (0, _util.removeEvent)(document, 'keydown', this.handleGlobalKeyDown.bind(this));
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.getData(nextProps);
        }
    }, {
        key: 'setPreSelect',
        value: function setPreSelect(length, minus) {
            var preSelected = this.state.preSelected;
            length = this.hasSelectAll() ? length + 1 : length;
            if (minus) {
                if (preSelected === 0) {
                    preSelected = length;
                }
                preSelected--;
            } else {
                if (preSelected === length - 1) {
                    preSelected = -1;
                }
                preSelected++;
            }
            this.handleAddPreSelect(preSelected);
        }
    }, {
        key: 'focus',
        value: function focus(mode) {
            if (mode === 'tag') {
                this._el_select_tag_input && this._el_select_tag_input._el_separate_input && this._el_select_tag_input._el_separate_input.focus();
            } else {
                this._el_select_input && this._el_select_input._el_input && this._el_select_input._el_input.focus();
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

            return !!(multiple && selectAll && data.length && renderData.length === data.length);
        }
    }, {
        key: 'isSelectAll',
        value: function isSelectAll(selectedAll) {
            var allValue = this.allValue;
            return !allValue.filter(function (v) {
                return !~selectedAll.indexOf(v);
            }).length;
        }
    }, {
        key: 'getData',
        value: function getData(props) {
            var _this2 = this;

            //TODO#3 远程搜索时，存储搜索到的label
            var i = 0,
                data = [],
                renderData = [],
                allValue = [],
                selectedLabel = [],
                selectedValue = [],
                preSelected = void 0;
            var value = props.value,
                defaultValue = props.defaultValue,
                selectAll = props.selectAll,
                remote = props.remote,
                selectAllText = props.selectAllText,
                children = props.children;

            value = (0, _util.isArr)(value) ? value : value == null ? [] : [value];
            defaultValue = (0, _util.isArr)(defaultValue) ? defaultValue : defaultValue == null ? [] : [defaultValue];
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
                        if (preSelected === undefined) {
                            preSelected = i;
                        }
                    }
                    data.push({ value: value, disabled: disabled, label: children || label });
                    renderData.push({ value: value, disabled: disabled, label: children || label });
                    i++;
                });
            }

            this.allValue = allValue;
            this.setState(function (prev) {
                prev.data = data;
                prev.renderData = renderData;
                prev.selectedLabel = selectedLabel;
                prev.selectedValue = selectedValue;
                if (!prev.visible) prev.preSelected = preSelected || 0;
                if (!remote || remote && !prev.visible) {
                    prev.renderValue = selectAll && selectAllText && _this2.isSelectAll(selectedValue) ? selectAllText : selectedLabel.join(", ");
                }
                return prev;
            });
        }
    }, {
        key: 'handleClose',
        value: function handleClose(e) {
            if (this.state.visible && this.el_select && !(0, _util.contains)(this.el_select, e.target)) {
                var multiple = this.props.multiple;
                if (!multiple || multiple && !(0, _util.contains)(this.el_select_ul, e.target)) {
                    this.hideComponent(e, true);
                }
            }
        }
    }, {
        key: 'handleToggle',
        value: function handleToggle(e) {
            if (this.props.disabled) return;
            if (this.state.visible) {
                this.hideComponent(e);
            } else {
                this.showComponent();
            }
        }
    }, {
        key: 'handleAddPreSelect',
        value: function handleAddPreSelect(preSelected) {
            var child = this.el_select_ul && this.el_select_ul.children && this.el_select_ul.children.item(preSelected);
            if (preSelected >= 0 && child) {
                var offsetTop = child.offsetTop;
                var height = child.offsetHeight;
                var parentHeight = this.el_select_menu.offsetHeight;
                var parentScrollTop = this.el_select_menu.scrollTop;
                if (offsetTop + height - parentHeight - parentScrollTop > 0) {
                    this.el_select_menu.scrollTop = offsetTop + height - parentHeight;
                } else if (offsetTop + height / 2 <= parentScrollTop) {
                    this.el_select_menu.scrollTop = offsetTop < height ? 0 : offsetTop;
                }
                this.setState({ preSelected: preSelected });
            }
        }
    }, {
        key: 'handleGlobalKeyDown',
        value: function handleGlobalKeyDown(e) {
            if (this.isOverDropDown) {
                this.handleKeyDown(e);
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            var _props2 = this.props,
                onKeyDown = _props2.onKeyDown,
                disabled = _props2.disabled;
            var _state2 = this.state,
                renderData = _state2.renderData,
                visible = _state2.visible,
                preSelected = _state2.preSelected;

            var length = renderData.length;
            var keyCode = e.keyCode;
            if (visible && !disabled && length) {
                if (keyCode === _util.KeyCode.DOWN) {
                    e.preventDefault();
                    this.setPreSelect(length);
                } else if (keyCode === _util.KeyCode.UP) {
                    e.preventDefault();
                    this.setPreSelect(length, true);
                } else if (keyCode === _util.KeyCode.ENTER && preSelected >= 0) {
                    e.preventDefault();
                    this.el_select_ul.children.item(preSelected).click();
                } else if (keyCode === _util.KeyCode.TAB || keyCode === _util.KeyCode.ESC) {
                    this.hideComponent(e);
                }
            } else if (keyCode === _util.KeyCode.ENTER) {
                this.handleToggle(e);
            }
            if (onKeyDown) onKeyDown(e);
        }
    }, {
        key: 'handleSeparate',
        value: function handleSeparate(value, e) {
            var _props3 = this.props,
                onMatch = _props3.onMatch,
                matchCase = _props3.matchCase;

            var selectedValue = onMatch ? onMatch(value) : getMatchData(value, matchCase, this.state.data, true);
            if (selectedValue.length) {
                this.handleSelect(0, e, selectedValue[0].value, true);
            }
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var value = e.value;
            var _props4 = this.props,
                onMatch = _props4.onMatch,
                matchCase = _props4.matchCase,
                remote = _props4.remote,
                onSearch = _props4.onSearch;

            onSearch(value);
            this.setState(function (prev) {
                prev.visible = true;
                prev.renderValue = value;
                if (!remote) {
                    var renderData = onMatch ? onMatch(value) : getMatchData(value, matchCase, prev.data);
                    prev.renderData = renderData || [];
                }
                prev.preSelected = prev.renderData.length ? 0 : -1;
                return prev;
            });
        }
    }, {
        key: 'handleSelect',
        value: function handleSelect(preSelected, e, value, selected) {
            var _props5 = this.props,
                mode = _props5.mode,
                name = _props5.name,
                multiple = _props5.multiple,
                onChange = _props5.onChange,
                readOnly = _props5.readOnly;

            if (readOnly) return;
            if (mode === 'tag') {
                this._el_select_tag_input.setState({ input: '' });
            }
            if (multiple) {
                this.setState({ preSelected: preSelected });
                var _value = this.props.value.slice();
                if (selected) {
                    _value.push(value);
                } else {
                    _value.splice(_value.indexOf(value), 1);
                }
                this.value = _value;
                onChange({ e: e, name: name, value: _value, selectedValue: value, selected: selected });
            } else {
                this.value = value;
                onChange({ e: e, name: name, value: value, selectedValue: value, selected: selected });
            }
            !multiple && this.hideComponent(e);
        }
    }, {
        key: 'handleSelectAll',
        value: function handleSelectAll(e, allValue, selected) {
            var _props6 = this.props,
                name = _props6.name,
                onChange = _props6.onChange,
                onSelectAll = _props6.onSelectAll,
                readOnly = _props6.readOnly;

            if (readOnly) return;
            this.setState({ preSelected: 0 });
            if (!selected) allValue = [];
            onChange({ e: e, name: name, value: allValue.slice(), selectedValue: allValue.slice(), selected: selected });
            if (onSelectAll) {
                onSelectAll({ e: e, name: name, value: allValue.slice(), selectedValue: allValue.slice(), selected: selected });
            }
        }
    }, {
        key: 'handleToggleOver',
        value: function handleToggleOver(flag) {
            this.isOverDropDown = flag;
        }
    }, {
        key: 'handleDisableSelect',
        value: function handleDisableSelect() {
            this.setState({ preSelected: -1 });
        }
    }, {
        key: 'showComponent',
        value: function showComponent() {
            var _this3 = this;

            var _props7 = this.props,
                mode = _props7.mode,
                readOnly = _props7.readOnly,
                searchable = _props7.searchable;

            this.setState(function (prev) {
                prev.visible = true;
                if (!prev.renderData.length) {
                    prev.preSelected = -1;
                }
                if (!readOnly && searchable) {
                    prev.renderValue = '';
                }
                return prev;
            }, function () {
                setTimeout(function () {
                    _this3.focus(mode);
                }, 0);
            });
        }
    }, {
        key: 'hideComponent',
        value: function hideComponent(e, noFocus) {
            var _this4 = this;

            var _props8 = this.props,
                mode = _props8.mode,
                selectAll = _props8.selectAll,
                selectAllText = _props8.selectAllText;

            this.isOverDropDown = false;
            this.setState(function (prev) {
                prev.visible = false;
                prev.renderData = [].concat(prev.data);
                prev.renderValue = selectAll && selectAllText && _this4.isSelectAll(prev.selectedValue) ? selectAllText : prev.selectedLabel.join(", ");
                return prev;
            });
            if (noFocus) {
                this.props.onBlur && this.props.onBlur({ e: e });
            } else {
                this.focus(mode);
            }
        }
    }, {
        key: 'optionsRender',
        value: function optionsRender() {
            var _this5 = this;

            var allValue = this.allValue;
            var hasSelectAll = this.hasSelectAll();
            var _state3 = this.state,
                renderData = _state3.renderData,
                selectedValue = _state3.selectedValue,
                preSelected = _state3.preSelected;
            var _props9 = this.props,
                multiple = _props9.multiple,
                searchable = _props9.searchable,
                selectAllText = _props9.selectAllText,
                dropdownClassName = _props9.dropdownClassName,
                dropdownStyle = _props9.dropdownStyle,
                noMatchText = _props9.noMatchText;

            var className = (0, _classnames3['default'])("el-select-dropdown", dropdownClassName || "");
            return _react2['default'].createElement(
                'div',
                { className: className, style: dropdownStyle,
                    onMouseOver: this.handleToggleOver.bind(this, true),
                    onMouseLeave: this.handleToggleOver.bind(this, false),
                    ref: function ref(c) {
                        _this5.el_select_menu = c;
                    } },
                _react2['default'].createElement(
                    'ul',
                    { ref: function ref(c) {
                            _this5.el_select_ul = c;
                        } },
                    searchable && !renderData.length && noMatchText && _react2['default'].createElement(
                        'li',
                        { key: 'no-data', className: 'el-select-no-data' },
                        noMatchText
                    ),
                    hasSelectAll && _react2['default'].createElement(_option2['default'], {
                        key: 'all',
                        multiple: multiple,
                        label: selectAllText,
                        value: allValue.slice(),
                        onChange: this.handleSelectAll.bind(this),
                        selected: this.isSelectAll(selectedValue),
                        className: preSelected === 0 ? 'el-select-selected' : ''
                    }),
                    renderData.map(function (props, index) {
                        var _index = hasSelectAll ? index + 1 : index;
                        return _react2['default'].createElement(_option2['default'], _extends({}, props, {
                            key: props.value,
                            multiple: multiple,
                            onChange: _this5.handleSelect.bind(_this5, _index),
                            selected: !!~selectedValue.indexOf(props.value),
                            onDisableChange: _this5.handleDisableSelect.bind(_this5),
                            className: preSelected === _index ? 'el-select-selected' : ''
                        }));
                    })
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _classnames,
                _this6 = this;

            var _state4 = this.state,
                renderValue = _state4.renderValue,
                selectedLabel = _state4.selectedLabel,
                selectedValue = _state4.selectedValue,
                visible = _state4.visible;

            var icon = visible ? _react2['default'].createElement('i', { className: 'el-caret el-select-open' }) : _react2['default'].createElement('i', { className: 'el-caret' });

            var _props10 = this.props,
                searchable = _props10.searchable,
                readOnly = _props10.readOnly,
                className = _props10.className,
                size = _props10.size,
                style = _props10.style,
                selectAll = _props10.selectAll,
                defaultValue = _props10.defaultValue,
                selectAllText = _props10.selectAllText,
                dropdownClassName = _props10.dropdownClassName,
                tagProps = _props10.tagProps,
                value = _props10.value,
                noMatchText = _props10.noMatchText,
                matchCase = _props10.matchCase,
                onMatch = _props10.onMatch,
                onSearch = _props10.onSearch,
                mode = _props10.mode,
                dropdownStyle = _props10.dropdownStyle,
                multiple = _props10.multiple,
                onChange = _props10.onChange,
                children = _props10.children,
                other = _objectWithoutProperties(_props10, ['searchable', 'readOnly', 'className', 'size', 'style', 'selectAll', 'defaultValue', 'selectAllText', 'dropdownClassName', 'tagProps', 'value', 'noMatchText', 'matchCase', 'onMatch', 'onSearch', 'mode', 'dropdownStyle', 'multiple', 'onChange', 'children']);

            var _className = (0, _classnames3['default'])((_classnames = {
                'el-select-wrapper': true,
                'el-select-options-visible': visible
            }, _defineProperty(_classnames, className, className), _defineProperty(_classnames, 'el-' + size, size), _classnames));
            var _tagProps = multiple ? tagProps : (0, _util.extend)(tagProps || {}, { closeable: false });
            return _react2['default'].createElement(
                'div',
                { className: _className, style: style, ref: function ref(c) {
                        _this6.el_select = c;
                    } },
                mode === "tag" ? _react2['default'].createElement(_tagInput2['default'], _extends({
                    ref: function ref(c) {
                        return _this6._el_select_tag_input = c;
                    },
                    onSeparate: this.handleSeparate.bind(this)
                }, other, {
                    size: size,
                    tagProps: _tagProps,
                    value: selectedLabel,
                    remainTagValue: false,
                    onClick: this.handleToggle.bind(this),
                    onInput: this.handleChange.bind(this),
                    disabledInput: readOnly || !searchable,
                    onKeyDown: this.handleKeyDown.bind(this),
                    onRemove: function onRemove(_ref) {
                        var e = _ref.e,
                            index = _ref.index;
                        return _this6.handleSelect(index, e, selectedValue[index], false);
                    }
                })) : _react2['default'].createElement(_input2['default'], _extends({}, other, {
                    size: size,
                    icon: icon,
                    autoComplete: 'off',
                    value: renderValue,
                    readOnly: readOnly || !searchable,
                    ref: function ref(c) {
                        return _this6._el_select_input = c;
                    },
                    onClick: this.handleToggle.bind(this),
                    onChange: this.handleChange.bind(this),
                    onKeyDown: this.handleKeyDown.bind(this)
                })),
                visible && this.optionsRender()
            );
        }
    }]);

    return Select;
}(_react.Component);

exports['default'] = Select;


Select.propTypes = {
    onBlur: _propTypes2['default'].func,
    onMatch: _propTypes2['default'].func,
    onFocus: _propTypes2['default'].func,
    multiple: _propTypes2['default'].bool,
    onSearch: _propTypes2['default'].func,
    matchCase: _propTypes2['default'].bool,
    selectAll: _propTypes2['default'].bool,
    searchable: _propTypes2['default'].bool,
    onSelectAll: _propTypes2['default'].func,
    remote: _propTypes2['default'].bool,
    noMatchText: _propTypes2['default'].string,
    mode: _propTypes2['default'].oneOf(['tag']),
    dropdownStyle: _propTypes2['default'].object,
    selectAllText: _propTypes2['default'].string,
    dropdownClassName: _propTypes2['default'].string,
    size: _propTypes2['default'].oneOf(['default', 'large', 'small'])
};

Select.defaultProps = {
    value: "",
    onChange: _util.noop,
    onSearch: _util.noop,
    defaultValue: "",
    selectAllText: "全选",
    noMatchText: "暂无匹配数据"
};