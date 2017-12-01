import React from 'react';
import {mount, shallow} from 'enzyme';
import {Pagination} from '../src';

describe('Pagination', () => {
    it('create component', () => {
        const component = shallow(<Pagination/>);
        expect(component).toMatchSnapshot();
    });
    it('define current & dataSize', () => {
        const component = mount(<Pagination current={2} dataSize={50}/>);
        expect(component).toMatchSnapshot();
    });
    it('define sizePerPage', () => {
        const component = mount(<Pagination sizePerPage={5} current={2} dataSize={50}/>);
        expect(component).toMatchSnapshot();
    });
    it('define paginationSize', () => {
        const component = mount(<Pagination paginationSize={5} current={2} dataSize={50}/>);
        expect(component).toMatchSnapshot();
    });
    it('define showTotalPages', () => {
        const component = mount(<Pagination showTotalPages={false}/>);
        expect(component).toMatchSnapshot();
    });
    it('define hideEndLabel & hideStartLabel', () => {
        const component = mount(<Pagination hideEndLabel hideStartLabel/>);
        expect(component).toMatchSnapshot();
    });
    it('define startLabel prevLabel nextLabel endLabel', () => {
        const component = mount(<Pagination startLabel="1" prevLabel="2" nextLabel="3" endLabel="4"/>);
        expect(component).toMatchSnapshot();
    });
});
