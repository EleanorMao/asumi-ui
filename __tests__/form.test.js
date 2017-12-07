import React, {Component} from 'react';
import {mount} from 'enzyme';
import {Form, FormItem} from '../src';

describe('Form', () => {
    it('create component', () => {
        const handleSubmit = jest.fn();
        const component = mount(
            <Form data={{}} name="jest"
                  onSubmit={handleSubmit}
                  options={[{
                      type: "text",
                      name: "text",
                      label: "文字"
                  }]}/>);
        expect(component).toMatchSnapshot();
        component.find('Button').simulate('click');
        expect(handleSubmit).toBeCalled();
    });
    it('define layout[inline]', () => {
        const component = mount(
            <Form data={{}}
                  layout="inline"
                  options={[{
                      type: "text",
                      name: "text",
                      label: "文字"
                  }]}/>);
        expect(component.find('.el-inline').length).toEqual(1);
    });
    it('define layout[vertical]', () => {
        const component = mount(
            <Form data={{}}
                  layout="vertical"
                  options={[{
                      type: "text",
                      name: "text",
                      label: "文字"
                  }]}/>);
        expect(component.find('.el-vertical').length).toEqual(1);
    });
    it('define className', () => {
        const component = mount(
            <Form data={{}}
                  className="jest"
                  options={[{
                      type: "text",
                      name: "text",
                      label: "文字"
                  }]}/>);
        expect(!!component.find('.jest')).toEqual(true);
    });
    it('define title', () => {
        const component = mount(
            <Form data={{}}
                  title="jest"
                  options={[{
                      type: "text",
                      name: "text",
                      label: "文字"
                  }]}/>);
        expect(!!component.find('.el-form-title')).toEqual(true);
    });
    it('define colon', () => {
        const component = mount(
            <Form data={{}}
                  colon={true}
                  options={[{
                      type: "text",
                      name: "text",
                      label: "文字"
                  }, {
                      type: "textarea",
                      name: "textarea",
                      label: "简介",
                      colon: false
                  }]}/>);
        expect(component.find('.el-form-label').at(0).text()).toEqual("文字:");
        expect(component.find('.el-form-label').at(1).text()).toEqual("简介");
    });
    it('define disabled', () => {
        const handleSubmit = jest.fn();
        const component = mount(
            <Form data={{}}
                  disabled={true}
                  onSubmit={handleSubmit}
                  options={[{
                      type: "text",
                      name: "text",
                      label: "文字"
                  }, {
                      type: "textarea",
                      name: "textarea",
                      label: "简介",
                  }]}/>);
        expect(component.find('Button[disabled=true]').length).toEqual(1);
        component.setProps({disabled: false});
        expect(component.find('Button[disabled=false]').length).toEqual(1);
        component.setProps({submitButtonProps: {disabled: false}});
        expect(component.find('Button[disabled=false]').length).toEqual(1);
        component.setProps({submitButtonProps: {disabled: true}});
        expect(component.find('Button[disabled=true]').length).toEqual(1);
        component.find('Button').simulate('click');
        expect(handleSubmit).not.toBeCalled();
    });
    it('define error', () => {
        const component = mount(
            <Form data={{}}
                  error={"error"}
                  options={[{
                      type: "text",
                      name: "text",
                      label: "文字"
                  }, {
                      type: "textarea",
                      name: "textarea",
                      label: "简介",
                  }]}/>);
        expect(component.find('.el-form-error').text()).toEqual("error");
    });
    it('define hideSubmitButton', () => {
        const component = mount(
            <Form data={{}}
                  hideSubmitButton={true}
                  options={[{
                      type: "text",
                      name: "text",
                      label: "文字"
                  }, {
                      type: "textarea",
                      name: "textarea",
                      label: "简介",
                  }]}/>);
        expect(component.find('Button').length).toEqual(0);
        component.setProps({hideSubmitButton: false});
        expect(component.find('Button').length).toEqual(1);
    });
    it('define submitText', () => {
        const component = mount(
            <Form data={{}}
                  options={[{
                      type: "text",
                      name: "text",
                      label: "文字"
                  }, {
                      type: "textarea",
                      name: "textarea",
                      label: "简介",
                  }]}/>);
        expect(component.find('Button').text()).toEqual("提交");
        component.setProps({submitText: "submit"});
        expect(component.find('Button').text()).toEqual("submit");
    });
    it('define submitButtonProps', () => {
        const component = mount(
            <Form data={{}}
                  submitButtonProps={{size: "small", type: "danger"}}
                  options={[{
                      type: "text",
                      name: "text",
                      label: "文字"
                  }, {
                      type: "textarea",
                      name: "textarea",
                      label: "简介",
                  }]}/>);
        expect(component.find('Button[size="small"][type="danger"]').length).toEqual(1);
    });
    it('create form by options', () => {
        let data = {
            text: "text",
            color: "#fff",
            password: "password",
            datetime: 1512213506421,
            number: 10,
            'static': "static",
            textarea: "textarea",
            select: 1,
            checkbox: 2,
            radio: 3,
            'switch': 4,
            upload: "",
            radiogroup: 5,
            checkgroup: [6]
        };
        let options = Object.keys(data).map(p => {
            let item = {type: p, name: p};
            if (p === "select") {
                item.options = [{label: 1, value: 1}];
            }
            if (p === "checkgroup") {
                item.options = [{label: 1, value: 1}, {label: 6, value: 6}];
            }
            return item;
        });
        const handleChange = jest.fn();
        const handleSubmit = jest.fn();
        const component = mount(<Form
            data={data}
            options={options}
            onSubmit={handleSubmit}
            onChange={handleChange}
        />);
        expect(component).toMatchSnapshot();
        expect(component.find('FormItem[name="text"]').instance().props.value).toEqual("text");
        expect(component.find('FormItem[name="color"]').instance().props.value).toEqual("#fff");
        expect(component.find('FormItem[name="password"]').instance().props.value).toEqual("password");
        expect(component.find('FormItem[name="datetime"]').instance().props.value).toEqual(1512213506421);
        expect(component.find('FormItem[name="number"]').instance().props.value).toEqual(10);
        expect(component.find('FormItem[name="static"]').instance().props.value).toEqual("static");
        component.find('FormItem[name="text"] input').simulate('change', {target: {value: "123"}});
        expect(handleChange).toBeCalled();
        component.find('Button').simulate('click');
        expect(handleSubmit).toBeCalled();
    });
    it('create form by form items', () => {
        let data = {
            text: "text",
            color: "#fff",
            password: "password",
            datetime: 1512213506421,
            number: 10,
            'static': "static",
            textarea: "textarea",
            select: 1,
            checkbox: 2,
            radio: 3,
            'switch': 4,
            upload: "",
            radiogroup: 5,
            checkgroup: [6]
        };
        let children = Object.keys(data).map((p, i) => {
            let item = {type: p, name: p};
            if (p === "select") {
                item.options = [{label: 1, value: 1}];
            }
            if (p === "checkgroup") {
                item.options = [{label: 1, value: 1}, {label: 6, value: 6}];
            }
            return <FormItem key={i} {...item}/>;
        });
        const handleChange = jest.fn();
        const handleSubmit = jest.fn();
        const component = mount(<Form
            data={data}
            onChange={handleChange}
            onSubmit={handleSubmit}
        >{children}</Form>);
        expect(component).toMatchSnapshot();
        expect(component.find('FormItem[name="text"]').instance().props.value).toEqual("text");
        expect(component.find('FormItem[name="color"]').instance().props.value).toEqual("#fff");
        expect(component.find('FormItem[name="password"]').instance().props.value).toEqual("password");
        expect(component.find('FormItem[name="datetime"]').instance().props.value).toEqual(1512213506421);
        expect(component.find('FormItem[name="number"]').instance().props.value).toEqual(10);
        expect(component.find('FormItem[name="static"]').instance().props.value).toEqual("static");
        component.find('FormItem[name="text"] input').simulate('change', {target: {value: "123"}});
        expect(handleChange).toBeCalled();
        component.find('Button').simulate('click');
        expect(handleSubmit).toBeCalled();
    });
});

