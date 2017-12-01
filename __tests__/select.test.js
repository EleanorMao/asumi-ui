import React, {Component} from 'react';
import {shallow, mount} from 'enzyme';
import {Select} from '../src';

describe('Select', () => {
    it('create component', () => {
        const component = mount(<Select/>);
        expect(component).toMatchSnapshot();
    });
    it('define disabled', () => {
        const component = mount(<Select disabled/>);
        expect(component).toMatchSnapshot();
    });
    it('define size[small]', () => {
        const component = mount(<Select size="small"/>);
        expect(component).toMatchSnapshot();
    });
    it('define size[large]', () => {
        const component = mount(<Select size="large"/>);
        expect(component).toMatchSnapshot();
    });
    it('define className', () => {
        const component = shallow(<Select className="jest"/>);
        expect(component).toBeDefined();
        expect(component.find('.jest').length).toEqual(1);
    });
    it('define style', () => {
        const component = shallow(<Select style={{width: 100}}/>);
        expect(component).toMatchSnapshot();
    });
    it('define closeAfterSelect', () => {
        const component = shallow(<Select closeAfterSelect={false}/>);
        expect(component).toMatchSnapshot();
    });
    it('define name', () => {
        const component = mount(<Select name="jest"/>);
        expect(component).toBeDefined();
        expect(component.find('input[name="jest"]').length).toEqual(1);
    });
    it('define readOnly', () => {
        const component = mount(<Select readOnly/>);
        expect(component).toBeDefined(); //喵喵？
        expect(component.find('.el-input input[readOnly]').length).toEqual(1);
    });
});