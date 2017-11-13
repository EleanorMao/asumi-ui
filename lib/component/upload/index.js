'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/8.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Upload = function (_Component) {
    _inherits(Upload, _Component);

    function Upload(props) {
        _classCallCheck(this, Upload);

        return _possibleConstructorReturn(this, (Upload.__proto__ || Object.getPrototypeOf(Upload)).call(this, props));
    }

    _createClass(Upload, [{
        key: 'handleChange',
        value: function handleChange(e) {
            e.preventDefault();
            var failed = [];
            var fileList = e.target.files || e.dataTransfer.files;
            var _props = this.props,
                maxSize = _props.maxSize,
                onUpload = _props.onUpload,
                name = _props.name,
                validator = _props.validator,
                validatorError = _props.validatorError;

            for (var i = 0, len = fileList.length; i < len; i++) {
                var file = fileList.item(i);
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
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                name = _props2.name,
                accept = _props2.accept,
                className = _props2.className,
                style = _props2.style,
                multiple = _props2.multiple,
                disabled = _props2.disabled,
                children = _props2.children;

            var _className = (0, _classnames2['default'])("el-uploader-wrapper", className);
            return _react2['default'].createElement(
                'div',
                {
                    style: style,
                    className: _className,
                    onDragOver: function onDragOver(e) {
                        e.preventDefault();
                    }
                },
                _react2['default'].createElement('input', {
                    type: 'file',
                    className: 'el-uploader',
                    name: name,
                    accept: accept,
                    disabled: disabled,
                    multiple: multiple,
                    ref: function ref(c) {
                        return _this2._uploader = c;
                    },
                    onChange: this.handleChange.bind(this)
                }),
                _react2['default'].Children.toArray(children).map(function (elm, i) {
                    return _react2['default'].cloneElement(elm, { key: i, disabled: disabled });
                })
            );
        }
    }]);

    return Upload;
}(_react.Component);

exports['default'] = Upload;


Upload.propTypes = {
    name: _propTypes2['default'].string,
    accept: _propTypes2['default'].string,
    multiple: _propTypes2['default'].bool,
    maxSize: _propTypes2['default'].number,
    disabled: _propTypes2['default'].bool,
    validator: _propTypes2['default'].func,
    onUpload: _propTypes2['default'].func,
    validatorError: _propTypes2['default'].func
};

Upload.defaultProps = {
    onUpload: function onUpload() {},
    validatorError: function validatorError() {}
};