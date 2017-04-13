/**
 * Created by Elly on 2016/5/27.
 */

import Nav from './component/nav';
import Form from './component/form';
import Tabs from './component/tabs';
import Radio from './component/radio';
import Group from './component/group';
import Input from './component/input';
import Modal from './component/modal';
import Table from './component/table';
import Col from './component/table/col';
import Button from './component/button';
import Select from './component/select';
import Loading from './component/loading';
import Popover from './component/popover';
import Checkbox from './component/checkbox';
import Dropdown from './component/dropdown';
import Option from './component/select/option';
import Pagination from './component/pagination';
import TabPanel from './component/tabs/tabPanel';
import RadioGroup from './component/group/radioGroup';
import CheckboxGroup from './component/group/checkGroup';
import SimplePagination from './component/pagination/simplePagination';

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
    Form,
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