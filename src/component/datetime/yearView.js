import React from 'react';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';

class YearView extends React.Component {
    constructor(props) {
        super(props)
    }

    renderYears(year) {
        let i = 0;
        let rows = [];
        let years = [];
        let {renderYear, selectedDate, isValidDate, viewDate, updateOn, setDate, updateSelectedDate} = this.props;

        year--;

        for (; i < 12; i++) {
            let currentYear = viewDate.clone().set({year: year, month: 0, day: 1});
            let daysLength = currentYear.endOf('year').format('DDD');
            let daysInYear = [];
            for (let d = 1; d <= daysLength; d++) {
                daysInYear.push(d);
            }
            let isDisabled = !daysInYear.find(d => {
                return isValidDate(currentYear.clone().dayOfYear(d));
            });
            let props = {
                key: year,
                'data-value': year,
                className: classnames('el-datetime-year', {
                    'el-datetime-disabled': isDisabled,
                    'el-datetime-active': selectedDate && selectedDate.year() === year
                })
            };
            if (!isDisabled) {
                props.onClick = updateOn === 'years' ? updateSelectedDate : setDate('year');
            }

            years.push(renderYear(props, year, selectedDate && selectedDate.clone()));

            if (years.length === 4) {
                rows.push(<tr key={i}>{years}</tr>);
                years = [];
            }

            year++;
        }
        return rows;
    }

    render() {
        let type = "years";
        let {viewDate, showView, updateTime} = this.props;
        let year = parseInt(viewDate.year() / 10, 10) * 10;
        return (
            <div className="el-datetime-years">
                <table>
                    <thead>
                    <tr>
                        <th key="prev" className="el-datetime-prev">
                            <span onClick={e=>updateTime('subtract', 10, type)}>‹</span>
                        </th>
                        <th key="year" className="el-datetime-switch">
                            <span onClick={e=>showView(type)}
                                  colSpan="2">{year + "-" + (year + 9)}</span>
                        </th>
                        <th key="next" className="el-datetime-next">
                            <span onClick={e=>updateTime('add', 10, type)}>›</span>
                        </th>
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
};

export default onClickOutside(YearView);