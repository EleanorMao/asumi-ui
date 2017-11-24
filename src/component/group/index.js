/**
 * Created by elly on 2017/4/5.
 */
import React, {Component} from 'react';
import {extend} from '../util';

export default class Group extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {children, defaultStyle, style, ...other} = this.props;
        return (
            <div className="el-group">
                {React.Children.map(children, (elm) => {
                    if (!elm) return;
                    return React.cloneElement(elm, {style: extend({}, defaultStyle, style), ...other});
                })}
            </div>
        )
    }
}


Group.defaultProps = {
    defaultStyle: {
        marginRight: 10
    }
};
