import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';

class DayView extends React.Component {
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
        let {showWeeks, renderWeeksTitle} = this.props;
        showWeeks && dow.unshift(renderWeeksTitle());
        return dow.map((day, index) => {
            return <th key={day + index}
                       className={classnames(showWeeks && index === 0 ? 'dow dow-week' : 'dow')}>{day}</th>
        });
    }

    renderFooter() {
        let {timeFormat, selectedDate, viewDate, showWeeks, showView} = this.props;
        if (!timeFormat) {
            return '';
        }
        let date = selectedDate || viewDate;
        return (
            <tfoot key="tf">
            <tr>
                <td onClick={showView("time")} colSpan={showWeeks ? "8" : "7"}
                    className="el-datetime-timetoggle">{date.format(timeFormat)}</td>
            </tr>
            </tfoot>
        )
    }

    renderDays() {
        let {renderDay, isValidDate, viewDate, selectedDate, showWeeks, updateSelectedDate, isWeek} = this.props;
        let prevMonth = viewDate.clone().subtract(1, 'months');
        let selected = selectedDate && selectedDate.clone();
        let currentMonth = viewDate.month();
        let currentYear = viewDate.year();
        let weeks = [], dayArr = [], filterArr;

        prevMonth.date(prevMonth.daysInMonth()).startOf('week');
        let lastDay = prevMonth.clone().add(42, 'd');

        while (prevMonth.isBefore(lastDay)) {
            let currentdate = prevMonth.clone();
            let isDisabled = !isValidDate(currentdate, selected);
            let dayProps = {
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
            !isDisabled && (dayProps.onClick = (e) => {
                updateSelectedDate(e, true);
            });

            dayArr.push(dayProps);

            if (dayArr.length === 7) {
                if (isWeek) {
                    filterArr = dayArr.filter(item => {
                        return ~item.className.indexOf('el-datetime-active')
                    });

                    if (filterArr.length) {
                        dayArr.map(item => {
                            if (!~item.className.indexOf('el-datetime-active')) {
                                item.className += ' el-datetime-active';
                            }
                        })
                    }
                }

                dayArr = dayArr.map(item => {
                    return renderDay(item, item['data-currentdate'], selected);
                });

                showWeeks && dayArr.unshift(<td key={currentdate.valueOf()}
                                                className='el-datetime-week'>{currentdate.isoWeek()}</td>);

                weeks.push(<tr key={prevMonth.format('M_D')}>{dayArr}</tr>);
                dayArr = [];
            }
            prevMonth.add(1, 'd');
        }
        return weeks;
    }

    render() {
        let {viewDate, subtractTime, showWeeks, showView, addTime} = this.props;
        let locale = viewDate.localeData();
        let nextViewType = "months";
        return (
            <div className="el-datetime-days">
                <table>
                    <thead key="th">
                    <tr key="h">
                        <th key="p" className="el-datetime-prev">
                            <span onClick={subtractTime(1, nextViewType)}>‹</span>
                        </th>
                        <th key="s" className="el-datetime-switch"
                            colSpan={showWeeks ? "6" : "5"}
                            onClick={showView(nextViewType)}
                            data-value={viewDate.month()}>
                            {locale.months(viewDate) + " " + viewDate.year()}
                        </th>
                        <th key="n" className="el-datetime-next">
                            <span onClick={addTime(1, nextViewType)}>›</span>
                        </th>
                    </tr>
                    <tr key="d">{this.getDaysOfWeek(locale)}</tr>
                    </thead>
                    <tbody key="tb">{this.renderDays()}</tbody>
                    {this.renderFooter()}
                </table>
            </div>
        )
    }
}

DayView.defaultProps = {
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

export default onClickOutside(DayView);