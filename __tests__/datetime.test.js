import React from 'react';
import { mount } from 'enzyme';
import DateTime from '../src/component/datetime/datetime.js';



describe('Datetime', () => {
  it('create component', () => {
    const component = mount(<DateTime />)
    expect(component).toBeDefined();
    expect(component.find('.el-datetime > .el-datetime-picker').length).toEqual(1);

  })
})
