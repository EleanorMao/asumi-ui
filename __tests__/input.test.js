import React, {Component} from 'react';
import {shallow, mount} from 'enzyme';
import {Input} from '../src';

describe('Input', () => {
  it('create component', () => {
    const component = shallow(<Input/>);
    expect(component).toBeDefined();
    expect(component.find('.el-input > input').length).toEqual(1);
  });
  it('define type[text]', () => {
    const component = shallow(<Input type="text"/>);
    expect(component).toBeDefined();
    expect(component.find('.el-input > input').length).toEqual(1);
  });
  it('define type[textarea]', () => {
    const component = shallow(<Input type="textarea"/>);
    expect(component).toBeDefined();
    expect(component.find('.el-input > textarea').length).toEqual(1);
  });
  it('define type[color]', () => {
    const component = shallow(<Input type="color"/>);
    expect(component).toBeDefined();
    expect(component.find('.el-input > input[type="color"]').length).toEqual(1);
  });
  it('define disabled', () => {
    const component = shallow(<Input disabled/>);
    expect(component).toBeDefined();
    expect(component.find('.el-input > input[disabled]').length).toEqual(1);
  });
  it('define size[small]', () => {
    const component = shallow(<Input size="small"/>);
    expect(component).toBeDefined();
    expect(component.find('.el-input.el-small > input').length).toEqual(1);
  });
  it('define size[large]', () => {
    const component = shallow(<Input size="large"/>);
    expect(component).toBeDefined();
    expect(component.find('.el-input.el-large > input').length).toEqual(1);
  });
  it('define className', () => {
    const component = shallow(<Input className="jest"/>);
    expect(component).toBeDefined();
    expect(component.find('.el-input.jest').length).toEqual(1);
  });
  it('define style', () => {
    const component = shallow(<Input style={{width: 100}}/>);
    expect(component).toBeDefined();
    expect(component.instance().props.style.width).toEqual(100);
  });
  it('define name', () => {
    const component = shallow(<Input name="jest"/>);
    expect(component).toBeDefined();
    expect(component.find('.el-input > input[name="jest"]').length).toEqual(1);
  });
  it('define readOnly', () => {
    const component = shallow(<Input readOnly/>);
    expect(component).toBeDefined(); //喵喵？
    expect(component.find('.el-input input[readOnly]').length).toEqual(1);
  });
  it('define icon[default]', () => {
    const component = shallow(<Input icon={<b/>}/>);
    expect(component).toBeDefined();
    expect(component.find('.el-input > .el-input-icon > b').length).toEqual(1);
  });
  it('define icon[textarea]', () => {
    const component = shallow(<Input icon={<b/>} type="textarea"/>);
    expect(component).toBeDefined();
    expect(component.find('.el-input > .el-input-icon > b').length).toEqual(1);
  });
  it('define prepend[textarea]', () => {
    const component = shallow(<Input prepend="https" type="textarea"/>);
    expect(component).toBeDefined();
    expect(component.find('.el-input-prepend').length).toEqual(0);
  });
  it('define prepend[text]', () => {
    const component = shallow(<Input prepend={<em/>}/>);
    expect(component).toBeDefined();
    expect(component.find('.el-input-wrapper .el-input-prepend em').length).toEqual(1);
  });
  it('define append[text]', () => {
    const component = shallow(<Input append={<em/>}/>);
    expect(component).toBeDefined();
    expect(component.find('.el-input-wrapper .el-input-append em').length).toEqual(1);
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
        return <Input onChange={this.handleChange.bind(this)} value={this.state.value}/>
      }
    }

    const component = mount(<Demo/>);
    component.find('input').simulate('change', {target: {value: '111'}});
    expect(component.instance().state.value).toEqual('111');
    expect(component.find('input').prop('value')).toBe('111');
  });
  it('define rule[color]', () => {
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
        return <Input rule="color" onChange={this.handleChange.bind(this)} value={this.state.value}/>
      }
    }

    const component = mount(<Demo/>);
    component.find('input').simulate('change', {target: {value: '111'}});
    expect(component.instance().state.value).toBe('');
    expect(component.find('input').prop('value')).toBe('');
    component.find('input').simulate('change', {target: {value: '#'}});
    expect(component.instance().state.value).toBe('#');
    expect(component.find('input').prop('value')).toBe('#');
    component.find('input').simulate('change', {target: {value: '#fff'}});
    expect(component.instance().state.value).toBe('#fff');
    expect(component.find('input').prop('value')).toBe('#fff');
  });
  it('define rule[price]', () => {
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
        return <Input rule="price" onChange={this.handleChange.bind(this)} value={this.state.value}/>
      }
    }

    const component = mount(<Demo/>);
    component.find('input').simulate('change', {target: {value: '0.'}});
    expect(component.instance().state.value).toBe('0.');
    component.find('input').simulate('change', {target: {value: '10'}});
    expect(component.instance().state.value).toBe('10');
    expect(component.find('input').prop('value')).toBe('10');
    component.find('input').simulate('change', {target: {value: '10.12'}});
    expect(component.instance().state.value).toBe('10.12');
    expect(component.find('input').prop('value')).toBe('10.12');
    component.find('input').simulate('change', {target: {value: '10.123'}});
    expect(component.instance().state.value).toBe('10.12');
    expect(component.find('input').prop('value')).toBe('10.12');
  });
  it('define rule[positiveInt]', () => {
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
        return <Input rule="positiveInt" onChange={this.handleChange.bind(this)} value={this.state.value}/>
      }
    }

    const component = mount(<Demo/>);
    component.find('input').simulate('change', {target: {value: '0'}});
    expect(component.instance().state.value).toBe('');
    component.find('input').simulate('change', {target: {value: '10'}});
    expect(component.instance().state.value).toBe('10');
    expect(component.find('input').prop('value')).toBe('10');
    component.find('input').simulate('change', {target: {value: '10.12'}});
    expect(component.instance().state.value).toBe('10');
    expect(component.find('input').prop('value')).toBe('10');
    component.find('input').simulate('change', {target: {value: ''}});
    expect(component.instance().state.value).toBe('');
    expect(component.find('input').prop('value')).toBe('');
  });
  it('define rule[nature]', () => {
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
        return <Input rule="nature" onChange={this.handleChange.bind(this)} value={this.state.value}/>
      }
    }

    const component = mount(<Demo/>);
    component.find('input').simulate('change', {target: {value: '0'}});
    expect(component.instance().state.value).toBe('0');
    component.find('input').simulate('change', {target: {value: '10'}});
    expect(component.instance().state.value).toBe('10');
    expect(component.find('input').prop('value')).toBe('10');
    component.find('input').simulate('change', {target: {value: '10.'}});
    expect(component.instance().state.value).toBe('10');
    expect(component.find('input').prop('value')).toBe('10');
    component.find('input').simulate('change', {target: {value: '-'}});
    expect(component.instance().state.value).toBe('10');
    expect(component.find('input').prop('value')).toBe('10');
  });
  it('define onKeyPress', () => {
    class Demo extends Component {
      constructor() {
        super();
        this.state = {
          pressed: false
        }
      }

      handleKeyPress() {
        this.setState({pressed: true});
      }

      render() {
        return <Input onKeyPress={this.handleKeyPress.bind(this)}/>
      }
    }

    const component = mount(<Demo/>);
    component.find('input').simulate('keypress', {witch: 13});
    expect(component.instance().state.pressed).toBe(true);
  });
});
