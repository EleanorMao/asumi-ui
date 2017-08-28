/**
 * Created by elly on 2017/4/18.
 */
export const basic = `import {Checkbox} from 'el-ui';

class Foo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: true
        }
    }
    
    handleChange(e) {
        let {name, value, checked} = e;
        this.setState(prev => {
            prev[name] = checked;
            return prev;
        })
    }
    
    render(){
        return (
            <div>
                 <Checkbox
                    value="1"
                    label="normal"
                    name="value"
                    checked={this.state.value}
                    onChange={this.handleChange.bind(this)}/>
            </div>
        )
    }
}

ReactDOM.render(<Foo />, div)`;

export const _switch = `import {Checkbox} from 'el-ui';

class Foo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: true
        }
    }
    
    handleChange(e) {
        let {name, value, checked} = e;
        this.setState(prev => {
            prev[name] = checked;
            return prev;
        })
    }
    
    render(){
        return (
            <div>
                 <Checkbox
                    value="1"
                    name="value"
                    type="switch"
                    label="switch"
                    checked={this.state.value}
                    onChange={this.handleChange.bind(this)}/>
            </div>
        )
    }
}

ReactDOM.render(<Foo />, div)`;

export const disabled = `import {Checkbox} from 'el-ui';

ReactDOM.render(
<div>
    <Checkbox
        disabled
        label="label"
        checked={false}
    />
    <Checkbox
        disabled
        label="label"
        checked={true}
    />
    <Checkbox
        label="switch"
        type="switch"
        disabled
        checked={false}/>
    <Checkbox
        label="switch"
        type="switch"
        disabled
        checked={true}/>
</div>, div)`;

export const indeterminate = `import {Checkbox} from 'el-ui';

ReactDOM.render(
<div>
    <Checkbox
        label="indeterminate"
        indeterminate={true}
    />
</div>, div)`;

export const checkboxGroup = `import {Checkbox} from 'el-ui';
//import {CheckboxGroup} from 'el-ui';

class Foo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedList: [1, 2]
        }
    }
    
    handleSelect({value}) {
        this.setState({checkedList: value});
    }
    
    render(){
        return (
            <div>
                 <Checkbox.Group
                    options={[{
                        label: '组别1',
                        value: 1
                    }, {
                        label: '组别2',
                        value: 2
                    }, {
                        label: '组别3',
                        value: 3
                    }]}
                    checkedList={this.state.checkedList}
                    onChange={this.handleSelect.bind(this)}
                />
                <Checkbox.Group
                    options={[{
                        label: '组别1',
                        value: 1
                    }, {
                        label: '组别2',
                        value: 2
                    }, {
                        label: '组别3',
                        value: 3
                    }]}
                    disableAll={true}
                    checkedList={[]}
                />
            </div>
        )
    }
}

ReactDOM.render(<Foo />, div)`;

//TODO 补全
export const api = [{
    property: "type",
    type: "string",
    'default': "",
    description: "Type of checkbox. Options: switch"
}, {
    property: "label",
    type: "any",
    'default': "",
    description: ""
}, {
    property: "disabled",
    type: "bool",
    'default': "",
    description: "Disable checkbox"
}, {
    property: "checked",
    type: "bool",
    'default': "false",
    description: "Is checkbox checked or not, default is false"
}, {
    property: "onChange",
    type: "function",
    'default': "({e, name, value, checked})=>{}",
    description: "Callback when value change.",
}, {
    property: "style",
    type: "object",
    'default': "",
    description: "Style of checkbox"
}, {
    property: "className",
    type: "object",
    'default': "",
    description: "ClassName of checkbox"
}, {
    property: "children",
    type: "any",
    'default': "",
    description: "Same as label, but the priority is higher than it"
}, {
    property: "...others",
    type: "",
    'default': "",
    description: "Other property can work on a \<input\> tag"
}];

export const apiofgroup = [{
    property: "options",
    type: "string[] | array<{label: any, name: string, value: string|number, disabled: bool, ...other}>",
    'default': "",
    description: "Set checkbox group optional. please refer to aip of checkbox"
}, {
    property: "disableAll",
    type: "boolean",
    'default': "false",
    description: "disable all checkbox"
}, {
    property: "value",
    type: "string | number",
    'default': "",
    description: "value of checkbox group"
}, {
    property: "onChange",
    type: "function",
    'default': "({e, name, value, checked})=>{}",
    description: "Callback when value change.",
}, {
    property: "style",
    type: "object",
    'default': "",
    description: "Style of checkbox"
}, {
    property: "className",
    type: "object",
    'default': "",
    description: "ClassName of checkbox"
}];