/**
 * Created by elly on 2017/4/10.
 */
import React, {Component, PropTypes} from 'react';
import Checkbox from '../Checkbox';
import classnames from 'classnames';

export default  class CheckGroup extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(e) {
        let {checked, value} = e;
        let {min, max, checkedList}= this.props;
        checkedList = checkedList.slice();
        if (max != null && checkedList.length === max)return;
        if (min != null && !checked && checkedList.length === min + 1)return;
        let index = checkedList.indexOf(value);
        checked ? checkedList.push(value) : checkedList.splice(index, 1);
        this.props.onChange(checkedList);
    }

    handleToggle(e) {
        let {checked} = e;
        let {options}= this.props;
        let checkedList = [];
        if (checked) {
            checkedList = options.map(item=> {
                if (typeof  item === "string") {
                    return item;
                }
                return item.value
            })
        }
        this.props.onChange(checkedList);
    }

    render() {
        let {hasCheckAll, disableAll, options, checkedList, className}= this.props;
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
                        options.map((item, index)=> {
                            if (typeof item === 'string') {
                                item = {label: item, name: item, value: item, disabled: disableAll}
                            }
                            return (
                                <Checkbox
                                    {...item}
                                    key={index}
                                    disabled={disableAll}
                                    checked={~checkedList.indexOf(item.value)}
                                    onChange={this.handleChange.bind(this)}
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
    disableAll: false,
    hasCheckAll: true,
};