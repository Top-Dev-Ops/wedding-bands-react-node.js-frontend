/* eslint-disable no-unused-expressions */
import * as THREE from 'three';
import { ObjMan, Std, Int, Float, Bool } from "./objman.js"
import { GeoNumComparor } from "./meta.js"
import {
    MathConsts, MetaDataMap
} from "./meta.js"
import {
    ArrayTool, SimpleGeometryDataUtil
} from "./util.js"
import {
    CoordinateSystemPlane
} from "./meta.js"
import {
    ErrorWrap
} from "./error.js"
import {
    globalMap, MyMap, ContextsSet, KMap
} from "./map.js"
import { MetaKeyGenerator } from './calc';
class Point {
    __class__ = Point;
    static __name__ = ["Point"];
    constructor(x, y) {
        null == y && (y = NaN);
        null == x && (x = NaN);
        this.x = x, this.y = y;
    }

    static distance(a, b) {
        var c = a.x - b.x,
            d = a.y - b.y;
        return Math.sqrt(c * c + d * d);
    }

    static interpolate(a, b, c) {
        return new Point(b.x + c * (a.x - b.x), b.y + c * (a.y - b.y));
    }
    static polar(a, b) {
        return new Point(a * Math.cos(b), a * Math.sin(b));
    }

    add(a) {
        return new Point(a.x + this.x, a.y + this.y);
    }
    clone() {
        return new Point(this.x, this.y);
    }
    copyFrom(a) {
        (this.x = a.x), (this.y = a.y);
    }
    equals(a) {
        return null != a && a.x == this.x ? a.y == this.y : false;
    }
    normalize(a) {
        if (0 != this.x || 0 != this.y) {
            var b = a / Math.sqrt(this.x * this.x + this.y * this.y);
            (this.x *= b), (this.y *= b);
        }
    }
    offset(a, b) {
        (this.x += a), (this.y += b);
    }
    setTo(x, y) {
        (this.x = x), (this.y = y);
    }
    subtract(a) {
        return new Point(this.x - a.x, this.y - a.y);
    }
    toString() {
        return "(x=" + this.x + ", y=" + this.y + ")";
    }
    get_length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    scalarProduct(a) {
        return this.x * a.x + this.y * a.y;
    }
    vectorProduct(a) {
        return this.x * a.y - this.y * a.x;
    }
}
class Rectangle {
    __class__ = Rectangle;
    static __name__ = "Rectangle";
    height = null;
    width = null;
    x = null;
    y = null;
    constructor(x, y, width, height) {
        undefined == height && (height = 0),
            undefined == width && (width = 0),
            undefined == y && (y = 0),
            undefined == x && (x = 0),
            (this.x = x),
            (this.y = y),
            (this.width = width),
            (this.height = height);
    }

    clone() {
        return new Rectangle(this.x, this.y, this.width, this.height);
    }
    contains(a, b) {
        return a >= this.x && b >= this.y && a < this.get_right()
            ? b < this.get_bottom()
            : false;
    }
    containsPoint(a) {
        return this.contains(a.x, a.y);
    }
    containsRect(a) {
        return a.width <= 0 || a.height <= 0
            ? a.x > this.x && a.y > this.y && a.get_right() < this.get_right()
                ? a.get_bottom() < this.get_bottom()
                : false
            : a.x >= this.x && a.y >= this.y && a.get_right() <= this.get_right()
                ? a.get_bottom() <= this.get_bottom()
                : false;
    }
    copyFrom(a) {
        (this.x = a.x),
            (this.y = a.y),
            (this.width = a.width),
            (this.height = a.height);
    }
    equals(a) {
        return null != a && this.x == a.x && this.y == a.y && this.width == a.width
            ? this.height == a.height
            : false;
    }
    inflate(a, b) {
        (this.x -= a), (this.width += 2 * a), (this.y -= b), (this.height += 2 * b);
    }
    inflatePoint(a) {
        this.inflate(a.x, a.y);
    }
    intersection(a) {
        var b = this.x < a.x ? a.x : this.x,
            c = this.get_right() > a.get_right() ? a.get_right() : this.get_right();
        if (b >= c) return new Rectangle();
        var d = this.y < a.y ? a.y : this.y,
            e =
                this.get_bottom() > a.get_bottom() ? a.get_bottom() : this.get_bottom();
        return d >= e ? new Rectangle() : new Rectangle(b, d, c - b, e - d);
    }
    intersects(a) {
        return (this.get_right() > a.get_right()
            ? a.get_right()
            : this.get_right()) <= (this.x < a.x ? a.x : this.x)
            ? false
            : (this.get_bottom() > a.get_bottom()
                ? a.get_bottom()
                : this.get_bottom()) > (this.y < a.y ? a.y : this.y);
    }
    isEmpty() {
        return this.width <= 0 ? true : this.height <= 0;
    }
    offset(a, b) {
        (this.x += a), (this.y += b);
    }
    offsetPoint(a) {
        (this.x += a.x), (this.y += a.y);
    }
    setEmpty() {
        this.x = this.y = this.width = this.height = 0;
    }
    setTo(a, b, c, d) {
        (this.x = a), (this.y = b), (this.width = c), (this.height = d);
    }
    toString() {
        return (
            "(x=" +
            this.x +
            ", y=" +
            this.y +
            ", width=" +
            this.width +
            ", height=" +
            this.height +
            ")"
        );
    }
    union(a) {
        if (0 == this.width || 0 == this.height) return a.clone();
        if (0 == a.width || 0 == a.height) return this.clone();
        var b = this.x > a.x ? a.x : this.x,
            c = this.y > a.y ? a.y : this.y;
        return new Rectangle(
            b, c,
            (this.get_right() < a.get_right() ? a.get_right() : this.get_right()) - b,
            (this.get_bottom() < a.get_bottom() ? a.get_bottom() : this.get_bottom()) - c
        );
    }
    __contract(a, b, c, d) {
        if (0 != this.width || 0 != this.height) {
            var e = 0,
                f = 0,
                g = 0,
                h = 0;
            this.x < a && (e = a - this.x),
                this.y < b && (f = b - this.y),
                this.get_right() > a + c && (g = a + c - this.get_right()),
                this.get_bottom() > b + d && (h = b + d - this.get_bottom()),
                (this.x += e),
                (this.y += f),
                (this.width += g - e),
                (this.height += h - f);
        }
    }
    __expand(a, b, c, d) {
        if (0 == this.width && 0 == this.height)
            return (
                (this.x = a), (this.y = b), (this.width = c), void (this.height = d)
            );
        var e = this.get_right(),
            f = this.get_bottom();
        this.x > a && ((this.x = a), (this.width = e - a)),
            this.y > b && ((this.y = b), (this.height = f - b)),
            a + c > e && (this.width = a + c - this.x),
            b + d > f && (this.height = b + d - this.y);
    }
    get_bottom() {
        return this.y + this.height;
    }
    set_bottom(a) {
        return (this.height = a - this.y), a;
    }
    get_bottomRight() {
        return new Point(this.x + this.width, this.y + this.height);
    }
    set_bottomRight(a) {
        return (this.width = a.x - this.x), (this.height = a.y - this.y), a.clone();
    }
    get_left() {
        return this.x;
    }
    set_left(a) {
        return (this.width -= a - this.x), (this.x = a), a;
    }
    get_right() {
        return this.x + this.width;
    }
    set_right(a) {
        return (this.width = a - this.x), a;
    }
    get_size() {
        return new Point(this.width, this.height);
    }
    set_size(a) {
        return (this.width = a.x), (this.height = a.y), a.clone();
    }
    get_top() {
        return this.y;
    }
    set_top(a) {
        return (this.height -= a - this.y), (this.y = a), a;
    }
    get_topLeft() {
        return new Point(this.x, this.y);
    }
    set_topLeft(a) {
        return (this.x = a.x), (this.y = a.y), a.clone();
    }
}
Rectangle.cX = new Rectangle;
class PointEx extends Point {
    static __super__ = Point;
    __class__ = PointEx;
    static __name__ = ["PointEx"];
    constructor(x, y, borderIndex) {
        null == borderIndex && (borderIndex = 0);
        null == y && (y = 0);
        null == x && (x = 0);
        super(x, y);
        this.borderIndex = borderIndex;
    }

    get_borderIndex() {
        return this.borderIndex;
    }
    set_borderIndex(a) {
        return this.borderIndex == a ? this.borderIndex : ((this.borderIndex = a), this.borderIndex);
    }
    clone() {
        return new PointEx(this.x, this.y, this.get_borderIndex());
    }
}
class Vect2 {
    __class__ = Vect2;
    static __name__ = ["Vect2"];
    posX = null;
    normalX = null;
    posY = null;
    normalY = null;
    constructor(posX, posY, normalX, normalY) {
        (this.posX = posX), (this.posY = posY),
            (this.normalX = normalX), (this.normalY = normalY);
    }

    static comparePosX(a, b) {
        return a.get_posX() < b.get_posX()
            ? -1
            : a.get_posX() > b.get_posX()
                ? 1
                : 0;
    }
    static comparePosY(a, b) {
        return a.get_posY() < b.get_posY()
            ? -1
            : a.get_posY() > b.get_posY()
                ? 1
                : 0;
    }
    static negativeComparePosX(a, b) {
        return a.get_posX() > b.get_posX()
            ? -1
            : a.get_posX() < b.get_posX()
                ? 1
                : 0;
    }
    static negativeComparePosY(a, b) {
        return a.get_posY() > b.get_posY()
            ? -1
            : a.get_posY() < b.get_posY()
                ? 1
                : 0;
    }
    get_posX() {
        return this.posX;
    }
    get_normalX() {
        return this.normalX;
    }
    get_posY() {
        return this.posY;
    }
    get_normalY() {
        return this.normalY;
    }
    createPoint() {
        return new Point(this.posX, this.posY);
    }
}
class Vector3D {
    static __name__ = "SAe";
    w = null;
    x = null;
    y = null;
    z = null;
    constructor(x, y, z, w) {
        undefined == w && (w = 0),
            undefined == z && (z = 0),
            undefined == y && (y = 0),
            undefined == x && (x = 0),
            (this.w = w),
            (this.x = x),
            (this.y = y),
            (this.z = z);
    }

    static angleBetween(a, b) {
        var c = a.get_length(),
            d = b.get_length(),
            e = a.scalarProduct(b);
        return 0 != c && (e /= c), 0 != d && (e /= d), Math.acos(e);
    }
    static distance(a, b) {
        var c = b.x - a.x,
            d = b.y - a.y,
            e = b.z - a.z;
        return Math.sqrt(c * c + d * d + e * e);
    }

    add(a) {
        return new Vector3D(this.x + a.x, this.y + a.y, this.z + a.z);
    }
    clone() {
        return new Vector3D(this.x, this.y, this.z, this.w);
    }
    copyFrom(a) {
        (this.x = a.x), (this.y = a.y), (this.z = a.z);
    }
    vectorProduct(a) {
        return new Vector3D(
            this.y * a.z - this.z * a.y,
            this.z * a.x - this.x * a.z,
            this.x * a.y - this.y * a.x,
            1
        );
    }
    decrementBy(a) {
        (this.x -= a.x), (this.y -= a.y), (this.z -= a.z);
    }
    scalarProduct(a) {
        return this.x * a.x + this.y * a.y + this.z * a.z;
    }
    equals(a, b) {
        return (
            null == b && (b = false),
            this.x == a.x && this.y == a.y && this.z == a.z
                ? b
                    ? this.w == a.w
                    : true
                : false
        );
    }
    incrementBy(a) {
        (this.x += a.x), (this.y += a.y), (this.z += a.z);
    }
    nearEquals(a, b, c) {
        return (
            null == c && (c = false),
            Math.abs(this.x - a.x) < b &&
                Math.abs(this.y - a.y) < b &&
                Math.abs(this.z - a.z) < b
                ? c
                    ? Math.abs(this.w - a.w) < b
                    : true
                : false
        );
    }
    negate() {
        (this.x *= -1), (this.y *= -1), (this.z *= -1);
    }
    normalize() {
        var a = this.get_length();
        return 0 != a && ((this.x /= a), (this.y /= a), (this.z /= a)), a;
    }
    project() {
        (this.x /= this.w), (this.y /= this.w), (this.z /= this.w);
    }
    scaleBy(a) {
        (this.x *= a), (this.y *= a), (this.z *= a);
    }
    setTo(a, b, c) {
        (this.x = a), (this.y = b), (this.z = c);
    }
    subtract(a) {
        return new Vector3D(this.x - a.x, this.y - a.y, this.z - a.z);
    }
    toString() {
        return "Vector3D(" + this.x + ", " + this.y + ", " + this.z + ")";
    }
    get_length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    get_lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
}
const X_AXIS = new Vector3D(1, 0, 0);
const Y_AXIS = new Vector3D(0, 1, 0);
const Z_AXIS = new Vector3D(0, 0, 1);

class Triangle {
    constructor() {
        this.vAB = new Vector3D();
        this.vAC = new Vector3D();
        this.vAP = new Vector3D();
        this.ptA = new Vector3D();
        this.ptB = new Vector3D();
        this.ptC = new Vector3D();
    }
    vAC = null;
    vAB = null;
    dotZX = null;
    dotZZ = null;
    dotXX = null;
    vAP = null;
    ptC = null;
    get_C() {
        return this.ptC;
    }
    ptB = null;
    get_B() {
        return this.ptB;
    }
    ptA = null;
    get_A() {
        return this.ptA;
    }
    hV(a, b, c, d) {
        this.vAP.setTo(
            a - this.get_A().x,
            b - this.get_A().y,
            c - this.get_A().z
        );
        var e,
            f = this.vAP.scalarProduct(this.vAB),
            g = this.vAP.scalarProduct(this.vAC),
            h = 1 / (this.dotZZ * this.dotXX - this.dotZX * this.dotZX),
            x = (this.dotXX * f - this.dotZX * g) * h,
            y = (this.dotZZ * g - this.dotZX * f) * h,
            z = 1 - x - y;
        return (
            null != d ? ((e = d), d.setTo(x, y, z)) : (e = new Vector3D(x, y, z)), e
        );
    }
    hW(a, out) {
        var result,
            x = this.get_A().x * a.z +
                this.get_B().x * a.x +
                this.get_C().x * a.y,
            y = this.get_A().y * a.z +
                this.get_B().y * a.x +
                this.get_C().y * a.y,
            z = this.get_A().z * a.z +
                this.get_B().z * a.x +
                this.get_C().z * a.y;
        if (null != out) {
            out.setTo(x, y, z);
            result = out;
        }
        else
            result = new Vector3D(x, y, z);
        return result;
    }
    initialize(a, b, c) {
        (this.h5 = a), (this.h4 = b), (this.h3 = c);
        this.regulate();
    }
    regulate() {
        this.vAB.setTo(
            this.get_B().x - this.get_A().x,
            this.get_B().y - this.get_A().y,
            this.get_B().z - this.get_A().z
        );
        this.vAC.setTo(
            this.get_C().x - this.get_A().x,
            this.get_C().y - this.get_A().y,
            this.get_B().z - this.get_A().z
        );
        this.dotZZ = this.vAB.scalarProduct(this.vAB);
        this.dotZX = this.vAB.scalarProduct(this.vAC);
        this.dotXX = this.vAC.scalarProduct(this.vAC);
    }
}
class Matrix {
    constructor(a, b, c, d, e, f) {
        null == f && (f = 0),
            null == e && (e = 0),
            null == d && (d = 1),
            null == c && (c = 0),
            null == b && (b = 0),
            null == a && (a = 1),
            this.a = a,
            this.b = b,
            this.c = c,
            this.d = d,
            this.tx = e,
            this.ty = f;
    }
    a = null;
    b = null;
    c = null;
    d = null;
    tx = null;
    ty = null;

    clone() {
        return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
    }

    concat(a) {
        var b = this.a * a.a + this.b * a.c;
        (this.b = this.a * a.b + this.b * a.d), (this.a = b);
        var c = this.c * a.a + this.d * a.c;
        (this.d = this.c * a.b + this.d * a.d), (this.c = c);
        var d = this.tx * a.a + this.ty * a.c + a.tx;
        (this.ty = this.tx * a.b + this.ty * a.d + a.ty), (this.tx = d);
    }

    copyColumnFrom(a, b) {
        if (a > 2) throw new ErrorWrap("Column " + a + " out of bounds (2)");
        0 == a
            ? ((this.a = b.x), (this.c = b.y))
            : 1 == a
                ? ((this.b = b.x), (this.d = b.y))
                : ((this.tx = b.x), (this.ty = b.y));
    }

    copyColumnTo(a, b) {
        if (a > 2) throw new ErrorWrap("Column " + a + " out of bounds (2)");
        0 == a
            ? ((b.x = this.a), (b.y = this.c), (b.z = 0))
            : 1 == a
                ? ((b.x = this.b), (b.y = this.d), (b.z = 0))
                : ((b.x = this.tx), (b.y = this.ty), (b.z = 1));
    }

