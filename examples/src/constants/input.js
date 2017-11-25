/**
 * Created by elly on 2017/4/18.
 */
export const basic = `import {Input, Group} from 'asumi';

let style = {
    width: 300,
    marginBottom: 10,
    verticalAlign: 'top'
}

ReactDOM.render(
<div>
    <Group style={style} name="normal">
        <Input placeholder="normal input"/>
        <Input type="textarea" placeholder="normal textarea"/>
        <Input placeholder="disabled input" disabled/>
        <Input type="textarea" placeholder="disabled textarea" disabled/>
    </Group>
</div>, div)`;

export const size = `import {Input, Group} from 'asumi';

let style = {
    width: 300,
    marginBottom: 10,
    verticalAlign: 'top'
}

ReactDOM.render(
<div>
    <Group style={style} size="large" name="normal">
        <Input placeholder="large input"/>
        <Input type="textarea" placeholder="large textarea"/>
    </Group>
    <Group style={style} name="normal">
        <Input placeholder="default input"/>
        <Input type="textarea" placeholder="default textarea"/>
    </Group>
    <Group style={style} size="small" name="normal">
        <Input placeholder="small input"/>
        <Input type="textarea" placeholder="small textarea"/>
    </Group>
</div>, div)`;

export const icon = `import {Input, Group} from 'asumi'

ReactDOM.render(
<div>
    <Input icon={<i className="fa fa-bed"/>}/>
</div>,div)`;
export const pattern = `import {Input, Group} from 'asumi';

let style = {
    width: 300,
    marginBottom: 10,
    verticalAlign: 'top'
}

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            demo: "",
            color: "",
            price: "",
            nature: "",
            positiveInt: ""
        }
    }

    handleChange({name, value}) {
        this.setState(prev=> {
            prev[name] = value;
            return prev;
        })
    }
    
    render(){
        return (
            <Group style={style} onChange={this\.handleChange\.bind(this)}>
                <Input name="color" value={color} placeholder="color" rule="color"/>
                <Input name="price" value={price} placeholder="price" rule="price"/>
                <Input name="nature" value={nature} placeholder="nature" rule="nature"/>
                <Input name="positiveInt" value={positiveInt} placeholder="positiveInt" rule="positiveInt"/>
                <Input name="demo" value={demo} placeholder="customer pattern /^[a-z]*$/" pattern={/^[a-z]*$/}/>
            </Group>
        
        )
    }
}`;

export const prefix = `import {Input, Group} from 'asumi';

let style = {
    width: 300,
    marginBottom: 10,
    verticalAlign: 'top'
}

ReactDOM.render(
<div>
    <Group style={style}>
        <Input placeholder="prefix input" prepend="Http://"/>
        <Input placeholder="prefix input" append=".com"/>
        <Input placeholder="prefix input" prepend="Http://" append=".com"/>
    </Group>
</div>, div)`;

export const api = [{
    property: "type",
    type: "string",
    'default': "text",
    description: "Type of input. Options: text, textarea, color or others if you want but not recommend)"
}, {
    property: "size",
    type: "string",
    'default': "default",
    description: "Size of Input. Options: small, default, large"
}, {
    property: "disabled",
    type: "boolean",
    'default': "null",
    description: "Disable input",
}, {
    property: "rule",
    type: "string",
    'default': "null",
    description: "Rule of value.Test value when value change. Options: color(/^#[0-9a-fA-F]{0,6}$/), price(/^((0|[1-9]\d{0,7})(\.\d{0,2})?)?$/), nature(/^(0?|[1-9]\d{0,7})$/), positiveInt( /^([1-9]\d{0,7})?$/)"
}, {
    property: "pattern",
    type: "RegExp",
    'default': "null",
    description: "Regexp pattern"
}, {
    property: "icon",
    type: "any",
    'default': "null",
    description: "icon of input"
}, {
    property: "prepend",
    type: "any",
    'default': "null",
    description: "Input with prefix icon",
}, {
    property: "append",
    type: "any",
    'default': "null",
    description: "Input with suffix icon",
}, {
    property: "onChange",
    type: "function",
    'default': "({e, name, value})=>{}",
    description: "Callback when value change",
}, {
    property: "onPressEnter",
    type: "function",
    'default': "(e)=>{}",
    description: "Callback when enter pressed",
}, {
    property: "...others",
    type: "",
    'default': "",
    description: "Other property can work on a \<input\> tag"
}];
