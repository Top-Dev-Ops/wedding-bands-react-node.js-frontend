/* eslint-disable no-unused-expressions */
import {
    ErrorWrap
} from "./error.js"

var emptyStruct = {};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];

var Int = { __name__: ["Int"] };
var Dynamic = { __name__: ["Dynamic"] };
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__: ["Class"] };

class ObjMan {
    constructor() { }
    static getClass(a) {
        if (a instanceof Array && null == a.__enum__) return Array;
        var b = a.__class__;
        if (null != b) return b;
        var c = ObjMan.__nativeClassName(a);
        return null != c ? ObjMan.__resolveNativeClass(c) : null;
    }
    static __string_rec(a, b) {
        if (null == a) return "null";
        if (b.length >= 5) return "<...>";
        var c = typeof a;
        switch (
        ("function" == c && (a.__name__ || a.__ename__) && (c = "object"), c)
        ) {
            case "function":
                return "<function>";
            case "object":
                if (a instanceof Array) {
                    if (a.__enum__) {
                        if (2 == a.length) return a[0];
                        var d = a[0] + "(";
                        b += "  ";
                        for (var e = 2, f = a.length; f > e;) {
                            var g = e++;
                            d +=
                                2 != g
                                    ? "," + ObjMan.__string_rec(a[g], b)
                                    : ObjMan.__string_rec(a[g], b);
                        }
                        return d + ")";
                    }
                    var h = a.length,
                        i = "[";
                    b += "  ";
                    for (var j = 0, k = h; k > j;) {
                        var l = j++;
                        i += (l > 0 ? "," : "") + ObjMan.__string_rec(a[l], b);
                    }
                    return (i += "]");
                }
                var m;
                try {
                    m = a.toString;
                } catch (n) {
                    return "???";
                }
                if (null != m && m != Object.toString && "function" == typeof m) {
                    var o = a.toString();
                    if ("[object Object]" != o) return o;
                }
                var p = null,
                    q = "{\n";
                b += "  ";
                var r = null != a.hasOwnProperty;
                for (var p in a)
                    (!r || a.hasOwnProperty(p)) &&
                        "prototype" != p &&
                        "__class__" != p &&
                        "__super__" != p &&
                        "__interfaces__" != p &&
                        "__properties__" != p &&
                        (2 != q.length && (q += ", \n"),
                            (q += b + p + " : " + ObjMan.__string_rec(a[p], b)));
                return (b = b.substring(1)), (q += "\n" + b + "}");
            case "string":
                return a;
            default:
                return String(a);
        }
    }
    static __interfLoop(a, b) {
        if (null == a) return false;
        if (a == b) return true;
        var c = a.__interfaces__;
        if (null != c)
            for (var d = 0, e = c.length; e > d;) {
                var f = c[d++];
                if (f == b || ObjMan.__interfLoop(f, b)) return true;
            }
        return ObjMan.__interfLoop(a.__super__, b);
    }
    static __instanceof(a, b) {
        if (null == b) return false;
        switch (b) {
            case Array:
                return a instanceof Array ? null == a.__enum__ : false;
            case Bool:
                return "boolean" == typeof a;
            case Dynamic:
                return true;
            case Float:
                return "number" == typeof a;
            case Int:
                return "number" == typeof a ? (0 | a) == a : false;
            case String:
                return "string" == typeof a;
            default:
                if (null == a) return false;
                if ("function" == typeof b) {
                    if (a instanceof b) return true;
                    if (ObjMan.__interfLoop(ObjMan.getClass(a), b)) return true;
                } else if (
                    "object" == typeof b &&
                    ObjMan.__isNativeObj(b) &&
                    a instanceof b
                )
                    return true;
                return (b == Class ? null == a.__name__ : 1) &&
                    (b == emptyStruct ? null == a.__ename__ : 1)
                    ? a.__enum__ == b
                    : true;
        }
    }
    static __cast(src, dst) {
        if (ObjMan.__instanceof(src, dst)) return src;
        //kkk
        // return null;//src;
        throw new ErrorWrap("Cannot cast " + Std.string(src) + " to " + Std.string(dst));
    }
    static __nativeClassName(obj) {
        if (typeof obj == "undefined") return "undefined";
        if (obj == null) return "null";
        return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1];
    }
    static __isNativeObj(a) {
        return null != ObjMan.__nativeClassName(a);
    }
    static __resolveNativeClass(a) {
        return a;//b[a];
    }
}
ObjMan.__toStr = {}.toString;
class StringUtil {
    static cca(str, id) {
        var c = str.charCodeAt(id);
        return isNaN(c) ? null : c
    }
    static substr(str, start, len) {
        if (null == len) len = str.length;
        else if (0 > len) {
            if (0 != start) return "";
            len = str.length + len
        }
        return str.substr(start, len)
    }
    static remove(a, b) {
        var c = a.indexOf(b);
        return -1 == c ? false : (a.splice(c, 1), true)
    }
    static iter(a) {
        return {
            cur: 0,
            arr: a,
            hasNext: function () {
                return this.cur < this.arr.length
            },
            next: function () { return this.arr[this.cur++] }
        }
    }
}
class Std {
    static string(a) {
        return ObjMan.__string_rec(a, "");
    }
    static parseInt(a) {
        var b = parseInt(a, 10);
        return (
            0 != b || (120 != StringUtil.cca(a, 1) && 88 != StringUtil.cca(a, 1)) || (b = parseInt(a)),
            isNaN(b) ? null : b
        );
    }
}

export {
    ObjMan, StringUtil, Std, Int, Float, Bool
}