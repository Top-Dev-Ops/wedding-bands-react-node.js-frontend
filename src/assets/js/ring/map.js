/* eslint-disable no-unused-expressions */
import {
    ObjMan, StringUtil, Std, Int, Float, Bool
} from "./objman.js"

var globalMap = {};

class MyMap {
    static __name__ = "MyMap";
    constructor() {
        this.map = {};//null;
        this.reserveMap = null;
    }

    set(key, val) {
        null != globalMap[key] ? this.setReserved(key, val) : (this.map[key] = val);
    }

    get(a) {
        return null != globalMap[a] ? this.getReserved(a) : this.map[a];
    }

    exists(a) {
        return null != globalMap[a] ? this.existsReserved(a) : this.map.hasOwnProperty(a);
    }

    setReserved(key, val) {
        null == this.reserveMap && (this.reserveMap = {}), (this.reserveMap["$" + key] = val);
    }

    getReserved(key) {
        return null == this.reserveMap ? null : this.reserveMap["$" + key];
    }

    existsReserved(a) {
        return null == this.reserveMap ? false : this.reserveMap.hasOwnProperty("$" + a);
    }

    remove(a) {
        return null != globalMap[a]
            ? ((a = "$" + a),
                null != this.reserveMap && this.reserveMap.hasOwnProperty(a)
                    ? (delete this.reserveMap[a], true)
                    : false)
            : this.map.hasOwnProperty(a)
                ? (delete this.map[a], true)
                : false;
    }

    keys() {
        return StringUtil.iter(this.arrayKeys());
    }

    arrayKeys() {
        var a = [];
        for (var b in this.map) this.map.hasOwnProperty(b) && a.push(b);
        if (null != this.reserveMap)
            for (var b in this.reserveMap) 36 == b.charCodeAt(0) && a.push(b.substr(1));
        return a;
    }
}
class KMap {
    constructor(a, b) {
        (this.map = a), (this.keys = b), (this.index = 0), (this.count = b.length);
    }

    map = null;
    keys = null;
    index = null;
    count = null;
    hasNext() {
        return this.index < this.count;
    }
    next() {
        var a = this.map,
            b = this.keys[this.index++];
        return null != globalMap[b] ? a.getReserved(b) : a.map[b];
    }
}
class BMap {
    constructor() {
        this.h = {};
    }
    h = null;
    set(a, b) {
        this.h[a] = b;
    }
    get(a) {
        return this.h[a];
    }
    exists(a) {
        return this.h.hasOwnProperty(a);
    }
    remove(a) {
        return this.h.hasOwnProperty(a) ? (delete this.h[a], true) : false;
    }
    keys() {
        var a = [];
        for (var b in this.h) this.h.hasOwnProperty(b) && a.push(0 | b);
        return StringUtil.iter(a);
    }
}
class ContextsSet {
    __class__ = ContextsSet;
    static __name__ = ["ContextsSet"];
    constructor() {
        this.contextArray = { __keys__: {} };
    }

    contextArray = null;
    set(a, b) {
        var c = a.__id__ || (a.__id__ = ++ContextsSet.count);
        (this.contextArray[c] = b), (this.contextArray.__keys__[c] = a);
    }
    get(a) {
        return this.contextArray[a.__id__];
    }
    exists(a) {
        return null != this.contextArray.__keys__[a.__id__];
    }
    remove(a) {
        var b = a.__id__;
        return null == this.contextArray.__keys__[b]
            ? false
            : (delete this.contextArray[b], delete this.contextArray.__keys__[b], true);
    }
    keys() {
        var a = [];
        for (var b in this.contextArray.__keys__)
            this.contextArray.hasOwnProperty(b) && a.push(this.contextArray.__keys__[b]);
        return StringUtil.iter(a);
    }
    iterator() {
        return {
            ref: this.contextArray,
            it: this.keys(),
            hasNext: function () {
                return this.it.hasNext();
            },
            next: function () {
                var a = this.it.next();
                return this.ref[a.__id__];
            },
        };
    }
}
ContextsSet.count = 0;

export {
    globalMap, MyMap, KMap, BMap, ContextsSet
}