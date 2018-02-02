/**
 * Created by elly on 2017/4/8.
 */
import React, {Component}                                              from 'react';
import PropTypes                                                       from 'prop-types';
import classnames                                                      from 'classnames';
import TagInput                                                        from '../tagInput';
import Input                                                           from '../input';
import Option                                                          from './option';
import {isArr, extend, contains, addEvent, removeEvent, KeyCode, noop} from '../util';

function getMatchData(value, matchCase, data, strict) {
    let output = [];
    value = matchCase ? value : `${value}`.toLowerCase();
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let label = matchCase ? item.label : `${item.label}`.toLowerCase();
        if (!strict && ~label.indexOf(value)) {
            output.push(extend({}, item));
        } else if (strict && label === value) {
            output.push(extend({}, item));
        }
    }
    return output;
}

export default class Select extends Component {
    constructor(props) {
        super(props);
        this.value = void 0;
        this.allValue = [];
        this.isOverDropDown = false;
        this.state = {
            data: [],
            visible: false,
            preSelected: 0,
            renderValue: '',
            selectedValue: [],
            selectedLabel: []
        };
    }

    componentWillMount() {
        this.getData(this.props);
    }

    componentDidMount() {
        addEvent(document, 'click', this.handleClose.bind(this));
        addEvent(document, 'keydown', this.handleGlobalKeyDown.bind(this));
    }

