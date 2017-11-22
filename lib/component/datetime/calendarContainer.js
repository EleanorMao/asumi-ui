'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dayView = require('./dayView');

var _dayView2 = _interopRequireDefault(_dayView);

var _monthView = require('./monthView');

var _monthView2 = _interopRequireDefault(_monthView);

var _yearView = require('./yearView');

var _yearView2 = _interopRequireDefault(_yearView);

var _timeView = require('./timeView');

var _timeView2 = _interopRequireDefault(_timeView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalendarContainer = function (_React$Component) {
    _inherits(CalendarContainer, _React$Component);

    function CalendarContainer(props) {
        _classCallCheck(this, CalendarContainer);

        var _this = _possibleConstructorReturn(this, (CalendarContainer.__proto__ || Object.getPrototypeOf(CalendarContainer)).call(this, props));

        _this.viewComponents = {
            days: _dayView2['default'],
            months: _monthView2['default'],
            years: _yearView2['default'],
            time: _timeView2['default']
        };
        return _this;
    }

    _createClass(CalendarContainer, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                view = _props.view,
                viewProps = _props.viewProps;

            return _react2['default'].createElement(this.viewComponents[view], viewProps);
        }
    }]);

    return CalendarContainer;
}(_react2['default'].Component);

exports['default'] = CalendarContainer;