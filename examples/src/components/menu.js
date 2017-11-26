/**
 * Created by elly on 2017/4/7.
 */
import React, {Component} from 'react';
import {Menu, MenuItem, MenuItemGroup, SubMenu, Grid, Table, Col} from '../../../src';
import Panel from './panel';
import {basic, open, api, apiOfMenuItem, apiOfMenuItemGroup, apiOfSubMenu} from "../constants/menu";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="content">
                <h1>Menu 菜单</h1>
                <Panel
                    title="basic"
                    code={basic}
                >
                    <Menu>
                        <MenuItem>菜单项</MenuItem>
                        <SubMenu title="二级菜单">
                            <MenuItem>子菜单</MenuItem>
                            <MenuItem>子菜单</MenuItem>
                            <MenuItemGroup
                                title="菜单组"
                            >
                                <MenuItem>子菜单</MenuItem>
                                <MenuItem>子菜单</MenuItem>
                            </MenuItemGroup>
                        </SubMenu>
                        <MenuItemGroup
                            title="菜单组"
                        >
                            <MenuItem>菜单项</MenuItem>
                            <MenuItem>菜单项</MenuItem>
                        </MenuItemGroup>
                    </Menu>
                </Panel>
                <Panel
                    title="open"
                    code={open}
                >
                    <Grid.Row>
                        <Grid.Col col={6}>
                            <Menu openAll>
                                <MenuItem>菜单项</MenuItem>
                                <SubMenu title="二级菜单">
                                    <MenuItem>子菜单</MenuItem>
                                    <MenuItem>子菜单</MenuItem>
                                </SubMenu>
                                <SubMenu title="二级菜单">
                                    <MenuItem>子菜单</MenuItem>
                                    <MenuItem>子菜单</MenuItem>
                                </SubMenu>
                            </Menu>
                        </Grid.Col>
                        <Grid.Col col={6}>
                            <Menu openIds={[1]}>
                                <MenuItem id="0">菜单项</MenuItem>
                                <SubMenu title="二级菜单" id={1}>
                                    <MenuItem>子菜单</MenuItem>
                                    <MenuItem>子菜单</MenuItem>
                                </SubMenu>
                                <SubMenu title="二级菜单" id={2}>
                                    <MenuItem>子菜单</MenuItem>
                                    <MenuItem>子菜单</MenuItem>
                                </SubMenu>
                            </Menu>
                        </Grid.Col>
                    </Grid.Row>
                </Panel>
                <h1>Menu API</h1>
                <Table isKey="property" data={api} lineWrap="break">
                    <Col dataField="property">Property</Col>
                    <Col dataField="description">Description</Col>
                    <Col dataField="type">Type</Col>
                    <Col dataField="default">Default</Col>
                </Table>
                <h1>SubMenu API</h1>
                <Table isKey="property" data={apiOfSubMenu} lineWrap="break">
                    <Col dataField="property">Property</Col>
                    <Col dataField="description">Description</Col>
                    <Col dataField="type">Type</Col>
                    <Col dataField="default">Default</Col>
                </Table>
                <h1>MenuItem API</h1>
                <Table isKey="property" data={apiOfMenuItem} lineWrap="break">
                    <Col dataField="property">Property</Col>
                    <Col dataField="description">Description</Col>
                    <Col dataField="type">Type</Col>
                    <Col dataField="default">Default</Col>
                </Table>
                <h1>MenuItemGroup API</h1>
                <Table isKey="property" data={apiOfMenuItemGroup} lineWrap="break">
                    <Col dataField="property">Property</Col>
                    <Col dataField="description">Description</Col>
                    <Col dataField="type">Type</Col>
                    <Col dataField="default">Default</Col>
                </Table>
            </div>
        )
    }
}
