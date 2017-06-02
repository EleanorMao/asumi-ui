/**
 * Created by elly on 2017/4/11.
 */
import React, {Component, PropTypes} from 'react';
import Tabs from './tabs';
import {
    Button,
    Loading
} from '../../../src';

export default  class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullScreen: false
        }
    }

    showFullScreen() {
        this.setState({fullScreen: true}, () => {
            setTimeout(() => {
                this.setState({fullScreen: false});
            }, 3000)
        });
    }

    render() {
        return (
            <div className="content">
                <h1>Normal Loading</h1>
                <div>
                    <Loading/>
                    <Loading title="Loading..."/>
                    <Loading size="small" title="small loading"/>
                    <Loading size="large" title="large loading"/>
                    <Loading mask title="loading">
                        <Tabs/>
                    </Loading>
                </div>
                <h1>Full Screen Loading</h1>
                <div>
                    <Button type="primary" onClick={this.showFullScreen.bind(this)}>toggle full screen loading</Button>
                    <Loading fullScreen mask loading={this.state.fullScreen} title="close after 3s"/>
                </div>
            </div>
        )
    }
}
