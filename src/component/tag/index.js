/**
 * Created by elly on 2017/6/4.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {noop} from "../util";

export default class Tag extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {type, children, closeable, onClose} = this.props;
        let className = classnames({
            'el-tag': true,
            'el-danger': type === 'danger',
            'el-success': type === 'success',
            'el-primary': type === 'primary',
            'el-secondary': type === 'secondary',
        });
        return (
            <div className={className}>
                {children}
                {closeable && <i className="fa fa-close el-tag-close" onClick={onClose}/>}
            </div>
        )
    }
}

Tag.propTypes = {
    type: PropTypes.oneOf(['default', 'danger', 'success', 'primary', 'secondary']),
    onClose: PropTypes.func,
    closeable: PropTypes.bool
};

Tag.defaultProps = {
    type: 'default',
    onClose: noop,
    closeable: false
};