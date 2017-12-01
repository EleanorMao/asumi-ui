import React from 'react';
import {shallow} from 'enzyme';
import {Grid} from '../src';

describe('Grid Row', () => {
    it('create component', () => {
        const component = shallow(<Grid.Row/>);
        expect(component).toBeDefined();
        expect(component.find('.el-grid-row').length).toEqual(1);
    });
    it('define className', () => {
        const component = shallow(<Grid.Row className="jest-grid"/>);
        expect(component).toBeDefined();
        expect(component.find('.el-grid-row.jest-grid').length).toEqual(1);
    });
    it('define style', () => {
        const component = shallow(<Grid.Row style={{width: 100}}/>);
        expect(component).toBeDefined();
        expect(component.instance().props.style.width).toEqual(100);
    });
    it('define children', () => {
        const component = shallow(<Grid.Row><b/></Grid.Row>);
        expect(component).toBeDefined();
        expect(component.find('.el-grid-row > b').length).toEqual(1);
    })
});

describe('Grid Col', () => {
    it('create component', () => {
        const component = shallow(<Grid.Col/>);
        expect(component).toBeDefined();
        expect(component.find('.el-col-12').length).toEqual(1);
    });
    it('define col[number]', () => {
        const component = shallow(<Grid.Col col={6}/>);
        expect(component).toBeDefined();
        expect(component.find('.el-col-6').length).toEqual(1);
    });
    it('define col[string]', () => {
        const component = shallow(<Grid.Col col="3"/>);
        expect(component).toBeDefined();
        expect(component.find('.el-col-3').length).toEqual(1);
    });
    it('define offset', () => {
        const component = shallow(<Grid.Col col="3" offset={1}/>);
        expect(component).toBeDefined();
        expect(component.find('.el-col-3.el-col-offset-1').length).toEqual(1);
    });
    it('define className', () => {
        const component = shallow(<Grid.Col col="3" offset={1} className="jest"/>);
        expect(component).toBeDefined();
        expect(component.find('.el-col-3.el-col-offset-1.jest').length).toEqual(1);
    });
    it('define inline', () => {
        const component = shallow(<Grid.Col col="3" inline/>);
        expect(component).toBeDefined();
        expect(component.find('.el-col-3.el-col-inline').length).toEqual(1);
    });
    it('define style', () => {
        const component = shallow(<Grid.Col col="3" style={{color: "#fff"}}/>);
        expect(component).toBeDefined();
        expect(component.instance().props.style.color).toEqual("#fff");
    });
    it('define children', () => {
        const component = shallow(<Grid.Col col="3"><em/></Grid.Col>);
        expect(component).toBeDefined();
        expect(component.find('.el-col-3 > em').length).toEqual(1);
    });
});
