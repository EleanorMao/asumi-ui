import React from 'react';
import onClickOutside from 'react-onclickoutside';

class MonthView extends React.Component{
    constructor(props){
        super(props)
    }

    updateSelectedMonth(event){
        this.props.updateSelectedDate(event);
    }

    alwaysValidDate(){
        return 1;
    }

    renderMonths(){
        let date = this.props.selectedDate,
            month = this.props.viewDate.month(),
            year = this.props.viewDate.year(),
            rows = [],
            i = 0,
            months = [],
            renderer = this.props.renderMonth || this.renderMonth.bind(this),
            isValid = this.props.isValidDate || this.alwaysValidDate,
            classes, props, currentMonth, isDisabled, noOfDaysInMonth, daysInMonth, validDay,
            irrelevantDate = 1;

            while(i < 12){
                classes = 'el-datetime-month';
                currentMonth = this.props.viewDate.clone().set({year: year, month: i, date: irrelevantDate});
                noOfDaysInMonth = currentMonth.endOf('month').format('D');
                daysInMonth = Array.from({length: noOfDaysInMonth}, (e, i)=>{
                    return i + 1;
                })
                validDay = daysInMonth.find(d=>{
                    let day = currentMonth.clone().set('date', d);
                    return isValid(day);
                })

                isDisabled = validDay === undefined;

                isDisabled && (classes += ' el-datetime-disabled');
                date && i === month && year === date.year() && (classes += ' el-datetime-active');

                props = {
                    key: i,
                    'data-value': i,
                    className: classes
                };
                if(!isDisabled){
                    props.onClick = this.props.updateOn === 'months' ?
                        this.updateSelectedMonth.bind(this) : this.props.setDate('month');
                }

                months.push(renderer(props, i, year, date && date.clone()));

                if(months.length === 4){
                    rows.push(<tr key={month + '_' + rows.length}>{months}</tr>);
                    months = [];
                }
                i++;
            }
            return rows;
    }

    renderMonth(props, month){
        let localMoment = this.props.viewDate,
            monthStr = localMoment.localeData().monthsShort(localMoment.month(month)),
            strLength = 3,
            monthStrFixedLength =monthStr.substring(0, strLength);
            return <td {...props}>{this.capitalize(monthStrFixedLength)}</td>
    }

    capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render(){
        
        return <div className='el-datetime-months'>
                    <table key='a'>
                        <thead>
                            <tr>
                                <th key='prev' className='el-datetime-prev'><span onClick={this.props.subtractTime(1, 'years')}>‹</span></th>
                                <th key='year' className='el-datetime-switch' onClick={this.props.showView('years')} colSpan='2' data-value={this.props.viewDate.year()}>{this.props.viewDate.year()}</th>
                                <th key='next' className='el-datetime-next'><span onClick={this.props.addTime(1, 'years')}>›</span></th>
                            </tr>
                        </thead>
                    </table>
                        
                    <table key='months'>
                        <tbody key='b'>{this.renderMonths()}</tbody>
                    </table>
                </div>
    }
}
export default onClickOutside(MonthView);