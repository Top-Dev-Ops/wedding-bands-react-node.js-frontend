/* eslint-disable no-unused-expressions */
import { ObjMan } from "./objman.js"
import { ArrayTool } from "./util.js"
import { Rectangle, Matrix, RectLayoutElement, MyFace4Polygon } from "./geometry.js"

class HorizontalRectLayout {
    gapLeft = null;
    gapRight = null;
    Q2 = null;
    elementArray = null;
    bounds = null;
    transformation = null;
    constructor() {
        this.Q2 = new Array(0),
            this.elementArray = new Array(0),
            this.bounds = new Rectangle(),
            this.transformation = new Matrix(),
            this.gapLeft = 0,
            this.gapRight = 0;
    }

    get_bounds() {
        return this.bounds;
    }
    get_transformation() {
        return this.transformation;
    }
    addElement(a) {
        this.elementArray.push(a);
    }
    numElements() {
        return this.elementArray.length;
    }
    getElement(a) {
        return this.elementArray[a];
    }
    removeElementFrom(a) {
        var b = this.elementArray,
            c = b[a];
        return b.splice(a, 1), c;
    }
    getAllChildren() {
        for (var a = new Array(0), b = 0, c = this.elementArray; b < c.length;) {
            var d = c[b];
            if ((++b, ObjMan.__instanceof(d, RectLayoutElement))) a.push(d);
            else if (ObjMan.__instanceof(d, RectLayoutElement)) {
                var e = d.getAllChildren();
                a = null == e ? a.slice() : a.concat(e);
            }
        }
        return a;
    }
    update() {
        var a = this.Q2;
        ArrayTool.clear(a);
        this.get_bounds().setTo(0, 0, 0, 0);
        for (var d = 0, e = this.elementArray; d < e.length;) {
            var f = e[d];
            if ((++d, ObjMan.__instanceof(f, RectLayoutElement))) this.Q_(f);
            else if (ObjMan.__instanceof(f, HorizontalRectLayout)) {
                var g = f;
                g.update();
                var h = g.getAllChildren();
                if (h.length > 0) {
                    h[0].gapLeft += g.gapLeft;
                    for (var i = 0; i < h.length;) {
                        var j = h[i];
                        ++i,
                            j.get_transformation().concat(g.get_transformation()),
                            this.Q_(j);
                    }
                    h[0].gapLeft -= g.gapLeft;
                    var k = this.Q2;
                    k[k.length - 1].gapRight += g.gapRight;
                }
            }
        }
    }
    Q_(a) {
        var b,
            c = new MyFace4Polygon(a);
        if (this.Q2.length > 0) {
            var d = this.Q2;
            b = d[d.length - 1];
        } else b = null;
        var e = this.Rc(b, c);
        null != b && (e += b.gapRight),
            (e += c.gapLeft),
            c.get_element().get_transformation().translate(e, 0),
            c.invalidate(),
            c.validateNow(),
            (this.bounds = this.get_bounds().union(c.get_boundingRect())),
            this.Q2.push(c);
    }
    Rc(a, b) {
        if (null == a) return -b.get_boundingRect().get_left();
        var c = a.get_boundingRect().get_right() - b.get_boundingRect().get_left(),
            d = c;
        b.translate(c, 0);
        for (var e = Infinity, f = 0; f < b.get_numOfPoints();)
            (e = Math.min(this.Re(a, b.getPointAt(f)), e)), ++f;
        for (f = 0; f < a.get_numOfPoints();)
            (e = Math.min(this.Re(b, a.getPointAt(f)), e)), ++f;
        return b.translate(-c, 0), e != Infinity && (d = c - e), d;
    }
    Re(a, b) {
        for (var c = Infinity, d = 0; d < a.get_numOfPoints();) {
            var e = this.Rg(
                0 == d ? a.getPointAt(a.get_numOfPoints() - 1) : a.getPointAt(d - 1),
                a.getPointAt(d),
                b
            );
            !isNaN(e) && (c = Math.min(c, Math.abs(e))), ++d;
        }
        return c;
    }
    Rg(a, b, c) {
        if (c.y < Math.min(a.y, b.y) || c.y > Math.max(a.y, b.y)) return NaN;
        var d = b.x - a.x;
        if (0 != d) {
            var e = (b.y - a.y) / d;
            return c.x - (c.y - (-e * a.x + a.y)) / e;
        }
        return c.x - a.x;
    }
}

export {
    HorizontalRectLayout
}