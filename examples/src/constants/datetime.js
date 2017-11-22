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