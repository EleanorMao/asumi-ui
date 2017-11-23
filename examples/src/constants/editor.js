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
    description: ""
}, {
    property: "name",
    type: "string",
    'default': "",
    description: ""
}, {
    property: "handler",
    type: "string",
    'default': "handler",
    description: ""
}, {
    property: "maxCache",
    type: "number",
    'default': "6",
    description: ""
}, {
    property: "canUploadImg",
    type: "bool",
    'default': "false",
    description: ""
}, {
    property: "linkImgTitle",
    type: "string",
    'default': "网络资源",
    description: ""
}, {
    property: "linkModalTitle",
    type: "string",
    'default': "插入链接",
    description: ""
}, {
    property: "placeholder",
    type: "string",
    'default': "撰写内容...",
    description: ""
}, {
    property: "uploadImgTitle",
    type: "string",
    'default': "上传图片",
    description: ""
}, {
    property: "linkPlaceholder",
    type: "string",
    'default': "请输入链接地址...",
    description: ""
}, {
    property: "imgPlaceholder",
    type: "string",
    'default': "请输入图片所在网址...",
    description: ""
}, {
    property: "uploadImgOptions",
    type: "object",
    'default': "",
    description: ""
}, {
    property: "onChange",
    type: "func",
    'default': "({name, value, parsedValue}})=>{}",
    description: ""
}, {
    property: "onUpload",
    type: "func",
    'default': "(file, cb)=>{cb(path)}",
    description: ""
}];
