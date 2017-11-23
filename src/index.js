/**
 * Created by Elly on 2016/5/27.
 */

import Menu from './component/menu';
import SubMenu from './component/menu/subMenu';
import MenuItem from './component/menu/menuItem';
import MenuItemGroup from './component/menu/menuItemGroup';
import Tag from './component/tag';
import Grid from './component/grid';
import Form from './component/form';
import Tabs from './component/tabs';
import Radio from './component/radio';
import Group from './component/group';
import Input from './component/input';
import Modal from './component/modal';
import Table from './component/table';
import Editor from './component/editor';
import Col from './component/table/col';
import Button from './component/button';
import Select from './component/select';
import Loading from './component/loading';
import Popover from './component/popover';
import Message from './component/message';
import Animate from './component/animate';
import Upload from './component/upload';
import Checkbox from './component/checkbox';
import Dropdown from './component/dropdown';
import Option from './component/select/option';
import Pagination from './component/pagination';
import FormItem from './component/form/formItem';
import TabPanel from './component/tabs/tabPanel';
import RadioGroup from './component/radio/radioGroup';
import CheckboxGroup from './component/checkbox/checkGroup';
import SimplePagination from './component/pagination/simplePagination';
import DateTime from './component/datetime';

const Tooltip = Popover;

Table.Col = Col;

Select.Option = Option;

Tabs.TabPanel = TabPanel;

Menu.SubMenu = SubMenu;
Menu.MenuItem = MenuItem;
Menu.MenuItemGroup = MenuItemGroup;

Radio.Group = RadioGroup;
Checkbox.Group = CheckboxGroup;

Form.FormItem = FormItem;

Pagination.Simple = SimplePagination;

export {
    Col,
    Tag,
    Tabs,
    Menu,
    Form,
    Grid,
    Table,
    Modal,
    Input,
    Group,
    Radio,
    Select,
    Button,
    Upload,
    Option,
    Editor,
    SubMenu,
    Animate,
    Loading,
    Popover,
    Message,
    Tooltip,
    FormItem,
    MenuItem,
    TabPanel,
    Dropdown,
    Checkbox,
    DateTime,
    Pagination,
    RadioGroup,
    CheckboxGroup,
    MenuItemGroup,
    SimplePagination,
};