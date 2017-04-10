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
import Tabs from './Components/Tabs';
import Table from './Components/Table';
import Radio from './Components/Radio';
import Modal from './Components/Modal';
import Input from './Components/Input';
import Button from './Components/Button';
import Popover from './Components/Popover';
import Tooltip from './Components/Tooltip';
import Checkbox from './Components/Checkbox';
import Dropdown from './Components/Dropdown';
import Pagination from './Components/Pagination';

const router = [
    <Link to={'/'}>HOME</Link>,
    <Link to={'/tabs'}>TABS</Link>,
    <Link to={'/tree'}>TREE</Link>,
    <Link to={'/spin'}>SPIN</Link>,
    <Link to={'/table'}>TABLE</Link>,
    <Link to={'/input'}>INPUT</Link>,
    <Link to={'/radio'}>RADIO</Link>,
    <Link to={'/modal'}>MODAL</Link>,
    <Link to={'/upload'}>UPLOAD</Link>,
    <Link to={'/select'}>SELECT</Link>,
    <Link to={'/button'}>BUTTON</Link>,
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
            <Nav router={router} style={{float: 'left', width: 100}}/>
            <div style={{overflow: 'hidden'}}>
                <Route exact path="/" component={()=> {
                    return (
                        <div>
                            <Button/>
                            <Dropdown/>
                            <Modal/>
                            <Input/>
                            <Tooltip/>
                            <Popover/>
                            <Tabs/>
                            <Table/>
                            <Pagination/>
                        </div>
                    )
                }}/>
                <Route path="/tabs" component={Tabs}/>
                <Route path="/input" component={Input}/>
                <Route path="/radio" component={Radio}/>
                <Route path="/modal" component={Modal}/>
                <Route path="/table" component={Table}/>
                <Route path="/button" component={Button}/>
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
