/**
 * Created by elly on 2017/4/5.
 */
import React from 'react';

const Component = React.Component;

export default class Header extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <header className="header">
                <h1 className="title"><a href="/">ASUMI-UI</a></h1>
                <div className="copyright">
                    <span className="author">©
                        <a href="https://github.com/EleanorMao" style={{color: "#fff", marginLeft: 5}}>EleanorMao</a>,
                        <a href="https://github.com/EleanorMao" style={{color: "#fff", marginLeft: 2}}>嘣嘣</a>,
                        <a href="https://github.com/WoolYang" style={{color: "#fff", marginLeft: 2}}>WoolYang</a>
                    </span>
                    <a className="github-button" href="https://github.com/EleanorMao/asumi-ui"
                       data-show-count="true" aria-label="Star EleanorMao/asumi-ui on GitHub"/>
                </div>
            </header>
        )
    }
}

