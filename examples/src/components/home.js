/**
 * Created by elly on 2017/4/7.
 */
import React, {Component} from 'react';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="content home">
                <h1>Installation</h1>
                <h2>npm</h2>
                <pre>
                    <code>npm install el-ui -S</code>
                </pre>
                <h1>Environment Support</h1>
                <p>Modern browsers and Internet Explorer 9+ (with polyfills)</p>
                <h1>Usage</h1>
                <pre>
                    <code>import React from 'react';</code>
                    <code>import ReactDOM from 'react-dom';</code>
                    <code dangerouslySetInnerHTML={{__html: "import { Button } from 'el-ui';"}}/>
                    <code>import 'el-ui/style/index.less';</code>
                </pre>
                <h1>Icon</h1>
                <p>el-ui icons use <a href="http://fontawesome.io/">Font Awesome</a></p>
            </div>
        )
    }
}
