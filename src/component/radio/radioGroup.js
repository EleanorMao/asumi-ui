/**
 * Created by elly on 2017/4/10.
 */
import React, {Component} from 'react';
import PropTypes          from 'prop-types';
import classnames         from 'classnames';
import Radio              from '../radio';
import {noop}             from "../util";

export default class RadioGroup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {disableAll, options, value, onChange, style, className, mode, ...others} = this.props;
        mode = mode || 'group';
        let _className = classnames('el-checkbox-' + mode, className);
        return (
            <div className={_className} style={style}>
                <div className="el-checkbox-row">
                    {
                        !!options && options.map((item, index) => {
                            if (typeof item === 'string' || typeof item === "number") {
                                item = {label: item, name: item, value: item, disabled: disableAll};
                            }
                            return (
                                <Radio
                                    {...others}
                                    {...item}
                                    key={index}
                                    onChange={onChange}
                                    disabled={disableAll}
                                    checked={value === item.value}
                                    className={classnames({'el-checkbox-checked': value === item.value})}
                                />
                            );
                        })
                    }
                </div>
            </div>
        );
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
    onChange: noop,
    mode: 'group'
};