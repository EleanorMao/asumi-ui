/**
 * Created by elly on 2017/4/6.
 */
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

export default class Input extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(event) {
        const {name, value} = event.target;
        const {rule, regExp} = this.props;
        if (rule === 'price') { //金额相关 8+2
            let reg = /^((0|[1-9]\d{0,7})(\.\d{0,2})?)?$/;
            if (!reg.test(value)) {
                return;
            }
        } else if (rule === 'positiveInt') { //正整数 8
            let reg = /^([1-9]\d{0,7})?$/;
            if (!reg.test(value)) {
                return;
            }
        } else if (rule === 'nature') { //自然数 非负整数
            let reg = /^(0?|[1-9]\d{0,7})$/;
            if (!reg.test(value)) {
                return;
            }
        } else if (rule === 'color') { //颜色
            let reg = /^#[0-9a-fA-F]{0,6}$/;
            if (!reg.test(value)) {
                return;
            }
        }

        if (Object.prototype.toString.call(regExp) === '[object RegExp]') {
            if (!regExp.test(value)) {
                return;
            }
        }

        this.props.onChange && this.props.onChange({event, name, value});
    }

    render() {
        let {type, size, rule, regExp, style, append, prepend, className, ...other}=this.props;
        let _style = (prepend || append) ? null : style;
        let _className = classnames('input', className, size);
        if (type === 'textarea') {
            return (
                <textarea
                    style={style}
                    className={_className}
                    onChange={this.handleChange.bind(this)}
                    {...other}
                />
            )
        } else {
            let input = (
                <input
                    type="text"
                    style={_style}
                    className={_className}
                    onChange={this.handleChange.bind(this)}
                    {...other}
                />
            );
            if (prepend || append) {
                let _wrapperClass = classnames('input-wrapper', className, size);
                return (
                    <div className={_wrapperClass} style={style}>
                        {prepend && <span className="input-prepend">{prepend}</span>}
                        {input}
                        {append && <span className="input-append">{append}</span>}
                    </div>
                )
            } else {
                return input;
            }

        }
    }
}

Input.propTypes = {
    type: PropTypes.string,
    onChange: PropTypes.func,
    regExp: PropTypes.instanceOf(RegExp),
    size: PropTypes.oneOf(['large', 'small']),
    rule: PropTypes.oneOf(['color', 'price', 'nature', 'positiveInt']),
};

Input.defaultProps = {
    type: 'text',
};