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
import Select from './Component/Select';
import Loading from './Component/Loading';
import Popover from './Component/Popover';
import Checkbox from './Component/Checkbox';
import Dropdown from './Component/Dropdown';
import Option from './Component/Select/Option';
import Pagination from './Component/Pagination';
import TabPanel from './Component/Tabs/TabPanel';
import RadioGroup from './Component/Group/RadioGroup';
import CheckboxGroup from './Component/Group/CheckGroup';
import SimplePagination from './Component/Pagination/SimplePagination';

const Tooltip = Popover;

Table.Col = Col;
Select.Option = Option;
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
    Select,
    Button,
    Option,
    Loading,
    Popover,
    Tooltip,
    TabPanel,
    Dropdown,
    Checkbox,
    Pagination,
    RadioGroup,
    CheckboxGroup,
    SimplePagination,
};