import React from 'react';
import moment from 'moment';
import classnames from 'classnames';

class WeekView extends React.Component {
    constructor(props) {
        super(props)
    }

    getDaysOfWeek(locale) {
        let first = locale.firstDayOfWeek(),
            days = locale._weekdaysMin,
            dow = [],
            i = 0;
        days.forEach(day => {
            dow[(7 + i++ - first) % 7] = day;
        });
        let { showWeeks, renderWeeksTitle } = this.props;
        showWeeks && dow.unshift(renderWeeksTitle());
        return dow.map((day, index) => {
            return <th key={day + index}
                className={classnames(showWeeks && index === 0 ? 'dow dow-week' : 'dow')}>{day}</th>
        });
    }

    handleClick(item, e) {
        let { updateSelectedDate } = this.props;
        if (!item.disabled) {
            updateSelectedDate(item);
        }
    }

    renderFooter() {
        let { timeFormat, selectedDate, viewDate, showWeeks, showView } = this.props;
        if (!timeFormat) {
            return null;
        }
        let date = selectedDate || viewDate;
        return (
            <tfoot key="tf">
                <tr>
                    <td onClick={e => showView("time")} colSpan={showWeeks ? "8" : "7"}
                        className="el-datetime-timetoggle">{date.format(timeFormat)}</td>
                </tr>
            </tfoot>
        )
    }

    renderTbody() {
        let { renderDay, selectedDate, showWeeks} = this.props;
        let dayArr = this.renderDays();
        let tds = [], trs = [], props = {};
        for (let i = 0; i < 42; i++) {
            let item = dayArr[i];
            props = {
                key: item.value.format('M_D'),
                className: classnames('el-datetime-week', {
                    'el-datetime-old': item.old,
                    'el-datetime-new': item.new,
                    'el-datetime-active': item.active,
                    'el-datetime-disabled': item.disabled,
                    'el-datetime-today': item.today,
                }),
                onClick: this.handleClick.bind(this, item)
            }
            tds.push(renderDay(props, item.value, selectedDate && selectedDate.clone()))
            if ((i + 1) % 7 === 0) {
                showWeeks && tds.unshift(<td key={item.value.valueOf()}
                                                         className='el-datetime-week-number'>{item.value.isoWeek()}</td>);
                trs.push(<tr key={i}>{tds}</tr>);
                tds = [];
            }
        }
        return trs;
    }

    renderDays() {
        let { renderDay, isValidDate, viewDate, selectedDate, showWeeks, updateSelectedDate, isWeek } = this.props;
        let prevMonth = viewDate.clone().subtract(1, 'months');
        let selected = selectedDate && selectedDate.clone();
        let currentMonth = viewDate.month();
        let currentYear = viewDate.year();
        let weeks = [], dayArr = [], filterArr;

        prevMonth.date(prevMonth.daysInMonth()).startOf('week');
        let lastDay = prevMonth.clone().add(42, 'd');

        while (prevMonth.isBefore(lastDay)) {
            let currentdate = prevMonth.clone();
            dayArr.push({
                value: currentdate,
                disabled: !isValidDate(currentdate, selected),
                old: prevMonth.year() === currentYear && prevMonth.month() < currentMonth || prevMonth.year() < currentYear,
                new: prevMonth.year() === currentYear && prevMonth.month() > currentMonth || prevMonth.year() > currentYear,
                active: selected && prevMonth.isSame(selected, 'week'),
                today: prevMonth.isSame(moment(), 'day'),
            })
            prevMonth.add(1, 'd');
        }
        return dayArr;
    }

    render() {
        let { viewDate, showWeeks, showView, updateTime, updateOn } = this.props;
        let locale = viewDate.localeData();
        let nextViewType = "months";
        return (
            <div className="el-datetime-weeks el-datetime-weeks-panel" data-value={updateOn}>
                <table>
                    <thead key="th">
                        <tr key="h">
                            <th key="p" className="el-datetime-prev">
                                <span onClick={e => updateTime('subtract', 1, nextViewType)}>‹</span>
                            </th>
                            <th key="s" className="el-datetime-switch"
                                colSpan={showWeeks ? "6" : "5"}
                                onClick={e => showView(nextViewType)}
                                data-value={viewDate.month()}>
                                {locale.months(viewDate) + " " + viewDate.year()}
                            </th>
                            <th key="n" className="el-datetime-next">
                                <span onClick={e => updateTime('add', 1, nextViewType)}>›</span>
                            </th>
                        </tr>
                        <tr key="d">{this.getDaysOfWeek(locale)}</tr>
                    </thead>
                    <tbody key="tb">{this.renderTbody()}</tbody>
                    {this.renderFooter()}
                </table>
            </div>
        )
    }
}

WeekView.defaultProps = {
    renderDay: (props, currentDate) => {
        return <td {...props}>{currentDate.date()}</td>
    },
    renderWeeksTitle: () => {
        return '周'
    },
    isValidDate: () => {
        return 1;
    },
};

export default WeekView;