describe('FormItem', () => {
    it("create component", () => {
        const component = mount(<FormItem/>);
        expect(component).toMatchSnapshot();
    });
    it("define required", () => {
        const component = mount(<FormItem required/>);
        expect(component).toMatchSnapshot();
    });
    it("define labelWidth", () => {
        const component = mount(<FormItem labelWidth={120}/>);
        expect(component).toMatchSnapshot();
    });
    it("define colon", () => {
        const component = mount(<FormItem colon={true} label={"文字"}/>);
        expect(component).toMatchSnapshot();
    });
    it("define tips", () => {
        const component = mount(<FormItem tips={"tips"} label={"文字"}/>);
        expect(component).toMatchSnapshot();
    });
    it("define type[color]", () => {
        const component = mount(<FormItem type="color"/>);
        expect(component.find('Input[type="color"]').length).toBe(1);
    });
    it("define type[editor]", () => {
        const component = mount(<FormItem type="editor"/>);
        expect(component.find('Editor').length).toBe(1);
    });
    it("define type[static]", () => {
        const component = mount(<FormItem type="static" value="static" dataFormat={(value) => {
            return "." + value
        }}/>);
        expect(component.find('.el-form-control-static').text()).toBe(".static");
    });
    it("define type[datetime]", () => {
        const component = mount(<FormItem type="datetime"/>);
        expect(component.find('DateTime').length).toBe(1);
    });
    it("define type[number]", () => {
        const component = mount(<FormItem type="number"/>);
        expect(component.find('NumberInput').length).toBe(1);
    });
    it("define type[password]", () => {
        const component = mount(<FormItem type="password"/>);
        expect(component.find('input[type="password"]').length).toBe(1);
    });
    it("define type[textarea]", () => {
        const component = mount(<FormItem type="textarea"/>);
        expect(component.find('textarea').length).toBe(1);
    });
    it("define type[select]", () => {
        const component = mount(<FormItem type="select"/>);
        expect(component.find('Select').length).toBe(1);
    });
    it("define type[checkbox]", () => {
        const component = mount(<FormItem type="checkbox"/>);
        expect(component.find('Checkbox').length).toBe(1);
    });
    it("define type[radio]", () => {
        const component = mount(<FormItem type="radio"/>);
        expect(component.find('Radio').length).toBe(1);
    });
    it("define type[upload]", () => {
        const component = mount(<FormItem type="upload"/>);
        expect(component.find('Upload').length).toBe(1);
    });
    it("define type[radiogroup]", () => {
        const component = mount(<FormItem type="radiogroup"/>);
        expect(component.find('RadioGroup').length).toBe(1);
    });
    it("define type[checkgroup]", () => {
        const component = mount(<FormItem type="checkgroup"/>);
        expect(component.find('CheckGroup').length).toBe(1);
    });
});

