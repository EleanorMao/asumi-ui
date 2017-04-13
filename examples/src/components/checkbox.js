/**
 * Created by elly on 2017/4/10.
 */
import React, {Component, PropTypes} from 'react';
import {
    Checkbox
} from '../../../src';

export default  class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            swi: true,
            normal: true,
            checkedList: [1, 2]
        }
    }

    handleChange(e) {
        let {name, checked} = e;
        this.setState(prev=> {
            prev[name] = checked;
            return prev;
        })
    }

    handleSelect(checkedList) {
        this.setState({checkedList});
    }

    render() {
        return (
            <div className="content">
                <h1>Normal Checkbox</h1>
                <div>
                    <Checkbox
                        value="1"
                        label="label"
                        name="normal"
                        checked={this.state.normal}
                        onChange={this.handleChange.bind(this)}/>
                </div>
                <h1>Switch Radio</h1>
                <div>
                    <Checkbox
                        value="1"
                        label="switch"
                        name="swi"
                        type="switch"
                        checked={this.state.swi}
                        onChange={this.handleChange.bind(this)}/>
                </div>
                <h1>Disabled Checkbox</h1>
                <div>
                    <Checkbox
                        disabled
                        label="label"
                        checked={false}
                    />
                    <Checkbox
                        disabled
                        label="label"
                        checked={true}
                    />
                    <Checkbox
                        label="switch"
                        type="switch"
                        disabled
                        checked={false}/>
                    <Checkbox
                        label="switch"
                        type="switch"
                        disabled
                        checked={true}/>
                </div>
                <h1>Indeterminate Checkbox</h1>
                <div>
                    <Checkbox
                        label="indeterminate"
                        indeterminate={true}
                    />
                </div>
                <h1>CheckboxGroup</h1>
                <div>
                    <Checkbox.Group
                        options={[{
                            label: '组别1',
                            value: 1
                        }, {
                            label: '组别2',
                            value: 2
                        }, {
                            label: '组别3',
                            value: 3
                        }]}
                        checkedList={this.state.checkedList}
                        onChange={this.handleSelect.bind(this)}
                    />
                    <Checkbox.Group
                        options={[{
                            label: '组别1',
                            value: 1
                        }, {
                            label: '组别2',
                            value: 2
                        }, {
                            label: '组别3',
                            value: 3
                        }]}
                        disableAll={true}
                        checkedList={[]}
                    />
                </div>
            </div>
        )
    }
}
