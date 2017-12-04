import moment from 'moment';
import Panel from "./panel";
import React, { Component } from 'react';
// import { DateRange, Table, Col } from '../../../src';
import { basic, week, month, year, shortcuts, api, shortcut } from '../constants/datetime'

moment.locale('zh-CN');

export default class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: moment()
        }
    }
    render(){
        let { date } = this.state;
        return (
            <div className="content">
                <h1>DateTime 日期选择器</h1>
                <Panel
                    title="basic"
                    code={basic}
                >
                    {/*<DateRange value={date}/>*/}
                </Panel>
            </div>
        )
    }
}