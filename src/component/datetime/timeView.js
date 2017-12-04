import React from 'react';
import { extend } from "../util";
import Input from '../input';

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
            hours: { min: 0, max: 23, step: 1 },
            minutes: { min: 0, max: 59, step: 1 },
            seconds: { min: 0, max: 59, step: 1 },
            milliseconds: { min: 0, max: 999, step: 1 }
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
        let update = {};
        update[type] = this[action](type);
        this.setState(update);
        this.timer = setTimeout(() => {
            this.increaseTimer = setInterval(() => {
                update[type] = this[action](type);
                this.setState(update);
            }, 70);
        }, 500);

        this.mouseUpListener = () => {
            clearTimeout(this.timer);
            clearInterval(this.increaseTimer);
            this.props.setTime(type, this.state[type]);
            document.body.removeEventListener('mouseup', this.mouseUpListener);
        };
        document.body.addEventListener('mouseup', this.mouseUpListener);
    }

    handleChange(e) {
        let milli = parseInt(e.target === null ? e : e.value, 10);
        if (!isNaN(milli) && milli >= 0 && milli < 1000) {
            this.props.setTime('milliseconds', milli);
            this.setState({ milliseconds: milli });
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
        let { dateFormat, selectedDate, viewDate, showView } = this.props;
        if (!dateFormat) {
            return null;
        }
        let date = selectedDate || viewDate;
        return (
            <thead key="h">
                <tr>
                    <th className="el-datetime-switch" colSpan="4"
                        onClick={e => showView("days")}>
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
                        onMouseDown={this.onStartClicking.bind(this, "increase", type)}>
                        <i className="fa fa-caret-up fa-2x" /></span>
                    <div key="c" className="el-datetime-count">{value}</div>
                    <span key="do" className="el-datetime-btn"
                        onMouseDown={this.onStartClicking.bind(this, "decrease", type)}><i
                            className="fa fa-caret-down fa-2x" /></span>
                </div>
            )
        }
        return "";
    }

    renderDayPart() {
        let daypart = this.state.daypart;
        return (
            <div key="dayPart" className="el-datetime-counter">
                <span key="up" className="el-datetime-btn"
                    onMouseDown={this.onStartClicking.bind(this, "toggleDayPart", "hours")}>
                    <i className="fa fa-caret-up fa-2x" /></span>
                <div key={daypart} className="el-datetime-count">{daypart}</div>
                <span key="do" className="el-datetime-btn"
                    onMouseDown={this.onStartClicking.bind(this, "toggleDayPart", "hours")}><i
                        className="fa fa-caret-down fa-2x" /></span>
            </div>
        )
    }

    renderBody() {
        let output = [];
        let { counters, daypart, milliseconds } = this.state;

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
            output.push(<div className="el-datetime-counter-separator" key="sep5">:</div>);
            output.push(<div className="el-datetime-counter el-datetime-milli" key="m">
                <Input value={milliseconds} onChange={this.handleChange.bind(this)} />
            </div>)
        }
        return output;
    }

    render() {
        let { uid } = this.props;
        return (
            <div className="el-datetime-time" data-value={uid}>
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

export default TimeView;