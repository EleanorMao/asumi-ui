import moment from 'moment';
import Panel from "./panel";
import React, {Component} from 'react';
import {DateTime, Table, Col} from '../../../src';
import {basic, week, month, year, shortcuts, api, shortcut} from '../constants/datetime'

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
                    <DateTime showWeeks={true} dateFormat='L' timeFormat={true}
                              onChange={this.handleChange.bind(this)}
                              value={date} name="date" isValidDate={this.handleValidDate.bind(this)}/>
                </Panel>

                <Panel
                    title="week"
                    code={week}
                >
                    <DateTime showWeeks={true} timeFormat={true}
                              onChange={this.handleChange.bind(this)}
                              dateFormat='YYYY年w周'
                              viewMode='weeks'
                              value={date} name="date" isValidDate={this.handleValidDate.bind(this)}/>
                </Panel>

                <Panel
                    title="month"
                    code={month}
                >
                    <DateTime
                        onChange={this.handleChange.bind(this)}
                        dateFormat='YYYY年MM月'
                        value={date} name="date"
                        viewMode='months' isValidDate={this.handleValidDate.bind(this)}/>
                </Panel>


                <Panel
                    title="year"
                    code={year}
                >
                    <DateTime
                        onChange={this.handleChange.bind(this)}
                        dateFormat='YYYY年'
                        value={date} name="date"
                        viewMode='years' isValidDate={this.handleValidDate.bind(this)}/>
                </Panel>

                <Panel
                    title="shortcuts"
                    code={shortcut}
                >
                    <DateTime showWeeks={true} dateFormat='L' timeFormat={true}
                              onChange={this.handleChange.bind(this)}
                              shortcuts={[{
                                  text: '昨日',
                                  onClick: () => {
                                      this.setState({date: moment().add(-1, 'd')})
                                  }
                              }, {
                                  text: '上周',
                                  onClick: () => {
                                      this.setState({date: moment().add(-1, 'w')})
                                  }
                              }]}
                              value={date} name="date" isValidDate={this.handleValidDate.bind(this)}/>
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