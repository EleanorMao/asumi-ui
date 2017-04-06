/**
 * Created by elly on 2017/4/5.
 */
import React, {Component} from 'react';
import {
    Pagination,
    SimplePagination
} from '../../../src/Index.js';

export default  class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            dataSize: 100,
            sizePerPage: 6
        }
    }

    handlePageChange(current, sizePerPage) {
        this.setState({current, sizePerPage});
    }

    render() {
        let {current, dataSize, sizePerPage} = this.state;
        return (
            <div className="content">
                <h1>Normal Pagination</h1>
                <Pagination
                    current={current}
                    dataSize={dataSize}
                    sizePerPage={sizePerPage}
                    onPageChange={this.handlePageChange.bind(this)}
                />
                <h1>Pagination without Total Pages</h1>
                <Pagination
                    current={current}
                    dataSize={dataSize}
                    showTotalPages={false}
                    sizePerPage={sizePerPage}
                    onPageChange={this.handlePageChange.bind(this)}
                />
                <h1>Hide Start & End Page Button Pagination</h1>
                <Pagination
                    current={current}
                    dataSize={dataSize}
                    showTotalPages={false}
                    sizePerPage={sizePerPage}
                    hideEndLabel hideStartLabel
                    onPageChange={this.handlePageChange.bind(this)}
                />
                <h1>Customer Button Pagination</h1>
                <Pagination
                    current={current}
                    dataSize={dataSize}
                    showTotalPages={false}
                    sizePerPage={sizePerPage}
                    endLabel={<span>End</span>}
                    nextLabel={<span>Next</span>}
                    prevLabel={<span>Prev</span>}
                    startLabel={<span>Start</span>}
                    onPageChange={this.handlePageChange.bind(this)}
                />
                <h1>Simple Pagination</h1>
                <SimplePagination
                    current={current}
                    dataSize={dataSize}
                    sizePerPage={sizePerPage}
                    onPageChange={this.handlePageChange.bind(this)}
                />
            </div>
        )
    }
}