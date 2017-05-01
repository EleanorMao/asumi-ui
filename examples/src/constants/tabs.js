/**
 * Created by elly on 2017/4/18.
 */
export const basic = `import {Tabs, TabPanel} from 'elui';
// or Const TabPanel = Tabs.TabPanel;

ReactDOM.render(
<div>
    <Tabs defaultActiveKey="1">
        <TabPanel label="Tab1" key="1">Tab1</TabPanel>
        <TabPanel label="Tab2" key="2">Tab2</TabPanel>
    </Tabs>
</div>, div)`;

export const card = `import {Tabs, TabPanel} from 'elui';
// or Const TabPanel = Tabs.TabPanel;

ReactDOM.render(
<div>
     <Tabs defaultActiveKey="1"  type="card">
        <TabPanel label="Tab1" key="1">Tab1</TabPanel>
        <TabPanel label="Tab2" key="2">Tab2</TabPanel>
    </Tabs>
</div>, div)`;

export const api = [{
    property: "type",
    type: "string",
    'default': "null",
    description: "Style of tabs. Options: default(or line), card"
}, {
    property: "defaultActiveKey",
    type: "string | number",
    'default': "first child's key",
    description: "Default actived key of TabPanel"
}, {
    property: "onClick",
    type: "function(key)",
    'default': "null",
    description: "Callback when click tab head"
}];

export const apiOfTabPanel = [{
    property: "label",
    type: "string",
    'default': "null",
    description: "TabPanel's title"
}, {
    property: "key",
    type: "string | number",
    'default': "null",
    description: "TabPanel's key"
}];