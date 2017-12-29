export const inline = `import {Form} from 'asumi';
import React, {Component} from 'react';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            basic: {
                name: "",
                phone: ""
            }
        }
    }
    
    handleChange({name, value}) {
        this.setState(prev => {
            prev.basic[name] = value;
            return prev;
        });
    }
    
    render(){
        return (
            <div>
                <Form
                    layout="inline"
                    data={this.state.basic}
                    title="basic inlie form"
                    onChange={this.handleChange.bind(this)}
                    options={[{
                        type: "text",
                        name: "name",
                        required: true,
                        placeholder: "请输入登录名",
                    }, {
                        type: "text",
                        name: "phone",
                        required: true,
                        placeholder: "请输入手机号",
                    }]}
                />
            </div>
        )
    }
}
`;

export const col = `import {Form} from 'asumi';
import React, {Component} from 'react';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            col: {
                field1: "",
                field2: "",
                field3: "",
                field4: "",
                field5: "",
                field6: "",
            }
        }
    }
    
    handleChange({name, value}) {
        this.setState(prev => {
            prev.col[name] = value;
            return prev;
        });
    }
    
    render(){
        return (
            <div>
                <Form
                    colNum={3}
                    colon={true}
                    data={this.state.col}
                    title="basic col form"
                    onChange={this.handleChange.bind(this)}
                    options={Object.keys(this.state.col).map(name => {
                        return {
                            name: name,
                            label: name,
                            type: "text"
                        }
                    })}
                />
            </div>
        )
    }
}
`;

export const horizontal = `import {Form} from 'asumi';
import React, {Component} from 'react';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            basic: {
                name: "",
                phone: ""
            }
        }
    }
    
    handleChange(stateName, {name, value}) {
        this.setState(prev => {
            prev.basic[name] = value;
            return prev;
        });
    }
    
    render(){
        return (
            <div>
                <Form
                    data={this.state.basic}
                    title="basic horizontal form"
                    submitButtonProps={{style: {marginLeft: 80}}}
                    onChange={this.handleChange.bind(this)}
                    options={[{
                        type: "text",
                        label: "登录名",
                        name: "name",
                        required: true
                    }, {
                        type: "text",
                        label: "手机号",
                        name: "phone",
                        required: true
                    }]}
                />
            </div>
        )
    }
}
`;

export const vertical = `import {Form} from 'asumi';
import React, {Component} from 'react';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            basic: {
                name: "",
                phone: ""
            }
        }
    }
    
    handleChange(stateName, {name, value}) {
        this.setState(prev => {
            prev.basic[name] = value;
            return prev;
        });
    }
    
    render(){
        return (
            <div>
                <Form
                    colon={true}
                    layout="vertical"
                    data={this.state.basic}
                    title="basic vertical form"
                    onChange={this.handleChange.bind(this)}
                    options={[{
                        type: "text",
                        label: "登录名",
                        name: "name",
                        required: true
                    }, {
                        type: "text",
                        label: "手机号",
                        name: "phone",
                        required: true
                    }]}
                />
            </div>
        )
    }
}
`;

export const validate = `import {Form} from 'asumi';
import React, {Component} from 'react';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                date: "",
                sex: 1,
                on: "",
                name: "",
                grade: "",
                checkbox: "",
                classes: [1],
                description: "",
            }
        }
    }
    
    handleChange({name, value}) {
        this.setState(prev => {
            prev.data[name] = value;
            return prev;
        });
    }
    
    render(){
        return (
            <div>
                <Form
                    labelWidth={120}
                    data={this.state.data}
                    onChange={this.handleChange.bind(this)}
                    options={[
                        {
                            type: "text",
                            tips: "请输入真实姓名",
                            name: "name",
                            label: "姓名",
                            required: true,
                            validateType: "error",
                            validate: [{
                                minLength: 2,
                                maxLength: 7,
                                trigger: "change",
                                message: "不得少于2~7字符"
                            }],
                            placeholder: "请输入内容"
                        }, {
                            name: "description",
                            type: "textarea",
                            label: "个人简介",
                            validateType: "warning",
                            validate: [{
                                type: "string",
                                trigger: "blur",
                                required: true,
                                message: "必填"
                            }, {
                                type: "string",
                                trigger: "blur",
                                minLength: 5,
                                message: "必须大于5字符"
                            }],
                            placeholder: "请输入个人简介"
                        }, {
                            name: "description",
                            type: "static",
                            dataFormat: (data) => {
                                return '您的个人简介是：' + data
                            }
                        }, {
                            required: true,
                            name: "grade",
                            type: "select",
                            label: "年级",
                            searchable: true,
                            placeholder: "请选择",
                            options: [{
                                value: 1,
                                label: "一年级"
                            }, {
                                value: 2,
                                label: "二年级"
                            }, {
                                value: 3,
                                label: "三年级"
                            }, {
                                value: 4,
                                label: "四年级"
                            }]
                        }, {
                            name: "on",
                            type: "switch",
                            label: "上课",
                            on: 1,
                            off: 0,
                        }, {
                            name: "date",
                            type: "datetime",
                            label: "出生年月"
                        }
                    ]}
                >
                </Form>
            </div>
        )
    }
}
`;

