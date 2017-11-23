import React, { Component } from 'react';
import moment from 'moment';
import Panel from "./panel";
import { basic, week, year, api } from '../constants/datetime'
import { DateTime, Table, Col } from '../../../src';
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

    handleChange(name, moment) {
        this.setState({ [name]: moment })
    }

    render() {
        let { date } = this.state;
        return (
            <div className="content">
                <h1>DateTime 日期选择器</h1>
                <Panel
                    title="basic"
                    code={basic}
                >
                    <DateTime
                        onChange={this.handleChange.bind(this, 'date')} className={['aaa', 'bbb']}
                        value={date}
                        viewMode='days' isValidDate={this.handleValidDate.bind(this)} />
                </Panel>


                <Panel
                    title="month"
                    code={week}
                >
                    <DateTime
                        onChange={this.handleChange.bind(this, 'date')}
                        dateFormat='YYYY年MM月'
                        value={date}
                        viewMode='months' isValidDate={this.handleValidDate.bind(this)} />
                </Panel>


                <Panel
                    title="years"
                    code={year}
                >
                    <DateTime
                        onChange={this.handleChange.bind(this, 'date')}
                        dateFormat='YYYY年'
                        value={date}
                        viewMode='years' />
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