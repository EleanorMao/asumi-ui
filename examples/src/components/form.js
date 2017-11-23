/**
 * Created by elly on 2017/4/7.
 */
import React, {Component, PropTypes} from 'react';
import Panel from './panel';
import {Form, FormItem} from '../../../src';
import {basic, validate} from "../constants/form";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            basic: {
                name: "",
                phone: ""
            },
            col: {
                field1: "",
                field2: "",
                field3: "",
                field4: "",
                field5: "",
                field6: "",
            },
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

    handleChange(stateName, {name, value}) {
        this.setState(prev => {
            prev[stateName][name] = value;
            return prev;
        });
    }

    render() {
        return (
            <div className="content">
                <h1>Form 表单</h1>
                <Panel
                    title="basic"
                    code={basic}
                >
                    <Form
                        layout="inline"
                        data={this.state.basic}
                        title="basic inlie form"
                        onChange={this.handleChange.bind(this, 'basic')}
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
                    <hr/>
                    <Form
                        colNum={3}
                        colon={true}
                        data={this.state.col}
                        title="basic col form"
                        onChange={this.handleChange.bind(this, 'col')}
                        options={Object.keys(this.state.col).map(name => {
                            return {
                                name: name,
                                label: name,
                                type: "text"
                            }
                        })}
                    />
                    <hr/>
                    <Form
                        data={this.state.basic}
                        title="basic horizontal form"
                        submitButtonOptions={{style: {marginLeft: 80}}}
                        onChange={this.handleChange.bind(this, 'basic')}
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
                    <hr/>
                    <Form
                        colon={true}
                        layout="vertical"
                        data={this.state.basic}
                        title="basic vertical form"
                        onChange={this.handleChange.bind(this, 'basic')}
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
                </Panel>
                <Panel
                    title="validate"
                    code={validate}
                >
                    <Form
                        labelWidth={120}
                        data={this.state.data}
                        onChange={this.handleChange.bind(this, 'data')}
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
                </Panel>
            </div>
        )
    }
}
