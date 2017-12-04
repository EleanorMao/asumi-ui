import React, {Component} from 'react';
import {
    Transfer
} from '../../../src';

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            titles: ["列表1", "列表2"],
            value: []
        }
    }

    componentDidMount() {
        let data = [];
        for (let i = 0; i <= 5; i++) {
            data.push({
                value: i + 1,
                label: `选项${i + 1}`
            })
        }
        this.setState({data: data})
    }

    handleChange({value}) {
        this.setState({value: value})
    }

    render() {
        const {data, titles, value} = this.state;
        return (
            <div className="content">
                <Transfer
                    data={data}
                    titles={titles}
                    value={value}
                    filterable={true}
                    onChange={this.handleChange.bind(this)}
                />
            </div>
        )
    }
}

