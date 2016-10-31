/**
 * Created by elly on 16/9/19.
 */
import React, {Component} from 'react';

function contains(root, el) {
    if (root.compareDocumentPosition)
        return root === el || !!(root.compareDocumentPosition(el) & 16);

    if (root.contains && el.nodeType === 1)
        return root.contains(el) && root !== el;

    while (el = el.parentNode)
        if (el === root) return true;

    return false;
}

export default class DropdownList extends Component {
    constructor(props) {
        super(props);
        this.state = {toggle: false}
    }

    componentDidMount() {
        window.addEventListener('click', this.clickToClose.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.clickToClose.bind(this))
    }

    componentWillReceiveProps() {
        if (this.state.toggle) {
            this.setState(old=> {
                old.toggle = false;
                return old;
            })
        }
    }

    handleToggle() {
        this.setState(old=> {
            old.toggle = !old.toggle;
            return old;
        })
    }

    clickToClose(e) {
        const target = this.refs.dropdown;
        if (!contains(target, e.target)) {
            this.setState(old=> {
                old.toggle = false;
                return old;
            })
        }
    }

    render() {
        const {list, children, onClick} = this.props;
        return (
            <div className="dropdown" style={{display: 'inline-block'}} ref="dropdown">
                <button className="btn btn-default dropdown-toggle" type="button"
                        onClick={this.handleToggle.bind(this)}>
                    {children}
                    <span className="caret"
                          style={this.state.toggle ? {borderTop: 0, borderBottom: '4px solid'} : null}/>
                </button>
                <ul className="dropdown-menu" style={{display: this.state.toggle && 'block' || null}}>
                    {
                        list.map((item, index) => {
                            return (
                                <li key={index}>
                                    <a href={item.href || '#'}
                                       onClick={(e)=> {
                                           e.preventDefault();
                                           onClick(item)
                                       }}>{item.label || item}</a>
                                </li>);
                        })
                    }
                </ul>
            </div>
        )
    }
}