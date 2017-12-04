/**
 * Created by elly on 2017/4/18.
 */
export const basic = `import {Tabs, TabPanel} from 'asumi';
// or Const TabPanel = Tabs.TabPanel;

ReactDOM.render(
<div>
    <Tabs activeId="1">
        <TabPanel label="Tab1" id="1">Tab1</TabPanel>
        <TabPanel label="Tab2" id="2">Tab2</TabPanel>
    </Tabs>
</div>, div)`;

export const card = `import {Tabs, TabPanel} from 'asumi';
// or Const TabPanel = Tabs.TabPanel;

ReactDOM.render(
<div>
     <Tabs activeId="1"  type="card">
        <TabPanel label="Tab1" id="1">Tab1</TabPanel>
        <TabPanel label="Tab2" id="2">Tab2</TabPanel>
    </Tabs>
</div>, div)`;

export const api = [{
    property: "type",
    type: "string",
    'default': "null",
    description: "Style of tabs. Options: default(or line), card"
}, {
    property: "activeId",
    type: "string | number",
    'default': "first child's id",
    description: "Default actived id of TabPanel"
}, {
    property: "onClick",
    type: "function(id)",
    'default': "null",
    description: "Callback when click tab head"
}];

export const apiOfTabPanel = [{
    property: "label",
    type: "string",
    'default': "null",
    description: "TabPanel's title"
}, {
    property: "id",
    type: "string | number",
    'default': "null",
    description: "TabPanel's id"
}];