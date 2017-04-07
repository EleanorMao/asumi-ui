/**
 * Created by elly on 2017/4/5.
 */
import React, {Component} from 'react';
import {extend} from '../Util';

export default class Nav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {width, router, style} = this.props;
        return (
            <div className="el-side-nav" style={extend({}, {width}, style)}>
                <ul className="el-nav">
                    {
                        router.map((item, index)=> {
                            return (
                                <li key={index}>
                                    {item}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

Nav.defaultProps = {
    width: 220
};