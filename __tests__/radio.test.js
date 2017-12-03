import React, {Component} from 'react';
import {shallow, mount} from 'enzyme';
import {Radio, RadioGroup} from '../src';

describe('Radio', () => {
    it('create component', () => {
        const component = mount(<Radio/>);
        expect(component).toMatchSnapshot();
    });
    it('define label', () => {
        const component = mount(<Radio label="label"/>);
        expect(component.text()).toEqual("label");
    });
    it('define children', () => {
        const component = mount(<Radio>label</Radio>);
        expect(component.text()).toEqual("label");
    });
    it('define checked', () => {
        const component = mount(<Radio checked/>);
        expect(component).toMatchSnapshot();
        expect(component.find('input[checked]').length).toEqual(1);
    });
    it('define disabled', () => {
        const component = mount(<Radio disabled/>);
        expect(component).toMatchSnapshot();
        expect(component.find('input[disabled]').length).toEqual(1);
    });
    it('define className', () => {
        const component = shallow(<Radio className="jest"/>);
        expect(component).toBeDefined();
        expect(component.find('.jest').length).toEqual(1);
    });
    it('define name', () => {
        const component = mount(<Radio name="jest"/>);
        expect(component).toBeDefined();
        expect(component.find('input[name="jest"]').length).toEqual(1);
    });
    it('define readOnly', () => {
        const component = mount(<Radio readOnly/>);
        expect(component).toMatchSnapshot();
        expect(component.find('input[readOnly]').length).toEqual(1);
    });
    it('define switch', () => {
        const component = mount(<Radio type="switch"/>);
        expect(component).toMatchSnapshot();
    });
    it('define onBlur', () => {
        const handleBlur = jest.fn();
        const component = mount(<Radio onBlur={handleBlur}/>);
        component.find('input').simulate('focus');
        component.find('input').simulate('blur');
        expect(handleBlur).toBeCalled();
    });
    it('define onKeyPress', () => {
        const handleKeyPress = jest.fn();
        const component = mount(<Radio onKeyPress={handleKeyPress}/>);
        component.find('input').simulate('keypress');
        expect(handleKeyPress).toBeCalled();
    });
    it('define onchange', () => {
        class Demo extends Component {
            constructor() {
                super();
                this.state = {
                    value: ""
                };
            }

            handleChange({value}) {
                this.setState({value})
            }

            render() {
                return (
                    <Radio
                        value={1}
                        ref={c => {
                            this._c = c
                        }}
                        checked={this.state.value === 1}
                        onChange={this.handleChange.bind(this)}/>)
            }
        }

        const component = mount(<Demo/>);
        component.find('input').simulate('click');
        expect(component.instance().state.value).toEqual(1);
    });
});

describe("Radio Group", () => {
    it("create component", () => {
        const component = mount(
            <RadioGroup options={[{
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
            <RadioGroup
                disableAll
                options={[1, 2, 3]}/>);
        expect(component).toMatchSnapshot();
    });
    it("define disableAll", () => {
        const component = mount(
            <RadioGroup
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
            <RadioGroup
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
        const component = mount(<RadioGroup
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
        const component = mount(<RadioGroup
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
    it('define onchange', () => {
        class Demo extends Component {
            constructor() {
                super();
                this.state = {
                    value: ""
                };
            }

            handleChange({value}) {
                this.setState({value})
            }

            render() {
                return (
                    <RadioGroup
                        value={this.state.value}
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
        component.find('.el-checkbox-row').childAt(0).simulate('click');
        setTimeout(() => {
            expect(component.instance().state.value).toEqual(1);
        });
    });
});


