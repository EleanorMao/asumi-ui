import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import Input from '../input';
import DateTime from '../datetime';
import { noop } from '../util';

export default class DateRange extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getStateFromProps(props);
    }

    getStateFromProps(props){
        let date = (props.value && props.value instanceof Array) ? date : [null, null];
        return {
            date
        };
    }

    render() {
        let { renderInput } = this.props;
        let {date} = this.state;
        return (
            <div className='el-daterange'>
                {/* <Input value={renderInput ? renderInput(value) : value} /> */}
                <div className='el-daterange-picker'>
                    <DateTime value={date[0]} className='el-daterange-left' timeFormat={false} input={false} open={true}/>
                    <DateTime value={date[1]} className='el-daterange-right' timeFormat={false} input={false} open={true}/>
                </div>
            </div>
        )
    }
}

DateRange.propTypes = {
    renderInput: PropTypes.func
}