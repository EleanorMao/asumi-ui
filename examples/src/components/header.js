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
                <h1 className="title"><a href="/">ELLY-COMPONENT</a></h1>
                <div className="copyright">
                    <span className="author">© Eleanor Mao</span>
                    <a className="github-button"
                       href="https://github.com/EleanorMao" data-show-count="true"
                       aria-label="Follow @EleanorMao on GitHub">Follow Me</a>
                </div>
            </header>
        )
    }
}

