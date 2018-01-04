'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/12/29.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ICON = function (_Component) {
    _inherits(ICON, _Component);

    function ICON() {
        _classCallCheck(this, ICON);

        return _possibleConstructorReturn(this, (ICON.__proto__ || Object.getPrototypeOf(ICON)).apply(this, arguments));
    }

    _createClass(ICON, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                type = _props.type,
                size = _props.size,
                rotate = _props.rotate,
                flip = _props.flip,
                li = _props.li,
                pull = _props.pull,
                border = _props.border,
                animate = _props.animate,
                className = _props.className,
                others = _objectWithoutProperties(_props, ['type', 'size', 'rotate', 'flip', 'li', 'pull', 'border', 'animate', 'className']);

            var _className = (0, _classnames2['default'])('fa', 'fa-' + type, li ? 'fa-li' : '', size ? 'fa-' + size : '', border ? 'fa-border' : '', flip ? 'fa-flip-' + flip : '', pull ? 'fa-pull-' + pull : '', animate ? 'fa-' + animate : '', rotate ? 'fa-rotate-' + rotate : '', className);
            return _react2['default'].createElement('span', _extends({ className: _className, 'aria-hidden': 'true' }, others));
        }
    }]);

    return ICON;
}(_react.Component);

exports['default'] = ICON;


ICON.propTypes = {
    li: _propTypes2['default'].bool,
    border: _propTypes2['default'].bool,
    rotate: _propTypes2['default'].number,
    className: _propTypes2['default'].string,
    type: _propTypes2['default'].string.isRequired,
    pull: _propTypes2['default'].oneOf(['left', 'right']),
    animate: _propTypes2['default'].oneOf(['spin', 'pulse']),
    size: _propTypes2['default'].oneOf(['lg', '2x', '3x', '4x', '5x']),
    flip: _propTypes2['default'].oneOf(['horizontal', 'vertical'])
};

ICON.defaultProps = {};