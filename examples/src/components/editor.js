/**
 * Created by elly on 2017/4/7.
 */
import React, {Component} from 'react';
import {Editor} from '../../../src';

export default  class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originText: ''
        }
    }

    handleChange({name, value, parsedValue}) {
        this.setState({originText: value})
    }

    render() {
        return (
            <div className="content">
                <Editor
                    value={this.state.originText}
                    onChange={this.handleChange.bind(this)}
                />
            </div>
        )
    }
}