    componentWillUnmount() {
        removeEvent(document, 'click', this.handleClose.bind(this));
        removeEvent(document, 'keydown', this.handleGlobalKeyDown.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        this.getData(nextProps);
    }

    setPreSelect(length, minus) {
        let preSelected = this.state.preSelected;
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

    hasSelectAll() {
        let {data, renderData} = this.state;
        let {multiple, selectAll} = this.props;
        return !!(multiple && selectAll && data.length && renderData.length === data.length);
    }

    isSelectAll(selectedAll) {
        let allValue = this.allValue;
        return !allValue.filter(v => {
            return !~selectedAll.indexOf(v);
        }).length;
    }

    getData(props) {
        //TODO#3 远程搜索时，存储搜索到的label
        let i = 0, data = [], renderData = [], allValue = [], selectedLabel = [], selectedValue = [], preSelected;
        let {value, defaultValue, selectAll, remote, selectAllText, children} = props;
        value = isArr(value) ? value : (value == null ? [] : [value]);
        defaultValue = isArr(defaultValue) ? defaultValue : (defaultValue == null ? [] : [defaultValue]);
        selectedValue = value.length ? value : defaultValue;
        if (children) {
            React.Children.map(children, (elm) => {
                if (!elm) return;
                let {value, disabled, label, children} = elm.props;
                let index = selectedValue.indexOf(value);
                allValue.push(value);
                if (~index) {
                    selectedLabel[index] = children || label;
                    if (preSelected === undefined) {
                        preSelected = i;
                    }
                }
                data.push({value, disabled, label: children || label});
                renderData.push({value, disabled, label: children || label});
                i++;
            });
        }

        this.allValue = allValue;
        this.setState(prev => {
            prev.data = data;
            prev.renderData = renderData;
            prev.selectedLabel = selectedLabel;
            prev.selectedValue = selectedValue;
            if (!prev.visible) prev.preSelected = preSelected || 0;
            if (!remote || (remote && !prev.visible)) {
                prev.renderValue = selectAll && selectAllText && this.isSelectAll(selectedValue) ? selectAllText : selectedLabel.join(", ");
            }
            return prev;
        });
    }

    handleClose(e) {
        if (this.state.visible && this.el_select && !contains(this.el_select, e.target)) {
            let multiple = this.props.multiple;
            if (!multiple || (multiple && !contains(this.el_select_ul, e.target))) {
                this.hideComponent(e);
            }
        }
    }

    handleToggle(e) {
        if (this.props.disabled) return;
        if (this.state.visible) {
            this.hideComponent(e);
        } else {
            this.showComponent();
        }
    }

    handleAddPreSelect(preSelected) {
        let child = this.el_select_ul && this.el_select_ul.children && this.el_select_ul.children.item(preSelected);
        if (preSelected >= 0 && child) {
            let offsetTop = child.offsetTop;
            let height = child.offsetHeight;
            let parentHeight = this.el_select_menu.offsetHeight;
            let parentScrollTop = this.el_select_menu.scrollTop;
            if (offsetTop + height - parentHeight - parentScrollTop > 0) {
                this.el_select_menu.scrollTop = offsetTop + height - parentHeight;
            } else if (offsetTop + height / 2 <= parentScrollTop) {
                this.el_select_menu.scrollTop = offsetTop < height ? 0 : offsetTop;
            }
            this.setState({preSelected});
        }
    }

    handleGlobalKeyDown(e) {
        if (this.isOverDropDown) {
            this.handleKeyDown(e);
        }
    }

    handleKeyDown(e) {
        let {onKeyDown, disabled} = this.props;
        let {renderData, visible, preSelected} = this.state;
        let length = renderData.length;
        let keyCode = e.keyCode;
        if (visible && !disabled && length) {
            if (keyCode === KeyCode.DOWN) {
                e.preventDefault();
                this.setPreSelect(length);
            } else if (keyCode === KeyCode.UP) {
                e.preventDefault();
                this.setPreSelect(length, true);
            } else if (keyCode === KeyCode.ENTER && preSelected >= 0) {
                this.el_select_ul.children.item(preSelected).click();
            } else if (keyCode === KeyCode.TAB) {
                this.hideComponent(e);
            }
        } else if (keyCode === KeyCode.ENTER) {
            this.handleToggle(e);
        }
        if (onKeyDown) onKeyDown(e);
    }

    handleSeparate(value, e) {
        let {onMatch, matchCase} = this.props;
        let selectedValue = onMatch ? onMatch(value) : getMatchData(value, matchCase, this.state.data, true);
        if (selectedValue.length) {
            this.handleSelect(0, e, selectedValue[0].value, true);
        }
    }

    handleChange(e) {
        let {value} = e;
        let {onMatch, matchCase, remote, onSearch} = this.props;
        onSearch(value);
        this.setState(prev => {
            prev.visible = true;
            prev.renderValue = value;
            if (!remote) {
                let renderData = onMatch ? onMatch(value) :
                    getMatchData(value, matchCase, prev.data);
                prev.renderData = renderData || [];
            }
            prev.preSelected = prev.renderData.length ? 0 : -1;
            return prev;
        });
    }

    handleSelect(preSelected, e, value, selected) {
        let {mode, name, multiple, onChange, readOnly} = this.props;
        if (readOnly) return;
        if (mode === 'tag') {
            this._el_select_tag_input.setState({input: ''});
        }
        if (multiple) {
            this.setState({preSelected});
            let _value = this.props.value.slice();
            if (selected) {
                _value.push(value);
            } else {
                _value.splice(_value.indexOf(value), 1);
            }
            this.value = _value;
            onChange({e, name, value: _value, selectedValue: value, selected});
        } else {
            this.value = value;
            onChange({e, name, value, selectedValue: value, selected});
        }
        !multiple && this.hideComponent(e);
    }

    handleSelectAll(e, allValue, selected) {
        let {name, onChange, onSelectAll, readOnly} = this.props;
        if (readOnly) return;
        this.setState({preSelected: 0});
        if (!selected) allValue = [];
        onChange({e, name, value: allValue.slice(), selectedValue: allValue.slice(), selected});
        if (onSelectAll) {
            onSelectAll({e, name, value: allValue.slice(), selectedValue: allValue.slice(), selected});
        }
    }

    handleToggleOver(flag) {
        this.isOverDropDown = flag;
    }

    handleDisableSelect() {
        this.setState({preSelected: -1});
    }

    showComponent() {
        let {readOnly, searchable} = this.props;
        this.setState(prev => {
            prev.visible = true;
            if (!prev.renderData.length) {
                prev.preSelected = -1;
            }
            if (!readOnly && searchable) {
                prev.renderValue = '';
            }
            return prev;
        });
    }

    hideComponent(e) {
        let {mode, selectAll, selectAllText} = this.props;
        this.isOverDropDown = false;
        this.setState(prev => {
            prev.visible = false;
            prev.renderData = [].concat(prev.data);
            prev.renderValue = selectAll && selectAllText && this.isSelectAll(prev.selectedValue) ? selectAllText : prev.selectedLabel.join(", ");
            return prev;
        });
        if (mode === 'tag') {
            this._el_select_tag_input && this._el_select_tag_input._el_separate_input && this._el_select_tag_input._el_separate_input.focus();
        } else {
            this._el_select_input && this._el_select_input._el_input && this._el_select_input._el_input.focus();
        }
        this.props.onBlur && this.props.onBlur({e});
    }

    optionsRender() {
        let allValue = this.allValue;
        let hasSelectAll = this.hasSelectAll();
        let {renderData, selectedValue, preSelected} = this.state;
        let {multiple, searchable, selectAllText, dropdownClassName, dropdownStyle, noMatchText} = this.props;
        let className = classnames("el-select-dropdown", dropdownClassName || "");
        return (
            <div className={className} style={dropdownStyle}
                 onMouseOver={this.handleToggleOver.bind(this, true)}
                 onMouseLeave={this.handleToggleOver.bind(this, false)}
                 ref={c => {
                     this.el_select_menu = c;
                 }}>
                <ul ref={c => {
                    this.el_select_ul = c;
                }}>
                    {(searchable && !renderData.length && noMatchText) &&
                    <li key="no-data" className="el-select-no-data">{noMatchText}</li>}
                    {hasSelectAll &&
                    <Option
                        key="all"
                        multiple={multiple}
                        label={selectAllText}
                        value={allValue.slice()}
                        onChange={this.handleSelectAll.bind(this)}
                        selected={this.isSelectAll(selectedValue)}
                        className={preSelected === 0 ? 'el-select-selected' : ''}
                    />}
                    {renderData.map((props, index) => {
                        let _index = hasSelectAll ? index + 1 : index;
                        return (
                            <Option
                                {...props}
                                key={props.value}
                                multiple={multiple}
                                onChange={this.handleSelect.bind(this, _index)}
                                selected={!!~selectedValue.indexOf(props.value)}
                                onDisableChange={this.handleDisableSelect.bind(this)}
                                className={preSelected === _index ? 'el-select-selected' : ''}
                            />
                        );
                    })}
                </ul>
            </div>
        );
    }

    render() {
        let {renderValue, selectedLabel, selectedValue, visible} = this.state;
        let icon = visible ? <i className="el-caret el-select-open"/> : <i className="el-caret"/>;
        let {
            searchable, readOnly, className, size, style,
            selectAll, defaultValue, selectAllText, dropdownClassName, tagProps,
            value, noMatchText, matchCase, onMatch, onSearch, mode,
            dropdownStyle, multiple, onChange, children, ...other
        } = this.props;
        let _className = classnames({
            'el-select-wrapper': true,
            'el-select-options-visible': visible,
            [className]: className,
            [`el-${size}`]: size
        });
        let _tagProps = multiple ? tagProps : extend(tagProps || {}, {closeable: false});
        return (
            <div className={_className} style={style} ref={(c) => {
                this.el_select = c;
            }}>
                {mode === "tag" ?
                    <TagInput
                        ref={c => this._el_select_tag_input = c}
                        onSeparate={this.handleSeparate.bind(this)}
                        {...other}
                        size={size}
                        tagProps={_tagProps}
                        value={selectedLabel}
                        remainTagValue={false}
                        onClick={this.handleToggle.bind(this)}
                        onInput={this.handleChange.bind(this)}
                        disabledInput={readOnly || !searchable}
                        onKeyDown={this.handleKeyDown.bind(this)}
                        onRemove={({e, index}) => this.handleSelect(index, e, selectedValue[index], false)}
                    /> :
                    <Input
                        {...other}
                        size={size}
                        icon={icon}
                        autoComplete="off"
                        value={renderValue}
                        readOnly={readOnly || !searchable}
                        ref={c => this._el_select_input = c}
                        onClick={this.handleToggle.bind(this)}
                        onChange={this.handleChange.bind(this)}
                        onKeyDown={this.handleKeyDown.bind(this)}
                    />}
                {visible && this.optionsRender()}
            </div>
        );
    }
}

Select.propTypes = {
    onBlur: PropTypes.func,
    onMatch: PropTypes.func,
    onFocus: PropTypes.func,
    multiple: PropTypes.bool,
    onSearch: PropTypes.func,
    matchCase: PropTypes.bool,
    selectAll: PropTypes.bool,
    searchable: PropTypes.bool,
    onSelectAll: PropTypes.func,
    remote: PropTypes.bool,
    noMatchText: PropTypes.string,
    mode: PropTypes.oneOf(['tag']),
    dropdownStyle: PropTypes.object,
    selectAllText: PropTypes.string,
    dropdownClassName: PropTypes.string,
    size: PropTypes.oneOf(['default', 'large', 'small'])
};

Select.defaultProps = {
    value: "",
    onChange: noop,
    onSearch: noop,
    defaultValue: "",
    selectAllText: "全选",
    noMatchText: "暂无匹配数据",
};