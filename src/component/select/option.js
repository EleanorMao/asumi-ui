/**
 * Created by elly on 2017/4/8.
 */
import React, {Component, PropTypes} from 'react';

export default  class Option extends Component {
    constructor(props) {
        super(props);
    }

    selectRender(selected, multiple) {
        if (multiple) {
            if (selected) {
                return <span className="el-select-selected fa fa-check-square"/>;
            } else {
                return <span className="el-select-unselected fa fa-square-o"/>;
            }
        } else {
            return selected ? <span className="el-select-selected fa fa-check"/> : null;
        }
    }

    render() {
        let {label, value, disabled, multiple, selected, onChange} = this.props;
        return (
            <li
                className={disabled ? 'el-disabled' : ''}
                onClick={disabled ? null : (e) => onChange(e, value, !selected)}>
                {label}
                {this.selectRender(selected, multiple)}
            </li>
        )
    }
}

Option.propTypes = {};

Option.defaultProps = {};