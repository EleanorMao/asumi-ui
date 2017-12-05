import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';

import Checkbox from '../checkbox';
import Input from '../input';
import { noop } from "../util";

export default class TransferPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ''
        }
    }

    handleChange({ value }) {
        this.props.changeChecked(value)
    }

    handleInputChange(e) {
        this.setState({ query: e.value });
    };

    get filterData() {
        const { data, propsAlias, filterMethod } = this.props;
        let filterData = data.filter(item => {
            if (typeof filterMethod === 'function') {
                return filterMethod(this.state.query, item);
            } else {
                const label = item[propsAlias.label] || item[propsAlias.value].toString();
                return ~label.toLowerCase().indexOf(this.state.query.toLowerCase());
            }
        });

        return filterData.map(item => {
            return { label: item[propsAlias.label], value: item[propsAlias.value] }
        })
    }

    render() {
        const { data, title, checkedList, filterable, filterPlaceholder } = this.props;
        return (
            <div className="el-transfer-panel">
                <p className="el-transfer-panel-header">
                    <span>{title}</span>
                    <span>{checkedList.length}/{data.length}</span>
                </p>
                {filterable &&
                    <Input
                        size="small"
                        placeholder={filterPlaceholder}
                        onChange={this.handleInputChange.bind(this)}
                    />}
                <div>
                    {data.length === 0
                        ? <span className="el-transfer-no-data">无数据</span>
                        : this.filterData.length === 0
                            ? <span className="el-transfer-no-data">无匹配数据</span>
                            : null
                    }
                    <Checkbox.Group
                        className="el-transfer-check-group"
                        options={this.filterData}
                        checkedList={checkedList}
                        onChange={this.handleChange.bind(this)}
                    />
                </div>
            </div>
        )
    }
}

TransferPanel.propTypes = {
    data: PropTypes.array, //array[{ value, label, disabled }]
    filterable: PropTypes.bool,
    filterPlaceholder: PropTypes.string,
    filterMethod: PropTypes.func,
    title: PropTypes.string,
    propsAlias: PropTypes.object,
    checkedList: PropTypes.array,
    onChange: PropTypes.func,
    changeChecked: PropTypes.func
};

TransferPanel.defaultProps = {
    data: [],
    filterable: false,
    filterPlaceholder: '请输入搜索内容',
    title: '',
    checkedList: [],
    onChange: noop
};