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
                    <code>npm install asumi -S</code>
                </pre>
                <h1>Environment Support</h1>
                <p>Modern browsers and Internet Explorer 8+ (with classList & getBoundingClientRect polyfills)</p>
                <h1>Usage</h1>
                <pre>
                    <code>import React from 'react';</code>
                    <code>import ReactDOM from 'react-dom';</code>
                    <code dangerouslySetInnerHTML={{__html: "import { Button } from 'asumi';"}}/>
                    <code>import 'asumi/style/index.less';</code>
                    <code>// import 'asumi/style/asumi-default-theme.css';  compatible IE8</code>
                    <br/>
                    <code>
                        <span>&lt;link</span>
                        <span> rel=</span>
                        <span>"stylesheet"</span>
                        <span> href=</span>
                        <span>"path/to/font-awesome/css/font-awesome.min.css"</span>
                        <span>&gt;</span>
                    </code>
                </pre>
                <h1>Icon</h1>
                <p>asumi icons use <a href="http://fontawesome.io/">Font Awesome</a></p>
            </div>
        )
    }
}
