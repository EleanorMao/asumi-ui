/**
 * Created by elly on 2017/4/18.
 */
export const basic = `import {Uploader, Button, Group} from 'el-ui';

class Foo extends Component {
    constructor(props) {
        super(props);
    }

    handleUpload(fileList, failed, name, e) {
        let names = [];
        for (let i = 0; i < fileList.length; i++) {
            names.push(fileList[i].name);
        }
        alert(\`input[name="\${name}"] uploaded file: \${names.join(', ')} and failed \${failed.length}\`);
    }
    
    render(){
        return (
            <div>
               <Group style={{marginRight: 10}}>
                   <Uploader
                       name="click/drag_to_upload"
                       onUpload={this.handleUpload.bind(this)}>
                       <Button type="success">click/drag to upload</Button>
                   </Uploader>
                   <Uploader
                       multiple
                       name="upload_multiple_files"
                       onUpload={this.handleUpload.bind(this)}>
                       <Button type="primary">upload multiple files</Button>
                   </Uploader>
                   <Uploader
                       accept="image/jpg"
                       name="upload_image/jpg_type_files"
                       onUpload={this.handleUpload.bind(this)}>
                       <Button type="primary">upload image/jpg type files</Button>
                   </Uploader>
                   <Uploader
                        maxSize={1024 * 30}
                        name="max_size_is_1kb"
                        onUpload={this.handleUpload.bind(this)}>
                        <Button type="primary">max size is 30kb</Button>
                    </Uploader>
                   <Uploader
                       disabled
                       name="disabled_to_upload"
                       onUpload={this.handleUpload.bind(this)}
                   >
                       <Button type="primary">disabled to upload</Button>
                   </Uploader>
               </Group>
            </div>
        )
    }
`;

export const validator = `import {Uploader, Button} from 'el-ui';

class Foo extends Component {
    constructor(props) {
        super(props);
    }

    handleUpload(fileList, failed, name, e) {
        let names = [];
        for (let i = 0; i < fileList.length; i++) {
            names.push(fileList[i].name);
        }
        alert(\`input[name="\${name}"] uploaded file: \${names.join(', ')} and failed \${failed.length}\`);
    }
    
    validator(file) {
        if (~file.name.indexOf('a')) return true;
    }

    validatorError(file) {
        alert('validatorError! ' + file.name);
    }
    
    render(){
        return (
            <div>
               <Uploader
                   name="validator"
                   validator={this.validator.bind(this)}
                   validatorError={this.validatorError.bind(this)}
                   onUpload={this.handleUpload.bind(this)}
               >
                   <Button type="primary">file name should have an 'a'</Button>
               </Uploader>
            </div>
        )
    }
`;


export const api = [{
    property: "name",
    type: "string",
    'default': "",
    description: "The name of the control"
}, {
    property: "accept",
    type: "string",
    'default': "",
    description: "Define the types of files that the control can select."
}, {
    property: "multiple",
    type: "bool",
    'default': "",
    description: "Whether the user can enter more than one file"
}, {
    property: "maxSize",
    type: "number",
    'default': "",
    description: "The maximum size for files"
}, {
    property: "disabled",
    type: "boolean",
    'default': "null",
    description: "Disable uploader or not"
}, {
    property: "validator",
    type: "function",
    'default': "(file)=>{}",
    description: "Please return true if file passed the validator"
}, {
    property: "validatorError",
    type: "function",
    'default': "(file)=>{}",
    description: "if file validator failed, the callback while be called"
}, {
    property: "onUpload",
    type: "function",
    'default': "(fileList, failed, name, e)=>{}",
    description: "Callback when upload"
}];
