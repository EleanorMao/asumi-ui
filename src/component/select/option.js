/**
 * Created by elly on 2017/4/8.
 */
import React, {Component} from 'react';
import classnames         from 'classnames';
import PropTypes          from 'prop-types';

export default class Option extends Component {
    constructor(props) {
        super(props);
    }

    handleClick(e) {
        let {value, disabled, selected, onChange, onDisableChange} = this.props;
        if (disabled) {
            if (onDisableChange) onDisableChange(e, value);
        } else {
            onChange(e, value, !selected);
        }
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
        let {label, disabled, multiple, className, selected} = this.props;
        let _className = classnames({
            'el-disabled': disabled,
            [className]: !!className
        });
        return (
            <li className={_className}
                aria-disabled={disabled ? 'disabled' : ''}
                aria-selected={selected ? 'selected' : 'unselected'}
                onClick={this.handleClick.bind(this)}>
                {label}
                {this.selectRender(selected, multiple)}
            </li>
        );
    }
}

Option.propTypes = {};

Option.defaultProps = {
    className: ""
};