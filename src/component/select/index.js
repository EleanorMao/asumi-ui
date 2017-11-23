/**
 * Created by elly on 2017/4/8.
 */
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Input from '../input';
import Option from './option';
import {isArr, extend, contains, addEvent, removeEvent, KeyCode, noop} from '../util';

function renderComponent(instance) {
    if (!instance.container) {
        instance.container = instance.getContainer();
    }
    ReactDOM.unstable_renderSubtreeIntoContainer(instance, instance.optionsRender(), instance.container)
}

export default class Select extends Component {
    constructor(props) {
        super(props);
        this.index = -1;
        this.state = {
            data: [],
            focus: false,
            allValue: [],
            visible: false,
            renderValue: '',
            selectedValue: [],
            selectedLabel: []
        }
    }

    componentWillMount() {
        this.getData(this.props);
    }

    componentDidMount() {
        addEvent(window, 'resize', this.addStyle.bind(this));
        addEvent(document, 'click', this.handleClose.bind(this));
    }

    componentDidUpdate() {
        if (this.state.visible && !this.props.closeAfterSelect) renderComponent(this);
    }

    componentWillUnmount() {
        if (this.container) {
            document.body.removeChild(this.container);
            this.container = null;
        }
        removeEvent(window, 'resize', this.addStyle.bind(this));
        removeEvent(document, 'click', this.handleClose.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        this.getData(nextProps);
    }

    setPreSelect(length, minus) {
        length = this.hasSelectAll() ? length + 1 : length;
        if (minus) {
            if (this.index === 0) {
                this.index = length
            }
            this.index--;
        } else {
            if (this.index === length - 1) {
                this.index = -1
            }
            this.index++;
        }
    }

    hasSelectAll() {
        let {data, renderData} = this.state;
        let {multiple, selectAll} = this.props;
        return !!(multiple && selectAll && renderData.length === data.length)
    }

    getData(props) {
        let data = [], renderData = [], allValue = [], selectedLabel = [], selectedValue = [];
        let {value, defaultValue, children} = props;
        value = isArr(value) ? value : ( !value && value != '0' ? [] : [value]);
        defaultValue = isArr(defaultValue) ? defaultValue : ( !defaultValue && defaultValue != '0' ? [] : [defaultValue]);
        selectedValue = value.length ? value : defaultValue;
        if (children) {
            React.Children.map(children, (elm) => {
                if (!elm) return;
                let {value, disabled, label, children} = elm.props;
                let index = selectedValue.indexOf(value);
                allValue.push(value);
                if (~index) {
                    selectedLabel[index] = children || label;
                }
                data.push({value, disabled, label: children || label});
                renderData.push({value, disabled, label: children || label});
            });
        }
        this.setState({
            data,
            allValue,
            renderData,
            selectedValue,
            selectedLabel,
            renderValue: selectedLabel.join(", ")
        });
    }

    getMatchData(value, matchCase, data) {
        let output = [];
        value = matchCase ? value : `${value}`.toLowerCase();
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            let label = matchCase ? item.label : `${item.label}`.toLowerCase();
            if (~label.indexOf(value)) {
                output.push(extend({}, item));
            }
        }
        return output
    }

