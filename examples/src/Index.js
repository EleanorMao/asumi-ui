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

import {Nav} from '../../src';
import Form from './Components/Form';
import Tabs from './Components/Tabs';
import Table from './Components/Table';
import Radio from './Components/Radio';
import Modal from './Components/Modal';
import Input from './Components/Input';
import Select from './Components/Select';
import Button from './Components/Button';
import Loading from './Components/Loading';
import Popover from './Components/Popover';
import Tooltip from './Components/Tooltip';
import Checkbox from './Components/Checkbox';
import Dropdown from './Components/Dropdown';
import Pagination from './Components/Pagination';

const router = [
    <Link to={'/'}>HOME</Link>,
    <Link to={'/tabs'}>TABS</Link>,
    <Link to={'/tree'}>TREE</Link>,
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
                <Route path="/input" component={Input}/>
                <Route path="/radio" component={Radio}/>
                <Route path="/modal" component={Modal}/>
                <Route path="/table" component={Table}/>
                <Route path="/select" component={Select}/>
                <Route path="/button" component={Button}/>
                <Route path="/loading" component={Loading}/>
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
