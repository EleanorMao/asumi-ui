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
        let {width, children, className, openAll, openIds, style} = this.props;
        return (
            <div className={"el-side-menu " + className} style={extend({}, {width}, style)}>
                <ul className="el-menu">
                    {React.Children.map(React.Children.toArray(children), (elm) => {
                        if (!elm) return;
                        let open = openAll || elm.props.openAll;
                        if (!open && ~openIds.indexOf(elm.props.id)) open = true;
                        return React.cloneElement(elm, {open, openAll, openIds});
                    })}
                </ul>
            </div>
        )
    }
}
Menu.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string,
    openIds: PropTypes.array,
    style: PropTypes.object,
    openAll: PropTypes.bool,
};
Menu.defaultProps = {
    width: 220,
    openIds: [],
    className: '',
};