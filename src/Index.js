/**
 * Created by Elly on 2016/5/27.
 */

import './style/index.less';
import Nav from './Component/Nav';
import Tabs from './Component/Tabs';
import Group from './Component/Group';
import Input from './Component/Input';
import Modal from './Component/Modal';
import Table from './Component/Table';
import Col from './Component/Table/Col';
import Button from './Component/Button';
import Dropdown from './Component/Dropdown';
import Pagination from './Component/Pagination';
import TabPanel from './Component/Tabs/TabPanel';
import SimplePagination from './Component/Pagination/SimplePagination';

Table.Col = Col;
Tabs.TabPanel = TabPanel;
Pagination.Simple = SimplePagination;

export {
    Col,
    Nav,
    Tabs,
    Table,
    Modal,
    Input,
    Group,
    Button,
    TabPanel,
    Dropdown,
    Pagination,
    SimplePagination,
};