    getPosition() {
        if (!this.container) return;
        let {clientHeight} = this.container;
        let {top, left, bottom, width} = this.el_select.getBoundingClientRect();
        let scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        top += scrollTop;
        left += scrollLeft;
        bottom += scrollTop;
        let leftHeight = Math.max(window.innerHeight, document.body.clientHeight);
        let leftTopHeight = leftHeight - top;
        let leftBottomHeight = leftHeight - bottom;
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

    getContainer() {
        this.container = document.createElement('div');
        this.container.style.position = 'absolute';
        this.container.style.left = '-9999px';
        this.container.style.top = '-9999px';
        this.container.style.width = 0;
        document.body.appendChild(this.container);
        return this.container;
    }

    handleClose(e) {
        if (this.state.visible && this.el_select && !contains(this.el_select, e.target)) {
            let closeAfterSelect = this.props.closeAfterSelect;
            if (closeAfterSelect || (!closeAfterSelect && !contains(this.el_select_ul, e.target))) {
                this.hideComponent();
            }
        }
    }

    handleToggle() {
        if (this.props.disabled) return;
        if (this.state.visible) {
            this.hideComponent()
        } else {
            renderComponent(this);
            this.showComponent();
        }
    }

    handleRemoveClass() {
        if (this.index >= 0 && this.el_select_ul.children[this.index]) {
            this.el_select_ul.children[this.index].classList.remove('el-select-selected');
        }
    }

    handleAddClass() {
        if (this.index >= 0 && this.el_select_ul.children[this.index]) {
            this.el_select_ul.children[this.index].classList.add('el-select-selected');
        }
    }

    handleKeyDown(e) {
        let {onKeyDown, disabled} = this.props;
        let renderData = this.state.renderData;
        let length = renderData.length;
        let keyCode = e.keyCode;
        if (this.state.visible && !disabled && length) {
            if (keyCode === KeyCode.DOWN) {
                e.preventDefault();
                this.handleRemoveClass();
                this.setPreSelect(length);
                this.handleAddClass();
            } else if (keyCode === KeyCode.UP) {
                e.preventDefault();
                this.handleRemoveClass();
                this.setPreSelect(length, true);
                this.handleAddClass();
            } else if (keyCode === KeyCode.ENTER && this.index >= 0) {
                this.el_select_ul.children[this.index].click();
            }
        } else if (keyCode === KeyCode.ENTER) {
            this.handleToggle();
        }
        if (onKeyDown) onKeyDown(e)
    }

    handleChange(e) {
        let {value} = e;
        let {onMatch, matchCase} = this.props;
        this.setState(prev => {
            prev.renderValue = value;
            let renderData = onMatch ? onMatch(value) :
                this.getMatchData(value, matchCase, [].concat(prev.data));
            prev.renderData = renderData || [];
            return prev;
        }, () => {
            renderComponent(this);
            if (!this.state.visible) this.showComponent();
        });
    }


    handleToggleInput(focus) {
        this.setState(prev => {
            prev.focus = focus;
            if (!focus) {
                prev.renderData = [].concat(prev.data);
                prev.renderValue = prev.selectedLabel.join(", ");
            }
            return prev
        });
    }

    handleSelect(e, value, selected) {
        let {name, multiple, onChange, readOnly} = this.props;
        if (readOnly) return;
        if (multiple) {
            let _value = this.props.value.slice();
            if (selected) {
                _value.push(value);
            } else {
                _value.splice(_value.indexOf(value), 1);
            }
            onChange({e, name, value: _value, selectedValue: value, selected});
        } else {
            onChange({e, name, value, selectedValue: value, selected});
        }
    }

    handleSelectAll(e, allValue, selected) {
        let {name, onChange, onSelectAll, readOnly} = this.props;
        if (readOnly) return;
        if (!selected) allValue = [];
        onChange({e, name, value: allValue.slice(), selectedValue: allValue.slice(), selected});
        if (onSelectAll) {
            onSelectAll({e, name, value: allValue.slice(), selectedValue: allValue.slice(), selected});
        }
    }

    handleDisableSelect() {
        this.handleRemoveClass();
        this.index = -1;
    }

    showComponent() {
        this.setState({visible: true},
            this.addStyle.bind(this))
    }

    hideComponent() {
        if (this.container) {
            this.container.style.display = 'none';
        }
        this.handleRemoveClass();
        this.setState({visible: false});
    }

    addStyle() {
        if (!this.state.visible || !this.container) return;
        this.getPosition();
        for (let style in this.style) {
            this.container.style[style] = this.style[style];
        }
        this.container.style.display = 'block';

    }

    optionsRender() {
        let {renderData, allValue, selectedValue} = this.state;
        let {multiple, searchable, selectAllText, noMatchText} = this.props;
        return (
            <div className="el-select-dropdown">
                <ul ref={c => {
                    this.el_select_ul = c
                }}>
                    {(searchable && !renderData.length) &&
                    <li key="no-data" className="el-select-no-data">{noMatchText}</li>}
                    {this.hasSelectAll() &&
                    <Option
                        key="all"
                        multiple={multiple}
                        label={selectAllText}
                        value={allValue.slice()}
                        onChange={this.handleSelectAll.bind(this)}
                        selected={allValue.slice().sort().join("") === selectedValue.slice().sort().join("")}
                    />
                    }
                    {renderData.map((props) => {
                        return (
                            <Option
                                {...props}
                                key={props.value}
                                multiple={multiple}
                                onChange={this.handleSelect.bind(this)}
                                onDisableChange={this.handleDisableSelect.bind(this)}
                                selected={!!~selectedValue.indexOf(props.value)}
                            />
                        );
                    })}
                </ul>
            </div>
        )
    }

    render() {
        let {renderValue, visible} = this.state;
        let icon = visible ? <i className="el-caret el-select-open"/> : <i className="el-caret"/>;
        let {
            size, style, value, noMatchText, matchCase, onMatch,
            searchable, selectAll, defaultValue, selectAllText,
            multiple, onChange, className, children, closeAfterSelect, ...other
        } = this.props;
        let _className = classnames('el-select-wrapper', className, size ? `el-${size}` : '');
        return (
            <div className={_className} style={style} ref={(c) => {
                this.el_select = c
            }}>
                <Input
                    {...other}
                    size={size}
                    icon={icon}
                    autoComplete="off"
                    value={renderValue}
                    readOnly={!searchable}
                    onClick={this.handleToggle.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    onKeyDown={this.handleKeyDown.bind(this)}
                    onFocus={this.handleToggleInput.bind(this, true)}
                    onBlur={closeAfterSelect ? this.handleToggleInput.bind(this, false) : null}
                />
            </div>
        )
    }
}

Select.propTypes = {
    onMatch: PropTypes.func,
    multiple: PropTypes.bool,
    matchCase: PropTypes.bool,
    searchable: PropTypes.bool,
    selectAll: PropTypes.bool,
    onSelectAll: PropTypes.func,
    noMatchText: PropTypes.string,
    closeAfterSelect: PropTypes.bool,
    selectAllText: PropTypes.string,
    size: PropTypes.oneOf(['default', 'large', 'small'])
};

Select.defaultProps = {
    value: "",
    closeAfterSelect: true,
    selectAllText: "全选",
    noMatchText: "暂无匹配数据",
    onChange: noop,
    defaultValue: ""
};