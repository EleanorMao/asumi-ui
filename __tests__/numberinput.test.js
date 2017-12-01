import React, {Component} from 'react';
import {shallow, mount} from 'enzyme';
import {NumberInput} from '../src';

describe('NumberInput', () => {
    it('create component', () => {
        const component = mount(<NumberInput/>);
        expect(component).toMatchSnapshot();
    });
    it('define disabled', () => {
        const component = mount(<NumberInput disabled/>);
        expect(component).toMatchSnapshot();
    });
    it('define size[small]', () => {
        const component = mount(<NumberInput size="small"/>);
        expect(component).toMatchSnapshot();
    });
    it('define size[large]', () => {
        const component = mount(<NumberInput size="large"/>);
        expect(component).toMatchSnapshot();
    });
    it('define className', () => {
        const component = shallow(<NumberInput className="jest"/>);
        expect(component).toBeDefined();
        expect(component.find('.jest').length).toEqual(1);
    });
    it('define style', () => {
        const component = shallow(<NumberInput style={{width: 100}}/>);
        expect(component).toBeDefined();
        expect(component.instance().props.style.width).toEqual(100);
    });
    it('define name', () => {
        const component = mount(<NumberInput name="jest"/>);
        expect(component).toBeDefined();
        expect(component.find('input[name="jest"]').length).toEqual(1);
    });
    it('define readOnly', () => {
        const component = mount(<NumberInput readOnly/>);
        expect(component).toBeDefined(); //喵喵？
        expect(component.find('.el-input input[readOnly]').length).toEqual(1);
    });
    it('define prepend', () => {
        const component = mount(<NumberInput prepend={<em/>}/>);
        expect(component).toBeDefined();
        expect(component.find('.el-input-wrapper .el-input-prepend em').length).toEqual(1);
    });
    it('define append', () => {
        const component = mount(<NumberInput append={<em/>}/>);
        expect(component).toBeDefined();
        expect(component.find('.el-input-wrapper .el-input-append em').length).toEqual(0);
    });
    it('define icon', () => {
        const component = mount(<NumberInput icon={<em/>}/>);
        expect(component).toBeDefined();
        expect(component.find('.el-input-wrapper .el-input-icon em').length).toEqual(1);
    });
    it('when click handler', () => {
        const component = mount(<NumberInput/>);
        component.find('.el-number-input-up').simulate('click');
        expect(component.instance().state.value).toEqual(1);
        component.find('.el-number-input-down').simulate('click');
        expect(component.instance().state.value).toEqual(0);
    });
    it('define step', () => {
        const component = mount(<NumberInput step={5}/>);
        component.find('.el-number-input-up').simulate('click');
        expect(component.instance().state.value).toEqual(5);
        component.find('.el-number-input-down').simulate('click');
        expect(component.instance().state.value).toEqual(0);
    });
    it('define min & max', () => {
        const component = mount(<NumberInput min={0} max={2}/>);
        component.find('.el-number-input-up').simulate('click');
        component.find('.el-number-input-up').simulate('click');
        component.find('.el-number-input-up').simulate('click');
        expect(component.instance().state.value).toEqual(2);
        component.find('.el-number-input-down').simulate('click');
        component.find('.el-number-input-down').simulate('click');
        component.find('.el-number-input-down').simulate('click');
        expect(component.instance().state.value).toEqual(0);
    });
    it('define dataFormat', () => {
        const component = mount(<NumberInput step={5} dataFormat={(data) => {
            return '+' + data
        }}/>);
        component.find('.el-number-input-up').simulate('click');
        expect(component.instance().state.value).toEqual(5);
        expect(component.instance().state.renderValue).toEqual("+5");
        component.find('.el-number-input-down').simulate('click');
        expect(component.instance().state.value).toEqual(0);
        expect(component.instance().state.renderValue).toEqual("+0");
    });
    it('input decimals', () => {
        const component = mount(<NumberInput/>);
        component.find('input').simulate('change', {target: {value: "1.1"}});
        expect(component.instance().state.value).toEqual("1.1");
        component.find('.el-number-input-down').simulate('click');
        expect(component.instance().state.value).toEqual(0.1);
    });
    it('onChange', () => {
        class Demo extends Component {
            constructor() {
                super();
                this.state = {
                    value: ""
                }
            }

            handleChange({value}) {
                this.setState({value});
            }

            render() {
                return <NumberInput onChange={this.handleChange.bind(this)} value={this.state.value}/>
            }
        }

        const component = mount(<Demo/>);
        component.find('input').simulate('change', {target: {value: '111'}});
        expect(component.instance().state.value).toEqual('111');
        expect(component.find('input').prop('value')).toBe('111');
    });
});