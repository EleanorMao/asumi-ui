//Thank you https://github.com/andreypopp/react-textarea-autosize/blob/master/src/calculateNodeHeight.js && ant.design

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
const isIE = isBrowser ? !!document.documentElement.currentStyle : false;

const HIDDEN_TEXTAREA_STYLE = `
  top:0 !important;
  right:0 !important;
  height:0 !important;
  min-height:0 !important;
  z-index:-1000 !important;
  max-height:none !important;
  overflow:hidden !important;
  position:absolute !important;
  visibility:hidden !important;
`;

const SIZING_STYLE = [
    'width',
    'font-size',
    'box-sizing',
    'line-height',
    'padding-top',
    'font-family',
    'font-weight',
    'text-indent',
    'padding-left',
    'border-width',
    'padding-right',
    'letter-spacing',
    'padding-bottom',
    'text-rendering',
    'text-transform'
];

let hiddenTextarea;

function calculateNodeStyling(node) {
    let style = window.getComputedStyle(node);
    if (style === null) {
        return null;
    }
    let boxSizing = (style.getPropertyValue('box-sizing') ||
        style.getPropertyValue('-webkit-box-sizing') ||
        style.getPropertyValue('-moz-box-sizing') ||
        style.getPropertyValue('-ms-box-sizing'));

    let paddingSize = (parseFloat(style.getPropertyValue('padding-bottom')) +
        parseFloat(style.getPropertyValue('padding-top')));

    let borderSize = (parseFloat(style.getPropertyValue('border-bottom-width')) +
        parseFloat(style.getPropertyValue('border-top-width')));

    let sizingStyle = SIZING_STYLE.map(function (name) {
        if (isIE && boxSizing === 'border-box' && name === 'width') {
            return name + ":" + parseFloat(style.getPropertyValue(name)) +
                parseFloat(style['border-right-width']) +
                parseFloat(style['border-left-width']) +
                parseFloat(style['padding-right']) +
                parseFloat(style['padding-left']) +
                'px';
        } else {
            return name + ":" + style.getPropertyValue(name);
        }
    }).join(';');

    return {
        sizingStyle,
        paddingSize,
        borderSize,
        boxSizing,
    };
}

export default function calculateNodeHeight(node, minRows = null, maxRows = null) {
    if (!hiddenTextarea) {
        hiddenTextarea = document.createElement('textarea');
        document.body.appendChild(hiddenTextarea);
    }
    if (node.getAttribute('wrap')) {  //wrap: off
        hiddenTextarea.setAttribute('wrap', node.getAttribute('wrap'));
    } else {
        hiddenTextarea.removeAttribute('wrap');
    }

    let nodeStyle = calculateNodeStyling(node);
    if (nodeStyle === null) {
        return {};
    }

    hiddenTextarea.setAttribute('style', nodeStyle.sizingStyle + ";" + HIDDEN_TEXTAREA_STYLE);
    hiddenTextarea.value = node.value || node.placeholder || '';

    let minHeight = Number.MIN_SAFE_INTEGER;
    let maxHeight = Number.MAX_SAFE_INTEGER;
    let height = hiddenTextarea.scrollHeight;

    let overflowY;
    if (nodeStyle.boxSizing === 'border-box') {
        height = height + nodeStyle.borderSize;
    } else if (nodeStyle.boxSizing === 'content-box') {
        height = height - nodeStyle.paddingSize;
    }
    if (minRows !== null || maxRows !== null) {
        hiddenTextarea.value = '';
        let singleRowHeight = hiddenTextarea.scrollHeight - nodeStyle.paddingSize;
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
    return {height, minHeight, maxHeight, overflowY};
}
