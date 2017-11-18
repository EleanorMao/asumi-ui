/**
 * Created by elly on 2017/4/7.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Animate from '../animate';
import classnames from 'classnames';
import {extend} from '../util';

let uuid = 1;
let _el_message_content = null;

export default class Message extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {duration, onDestroy} = this.props;
        setTimeout(() => {
            onDestroy()
        }, duration);
    }

    render() {
        let {icon, type, content} = this.props;
        let _className = classnames('el-message', 'el-move-down', type ? `el-${type}` : '');
        return (
            <div className={_className}>
                {!!icon && <span className="el-message-icon">{icon}</span>}
                <span className="el-message-content">{content}</span>
            </div>
        )
    }
}

Message.propTypes = {
    onDestroy: PropTypes.func,
    duration: PropTypes.number,
    type: PropTypes.oneOf(['info', 'success', 'warning', 'danger', 'error'])
};

Message.defaultProps = {
    onDestroy: () => {
    },
    duration: 3000
};

class MessageGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    removeMessage(key) {
        let index = -1, list = this.state.list;
        for (let i = 0, len = list.length; i < len; i++) {
            let props = list[i];
            if (props.key === key) {
                index = i;
                break;
            }
        }
        this.setState(prev => {
            prev.list.splice(index, 1);
            return prev;
        });
    };

    render() {
        return (
            <div className="el-message-wrapper">
                <Animate transitionName={{leaveActive: 'el-move-up'}}>
                    {this.state.list.map((props) => {
                        if (!props.key) {
                            props.key = uuid++;
                        }
                        return (
                            <Message
                                {...props}
                                key={props.key}
                                onDestroy={this.removeMessage.bind(this, props.key)}
                            />
                        )
                    })}
                </Animate>
            </div>
        )
    }
}


function confirm(props) {
    if (!_el_message_content) {
        const div = document.createElement('div');
        document.body.appendChild(div);
        _el_message_content = ReactDOM.render(<MessageGroup/>, div);
    }
    _el_message_content.setState(prev => {
        prev.list = prev.list.concat(props);
        return prev;
    });
}

Message.confirm = (props) => {
    return confirm(props)
};

Message.info = (props) => {
    props = extend({type: 'info', icon: <i className="fa fa-info-circle"/>,}, props);
    return confirm(props)
};

Message.warning = (props) => {
    props = extend({type: 'warning', icon: <i className="fa fa-exclamation-triangle"/>,}, props);
    return confirm(props)
};

Message.success = (props) => {
    props = extend({type: 'success', icon: <i className="fa fa-smile-o"/>,}, props);
    return confirm(props)
};

Message.danger = Message.error = (props) => {
    props = extend({type: 'danger', icon: <i className="fa fa-close"/>,}, props);
    return confirm(props)
};