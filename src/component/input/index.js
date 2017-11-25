/**
 * Created by elly on 2017/4/6.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {KeyCode, rules} from "../util";

export default class Input extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(e) {
        const {name, value} = e.target;
        const {rule, pattern, maxLength} = this.props;
        if (rule === 'price') { //金额相关 8+2
            let reg = rules.price;
            if (!reg.test(value)) {
                return;
            }
        } else if (rule === 'positiveInt') { //正整数 8
            let reg = rules.positiveInt;
            if (!reg.test(value)) {
                return;
            }
        } else if (rule === 'nature') { //自然数 非负整数
            let reg = rules.nature;
            if (!reg.test(value)) {
                return;
            }
        } else if (rule === 'color') { //颜色
            let reg = rules.color;
            if (value && !reg.test(value)) {
                return;
            }
        }

        if (Object.prototype.toString.call(pattern) === '[object RegExp]') {
            if (!pattern.test(value)) {
                return;
            }
        }
        if (value.length > maxLength) {
            return;
        }
        this.props.onChange && this.props.onChange({e, name, value});
    }

    handleKeyPress(e) {
        if (e.which === KeyCode.ENTER) {
            this.props.onPressEnter && this.props.onPressEnter(e);
        }
        this.props.onKeyPress && this.props.onKeyPress(e);
    }

    render() {
        let {type, size, rule, icon, style, inputStyle, append, prepend, className, ...other} = this.props;
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
};