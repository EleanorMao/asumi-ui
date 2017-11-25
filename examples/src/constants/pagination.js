/**
 * Created by elly on 2017/4/18.
 */
export const basic = `import {Pagination} from 'asumi';

class Foo extends React.Component {
    constructor(){
        super();
        this.state = {
            current: 1,    
            dataSize: 100,
            sizePerPage: 6
        }
    }
    
    handlePageChange(current, sizePerPage) {
        this.setState({current, sizePerPage});
    }
    
    render(){
        let {current, dataSize, sizePerPage} = this.state;
        return (
            <Pagination
                current={current}
                dataSize={dataSize}
                sizePerPage={sizePerPage}
                onPageChange={this.handlePageChange.bind(this)}
            />
        )
    }
}
`;

export const paginationSize = `import {Pagination} from 'asumi';

class Foo extends React.Component {
    constructor(){
        super();
        this.state = {
            current: 1,    
            dataSize: 100,
            sizePerPage: 6
        }
    }
    
    handlePageChange(current, sizePerPage) {
        this.setState({current, sizePerPage});
    }
    
    render(){
        let {current, dataSize, sizePerPage} = this.state;
        return (
            <Pagination
               current={current}
                paginationSize={5}
                dataSize={dataSize}
                sizePerPage={sizePerPage}
                onPageChange={this.handlePageChange.bind(this)}
            />
        )
    }
}
`;

export const showTotalPages = `import {Pagination} from 'asumi';

class Foo extends React.Component {
    constructor(){
        super();
        this.state = {
            current: 1,    
            dataSize: 100,
            sizePerPage: 6
        }
    }
    
    handlePageChange(current, sizePerPage) {
        this.setState({current, sizePerPage});
    }
    
    render(){
        let {current, dataSize, sizePerPage} = this.state;
        return (
            <Pagination
                current={current}
                dataSize={dataSize}
                showTotalPages={false}
                sizePerPage={sizePerPage}
                onPageChange={this.handlePageChange.bind(this)}
            />
        )
    }
}
`;

export const hideButton = `import {Pagination} from 'asumi';

class Foo extends React.Component {
    constructor(){
        super();
        this.state = {
            current: 1,    
            dataSize: 100,
            sizePerPage: 6
        }
    }
    
    handlePageChange(current, sizePerPage) {
        this.setState({current, sizePerPage});
    }
    
    render(){
        let {current, dataSize, sizePerPage} = this.state;
        return (
            <Pagination
                hideEndLabel
                hideStartLabel
                current={current}
                dataSize={dataSize}
                showTotalPages={false}
                sizePerPage={sizePerPage}
                onPageChange={this.handlePageChange.bind(this)}
            />
        )
    }
}
`;

export const customersButton = `import {Pagination} from 'asumi';

class Foo extends React.Component {
    constructor(){
        super();
        this.state = {
            current: 1,    
            dataSize: 100,
            sizePerPage: 6
        }
    }
    
    handlePageChange(current, sizePerPage) {
        this.setState({current, sizePerPage});
    }
    
    render(){
        let {current, dataSize, sizePerPage} = this.state;
        return (
            <Pagination
                current={current}
                dataSize={dataSize}
                showTotalPages={false}
                sizePerPage={sizePerPage}
                prevLabel={<span className="fa fa-angle-left"/>}
                nextLabel={<span className="fa fa-angle-right"/>}
                endLabel={<span className="fa fa-angle-double-right"/>}
                startLabel={<span className="fa fa-angle-double-left"/>}
                onPageChange={this.handlePageChange.bind(this)}
            />
        )
    }
}
`;

export const simple = `import {SimplePagination} from 'asumi';

class Foo extends React.Component {
    constructor(){
        super();
        this.state = {
            current: 1,    
            dataSize: 100,
            sizePerPage: 6
        }
    }
    
    handlePageChange(current, sizePerPage) {
        this.setState({current, sizePerPage});
    }
    
    render(){
        let {current, dataSize, sizePerPage} = this.state;
        return (
            <div>
                <SimplePagination
                    current={current}
                    dataSize={dataSize}
                    sizePerPage={sizePerPage}
                    onPageChange={this.handlePageChange.bind(this)}
                />
                <SimplePagination
                    current={current}
                    dataSize={dataSize}
                    showTotalPages={false}
                    sizePerPage={sizePerPage}
                    onPageChange={this.handlePageChange.bind(this)}
                />
                <SimplePagination
                    current={current}
                    dataSize={dataSize}
                    sizePerPage={sizePerPage}
                    prevLabel={<span className="fa fa-angle-left"/>}
                    nextLabel={<span className="fa fa-angle-right"/>}
                    onPageChange={this.handlePageChange.bind(this)}
                />
            </div>
        )
    }
}
`;

export const api = [{
    property: "current",
    type: "number",
    'default': "1",
    description: "define current page"
}, {
    property: "dataSize",
    type: "number",
    'default': "0",
    description: "data size"
}, {
    property: "sizePerPage",
    type: "number",
    'default': "10",
    description: "size per page"
}, {
    property: "paginationSize",
    type: "number",
    'default': "6",
    description: "pagination bar length"
}, {
    property: "showTotalPages",
    type: "number",
    'default': "6",
    description: "display a text that the total number"
}, {
    property: "onPageChange",
    type: "func",
    'default': "(page, sizePerPage)=>{}",
    description: "callback when page changed"
}, {
    property: "hideEndLabel",
    type: "bool",
    'default': "false",
    description: "whether hide end page button"
}, {
    property: "hideStartLabel",
    type: "bool",
    'default': "false",
    description: "whether hide start page button"
}, {
    property: "startLabel",
    type: "any",
    'default': "首页",
    description: "customize page button of back to first page"
}, {
    property: "prevLabel",
    type: "any",
    'default': "<span><span className=\"el-caret el-left\"/>上一页</span>",
    description: "customize previous page button"
}, {
    property: "nextLabel",
    type: "any",
    'default': "<span>下一页<span className=\"el-caret el-right\"/></span>",
    description: "customize next page button"
}, {
    property: "endLabel",
    type: "any",
    'default': "尾页",
    description: "customize page button of back to last page"
}];


export const apiOfSimple = [{
    property: "current",
    type: "number",
    'default': "1",
    description: "define current page"
}, {
    property: "dataSize",
    type: "number",
    'default': "0",
    description: "data size"
}, {
    property: "sizePerPage",
    type: "number",
    'default': "10",
    description: "size per page"
}, {
    property: "showTotalPages",
    type: "number",
    'default': "6",
    description: "display a text that the total number"
}, {
    property: "onPageChange",
    type: "func",
    'default': "(page, sizePerPage)=>{}",
    description: "callback when page changed"
}, {
    property: "prevLabel",
    type: "any",
    'default': "<span><span className=\"el-caret el-left\"/>上一页</span>",
    description: "customize previous page button"
}, {
    property: "nextLabel",
    type: "any",
    'default': "<span>下一页<span className=\"el-caret el-right\"/></span>",
    description: "customize next page button"
}];