    copyFrom(a) {
        (this.a = a.a),
            (this.b = a.b),
            (this.c = a.c),
            (this.d = a.d),
            (this.tx = a.tx),
            (this.ty = a.ty);
    }
    copyRowFrom(a, b) {
        if (a > 2) throw new ErrorWrap("Row " + a + " out of bounds (2)");
        0 == a
            ? ((this.a = b.x), (this.c = b.y))
            : 1 == a
                ? ((this.b = b.x), (this.d = b.y))
                : ((this.tx = b.x), (this.ty = b.y));
    }
    copyRowTo(a, b) {
        if (a > 2) throw new ErrorWrap("Row " + a + " out of bounds (2)");
        0 == a
            ? ((b.x = this.a), (b.y = this.b), (b.z = this.tx))
            : 1 == a
                ? ((b.x = this.c), (b.y = this.d), (b.z = this.ty))
                : b.setTo(0, 0, 1);
    }
    createBox(a, b, c, d, e) {
        if (
            (null == e && (e = 0), null == d && (d = 0), null == c && (c = 0), 0 != c)
        ) {
            var f = Math.cos(c),
                g = Math.sin(c);
            (this.a = f * a), (this.b = g * b), (this.c = -g * a), (this.d = f * b);
        } else (this.a = a), (this.b = 0), (this.c = 0), (this.d = b);
        (this.tx = d), (this.ty = e);
    }
    createGradientBox(a, b, c, d, e) {
        if (
            (null == e && (e = 0),
                null == d && (d = 0),
                null == c && (c = 0),
                (this.a = a / 1638.4),
                (this.d = b / 1638.4),
                0 != c)
        ) {
            var f = Math.cos(c),
                g = Math.sin(c);
            (this.b = g * this.d),
                (this.c = -g * this.a),
                (this.a *= f),
                (this.d *= f);
        } else (this.b = 0), (this.c = 0);
        (this.tx = d + a / 2), (this.ty = e + b / 2);
    }
    deltaTransformPoint(a) {
        return new Point(a.x * this.a + a.y * this.c, a.x * this.b + a.y * this.d);
    }
    equals(a) {
        return null != a &&
            this.tx == a.tx &&
            this.ty == a.ty &&
            this.a == a.a &&
            this.b == a.b &&
            this.c == a.c
            ? this.d == a.d
            : false;
    }
    identity() {
        (this.a = 1),
            (this.b = 0),
            (this.c = 0),
            (this.d = 1),
            (this.tx = 0),
            (this.ty = 0);
    }
    invert() {
        var a = this.a * this.d - this.b * this.c;
        if (0 == a)
            (this.a = this.b = this.c = this.d = 0),
                (this.tx = -this.tx),
                (this.ty = -this.ty);
        else {
            a = 1 / a;
            var b = this.d * a;
            (this.d = this.a * a), (this.a = b), (this.b *= -a), (this.c *= -a);
            var c = -this.a * this.tx - this.c * this.ty;
            (this.ty = -this.b * this.tx - this.d * this.ty), (this.tx = c);
        }
        return this;
    }
    rotate(a) {
        var b = Math.cos(a),
            c = Math.sin(a),
            d = this.a * b - this.b * c;
        (this.b = this.a * c + this.b * b), (this.a = d);
        var e = this.c * b - this.d * c;
        (this.d = this.c * c + this.d * b), (this.c = e);
        var f = this.tx * b - this.ty * c;
        (this.ty = this.tx * c + this.ty * b), (this.tx = f);
    }
    scale(a, b) {
        (this.a *= a),
            (this.b *= b),
            (this.c *= a),
            (this.d *= b),
            (this.tx *= a),
            (this.ty *= b);
    }
    aP(a, b) {
        null == b && (b = 1),
            (this.a = Math.cos(a) * b),
            (this.c = Math.sin(a) * b),
            (this.b = -this.c),
            (this.d = this.a);
    }
    setTo(a, b, c, d, e, f) {
        (this.a = a),
            (this.b = b),
            (this.c = c),
            (this.d = d),
            (this.tx = e),
            (this.ty = f);
    }
    to3DString(a) {
        return (
            null == a && (a = false),
            a
                ? "matrix3d(" +
                this.a +
                ", " +
                this.b +
                ", 0, 0, " +
                this.c +
                ", " +
                this.d +
                ", 0, 0, 0, 0, 1, 0, " +
                (0 | this.tx) +
                ", " +
                (0 | this.ty) +
                ", 0, 1)"
                : "matrix3d(" +
                this.a +
                ", " +
                this.b +
                ", 0, 0, " +
                this.c +
                ", " +
                this.d +
                ", 0, 0, 0, 0, 1, 0, " +
                this.tx +
                ", " +
                this.ty +
                ", 0, 1)"
        );
    }
    toMozString() {
        return (
            "matrix(" +
            this.a +
            ", " +
            this.b +
            ", " +
            this.c +
            ", " +
            this.d +
            ", " +
            this.tx +
            "px, " +
            this.ty +
            "px)"
        );
    }
    toString() {
        return (
            "matrix(" +
            this.a +
            ", " +
            this.b +
            ", " +
            this.c +
            ", " +
            this.d +
            ", " +
            this.tx +
            ", " +
            this.ty +
            ")"
        );
    }
    transformPoint(a) {
        return new Point(
            a.x * this.a + a.y * this.c + this.tx,
            a.x * this.b + a.y * this.d + this.ty
        );
    }
    __transformX(a, b) {
        return a * this.a + b * this.c + this.tx;
    }
    __transformY(a, b) {
        return a * this.b + b * this.d + this.ty;
    }
    translate(a, b) {
        (this.tx += a), (this.ty += b);
    }
    __cleanValues() {
        (this.a = Math.round(1e3 * this.a) / 1e3),
            (this.b = Math.round(1e3 * this.b) / 1e3),
            (this.c = Math.round(1e3 * this.c) / 1e3),
            (this.d = Math.round(1e3 * this.d) / 1e3),
            (this.tx = Math.round(10 * this.tx) / 10),
            (this.ty = Math.round(10 * this.ty) / 10);
    }
    __transformInversePoint(a) {
        var b = this.a * this.d - this.b * this.c;
        if (0 == b) (a.x = -this.tx), (a.y = -this.ty);
        else {
            var c = (1 / b) * (this.c * (this.ty - a.y) + this.d * (a.x - this.tx));
            (a.y = (1 / b) * (this.a * (a.y - this.ty) + this.b * (this.tx - a.x))),
                (a.x = c);
        }
    }
    __transformInverseX(a, b) {
        var c = this.a * this.d - this.b * this.c;
        return 0 == c
            ? -this.tx
            : (1 / c) * (this.c * (this.ty - b) + this.d * (a - this.tx));
    }
    __transformInverseY(a, b) {
        var c = this.a * this.d - this.b * this.c;
        return 0 == c
            ? -this.ty
            : (1 / c) * (this.a * (b - this.ty) + this.b * (this.tx - a));
    }
}
// Matrix.an = new Matrix;
class Matrix3D {
    static __name__ = "Matrix3D";
    __class__ = Matrix3D;
    rawData = null;
    constructor(a) {
        null != a && 16 == a.length
            ? (this.rawData = a)
            : (this.rawData = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    static create2D(a, b, c, d) {
        null == d && (d = 0), null == c && (c = 1);
        var e = (d * Math.PI) / 180,
            f = Math.cos(e),
            g = Math.sin(e);
        return new Matrix3D([
            f * c,
            -g * c,
            0,
            0,
            g * c,
            f * c,
            0,
            0,
            0,
            0,
            1,
            0,
            a,
            b,
            0,
            1,
        ]);
    }
    static createABCD(a, b, c, d, e, f) {
        return new Matrix3D([a, b, 0, 0, c, d, 0, 0, 0, 0, 1, 0, e, f, 0, 1]);
    }
    static createOrtho(a, b, c, d, e, f) {
        var g = 1 / (b - a),
            h = 1 / (d - c),
            i = 1 / (f - e);
        return new Matrix3D([
            2 * g,
            0,
            0,
            0,
            0,
            2 * h,
            0,
            0,
            0,
            0,
            -2 * i,
            0,
            -(a + b) * g,
            -(c + d) * h,
            -(e + f) * i,
            1,
        ]);
    }
    static interpolate(a, b, c) {
        for (var d = new Matrix3D(), e = 0; 16 > e;) {
            var f = e++;
            d.rawData[f] = a.rawData[f] + (b.rawData[f] - a.rawData[f]) * c;
        }
        return d;
    }
    static cP(a, b, c, d) {
        var e = new Matrix3D(),
            f = new Vector3D(a, b, c),
            g = -d * (Math.PI / 180),
            h = Math.cos(g),
            i = Math.sin(g),
            j = 1 - h;
        (e.rawData[0] = h + f.x * f.x * j),
            (e.rawData[5] = h + f.y * f.y * j),
            (e.rawData[10] = h + f.z * f.z * j);
        var k = f.x * f.y * j,
            l = f.z * i;
        return (
            (e.rawData[4] = k + l),
            (e.rawData[1] = k - l),
            (k = f.x * f.z * j),
            (l = f.y * i),
            (e.rawData[8] = k - l),
            (e.rawData[2] = k + l),
            (k = f.y * f.z * j),
            (l = f.x * i),
            (e.rawData[9] = k + l),
            (e.rawData[6] = k - l),
            e
        );
    }

    append(a) {
        var b = this.rawData[0],
            c = this.rawData[4],
            d = this.rawData[8],
            e = this.rawData[12],
            f = this.rawData[1],
            g = this.rawData[5],
            h = this.rawData[9],
            i = this.rawData[13],
            j = this.rawData[2],
            k = this.rawData[6],
            l = this.rawData[10],
            m = this.rawData[14],
            n = this.rawData[3],
            o = this.rawData[7],
            p = this.rawData[11],
            q = this.rawData[15],
            r = a.rawData[0],
            s = a.rawData[4],
            t = a.rawData[8],
            u = a.rawData[12],
            v = a.rawData[1],
            w = a.rawData[5],
            x = a.rawData[9],
            y = a.rawData[13],
            z = a.rawData[2],
            A = a.rawData[6],
            B = a.rawData[10],
            C = a.rawData[14],
            D = a.rawData[3],
            E = a.rawData[7],
            F = a.rawData[11],
            G = a.rawData[15];
        (this.rawData[0] = b * r + f * s + j * t + n * u),
            (this.rawData[1] = b * v + f * w + j * x + n * y),
            (this.rawData[2] = b * z + f * A + j * B + n * C),
            (this.rawData[3] = b * D + f * E + j * F + n * G),
            (this.rawData[4] = c * r + g * s + k * t + o * u),
            (this.rawData[5] = c * v + g * w + k * x + o * y),
            (this.rawData[6] = c * z + g * A + k * B + o * C),
            (this.rawData[7] = c * D + g * E + k * F + o * G),
            (this.rawData[8] = d * r + h * s + l * t + p * u),
            (this.rawData[9] = d * v + h * w + l * x + p * y),
            (this.rawData[10] = d * z + h * A + l * B + p * C),
            (this.rawData[11] = d * D + h * E + l * F + p * G),
            (this.rawData[12] = e * r + i * s + m * t + q * u),
            (this.rawData[13] = e * v + i * w + m * x + q * y),
            (this.rawData[14] = e * z + i * A + m * B + q * C),
            (this.rawData[15] = e * D + i * E + m * F + q * G);
    }
    appendRotation(degAngle, axis, organ) {
        var d,
            e,
            f = 0;
        (e = f), (d = e), null != organ && ((d = organ.x), (e = organ.y), (f = organ.z));
        var g = (degAngle * Math.PI) / 180,
            h = Math.cos(g),
            i = Math.sin(g),
            j = axis.x,
            k = axis.y,
            l = axis.z,
            m = j * j,
            n = k * k,
            o = l * l,
            p = m + n + o;
        if (0 != p) {
            var q = Math.sqrt(p);
            (j /= q), (k /= q), (l /= q), (m /= p), (n /= p), (o /= p);
        }
        var r = 1 - h,
            s = new Matrix3D(),
            t = s.rawData;
        (t[0] = m + (n + o) * h),
            (t[1] = j * k * r + l * i),
            (t[2] = j * l * r - k * i),
            (t[4] = j * k * r - l * i),
            (t[5] = n + (m + o) * h),
            (t[6] = k * l * r + j * i),
            (t[8] = j * l * r + k * i),
            (t[9] = k * l * r - j * i),
            (t[10] = o + (m + n) * h),
            (t[12] = (d * (n + o) - j * (e * k + f * l)) * r + (e * l - f * k) * i),
            (t[13] = (e * (m + o) - k * (d * j + f * l)) * r + (f * j - d * l) * i),
            (t[14] = (f * (m + n) - l * (d * j + e * k)) * r + (d * k - e * j) * i),
            this.append(s);
    }
    appendScale(a, b, c) {
        this.append(new Matrix3D([a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1]));
    }
    appendTranslation(a, b, c) {
        var d = this.rawData;
        d[12] = d[12] + a;
        var e = this.rawData;
        e[13] = e[13] + b;
        var f = this.rawData;
        f[14] = f[14] + c;
    }
    clone() {
        return new Matrix3D(this.rawData.slice());
    }
    copyColumnFrom(a, b) {
        switch (a) {
            case 0:
                (this.rawData[0] = b.x),
                    (this.rawData[1] = b.y),
                    (this.rawData[2] = b.z),
                    (this.rawData[3] = b.w);
                break;
            case 1:
                (this.rawData[4] = b.x),
                    (this.rawData[5] = b.y),
                    (this.rawData[6] = b.z),
                    (this.rawData[7] = b.w);
                break;
            case 2:
                (this.rawData[8] = b.x),
                    (this.rawData[9] = b.y),
                    (this.rawData[10] = b.z),
                    (this.rawData[11] = b.w);
                break;
            case 3:
                (this.rawData[12] = b.x),
                    (this.rawData[13] = b.y),
                    (this.rawData[14] = b.z),
                    (this.rawData[15] = b.w);
        }
    }
    copyColumnTo(a, b) {
        switch (a) {
            case 0:
                (b.x = this.rawData[0]),
                    (b.y = this.rawData[1]),
                    (b.z = this.rawData[2]),
                    (b.w = this.rawData[3]);
                break;
            case 1:
                (b.x = this.rawData[4]),
                    (b.y = this.rawData[5]),
                    (b.z = this.rawData[6]),
                    (b.w = this.rawData[7]);
                break;
            case 2:
                (b.x = this.rawData[8]),
                    (b.y = this.rawData[9]),
                    (b.z = this.rawData[10]),
                    (b.w = this.rawData[11]);
                break;
            case 3:
                (b.x = this.rawData[12]),
                    (b.y = this.rawData[13]),
                    (b.z = this.rawData[14]),
                    (b.w = this.rawData[15]);
        }
    }
    copyFrom(a) {
        this.rawData = a.rawData.slice();
    }
    copyRawDataFrom(a, b, c) {
        null == c && (c = false), null == b && (b = 0), c && this.transpose();
        for (var d = 0, e = a.length - b; e > d;) {
            var f = d++;
            this.rawData[f] = a[f + b];
        }
        c && this.transpose();
    }
    copyRawDataTo(a, b, c) {
        null == c && (c = false), null == b && (b = 0), c && this.transpose();
        for (var d = 0, e = this.rawData.length; e > d;) {
            var f = d++;
            a[f + b] = this.rawData[f];
        }
        c && this.transpose();
    }
    copyRowFrom(a, b) {
        switch (a) {
            case 0:
                (this.rawData[0] = b.x),
                    (this.rawData[4] = b.y),
                    (this.rawData[8] = b.z),
                    (this.rawData[12] = b.w);
                break;
            case 1:
                (this.rawData[1] = b.x),
                    (this.rawData[5] = b.y),
                    (this.rawData[9] = b.z),
                    (this.rawData[13] = b.w);
                break;
            case 2:
                (this.rawData[2] = b.x),
                    (this.rawData[6] = b.y),
                    (this.rawData[10] = b.z),
                    (this.rawData[14] = b.w);
                break;
            case 3:
                (this.rawData[3] = b.x),
                    (this.rawData[7] = b.y),
                    (this.rawData[11] = b.z),
                    (this.rawData[15] = b.w);
        }
    }
    copyRowTo(a, b) {
        switch (a) {
            case 0:
                (b.x = this.rawData[0]),
                    (b.y = this.rawData[4]),
                    (b.z = this.rawData[8]),
                    (b.w = this.rawData[12]);
                break;
            case 1:
                (b.x = this.rawData[1]),
                    (b.y = this.rawData[5]),
                    (b.z = this.rawData[9]),
                    (b.w = this.rawData[13]);
                break;
            case 2:
                (b.x = this.rawData[2]),
                    (b.y = this.rawData[6]),
                    (b.z = this.rawData[10]),
                    (b.w = this.rawData[14]);
                break;
            case 3:
                (b.x = this.rawData[3]),
                    (b.y = this.rawData[7]),
                    (b.z = this.rawData[11]),
                    (b.w = this.rawData[15]);
        }
    }
    copyToMatrix3D(a) {
        a.rawData = this.rawData.slice();
    }
    decompose(a) {
        null == a && (a = 1);
        var b = new Array(0),
            c = this.clone().rawData.slice(),
            d = new Vector3D(c[12], c[13], c[14]);
        (c[12] = 0), (c[13] = 0), (c[14] = 0);
        var e = new Vector3D();
        (e.x = Math.sqrt(c[0] * c[0] + c[1] * c[1] + c[2] * c[2])),
            (e.y = Math.sqrt(c[4] * c[4] + c[5] * c[5] + c[6] * c[6])),
            (e.z = Math.sqrt(c[8] * c[8] + c[9] * c[9] + c[10] * c[10])),
            c[0] * (c[5] * c[10] - c[6] * c[9]) -
            c[1] * (c[4] * c[10] - c[6] * c[8]) +
            c[2] * (c[4] * c[9] - c[5] * c[8]) <
            0 && (e.z = -e.z);
        var f = c;
        f[0] = f[0] / e.x;
        var g = c;
        g[1] = g[1] / e.x;
        var h = c;
        h[2] = h[2] / e.x;
        var i = c;
        i[4] = i[4] / e.y;
        var j = c;
        j[5] = j[5] / e.y;
        var k = c;
        k[6] = k[6] / e.y;
        var l = c;
        l[8] = l[8] / e.z;
        var m = c;
        m[9] = m[9] / e.z;
        var n = c;
        n[10] = n[10] / e.z;
        var o = new Vector3D();
        switch (a) {
            case 0:
                o.w = Math.acos((c[0] + c[5] + c[10] - 1) / 2);
                var p = Math.sqrt(
                    (c[6] - c[9]) * (c[6] - c[9]) +
                    (c[8] - c[2]) * (c[8] - c[2]) +
                    (c[1] - c[4]) * (c[1] - c[4])
                );
                0 != p
                    ? ((o.x = (c[6] - c[9]) / p),
                        (o.y = (c[8] - c[2]) / p),
                        (o.z = (c[1] - c[4]) / p))
                    : (o.x = o.y = o.z = 0);
                break;
            case 1:
                (o.y = Math.asin(-c[2])),
                    1 != c[2] && -1 != c[2]
                        ? ((o.x = Math.atan2(c[6], c[10])), (o.z = Math.atan2(c[1], c[0])))
                        : ((o.z = 0), (o.x = Math.atan2(c[4], c[5])));
                break;
            case 2:
                var q = c[0] + c[5] + c[10];
                q > 0
                    ? ((o.w = Math.sqrt(1 + q) / 2),
                        (o.x = (c[6] - c[9]) / (4 * o.w)),
                        (o.y = (c[8] - c[2]) / (4 * o.w)),
                        (o.z = (c[1] - c[4]) / (4 * o.w)))
                    : c[0] > c[5] && c[0] > c[10]
                        ? ((o.x = Math.sqrt(1 + c[0] - c[5] - c[10]) / 2),
                            (o.w = (c[6] - c[9]) / (4 * o.x)),
                            (o.y = (c[1] + c[4]) / (4 * o.x)),
                            (o.z = (c[8] + c[2]) / (4 * o.x)))
                        : c[5] > c[10]
                            ? ((o.y = Math.sqrt(1 + c[5] - c[0] - c[10]) / 2),
                                (o.x = (c[1] + c[4]) / (4 * o.y)),
                                (o.w = (c[8] - c[2]) / (4 * o.y)),
                                (o.z = (c[6] + c[9]) / (4 * o.y)))
                            : ((o.z = Math.sqrt(1 + c[10] - c[0] - c[5]) / 2),
                                (o.x = (c[8] + c[2]) / (4 * o.z)),
                                (o.y = (c[6] + c[9]) / (4 * o.z)),
                                (o.w = (c[1] - c[4]) / (4 * o.z)));
        }
        return b.push(d), b.push(o), b.push(e), b;
    }
    deltaTransformVector(a) {
        var b = a.x,
            c = a.y,
            d = a.z;
        return new Vector3D(
            b * this.rawData[0] +
            c * this.rawData[4] +
            d * this.rawData[8] +
            this.rawData[3],
            b * this.rawData[1] +
            c * this.rawData[5] +
            d * this.rawData[9] +
            this.rawData[7],
            b * this.rawData[2] +
            c * this.rawData[6] +
            d * this.rawData[10] +
            this.rawData[11],
            0
        );
    }
    identity() {
        this.rawData = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    }
    interpolateTo(a, b) {
        for (var c = 0; 16 > c;) {
            var d = c++,
                e = this.rawData;
            e[d] = e[d] + (a.rawData[d] - this.rawData[d]) * b;
        }
    }
    invert() {
        var a = this.get_determinant(),
            b = Math.abs(a) > 1e-11;
        if (b) {
            a = 1 / a;
            var c = this.rawData[0],
                d = this.rawData[4],
                e = this.rawData[8],
                f = this.rawData[12],
                g = this.rawData[1],
                h = this.rawData[5],
                i = this.rawData[9],
                j = this.rawData[13],
                k = this.rawData[2],
                l = this.rawData[6],
                m = this.rawData[10],
                n = this.rawData[14],
                o = this.rawData[3],
                p = this.rawData[7],
                q = this.rawData[11],
                r = this.rawData[15];
            (this.rawData[0] =
                a * (h * (m * r - n * q) - i * (l * r - n * p) + j * (l * q - m * p))),
                (this.rawData[1] =
                    -a *
                    (g * (m * r - n * q) - i * (k * r - n * o) + j * (k * q - m * o))),
                (this.rawData[2] =
                    a *
                    (g * (l * r - n * p) - h * (k * r - n * o) + j * (k * p - l * o))),
                (this.rawData[3] =
                    -a *
                    (g * (l * q - m * p) - h * (k * q - m * o) + i * (k * p - l * o))),
                (this.rawData[4] =
                    -a *
                    (d * (m * r - n * q) - e * (l * r - n * p) + f * (l * q - m * p))),
                (this.rawData[5] =
                    a *
                    (c * (m * r - n * q) - e * (k * r - n * o) + f * (k * q - m * o))),
                (this.rawData[6] =
                    -a *
                    (c * (l * r - n * p) - d * (k * r - n * o) + f * (k * p - l * o))),
                (this.rawData[7] =
                    a *
                    (c * (l * q - m * p) - d * (k * q - m * o) + e * (k * p - l * o))),
                (this.rawData[8] =
                    a *
                    (d * (i * r - j * q) - e * (h * r - j * p) + f * (h * q - i * p))),
                (this.rawData[9] =
                    -a *
                    (c * (i * r - j * q) - e * (g * r - j * o) + f * (g * q - i * o))),
                (this.rawData[10] =
                    a *
                    (c * (h * r - j * p) - d * (g * r - j * o) + f * (g * p - h * o))),
                (this.rawData[11] =
                    -a *
                    (c * (h * q - i * p) - d * (g * q - i * o) + e * (g * p - h * o))),
                (this.rawData[12] =
                    -a *
                    (d * (i * n - j * m) - e * (h * n - j * l) + f * (h * m - i * l))),
                (this.rawData[13] =
                    a *
                    (c * (i * n - j * m) - e * (g * n - j * k) + f * (g * m - i * k))),
                (this.rawData[14] =
                    -a *
                    (c * (h * n - j * l) - d * (g * n - j * k) + f * (g * l - h * k))),
                (this.rawData[15] =
                    a *
                    (c * (h * m - i * l) - d * (g * m - i * k) + e * (g * l - h * k)));
        }
        return b;
    }
    pointAt(a, b, c) {
        null == b && (b = new Vector3D(0, 0, -1)),
            null == c && (c = new Vector3D(0, -1, 0));
        var d,
            e = b.subtract(a),
            f = c.clone();
        e.normalize(), f.normalize();
        var g = e.clone();
        g.scaleBy(f.scalarProduct(e)),
            (f = f.subtract(g)),
            f.get_length() > 0
                ? f.normalize()
                : (f = 0 != e.x ? new Vector3D(-e.y, e.x, 0) : new Vector3D(1, 0, 0)),
            (d = f.vectorProduct(e)),
            d.normalize(),
            (this.rawData[0] = d.x),
            (this.rawData[4] = d.y),
            (this.rawData[8] = d.z),
            (this.rawData[12] = 0),
            (this.rawData[1] = f.x),
            (this.rawData[5] = f.y),
            (this.rawData[9] = f.z),
            (this.rawData[13] = 0),
            (this.rawData[2] = e.x),
            (this.rawData[6] = e.y),
            (this.rawData[10] = e.z),
            (this.rawData[14] = 0),
            (this.rawData[3] = a.x),
            (this.rawData[7] = a.y),
            (this.rawData[11] = a.z),
            (this.rawData[15] = 1);
    }
    prepend(a) {
        var b = a.rawData[0],
            c = a.rawData[4],
            d = a.rawData[8],
            e = a.rawData[12],
            f = a.rawData[1],
            g = a.rawData[5],
            h = a.rawData[9],
            i = a.rawData[13],
            j = a.rawData[2],
            k = a.rawData[6],
            l = a.rawData[10],
            m = a.rawData[14],
            n = a.rawData[3],
            o = a.rawData[7],
            p = a.rawData[11],
            q = a.rawData[15],
            r = this.rawData[0],
            s = this.rawData[4],
            t = this.rawData[8],
            u = this.rawData[12],
            v = this.rawData[1],
            w = this.rawData[5],
            x = this.rawData[9],
            y = this.rawData[13],
            z = this.rawData[2],
            A = this.rawData[6],
            B = this.rawData[10],
            C = this.rawData[14],
            D = this.rawData[3],
            E = this.rawData[7],
            F = this.rawData[11],
            G = this.rawData[15];
        (this.rawData[0] = b * r + f * s + j * t + n * u),
            (this.rawData[1] = b * v + f * w + j * x + n * y),
            (this.rawData[2] = b * z + f * A + j * B + n * C),
            (this.rawData[3] = b * D + f * E + j * F + n * G),
            (this.rawData[4] = c * r + g * s + k * t + o * u),
            (this.rawData[5] = c * v + g * w + k * x + o * y),
            (this.rawData[6] = c * z + g * A + k * B + o * C),
            (this.rawData[7] = c * D + g * E + k * F + o * G),
            (this.rawData[8] = d * r + h * s + l * t + p * u),
            (this.rawData[9] = d * v + h * w + l * x + p * y),
            (this.rawData[10] = d * z + h * A + l * B + p * C),
            (this.rawData[11] = d * D + h * E + l * F + p * G),
            (this.rawData[12] = e * r + i * s + m * t + q * u),
            (this.rawData[13] = e * v + i * w + m * x + q * y),
            (this.rawData[14] = e * z + i * A + m * B + q * C),
            (this.rawData[15] = e * D + i * E + m * F + q * G);
    }
    prependRotation(a, b, c) {
        var d,
            e,
            f = 0;
        (e = f), (d = e), null != c && ((d = c.x), (e = c.y), (f = c.z));
        var g = (a * Math.PI) / 180,
            h = Math.cos(g),
            i = Math.sin(g),
            j = b.x,
            k = b.y,
            l = b.z,
            m = j * j,
            n = k * k,
            o = l * l,
            p = m + n + o;
        if (0 != p) {
            var q = Math.sqrt(p);
            (j /= q), (k /= q), (l /= q), (m /= p), (n /= p), (o /= p);
        }
        var r = 1 - h,
            s = new Matrix3D(),
            t = s.rawData;
        (t[0] = m + (n + o) * h),
            (t[1] = j * k * r + l * i),
            (t[2] = j * l * r - k * i),
            (t[4] = j * k * r - l * i),
            (t[5] = n + (m + o) * h),
            (t[6] = k * l * r + j * i),
            (t[8] = j * l * r + k * i),
            (t[9] = k * l * r - j * i),
            (t[10] = o + (m + n) * h),
            (t[12] = (d * (n + o) - j * (e * k + f * l)) * r + (e * l - f * k) * i),
            (t[13] = (e * (m + o) - k * (d * j + f * l)) * r + (f * j - d * l) * i),
            (t[14] = (f * (m + n) - l * (d * j + e * k)) * r + (d * k - e * j) * i),
            this.prepend(s);
    }
    prependScale(a, b, c) {
        this.prepend(
            new Matrix3D([a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1])
        );
    }
    prependTranslation(a, b, c) {
        var d = new Matrix3D();
        d.set_position(new Vector3D(a, b, c)), this.prepend(d);
    }
    recompose(a, b) {
        if (a.length < 3 || 0 == a[2].x || 0 == a[2].y || 0 == a[2].z) return false;
        null == b && (b = 1), this.identity();
        var c = [];
        if (
            ((c[0] = c[1] = c[2] = a[2].x),
                (c[4] = c[5] = c[6] = a[2].y),
                (c[8] = c[9] = c[10] = a[2].z),
                null == b)
        ) {
            var d = a[1].x,
                e = a[1].y,
                f = a[1].z,
                g = a[1].w;
            0 == b &&
                ((d *= Math.sin(g / 2)),
                    (e *= Math.sin(g / 2)),
                    (f *= Math.sin(g / 2)),
                    (g = Math.cos(g / 2))),
                (this.rawData[0] = (1 - 2 * e * e - 2 * f * f) * c[0]),
                (this.rawData[1] = (2 * d * e + 2 * g * f) * c[1]),
                (this.rawData[2] = (2 * d * f - 2 * g * e) * c[2]),
                (this.rawData[3] = 0),
                (this.rawData[4] = (2 * d * e - 2 * g * f) * c[4]),
                (this.rawData[5] = (1 - 2 * d * d - 2 * f * f) * c[5]),
                (this.rawData[6] = (2 * e * f + 2 * g * d) * c[6]),
                (this.rawData[7] = 0),
                (this.rawData[8] = (2 * d * f + 2 * g * e) * c[8]),
                (this.rawData[9] = (2 * e * f - 2 * g * d) * c[9]),
                (this.rawData[10] = (1 - 2 * d * d - 2 * e * e) * c[10]),
                (this.rawData[11] = 0),
                (this.rawData[12] = a[0].x),
                (this.rawData[13] = a[0].y),
                (this.rawData[14] = a[0].z),
                (this.rawData[15] = 1);
        } else if (1 == b) {
            var h = Math.cos(a[1].x),
                i = Math.cos(a[1].y),
                j = Math.cos(a[1].z),
                k = Math.sin(a[1].x),
                l = Math.sin(a[1].y),
                m = Math.sin(a[1].z);
            (this.rawData[0] = i * j * c[0]),
                (this.rawData[1] = i * m * c[1]),
                (this.rawData[2] = -l * c[2]),
                (this.rawData[3] = 0),
                (this.rawData[4] = (k * l * j - h * m) * c[4]),
                (this.rawData[5] = (k * l * m + h * j) * c[5]),
                (this.rawData[6] = k * i * c[6]),
                (this.rawData[7] = 0),
                (this.rawData[8] = (h * l * j + k * m) * c[8]),
                (this.rawData[9] = (h * l * m - k * j) * c[9]),
                (this.rawData[10] = h * i * c[10]),
                (this.rawData[11] = 0),
                (this.rawData[12] = a[0].x),
                (this.rawData[13] = a[0].y),
                (this.rawData[14] = a[0].z),
                (this.rawData[15] = 1);
        } else {
            var n = a[1].x,
                o = a[1].y,
                p = a[1].z,
                q = a[1].w;
            0 == b &&
                ((n *= Math.sin(q / 2)),
                    (o *= Math.sin(q / 2)),
                    (p *= Math.sin(q / 2)),
                    (q = Math.cos(q / 2))),
                (this.rawData[0] = (1 - 2 * o * o - 2 * p * p) * c[0]),
                (this.rawData[1] = (2 * n * o + 2 * q * p) * c[1]),
                (this.rawData[2] = (2 * n * p - 2 * q * o) * c[2]),
                (this.rawData[3] = 0),
                (this.rawData[4] = (2 * n * o - 2 * q * p) * c[4]),
                (this.rawData[5] = (1 - 2 * n * n - 2 * p * p) * c[5]),
                (this.rawData[6] = (2 * o * p + 2 * q * n) * c[6]),
                (this.rawData[7] = 0),
                (this.rawData[8] = (2 * n * p + 2 * q * o) * c[8]),
                (this.rawData[9] = (2 * o * p - 2 * q * n) * c[9]),
                (this.rawData[10] = (1 - 2 * n * n - 2 * o * o) * c[10]),
                (this.rawData[11] = 0),
                (this.rawData[12] = a[0].x),
                (this.rawData[13] = a[0].y),
                (this.rawData[14] = a[0].z),
                (this.rawData[15] = 1);
        }
        return (
            0 == a[2].x && (this.rawData[0] = 1e-15),
            0 == a[2].y && (this.rawData[5] = 1e-15),
            0 == a[2].z && (this.rawData[10] = 1e-15),
            !(0 == a[2].x || 0 == a[2].y || 0 == a[2].y)
        );
    }
    transformVector(a) {
        var b = a.x,
            c = a.y,
            d = a.z;
        return new Vector3D(
            b * this.rawData[0] +
            c * this.rawData[4] +
            d * this.rawData[8] +
            this.rawData[12],
            b * this.rawData[1] +
            c * this.rawData[5] +
            d * this.rawData[9] +
            this.rawData[13],
            b * this.rawData[2] +
            c * this.rawData[6] +
            d * this.rawData[10] +
            this.rawData[14],
            b * this.rawData[3] +
            c * this.rawData[7] +
            d * this.rawData[11] +
            this.rawData[15]
        );
    }
    transformVectors(a, b) {
        for (var c, d, e, f = 0; f + 3 <= a.length;)
            (c = a[f]),
                (d = a[f + 1]),
                (e = a[f + 2]),
                (b[f] =
                    c * this.rawData[0] +
                    d * this.rawData[4] +
                    e * this.rawData[8] +
                    this.rawData[12]),
                (b[f + 1] =
                    c * this.rawData[1] +
                    d * this.rawData[5] +
                    e * this.rawData[9] +
                    this.rawData[13]),
                (b[f + 2] =
                    c * this.rawData[2] +
                    d * this.rawData[6] +
                    e * this.rawData[10] +
                    this.rawData[14]),
                (f += 3);
    }
    transpose() {
        var a = this.rawData.slice();
        (this.rawData[1] = a[4]),
            (this.rawData[2] = a[8]),
            (this.rawData[3] = a[12]),
            (this.rawData[4] = a[1]),
            (this.rawData[6] = a[9]),
            (this.rawData[7] = a[13]),
            (this.rawData[8] = a[2]),
            (this.rawData[9] = a[6]),
            (this.rawData[11] = a[14]),
            (this.rawData[12] = a[3]),
            (this.rawData[13] = a[7]),
            (this.rawData[14] = a[11]);
    }
    get_determinant() {
        return (
            (this.rawData[0] * this.rawData[5] - this.rawData[4] * this.rawData[1]) *
            (this.rawData[10] * this.rawData[15] -
                this.rawData[14] * this.rawData[11]) -
            (this.rawData[0] * this.rawData[9] - this.rawData[8] * this.rawData[1]) *
            (this.rawData[6] * this.rawData[15] -
                this.rawData[14] * this.rawData[7]) +
            (this.rawData[0] * this.rawData[13] -
                this.rawData[12] * this.rawData[1]) *
            (this.rawData[6] * this.rawData[11] -
                this.rawData[10] * this.rawData[7]) +
            (this.rawData[4] * this.rawData[9] - this.rawData[8] * this.rawData[5]) *
            (this.rawData[2] * this.rawData[15] -
                this.rawData[14] * this.rawData[3]) -
            (this.rawData[4] * this.rawData[13] -
                this.rawData[12] * this.rawData[5]) *
            (this.rawData[2] * this.rawData[11] -
                this.rawData[10] * this.rawData[3]) +
            (this.rawData[8] * this.rawData[13] -
                this.rawData[12] * this.rawData[9]) *
            (this.rawData[2] * this.rawData[7] - this.rawData[6] * this.rawData[3])
        );
    }
    get_position() {
        return new Vector3D(this.rawData[12], this.rawData[13], this.rawData[14]);
    }
    set_position(a) {
        return (
            (this.rawData[12] = a.x),
            (this.rawData[13] = a.y),
            (this.rawData[14] = a.z),
            a
        );
    }
}
class LineIntersectBuilder {
    __class__ = LineIntersectBuilder;
    static __name__ = ["LineIntersectBuilder"];
    static calcIntersection(first_x, first_y, next_x, next_y, x1, y1, x2, y2, firstLineTest, secondLineTest, k) {
        var dx1 = first_x - next_x,
            dx2 = x1 - x2,
            dy1 = first_y - next_y,
            dy2 = y1 - y2,
            p = dx1 * dy2 - dy1 * dx2;
        if (LineIntersectBuilder.tolerance >= (p > 0 ? p : 0 - p)) // check parallel
            return null;

        var q = first_x * next_y - first_y * next_x,
            s = x1 * y2 - y1 * x2,
            x0 = (dx2 * q - dx1 * s) / p,
            y0 = (dy2 * q - dy1 * s) / p; //get unlimited line intersection
        if (firstLineTest) {
            var v,
                leftX = next_x > first_x ? first_x : next_x;
            var dxLeft = x0 > leftX ? x0 - leftX : leftX - x0;
            if (LineIntersectBuilder.tolerance >= dxLeft ? false : leftX > x0) v = true;
            else {
                var right = first_x > next_x ? first_x : next_x;
                var dxRight = x0 > right ? x0 - right : right - x0;
                v = LineIntersectBuilder.tolerance >= dxRight ? false : x0 > right;
            }
            if (v) return null;
            var y,
                z = next_y > first_y ? first_y : next_y;
            if (LineIntersectBuilder.tolerance >= (y0 > z ? y0 - z : z - y0) ? false : z > y0) y = true;
            else {
                var A = first_y > next_y ? first_y : next_y;
                y = LineIntersectBuilder.tolerance >= (y0 > A ? y0 - A : A - y0) ? false : y0 > A;
            }
            if (y) return null;
        }
        if (secondLineTest) {
            var B,
                C = x2 > x1 ? x1 : x2;
            if (LineIntersectBuilder.tolerance >= (x0 > C ? x0 - C : C - x0) ? false : C > x0) B = true;
            else {
                var D = x1 > x2 ? x1 : x2;
                B = LineIntersectBuilder.tolerance >= (x0 > D ? x0 - D : D - x0) ? false : x0 > D;
            }
            if (B) return null;
            var E,
                F = y2 > y1 ? y1 : y2;
            if (LineIntersectBuilder.tolerance >= (y0 > F ? y0 - F : F - y0) ? false : F > y0) E = true;
            else {
                var G = y1 > y2 ? y1 : y2;
                E = LineIntersectBuilder.tolerance >= (y0 > G ? y0 - G : G - y0) ? false : y0 > G;
            }
            if (E) return null;
        }
        if (null != k) return k.setTo(x0, y0), k;
        var H = new Point;
        H.setTo(x0, y0);
        return H;
    }
    static tolerance = 1e-6;
}
class PolyTriangulator {
    static __name__ = ["PolyTriangulator"];

    constructor() { }

    GeoPolygonToFaceArray(geoPolygon, winding) {
        PolyTriangulator.gFace = new Face3;
        PolyTriangulator.gFace.initialize(
            new PointEx,
            new PointEx,
            new PointEx
        );
        var ptCount = geoPolygon.get_numOfPoints(),
            face = new Face3;
        face.initialize(geoPolygon.getPointAt(0), geoPolygon.getPointAt(1), geoPolygon.getPointAt(2));
        if (3 > ptCount) {
            var faceArray = new Array(0);
            faceArray[0] = face;
            return faceArray;
        }
        PolyTriangulator.gPoint = new PointEx;
        PolyTriangulator.gPointArray = new Array(ptCount);
        for (var f = 0; ptCount > f; f++)
            PolyTriangulator.gPointArray[ptCount - 1 - f] = geoPolygon.getPointAt(f);
        PolyTriangulator.gWinding = winding;
        this.jO();
        return PolyTriangulator.gFaceArray;
    }
    jO() {
        PolyTriangulator.gCounter = 0;
        PolyTriangulator.gOK = false;
        PolyTriangulator.gFaceArray = new Array(0);
        PolyTriangulator.gPointArray2 = PolyTriangulator.gPointArray.slice();

        for (var i = 0; PolyTriangulator.gPointArray2.length > 2; i++) {
            this.jR(PolyTriangulator.gPointArray2);
            if (PolyTriangulator.gOK) return;
            if (i > 2 * PolyTriangulator.gPointArray.length) break;//throw new Error("Can't Triangulate the poly!"); //kkk todo todo
        }
    }
    jR(ptArray) {
        if (3 == ptArray.length) {
            var face = new Face3;
            face.initialize(ptArray[0], ptArray[1], ptArray[2]);
            PolyTriangulator.gFaceArray.push(face);
            PolyTriangulator.gOK = true;
            return;
        }
        PolyTriangulator.gCounter = PolyTriangulator.gCounter < 0 ? 0 : PolyTriangulator.gCounter;
        if (ptArray.length <= PolyTriangulator.gCounter) {
            PolyTriangulator.gOK = true;
            return;
        }
        PolyTriangulator.gPointA = ptArray[PolyTriangulator.gCounter];
        PolyTriangulator.gPointB =
            ptArray[ptArray.length > PolyTriangulator.gCounter + 1 ? PolyTriangulator.gCounter + 1 : 0];
        PolyTriangulator.gPointC =
            ptArray[ptArray.length > PolyTriangulator.gCounter + 2 ? PolyTriangulator.gCounter + 2 : 1];
        PolyTriangulator.gFace.set_a(PolyTriangulator.gPointA);
        PolyTriangulator.gFace.set_b(PolyTriangulator.gPointB);
        PolyTriangulator.gFace.set_c(PolyTriangulator.gPointC);
        if (this.jW(PolyTriangulator.gFace, ptArray)) {
            PolyTriangulator.gCounter++;
            return;
        }
        var ie = new Point;
        var c = PolyTriangulator.gPointC.x,
            d = PolyTriangulator.gPointC.y;
        ie.setTo(0.5 * (PolyTriangulator.gPointA.x - c) + c,
            0.5 * (PolyTriangulator.gPointA.y - d) + d);
        var e = PolyTriangulator.gPointB.x,
            f = PolyTriangulator.gPointB.y,
            g = (PolyTriangulator.gPointA.x - e) * (ie.y - f) -
                (ie.x - e) * (PolyTriangulator.gPointA.y - f),
            h = PolyTriangulator.gPointC.x,
            i = PolyTriangulator.gPointC.y,
            j = (PolyTriangulator.gPointB.x - h) * (ie.y - i) -
                (ie.x - h) * (PolyTriangulator.gPointB.y - i);
        if ((-1 == PolyTriangulator.gWinding && g > 0 && j > 0) ||
            (1 == PolyTriangulator.gWinding && 0 > g && 0 > j)) {
            PolyTriangulator.gCounter++;
            return;
        }
        var face = new Face3;
        face.initialize(
            PolyTriangulator.gFace.get_a(),
            PolyTriangulator.gFace.get_b(),
            PolyTriangulator.gFace.get_c()
        );
        PolyTriangulator.gFaceArray.push(face);
        ptArray.splice(PolyTriangulator.gCounter + 1, 1);
        PolyTriangulator.gCounter--;
    }
    jY(ptArray) {
        var b = ptArray.length - 1;
        (PolyTriangulator.gPointA = ptArray[b]),
            (PolyTriangulator.gPointB = ptArray.length > b + 1 ? ptArray[b + 1] : ptArray[0]),
            (PolyTriangulator.gPointC = ptArray.length > b + 2 ? ptArray[b + 2] : ptArray[1]);
        var cX = PolyTriangulator.gPointC.x,
            X = 0.5 * (PolyTriangulator.gPointA.x - cX) + cX,
            cY = PolyTriangulator.gPointC.y,
            Y = 0.5 * (PolyTriangulator.gPointA.y - cY) + cY,
            ptCA = new Point;
        ptCA.setTo(X, Y);
        var h = null,
            i = 0;
        for (b = 0; ptArray.length > b; b++) {
            var k = ptArray[b],
                l = ptArray.length > b + 1 ? ptArray[b + 1] : ptArray[0];
            LineIntersectBuilder.calcIntersection(
                ptCA.x,
                ptCA.y,
                MathConsts.FLOAT_MAX,
                ptCA.y,
                k.x,
                k.y,
                l.x,
                l.y,
                true,
                true,
                h
            ),
                null != h && ++i;
        }
        PolyTriangulator.gFace.set_a(PolyTriangulator.gPointA),
            PolyTriangulator.gFace.set_b(PolyTriangulator.gPointB),
            PolyTriangulator.gFace.set_c(PolyTriangulator.gPointC),
            i % 2 != 0 ||
            this.jW(PolyTriangulator.gFace, ptArray) || ptArray.reverse();
        var bX = PolyTriangulator.gPointB.x,
            bY = PolyTriangulator.gPointB.y,
            cX = PolyTriangulator.gPointC.x,
            cY = PolyTriangulator.gPointC.y,
            q = 0;
        q = (PolyTriangulator.gPointA.x - bX) * (ptCA.y - bY) -
            (ptCA.x - bX) * (PolyTriangulator.gPointA.y - bY) <
            0 &&
            (PolyTriangulator.gPointB.x - cX) * (ptCA.y - cY) -
            (ptCA.x - cX) * (PolyTriangulator.gPointB.y - cY) <
            0
            ? 1
            : -1;
        return q;
    }
    jW(face, ptArray) {
        for (var id = 0; ptArray.length > id; id++) {
            PolyTriangulator.gPoint = ptArray[id];
            if (PolyTriangulator.gPoint != PolyTriangulator.gPointA &&
                PolyTriangulator.gPoint != PolyTriangulator.gPointB &&
                PolyTriangulator.gPoint != PolyTriangulator.gPointC) {
                var e,
                    X = PolyTriangulator.gPoint.x,
                    Y = PolyTriangulator.gPoint.y,
                    aX = face.get_a().x,
                    aY = face.get_a().y,
                    bX = face.get_b().x,
                    bY = face.get_b().y,
                    cX = face.get_c().x,
                    cY = face.get_c().y,
                    n = (X - bX) * (aY - bY) - (aX - bX) * (Y - bY),
                    o = (X - cX) * (bY - cY) - (bX - cX) * (Y - cY),
                    p = 1e-6 >= (o > 0 ? o : 0 - o) ? false : 0 > o;
                if ((1e-6 >= (n > 0 ? n : 0 - n) ? false : 0 > n) != p) e = false;
                else {
                    var q = (X - aX) * (cY - aY) - (cX - aX) * (Y - aY);
                    e = p == (1e-6 >= (q > 0 ? q : 0 - q) ? false : 0 > q);
                }
                if (e) return true;
            }
        }
        return false;
    }
}
PolyTriangulator.gOK = false;
PolyTriangulator.gCounter = 0;
PolyTriangulator.gPointA = null;
PolyTriangulator.gPointB = null;
PolyTriangulator.gPointC = null;
PolyTriangulator.gPointArray = null;
PolyTriangulator.gPoint = null;
PolyTriangulator.gFaceArray = null;
PolyTriangulator.gFace = null;
PolyTriangulator.gWinding = null;
PolyTriangulator.gPointArray2 = null;

class SimpleGeometryData {
    __class__ = SimpleGeometryData;
    static __name__ = ["SimpleGeometryData"];
    testFlag = 0;
    indices = null;
    polygons = null;
    secondaryUvData = null;
    vertexNormalData = null;
    vertexTangentData = null;
    vertexPositionData = null;
    uvData = null;
    vertexTopologyData = null;

    constructor() { }
    clone() {
        var a = new SimpleGeometryData();

        null != this.vertexPositionData &&
            (a.vertexPositionData = this.vertexPositionData.slice()),
            null != this.vertexNormalData &&
            (a.vertexNormalData = this.vertexNormalData.slice()),
            null != this.uvData && (a.uvData = this.uvData.slice()),
            null != this.secondaryUvData &&
            (a.secondaryUvData = this.secondaryUvData.slice()),
            null != this.indices && (a.indices = this.indices.slice()),
            null != this.polygons && (a.polygons = this.polygons.slice()),
            null != this.vertexTopologyData &&
            (a.vertexTopologyData = this.vertexTopologyData.slice()),
            null != this.vertexTangentData &&
            (a.vertexTangentData = this.vertexTangentData.slice());
        a.testFlag = this.testFlag;
        return a;
    }
}
class MySimpleGeometryData extends SimpleGeometryData {
    static __super__ = SimpleGeometryData;
    __class__ = MySimpleGeometryData;
    static __name__ = ["MySimpleGeometryData"];
    constructor() {
        super();
    }

    borderMap = null;
}
class GeoBase {
    __class__ = GeoBase;
    static __name__ = ["GeoBase"];
    bInvalidate = null;
    constructor() {
        this.bInvalidate = false;
    }
    regulate() { }
    validateNow() {
        if (this.bInvalidate == true) {
            this.regulate();
            this.bInvalidate = false;
        }
    }
    invalidate() {
        this.bInvalidate = true;
    }
}
class GeoPolygon extends GeoBase {
    static __super__ = GeoBase;
    __class__ = GeoPolygon;
    static __name__ = ["GeoPolygon"];
    numOfPoints = 0;
    centroid = null;
    boundingRect = null;
    pointArray = null;
    bSortPoints = false;
    bTriIndicesOK = false;
    constructor(ptArray) {
        super();
        if (ptArray == undefined) ptArray = null;
        this.boundingRect = new Rectangle();
        this.centroid = new Point();
        this.setTo(ptArray);
    }
    get_numOfPoints() {
        super.validateNow();
        return this.numOfPoints;
    }
    get_centroid() {
        super.validateNow();
        return this.centroid;
    }
    get_boundingRect() {
        super.validateNow();
        return this.boundingRect;
    }
    setTo(ptArray) {
        this.pointArray = ptArray;
        null != ptArray ? (this.numOfPoints = ptArray.length) : (this.numOfPoints = 0);
        this.bSortPoints = false;
        this.bTriIndicesOK = false;
        this.regulate();
        this.invalidate();
    }
    addPoint(a) {
        this.pointArray.push(a), (this.bSortPoints = false), (this.bTriIndicesOK = false), this.invalidate();
    }
    getPointAt(a) {
        return this.pointArray[a];
    }
    translate(dx, dy) {
        if (0 != dx || 0 != dy) {
            for (var len = this.pointArray.length, id = 0; len > id;)
                this.pointArray[id].offset(dx, dy), ++id;
            this.boundingRect.offset(dx, dy),
                this.centroid.offset(dx, dy);
        }
    }
    rotate3D(angle, axis) {
        if (0 != angle) {
            GeoPolygon.mMatrix3D.identity();
            GeoPolygon.mMatrix3D.appendRotation(
                angle, axis, new Vector3D(this.get_centroid().x, 0, this.get_centroid().y)
            );
            var ptCount = this.pointArray.length;
            for (var d = 0; ptCount > d; d++) {
                var pt = this.pointArray[d];
                GeoPolygon.mVector3D.setTo(pt.x, 0, pt.y);
                var f = GeoPolygon.mVector3D,
                    g = GeoPolygon.mMatrix3D.rawData,
                    x = f.x,
                    y = f.y,
                    z = f.z;
                f.setTo(
                    x * g[0] + y * g[4] + z * g[8] + g[12],
                    x * g[1] + y * g[5] + z * g[9] + g[13],
                    x * g[2] + y * g[6] + z * g[10] + g[14]
                );
                f.w = x * g[3] + y * g[7] + z * g[11] + g[15];

                pt.setTo(GeoPolygon.mVector3D.x, GeoPolygon.mVector3D.z);
            }
            this.invalidate();
        }
    }
    rotate2D(a, b, c) {
        for (
            var d = Math.sin(c * MathConsts.TAU),
            e = Math.cos(c * MathConsts.TAU),
            f = this.pointArray.length,
            g = 0;
            f > g;

        ) {
            var h = this.pointArray[g],
                i = h.x - a,
                j = h.y - b;
            h.setTo(a + i * e + j * d, b - i * d + j * e), ++g;
        }
        this.invalidate();
    }
    GeoPolygonToGeomDataXY(winding, zVal) {
        null == zVal && (zVal = 0), super.validateNow();
        var faceArray = GeoPolygon.mPolyTriangulator.GeoPolygonToFaceArray(this, 1),
            geometryData = new SimpleGeometryData(),
            e = 9 * faceArray.length,
            vertexPositionData = new Array(e),
            g = 9 * faceArray.length,
            vertexNormalData = new Array(g),
            i = 3 * faceArray.length,
            indices = new Array(i),
            k = 6 * faceArray.length,
            uvData = new Array(k),
            m = 0,
            n = 0;

        for (var id = 0; id < faceArray.length; id++) {
            var face = faceArray[id];
            -1 == winding ? ((indices[n] = n++), (indices[n] = n++), (indices[n] = n++))
                : 1 == winding &&
                ((indices[n + 2] = 3 * id),
                    (indices[n + 1] = 3 * id + 1),
                    (indices[n] = 3 * id + 2),
                    (n += 3)),
                (vertexPositionData[m] = face.get_a().x),
                (vertexNormalData[m++] = 0),
                (vertexPositionData[m] = -face.get_a().y),
                (vertexNormalData[m++] = 0),
                (vertexPositionData[m] = zVal),
                (vertexNormalData[m++] = 1),
                (vertexPositionData[m] = face.get_b().x),
                (vertexNormalData[m++] = 0),
                (vertexPositionData[m] = -face.get_b().y),
                (vertexNormalData[m++] = 0),
                (vertexPositionData[m] = zVal),
                (vertexNormalData[m++] = 1),
                (vertexPositionData[m] = face.get_c().x),
                (vertexNormalData[m++] = 0),
                (vertexPositionData[m] = -face.get_c().y),
                (vertexNormalData[m++] = 0),
                (vertexPositionData[m] = zVal),
                (vertexNormalData[m++] = 1);
        }
        return (
            (geometryData.indices = indices),
            (geometryData.vertexPositionData = vertexPositionData),
            (geometryData.vertexNormalData = vertexNormalData),
            (geometryData.uvData = uvData),
            geometryData
        );
    }
    GeoPolygonToGeomDataXZ(winding, yVal) {
        null == yVal && (yVal = 0);
        super.validateNow();
        for (
            var faceArray = GeoPolygon.mPolyTriangulator.GeoPolygonToFaceArray(this, 1),
            geometeryData = new SimpleGeometryData(),
            e = 9 * faceArray.length,
            vertexPositionData = new Array(e),
            g = 9 * faceArray.length,
            vertexNormalData = new Array(g),
            i = 3 * faceArray.length,
            indices = new Array(i),
            k = 6 * faceArray.length,
            uvData = new Array(k),
            m = 0,
            n = 0,
            id = 0;
            id < faceArray.length; id++

        ) {
            var face = faceArray[id];
            -1 == winding
                ? ((indices[n] = n++), (indices[n] = n++), (indices[n] = n++))
                : 1 == winding &&
                ((indices[n + 2] = 3 * id),
                    (indices[n + 1] = 3 * id + 1),
                    (indices[n] = 3 * id + 2),
                    (n += 3)),
                (vertexPositionData[m] = face.get_a().x),
                (vertexNormalData[m++] = 0),
                (vertexPositionData[m] = yVal),
                (vertexNormalData[m++] = 1),
                (vertexPositionData[m] = face.get_a().y),
                (vertexNormalData[m++] = 0),
                (vertexPositionData[m] = face.get_b().x),
                (vertexNormalData[m++] = 0),
                (vertexPositionData[m] = yVal),
                (vertexNormalData[m++] = 1),
                (vertexPositionData[m] = face.get_b().y),
                (vertexNormalData[m++] = 0),
                (vertexPositionData[m] = face.get_c().x),
                (vertexNormalData[m++] = 0),
                (vertexPositionData[m] = yVal),
                (vertexNormalData[m++] = 1),
                (vertexPositionData[m] = face.get_c().y),
                (vertexNormalData[m++] = 0);
        }
        return (
            (geometeryData.indices = indices),
            (geometeryData.vertexPositionData = vertexPositionData),
            (geometeryData.vertexNormalData = vertexNormalData),
            (geometeryData.uvData = uvData),
            geometeryData
        );
    }
    clone(a) {
        return null == a && (a = false), new GeoPolygon(a ? this.clonePointArray() : this.pointArray.slice());
    }
    transform(a) {
        for (var b = 0, ptArray = this.pointArray; b < ptArray.length;) {
            var d = ptArray[b];
            ++b;
            var e = d.x,
                f = d.y;
            (d.x = e * a.a + f * a.c + a.tx), (d.y = e * a.b + f * a.d + a.ty);
        }
        this.invalidate();
    }
    reverse() {
        this.pointArray.reverse();
    }
    clearDoubles(a) {
        null == a && (a = 1e-6);
        for (var id = 0; id < this.pointArray.length;) {
            for (var c = this.pointArray[id], id2 = id + 1; id2 < this.pointArray.length;)
                Point.distance(c, this.pointArray[id2]) < a &&
                    (this.pointArray.splice(id2, 1), this.numOfPoints--, --id2),
                    ++id2;
            ++id;
        }
    }
    regulate() {
        this.numOfPoints = (null != this.pointArray) ? this.pointArray.length : 0;
        this.calcCentroid();
        this.calcBoundingRect();
    }
    clonePointArray() {
        for (var len = this.pointArray.length, b = new Array(len), c = 0; len > c;)
            (b[c] = ObjMan.__cast(this.pointArray[c].clone(), PointEx)), ++c;
        return b;
    }
    calcBoundingRect() {
        if (null == this.pointArray || 0 == this.pointArray.length)
            return void this.boundingRect.setTo(NaN, NaN, NaN, NaN);
        for (
            var minX = Infinity,// Infinity,
            maxX = -Infinity,
            minY = Infinity,
            maxY = -Infinity,
            e = this.pointArray.length,
            f = 0;
            e > f; f++

        ) {
            var pt = this.pointArray[f];
            (minX = minX < pt.x ? minX : pt.x);
            (minY = minY < pt.y ? minY : pt.y);
            (maxX = maxX > pt.x ? maxX : pt.x);
            (maxY = maxY > pt.y ? maxY : pt.y);
        }
        this.boundingRect.setTo(minX, minY, maxX - minX, maxY - minY);
    }
    calcCentroid() {
        if (null == this.pointArray || 0 == this.pointArray.length) {
            this.centroid.setTo(NaN, NaN);
            return;
        }
        var a = 0, b = 0, len = this.pointArray.length;
        for (var d = 0; len > d; d++) {
            a += this.pointArray[d].x;
            b += this.pointArray[d].y;
        }
        (a /= len), (b /= len);
        this.centroid.setTo(a, b);
    }
}
GeoPolygon.mPolyTriangulator = new PolyTriangulator;
GeoPolygon.mMatrix3D = new Matrix3D;
GeoPolygon.mVector3D = new Vector3D;

class FacePolygon extends GeoPolygon {
    static __super__ = GeoPolygon;
    __class__ = FacePolygon;
    static __name__ = ["FacePolygon"];
    winding = null;
    triIndices = null;
    constructor(ptArray, _winding) {
        null == _winding && (_winding = 1),
            super(ptArray),
            this.set_winding(1);
    }

    get_winding() {
        return this.winding;
    }
    set_winding(a) {
        return this.winding == a ? this.winding : ((this.winding = a), (this.bSortPoints = false), this.winding);
    }
    get_trianglesIndices() {
        this.calcTriIndices();
        return this.triIndices;
    }
    sortPoints() {
        super.validateNow();
        //if (!this.bSortPoints) {
        if (true) {
            if (1 == this.get_winding()) {
                this.pointArray.sort((a, b) => {
                    return this.negativeCompare(a, b);
                });
            }
            else {
                if (-1 != this.get_winding())
                    throw new Error("Invalid winding: " + this.get_winding());
                this.pointArray.sort((a, b) => {
                    return this.positiveCompare(a, b);
                });
            }
            this.bTriIndicesOK = false;
            this.bSortPoints = true;
        }
    }
    getPointAt(a) {
        return this.bSortPoints || this.sortPoints(), this.pointArray[a];
    }
    clone(a) {
        null == a && (a = false);
        var b = new FacePolygon(a ? this.clonePointArray() : this.pointArray.slice());
        return b.set_winding(this.winding), b;
    }
    clearDoubles(a) {
        null == a && (a = 1e-6), this.bSortPoints || this.sortPoints();
        for (var b = 0; b < this.pointArray.length;) {
            var c;
            if (0 == b) {
                var d = this.pointArray;
                c = d[d.length - 1];
            } else c = this.pointArray[b - 1];
            Point.distance(this.pointArray[b], c) < a &&
                (this.pointArray.splice(b, 1), (this.bTriIndicesOK = false), this.numOfPoints--, --b),
                ++b;
        }
    }
    calcTriIndices() {
        super.validateNow();
        if (!this.bTriIndicesOK) {
            // this.bSortPoints || this.sortPoints();
            this.bSortPoints = false; this.sortPoints();
            null == this.triIndices && (this.triIndices = new Array(0));
            var a = this.get_numOfPoints() - 2,
                c = 3 * a;
            0 > c && (c = 0);
            ArrayTool.clear(this.triIndices, c);
            var g = 0;
            for (var h = 0; a > h; h++) {
                var i = 3 * h;
                this.triIndices[i] = 0;
                this.triIndices[i + 1] = g + 1;
                ++g;
                this.triIndices[i + 2] = g + 1;
            }
            this.bTriIndicesOK = true;
        }
    }
    negativeCompare(a, b) {
        var angleA = Math.atan2(
            a.y - super.get_centroid().y,
            a.x - super.get_centroid().x
        ),
            angleB = Math.atan2(b.y - super.get_centroid().y, b.x - super.get_centroid().x);
        return angleA > angleB ? -1 : angleB > angleA ? 1 : 0;
    }
    positiveCompare(a, b) {
        var angleA = Math.atan2(
            a.y - super.get_centroid().y,
            a.x - super.get_centroid().x
        ),
            angleB = Math.atan2(b.y - super.get_centroid().y, b.x - super.get_centroid().x);
        return angleB > angleA ? -1 : angleA > angleB ? 1 : 0;
    }
}
class Face4 extends FacePolygon {
    static __super__ = FacePolygon;
    __class__ = Face4;
    static __name__ = ["Face4"];
    constructor(a, b, c, d, _winding) {
        // undefined == a && (a = new PointEx),
        //     undefined == b && (b = new PointEx),
        //     undefined == c && (c = new PointEx),
        //     undefined == d && (d = new PointEx),
        super(null, _winding);
        this.initialize(a, b, c, d);
    }
    static fromRect(a, b) {
        null == b && (b = 1);
        var topLeft = new PointEx(a.get_left(), a.get_top()),
            leftBottom = new PointEx(a.get_left(), a.get_bottom()),
            rightBottom = new PointEx(a.get_right(), a.get_bottom()),
            rightTop = new PointEx(a.get_right(), a.get_top()),
            Face4 = null;
        return (Face4 =
            1 == b ? new Face4(topLeft, leftBottom, rightBottom, rightTop, 1) : new Face4(rightTop, rightBottom, leftBottom, topLeft, -1));
    }
    get_a() {
        return this.pointArray[0];
    }
    set_a(a) {
        return this.pointArray[0] == a ? a : ((this.pointArray[0] = a), this.invalidate(), a);
    }
    get_b() {
        return this.pointArray[1];
    }
    set_b(a) {
        return this.pointArray[1] == a ? a : ((this.pointArray[1] = a), this.invalidate(), a);
    }
    get_c() {
        return this.pointArray[2];
    }
    set_c(a) {
        return this.pointArray[2] == a ? a : ((this.pointArray[2] = a), this.invalidate(), a);
    }
    get_d() {
        return this.pointArray[3];
    }
    set_d(a) {
        return this.pointArray[3] == a ? a : ((this.pointArray[3] = a), this.invalidate(), a);
    }
    initialize(a, b, c, d) {
        if (a == null || b == null || c == null || d == null) return;
        var ptArray = (null != this.pointArray) ? this.pointArray : new Array(0);
        (ptArray[0] = a), (ptArray[1] = b), (ptArray[2] = c), (ptArray[3] = d);
        this.setTo(ptArray);
    }
    clone(bCast) {
        null == bCast && (bCast = false);
        var b;
        b = bCast ? new Face4(
            ObjMan.__cast(this.get_a().clone(), PointEx),
            ObjMan.__cast(this.get_b().clone(), PointEx),
            ObjMan.__cast(this.get_c().clone(), PointEx),
            ObjMan.__cast(this.get_d().clone(), PointEx)) :
            new Face4(
                this.get_a(),
                this.get_b(),
                this.get_c(),
                this.get_d());
        b.set_winding(this.get_winding());
        return b;
    }
}
class Face3 extends FacePolygon {
    static __super__ = FacePolygon;
    __class__ = Face3;
    static __name__ = ["Face3"];
    constructor(a, b, c, d) {
        super(null, d);
        null == d && (d = 1),
            this.initialize(a, b, c);
    }

    get_a() {
        return this.pointArray[0];
    }
    set_a(a) {
        return this.pointArray[0] == a ? a : ((this.pointArray[0] = a), this.invalidate(), a);
    }
    get_b() {
        return this.pointArray[1];
    }
    set_b(a) {
        return this.pointArray[1] == a ? a : ((this.pointArray[1] = a), this.invalidate(), a);
    }
    get_c() {
        return this.pointArray[2];
    }
    set_c(a) {
        return this.pointArray[2] == a ? a : ((this.pointArray[2] = a), this.invalidate(), a);
    }
    initialize(a, b, c) {
        if (a == null || b == null || c == null) return;
        var d = this.pointArray;
        null == d && (d = new Array(0));
        d[0] = a;
        d[1] = b;
        d[2] = c;
        this.setTo(d);
    }
    clone(a) {
        null == a && (a = false);
        var b;
        return (
            (b = a
                ? new Face3(
                    ObjMan.__cast(this.get_a().clone(), PointEx),
                    ObjMan.__cast(this.get_b().clone(), PointEx),
                    ObjMan.__cast(this.get_c().clone(), PointEx)
                )
                : new Face3(this.get_a(), this.get_b(), this.get_c())),
            b.set_winding(this.get_winding()),
            b
        );
    }
}
class MyFace4Polygon extends Face4 {
    static __super__ = Face4;
    __class__ = MyFace4Polygon;
    static __name__ = ["MyFace4Polygon"];
    gapLeft = null;
    gapRight = null;
    element = null;
    constructor(element) {
        super(new PointEx(), new PointEx(), new PointEx(), new PointEx());
        this.element = element;
        this.gapLeft = this.element.gapLeft;
        this.gapRight = this.element.gapRight;
        this.regulate();
    }

    get_element() {
        return this.element;
    }
    regulate() {
        this.get_a().setTo(this.element.get_left(), this.element.get_top()),
            this.get_b().setTo(this.element.get_left(), this.element.get_bottom()),
            this.get_c().setTo(this.element.get_right(), this.element.get_bottom()),
            this.get_d().setTo(this.element.get_right(), this.element.get_top());
        var baseTransformation = this.element.get_baseTransformation().clone();
        baseTransformation.concat(this.element.get_transformation()),
            this.transform(baseTransformation),
            super.regulate();
    }
}
class GeoPlane {
    constructor(a, b) {
        null == b && (b = 0);
        this.normal = a;
        this.distance = b;
    }
    static construct(a, b, c) {
        var d = b.subtract(a).vectorProduct(c.subtract(a));
        d.normalize();
        return new GeoPlane(d, d.scalarProduct(a));
    }
    static create(a, b) {
        return new GeoPlane(a, b.scalarProduct(a));
    }
    normal = null;
    distance = null;
    isEqual(a, tolerance) {
        null == tolerance && (tolerance = 1e-6);
        return (
            GeoNumComparor.Equal(this.distance, a.distance, tolerance) &&
                GeoNumComparor.Equal(this.normal.x, a.normal.x, tolerance) &&
                GeoNumComparor.Equal(this.normal.y, a.normal.y, tolerance) &&
                GeoNumComparor.Equal(this.normal.z, a.normal.z, tolerance)
                ? true
                : false
        );
    }
    clone() {
        return new GeoPlane(this.normal.clone(), this.distance);
    }
    reverse() {
        this.normal.negate();
        this.distance = -this.distance;
    }
    calcFaceIntersections(face, aboveFacesArray, belowFacesArray, frontFacesArray, backFacesArray) {
        var f,
            g,
            h,
            geoPointArray = face.geoPointArray,
            flag = 0,
            flagBuffer = new Array(0),
            l = geoPointArray.length;
        for (h = 0; l > h; h++) {
            g = this.normal.scalarProduct(geoPointArray[h].get_pos()) - this.distance;
            f = g < -GeoPlane.EPSILON ? GeoPlane.BACK : g > GeoPlane.EPSILON ? GeoPlane.FRONT : GeoPlane.COPLANAR;
            flag |= f;
            flagBuffer[flagBuffer.length] = f;
        }
        if (GeoPlane.COPLANAR == flag)
            this.normal.scalarProduct(face.geoPlane.normal) > 0 ? (aboveFacesArray[aboveFacesArray.length] = face) : (belowFacesArray[belowFacesArray.length] = face);
        else if (GeoPlane.FRONT == flag) frontFacesArray[frontFacesArray.length] = face;
        else if (GeoPlane.BACK == flag) backFacesArray[backFacesArray.length] = face;
        else if (GeoPlane.SPANNING == flag) {
            var m = new Array(0),
                n = new Array(0);
            for (l = geoPointArray.length, h = 0; l > h;) {
                var o = (h + 1) % l,
                    p = flagBuffer[h],
                    q = flagBuffer[o],
                    r = geoPointArray[h],
                    s = geoPointArray[o];
                if (
                    (GeoPlane.BACK != p && (m[m.length] = r),
                        GeoPlane.FRONT != p && (n[n.length] = 2 != p ? r.clone() : r),
                        GeoPlane.SPANNING == (p | q))
                ) {
                    g =
                        (this.distance - this.normal.scalarProduct(r.get_pos())) /
                        this.normal.scalarProduct(s.get_pos().subtract(r.get_pos()));
                    var t = r.fO(s, g);
                    (m[m.length] = t), (n[n.length] = t.clone());
                }
                ++h;
            }
            m.length >= 3 && (frontFacesArray[frontFacesArray.length] = new GeoFace(m, face.fM));
            n.length >= 3 && (backFacesArray[backFacesArray.length] = new GeoFace(n, face.fM));
        }
    }
}
GeoPlane.SPANNING = 3;
GeoPlane.FRONT = 1;
GeoPlane.BACK = 2;
GeoPlane.COPLANAR = 0;
GeoPlane.EPSILON = 1e-5;
class GeoFace {
    constructor(geoPointArray, b) {
        (this.geoPointArray = geoPointArray);
        (this.fM = b);
        this.geoPlane = GeoPlane.construct(geoPointArray[0].get_pos(), geoPointArray[1].get_pos(), geoPointArray[2].get_pos());
    }

    geoPlane = null;
    fM = null;
    geoPointArray = null;
    clone() {
        return new GeoFace(this.geoPointArray.slice(), this.fM);
    }
    reverse() {
        this.geoPointArray.reverse();
        for (var a = 0, b = this.geoPointArray; a < b.length; a++) {
            var c = b[a];
            c.reverse();
        }
        this.geoPlane.reverse();
    }
}
class GeoPoint {
    constructor(pos, normal, u, v, secondaryU, secondaryV) {
        this.set_pos(null == pos ? new Vector3D() : pos);
        this.set_normal(null == normal ? new Vector3D() : pos);
        this.set_u(u);
        this.set_v(v);
        this.set_secondaryU(secondaryU);
        this.set_secondaryV(secondaryV);
    }

    normal = null;
    get_normal() {
        return this.normal;
    }
    set_normal(a) {
        return (this.normal = a), this.normal;
    }
    U = null;
    get_u() {
        return this.U;
    }
    set_u(a) {
        return (this.U = a), this.U;
    }
    position = null;
    get_pos() {
        return this.position;
    }
    set_pos(a) {
        return (this.position = a), this.position;
    }
    V = null;
    get_v() {
        return this.V;
    }
    set_v(a) {
        return (this.V = a), this.V;
    }
    secondaryU = null;
    get_secondaryU() {
        return this.secondaryU;
    }
    set_secondaryU(a) {
        return (this.secondaryU = a), this.secondaryU;
    }
    secondaryV = null;
    get_secondaryV() {
        return this.secondaryV;
    }
    set_secondaryV(a) {
        return (this.secondaryV = a), this.secondaryV;
    }
    clone() {
        return new GeoPoint(
            this.get_pos().clone(),
            this.get_normal().clone(),
            this.get_u(),
            this.get_v(),
            this.get_secondaryU(),
            this.get_secondaryV()
        );
    }
    reverse() {
        this.get_normal().negate();
    }
    interpolate(geoPoint, ratio) {
        var newSecondU;
        if (!isNaN(this.get_secondaryU()) && !isNaN(geoPoint.get_secondaryU())) {
            var d = this.get_secondaryU();
            newSecondU = (geoPoint.get_secondaryU() - d) * ratio + d;
        }
        else newSecondU = NaN;
        var newSecondV;
        if (!isNaN(this.get_secondaryV()) && !isNaN(geoPoint.get_secondaryV())) {
            var f = this.get_secondaryV();
            newSecondV = (geoPoint.get_secondaryV() - f) * ratio + f;
        }
        else newSecondV = NaN;
        var myPos = this.get_pos(),
            pos = geoPoint.get_pos(),
            newPos = new Vector3D(
                (pos.x - myPos.x) * ratio + myPos.x,
                (pos.y - myPos.y) * ratio + myPos.y,
                (pos.z - myPos.z) * ratio + myPos.z
            ),
            myNormal = this.get_normal(),
            normal = geoPoint.get_normal(),
            newNormal = new Vector3D(
                (normal.x - myNormal.x) * ratio + myNormal.x,
                (normal.y - myNormal.y) * ratio + myNormal.y,
                (normal.z - myNormal.z) * ratio + myNormal.z
            ),
            myU = this.get_u(),
            newU = (geoPoint.get_u() - myU) * ratio + myU,
            myV = this.get_v();
        return new GeoPoint(newPos, newNormal, newU, (geoPoint.get_v() - myV) * ratio + myV, newSecondU, newSecondV);
    }
    lerpVector3D(a, b, c) {
        return new Vector3D(
            (b.x - a.x) * c + a.x,
            (b.y - a.y) * c + a.y,
            (b.z - a.z) * c + a.z
        );
    }
    lerp(a, b, c) {
        return (b - a) * c + a;
    }
}
class MatrixHelper {
    static __name__ = ["MatrixHelper"];
    static matrix2DTo3D(a, b) {
        var c = null;
        if (b == CoordinateSystemPlane.XY)
            c = [a.a, a.b, 0, 0, a.c, a.d, 0, 0, 0, 0, 1, 0, a.tx, a.ty, 0, 1];
        else if (b == CoordinateSystemPlane.XZ)
            c = [a.a, 0, a.c, 0, 0, 1, 0, 0, a.b, 0, a.d, 0, a.tx, 0, -a.ty, 1];
        else {
            if (b != CoordinateSystemPlane.YZ)
                throw new Error("invalid plane: " + Std.string(b));
            c = [1, 0, 0, 0, 0, a.a, a.b, 0, 0, a.c, a.d, 0, 0, a.tx, a.ty, 1];
        }
        return new Matrix3D(c);
    }
}
class RectLayoutElement extends Rectangle {
    static __name__ = ["Rectangle"];
    gapLeft = null;
    gapRight = null;
    baseTransformation = null;
    transformation = null;
    constructor(a, b, c, d) {
        super(a, b, c, d);
        (this.baseTransformation = new Matrix()),
            (this.transformation = new Matrix()),
            (this.gapLeft = 0),
            (this.gapRight = 0);
    }

    get_baseTransformation() {
        return this.baseTransformation;
    }
    get_transformation() {
        return this.transformation;
    }
}
class TypedSimpleGeometryData {
    constructor() {

    }
    testFlag = 0;
    cloneFloat32Array(floatArray) {
        var b = new Float32Array(floatArray.length);
        b.set(floatArray);
        return b;
    }
    cloneUint16Array(shortArray) {
        var b = new Uint16Array(shortArray.length);
        b.set(shortArray);
        return b;
    }
    clone() {
        var a = new TypedSimpleGeometryData();
        if (null != this.vertexPositionData)
            a.vertexPositionData = TypedSimpleGeometryData.cloneFloat32Array(this.vertexPositionData);
        if (null != this.vertexNormalData)
            a.vertexNormalData = TypedSimpleGeometryData.cloneFloat32Array(this.vertexNormalData);
        if (null != this.uvData)
            a.uvData = TypedSimpleGeometryData.cloneFloat32Array(this.uvData);
        if (null != this.secondaryUvData)
            a.secondaryUvData = TypedSimpleGeometryData.cloneFloat32Array(this.secondaryUvData);
        if (null != this.indices)
            a.indices = TypedSimpleGeometryData.cloneUint16Array(this.indices);
        if (null != this.vertexTopologyData)
            a.vertexTopologyData = TypedSimpleGeometryData.cloneFloat32Array(this.vertexTopologyData);
        if (null != this.vertexTangentData)
            a.vertexTangentData = TypedSimpleGeometryData.cloneFloat32Array(this.vertexTangentData);
        a.testFlag = this.testFlag;
        return a;
    }
}
class CompactGeometry extends THREE.BufferGeometry {
    constructor(geoData) {
        super();
        this.currentScaleU = 1, this.currentScaleV = 1, this._geometryData = geoData;
        var secondUV, e = new THREE.BufferAttribute(geoData.indices, 1),
            position = new THREE.BufferAttribute(geoData.vertexPositionData, 3),
            normal = new THREE.BufferAttribute(geoData.vertexNormalData, 3),
            uvData = new THREE.BufferAttribute(geoData.uvData, 2);
        secondUV = geoData.secondaryUvData ? new THREE.BufferAttribute(geoData.secondaryUvData, 2) : new THREE.BufferAttribute(geoData.uvData, 2),
            this.setIndex(e),
            this.addAttribute("position", position),
            this.addAttribute("normal", normal),
            this.addAttribute("uv", uvData);
        this.addAttribute("uv2", secondUV);
    }
    get positions() { return this._geometryData.vertexPositionData }
    get geometryData() { return this._geometryData }
    get scaleU() { return this.currentScaleU }
    get scaleV() { return this.currentScaleV }
    scaleUV(a, b) {
        if (a != this.currentScaleU || b != this.currentScaleV) {
            for (var c = a / this.currentScaleU, d = b / this.currentScaleV, e = this._geometryData.uvData.length, f = 0; e > f; f += 2)
                this._geometryData.uvData[f] *= c,
                    this._geometryData.uvData[f + 1] *= d;
            this.updateUVData(this._geometryData.uvData),
                this.currentScaleU = a,
                this.currentScaleV = b
        }
    }
    updateUVData(a) {
        var b = this.getAttribute("uv");
        b.set(a), b.needsUpdate = true
    }
    updatePositionData(a) {
        var b = this.getAttribute("position");
        b.set(a),
            b.needsUpdate = true
    }
}
class SimpleMeshData extends MetaDataMap {
    static __super__ = MetaDataMap;
    __class__ = SimpleMeshData;
    static __name__ = ["SimpleMeshData"];
    geometryData = null;
    transformation = null;

    constructor() {
        super();
    }

    static sortByNumberOfVertices(a, b) {
        return a.geometryData.indices.length > b.geometryData.indices.length
            ? 1
            : a.geometryData.indices.length < b.geometryData.indices.length
                ? -1
                : 0;
    }
}
class TypedSimpleMeshData extends MetaDataMap {
    static __name__ = ["TypedSimpleMeshData"];
    constructor() {
        super();
    }
}

class GeoBoundRect extends GeoBase {
    static __super__ = GeoBase;
    __class__ = GeoBoundRect;
    static __name__ = ["GeoBoundRect"];
    midX = null;
    midY = null;
    minX = null;
    maxX = null;
    minY = null;
    maxY = null;
    constructor() {
        super();
    }

    get_midX() {
        return super.validateNow(), this.midX;
    }

    get_midY() {
        return super.validateNow(), this.midY;
    }

    get_minX() {
        return super.validateNow(), this.minX;
    }

    get_maxX() {
        return super.validateNow(), this.maxX;
    }

    get_minY() {
        return super.validateNow(), this.minY;
    }

    get_maxY() {
        return super.validateNow(), this.maxY;
    }
    calcBoundingRect(rect, margin) {
        null == margin && (margin = 0);
        var _rect = null != rect ? rect : new Rectangle(),
            width = this.get_maxX() - this.get_minX() + margin,
            height = this.get_maxY() - this.get_minY() + margin;
        return _rect.setTo(this.get_minX(), this.get_minY(), width, height), _rect;
    }
    regulate() {
        var xOffset = (this.maxX - this.minX) / 2 + this.minX - this.midX,
            yOffset = (this.maxY - this.minY) / 2 + this.minY - this.midY;
        (this.minX += xOffset),
            (this.maxX += xOffset),
            (this.minY += yOffset),
            (this.maxY += yOffset),
            (this.midX = (this.maxX - this.minX) / 2 + this.minX),
            (this.midY = (this.maxY - this.minY) / 2 + this.minY);
    }
}
class GeoShape extends GeoBoundRect {
    static __super__ = GeoBoundRect;
    __class__ = GeoShape;
    static __name__ = ["GeoShape"];
    metaMap = null;
    mainResolution = null;
    invertedNormals = null;
    geometryLength = null;
    endU = null;
    resolution = null;
    startU = null;
    constructor() {
        super();
        this.startU = 0;
        this.endU = 1;
        this.mainResolution = 0;
        this.metaMap = new MyMap();
    }

    get_invertedNormals() {
        return this.invertedNormals;
    }
    set_invertedNormals(a) {
        return this.invertedNormals == a ? this.invertedNormals : ((this.invertedNormals = a), this.invertedNormals);
    }

    get_geometryLength() {
        return super.validateNow(), this.geometryLength;
    }

    get_endU() {
        return this.endU;
    }
    set_endU(a) {
        return this.endU == a ? this.endU : ((this.endU = a), this.endU);
    }

    get_resolution() {
        return this.resolution;
    }
    set_resolution(a) {
        return this.resolution == a
            ? this.resolution
            : ((this.resolution = a > this.mainResolution ? a : this.mainResolution), this.resolution);
    }

    get_startU() {
        return this.startU;
    }
    set_startU(a) {
        return this.startU == a ? this.startU : ((this.startU = a), this.startU);
    }
    hasMetadata(a) {
        return null != globalMap[a] ? this.metaMap.existsReserved(a) : this.metaMap.map.hasOwnProperty(a);
    }
    getMetadata(a) {
        return null != globalMap[a] ? this.metaMap.getReserved(a) : this.metaMap.map[a];
    }
    removeMetaData(a) {
        this.metaMap.remove(a);
    }
    addMetaData(a, b) {
        null != globalMap[a] ? this.metaMap.setReserved(a, b) : (this.metaMap.map[a] = b);
    }
    copyMetaDatasTo(a, b) {
        null == b && (b = true);
        for (var c = this.metaMap.keys(); c.hasNext();) {
            var d = c.next(),
                myMap = this.metaMap;
            if (
                null != (null != globalMap[d] ? myMap.getReserved(d) : myMap.map[d]) &&
                (b || !a.hasMetadata(d))
            ) {
                var myMap = this.metaMap;
                a.addMetaData(d, null != globalMap[d] ? myMap.getReserved(d) : myMap.map[d]);
            }
        }
    }
    hasCommonMeta(a) {
        for (var b = this.metaMap.keys(); b.hasNext();) {
            var c = b.next(),
                d = this.metaMap;
            if (!(null != globalMap[c] ? d.getReserved(c) : d.h[c]) == a.getMetadata(c))
                return false;
        }
        return true;
    }
    metaEquals(a) {
        return this.hasCommonMeta(a) ? a.hasCommonMeta(this) : false;
    }
    toString() {
        for (var a = "", keys = this.metaMap.keys(); keys.hasNext();) {
            var key = keys.next(),
                d = this.metaMap;
            0 != a.length && (a += " ; "),
                (a +=
                    "(" +
                    key +
                    " : " +
                    Std.string(null != globalMap[key] ? d.getReserved(key) : d.h[key]) +
                    ")");
        }
        return a;
    }
    createMetaMap() {
        this.metaMap = new MyMap();
    }
    getPointAtPos(where, normalPos) {
        throw new Error("This is an abstract method, you must override this!");
    }
    getPointExAtPos(a, b) {
        throw new Error("This is an abstract method, you must override this!");
    }
    getDirectionAtPos(a, b) {
        throw new Error("This is an abstract method, you must override this!");
    }
    calcPosOnXShape(X0, bCheck) {
        throw (
            (null == bCheck && (bCheck = true),
                new Error("This is an abstract method, you must override this!"))
        );
    }
    calcPosOnYShape(Y0, bCheck) {
        throw (
            (null == bCheck && (bCheck = true),
                new Error("This is an abstract method, you must override this!"))
        );
    }
    calcPosOnShape(a, bCheck) {
        throw (
            (null == bCheck && (bCheck = true),
                new Error("This is an abstract method, you must override this!"))
        );
    }
    isOnShape(a) {
        throw new Error("This is an abstract method, you must override this!");
    }
    shift(a, b) {
        throw new Error("This is an abstract method, you must override this!");
    }
    clone(a) {
        throw new Error("This is an abstract method, you must override this!");
    }
    getVectorAtPos(a) {
        this.getPointAtPos(a, GeoShape.TmpPoint);
        var x = GeoShape.TmpPoint.x,
            y = GeoShape.TmpPoint.y;
        this.getDirectionAtPos(a, GeoShape.TmpPoint);
        return new Vect2(x, y, GeoShape.TmpPoint.x, GeoShape.TmpPoint.y);
    }
    p8() {
        return this.getVectorAtPos(0);
    }
    p9() {
        return this.getVectorAtPos(1);
    }
    getPointAtBegin(a) {
        return this.getPointAtPos(0, a);
    }
    getPointAtEnd(a) {
        return this.getPointAtPos(1, a);
    }
    getPointArray(resolution, start, end) {
        null == end && (end = 1);
        null == start && (start = 0);
        var normalArray = new Array(0);
        var delta = (end - start) / resolution;
        for (var id = 0; resolution >= id;) {
            this.getPointAtPos(start + delta * id, GeoShape.TmpPoint);
            (normalArray[2 * id] = GeoShape.TmpPoint.x);
            (normalArray[2 * id + 1] = GeoShape.TmpPoint.y);
            ++id;
        }
        return normalArray;
    }
    getPoints(num, start, end) {
        null == end && (end = 1);
        null == start && (start = 0);
        for (var d = new Array(0), e = (end - start) / num, f = 0; num >= f;)
            (d[f] = this.getPointAtPos(start + e * f)), ++f;
        return d;
    }
    getPointExs(num, start, end) {
        null == end && (end = 1),
            null == start && (start = 0);
        for (var d = new Array(0), e = (end - start) / num, f = 0; num >= f;)
            (d[f] = this.getPointExAtPos(start + e * f)), ++f;
        return d;
    }
    getDirectionArray(resolution, start, end) {
        null == end && (end = 1);
        null == start && (start = 0);
        for (var d = new Array(0), delta = (end - start) / resolution, f = 0; resolution >= f;)
            this.getDirectionAtPos(start + delta * f, GeoShape.TmpPoint),
                (d[2 * f] = GeoShape.TmpPoint.x),
                (d[2 * f + 1] = GeoShape.TmpPoint.y),
                ++f;
        return d;
    }
    qg(a, b, c) {
        null == c && (c = 1), null == b && (b = 0);
        for (var d = new Array(0), e = (c - b) / a, f = 0; a >= f;)
            (d[f] = this.getDirectionAtPos(b + e * f)), ++f;
        return d;
    }
    calcUArray(resolution, start, end) {
        null == end && (end = 1);
        null == start && (start = 0);
        var d = new Array(0),
            e = (this.get_endU() - this.get_startU()) * ((end - start) / resolution),
            f = this.get_startU();
        for (var k = 0; resolution >= k;) {
            d[k] = f;
            f += e;
            ++k;
        }
        return d;
    }
    qr(a) {
        var b = this.getPointAtBegin(GeoShape.TmpPoint),
            c = b.x,
            d = b.y,
            e = a.getPointAtEnd(GeoShape.TmpPoint),
            f = e.x,
            g = e.y;
        return 1e-6 >= (c > f ? c - f : f - c) && 1e-6 >= (d > g ? d - g : g - d)
            ? true
            : ((b = a.getPointAtBegin(GeoShape.TmpPoint)),
                (c = b.x),
                (d = b.y),
                (e = this.getPointAtEnd(GeoShape.TmpPoint)),
                (f = e.x),
                (g = e.y),
                1e-6 >= (c > f ? c - f : f - c) && 1e-6 >= (d > g ? d - g : g - d)
                    ? true
                    : false);
    }
    calcBound() {
        throw new Error("This is an abstract method, you must override this!");
    }
}
GeoShape.TmpPoint = new Point;
class ArcBase extends GeoShape {
    static __super__ = GeoShape;
    __class__ = ArcBase;
    static __name__ = ["Ob"];
    constructor() {
        super();
        this.set_resolution(10);
    }

    centerY = null;
    get_centerY() {
        return super.validateNow(), this.centerY;
    }
    set_centerY(a) {
        return this.centerY == a ? this.centerY : (this.invalidate(), (this.centerY = a), this.centerY);
    }
    centerX = null;
    get_centerX() {
        return super.validateNow(), this.centerX;
    }
    set_centerX(a) {
        return this.centerX == a ? this.centerX : (this.invalidate(), (this.centerX = a), this.centerX);
    }
    radius = null;
    get_radius() {
        return super.validateNow(), this.radius;
    }
    set_radius(a) {
        return this.radius == a ? this.radius : (this.invalidate(), (this.radius = a), this.radius);
    }
    initFromTriangle(startPt, midPt, endPt) {
        var x0, y0,
            dx1 = midPt.x - startPt.x,
            dy1 = midPt.y - startPt.y,
            dx2 = endPt.x - midPt.x,
            dy2 = endPt.y - midPt.y,
            tan1 = dy1 / dx1,
            tan2 = dy2 / dx2,
            midX1 = (startPt.x + midPt.x) / 2,
            midY1 = (startPt.y + midPt.y) / 2,
            midX2 = (midPt.x + endPt.x) / 2,
            mindY2 = (midPt.y + endPt.y) / 2;

        if (0 == dy1) {
            x0 = midX1;
            y0 = 0 == dx2 ? mindY2 : mindY2 + (midX2 - midX1) / tan2;
        }
        else if (0 == dy2) {
            x0 = midX2;
            y0 = 0 == dx1 ? midY1 : midY1 + (midX1 - midX2) / tan1;
        }
        else if (0 == dx1) {
            y0 = midY1;
            x0 = tan2 * (mindY2 - midY1) + midX2;
        }
        else if (0 == dx2) {
            y0 = mindY2;
            x0 = tan1 * (midY1 - mindY2) + midX1;
        }
        else {
            x0 = (tan1 * tan2 * (midY1 - mindY2) - tan1 * midX2 + tan2 * midX1) / (tan2 - tan1);
            y0 = midY1 - (x0 - midX1) / tan1;
        }
        this.radius = Math.sqrt((x0 - startPt.x) * (x0 - startPt.x) + (y0 - startPt.y) * (y0 - startPt.y));
        this.centerX = x0;
        this.centerY = y0;
        this.invalidate();
    }
    getPointAtPos(where, outNormal) {
        super.validateNow();
        var c,
            d = where * MathConsts.TAU,
            x = Math.sin(d) * this.radius + this.centerX,
            y = Math.cos(d) * this.radius + this.centerY;
        return (
            null == outNormal
                ? ((c = new Point),
                    c.setTo(x, y))
                : (outNormal.setTo(x, y), (c = outNormal)),
            c
        );
    }
    getPointExAtPos(a, b) {
        super.validateNow();
        var c,
            d = a * MathConsts.TAU,
            x = Math.sin(d) * this.radius + this.centerX,
            y = Math.cos(d) * this.radius + this.centerY;
        return (
            null == b
                ? ((c = new PointEx),
                    c.setTo(x, y))
                : (b.setTo(x, y), (c = b)),
            c
        );
    }
    getDirectionAtPos(a, out) {
        super.validateNow();
        var c,
            d = a * MathConsts.TAU,
            x = Math.sin(d),
            y = Math.cos(d);
        return (
            null == out
                ? ((c = new Point),
                    c.setTo(x, y))
                : (out.setTo(x, y), (c = out)),
            this.get_invertedNormals() && c.setTo(-c.x, -c.y),
            c
        );
    }
    calcPosOnXShape(X0, bCheck) {
        if (
            (null == bCheck && (bCheck = true),
                super.validateNow(),
                bCheck && (X0 > this.maxX || X0 < this.minX))
        )
            return null;
        var c,
            d = Math.asin((X0 - this.centerX) / this.radius) / MathConsts.TAU;
        if ((0 > d && (d = 1 + d), X0 == this.maxX || X0 == this.minX))
            (c = new Array(0)), (c[0] = d);
        else {
            (c = new Array(0)), (c[0] = d);
            var e = 0.5 - d;
            0 > e && (e = 1 + e), (c[1] = e);
        }
        return c;
    }
    calcPosOnYShape(Y0, bCheck) {
        if (
            (null == bCheck && (bCheck = true),
                super.validateNow(),
                bCheck && (Y0 > this.maxY || Y0 < this.minY))
        )
            return null;
        var c,
            d = Math.acos((Y0 - this.centerY) / this.radius) / MathConsts.TAU;
        return (
            0 > d && (d = 1 + d),
            Y0 == this.maxY || Y0 == this.minY
                ? ((c = new Array(0)), (c[0] = d))
                : ((c = new Array(0)), (c[0] = d), (c[1] = 1 - d)),
            c
        );
    }
    calcPosOnShape(a, bCheck) {
        null == bCheck && (bCheck = true);
        super.validateNow();
        if (bCheck && !this.isOnShape(a))
            return NaN;
        var c = Math.atan2(a.x - this.centerX, a.y - this.centerY) / MathConsts.TAU;
        return 0 > c && (c += 1), c;
    }
    isOnShape(a) {
        super.validateNow();
        var b = a.x - this.centerX,
            c = a.y - this.centerY,
            d = b * b + c * c,
            e = this.radius * this.radius;
        return 1e-6 >= (d > e ? d - e : e - d) ? true : false;
    }
    shift(dx, dy) {
        (this.midX += dx);
        (this.midY += dy);
        (this.minX += dx);
        (this.minY += dy);
        (this.maxX += dx);
        (this.maxY += dy);
        (this.centerX += dx);
        (this.centerY += dy);
        this.invalidate();
    }
    regulate() {
        if (0 == this.radius) throw new Error("Invalid radius: " + this.radius);
        (this.geometryLength = this.radius * MathConsts.TAU),
            (this.midX = this.centerX),
            (this.midY = this.centerY),
            this.calcBound();
    }
    calcBound() {
        (this.minX = this.centerX - this.radius),
            (this.maxX = this.centerX + this.radius),
            (this.minY = this.centerY - this.radius),
            (this.maxY = this.centerY + this.radius),
            this.invalidate();
    }
}
class Arc extends ArcBase {
    static __super__ = ArcBase;
    __class__ = Arc;
    static __name__ = ["Arc"];
    constructor(centerX, centerY, radius, startPos, endPos) {
        super();
        null == endPos && (endPos = 1),
            null == startPos && (startPos = 0),
            null == radius && (radius = 0),
            null == centerY && (centerY = 0),
            null == centerX && (centerX = 0),
            (this.startPoint = new Point()),
            (this.endPoint = new Point()),
            (this.mainResolution = 2),
            this.startPoint.setTo(0, 0),
            this.endPoint.setTo(0, 0),
            this.initParam(centerX, centerY, radius, startPos, endPos);
    }

    arcCycle = null;
    endPoint = null;
    get_endPoint() {
        return super.validateNow(), this.endPoint;
    }
    endPos = null;
    get_endParameter() {
        return super.validateNow(), this.endPos;
    }
    set_endParameter(a) {
        return this.endPos == a ? this.endPos : (this.invalidate(), (this.endPos = a), this.endPos);
    }
    winding = null;
    get_winding() {
        return this.winding;
    }
    set_winding(a) {
        return this.winding == a ? this.winding : ((this.winding = a), this.winding);
    }
    arcSide = null;
    get_arcSide() {
        return super.validateNow(), this.arcSide;
    }
    startPoint = null;
    get_startPoint() {
        return super.validateNow(), this.startPoint;
    }
    startPos = null;
    get_startParameter() {
        return super.validateNow(), this.startPos;
    }
    set_startParameter(a) {
        return this.startPos == a ? this.startPos : (this.invalidate(), (this.startPos = a), this.startPos);
    }
    initParam(centerX, centerY, radius, startPos, endPos, winding) {
        null == winding && (winding = 1),
            null == endPos && (endPos = 1),
            null == startPos && (startPos = 0),
            null == radius && (radius = 0),
            null == centerY && (centerY = 0),
            null == centerX && (centerX = 0),
            (this.radius = radius),
            (this.centerX = centerX),
            (this.centerY = centerY),
            (this.startPos = startPos),
            (this.endPos = endPos),
            (this.winding = winding),
            (this.mainResolution = 2),
            this.invalidate();
    }
    initFromTriangle(startPt, midPt, endPt) {
        super.initFromTriangle(startPt, midPt, endPt);
        var d = Math.atan2(startPt.x - this.centerX, startPt.y - this.centerY) / MathConsts.TAU;
        0 > d ? ++d : (d = d);
        var e = Math.atan2(midPt.x - this.centerX, midPt.y - this.centerY) / MathConsts.TAU;
        0 > e ? ++e : (e = e);
        var f = Math.atan2(endPt.x - this.centerX, endPt.y - this.centerY) / MathConsts.TAU;
        0 > f ? ++f : (f = f),
            this.set_winding(
                e > d && f > e ? this.set_winding(1) : this.set_winding(-1)
            ),
            (this.startPos = d),
            (this.endPos = f),
            (this.mainResolution = 2),
            this.invalidate();
    }
    makeArcBase(centerPt, startPt, endPt, winding) {
        this.radius = Point.distance(startPt, centerPt);
        this.centerX = centerPt.x;
        this.centerY = centerPt.y;
        var e = Math.atan2(startPt.x - this.centerX, startPt.y - this.centerY) / MathConsts.TAU;
        if (0 > e) e = 1 + e;
        var f = Math.atan2(endPt.x - this.centerX, endPt.y - this.centerY) / MathConsts.TAU;
        if (0 > f) f = 1 + f;
        this.startPos = e;
        this.endPos = f;
        this.winding = winding;
        this.mainResolution = 2;
        this.invalidate();
    }
    getCirclePos(where) {
        super.validateNow();
        var b = this.startPos + this.get_winding() * this.arcCycle * where;
        0 > b ? (b = 1 + b) : b > 1 && --b;
        return b;
    }
    getPointAtPos(where, outPoint) {
        super.validateNow();
        return super.getPointAtPos(this.getCirclePos(where), outPoint);
    }
    getPointExAtPos(a, b) {
        return super.validateNow(), super.getPointExAtPos(this.getCirclePos(a), b);
    }
    getDirectionAtPos(a, b) {
        return super.validateNow(), super.getDirectionAtPos(this.getCirclePos(a), b);
    }
    calcPosOnXShape(X0, bCheck) {
        return (
            null == bCheck && (bCheck = true),
            super.validateNow(),
            this.calcPosArrayOnArc(super.calcPosOnXShape(X0, bCheck), bCheck)
        );
    }
    calcPosOnYShape(Y0, bCheck) {
        return (
            null == bCheck && (bCheck = true),
            super.validateNow(),
            this.calcPosArrayOnArc(super.calcPosOnYShape(Y0, bCheck), bCheck)
        );
    }
    calcPosOnShape(a, bCheck) {
        null == bCheck && (bCheck = true),
            super.validateNow();
        return this.calcPosOnArc(super.calcPosOnShape(a, bCheck), bCheck);
    }
    isOnShape(a) {
        return super.isOnShape(a) &&
            this.isCirclePosOnArc(super.calcPosOnShape(a, false))
            ? true
            : false;
    }
    shift(dx, dy) {
        super.shift(dx, dy);
        this.startPoint = this.getPointAtPos(0, this.startPoint);
        this.endPoint = this.getPointAtPos(1, this.endPoint);
        this.invalidate();
    }
    clone(a) {
        super.validateNow();
        var b;
        return (
            null != a
                ? ((b = new Arc),
                    b.initParam(this.centerX, this.centerY, this.radius, this.startPos, this.endPos))
                : (b = new Arc(this.centerX, this.centerY, this.radius, this.startPos, this.endPos)),
            b.set_invertedNormals(this.get_invertedNormals()),
            b.set_winding(this.get_winding()),
            b.set_startU(this.get_startU()),
            b.set_endU(this.get_endU()),
            b.set_resolution(this.get_resolution()),
            this.copyMetaDatasTo(b),
            b
        );
    }
    regulate() {
        if (0 == this.radius) throw new Error("Invalid radius: " + this.radius);
        if (this.startPos == this.endPos)
            return;//throw new Error("Start and End parameters cannot be equal: " + this.startPos);
        1 == this.get_winding()
            ? (this.arcCycle =
                this.startPos < this.endPos ? this.endPos - this.startPos : 1 - this.startPos + this.endPos)
            : (this.arcCycle =
                this.startPos < this.endPos ? 1 - this.endPos + this.startPos : this.startPos - this.endPos),
            (this.geometryLength = this.radius * MathConsts.TAU * this.arcCycle);
        var a = this.startPos * MathConsts.TAU,
            b = Math.sin(a) * this.radius + this.centerX,
            c = Math.cos(a) * this.radius + this.centerY;
        this.startPoint.setTo(b, c),
            (a = this.endPos * MathConsts.TAU),
            (b = Math.sin(a) * this.radius + this.centerX),
            (c = Math.cos(a) * this.radius + this.centerY),
            this.endPoint.setTo(b, c),
            (a = ((this.endPos - this.startPos) / 2 + this.startPos) * MathConsts.TAU),
            (b = Math.sin(a) * this.radius + this.centerX),
            (c = Math.cos(a) * this.radius + this.centerY);
        var d = this.startPoint.x,
            e = this.startPoint.y,
            f = (this.endPoint.x - d) * (c - e) - (this.endPoint.y - e) * (b - d);
        (this.arcSide = (f > 0 ? f : 0 - f) <= 1e-6 ? 0 : f > 0 ? 1 : -1), this.calcBound();
    }
    calcBound() {
        super.calcBound();
        var a = 1 == this.get_winding() ? this.startPos : this.startPos - this.arcCycle,
            b = 1 == this.get_winding() ? this.startPos + this.arcCycle : this.startPos;
        (!((0 >= a && b >= 0) || (1 >= a && b >= 1)) || (-1 >= a && b >= -1)) &&
            (this.maxY = this.startPoint.y > this.endPoint.y ? this.startPoint.y : this.endPoint.y),
            (!((0.25 >= a && b >= 0.25) || (1.25 >= a && b >= 1.25)) ||
                (-0.75 >= a && b >= -0.75)) &&
            (this.maxX = this.startPoint.x > this.endPoint.x ? this.startPoint.x : this.endPoint.x),
            (!((0.5 >= a && b >= 0.5) || (1.5 >= a && b >= 1.5)) ||
                (-0.5 >= a && b >= -0.5)) &&
            (this.minY = this.startPoint.y < this.endPoint.y ? this.startPoint.y : this.endPoint.y),
            (!((0.75 >= a && b >= 0.75) || (1.75 >= a && b >= 1.75)) ||
                (-0.25 >= a && b >= -0.25)) &&
            (this.minX = this.startPoint.x < this.endPoint.x ? this.startPoint.x : this.endPoint.x),
            (this.midX = (this.maxX - this.minX) / 2 + this.minX),
            (this.midY = (this.maxY - this.minY) / 2 + this.minY);
    }
    calcPosArrayOnArc(posArray, onCheck) {
        if (null == posArray) return null;
        var array = new Array(0);
        for (var d = 0; d < posArray.length; d++) {
            var e = this.calcPosOnArc(posArray[d], onCheck);
            if (!isNaN(e)) array.push(e);
        }
        return 0 == array.length ? null : array;
    }
    calcPosOnArc(circlePos, onCheck) {
        super.validateNow();
        var arcPos;
        arcPos =
            1 == this.get_winding()
                ? circlePos >= this.startPos
                    ? circlePos - this.startPos
                    : 1 - this.startPos + circlePos
                : circlePos <= this.startPos
                    ? this.startPos - circlePos
                    : 1 - circlePos + this.startPos;
        var ratio = arcPos / this.arcCycle;
        return onCheck && (0 > ratio || ratio > 1) ? NaN : ratio;
    }
    isCirclePosOnArc(circlePos) {
        super.validateNow();
        var arcPos;
        arcPos =
            1 == this.get_winding()
                ? circlePos >= this.startPos
                    ? circlePos - this.startPos
                    : 1 - this.startPos + circlePos
                : circlePos <= this.startPos
                    ? this.startPos - circlePos
                    : 1 - circlePos + this.startPos;
        var c = arcPos / this.arcCycle;
        return c >= 0 ? 1 >= c : false;
    }
}
class Circle extends ArcBase {
    static __super__ = ArcBase;
    __class__ = Circle;
    static __name__ = ["Circle"];
    constructor(radius, centerX, centerY) {
        super();
        null == centerY && (centerY = 0),
            null == centerX && (centerX = 0),
            null == radius && (radius = 0),
            (this.mainResolution = 3),
            this.initParam(radius, centerX, centerY);
    }

    initParam(radius, centerX, centerY) {
        null == centerY && (centerY = 0),
            null == centerX && (centerX = 0),
            null == radius && (radius = 0),
            (this.radius = radius),
            (this.centerX = centerX),
            (this.centerY = centerY),
            (this.mainResolution = 3),
            this.invalidate();
    }
    clone(a) {
        super.validateNow();
        var b;
        return (
            null != a
                ? ((b = new Circle), b.initParam(this.radius, this.centerX, this.centerY))
                : (b = new Circle(this.radius, this.centerX, this.centerY)),
            b.set_invertedNormals(this.get_invertedNormals()),
            b.set_startU(this.get_startU()),
            b.set_endU(this.get_endU()),
            b.set_resolution(this.get_resolution()),
            this.copyMetaDatasTo(b),
            b
        );
    }
}
class Line extends GeoShape {
    static __super__ = GeoShape;
    __class__ = Line;
    static __name__ = ["Line"];
    constructor(startX, startY, endX, endY) {
        super();
        null == endY && (endY = 0),
            null == endX && (endX = 0),
            null == startY && (startY = 0),
            null == startX && (startX = 0),
            this.initParam(startX, startY, endX, endY),
            this.invalidate(),
            this.set_resolution(1),
            (this.mainResolution = 1),
            (this.dir = new Point());
    }

    dir = null;
    endY = null;
    get_endY() {
        return super.validateNow(), this.endY;
    }
    set_endY(a) {
        return this.endY == a ? this.endY : (this.invalidate(), (this.endY = a), this.endY);
    }
    endX = null;
    get_endX() {
        return super.validateNow(), this.endX;
    }
    set_endX(a) {
        return this.endX == a ? this.endX : (this.invalidate(), (this.endX = a), this.endX);
    }
    startY = null;
    get_startY() {
        return super.validateNow(), this.startY;
    }
    set_startY(a) {
        return this.startY == a ? this.startY : (this.invalidate(), (this.startY = a), this.startY);
    }
    startX = null;
    get_startX() {
        return super.validateNow(), this.startX;
    }
    set_startX(a) {
        return this.startX == a ? this.startX : (this.invalidate(), (this.startX = a), this.startX);
    }
    set_invertedNormals(a) {
        return this.invertedNormals == a
            ? this.invertedNormals
            : (this.invertedNormals = a,
                this.dir.setTo(-1 * this.dir.x, -1 * this.dir.y), this.invertedNormals);
    }
    initParam(startX, startY, endX, endY) {
        null == endY && (endY = 0),
            null == endX && (endX = 0),
            null == startY && (startY = 0),
            null == startX && (startX = 0),
            (this.startX = startX),
            (this.startY = startY),
            (this.endX = endX),
            (this.endY = endY),
            (this.mainResolution = 1),
            this.invalidate();
    }
    getPointAtPos(where, normalPos) {
        super.validateNow();
        var c,
            x0 = this.startX,
            x = (this.endX - x0) * where + x0,
            y0 = this.startY,
            y = (this.endY - y0) * where + y0;
        return (
            null != normalPos
                ? ((c = normalPos), normalPos.setTo(x, y))
                : ((c = new Point),
                    c.setTo(x, y)),
            c
        );
    }
    getPointExAtPos(where, b) {
        super.validateNow();
        var c,
            e = (this.endX - this.startX) * where + this.startX,
            g = (this.endY - this.startY) * where + this.startY;
        return (
            null != b
                ? ((c = b), b.setTo(e, g))
                : ((c = new PointEx),
                    c.setTo(e, g)),
            c
        );
    }
    getDirectionAtPos(a, out) {
        return (
            super.validateNow(),
            null != out
                ? (this.get_invertedNormals()
                    ? out.setTo(-this.dir.x, -this.dir.y)
                    : out.setTo(this.dir.x, this.dir.y),
                    out)
                : this.dir
        );
    }
    calcPosOnXShape(X0, bCheck) {
        null == bCheck && (bCheck = true);
        super.validateNow();
        if (bCheck && (this.minX > X0 || this.maxX < X0))
            return null;
        var c = new Array(0);
        if (this.startX == this.endX)
            return (c[0] = 0), (c[1] = 1), c;
        var dx = X0 - this.startX,
            dy = ((this.endY - this.startY) * dx) / (this.endX - this.startX);

        c[0] = Math.sqrt(dx * dx + dy * dy) / this.geometryLength;
        return c;
    }
    calcPosOnYShape(Y0, bCheck) {
        if (
            (null == bCheck && (bCheck = true),
                super.validateNow(),
                bCheck && (this.minY > Y0 || this.maxY < Y0))
        )
            return null;
        var c = new Array(0);
        if (this.startY == this.endY) return (c[0] = 0), (c[1] = 1), c;
        var d = Y0 - this.startY,
            e = ((this.endX - this.startX) * d) / (this.endY - this.startY);
        return (c[0] = Math.sqrt(e * e + d * d) / this.geometryLength), c;
    }
    calcPosOnShape(pt, bCheck) {
        if ((null == bCheck && (bCheck = true), super.validateNow(), bCheck && !this.isOnShape(pt)))
            return NaN;
        var dx = this.endX - this.startX,
            dy = this.endY - this.startY,
            len = Math.sqrt(dx * dx + dy * dy);
        return (
            (dx = pt.x - this.startX), (dy = pt.y - this.startY), Math.sqrt(dx * dx + dy * dy) / len
        );
    }
    isOnShape(pt) {
        super.validateNow();
        var startX = this.startX,
            startY = this.startY,
            endX = this.endX,
            endY = this.endY,
            x = pt.x,
            y = pt.y,
            h = false;
        if (
            (1e-6 >= (endX > startX ? endX - startX : startX - endX) && 1e-6 >= (endX > x ? endX - x : x - endX)) ||
            (1e-6 >= (endY > startY ? endY - startY : startY - endY) && 1e-6 >= (endY > y ? endY - y : y - endY))
        )
            h = true;
        else {
            var tangent = (endY - startY) / (endX - startX),
                j = y - (tangent * x + (startY - tangent * startX)),
                k = 0 > j ? -1 * j : j;
            h = 1e-6 >= (k > 0 ? k : 0 - k);
        }
        if (h) {
            var l,
                m = endX > startX ? startX : endX;
            if (1e-6 >= (x > m ? x - m : m - x) ? false : m > x) l = true;
            else {
                var n = startX > endX ? startX : endX;
                l = 1e-6 >= (x > n ? x - n : n - x) ? false : x > n;
            }
            if (l) return false;
            var o,
                p = endY > startY ? startY : endY;
            if (1e-6 >= (y > p ? y - p : p - y) ? false : p > y) o = true;
            else {
                var q = startY > endY ? startY : endY;
                o = 1e-6 >= (y > q ? y - q : q - y) ? false : y > q;
            }
            return o ? false : true;
        }
        return false;
    }
    shift(a, b) {
        (this.startX += a),
            (this.startY += b),
            (this.endX += a),
            (this.endY += b),
            (this.midX += a),
            (this.midY += b),
            (this.minX += a),
            (this.minY += b),
            (this.maxX += a),
            (this.maxY += b),
            this.invalidate();
    }
    clone(a) {
        super.validateNow();
        var b;
        return (
            null != a
                ? ((b = new Line), b.initParam(this.startX, this.startY, this.endX, this.endY))
                : (b = new Line(this.startX, this.startY, this.endX, this.endY)),
            b.set_invertedNormals(this.get_invertedNormals()),
            b.set_startU(this.get_startU()),
            b.set_endU(this.get_endU()),
            b.set_resolution(this.get_resolution()),
            this.copyMetaDatasTo(b),
            b
        );
    }
    regulate() {
        var a = this.endX - this.startX,
            b = this.endY - this.startY;
        (this.geometryLength = Math.sqrt(a * a + b * b)),
            this.calcBound(),
            this.get_invertedNormals()
                ? this.dir.setTo(this.endY - this.startY, this.startX - this.endX)
                : this.dir.setTo(this.startY - this.endY, this.endX - this.startX),
            this.dir.normalize(1);
    }
    calcBound() {
        (this.minX = this.startX < this.endX ? this.startX : this.endX),
            (this.maxX = this.startX > this.endX ? this.startX : this.endX),
            (this.minY = this.startY < this.endY ? this.startY : this.endY),
            (this.maxY = this.startY > this.endY ? this.startY : this.endY),
            (this.midX = (this.maxX - this.minX) / 2 + this.minX),
            (this.midY = (this.maxY - this.minY) / 2 + this.minY),
            this.invalidate();
    }
}
class ShapeCash {
    constructor(a) {
        this.shapeArray = new Array(0);
        this.shapeArray.push(a);
        this.start = new Point();
        a.getPointAtBegin(this.start);
        this.end = new Point();
        a.getPointAtEnd(this.end);
    }

    shapeArray = null;
    start = null;
    end = null;
    addShapeAtTail(a) {
        this.shapeArray.push(a);
        a.getPointAtEnd(this.end);
    }
    addShapeAtHead(a) {
        this.shapeArray.unshift(a);
        a.getPointAtBegin(this.start);
    }
    addShapesAtTail(a) {
        this.shapeArray = null == a.shapeArray ? this.shapeArray.slice() : this.shapeArray.concat(a.shapeArray);
        this.end.setTo(a.end.x, a.end.y);
    }
    addShapesAtHead(a) {
        this.shapeArray = null == this.shapeArray ? a.shapeArray.slice() : a.shapeArray.concat(this.shapeArray);
        this.start.setTo(a.start.x, a.start.y);
    }
}
class PointComparator {
    static EqualPoint(a, b, delta) {
        null == delta && (delta = 1e-5);
        var x1 = a.x,
            y1 = a.y,
            x2 = b.x,
            y2 = b.y,
            dx = x1 > x2 ? x1 - x2 : x2 - x1,
            dy = y1 > y2 ? y1 - y2 : y2 - y1;
        return dx > delta ? false : (dy > delta ? false : true);
    }
    static Equal(a, b, c, d, e) {
        null == e && (e = 1e-5);
        var f = a > c ? a - c : c - a;
        return f > e ? false : ((f = b > d ? b - d : d - b), f > e ? false : true);
    }
}
class ShapesWrapper extends GeoBoundRect {
    __class__ = ShapesWrapper;
    static __name__ = ["ShapesWrapper"];
    constructor(a) {
        super();
        (this.shapes = (null == a) ? new Array(0) : a),
            (this.numOfShapes = this.shapes.length),
            this.invalidate();
    }

    shapes = null;
    numOfPoints = null;
    get_numOfPoints() {
        return super.validateNow(), this.numOfPoints;
    }
    numOfShapes = null;
    get_numOfShapes() {
        return this.numOfShapes;
    }
    geometricLength = null;
    get_geometricLength() {
        return super.validateNow(), this.geometricLength;
    }
    get_midY() {
        return super.validateNow(), this.midY;
    }
    get_midX() {
        return super.validateNow(), this.midX;
    }
    get_minY() {
        return super.validateNow(), this.minY;
    }
    get_minX() {
        return super.validateNow(), this.minX;
    }
    get_maxY() {
        return super.validateNow(), this.maxY;
    }
    get_maxX() {
        return super.validateNow(), this.maxX;
    }
    setShapes(a) {
        (this.shapes = a), (this.numOfShapes = this.shapes.length), this.invalidate();
    }
    rn(a, b) {
        if (1 == a.length)
            this.shapes[b] = a[0];
        else {
            var c = this.shapes.slice(b + 1, 0xffffff),
                d = this.shapes,
                e = b;
            ArrayTool.clear(d, e);
            var i = this.shapes;
            this.shapes = null == a ? i.slice() : i.concat(a);
            var j = this.shapes;
            (this.shapes = null == c ? j.slice() : j.concat(c)),
                (this.numOfShapes = this.shapes.length);
        }
        this.invalidate();
    }
    getShapeIndex(a) {
        return this.shapes.indexOf(a, 0);
    }
    addShapes(a) {
        for (var size = a.get_numOfShapes(), id = 0; size > id;)
            this.addShape(a.getShapeAt(id)), ++id;
    }
    addShape(a) {
        this._addShape(a, this.numOfShapes);
    }
    _addShape(a, size) {
        (this.shapes[size] = a),
            (this.numOfShapes = size >= this.numOfShapes ? size + 1 : this.numOfShapes),
            this.invalidate();
    }
    insertShapesWrapper(a, index) {
        for (var size = a.get_numOfShapes(), id = 0; size > id;)
            this.insertShape(a.getShapeAt(id), index + id), ++id;
        this.invalidate();
    }
    insertShape(a, index) {
        this.shapes.splice(index, 0, a),
            this.numOfShapes++,
            this.invalidate();
    }
    getShapeAt(a) {
        return this.shapes[a];
    }
    getShapes() {
        return this.shapes;
    }
    removeShapes(id, count) {
        this.shapes.splice(id, count),
            (this.numOfShapes -= count),
            this.invalidate();
    }
    rz() {
        for (var a = 0; a < this.numOfShapes;) {
            for (var b = this.shapes[a], c = false, d = 0; d < this.numOfShapes;) {
                var e = this.shapes[d];
                if (b != e) {
                    if ((b.getPointAtBegin(ShapesWrapper.vAB), e.getPointAtEnd(ShapesWrapper.vAC), PointComparator.EqualPoint(ShapesWrapper.vAB, ShapesWrapper.vAC))) {
                        c = true;
                        break;
                    }
                    if ((b.getPointAtEnd(ShapesWrapper.vAB), e.getPointAtBegin(ShapesWrapper.vAC), PointComparator.EqualPoint(ShapesWrapper.vAB, ShapesWrapper.vAC))) {
                        c = true;
                        break;
                    }
                    ++d;
                } else ++d;
            }
            c || (this.shapes.splice(a, 1), --a, this.numOfShapes--, this.invalidate()), ++a;
        }
    }
    clone(a, bNew) {
        null == bNew && (bNew = false);
        super.validateNow();
        var shapeArray;
        if (bNew) {
            shapeArray = new Array(0);
            for (var k = 0; k < this.numOfShapes;) {
                shapeArray[k] = this.shapes[k].clone(a);
                ++k;
            }
        }
        else
            shapeArray = this.shapes.slice();
        var shapesWrapper;
        null == a ? (shapesWrapper = new ShapesWrapper(shapeArray)) : ((shapesWrapper = new ShapesWrapper), shapesWrapper.setShapes(shapeArray));
        return shapesWrapper;
    }
    rH() {
        var shapeCashArray = new Array(0);
        for (; this.shapes.length > 0;) {
            var b = new ShapeCash(this.shapes[0]);
            this.shapes.splice(0, 1);
            shapeCashArray.push(b);
            for (var c = 0; c < this.shapes.length; c++) {
                this.shapes[c].getPointAtBegin(ShapesWrapper.vAB);
                this.shapes[c].getPointAtEnd(ShapesWrapper.vAC);
                if (PointComparator.EqualPoint(ShapesWrapper.vAB, b.end, 0.01)) {
                    b.addShapeAtTail(this.shapes[c]);
                    this.shapes.splice(c, 1);
                    c = -1;
                }
                else {
                    if (!PointComparator.EqualPoint(ShapesWrapper.vAC, b.start, 0.01)) break;
                    b.addShapeAtHead(this.shapes[c]);
                    this.shapes.splice(c, 1);
                    c = -1;
                }
            }
        }
        var d = shapeCashArray[0];
        shapeCashArray.splice(0, 1);
        for (var e = true; e;) {
            e = false;
            for (var f = 0; f < shapeCashArray.length; f++) {
                var g = shapeCashArray[f];
                if (PointComparator.EqualPoint(g.start, d.end, 0.01)) {
                    d.addShapesAtTail(g);
                    shapeCashArray.splice(f, 1);
                    e = true;
                    --f;
                }
                else if (PointComparator.EqualPoint(g.end, d.start, 0.01)) {
                    d.addShapesAtHead(g);
                    shapeCashArray.splice(f, 1);
                    e = true;
                    --f;
                }
            }
        }
        for (var h = 0; h < shapeCashArray.length; h++) {
            d.addShapesAtTail(shapeCashArray[h]);
        }
        this.shapes = d.shapeArray;
        this.numOfShapes = this.shapes.length;
    }
    rR() {
        for (var a = this.get_geometricLength(), b = 0; b < this.numOfShapes;) {
            var c = this.shapes[b],
                d = c.get_geometryLength();
            c.set_startU(a);
            var e = a - d;
            c.set_endU(e), (a = e), ++b;
        }
    }
    rS() {
        for (var a = this.get_geometricLength(), b = 0; b < this.numOfShapes;) {
            var c = this.shapes[b],
                d = c.get_geometryLength();
            c.set_startU(a);
            var e = a - d;
            c.set_endU(e), (a = e), ++b;
        }
    }
    removeMetaDataOfAllShapes(key) {
        for (var b = 0; b < this.numOfShapes;) this.getShapeAt(b).removeMetaData(key), ++b;
    }
    addMetaDataToAllShapes(key, val) {
        for (var c = 0; c < this.numOfShapes;) this.getShapeAt(c).addMetaData(key, val), ++c;
    }
    copyMetaDataToAllShapes(a) {
        for (var b = 0; b < this.numOfShapes;) this.getShapeAt(b).copyMetaDatasTo(a), ++b;
    }
    copyMetaDataFromAllShapes(shape, b) {
        null == b && (b = true);
        for (var c = 0; c < this.numOfShapes;) shape.copyMetaDatasTo(this.getShapeAt(c), b), ++c;
    }
    regulate() {
        this.minX = Infinity;
        this.minY = Infinity;
        this.maxX = -Infinity;
        this.maxY = -Infinity;
        this.numOfPoints = 0;
        this.geometricLength = 0;
        for (var i = 0; i < this.numOfShapes; i++) {
            var shape = this.shapes[i];
            this.geometricLength += shape.get_geometryLength();
            this.numOfPoints += shape.get_resolution();
            this.minX = this.minX < shape.get_minX() ? this.minX : shape.get_minX();
            this.minY = this.minY < shape.get_minY() ? this.minY : shape.get_minY();
            this.maxX = this.maxX > shape.get_maxX() ? this.maxX : shape.get_maxX();
            this.maxY = this.maxY > shape.get_maxY() ? this.maxY : shape.get_maxY();
        }
        this.midX = this.minX + (this.maxX - this.minX) / 2;
        this.midY = this.minY + (this.maxY - this.minY) / 2;
    }
}
ShapesWrapper.vAC = new Point;
ShapesWrapper.vAB = new Point;
ShapesWrapper.vAP = new Point;

class SimpleGeometryMergeHandler {
    constructor() {
        (this.kJ = new Array(0)),
            (this.fH = new Array(0)),
            (this.kK = new Array(0)),
            (this.fx = new Array(0)),
            (this.fy = new Array(0)),
            this.clean();
    }

    fx = null;
    kJ = null;
    kK = null;
    geoData = null;
    fy = null;
    fH = null;
    yN = null;
    get_numAddedGeometries() {
        return this.yN;
    }
    yO = null;
    get_numAddedVertices() {
        return this.yO;
    }
    yP = null;
    get_numAddedIndices() {
        return this.yP;
    }
    addGeometry(a) {
        (this.kJ[this.get_numAddedGeometries()] = a.vertexPositionData),
            (this.fH[this.get_numAddedGeometries()] = a.vertexNormalData),
            (this.fx[this.get_numAddedGeometries()] = a.uvData),
            null != a.secondaryUvData
                ? (this.fy[this.get_numAddedGeometries()] = a.secondaryUvData)
                : ((this.fy[this.get_numAddedGeometries()] = new Array(0)),
                    this.concat(this.fy[this.get_numAddedGeometries()], a.uvData)),
            SimpleGeometryDataUtil.setVertexTangents(a),
            (this.kK[this.get_numAddedGeometries()] = a.vertexTangentData);
        for (var b = a.indices.length, c = 0; b > c;)
            (this.geoData.indices[this.yP++] = a.indices[c] + this.get_numAddedVertices()),
                ++c;
        (this.yO += ObjMan.__cast(a.vertexPositionData.length / 3, Int)),
            this.yN++;
    }
    merge() {
        for (var a = 0; a < this.kJ.length;)
            this.concat(this.geoData.vertexPositionData, this.kJ[a]),
                this.concat(this.geoData.vertexNormalData, this.fH[a]),
                this.concat(this.geoData.uvData, this.fx[a]),
                this.concat(this.geoData.secondaryUvData, this.fy[a]),
                this.concat(this.geoData.vertexTangentData, this.kK[a]),
                ++a;
        return this.geoData;
    }
    clean() {
        (this.yN = 0), (this.yP = 0), (this.yO = 0);
        ArrayTool.clear(this.kJ);
        ArrayTool.clear(this.fH);
        ArrayTool.clear(this.kK);
        ArrayTool.clear(this.fx);
        ArrayTool.clear(this.fy);
        this.geoData = this.createSimpleGeometryData();
    }
    concat(dst, src) {
        if (null != src) {
            for (var srcLen = src.length, id = 0, dstLen = dst.length; srcLen > id;) {
                dst[dstLen++] = src[id];
                ++id;
            }
        }
    }
    createSimpleGeometryData() {
        var geoData = new SimpleGeometryData();
        (geoData.indices = new Array(0)),
            (geoData.secondaryUvData = new Array(0)),
            (geoData.uvData = new Array(0)),
            (geoData.vertexTangentData = new Array(0)),
            (geoData.vertexNormalData = new Array(0)),
            (geoData.vertexPositionData = new Array(0));
        return geoData;
    }
}
class SimpleMeshDataOptimizer {
    constructor() {
        this.maxVertexBufferSize = 196605;
    }

    metaFilters = null;
    get_metaFilters() {
        return this.metaFilters;
    }
    set_metaFilters(a) {
        return this.metaFilters == a ? this.metaFilters : ((this.metaFilters = a), this.metaFilters);
    }
    maxVertexBufferSize = null;
    get_maxVertexBufferSize() {
        return this.maxVertexBufferSize;
    }
    set_maxVertexBufferSize(a) {
        return this.maxVertexBufferSize == a ? this.maxVertexBufferSize : ((this.maxVertexBufferSize = a), this.maxVertexBufferSize);
    }
    ignoreReuseGeometries = null;
    get_ignoreReuseGeometries() {
        return this.ignoreReuseGeometries;
    }
    set_ignoreReuseGeometries(a) {
        return this.ignoreReuseGeometries == a ? this.ignoreReuseGeometries : ((this.ignoreReuseGeometries = a), this.ignoreReuseGeometries);
    }
    mergeMeshDatas(a) {
        for (
            var myMap = new MyMap(),
            contextsSet = this.GK(a),
            d = new Array(0),
            e = 0,
            len = a.length,
            id = 0;
            len > id;

        ) {
            var h = a[id];
            if (contextsSet.contextArray[h.geometryData.__id__] > 1) {
                if (!this.get_ignoreReuseGeometries()) {
                    (d[e++] = h), ++id;
                    continue;
                }
                h.geometryData = SimpleGeometryDataUtil.cloneGeometry(h.geometryData);
            }
            var i,
                j = MetaKeyGenerator.generateMetaKey(this.get_metaFilters(), h);
            null != ((null != globalMap[j]) ? myMap.getReserved(j) : myMap.map[j])
                ? (i = (null != globalMap[j]) ? myMap.getReserved(j) : myMap.map[j])
                : ((i = new Array(0)),
                    null != globalMap[j] ? myMap.setReserved(j, i) : (myMap.map[j] = i)),
                i.push(h),
                ++id;
        }
        for (var k = new KMap(myMap, myMap.arrayKeys()); k.hasNext();) {
            var l = k.next();
            if (l.length > 1) {
                var m = this.GL(l);
                for (id = 0; id < m.length;) (d[e++] = m[id]), ++id;
            }
            else d[e++] = l[0];
        }
        return d;
    }
    GK(a) {
        for (var contextsSet = new ContextsSet(), len = a.length, id = 0; len > id;) {
            var e = a[id].geometryData,
                f = contextsSet.contextArray[e.__id__];
            null != f ? contextsSet.set(e, ++f) : contextsSet.set(e, 1), ++id;
        }
        return contextsSet;
    }
    copyMetaData(src, dst) {
        for (var c = 0; c < this.get_metaFilters().length; c++) {
            var d = this.get_metaFilters()[c];
            src.hasMetadata(d) && dst.addMetaData(d, src.getMetadata(d));
        }
    }
    GL(simpleMeshDataArray) {
        simpleMeshDataArray.sort((a, b) => { this.compareSimpleMeshData(a, b) });
        var newSimpleMeshData,
            mergeHandler = new SimpleGeometryMergeHandler(),
            index = 0,
            newSimpleMeshDataArray = new Array(0),
            count = simpleMeshDataArray.length;

        for (var id = 0; count > id; id++) {
            var i = simpleMeshDataArray[id],
                j = i.geometryData;
            null != i.transformation &&
                SimpleGeometryDataUtil.applyTransformation(j, i.transformation);
            var k = j.vertexPositionData.length;
            if (k > this.get_maxVertexBufferSize())
                throw new Error("Too much vertex in buffer!");
            if (3 * mergeHandler.get_numAddedVertices() + k > this.get_maxVertexBufferSize()) {
                newSimpleMeshData = new SimpleMeshData();
                this.copyMetaData(simpleMeshDataArray[0], newSimpleMeshData);
                newSimpleMeshData.geometryData = mergeHandler.merge();
                mergeHandler.clean();
                newSimpleMeshDataArray[index++] = newSimpleMeshData;
            }
            mergeHandler.addGeometry(j);
        }
        newSimpleMeshData = new SimpleMeshData();
        this.copyMetaData(simpleMeshDataArray[0], newSimpleMeshData);
        newSimpleMeshData.geometryData = mergeHandler.merge();
        mergeHandler.clean();
        newSimpleMeshDataArray[index++] = newSimpleMeshData;
        return newSimpleMeshDataArray;
    }
    compareSimpleMeshData(a, b) {
        var c = a.geometryData.vertexPositionData.length,
            d = b.geometryData.vertexPositionData.length;
        return c > d ? 1 : d > c ? -1 : 0;
    }
}
class TriangleMath {
    static l_(a, b, c, d) {
        return Math.sqrt((c - a) * (c - a) + (d - b) * (d - b));
    }
    static fO(a, b, c, d, e, f) {
        null == e && (e = 0.5);
        var g;
        return (
            null != f
                ? ((g = f), f.setTo((c - a) * e + a, (d - b) * e + b))
                : (g = new Point((c - a) * e + a, (d - b) * e + b)),
            g
        );
    }
    static mg(a, b, c, d, e, f, g) {
        return (
            null == g && (g = 0.5),
            new Vector3D((d - a) * g + a, (e - b) * g + b, (f - c) * g + c)
        );
    }
    static mi(a, b, c, d, e, f) {
        null == f && (f = false), null == e && (e = true);
        var g,
            h = c - a,
            i = d - b;
        if (((g = f ? new Point(-i, h) : new Point(i, -h)), e)) {
            var j = g.get_length();
            g.setTo(g.x / j, g.y / j);
        }
        return g;
    }
    static mu(a, b, c, d, e, f, g, h, i, j, k) {
        null == k && (k = false), null == j && (j = true);
        var l,
            m = d - a,
            n = e - b,
            o = f - c,
            p = g - a,
            q = h - b,
            r = i - c,
            s = n * r - o * q,
            t = o * p - m * r,
            u = m * q - n * p;
        return (
            (l = k ? new Vector3D(-s, -t, -u) : new Vector3D(s, t, u)),
            j && l.normalize(),
            l
        );
    }
    static isLineParallel(x0, y0, x1, y1) {
        return GeoNumComparor.Equal(x0 * y1 - y0 * x1, 0);
    }
    static isRightTriangle(x0, y0, x1, y1, x2, y2) {
        var g = false;
        if ((GeoNumComparor.Equal(x1, x0) && GeoNumComparor.Equal(x1, x2)) || (GeoNumComparor.Equal(y1, y0) && GeoNumComparor.Equal(y1, y2))) g = true;
        else {
            var h = (y1 - y0) / (x1 - x0);
            g = GeoNumComparor.Equal(Math.abs(y2 - h * x2 + (y0 - h * x0)), 0);
        }
        return g
            ? GeoNumComparor.isLess(x2, Math.min(x0, x1)) || GeoNumComparor.isGreater(x2, Math.max(x0, x1))
                ? false
                : GeoNumComparor.isLess(y2, Math.min(y0, y1)) || GeoNumComparor.isGreater(y2, Math.max(y0, y1))
                    ? false
                    : true
            : false;
    }
    static getLineIntersection(x0, y0, x1, y1, x2, y2, x3, y3, checkFirst, checkSecond, outPt) {
        null == checkSecond && (checkSecond = true), null == checkFirst && (checkFirst = true);
        var dx0 = x0 - x1,
            dx2 = x2 - x3,
            dy0 = y0 - y1,
            dy2 = y2 - y3,
            p = dx0 * dy2 - dy0 * dx2;
        if (GeoNumComparor.Equal(p, 0)) return null;
        var q = x0 * y1 - y0 * x1,
            r = x2 * y3 - y2 * x3,
            s = (dx2 * q - dx0 * r) / p,
            t = (dy2 * q - dy0 * r) / p;
        if (checkFirst) {
            if (GeoNumComparor.isLess(s, x1 > x0 ? x0 : x1) || GeoNumComparor.isGreater(s, x0 > x1 ? x0 : x1)) return null;
            if (GeoNumComparor.isLess(t, y1 > y0 ? y0 : y1) || GeoNumComparor.isGreater(t, y0 > y1 ? y0 : y1)) return null;
        }
        if (checkSecond) {
            if (GeoNumComparor.isLess(s, x3 > x2 ? x2 : x3) || GeoNumComparor.isGreater(s, x2 > x3 ? x2 : x3)) return null;
            if (GeoNumComparor.isLess(t, y3 > y2 ? y2 : y3) || GeoNumComparor.isGreater(t, y2 > y3 ? y2 : y3)) return null;
        }
        return null != outPt ? (outPt.setTo(s, t), outPt) : new Point(s, t);
    }
    static calcWinding(x0, y0, x1, y1, x2, y2) {
        var g = (x1 - x0) * (y2 - y0) - (y1 - y0) * (x2 - x0);
        return GeoNumComparor.Equal(g, 0) ? 0 : g > 0 ? 1 : -1;
    }
    static mx(a, b, c, d, e) {
        var f = d - a,
            g = e - b,
            h = f * f + g * g,
            i = c * c;
        return h == i ? 0 : h > i ? -1 : 1;
    }
    static my(a, b, c) {
        return GeoNumComparor.isNotLess(b, a.get_left()) &&
            GeoNumComparor.isNotGreater(b, a.get_right()) &&
            GeoNumComparor.isNotLess(c, a.get_top())
            ? GeoNumComparor.isNotGreater(c, a.get_bottom())
            : false;
    }
    static mz(a, b) {
        return (360 * b) / a;
    }
    static mA(a, b) {
        return (a * b) / 360;
    }
    static mB(a, b, c, d, e, f, g, h) {
        var i = TriangleMath.getCrossProduct(a, b, e, f, g, h) < 0;
        return TriangleMath.getCrossProduct(a, b, c, d, e, f) < 0 == i
            ? i == TriangleMath.getCrossProduct(a, b, g, h, c, d) < 0
            : false;
    }
    static mD(a, b, c, d) {
        return b * c - a * d;
    }
    static a0(a, b, c, d) {
        return a * c + b * d;
    }
    static mE(a, b, c, d, e, f) {
        return (a - c) * (f - d) - (e - c) * (b - d);
    }
    static getCrossProduct(x0, y0, x1, y1, x2, y2) {
        return (x0 - x2) * (y1 - y2) - (x1 - x2) * (y0 - y2);
    }
}
class SimpleGeometryDataBounds {
    static __name__ = ["SimpleGeometryDataBounds"];

    midZ = null;
    midY = null;
    midX = null;
    maxZ = null;
    maxY = null;
    maxX = null;
    depth = null;
    minY = null;
    minX = null;
    width = null;
    minZ = null;
    height = null;
    constructor(a) {
        (this.minZ = Infinity),
            (this.minX = Infinity),
            (this.minY = Infinity),
            (this.maxX = -Infinity),
            (this.maxY = -Infinity),
            (this.maxZ = -Infinity);
        for (var b = 0; b < a.vertexPositionData.length;) {
            var c = a.vertexPositionData[b],
                d = a.vertexPositionData[b + 1],
                e = a.vertexPositionData[b + 2];
            (this.minX = this.minX < c ? this.minX : c),
                (this.maxX = this.maxX > c ? this.maxX : c),
                (this.minY = this.minY < d ? this.minY : d),
                (this.maxY = this.maxY > d ? this.maxY : d),
                (this.minZ = this.minZ < e ? this.minZ : e),
                (this.maxZ = this.maxZ > e ? this.maxZ : e),
                (b += 3);
        }
        (this.width = this.maxX - this.minX),
            (this.height = this.maxY - this.minY),
            (this.depth = this.maxZ - this.minZ),
            (this.midX = this.width / 2 + this.minX),
            (this.midY = this.height / 2 + this.minY),
            (this.midZ = this.depth / 2 + this.minZ);
    }
}

export {
    Point, Rectangle, PointEx, Vect2, Vector3D, Triangle, Matrix, MatrixHelper, RectLayoutElement, LineIntersectBuilder,
    Matrix3D, GeoBase, GeoPolygon, FacePolygon, Face4, Face3, MyFace4Polygon, TriangleMath,
    SimpleGeometryData, TypedSimpleGeometryData, MySimpleGeometryData, CompactGeometry, SimpleMeshData, TypedSimpleMeshData,
    GeoBoundRect, GeoShape, ArcBase, Arc, Circle, Line, ShapesWrapper, PointComparator,
    SimpleGeometryMergeHandler, SimpleMeshDataOptimizer, SimpleGeometryDataBounds
}
export {
    X_AXIS, Y_AXIS, Z_AXIS
}