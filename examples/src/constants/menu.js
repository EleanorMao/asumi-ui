/**
 * Created by elly on 2017/4/18.
 */
export const basic = `import {Menu, MenuItem, MenuItemGroup, SubMenu} from 'asumi';

ReactDOM.render(
<div>
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
</div>, div)`;

export const open = `import {Menu, MenuItem, MenuItemGroup, SubMenu, Grid, Table, Col} from 'asumi';

ReactDOM.render(
<div>
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
</div>, div)`;

export const api = [{
    property: "width",
    type: "string | number",
    'default': "220",
    description: "menu width"
}, {
    property: "style",
    type: "object",
    'default': "",
    description: "menu style"
}, {
    property: "className",
    type: "string",
    'default': "",
    description: "menu class name"
}, {
    property: "openAll",
    type: "bool",
    'default': "false",
    description: "open all menu"
}, {
    property: "openIds",
    type: "array",
    'default': "[]",
    description: "the ids of opened menu item"
}];

export const apiOfMenuItem = [{
    property: "id",
    type: "string | number",
    'default': "",
    description: "id of menu item"
}];

export const apiOfSubMenu = [{
    property: "id",
    type: "string | number",
    'default': "",
    description: "id of menu item"
}, {
    property: "title",
    type: "any",
    'default': "",
    description: "menu item title"
}, {
    property: "openAll",
    type: "bool",
    'default': "false",
    description: "open all menu"
}, {
    property: "openIds",
    type: "array",
    'default': "[]",
    description: "the ids of opened menu item"
}];

export const apiOfMenuItemGroup = [{
    property: "id",
    type: "string | number",
    'default': "",
    description: "id of menu item"
}, {
    property: "title",
    type: "any",
    'default': "",
    description: "menu item title"
}];