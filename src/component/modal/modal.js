/**
 * Created by elly on 2017/4/7.
 */
import React, {Component}                           from 'react';
import PropTypes                                    from 'prop-types';
import Button                                       from '../button';
import Animate                                      from '../animate';
import classnames                                   from 'classnames';
import {noop, getScrollBarWidth, addEvent, KeyCode} from "../util";

export default class Modal extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if ((window.innerHeight || document.documentElement.clientHeight) < document.body.scrollHeight) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = getScrollBarWidth() + 'px';
        }
        addEvent(document, 'keydown', this.handleKeyDown.bind(this));
    }

    componentWillUnmount() {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }

    handleKeyDown(e) {
        let keyCode = e.keyCode;
        if (keyCode === KeyCode.ESC) {
            this.close(e);
        }
    }

    handleMaskClose(e) {
        if (e.target === e.currentTarget) {
            this.close(e);
        }
    }

    close(e) {
        if (this.props.onClose) {
            this.props.onClose(e);
        }
    }

    render() {
        let {
            size, mask, title, style, okText, closeText,
            className, footer, children, close, ok, onOk, maskCloseable,
        } = this.props;
        let _classNames = classnames({
            'el-modal-content': true,
            [className]: className
        });
        let _modalClassName = classnames({
            'el-modal': true,
            'el-small': size === "small",
            'el-large': size === "large"
        });
        return (
            <div>
                {!!mask && <div className="el-mask"/>}
                <div className="el-modal-wrapper" role="dialog" tabIndex={-1}
                     onClick={maskCloseable ? this.handleMaskClose.bind(this) : null}>
                    <Animate key="modal" component="" transitionAppear
                             transitionName={{appear: 'el-zoom-enter', leave: 'el-zoom-leave'}}>
                        <div className={_modalClassName} role="document">
                            <div className={_classNames} style={style}>
                                <div className="el-modal-close"
                                     onClick={this.close.bind(this)} aria-label="Close">×
                                </div>
                                {!!title && <div className="el-modal-header">{title}</div>}
                                <div className="el-modal-body">{children}</div>
                                {footer !== null &&
                                <div className="el-modal-footer">
                                    {footer ||
                                    <div>
                                        {close && <Button
                                            style={{marginRight: 10}}
                                            size={size === "large" ? "default" : "small"}
                                            onClick={this.close.bind(this)}>{closeText}</Button>}
                                        {ok &&
                                        <Button
                                            type="primary"
                                            size={size === "large" ? "default" : "small"}
                                            onClick={onOk}>{okText}</Button>}
                                    </div>}
                                </div>}
                            </div>
                        </div>
                    </Animate>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    ok: PropTypes.bool,
    mask: PropTypes.bool,
    onOk: PropTypes.func,
    title: PropTypes.any,
    okText: PropTypes.any,
    footer: PropTypes.any,
    close: PropTypes.bool,
    onClose: PropTypes.func,
    style: PropTypes.object,
    closeText: PropTypes.any,
    className: PropTypes.string,
    maskCloseable: PropTypes.bool,
    size: PropTypes.oneOf(['default', 'small', 'large'])
};

Modal.defaultProps = {
    ok: true,
    mask: true,
    close: true,
    maskCloseable: true,
    okText: '确定',
    closeText: '取消',
    onOk: noop,
    onClose: noop
};
