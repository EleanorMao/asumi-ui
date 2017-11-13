/**
 * Created by elly on 2017/4/18.
 */
export const basic = ``;

export const api = [{
    property: "type",
    type: "string",
    'default': "default",
    description: "Style of button. Options: default, text, danger, success, primary, secondary"
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
