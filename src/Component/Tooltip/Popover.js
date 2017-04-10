/**
 * Created by elly on 2017/4/10.
 */
import React, {Component, PropTypes} from 'react';

export default  class Popover extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {title, style, content, placement}=this.props;
        return (
            <div
                style={style}
                className={`el-popover el-${placement}`}
            >
                <div className="el-popover-inner">
                    <div className="el-popover-title">
                        {title}
                    </div>
                    {!!content &&
                    <div className="el-popover-body">
                        {content}
                    </div>}
                </div>
            </div>
        )
    }
}

Popover.propTypes = {
    placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom'])
};

Popover.defaultProps = {};