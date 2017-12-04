import React from 'react';
import classnames from 'classnames';

class MonthView extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClick(item, e) {
        let {updateOn, setDate, updateSelectedDate} = this.props;
        if (!item.disabled) {
            updateOn === 'months' ? updateSelectedDate(item) : setDate('month', item)
        }
    }

    renderTbody() {
        let {renderMonth, selectedDate} = this.props;
        let monthArr = this.renderMonths();
        let tds = [], trs = [], props = {};
        let renderer = renderMonth || this.renderMonth.bind(this);
        for (let i = 0; i < 12; i++) {
            let item = monthArr[i];
            if (!item) {
                tds.push(<td key={i}></td>);
            } else {
                props = {
                    key: item.value,
                    className: classnames('el-datetime-month', {
                        'el-datetime-disabled': item.disabled,
                        'el-datetime-active': item.active
                    }),
                    onClick: this.handleClick.bind(this, item)
                };
                tds.push(renderer(props, item.value, selectedDate && selectedDate.clone()))
            }
            if ((i + 1) % 4 === 0) {
                trs.push(<tr key={i}>{tds}</tr>);
                tds = [];
            }
        }
        return trs;
    }

    renderMonths() {
        let {isValidDate, selectedDate, viewDate} = this.props,
            rows = [], i = 0, currentMonth;
        while (i < 12) {
            currentMonth = viewDate.clone().set({month: i, date: 1});
            rows.push({
                value: i,
                disabled: !~(new Array(currentMonth.daysInMonth())).findIndex((d, idx) => {
                    return isValidDate(currentMonth.clone().date(idx + 1));
                }),
                active: selectedDate && i === selectedDate.month() && viewDate.year() === selectedDate.year()
            });
            i++;
        }
        return rows;
    }

    renderMonth(props, month) {
        let localMoment = this.props.viewDate,
            monthStr = localMoment.localeData().monthsShort(localMoment.month(month)),
            strLength = 3,
            monthStrFixedLength = monthStr.substring(0, strLength);
        return <td {...props}>{this.capitalize(monthStrFixedLength)}</td>
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        let {updateTime, showView, uid} = this.props;
        let type = 'years';
        return (
            <div className='el-datetime-months' data-value={uid}>
                <table key='a'>
                    <thead>
                    <tr>
                        <th key='prev' className='el-datetime-prev'><span
                            onClick={e => updateTime('subtract', 1, type)}>‹</span></th>
                        <th key='year' className='el-datetime-switch' onClick={e => showView(type)} colSpan='2'
                            data-value={this.props.viewDate.year()}>{this.props.viewDate.year()}</th>
                        <th key='next' className='el-datetime-next'><span
                            onClick={e => updateTime('add', 1, type)}>›</span>
                        </th>
                    </tr>
                    </thead>
                </table>

                <table key='months'>
                    <tbody key='b'>{this.renderTbody()}</tbody>
                </table>
            </div>)
    }
}

MonthView.defaultProps = {
    isValidDate: () => {
        return 1;
    }
};
export default MonthView;