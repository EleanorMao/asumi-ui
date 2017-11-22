/**
 * Created by elly on 2017/4/5.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import '../../style/index.less';
import './assets/public.less';
import { Menu, SubMenu, MenuItem } from '../../src';

import Form from './components/form';
import Home from './components/home';
import Tag from './components/tag';
import Tabs from './components/tabs';
import Grid from './components/grid';
import Table from './components/table';
import Radio from './components/radio';
import Modal from './components/modal';
import Input from './components/input';
import Select from './components/select';
import Header from './components/header';
import Editor from './components/editor';
import Button from './components/button';
import Animate from './components/animate';
import Loading from './components/loading';
import Popover from './components/popover';
import Message from './components/message';
import Tooltip from './components/tooltip';
import Upload from './components/upload';
import Checkbox from './components/checkbox';
import Dropdown from './components/dropdown';
import Pagination from './components/pagination';
import DateTime from './components/datetime';

const router = [
    <NavLink to={'/'} activeClassName="">HOME</NavLink>,
    {
        title: 'Basic',
        children: [
            <NavLink to={'/grid'} activeClassName="active">GRID</NavLink>,
            <NavLink to={'/button'} activeClassName="active">BUTTON</NavLink>
        ]
    },
    {
        title: 'Form',
        children: [
            <NavLink to={'/input'} activeClassName="active">INPUT</NavLink>,
            <NavLink to={'/select'} activeClassName="active">SELECT</NavLink>,
            <NavLink to={'/radio'} activeClassName="active">RADIO</NavLink>,
            <NavLink to={'/checkbox'} activeClassName="active">CHECKBOX</NavLink>,
            <NavLink to={'/upload'} activeClassName="active">UPLOAD</NavLink>,
            <NavLink to={'/form'} activeClassName="active">FORM</NavLink>,
            <NavLink to={'/datetime'} activeClassName="active">DATETIME</NavLink>
        ]
    },
    {
        title: 'Display',
        children: [
            <NavLink to={'/tag'} activeClassName="active">TAG</NavLink>,
            <NavLink to={'/table'} activeClassName="active">TABLE</NavLink>,
            <NavLink to={'/editor'} activeClassName="active">EDITOR</NavLink>,
            <NavLink to={'/pagination'} activeClassName="active">PAGINATION</NavLink>,
        ]
    },
    {
        title: 'Message',
        children: [
            <NavLink to={'/tooltip'} activeClassName="active">TOOLTIP</NavLink>,
            <NavLink to={'/popover'} activeClassName="active">POPOVER</NavLink>,
            <NavLink to={'/message'} activeClassName="active">MESSAGE</NavLink>
        ]
    },
    {
        title: 'Navigation',
        children: [
            <NavLink to={'/dropdown'} activeClassName="active">DROPDOWN</NavLink>,
            <NavLink to={'/tabs'} activeClassName="active">TABS</NavLink>,
            <NavLink to={'/menu'} activeClassName="active">MENU</NavLink>,
        ]
    },
    {
        title: 'Others',
        children: [
            <NavLink to={'/modal'} activeClassName="active">MODAL</NavLink>,
            <NavLink to={'/animate'} activeClassName="active">ANIMATE</NavLink>,
            <NavLink to={'/Loading'} activeClassName="active">LOADING</NavLink>,
        ]
    },
    <NavLink to={'/calendar'} activeClassName="active">CALENDAR</NavLink>
];

ReactDOM.render(
    <Router>
        <div>
            <Header />
            <Menu
                openAll
                style={{
                    top: 0,
                    bottom: 0,
                    width: 200,
                    marginTop: 60,
                    position: 'fixed',
                    overflowY: 'auto'
                }}
            >
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
            <div style={{ marginLeft: 200, marginTop: 60 }}>
                <Route exact path="/" component={Home} />
                <Route path="/tabs" component={Tabs} />
                <Route path="/grid" component={Grid} />
                <Route path="/form" component={Form} />
                <Route path="/input" component={Input} />
                <Route path="/radio" component={Radio} />
                <Route path="/table" component={Table} />
                <Route path="/modal" component={Modal} />
                <Route path="/editor" component={Editor} />
                <Route path="/select" component={Select} />
                <Route path="/button" component={Button} />
                <Route path="/animate" component={Animate} />
                <Route path="/loading" component={Loading} />
                <Route path="/message" component={Message} />
                <Route path="/popover" component={Popover} />
                <Route path="/tooltip" component={Tooltip} />
                <Route path="/upload" component={Upload} />
                <Route path="/checkbox" component={Checkbox} />
                <Route path="/dropdown" component={Dropdown} />
                <Route path="/pagination" component={Pagination} />
                <Route path="/datetime" component={DateTime} />
            </div>
        </div>
    </Router>
    , document.getElementById('main')
);
