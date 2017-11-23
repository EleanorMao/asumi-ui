/**
 * Created by elly on 2017/4/7.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default  class TablePanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {_active, className, style, children} = this.props;
        let _classNames = classnames('el-tabs-panel', _active ? "el-tabs-panel-active" : "", className);
        return (
            <div className={_classNames} style={style}>
                {children}
            </div>
        )
    }
}

TablePanel.propTypes = {};

TablePanel.defaultProps = {};