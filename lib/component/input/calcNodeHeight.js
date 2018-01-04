'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = calculateNodeHeight;
//Thank you https://github.com/andreypopp/react-textarea-autosize/blob/master/src/calculateNodeHeight.js && ant.design

var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
var isIE = isBrowser ? !!document.documentElement.currentStyle : false;

var HIDDEN_TEXTAREA_STYLE = '\n  top:0 !important;\n  right:0 !important;\n  height:0 !important;\n  min-height:0 !important;\n  z-index:-1000 !important;\n  max-height:none !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  visibility:hidden !important;\n';

var SIZING_STYLE = ['width', 'font-size', 'box-sizing', 'line-height', 'padding-top', 'font-family', 'font-weight', 'text-indent', 'padding-left', 'border-width', 'padding-right', 'letter-spacing', 'padding-bottom', 'text-rendering', 'text-transform'];

var hiddenTextarea = void 0;

function calculateNodeStyling(node) {
    var style = window.getComputedStyle(node);
    if (style === null) {
        return null;
    }
    var boxSizing = style.getPropertyValue('box-sizing') || style.getPropertyValue('-webkit-box-sizing') || style.getPropertyValue('-moz-box-sizing') || style.getPropertyValue('-ms-box-sizing');

    var paddingSize = parseFloat(style.getPropertyValue('padding-bottom')) + parseFloat(style.getPropertyValue('padding-top'));

    var borderSize = parseFloat(style.getPropertyValue('border-bottom-width')) + parseFloat(style.getPropertyValue('border-top-width'));

    var sizingStyle = SIZING_STYLE.map(function (name) {
        if (isIE && boxSizing === 'border-box' && name === 'width') {
            return name + ":" + parseFloat(style.getPropertyValue(name)) + parseFloat(style['border-right-width']) + parseFloat(style['border-left-width']) + parseFloat(style['padding-right']) + parseFloat(style['padding-left']) + 'px';
        } else {
            return name + ":" + style.getPropertyValue(name);
        }
    }).join(';');

    return {
        sizingStyle: sizingStyle,
        paddingSize: paddingSize,
        borderSize: borderSize,
        boxSizing: boxSizing
    };
}

function calculateNodeHeight(node) {
    var minRows = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var maxRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (!hiddenTextarea) {
        hiddenTextarea = document.createElement('textarea');
        document.body.appendChild(hiddenTextarea);
    }
    if (node.getAttribute('wrap')) {
        //wrap: off
        hiddenTextarea.setAttribute('wrap', node.getAttribute('wrap'));
    } else {
        hiddenTextarea.removeAttribute('wrap');
    }

    var nodeStyle = calculateNodeStyling(node);
    if (nodeStyle === null) {
        return {};
    }

    hiddenTextarea.setAttribute('style', nodeStyle.sizingStyle + ";" + HIDDEN_TEXTAREA_STYLE);
    hiddenTextarea.value = node.value || node.placeholder || '';

    var minHeight = Number.MIN_SAFE_INTEGER;
    var maxHeight = Number.MAX_SAFE_INTEGER;
    var height = hiddenTextarea.scrollHeight;

    var overflowY = void 0;
    if (nodeStyle.boxSizing === 'border-box') {
        height = height + nodeStyle.borderSize;
    } else if (nodeStyle.boxSizing === 'content-box') {
        height = height - nodeStyle.paddingSize;
    }
    if (minRows !== null || maxRows !== null) {
        hiddenTextarea.value = '';
        var singleRowHeight = hiddenTextarea.scrollHeight - nodeStyle.paddingSize;
        if (minRows !== null) {
            minHeight = singleRowHeight * minRows;
            if (nodeStyle.boxSizing === 'border-box') {
                minHeight = minHeight + nodeStyle.paddingSize + nodeStyle.borderSize;
            }
            height = Math.max(minHeight, height);
        }
        if (maxRows !== null) {
            maxHeight = singleRowHeight * maxRows;
            if (nodeStyle.boxSizing === 'border-box') {
                maxHeight = maxHeight + nodeStyle.paddingSize + nodeStyle.borderSize;
            }
            overflowY = height > maxHeight ? '' : 'hidden';
            height = Math.min(maxHeight, height);
        }
    }
    if (!maxRows) {
        overflowY = 'hidden';
    }
    return { height: height, minHeight: minHeight, maxHeight: maxHeight, overflowY: overflowY };
}