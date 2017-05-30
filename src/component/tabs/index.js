/**
 * Created by elly on 2017/4/7.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default  class Tabs extends Component {
    constructor(props) {
        super(props);
        let activeKey = props.defaultActiveKey == null ? props.children[0].key : props.defaultActiveKey;
        this.state = {
            activeKey: activeKey
        }
    }

    componentWillReceiveProps(props) {
        if (props.defaultActiveKey != this.props.defaultActiveKey) {
            this.setState({activeKey: props.defaultActiveKey});
        }
    }

    handleClick(key) {
        this.setState({activeKey: key});
        this.props.onClick && this.props.onClick(key);
    }

    render() {
        let {type, children} = this.props;
        let {activeKey} = this.state;
        let isCard = type === "card" ? " el-card" : "";
        return (
            <div className={"el-tabs"}>
                <ul className={`el-tabs-nav${isCard} clearfix`}>
                    {React.Children.map(children, (elm) => {
                        let key = elm.key;
                        let {label} = elm.props;
                        return (
                            <li
                                key={key}
                                onClick={this.handleClick.bind(this, key)}
                                className={activeKey === key ? "el-tabs-nav-active" : ""}>
                                <a href="javascript:;">
                                    {label}
                                </a>
                            </li>
                        )
                    })}
                </ul>
                <div className={`el-tabs-content${isCard}`}>
                    {React.Children.map(children, (elm) => {
                        let key = elm.key;
                        return React.cloneElement(elm, {_active: activeKey === key})
                    })}
                </div>
            </div>
        )
    }
}

Tabs.propTypes = {
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['default', 'line', 'card']),
    defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Tabs.defaultProps = {};