/**
 * Created by elly on 2018/2/4.
 */
import React, {Component} from 'react';
import PropTypes          from 'prop-types';
import classnames         from 'classnames';
import Icon               from '../icon';
import Popover            from '../popover';

export default class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.defaultOpen
        };
    }

    handleToggle() {
        if (!this.props.closeable) return;
        this.setState({open: !this.state.open});
    }

    render() {
        let popover;
        let {open} = this.state;
        let {title, className, closeable, hoverTips, children} = this.props;
        let _className = classnames({
            'el-panel': true,
            'el-expand': closeable && open,
            [className]: className
        });

        if (closeable) {
            if (hoverTips && typeof hoverTips === "string") {
                hoverTips = {title: hoverTips};
            }

            popover = hoverTips ? <Popover {...hoverTips} trigger="hover" placement="top">
                <Icon className="el-panel-button" type="angle-down"/>
            </Popover> : <Icon className="el-panel-button" type={"angle-down"}/>;
        }

        return (
            <div className={_className}>
                {!!title &&
                <div className="el-panel-title" onClick={this.handleToggle.bind(this)}>
                    {title}
                    {popover}
                </div>}
                <div className="el-panel-body" style={closeable ? {display: open ? 'block' : 'none'} : null}>
                    {children}
                </div>
            </div>
        );
    }
}

Panel.propTypes = {
    title: PropTypes.any,
    closeable: PropTypes.bool,
    className: PropTypes.string,
    defaultOpen: PropTypes.bool,
};

Panel.defaultProps = {
    defaultOpen: false,
    closeable: false
};