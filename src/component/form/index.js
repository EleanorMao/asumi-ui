/**
 * Created by elly on 2017/4/13.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FormItem from './formItem';
import Button from '../button';
import {noop, extend} from "../util";

function isRequired({validate, required}) {
    return required || (validate && validate.some(item => {
        return item.required;
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
            if (isRequired(item) && (data[item.name] == null || data[item.name] === "")) {
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
                this.props.onChange(e);
            } else {
                extend(e, {name, type, originName: e.name, originValue: e.value});
                this.props.onChange(e);
            }
        }
    }

    handleSubmit(_disabled) {
        let {validator, onSubmit} = this.props;
        this.setState({beforeSubmit: true}, () => {
            if (_disabled) {
            } else {
                let disabled = validator && validator();
                if (disabled) {
                    this.setState({disabled: true})
                } else {
                    onSubmit && onSubmit();
                }
            }
            this.setState({beforeSubmit: false});
        })
    }

    render() {
        let {data, options, colNum, error, colon, disabled, style, labelWidth, hideSubmitButton, layout, title, className, submitText, submitItems, submitButtonOptions, children} = this.props;
        let col = colNum ? Math.ceil(12 / colNum) : 0;
        let _disabled = this.state.disabled || disabled;
        let _className = classnames('el-form', layout ? `el-${layout}` : null, col ? 'el-grid-row' : null, className);
        let _children = React.Children.toArray(children);
        return (
            <form className={_className} style={style}>
                {!!title && <div className="el-form-title">{title}</div>}
                {options.map((props, index) => {
                    return (
                        <FormItem
                            onChange={this.handleChange.bind(this, props)}
                            labelWidth={labelWidth}
                            colon={colon}
                            {...props}
                            col={col}
                            key={index}
                            data={data[props.name]}
                            required={isRequired(props)}
                            beforeSubmit={this.state.beforeSubmit}
                            validator={this.handleDisabled.bind(this, props)}
                        />)
                })}
                {React.Children.map(_children, (elm, index) => {
                    if (elm && elm.type && elm.type.name === "FormItem") {
                        let props = extend({
                            colon: colon,
                            labelWidth: labelWidth,
                            onChange: this.handleChange.bind(this, elm.props),
                        }, props, {
                            col: col,
                            required: isRequired(elm.props),
                            beforeSubmit: this.state.beforeSubmit,
                            data: elm.props ? data[elm.props.name] : undefined,
                            validator: this.handleDisabled.bind(this, elm.props)
                        });
                        return React.cloneElement(elm, props)
                    } else {
                        return React.cloneElement(elm, {key: index});
                    }
                })}
                <FormItem labelWidth={labelWidth}>
                    {!hideSubmitButton &&
                    <Button
                        {...submitButtonOptions}
                        disabled={_disabled}
                        onClick={this.handleSubmit.bind(this, _disabled)}
                        type={_disabled ? null : submitButtonOptions.type || "success"}
                    >
                        {submitText}
                    </Button>}{submitItems}
                    {!!error && <div className="el-form-error">{error}</div>}
                </FormItem>
            </form>
        )
    }
}

Form.propTypes = {
    colon: PropTypes.bool,
    error: PropTypes.string,
    colNum: PropTypes.number,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    validator: PropTypes.func,
    id: PropTypes.string.isRequired,
    hideSubmitButton: PropTypes.bool,
    data: PropTypes.object.isRequired,
    submitButtonOptions: PropTypes.object,
    labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    options: PropTypes.arrayOf(PropTypes.shape({
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
            regExp: PropTypes.instanceOf(RegExp),
            min: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
            max: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
            trigger: PropTypes.oneOf(['blur', 'change', 'submit']),
            rule: PropTypes.oneOf(['color', 'price', 'nature', 'positiveInt']),
            type: PropTypes.oneOf(['boolean', 'array', 'string', 'object', 'number', 'moment']),
        })),
        type: PropTypes.oneOf(['text', 'color', 'password', 'datetime', 'static', 'component', 'textarea', 'select', 'checkbox', 'radio', 'switch', 'upload', 'radiogroup', 'checkgroup']),
    })),
    layout: PropTypes.oneOf(['horizontal', 'vertical', 'inline'])
};

Form.defaultProps = {
    id: "id",
    options: [],
    onChange: noop,
    submitText: '提交',
    layout: "horizontal",
    submitButtonOptions: {}
};
