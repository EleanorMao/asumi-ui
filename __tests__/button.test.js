import React from 'react';
import {shallow} from 'enzyme';
import {Button} from '../src';

describe('Button', () => {
  it('create component', () => {
    const component = shallow(<Button/>);
    expect(component).toBeDefined();
    expect(component.find('button.el-btn').length).toEqual(1);
  });
  it('define type[default]', () => {
    const component = shallow(<Button type="default"/>);
    expect(component).toBeDefined();
    expect(component.find('button.el-btn').length).toEqual(1);
  });
  it('define type[success]', () => {
    const component = shallow(<Button type="success"/>);
    expect(component).toBeDefined();
    expect(component.find('button.el-btn.el-success').length).toEqual(1);
  });
  it('define type[primary]', () => {
    const component = shallow(<Button type="primary"/>);
    expect(component).toBeDefined();
    expect(component.find('button.el-btn.el-primary').length).toEqual(1);
  });
  it('define type[danger]', () => {
    const component = shallow(<Button type="danger"/>);
    expect(component).toBeDefined();
    expect(component.find('button.el-btn.el-danger').length).toEqual(1);
  });
  it('define type[error]', () => {
    const component = shallow(<Button type="error"/>);
    expect(component).toBeDefined();
    expect(component.find('button.el-btn.el-danger').length).toEqual(1);
  });
  it('define type[secondary]', () => {
    const component = shallow(<Button type="secondary"/>);
    expect(component).toBeDefined();
    expect(component.find('button.el-btn.el-secondary').length).toEqual(1);
  });
  it('define type[warning]', () => {
    const component = shallow(<Button type="warning"/>);
    expect(component).toBeDefined();
    expect(component.find('button.el-btn.el-secondary').length).toEqual(1);
  });
  it('define type[text]', () => {
    const component = shallow(<Button type="text"/>);
    expect(component).toBeDefined();
    expect(component.find('button.el-btn.el-text').length).toEqual(1);
  });
  it('define disabled', () => {
    const component = shallow(<Button disabled/>);
    expect(component).toBeDefined();
    expect(component.find('button.el-btn.el-disabled').length).toEqual(1);
  });
  it('define size[default]', () => {
    const component = shallow(<Button size="default"/>);
    expect(component).toBeDefined();
    expect(component.find('button.el-btn').length).toEqual(1);
  });
  it('define size[small]', () => {
    const component = shallow(<Button size="small"/>);
    expect(component).toBeDefined();
    expect(component.find('button.el-btn.el-small').length).toEqual(1);
  });
  it('define size[large]', () => {
    const component = shallow(<Button size="large"/>);
    expect(component).toBeDefined();
    expect(component.find('button.el-btn.el-large').length).toEqual(1);
  });
  it('define size & type', () => {
    const component = shallow(<Button size="large" type="error"/>);
    expect(component).toBeDefined();
    expect(component.find('button.el-btn.el-large.el-danger').length).toEqual(1);
  });
  it('define submit', () => {
    const component = shallow(<Button submit/>);
    expect(component).toBeDefined();
    expect(component.find('button.el-btn[type="submit"]').length).toEqual(1);
  });
  it('define reset', () => {
    const component = shallow(<Button reset/>);
    expect(component).toBeDefined();
    expect(component.find('button.el-btn[type="reset"]').length).toEqual(1);
  });
  it('define href', () => {
    const component = shallow(<Button href="/"/>);
    expect(component).toBeDefined();
    expect(component.find('a.el-btn').length).toEqual(1);
  });
  it('define className', () => {
    const component = shallow(<Button className="jest"/>);
    expect(component).toBeDefined();
    expect(component.find('button.el-btn.jest').length).toEqual(1);
  });
  it('define style', () => {
    const component = shallow(<Button style={{width: 100}}/>);
    expect(component).toBeDefined();
    expect(component.instance().props.style.width).toEqual(100);
  });
  it('define children', () => {
    const component = shallow(<Button><b/></Button>);
    expect(component).toBeDefined();
    expect(component.find('button.el-btn > b').length).toEqual(1);
  });
  it('define others', () => {
    const component = shallow(<Button name="jest"><b/></Button>);
    expect(component).toBeDefined();
    expect(component.find('button.el-btn[name="jest"] > b').length).toEqual(1);
  })
});
