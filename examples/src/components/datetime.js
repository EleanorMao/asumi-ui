import moment from 'moment';
import Panel from "./panel";
import React, {Component} from 'react';
import {DateTime, Table, Col} from '../../../src';
import {basic, week, year, api} from '../constants/datetime'

moment.locale('zh-CN');

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment()
        }
    }

    handleValidDate(currentDate, selectedDate) {
        return moment(currentDate).isBefore(moment());
    }

    handleChange({name, value}) {
        this.setState({[name]: value})
    }

    render() {
        let {date} = this.state;
        return (
            <div className="content">
                <h1>DateTime 日期选择器</h1>
                <Panel
                    title="basic"
                    code={basic}
                >
                    <DateTime
                        onChange={this.handleChange.bind(this)} className={['aaa', 'bbb']}
                        value={date} name="date"
                        viewMode='days' isValidDate={this.handleValidDate.bind(this)}/>
                </Panel>


                <Panel
                    title="month"
                    code={week}
                >
                    <DateTime
                        onChange={this.handleChange.bind(this)}
                        dateFormat='YYYY年MM月'
                        value={date} name="date"
                        viewMode='months' isValidDate={this.handleValidDate.bind(this)}/>
                </Panel>


                <Panel
                    title="years"
                    code={year}
                >
                    <DateTime
                        onChange={this.handleChange.bind(this)}
                        dateFormat='YYYY年'
                        value={date} name="date"
                        viewMode='years'/>
                </Panel>

                <h1>API of DateTime</h1>
                <Table isKey="property" data={api} lineWrap="break">
                    <Col dataField="property">Property</Col>
                    <Col dataField="description">Description</Col>
                    <Col dataField="type">Type</Col>
                    <Col dataField="default">Default</Col>
                </Table>
            </div>
        )
    }
}