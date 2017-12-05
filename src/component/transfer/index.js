import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';

import Button from '../button';
import TransferPanel from './transferPanel';
import { noop } from "../util";

export default class Transfer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            leftChecked: [],
            rightChecked: []
        }
    }

    handleChange(isLeft, value) {
        isLeft ? this.setState({ leftChecked: value }) : this.setState({ rightChecked: value });
    }

    get sourceData() {
        const { data, value, propsAlias } = this.props;
        return data.filter(item => !~value.indexOf(item[propsAlias.value]));
    }

    get targetData() {
        const { data, value, propsAlias } = this.props;
        return data.filter(item => ~value.indexOf(item[propsAlias.value]));
    }

    addToLeft() {
        const { value, name } = this.props;
        const { rightChecked } = this.state;
        let currentValue = value.slice();
        rightChecked.forEach(item => {
            const index = currentValue.indexOf(item);
            if (index > -1) {
                currentValue.splice(index, 1);
            }
        });
        this.setState({ leftChecked: [], rightChecked: [] }, () =>
            this.props.onChange({ value: currentValue, name }))
    };


    addToRight() {
        const { value, name } = this.props;
        const { leftChecked } = this.state;
        let currentValue = value.slice();
        leftChecked.forEach(item => {
            if (!~value.indexOf(item)) {
                currentValue = currentValue.concat(item);
            }
        });
        this.setState({ rightChecked: [], leftChecked: [] }, () =>
            this.props.onChange({ value: currentValue, name }))
    };

    render() {
        const { data, titles, ...others } = this.props;
        const { leftChecked, rightChecked } = this.state;

        let isTopBtnDisabled = leftChecked.length === 0;
        let isBottomBtnDisabled = rightChecked.length === 0;
        return (
            <div className="el-transfer">
                <TransferPanel
                    data={this.sourceData}
                    checkedList={leftChecked}
                    title={titles[0]}
                    changeChecked={this.handleChange.bind(this, true)}
                    {...others}
                />
                <div className="el-transfer-buttons">
                    <Button
                        type="primary"
                        className="el-transfer-button"
                        disabled={isTopBtnDisabled}
                        onClick={this.addToRight.bind(this)}
                    >
                        <i className="fa fa-chevron-right" />
                    </Button>
                    <Button
                        type="primary"
                        className="el-transfer-button"
                        disabled={isBottomBtnDisabled}
                        onClick={this.addToLeft.bind(this)}
                    >
                        <i className="fa fa-chevron-left" />
                    </Button>
                </div>
                <TransferPanel
                    data={this.targetData}
                    checkedList={rightChecked}
                    title={titles[1]}
                    changeChecked={this.handleChange.bind(this, false)}
                    {...others}
                />
            </div>
        )
    }
}

Transfer.propTypes = {
    data: PropTypes.array, //array[{ value, label, disabled }]
    filterable: PropTypes.bool,
    filterPlaceholder: PropTypes.string,
    filterMethod: PropTypes.func,
    titles: PropTypes.array,
    onChange: PropTypes.func,
    propsAlias: PropTypes.object,
    value: PropTypes.array
};

Transfer.defaultProps = {
    data: [],
    filterable: false,
    filterPlaceholder: '请输入搜索内容',
    titles: ['', ''],
    onChange: noop,
    propsAlias: {
        label: 'label',
        value: 'value',
        disabled: 'false'
    },
    value: []
};