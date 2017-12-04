/**
 * Created by elly on 2017/4/5.
 * @producer: EleanorMao<danningmao@outlook.com><https://github.com/EleanorMao>
 * @ui-designer: EleanorMao<danningmao@outlook.com><https://github.com/EleanorMao>
 * @contributor: EleanorMao<danningmao@outlook.com><https://github.com/EleanorMao>
 * @contributor: BingZheng<https://github.com/beng07231>
 * @contributor: YangZhao<zhaoy_1992@163.com><https://github.com/WoolYang>
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, NavLink} from 'react-router-dom';

import '../../style/asumi-default-theme.css';
import './assets/public.less';
import {Menu, SubMenu, MenuItem} from '../../src';

import Tag from './components/tag';
import Form from './components/form';
import Home from './components/home';
import Tabs from './components/tabs';
import Grid from './components/grid';
import Table from './components/table';
import Radio from './components/radio';
import Modal from './components/modal';
import Input from './components/input';
import MenuPage from './components/menu';
import Select from './components/select';
import Header from './components/header';
import Editor from './components/editor';
import Button from './components/button';
import Upload from './components/upload';
import Animate from './components/animate';
import Loading from './components/loading';
import Popover from './components/popover';
import Message from './components/message';
import Tooltip from './components/tooltip';
import Checkbox from './components/checkbox';
import Dropdown from './components/dropdown';
import DateTime from './components/datetime';
import Transfer from './components/transfer';
import Pagination from './components/pagination';
import NumberInput from './components/numberInput';
import TagInput from './components/tagInput';

const router = [
    <NavLink to={'/'} activeClassName="">HOME</NavLink>,
    {
        title: 'BASIC',
        children: [
            <NavLink to={'/grid'} activeClassName="active">Grid</NavLink>,
            <NavLink to={'/button'} activeClassName="active">Button</NavLink>
        ]
    },
    {
        title: 'FORM',
        children: [
            <NavLink to={'/input'} activeClassName="active">Input</NavLink>,
            <NavLink to={'/numberinput'} activeClassName="active">Number Input</NavLink>,
            <NavLink to={'/taginput'} activeClassName="active">Tag Input</NavLink>,
            <NavLink to={'/select'} activeClassName="active">Select</NavLink>,
            <NavLink to={'/radio'} activeClassName="active">Radio</NavLink>,
            <NavLink to={'/checkbox'} activeClassName="active">Checkbox</NavLink>,
            <NavLink to={'/upload'} activeClassName="active">Upload</NavLink>,
            <NavLink to={'/datetime'} activeClassName="active">Datetime</NavLink>,
            <NavLink to={'/transfer'} activeClassName="active">Transfer</NavLink>,
            <NavLink to={'/editor'} activeClassName="active">Editor</NavLink>,
            <NavLink to={'/form'} activeClassName="active">Form</NavLink>,
        ]
    },
    {
        title: 'DISPLAY',
        children: [
            <NavLink to={'/tag'} activeClassName="active">Tag</NavLink>,
            <NavLink to={'/table'} activeClassName="active">Table</NavLink>,
            <NavLink to={'/pagination'} activeClassName="active">Pagination</NavLink>,
        ]
    },
    {
        title: 'MESSAGE',
        children: [
            <NavLink to={'/tooltip'} activeClassName="active">Tooltip</NavLink>,
            <NavLink to={'/popover'} activeClassName="active">Popover</NavLink>,
            <NavLink to={'/message'} activeClassName="active">Message</NavLink>
        ]
    },
    {
        title: 'NAVIGATION',
        children: [
            <NavLink to={'/dropdown'} activeClassName="active">Dropdown</NavLink>,
            <NavLink to={'/tabs'} activeClassName="active">Tabs</NavLink>,
            <NavLink to={'/menu'} activeClassName="active">Menu</NavLink>,
        ]
    },
    {
        title: 'OTHERS',
        children: [
            <NavLink to={'/modal'} activeClassName="active">Modal</NavLink>,
            <NavLink to={'/animate'} activeClassName="active">Animate</NavLink>,
            <NavLink to={'/Loading'} activeClassName="active">Loading</NavLink>,
        ]
    }
];

ReactDOM.render(
    <Router basename={app.basename}>
        <div>
            <Header/>
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
            <div style={{marginLeft: 200, marginTop: 60}}>
                <Route exact path="/" component={Home}/>
                <Route path="/tag" component={Tag}/>
                <Route path="/tabs" component={Tabs}/>
                <Route path="/grid" component={Grid}/>
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
                <Route path="/upload" component={Upload}/>
                <Route path="/menu" component={MenuPage}/>
                <Route path="/checkbox" component={Checkbox}/>
                <Route path="/dropdown" component={Dropdown}/>
                <Route path="/numberinput" component={NumberInput}/>
                <Route path="/pagination" component={Pagination}/>
                <Route path="/datetime" component={DateTime}/>
                <Route path="/transfer" component={Transfer}/>
                <Route path="/taginput" component={TagInput}/>
            </div>
        </div>
    </Router>
    , document.getElementById('main')
);
