/**
 * Created by elly on 2017/4/18.
 */
export const basic = `import {Select, Option , Group} from 'asumi';
//const Option = Select.Option;

let style = {
    width: 300,
    marginBottom: 10,
    verticalAlign: 'top'
}

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fruit1: "",
            fruit2: "",
            fruit3: "",
        }
    }
    
    handleChange({name, value}) {
        this.setState(prev=> {
            prev[name] = value;
            return prev;
        })
    }
    
    render(){
        let {fruit1, fruit2, fruit3} = this.state;
        return (
            <Group style={style}
                   onChange={this.handleChange\.bind(this)}>
                <Select placeholder="请选择" name="fruit1" value={fruit1}>
                    <Option value="apple">Apple</Option>
                    <Option value="banana">Banana</Option>
                    <Option value="watermelon">Watermelon</Option>
                    <Option value="peach">Peach</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                </Select>
                <Select placeholder="请选择" name="fruit2" value={fruit2} defaultValue="banana">
                    <Option value="apple">Apple</Option>
                    <Option value="banana">Banana</Option>
                    <Option value="watermelon">Watermelon</Option>
                    <Option value="peach">Peach</Option>
                </Select>
                <Select placeholder="请选择" name="fruit3" disabled value={fruit3}>
                    <Option value="apple">Apple</Option>
                    <Option value="banana">Banana</Option>
                    <Option value="watermelon">Watermelon</Option>
                    <Option value="peach">Peach</Option>
                </Select>
            </Group>
        )
    }
}`;

export const size = `import {Select, Option , Group} from 'asumi';
//const Option = Select.Option;

let style = {
    width: 300,
    marginBottom: 10,
    verticalAlign: 'top'
}

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flower1: "",
            flower2: "",
            flower3: "",
        }
    }
    
    handleChange({name, value}) {
        this.setState(prev=> {
            prev[name] = value;
            return prev;
        })
    }
    
    render(){
        let {flower1, flower2, flower3} = this.state;
        return (
            <Group style={style}
                   onChange={this.handleChange\.bind(this)}>
                <Select placeholder="small select" size="small" name="flower1" value={flower1}>
                    <Option value="iris">Iris</Option>
                    <Option value="jasmine">Jasmine</Option>
                    <Option value="poppy">Peach</Option>
                    <Option value="rose">Rose</Option>
                </Select>
                <Select placeholder="default select" name="flower2" value={flower2}>
                    <Option value="iris">Iris</Option>
                    <Option value="jasmine">Jasmine</Option>
                    <Option value="poppy">Peach</Option>
                    <Option value="rose">Rose</Option>
                </Select>
                <Select placeholder="large select" size="large" name="flower3" value={flower3}>
                    <Option value="iris">Iris</Option>
                    <Option value="jasmine">Jasmine</Option>
                    <Option value="poppy">Peach</Option>
                    <Option value="rose">Rose</Option>
                </Select>
            </Group>
        )
    }
}`;

export const searchable = `import {Select, Option , Group} from 'asumi';
//const Option = Select.Option;

let style = {
    width: 300,
    marginBottom: 10,
    verticalAlign: 'top'
}

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animal3: "",
            flower4: "",
        }
    }
    
    handleChange({name, value}) {
        this.setState(prev=> {
            prev[name] = value;
            return prev;
        })
    }
   
    render(){
        let {flower4, animal3} = this.state;
        return (
            <Group
                searchable
                style={style}
                placeholder="请输入搜索"
            >
                <Select name="flower4" value={flower4} onChange={this.handleChange\.bind(this)}>
                    <Option value="iris">Iris</Option>
                    <Option value="jasmine">Jasmine</Option>
                    <Option value="poppy">Peach</Option>
                    <Option value="rose">Rose</Option>
                </Select>
                <Select
                    name="animal3"
                    value={animal3}
                    multiple selectAll closeAfterSelect={false}
                    onChange={this.handleChange\.bind(this)}>
                    <Option value="monkey">Monkey</Option>
                    <Option value="lion">Lion</Option>
                    <Option value="elephant">Elephant</Option>
                    <Option value="chicken">Chicken</Option>
                </Select>
            </Group>
        )
    }
}`;

