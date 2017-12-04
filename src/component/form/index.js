/**
 * Created by elly on 2017/4/13.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FormItem from './formItem';
import Button from '../button';
import {noop, extend, isArr, getType} from "../util";

function isRequired({validate, required}) {
    return required || (validate && validate.some(item => {
        return item.trigger !== "submit" && item.required;
    }));
}

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            disabledName: "",
            beforeSubmit: false
        }
    }

    componentDidMount() {
        let {data, options} = this.props;
        this.validator(data, options)
    }

    componentWillReceiveProps({data, options}) {
        this.validator(data, options)
    }

    validator(data, options) {
        if (!options) return;
        let disabledIndex = -1;
        let _disabledIndex = -1;
        let state = this.state;
        let disabled = options.some((item, index) => {
            if (!~_disabledIndex && state.disabled && state.disabledName && item.name === state.disabledName) {
                _disabledIndex = index;
            }
            let value = data[item.name];
            if (isRequired(item) && (value == null || value === "" || (getType(value) === "array" && value.length === 0))) {
                disabledIndex = index;
                return true;
            }
        });
        if (disabled) {
            this.handleDisabled(options[disabledIndex], true);
        } else if (~_disabledIndex) {
            this.handleDisabled(options[_disabledIndex], false);
        }
    }

    handleDisabled(props, _disabled) {
        let {disabled, disabledName} = this.state;
        if (props.name === disabledName && _disabled != disabled) {
            this.setState({disabled: _disabled});
        } else if (_disabled && props.name !== disabledName) {
            this.setState({disabled: _disabled, disabledName: props.name});
        }
    }

    handleChange({name, type, off}, e) {
        if (this.props.onChange) {
            if (type === "switch" && !e.checked) {
                extend(e, {name, type, value: off, originName: e.name, originValue: e.value});
            } else {
                extend(e, {name, type, originName: e.name, originValue: e.value});
            }
            this.props.onChange(e);
        }
    }

    handleSubmit(_disabled) {
        let loading = this.state.loading;
        let {validator, onSubmit, preventMultipleSubmit} = this.props;
        if (preventMultipleSubmit && loading) return;
        this.setState({beforeSubmit: true}, () => {
            if (_disabled) {
            } else {
                let disabled = validator && validator();
                if (disabled) {
                    this.setState({disabled: true})
                } else {
                    let cb = preventMultipleSubmit ? () => {
                        this.setState({loading: false});
                    } : noop();
                    onSubmit && onSubmit(cb);
                }
            }
            this.setState({beforeSubmit: false});
        })
    }

    render() {
        let {
            data, options, colNum, error, requiredMark, colon, disabled, labelWidth,
            hideSubmitButton, layout, title, className, submitText, name, submitItems,
            submitButtonProps, children, style, encType, action, method, autoComplete,
            target, noValidate, acceptCharset
        } = this.props; //哎..这么写自己都看着烦啊，但是我就是控制不了我叽己啊
        let col = colNum ? Math.ceil(12 / colNum) : 0;
        let _disabled = this.state.disabled || disabled || submitButtonProps.disabled;
        let _className = classnames('el-form', layout ? `el-${layout}` : null, col ? 'el-grid-row' : null, className);
        let renderChildren = isArr(children) ? children : [children];
        return (
            <form className={_className} style={style} encType={encType}
                  action={action} method={method} autoComplete={autoComplete}
                  name={name} target={target} noValidate={noValidate} acceptCharset={acceptCharset}>
                {!!title && <div className="el-form-title">{title}</div>}
                {options.map((props, index) => {
                    return (
                        <FormItem
                            onChange={this.handleChange.bind(this, props)}
                            requiredMark={requiredMark}
                            labelWidth={labelWidth}
                            colon={colon}
                            {...props}
                            col={col}
                            key={index}
                            value={data[props.name]}
                            beforeSubmit={this.state.beforeSubmit}
                            validator={this.handleDisabled.bind(this, props)}
                        />)
                })}
                {React.Children.map(renderChildren, (elm, index) => {
                    if (elm && elm.type && elm.type._component_name === "FormItem") {
                        let props = elm.props;
                        let newProps = {
                            col: col,
                            value: data[props.name],
                            beforeSubmit: this.state.beforeSubmit,
                            validator: this.handleDisabled.bind(this, props)
                        };
                        if (!props.onChange) {
                            newProps.onChange = this.handleChange.bind(this, props)
                        }
                        if (typeof props.colon !== "boolean") {
                            newProps.colon = colon;
                        }
                        if (props.requiredMark == null) {
                            newProps.requiredMark = requiredMark;
                        }
                        if (typeof props.labelWidth !== "number" && typeof props.labelWidth !== "string") {
                            newProps.labelWidth = labelWidth;
                        }
                        return React.cloneElement(elm, newProps)
                    } else if (elm) {
                        return React.cloneElement(elm, {key: index});
                    }
                })}
                <FormItem labelWidth={labelWidth}>
                    {!hideSubmitButton &&
                    <Button
                        {...submitButtonProps}
                        disabled={_disabled}
                        onClick={this.handleSubmit.bind(this, _disabled)}
                        type={_disabled ? null : submitButtonProps.type || "success"}
                    >{submitText}</Button>}{submitItems}
                    {!!error && <div className="el-form-error">{error}</div>}
                </FormItem>
            </form>
        )
    }
}

Form.propTypes = {
    colon: PropTypes.bool,
    name: PropTypes.string,
    error: PropTypes.string,
    action: PropTypes.string,
    method: PropTypes.string,
    target: PropTypes.string,
    colNum: PropTypes.number,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    encType: PropTypes.string,
    validator: PropTypes.func,
    submitText: PropTypes.any,
    submitItems: PropTypes.any,
    requiredMark: PropTypes.any,
    novalidate: PropTypes.string,
    id: PropTypes.string.isRequired,
    hideSubmitButton: PropTypes.bool,
    data: PropTypes.object.isRequired,
    submitButtonProps: PropTypes.object,
    preventMultipleSubmit: PropTypes.bool,
    labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    options: PropTypes.arrayOf(PropTypes.shape({
        colon: PropTypes.bool,
        label: PropTypes.string,
        required: PropTypes.bool,
        onChange: PropTypes.func,
        colSpan: PropTypes.number,
        name: PropTypes.string,
        dataFormat: PropTypes.func,
        labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        tips: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                title: PropTypes.string,
                content: PropTypes.any
            })]),
        validateType: PropTypes.oneOf(['error', 'warning']),
        validate: PropTypes.arrayOf(PropTypes.shape({
            maxLength: PropTypes.any,
            minLength: PropTypes.any,
            length: PropTypes.number,
            instance: PropTypes.any,
            required: PropTypes.bool,
            validator: PropTypes.func,
            message: PropTypes.string,
            pattern: PropTypes.instanceOf(RegExp),
            min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            trigger: PropTypes.oneOf(['blur', 'change', 'submit']),
            rule: PropTypes.oneOf(['color', 'price', 'nature', 'positiveInt']),
            type: PropTypes.oneOf(['boolean', 'array', 'string', 'object', 'number', 'moment']),
        })),
        type: PropTypes.oneOf(['text', 'color', 'password', 'datetime', 'number', 'static', 'component', 'textarea', 'select', 'checkbox', 'radio', 'switch', 'upload', 'radiogroup', 'checkgroup', 'checkboxgroup', 'transfer', 'taginput']),
    })),
    layout: PropTypes.oneOf(['horizontal', 'vertical', 'inline']),
};

Form.defaultProps = {
    id: "id",
    options: [],
    onChange: noop,
    submitText: '提交',
    layout: "horizontal",
    submitButtonProps: {}
};
