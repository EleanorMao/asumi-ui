/**
 * Created by elly on 2017/4/5.
 */
import React from 'react';

const Component = React.Component;

export default class Default extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="content">
                <h2 style={{fontSize: "32px", lineHeight: "300px", textAlign: "center", display: "block"}}>ELUI</h2>
            </div>
        )
    }
}

