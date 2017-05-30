/**
 * Created by elly on 2017/4/8.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default  class Upload extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(e) {
        e.preventDefault();
        let failed = [];
        let fileList = e.target.files || e.dataTransfer.files;
        let {maxSize, onUpload, validator, validatorError} = this.props;
        for (let i = 0, len = fileList.length; i < len; i++) {
            let file = fileList.item(i);
            if (maxSize && file.size > maxSize) {
                validatorError(file, i, fileList);
                failed.push(i);
            }
            if (validator && validator(file)) {
                validatorError(file, i, fileList);
                failed.push(i);
            }
        }
        onUpload(fileList, failed);
        this._uploader.value = '';
    }

    render() {
        let {name, accept, className, style, multiple, draggable, disabled, children} = this.props;
        let _className = classnames("el-uploader-wrapper", className);
        return (
            <div
                style={style}
                className={_className}
                onDrop={draggable ? this.handleChange.bind(this) : null}
                onDragOver={(e) => {
                    e.preventDefault();
                }}
            >
                <input
                    type="file"
                    ref={(c) => this._uploader = c}
                    className="el-uploader"
                    name={name}
                    accept={accept}
                    disabled={disabled}
                    multiple={multiple}
                    onChange={this.handleChange.bind(this)}
                />
                {children}
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
    draggable: PropTypes.bool,
    onUpload: PropTypes.func,
    validatorError: PropTypes.func,
};

Upload.defaultProps = {
    onUpload: () => {
    },
    validatorError: () => {
    }
};