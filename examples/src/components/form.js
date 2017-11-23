/**
 * Created by elly on 2017/4/7.
 */
import React, {Component, PropTypes} from 'react';
import {
    Form,
    Button
} from '../../../src';

export default class Main extends Component {
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

    handleSelect({value, name}) {
        this.setState(prev => {
            prev.data[name] = value;
            return prev;
        });
    }

    handleClick() {
        setTimeout(() => {
            this.setState({
                data: {
                    sex: 2,
                    on: 1,
                    name: "毛毛",
                    grade: 1,
                    checkbox: "",
                    classes: [1],
                    description: "sddsdsd",
                }
            })
        }, 300)
    }

    render() {
        let data = this.state.data;
        return (
            <div className="content">
                <h1>Normal Form</h1>
                <div>
                    <Button type="primary" onClick={this.handleClick.bind(this)}>get remote data</Button>
                </div>
                <Form
                    data={data}
                    title="Normal Form"
                    onChange={this.handleChange.bind(this)}
                    options={[
                        {
                            type: "text",
                            tips: "help",
                            name: "name",
                            label: "姓名",
                            required: true,
                            validateType: "error",
                            validate: [{
                                type: "string",
                                trigger: "blur",
                                required: true,
                                message: "必填"
                            }, {
                                type: "string",
                                trigger: "change",
                                maxLength: 7,
                                minLength: 2,
                                message: "不得少于2~7字符"
                            }],
                            placeholder: "请输入内容"
                        }, {
                            name: "description",
                            type: "static",
                            label: "个人简介",
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
                            placeholder: "(づ￣3￣)づ╭❤～"
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
                        }, {
                            type: "radiogroup",
                            name: "sex",
                            label: "性别",
                            options: [{
                                label: '男',
                                value: 1
                            }, {
                                label: '女',
                                value: 2
                            }]
                        }, {
                            type: "checkgroup",
                            name: "classes",
                            label: "课程",
                            onChange: this.handleSelect.bind(this),
                            options: [{
                                label: '语文',
                                value: 1
                            }, {
                                label: '数学',
                                value: 2
                            }, {
                                label: '英语',
                                value: 3
                            }]
                        }
                    ]}
                />
            </div>
        )
    }
}
