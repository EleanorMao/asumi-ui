/**
 * Created by elly on 2017/5/26.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class SubMenu extends Component {
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
        let {title, openAll, openKey, children} = this.props;
        return (
            <li className={`el-submenu${this.state.open ? ' el-submenu-expand' : ' el-submenu-closed'}`}>
                <div className="el-submenu-title" onClick={this.handleToggle.bind(this)}>{title}</div>
                <ul className="el-submenu-list">
                    {React.Children.map(children, (elm) => {
                        if (!elm) return;
                        let open = openAll;
                        if (!open && openKey === elm.key) open = true;
                        return React.cloneElement(elm, {open, openAll, openKey});
                    })}
                </ul>
            </li>
        )
    }
}

SubMenu.propTypes = {
    title: PropTypes.any,
    openAll: PropTypes.bool,
    openKey: PropTypes.any
};

SubMenu.defaultProps = {};