/**
 * Created by elly on 2017/4/7.
 */
import React, {Component} from 'react';
import {Button, Group, Animate} from '../../../src';

export default  class Main extends Component {
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

    handleChange() {
        this.setState({arr: [0, 1, 3]})
    }

    render() {
        let {arr} = this.state;
        return (
            <div className="content">
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
                <Button
                    onClick={this.handleChange.bind(this)}
                >Click</Button>
                <Animate transitionName="example" component={Group} transitionAppear>
                    {
                        arr.map((item) => {
                            return <p key={item} style={{
                                lineHeight: '30px',
                                background: '#eee',
                                marginBottom: 10
                            }}>{item}</p>
                        })
                    }
                </Animate>
            </div>
        )
    }
}
