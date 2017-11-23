/**
 * Created by elly on 2017/4/10.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Radio from '../radio';
import classnames from 'classnames';
import {noop} from "../util";

export default class RadioGroup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {disableAll, options, value, onChange, style, className} = this.props;
        let _className = classnames('el-checkbox-group', className);
        return (
            <div className={_className} style={style}>
                <div className="el-checkbox-row">
                    {
                        !!options && options.map((item, index) => {
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
    style: PropTypes.object,
    onChange: PropTypes.func,
    options: PropTypes.array,
    disableAll: PropTypes.bool,
    className: PropTypes.string,
};

RadioGroup.defaultProps = {
    disableAll: false,
    onChange: noop
};