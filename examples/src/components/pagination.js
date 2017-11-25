/**
 * Created by elly on 2017/4/5.
 */
import React, {Component} from 'react';
import {
    Pagination,
    SimplePagination,
    Table, Col
} from '../../../src';
import Panel from './panel';
import {
    api,
    basic,
    simple,
    paginationSize,
    showTotalPages,
    customersButton,
    hideButton,
    apiOfSimple
} from "../constants/pagination";

export default class Main extends Component {
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
                <h1>Pagination 分页器</h1>
                <Panel
                    title="basic"
                    code={basic}
                >
                    <Pagination
                        current={current}
                        dataSize={dataSize}
                        sizePerPage={sizePerPage}
                        onPageChange={this.handlePageChange.bind(this)}
                    />
                </Panel>
                <Panel
                    title="pagination size"
                    code={paginationSize}
                >
                    <Pagination
                        current={current}
                        paginationSize={5}
                        dataSize={dataSize}
                        sizePerPage={sizePerPage}
                        onPageChange={this.handlePageChange.bind(this)}
                    />
                </Panel>
                <Panel
                    title="without total pages"
                    code={showTotalPages}
                >
                    <Pagination
                        current={current}
                        dataSize={dataSize}
                        showTotalPages={false}
                        sizePerPage={sizePerPage}
                        onPageChange={this.handlePageChange.bind(this)}
                    />
                </Panel>
                <Panel
                    title="hide button"
                    code={hideButton}
                >
                    <Pagination
                        hideEndLabel
                        hideStartLabel
                        current={current}
                        dataSize={dataSize}
                        showTotalPages={false}
                        sizePerPage={sizePerPage}
                        onPageChange={this.handlePageChange.bind(this)}
                    />
                </Panel>
                <Panel
                    title="customers button"
                    code={customersButton}
                >
                    <Pagination
                        current={current}
                        dataSize={dataSize}
                        showTotalPages={false}
                        sizePerPage={sizePerPage}
                        prevLabel={<span className="fa fa-angle-left"/>}
                        nextLabel={<span className="fa fa-angle-right"/>}
                        endLabel={<span className="fa fa-angle-double-right"/>}
                        startLabel={<span className="fa fa-angle-double-left"/>}
                        onPageChange={this.handlePageChange.bind(this)}
                    />
                </Panel>
                <Panel
                    title="simple"
                    code={simple}
                >
                    <SimplePagination
                        current={current}
                        dataSize={dataSize}
                        sizePerPage={sizePerPage}
                        onPageChange={this.handlePageChange.bind(this)}
                    />
                    <SimplePagination
                        current={current}
                        dataSize={dataSize}
                        showTotalPages={false}
                        sizePerPage={sizePerPage}
                        onPageChange={this.handlePageChange.bind(this)}
                    />
                    <SimplePagination
                        current={current}
                        dataSize={dataSize}
                        sizePerPage={sizePerPage}
                        prevLabel={<span className="fa fa-angle-left"/>}
                        nextLabel={<span className="fa fa-angle-right"/>}
                        onPageChange={this.handlePageChange.bind(this)}
                    />
                </Panel>
                <h1>API</h1>
                <Table isKey="property" data={api} lineWrap="break">
                    <Col dataField="property">Property</Col>
                    <Col dataField="description">Description</Col>
                    <Col dataField="type">Type</Col>
                    <Col dataField="default">Default</Col>
                </Table>
                <h1>API of SimplePagination</h1>
                <Table isKey="property" data={apiOfSimple} lineWrap="break">
                    <Col dataField="property">Property</Col>
                    <Col dataField="description">Description</Col>
                    <Col dataField="type">Type</Col>
                    <Col dataField="default">Default</Col>
                </Table>
            </div>
        )
    }
}