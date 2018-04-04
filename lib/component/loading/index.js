'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _chaseDot = require('./chaseDot');

var _chaseDot2 = _interopRequireDefault(_chaseDot);

var _stretch = require('./stretch');

var _stretch2 = _interopRequireDefault(_stretch);

var _bounce = require('./bounce');

var _bounce2 = _interopRequireDefault(_bounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/11.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Loading = function (_Component) {
    _inherits(Loading, _Component);

    function Loading(props) {
        _classCallCheck(this, Loading);

        return _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).call(this, props));
    }

    _createClass(Loading, [{
        key: 'childRender',
        value: function childRender(type) {
            var output = void 0;
            switch (type) {
                case 'chase-dots':
                    output = _react2['default'].createElement(_chaseDot2['default'], null);
                    break;
                case 'bounce':
                    output = _react2['default'].createElement(_bounce2['default'], null);
                    break;
                default:
                    output = _react2['default'].createElement(_stretch2['default'], null);
                    break;
            }

            return output;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                size = _props.size,
                title = _props.title,
                mask = _props.mask,
                type = _props.type,
                fullScreen = _props.fullScreen,
                loading = _props.loading,
                className = _props.className,
                children = _props.children;

            var _className = (0, _classnames2['default'])('el-loading-wrapper', className, fullScreen ? 'el-loading-fixed' : null, size ? 'el-' + size : null);
            return _react2['default'].createElement(
                'div',
                { className: _className, style: { display: mask && !fullScreen || loading ? 'block' : 'none' } },
                _react2['default'].createElement(
                    'div',
                    { className: 'el-loading-body ' + (mask ? 'el-loading-mask' : ''),
                        style: mask && !fullScreen ? { display: loading ? 'block' : 'none' } : null },
                    _react2['default'].createElement(
                        'div',
                        { className: 'el-loading-nest' },
                        _react2['default'].createElement(
                            'div',
                            { className: 'el-loading-content' },
                            this.childRender(type),
                            !!title && _react2['default'].createElement(
                                'div',
                                { className: 'el-loading-title' },
                                title
                            )
                        )
                    )
                ),
                !!children && _react2['default'].createElement(
                    'div',
                    { className: 'el-loading-children ' + (mask && loading ? 'el-loading-blur' : '') },
                    children
                )
            );
        }
    }]);

    return Loading;
}(_react.Component);

exports['default'] = Loading;


var _el_loading_content = null;

Loading.loading = function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    props.mask = true;
    props.fullScreen = true;
    if (!_el_loading_content) {
        _el_loading_content = document.createElement('div');
        document.body.appendChild(_el_loading_content);
    }
    var renderToDom = _reactDom2['default'].render || _reactDom2['default'].hydrate;
    renderToDom(_react2['default'].createElement(Loading, props), _el_loading_content);
};

Loading.close = function () {
    if (_el_loading_content) {
        _reactDom2['default'].unmountComponentAtNode(_el_loading_content);
        document.body.removeChild(_el_loading_content);
        _el_loading_content = null;
    }
};

Loading.propTypes = {
    mask: _propTypes2['default'].bool,
    title: _propTypes2['default'].any,
    loading: _propTypes2['default'].bool,
    fullScreen: _propTypes2['default'].bool,
    className: _propTypes2['default'].string,
    size: _propTypes2['default'].oneOf(['small', 'large']),
    type: _propTypes2['default'].oneOf(['chase-dots', 'stretch', 'bounce'])
};

Loading.defaultProps = {
    loading: true,
    type: 'stretch'
};