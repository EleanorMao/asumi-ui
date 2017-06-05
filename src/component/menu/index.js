/**
 * Created by elly on 2017/4/5.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {extend} from '../util';

export default class Menu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {width, children, openAll, defaultOpenKey, style} = this.props;
        return (
            <div className="el-side-menu" style={extend({}, {width}, style)}>
                <ul className="el-menu">
                    {React.Children.map(children, (elm) => {
                        if (!elm)return;
                        let open = openAll;
                        if (!open && defaultOpenKey === elm.key) open = true;
                        return React.cloneElement(elm, {open, openAll, defaultOpenKey});
                    })}
                </ul>
            </div>
        )
    }
}
Menu.propTypes = {
    openAll: PropTypes.bool,
    defaultOpenKey: PropTypes.any
};
Menu.defaultProps = {
    width: 220,
};