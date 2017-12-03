export const basic = `import {Loading} from 'asumi';

ReactDOM.render(<Loading/>, div)
`;

export const title = `import {Loading} from 'asumi';

ReactDOM.render(<Loading title="Loading..."/>, div)
`;

export const size = `import {Loading} from 'asumi';

ReactDOM.render(<div>
    <Loading size="small" title="small loading"/>
    <Loading size="large" title="large loading"/>
</div>, div)
`;

export const mask = `import {Loading} from 'asumi';

ReactDOM.render(<Loading mask title="loading">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem
        ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem
        ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</Loading>, div)
`;

export const full = `import {Loading, Button} from 'asumi';

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullScreen: false
        }
    }

    showFullScreen() {
        this.setState({fullScreen: true}, () => {
            setTimeout(() => {
                this.setState({fullScreen: false});
            }, 3000)
        });
    }
    
    render(){
        return (
            <div>
                <Button type="primary" onClick={this.showFullScreen.bind(this)}>toggle full screen loading</Button>
                <Loading fullScreen mask loading={this.state.fullScreen} title="close after 3s"/>
            </div>
        )
    }
}
`;

export const command = `import {Loading, Button} from 'asumi';

window.Loading = Loading;
class Foo extends Component {
    constructor(props) {
        super(props);
    }

    handleClick() {
        Loading.loading({
            title: "关闭请在控制台输入 Loading.close()"
        });
    }
    
    render(){
        return (
            <Button type="primary" onClick={this.handleClick.bind(this)}>
                Loading.loading()
            </Button>
        )
    }
}
`;
export const api = [{
    property: "loading",
    type: "bool",
    'default': "true",
    description: "whether show loading"
}, {
    property: "title",
    type: "any",
    'default': "null",
    description: "loading title"
}, {
    property: "size",
    type: "string",
    'default': "",
    description: "Options: small, large"
}, {
    property: "mask",
    type: "bool",
    'default': "false",
    description: "whether show mask"
}, {
    property: "fullScreen",
    type: "bool",
    'default': "false",
    description: "whether full screen loading"
}, {
    property: "type",
    type: "string",
    'default': "stretch",
    description: "Options: stretch, chase-dots"
}];
