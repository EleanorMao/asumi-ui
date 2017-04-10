/**
 * Created by elly on 2017/4/8.
 */
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

export default  class Radio extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(e) {
        let {name, value, checked, disabled} = this.props;
        if (disabled) return;
        this.props.onChange({e, name, value, checked: !checked});
    }

    render() {
        let {label, checked, className, onChange, disabled, children, ...other} = this.props;
        let _className = classnames('el-checkbox-wrapper', disabled ? 'el-disabled' : '', className);
        return (
            <label className={_className}>
                <span className="el-checkbox">
                    <input
                        {...other}
                        type="radio"
                        checked={checked}
                        disabled={disabled}
                        className="el-checkbox-input"
                        onChange={this.handleChange.bind(this)}/>
                    {checked ?
                        <span className="fa fa-dot-circle-o el-checked"/> :
                        <span className="fa fa-circle-o el-unchecked"/>
                    }
                </span>
                <span>{children || label}</span>
            </label>
        )
    }
}

Radio.propTypes = {};

Radio.defaultProps = {
    checked: false,
    onChange: ()=> {
    }
};