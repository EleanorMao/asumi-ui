'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _modal = require('../modal');

var _modal2 = _interopRequireDefault(_modal);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _tabs = require('../tabs');

var _tabs2 = _interopRequireDefault(_tabs);

var _popover = require('../popover');

var _popover2 = _interopRequireDefault(_popover);

var _uploader = require('../uploader');

var _uploader2 = _interopRequireDefault(_uploader);

var _tabPanel = require('../tabs/tabPanel');

var _tabPanel2 = _interopRequireDefault(_tabPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/6/2.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var HyperDown = require('hyperdown');

var parser = new HyperDown();

var Editor = function (_Component) {
    _inherits(Editor, _Component);

    function Editor(props) {
        _classCallCheck(this, Editor);

        var _this = _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, props));

        _this.state = {
            imgUrl: "",
            link: "http://",
            cacheForUndo: [],
            cacheForRedo: [],
            imgVisible: false,
            linkVisible: false
        };
        return _this;
    }

    _createClass(Editor, [{
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps) {
            var _this2 = this;

            var newValue = nextProps.value;
            var oldValue = this.props.value;
            if (oldValue !== newValue) {
                (function () {
                    var maxCache = _this2.props.maxCache;
                    var _state = _this2.state;
                    var cacheForRedo = _state.cacheForRedo;
                    var cacheForUndo = _state.cacheForUndo;

                    var length = cacheForRedo.length;
                    if (!length || oldValue !== cacheForRedo[length - 1]) {
                        _this2.setState(function (prev) {
                            prev.cacheForUndo.push(oldValue);
                            if (cacheForUndo.length > maxCache) {
                                prev.cacheForUndo.shift();
                            }
                            return prev;
                        });
                    }
                })();
            }
        }
    }, {
        key: '$nextTick',
        value: function $nextTick(func) {
            setTimeout(func, 0);
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var _ref = e.target || e;

            var name = _ref.name;
            var value = _ref.value;

            this.props.onChange({ name: name, value: value, parsedValue: parser.makeHtml(value) });
        }
    }, {
        key: 'handleModalChange',
        value: function handleModalChange(_ref2) {
            var name = _ref2.name;
            var value = _ref2.value;

            this.setState(function (prev) {
                prev[name] = value;
                return prev;
            });
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            var key = e.key.toUpperCase();
            if (e.ctrlKey && !e.shiftKey) {
                switch (key) {
                    case 'B':
                        this.handleBold();
                        break;
                    case 'G':
                        this.handleImg();
                        break;
                    case 'H':
                        this.handleTitle();
                        break;
                    case 'I':
                        this.handleItalic();
                        break;
                    case 'L':
                        this.handleLink();
                        break;
                    case 'O':
                        this.handleOl();
                        break;
                    case 'Q':
                        this.handleQuote();
                        break;
                    case 'R':
                        this.handleHr();
                        break;
                    case 'U':
                        this.handleUl();
                        break;
                    case 'Z':
                        this.handleUndo();
                        break;
                    default:
                        break;
                }
            } else if (e.ctrlKey && e.shiftKey && key === 'Z') {
                this.handleRedo();
            }
        }
    }, {
        key: 'handleSetSelection',
        value: function handleSetSelection(startOffset, endOffset) {
            var node = this._editor;
            node.focus();
            node.setSelectionRange(startOffset, endOffset);
        }
    }, {
        key: 'handleBold',
        value: function handleBold() {
            var _props = this.props;
            var handler = _props.handler;
            var value = _props.value;
            var name = _props.name;
            var _editor = this._editor;
            var selectionStart = _editor.selectionStart;
            var selectionEnd = _editor.selectionEnd;


            var startText = value.slice(0, selectionStart);
            var midText = value.slice(selectionStart, selectionEnd) || handler;
            var endText = value.slice(selectionEnd);

            if (/^\*{2}[\s\S]+\*{2}$/.test(midText)) {
                midText = midText.replace(/^\*{2}|\*{2}$/g, "");
            } else if (/\*{2}$/.test(startText) && /^\*{2}/.test(endText)) {
                startText = startText.replace(/\*{2}$/, "");
                endText = endText.replace(/^\*{2}/, "");
            } else {
                startText += "**";
                endText = "**" + endText;
            }

            this.handleChange({ name: name, value: startText + midText + endText });
            this.$nextTick(this.handleSetSelection.bind(this, startText.length, startText.length + midText.length));
        }
    }, {
        key: 'handleItalic',
        value: function handleItalic() {
            var _props2 = this.props;
            var handler = _props2.handler;
            var value = _props2.value;
            var name = _props2.name;
            var _editor2 = this._editor;
            var selectionStart = _editor2.selectionStart;
            var selectionEnd = _editor2.selectionEnd;


            var startText = value.slice(0, selectionStart);
            var midText = value.slice(selectionStart, selectionEnd) || handler;
            var endText = value.slice(selectionEnd);

            if (/^\*[\s\S]+\*$/.test(midText)) {
                midText = midText.replace(/^\*|\*$/g, "");
            } else if (/\*+$/.test(startText) && /^\*+/.test(endText)) {
                startText = startText.replace(/\*+$/, function ($1, offset, str) {
                    return $1.slice(1);
                });
                endText = endText.replace(/^\*+/, function ($1, offset, str) {
                    return $1.slice(1);
                });
            } else {
                startText += "*";
                endText = "*" + endText;
            }

            this.handleChange({ name: name, value: startText + midText + endText });
            this.$nextTick(this.handleSetSelection.bind(this, startText.length, startText.length + midText.length));
        }
    }, {
        key: 'handleLink',
        value: function handleLink() {
            var _editor3 = this._editor;
            var selectionStart = _editor3.selectionStart;
            var selectionEnd = _editor3.selectionEnd;

            if (selectionStart !== selectionEnd) {
                var _props3 = this.props;
                var value = _props3.value;
                var name = _props3.name;

                var startText = value.slice(0, selectionStart);
                var midText = value.slice(selectionStart, selectionEnd);
                var endText = value.slice(selectionEnd);
                if (/\[$/.test(startText) && /^]\([\s\S]*\)/.test(endText)) {
                    startText = startText.replace(/\[$/, "");
                    endText = endText.replace(/^]\([\s\S]*\)/, "");
                } else if (/^(\s*)\[[\s\S]*\]\([\s\S]*\)(\s*)$/.test(midText)) {
                    midText = midText.replace(/^(\s*)\[/, "").replace(/]\([\s\S]*\)(\s*)$/, "");
                }

                this.handleChange({ name: name, value: startText + midText + endText });
                this.$nextTick(this.handleSetSelection.bind(this, startText.length, startText.length + midText.length));
            } else {
                this.setState({ linkVisible: true });
            }
        }
    }, {
        key: 'handleGetLink',
        value: function handleGetLink(getLink) {
            var node = this._editor;
            if (!getLink) {
                this.setState({ link: "http://", linkVisible: false });
                node.focus();
                return;
            }

            var link = this.state.link;
            var length = link.length;
            this.setState({ link: "http://", linkVisible: false });

            var selectionStart = node.selectionStart;
            var selectionEnd = node.selectionEnd;
            var _props4 = this.props;
            var handler = _props4.handler;
            var value = _props4.value;
            var name = _props4.name;


            var startText = value.slice(0, selectionStart);
            var midText = value.slice(selectionStart, selectionEnd) || handler;
            var endText = value.slice(selectionEnd);

            startText += "[";
            endText = '](' + encodeURI(link) + ')' + endText;

            this.handleChange({ name: name, value: startText + midText + endText });
            this.$nextTick(this.handleSetSelection.bind(this, startText.length, startText.length + midText.length));
        }
    }, {
        key: 'handleImg',
        value: function handleImg() {
            var _editor4 = this._editor;
            var selectionStart = _editor4.selectionStart;
            var selectionEnd = _editor4.selectionEnd;

            if (selectionStart !== selectionEnd) {
                var _props5 = this.props;
                var value = _props5.value;
                var name = _props5.name;

                var startText = value.slice(0, selectionStart);
                var midText = value.slice(selectionStart, selectionEnd);
                var endText = value.slice(selectionEnd);
                if (/!\[$/.test(startText) && /^]\([\s\S]*\)/.test(endText)) {
                    startText = startText.replace(/!\[$/, "");
                    endText = endText.replace(/^]\([\s\S]*\)/, "");
                } else if (/^(\s*)!\[[\s\S]*\]\([\s\S]*\)(\s*)$/.test(midText)) {
                    midText = midText.replace(/^(\s*)!\[/, "").replace(/]\([\s\S]*\)(\s*)$/, "");
                } else {
                    this.setState({ imgVisible: true });
                    return;
                }

                this.handleChange({ name: name, value: startText + midText + endText });
                this.$nextTick(this.handleSetSelection.bind(this, startText.length, startText.length + midText.length));
            } else {
                this.setState({ imgVisible: true });
            }
        }
    }, {
        key: 'handleGetImg',
        value: function handleGetImg(getLink) {
            var node = this._editor;
            if (!getLink) {
                this.setState({ imgUrl: "", imgVisible: false });
                node.focus();
                return;
            }

            var link = this.state.imgUrl;
            var length = link.length;
            this.setState({ imgUrl: "", imgVisible: false });

            var selectionStart = node.selectionStart;
            var selectionEnd = node.selectionEnd;
            var _props6 = this.props;
            var handler = _props6.handler;
            var value = _props6.value;
            var name = _props6.name;


            var startText = value.slice(0, selectionStart);
            var midText = value.slice(selectionStart, selectionEnd) || handler;
            var endText = value.slice(selectionEnd);

            startText += "![";
            endText = '](' + encodeURI(link) + ')' + endText;

            this.handleChange({ name: name, value: startText + midText + endText });
            this.$nextTick(this.handleSetSelection.bind(this, startText.length, startText.length + midText.length));
        }
    }, {
        key: 'handleQuote',
        value: function handleQuote() {
            var _props7 = this.props;
            var handler = _props7.handler;
            var value = _props7.value;
            var name = _props7.name;
            var _editor5 = this._editor;
            var selectionStart = _editor5.selectionStart;
            var selectionEnd = _editor5.selectionEnd;


            var startText = value.slice(0, selectionStart);
            var midText = value.slice(selectionStart, selectionEnd) || handler;
            var endText = value.slice(selectionEnd);
            var offset = 1;
            if (!startText.length && />\s*[\s\S]+[\r\n\f]+$/.test(midText) || /\s*/.test(endText) && /[\r\n\f]+>\s*[\s\S]+[\r\n\f]*$/.test(midText)) {
                midText = midText.replace(/[\s]*>\s*|[\r\n\f]*$/g, "");
            } else if (/[\r\n\f]+>\s*$/.test(startText) || /^[\r\n\f]*>\s*$/.test(startText)) {
                offset = 0;
                startText = startText.replace(/[\r\n\f]*>\s*$/, "");
                endText = endText.replace(/^[\r\n\f]*/, "");
            } else {
                startText += startText.length ? "\n> " : "> ";
                endText = "\n" + endText;
            }

            this.handleChange({ name: name, value: startText + midText + endText });
            this.$nextTick(this.handleSetSelection.bind(this, startText.length - offset, startText.length + midText.length + offset));
        }
    }, {
        key: 'handleOl',
        value: function handleOl() {
            var _props8 = this.props;
            var handler = _props8.handler;
            var value = _props8.value;
            var name = _props8.name;
            var _editor6 = this._editor;
            var selectionStart = _editor6.selectionStart;
            var selectionEnd = _editor6.selectionEnd;


            var startLine = value.slice(0, selectionStart).split(/[\r\n]/);
            var midText = value.slice(selectionStart, selectionEnd) || handler;
            var endLine = value.slice(selectionEnd).split(/[\r\n]/);

            startLine[startLine.length - 1] === "" && startLine.pop();
            endLine[0] === "" && endLine.shift();

            var startLength = startLine.length;
            var startLineLast = startLength ? startLine[startLength - 1] : "";
            if (/^(\s*)[1-9]+\.\s+[\s\S]+$/.test(midText) || /^(\s*)[1-9]+\.(\s+)$/.test(startLineLast)) {
                startLine.pop();
                startLine.push("");
                midText = midText.replace(/^(\s*)[1-9]+\.\s+/, "");
            } else {
                var listIndex = startLineLast.match(/^(\s*)[1-9]+/);
                listIndex = listIndex ? parseInt(listIndex[0]) + 1 + '. ' : '1. ';
                startLine.push(listIndex + ' ');
            }

            var lastStartIndex = startLine[startLine.length - 1].match(/^(\s*)[1-9]+/);
            lastStartIndex = lastStartIndex ? lastStartIndex[0] : 0;
            var i = 0;
            while (parseInt(lastStartIndex) !== 0) {
                if (/^(\s*)[1-9]+\s+[\s\S]*$/.test(endLine[i])) {
                    endLine[i] = endLine[i].replace(/^(\s*)[1-9]+/, function ($1) {
                        return '' + (parseInt($1) + 1);
                    });
                    i++;
                } else {
                    lastStartIndex = 0;
                }
            }

            var startText = startLine.join('\n');
            var endText = (endLine.length > 0 ? '\n' : "") + endLine.join('\n');

            this.handleChange({ name: name, value: startText + midText + endText });
            this.$nextTick(this.handleSetSelection.bind(this, startText.length - 1, startText.length + midText.length));
        }
    }, {
        key: 'handleUl',
        value: function handleUl() {
            var _props9 = this.props;
            var handler = _props9.handler;
            var value = _props9.value;
            var name = _props9.name;
            var _editor7 = this._editor;
            var selectionStart = _editor7.selectionStart;
            var selectionEnd = _editor7.selectionEnd;


            var startLine = value.slice(0, selectionStart).split(/[\r\n]/);
            var midText = value.slice(selectionStart, selectionEnd) || handler;
            var endLine = value.slice(selectionEnd).split(/[\r\n]/);

            startLine[startLine.length - 1] === "" && startLine.pop();
            endLine[0] === "" && endLine.shift();

            var startLength = startLine.length;
            var startLineLast = startLength ? startLine[startLength - 1] : "";
            if (/^(\s*)[\*\-\+]+\s+[\s\S]+$/.test(midText) || /^(\s*)[\*\-\+]+(\s+)$/.test(startLineLast)) {
                startLine.pop();
                startLine.push("");
                midText = midText.replace(/^(\s*)[\*\-\+]+\s+/, "");
            } else {
                var listIndex = startLineLast.match(/^(\s*)[\*\-\+]+/);
                listIndex = listIndex ? listIndex[0] + ' ' : '- ';
                startLine.push(listIndex + ' ');
            }

            var startText = startLine.join('\n');
            var endText = (endLine.length > 0 ? '\n' : "") + endLine.join('\n');

            this.handleChange({ name: name, value: startText + midText + endText });
            this.$nextTick(this.handleSetSelection.bind(this, startText.length - 1, startText.length + midText.length));
        }
    }, {
        key: 'handleTitle',
        value: function handleTitle() {
            var _props10 = this.props;
            var handler = _props10.handler;
            var value = _props10.value;
            var name = _props10.name;
            var _editor8 = this._editor;
            var selectionStart = _editor8.selectionStart;
            var selectionEnd = _editor8.selectionEnd;


            var startText = value.slice(0, selectionStart);
            var midText = value.slice(selectionStart, selectionEnd) || handler;
            var endText = value.slice(selectionEnd);

            var hasBreakInStart = !startText.length || /[\r\n\f]+$/.test(startText);

            if (/^[\s\S]*[\r\n\f]+={2,}$/.test(midText)) {
                midText = midText.replace(/=+$/, "----");
            } else if (/^[\s\S]*[\r\n\f]+-{2,}$/.test(midText)) {
                midText = "## " + midText.replace(/[\r\n\f]*-+$/, " ##");
            } else if (/^#{1,6}[\s\S]*(#{1,6})$/.test(midText)) {
                midText = midText.replace(/^#{1,6}\s*/, "").replace(/\s*#{1,6}$/, "");
            } else if (/[\r\n\f]+$/.test(midText) && /^={2,}/.test(endText) || /^[\r\n\f]+={2,}/.test(endText)) {
                endText = endText.replace(/=+/, "----");
            } else if (/[\r\n\f]+$/.test(midText) && /^-{2,}/.test(endText) || /^[\r\n\f]+-{2,}/.test(endText)) {
                startText = startText + (hasBreakInStart ? "" : "\n") + "## ";
                midText = midText.replace(/[\r\n\f]*/g, "");
                endText = endText.replace(/^[\r\n\f]*-+/, " ##");
            } else if (/#{1,6}(\s*)$/.test(startText)) {
                startText = startText.replace(/#{1,6}(\s*)$/, "");
                endText = endText.replace(/^(\s*)#{1,6}/, "");
            } else {
                startText = startText + (hasBreakInStart ? "" : "\n");
                endText = "\n====" + (/^[\r\n\f]+/.test(endText) ? "" : "\n") + endText;
            }

            this.handleChange({ name: name, value: startText + midText + endText });
            this.$nextTick(this.handleSetSelection.bind(this, startText.length, startText.length + midText.length));
        }
    }, {
        key: 'handleHr',
        value: function handleHr() {
            var node = this._editor;
            var _props11 = this.props;
            var value = _props11.value;
            var name = _props11.name;
            var selectionStart = node.selectionStart;
            var selectionEnd = node.selectionEnd;


            this.handleChange({
                name: name,
                value: '' + value.slice(0, selectionStart) + (selectionStart && '\n\n' || '') + '----\n' + value.slice(selectionEnd)
            });
            node.focus();
        }
    }, {
        key: 'handleRedo',
        value: function handleRedo() {
            var _this3 = this;

            var cacheForRedo = this.state.cacheForRedo;

            if (cacheForRedo.length) {
                (function () {
                    var name = _this3.props.name;

                    _this3.setState(function (prev) {
                        _this3.handleChange({ name: name, value: prev.cacheForRedo.pop() });
                        return prev;
                    });
                })();
            }
        }
    }, {
        key: 'handleUndo',
        value: function handleUndo() {
            var _this4 = this;

            var _state2 = this.state;
            var cacheForRedo = _state2.cacheForRedo;
            var cacheForUndo = _state2.cacheForUndo;
            var _props12 = this.props;
            var maxCache = _props12.maxCache;
            var value = _props12.value;
            var name = _props12.name;

            if (cacheForUndo.length) {
                this.setState(function (prev) {
                    var cache = cacheForUndo.pop();
                    prev.cacheForRedo.push(value);
                    _this4.handleChange({ name: name, value: cache });
                    if (cacheForRedo.length > maxCache) {
                        prev.cacheForRedo.shift();
                    }
                    return prev;
                });
            }
        }
    }, {
        key: 'handlePaste',
        value: function handlePaste(e) {
            var clip = e.clipboardData;
            for (var i = clip.items.length; i--;) {
                var item = clip.items[i];
                if (item.kind === 'file' && ~item.type.indexOf('image')) {
                    var img = item.getAsFile();
                    this.upload(img);
                }
            }
        }
    }, {
        key: 'upload',
        value: function upload(file) {
            var _this5 = this;

            this.props.onUpload(file, function (path) {
                if (path) {
                    _this5.setState(function (prev) {
                        prev.imgUrl = path;
                        return prev;
                    }, function () {
                        _this5.handleGetImg(true);
                    });
                } else {
                    _this5.handleGetImg(false);
                }
            });
        }
    }, {
        key: 'toolbarRender',
        value: function toolbarRender() {
            return _react2['default'].createElement(
                'div',
                { className: 'editor-toolbar' },
                _react2['default'].createElement(
                    'ul',
                    { className: 'editor__menu clearfix' },
                    _react2['default'].createElement(
                        _popover2['default'],
                        { trigger: 'hover', title: '\u52A0\u7C97 <strong> Ctrl+B' },
                        _react2['default'].createElement(
                            'li',
                            { className: 'wmd-button' },
                            _react2['default'].createElement('a', { className: 'fa fa-bold', onClick: this.handleBold.bind(this) })
                        )
                    ),
                    _react2['default'].createElement(
                        _popover2['default'],
                        { trigger: 'hover', title: '\u659C\u4F53 <em> Ctrl+I' },
                        _react2['default'].createElement(
                            'li',
                            { className: 'wmd-button' },
                            _react2['default'].createElement('a', { className: 'fa fa-italic', onClick: this.handleItalic.bind(this) })
                        )
                    ),
                    _react2['default'].createElement('li', { className: 'editor__menu--divider wmd-spacer1' }),
                    _react2['default'].createElement(
                        _popover2['default'],
                        { trigger: 'hover', title: '\u94FE\u63A5 <a> Ctrl+L' },
                        _react2['default'].createElement(
                            'li',
                            { className: 'wmd-button' },
                            _react2['default'].createElement('a', { className: 'fa fa-link', onClick: this.handleLink.bind(this) })
                        )
                    ),
                    _react2['default'].createElement(
                        _popover2['default'],
                        { trigger: 'hover', title: '\u5F15\u7528 <blockquote> Ctrl+Q' },
                        _react2['default'].createElement(
                            'li',
                            { className: 'wmd-button' },
                            _react2['default'].createElement('a', { className: 'fa fa-quote-left', onClick: this.handleQuote.bind(this) })
                        )
                    ),
                    _react2['default'].createElement(
                        _popover2['default'],
                        { trigger: 'hover', title: '\u56FE\u7247 <img> Ctrl+G' },
                        _react2['default'].createElement(
                            'li',
                            { className: 'wmd-button' },
                            _react2['default'].createElement('a', { className: 'fa fa-image', onClick: this.handleImg.bind(this) })
                        )
                    ),
                    _react2['default'].createElement('li', { className: 'editor__menu--divider wmd-spacer2' }),
                    _react2['default'].createElement(
                        _popover2['default'],
                        { trigger: 'hover', title: '\u6570\u5B57\u5217\u8868 <ol> Ctrl+O' },
                        _react2['default'].createElement(
                            'li',
                            { className: 'wmd-button' },
                            _react2['default'].createElement('a', { className: 'fa fa-list-ol', onClick: this.handleOl.bind(this) })
                        )
                    ),
                    _react2['default'].createElement(
                        _popover2['default'],
                        { trigger: 'hover', title: '\u666E\u901A\u5217\u8868 <ul> Ctrl+U' },
                        _react2['default'].createElement(
                            'li',
                            { className: 'wmd-button' },
                            _react2['default'].createElement('a', { className: 'fa fa-list-ul', onClick: this.handleUl.bind(this) })
                        )
                    ),
                    _react2['default'].createElement(
                        _popover2['default'],
                        { trigger: 'hover', title: '\u6807\u9898 <h1>/<h2> Ctrl+H' },
                        _react2['default'].createElement(
                            'li',
                            { className: 'wmd-button' },
                            _react2['default'].createElement('a', { className: 'fa fa-header', onClick: this.handleTitle.bind(this) })
                        )
                    ),
                    _react2['default'].createElement(
                        _popover2['default'],
                        { trigger: 'hover', title: '\u5206\u5272\u7EBF <hr> Ctrl+R' },
                        _react2['default'].createElement(
                            'li',
                            { className: 'wmd-button' },
                            _react2['default'].createElement(
                                'a',
                                { className: 'fa fa-hr', onClick: this.handleHr.bind(this) },
                                'hr'
                            )
                        )
                    ),
                    _react2['default'].createElement('li', { className: 'editor__menu--divider wmd-spacer3' }),
                    _react2['default'].createElement(
                        _popover2['default'],
                        { trigger: 'hover', title: '\u64A4\u9500 - Ctrl+Z' },
                        _react2['default'].createElement(
                            'li',
                            { className: 'wmd-button' },
                            _react2['default'].createElement('a', { className: "fa fa-undo" + (!this.state.cacheForUndo.length ? ' disabled' : ''),
                                onClick: this.handleUndo.bind(this) })
                        )
                    ),
                    _react2['default'].createElement(
                        _popover2['default'],
                        { trigger: 'hover', title: '\u91CD\u505A - Ctrl+Shift+Z' },
                        _react2['default'].createElement(
                            'li',
                            { className: 'wmd-button' },
                            _react2['default'].createElement('a', { className: "fa fa-repeat" + (!this.state.cacheForRedo.length ? ' disabled' : ''),
                                onClick: this.handleRedo.bind(this) })
                        )
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var _state3 = this.state;
            var link = _state3.link;
            var imgUrl = _state3.imgUrl;
            var imgVisible = _state3.imgVisible;
            var linkVisible = _state3.linkVisible;
            var _props13 = this.props;
            var name = _props13.name;
            var value = _props13.value;
            var placeholder = _props13.placeholder;
            var linkPlaceholder = _props13.linkPlaceholder;
            var imgPlaceholder = _props13.imgPlaceholder;
            var linkModalTitle = _props13.linkModalTitle;
            var canUploadImg = _props13.canUploadImg;
            var linkImgTitle = _props13.linkImgTitle;
            var uploadImgTitle = _props13.uploadImgTitle;

            return _react2['default'].createElement(
                'div',
                { className: 'editor' },
                this.toolbarRender(),
                _react2['default'].createElement(
                    'div',
                    { className: 'wmd' },
                    _react2['default'].createElement('textarea', {
                        name: name,
                        value: value,
                        ref: function ref(c) {
                            _this6._editor = c;
                        },
                        placeholder: placeholder,
                        onPaste: this.handlePaste.bind(this),
                        onChange: this.handleChange.bind(this),
                        onKeyDown: this.handleKeyDown.bind(this),
                        className: 'mono el-textarea__inner form-control wmd-input'
                    }),
                    _react2['default'].createElement('div', { className: 'editor-line' }),
                    _react2['default'].createElement('div', { className: 'editor-preview', dangerouslySetInnerHTML: { __html: parser.makeHtml(value) } })
                ),
                _react2['default'].createElement(
                    _modal2['default'],
                    {
                        size: 'small',
                        visible: linkVisible,
                        title: linkModalTitle,
                        onOk: this.handleGetLink.bind(this, true),
                        onClose: this.handleGetLink.bind(this, false)
                    },
                    _react2['default'].createElement(_input2['default'], {
                        name: 'link',
                        type: 'text',
                        value: link,
                        className: 'editor-input',
                        placeholder: linkPlaceholder,
                        autoFocus: true, onChange: this.handleModalChange.bind(this) })
                ),
                _react2['default'].createElement(
                    _modal2['default'],
                    {
                        visible: imgVisible,
                        className: 'el-editor-modal',
                        onOk: this.handleGetImg.bind(this, true),
                        onClose: this.handleGetImg.bind(this, false)
                    },
                    _react2['default'].createElement(
                        _tabs2['default'],
                        { defaultActiveKey: canUploadImg ? "1" : "2" },
                        canUploadImg && _react2['default'].createElement(
                            _tabPanel2['default'],
                            { label: uploadImgTitle, key: '1' },
                            _react2['default'].createElement(
                                _uploader2['default'],
                                {
                                    onUpload: function onUpload(fileList) {
                                        _this6.upload(fileList.item(0));
                                    } },
                                _react2['default'].createElement(
                                    'div',
                                    { className: 'el-uploader-inner' },
                                    imgUrl ? _react2['default'].createElement('img', { src: imgUrl }) : _react2['default'].createElement(
                                        'div',
                                        { style: { padding: "30px 0" } },
                                        _react2['default'].createElement('div', { className: 'el-uploader-icon fa fa-cloud-upload fa-3x' }),
                                        _react2['default'].createElement(
                                            'div',
                                            { className: 'el-uploader-text' },
                                            '\u4E0A\u4F20\u56FE\u7247'
                                        )
                                    )
                                )
                            )
                        ),
                        _react2['default'].createElement(
                            _tabPanel2['default'],
                            { label: linkImgTitle, key: '2' },
                            _react2['default'].createElement(_input2['default'], {
                                type: 'text',
                                name: 'imgUrl',
                                value: imgUrl,
                                className: 'editor-input',
                                placeholder: imgPlaceholder,
                                autoFocus: true, onChange: this.handleModalChange.bind(this)
                            })
                        )
                    )
                )
            );
        }
    }]);

    return Editor;
}(_react.Component);

exports['default'] = Editor;


Editor.propTypes = {
    name: _propTypes2['default'].string,
    value: _propTypes2['default'].string,
    onUpload: _propTypes2['default'].func,
    handler: _propTypes2['default'].string,
    maxCache: _propTypes2['default'].number,
    originText: _propTypes2['default'].string,
    canUploadImg: _propTypes2['default'].bool,
    placeholder: _propTypes2['default'].string,
    linkImgTitle: _propTypes2['default'].string,
    uploadImgTitle: _propTypes2['default'].string,
    imgPlaceholder: _propTypes2['default'].string,
    linkModalTitle: _propTypes2['default'].string,
    linkPlaceholder: _propTypes2['default'].string,
    onChange: _propTypes2['default'].func.isRequired
};

Editor.defaultProps = {
    value: '',
    maxCache: 6,
    onChange: function onChange() {},
    onUpload: function onUpload() {},
    handler: 'handler',
    canUploadImg: false,
    linkImgTitle: '网络资源',
    linkModalTitle: '插入链接',
    placeholder: '撰写内容...',
    uploadImgTitle: '上传图片',
    linkPlaceholder: '请输入链接地址...',
    imgPlaceholder: '请输入图片所在网址...'
};