export const multiple = `import {Select, Option , Group} from 'asumi';
//const Option = Select.Option;

let style = {
    width: 300,
    marginBottom: 10,
    verticalAlign: 'top'
}

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animal1: [],
            animal2: [],
        }
    }
    
    handleChange({name, value}) {
        this.setState(prev => {
            prev[name] = value;
            return prev;
        })
    }
    
    render(){
        let {animal1, animal2} = this.state;
        return (
            <Group style={style}
                   multiple onChange={this.handleChange\.bind(this)}>
                <Select placeholder="请选择" name="animal1" value={animal1} closeAfterSelect={false}>
                    <Option value="monkey">Monkey</Option>
                    <Option value="lion">Lion</Option>
                    <Option value="elephant">Elephant</Option>
                    <Option value="chicken">Chicken</Option>
                </Select>
                <Select placeholder="请选择" selectAll name="animal2" value={animal2}>
                    <Option value="monkey">Monkey</Option>
                    <Option value="lion">Lion</Option>
                    <Option value="elephant">Elephant</Option>
                    <Option value="chicken">Chicken</Option>
                </Select>
            </Group>
        )
    }
}`;

export const tag = `import {Select, Option} from 'asumi';
//const Option = Select.Option;

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animal: [],
        }
    }
    
    handleChange({name, value}) {
        this.setState(prev => {
            prev[name] = value;
            return prev;
        })
    }
    
    render(){
        let {animal} = this.state;
        return (
            <Select 
                type="tag"
                searchable
                placeholder="请输入搜索"
                name="animal" value={animal}
                onChange={this.handleChange.bind(this)}
                multiple selectAll closeAfterSelect={false}
            >
                <Option value="monkey">猴子</Option>
                <Option value="lion">狮子</Option>
                <Option value="elephant">大象</Option>
                <Option value="chicken">小鸡仔</Option>
                <Option value="chicken1">小母鸡</Option>
                <Option value="chicken2">小公鸡</Option>
                <Option value="chicken3">烤鸡</Option>
                <Option value="chicken4">炸鸡</Option>
                <Option value="chicken5">清炖鸡</Option>
                <Option value="chicken6">炒鸡</Option>
            </Select>
        ) 
    }
}`;

export const api = [{
    property: "size",
    type: "string",
    'default': "default",
    description: "Size of Input. Options: small, default, large"
}, {
    property: "mode",
    type: "string",
    'default': "",
    description: "Mode of Select. Options: tag"
}, {
    property: "disabled",
    type: "boolean",
    'default': "null",
    description: "Disable input",
}, {
    property: "multiple",
    type: "bool",
    'default': "null",
    description: "Trigger multiple select, and value should be array type",
}, {
    property: "selectAll",
    type: "bool",
    'default': "null",
    description: "Only work when multiple is `true`. Tell if show `Select All` Option",
}, {
    property: "selectAllText",
    type: "string",
    'default': "全选",
    description: "Text of `Select All` Option",
}, {
    property: "searchable",
    type: "bool",
    'default': "null",
    description: "Tell if it can search options",
}, {
    property: "noMatchText",
    type: "string",
    'default': "暂无匹配数据",
    description: "Text show when no match options",
}, {
    property: "onMatch",
    type: "func",
    'default': "null",
    description: "Callback when try search options",
}, {
    property: "matchCase",
    type: "bool",
    'default': "null",
    description: "Tell if matchCase when search",
}, {
    property: "dropdownClassName",
    type: "string",
    'default': "null",
    description: "class name of dropdown options",
}, {
    property: "dropdownStyle",
    type: "object",
    'default': "null",
    description: "style of dropdown options",
}, {
    property: "onChange",
    type: "function",
    'default': "({e, name, value, selectedValue, selected})=>{}",
    description: "Callback when value change. Basic, it will return arguments {e, name, value, selectedValue, selected}, when it trigger multiple select, value will be array type",
}, {
    property: "onSearch",
    type: "function",
    'default': "(value)=>{}",
    description: "Callback when search. Only if searchable is true",

}, {
    property: "...others",
    type: "",
    'default': "",
    description: "Other property can work on a \<input\> tag"
}];
