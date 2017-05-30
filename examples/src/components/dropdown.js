/**
 * Created by elly on 2017/4/5.
 */
import React, {Component} from 'react';
import {
    Group,
    Dropdown
} from '../../../lib';

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
                <Group list={['HOME', 'Dropdown']}
                       onClick={this.handleClick.bind(this)}>
                    <Dropdown>
                        Menu
                    </Dropdown>
                    <Dropdown type="primary">
                        Menu
                    </Dropdown>
                    <Dropdown type="secondary">
                        Menu
                    </Dropdown>
                    <Dropdown type="success">
                        Menu
                    </Dropdown>
                    <Dropdown type="danger">
                        Menu
                    </Dropdown>
                </Group>
                <h1>Link Dropdown</h1>
                <Group list={[{label: 'HOME', href: '/'}, {label: 'Dropdown', href: '/dropdown'}]}
                       onClick={this.handleClick.bind(this)}>
                    <Dropdown>
                        Menu
                    </Dropdown>
                    <Dropdown type="primary">
                        Menu
                    </Dropdown>
                    <Dropdown type="secondary">
                        Menu
                    </Dropdown>
                    <Dropdown type="success">
                        Menu
                    </Dropdown>
                    <Dropdown type="danger">
                        Menu
                    </Dropdown>
                </Group>
                <h1>Select Dropdown</h1>
                <Group list={['HOME', 'Dropdown']}
                       onClick={this.handleSelect.bind(this)}>
                    <Dropdown>
                        {this.state.current}
                    </Dropdown>
                    <Dropdown type="primary">
                        {this.state.current}
                    </Dropdown>
                    <Dropdown type="secondary">
                        {this.state.current}
                    </Dropdown>
                    <Dropdown type="success">
                        {this.state.current}
                    </Dropdown>
                    <Dropdown type="danger">
                        {this.state.current}
                    </Dropdown>
                </Group>
            </div>
        )
    }
}