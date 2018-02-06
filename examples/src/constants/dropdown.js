export const basic = `import {Dropdown} from 'asumi';

class Foo extends Component {
    constructor(props) {
        super(props);
    }

    handleClick(item) {
        console.log(item);
    }
    
    render(){
        const basicList = ['HOME', 'Dropdown'];
        return (
            <div>
                <Dropdown
                    list={basicList}
                    onClick={this.handleClick.bind(this)}>
                    Menu
                </Dropdown>
                <Dropdown
                    type="primary"
                    list={basicList}
                    onClick={this.handleClick.bind(this)}>
                    Menu
                </Dropdown>
                <Dropdown
                    type="secondary"
                    list={basicList}
                    onClick={this.handleClick.bind(this)}>
                    Menu
                </Dropdown>
                <Dropdown
                    type="success"
                    list={basicList}
                    onClick={this.handleClick.bind(this)}>
                    Menu
                </Dropdown>
                <Dropdown
                    type="danger"
                    list={basicList}
                    onClick={this.handleClick.bind(this)}>
                    Menu
                </Dropdown>
            </div>
        )
    }
}
`;

export const link = `import {Dropdown} from 'asumi';

class Foo extends Component {
    constructor(props) {
        super(props);
    }

    handleClick(item) {
        console.log(item);
    }
    
    render(){
        const linkList = [{label: 'HOME', href: '/'}, {label: 'Dropdown', href: '/dropdown'}];
        return (
            <div>
                <Dropdown
                    type="success"
                    list={linkList}
                    onClick={this.handleClick.bind(this)}>
                    Menu
                </Dropdown>
            </div>
        )
    }
}
`;

export const select = `import {Dropdown} from 'asumi';

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'Dropdown'
        }
    }

    handleClick(item) {
        console.log(item);
    }
    
    render(){
        const basicList = ['HOME', 'Dropdown'];
        return (
            <div>
                <Dropdown
                    type="primary"
                    list={basicList}
                    onClick={this.handleSelect.bind(this)}>
                    {this.state.current}
                </Dropdown>
            </div>
        )
    }
}
`;

export const api = [{
    property: "type",
    type: "string",
    'default': "default",
    description: "Style of dropdown. Options: default, text, danger, success, primary, secondary, warning, error."
}, {
    property: 'placement',
    type: "string",
    'default': 'auto',
    description: 'Options: auto, top, bottom'
}, {
    property: "style",
    type: "bool",
    'default': "null",
    description: "dropdown style"
}, {
    property: "className",
    type: "string",
    'default': "",
    description: "dropdown class name"
}, {
    property: "onClick",
    type: "function",
    'default': "(item)=>{}",
    description: "Callback when click drop menu"
}, {
    property: "list",
    type: "array | {href: string, label: any}",
    'default': "[]",
    description: "menu list"
}];
