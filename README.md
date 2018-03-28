# ASUMI

## HOMEPAGE
[homepage](http://chashaobao.net/asumi-ui)

## USAGE
```javascript
    import React from 'react';
    import ReactDOM from 'react-dom';
    import { Button } from 'asumi';
    import 'asumi/style/index.less';
    //import 'asumi/style/asumi-default-theme.css';
```
```html
    <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"/>
```

## ICON
asumi icons use <a href="http://fontawesome.io/">Font Awesome</a>

## Component
* [x] Grid
* [x] Button
* [x] Tag
* [x] Tab
* [x] Input
* [x] NumberInput
* [x] TagInput
* [x] Select
* [x] Radio
* [x] Checkbox
* [x] Switch
* [x] RadioGroup
* [x] CheckboxGroup
* [x] Markdown Editor
* [x] Upload
* [x] DateTime
* [x] Form
* [x] FormIem
* [x] Table
* [x] Pagination
* [x] Tooltip
* [x] Popover
* [x] Message
* [x] Modal
* [x] Dropdown
* [x] Menu
* [x] MenuItem
* [x] MenuItemGroup
* [x] SubMenu
* [x] Animate
* [x] Loading
* [x] Transfer

## Theme
default font-size is **13px**.
you can change it by change **@fontSize**.
and 

```less
@danger: #F75A36;
@l_danger: lighten(@danger, 30%);
@d_danger: darken(@danger, 4%);

@default: #F5F5F5;
@l_default: lighten(@default, 2%);
@d_default: darken(@default, 4%);

@primary: #53B6FF;
@l_primary: lighten(@primary, 30%);
@d_primary: darken(@primary, 8%);

@success: #7AD57D;
@l_success: lighten(@success, 30%);
@d_success: darken(@success, 4%);

@secondary: #FFCD36;
@l_secondary: lighten(@secondary, 35%);
@d_secondary: darken(@secondary, 4%);

@disabled: #BDBDBD;
@l_disabled: lighten(@disabled, 20%);

@border: #E0E0E0;
@shadow: rgba(0, 0, 0, .2);

@normalText: #333;
@midText: #777;
@lightText: #CCC;
@disabledText: #ECECEC;

@fontSize: 13px;
@borderRadio: 4px;
@smallBorderRadio: 2px;

@editor: #EFF2F7;
@previewColor: #1f2d3d;
```

you can change theme color if you want!

