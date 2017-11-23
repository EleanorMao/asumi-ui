import React from 'react';
import onClickOutside from 'react-onclickoutside';

class YearView extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClickOutside() {
        this.props.handleClickOutside();
    }

    alwaysValidDate() {
        return 1;
    }

    renderYear(props, year) {
        return <td {...props}>{year}</td>
    }

    updateSelectedYear(event) {
        this.props.updateSelectedDate(event);
    }

    renderYears(year) {
        let years = [],
            i = -1,
            rows = [],
            renderer = this.props.renderYear || this.renderYear,
            selectedDate = this.props.selectedDate,
            isValid = this.props.isValidDate || this.alwaysValidDate,
            classes, props, currentYear, isDisabled, noOfDaysInYear, daysInYear, validDay,
            irrelevantMonth = 0,
            irrelevantDate = 1;

        year--;
        while (i < 11) {
            classes = 'el-datetime-year';
            currentYear = this.props.viewDate.clone().set(
                { year: year, month: irrelevantMonth, date: irrelevantDate }
            );

            noOfDaysInYear = currentYear.endOf('year').format('DDD');
            daysInYear = Array.from({ length: noOfDaysInYear }, (e, i) => {
                return i + 1
            });

            validDay = daysInYear.find(d => {
                let day = currentYear.clone().dayOfYear(d);
                return isValid(day);
            });

            isDisabled = validDay === undefined;

            isDisabled && (classes += ' el-datetime-disabled');
            selectedDate && selectedDate.year() === year && classes != ' el-datetime-active';

            props = {
                key: year,
                'data-value': year,
                className: classes
            }

            if (!isDisabled) {
                props.onClick = this.props.updateOn === 'years' ?
                    this.updateSelectedYear.bind(this) : this.props.setDate('year');
            }
            years.push(renderer(props, year, selectedDate && selectedDate.clone()));
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
        let year = parseInt(this.props.viewDate.year() / 10, 10) * 10;
        return (
            <div className='el-datetime-years'>
                <table key='a'>
                    <thead>
                        <tr>
                            <th key='prev' className='el-datetime-prev'><span onClick={this.props.subtractTime(10, 'years')}>‹</span></th>
                            <th key='year' className='el-datetime-switch'><span onClick={this.props.showView('years')} colSpan='2'>{year + '-' + (year + 9)}</span></th>
                            <th key='next' className='el-datetime-next'><span onClick={this.props.addTime(10, 'years')}>›</span></th>
                        </tr>
                    </thead>
                </table>
                <table key='years'>
                    <tbody>{this.renderYears(year)}</tbody>
                </table>
            </div>
        )
    }
}

export default onClickOutside(YearView);