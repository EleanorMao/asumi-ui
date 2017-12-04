/**
 * Created by elly on 2016/9/23.
 */
let idCounter = 0;

export let uniqueID = function () {
    return idCounter++ + new Date().getTime() + Math.random();
};

export let noop = function () {
};

export let isObj = function (input) {
    return Object.prototype.toString.call(input) === '[object Object]';
};

export let isArr = function (input) {
    return Object.prototype.toString.call(input) === '[object Array]';
};

export let diff = function (a, b) {
    return a.filter(x => {
        return b.indexOf(x) === -1
    });
};

export let getScrollBarWidth = function () {
    const inner = document.createElement('p');
    inner.style.width = '100%';
    inner.style.height = '200px';

    const outer = document.createElement('div');
    outer.style.position = 'absolute';
    outer.style.top = '0px';
    outer.style.left = '0px';
    outer.style.visibility = 'hidden';
    outer.style.width = '200px';
    outer.style.height = '150px';
    outer.style.overflow = 'hidden';
    outer.appendChild(inner);

    document.body.appendChild(outer);
    const w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    let w2 = inner.offsetWidth;
    if (w1 === w2) w2 = outer.clientWidth;

    document.body.removeChild(outer);

    return w1 - w2;
};

export let extend = function (target) {
    for (let i = 1; i < arguments.length; i++) {
        let source = arguments[i];
        for (let key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
};

export let sort = function (arr) {
    let auto = [];
    let left = [];
    let right = [];
    for (let i = 0, len = arr.length; i < len; i++) {
        let item = arr[i].props || arr[i];
        if (item.dataFixed === 'left') {
            left.push(arr[i]);
        } else if (item.dataFixed === 'right') {
            right.push(arr[i]);
        } else {
            auto.push(arr[i]);
        }
    }
    let sorted = left.concat(auto).concat(right);
    return {sorted, left, right}
};

export let addEvent = function (el, event, listener) {
    if (el.addEventListener) {
        el.addEventListener(event, listener, false);
    } else if (el.attachEvent) {
        el.attachEvent('on' + event, listener);
    } else {
        el['on' + event] = listener;
    }
};

export let removeEvent = function (el, event, listener) {
    if (el.removeEventListener) {
        el.removeEventListener(event, listener, false);
    } else if (el.detachEvent) {
        el.attachEvent('on' + event, listener);
    }
};

export let contains = function (root, el) {
    if (root.compareDocumentPosition)
        return root === el || !!(root.compareDocumentPosition(el) & 16);

    if (root.contains && el.nodeType === 1)
        return root.contains(el) && root !== el;

    while (el = el.parentNode)
        if (el === root) return true;

    return false;
};

export let KeyCode = {
    DELETE: 8,
    SPACE: 32,
    ENTER: 13,
    DOWN: 40,
    UP: 38,
    TAB: 9
};

export let rules = {
    price: /^((0|[1-9]\d{0,7})(\.\d{0,2})?)?$/,
    positiveInt: /^([1-9]\d{0,7})?$/,
    nature: /^(0?|[1-9]\d{0,7})$/,
    color: /^#[0-9a-fA-F]{0,6}$/
};

export const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;