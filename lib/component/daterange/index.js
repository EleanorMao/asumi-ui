'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _datetime = require('../datetime');

var _datetime2 = _interopRequireDefault(_datetime);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateRange = function (_React$Component) {
    _inherits(DateRange, _React$Component);

    function DateRange(props) {
        _classCallCheck(this, DateRange);

        var _this = _possibleConstructorReturn(this, (DateRange.__proto__ || Object.getPrototypeOf(DateRange)).call(this, props));

        _this.state = _this.getStateFromProps(props);
        return _this;
    }

    _createClass(DateRange, [{
        key: 'getStateFromProps',
        value: function getStateFromProps(props) {
            var date = props.value && props.value instanceof Array ? date : [null, null];
            return {
                date: date
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var renderInput = this.props.renderInput;
            var date = this.state.date;

            return _react2['default'].createElement(
                'div',
                { className: 'el-daterange' },
                _react2['default'].createElement(
                    'div',
                    { className: 'el-daterange-picker' },
                    _react2['default'].createElement(_datetime2['default'], { value: date[0], className: 'el-daterange-left', timeFormat: false, input: false, open: true }),
                    _react2['default'].createElement(_datetime2['default'], { value: date[1], className: 'el-daterange-right', timeFormat: false, input: false, open: true })
                )
            );
        }
    }]);

    return DateRange;
}(_react2['default'].Component);

exports['default'] = DateRange;


DateRange.propTypes = {
    renderInput: _propTypes2['default'].func
};