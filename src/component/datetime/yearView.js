import React from 'react';
import classnames from 'classnames';

class YearView extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClick(item, e) {
        let {updateOn, setDate, updateSelectedDate} = this.props;
        if (!item.disabled) {
            updateOn === 'years' ? updateSelectedDate(item) : setDate('year', item);
        }
    }

    renderTbody(year) {
        let {renderYear, selectedDate} = this.props;
        let yearArr = this.renderYears(year);
        let tds = [], trs = [], props = {};
        for (let i = 0; i < 12; i++) {
            let item = yearArr[i];
            if (!item) {
                tds.push(<td key={i}></td>);
            } else {
                props = {
                    key: item.value,
                    className: classnames('el-datetime-year', {
                        'el-datetime-disabled': item.disabled,
                        'el-datetime-active': item.active
                    }),
                    onClick: this.handleClick.bind(this, item)
                };
                tds.push(renderYear(props, item.value, selectedDate && selectedDate.clone()))
            }
            if ((i + 1) % 4 === 0) {
                trs.push(<tr key={i}>{tds}</tr>);
                tds = [];
            }
        }
        return trs;
    }

    renderYears(year) {
        let {selectedDate, isValidDate, viewDate} = this.props;
        let rows = [], endYear = year + 10;
        while (year < endYear) {
            let row = {};
            let currentYear = viewDate.clone().set({year: year}).startOf('year');
            row = {
                value: year,
                disabled: !~(new Array(currentYear.endOf('year').dayOfYear())).findIndex((d, idx) => {
                    return isValidDate(currentYear.clone().dayOfYear(idx + 1));
                }),
                active: selectedDate && selectedDate.year() === year
            };
            rows.push(row);
            year++;
        }
        return rows;
    }

    render() {
        let type = "years";
        let {viewDate, showView, updateTime, uid} = this.props;
        let year = parseInt(viewDate.year() / 10, 10) * 10;
        return (
            <div className="el-datetime-years" data-value={uid}>
                <table>
                    <thead>
                    <tr>
                        <th key="prev" className="el-datetime-prev">
                            <span onClick={e => updateTime('subtract', 10, type)}>‹</span>
                        </th>
                        <th key="year" className="el-datetime-switch">
                            <span onClick={e => showView(type)}
                                  colSpan="2">{year + "-" + (year + 9)}</span>
                        </th>
                        <th key="next" className="el-datetime-next">
                            <span onClick={e => updateTime('add', 10, type)}>›</span>
                        </th>
                    </tr>
                    </thead>
                </table>
                <table key={type}>
                    <tbody>
                    {
                        this.renderTbody(year)
                    }
                    </tbody>
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

export default YearView;