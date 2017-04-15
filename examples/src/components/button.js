/**
 * Created by elly on 2017/4/5.
 */
import React, {Component} from 'react';
import {
    Group,
    Button,
    Message
} from '../../../src';

export default  class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content">
                <h1>Normal Button</h1>
                <Group>
                    <Button>default</Button>
                    <Button type="secondary">secondary</Button>
                    <Button type="primary">primary</Button>
                    <Button type="danger">danger</Button>
                    <Button type="success">success</Button>
                    <Button disabled>disabled</Button>
                    <Button type="text">text</Button>
                </Group>
                <h1>Link Button</h1>
                <Group>
                    <Button href="/">default</Button>
                    <Button href="/" type="secondary">secondary</Button>
                    <Button href="/" type="primary">primary</Button>
                    <Button href="/" type="danger">danger</Button>
                    <Button href="/" type="success">success</Button>
                    <Button href="/" disabled>disabled</Button>
                    <Button href="/" type="text">text</Button>
                </Group>
                <h1>Large Button</h1>
                <Group size="large">
                    <Button>default</Button>
                    <Button type="secondary">secondary</Button>
                    <Button type="primary">primary</Button>
                    <Button type="danger">danger</Button>
                    <Button type="success">success</Button>
                    <Button disabled>disabled</Button>
                    <Button type="text">text</Button>
                </Group>
                <h1>Small Button</h1>
                <Group size="small">
                    <Button >default</Button>
                    <Button type="secondary">secondary</Button>
                    <Button type="primary">primary</Button>
                    <Button type="danger">danger</Button>
                    <Button type="success">success</Button>
                    <Button disabled>disabled</Button>
                    <Button type="text">text</Button>
                </Group>
            </div>
        )
    }
}