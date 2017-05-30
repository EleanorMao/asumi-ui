/**
 * Created by elly on 2017/5/26.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default  class Row extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {className, children, style} = this.props;
        let _className = classnames('el-grid-row', className);
        return (
            <div className={_className} style={style}>{children}</div>
        )
    }
}

Row.propTypes = {};

Row.defaultProps = {
    className: ''
};