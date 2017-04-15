/**
 * Created by elly on 2017/4/7.
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import {extend}from '../util';

export default  class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            className: '',
        }
    }

    componentWillMount() {
        this.setState({className: 'el-move-down'});
    }

    componentDidMount() {
        let {duration, onDestroy}=this.props;
        this.timer = setTimeout(()=> {
            this.setState({className: 'el-move-up'}, ()=> {
                onDestroy();
            });
        }, duration);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        this.timer = null;
    }

    render() {
        let {icon, type, content}=this.props;
        let _className = classnames('el-message', this.state.className, type ? `el-${type}` : '');
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
    type: PropTypes.oneOf(['info', 'success', 'warning', 'danger'])
};

Message.defaultProps = {
    duration: 3000
};

function confirm(props) {
    let content = document.querySelector('.el-message-wrapper');
    let div = document.createElement('div');
    if (!content) {
        content = document.createElement('div');
        content.className = 'el-message-wrapper';
        document.body.appendChild(content);
    }

    function remove() {
        setTimeout(()=> {
            ReactDOM.unmountComponentAtNode(div);
        }, 300);
    }

    ReactDOM.render(<Message {...props} onDestroy={remove}/>, div);
    content.appendChild(div);
}

Message.confirm = (props)=> {
    return confirm(props)
};

Message.info = (props)=> {
    props = extend({}, {type: 'info', icon: <i className="fa fa-info-circle"/>}, props);
    return confirm(props)
};

Message.warning = (props)=> {
    props = extend({}, {type: 'warning', icon: <i className="fa fa-exclamation-triangle"/>}, props);
    return confirm(props)
};

Message.success = (props)=> {
    props = extend({}, {type: 'success', icon: <i className="fa fa-smile-o"/>}, props);
    return confirm(props)
};

Message.danger = (props)=> {
    props = extend({}, {type: 'danger', icon: <i className="fa fa-close"/>}, props);
    return confirm(props)
};