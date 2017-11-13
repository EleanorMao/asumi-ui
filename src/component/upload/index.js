/**
 * Created by elly on 2017/4/8.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {noop} from "../util";

export default class Upload extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(e) {
        e.preventDefault();
        let failed = [];
        let fileList = e.target.files || e.dataTransfer.files;
        let {maxSize, onUpload, name, validator, validatorError} = this.props;
        for (let i = 0, len = fileList.length; i < len; i++) {
            let file = fileList.item(i);
            if (maxSize && file.size > maxSize) {
                validatorError(file, i, fileList);
                failed.push(i);
            }
            if (validator && !validator(file)) {
                validatorError(file, i, fileList);
                failed.push(i);
            }
        }
        onUpload(fileList, failed, name, e);
        this._uploader.value = '';
    }

    render() {
        let {name, accept, className, style, multiple, disabled, children} = this.props;
        let _className = classnames("el-uploader-wrapper", className);
        return (
            <div
                style={style}
                className={_className}
                onDragOver={(e) => {
                    e.preventDefault();
                }}
            >
                <input
                    type="file"
                    className="el-uploader"
                    name={name}
                    accept={accept}
                    disabled={disabled}
                    multiple={multiple}
                    ref={(c) => this._uploader = c}
                    onChange={this.handleChange.bind(this)}
                />
                {React.Children.toArray(children).map((elm, i) => {
                    return React.cloneElement(elm, {key: i, disabled});
                })}
            </div>
        )
    }
}

Upload.propTypes = {
    name: PropTypes.string,
    accept: PropTypes.string,
    multiple: PropTypes.bool,
    maxSize: PropTypes.number,
    disabled: PropTypes.bool,
    validator: PropTypes.func,
    onUpload: PropTypes.func,
    validatorError: PropTypes.func,
};

Upload.defaultProps = {
    onUpload: noop,
    validatorError: noop
};