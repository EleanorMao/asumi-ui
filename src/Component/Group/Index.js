/**
 * Created by elly on 2017/4/5.
 */
import React, {Component} from 'react';
import {extend} from '../Util';

export default  class Group extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {children, style, ...other}=this.props;
        return (
            <div className="el-group">
                {React.Children.map(children, (elm)=> {
                    return React.cloneElement(elm, {style: extend({}, {marginRight: 10}, style), ...other});
                })}
            </div>
        )
    }
}


