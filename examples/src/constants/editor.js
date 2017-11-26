export const basic = `import {Editor} from 'asumi';

class Foo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originText: ''
        }
    }

    handleChange({name, value, parsedValue}) {
        this.setState({originText: value})
    }
    
    return(){
        return (
            <Editor
                value={this.state.originText}
                onChange={this.handleChange.bind(this)}
            />
        )
    }
}
`;

export const api = [{
    property: "value",
    type: "string",
    'default': "",
    description: "input markdown string"
}, {
    property: "name",
    type: "string",
    'default': "",
    description: "name of editor"
}, {
    property: "placeholder",
    type: "string",
    'default': "撰写内容...",
    description: "placeholder of editor"
}, {
    property: "handler",
    type: "string",
    'default': "handler",
    description: "default words when format"
}, {
    property: "maxCache",
    type: "number",
    'default': "6",
    description: "maximum cache for editor memory"
}, {
    property: "imgPlaceholder",
    type: "string",
    'default': "请输入图片所在网址...",
    description: "placeholder for image link input"
}, {
    property: "canUploadImg",
    type: "bool",
    'default': "false",
    description: "can editor upload images or not"
}, {
    property: "uploadImgProps",
    type: "object",
    'default': "",
    description: "receive upload props"
}, {
    property: "uploadImgTitle",
    type: "string",
    'default': "上传图片",
    description: "tab title for image upload"
}, {
    property: "linkImgTitle",
    type: "string",
    'default': "网络资源",
    description: "tab title for image link input"
}, {
    property: "linkModalTitle",
    type: "string",
    'default': "插入链接",
    description: "modal title of link input modal"
}, {
    property: "linkPlaceholder",
    type: "string",
    'default': "请输入链接地址...",
    description: "placeholder for link input"
}, {
    property: "onChange",
    type: "func",
    'default': "({name, value, parsedValue}})=>{}",
    description: "callback will invoke when change."
}, {
    property: "onUpload",
    type: "func",
    'default': "(file, cb)=>{cb(path)}",
    description: "callback will invoke when upload image, and you have to invoke cb(path), otherwise editor wouldn't receive image path"
}];
