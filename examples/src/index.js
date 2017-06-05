/**
 * Created by elly on 2017/4/5.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import '../../style/index.less';
import {Menu, SubMenu, MenuItem} from '../../lib';
import Form from './components/form';
import Tabs from './components/tabs';
import Table from './components/table';
import Radio from './components/radio';
import Modal from './components/modal';
import Input from './components/input';
import Select from './components/select';
import Editor from './components/editor';
import Button from './components/button';
import Animate from './components/animate';
import Loading from './components/loading';
import Popover from './components/popover';
import Message from './components/message';
import Tooltip from './components/tooltip';
import Checkbox from './components/checkbox';
import Dropdown from './components/dropdown';
import Pagination from './components/pagination';

const router = [
    <Link to={'/'}>HOME</Link>,
    {
        title: 'Basic',
        children: [
            <Link to={'/grid'}>Grid</Link>,
            <Link to={'/button'}>BUTTON</Link>
        ]
    },
    {
        title: 'Form',
        children: [
            <Link to={'/input'}>INPUT</Link>,
            <Link to={'/select'}>SELECT</Link>,
            <Link to={'/radio'}>RADIO</Link>,
            <Link to={'/checkbox'}>CHECKBOX</Link>,
            <Link to={'/upload'}>UPLOAD</Link>,
            <Link to={'/form'}>FORM</Link>
        ]
    },
    {
        title: 'Display',
        children: [
            <Link to={'/table'}>TABLE</Link>,
            <Link to={'/editor'}>EDITOR</Link>,
            <Link to={'/pagination'}>PAGINATION</Link>,
        ]
    },
    {
        title: 'Message',
        children: [
            <Link to={'/tooltip'}>TOOLTIP</Link>,
            <Link to={'/popover'}>POPOVER</Link>,
            <Link to={'/message'}>MESSAGE</Link>
        ]
    },
    {
        title: 'Navigation',
        children: [
            <Link to={'/dropdown'}>DROPDOWN</Link>,
            <Link to={'/tabs'}>TABS</Link>,
            <Link to={'/menu'}>MENU</Link>,
        ]
    },
    {
        title: 'Others',
        children: [
            <Link to={'/modal'}>MODAL</Link>,
            <Link to={'/animate'}>ANIMATE</Link>,
            <Link to={'/Loading'}>LOADING</Link>,
        ]
    },
    <Link to={'/calendar'}>CALENDAR</Link>
];

ReactDOM.render(
    <Router>
        <div>
            <Menu
                openAll
                style={{width: 200, position: 'absolute', top: 0, bottom: 0}}>
                {router.map((item, index) => {
                    if (item.children) {
                        return (
                            <SubMenu
                                key={item.title}
                                title={<span>{item.title}</span>}>
                                {item.children.map((r, i) => {
                                    return <MenuItem key={item.title + i}>{r}</MenuItem>;
                                })}
                            </SubMenu>
                        )
                    } else {
                        return (
                            <MenuItem key={index}>{item}</MenuItem>
                        )
                    }
                })}
            </Menu>
            <div style={{marginLeft: 200}}>
                <Route exact path="/" component={() => {
                    return (
                        <h1>喵</h1>
                    )
                }}/>
                <Route path="/tabs" component={Tabs}/>
                <Route path="/form" component={Form}/>
                <Route path="/input" component={Input}/>
                <Route path="/radio" component={Radio}/>
                <Route path="/table" component={Table}/>
                <Route path="/modal" component={Modal}/>
                <Route path="/editor" component={Editor}/>
                <Route path="/select" component={Select}/>
                <Route path="/button" component={Button}/>
                <Route path="/animate" component={Animate}/>
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