describe('validate', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });
    afterAll(() => {
        jest.useRealTimers();
    });
    it('validate[required]', () => {
        class Demo extends Component {
            constructor() {
                super();
                this.state = {
                    a: "",
                    b: "",
                    c: "",
                    d: ""
                }
            }

            handleChange({name, value}) {
                this.setState(prev => {
                    prev[name] = value;
                    return prev;
                })
            }

            render() {
                return (
                    <div>
                        <Form
                            data={this.state}
                            onChange={this.handleChange.bind(this)}
                            onSubmit={this.props.onSubmit}
                            options={[{
                                name: "a",
                                type: "text",
                                required: true
                            }, {
                                name: "b",
                                type: "text",
                                validate: [{
                                    required: true,
                                    trigger: "change",
                                    message: "change"
                                }]
                            }, {
                                name: "c",
                                type: "text",
                                validate: [{
                                    required: true,
                                    trigger: "blur",
                                    message: "blur"
                                }]
                            }, {
                                name: "d",
                                type: "text",
                                validate: [{
                                    required: true,
                                    trigger: "submit",
                                    message: "submit"
                                }]
                            }]}
                        />
                    </div>
                )
            }
        }

        const handleSubmit = jest.fn();
        const wrapper = mount(<Demo onSubmit={handleSubmit}/>);
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
        wrapper.find('input[name="a"]').simulate('change', {target: {value: "abc"}});
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
        wrapper.find('input[name="b"]').simulate('change', {target: {value: "abc"}});
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
        wrapper.find('input[name="b"]').simulate('change', {target: {value: ""}});
        expect(wrapper.find('FormItem[name="b"] .el-form-message').text()).toEqual("change");
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
        wrapper.find('input[name="b"]').simulate('change', {target: {value: "abc"}});
        wrapper.find('input[name="c"]').simulate('focus');
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
        wrapper.find('input[name="c"]').simulate('blur');
        expect(wrapper.find('FormItem[name="c"] .el-form-message').text()).toEqual("blur");
        wrapper.find('input[name="c"]').simulate('change', {target: {value: "1"}});
        wrapper.find('input[name="c"]').simulate('blur');
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(false);
        wrapper.find('Button').simulate('click');
        expect(wrapper.find('FormItem[name="d"] .el-form-message').text()).toEqual("submit");
        expect(handleSubmit).not.toBeCalled();
        jest.runAllTimers();
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
        wrapper.find('input[name="d"]').simulate('change', {target: {value: "abc"}});
        jest.runAllTimers();
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(false);
        wrapper.find('Button').simulate('click');
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(false);
        expect(handleSubmit).toBeCalled();

    });
    it('validate[required formitem]', () => {
        class Demo extends Component {
            constructor() {
                super();
                this.state = {
                    a: "",
                    b: "",
                    c: "",
                    d: ""
                }
            }

            handleChange({name, value}) {
                this.setState(prev => {
                    prev[name] = value;
                    return prev;
                })
            }

            render() {
                return (
                    <div>
                        <Form
                            data={this.state}
                            onSubmit={this.props.onSubmit}
                            onChange={this.handleChange.bind(this)}
                        >
                            {[{
                                name: "a",
                                type: "text",
                                required: true
                            }, {
                                name: "b",
                                type: "text",
                                validate: [{
                                    required: true,
                                    trigger: "change",
                                    message: "change"
                                }]
                            }, {
                                name: "c",
                                type: "text",
                                validate: [{
                                    required: true,
                                    trigger: "blur",
                                    message: "blur"
                                }]
                            }, {
                                name: "d",
                                type: "text",
                                validate: [{
                                    required: true,
                                    trigger: "submit",
                                    message: "submit"
                                }]
                            }].map((item, index) => {
                                return <FormItem {...item} key={index}/>
                            })}
                        </Form>
                    </div>
                )
            }
        }

        const handleSubmit = jest.fn();
        const wrapper = mount(<Demo onSubmit={handleSubmit}/>);
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
        wrapper.find('input[name="a"]').simulate('change', {target: {value: "abc"}});
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
        wrapper.find('input[name="b"]').simulate('change', {target: {value: "abc"}});
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
        wrapper.find('input[name="b"]').simulate('change', {target: {value: ""}});
        expect(wrapper.find('FormItem[name="b"] .el-form-message').text()).toEqual("change");
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
        wrapper.find('input[name="b"]').simulate('change', {target: {value: "abc"}});
        wrapper.find('input[name="c"]').simulate('focus');
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
        wrapper.find('input[name="c"]').simulate('blur');
        expect(wrapper.find('FormItem[name="c"] .el-form-message').text()).toEqual("blur");
        wrapper.find('input[name="c"]').simulate('change', {target: {value: "1"}});
        wrapper.find('input[name="c"]').simulate('blur');
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(false);
        wrapper.find('Button').simulate('click');
        expect(wrapper.find('FormItem[name="d"] .el-form-message').text()).toEqual("submit");
        expect(handleSubmit).not.toBeCalled();
        jest.runAllTimers();
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
        wrapper.find('input[name="d"]').simulate('change', {target: {value: "abc"}});
        jest.runAllTimers();
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(false);
        wrapper.find('Button').simulate('click');
        expect(handleSubmit).toBeCalled();
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(false);
    });
    it('validate[required combo]', () => {
        class Demo extends Component {
            constructor() {
                super();
                this.state = {
                    a: "",
                }
            }

            handleChange({name, value}) {
                this.setState(prev => {
                    prev[name] = value;
                    return prev;
                })
            }

            render() {
                return (
                    <div>
                        <Form
                            data={this.state}
                            onSubmit={this.props.onSubmit}
                            onChange={this.handleChange.bind(this)}
                            options={[{
                                name: "a",
                                type: "text",
                                validate: [{
                                    required: true,
                                    trigger: "change",
                                    message: "change"
                                }, {
                                    required: true,
                                    trigger: "blur",
                                    message: "blur"
                                }]
                            }]}
                        />
                    </div>
                )
            }
        }

        const handleSubmit = jest.fn();
        const wrapper = mount(<Demo onSubmit={handleSubmit}/>);
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
        wrapper.find('input[name="a"]').simulate('change', {target: {value: "abc"}});
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(false);
        wrapper.find('Button').simulate('click');
        expect(handleSubmit).toBeCalled();
        wrapper.find('input[name="a"]').simulate('change', {target: {value: ""}});
        expect(wrapper.find('FormItem[name="a"] .el-form-message').text()).toEqual("change");
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
        wrapper.find('input[name="a"]').simulate('blur');
        expect(wrapper.find('FormItem[name="a"] .el-form-message').text()).toEqual("blur");
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
    });
    it('validate[rule]', () => {
        class Demo extends Component {
            constructor() {
                super();
                this.state = {
                    a: "",
                }
            }

            handleChange({name, value}) {
                this.setState(prev => {
                    prev[name] = value;
                    return prev;
                })
            }

            render() {
                return (
                    <div>
                        <Form
                            data={this.state}
                            onChange={this.handleChange.bind(this)}
                            onSubmit={this.props.onSubmit}
                            options={[{
                                name: "a",
                                type: "text",
                                validate: [{
                                    rule: "color",
                                    trigger: "blur",
                                    message: "blur"
                                }]
                            }]}
                        />
                    </div>
                )
            }
        }

        const handleSubmit = jest.fn();
        const wrapper = mount(<Demo onSubmit={handleSubmit}/>);
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(false);
        wrapper.find('input[name="a"]').simulate('change', {target: {value: "abc"}});
        wrapper.find('input[name="a"]').simulate('blur');
        expect(wrapper.find('FormItem[name="a"] .el-form-message').text()).toEqual("blur");
        wrapper.find('Button').simulate('click');
        expect(handleSubmit).not.toBeCalled();
        wrapper.find('input[name="a"]').simulate('change', {target: {value: "#"}});
        wrapper.find('input[name="a"]').simulate('blur');
        expect(wrapper.find('FormItem[name="a"] .el-form-message').text()).toEqual("");
        wrapper.find('input[name="a"]').simulate('change', {target: {value: "#fff"}});
        wrapper.find('input[name="a"]').simulate('blur');
        expect(wrapper.find('FormItem[name="a"] .el-form-message').text()).toEqual("");
    });
    it('validate[type]', () => {
        class Demo extends Component {
            constructor() {
                super();
                this.state = {
                    a: "",
                }
            }

            handleChange({name, value}) {
                this.setState(prev => {
                    prev[name] = value;
                    return prev;
                })
            }

            render() {
                return (
                    <div>
                        <Form
                            data={this.state}
                            onChange={this.handleChange.bind(this)}
                            options={[{
                                name: "a",
                                type: "text",
                                validate: [{
                                    type: "number",
                                    trigger: "blur",
                                    message: "blur"
                                }]
                            }]}
                        />
                    </div>
                )
            }
        }

        const wrapper = mount(<Demo/>);
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(false);
        wrapper.find('input[name="a"]').simulate('change', {target: {value: "abc"}});
        wrapper.find('input[name="a"]').simulate('blur');
        expect(wrapper.find('FormItem[name="a"] .el-form-message').text()).toEqual("blur");
        wrapper.setState({a: 1});
        wrapper.find('input[name="a"]').simulate('blur');
        expect(wrapper.find('FormItem[name="a"] .el-form-message').text()).toEqual("");
    });
    it('validate[length]', () => {
        class Demo extends Component {
            constructor() {
                super();
                this.state = {
                    a: "",
                }
            }

            handleChange({name, value}) {
                this.setState(prev => {
                    prev[name] = value;
                    return prev;
                })
            }

            render() {
                return (
                    <div>
                        <Form
                            data={this.state}
                            onChange={this.handleChange.bind(this)}
                            options={[{
                                name: "a",
                                type: "text",
                                validate: [{
                                    length: 10,
                                    trigger: "blur",
                                    message: "blur"
                                }]
                            }]}
                        />
                    </div>
                )
            }
        }

        const wrapper = mount(<Demo/>);
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(false);
        wrapper.find('input[name="a"]').simulate('change', {target: {value: "abc"}});
        wrapper.find('input[name="a"]').simulate('blur');
        expect(wrapper.find('FormItem[name="a"] .el-form-message').text()).toEqual("blur");
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
        wrapper.find('input[name="a"]').simulate('change', {target: {value: "0123456789"}});
        wrapper.find('input[name="a"]').simulate('blur');
        expect(wrapper.find('FormItem[name="a"] .el-form-message').text()).toEqual("");
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(false);
        wrapper.find('input[name="a"]').simulate('change', {target: {value: "01234567891"}});
        wrapper.find('input[name="a"]').simulate('blur');
        expect(wrapper.find('FormItem[name="a"] .el-form-message').text()).toEqual("blur");
    });
    it('validate', () => {
        class Demo extends Component {
            constructor() {
                super();
                this.state = {
                    a: "1",
                    b: "2"
                }
            }

            handleChange({name, value}) {
                this.setState(prev => {
                    prev[name] = value;
                    return prev;
                })
            }

            render() {
                return (
                    <div>
                        <Form
                            data={this.state}
                            onChange={this.handleChange.bind(this)}
                            options={[{
                                name: "a",
                                type: "text",
                                validate: [{
                                    maxLength: 2,
                                    trigger: "change",
                                    message: "message a"
                                }]
                            }, {
                                name: "b",
                                type: "text",
                                validate: [{
                                    min: 2,
                                    max: 3,
                                    trigger: "blur",
                                    message: "message b"
                                }]
                            }]}
                        />
                    </div>
                )
            }
        }

        const wrapper = mount(<Demo/>);
        wrapper.find('input[name="a"]').simulate('change', {target: {value: "abc"}});
        expect(wrapper.find('FormItem[name="a"] .el-form-message').text()).toEqual("message a");
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
        wrapper.find('input[name="a"]').simulate('change', {target: {value: "ab"}});
        expect(wrapper.find('FormItem[name="a"] .el-form-message').text()).toEqual("");
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(false);
        wrapper.find('input[name="b"]').simulate('change', {target: {value: 4}});
        wrapper.find('input[name="b"]').simulate('blur');
        expect(wrapper.find('FormItem[name="b"] .el-form-message').text()).toEqual("message b");
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
        wrapper.find('input[name="b"]').simulate('change', {target: {value: 3}});
        wrapper.find('input[name="b"]').simulate('blur');
        expect(wrapper.find('FormItem[name="b"] .el-form-message').text()).toEqual("");
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(false);
        wrapper.find('input[name="b"]').simulate('change', {target: {value: 1}});
        wrapper.find('input[name="b"]').simulate('blur');
        expect(wrapper.find('FormItem[name="b"] .el-form-message').text()).toEqual("message b");
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
        wrapper.find('input[name="a"]').simulate('change', {target: {value: "abc"}});
        expect(wrapper.find('FormItem[name="a"] .el-form-message').text()).toEqual("message a");
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
        wrapper.find('input[name="a"]').simulate('change', {target: {value: "ab"}});
        expect(wrapper.find('FormItem[name="a"] .el-form-message').text()).toEqual("");
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
    });
    it('validate[formItem]', () => {
        class Demo extends Component {
            constructor() {
                super();
                this.state = {
                    a: "1",
                    b: "2"
                }
            }

            handleChange({name, value}) {
                this.setState(prev => {
                    prev[name] = value;
                    return prev;
                })
            }

            render() {
                return (
                    <div>
                        <Form
                            data={this.state}
                            onChange={this.handleChange.bind(this)}
                        >
                            <FormItem
                                name="a"
                                validate={[{
                                    maxLength: 2,
                                    trigger: "change",
                                    message: "message a"
                                }]}/>
                            <FormItem
                                name="b"
                                validate={[{
                                    min: 2,
                                    max: 3,
                                    trigger: "blur",
                                    message: "message b"
                                }]}/>
                        </Form>
                    </div>
                )
            }
        }

        const wrapper = mount(<Demo/>);
        wrapper.find('input[name="a"]').simulate('change', {target: {value: "abc"}});
        expect(wrapper.find('FormItem[name="a"] .el-form-message').text()).toEqual("message a");
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
        wrapper.find('input[name="a"]').simulate('change', {target: {value: "ab"}});
        expect(wrapper.find('FormItem[name="a"] .el-form-message').text()).toEqual("");
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(false);
        wrapper.find('input[name="b"]').simulate('change', {target: {value: 4}});
        wrapper.find('input[name="b"]').simulate('blur');
        expect(wrapper.find('FormItem[name="b"] .el-form-message').text()).toEqual("message b");
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
        wrapper.find('input[name="b"]').simulate('change', {target: {value: 3}});
        wrapper.find('input[name="b"]').simulate('blur');
        expect(wrapper.find('FormItem[name="b"] .el-form-message').text()).toEqual("");
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(false);
        wrapper.find('input[name="b"]').simulate('change', {target: {value: 1}});
        wrapper.find('input[name="b"]').simulate('blur');
        expect(wrapper.find('FormItem[name="b"] .el-form-message').text()).toEqual("message b");
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
        wrapper.find('input[name="a"]').simulate('change', {target: {value: "abc"}});
        expect(wrapper.find('FormItem[name="a"] .el-form-message').text()).toEqual("message a");
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
        wrapper.find('input[name="a"]').simulate('change', {target: {value: "ab"}});
        expect(wrapper.find('FormItem[name="a"] .el-form-message').text()).toEqual("");
        expect(!!wrapper.find('Form').instance().state.disabled).toEqual(true);
    });
});