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
        let {type, size, disabled, children, href, className, ...other} = this.props;
        let _className = classnames({
            'el-btn': true,
            'el-disabled': disabled,
            'el-text': type === 'text',
            'el-small': size === 'small',
            'el-large': size === 'large',
            'el-danger': type === 'danger',
            'el-success': type === 'success',
            'el-primary': type === 'primary',
            'el-secondary': type === 'secondary',
            className: !!className
        });
        if (href) {
            return (
                <a {...other} href={disabled ? 'javascript:;' : href} className={_className}>{children}</a>
            )
        } else {
            return (
                <button {...other} type="button" className={_className} disabled={disabled}>{children}</button>
            )
        }
    }
}

Button.propTypes = {
    href: PropTypes.string,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['default', 'large', 'small']),
    type: PropTypes.oneOf(['default', 'text', 'danger', 'success', 'primary', 'secondary'])
};

Button.defaultProps = {
    size: 'default',
    type: 'default',
    disabled: false
};