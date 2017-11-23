export const basic = `import {Tag} from 'asumi';

ReactDOM.render(<div>
    <Tag>tag</Tag>
    <Tag type="primary">tag</Tag>
    <Tag type="warning">tag</Tag>
    <Tag type="success">tag</Tag>
</div>, div)
`;

export const closeable = `import {Tag} from 'asumi';

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [1, 2, 3, 4, 5, 6, 7]
        }
    }

    handleClose(index) {
        this.setState(prev => {
            prev.tags.splice(index, 1);
            return prev;
        })
    }
    
    render(){
        return (
            <div>
            {this.state.tags.map((c, i) => {
                return (
                    <Tag type="success" key={i} closeable={true}
                         onClose={this.handleClose.bind(this)}>closeable</Tag>)
            })}
            </div>
        )
    }
}
`;

export const api = [{
    property: "type",
    type: "string",
    'default': "default",
    description: "Style of tag. Options: default, text, danger, success, primary, secondary, warning, error."
}, {
    property: "closeable",
    type: "bool",
    'default': "null",
    description: "Show close button or not"
}, {
    property: "onClose",
    type: "function",
    'default': "null",
    description: "Callback when close button"
}];
