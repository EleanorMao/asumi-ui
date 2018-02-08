/**
 * Created by elly on 2017/4/10.
 */
import React    from 'react';
import ReactDOM from 'react-dom';
import Modal    from './modal';

export default function confirm(props) {
    let div = document.createElement('div');
    document.body.appendChild(div);

    let onOk = props.onOk;
    let onClose = props.onClose;
    props.onClose = close;
    props.onOk = ok;

    function remove() {
        if (ReactDOM.unmountComponentAtNode(div) && div) {
            document.body.removeChild(div);
        }
    }

    function ok() {
        remove();
        onOk && onOk();
    }

    function close() {
        remove();
        onClose && onClose();
    }

    const renderToDom = ReactDOM.render || ReactDOM.hydrate;
    renderToDom(
        <Modal {...props}>
            {props.content}
        </Modal>, div);
}

