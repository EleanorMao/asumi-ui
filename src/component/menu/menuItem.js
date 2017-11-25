/**
 * Created by elly on 2017/5/26.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class MenuItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="el-menu-item">{this.props.children}</li>
        )
    }
}

MenuItem.propTypes = {};

MenuItem.defaultProps = {};