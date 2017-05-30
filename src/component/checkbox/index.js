/**
 * Created by elly on 2017/4/8.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default  class Checkbox extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(e) {
        let {name, value, checked, readOnly, disabled} = this.props;
        if (disabled || readOnly) return;
        this.props.onChange({e, name, value, checked: !checked});
    }

    render() {
        let {type, label, checked, className, indeterminate, onChange, disabled, children, ...other} = this.props;
        let _className = classnames('el-checkbox-wrapper', disabled ? 'el-disabled' : '', className);
        let _innerClassName = classnames('el-checkbox', type ? 'el-switch' : null);
        return (
            <label className={_className}>
                <span className={_innerClassName}>
                    <input
                        {...other}
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        className="el-checkbox-input"
                        onChange={this.handleChange.bind(this)}/>
                    {type ? <span/> : (
                        indeterminate ?
                            <span className="fa fa-minus-square el-checked"/> :
                            (checked ?
                                    <span className="fa fa-check-square el-checked"/> :
                                    <span className="fa fa-square-o el-unchecked"/>
                            ))
                    }
                </span>
                <span>{children || label}</span>
            </label>
        )
    }
}

Checkbox.propTypes = {
    type: PropTypes.oneOf(['switch'])
};

Checkbox.defaultProps = {
    checked: false,
    onChange: () => {
    }
};