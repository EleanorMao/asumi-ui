/**
 * Created by elly on 2017/4/28.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classSet from 'classnames';

export default class PageButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            pgBtn,
            label,
            active,
            hidden,
            onClick,
            disabled,
        } = this.props;
        const className = classSet({
            'el-pg-btn': pgBtn,
            'el-active': active,
            'el-hidden': hidden,
            'el-disabled': disabled,
        });
        return (
            <li className={ className }>
                <a href="#" onClick={(e) => {
                    e.preventDefault();
                    !disabled && onClick()
                }}><span>{label}</span></a>
            </li>
        )
    }
}