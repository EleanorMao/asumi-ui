"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/10.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Popover = function (_Component) {
    _inherits(Popover, _Component);

    function Popover(props) {
        _classCallCheck(this, Popover);

        return _possibleConstructorReturn(this, (Popover.__proto__ || Object.getPrototypeOf(Popover)).call(this, props));
    }

    _createClass(Popover, [{
        key: "render",
        value: function render() {
            var _props = this.props;
            var title = _props.title;
            var style = _props.style;
            var content = _props.content;
            var placement = _props.placement;

            return _react2["default"].createElement(
                "div",
                {
                    style: style,
                    className: "el-popover el-" + placement
                },
                _react2["default"].createElement(
                    "div",
                    { className: "el-popover-inner" },
                    _react2["default"].createElement(
                        "div",
                        { className: "el-popover-title" },
                        title
                    ),
                    !!content && _react2["default"].createElement(
                        "div",
                        { className: "el-popover-body" },
                        content
                    )
                )
            );
        }
    }]);

    return Popover;
}(_react.Component);

exports["default"] = Popover;


Popover.propTypes = {
    placement: _react.PropTypes.oneOf(['left', 'right', 'top', 'bottom'])
};

Popover.defaultProps = {};