import React from 'react';

export default class Shortcuts extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick() {
    }

    render() {
        let { shortcuts } = this.props;
        return (
            <div className='el-datetime-shortcuts'>
                {
                    shortcuts.map((item, index) => {
                        return (<a key={index} onClick={item.onClick || this.handleClick}>{item.text}</a>)
                    })
                }
            </div>
        )
    }
}