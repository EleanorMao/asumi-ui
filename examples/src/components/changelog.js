/**
 * Created by elly on 2017/4/7.
 */
import React, {Component} from 'react';
import {Icon}             from '../../../src';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="content home">
                <h1>Change Log</h1>
                <h2>0.1.3</h2>
                <ul className="fa-ul">
                    <li><Icon type="check" li/>修改Grid.Row为24栅格，并增加gutter参数修改栅格间距</li>
                    <li><Icon type="check" li/>Grid.Row增加flex类型，并增加align和justify参数控制对齐模式</li>
                    <li><Icon type="check" li/>Grid.Col增加order参数，在flex模式下可控制排序</li>
                    <li><Icon type="check" li/>Input增加autoSize参数，在textarea模式下可随输入调整高度</li>
                    <li><Icon type="check" li/>Select修复当Option的value为空时，选不中的问题</li>
                    <li><Icon type="check" li/>Datetime修复点击图标打不开日历问题</li>
                    <li><Icon type="check" li/>Dropdown增加placement参数，可控制下拉菜单出现位置</li>
                    <li><Icon type="check" li/>Table优化算法</li>
                    <li><Icon type="check" li/>Form增加preventDefault参数，阻止表单提交的默认事件</li>
                    <li><Icon type="check" li/>FormItem增加hidden类型，设为hidden后不计入validete计算，并隐藏</li>
                </ul>
            </div>
        );
    }
}
