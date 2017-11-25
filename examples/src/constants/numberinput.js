/**
 * Created by elly on 2017/4/18.
 */
export const basic = `import {NumberInput, Group} from 'asumi';

let style = {
    marginBottom: 10,
    verticalAlign: 'top'
}

ReactDOM.render(
<div>
    <Group style={style} name="normal">
        <NumberInput placeholder="normal"/>
        <NumberInput placeholder="disabled" disabled/>
    </Group>
</div>, div)`;

export const size = `import {NumberInput, Group} from 'asumi';

let style = {
    marginBottom: 10,
    verticalAlign: 'top'
}

ReactDOM.render(
<div>
    <Group style={style} name="normal">
        <NumberInput placeholder="large" size="large"/>
        <NumberInput placeholder="default"/>
        <NumberInput placeholder="small" size="small"/>
    </Group>
</div>, div)`;

export const icon = `import {NumberInput} from 'asumi'

ReactDOM.render(
<div>
    <NumberInput icon={"%"}/>
</div>,div)`;

export const _step = `import {NumberInput} from 'asumi';

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 5
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
            <NumberInput step={5} value={step} name="step" onChange={this\.handleChange\.bind(this)}/>
        )
    }
}`;

export const prefix = `import {NumberInput} from 'asumi';

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: ''
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
            <NumberInput
                prepend="￥"
                name="price"
                value={price}
                onChange={this\.handleChange\.bind(this)}
                dataFormat={value => \`\${value}\`.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',')}
            />
        )
    }
}`;

export const api = [{
    property: "size",
    type: "string",
    'default': "default",
    description: "Size of input. Options: small, default, large"
}, {
    property: "disabled",
    type: "boolean",
    'default': "null",
    description: "Disable input",
}, {
    property: "step",
    type: "number",
    'default': "1",
    description: "multiple when when number change"
}, {
    property: "min",
    type: "number",
    'default': "Number.MIN_SAFE_INTEGER",
    description: "min value"
}, {
    property: "max",
    type: "number",
    'default': "Number.MAX_SAFE_INTEGER",
    description: "max value"
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
    property: "dataFormat",
    type: "function",
    'default': "(value)=>{ return value }",
    description: "format inputted value",
}, {
    property: "onChange",
    type: "function",
    'default': "({e, name, value})=>{}",
    description: "Callback when value change",
}, {
    property: "...others",
    type: "",
    'default': "",
    description: "Other property can work on component Input"
}];
