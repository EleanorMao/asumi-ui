/**
 * Created by elly on 2017/4/7.
 */
import React, {Component} from 'react';
import PropTypes          from 'prop-types';
import ReactDOM           from 'react-dom';
import Animate            from '../animate';
import classnames         from 'classnames';
import {extend}           from '../util';

let uuid = 1;
let _el_message_content = null;

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.timer = null;
    }

    componentDidMount() {
        let {duration} = this.props;
        if (duration) {
            this.timer = setTimeout(() => {
                if (this.timer) {
                    this.handleDestroy();
                }
            }, duration);
        }
    }

    handleDestroy(){
        this.props.onDestroy();
        window.clearTimeout(this.timer);
        this.timer = null;
    }

    render() {
        let {icon, type, content} = this.props;
        let _className = classnames('el-message', 'el-move-down', type ? `el-${type}` : '');
        return (
            <div className={_className} onClick={this.handleDestroy.bind(this)}>
                {!!icon && <span className="el-message-icon">{icon}</span>}
                <span className="el-message-content" dangerouslySetInnerHTML={{__html: content}}/>
            </div>
        );
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

    componentDidMount() {
        this.props.getRef(this);
    }

    removeMessage({key, onClose}) {
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
        }, () => {
            onClose && onClose();
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
                                onDestroy={this.removeMessage.bind(this, props)}
                            />
                        );
                    })}
                </Animate>
            </div>
        );
    }
}

MessageGroup.defaultProps = {
    getRef: () => {
    }
};

function confirm(props) {
    if (!_el_message_content) {
        const div = document.createElement('div');
        document.body.appendChild(div);
        const renderToDom = ReactDOM.render || ReactDOM.hydrate;
        renderToDom(<MessageGroup getRef={c => {
            _el_message_content = c;
            pushMessage(props);
        }}/>, div);
    } else {
        pushMessage(props);
    }
}

function pushMessage(props) {
    if (!_el_message_content) return;
    _el_message_content.setState(prev => {
        prev.list = prev.list.concat(props);
        return prev;
    });
}

Message.confirm = (props) => {
    if (typeof props === "string") {
        props = {content: props};
    }
    return confirm(props);
};

Message.info = (props) => {
    if (typeof props === "string") {
        props = {content: props};
    }
    props = extend({type: 'info', icon: <i className="fa fa-info-circle"/>,}, props);
    return confirm(props);
};

Message.warning = (props) => {
    if (typeof props === "string") {
        props = {content: props};
    }
    props = extend({type: 'warning', icon: <i className="fa fa-exclamation-triangle"/>,}, props);
    return confirm(props);
};

Message.success = (props) => {
    if (typeof props === "string") {
        props = {content: props};
    }
    props = extend({type: 'success', icon: <i className="fa fa-smile-o"/>,}, props);
    return confirm(props);
};

Message.danger = Message.error = (props) => {
    if (typeof props === "string") {
        props = {content: props};
    }
    props = extend({type: 'danger', icon: <i className="fa fa-close"/>,}, props);
    return confirm(props);
};

Message.loading = (props) => {
    if (typeof props === "string") {
        props = {content: props};
    }
    props = extend({icon: <i className="fa fa-circle-o-notch fa-spin"/>}, props);
    return confirm(props);
};