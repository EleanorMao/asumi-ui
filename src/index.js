/**
 * Created by Elly on 2016/5/27.
 * Copyright 2016 EleanorMao

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @producer: EleanorMao<danningmao@outlook.com><https://github.com/EleanorMao>
 * @ui-designer: EleanorMao<danningmao@outlook.com><https://github.com/EleanorMao>
 * @contributor: EleanorMao<danningmao@outlook.com><https://github.com/EleanorMao>
 * @contributor: BingZheng<https://github.com/beng07231>
 * @contributor: YangZhao<zhaoy_1992@163.com><https://github.com/WoolYang>
 *
 */

import Menu             from './component/menu';
import SubMenu          from './component/menu/subMenu';
import MenuItem         from './component/menu/menuItem';
import MenuItemGroup    from './component/menu/menuItemGroup';
import Tag              from './component/tag';
import Grid             from './component/grid';
import Form             from './component/form';
import Tabs             from './component/tabs';
import Radio            from './component/radio';
import Group            from './component/group';
import Input            from './component/input';
import Modal            from './component/modal';
import Table            from './component/table';
import Col              from './component/table/col';
import Editor           from './component/editor';
import Button           from './component/button';
import Select           from './component/select';
import Upload           from './component/upload';
import Loading          from './component/loading';
import Popover          from './component/popover';
import Message          from './component/message';
import Animate          from './component/animate';
import Checkbox         from './component/checkbox';
import Dropdown         from './component/dropdown';
import Option           from './component/select/option';
import Pagination       from './component/pagination';
import FormItem         from './component/form/formItem';
import TabPanel         from './component/tabs/tabPanel';
import NumberInput      from './component/numberInput';
import RadioGroup       from './component/radio/radioGroup';
import CheckboxGroup    from './component/checkbox/checkGroup';
import SimplePagination from './component/pagination/simplePagination';
import DateTime         from './component/datetime';
import Transfer         from './component/transfer';
import TagInput         from './component/tagInput';
import Icon             from './component/icon';

const Tooltip = Popover;

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
    Icon,
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
    NumberInput,
    CheckboxGroup,
    MenuItemGroup,
    SimplePagination,
    TagInput,
    Transfer
};