/**
 * Created by elly on 2017/12/4.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Tag from '../tag';
import {noop, KeyCode} from "../util";

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
        e.stopPropagation();
        e.preventDefault();
        let {value, name, onChange, disabled, readOnly} = this.props;
        if (disabled || readOnly) return;
        let _value = value.slice();
        let input = _value.splice(index, 1);
        onChange({name, value: _value});
        if (remain) {
            this.setState({input: input[0] || ""});
        }
    }

    handleAdd(input) {
        let {name, value, onChange, disabled, readOnly, onSeparate} = this.props;
        if (disabled || readOnly) return;
        let _value = value.slice();
        _value.push(input);
        onSeparate(input);
        onChange({name, value: _value});
        this.setState({input: ""});
    }

    handleChange(e) {
        let value = e.target.value;
        let {maxLength, disabled, readOnly} = this.props;
        if (disabled || readOnly || (maxLength && value.length > maxLength)) return;
        this.setState(prev => {
            prev.input = value;
            prev.hidePlaceholder = !!value;
            return prev;
        })
    }

    handleKeyDown(e) {
        let input = this.state.input;
        let {value, separator, onKeyDown} = this.props;
        let isStr = typeof separator === "string";
        let isSeparate = e.which === ( isStr ? KeyCode[separator.toUpperCase()] : separator );
        if (input && isSeparate) {
            this.handleAdd(input);
        }
        if (!input && e.which === KeyCode.DELETE && value && value.length) {
            this.handleRemove(value.length - 1, true, e);
        }
        onKeyDown(e);
    }

    handleClick() {
        if (this.props.disabled || this.props.readOnly) return;
        this._el_separate_input.focus();
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
        this.props.onBlur(e);
    }

    render() {
        let {active, hidePlaceholder, input} = this.state;
        let {value, placeholder, tagProps, className, style, readOnly, disabled} = this.props;
        if (disabled) {
            if (tagProps) {
                tagProps.type = "default";
            } else {
                tagProps = {type: "default"}
            }
        }
        return (
            <div className={classnames("el-taginput-wrapper",
                active ? "el-taginput-active" : "",
                readOnly ? "el-taginput-readonly" : "",
                disabled ? "el-taginput-disabled" : "",
                className)}
                 onClick={this.handleClick.bind(this)}
                 style={style}>
                {!!placeholder && !hidePlaceholder && (!value || !value.length) && !input &&
                <div unselectable="unselectable" className="el-taginput-placeholder">{placeholder}</div>}
                <ul className="el-taginput-list clearfix">
                    {value.map((item, index) => {
                        return (
                            <li key={index}>
                                <Tag
                                    closeable={true}
                                    type="primary"
                                    {...tagProps}
                                    onClose={this.handleRemove.bind(this, index, false)}
                                >{item}</Tag>
                            </li>
                        )
                    })}
                    <li className="el-taginput-input-wrapper">
                        <input
                            type="text"
                            value={input}
                            disabled={disabled}
                            readOnly={readOnly}
                            autoComplete="false"
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
        )
    }
}

TagInput.propTypes = {
    onBlur: PropTypes.func,
    value: PropTypes.array,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    tagProps: PropTypes.object,
    onSeparate: PropTypes.func,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
    separator: PropTypes.oneOfType([PropTypes.oneOf(['enter', 'space']), PropTypes.number]),
};

TagInput.defaultProps = {
    value: [],
    onBlur: noop,
    onFocus: noop,
    onChange: noop,
    onKeyDown: noop,
    onSeparate: noop,
    placeholder: "",
    separator: 'enter',
};