/**
 * Created by elly on 2017/4/7.
 */
import React, {Component, PropTypes} from 'react';
import {
    Form,
    FormItem
} from '../../../lib';

export default  class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                swi: "",
                radio: "",
                input: "s",
                select: "",
                checkbox: "",
                textarea: "",
                radioGroup: 1,
                checkgroup: [1],
            }
        }
    }

    handleChange({name, value}) {
        this.setState(prev=> {
            prev.data[name] = value;
            return prev;
        });
    }

    handleSelect({value, name}) {
        this.setState(prev=> {
            prev.data[name] = value;
            return prev;
        });
    }

    render() {
        let data = this.state.data;
        return (
            <div className="content">
                <h1>Normal Form</h1>
                <Form
                    data={data}
                    title="Normal Form"
                    onChange={this.handleChange.bind(this)}
                    options={[
                        {
                            type: "text",
                            tips: "help",
                            name: "input",
                            label: "Input",
                            required: true,
                            validateType: "error",
                            validate: [{
                                type: "string",
                                trigger: "blur",
                                required: true,
                                message: "必填"
                            }, {
                                type: "string",
                                trigger: "submit",
                                max: 7,
                                min: 4,
                                message: "不得少于4~7字符"
                            }, {
                                type: "string",
                                trigger: "change",
                                rule: "color",
                                message: "必须是16进制颜色"
                            }],
                            placeholder: "请输入内容"
                        },
                        {
                            name: "textarea",
                            type: "textarea",
                            label: "Textarea",
                            validateType: "warning",
                            validate: [{
                                type: "string",
                                trigger: "blur",
                                required: true,
                                message: "必填"
                            }, {
                                type: "string",
                                trigger: "blur",
                                min: 5,
                                message: "必须大于5字符"
                            }],
                            placeholder: "(づ￣3￣)づ╭❤～"
                        }, {
                            required: true,
                            name: "select",
                            type: "select",
                            label: "Select",
                            searchable: true,
                            placeholder: "请选择",
                            options: [{
                                value: 1,
                                label: "1"
                            }, {
                                value: 2,
                                label: "2"
                            }]
                        }, {
                            name: "swi",
                            type: "switch",
                            required: true,
                            label: "Switch",
                            on: 1,
                            off: 0,
                        }, {
                            type: "radiogroup",
                            name: "radioGroup",
                            label: "RadioGroup",
                            options: [{
                                label: '选项1',
                                value: 1
                            }, {
                                label: '选项2',
                                value: 2
                            }, {
                                label: '选项3',
                                value: 3
                            }]
                        }, {
                            type: "checkgroup",
                            name: "checkgroup",
                            label: "Checkgroup",
                            onChange: this.handleSelect.bind(this),
                            options: [{
                                label: '选项1',
                                value: 1
                            }, {
                                label: '选项2',
                                value: 2
                            }, {
                                label: '选项3',
                                value: 3
                            }]
                        }
                    ]}
                />
            </div>
        )
    }
}
