import React from 'react';
import assign from 'object-assign';
import onClickOutside from 'react-onclickoutside';

class TimeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.calculateState(this.props);
        this.padValues = {
            hours: 1,
            minutes: 2,
            seconds: 2,
            milliseconds: 3
        }
    }

    componentWillMount() {
        let me = this;
        me.timeConstraints = {
            hours: { min: 0, max: 23, step: 1 },
            minutes: { min: 0, max: 59, step: 1 },
            seconds: { min: 0, max: 59, step: 1 },
            milliseconds: { min: 0, max: 999, step: 1 }
        };
        Object.keys(me.timeConstraints).forEach(type => {
            assign(me.timeConstraints[type], me.props.timeConstraints[type]);
        })
        this.setState(this.calculateState(this.props));
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.calculateState(nextProps));
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
            }
            document.body.addEventListener('mouseup', me.mouseUpListener);
        }
    }

    calculateState(props) {
        let date = props.selectedDate || props.viewDate,
            format = props.timeFormat,
            counters = [];

        if (format.toLowerCase().indexOf('h') !== -1) {
            counters.push('hours');
            (format.indexOf('m') !== -1) && counters.push('minutes');
            (format.indexOf('s') !== -1) && counters.push('seconds');
        }

        let daypart = false;
        if (this.state !== null && this.props.timeFormat.toLowerCase().indexOf(' a') !== -1) {
            if (this.props.timeFormat.indexOf(' A') !== -1) {
                daypart = (this.state.hours >= 12) ? 'PM' : 'AM';
            } else {
                daypart = (this.state.hours >= 12) ? 'pm' : 'am';
            }
        }
        return {
            hours: date.format('H'),
            minutes: date.format('mm'),
            seconds: date.format('ss'),
            milliseconds: date.format('SSS'),
            daypart: daypart,
            counters: counters
        }
    }

    updateMilli(e) {
        let milli = parseInt(e.target.value, 10);
        if (milli === e.target.value && milli >= 0 && milli < 1000) {
            this.props.setTime('milliseconds', milli);
            this.setState({ milliseconds: milli });
        }
    }

    toggleDayPart(type) {
        let value = parseInt(this.state[type], 10) + 12;
        if (value > this.timeConstraints[type].max) {
            value = this.timeConstraints[type].min + (value - (this.timeConstraints[type].max + 1));
        }
        return this.pad(type, value);
    }

    increase(type) {
        let value = parseInt(this.state[type], 10) + this.timeConstraints[type].step;
        if (value > this.timeConstraints[type].max) {
            value = this.timeConstraints[type].min + (value - (this.timeConstraints[type].max + 1));
        }
        return this.pad(type, value);
    }

    decrease(type) {
        let value = parseInt(this.state[type], 10) - this.timeConstraints[type].step;
        if (value < this.timeConstraints[type].min) {
            value = this.timeConstraints[type].max + 1 - (this.timeConstraints[type].min - value);
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
        if (!this.props.dateFormat) {
            return null;
        }
        let date = this.props.selectedDate || this.props.viewDate;
        return (
            <thead key='h'>
                <tr>
                    <th className='el-datetime-switch' colSpan='4' onClick={this.props.showView('days')}>{date.format(this.props.dateFormat)}</th>
                </tr>
            </thead>
        )
    }

    renderCounter(type) {
        if (type !== 'daypart') {
            let value = this.state[type];
            if (type === 'hours' && this.props.timeFormat.toLowerCase().indexOf(' a') !== -1) {
                value = (value - 1) % 12 + 1;
                value = value === 0 ? 12 : value;
            }
            return (
                <div key={type} className='el-datetime-counter'>
                    <span key='up' className='el-datetime-btn' onMouseDown={this.onStartClicking('increase', type)}>▲</span>
                    <div key='c' className='el-datetime-count'>{value}</div>
                    <span key='do' className='el-datetime-btn' onMouseDown={this.onStartClicking('decrease', type)}>▼</span>
                </div>
            )
        }
        return '';
    }

    renderDayPart() {
        return (
            <div key='dayPart' className='el-datetimeCounter'>
                <span key='up' className='el-datetimeBtn' onMouseDown={this.onStartClicking('toggleDayPart', 'hours')}>▲</span>
                <div key={this.state.daypart} className='el-datetimeCount'>{this.state.daypart}</div>
                <span key='do' className='el-datetimeBtn' onMouseDown={this.onStartClicking('toggleDayPart', 'hours')}>▼</span>
            </div>
        )
    }

    render() {
        let me = this,
            counters = [];
        this.state.counters.forEach(c => {
            if (counters.length) {
                counters.push(<div key={'sep' + counters.length} className='el-datetime-counter-separator'>:</div>);
            }
            counters.push(me.renderCounter(c));
        })

        if (this.state.daypart !== false) {
            counters.push(me.renderDayPart());
        }

        if (this.state.counters.length === 3 && this.props.timeFormat.indexOf('S') !== -1) {
            counters.push(<div className='el-datetimeCounterSeparator' key='sep5'>:</div>);
            counters.push(<div className='el-datetimeCounter el-datetimeMilli' key='m'>
                <input type='text' value={this.state.milliseconds} onChange={this.updateMilli.bind(this)} />
            </div>)
        }
        return (
            <div className='el-datetimeTime'>
                <table>
                    {this.renderHeader()}
                    <tbody key='b'>
                        <tr>
                            <td><div className='el-datetime-counters'>{counters}</div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default onClickOutside(TimeView);