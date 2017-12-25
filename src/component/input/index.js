/**
 * Created by elly on 2017/4/6.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {KeyCode, noop, rules} from "../util";

export default class Input extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(e) {
        const {name, value} = e.target;
        const {rule, pattern, maxLength, onChange} = this.props;
        if (rule && rules[rule] && !rules[rule].test(value)) return;
        if (pattern && !pattern.test(value)) return;
        if (value.length > maxLength) return;
        onChange({e, name, value});
    }

    handleKeyPress(e) {
        if (e.which === KeyCode.ENTER) {
            this.props.onPressEnter(e);
        }
        this.props.onKeyPress(e);
    }

    render() {
        let {type, size, rule, icon, style, inputStyle, append, prepend, onPressEnter, className, ...other} = this.props;
        let {onClick} = {...other};
        let _className = classnames('el-input', className, size ? `el-${size}` : '');
        if (type === 'textarea') {
            return (
                <div className={_className} style={style}>
                    {!!icon && <span className="el-input-icon" onClick={onClick}>{icon}</span>}
                    <textarea
                        {...other}
                        style={inputStyle}
                        className={_className}
                        onChange={this.handleChange.bind(this)}
                    />
                </div>
            )
        } else {
            let input =
                <div className={_className} style={style}>
                    {!!icon && <span className="el-input-icon" onClick={onClick}>{icon}</span>}
                    <input
                        {...other}
                        type={type}
                        style={inputStyle}
                        onChange={this.handleChange.bind(this)}
                        onKeyPress={this.handleKeyPress.bind(this)}
                    />
                </div>
            ;
            if (prepend || append) {
                let _wrapperClass = classnames('el-input-wrapper', className, size ? `el-${size}` : '');
                return (
                    <div className={_wrapperClass} style={style}>
                        {prepend && <span className="el-input-prepend">{prepend}</span>}
                        {input}
                        {append && <span className="el-input-append">{append}</span>}
                    </div>
                )
            } else {
                return input;
            }

        }
    }
}

Input.propTypes = {
    icon: PropTypes.any,
    append: PropTypes.any,
    prepend: PropTypes.any,
    type: PropTypes.string,
    onChange: PropTypes.func,
    onPressEnter: PropTypes.func,
    pattern: PropTypes.instanceOf(RegExp),
    size: PropTypes.oneOf(['large', 'small']),
    rule: PropTypes.oneOf(['color', 'price', 'nature', 'positiveInt']),
};

Input.defaultProps = {
    type: 'text',
    onChange: noop,
    onKeyPress: noop,
    onPressEnter: noop,
};