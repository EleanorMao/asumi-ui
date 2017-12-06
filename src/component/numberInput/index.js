/**
 * Created by elly on 2017/11/25.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Input from '../input';
import {MAX_SAFE_INTEGER} from "../util";

export default class NumberInput extends Component {
    constructor(props) {
        super(props);
        let value = 'value' in props ? props.value : props.defaultValue;
        this.state = {
            value: value,
            inputting: false,
            renderValue: props.dataFormat(value)
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps && this.validate(nextProps.value)) {
            this.setState({
                value: nextProps.value,
                renderValue: nextProps.dataFormat(nextProps.value)
            });
        }
    }

    validate(value) {
        if (value === null || isNaN(value)) {
            return false;
        }
        if (value && !/^(-)?\d*$/.test(value) && !/^((0|[1-9]\d*)(\.\d*)?)?$/.test(value)) {
            return false;
        }
        if (value !== "-") {
            let {min, max} = this.props;
            if (value < min || value > max) {
                return false;
            }
        }
        return true;
    }

    handleFocus(e) {
        this.setState({inputting: true});
        this.props.onFocus && this.props.onFocus(e);
    }

    handleBlur(e) {
        this.setState({inputting: false});
        this.props.onBlur && this.props.onBlur(e);
    }

    handleChange({name, value, e}) {
        if (!this.validate(value)) {
            return;
        }
        this.setState({value: value, renderValue: this.props.dataFormat(value)});
        this.props.onChange && this.props.onChange({e, name, value});
    }

    handleClick(plus, e) {
        let {onChange, name, disabled, dataFormat, onBlur, step} = this.props;
        if (disabled) return;
        let newValue,
            value = this.state.value,
            strValue = (value || 0).toString();
        let index = strValue.indexOf('.');
        if (~index) {
            let length = strValue.slice(index, -1).length;
            let pow = Math.pow(10, length);
            newValue = ((Number(this.state.value) || 0) * pow + (plus ? step : -step) * pow) / pow;
        } else {
            newValue = (Number(this.state.value) || 0) + (plus ? step : -step);
        }
        if (!this.validate(newValue)) {
            return;
        }
        this.setState({value: newValue, renderValue: dataFormat(newValue)});
        onChange && onChange({e, name, value: newValue});
        onBlur && onBlur({e, name, value: newValue});
    }


    render() {
        let {inputting, renderValue, value} = this.state;
        let {step, type, onChange, dataFormat, defaultValue, disabled, className, ...other} = this.props;
        return (
            <Input
                {...other}
                disabled={disabled}
                value={inputting ? value : renderValue}
                onBlur={this.handleBlur.bind(this)}
                onFocus={this.handleFocus.bind(this)}
                onChange={this.handleChange.bind(this)}
                className={classnames("el-number-input", disabled ? "el-number-input-disabled" : "", className)}
                append={
                    <span className="el-number-input-handler">
                        <span className="fa fa-angle-up el-number-input-up"
                              onClick={this.handleClick.bind(this, true)}/>
                        <span className="fa fa-angle-down el-number-input-down"
                              onClick={this.handleClick.bind(this, false)}/>
                    </span>
                }
            />
        )
    }
}

NumberInput.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func,
    onPressEnter: PropTypes.func,
    size: PropTypes.oneOf(['large', 'small']),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

NumberInput.defaultProps = {
    step: 1,
    defaultValue: "",
    dataFormat: (value) => {
        return value
    },
    min: -MAX_SAFE_INTEGER,
    max: MAX_SAFE_INTEGER
};
