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

export const apiOfSimple = [{
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