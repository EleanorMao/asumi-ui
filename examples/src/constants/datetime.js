export const basic = `import {DateTime} from 'el-ui';

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment()
        }
    }

    handleValidDate(currentDate, selectedDate) {
        return moment(currentDate).isAfter(moment());
    }

    handleChange(name, moment) {
        this.setState({ date: moment })
    }

    render() {
        let { date } = this.state;
        return (
            <div>
                <DateTime
                    onChange={this.handleChange.bind(this, 'date')}
                    value={date}
                    viewMode='days' isValidDate={this.handleValidDate.bind(this)}/>
            </div>
        )
    }
}`;

export const week = `import {DateTime} from 'el-ui';

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment()
        }
    }

    handleValidDate(currentDate, selectedDate) {
        return moment(currentDate).isAfter(moment());
    }

    handleChange(name, moment) {
        this.setState({ date: moment })
    }

    render() {
        let { date } = this.state;
        return (
            <div>
                <DateTime
                    onChange={this.handleChange.bind(this, 'date')}
                    dateFormat='YYYY年MM月'
                    value={date}
                    viewMode='months' isValidDate={this.handleValidDate.bind(this)} />
            </div>
        )
    }
}`;


export const year = `import {DateTime} from 'el-ui';

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment()
        }
    }

    handleValidDate(currentDate, selectedDate) {
        return moment(currentDate).isAfter(moment());
    }

    handleChange(name, moment) {
        this.setState({ date: moment })
    }

    render() {
        let { date } = this.state;
        return (
            <div>
                <DateTime
                    onChange={this.handleChange.bind(this, 'date')}
                    dateFormat='YYYY年'
                    value={date}
                    viewMode='years' />
            </div>
        )
    }
}`;

export const api = [{
    property: "value",
    type: "Date",
    'default': "new Date()",
    description: "This prop is parsed by Moment.js, so it is possible to use a date string or a moment object."
}, {
    property: "defaultValue",
    type: "Date",
    'default': "new Date()",
    description: "Use it as a uncontrolled component."
}, {
    property: "dataFormat",
    type: "boolean | string",
    'default': "true",
    description: "If true the date will be displayed using the defaults for the current locale. If false the datepicker is disabled and the component can be used as timepicker."
}, {
    property: "timeFormat",
    type: "boolean | string",
    'default': "true",
    description: "If true the time will be displayed using the defaults for the current locale. If false the timepicker is disabled and the component can be used as datepicker."
}, {
    property: "onChange",
    type: "function(moment|string)",
    'default': "empty function",
    description: "callback trigger when the date changes."
}, {
    property: "viewMode",
    type: "string",
    'default': "days",
    description: "The default view to display when the picker is shown ('years', 'months', 'days', 'time')"
}, {
    property: "className",
    type: "string | array",
    'defaylt': "",
    description: "Extra class name for the outermost markup element."
}, {
    property: "isValidDate",
    type: "function(currentDate, selectedDate)",
    'default': '()=>true',
    description: "Define the dates that can be selected."
}];