import React, {Component} from 'react';
import {shallow, mount} from 'enzyme';
import {TagInput} from '../src';

describe('TagInput', () => {
    it('define disabled', () => {
        const component = mount(<TagInput disabled/>);
        expect(component).toBeDefined(); //喵喵？
        expect(component.find('.el-taginput-wrapper.el-taginput-disabled input[disabled]').length).toEqual(1);
    });
    it('define className', () => {
        const component = shallow(<TagInput className="jest"/>);
        expect(component).toBeDefined();
        expect(component.find('.jest').length).toEqual(1);
    });
    it('define readOnly', () => {
        const component = mount(<TagInput readOnly/>);
        expect(component).toBeDefined(); //喵喵？
        expect(component.find('.el-taginput-wrapper.el-taginput-readonly input[readOnly]').length).toEqual(1);
    });
    it('onChange', () => {
        class Demo extends Component {
            constructor() {
                super();
                this.state = {
                    value: []
                }
            }

            handleChange({value}) {
                this.setState({value});
            }

            render() {
                return <TagInput onChange={this.handleChange.bind(this)} value={this.state.value}/>
            }
        }

        const component = mount(<Demo/>);
        component.find('input').simulate('change', {target: {value: '111'}});
        component.find('input').simulate('keydown', {which: 13});
        expect(component.instance().state.value).toEqual(['111']);
        expect(component.find('input').prop('value')).toBe('');
        component.find('input').simulate('keydown', {which: 8});
        expect(component.instance().state.value).toEqual([]);
    });
    it('onChange[separator=18]', () => {
        class Demo extends Component {
            constructor() {
                super();
                this.state = {
                    value: []
                }
            }

            handleChange({value}) {
                this.setState({value});
            }

            render() {
                return <TagInput separator={18} onChange={this.handleChange.bind(this)} value={this.state.value}/>
            }
        }

        const component = mount(<Demo/>);
        component.find('input').simulate('change', {target: {value: '111'}});
        component.find('input').simulate('keydown', {which: 18});
        expect(component.instance().state.value).toEqual(['111']);
        expect(component.find('input').prop('value')).toBe('');
    });
    it('onChange[separator]', () => {
        class Demo extends Component {
            constructor() {
                super();
                this.state = {
                    value: []
                }
            }

            handleChange({value}) {
                this.setState({value});
            }

            render() {
                return <TagInput separator="space" onChange={this.handleChange.bind(this)} value={this.state.value}/>
            }
        }

        const component = mount(<Demo/>);
        component.find('input').simulate('change', {target: {value: '111'}});
        component.find('input').simulate('keydown', {which: 32});
        expect(component.instance().state.value).toEqual(['111']);
        expect(component.find('input').prop('value')).toBe('');
    });
});