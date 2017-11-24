/**
 * Created by elly on 2017/4/18.
 */
export const basic = `import {Upload, Button, Group} from 'asumi';

class Foo extends Component {
    constructor(props) {
        super(props);
    }

    handleUpload({files, succeed, value, failed, name}) {
        console.dir(files);
        console.dir(value);
        let names = [];
        for (let i = 0; i < files.length; i++) {
            names.push(files[i].name);
        }
        alert(\`input[name="\${name}"] uploaded file: \${names.join(', ')} and failed \${failed.length}\`);
    }

    validator(file) {
        if (~file.name.indexOf('a')) return true;
    }

    validatorError(file) {
        alert('validatorError! ' + file.name);
    }

    typeValidatorError(file) {
        alert('type error!' + file.name);
    }

    sizeValidatorError(file) {
        alert('size error!' + file.name);
    }
    
    render(){
        return (
            <div>
               <Group style={{marginRight: 10}}>
                   <Upload
                       name="click/drag_to_upload"
                       onUpload={this.handleUpload.bind(this)}>
                       <Button type="success">click/drag to upload</Button>
                   </Upload>
                   <Upload
                       multiple
                       name="upload_multiple_files"
                       onUpload={this.handleUpload.bind(this)}>
                       <Button type="primary">upload multiple files</Button>
                   </Upload>
                   <Upload
                       accept="image/jpg"
                       name="upload_image/jpg_type_files"
                       onUpload={this.handleUpload.bind(this)}
                       typeValidatorError={this.typeValidatorError.bind(this)}
                    >
                       <Button type="primary">upload image/jpg type files</Button>
                   </Upload>
                   <Upload
                        maxSize={1024 * 30}
                        name="max_size_is_1kb"
                        onUpload={this.handleUpload.bind(this)}
                        sizeValidatorError={this.sizeValidatorError.bind(this)}
                    >
                        <Button type="primary">max size is 30kb</Button>
                    </Upload>
                   <Upload
                       disabled
                       name="disabled_to_upload"
                       onUpload={this.handleUpload.bind(this)}
                   >
                       <Button type="primary">disabled to upload</Button>
                   </Upload>
               </Group>
            </div>
        )
    }
`;

export const validator = `import {Upload, Button} from 'asumi';

class Foo extends Component {
    constructor(props) {
        super(props);
    }

    handleUpload({files, succeed, value, failed, name}) {
        let names = [];
        for (let i = 0; i < files.length; i++) {
            names.push(files[i].name);
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
               <Upload
                   name="validator"
                   validator={this.validator.bind(this)}
                   validatorError={this.validatorError.bind(this)}
                   onUpload={this.handleUpload.bind(this)}
               >
                   <Button type="primary">file name should have an 'a'</Button>
               </Upload>
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
    description: "Disable upload or not"
}, {
    property: "className",
    type: "string",
    'default': "null",
    description: "Class name of upload"
}, {
    property: "style",
    type: "object",
    'default': "null",
    description: "Style of upload"
}, {
    property: "validator",
    type: "function",
    'default': "(file)=>{}",
    description: "Please return true if file passed the validator"
}, {
    property: "validatorError",
    type: "function",
    'default': "(file, i, files)=>{}",
    description: "if file validator failed, the callback while be called"
}, {
    property: "sizeValidatorError",
    type: "function",
    'default': "(file, i, files)=>{}",
    description: "if file size is over max size, the callback while be called"
}, {
    property: "typeValidatorError",
    type: "function",
    'default': "(file, i, files)=>{}",
    description: "if file type not accept, the callback while be called"
}, {
    property: "onUpload",
    type: "function",
    'default': "({files, succeed, failed, name, value, e})=>{}",
    description: "Callback when upload"
}];
