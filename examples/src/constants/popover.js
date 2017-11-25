/**
 * Created by elly on 2017/4/18.
 */
export const basic = `import {Tooltip, Button} from 'asumi';

let style = {marginLeft: 10};
ReactDOM.render(
<div>
    <Tooltip title="tooltip" content="left">
        <Button type="primary" style={style}>left</Button>
    </Tooltip>
    <Tooltip title="tooltip" content="right" placement="right">
        <Button type="primary" style={style}>right</Button>
    </Tooltip>
    <Tooltip title="tooltip" content="top" placement="top">
        <Button type="primary" style={style}>top</Button>
    </Tooltip>
    <Tooltip title="tooltip" content="bottom" placement="bottom">
        <Button type="primary" style={style}>bottom</Button>
    </Tooltip>
</div>, div)`;

export const trigger = `import {Tooltip, Button} from 'asumi';

let style = {marginLeft: 10};
ReactDOM.render(
<div>
     <Tooltip title="tooltip" content="trigger click" trigger="click">
        <Button type="secondary" style={style}>trigger by click</Button>
    </Tooltip>
    <Tooltip title="tooltip" trigger="click" content="hideTrigger click" hideTrigger="click">
        <Button type="secondary" style={style}>hide trigger by click</Button>
    </Tooltip>
</div>, div)`;

export const api = [{
    property: "title",
    type: "any",
    'default': "",
    description: "tooltip title"
}, {
    property: "content",
    type: "any",
    'default': "",
    description: "tooltip content"
}, {
    property: "placement",
    type: "string",
    'default': "left",
    description: "The position of the tooltip relative to the target. Options: top, bottom, left, right"
}, {
    property: "trigger",
    type: "string",
    'default': "hover",
    description: "trigger mode. Options: hover, click"
}, {
    property: "hideTrigger",
    type: "string",
    'default': "hover",
    description: "trigger mode. Options: hover, click"
}, {
    property: "style",
    type: "object",
    'default': "",
    description: "tooltip style"
}];
