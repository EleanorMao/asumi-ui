/**
 * Created by elly on 2017/5/26.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
    }

    render() {
        return (
            <li className="el-menu-item"><span>{this.props.children}</span></li>
        )
    }
}

MenuItem.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

MenuItem.defaultProps = {};