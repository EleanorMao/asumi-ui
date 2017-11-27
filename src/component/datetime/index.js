import React from 'react';
import moment from 'moment';
import Input from '../input';
import {noop} from "../util";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CalendarContainer from './calendarContainer';

export default class DateTime extends React.Component {
    constructor(props) {
        super(props);
        this.componentProps = {
            fromState: ['viewDate', 'selectedDate', 'updateOn'],
            fromProps: ['value', 'isValidDate', 'renderDay', 'renderMonth', 'renderYear', 'timeConstraints', 'showWeeks', 'isWeek'],
            fromThis: ['setDate', 'setTime', 'showView', 'addTime', 'subtractTime', 'updateSelectedDate', 'localMoment', 'handleClickOutside']
        };
        this.allowedSetTime = ['hours', 'minutes', 'seconds', 'milliseconds'];
        let state = this.getStateFromProps(props);
        state.currentView = props.dateFormat ? props.viewMode || state.updateOn || 'days' : 'time';
        this.state = state;
    }

    getStateFromProps(props) {
        let formats = this.getFormats(props),
            date = props.value || props.defaultValue,
            selectedDate, viewDate, updateOn, inputValue;

        if (date) {
            selectedDate = this.localMoment(date, typeof date === 'string' ? formats.datetime : null);
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

    componentWillReceiveProps(nextProps) {
        let formats = this.getFormats(nextProps),
            updatedState = {};
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
                let updateSelectedDate = this.state.selectedDate.clone().locale(nextProps.locale);
                updatedState.selectedDate = updateSelectedDate;
                updatedState.inputValue = updateSelectedDate.format(formats.datetime);
            }
        }

        if (nextProps.utc !== this.props.utc) {
            if (nextProps.utc) {
                if (this.state.viewDate) {
                    updatedState.viewDate = this.state.viewDate.clone().utc();
                }
                if (this.state.selectedDate) {
                    updatedState.selectedDate = this.state.selectedDate.clone().utc();
                    updatedState.inputValue = updatedState.selectedDate.format(formats.datetime);
                }
            } else {
                if (this.state.viewDate) {
                    updatedState.viewDate = this.state.viewDate.clone().locale();
                }
                if (this.state.selectedDate) {
                    updatedState.selectedDate = this.state.selectedDate.clone().local();
                    updatedState.inputValue = updatedState.selectedDate.format(formats.datetime);
                }
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
        } else if (formats.date.indexOf('M') !== -1) {
            return 'months';
        } else if (formats.date.indexOf('Y') !== -1) {
            return 'years';
        }
        return 'days';
    }

    handleClickOutside() {
        let {open, selectedDate, inputValue} = this.state;
        if (this.props.input && open && !this.props.open) {
            this.setState({open: false}, () => {
                this.props.onBlur(selectedDate || inputValue);
            })
        }
    }

    setDate(type) {
        let me = this,
            nextView = {
                week: 'days',
                month: 'days',
                year: 'months'
            };
        return e => {
            me.setState({
                viewDate: me.state.viewDate.clone()[type](parseInt(e.target.getAttribute('data-value'), 10)).startOf(type),
                currentView: nextView[type]
            })
        }
    }

    addTime(...opt) {
        return this.updateTime('add', ...opt);
    }

    subtractTime(...opt) {
        return this.updateTime('subtract', ...opt)
    }

    setTime(type, value) {
        let index = this.allowedSetTime.indexOf(type) + 1,
            state = this.state,
            date = (state.selectedDate || state.viewDate).clone(),
            nextType;
        date[type](value);
        for (; index < this.allowedSetTime.length; index++) {
            nextType = this.allowedSetTime[index];
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
        return () => {
            this.setState({currentView: view});
        }
    }

    updateTime(op, amount, type, toSelected) {
        let me = this;
        return () => {
            let update = {},
                date = toSelected ? 'selectedDate' : 'viewDate';
            update[date] = me.state[date].clone()[op](amount, type);
            me.setState(update);
        }
    }

    updateSelectedDate(e, close) {
        let target = e.target,
            modifier = 0,
            viewDate = this.state.viewDate,
            currentdate = this.state.selectedDate || viewDate,
            date;
        if (target.className.indexOf('el-datetime-day') !== -1) {
            if (target.className.indexOf('el-datetime-new') !== -1) {
                modifier = 1;
            } else if (target.className.indexOf('el-datetime-old') !== -1) {
                modifier = -1;
            }
            date = viewDate.clone().month(viewDate.month() + modifier).date(parseInt(target.getAttribute('data-value'), 10));
        } else if (target.className.indexOf('el-datetime-month') !== -1) {
            date = viewDate.clone().month(parseInt(target.getAttribute('data-value'), 10)).date(currentdate.date())
        } else if (target.className.indexOf('el-datetime-year') !== -1) {
            date = viewDate.clone()
                .month(currentdate.month()).date(currentdate.date())
                .year(parseInt(target.getAttribute('data-value'), 10));
        }
        date.hours(currentdate.hours())
            .minutes(currentdate.minutes())
            .seconds(currentdate.seconds())
            .milliseconds(currentdate.milliseconds());
        if (!this.props.value) {
            let open = !(this.props.closeOnSelect && close);
            if (!open) {
                this.props.onBlur(date);
            }
            this.setState({
                selectedDate: date,
                viewDate: date.clone().startOf('month'),
                inputValue: date.format(this.state.inputFormat),
                open: open
            })
        } else {
            if (this.props.closeOnSelect && close) {
                this.closeCalendar();
            }
        }
        this.props.onChange({name: this.props.name, value: date});
    }

    openCalendar() {
        if (!this.state.open) {
            this.setState({open: true}, () => {
                this.props.onFocus();
            })
        }
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
        if ( e.which === 9 && this.props.closeOnTab ) {
			this.closeCalendar();
		}
    }

    onInputChange(e) {
        let value = e.target === null ? e : e.value,
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
        return this.props.renderInput ? this.props.renderInput(this.state.selectedDate) : value;
    }

    render() {
        let {className, input} = this.props,
            {inputValue, open, currentView} = this.state,
            children = [];
        if (input) {
            children.push(
                <Input key='i' icon={<i className="fa fa-calendar-minus-o"/>}
                       onFocus={this.openCalendar.bind(this)} onChange={this.onInputChange.bind(this)}
                       onKeyDown={this.onInputKey.bind(this)} value={this.renderInput(inputValue)}/>
            );
        }
        return (
            <div className={classnames('el-datetime', className, {'el-static': input}, {'el-datetime-open': open})}>
                {children}
                <div key='dt' className='el-datetime-picker'>
                    <CalendarContainer
                        view={currentView}
                        viewProps={this.getComponentProps()}
                        onClickOutside={this.handleClickOutside.bind(this)}
                    />
                </div>
            </div>
        )
    }
}

DateTime.propTypes = {
    onFoucus: PropTypes.func,
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
    renderInput: PropTypes.func
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
    isWeek: false
};