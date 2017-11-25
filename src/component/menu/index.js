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
        let {width, children, className, openAll, openKey, style} = this.props;
        return (
            <div className={"el-side-menu " + className} style={extend({}, {width}, style)}>
                <ul className="el-menu">
                    {React.Children.map(children, (elm) => {
                        if (!elm) return;
                        let open = openAll;
                        if (!open && openKey === elm.key) open = true;
                        return React.cloneElement(elm, {open, openAll, openKey});
                    })}
                </ul>
            </div>
        )
    }
}
Menu.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string,
    style: PropTypes.object,
    openAll: PropTypes.bool,
    openKey: PropTypes.any
};
Menu.defaultProps = {
    width: 220,
    className: '',
    openAll: false
};