import React from 'react';
import {mount} from 'enzyme';
import {Tabs, TabPanel} from '../src';

describe('Tabs', () => {
    it('create component', () => {
        const component = mount(<Tabs><TabPanel key="1">a</TabPanel></Tabs>);
        expect(component).toMatchSnapshot();
    });
});
