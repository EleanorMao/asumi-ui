/**
 * Created by elly on 2017/4/18.
 */
export const basic = `import { Transfer } from 'asumi';

class Basic extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            titles: ["列表1", "列表2"],
            value: []
        }
    }

    componentDidMount() {
        let data = [];
        for (let i = 0; i <= 5; i++) {
            data.push({
                value: i + 1,
                label: '选项'+(i + 1)
            })
        }
        this.setState({ data: data })
    }

    handleChange({ value }) {
        this.setState({ value: value })
    }

    render() {
        let style = {
            width: 300,
            marginBottom: 10,
            verticalAlign: 'top'
        };
        const { data, titles, value } = this.state;
        return (
            <div className="content">
                    <Group style={style} name="normal">
                        <Transfer
                            data={data}
                            titles={titles}
                            value={value}
                            onChange={this.handleChange.bind(this)}
                        />
                    </Group>
            </div>
        )
    }
}`;

export const searchable = `import { Transfer } from 'asumi';

class Searchable extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            titles: ["列表1", "列表2"],
            value: []
        }
    }

    componentDidMount() {
        let data = [];
        for (let i = 0; i <= 5; i++) {
            data.push({
                value: i + 1,
                label: '选项'+(i + 1)
            })
        }
        this.setState({ data: data })
    }

    handleChange({ value }) {
        this.setState({ value: value })
    }

    render() {
        let style = {
            width: 300,
            marginBottom: 10,
            verticalAlign: 'top'
        };
        const { data, titles, value } = this.state;
        return (
            <div className="content">
                <Group style={style} name="normal">
                    <Transfer
                        data={data}
                        titles={titles}
                        value={value}
                        filterable={true}
                        onChange={this.handleChange.bind(this)}
                    />
                </Group>
            </div>
        )
    }
}`;

export const dataAliasName = `import { Transfer } from 'asumi';

class DataAlias extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            titles: ["列表1", "列表2"],
            value: []
        }
    }

    componentDidMount() {
        let data = [];
        for (let i = 0; i <= 5; i++) {
            data.push({
                value: i + 1,
                label: '选项'+(i + 1)
            })
        }
        this.setState({ data: data })
    }

    handleChange({ value }) {
        this.setState({ value: value })
    }

    render() {
        let style = {
            width: 300,
            marginBottom: 10,
            verticalAlign: 'top'
        };
        const { data, titles, value } = this.state;
        return (
            <div className="content">
                <Group style={style} name="normal">
                    <Transfer
                        data={data}
                        titles={titles}
                        value={value}
                        filterable={true}
                            propsAlias={{ label: 'name', value: 'key', disabled: 'false' }}
                        onChange={this.handleChange.bind(this)}
                    />
                </Group>
            </div>
        )
    }
}`;


export const api = [{
    property: "data",
    type: "array[{ value, label, disabled }]",
    'default': "[]",
    description: "data source"
}, {
    property: "filterable",
    type: "boolean",
    'default': "false",
    description: "whether Transfer is filterable"
}, {
    property: "filterPlaceholder",
    type: "string",
    'default': "请输入搜索内容",
    description: "placeholder for the filter input",
}, {
    property: "filterMethod",
    type: "function",
    'default': "null",
    description: "custom filter method"
}, {
    property: "titles",
    type: "array",
    'default': "['', '']",
    description: "custom list titles"
}, {
    property: "propsAlias",
    type: "object{value, label, disabled}",
    'default': "{label: 'label',value: 'value',disabled: 'false'}",
    description: "prop aliases for data source"
}, {
    property: "value",
    type: "array",
    'default': "[]",
    description: "key array of initially data items of the right list",
}, {
    property: "onChange",
    type: "function",
    'default': "(e, value, name)=>{}",
    description: "Callback when value change",
}];
