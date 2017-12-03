/**
 * Created by elly on 2017/12/3.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Stretch extends Component {
    render() {
        return (
            <div className="el-stretch">
                <i className="el-stretch-rect"/>
                <i className="el-stretch-rect"/>
                <i className="el-stretch-rect"/>
                <i className="el-stretch-rect"/>
                <i className="el-stretch-rect"/>
                <i className="el-stretch-rect"/>
            </div>
        )
    }
}

Stretch.propTypes = {};

Stretch.defaultProps = {};