/**
 * Created by elly on 2017/4/5.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {type, size, disabled, children, href, submit, reset, className, ...other} = this.props;
        let classObj = {
            'el-btn': true,
            'el-disabled': disabled,
            'el-text': type === 'text',
            'el-small': size === 'small',
            'el-large': size === 'large',
            'el-success': type === 'success',
            'el-primary': type === 'primary',
            'el-danger': type === 'danger' || type === 'error',
            'el-secondary': type === 'secondary' || type === 'warning',
        };
        classObj[className] = !!className;
        let _className = classnames(classObj);
        if (href) {
            return (
                <a {...other} href={disabled ? 'javascript:;' : href} className={_className}>{children}</a>
            )
        } else {
            let type = submit ? "submit" : reset ? "reset" : "button";
            return (
                <button {...other}
                        type={type}
                        className={_className}
                        disabled={disabled}>{children}</button>
            )
        }
    }
}

Button.propTypes = {
    reset: PropTypes.bool,
    submit: PropTypes.bool,
    href: PropTypes.string,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['default', 'large', 'small']),
    type: PropTypes.oneOf(['default', 'text', 'danger', 'success', 'primary', 'secondary', 'error', 'warning'])
};

Button.defaultProps = {
    size: 'default',
    type: 'default',
    disabled: false
};