export const formitem = `import {Form, FormItem} from 'asumi';
import React, {Component} from 'react';
//const FormItem = Form.FormItem;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                date: "",
                sex: 1,
                on: "",
                age: 18,
                name: "",
                grade: "",
                checkbox: "",
                classes: [1],
                description: "",
            }
        }
    }
    
    handleChange({name, value}) {
        this.setState(prev => {
            prev.data[name] = value;
            return prev;
        });
    }
    
    render(){
        return (
            <div>
                <Form
                    labelWidth={120}
                    data={this.state.data}
                    onChange={this.handleChange.bind(this)}
                >
                    <FormItem
                        type="radiogroup"
                        name="sex"
                        label="性别"
                        options={[{
                            label: '男',
                            value: 1
                        }, {
                            label: '女',
                            value: 2
                        }]}
                    />
                    <FormItem
                        type="number"
                        name="age"
                        label="年龄"
                    />
                    <FormItem
                        type="checkgroup"
                        name="classes"
                        label="课程"
                        options={[{
                            label: '语文',
                            value: 1
                        }, {
                            label: '数学',
                            value: 2
                        }, {
                            label: '英语',
                            value: 3
                        }]}
                    />
                    <div style={{marginLeft: 120}}>请认真填写您的信息</div>
                </Form>
            </div>
        )
    }
}
`;

export const api = [{
    property: "layout",
    type: "string",
    'default': "horizontal",
    description: "Define the layout. Options: horizontal, vertical, inline."
}, {
    property: "data",
    type: "object",
    'default': "",
    description: "form data. is required."
}, {
    property: "options",
    type: "array",
    'default': "",
    description: "Define form item. more detail api please refer to FormItem."
}, {
    property: "labelWidth",
    type: "number | string",
    'default': "",
    description: "label width"
}, {
    property: "title",
    type: "any",
    'default': "",
    description: "form title"
}, {
    property: "className",
    type: "string",
    'default': "",
    description: "form class name"
}, {
    property: "style",
    type: "object",
    'default': "",
    description: "form style"
}, {
    property: "colon",
    type: "bool",
    'default': "",
    description: "whether display :  after label text"
}, {
    property: "colNum",
    type: "number",
    'default': "",
    description: "col number of form item in one row, max is 24"
}, {
    property: "disabled",
    type: "bool",
    'default': "",
    description: "disabled submit button"
}, {
    property: "error",
    type: "string",
    'default': "",
    description: "error message in form"
}, {
    property: "hideSubmitButton",
    type: "bool",
    'default': "",
    description: "whether hide submit button or not"
}, {
    property: "submitText",
    type: "any",
    'default': "",
    description: "text in submit button"
}, {
    property: "submitItems",
    type: "any",
    'default': "",
    description: "items display after submit button"
}, {
    property: "submitButtonProps",
    type: "object",
    'default': "",
    description: "submit button props"
}, {
    property: "preventDefault",
    type: "bool",
    'default': "",
    description: "prevent default event when submit"
}, {
    property: "validator",
    type: "func",
    'default': "()=>{ return disabled}",
    description: "form validator. return if disabled"
}, {
    property: "onChange",
    type: "func",
    'default': "({e, name, value})=>{}",
    description: "invoke when form item on change"
}, {
    property: "onSubmit",
    type: "func",
    'default': "()=>{}",
    description: "invoke when press submit button"
}, {
    property: "...other",
    type: "",
    'default': "",
    description: "Other property can work on a <form> tag"
}];

