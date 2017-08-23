/**
 * Created by elly on 2017/4/5.
 */
import React, {Component} from 'react';
import {Grid, Table, Col} from '../../../src';
import Panel from './panel';
import {basic, offset, apiofrow, apiofcol} from '../constants/grid';

export default class Main extends Component {
    constructor(props) {
        super(props);
    }

    colRender(col) {
        let arr = new Array(12 / col).fill(col);
        return arr.map((item, index) => {
            return (
                <Grid.Col col={item} key={item + '-' + index}>
                    <div className="grid-content">col-{item}</div>
                </Grid.Col>
            )
        })
    }

    render() {
        return (
            <div className="content">
                <h1>栅格布局</h1>
                <Panel
                    title="Basic"
                    code={basic}
                >
                    <Grid.Row>
                        <Grid.Col col="12">
                            <div className="grid-content">col-12</div>
                        </Grid.Col>
                        {this.colRender(6)}
                        <Grid.Col col="5">
                            <div className="grid-content">col-5</div>
                        </Grid.Col>
                        <Grid.Col col="7">
                            <div className="grid-content">col-7</div>
                        </Grid.Col>
                        {this.colRender(4)}
                        {this.colRender(3)}
                        {this.colRender(2)}
                        {this.colRender(1)}
                    </Grid.Row>
                </Panel>
                <Panel
                    title="Offset"
                    code={offset}
                >
                    <Grid.Row>
                        <Grid.Col col="4">
                            <div className="grid-content">col-4</div>
                        </Grid.Col>
                        <Grid.Col col="4" offset="4">
                            <div className="grid-content">col-4 offset-4</div>
                        </Grid.Col>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Col col="6" offset="3">
                            <div className="grid-content">col-6 offset-3</div>
                        </Grid.Col>
                    </Grid.Row>
                </Panel>
                <h1>API of Grid.Row</h1>
                <Table isKey="property" data={apiofrow} lineWrap="break">
                    <Col dataField="property">Property</Col>
                    <Col dataField="description">Description</Col>
                    <Col dataField="type">Type</Col>
                    <Col dataField="default">Default</Col>
                </Table>
                <h1>API of Grid.Col</h1>
                <Table isKey="property" data={apiofcol} lineWrap="break">
                    <Col dataField="property">Property</Col>
                    <Col dataField="description">Description</Col>
                    <Col dataField="type">Type</Col>
                    <Col dataField="default">Default</Col>
                </Table>
            </div>
        )
    }
}