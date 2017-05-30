/**
 * Created by elly on 2017/5/26.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default  class MenuItemGroup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {title, children} = this.props;
        return (
            <li className="el-menu-item-group">
                <div className="el-menu-item-group-title">{title}</div>
                <ul className="el-menu-item-group-list">{children}</ul>
            </li>
        )
    }
}

MenuItemGroup.propTypes = {};

MenuItemGroup.defaultProps = {};