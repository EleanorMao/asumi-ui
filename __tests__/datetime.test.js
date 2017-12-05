import React from 'react';
import moment from 'moment';
import {mount} from 'enzyme';
import {DateTime} from '../src/';
import {setTimeout} from 'timers';

describe('Datetime', () => {
    it('create component', () => {
        const component = mount(<DateTime/>);
        expect(component).toMatchSnapshot();
    });

    it('define defaultValue', () => {
        const component = mount(<DateTime defaultValue={moment()}/>);
        expect(component).toMatchSnapshot();
    });

    it('define dateFormat', () => {
        const component = mount(<DateTime dateFormat={true}/>);
        expect(component).toMatchSnapshot();
    });

    it('define timeFormat', () => {
        const component = moment(<DateTime timeFormat={true}/>);
        expect(component).toMatchSnapshot();
    });

    it('define viewMode', () => {
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
        expect(component.find('.el-datetime-switch').text()).toEqual(num + '-' + (num + 9));
    });

    it('define open[false]】', () => {
        const date = moment();
        const component = mount(<DateTime defaultValue={date} open={false}/>);
        expect(component.find('.el-datetime-open').length).toEqual(0);
    });

    it('define open[true]】', () => {
        const date = moment();
        const component = mount(<DateTime defaultValue={date} open={true}/>);
        expect(component.find('.el-datetime-open').length).toEqual(1);
    });

    it('define onChange', () => {
        const date = moment();
        const onChangeFn = jest.fn();
        const component = mount(
            <DateTime onChange={onChangeFn}/>);

        component.find('.el-datetime-day').at(1).simulate('click');
        setTimeout(() => {
            // expect(onChangeFn).toHaveBeenCalled();
        });
    });

    it('define className', () => {
        const component = mount(
            <DateTime className='haha'/>);
        expect(!!component.find('.haha')).toEqual(true);
    });

    it('define isValidDate', () => {
        const isValidDate = (currentDate, selectedDate) => {
            return currentDate.isBefore(moment());
        };
        const onChangeFn = jest.fn();
        const component = mount(
            <DateTime isValidDate={isValidDate} onChange={onChangeFn}/>);
        component.find('.el-datetime-disabled').at(0).simulate('click');
        expect(onChangeFn).not.toHaveBeenCalled();
        component.find('.el-datetime-day').not('.el-datetime-disabled').at(0).simulate('click');
        setTimeout(() => {
            // expect(onChangeFn).toHaveBeenCalled();
        });
    })
});
