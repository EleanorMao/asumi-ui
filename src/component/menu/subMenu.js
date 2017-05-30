/**
 * Created by elly on 2017/5/26.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default  class SubMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open
        }
    }

    handleToggle(e) {
        e.preventDefault();
        this.setState(prev => {
            prev.open = !prev.open;
            return prev;
        })
    }

    render() {
        let {title, openAll, defaultOpenKey, children} = this.props;
        return (
            <li className={`el-submenu${this.state.open ? ' el-submenu-expand' : ' el-submenu-closed'}`}>
                <div className="el-submenu-title" onClick={this.handleToggle.bind(this)}>{title}</div>
                <ul className="el-submenu-list">
                    {React.Children.map(children, (elm) => {
                        let open = openAll;
                        if (!open && defaultOpenKey === elm.key) open = true;
                        return React.cloneElement(elm, {open, openAll, defaultOpenKey});
                    })}
                </ul>
            </li>
        )
    }
}

SubMenu.propTypes = {};

SubMenu.defaultProps = {};