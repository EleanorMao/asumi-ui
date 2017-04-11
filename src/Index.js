/**
 * Created by Elly on 2016/5/27.
 */

import './style/index.less';
import Nav from './Component/Nav';
import Tabs from './Component/Tabs';
import Radio from './Component/Radio';
import Group from './Component/Group';
import Input from './Component/Input';
import Modal from './Component/Modal';
import Table from './Component/Table';
import Col from './Component/Table/Col';
import Button from './Component/Button';
import Loading from './Component/Loading';
import Tooltip from './Component/Tooltip';
import Checkbox from './Component/Checkbox';
import Dropdown from './Component/Dropdown';
import Pagination from './Component/Pagination';
import TabPanel from './Component/Tabs/TabPanel';
import RadioGroup from './Component/Group/RadioGroup';
import CheckboxGroup from './Component/Group/CheckGroup';
import {PopoverWrap as Popover} from './Component/Tooltip';
import SimplePagination from './Component/Pagination/SimplePagination';

Table.Col = Col;
Tabs.TabPanel = TabPanel;
Radio.Group = RadioGroup;
Checkbox.Group = CheckboxGroup;
Pagination.Simple = SimplePagination;

export {
    Col,
    Nav,
    Tabs,
    Table,
    Modal,
    Input,
    Group,
    Radio,
    Button,
    Tooltip,
    Loading,
    Popover,
    TabPanel,
    Dropdown,
    Checkbox,
    Pagination,
    RadioGroup,
    CheckboxGroup,
    SimplePagination,
};