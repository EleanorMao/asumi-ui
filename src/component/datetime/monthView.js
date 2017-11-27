import React from 'react';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';

class MonthView extends React.Component{
    constructor(props){
        super(props)
    }

    updateSelectedMonth(event){
        this.props.updateSelectedDate(event);
    }

    renderMonths(){
        let {isValidDate, selectedDate, viewDate, renderMonth} = this.props,
            rows = [],
            i = 0,
            months = [],
            renderer = renderMonth || this.renderMonth.bind(this),
            props, currentMonth, isDisabled, daysInMonth, validDay;

            while(i < 12){
                currentMonth = this.props.viewDate.clone().set({year: viewDate.year(), month: i, date: 1});
                daysInMonth = Array.from({length: currentMonth.endOf('month').format('D')}, (e, i)=>{
                    return i + 1;
                })
                isDisabled = !!!(daysInMonth.find(d=>{
                    let day = currentMonth.clone().set('date', d);
                    return isValidDate(day);
                }))

                props = {
                    key: i,
                    'data-value': i,
                    className: classnames('el-datetime-month', 
                        {'el-datetime-disabled': isDisabled, 
                        'el-datetime-active': selectedDate && i === selectedDate.month() && viewDate.year() === selectedDate.year()})
                };
                if(!isDisabled){
                    props.onClick = this.props.updateOn === 'months' ?
                        this.updateSelectedMonth.bind(this) : this.props.setDate('month');
                }

                months.push(renderer(props, i, viewDate.year(), selectedDate && selectedDate.clone()));

                if(months.length === 4){
                    rows.push(<tr key={viewDate.month() + '_' + rows.length}>{months}</tr>);
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
        let type = 'years';
        return <div className='el-datetime-months'>
                    <table key='a'>
                        <thead>
                            <tr>
                                <th key='prev' className='el-datetime-prev'><span onClick={this.props.subtractTime(1, type)}>‹</span></th>
                                <th key='year' className='el-datetime-switch' onClick={this.props.showView(type)} colSpan='2' data-value={this.props.viewDate.year()}>{this.props.viewDate.year()}</th>
                                <th key='next' className='el-datetime-next'><span onClick={this.props.addTime(1, type)}>›</span></th>
                            </tr>
                        </thead>
                    </table>
                        
                    <table key='months'>
                        <tbody key='b'>{this.renderMonths()}</tbody>
                    </table>
                </div>
    }
}

MonthView.defaultProps = {
    isValidDate: ()=> {
        return 1;
    }
}
export default onClickOutside(MonthView);