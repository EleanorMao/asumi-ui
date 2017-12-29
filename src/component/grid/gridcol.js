/**
 * Created by elly on 2017/5/26.
 */
import React, {Component} from 'react';
import PropTypes          from 'prop-types';
import classnames         from 'classnames';

export default class GridCol extends Component {

    constructor(props) {
        super(props);
    }

    //TODO: flex布局
    render() {
        let {offset, col, className, style, inline, children} = this.props;
        let _className = classnames(`el-col-${col}`, inline ? 'el-col-inline' : '', offset != undefined ? `el-col-offset-${offset}` : '', className);
        return (
            <div className={_className} style={style}>{children}</div>
        );
    }
}
GridCol.displayName = 'GridCol';

GridCol.propTypes = {
    col: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

GridCol.defaultProps = {
    col: 24
};