/**
 * Created by elly on 2017/4/8.
 */
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

export default  class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let {size, multiple, onChange, wrapperClassName, className, children, ...other}=this.props;
        let _className = classnames('el-select-wrapper', wrapperClassName, size ? `el-${size}` : '');
        return (
            <div className={_className}>

            </div>
        )
    }
}

Select.propTypes = {
    multiple: PropTypes.bool,
    size: PropTypes.oneOf(['default', 'large', 'small'])
};

Select.defaultProps = {};