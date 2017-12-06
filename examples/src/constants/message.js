export const basic = `import {Message, Button} from 'asumi';

ReactDOM.render(<div>
    <Button onClick={() => {
        Message.confirm({content: 'confirm', icon: <i className="fa fa-leaf"/>})
    }}>default</Button>
    <Button onClick={() => {
        Message.confirm({content: 'custom icon', icon: <i className="fa fa-leaf"/>})
    }}>custom icon</Button>
    <Button type="secondary" onClick={() => {
        Message.warning({content: 'warning'})
    }}>secondary</Button>
    <Button type="primary" onClick={() => {
        Message.info({content: 'info'})
    }}>primary</Button>
    <Button type="danger" onClick={() => {
        Message.danger({content: 'danger'})
    }}>danger</Button>
    <Button type="error" onClick={() => {
        Message.error({content: 'error. and duration is 2000', duration: 2000, onClose: () => {console.log('closed')}})
    }}>danger</Button>
    <Button type="success" onClick={() => {
        Message.success({content: 'success'})
    }}>success</Button>
    <Button type="warning" onClick={() => {
        Message.loading({content: 'loading'})
    }}><i className="fa fa-circle-o-notch fa-spin"/></Button>
</div>, div)
`;


export const api = [{
    property: "type",
    type: "string",
    'default': "",
    description: "Style of message. Options: danger, success, info, warning, error."
}, {
    property: "icon",
    type: "any",
    'default': "",
    description: "icon of message"
}, {
    property: "content",
    type: "any",
    'default': "",
    description: "content of message"
}, {
    property: "duration",
    type: "number",
    'default': "3000",
    description: "disappear duration"
}, {
    property: "onClose",
    type: "func",
    'default': "()=>{}",
    description: "invoke when disappear"
}];
