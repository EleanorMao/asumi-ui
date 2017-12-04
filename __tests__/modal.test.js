import React from 'react';
import {mount} from 'enzyme';
import {Modal} from '../src';

describe('Modal', () => {
    it('create component', () => {
        const component = mount(<Modal/>);
        expect(component.find('.el-modal-wrapper').length).toEqual(0);
        component.setProps({visible: true});
        expect(component.instance().container).toBeDefined();
    });
});
