/**
 * Created by elly on 2017/4/5.
 */
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

export default  class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {type, size, disabled, children, href, ...other} = this.props;
        let className = classnames({
            'el-btn': true,
            'el-disabled': disabled,
            'el-text': type === 'text',
            'el-small': size === 'small',
            'el-large': size === 'large',
            'el-danger': type === 'danger',
            'el-success': type === 'success',
            'el-primary': type === 'primary',
            'el-secondary': type === 'secondary',
        });
        if (href) {
            return (
                <a href={disabled ? 'javascript:;' : href} className={className} {...other}>{children}</a>
            )
        } else {
            return (
                <button type="button" className={className} disabled={disabled} {...other}>{children}</button>
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