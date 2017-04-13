/**
 * Created by elly on 2017/4/13.
 */
import React, {Component, PropTypes} from 'react';
import Input from '../input';
import Radio from '../radio';
import Select from '../select';
import Checkbox from '../checkbox';
import Option from '../select/option';

export default  class FormItem extends Component {
    constructor(props) {
        super(props);
    }

    itemRender() {
        let {name, data, type, config, onChange, children} = this.props;
        if (children)return;
        let output = null;
        switch (type) {
            case "text":
                output = <Input {...config} name={name} value={data} onChange={onChange}/>;
                break;
            case "textarea":
                output = <Input {...config} type="textarea" name={name} value={data} onChange={onChange}/>;
                break;
            case "select":
                output = (
                    <Select name={name} value={data} onChange={onChange}>
                        {config.options.map(item=> {
                            return (
                                <Option key={item.value} {...item}/>
                            )
                        })}
                    </Select>
                );
                break;
            case "radio":
                output = ( <Radio
                    name={name}
                    onChange={onChange}
                    value={config.value}
                    checked={typeof data === "boolean" ? data : config.value === data}
                />);
                break;
            case "checkbox":
                output = (
                    <Checkbox
                        name={name}
                        onChange={onChange}
                        value={config.value}
                        checked={typeof data === "boolean" ? data : config.value === data}
                    />
                );
                break;
            default:
                break;
        }
        return output;
    }

    render() {
        let {label, required, children} = this.props;
        return (
            <div className="el-form-item">
                {required && <span className="el-required">*</span>}
                {!!label && <label className="el-form-label">{label}:&nbsp;&nbsp;</label>}
                {children}
                {this.itemRender()}
            </div>
        )
    }
}

FormItem.propTypes = {};

FormItem.defaultProps = {};