/**
 * Created by elly on 2017/4/13.
 */
import React, {Component}                 from 'react';
import PropTypes                          from 'prop-types';
import classnames                         from 'classnames';
import FormItem                           from './formItem';
import Button                             from '../button';
import {noop, extend, getType, getValues} from "../util";

function isRequired({validate, required}) {
    return required || (validate && validate.some(item => {
        return item.trigger !== "submit" && item.required;
    }));
}

//TODO#1: 多个Form打字很卡
const validateMap = {
    "null": () => {
        return true;
    },
    "undefined": () => {
        return true;
    },
    "array": (v) => {
        return !v.length;
    },
    "string": (v) => {
        return !v.length;
    }
};
export default class Form extends Component {
    constructor(props) {
        super(props);
        this.names = [];
        this._pending = false;
        this._submitted = [];
        this._requiredMap = {};
        this._disabledMap = {};
        this.state = {
            disabled: false,
            beforeSubmit: false,
        };
    }

    getOptions(options, children) {
        let output = options ? options.slice() : [];
        if (children) {
            React.Children.forEach(children, (elm) => {
                if (elm && elm.type && elm.type._component_name === "FormItem") {
                    output.push(elm.props);
                }
            });
        }
        return output;
    }

    componentWillMount() {
        let {data, options, stopValidate, children} = this.props;
        if (stopValidate) return;
        this.validator(data, this.getOptions(options, children));
    }

    componentWillReceiveProps({data, options, stopValidate, children}) {
        if (stopValidate) return;
        this.validator(data, this.getOptions(options, children));
    }

    validator(data, options) {
        if (!options) return;
        let names = [];
        let disabled = false;
        options.forEach(item => {
            if (item.hidden || (item.type && item.type === 'hidden')) return;
            let value = typeof item.value === "undefined" && data ? data[item.name] : item.value;
            let valueType = getType(value);
            if (isRequired(item)) {
                let func = validateMap[valueType];
                let validateValue = func ? func(value) : false;
                this._requiredMap[item.name] = validateValue;
                if (!disabled) disabled = validateValue;
            } else {
                this._requiredMap[item.name] = false;
            }
            names.push(item.name);
        });
        this.names.forEach(name => {
            if (!~names.indexOf(name)) {
                delete this._disabledMap[name];
                delete this._requiredMap[name];
            }
        });
        this.names = names;
        disabled = disabled || !!(~getValues(this._disabledMap).indexOf(true) || ~getValues(this._requiredMap).indexOf(true));
        if (disabled !== this.state.disabled) this.setState({disabled});
    }

    cancelSubmitPending(disabled, props, cb) {
        if (typeof cb === "function") {
            cb();
            this._submitted.push(props.name);
            if (this._submitted.sort().toString() === this.names.sort().toString()) {
                if (!disabled && this._pending) {
                    this._pending = false;
                    this._submitted = [];
                    this.handleSubmit();
                } else {
                    this._pending = false;
                    this._submitted = [];
                    this.setState({beforeSubmit: false});
                }
            }
        }
    }

