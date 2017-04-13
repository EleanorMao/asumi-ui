/**
 * Created by elly on 2017/4/7.
 */
import React, {Component, PropTypes} from 'react';
import {
    Form
} from '../../../src';

export default  class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                input: "",
                select: "",
                textarea: "",
            }
        }
    }

    render() {
        let data = this.state.data;
        return (
            <div className="content">
                <h1>Normal Form</h1>
                <Form
                    title="Normal Form"
                    data={data}
                    options={[{
                        label: "input",
                        name: "input",
                        type: "text",
                        config: {}
                    }]}
                />
            </div>
        )
    }
}
