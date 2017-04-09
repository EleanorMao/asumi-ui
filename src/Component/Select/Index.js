/**
 * Created by elly on 2017/4/8.
 */
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export default  class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange(event) {

    }

    render() {
        let {size, multi, onChange, ...other}=this.props;
        return (
            <select {...other} onChange={this.handleChange.bind(this)}>

            </select>
        )
    }
}

Select.propTypes = {
    multi: PropTypes.bool,
    size: PropTypes.oneOf(['default', 'large', 'small'])
};

Select.defaultProps = {};