/**
 * Created by elly on 2017/4/11.
 */
import React, {Component, PropTypes} from 'react';
import {
    Col,
    Table,
    Button,
    Loading
} from '../../../src';
import Panel from './panel';
import {basic, title, size, mask, full, command, api} from "../constants/loading";

window.Loading = Loading;
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullScreen: false
        }
    }

    handleClick() {
        Loading.loading({
            title: "关闭请在控制台输入 Loading.close()"
        });
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
                <h1>Loading 加载</h1>
                <Panel
                    title="basic"
                    code={basic}
                >
                    <Loading/>
                </Panel>
                <Panel
                    title="title"
                    code={title}
                >
                    <Loading title="Loading..."/>
                </Panel>
                <Panel
                    title="size"
                    code={size}
                >
                    <Loading size="small" title="small loading"/>
                    <Loading size="large" title="large loading"/>
                </Panel>
                <Panel
                    title="mask"
                    code={mask}
                >
                    <Loading mask title="loading">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem
                            ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem
                            ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </Loading>
                </Panel>
                <Panel
                    title="full screen"
                    code={full}
                >
                    <Button type="primary" onClick={this.showFullScreen.bind(this)}>toggle full screen loading</Button>
                    <Loading fullScreen mask loading={this.state.fullScreen} title="close after 3s"/>
                </Panel>
                <Panel
                    title="command"
                    code={command}
                >
                    <Button type="primary" onClick={this.handleClick.bind(this)}>
                        Loading.loading(props)
                    </Button>
                    <p style={{marginTop: 10}}>打开loading调用Loading.loading(props)；关闭loading调用Loading.close()</p>
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
