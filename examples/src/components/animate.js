/**
 * Created by elly on 2017/4/7.
 */
import React, {Component} from 'react';
import {Button, Animate, Table, Col} from '../../../src';
import Panel from './panel';
import {basic, api} from "../constants/animate";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [0, 1]
        }
    }

    handleClick(name) {
        this.setState(old => {
            old.arr[name](old.arr.length);
            return old;
        })
    }

    handleAppear(key) {
        console.log('appear:', key)
    }

    handleLeave(key) {
        console.log('leave:', key)
    }

    handleEnter(key) {
        console.log('enter:', key)
    }

    handleEnd(key) {
        console.log('end: ', key)
    }

    render() {
        let {arr} = this.state;
        return (
            <div className="content">
                <h1>Animate 动画</h1>
                <Panel
                    title="basic"
                    code={basic}
                >
                    <Button
                        type="success"
                        style={{marginRight: 10}}
                        onClick={this.handleClick.bind(this, 'push')}
                    >Push</Button>
                    <Button
                        type="primary"
                        style={{marginRight: 10}}
                        onClick={this.handleClick.bind(this, 'pop')}
                    >Pop</Button>
                    <Animate
                        // transitionName={{
                        //     appear: 'example-appear',
                        //     appearActive: 'example-appear-active',
                        //     enter: 'example-enter',
                        //     enterActive: 'example-enter-active',
                        //     leave: 'example-leave',
                        //     leaveActive: 'example-leave-active'
                        // }}
                        transitionName="example"
                        style={{marginTop: 10}}
                        transitionAppear
                        component="div"
                        onAppear={this.handleAppear.bind(this)}
                        onEnter={this.handleEnter.bind(this)}
                        onLeave={this.handleLeave.bind(this)}
                        onEnd={this.handleEnd.bind(this)}
                    >
                        {
                            arr.map((item) => {
                                return (
                                    <p key={item}
                                       style={{
                                           background: '#f0f0f0',
                                           lineHeight: '30px',
                                           marginBottom: 10
                                       }}>{item}</p>
                                )
                            })
                        }
                    </Animate>
                </Panel>
                <h1>API</h1>
                <Table isKey="property" data={api} lineWrap="break">
                    <Col dataField="property">Property</Col>
                    <Col dataField="description">Description</Col>
                    <Col dataField="type">Type</Col>
                    <Col dataField="default">Default</Col>
                </Table>
            </div>
        )
    }
}
