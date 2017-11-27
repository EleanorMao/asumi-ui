import React from 'react';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';

class YearView extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClickOutside() {
        this.props.handleClickOutside();
    }

    renderYears(year) {
        let { renderYear, selectedDate, isValidDate, viewDate, updateOn, setDate, updateSelectedDate } = this.props,
            years = [],
            i = -1,
            rows = [],
            props, currentYear, isDisabled, daysInYear;

        year--;
        while (i < 11) {
            currentYear = viewDate.clone().set({ year: year, month: 0, day: 1 });

            daysInYear = Array.from({ length: currentYear.endOf('year').format('DDD') }, (e, i) => {
                return i + 1
            });

            isDisabled = !!!(daysInYear.find(d => {
                let day = currentYear.clone().dayOfYear(d);
                return isValidDate(day);
            }));

            props = {
                key: year,
                'data-value': year,
                className: classnames('el-datetime-year',
                    { 'el-datetime-disabled': isDisabled, 'el-datetime-active': selectedDate && selectedDate.year() === year }
                )
            }

            if (!isDisabled) {
                props.onClick = updateOn === 'years' ?
                    updateSelectedDate : setDate('year');
            }
            years.push(renderYear(props, year, selectedDate && selectedDate.clone()));
            if (years.length === 4) {
                rows.push(<tr key={i}>{years}</tr>);
                years = [];
            }
            year++;
            i++;
        }
        return rows;
    }

    render() {
        let year = parseInt(this.props.viewDate.year() / 10, 10) * 10,
            type = 'years';
        return (
            <div className='el-datetime-years'>
                <table>
                    <thead>
                        <tr>
                            <th key='prev' className='el-datetime-prev'><span onClick={this.props.subtractTime(10, type)}>‹</span></th>
                            <th key='year' className='el-datetime-switch'><span onClick={this.props.showView(type)} colSpan='2'>{year + '-' + (year + 9)}</span></th>
                            <th key='next' className='el-datetime-next'><span onClick={this.props.addTime(10, type)}>›</span></th>
                        </tr>
                    </thead>
                </table>
                <table key={type}>
                    <tbody>{this.renderYears(year)}</tbody>
                </table>
            </div>
        )
    }
}

YearView.defaultProps = {
    isValidDate: () => {
        return 1;
    },
    renderYear: (props, year) => {
        return <td {...props}>{year}</td>
    }
}

export default onClickOutside(YearView);