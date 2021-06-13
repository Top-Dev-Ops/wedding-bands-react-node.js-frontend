/* eslint-disable no-unused-expressions */
import * as THREE from 'three';

import {
    Rectangle, SimpleGeometryData, TypedSimpleGeometryData, CompactGeometry, Point
} from "./geometry.js"
import { StringUtil } from "./objman.js"

class ArrayTool {
    static replace(a, b, c) {
        return a.split(b).join(c);
    }
    static clear(array, nLen, bFull) {
        if (array == null) return;
        if (nLen == null) nLen = 0;
        if (bFull == null) bFull = true;

        if (!bFull) nLen = (array.length >= nLen) ? nLen : array.length;
        var len = array.length;
        if (nLen > len) for (var j = len; nLen > j; j++) array.push(null);
        else for (; array.length > nLen;) array.pop();
    }
}
class StringUtils {
    constructor() { }
    static trim(b) {
        if (null == b) return "";
        for (var c = 0; StringUtils.isWhitespace(b.charAt(c));) ++c;
        for (var d = b.length - 1; StringUtils.isWhitespace(b.charAt(d));) --d;
        return d >= c ? b.slice(c, d + 1) : ""
    }
    static substitute(a, b) {
        if (null == a || null == b) return a;
        var c, d = b.length;
        if (1 == d && b[0] instanceof Array) { (c = b[0], d = c.length) } else { c = b; };
        for (var e = 0; d > e; e++) a = a.replace(new RegExp("\\{" + e + "\\}", "g"), c[e]);
        return a
    }
    static isWhitespace(a) {
        switch (a) {
            case " ":
            case "  ":
            case "\r":
            case "\n":
            case "\f":
                return true;
            default:
                return false
        }
    }
}
class StrNumReader {
    static readNumber(str, fractionCount) {
        var _str = null == str ? "null" : "" + str;
        return StringUtil.substr(_str, 0, _str.indexOf(".") + fractionCount + 1);
    }
}
class GeomUtils {
    constructor() { }
    static convertMatrix(matrix, bFlip) {
        null == bFlip && (bFlip = false);
        if (!matrix) return null;
        var mat4 = new THREE.Matrix4,
            d = matrix.rawData;
        bFlip ? mat4.set(d[0], d[4], -d[8], d[12], d[1], d[5], -d[9], d[13], -d[2], -d[6], d[10], -d[14], d[3], d[7], -d[11], d[15]) :
            mat4.set(d[0], d[4], d[8], d[12], d[1], d[5], d[9], d[13], d[2], d[6], d[10], d[14], d[3], d[7], d[11], d[15]);
        return mat4;
    }
    static rotatePointAroundCenter(a, b, c) {
        var d = a.x - b.y,
            e = a.y - b.y,
            g = c * (Math.PI / 180),
            h = Math.atan2(e, d) + Math.PI;
        g += h;
        var i = Math.sqrt(d * d + e * e),
            j = Math.cos(g + Math.PI),
            k = Math.sin(g + Math.PI),
            l = new Point;
        l.x = j * i + b.x, l.y = k * i + b.y;
        return l
    }
}
class UInt_Impl_ {
    constructor() { }
    static __name__ = ["_UInt", "UInt_Impl_"];
    static gt(a, b) { var c = 0 > a; return c != 0 > b ? c : a > b }
    static gte(a, b) { var c = 0 > a; return c != 0 > b ? c : a >= b }
    static toFloat(a) { return 0 > a ? 4294967296 + a : a + 0 }
}
class SimpleGeometryDataUtil {
    static __name__ = ["SimpleGeometryDataUtil"];
    constructor() { }
    static constructGeometry(simpleGeometryData, bFlip) {
        undefined == bFlip && (bFlip = true);
        var typedSimpleGeometryData;
        if (simpleGeometryData instanceof SimpleGeometryData)
            typedSimpleGeometryData = SimpleGeometryDataUtil.toTyped(simpleGeometryData);
        else {
            if (!(simpleGeometryData instanceof TypedSimpleGeometryData))
                throw new Error("Unknown simpleGeometryData type");
            typedSimpleGeometryData = simpleGeometryData
        }
        if (bFlip) {
            var id, len;
            for (len = typedSimpleGeometryData.vertexPositionData.length, id = 0; len > id; id += 3)
                typedSimpleGeometryData.vertexPositionData[id + 2] = -typedSimpleGeometryData.vertexPositionData[id + 2];
            for (len = typedSimpleGeometryData.indices.length, id = 0; len > id; id += 3) {
                var j = typedSimpleGeometryData.indices[id];
                typedSimpleGeometryData.indices[id] = typedSimpleGeometryData.indices[id + 2],
                    typedSimpleGeometryData.indices[id + 2] = j
            }
            if (typedSimpleGeometryData.vertexNormalData)
                for (len = typedSimpleGeometryData.vertexNormalData.length, id = 0; len > id; id += 3)
                    typedSimpleGeometryData.vertexNormalData[id + 2] = -typedSimpleGeometryData.vertexNormalData[id + 2];
            if (typedSimpleGeometryData.uvData)
                for (len = typedSimpleGeometryData.uvData.length, id = 0; len > id; id += 2)
                    typedSimpleGeometryData.uvData[id + 1] = 1 - typedSimpleGeometryData.uvData[id + 1];
            if (typedSimpleGeometryData.secondaryUvData)
                for (len = typedSimpleGeometryData.secondaryUvData.length, id = 0; len > id; id += 2)
                    typedSimpleGeometryData.secondaryUvData[id + 1] = 1 - typedSimpleGeometryData.secondaryUvData[id + 1]
        }
        var compactGeometry = new CompactGeometry(typedSimpleGeometryData);
        return compactGeometry
    }
    static toTyped(a) {
        var _TypedSimpleGeometryData = new TypedSimpleGeometryData;
        _TypedSimpleGeometryData.testFlag = a.testFlag;
        a.indices && (_TypedSimpleGeometryData.indices = Uint16Array.from(a.indices)),
            a.secondaryUvData && (_TypedSimpleGeometryData.secondaryUvData = Float32Array.from(a.secondaryUvData)),
            a.uvData && (_TypedSimpleGeometryData.uvData = Float32Array.from(a.uvData)),
            a.vertexNormalData && (_TypedSimpleGeometryData.vertexNormalData = Float32Array.from(a.vertexNormalData)),
            a.vertexPositionData && (_TypedSimpleGeometryData.vertexPositionData = Float32Array.from(a.vertexPositionData)),
            a.vertexTangentData && (_TypedSimpleGeometryData.vertexTangentData = Float32Array.from(a.vertexTangentData));
        return _TypedSimpleGeometryData;
    }
    static toUntyped(a) {
        var _SimpleGeometryData = new SimpleGeometryData,
            c = Array.from;

        null == c && (c = (a) => {
            for (var b = [], c = 0; c < a.length; c++)
                b[c] = a[c];
            return b
        }),
            a.indices && (_SimpleGeometryData.indices = c(a.indices)),
            a.uvData && (_SimpleGeometryData.uvData = c(a.uvData)),
            a.secondaryUvData && (_SimpleGeometryData.secondaryUvData = c(a.secondaryUvData)),
            a.vertexNormalData && (_SimpleGeometryData.vertexNormalData = c(a.vertexNormalData)),
            a.vertexPositionData && (_SimpleGeometryData.vertexPositionData = c(a.vertexPositionData)),
            a.vertexTangentData && (_SimpleGeometryData.vertexTangentData = c(a.vertexTangentData));
        return _SimpleGeometryData
    }
    static nonUniformScale(a, b) {
        for (var c = new Point, d = a.geometryData.vertexPositionData, e = d.length, f = 0; e > f; f += 3) {
            var g = d[f + 1],
                h = d[f + 2];
            c.setTo(g, h), c.normalize(b), d[f + 1] = g + c.x, d[f + 2] = h + c.y
        }
        a.updatePositionData(d)
    }
    static fromCompactGeometry(a) {
        return a.geometryData
    }
    static applyTransformation(geometryData, transform) {
        var c = SimpleGeometryDataUtil.RAW_DATA_CONTAINER;
        transform.copyRawDataTo(c);
        for (
            var d,
            e,
            f,
            g = c[0],
            h = c[1],
            i = c[2],
            j = c[4],
            k = c[5],
            l = c[6],
            m = c[8],
            n = c[9],
            o = c[10],
            p = c[12],
            q = c[13],
            r = c[14],
            s = geometryData.vertexPositionData,
            t = geometryData.vertexNormalData,
            u = geometryData.vertexTangentData,
            v = s.length,
            w = 0;
            v > w;

        ) {
            var x = w + 1,
                y = w + 2;
            (d = s[w]),
                (e = s[x]),
                (f = s[y]),
                (s[w] = g * d + j * e + m * f + p),
                (s[x] = h * d + k * e + n * f + q),
                (s[y] = i * d + l * e + o * f + r),
                (d = t[w]),
                (e = t[x]),
                (f = t[y]),
                (t[w] = g * d + j * e + m * f),
                (t[x] = h * d + k * e + n * f),
                (t[y] = i * d + l * e + o * f),
                null != u &&
                ((d = u[w]),
                    (e = u[x]),
                    (f = u[y]),
                    (u[w] = g * d + j * e + m * f),
                    (u[x] = h * d + k * e + n * f),
                    (u[y] = i * d + l * e + o * f)),
                (w += 3);
        }
    }
    static scaleGeom(a, b, c, d) {
        for (var e = a.vertexPositionData.length, f = 0; e > f;) {
            var g = f,
                h = a.vertexPositionData;
            h[g] = h[g] * b;
            var i = f + 1,
                j = a.vertexPositionData;
            j[i] = j[i] * c;
            var k = f + 2,
                l = a.vertexPositionData;
            (l[k] = l[k] * d), (f += 3);
        }
    }
    static cloneGeometry(srcSimpleGeometryData) {
        var _SimpleGeometryData = new SimpleGeometryData();
        (_SimpleGeometryData.indices = srcSimpleGeometryData.indices.slice()),
            (_SimpleGeometryData.vertexPositionData = srcSimpleGeometryData.vertexPositionData.slice()),
            (_SimpleGeometryData.vertexNormalData = srcSimpleGeometryData.vertexNormalData.slice()),
            (_SimpleGeometryData.uvData = srcSimpleGeometryData.uvData.slice()),
            (_SimpleGeometryData.secondaryUvData = null),
            null != srcSimpleGeometryData.secondaryUvData &&
            (_SimpleGeometryData.secondaryUvData = srcSimpleGeometryData.secondaryUvData.slice()),
            (_SimpleGeometryData.vertexTangentData = null),
            null != srcSimpleGeometryData.vertexTangentData &&
            (_SimpleGeometryData.vertexTangentData = srcSimpleGeometryData.vertexTangentData.slice()),
            (_SimpleGeometryData.vertexTopologyData = null),
            null != srcSimpleGeometryData.vertexTopologyData &&
            (_SimpleGeometryData.vertexTopologyData = srcSimpleGeometryData.vertexTopologyData.slice());
        return _SimpleGeometryData;
    }
    static getUVBounds(a) {
        for (
            var b = a.uvData.length,
            c = Infinity,
            d = Infinity,
            e = -Infinity,
            f = -Infinity,
            g = 0;
            b > g;

        ) {
            var h = a.uvData[g],
                i = a.uvData[g + 1];
            c > h && (c = h),
                d > i && (d = i),
                h > e && (e = h),
                i > f && (f = i),
                (g += 2);
        }
        return new Rectangle(c, d, e - c, f - d);
    }
    static setVertexTangents(a, b) {
        if (
            (null == b && (b = false),
                null == a.vertexTangentData || 0 == a.vertexTangentData.length || b)
        ) {
            for (
                var c = a.vertexNormalData.length, d = new Array(c), e = 0;
                c > e;

            ) {
                var f = a.vertexNormalData[e],
                    g = a.vertexNormalData[e + 1],
                    h = -f,
                    i = 0,
                    j = -a.vertexNormalData[e + 2],
                    k = 0,
                    l = f,
                    m = Math.sqrt(g * g + h * h + i * i),
                    n = Math.sqrt(j * j + k * k + l * l);
                m > n
                    ? (0 > g && ((g *= -1), (h *= -1), (i *= -1)),
                        (d[e] = g / m),
                        (d[e + 1] = h / m),
                        (d[e + 2] = i / m))
                    : (0 > j && ((j *= -1), (k *= -1), (l *= -1)),
                        (d[e] = j / n),
                        (d[e + 1] = k / n),
                        (d[e + 2] = l / n)),
                    (e += 3);
            }
            a.vertexTangentData = d;
        }
    }
    static flipTriangles(a) {
        for (var b = a.indices, c = b.length, d = 0; c > d;) {
            var e = b[d];
            (b[d] = b[d + 2]), (b[d + 2] = e), (d += 3);
        }
    }
    static flipX(a) {
        for (
            var b = a.vertexPositionData, c = a.vertexNormalData, d = b.length, e = 0;
            d > e;

        )
            (b[e] = -b[e]), (c[e] = -c[e]), (e += 3);
        SimpleGeometryDataUtil.flipTriangles(a);
    }
    static flipY(a) {
        for (
            var b = a.vertexPositionData, c = a.vertexNormalData, d = b.length, e = 1;
            d > e;

        )
            (b[e] = -b[e]), (c[e] = -c[e]), (e += 3);
        SimpleGeometryDataUtil.flipTriangles(a);
    }
    static flipZ(a) {
        for (
            var b = a.vertexPositionData, c = a.vertexNormalData, d = b.length, e = 2;
            d > e;

        )
            (b[e] = -b[e]), (c[e] = -c[e]), (e += 3);
        SimpleGeometryDataUtil.flipTriangles(a);
    }
    static fromVectors(a, b, c, d, e) {
        var f = new Array(0);
        if (
            (null != c && 0 == c.length && (c = null),
                null != d && 0 == d.length && (d = null),
                null != e && 0 == e.length && (e = null),
                UInt_Impl_.gte(b.length, 983025) || UInt_Impl_.gte(a.length, 196605))
        ) {
            var g,
                h,
                i,
                j,
                k = new Array(0),
                l = new Array(0),
                n = null != c ? new Array(0) : null,
                o = null != d ? new Array(0) : null,
                p = null != e ? new Array(0) : null,
                q = (a.length / 3) | 0,
                r = new Array(q);
            for (g = r.length; UInt_Impl_.gt(g--, 0);) r[g] = -1;
            var s, t, u, v, w, x, y, z, A, B, C, D;
            for (i = 0, h = b.length, g = 0; UInt_Impl_.gt(h, g);) {
                if (
                    ((t = k.length + 6),
                        UInt_Impl_.gte(i + 2, 983025) || UInt_Impl_.gte(t, 196605))
                ) {
                    var E = new SimpleGeometryData();
                    for (
                        E.indices = l,
                        E.vertexPositionData = k,
                        E.vertexNormalData = o,
                        E.uvData = n,
                        E.vertexTangentData = p,
                        f.push(E),
                        k = new Array(0),
                        l = new Array(0),
                        n = null != c ? new Array(0) : null,
                        o = null != d ? new Array(0) : null,
                        p = null != e ? new Array(0) : null,
                        t = 0,
                        j = r.length;
                        UInt_Impl_.gt(j--, 0);

                    )
                        r[j] = -1;
                    i = 0;
                }
                for (j = 0; UInt_Impl_.gt(3, j);)
                    (s = b[g + j]),
                        r[s] >= 0
                            ? (t = r[s])
                            : ((u = 3 * s + 0),
                                (v = 3 * s + 1),
                                (w = 3 * s + 2),
                                (t = (k.length / 3) | 0),
                                (x = 3 * t + 0),
                                (y = 3 * t + 1),
                                (z = 3 * t + 2),
                                (k[x] = a[u]),
                                (k[y] = a[v]),
                                (k[z] = a[w]),
                                null != c &&
                                ((A = 2 * t + 0),
                                    (C = 2 * t + 1),
                                    (B = 2 * s + 0),
                                    (D = 2 * s + 1),
                                    (n[A] = c[B]),
                                    (n[C] = c[D])),
                                null != d && ((o[x] = d[u]), (o[y] = d[v]), (o[z] = d[w])),
                                null != e && ((p[x] = e[u]), (p[y] = e[v]), (p[z] = e[w])),
                                (r[s] = t)),
                        (l[0 | UInt_Impl_.toFloat(i + j)] = t),
                        ++j;
                (i += 3), (g += 3);
            }
            if (k.length > 0) {
                var F = new SimpleGeometryData();
                (F.indices = l),
                    (F.vertexPositionData = k),
                    (F.vertexNormalData = o),
                    (F.uvData = n),
                    (F.vertexTangentData = p),
                    f.push(F);
            }
        } else {
            var G = new SimpleGeometryData();
            (G.indices = b),
                (G.vertexPositionData = a),
                (G.vertexNormalData = d),
                (G.uvData = c),
                (G.vertexTangentData = e),
                f.push(G);
        }
        return f;
    }
}
SimpleGeometryDataUtil.RAW_DATA_CONTAINER = new Array(16);
SimpleGeometryDataUtil.LIMIT_VERTS = 196605;
SimpleGeometryDataUtil.LIMIT_INDICES = 983025;
class ImageUtils {
    constructor() {

    }
    static isImage2DValid(b) {
        return null == b ? true : ImageUtils.isDimensionValid(b.width) && ImageUtils.isDimensionValid(b.height)
    }
    static isHTMLImageElementValid(b) {
        return null == b ? true : ImageUtils.isDimensionValid(b.width) && ImageUtils.isDimensionValid(b.height)
    }
    static isDimensionValid(b) {
        return b >= 1 && b <= ImageUtils.MAX_SIZE && ImageUtils.isPowerOfTwo(b)
    }
    static isPowerOfTwo(a) {
        return a ? (a & -a) == a : false
    }
    static getBestPowerOf2(b) {
        for (var c = 1; b > c;) c <<= 1; return c > ImageUtils.MAX_SIZE && (c = ImageUtils.MAX_SIZE), c
    }
    static MAX_SIZE = 2048;
}
class NumComparor {
    __class__ = NumComparor;
    static __name__ = ["NumComparor"];
    static positiveComp(a, b) {
        return b > a ? -1 : a > b ? 1 : 0;
    }
    static negativeComp(a, b) {
        return a > b ? -1 : b > a ? 1 : 0;
    }
    static normalComp(a, b) {
        return b > a ? -1 : a > b ? 1 : 0;
    }
}

export {
    ArrayTool, NumComparor, StringUtils, StrNumReader, GeomUtils, SimpleGeometryDataUtil, ImageUtils
}