/**
 * Created by elly on 2017/4/5.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import '../../src/style/index.less';

import {Nav} from '../../src';
import Form from './components/form';
import Tabs from './components/tabs';
import Table from './components/table';
import Radio from './components/radio';
import Modal from './components/modal';
import Input from './components/input';
import Select from './components/select';
import Button from './components/button';
import Loading from './components/loading';
import Popover from './components/popover';
import Message from './components/message';
import Tooltip from './components/tooltip';
import Checkbox from './components/checkbox';
import Dropdown from './components/dropdown';
import Pagination from './components/pagination';

const router = [
    <Link to={'/'}>HOME</Link>,
    <Link to={'/tabs'}>TABS</Link>,
    <Link to={'/tree'}>TREE</Link>,
    <Link to={'/form'}>FORM</Link>,
    <Link to={'/table'}>TABLE</Link>,
    <Link to={'/input'}>INPUT</Link>,
    <Link to={'/radio'}>RADIO</Link>,
    <Link to={'/modal'}>MODAL</Link>,
    <Link to={'/upload'}>UPLOAD</Link>,
    <Link to={'/select'}>SELECT</Link>,
    <Link to={'/button'}>BUTTON</Link>,
    <Link to={'/Loading'}>LOADING</Link>,
    <Link to={'/tooltip'}>TOOLTIP</Link>,
    <Link to={'/popover'}>POPOVER</Link>,
    <Link to={'/message'}>MESSAGE</Link>,
    <Link to={'/checkbox'}>CHECKBOX</Link>,
    <Link to={'/dropdown'}>DROPDOWN</Link>,
    <Link to={'/calendar'}>CALENDAR</Link>,
    <Link to={'/pagination'}>PAGINATION</Link>,
];
ReactDOM.render(
    <Router>
        <div>
            <Nav router={router} style={{float: 'left', width: 200}}/>
            <div style={{overflow: 'hidden'}}>
                <Route exact path="/" component={()=> {
                    return (
                        <div>
                            <h1>Global</h1>
                            <div>
                                <Button/>
                            </div>
                            <h1>Form</h1>
                            <div>
                                <Input/>
                                <Select/>
                                <Radio/>
                                <Checkbox/>
                                <Form/>
                            </div>
                            <h1>Display</h1>
                            <div>
                                <Tooltip/>
                                <Popover/>
                                <Table/>
                                <Pagination/>
                            </div>
                            <h1>Navigation</h1>
                            <div>
                                <Dropdown/>
                                <Tabs/>
                            </div>
                            <h1>Others</h1>
                            <div>
                                <Modal/>
                                <Loading/>
                            </div>
                        </div>
                    )
                }}/>
                <Route path="/tabs" component={Tabs}/>
                <Route path="/form" component={Form}/>
                <Route path="/input" component={Input}/>
                <Route path="/radio" component={Radio}/>
                <Route path="/modal" component={Modal}/>
                <Route path="/table" component={Table}/>
                <Route path="/select" component={Select}/>
                <Route path="/button" component={Button}/>
                <Route path="/loading" component={Loading}/>
                <Route path="/message" component={Message}/>
                <Route path="/popover" component={Popover}/>
                <Route path="/tooltip" component={Tooltip}/>
                <Route path="/checkbox" component={Checkbox}/>
                <Route path="/dropdown" component={Dropdown}/>
                <Route path="/pagination" component={Pagination}/>
            </div>
        </div>
    </Router>
    , document.getElementById('main')
);
