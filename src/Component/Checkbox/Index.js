/**
 * Created by elly on 2017/4/8.
 */
import React, {Component, PropTypes} from 'react';

export default  class Checkbox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {type} = this.props;
    }
}

Checkbox.propTypes = {
    type: PropTypes.oneOf(['radio', 'checkbox'])
};

Checkbox.defaultProps = {
    type: 'radio'
};