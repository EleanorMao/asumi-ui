/**
 * Created by elly on 2017/12/29.
 */
import React, {Component} from 'react';
import classnames         from 'classnames';
import PropTypes          from 'prop-types';

export default class ICON extends Component {
    render() {
        const {type, size, rotate, flip, li, pull, border, animate, className, ...others} = this.props;
        let _className = classnames('fa',
            `fa-${type}`,
            li ? `fa-li` : '',
            size ? `fa-${size}` : '',
            border ? 'fa-border' : '',
            flip ? `fa-flip-${flip}` : '',
            pull ? `fa-pull-${pull}` : '',
            animate ? `fa-${animate}` : '',
            rotate ? `fa-rotate-${rotate}` : '',
            className);
        return <span className={_className} aria-hidden="true" {...others}/>;
    }
}

ICON.propTypes = {
    li: PropTypes.bool,
    border: PropTypes.bool,
    rotate: PropTypes.number,
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    pull: PropTypes.oneOf(['left', 'right']),
    animate: PropTypes.oneOf(['spin', 'pulse']),
    size: PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x']),
    flip: PropTypes.oneOf(['horizontal', 'vertical'])
};

ICON.defaultProps = {};