/**
 * Created by elly on 2017/4/18.
 */
export const basic = `import {Radio} from 'el-ui';

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
                 <Radio
                    value="1"
                    name="value"
                    label="radio"
                    checked={this.state.value}
                    onChange={this.handleChange.bind(this)}/>
            </div>
        )
    }
}

ReactDOM.render(<Foo />, div)`;

export const _switch = `import {Radio} from 'el-ui';

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
                 <Radio
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

export const disabled = `import {Radio} from 'el-ui';

ReactDOM.render(
<div>
    <Radio
        disabled
        label="label"
        checked={false}
    />
    <Radio
        disabled
        label="label"
        checked={true}
    />
    <Radio
        label="switch"
        type="switch"
        disabled
        checked={false}/>
    <Radio
        label="switch"
        type="switch"
        disabled
        checked={true}/>
</div>, div)`;

export const radioGroup = `import {Radio} from 'el-ui';
//import {RadioGroup} from 'el-ui';

class Foo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupValue: 1
        }
    }
    
    handleSelect({value}) {
        this.setState({groupValue: value});
    }
    
    render(){
        return (
            <div>
                 <Radio.Group
                    options={[{
                        label: '选项1',
                        value: 1
                    }, {
                        label: '选项2',
                        value: 2
                    }, {
                        label: '选项3',
                        value: 3
                    }]}
                    value={this.state.groupValue}
                    onChange={this.handleSelect.bind(this)}
                />
                <Radio.Group
                    options={[{
                        label: '选项1',
                        value: 1
                    }, {
                        label: '选项2',
                        value: 2
                    }, {
                        label: '选项3',
                        value: 3
                    }]}
                    disableAll={true}
                />
            </div>
        )
    }
}

ReactDOM.render(<Foo />, div)`;


//TODO: 补完
export const api = [{
    property: "className",
    type: "string",
    'default': "",
    description: "ClassName of row"
}, {
    property: "style",
    type: "object",
    'default': "",
    description: "Style of row"
}, {
    property: "children",
    type: "any",
    'default': "",
    description: ""
}];