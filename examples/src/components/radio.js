/**
 * Created by elly on 2017/4/10.
 */
import React, {Component, PropTypes} from 'react';
import {
    Radio
} from '../../../src';

export default  class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            swi: true,
            normal: true,
            groupValue: 1,
            groupValue1: 1
        }
    }

    handleChange(e) {
        let {name, checked} = e;
        this.setState(prev => {
            prev[name] = checked;
            return prev;
        })
    }

    handleSelect({value}) {
        this.setState({groupValue: value});
    }

    render() {
        return (
            <div className="content">
                <h1>Normal Radio</h1>
                <div>
                    <Radio
                        value="1"
                        label="label"
                        name="normal"
                        checked={this.state.normal}
                        onChange={this.handleChange.bind(this)}/>
                </div>
                <h1>Switch Radio</h1>
                <div>
                    <Radio
                        value="1"
                        label="switch"
                        name="swi"
                        type="switch"
                        checked={this.state.swi}
                        onChange={this.handleChange.bind(this)}/>
                </div>
                <h1>Disabled Radio</h1>
                <div>
                    <Radio
                        disabled
                        label="label"
                        checked={false}
                    />
                    <Radio
                        disabled
                        label="label"
                        checked={true}
                    />
                    <Radio
                        label="switch"
                        type="switch"
                        disabled
                        checked={false}/>
                    <Radio
                        label="switch"
                        type="switch"
                        disabled
                        checked={true}/>
                </div>
                <h1>RadioGroup</h1>
                <div>
                    <Radio.Group
                        options={[{
                            label: '选项1',
                            value: 1
                        }, {
                            label: '选项2',
                            value: 2
                        }, {
                            label: '选项3',
                            value: 3
                        }]}
                        value={this.state.groupValue}
                        onChange={this.handleSelect.bind(this)}
                    />
                    <Radio.Group
                        options={[{
                            label: '选项1',
                            value: 1
                        }, {
                            label: '选项2',
                            value: 2
                        }, {
                            label: '选项3',
                            value: 3
                        }]}
                        disableAll={true}
                    />
                </div>
            </div>
        )
    }
}
