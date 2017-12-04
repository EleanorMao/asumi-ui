/**
 * Created by elly on 2017/4/7.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {isArr} from '../util';

function toArr(v) {
    if (isArr(v)) {
        return v
    } else {
        return v ? [v] : [];
    }
}

export default class Tabs extends Component {
    constructor(props) {
        super(props);
        let child = toArr(props.children)[0];
        let activeId = props.activeId == null ? child ? child.props.id : null : props.activeId;
        this.state = {
            activeId: activeId
        }
    }

    componentWillReceiveProps(props) {
        if (props.activeId != this.props.activeId) {
            this.setState({activeId: props.activeId});
        }
    }

    handleClick(id) {
        this.setState({activeId: id});
        this.props.onClick && this.props.onClick(id);
    }

    render() {
        let {type, children} = this.props;
        let {activeId} = this.state;
        let isCard = type === "card" ? " el-card" : "";
        let renderChildren = React.Children.toArray(children);
        return (
            <div className={"el-tabs"}>
                <ul className={`el-tabs-nav${isCard} clearfix`}>
                    {React.Children.map(renderChildren, (elm) => {
                        if (!elm) return;
                        let {label, id} = elm.props;
                        return (
                            <li
                                key={id}
                                onClick={this.handleClick.bind(this, id)}
                                className={activeId === id ? "el-tabs-nav-active" : ""}>
                                <a href="javascript:;">
                                    {label}
                                </a>
                            </li>
                        )
                    })}
                </ul>
                <div className={`el-tabs-content${isCard}`}>
                    {React.Children.map(renderChildren, (elm) => {
                        if (!elm) return;
                        let {id} = elm.props;
                        return React.cloneElement(elm, {_active: activeId === id})
                    })}
                </div>
            </div>
        )
    }
}

Tabs.propTypes = {
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['default', 'line', 'card']),
    activeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Tabs.defaultProps = {};