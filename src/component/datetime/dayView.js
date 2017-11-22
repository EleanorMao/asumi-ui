import React from 'react';
import moment from 'moment';
import onClickOutside from 'react-onclickoutside';

class DayView extends React.Component {
    constructor(props) {
        super(props)
    }

    updateSelectedDate(event) {
        this.props.updateSelectedDate(event, true);
    }

    alwaysValidDate() {
        return 1;
    }

    getDaysOfWeek(locale) {
        let days = locale._weekdaysMin,
            first = locale.firstDayOfWeek(),
            dow = [],
            i = 0,
            classnames;
        days.forEach(day => {
            dow[(7 + (i++) - first) % 7] = day;
        })
        this.props.showWeeks && dow.unshift('周');
        return dow.map((day, index) => {
            classnames = day === '周' ? 'dow dow-week' : 'dow';
            return <th key={day + index} className={classnames}>{day}</th>
        });
    }

    renderFooter() {
        if (!this.props.timeFormat) {
            return '';
        }
        let date = this.props.selectedDate || this.props.viewDate;

        return (
            <tfoot key='tf'>
                <tr><td onClick={this.props.showView('time')} colSpan={this.props.showWeeks ? '8' : '7'} className='el-datetime-timetoggle'>{date.format(this.props.timeFormat)}</td></tr>
            </tfoot>
        )
    }

    renderDay(props, currentdate) {
        return <td {...props}>{currentdate.date()}</td>
    }

    renderDays() {
        let date = this.props.viewDate,
            selected = this.props.selectedDate && this.props.selectedDate.clone(),
            prevMonth = date.clone().subtract(1, 'months'),
            currentYear = date.year(),
            currentMonth = date.month(),
            weeks = [],
            renderer = this.props.renderDay || this.renderDay.bind(this),
            isValid = this.props.isValidDate || this.alwaysValidDate,
            showWeeks = this.props.showWeeks,
            isWeek = this.props.isWeek,
            classes, isDisabled, dayArr = [], dayProps, currentdate, filterArr;

        prevMonth.date(prevMonth.daysInMonth()).startOf('week');
        let lastDay = prevMonth.clone().add(42, 'd');
        while (prevMonth.isBefore(lastDay)) {
            classes = 'el-datetime-day';
            currentdate = prevMonth.clone();

            if ((prevMonth.year() === currentYear && prevMonth.month() < currentMonth) || (prevMonth.year() < currentYear)) {
                classes += ' el-datetime-old';
            } else if ((prevMonth.year() === currentYear && prevMonth.month() > currentMonth) || (prevMonth.year() > currentYear)) {
                classes += ' el-datetime-new';
            }
            if (selected && prevMonth.isSame(selected, 'day')) {
                classes += ' el-datetime-active';
            }
            if (prevMonth.isSame(moment(), 'day')) {
                classes += ' el-datetime-today';
            }

            isDisabled = !isValid(currentdate, selected);
            isDisabled && (classes += ' el-datetime-disabled');

            dayProps = {
                key: prevMonth.clone().format('M_D'),
                'data-value': prevMonth.clone().date(),
                className: classes,
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
                    return renderer(item, item['data-currentdate'], selected);
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
            tableChildren = [(
                <thead key='th'>
                    <tr key='h'>
                        <th key='p' className='el-datetime-prev'><span onClick={this.props.subtractTime(1, 'months')}>‹</span></th>
                        <th key='s' className='el-datetime-switch' onClick={this.props.showView('months')} colSpan={this.props.showWeeks ? '6' : '5'} data-value={this.props.viewDate.month()}>{locale.months(date) + ' ' + date.year()}</th>
                        <th key='n' className='el-datetime-next'><span onClick={this.props.addTime(1, 'months')}>›</span></th>
                    </tr>
                    <tr key='d'>{this.getDaysOfWeek(locale)}</tr>
                </thead>
            )];
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

export default onClickOutside(DayView);