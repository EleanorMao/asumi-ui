'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/8.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Option = function (_Component) {
    _inherits(Option, _Component);

    function Option(props) {
        _classCallCheck(this, Option);

        return _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).call(this, props));
    }

    _createClass(Option, [{
        key: 'selectRender',
        value: function selectRender(selected, multiple) {
            if (multiple) {
                if (selected) {
                    return _react2['default'].createElement('span', { className: 'el-select-selected fa fa-check-square' });
                } else {
                    return _react2['default'].createElement('span', { className: 'el-select-unselected fa fa-square-o' });
                }
            } else {
                return selected ? _react2['default'].createElement('span', { className: 'el-select-selected fa fa-check' }) : null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var label = _props.label;
            var value = _props.value;
            var disabled = _props.disabled;
            var multiple = _props.multiple;
            var selected = _props.selected;
            var onChange = _props.onChange;

            return _react2['default'].createElement(
                'li',
                {
                    className: disabled ? 'el-disabled' : '',
                    onClick: disabled ? null : function (e) {
                        return onChange(e, value, !selected);
                    } },
                label,
                this.selectRender(selected, multiple)
            );
        }
    }]);

    return Option;
}(_react.Component);

exports['default'] = Option;


Option.propTypes = {};

Option.defaultProps = {};