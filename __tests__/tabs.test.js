import React from 'react';
import {mount} from 'enzyme';
import {Tabs, TabPanel} from '../src';

describe('Tabs', () => {
    it('create component', () => {
        const component = mount(<Tabs><TabPanel id="1">a</TabPanel></Tabs>);
        expect(component).toMatchSnapshot();
    });
    it('create component[null]', () => {
        const component = mount(<Tabs>{null}</Tabs>);
        expect(component).toMatchSnapshot();
    });
    it('define activeId', () => {
        const component = mount(<Tabs activeId="2"><TabPanel id="1">a</TabPanel><TabPanel id="2">b</TabPanel></Tabs>);
        expect(component).toMatchSnapshot();
    });
    it('define onClick', () => {
        const handleClick = jest.fn();
        const component = mount(
            <Tabs activeId="2"
                  onClick={handleClick}>
                <TabPanel id="1">a</TabPanel>
                <TabPanel id="2">b</TabPanel>
            </Tabs>
        );
        component.find('.el-tabs-nav li').at(0).simulate('click');
        expect(handleClick).toBeCalled();
    });
});
