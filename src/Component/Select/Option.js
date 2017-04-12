/**
 * Created by elly on 2017/4/8.
 */
import React, {Component, PropTypes} from 'react';

export default  class Option extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {label, value, disabled, selected, onChange}=this.props;
        return (
            <li
                className={disabled ? 'el-disabled' : ''}
                onClick={disabled ? null : (e)=>onChange(e, value, !selected)}>
                {label}
                {selected &&
                <span className="el-select-selected fa fa-check">️</span>}
            </li>
        )
    }
}

Option.propTypes = {};

Option.defaultProps = {};