export const apiOfFormItem = [{
    property: "label",
    type: "string",
    'default': "",
    description: "label text"
}, {
    property: "name",
    type: "string",
    'default': "",
    description: "form item name"
}, {
    property: "value",
    type: "any",
    'default': "",
    description: "form item value, form will define automatically according to the name"
}, {
    property: "required",
    type: "bool",
    'default': "",
    description: "if value required"
}, {
    property: "labelWidth",
    type: "number | string",
    'default': "",
    description: "label width"
}, {
    property: "type",
    type: "string",
    'default': "text",
    description: "type of form item. Options: text, color, number, editor, static, datetime, component, password, textarea, select, checkbox, radio, switch, upload, radiogroup, checkgroup, checkboxgroup, taginput, transfer"
}, {
    property: "tips",
    type: "string | {title: string, content: any}",
    'default': "",
    description: "define tips"
}, {
    property: "validateType",
    type: "string",
    'default': "error",
    description: "define validate type, when validator failed, message will display by this type. Options: error, warning"
}, {
    property: "validate",
    type: "array[object]",
    'default': "[]",
    description: "detail information please view validate api"
}, {
    property: "onChange",
    type: "func",
    'default': "({name, value})=>{}",
    description: "you can register onChange function on form, so you needn't define this in every form item"
}, {
    property: "onBlur",
    type: "func",
    'default': "()=>{}",
    description: "invoke when blur"
}, {
    property: "colon",
    type: "bool",
    'default': "",
    description: "whether display :  after label text"
}, {
    property: "colSpan",
    type: "number",
    'default': "",
    description: "defined how much col form item hold, only effect when colNum defined."
}, {
    property: "dataFormat",
    type: "func",
    'default': "(value)=>{}",
    description: "format value, only effect when type is static"
}, {
    property: "content | value",
    type: "any",
    'default': "",
    description: "content of static form item"
}, {
    property: "component",
    type: "any",
    'default': "",
    description: "define custom component, when form item type is component. FormItem will give component props {name, value, data, onBlur, onChange}, and you can cover it, if you want"
}, {
    property: "options",
    type: "array",
    'default': "",
    description: "define options, when form item type is radiogroup, checkboxgroup, select"
}, {
    property: "children",
    type: "any",
    'default': "",
    description: "it while cover other form item type except its a upload"
}, {
    property: "...Other",
    type: "",
    'default': "",
    description: "other props can use in form item or custom component"
}];

export const apiOfValidate = [{
    property: "trigger",
    type: "string",
    'default': "",
    description: "define when trigger validate. Options: blur, change, submit"
}, {
    property: "message",
    type: "string",
    'default': "",
    description: "message when validate fail"
}, {
    property: "rule",
    type: "string",
    'default': "",
    description: "Options: color(/^#[0-9a-fA-F]{0,6}$/), price(/^((0|[1-9]d{0,7})(.d{0,2})?)?$/), nature(/^(0?|[1-9]d{0,7})$/), positiveInt( /^([1-9]d{0,7})?$/)"
}, {
    property: "type",
    type: "string",
    'default': "",
    description: "type of form item value. Options: boolean, array, string, object, number"
}, {
    property: "instance",
    type: "any",
    'default': "",
    description: "instance of form item value."
}, {
    property: "pattern",
    type: "RegExp",
    'default': "",
    description: "Regexp pattern"
}, {
    property: "length",
    type: "number",
    'default': "",
    description: "define value length"
}, {
    property: "maxLength",
    type: "number",
    'default': "",
    description: "define max length of value"
}, {
    property: "mixLength",
    type: "number",
    'default': "",
    description: "define min length of value"
}, {
    property: "max",
    type: "any",
    'default': "",
    description: "max value"
}, {
    property: "min",
    type: "any",
    'default': "",
    description: "min value"
}, {
    property: "isLocaleCompare",
    type: "bool",
    'default': "",
    description: "whether use localeCompare or not when compare, only if form item value is string type"
}, {
    property: "validator",
    type: "func",
    'default': "(form props)=>{ return disabled}",
    description: "define custom validator"
}];
