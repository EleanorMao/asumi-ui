'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/11.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Stretch = function (_Component) {
    _inherits(Stretch, _Component);

    function Stretch(props) {
        _classCallCheck(this, Stretch);

        return _possibleConstructorReturn(this, (Stretch.__proto__ || Object.getPrototypeOf(Stretch)).call(this, props));
    }

    _createClass(Stretch, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var size = _props.size;
            var title = _props.title;
            var mask = _props.mask;
            var fullScreen = _props.fullScreen;
            var loading = _props.loading;
            var className = _props.className;
            var children = _props.children;

            var _className = (0, _classnames2['default'])('el-loading-wrapper', className, fullScreen ? 'el-loading-fixed' : null, size ? 'el-' + size : null);
            return _react2['default'].createElement(
                'div',
                { className: _className, style: loading ? { display: 'block' } : { display: 'none' } },
                _react2['default'].createElement(
                    'div',
                    { className: 'el-loading-body ' + (mask ? 'el-loading-mask' : '') },
                    _react2['default'].createElement(
                        'div',
                        { className: 'el-loading-nest' },
                        _react2['default'].createElement(
                            'div',
                            { className: 'el-loading-content' },
                            _react2['default'].createElement(
                                'div',
                                { className: 'el-stretch' },
                                _react2['default'].createElement('i', { className: 'el-stretch-rect' }),
                                _react2['default'].createElement('i', { className: 'el-stretch-rect' }),
                                _react2['default'].createElement('i', { className: 'el-stretch-rect' }),
                                _react2['default'].createElement('i', { className: 'el-stretch-rect' }),
                                _react2['default'].createElement('i', { className: 'el-stretch-rect' }),
                                _react2['default'].createElement('i', { className: 'el-stretch-rect' })
                            ),
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
                    { className: 'el-loading-children' },
                    children
                )
            );
        }
    }]);

    return Stretch;
}(_react.Component);

exports['default'] = Stretch;


Stretch.propTypes = {
    size: _react.PropTypes.oneOf(['small', 'large']),
    mask: _react.PropTypes.bool,
    loading: _react.PropTypes.bool,
    fullScreen: _react.PropTypes.bool
};

Stretch.defaultProps = {
    loading: true
};