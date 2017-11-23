/**
 * Created by elly on 2017/4/18.
 */
export const basic = `import {Group, Button} from 'asumi';

ReactDOM.render(
<div>
    <Group>
        <Button>default</Button>
        <Button type="secondary">secondary</Button>
        <Button type="warning">warning</Button>
        <Button type="primary">primary</Button>
        <Button type="danger">danger</Button>
        <Button type="error">error</Button>
        <Button type="success">success</Button>
        <Button disabled>disabled</Button>
        <Button type="text">text</Button>
    </Group>
</div>, div)`;

export const link = `import {Group, Button} from 'asumi';

ReactDOM.render(
<div>
    <Group>
        <Button href="/">default</Button> //拥有href属性的Button将作为link button使用
        <Button href="/" type="secondary">secondary</Button>
        <Button href="/" type="warning">warning</Button>
        <Button href="/" type="primary">primary</Button>
        <Button href="/" type="danger">danger</Button>
        <Button href="/" type="error">error</Button>
        <Button href="/" type="success">success</Button>
        <Button href="/" disabled>disabled</Button>
        <Button href="/" type="text">text</Button>
    </Group>
</div>, div)`;

export const size = `import {Group, Button} from 'asumi';

ReactDOM.render(
<div>
    <Group size="large">
        <Button>default large</Button>
        <Button type="secondary">secondary large</Button>
        <Button type="warning">warning large</Button>
        <Button type="primary">primary large</Button>
        <Button type="danger">danger large</Button>
        <Button type="error">error large</Button>
        <Button type="success">success large</Button>
        <Button disabled>disabled large</Button>
        <Button type="text">text large</Button>
    </Group>
    <Group>
        <Button >default default</Button>
        <Button type="secondary">secondary default</Button>
        <Button type="warning">warning default</Button>
        <Button type="primary">primary default</Button>
        <Button type="danger">danger default</Button>
        <Button type="error">error default</Button>
        <Button type="success">success default</Button>
        <Button disabled>disabled default</Button>
        <Button type="text">text default</Button>
    </Group>
    <Group size="small">
        <Button >default small</Button>
        <Button type="secondary">secondary small</Button>
        <Button type="warning">warning small</Button>
        <Button type="primary">primary small</Button>
        <Button type="danger">danger small</Button>
        <Button type="error">error small</Button>
        <Button type="success">success small</Button>
        <Button disabled>disabled small</Button>
        <Button type="text">text small</Button>
    </Group>
</div>, div)`;

export const api = [{
    property: "type",
    type: "string",
    'default': "default",
    description: "Style of button. Options: default, text, danger, success, primary, secondary, warning, error."
}, {
    property: "size",
    type: "string",
    'default': "default",
    description: "Size of button. Options: small, default, large"
}, {
    property: "href",
    type: "string",
    'default': "null",
    description: "Href of button. Trigger a link button"
}, {
    property: "disabled",
    type: "boolean",
    'default': "null",
    description: "Disable button"
}, {
    property: "submit",
    type: "boolean",
    'default': "null",
    description: "Define a button that submits the form"
}, {
    property: "reset",
    type: "boolean",
    'default': "null",
    description: "Define a button that resets the contents of the form to default values"
}, {
    property: "onClick",
    type: "function",
    'default': "null",
    description: "Callback when click button"
}, {
    property: "...others",
    type: "",
    'default': "",
    description: "Other property can work on a \<button\> \/ \<a\> tag"
}];
