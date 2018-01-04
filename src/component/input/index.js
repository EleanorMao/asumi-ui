/**
 * Created by elly on 2017/4/6.
 */
import React, {Component}                    from 'react';
import PropTypes                             from 'prop-types';
import classnames                            from 'classnames';
import {extend, KeyCode, noop, isObj, rules} from "../util";
import calculateNodeHeight                   from './calcNodeHeight';

function onNextFrame(cb) {
    if (window.requestAnimationFrame) {
        return window.requestAnimationFrame(cb);
    }
    return window.setTimeout(cb, 1);
}

function clearNextFrameAction(nextFrameId) {
    if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(nextFrameId);
    } else {
        window.clearTimeout(nextFrameId);
    }
}

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.nextFrameActionId = void 0;
        this.state = {
            textareaStyles: {}
        };
    }

    componentDidMount() {
        this.resizeHeight();
    }

    componentWillReceiveProps({value}) {
        if (this.props.value !== value) {
            if (this.nextFrameActionId) {
                clearNextFrameAction(this.nextFrameActionId);
            }
            this.nextFrameActionId = onNextFrame(this.resizeHeight.bind(this));
        }
    }


    resizeHeight() {
        let elm = this._el_textarea;
        let {type, autoSize} = this.props;
        if (elm && autoSize && type === 'textarea') {
            let _isObj = isObj(autoSize);
            let minRows = _isObj ? autoSize.minRows : null;
            let maxRows = _isObj ? autoSize.maxRows : null;
            this.setState({textareaStyles: calculateNodeHeight(elm, minRows, maxRows)});
        }
    }

    handleChange(e) {
        if (!('value' in this.props)) {
            this.resizeHeight();
        }
        const {name, value} = e.target;
        const {rule, pattern, maxLength, onChange} = this.props;
        if (rule && rules[rule] && !rules[rule].test(value)) return;
        if (pattern && !pattern.test(value)) return;
        if (value.length > maxLength) return;
        onChange({e, name, value});
    }

    handleKeyPress(e) {
        if (e.which === KeyCode.ENTER) {
            this.props.onPressEnter(e);
        }
        this.props.onKeyPress(e);
    }

    render() {
        let {type, size, rule, autoSize, icon, style, inputStyle, append, prepend, onPressEnter, className, ...other} = this.props;
        let {onClick} = {...other};
        let _className = classnames('el-input', className, size ? `el-${size}` : '');
        if (type === 'textarea') {
            return (
                <div className={_className} style={style}>
                    {!!icon && <span className="el-input-icon" onClick={onClick}>{icon}</span>}
                    <textarea
                        {...other}
                        className={_className}
                        ref={c => this._el_textarea = c}
                        onChange={this.handleChange.bind(this)}
                        style={extend(inputStyle, this.state.textareaStyles)}
                    />
                </div>
            );
        } else {
            let input =
                <div className={_className} style={style}>
                    {!!icon && <span className="el-input-icon" onClick={onClick}>{icon}</span>}
                    <input
                        {...other}
                        type={type}
                        style={inputStyle}
                        onChange={this.handleChange.bind(this)}
                        onKeyPress={this.handleKeyPress.bind(this)}
                    />
                </div>
            ;
            if (prepend || append) {
                let _wrapperClass = classnames('el-input-wrapper', className, size ? `el-${size}` : '');
                return (
                    <div className={_wrapperClass} style={style}>
                        {prepend && <span className="el-input-prepend">{prepend}</span>}
                        {input}
                        {append && <span className="el-input-append">{append}</span>}
                    </div>
                );
            } else {
                return input;
            }

        }
    }
}

Input.propTypes = {
    icon: PropTypes.any,
    append: PropTypes.any,
    prepend: PropTypes.any,
    type: PropTypes.string,
    onChange: PropTypes.func,
    onPressEnter: PropTypes.func,
    pattern: PropTypes.instanceOf(RegExp),
    size: PropTypes.oneOf(['large', 'small']),
    autoSize: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
        minRows: PropTypes.number,
        maxRows: PropTypes.number,
    })]),
    rule: PropTypes.oneOf(['color', 'price', 'nature', 'positiveInt']),
};

Input.defaultProps = {
    type: 'text',
    onChange: noop,
    onKeyPress: noop,
    onPressEnter: noop,
};