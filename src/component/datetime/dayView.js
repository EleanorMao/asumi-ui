import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';

class DayView extends React.Component {
    constructor(props) {
        super(props)
    }

    updateSelectedDate(event) {
        this.props.updateSelectedDate(event, true);
    }

    

    getDaysOfWeek(locale) {
        let days = locale._weekdaysMin,
            first = locale.firstDayOfWeek(),
            dow = [],
            i = 0;
        days.forEach(day => {
            dow[(7 + i++ - first) % 7] = day;
        })
        this.props.showWeeks && dow.unshift('周');
        return dow.map((day, index) => {
            return <th key={day + index} className={classnames(day === '周' ? 'dow dow-week' : 'dow')}>{day}</th>
        });
    }

    renderFooter() {
        let {timeFormat, selectedDate, viewDate, showWeeks, showView} = this.props;
        if (!timeFormat) {
            return '';
        }
        let date = selectedDate || viewDate;

        return (
            <tfoot key='tf'>
                <tr><td onClick={showView('time')} colSpan={showWeeks ? '8' : '7'} className='el-datetime-timetoggle'>{date.format(timeFormat)}</td></tr>
            </tfoot>
        )
    }

    renderDays() {
        let {renderDay, isValidDate, viewDate, selectedDate, showWeeks, isWeek} = this.props,
            selected = selectedDate && selectedDate.clone(),
            prevMonth = viewDate.clone().subtract(1, 'months'),
            currentYear = viewDate.year(),
            currentMonth = viewDate.month(),
            weeks = [],
            classes, isDisabled, dayArr = [], dayProps, currentdate, filterArr;

        prevMonth.date(prevMonth.daysInMonth()).startOf('week');
        let lastDay = prevMonth.clone().add(42, 'd');
        while (prevMonth.isBefore(lastDay)) {
            currentdate = prevMonth.clone();

            isDisabled = !isValidDate(currentdate, selected);

            dayProps = {
                key: prevMonth.clone().format('M_D'),
                'data-value': prevMonth.clone().date(),
                className: classnames('el-datetime-day', {
                                'el-datetime-old': prevMonth.year() === currentYear && prevMonth.month() < currentMonth || prevMonth.year() < currentYear,
                                'el-datetime-new': prevMonth.year() === currentYear && prevMonth.month() > currentMonth || prevMonth.year() > currentYear,
                                'el-datetime-active': selected && prevMonth.isSame(selected, 'day'),
                                'el-datetime-today': prevMonth.isSame(moment(), 'day'),
                                'el-datetime-disabled': isDisabled
                            }),
                'data-currentdate': currentdate.clone()
            };

            !isDisabled && (dayProps.onClick = this.updateSelectedDate.bind(this));

            dayArr.push(dayProps);
            if (dayArr.length === 7) {
                if (isWeek) {
                    filterArr = dayArr.filter(item => {
                        return item.className.indexOf('el-datetime-active') !== -1
                    });
                    if (filterArr.length) {
                        dayArr.map(item => {
                            if (item.className.indexOf('el-datetime-active') === -1) {
                                item.className += ' el-datetime-active';
                            }
                        })
                    }
                }

                dayArr = dayArr.map(item => {
                    return renderDay(item, item['data-currentdate'], selected);
                })
                showWeeks && dayArr.unshift(<td key={currentdate.valueOf()} className='el-datetime-week'>{currentdate.isoWeek()}</td>);
                weeks.push(<tr key={prevMonth.format('M_D')}>{dayArr}</tr>)
                dayArr = [];
            }
            prevMonth.add(1, 'd');
        }
        return weeks;
    }

    render() {
        let footer = this.renderFooter(),
            date = this.props.viewDate,
            locale = date.localeData(),
            tableChildren = [
                <thead key='th'>
                    <tr key='h'>
                        <th key='p' className='el-datetime-prev'><span onClick={this.props.subtractTime(1, 'months')}>‹</span></th>
                        <th key='s' className='el-datetime-switch' onClick={this.props.showView('months')} colSpan={this.props.showWeeks ? '6' : '5'} data-value={this.props.viewDate.month()}>{locale.months(date) + ' ' + date.year()}</th>
                        <th key='n' className='el-datetime-next'><span onClick={this.props.addTime(1, 'months')}>›</span></th>
                    </tr>
                    <tr key='d'>{this.getDaysOfWeek(locale)}</tr>
                </thead>
            ];
        tableChildren.push(<tbody key='tb'>{this.renderDays()}</tbody>)
        if (footer) {
            tableChildren.push(footer);
        }
        return (
            <div className='el-datetime-days'>
                <table>{tableChildren}</table>
            </div>
        )
    }
}

DayView.defaultProps = {
    renderDay: (props, currentdate)=>{
        return <td {...props}>{currentdate.date()}</td>
    },
    isValidDate: ()=>{
        return 1;
    }
}

export default onClickOutside(DayView);