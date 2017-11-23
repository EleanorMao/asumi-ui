/**
 * Created by elly on 2017/6/2.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal';
import Input from '../input';
import Tabs from '../tabs';
import Popover from '../popover';
import Uploader from '../upload';
import TabPanel from '../tabs/tabPanel';
import {noop} from "../util";

const HyperDown = require('hyperdown');

const parser = new HyperDown;

export default class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: "",
            link: "http://",
            cacheForUndo: [],
            cacheForRedo: [],
            imgVisible: false,
            linkVisible: false
        }
    }

    componentWillUpdate(nextProps) {
        let newValue = nextProps.value;
        let oldValue = this.props.value;
        if (oldValue !== newValue) {
            let {maxCache} = this.props;
            let {cacheForRedo, cacheForUndo} = this.state;
            let length = cacheForRedo.length;
            if (!length || oldValue !== cacheForRedo[length - 1]) {
                this.setState(prev => {
                    prev.cacheForUndo.push(oldValue);
                    if (cacheForUndo.length > maxCache) {
                        prev.cacheForUndo.shift();
                    }
                    return prev;
                });
            }

        }
    }

    $nextTick(func) {
        setTimeout(func, 0);
    }

    handleChange(e) {
        let {name, value} = e.target || e;
        this.props.onChange({name, value, parsedValue: parser.makeHtml(value)});
    }

    handleModalChange({name, value}) {
        this.setState(prev => {
            prev[name] = value;
            return prev;
        })
    }

    handleKeyDown(e) {
        const key = e.key.toUpperCase();
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

    handleSetSelection(startOffset, endOffset) {
        const node = this._editor;
        node.focus();
        node.setSelectionRange(startOffset, endOffset);
    }

    handleBold() {
        const {handler, value, name} = this.props;
        const {selectionStart, selectionEnd} = this._editor;

        let startText = value.slice(0, selectionStart);
        let midText = value.slice(selectionStart, selectionEnd) || handler;
        let endText = value.slice(selectionEnd);

        if (/^\*{2}[\s\S]+\*{2}$/.test(midText)) {
            midText = midText.replace(/^\*{2}|\*{2}$/g, "");
        } else if (/\*{2}$/.test(startText) && /^\*{2}/.test(endText)) {
            startText = startText.replace(/\*{2}$/, "");
            endText = endText.replace(/^\*{2}/, "");
        } else {
            startText += "**";
            endText = "**" + endText;
        }

        this.handleChange({name, value: startText + midText + endText});
        this.$nextTick(this.handleSetSelection.bind(this, startText.length, startText.length + midText.length));
    }

    handleItalic() {
        const {handler, value, name} = this.props;
        const {selectionStart, selectionEnd} = this._editor;

        let startText = value.slice(0, selectionStart);
        let midText = value.slice(selectionStart, selectionEnd) || handler;
        let endText = value.slice(selectionEnd);

        if (/^\*[\s\S]+\*$/.test(midText)) {
            midText = midText.replace(/^\*|\*$/g, "");
        } else if (/\*+$/.test(startText) && /^\*+/.test(endText)) {
            startText = startText.replace(/\*+$/, ($1, offset, str) => {
                return $1.slice(1);
            });
            endText = endText.replace(/^\*+/, ($1, offset, str) => {
                return $1.slice(1);
            })
        } else {
            startText += "*";
            endText = "*" + endText;
        }

        this.handleChange({name, value: startText + midText + endText});
        this.$nextTick(this.handleSetSelection.bind(this, startText.length, startText.length + midText.length));
    }

    handleLink() {
        const {selectionStart, selectionEnd} = this._editor;
        if (selectionStart !== selectionEnd) {
            const {value, name} = this.props;
            let startText = value.slice(0, selectionStart);
            let midText = value.slice(selectionStart, selectionEnd);
            let endText = value.slice(selectionEnd);
            if (/\[$/.test(startText) && /^]\([\s\S]*\)/.test(endText)) {
                startText = startText.replace(/\[$/, "")
                endText = endText.replace(/^]\([\s\S]*\)/, "")
            } else if (/^(\s*)\[[\s\S]*\]\([\s\S]*\)(\s*)$/.test(midText)) {
                midText = midText.replace(/^(\s*)\[/, "").replace(/]\([\s\S]*\)(\s*)$/, "");
            }

            this.handleChange({name, value: startText + midText + endText});
            this.$nextTick(this.handleSetSelection.bind(this, startText.length, startText.length + midText.length));
        } else {
            this.setState({linkVisible: true});
        }
    }

    handleGetLink(getLink) {
        const node = this._editor;
        if (!getLink) {
            this.setState({link: "http://", linkVisible: false});
            node.focus();
            return;
        }

        const link = this.state.link;
        const length = link.length;
        this.setState({link: "http://", linkVisible: false});

        const {selectionStart, selectionEnd} = node;
        const {handler, value, name} = this.props;

        let startText = value.slice(0, selectionStart);
        let midText = value.slice(selectionStart, selectionEnd) || handler;
        let endText = value.slice(selectionEnd);

        startText += "[";
        endText = `](${encodeURI(link)})${endText}`;

        this.handleChange({name, value: startText + midText + endText});
        this.$nextTick(this.handleSetSelection.bind(this, startText.length, startText.length + midText.length));
    }

    handleImg() {
        const {selectionStart, selectionEnd} = this._editor;
        if (selectionStart !== selectionEnd) {
            const {value, name} = this.props;
            let startText = value.slice(0, selectionStart);
            let midText = value.slice(selectionStart, selectionEnd);
            let endText = value.slice(selectionEnd);
            if (/!\[$/.test(startText) && /^]\([\s\S]*\)/.test(endText)) {
                startText = startText.replace(/!\[$/, "");
                endText = endText.replace(/^]\([\s\S]*\)/, "");
            } else if (/^(\s*)!\[[\s\S]*\]\([\s\S]*\)(\s*)$/.test(midText)) {
                midText = midText.replace(/^(\s*)!\[/, "").replace(/]\([\s\S]*\)(\s*)$/, "");
            } else {
                this.setState({imgVisible: true});
                return;
            }

            this.handleChange({name, value: startText + midText + endText});
            this.$nextTick(this.handleSetSelection.bind(this, startText.length, startText.length + midText.length));
        } else {
            this.setState({imgVisible: true});
        }
    }

    handleGetImg(getLink) {
        const node = this._editor;
        if (!getLink) {
            this.setState({imgUrl: "", imgVisible: false});
            node.focus();
            return;
        }

        const link = this.state.imgUrl;
        const length = link.length;
        this.setState({imgUrl: "", imgVisible: false});

        const {selectionStart, selectionEnd} = node;
        const {handler, value, name} = this.props;

        let startText = value.slice(0, selectionStart);
        let midText = value.slice(selectionStart, selectionEnd) || handler;
        let endText = value.slice(selectionEnd);

        startText += "![";
        endText = `](${encodeURI(link)})${endText}`;

        this.handleChange({name, value: startText + midText + endText});
        this.$nextTick(this.handleSetSelection.bind(this, startText.length, startText.length + midText.length));
    }

    handleQuote() {
        const {handler, value, name} = this.props;
        const {selectionStart, selectionEnd} = this._editor;

        let startText = value.slice(0, selectionStart);
        let midText = value.slice(selectionStart, selectionEnd) || handler;
        let endText = value.slice(selectionEnd);
        let offset = 1;
        if ((!startText.length && />\s*[\s\S]+[\r\n\f]+$/.test(midText)) || (/\s*/.test(endText) && /[\r\n\f]+>\s*[\s\S]+[\r\n\f]*$/.test(midText))) {
            midText = midText.replace(/[\s]*>\s*|[\r\n\f]*$/g, "");
        } else if (/[\r\n\f]+>\s*$/.test(startText) || /^[\r\n\f]*>\s*$/.test(startText)) {
            offset = 0;
            startText = startText.replace(/[\r\n\f]*>\s*$/, "");
            endText = endText.replace(/^[\r\n\f]*/, "")
        } else {
            startText += startText.length ? "\n> " : "> ";
            endText = "\n" + endText;
        }

        this.handleChange({name, value: startText + midText + endText});
        this.$nextTick(this.handleSetSelection.bind(this, startText.length - offset, startText.length + midText.length + offset));
    }

    handleOl() {
        const {handler, value, name} = this.props;
        const {selectionStart, selectionEnd} = this._editor;

        let startLine = value.slice(0, selectionStart).split(/[\r\n]/);
        let midText = value.slice(selectionStart, selectionEnd) || handler;
        let endLine = value.slice(selectionEnd).split(/[\r\n]/);

        startLine[startLine.length - 1] === "" && startLine.pop();
        endLine[0] === "" && endLine.shift();

        let startLength = startLine.length;
        let startLineLast = startLength ? startLine[startLength - 1] : "";
        if (/^(\s*)[1-9]+\.\s+[\s\S]+$/.test(midText) || /^(\s*)[1-9]+\.(\s+)$/.test(startLineLast)) {
            startLine.pop();
            startLine.push("");
            midText = midText.replace(/^(\s*)[1-9]+\.\s+/, "");
        } else {
            let listIndex = startLineLast.match(/^(\s*)[1-9]+/);
            listIndex = listIndex ? `${parseInt(listIndex[0]) + 1}. ` : '1. ';
            startLine.push(`${listIndex} `);
        }

        let lastStartIndex = startLine[startLine.length - 1].match(/^(\s*)[1-9]+/);
        lastStartIndex = lastStartIndex ? lastStartIndex[0] : 0;
        let i = 0;
        while (parseInt(lastStartIndex) !== 0) {
            if (/^(\s*)[1-9]+\s+[\s\S]*$/.test(endLine[i])) {
                endLine[i] = endLine[i].replace(/^(\s*)[1-9]+/, ($1) => {
                    return `${parseInt($1) + 1}`;
                });
                i++;
            } else {
                lastStartIndex = 0;
            }
        }

        let startText = startLine.join('\n');
        let endText = (endLine.length > 0 ? '\n' : "") + endLine.join('\n');

        this.handleChange({name, value: startText + midText + endText});
        this.$nextTick(this.handleSetSelection.bind(this, startText.length - 1, startText.length + midText.length));
    }

    handleUl() {
        const {handler, value, name} = this.props;
        const {selectionStart, selectionEnd} = this._editor;

        let startLine = value.slice(0, selectionStart).split(/[\r\n]/);
        let midText = value.slice(selectionStart, selectionEnd) || handler;
        let endLine = value.slice(selectionEnd).split(/[\r\n]/);

        startLine[startLine.length - 1] === "" && startLine.pop();
        endLine[0] === "" && endLine.shift();

        let startLength = startLine.length;
        let startLineLast = startLength ? startLine[startLength - 1] : "";
        if (/^(\s*)[\*\-\+]+\s+[\s\S]+$/.test(midText) || /^(\s*)[\*\-\+]+(\s+)$/.test(startLineLast)) {
            startLine.pop();
            startLine.push("");
            midText = midText.replace(/^(\s*)[\*\-\+]+\s+/, "");
        } else {
            let listIndex = startLineLast.match(/^(\s*)[\*\-\+]+/);
            listIndex = listIndex ? `${listIndex[0]} ` : '- ';
            startLine.push(`${listIndex} `);
        }

        let startText = startLine.join('\n');
        let endText = (endLine.length > 0 ? '\n' : "") + endLine.join('\n');

        this.handleChange({name, value: startText + midText + endText});
        this.$nextTick(this.handleSetSelection.bind(this, startText.length - 1, startText.length + midText.length));
    }

    handleTitle() {
        const {handler, value, name} = this.props;
        const {selectionStart, selectionEnd} = this._editor;

        let startText = value.slice(0, selectionStart);
        let midText = value.slice(selectionStart, selectionEnd) || handler;
        let endText = value.slice(selectionEnd);

        let hasBreakInStart = !startText.length || /[\r\n\f]+$/.test(startText);

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

        this.handleChange({name, value: startText + midText + endText});
        this.$nextTick(this.handleSetSelection.bind(this, startText.length, startText.length + midText.length));
    }

    handleHr() {
        const node = this._editor;
        const {value, name} = this.props;
        const {selectionStart, selectionEnd} = node;

        this.handleChange({
            name,
            value: `${value.slice(0, selectionStart)}${selectionStart && '\n\n' || ''}----\n${value.slice(selectionEnd)}`
        });
        node.focus();
    }

    handleRedo() {
        let {cacheForRedo} = this.state;
        if (cacheForRedo.length) {
            const {name} = this.props;
            this.setState(prev => {
                this.handleChange({name, value: prev.cacheForRedo.pop()});
                return prev;
            })
        }
    }

    handleUndo() {
        let {cacheForRedo, cacheForUndo} = this.state;
        let {maxCache, value, name} = this.props;
        if (cacheForUndo.length) {
            this.setState(prev => {
                let cache = cacheForUndo.pop();
                prev.cacheForRedo.push(value);
                this.handleChange({name, value: cache});
                if (cacheForRedo.length > maxCache) {
                    prev.cacheForRedo.shift();
                }
                return prev;
            });
        }
    }

    handlePaste(e) {
        let clip = e.clipboardData;
        for (let i = clip.items.length; i--;) {
            let item = clip.items[i];
            if (item.kind === 'file' && ~item.type.indexOf('image')) {
                let img = item.getAsFile();
                this.upload(img)
            }
        }
    }

    upload(file) {
        this.props.onUpload(file, (path) => {
            if (path) {
                this.setState(prev => {
                    prev.imgUrl = path;
                    return prev;
                }, () => {
                    this.handleGetImg(true)
                });
            } else {
                this.handleGetImg(false)
            }
        });
    }

    toolbarRender() {
        return (
            <div className="editor-toolbar">
                <ul className="editor__menu clearfix">
                    <Popover trigger="hover" title="加粗 <strong> Ctrl+B">
                        <li className="wmd-button">
                            <a className="fa fa-bold" onClick={this.handleBold.bind(this)}/>
                        </li>
                    </Popover>
                    <Popover trigger="hover" title="斜体 <em> Ctrl+I">
                        <li className="wmd-button">
                            <a className="fa fa-italic" onClick={this.handleItalic.bind(this)}/>
                        </li>
                    </Popover>
                    <li className="editor__menu--divider wmd-spacer1"/>
                    <Popover trigger="hover" title="链接 <a> Ctrl+L">
                        <li className="wmd-button">
                            <a className="fa fa-link" onClick={this.handleLink.bind(this)}/>
                        </li>
                    </Popover>
                    <Popover trigger="hover" title="引用 <blockquote> Ctrl+Q">
                        <li className="wmd-button">
                            <a className="fa fa-quote-left" onClick={this.handleQuote.bind(this)}/>
                        </li>
                    </Popover>
                    <Popover trigger="hover" title="图片 <img> Ctrl+G">
                        <li className="wmd-button">
                            <a className="fa fa-image" onClick={this.handleImg.bind(this)}/>
                        </li>
                    </Popover>
                    <li className="editor__menu--divider wmd-spacer2"/>
                    <Popover trigger="hover" title="数字列表 <ol> Ctrl+O">
                        <li className="wmd-button">
                            <a className="fa fa-list-ol" onClick={this.handleOl.bind(this)}/>
                        </li>
                    </Popover>
                    <Popover trigger="hover" title="普通列表 <ul> Ctrl+U">
                        <li className="wmd-button">
                            <a className="fa fa-list-ul" onClick={this.handleUl.bind(this)}/>
                        </li>
                    </Popover>
                    <Popover trigger="hover" title="标题 <h1>/<h2> Ctrl+H">
                        <li className="wmd-button">
                            <a className="fa fa-header" onClick={this.handleTitle.bind(this)}/>
                        </li>
                    </Popover>
                    <Popover trigger="hover" title="分割线 <hr> Ctrl+R">
                        <li className="wmd-button">
                            <a className="fa fa-hr" onClick={this.handleHr.bind(this)}>hr</a>
                        </li>
                    </Popover>
                    <li className="editor__menu--divider wmd-spacer3"/>
                    <Popover trigger="hover" title="撤销 - Ctrl+Z">
                        <li className="wmd-button">
                            <a className={"fa fa-undo" + (!this.state.cacheForUndo.length ? ' disabled' : '')}
                               onClick={this.handleUndo.bind(this)}/>
                        </li>
                    </Popover>
                    <Popover trigger="hover" title="重做 - Ctrl+Shift+Z">
                        <li className="wmd-button">
                            <a className={"fa fa-repeat" + (!this.state.cacheForRedo.length ? ' disabled' : '')}
                               onClick={this.handleRedo.bind(this)}/>
                        </li>
                    </Popover>
                </ul>
            </div>
        )
    }

    render() {
        let {link, imgUrl, imgVisible, linkVisible} = this.state;
        let {name, value, placeholder, linkPlaceholder, imgPlaceholder, linkModalTitle, canUploadImg, linkImgTitle, uploadImgTitle} = this.props;
        return (
            <div className="editor">
                {this.toolbarRender()}
                <div className="wmd">
                    <textarea
                        name={name}
                        value={value}
                        ref={(c) => {
                            this._editor = c
                        }}
                        placeholder={placeholder}
                        onPaste={this.handlePaste.bind(this)}
                        onChange={this.handleChange.bind(this)}
                        onKeyDown={this.handleKeyDown.bind(this)}
                        className="mono el-textarea__inner form-control wmd-input"
                    />
                    <div className="editor-line"/>
                    <div className="editor-preview" dangerouslySetInnerHTML={{__html: parser.makeHtml(value)}}/>
                </div>
                <Modal
                    size="small"
                    visible={linkVisible}
                    title={linkModalTitle}
                    onOk={this.handleGetLink.bind(this, true)}
                    onClose={this.handleGetLink.bind(this, false)}
                >
                    <Input
                        name="link"
                        type="text"
                        value={link}
                        className="editor-input"
                        placeholder={linkPlaceholder}
                        autoFocus onChange={this.handleModalChange.bind(this)}/>
                </Modal>
                <Modal
                    visible={imgVisible}
                    className="el-editor-modal"
                    onOk={this.handleGetImg.bind(this, true)}
                    onClose={this.handleGetImg.bind(this, false)}
                >
                    <Tabs defaultActiveKey={canUploadImg ? "1" : "2"}>
                        {canUploadImg &&
                        <TabPanel label={uploadImgTitle} key="1">
                            <Uploader
                                onUpload={(fileList) => {
                                    this.upload(fileList.item(0))
                                }}>
                                <div className="el-uploader-inner">
                                    {imgUrl ?
                                        <img src={imgUrl}/> :
                                        <div style={{padding: "30px 0"}}>
                                            <div className="el-uploader-icon fa fa-cloud-upload fa-3x"/>
                                            <div className="el-uploader-text">上传图片</div>
                                        </div>
                                    }
                                </div>
                            </Uploader>
                        </TabPanel>}
                        <TabPanel label={linkImgTitle} key="2">
                            <Input
                                type="text"
                                name="imgUrl"
                                value={imgUrl}
                                className="editor-input"
                                placeholder={imgPlaceholder}
                                autoFocus onChange={this.handleModalChange.bind(this)}
                            />
                        </TabPanel>
                    </Tabs>
                </Modal>
            </div>
        )
    }
}

Editor.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    onUpload: PropTypes.func,
    handler: PropTypes.string,
    maxCache: PropTypes.number,
    originText: PropTypes.string,
    canUploadImg: PropTypes.bool,
    placeholder: PropTypes.string,
    linkImgTitle: PropTypes.string,
    uploadImgTitle: PropTypes.string,
    imgPlaceholder: PropTypes.string,
    linkModalTitle: PropTypes.string,
    linkPlaceholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

Editor.defaultProps = {
    value: '',
    maxCache: 6,
    onChange: noop,
    onUpload: noop,
    handler: 'handler',
    canUploadImg: false,
    linkImgTitle: '网络资源',
    linkModalTitle: '插入链接',
    placeholder: '撰写内容...',
    uploadImgTitle: '上传图片',
    linkPlaceholder: '请输入链接地址...',
    imgPlaceholder: '请输入图片所在网址...',
};