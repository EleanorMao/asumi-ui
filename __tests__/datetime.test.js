import React from 'react';
import moment from 'moment';
import {mount} from 'enzyme';
import {DateTime} from '../src/';

describe('Datetime', () => {
    it('create component', () => {
        const component = mount(<DateTime/>);
        expect(component).toMatchSnapshot();
    });

    it('define defaultValue', ()=>{
        const component = mount(<DateTime defaultValue={moment()}/>);
        expect(component).toMatchSnapshot();
    });

    it('define dateFormat', ()=>{
        const component = mount(<DateTime dateFormat={true}/>);
        expect(component).toMatchSnapshot();
    });

    it('define viewMode', ()=>{
        const date = moment();
        const component = mount(<DateTime defaultValue={date} viewMode='days'/>);
        component.find('input[type="text"]').simulate('focus');
        expect(component.find('.el-datetime-switch').text()).toEqual(date.format('MMMM YYYY'));
        
        component.setProps({viewMode: 'weeks'});
        expect(component.find('.el-datetime-switch').text()).toEqual(date.format('MMMM YYYY'));

        component.setProps({viewMode: 'months'});
        expect(component.find('.el-datetime-switch').text()).toEqual(date.format('YYYY'));
        
        component.setProps({viewMode: 'years'});
        const num = parseInt(date.year() / 10, 10) * 10;
        expect(component.find('.el-datetime-switch').text()).toEqual( num + '-' + (num + 9));
    });

    it('define open', ()=>{
        const date = moment();
        const component = mount(<DateTime defaultValue={date} open={false}/>);
        expect(component.find('.el-datetime-open').length).toEqual(0);
    })
});
