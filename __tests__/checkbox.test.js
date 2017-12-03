import React, {Component} from 'react';
import {shallow, mount} from 'enzyme';
import {Checkbox, CheckboxGroup} from '../src';

describe('Checkbox', () => {
    it('create component', () => {
        const component = mount(<Checkbox/>);
        expect(component).toMatchSnapshot();
    });
    it('define label', () => {
        const component = mount(<Checkbox label="label"/>);
        expect(component.text()).toEqual("label");
    });
    it('define children', () => {
        const component = mount(<Checkbox>label</Checkbox>);
        expect(component.text()).toEqual("label");
    });
    it('define checked', () => {
        const component = mount(<Checkbox checked/>);
        expect(component).toMatchSnapshot();
        expect(component.find('input[checked]').length).toEqual(1);
    });
    it('define disabled', () => {
        const component = mount(<Checkbox disabled/>);
        expect(component).toMatchSnapshot();
        expect(component.find('input[disabled]').length).toEqual(1);
    });
    it('define className', () => {
        const component = shallow(<Checkbox className="jest"/>);
        expect(component).toBeDefined();
        expect(component.find('.jest').length).toEqual(1);
    });
    it('define name', () => {
        const component = mount(<Checkbox name="jest"/>);
        expect(component).toBeDefined();
        expect(component.find('input[name="jest"]').length).toEqual(1);
    });
    it('define readOnly', () => {
        const component = mount(<Checkbox readOnly/>);
        expect(component).toMatchSnapshot();
        expect(component.find('input[readOnly]').length).toEqual(1);
    });
    it('define switch', () => {
        const component = mount(<Checkbox type="switch"/>);
        expect(component).toMatchSnapshot();
    });
    it('define onBlur', () => {
        const handleBlur = jest.fn();
        const component = mount(<Checkbox onBlur={handleBlur}/>);
        component.find('input').simulate('focus');
        component.find('input').simulate('blur');
        expect(handleBlur).toBeCalled();
    });
    it('define onKeyPress', () => {
        const handleKeyPress = jest.fn();
        const component = mount(<Checkbox onKeyPress={handleKeyPress}/>);
        component.find('input').simulate('keypress');
        expect(handleKeyPress).toBeCalled();
    });
    it('define onchange', () => {
        class Demo extends Component {
            constructor() {
                super();
                this.state = {
                    checked: false
                };
            }

            handleChange({value, checked}) {
                this.setState({checked})
            }

            render() {
                return (
                    <Checkbox
                        value={1}
                        ref={c => {
                            this._c = c
                        }}
                        checked={this.state.checked}
                        onChange={this.handleChange.bind(this)}/>)
            }
        }

        const component = mount(<Demo/>);
        component.find('input').simulate('change');
        expect(component.instance().state.checked).toEqual(true);
    });
});

describe("Checkbox Group", () => {
    it("create component", () => {
        const component = mount(
            <CheckboxGroup options={[{
                label: '选项1',
                value: 1
            }, {
                label: '选项2',
                value: 2
            }, {
                label: '选项3',
                value: 3
            }]}/>);
        expect(component).toMatchSnapshot();
    });
    it("define options str", () => {
        const component = mount(
            <CheckboxGroup
                disableAll
                options={[1, 2, 3]}/>);
        expect(component).toMatchSnapshot();
    });
    it("define disableAll", () => {
        const component = mount(
            <CheckboxGroup
                disableAll
                options={[{
                    label: '选项1',
                    value: 1
                }, {
                    label: '选项2',
                    value: 2
                }, {
                    label: '选项3',
                    value: 3
                }]}/>);
        expect(component).toMatchSnapshot();
    });
    it("define className", () => {
        const component = mount(
            <CheckboxGroup
                className="jest"
                options={[{
                    label: '选项1',
                    value: 1
                }, {
                    label: '选项2',
                    value: 2
                }, {
                    label: '选项3',
                    value: 3
                }]}/>);
        expect(component.find('.el-checkbox-group.jest').length).toEqual(1);
    });
    it('define onBlur', () => {
        const handleBlur = jest.fn();
        const component = mount(<CheckboxGroup
            onBlur={handleBlur}
            options={[{
                label: '选项1',
                value: 1
            }, {
                label: '选项2',
                value: 2
            }, {
                label: '选项3',
                value: 3
            }]}/>);
        component.find('input').at(0).simulate('focus');
        component.find('input').at(0).simulate('blur');
        expect(handleBlur).toBeCalled();
        component.find('input').at(2).simulate('focus');
        component.find('input').at(2).simulate('blur');
        expect(handleBlur).toBeCalled();
    });
    it('define onKeyPress', () => {
        const handleKeyPress = jest.fn();
        const component = mount(<CheckboxGroup
            onKeyPress={handleKeyPress}
            options={[{
                label: '选项1',
                value: 1
            }, {
                label: '选项2',
                value: 2
            }, {
                label: '选项3',
                value: 3
            }]}/>);
        component.find('input').at(0).simulate('keypress');
        expect(handleKeyPress).toBeCalled();
        component.find('input').at(2).simulate('keypress');
        expect(handleKeyPress).toBeCalled();
    });
    it("define hasCheckAll", () => {
        const component = mount(
            <CheckboxGroup
                hasCheckAll={false}
                options={[{
                    label: '选项1',
                    value: 1
                }, {
                    label: '选项2',
                    value: 2
                }, {
                    label: '选项3',
                    value: 3
                }]}/>);
        expect(component).toMatchSnapshot();
    });
    it('define onchange', () => {
        class Demo extends Component {
            constructor() {
                super();
                this.state = {
                    value: []
                };
            }

            handleChange({value}) {
                this.setState({value})
            }

            render() {
                return (
                    <CheckboxGroup
                        checkedList={this.state.value}
                        onChange={this.handleChange.bind(this)}
                        options={[{
                            label: '选项1',
                            value: 1
                        }, {
                            label: '选项2',
                            value: 2
                        }, {
                            label: '选项3',
                            value: 3
                        }]}/>)
            }
        }

        const component = mount(<Demo/>);
        component.find('.el-checkbox-row.el-check-all input').simulate('change');
        expect(component.instance().state.value).toEqual([1, 2, 3]);
        component.find('.el-checkbox-row.el-check-all input').simulate('change');
        expect(component.instance().state.value).toEqual([]);
    });
});


