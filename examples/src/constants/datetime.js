export const basic = `import {DateTime} from 'asumi';

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment()
        }
    }

    handleValidDate(currentDate, selectedDate) {
        return moment(currentDate).isBefore(moment());
    }

    handleChange({ name, value }) {
        this.setState({ [name]: value })
    }

    render() {
        let { date } = this.state;
        return (
            <div>
            <DateTime showWeeks={true} dateFormat='L' timeFormat={true}
                onChange={this.handleChange.bind(this)}
                value={date} name="date"  isValidDate={this.handleValidDate.bind(this)} />
            </div>
        )
    }
}`;


export const week = `import {DateTime} from 'asumi';

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment()
        }
    }
    
    handleValidDate(currentDate, selectedDate) {
        return moment(currentDate).isBefore(moment());
    }

    handleChange({ name, value }) {
        this.setState({ [name]: value })
    }

    render() {
        let { date } = this.state;
        return (
            <div>
            <DateTime showWeeks={true} dateFormat='L' timeFormat={true}
                onChange={this.handleChange.bind(this)}
                dateFormat='YYYY年w周'
                viewMode='weeks'
                value={date} name="date"  isValidDate={this.handleValidDate.bind(this)} />
            </div>
        )
    }
}`;


export const month = `import {DateTime} from 'asumi';

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment()
        }
    }
    
    handleValidDate(currentDate, selectedDate) {
        return moment(currentDate).isBefore(moment());
    }

    handleChange({ name, value }) {
        this.setState({ [name]: value })
    }

    render() {
        let { date } = this.state;
        return (
            <div>
            <DateTime
                closeOnSelect={true}
                onChange={this.handleChange.bind(this)}
                dateFormat='YYYY年MM月'
                value={date} name="date"
                viewMode='months' isValidDate={this.handleValidDate.bind(this)} />
            </div>
        )
    }
}`;


export const year = `import {DateTime} from 'asumi';

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment()
        }
    }
    
    handleValidDate(currentDate, selectedDate) {
        return moment(currentDate).isBefore(moment());
    }

    handleChange({ name, value }) {
        this.setState({ [name]: value })
    }

    render() {
        let { date } = this.state;
        return (
            <div>
            <DateTime
                onChange={this.handleChange.bind(this)}
                dateFormat='YYYY年'
                value={date} name="date"
                viewMode='years' isValidDate={this.handleValidDate.bind(this)} />
            </div>
        )
    }
}`;



export const shortcut = `import {DateTime} from 'asumi';

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment()
        }
    }
    
    handleValidDate(currentDate, selectedDate) {
        return moment(currentDate).isBefore(moment());
    }

    handleChange({ name, value }) {
        this.setState({ [name]: value })
    }

    render() {
        let { date } = this.state;
        return (
            <div>
            <DateTime showWeeks={true} dateFormat='L' timeFormat={true}
                onChange={this.handleChange.bind(this)}
                shortcuts={[{
                    text: '昨日',
                    onClick: ()=> {
                    this.setState({date: moment().add(-1, 'd')})
                    }
                }, {
                    text: '上周',
                    onClick: ()=> {
                    this.setState({date: moment().add(-1, 'w')})
                    }
                }]}
                value={date} name="date"  isValidDate={this.handleValidDate.bind(this)} />
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
    property: "name",
    type: "string",
    'default': "",
    description: "name of datetime."
}, {
    property: "onChange",
    type: "function({value: moment|string, name})",
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