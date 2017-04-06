/**
 * Created by elly on 2017/4/5.
 */
import React, {Component} from 'react';
import {
    Dropdown
} from '../../../src/Index.js';

export default  class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'Dropdown'
        }
    }

    handleClick(item) {
        console.log(item);
    }

    handleSelect(current) {
        this.setState({current});
    }

    render() {
        return (
            <div className="content">
                <h1>TEXT Dropdown</h1>
                <div>
                    <Dropdown
                        list={['HOME', 'Dropdown']}
                        onClick={this.handleClick.bind(this)}
                    >
                        Menu
                    </Dropdown>
                </div>
                <h1>Link Dropdown</h1>
                <div>
                    <Dropdown
                        list={[{label: 'HOME', href: '/'}, {label: 'Dropdown', href: '/dropdown'}]}
                        onClick={this.handleClick.bind(this)}
                    >
                        Menu
                    </Dropdown>
                </div>
                <h1>Select Dropdown</h1>
                <div>
                    <Dropdown
                        list={['HOME', 'Dropdown']}
                        onClick={this.handleSelect.bind(this)}
                    >
                        {this.state.current}
                    </Dropdown>
                </div>
            </div>
        )
    }
}