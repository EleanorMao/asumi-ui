/**
 * Created by elly on 2017/4/7.
 */
import React, {Component, PropTypes} from 'react';
import Button from '../Button';
import classnames from 'classnames';

export default  class Modal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {size, title, style, className, footer, children, onSure, onClose}=this.props;
        let _classNames = classnames({
            'el-modal-content': true,
            'el-small': size === "small",
            'el-large': size === "large",
            className
        });
        return (
            <div>
                <div className="el-mask"></div>
                <div className="el-modal-wrapper">
                    <div className="el-modal">
                        <div className={_classNames} style={style}>
                            <div className="el-modal-close" onClick={this.props.onClose}>×</div>
                            <div className="el-modal-header">{title}</div>
                            <div className="el-modal-body">{children}</div>
                            {footer !== null &&
                            <div className="el-modal-footer">
                                {footer ||
                                (<div>
                                    <Button
                                        style={{marginRight: 10}}
                                        size={size === "large" ? "default" : "small"}
                                        onClick={onClose}>取消</Button>
                                    <Button
                                        type="primary"
                                        size={size === "large" ? "default" : "small"}
                                        onClick={onSure}>确定</Button>
                                </div>)}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Modal.propTypes = {
    onSure: PropTypes.func,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['default', 'small', 'large'])
};

Modal.defaultProps = {
    onSure: ()=> {
    },
    onClose: ()=> {
    }
};