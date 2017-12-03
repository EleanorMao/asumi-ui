/**
 * Created by elly on 2017/12/3.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ChaseDot extends Component {
    render() {
        return (
            <div className="el-chase-dots">
                <i className="el-chase-dot-1"/>
                <i className="el-chase-dot-2"/>
            </div>
        )
    }
}

ChaseDot.propTypes = {};

ChaseDot.defaultProps = {};