import React from 'react';
import moment from 'moment';
import Input from '../input';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Shortcuts from './shortcuts';
import CalendarContainer from './calendarContainer';
import {addEvent, removeEvent, noop, KeyCode} from '../util';

const allowedSetTime = ['hours', 'minutes', 'seconds', 'milliseconds'];
export default class DateTime extends React.Component {
    constructor(props) {
        super(props);
        this.componentProps = {
            fromState: ['viewDate', 'selectedDate', 'updateOn'],
            fromThis: ['setDate', 'setTime', 'updateTime', 'showView', 'updateSelectedDate', 'localMoment', 'uid'],
            fromProps: ['value', 'isValidDate', 'renderDay', 'renderMonth', 'renderYear', 'timeConstraints', 'showWeeks', 'isWeek', 'shortcuts']
        };
        let state = this.getStateFromProps(props);
        state.currentView = props.dateFormat ? props.viewMode || state.updateOn || 'days' : 'time';
        this.uid = new Date().getTime() + Math.random();
        this.state = state;

    }

    getStateFromProps(props) {
        let formats = this.getFormats(props),
            date = props.value || props.defaultValue,
            selectedDate, viewDate, updateOn, inputValue;

        if (date) {
            selectedDate = this.localMoment(date, date === 'string' ? formats.datetime : undefined);
        }

        if (selectedDate && !selectedDate.isValid()) {
            selectedDate = null;
        }
        viewDate = selectedDate ?
            selectedDate.clone().startOf('month') : this.localMoment().startOf('month');
        updateOn = this.getUpdateOn(formats);

        if (selectedDate) {
            inputValue = selectedDate.format(formats.datetime);
        } else if (date.isValid && !date.isValid()) {
            inputValue = '';
        } else {
            inputValue = date || '';
        }
        return {
            open: props.open,
            updateOn: updateOn,
            viewDate: viewDate,
            inputValue: inputValue,
            selectedDate: selectedDate,
            inputFormat: formats.datetime,
        };
    }

    componentDidMount() {
        addEvent(window, 'click', this.clickToClose.bind(this));
    }

