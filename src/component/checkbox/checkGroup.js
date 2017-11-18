/**
 * Created by elly on 2017/4/10.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../checkbox';
import classnames from 'classnames';
import {noop} from "../util";

export default class CheckGroup extends Component {
    constructor(props) {
        super(props);
    }

    handleChange({onChange}, e) {
        let {checked, value} = e;
        let {min, max, name, checkedList} = this.props;
        checkedList = checkedList.slice();
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
                if (typeof  item === "string") {
                    return item;
                }
                return item.value
            })
        }
        this.props.onChange({e, name, value: checkedList});
    }

    render() {
        let {hasCheckAll, disableAll, options, checkedList, className} = this.props;
        let _className = classnames('el-checkbox-group', className);
        return (
            <div className={_className}>
                <div className="el-checkbox-row el-check-all">
                    {hasCheckAll &&
                    <Checkbox
                        label="全选"
                        disabled={disableAll}
                        onChange={this.handleToggle.bind(this)}
                        checked={options.length === checkedList.length}
                        indeterminate={checkedList.length && options.length !== checkedList.length}
                    />}
                </div>
                <div className="el-checkbox-row">
                    {
                        options && options.map((item, index) => {
                            if (typeof item === 'string') {
                                item = {label: item, name: item, value: item, disabled: disableAll}
                            }
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
    disableAll: PropTypes.bool,
    hasCheckAll: PropTypes.bool,
    checkedList: PropTypes.array
};

CheckGroup.defaultProps = {
    checkedList: [],
    disableAll: false,
    hasCheckAll: true,
    onChange: noop
};