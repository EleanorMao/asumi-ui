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
import Table from './Components/Table';
import Input from './Components/Input';
import Button from './Components/Button';
import Default from './Components/Default';
import Dropdown from './Components/Dropdown';
import Pagination from './Components/Pagination';

const router = [
    <Link to={'/'}>HOME</Link>,
    <Link to={'/tabs'}>TABS</Link>,
    <Link to={'/tree'}>TREE</Link>,
    <Link to={'/spin'}>SPIN</Link>,
    <Link to={'/table'}>TABLE</Link>,
    <Link to={'/input'}>INPUT</Link>,
    <Link to={'/modal'}>MODAL</Link>,
    <Link to={'/upload'}>UPLOAD</Link>,
    <Link to={'/select'}>SELECT</Link>,
    <Link to={'/button'}>BUTTON</Link>,
    <Link to={'/tooltip'}>TOOLTIP</Link>,
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
                <Route exact path="/" component={Default}/>
                <Route path="/input" component={Input}/>
                <Route path="/table" component={Table}/>
                <Route path="/button" component={Button}/>
                <Route path="/dropdown" component={Dropdown}/>
                <Route path="/pagination" component={Pagination}/>
            </div>
        </div>
    </Router>
    , document.getElementById('main')
);
