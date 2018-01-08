/**
 * Created by elly on 2017/12/4.
 */
import React, {Component} from 'react';
import PropTypes          from 'prop-types';
import classnames         from 'classnames';
import Tag                from '../tag';
import {noop, KeyCode}    from "../util";

export default class TagInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            active: false,
            hidePlaceholder: false
        };
    }

    handleRemove(index, remain, e) {
        e.preventDefault();
        e.stopPropagation();
        let {value, name, onChange, disabled, readOnly, onRemove} = this.props;
        if (disabled || readOnly) return;
        let _value = value.slice();
        let input = _value.splice(index, 1)[0];
        onRemove({e, value: input, index});
        onChange({name, value: _value, e});
        remain && this.handleInput(input);
    }

    handleAdd(input, e) {
        let {name, value, onChange, disabled, readOnly, onSeparate} = this.props;
        if (disabled || readOnly) return;
        let _value = value.slice();
        _value.push(input);
        onSeparate(input, e);
        onChange({name, value: _value, e});
        this.handleInput("");
    }

    handleChange(e) {
        let value = e.target.value;
        let {maxLength, disabled, disabledInput, readOnly} = this.props;
        if (disabledInput || disabled || readOnly || (maxLength && value.length > maxLength)) return;
        this.handleInput(value);
    }

    handleInput(input) {
        let {name, onInput} = this.props;
        onInput && onInput({value: input, name});
        this.setState({input, hidePlaceholder: !!input});
    }

    handleKeyDown(e) {
        let input = this.state.input;
        let {value, separator, onKeyDown, remainTagValue} = this.props;
        let isStr = typeof separator === "string";
        let isSeparate = e.which === (isStr ? KeyCode[separator.toUpperCase()] : separator);
        if (input && isSeparate) {
            this.handleAdd(input, e);
        }
        if (!input && e.which === KeyCode.DELETE && value && value.length) {
            this.handleRemove(value.length - 1, remainTagValue == null ? true : remainTagValue, e);
        }
        onKeyDown(e);
    }

    handleClick(e) {
        if (!this.props.disabled && !this.props.readOnly) {
            this._el_separate_input.focus();
        }
        this.props.onClick && this.props.onClick(e);
    }

    handleFocus(e) {
        this.setState(prev => {
            prev.active = true;
            return prev;
        });
        this.props.onFocus(e);
    }

    handleBlur(e) {
        this.setState(prev => {
            prev.active = false;
            return prev;
        });
        this.props.onBlur && this.props.onBlur(e);
    }

    render() {
        let {active, hidePlaceholder, input} = this.state;
        let {value, placeholder, tagProps, size, remainTagValue, className, style, readOnly, disabled} = this.props;
        if (disabled) {
            if (tagProps) {
                tagProps.type = "default";
            } else {
                tagProps = {type: "default"};
            }
        }
        let _className = classnames({
            "el-taginput-wrapper": true,
            "el-taginput-active": active,
            "el-taginput-readonly": readOnly,
            "el-taginput-disabled": disabled,
            [`el-${size}`]: !!size,
            [className]: !!className
        });
        return (
            <div className={_className} style={style}
                 onClick={this.handleClick.bind(this)}>
                {!!placeholder && !hidePlaceholder && (!value || !value.length) && !input &&
                <div unselectable="unselectable" className="el-taginput-placeholder">{placeholder}</div>}
                <ul className="el-taginput-list clearfix">
                    {value.map((item, index) => {
                        return (
                            <li key={index}>
                                <Tag closeable={true}
                                     type="primary"
                                     {...tagProps}
                                     onClose={this.handleRemove.bind(this, index, remainTagValue)}
                                >{item}</Tag>
                            </li>
                        );
                    })}
                    <li className="el-taginput-input-wrapper">
                        <input
                            type="text"
                            value={input}
                            autoComplete="off"
                            disabled={disabled}
                            readOnly={readOnly}
                            ref={c => this._el_separate_input = c}
                            onBlur={this.handleBlur.bind(this)}
                            onFocus={this.handleFocus.bind(this)}
                            onChange={this.handleChange.bind(this)}
                            onKeyDown={this.handleKeyDown.bind(this)}
                            style={input && input.length ? {width: input.length * 15} : null}
                        />
                    </li>
                </ul>
            </div>
        );
    }
}

TagInput.propTypes = {
    onBlur: PropTypes.func,
    value: PropTypes.array,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    onInput: PropTypes.func,
    onRemove: PropTypes.func,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    tagProps: PropTypes.object,
    onSeparate: PropTypes.func,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
    disabledInput: PropTypes.bool,
    remainTagValue: PropTypes.bool,
    size: PropTypes.oneOf(['default', 'large', 'small']),
    separator: PropTypes.oneOfType([PropTypes.oneOf(['enter', 'space']), PropTypes.number])
};

TagInput.defaultProps = {
    value: [],
    onBlur: noop,
    onFocus: noop,
    onInput: noop,
    onRemove: noop,
    onChange: noop,
    onKeyDown: noop,
    onSeparate: noop,
    placeholder: "",
    separator: 'enter',
};