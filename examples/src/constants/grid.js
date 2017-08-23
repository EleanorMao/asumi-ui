/**
 * Created by elly on 2017/4/18.
 */
export const basic = `import {Grid} from 'el-ui';

ReactDOM.render(
<div>
    <Grid.Row>
        <Grid.Col col="12">
            <div className="grid-content">col-12</div>
        </Grid.Col>
        <Grid.Col col="6">
            <div className="grid-content">col-6</div>
        </Grid.Col>
        <Grid.Col col="6">
            <div className="grid-content">col-6</div>
        </Grid.Col>
        <Grid.Col col="5">
            <div className="grid-content">col-5</div>
        </Grid.Col>
        <Grid.Col col="7">
            <div className="grid-content">col-7</div>
        </Grid.Col>
        <Grid.Col col="4">
            <div className="grid-content">col-4</div>
        </Grid.Col>
        <Grid.Col col="4">
            <div className="grid-content">col-4</div>
        </Grid.Col>
        <Grid.Col col="4">
            <div className="grid-content">col-4</div>
        </Grid.Col>
        <Grid.Col col="3">
            <div className="grid-content">col-3</div>
        </Grid.Col>
        <Grid.Col col="3">
            <div className="grid-content">col-3</div>
        </Grid.Col>
        <Grid.Col col="3">
            <div className="grid-content">col-3</div>
        </Grid.Col>
        <Grid.Col col="3">
            <div className="grid-content">col-3</div>
        </Grid.Col>
        <Grid.Col col="2">
            <div className="grid-content">col-2</div>
        </Grid.Col>
        <Grid.Col col="2">
            <div className="grid-content">col-2</div>
        </Grid.Col>
        <Grid.Col col="2">
            <div className="grid-content">col-2</div>
        </Grid.Col>
        <Grid.Col col="2">
            <div className="grid-content">col-2</div>
        </Grid.Col>
        <Grid.Col col="2">
            <div className="grid-content">col-2</div>
        </Grid.Col>
        <Grid.Col col="2">
            <div className="grid-content">col-2</div>
        </Grid.Col>
        <Grid.Col col="1">
            <div className="grid-content">col-1</div>
        </Grid.Col>
         <Grid.Col col="1">
            <div className="grid-content">col-1</div>
        </Grid.Col>
         <Grid.Col col="1">
            <div className="grid-content">col-1</div>
        </Grid.Col>
         <Grid.Col col="1">
            <div className="grid-content">col-1</div>
        </Grid.Col>
         <Grid.Col col="1">
            <div className="grid-content">col-1</div>
        </Grid.Col>
         <Grid.Col col="1">
            <div className="grid-content">col-1</div>
        </Grid.Col>
         <Grid.Col col="1">
            <div className="grid-content">col-1</div>
        </Grid.Col>
         <Grid.Col col="1">
            <div className="grid-content">col-1</div>
        </Grid.Col>
         <Grid.Col col="1">
            <div className="grid-content">col-1</div>
        </Grid.Col>
         <Grid.Col col="1">
            <div className="grid-content">col-1</div>
        </Grid.Col>
         <Grid.Col col="1">
            <div className="grid-content">col-1</div>
        </Grid.Col>
         <Grid.Col col="1">
            <div className="grid-content">col-1</div>
        </Grid.Col>
    </Grid.Row>
</div>, div)`;

export const offset = `import {Grid} from 'el-ui';

ReactDOM.render(
<div>
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
</div>, div)`;


export const apiofrow = [{
    property: "className",
    type: "string",
    'default': "",
    description: "ClassName of row"
}, {
    property: "style",
    type: "object",
    'default': "",
    description: "Style of row"
}, {
    property: "children",
    type: "any",
    'default': "",
    description: ""
}];

export const apiofcol = [{
    property: "col",
    type: "string|number",
    'default': "12",
    description: "Number of column the grid spans"
}, {
    property: "offset",
    type: "string|number",
    'default': "",
    description: "Number of cells to the left of the grid spacing"
}, {
    property: "className",
    type: "string",
    'default': "",
    description: "ClassName of col"
}, {
    property: "style",
    type: "object",
    'default': "",
    description: "Style of col"
}, {
    property: "children",
    type: "any",
    'default': "",
    description: ""
}];