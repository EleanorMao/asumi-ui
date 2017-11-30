import React from 'react';
import moment from 'moment';

class WeekView extends React.Component{
    constructor(props){
        super(props)
    }

    updateSelectedDate(event){
        this.props.updateSelectedDate(event, true);
    }
    
    alwaysValidDate(){
        return 1;
    }

    getDaysOfWeek(locale){
        let days = locale._weekdaysMin,
            first = locale.firstDayOfWeek(),
            dow = [],
            i = 0;
            days.forEach(day=>{
                dow [ (7+i++ - first) % 7] = day;
            })
            return dow;
    }

    renderDay(props, currentdate){
        return <td {...props}>{currentdate.date()}</td>
    }

    renderDays(){
        let date = this.props.viewDate,
            selected = this.props.selectedDate && this.props.selectedDate.clone(),
            prevMonth = date.clone().subtract(1, 'months'),
            currentYear = date.year(),
            currentMonth = date.month(),
            weeks = [],
            days = [],
            renderer = this.props.renderDay || this.renderDay.bind(this),
            isValid = this.props.isValidDate || this.alwaysValidDate,
            classes, isDisabled, dayProps, currentdate;

            prevMonth.date(prevMonth.daysInMonth()).startOf('week');
            let lastDay = prevMonth.clone().add(42, 'd');
            while( prevMonth.isBefore(lastDay) ){
                classes = 'el-datetime-week';
                currentdate = prevMonth.clone();

                if(prevMonth.year() === currentYear && prevMonth.month() < currentMonth || prevMonth.year() < currentYear){
                    classes += ' el-datetime-old';
                }else if(prevMonth.year() === currentYear && prevMonth.month() > currentMonth || prevMonth.year() > currentYear){
                    classes += ' el-datetime-new';
                }
                if(selected && prevMonth.isSame(selected, 'day')){
                    classes += ' el-datetime-active';
                }
                if(prevMonth.isSame(moment(), 'day')){
                    classes += ' el-datetime-week';
                }

                isDisabled = !isValid(currentdate, selected);
                isDisabled && (classes += ' el-datetime-disabled');

                dayProps = {
                    key: prevMonth.format('M_D'),
                    'data-value': prevMonth.date(),
                    className: classes
                };

                !isDisabled && (dayProps.onClick = this.updateSelectedDate.bind(this));
                days.push(renderer(dayProps, currentdate, selected));
                if(days.length === 7){
                    weeks.push(<tr key={prevMonth.format('M_D')}>{days}</tr>)
                    days = [];
                }
                prevMonth.add(1, 'd');
            }
            return weeks;
    }

    render(){
        let {updateTime, showView} = this.props;
        let date = this.props.viewDate,
            locale = date.localeData(),
            tableChildren = [
                <thead key='th'>
                    <tr key='h'>
                        <th key='p' className='el-datetime-prev'><span onClick={e=>updateTime('subtract', 1, 'months')}>‹</span></th>
                        <th key='s' className='el-datetime-switch' onClick={e=>showView('months')} colSpan='5' data-value={this.props.viewDate.month()}>{locale.months(date)+' '+date.year()}</th>
                        <th key='n' className='el-datetime-next'><span onClick={e=>updateTime('add', 1, 'months')}>›</span></th>
                    </tr>
                    <tr key='d'>{this.getDaysOfWeek(locale).map((day, index)=>{return <th key={day+index} className='dow'>{day}</th>})}</tr>
                </thead>
            ];
            tableChildren.push(<tbody key='tb'>{this.renderDays()}</tbody>)
        return (
            <div className='el-datetime-weeks'>
                <table>{tableChildren}</table>
            </div>
        )
    }
}

export default WeekView;