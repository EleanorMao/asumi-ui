/**
 * Created by elly on 2017/4/10.
 */
import React, {Component, PropTypes} from 'react';
import Radio from '../radio';
import classnames from 'classnames';

export default  class RadioGroup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {disableAll, options, value, onChange, className}= this.props;
        let _className = classnames('el-checkbox-group', className);
        return (
            <div className={_className}>
                <div className="el-checkbox-row">
                    {
                        !!options && options.map((item, index)=> {
                            if (typeof item === 'string') {
                                item = {label: item, name: item, value: item, disabled: disableAll}
                            }
                            return (
                                <Radio
                                    {...item}
                                    key={index}
                                    onChange={onChange}
                                    disabled={disableAll}
                                    checked={value === item.value}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

RadioGroup.propTypes = {
    options: PropTypes.array,
    disableAll: PropTypes.bool,
    checkedList: PropTypes.array
};

RadioGroup.defaultProps = {
    disableAll: false
};