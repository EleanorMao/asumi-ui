/**
 * Created by elly on 2017/4/18.
 */
export const basic = `import {TagInput} from 'asumi';

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ['二次元', '三次元']
        }
    }

    handleChange({value, name}) {
        this.setState({value})
    }
    
    render(){
        return (
            <div>
                <TagInput
                    value={this.state.value} name="value"
                    onChange={this.handleChange.bind(this)}
                    placeholder="输入回车分割字符"
                />
            </div>
        )
    }
}`;

export const disabled_readOnly = `import {TagInput} from 'asumi';

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ['二次元', '三次元']
        }
    }

    handleChange({value, name}) {
        this.setState({value})
    }
    
    render(){
        return (
            <div>
                <TagInput
                    disabled  
                    value={this.state.value} name="value"
                    onChange={this.handleChange.bind(this)}
                    placeholder="输入回车分割字符"
                />
                 <TagInput
                    readOnly
                    value={this.state.value} name="value"
                    onChange={this.handleChange.bind(this)}
                    placeholder="输入回车分割字符"
                />
            </div>
        )
    }
}`;

export const api = [{
    property: "value",
    type: "array",
    'default': "[]",
    description: "value of tag input"
}, {
    property: "name",
    type: "string",
    'default': "",
    description: "name of tag input"
}, {
    property: "disabled",
    type: "bool",
    'default': "",
    description: "disable tag input"
}, {
    property: "readOnly",
    type: "string",
    'default': "",
    description: "readonly"
}, {
    property: "className",
    type: "string",
    'default': "",
    description: "class name"
}, {
    property: "style",
    type: "object",
    'default': "",
    description: "style"
}, {
    property: "placeholder",
    type: "string",
    'default': "",
    description: "placeholder"
}, {
    property: "separator",
    type: "'enter' | 'space' | number",
    'default': "enter",
    description: "key code which trigger tag create"
}, {
    property: "maxLength",
    type: "number",
    'default': "",
    description: "max length when input"
}, {
    property: "tagProps",
    type: "object",
    'default': "",
    description: "tag's props"
}, {
    property: "onChange",
    type: "func",
    'default': "({name, value})=>{}",
    description: "invoke when tag create or delete"
}, {
    property: "onKeyDown",
    type: "func",
    'default': "(e)=>{}",
    description: "invoke when key down"
}, {
    property: "onBlur",
    type: "func",
    'default': "(e)=>{}",
    description: "invoke when blur"
}, {
    property: "onFocus",
    type: "func",
    'default': "(e)=>{}",
    description: "invoke when focus"
}];
