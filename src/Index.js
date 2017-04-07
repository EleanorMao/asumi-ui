/**
 * Created by Elly on 2016/5/27.
 */

import './style/index.less';
import Nav from './Component/Nav';
import Input from './Component/Input';
import Table from './Component/Table';
import Col from './Component/Table/Col';
import Button from './Component/Button';
import Group from './Component/Group';
import Dropdown from './Component/Dropdown';
import Pagination from './Component/Pagination';
import SimplePagination from './Component/Pagination/SimplePagination';

Table.Col = Col;
Pagination.Simple = SimplePagination;

export {
    Col,
    Nav,
    Table,
    Input,
    Group,
    Button,
    Dropdown,
    Pagination,
    SimplePagination,
};