import React from 'react';
import DaysView from './dayView';
import MonthsView from './monthView';
import YearsView from './yearView';
import TimeView from './timeView';
import WeekView from './weekView';


export default class CalendarContainer extends React.Component{
    constructor(props){
        super(props);

        this.viewComponents = {
            days: DaysView,
            months: MonthsView,
            years: YearsView,
            time: TimeView,
            weeks: WeekView
        }

    }

    

    render(){
        let {view, viewProps} = this.props;
        viewProps.uid = viewProps.updateOn + viewProps.uid;
        return React.createElement(this.viewComponents[view], viewProps);
    }
}