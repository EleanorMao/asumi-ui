/**
 * Created by elly on 16/9/19.
 */
import React, {Component}                      from 'react';
import PropTypes                               from 'prop-types';
import classnames                              from 'classnames';
import {contains, addEvent, removeEvent, noop} from '../util';

export default class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {toggle: false, className: props.placement === 'top' ? 'el-dropdown-menu-bottom' : ''};
    }

    componentDidMount() {
        let placement = this.props.placement;
        if (!placement || placement === 'auto') {
            this.getClassName();
            addEvent(window, 'resize', this.getClassName.bind(this));
        }
        addEvent(window, 'click', this.clickToClose.bind(this));
    }

    componentWillUnmount() {
        removeEvent(window, 'click', this.clickToClose.bind(this));
        removeEvent(window, 'resize', this.getClassName.bind(this));
    }

    componentWillReceiveProps({list, placement}) {
        if (this.state.toggle) {
            this.setState(old => {
                old.toggle = false;
                return old;
            });
        }
        if ((!placement || placement === 'auto') && this._dropdown && list.length !== this.props.list.length) {
            this.getClassName(list);
        } else if (placement !== this.props.placement) {
            this.setState({className: placement === 'top' ? 'el-dropdown-menu-bottom' : ''});
        }
    }

    getClassName(list = this.props.list) {
        let className = '';
        if (this._dropdown && this._dropdown_menu && this._dropdown.getBoundingClientRect) {
            let {bottom, top} = this._dropdown.getBoundingClientRect();
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            let bodyHeight = document.body.offsetHeight || document.documentElement.offsetHeight;
            let offsetBottom = bodyHeight - bottom - scrollTop;
            if (top + scrollTop > offsetBottom && offsetBottom < list.length * 40) {
                className = 'el-dropdown-menu-bottom';
            }
        }
        this.setState({className});
    }

    handleToggle() {
        this.setState(old => {
            old.toggle = !old.toggle;
            return old;
        });
    }

    clickToClose(e) {
        const target = this._dropdown;
        if (target && !contains(target, e.target)) {
            this.setState(old => {
                old.toggle = false;
                return old;
            });
        }
    }

    render() {
        const {list, type, className, style, children, onClick} = this.props;
        let _className = classnames({
            'el-btn': true,
            'el-dropdown-toggle': true,
            'el-success': type === 'success',
            'el-primary': type === 'primary',
            'el-danger': type === 'danger' || type === 'error',
            'el-secondary': type === 'secondary' || type === 'warning',
            [className]: !!className
        });
        return (
            <div className="el-dropdown" style={style} ref={(c) => {
                this._dropdown = c;
            }}>
                <button
                    type="button"
                    className={_className}
                    onClick={this.handleToggle.bind(this)}>
                    {children}
                    <span
                        className="el-caret"
                        style={this.state.toggle ? {borderTop: 0, borderBottom: '4px solid'} : null}/>
                </button>
                <ul className={"el-dropdown-menu " + this.state.className} ref={(c) => {
                    this._dropdown_menu = c;
                }} style={{display: this.state.toggle && 'block' || null}}>
                    {
                        list.map((item, index) => {
                            return (
                                <li key={index}>
                                    <a href={item.href || 'javascript:;'}
                                       onClick={(e) => {
                                           if (!item.href) {
                                               e.preventDefault();
                                           }
                                           onClick(item);
                                       }}>{item.label || item}</a>
                                </li>);
                        })
                    }
                </ul>
            </div>
        );
    }
}

Dropdown.propTypes = {
    style: PropTypes.object,
    onClick: PropTypes.func,
    className: PropTypes.string,
    placement: PropTypes.oneOf(['auto', 'top', 'bottom']),
    type: PropTypes.oneOf(['default', 'danger', 'success', 'primary', 'secondary', 'warning', 'error']),
    list: PropTypes.oneOfType([PropTypes.array, PropTypes.shape({
        href: PropTypes.string,
        label: PropTypes.any
    })])

};
Dropdown.defaultProps = {
    placement: 'auto',
    type: 'default',
    onClick: noop
};