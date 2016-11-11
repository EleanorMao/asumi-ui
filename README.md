#EL-TABLE
    form Ellie-Component _(┐「ε:)_❤

## Usage
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {Table, Col} from 'el-table';

const list = [{
    id: 1,
    name: 'Eleanor',
    sex: 'female'
}, {
    id: 2,
    name: 'Alexander',
    sex: 'male'
}];

ReactDOM.render(
<Table data={list} isKey="id">
    <Col dataField="id">id</Col>
    <Col dataField="name">name</Col>
    <Col dataField="sex">sex</Col>
</Table>, document.getElementById('#app'));

```

## api
### Table
* **data[Array]**   data you want display on table
* **isKey[String]** key of column(required)
* **remote[Boolean]** if set `true` , which means you want to handle data change, `el-table` will give control of `onPageChange`, `onSortChange`, `sortName`, `sortOrder` to parent component
* **dataSize[Number]** total size of data, only useful when remote `enabled`
* **sortOrder[String]** sort order, `asc` or `desc`
* **sortName[String]** sort field in table
* **onSortChange[Function(sortName, sortOrder)]** sort function, `sortOrder` will be `asc` or `desc`
* **topPagination[Boolean]** default is `false`, set `true` to enable pagination in top
* **pagination[Boolean]** default is `false`, set `true` to enable pagination in bottom
* **options[Object]** configuration of pagination
    * **page[Number]** means the page you want to show as default
    * **prevLabel[String | Number | Node]** customize previous page button
    * **nextLabel[String | Number | Node]** customize next page button
    * **startLabel[String | Number | Node]** customize page button of back to first page
    * **endLabel[String | Number | Node]** customize page button of back to last page
    * **sizePerPage[Number]** size per page, default is `10`
    * **paginationSize[Number]** pagination bar length, default is `6`
    * **showTotalPages[Boolean]** default id `true`, whether show total pages or not
    * **onPageChange[Function(page, sizePerPage)]** callback when page changed
    * **paginationShowsTotal[Boolean | Function(start, to , total)]** display a text that the total number and current lines displayed, default is `false`
* **selectRow[Object]** configuration of row selection (be sure `isTree` is `false`）
    * **mode['none', 'radio', 'checkbox']** type of selector, default is `none`
    * **bgColor[String]** background color of tag `tr` when selected
    * **selected[Array]** selected row keys
    * **hideSelectColumn[Boolean]** hide select column or not default is `false`
    * **onSelect[Function(isSelected, row)]** callback when select
    * **onSelectAll[Function(isSelected, data)]** callback when select all
* **noDataText[String | Number | Node]** default is `暂无数据`, text show when there is no data
* **lineWrap[ellipsis || break]** default is `ellipsis`
* **striped[Boolean]** default is `false`
* **hover[Boolean]** default is `true`
* **hoverStyle[Object]** default is `{backgroundColor: '#f4f5f9'}`, will effect tag `tr`
* **width[Number | String]** width
* **height[Number | String]** height
* **title[Function(data) | String | Number | Node]** table title
* **footer[Function(data) | String | Number | Node]** table footer
* **nestedHead[Array]** nestedHead([[],[]]), `string` or `{label: '', colspan: 1, rowspan: 1}`

### Col
* **dataField[String]** key of column
* **dataAlign[String]** text align of column
* **dataFixed[String]** this column will be fixed when table scroll, `left`, `right` or `auto`, default is `auto`
* **dataSort[Boolean]** enable table sorting, default is `false`(only sort the first level of data when isTree)
* **dataFormat[Function(cell, level, row, index, col)]** customize format function
* **render[Function(rowIndex)]** render function to set `colspan` and `rowspan` attribute for `tr`, it's return an object `{rowspan: value, colspan: value}`. value = 0 means don't render this cell
* **colSpan[Number]** set attribute `colspan` to table head column
* **hidden[Boolean]** hide this column or not, default is `false`
* **width[Number | String]** width of column

### Pagination
* **current[Number]** current page, default 1
* **dataSize[Number]** total size of data
* **sizePerPage[Number]** size per page, default is `10`
* **paginationSize[Number]** pagination bar length, default is `6`
* **hideEndLabel[Number]** default id `false`, whether show end label or not
* **hideStartLabel[Number]** default id `false`, whether show start label or not
* **showTotalPages[Number]** default id `true`, whether show total pages or not
* **prevLabel[String | Number | Node]** customize previous page button
* **nextLabel[String | Number | Node]** customize next page button
* **startLabel[String | Number | Node]** customize page button of back to first page
* **endLabel[String | Number | Node]** customize page button of back to last page

### SimplePagination
* **current[Number]** current page, default 1
* **dataSize[Number]** total size of data
* **sizePerPage[Number]** size per page, default is `10`
* **showTotalPages[Number]** default id `true`, whether show total pages or not
* **prevLabel[String | Number | Node]** customize previous page button
* **nextLabel[String | Number | Node]** customize next page button

### Dropdown
* **list[Array]** list of dropdown menus ,like: `[1, 2 ,3, 4]`, or `[{href: '/', label: 'index'}]`
* **children[Array]** content of dropdown button
* **onClick[Function(node)]**  invoke when click menu items