    handleDisabled(props, _disabled, cb) {
        this._disabledMap[props.name] = !!_disabled;
        if (isRequired(props)) {
            let valueType = getType(props.value);
            let func = validateMap[valueType];
            this._requiredMap[props.name] = func ? func(props.value) : false;
        }
        let disabled = !!_disabled || !!(~getValues(this._disabledMap).indexOf(true) || ~getValues(this._requiredMap).indexOf(true));
        if (disabled !== this.state.disabled) {
            this.setState({disabled});
        }
        this.cancelSubmitPending(disabled, props, cb);
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

    handleBeforeSubmit(_disabled, e) {
        if (this.props.preventDefault) {
            e.preventDefault();
        }
        if (this.props.stopValidate) {
            this.handleSubmit();
        } else {
            if (_disabled || this._pending) return;
            this._pending = true;
            this.setState({beforeSubmit: true});
        }
    }

    handleSubmit() {
        let {validator, onSubmit, preventMultipleSubmit} = this.props;
        if (preventMultipleSubmit && this._pending) return;
        this.setState({beforeSubmit: false});
        if (validator && validator()) {
            this.setState({disabled: true});
        } else {
            let cb = noop;
            if (preventMultipleSubmit) {
                this._pending = true;
                cb = () => {
                    this._pending = false;
                };
            }
            onSubmit && onSubmit(cb);
        }
    }

    render() {
        let {
            data, options, colNum, error, requiredMark, colon, disabled, labelWidth,
            hideSubmitButton, layout, title, className, submitText, name, submitItems,
            submitButtonProps, children, style, encType, action, method, autoComplete,
            target, noValidate, acceptCharset, stopValidate
        } = this.props; //哎..这么写自己都看着烦啊，但是我就是控制不了我叽己啊
        let col = colNum ? Math.ceil(24 / colNum) : 0;
        let _disabled = this.state.disabled || disabled || submitButtonProps.disabled;
        let _className = classnames('el-form', layout ? `el-${layout}` : null, col ? 'el-grid-row' : null, className);
        return (
            <form className={_className} style={style} encType={encType}
                  action={action} method={method} autoComplete={autoComplete}
                  name={name} target={target} noValidate={noValidate} acceptCharset={acceptCharset}>
                {!!title && <div className="el-form-title">{title}</div>}
                {options && options.map((props, index) => {
                    let {onChange, value, name, ...others} = props;
                    return (
                        <FormItem
                            value={'value' in props ? value : data && data[name]}
                            onChange={onChange || this.handleChange.bind(this, props)}
                            key={name + '.' + index}
                            requiredMark={requiredMark}
                            labelWidth={labelWidth}
                            colon={colon}
                            name={name}
                            {...others}
                            col={col}
                            beforeSubmit={this.state.beforeSubmit}
                            formValidator={stopValidate ? null : this.handleDisabled.bind(this)}
                        />);
                })}
                {children && React.Children.map(children, (elm) => {
                    if (elm && elm.type && elm.type._component_name === "FormItem") {
                        let props = elm.props;
                        let newProps = {
                            col: col,
                            beforeSubmit: this.state.beforeSubmit,
                            formValidator: stopValidate ? null : this.handleDisabled.bind(this)
                        };
                        if (!props.onChange) {
                            newProps.onChange = this.handleChange.bind(this, props);
                        }
                        if (typeof props.colon !== "boolean") {
                            newProps.colon = colon;
                        }
                        if (typeof props.value === "undefined" && data) {
                            newProps.value = data[props.name];
                        }
                        if (props.requiredMark == null) {
                            newProps.requiredMark = requiredMark;
                        }
                        if (typeof props.labelWidth !== "number" && typeof props.labelWidth !== "string") {
                            newProps.labelWidth = labelWidth;
                        }
                        return React.cloneElement(elm, newProps);
                    } else if (elm) {
                        return elm;
                    }
                })}
                <FormItem labelWidth={labelWidth}>
                    {!hideSubmitButton &&
                    <Button
                        {...submitButtonProps}
                        disabled={_disabled}
                        onClick={this.handleBeforeSubmit.bind(this, _disabled)}
                        type={_disabled ? null : submitButtonProps.type || "success"}
                    >{submitText}</Button>}{submitItems}
                    {!!error && <div className="el-form-error">{error}</div>}
                </FormItem>
            </form>
        );
    }
}

Form.propTypes = {
    colon: PropTypes.bool,
    name: PropTypes.string,
    data: PropTypes.object,
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
    stopValidate: PropTypes.bool,
    id: PropTypes.string.isRequired,
    hideSubmitButton: PropTypes.bool,
    submitButtonProps: PropTypes.object,
    preventDefault: PropTypes.bool,
    preventMultipleSubmit: PropTypes.bool,
    labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    options: PropTypes.arrayOf(PropTypes.shape({
        colon: PropTypes.bool,
        hidden: PropTypes.bool,
        label: PropTypes.string,
        required: PropTypes.bool,
        onChange: PropTypes.func,
        colSpan: PropTypes.number,
        name: PropTypes.string,
        dataFormat: PropTypes.func,
        labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
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
        type: PropTypes.oneOf(['text', 'color', 'password', 'datetime', 'number', 'static', 'component', 'textarea', 'select', 'checkbox', 'radio', 'switch', 'upload', 'radiogroup', 'checkgroup', 'checkboxgroup', 'transfer', 'taginput', 'hidden', 'custom']),
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
