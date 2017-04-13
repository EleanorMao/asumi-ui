/**
 * Created by elly on 2017/4/7.
 */
import React, {Component, PropTypes} from 'react';

export default  class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: props.defaultActiveKey
        }
    }

    componentWillReceiveProps(props) {
        this.setState({activeKey: props.defaultActiveKey});
    }

    handleClick(key) {
        this.setState({activeKey: key});
    }

    render() {
        let {type, children}=this.props;
        let {activeKey} =this.state;
        let isCard = type === "card" ? " el-card" : "";
        return (
            <div className={"el-tabs"}>
                <ul className={`el-tabs-nav${isCard} clearfix`}>
                    {React.Children.map(children, (elm)=> {
                        let key = elm.key;
                        let {label}=elm.props;
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
                    {React.Children.map(children, (elm)=> {
                        let key = elm.key;
                        return React.cloneElement(elm, {_active: activeKey === key})
                    })}
                </div>
            </div>
        )
    }
}

Tabs.propTypes = {};

Tabs.defaultProps = {};