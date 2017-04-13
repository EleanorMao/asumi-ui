/**
 * Created by elly on 2017/4/13.
 */
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import FormItem from './FormItem';
import Button from '../Button';

export default  class Form extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {data, options, layout, title, className, submitText, onSubmit, children}= this.props;
        let _className = classnames('el-form', layout ? `el-${layout}` : null, className);
        return (
            <div className={_className}>
                {!!title && <div className="el-form-title">{title}</div>}
                {options.map((props, index)=> {
                    return <FormItem key={index} {...props} data={data[props.name]}/>
                })}
                {children}
                <FormItem>
                    <Button onClick={onSubmit}>{submitText}</Button>
                </FormItem>
            </div>
        )
    }
}

Form.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        rule: PropTypes.any,
        label: PropTypes.string,
        error: PropTypes.string,
        required: PropTypes.bool,
        config: PropTypes.object,
        tips: PropTypes.oneOf([
            PropTypes.string,
            PropTypes.shape({
                title: PropTypes.string,
                content: PropTypes.any
            })]),
        warning: PropTypes.string,
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['text', 'textarea', 'select', 'radio', 'checkbox', 'switch', 'uploader', 'radiogroup', 'checkboxgroup']),
    })),
    layout: PropTypes.oneOf(['horizontal', 'vertical', 'inline'])
};

Form.defaultProps = {
    id: "id",
    submitText: '提交',
    layout: "horizontal"
};