/**
 * Created by elly on 2017/4/10.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../checkbox';
import classnames from 'classnames';
import {extend, noop} from "../util";

export default class CheckGroup extends Component {
    constructor(props) {
        super(props);
    }

    get getValue() {
        return this.props.value || this.props.checkedList;
    }

    get isCheckedAll() {
        let {options} = this.props;
        let checkedList = this.getValue;
        return !options.filter(v => {
            if (typeof v === 'string' || typeof v === "number") {
                return !~checkedList.indexOf(v)
            } else {
                return !~checkedList.indexOf(v.value || v.children)
            }
        }).length;
    }

    get hasCheckAll() {
        let {hasCheckAll, max, min} = this.props;
        return hasCheckAll && (max == null || max != null && max >= options.length) && !min
    }

    handleChange({onChange}, e) {
        let {checked, value} = e;
        let {min, max, name} = this.props;
        let checkedList = this.getValue.slice();
        if (max != null && checkedList.length === max) return;
        if (min != null && !checked && checkedList.length === min + 1) return;
        let index = checkedList.indexOf(value);
        checked ? checkedList.push(value) : checkedList.splice(index, 1);
        onChange && onChange(e);
        this.props.onChange({e, name, value: checkedList});
    }

    handleToggle(e) {
        let {checked} = e;
        let {options, name} = this.props;
        let checkedList = [];
        if (checked) {
            checkedList = options.map(item => {
                if (typeof item === "string" || typeof  item === "number") {
                    return item;
                }
                return item.value
            })
        }
        this.props.onChange({e, name, value: checkedList});
    }

    render() {
        let {
            disableAll, options, style, checkAllLabel, className,
            min, max, value, hasCheckAll, onChange, ...others
        } = this.props;
        let _className = classnames('el-checkbox-group', className);
        let isCheckedAll = this.isCheckedAll;
        let checkedList = this.getValue;
        return (
            <div className={_className} style={style}>
                <div className="el-checkbox-row el-check-all">
                    {this.hasCheckAll &&
                    <Checkbox
                        {...others}
                        label={checkAllLabel}
                        disabled={disableAll}
                        onChange={this.handleToggle.bind(this)}
                        checked={options.length && isCheckedAll}
                        indeterminate={checkedList.length && !isCheckedAll}
                    />}
                </div>
                <div className="el-checkbox-row">
                    {
                        options && options.map((item, index) => {
                            if (typeof item === 'string' || typeof item === "number") {
                                item = {label: item, name: item, value: item, disabled: disableAll}
                            }
                            item = extend(others, item);
                            return (
                                <Checkbox
                                    key={index}
                                    disabled={disableAll}
                                    checked={~checkedList.indexOf(item.value)}
                                    {...item}
                                    onChange={this.handleChange.bind(this, item)}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

CheckGroup.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    options: PropTypes.array,
    value: PropTypes.array,
    disableAll: PropTypes.bool,
    hasCheckAll: PropTypes.bool,
    checkedList: PropTypes.array,
    style: PropTypes.object,
    onChange: PropTypes.func,
    className: PropTypes.string,
    checkAllLabel: PropTypes.any
};

CheckGroup.defaultProps = {
    options: [],
    checkedList: [],
    disableAll: false,
    hasCheckAll: true,
    checkAllLabel: "全选",
    onChange: noop
};