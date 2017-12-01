import React from 'react';
import {shallow} from 'enzyme';
import {Tag} from '../src';

describe('Tag', () => {
    it('create component', () => {
        const component = shallow(<Tag/>);
        expect(component).toBeDefined();
        expect(component.find('.el-tag').length).toEqual(1);
    });
    it('define type[default]', () => {
        const component = shallow(<Tag type="default"/>);
        expect(component).toBeDefined();
        expect(component.find('.el-tag').length).toEqual(1);
    });
    it('define type[success]', () => {
        const component = shallow(<Tag type="success"/>);
        expect(component).toBeDefined();
        expect(component.find('.el-tag.el-success').length).toEqual(1);
    });
    it('define type[primary]', () => {
        const component = shallow(<Tag type="primary"/>);
        expect(component).toBeDefined();
        expect(component.find('.el-tag.el-primary').length).toEqual(1);
    });
    it('define type[danger]', () => {
        const component = shallow(<Tag type="danger"/>);
        expect(component).toBeDefined();
        expect(component.find('.el-tag.el-danger').length).toEqual(1);
    });
    it('define type[error]', () => {
        const component = shallow(<Tag type="error"/>);
        expect(component).toBeDefined();
        expect(component.find('.el-tag.el-danger').length).toEqual(1);
    });
    it('define type[secondary]', () => {
        const component = shallow(<Tag type="secondary"/>);
        expect(component).toBeDefined();
        expect(component.find('.el-tag.el-secondary').length).toEqual(1);
    });
    it('define type[warning]', () => {
        const component = shallow(<Tag type="warning"/>);
        expect(component).toBeDefined();
        expect(component.find('.el-tag.el-secondary').length).toEqual(1);
    });
    it('define className', () => {
        const component = shallow(<Tag className="jest"/>);
        expect(component).toBeDefined();
        expect(component.find('.el-tag.jest').length).toEqual(1);
    });
    it('define closeable', () => {
        const component = shallow(<Tag closeable/>);
        expect(component).toBeDefined();
        expect(component.find(".el-tag-close").length).toEqual(1);
    });
    it('define children', () => {
        const component = shallow(<Tag><b/></Tag>);
        expect(component).toBeDefined();
        expect(component.find('.el-tag > b').length).toEqual(1);
    });
});
