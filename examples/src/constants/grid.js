/**
 * Created by elly on 2017/4/18.
 */
export const basic = `import {Grid} from 'asumi';

colRender(col) {
    let arr = new Array(24 / col).fill(col);
    return arr.map((item, index) => {
        return (
            <Grid.Col col={item} key={item + '-' + index}>
                <div className="grid-content">col-{item}</div>
            </Grid.Col>
        );
    });
}
    
ReactDOM.render(
<div>
    <Grid.Row>
                        <Grid.Col col="24">
                            <div className="grid-content">col-24</div>
                        </Grid.Col>
                        {this.colRender(12)}
                        {this.colRender(8)}
                        {this.colRender(6)}
                        <Grid.Col col="5">
                            <div className="grid-content">col-5</div>
                        </Grid.Col>
                        <Grid.Col col="7">
                            <div className="grid-content">col-7</div>
                        </Grid.Col>
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
</div>, div)`;

export const offset = `import {Grid} from 'asumi';

ReactDOM.render(
<div>
    <Grid.Row>
        <Grid.Col col="8">
            <div className="grid-content">col-8</div>
        </Grid.Col>
        <Grid.Col col="8" offset="8">
            <div className="grid-content">col-8 offset-8</div>
        </Grid.Col>
    </Grid.Row>
    <Grid.Row>
        <Grid.Col col="12" offset="6">
            <div className="grid-content">col-12 offset-6</div>
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
    'default': "24",
    description: "Number of column the grid spans"
}, {
    property: "offset",
    type: "string|number",
    'default': "",
    description: "Number of cells to the left of the grid spacing"
}, {
    property: "inline",
    type: "bool",
    'default': "",
    description: "Set `inline` to `true`, while make col `float: none, display: inline-block`,"
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