    componentWillUnmount() {
        removeEvent(window, 'click', this.clickToClose.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        let formats = this.getFormats(nextProps),
            updatedState = {}, tag = '';
        if (nextProps.value !== this.props.value || formats.datetime !== this.getFormats(this.props).datetime) {
            updatedState = this.getStateFromProps(nextProps);
        }
        if (updatedState.open === undefined) {
            if (this.props.closeOnSelect && this.state.currentView !== 'time') {
                updatedState.open = false;
            } else {
                updatedState.open = this.state.open;
            }
        }
        if (nextProps.viewMode !== this.props.viewMode) {
            updatedState.currentView = nextProps.viewMode;
        }

        if (nextProps.locale !== this.props.locale) {
            if (this.state.viewDate) {
                updatedState.viewDate = this.state.viewDate.clone().locale(nextProps.locale);
            }
            if (this.state.selectedDate) {
                updatedState.selectedDate = this.state.selectedDate.clone().locale(nextProps.locale);
                updatedState.inputValue = updatedState.selectedDate.format(formats.datetime);
            }
        }

        if (nextProps.utc !== this.props.utc) {
            tag = nextProps.utc ? 'utc' : 'local';

            if (this.state.viewDate) {
                updatedState.viewDate = this.state.viewDate.clone()[tag]();
            }
            if (this.state.selectedDate) {
                updatedState.selectedDate = this.state.selectedDate.clone()[tag]();
                updatedState.inputValue = updatedState.selectedDate.format(formats.datetime);
            }
        }
        this.setState(updatedState);
    }

    getFormats(props) {
        let formats = {
                date: props.dateFormat || '',
                time: props.timeFormat || ''
            },
            locale = this.localMoment(props.date, null, props).localeData();

        if (formats.date === true) {
            formats.date = locale.longDateFormat('L');
        } else if (this.getUpdateOn(formats) !== 'days') {
            formats.time = '';
        }
        if (formats.time === true) {
            formats.time = locale.longDateFormat('LT');
        }

        formats.datetime = formats.date && formats.time ?
            formats.date + ' ' + formats.time :
            formats.date || formats.time;

        return formats;
    }

    getUpdateOn(formats) {
        if (formats.date.match(/[1LD]/)) {
            return 'days';
        } else if (formats.date.indexOf('w') !== -1 || formats.date.indexOf('W') !== -1) {
            return 'weeks';
        } else if (formats.date.indexOf('M') !== -1) {
            return 'months';
        } else if (formats.date.indexOf('Y') !== -1) {
            return 'years';
        }
        return 'days';
    }

    clickToClose(e) {
        let {updateOn, selectedDate, inputValue} = this.state;
        let {input, onBlur} = this.props;
        let el = e.target, _isContains;
        while (el = el.parentNode) {
            if (el.getAttribute && el.getAttribute('data-value') === updateOn + this.uid) {
                _isContains = true;
            }
        }
        if (input && !_isContains) {
            this.setState({open: false}, () => {
                onBlur(selectedDate || inputValue);
            })
        }
    }

    setDate(type, item) {
        let {updateOn, viewDate} = this.state;
        let nextView = {
            month: updateOn,
            year: 'months'
        };
        this.setState({
            viewDate: viewDate.clone()[type](item.value).startOf(type),
            currentView: nextView[type]
        })
    }

    setTime(type, value) {
        let nextType,
            state = this.state,
            index = allowedSetTime.indexOf(type) + 1,
            date = (state.selectedDate || state.viewDate).clone();
        date[type](value);
        for (; index < allowedSetTime.length; index++) {
            nextType = allowedSetTime[index];
            date[nextType](date[nextType]());
        }
        if (!this.props.value) {
            this.setState({
                selectedDate: date,
                inputValue: date.format(state.inputFormat)
            });
        }
        this.props.onChange({name: this.props.name, value: date});
    }

    showView(view) {
        this.setState({currentView: view});
    }

    updateTime(op, amount, type, toSelected) {
        let date = toSelected ? 'selectedDate' : 'viewDate';
        this.setState(old => {
            old[date] = old[date].clone()[op](amount, type);
            return old;
        })
    }

    updateSelectedDate(item, close) {
        let {viewDate, selectedDate, updateOn, inputFormat} = this.state,
            modifier = 0,
            currentdate = selectedDate || viewDate,
            date;
        if (updateOn === 'days') {
            item.new && (modifier = 1);
            item.old && (modifier = -1);
            date = viewDate.clone()
                .set({month: viewDate.month() + modifier, date: item.value.date()});
        } else if (updateOn === 'weeks') {
            item.new && (modifier = 1);
            item.old && (modifier = -1);
            date = viewDate.clone()
                .set({month: viewDate.month() + modifier, date: item.value.date()});
        }
        else if (updateOn === 'months') {
            date = viewDate.clone()
                .set({month: item.value, date: currentdate.date()});
        }
        else if (updateOn === 'years') {
            date = viewDate.clone()
                .set({year: item.value, month: currentdate.month(), date: currentdate.date()});
        }
        date.set({
            hour: currentdate.hours(),
            minute: currentdate.minutes(),
            second: currentdate.seconds(),
            millisecond: currentdate.milliseconds()
        });
        if (!this.props.value) {
            let open = !(this.props.closeOnSelect && close);
            if (!open) {
                this.props.onBlur(date);
            }
            this.setState({
                selectedDate: date,
                viewDate: date.clone().startOf('month'),
                inputValue: date.format(inputFormat),
                open: open
            })
        } else {
            if (this.props.closeOnSelect && close) {
                this.closeCalendar();
            }
        }
        setTimeout(() => {
            this.props.onChange({name: this.props.name, value: date});
        }, 0);
    }

    openCalendar(e) {
        let {open} = this.state;
        if (!open) {
            this.setState({
                open: true
            }, () => {
                this.props.onFocus(e);
            })
        }
    }

    closeCalendar() {
        let {selectedDate, inputValue} = this.state;
        this.setState({
            open: false
        });
        this.props.onBlur(selectedDate || inputValue);
    }


    localMoment(date, format, props = this.props) {
        let m = (props.utc ? moment.utc : moment)(date, format, props.strictParsing);
        if (props.locale) {
            m.locale(props.locale);
        }
        return m;
    }

    getComponentProps() {
        let me = this,
            formats = this.getFormats(this.props),
            props = {dateFormat: formats.date, timeFormat: formats.time};

        this.componentProps.fromProps.forEach(name => {
            props[name] = me.props[name];
        });
        this.componentProps.fromState.forEach(name => {
            props[name] = me.state[name];
        });
        this.componentProps.fromThis.forEach(name => {
            props[name] = typeof me[name] === 'function' ? me[name].bind(this) : me[name];
        });
        return props;
    }

    onInputKey(e) {
        if (e.which === KeyCode.TAB && this.props.closeOnTab) {
            this.closeCalendar();
        }
    }

    onInputChange(e) {
        let value = e.value,
            localMoment = this.localMoment(value, this.state.inputFormat),
            update = {inputValue: value};

        if (localMoment.isValid() && !this.props.value) {
            update.selectedDate = localMoment;
            update.viewDate = localMoment.clone().startOf('month');
        } else {
            update.selectedDate = null;
        }
        return this.setState(update, () => {
            return this.props.onChange({
                value: localMoment.isValid() ? localMoment : this.state.inputValue,
                name: this.props.name
            });
        })
    }

    renderInput(value) {
        let {renderInput} = this.props;
        return renderInput ? renderInput(this.state.selectedDate) : value;
    }

    render() {
        let {className, input, shortcuts} = this.props,
            {inputValue, open, currentView, updateOn} = this.state;
        return (
            <div className={classnames('el-datetime', className, {'el-static': input}, {'el-datetime-open': open})}
                 data-value={updateOn + this.uid}>
                {input &&
                <Input key='i' icon={<i className="fa fa-calendar-minus-o"/>}
                       onFocus={this.openCalendar.bind(this)} onChange={this.onInputChange.bind(this)}
                       onKeyDown={this.onInputKey.bind(this)} value={this.renderInput(inputValue)}/>}
                <div key='dt' className='el-datetime-picker'>
                    {!!shortcuts && !!shortcuts.length && <Shortcuts shortcuts={shortcuts}/>}
                    <CalendarContainer view={currentView} viewProps={this.getComponentProps()}/>
                </div>
            </div>
        )
    }
}

DateTime.propTypes = {
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    locale: PropTypes.string,
    utc: PropTypes.bool,
    name: PropTypes.string,
    input: PropTypes.bool,
    inputProps: PropTypes.object,
    timeConstraints: PropTypes.object,
    viewMode: PropTypes.oneOf(['years', 'months', 'days', 'time', 'weeks']),
    isValidDate: PropTypes.func,
    open: PropTypes.bool,
    strictParsing: PropTypes.bool,
    closeOnSelect: PropTypes.bool,
    closeOnTab: PropTypes.bool,
    showWeeks: PropTypes.bool,
    isWeek: PropTypes.bool,
    renderInput: PropTypes.func,
    shortcuts: PropTypes.array
};
DateTime.defaultProps = {
    className: '',
    defaultValue: '',
    inputProps: {},
    input: true,
    onFocus: noop,
    onBlur: noop,
    onChange: noop,
    timeFormat: true,
    timeConstraints: {},
    dateFormat: true,
    strictParsing: true,
    closeOnSelect: false,
    closeOnTab: true,
    utc: false,
    showWeeks: false,
    isWeek: false,
    shortcuts: []
};