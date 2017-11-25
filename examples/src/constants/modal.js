/**
 * Created by elly on 2017/4/18.
 */
export const confirm = `import {Button, Modal} from 'asumi';

class Foo extends Component {
    constructor(props) {
        super(props);
    }

    handleShow() {
        Modal.confirm({
            title: 'Confirm Title',
            content: '今天吃不吃龙虾饭？',
            onOk: () => {
                alert('没毛病！')
            },
            onClose: () => {
                alert('╮(╯_╰)╭')
            },
            okText: '吃',
            closeText: '( *^-^)ρ(*╯^╰)不吃'
        });
    }
    
    render(){
        return (
            <Button
                type="primary"
                onClick={this.handleShow.bind(this)}
            >confirm</Button>
        )
    }
}`;

export const basic = `import {Button, Modal} from 'asumi';

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    handleClick(visible) {
        this.setState(prev => {
            prev.visible = visible;
            return prev;
        })
    }
    
    render(){
        return (
            <div>
                <Button
                    type="primary"
                    onClick={this.handleClick.bind(this, true)}
                >basic modal</Button>

                <Modal
                    visible={this.state.visible}
                    title="Normal Modal"
                    onOk={this.handleClick.bind(this, false)}
                    onClose={this.handleClick.bind(this, false)}
                >
                    Modal Content
                </Modal>
            </div>
        )
    }
}`;

export const size = `import {Button, Modal} from 'asumi';

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible2: false,
            visible3: false,
        }
    }

    handleClick(name, visible) {
        this.setState(prev => {
            prev[name] = visible;
            return prev;
        })
    }
    
    render(){
        let {visible2, visible3} = this.state;
        return (
            <div>
                <Button
                    type="success"
                    style={{marginRight: 10}}
                    onClick={this.handleClick.bind(this, 'visible2', true)}
                >small modal</Button>
                <Modal
                    size="small"
                    visible={visible2}
                    title="Small Modal"
                    onOk={this.handleClick.bind(this, 'visible2', true)}
                    onClose={this.handleClick.bind(this, 'visible2', false)}
                >
                    Modal Content
                </Modal>

                <Button
                    type="warning"
                    onClick={this.handleClick.bind(this, 'visible3', true)}
                >large modal</Button>
                <Modal
                    size="large"
                    title="Large Modal"
                    visible={visible3}
                    onOk={this.handleClick.bind(this, 'visible3', false)}
                    onClose={this.handleClick.bind(this, 'visible3', false)}
                >
                    Modal Content
                </Modal>
            </div>
        )
    }
}`;

export const footer = `import {Button, Modal} from 'asumi';

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible4: false,
            visible5: false,
        }
    }

    handleClick(name, visible) {
        this.setState(prev => {
            prev[name] = visible;
            return prev;
        })
    }
    
    render(){
        let {visible4, visible5} = this.state;
        return (
            <div>
                <Button
                    type="success"
                    style={{marginRight: 10}}
                    onClick={this.handleClick.bind(this, 'visible4', true)}
                >no footer</Button>
                <Modal
                    footer={null}
                    visible={visible4}
                    title="No Footer Modal"
                    onOk={this.handleClick.bind(this, 'visible4', false)}
                    onClose={this.handleClick.bind(this, 'visible4', false)}
                >
                    Modal Content
                </Modal>

                <Button
                    type="warning"
                    onClick={this.handleClick.bind(this, 'visible5', true)}
                >modal</Button>
                <Modal
                    okText="OK"
                    closeText="Cancel"
                    title="Customer Footer Text Modal"
                    visible={visible5}
                    onOk={this.handleClick.bind(this, 'visible5', false)}
                    onClose={this.handleClick.bind(this, 'visible5', false)}
                >
                    Modal Content
                </Modal>
            </div>
        )
    }
}`;

export const mask = `import {Button, Modal} from 'asumi';

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible6: false,
        }
    }

    handleClick(name, visible) {
        this.setState(prev => {
            prev[name] = visible;
            return prev;
        })
    }
    
    render(){
        let {visible6} = this.state;
        return (
            <div>
                <Button type="danger" onClick={this.handleClick.bind(this, 'visible6', true)}>no mask</Button>
                <Modal
                    mask={false}
                    title="No Mask Modal"
                    visible={visible6}
                    onOk={this.handleClick.bind(this, 'visible6', false)}
                    onClose={this.handleClick.bind(this, 'visible6', false)}
                >
                    Modal Content
                </Modal>
            </div>
        )
    }
}`;

export const api = [{
    property: "visible",
    type: "bool",
    'default': "false",
    description: "whether show modal"
}, {
    property: "size",
    type: "string",
    'default': "default",
    description: "Size of button. Options: small, default, large"
}, {
    property: "mask",
    type: "bool",
    'default': "true",
    description: "whether show mask"
}, {
    property: "title",
    type: "any",
    'default': "",
    description: "modal title"
}, {
    property: "footer",
    type: "any",
    'default': "",
    description: "modal footer."
}, {
    property: "okText",
    type: "any",
    'default': "确定",
    description: "ok button text"
}, {
    property: "closeText",
    type: "any",
    'default': "取消",
    description: "close button text"
}, {
    property: "ok",
    type: "bool",
    'default': "true",
    description: "whether show ok button"
}, {
    property: "close",
    type: "bool",
    'default': "true",
    description: "whether close ok button"
}, {
    property: "onOk",
    type: "func",
    'default': "()=>{}",
    description: "invoke when click ok button"
}, {
    property: "onClose",
    type: "func",
    'default': "()=>{}",
    description: "invoke when click close button"
}, {
    property: "style",
    type: "object",
    'default': "",
    description: "modal style"
}, {
    property: "className",
    type: "string",
    'default': "",
    description: "modal class name"
}, {
    property: "content",
    type: "any",
    'default': "",
    description: "same as children, only work on confirm"
}];