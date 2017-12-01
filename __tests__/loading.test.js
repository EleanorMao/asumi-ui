import React from 'react';
import {shallow} from 'enzyme';
import {Loading} from '../src';

describe('Loading', () => {
    it('create component', () => {
        const component = shallow(<Loading/>);
        expect(component).toBeDefined();
        expect(component.instance().props.loading).toEqual(true);
        expect(component.find('.el-loading-wrapper').length).toEqual(1);
    });
    it('define size[small]', () => {
        const component = shallow(<Loading size="small"/>);
        expect(component).toBeDefined();
        expect(component.find('.el-loading-wrapper.el-small').length).toEqual(1);
    });
    it('define size[large]', () => {
        const component = shallow(<Loading size="large"/>);
        expect(component).toBeDefined();
        expect(component.find('.el-loading-wrapper.el-large').length).toEqual(1);
    });
    it('define className', () => {
        const component = shallow(<Loading className="jest"/>);
        expect(component).toBeDefined();
        expect(component.find('.el-loading-wrapper.jest').length).toEqual(1);
    });
    it('define fullScreen', () => {
        const component = shallow(<Loading fullScreen/>);
        expect(component).toBeDefined();
        expect(component.find(".el-loading-wrapper.el-loading-fixed").length).toEqual(1);
    });
    it('define title', () => {
        const component = shallow(<Loading title="title"/>);
        expect(component).toBeDefined();
        expect(component.find('.el-loading-wrapper .el-loading-title').length).toEqual(1);
    });
    it('define mask', () => {
        const component = shallow(<Loading mask/>);
        expect(component).toBeDefined();
        expect(component.find('.el-loading-wrapper .el-loading-mask').length).toEqual(1);
    });
    it('define children', () => {
        const component = shallow(<Loading><b/></Loading>);
        expect(component).toBeDefined();
        expect(component.find('.el-loading-wrapper .el-loading-children > b').length).toEqual(1);
    });
});
