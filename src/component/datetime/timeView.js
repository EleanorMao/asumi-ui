import React from 'react';
import {extend} from "../util";
import onClickOutside from 'react-onclickoutside';

class TimeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getState(props);
        this.padValues = {
            hours: 1,
            minutes: 2,
            seconds: 2,
            milliseconds: 3
        };
        this.timeConstraints = {
            hours: {min: 0, max: 23, step: 1},
            minutes: {min: 0, max: 59, step: 1},
            seconds: {min: 0, max: 59, step: 1},
            milliseconds: {min: 0, max: 999, step: 1}
        };
    }

    getState(props) {
        let date = props.selectedDate || props.viewDate,
            format = props.timeFormat,
            counters = [];

        if (~format.toLowerCase().indexOf('h')) {
            counters.push('hours');
            ~format.indexOf('m') && counters.push('minutes');
            ~format.indexOf('s') && counters.push('seconds');
        }

        let daypart = false;
        if (this.state && ~this.props.timeFormat.toLowerCase().indexOf(' a')) {
            if (~this.props.timeFormat.indexOf(' A')) {
                daypart = this.state.hours >= 12 ? 'PM' : 'AM';
            } else {
                daypart = this.state.hours >= 12 ? 'pm' : 'am';
            }
        }
        return {
            daypart: daypart,
            counters: counters,
            hours: date.format('H'),
            minutes: date.format('mm'),
            seconds: date.format('ss'),
            milliseconds: date.format('SSS'),
        }
    }

    componentWillMount() {
        Object.keys(this.timeConstraints).forEach(type => {
            extend(this.timeConstraints[type], this.props.timeConstraints[type]);
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.getState(nextProps));
    }

    onStartClicking(action, type) {
        let me = this;
        return () => {
            let update = {};
            update[type] = me[action](type);
            me.setState(update);
            me.timer = setTimeout(() => {
                me.increaseTimer = setInterval(() => {
                    update[type] = me[action](type);
                    me.setState(update);
                }, 70);
            }, 500);

            me.mouseUpListener = () => {
                clearTimeout(me.timer);
                clearInterval(me.increaseTimer);
                me.props.setTime(type, me.state[type]);
                document.body.removeEventListener('mouseup', me.mouseUpListener);
            };
            document.body.addEventListener('mouseup', me.mouseUpListener);
        }
    }

    handleChange(e) {
        let milli = parseInt(e.target.value, 10);
        if (milli === e.target.value && milli >= 0 && milli < 1000) {
            this.props.setTime('milliseconds', milli);
            this.setState({milliseconds: milli});
        }
    }

    toggleDayPart(type) {
        let timeConstraints = this.timeConstraints[type];
        let value = parseInt(this.state[type], 10) + 12;
        if (value > timeConstraints.max) {
            value = timeConstraints.min + (value - (timeConstraints.max + 1));
        }
        return this.pad(type, value);
    }

    increase(type) {
        let timeConstraints = this.timeConstraints[type];
        let value = parseInt(this.state[type], 10) + timeConstraints.step;
        if (value > timeConstraints.max) {
            value = timeConstraints.min + (value - (timeConstraints.max + 1));
        }
        return this.pad(type, value);
    }

    decrease(type) {
        let timeConstraints = this.timeConstraints[type];
        let value = parseInt(this.state[type], 10) - timeConstraints.step;
        if (value < timeConstraints.min) {
            value = timeConstraints.max + 1 - (timeConstraints.min - value);
        }
        return this.pad(type, value);
    }

    pad(type, value) {
        let str = value + '';
        while (str.length < this.padValues[type]) {
            str = '0' + str;
        }
        return str;
    }

    renderHeader() {
        let {dateFormat, selectedDate, viewDate, showView} = this.props;
        if (!dateFormat) {
            return null;
        }
        let date = selectedDate || viewDate;
        return (
            <thead key="h">
            <tr>
                <th className="el-datetime-switch" colSpan="4"
                    onClick={showView("days")}>
                    {date.format(dateFormat)}
                </th>
            </tr>
            </thead>
        )
    }

    renderCounter(type) {
        if (type !== 'daypart') {
            let value = this.state[type];
            if (type === 'hours' && ~this.props.timeFormat.toLowerCase().indexOf(' a')) {
                value = (value - 1) % 12 + 1;
                value = value === 0 ? 12 : value;
            }
            return (
                <div key={type} className="el-datetime-counter">
                    <span key="up" className="el-datetime-btn"
                          onMouseDown={this.onStartClicking("increase", type)}>▲</span>
                    <div key="c" className="el-datetime-count">{value}</div>
                    <span key="do" className="el-datetime-btn"
                          onMouseDown={this.onStartClicking("decrease", type)}>▼</span>
                </div>
            )
        }
        return "";
    }

    renderDayPart() {
        let daypart = this.state.daypart;
        return (
            <div key="dayPart" className="el-datetimeCounter">
                <span key="up" className="el-datetimeBtn"
                      onMouseDown={this.onStartClicking("toggleDayPart", "hours")}>▲</span>
                <div key={daypart} className="el-datetimeCount">{daypart}</div>
                <span key="do" className="el-datetimeBtn"
                      onMouseDown={this.onStartClicking("toggleDayPart", "hours")}>▼</span>
            </div>
        )
    }

    renderBody() {
        let output = [];
        let {counters, daypart, milliseconds} = this.state;

        counters.forEach(c => {
            if (output.length) {
                output.push(<div key={"sep" + output.length} className="el-datetime-counter-separator">:</div>);
            }
            output.push(this.renderCounter(c));
        });

        if (daypart !== false) {
            output.push(this.renderDayPart());
        }

        if (counters.length === 3 && ~this.props.timeFormat.indexOf("S")) {
            output.push(<div className="el-datetimeCounterSeparator" key="sep5">:</div>);
            output.push(<div className="el-datetimeCounter el-datetimeMilli" key="m">
                <input type="text" value={milliseconds} onChange={this.handleChange.bind(this)}/>
            </div>)
        }
        return output;
    }

    render() {
        return (
            <div className="el-datetimeTime">
                <table>
                    {this.renderHeader()}
                    <tbody key="b">
                    <tr>
                        <td>
                            <div className="el-datetime-counters">{this.renderBody()}</div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default onClickOutside(TimeView);