/**
 * Created by elly on 2017/4/18.
 */
import React, {Component, PropTypes} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import github from 'react-syntax-highlighter/styles/hljs/github'
import {
    Tooltip
} from '../../../src';


export default class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }
    }

    handleToggle() {
        this.setState({toggle: !this.state.toggle});
    }

    render() {
        let {toggle} = this.state;
        let {title, code, children} = this.props;
        return (
            <div className="el-panel">
                <div className="el-panel-title">
                    {title}
                    <Tooltip title={`点击查看/关闭例子`} trigger="hover" placement="top">
                        <span className="el-panel-toggle fa fa-code" onClick={this.handleToggle.bind(this)}/>
                    </Tooltip>
                </div>
                <div className="el-panel-body">
                    <div className="el-panel-content">
                        {children}
                    </div>
                    <div className="el-panel-demo" style={{display: (toggle ? 'block' : 'none')}}>
                        <SyntaxHighlighter style={github}>{code}</SyntaxHighlighter>
                    </div>
                </div>
            </div>
        )
    }
}

Panel.propTypes = {};

Panel.defaultProps = {
    code: ""
};