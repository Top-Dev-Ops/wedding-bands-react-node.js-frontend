/* eslint-disable no-unused-expressions */
import {
    Point, PointComparator, TriangleMath, PointEx, GeoPolygon
} from "./geometry.js"
import { Std, ObjMan } from './objman';
import { MathConsts } from './meta';
class Bundle {
    constructor(a) {
        this.name = a;
    }
    name = null;
    toString() {
        return this.name;
    }
}
Bundle.Tail = new Bundle("BUNDLE_TAIL");
Bundle.Head = new Bundle("BUNDLE_HEAD");
Bundle.Non = new Bundle("UNBUNDLED");
class A {
    __class__ = A;
    static __name__ = ["A"];
    constructor() { }
    static oo = [
        [1, 2, 2, 1, 0, 0],
        [0, 0, 0, 0, 2, 2],
        [0, 0, 0, 0, 1, 1]
    ];
    static TH = 2;
    static BH = 1;
    static NH = 0;
}
class C {
    __class__ = C;
    static __name__ = ["C"];
    constructor(a, b, x, y, e) {
        (this.aI = new Point()),
            (this.oz = new Array(2)),
            (this.oz[0] = a),
            (this.oz[1] = b),
            (this.aI.x = x),
            (this.aI.y = y),
            (this.nextObj = e);
    }

    nextObj = null;
    oz = null;
    aI = null;
}
class D {
    __class__ = D;
    static __name__ = ["D"];
    constructor() { }

    nw = null;
    oy(a, b) {
        for (var c = null, d = a.nw; null != d;) {
            if (d.bundleArray[0] == Bundle.Head || 0 != d.oh[0][0] || 0 != d.oh[0][1]) {
                c = PolyBase.nt(c, this, d, b);
            }
            d = d.nextObj;
        }
    }
}
class G {
    __class__ = G;
    static __name__ = ["G"];
    constructor(a) {
        this.aV = a;
    }

    nextObj = null;
    od = null;
    aV = null;
}
class M {
    __class__ = M;
    static __name__ = ["M"];
    constructor(a, b, c) {
        this._ = new Array(2);
        var d = new S(b, c);
        this._[0] = d;
        this._[1] = d;
        this.nextObj = a;
        this.scope = this;
        this.po = 1;
    }

    pm = null;
    nextObj = null;
    scope = null;
    _ = null;
    po = null;
    os(a, b) {
        var c = new S(a, b);
        this.scope._[1].nextObj = c;
        this.scope._[1] = c;
    }
    ot(a, b) {
        var c = new S(a, b);
        c.nextObj = this.scope._[0];
        this.scope._[0] = c;
    }
}
class LmtTable {
    __class__ = LmtTable;
    static __name__ = ["LmtTable"];
    constructor() { }

    nw = null;
}
class BoundRect {
    __class__ = BoundRect;
    static __name__ = ["BoundRect"];
    constructor(a, b, c, d) {
        null == d && (d = 0),
            null == c && (c = 0),
            null == b && (b = 0),
            null == a && (a = 0),
            (this.left = a),
            (this.top = b),
            (this.width = c),
            (this.height = d);
    }
    width = null;
    left = null;
    height = null;
    top = null;
    getBottom() {
        return this.top + this.height;
    }
    getTop() {
        return this.top;
    }
    getRight() {
        return this.left + this.width;
    }
    getLeft() {
        return this.left;
    }
    toString() {
        return (
            "[" +
            Std.string(this.left) +
            " " +
            Std.string(this.top) +
            " " +
            Std.string(this.width) +
            " " +
            Std.string(this.height) +
            "]"
        );
    }
}
class O {
    __class__ = O;
    static __name__ = ["O"];
    constructor(a) {
        this.aV = a;
    }
    oV = null;
    aV = null;
    fR = null;
}
class ScanBeamTreeEntries {
    __class__ = ScanBeamTreeEntries;
    static __name__ = "ScanBeamTreeEntries";
    oU = null;
    ox = null;
    constructor() { }
    oc() {
        var a = this.ox,
            b = new Array(a),
            c = 0;

        c = this.pg(c, b, this.oU);
        return b;
    }

    pg(a, b, c) {
        null != c.fR && (a = this.pg(a, b, c.fR));
        b[a] = c.aV;
        ++a;
        null != c.oV && (a = this.pg(a, b, c.oV));
        return a;
    }
}
class Q {
    __class__ = Q;
    static __name__ = "Q";
    constructor(a, b) {
        (this.nq = a),
            (this.nv = a.nv),
            (this.nu = a.nu),
            (this.aT = a.aT),
            (this.ny = b);
    }
    nq = null;
    aT = null;
    ny = null;
    nv = null;
    nu = null;
}
class S {
    constructor(a, b) {
        this.P = a;
        this.aV = b;
        this.nextObj = null;
    }
    nextObj = null;
    P = null;
    aV = null;
}
class Hex { //T
    constructor() { }
    static hex(a, b, c, d) {
        return a + (b << 1) + (c << 2) + (d << 3);
    }
}
class PolyOP {
    constructor(a) {
        this.name = a;
    }
    __class__ = PolyOP;
    static __name__ = ["PolyOP"];

    toString() {
        return this.name;
    }
}
PolyOP.Intersection = new PolyOP("Intersection");
PolyOP.Union = new PolyOP("Union");
PolyOP.ExclusiveOR = new PolyOP("Exclusive or");
PolyOP.Difference = new PolyOP("Difference");
class TopPolygonNode {
    __class__ = TopPolygonNode;
    static __name__ = "TopPolygonNode";

    nw = null;
    constructor() { }
    or(a, b) {
        return (this.nw = new M(this.nw, a, b)), this.nw;
    }

    ov(a, b) {
        if (((b.scope.pm = true), a.scope != b.scope)) {
            (a.scope._[1].nextObj = b.scope._[0]), (b.scope._[0] = a.scope._[0]);
            for (var c = a.scope, d = this.nw; null != d;)
                d.scope == c && ((d.po = 0), (d.scope = b.scope)), (d = d.nextObj);
        }
    }

    ou(a, b) {
        if (((b.scope.pm = false), a.scope != b.scope)) {
            (b.scope._[1].nextObj = a.scope._[0]), (b.scope._[1] = a.scope._[1]);
            for (var c = a.scope, d = this.nw; null != d;)
                d.scope == c && ((d.po = 0), (d.scope = b.scope)), (d = d.nextObj);
        }
    }

    RJ() {
        for (var a = 0, b = this.nw; null != b;) {
            if (0 != b.po) {
                for (var c = 0, d = b.scope._[0]; null != d;) ++c, (d = d.nextObj);
                c > 2 ? ((b.po = c), ++a) : (b.po = 0);
            }
            b = b.nextObj;
        }
        return a;
    }

    oB(a) {
        var b = PolyBase.selectTool(a),
            c = this.RJ();
        if (c > 0) {
            for (var d = null, e = this.nw; null != e;) {
                if (((d = e.nextObj), 0 != e.po)) {
                    var f = b;
                    c > 1 && (f = PolyBase.selectTool(a)), e.scope.pm && f.setMiddleShape(e.scope.pm);
                    for (var g = e.scope._[0]; null != g;) f.addPointXY(g.P, g.aV), (g = g.nextObj);
                    c > 1 && b.addPoly(f);
                }
                e = d;
            }
            var h = b;
            b = PolyBase.selectTool(a);
            for (var i = 0; i < h.getPolyCount();) {
                var j = h.getPolyAt(i);
                j.getMiddleShape() || b.addPoly(j), ++i;
            }
            for (var k = 0; k < h.getPolyCount();) {
                var l = h.getPolyAt(k);
                l.getMiddleShape() && b.addPoly(l), ++k;
            }
        }
        return b;
    }
}
class AetTree {
    constructor() { }
    __class__ = AetTree;
    static __name__ = ["AetTree"];
    nw = null;
}
class PolyHelper {
    constructor() { }

    static create2DArray_Int(a, b) {
        var c = new Array(a);
        for (var d = 0; a > d; d++) c[d] = new Array(b);
        return c;
    }
    static create2DArray_Bool(count1, count2) {
        var array2D = new Array(count1);
        for (var d = 0; count1 > d; d++)
            array2D[d] = new Array(count2);
        return array2D;
    }
    static sortRegular(ptArray) {
        var yMinPt = null, yMaxPt = null, xMinPt = null, xMaxPt = null, xMinId = 0, g = ptArray;
        for (var id = 0; id < ptArray.length; id++) {
            var pt = ptArray[id];
            (null == yMinPt || yMinPt.y > pt.y || (yMinPt.y == pt.y && pt.x < yMinPt.x)) && (yMinPt = pt);
            (null == yMaxPt || yMaxPt.y < pt.y || (yMaxPt.y == pt.y && pt.x > yMaxPt.x)) && (yMaxPt = pt);
            (null == xMinPt || xMinPt.x > pt.x || (xMinPt.x == pt.x && pt.y > xMinPt.y)) && ((xMinPt = pt), (xMinId = id));
            (null == xMaxPt || xMaxPt.x < pt.x || (xMaxPt.x == pt.x && pt.y < xMaxPt.y)) && (xMaxPt = pt);
        }
        if (xMinId > 0) {
            var len = ptArray.length;
            g = new Array(len);
            var k = 0;
            for (var l = xMinId; l < ptArray.length; l++)
                g[k++] = ptArray[l];
            for (var m = 0; xMinId > m; m++)
                g[k++] = ptArray[m];
            ptArray = g;
        }
        var yMaxFirst = false;
        for (var id = 0; id < ptArray.length; id++) {
            var p = ptArray[id];
            if (p.equals(yMaxPt)) {
                yMaxFirst = true;
                break;
            }
            if (p.equals(yMinPt)) break;
        }
        if (yMaxFirst) {
            g = new Array(ptArray.length);
            g[0] = ptArray[0];
            var r = 1;
            for (var len = ptArray.length - 1; len > 0; len--)
                g[r++] = ptArray[len];
            ptArray = g;
        }
        return ptArray;
    }
}
class PolyBase { //x
    constructor() { }
    __class__ = PolyBase;
    static __name__ = ["PolyBase"];

    static nc = null;
    static PolyIntersection(poly1, poly2, c) {
        null == c && (c = "PolyDefault");
        return PolyBase.PolyOperation(PolyOP.Intersection, poly1, poly2, c);
    }
    static PolyUnion(a, b, c) {
        null == c && (c = "PolyDefault");
        return PolyBase.PolyOperation(PolyOP.Union, a, b, c);
    }
    static PolyExclusiveOR(a, b, c) {
        null == c && (c = "PolyDefault");
        return PolyBase.PolyOperation(PolyOP.ExclusiveOR, a, b, c);
    }
    static PolyDifference(a, b, c) {
        null == c && (c = "PolyDefault");
        return PolyBase.PolyOperation(PolyOP.Difference, b, a, c);
    }
    static selectTool(a) {
        return "PolySimple" == a ? new PolySimple() : "PolyDefault" == a ? new PolyDefault() : null;
    }
    static nk(a, b) {
        return Math.abs(a - b) <= 2.220446049250313e-16;
    }
    static prevIndex(a, b) {
        return (a - 1 + b) % b;
    }
    static nextIndex(a, b) {
        return (a + 1) % b;
    }
    static nn(a, b) {
        return a.getYAt(PolyBase.prevIndex(b, a.getPolyLength())) == a.getYAt(b)
            ? a.getYAt(PolyBase.nextIndex(b, a.getPolyLength())) != a.getYAt(b)
            : true;
    }
    static nt(a, b, c, d) {
        if (null == a) a = new Q(c, null);
        else {
            var e = a.nu - a.nv - (c.nu - c.nv);
            if (c.nu >= a.nu || c.aT == a.aT || Math.abs(e) <= 2.220446049250313e-16)
                a = new Q(c, a);
            else {
                var f = (c.nv - a.nv) / e;
                b.nw = PolyBase.nx(b.nw, a.nq, c, a.nv + f * (a.nu - a.nv), f * d);
                a.ny = PolyBase.nt(a.ny, b, c, d);
            }
        }
        return a;
    }
    static nz() {
    }
    static nA() {
        PolyBase.nc = null;
    }
    static PolyOperation(polyOP, poly1, poly2, toolName) {
        PolyBase.nz();
        var e = PolyBase.selectTool(toolName);
        if (
            (poly1.isEmpty() && poly2.isEmpty()) ||
            (poly1.isEmpty() && (polyOP == PolyOP.Intersection || polyOP == PolyOP.Difference)) ||
            (poly2.isEmpty() && polyOP == PolyOP.Intersection)
        ) {
            PolyBase.nA();
            return e;
        }
        (polyOP != PolyOP.Intersection && polyOP != PolyOP.Difference) ||
            poly1.isEmpty() ||
            poly2.isEmpty() ||
            PolyBase.oa(poly1, poly2, polyOP);

        var lmtTable = new LmtTable(),
            scanBeamTreeEntries = new ScanBeamTreeEntries(),
            h = null,
            j = null;
        poly1.isEmpty() || (h = PolyBase.ob(lmtTable, scanBeamTreeEntries, poly1, 1, polyOP));
        poly2.isEmpty() || (j = PolyBase.ob(lmtTable, scanBeamTreeEntries, poly2, 0, polyOP));
        if (null == lmtTable.nw) {
            PolyBase.nA();
            return e;
        }

        var k = scanBeamTreeEntries.oc(),
            l = new Array(2);
        (l[0] = 0), (l[1] = 0), polyOP == PolyOP.Difference && (l[0] = 1);
        for (
            var m = lmtTable.nw, n = new TopPolygonNode(), q = new AetTree(), r = 0;
            r < k.length;

        ) {
            var s = k[r++],
                t = 0,
                u = 0;
            if ((r < k.length && ((t = k[r]), (u = t - s)), null != m && m.aV == s)) {
                for (var v = m.od; null != v;) PolyBase.oe(q, v), (v = v.of);
                m = m.nextObj;
            }
            var w = MathConsts.FLOAT_MIN,
                y = q.nw,
                z = q.nw;
            (q.nw.oh[0][q.nw.p] = q.nw.oi.y != s ? 1 : 0),
                (q.nw.oh[0][0 == q.nw.p ? 1 : 0] = 0),
                (q.nw.bundleArray[0] = Bundle.Non);
            for (var B = q.nw.nextObj; null != B;) {
                var C = B.p,
                    E = 0 == B.p ? 1 : 0;
                if (
                    ((B.oh[0][C] = B.oi.y != s ? 1 : 0),
                        (B.oh[0][E] = 0),
                        (B.bundleArray[0] = Bundle.Non),
                        1 == B.oh[0][C])
                ) {
                    if (PolyBase.nk(y.nv, B.nv) && PolyBase.nk(y.aT, B.aT) && y.oi.y != s) {
                        var F = C,
                            G = B.oh[0];
                        (G[F] = G[F] ^ y.oh[0][C]),
                            (B.oh[0][E] = y.oh[0][E]),
                            (B.bundleArray[0] = Bundle.Head),
                            (y.oh[0][0] = 0),
                            (y.oh[0][1] = 0),
                            (y.bundleArray[0] = Bundle.Tail);
                    }
                    y = B;
                }
                B = B.nextObj;
            }
            var J = new Array(2);
            (J[0] = 0), (J[1] = 0);
            var K = new Array(2);
            (K[0] = 0), (K[1] = 0);
            for (var L = null, M = q.nw; null != M;) {
                if (
                    ((K[0] = M.oh[0][0] + (M.oh[1][0] << 1)),
                        (K[1] = M.oh[0][1] + (M.oh[1][1] << 1)),
                        0 != K[0] || 0 != K[1])
                ) {
                    (M.on[0] = l[0]), (M.on[1] = l[1]);
                    var N = false,
                        O = 0,
                        Q = 0,
                        S = 0,
                        U = 0;
                    if (polyOP == PolyOP.Difference || polyOP == PolyOP.Intersection)
                        (N =
                            (0 == K[0] || (0 == l[1] && 0 == J[1])) &&
                                (0 == K[1] || (0 == l[0] && 0 == J[0]))
                                ? 0 != K[0] && 0 != K[1]
                                    ? l[0] == l[1]
                                    : false
                                : true),
                            (O = 0 != l[0] && 0 != l[1] ? 1 : 0),
                            (Q =
                                0 != (l[0] ^ M.oh[0][0]) && 0 != (l[1] ^ M.oh[0][1]) ? 1 : 0),
                            (S =
                                0 != (l[0] ^ (0 != J[0] ? 1 : 0)) &&
                                    0 != (l[1] ^ (0 != J[1] ? 1 : 0))
                                    ? 1
                                    : 0),
                            (U =
                                0 != (l[0] ^ (0 != J[0] ? 1 : 0) ^ M.oh[1][0]) &&
                                    0 != (l[1] ^ (0 != J[1] ? 1 : 0) ^ M.oh[1][1])
                                    ? 1
                                    : 0);
                    else if (polyOP == PolyOP.ExclusiveOR)
                        (N = 0 == K[0] ? 0 != K[1] : true),
                            (O = l[0] ^ l[1]),
                            (Q = l[0] ^ M.oh[0][0] ^ (l[1] ^ M.oh[0][1])),
                            (S = l[0] ^ (0 != J[0] ? 1 : 0) ^ (l[1] ^ (0 != J[1] ? 1 : 0))),
                            (U =
                                l[0] ^
                                (0 != J[0] ? 1 : 0) ^
                                M.oh[1][0] ^
                                (l[1] ^ (0 != J[1] ? 1 : 0) ^ M.oh[1][1]));
                    else {
                        if (polyOP != PolyOP.Union) throw (PolyBase.nA(), new Error("Unknown op"));
                        (N =
                            (0 == K[0] || (0 != l[1] && 0 == J[1])) &&
                                (0 == K[1] || (0 != l[0] && 0 == J[0]))
                                ? 0 != K[0] && 0 != K[1]
                                    ? l[0] == l[1]
                                    : false
                                : true),
                            (O = 0 != l[0] || 0 != l[1] ? 1 : 0),
                            (Q =
                                0 != (l[0] ^ M.oh[0][0]) || 0 != (l[1] ^ M.oh[0][1]) ? 1 : 0),
                            (S =
                                0 != (l[0] ^ (0 != J[0] ? 1 : 0)) ||
                                    0 != (l[1] ^ (0 != J[1] ? 1 : 0))
                                    ? 1
                                    : 0),
                            (U =
                                0 != (l[0] ^ (0 != J[0] ? 1 : 0) ^ M.oh[1][0]) ||
                                    0 != (l[1] ^ (0 != J[1] ? 1 : 0) ^ M.oh[1][1])
                                    ? 1
                                    : 0);
                    }
                    var V = l;
                    V[0] = V[0] ^ M.oh[0][0];
                    var W = l;
                    if (
                        ((W[1] = W[1] ^ M.oh[0][1]),
                            0 != K[0] && (J[0] = A.oo[J[0]][((K[0] - 1) << 1) + l[0]]),
                            0 != K[1] && (J[1] = A.oo[J[1]][((K[1] - 1) << 1) + l[1]]),
                            N)
                    ) {
                        var X = M.nv,
                            Y = Hex.hex(S, U, O, Q);
                        8 == Y || 7 == Y
                            ? ((M.oq[0] = n.or(X, s)), (w = X), (L = M.oq[0]))
                            : 4 == Y
                                ? (X != w && (L.os(X, s), (w = X)), (M.oq[0] = L), (L = null))
                                : 2 == Y
                                    ? (M.oq[1].ot(X, s), (w = X), (L = M.oq[1]))
                                    : 1 == Y
                                        ? (X != w && (L.ot(X, s), (w = X)), n.ou(L, M.oq[1]), (L = null))
                                        : 11 == Y
                                            ? (X != w && (L.ot(X, s), (w = X)), (M.oq[0] = L), (L = null))
                                            : 13 == Y
                                                ? (M.oq[1].os(X, s), (w = X), (L = M.oq[1]), (M.oq[1] = null))
                                                : 14 == Y
                                                    ? (X != w && (L.os(X, s), (w = X)),
                                                        n.ov(L, M.oq[1]),
                                                        (L = null),
                                                        (M.oq[1] = null))
                                                    : 6 == Y
                                                        ? (X != w && (L.os(X, s), (w = X)),
                                                            n.ov(L, M.oq[1]),
                                                            (M.oq[1] = null),
                                                            (M.oq[0] = n.or(X, s)),
                                                            (L = M.oq[0]))
                                                        : 9 == Y
                                                            ? (X != w && (L.ot(X, s), (w = X)),
                                                                n.ou(L, M.oq[1]),
                                                                (M.oq[1] = null),
                                                                (M.oq[0] = n.or(X, s)),
                                                                (L = M.oq[0]))
                                                            : 10 == Y
                                                                ? (M.ow.y == s && M.oq[1].ot(X, s), (M.oq[0] = M.oq[1]), (w = X))
                                                                : 5 == Y &&
                                                                (M.ow.y == s && M.oq[1].os(X, s), (M.oq[0] = M.oq[1]), (w = X));
                    }
                }
                M = M.nextObj;
            }
            for (var Z = q.nw; null != Z;) {
                if (Z.oi.y == s) {
                    var zny = Z.ny,
                        nextObj = Z.nextObj;
                    null != zny ? (zny.nextObj = nextObj) : (q.nw = nextObj),
                        null != nextObj && (nextObj.ny = zny),
                        Z.bundleArray[1] == Bundle.Head &&
                        null != zny &&
                        zny.bundleArray[1] == Bundle.Tail &&
                        ((zny.oq[1] = Z.oq[1]),
                            (zny.bundleArray[1] = Bundle.Non),
                            null != zny.ny && zny.ny.bundleArray[1] == Bundle.Tail && (zny.bundleArray[1] = Bundle.Head));
                } else
                    Z.oi.y == t ? (Z.nu = Z.oi.x) : (Z.nu = Z.ow.x + Z.aT * (t - Z.ow.y));
                Z = Z.nextObj;
            }
            if (r < scanBeamTreeEntries.ox) {
                var aa = new D();
                aa.oy(q, u);
                for (var ba = aa.nw; null != ba;) {
                    if (
                        ((y = ba.oz[0]),
                            (z = ba.oz[1]),
                            !(
                                (0 == y.oh[0][0] && 0 == y.oh[0][1]) ||
                                (0 == z.oh[0][0] && 0 == z.oh[0][1])
                            ))
                    ) {
                        var ca = y.oq[0],
                            da = z.oq[0],
                            ea = ba.aI.x,
                            fa = ba.aI.y + s,
                            ga =
                                (0 != y.oh[0][0] && 0 == y.on[0]) ||
                                    (0 != z.oh[0][0] && 0 != z.on[0]) ||
                                    (0 == y.oh[0][0] &&
                                        0 == z.oh[0][0] &&
                                        0 != y.on[0] &&
                                        0 != z.on[0])
                                    ? 1
                                    : 0,
                            ha =
                                (0 != y.oh[0][1] && 0 == y.on[1]) ||
                                    (0 != z.oh[0][1] && 0 != z.on[1]) ||
                                    (0 == y.oh[0][1] &&
                                        0 == z.oh[0][1] &&
                                        0 != y.on[1] &&
                                        0 != z.on[1])
                                    ? 1
                                    : 0,
                            ia = 0,
                            ja = 0,
                            ka = 0,
                            la = 0;
                        if (polyOP == PolyOP.Difference || polyOP == PolyOP.Intersection)
                            (ia = 0 != ga && 0 != ha ? 1 : 0),
                                (ja = 0 != (ga ^ z.oh[0][0]) && 0 != (ha ^ z.oh[0][1]) ? 1 : 0),
                                (ka = 0 != (ga ^ y.oh[0][0]) && 0 != (ha ^ y.oh[0][1]) ? 1 : 0),
                                (la =
                                    0 != (ga ^ z.oh[0][0] ^ y.oh[0][0]) &&
                                        0 != (ha ^ z.oh[0][1] ^ y.oh[0][1])
                                        ? 1
                                        : 0);
                        else if (polyOP == PolyOP.ExclusiveOR)
                            (ia = ga ^ ha),
                                (ja = ga ^ z.oh[0][0] ^ (ha ^ z.oh[0][1])),
                                (ka = ga ^ y.oh[0][0] ^ (ha ^ y.oh[0][1])),
                                (la =
                                    ga ^
                                    z.oh[0][0] ^
                                    y.oh[0][0] ^
                                    (ha ^ z.oh[0][1] ^ y.oh[0][1]));
                        else {
                            if (polyOP != PolyOP.Union)
                                throw (PolyBase.nA(), new Error("Unknown op type, " + Std.string(polyOP)));
                            (ia = 0 != ga || 0 != ha ? 1 : 0),
                                (ja = 0 != (ga ^ z.oh[0][0]) || 0 != (ha ^ z.oh[0][1]) ? 1 : 0),
                                (ka = 0 != (ga ^ y.oh[0][0]) || 0 != (ha ^ y.oh[0][1]) ? 1 : 0),
                                (la =
                                    0 != (ga ^ z.oh[0][0] ^ y.oh[0][0]) ||
                                        0 != (ha ^ z.oh[0][1] ^ y.oh[0][1])
                                        ? 1
                                        : 0);
                        }
                        var ma = Hex.hex(ia, ja, ka, la);
                        8 == ma
                            ? ((y.oq[0] = n.or(ea, fa)), (z.oq[0] = y.oq[0]))
                            : 4 == ma
                                ? null != ca && (ca.os(ea, fa), (z.oq[0] = ca), (y.oq[0] = null))
                                : 2 == ma
                                    ? null != da && (da.ot(ea, fa), (y.oq[0] = da), (z.oq[0] = null))
                                    : 1 == ma
                                        ? null != ca &&
                                        null != da &&
                                        (ca.ot(ea, fa),
                                            n.ou(ca, da),
                                            (y.oq[0] = null),
                                            (z.oq[0] = null))
                                        : 7 == ma
                                            ? ((y.oq[0] = n.or(ea, fa)), (z.oq[0] = y.oq[0]))
                                            : 11 == ma
                                                ? null != ca && (ca.ot(ea, fa), (z.oq[0] = ca), (y.oq[0] = null))
                                                : 13 == ma
                                                    ? null != da && (da.os(ea, fa), (y.oq[0] = da), (z.oq[0] = null))
                                                    : 14 == ma
                                                        ? null != ca &&
                                                        null != da &&
                                                        (ca.os(ea, fa),
                                                            n.ov(ca, da),
                                                            (y.oq[0] = null),
                                                            (z.oq[0] = null))
                                                        : 6 == ma
                                                            ? null != ca &&
                                                            null != da &&
                                                            (ca.os(ea, fa),
                                                                n.ov(ca, da),
                                                                (y.oq[0] = n.or(ea, fa)),
                                                                (z.oq[0] = y.oq[0]))
                                                            : 9 == ma &&
                                                            null != ca &&
                                                            null != da &&
                                                            (ca.ot(ea, fa),
                                                                n.ou(ca, da),
                                                                (y.oq[0] = n.or(ea, fa)),
                                                                (z.oq[0] = y.oq[0]));
                    }
                    0 != y.oh[0][0] && (z.on[0] = 0 == z.on[0] ? 1 : 0),
                        0 != z.oh[0][0] && (y.on[0] = 0 == y.on[0] ? 1 : 0),
                        0 != y.oh[0][1] && (z.on[1] = 0 == z.on[1] ? 1 : 0),
                        0 != z.oh[0][1] && (y.on[1] = 0 == y.on[1] ? 1 : 0);
                    var na = y.ny,
                        oa = z.nextObj;
                    if ((null != oa && (oa.ny = y), y.bundleArray[0] == Bundle.Head))
                        for (var pa = true; pa;)
                            (na = na.ny),
                                null != na ? na.bundleArray[0] != Bundle.Tail && (pa = false) : (pa = false);
                    null == na
                        ? ((q.nw.ny = z), (z.nextObj = q.nw), (q.nw = y.nextObj))
                        : ((na.nextObj.ny = z), (z.nextObj = na.nextObj), (na.nextObj = y.nextObj)),
                        (y.nextObj.ny = na),
                        (z.nextObj.ny = z),
                        (y.nextObj = oa),
                        (ba = ba.nextObj);
                }
                for (var qa = q.nw; null != qa;) {
                    var ra = qa.nextObj,
                        sa = qa.oA;
                    if (qa.oi.y == t && null != sa) {
                        (sa.oq[1] = qa.oq[0]),
                            (sa.bundleArray[1] = qa.bundleArray[0]),
                            (sa.oh[1][0] = qa.oh[0][0]),
                            (sa.oh[1][1] = qa.oh[0][1]);
                        var ta = qa.ny;
                        null != ta ? (ta.nextObj = sa) : (q.nw = sa),
                            null != ra && (ra.ny = sa),
                            (sa.ny = ta),
                            (sa.nextObj = ra);
                    } else
                        (qa.oq[1] = qa.oq[0]),
                            (qa.bundleArray[1] = qa.bundleArray[0]),
                            (qa.oh[1][0] = qa.oh[0][0]),
                            (qa.oh[1][1] = qa.oh[0][1]),
                            (qa.nv = qa.nu);
                    (qa.oq[0] = null), (qa = qa.nextObj);
                }
            }
        }
        return (e = n.oB(toolName)), PolyBase.nA(), e;
    }
    static getBounds(a) {
        var count = a.getPolyCount();
        var boundArray = new Array(count);
        for (var d = 0; d < count; d++) {
            var polygon = a.getPolyAt(d);
            boundArray[d] = polygon.getBounds();
        }
        return boundArray;
    }
    //poly1, poly2, polyOP
    static oa(poly1, poly2, polyOP) {
        var boundArray1 = PolyBase.getBounds(poly1),
            boundArray2 = PolyBase.getBounds(poly2),
            count1 = poly1.getPolyCount(),
            count2 = poly2.getPolyCount(),
            array2D = PolyHelper.create2DArray_Bool(count1, count2);
        for (var i = 0; count1 > i; i++) {
            for (var j = 0; count2 > j; j++)
                array2D[i][j] =
                    boundArray1[i].getRight() >= boundArray2[j].getLeft() ||
                    (boundArray1[i].getLeft() > boundArray2[j].getRight() && boundArray1[i].getBottom() >= boundArray2[j].getTop()) ||
                    boundArray1[i].getTop() > boundArray2[j].getBottom();
        }
        for (var k = 0; count2 > k; k++) {
            var l = false;
            for (var m = 0; !l && count1 > m; m++)
                l = array2D[m][k];
            l || poly2.mS(k, false);
        }
        if (polyOP == PolyOP.Intersection) {
            for (var n = 0; count1 > n; n++) {
                var o = false;
                for (var p = 0; !o && count2 > p; p++)
                    o = array2D[n][p];
                o || poly1.mS(n, false);
            }
        }
    }
    static oM(a, b) {
        if (null == a.nw) return (a.nw = new G(b)), a.nw;
        for (var c = null, d = a.nw, e = false; !e;)
            if (b < d.aV) {
                var f = d;
                (d = new G(b)),
                    (d.nextObj = f),
                    null == c ? (a.nw = d) : (c.nextObj = d),
                    (e = true);
            } else
                b > d.aV
                    ? null == d.nextObj
                        ? ((d.nextObj = new G(b)), (d = d.nextObj), (e = true))
                        : ((c = d), (d = d.nextObj))
                    : (e = true);
        return d;
    }
    static oQ(a, b) {
        if (null == a.od) a.od = b;
        else
            for (var c = false, d = null, e = a.od; !c;)
                b.ow.x < e.ow.x
                    ? (null == d ? (a.od = b) : (d.of = b), (b.of = e), (c = true))
                    : b.ow.x == e.ow.x && b.aT < e.aT
                        ? (null == d ? (a.od = b) : (d.of = b), (b.of = e), (c = true))
                        : null == e.of
                            ? ((e.of = b), (c = true))
                            : ((d = e), (e = e.of));
    }
    static oe(a, b) {
        if (null == a.nw) (a.nw = b), (b.ny = null), (b.nextObj = null);
        else
            for (var c = a.nw, d = null, e = false; !e;)
                b.nv < c.nv
                    ? ((b.ny = d),
                        (b.nextObj = c),
                        (c.ny = b),
                        null == d ? (a.nw = b) : (d.nextObj = b),
                        (e = true))
                    : b.nv == c.nv && b.aT < c.aT
                        ? ((b.ny = d),
                            (b.nextObj = c),
                            (c.ny = b),
                            null == d ? (a.nw = b) : (d.nextObj = b),
                            (e = true))
                        : ((d = c),
                            null == c.nextObj
                                ? ((c.nextObj = b), (b.ny = c), (b.nextObj = null), (e = true))
                                : (c = c.nextObj));
    }
    static oT(a, b) {
        if (null == a.oU) return (a.oU = new O(b)), void a.ox++;
        for (var c = a.oU, d = false; !d;)
            c.aV > b
                ? null == c.fR
                    ? ((c.fR = new O(b)), a.ox++, (d = true))
                    : (c = c.fR)
                : c.aV < b
                    ? null == c.oV
                        ? ((c.oV = new O(b)), a.ox++, (d = true))
                        : (c = c.oV)
                    : (d = true);
    }
    //lmtTable, scanBeamTreeEntries, poly1, 1, polyOP
    static ob(lmtTable, scanBeamTreeEntries, polypoly, d, polyOp) {
        var polyLogic = new PolyLogic();
        for (var g = 0; g < polypoly.getPolyCount(); g++) {
            var poly = polypoly.getPolyAt(g);
            if (poly.mQ(0)) {
                var count1 = 0,
                    count2 = 0;
                polyLogic = new PolyLogic();
                for (var k = 0; k < poly.getPolyLength(); k++) {
                    if (PolyBase.nn(poly, k)) {
                        polyLogic.o4(poly.getXAt(k), poly.getYAt(k));
                        PolyBase.oT(scanBeamTreeEntries, poly.getYAt(k));
                        ++count1;
                    }
                }
                for (var l = 0; count1 > l; l++) {
                    if (polyLogic.o5(l)) {
                        var n = PolyBase.nextIndex(l, count1);
                        for (var m = 1; polyLogic.o6(n); m++)
                            n = PolyBase.nextIndex(n, count1);

                        var o = l,
                            q = polyLogic.o7(count2);

                        q.bundleArray[1] = Bundle.Non;
                        q.oh[1][0] = 0;
                        q.oh[1][1] = 0;
                        for (var r = 0; m > r; r++) {
                            var s = polyLogic.o7(count2 + r),
                                t = polyLogic.o7(o);
                            (s.nv = t.eY.x);
                            (s.ow.x = t.eY.x);
                            (s.ow.y = t.eY.y);
                            (o = PolyBase.nextIndex(o, count1));
                            (t = polyLogic.o7(o));
                            (s.oi.x = t.eY.x);
                            (s.oi.y = t.eY.y);
                            (s.aT = (t.eY.x - s.ow.x) / (s.oi.y - s.ow.y));
                            (s.p = d);
                            (s.oq[0] = null);
                            (s.oq[1] = null);
                            (s.nextObj = null);
                            (s.ny = null);
                            (s.oA = m > 1 && m - 1 > r ? polyLogic.o7(count2 + r + 1) : null);
                            (s.o8 = m > 1 && r > 0 ? polyLogic.o7(count2 + r - 1) : null);
                            (s.of = null);
                            (s.on[0] = polyOp == PolyOP.Difference ? 1 : 0);
                            (s.on[1] = 0);
                        }
                        PolyBase.oQ(PolyBase.oM(lmtTable, polyLogic.o7(l).eY.y), q);
                        count2 += m;
                    }
                }
                for (var u = 0; count1 > u; u++) {
                    if (polyLogic.o9(u)) {
                        var w = PolyBase.prevIndex(u, count1);
                        for (var v = 1; polyLogic.o_(w); v++)
                            w = PolyBase.prevIndex(w, count1);

                        var y = u,
                            A = polyLogic.o7(count2);
                        A.bundleArray[1] = Bundle.Non;
                        A.oh[1][0] = 0;
                        A.oh[1][1] = 0;
                        for (var B = 0; v > B; B++) {
                            var C = polyLogic.o7(count2 + B),
                                D = polyLogic.o7(y);

                            (C.nv = D.eY.x);
                            (C.ow.x = D.eY.x);
                            (C.ow.y = D.eY.y);
                            (y = PolyBase.prevIndex(y, count1));
                            (D = polyLogic.o7(y));
                            (C.oi.x = D.eY.x);
                            (C.oi.y = D.eY.y);
                            (C.aT = (D.eY.x - C.ow.x) / (C.oi.y - C.ow.y));
                            (C.p = d);
                            (C.oq[0] = null);
                            (C.oq[1] = null);
                            (C.nextObj = null);
                            (C.ny = null);
                            (C.oA = v > 1 && v - 1 > B ? polyLogic.o7(count2 + B + 1) : null);
                            (C.o8 = v > 1 && B > 0 ? polyLogic.o7(count2 + B - 1) : null);
                            (C.of = null);
                            (C.on[0] = polyOp == PolyOP.Difference ? 1 : 0);
                            (C.on[1] = 0);
                        }
                        PolyBase.oQ(PolyBase.oM(lmtTable, polyLogic.o7(u).eY.y), A);
                        count2 += v;
                    }
                }
            }
            else poly.mS(0, true);
        }
        return polyLogic;
    }
    static nx(a, b, c, x, y) {
        return (
            null == a
                ? (a = new C(b, c, x, y, null))
                : a.aI.y > y
                    ? (a = new C(b, c, x, y, a))
                    : (a.nextObj = PolyBase.nx(a.nextObj, b, c, x, y)),
            a
        );
    }
}
class PolyBundle {
    __class__ = PolyBundle;
    static __name__ = ["PolyBundle"];
    constructor() {
        (this.oh = PolyHelper.create2DArray_Int(2, 2)),
            (this.oq = new Array(2)),
            (this.oi = new Point()),
            (this.bundleArray = new Array(2)),
            (this.ow = new Point()),
            (this.eY = new Point()),
            (this.on = new Array(2));
    }

    static createInstance() {
        return new PolyBundle;
    }

    nextObj = null;
    on = null;
    eY = null;
    ow = null;
    ny = null;
    nv = null;
    bundleArray = null;
    p = null;
    of = null;
    oi = null;
    aT = null;
    oA = null;
    o8 = null;
    oq = null;
    nu = null;
    oh = null;
}
class PolyLogic {
    __class__ = PolyLogic;
    static __name__ = ["z"];
    constructor() {
        this.bundlePoly = new Array(0);
    }

    bundlePoly = null;
    o4(x, y) {
        var c = PolyBundle.createInstance();
        (c.eY.x = x);
        (c.eY.y = y);
        this.bundlePoly.push(c);
    }
    o7(id) {
        return ObjMan.__cast(this.bundlePoly[id], PolyBundle);
    }
    o5(id) {
        var b = this.bundlePoly[id];
        return this.bundlePoly[PolyBase.prevIndex(id, this.bundlePoly.length)].eY.y >= b.eY.y
            ? this.bundlePoly[PolyBase.nextIndex(id, this.bundlePoly.length)].eY.y > b.eY.y
            : false;
    }
    o6(id) {
        return this.bundlePoly[PolyBase.nextIndex(id, this.bundlePoly.length)].eY.y > this.bundlePoly[id].eY.y;
    }
    o9(id) {
        var b = this.bundlePoly[id];
        return this.bundlePoly[PolyBase.prevIndex(id, this.bundlePoly.length)].eY.y > b.eY.y
            ? this.bundlePoly[PolyBase.nextIndex(id, this.bundlePoly.length)].eY.y >= b.eY.y
            : false;
    }
    o_(id) {
        return this.bundlePoly[PolyBase.prevIndex(id, this.bundlePoly.length)].eY.y > this.bundlePoly[id].eY.y;
    }
}
class PolyDefault {
    __class__ = PolyDefault;
    static __name__ = ["PolyDefault"];
    constructor(a) {
        null == a && (a = false),
            (this.polypoly = new Array(0)),
            (this.bMiddleShape = false),
            (this.bMiddleShape = a);
    }

    bMiddleShape = null;
    polypoly = null;
    addPointXY(a, b) {
        this.addPoint(new Point(a, b));
    }
    addPoint(a) {
        0 == this.polypoly.length && this.polypoly.push(new PolySimple());
        this.polypoly[0].addPoint(a);
    }
    addPoints(a) {
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            this.addPoint(c);
        }
    }
    addPoly(a) {
        if (this.polypoly.length > 0 && this.bMiddleShape)
            throw new Error("Cannot add polys to something designated as a middleShape.");
        this.polypoly.push(a);
    }
    addPolys(a) {
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            this.addPoly(c);
        }
    }
    isEmpty() {
        return 0 == this.polypoly.length;
    }
    getBounds() {
        if (0 == this.polypoly.length) return new BoundRect();
        if (1 == this.polypoly.length) return this.getPolyAt(0).getBounds();
        throw new Error("getBounds not supported on complex poly.");
    }
    getPolyAt(a) {
        return this.polypoly[a];
    }
    getPolyCount() {
        return this.polypoly.length;
    }
    getPolyLength() {
        return this.polypoly[0].getPolyLength();
    }
    getXAt(a) {
        return this.polypoly[0].getXAt(a);
    }
    getPointAt(a) {
        return this.polypoly[0].getPointAt(a);
    }
    clonePoly() {
        return this.polypoly[0].clonePoly();
    }
    mO(a) {
        if (!this.polypoly[0].mO(a)) return false;
        for (var b = 0; b < this.polypoly.length;) {
            var c = this.polypoly[b];
            if (c.getMiddleShape() && c.mO(a)) return false;
            ++b;
        }
        return true;
    }
    getYAt(a) {
        return this.polypoly[0].getYAt(a);
    }
    getMiddleShape() {
        if (this.polypoly.length > 1)
            throw new Error("Cannot call on a poly made up of more than one poly.");
        return this.bMiddleShape;
    }
    setMiddleShape(a) {
        if (this.polypoly.length > 1)
            throw new Error("Cannot call on a poly made up of more than one poly.");
        this.bMiddleShape = a;
    }
    mQ(a) {
        return this.polypoly[a].mQ(0);
    }
    mS(a, b) {
        if (1 != this.polypoly.length) throw new Error("Only applies to polys of size 1");
        this.polypoly[a].mS(0, b);
    }
    PolyIntersection(a) {
        return PolyBase.PolyIntersection(a, this, "PolyDefault");
    }
    PolyUnion(a) {
        return PolyBase.PolyUnion(a, this, "PolyDefault");
    }
    PolyExclusiveOR(a) {
        return PolyBase.PolyExclusiveOR(a, this, "PolyDefault");
    }
    PolyDifference(a) {
        return PolyBase.PolyDifference(a, this, "PolyDefault");
    }
    mU() {
        for (var a = 0, b = 0; b < this.getPolyCount(); b++) {
            var c = this.getPolyAt(b);
            a += c.mU() * (c.getMiddleShape() ? -1 : 1);
        }
        return a;
    }
    toString() {
        var str = "";
        for (var b = 0; b < this.polypoly.length; b++) {
            var poly = this.getPolyAt(b);
            str += "InnerPoly(" + b + ").middleShape=" + Std.string(poly.getMiddleShape());
            var ptArray = new Array(0);
            for (var e = 0; e < poly.getPolyLength(); e++)
                ptArray.push(new Point(poly.getXAt(e), poly.getYAt(e)));
            ptArray = PolyHelper.sortRegular(ptArray);
            for (var f = 0; f < ptArray.length; f++) {
                var g = ptArray[f];
                str += g.toString();
            }
        }
        return str;
    }
}
class PolySimple {
    __class__ = PolySimple;
    static __name__ = ["PolySimple"];
    constructor() {
        this.poly = new Array(0);
        this.St = true;
    }
    St = null;
    poly = null;
    toString() {
        return "PolySimple: num_points=" + this.getPolyLength();
    }
    addPointXY(a, b) {
        this.addPoint(new Point(a, b));
    }
    addPoint(a) {
        this.poly.push(a);
    }
    addPoints(a) {
        for (var b = 0; b < a.length;) {
            var c = a[b];
            ++b, this.addPoint(c);
        }
    }
    addPoly(a) {
        throw new Error("Cannot add poly to a simple poly.");
    }
    addPolys(a) {
        for (var b = 0; b < a.length;) {
            var c = a[b];
            ++b, this.addPoly(c);
        }
    }
    isEmpty() {
        return 0 == this.poly.length;
    }
    getBounds() {
        for (
            var a = Infinity, b = Infinity, c = -Infinity, d = -Infinity, e = 0;
            e < this.poly.length;

        ) {
            var f = this.getXAt(e),
                g = this.getYAt(e);
            a > f && (a = f),
                f > c && (c = f),
                b > g && (b = g),
                g > d && (d = g),
                ++e;
        }
        return new BoundRect(0 | a, 0 | b, (c - a) | 0, (d - b) | 0);
    }
    getPolyAt(a) {
        if (0 != a) throw new Error("PolySimple only has one poly");
        return this;
    }
    getPolyCount() {
        return 1;
    }
    getPolyLength() {
        return this.poly.length;
    }
    getXAt(a) {
        return this.poly[a].x;
    }
    getYAt(a) {
        return this.poly[a].y;
    }
    getPointAt(a) {
        return this.poly[a];
    }
    clonePoly() {
        return this.poly.slice();
    }
    mO(a) {
        var poly = this.clonePoly();
        var prevId = poly.length - 1;
        var d = false;
        for (var id = 0; id < poly.length; id++) {
            ((poly[id].y < a.y && poly[prevId].y >= a.y) || (poly[prevId].y < a.y && poly[id].y >= a.y)) &&
                poly[id].x + ((a.y - poly[id].y) / (poly[prevId].y - poly[id].y)) * (poly[prevId].x - poly[id].x) <
                a.x && (d = !d);
            prevId = id;
        }
        return d;
    }
    getMiddleShape() {
        return false;
    }
    setMiddleShape(a) {
        throw new Error("PolySimple cannot be a middleShape");
    }
    mQ(a) {
        if (0 != a) throw new Error("PolySimple only has one poly");
        return this.St;
    }
    mS(a, b) {
        if (0 != a) throw new Error("PolySimple only has one poly");
        this.St = b;
    }
    PolyIntersection(a) {
        return PolyBase.PolyIntersection(this, a, "PolySimple");
    }
    PolyUnion(a) {
        return PolyBase.PolyUnion(this, a, "PolySimple");
    }
    PolyExclusiveOR(a) {
        return PolyBase.PolyExclusiveOR(a, this, "PolySimple");
    }
    PolyDifference(a) {
        return PolyBase.PolyDifference(a, this, "PolySimple");
    }
    mU() {
        if (this.getPolyLength() < 3) return 0;
        var x0 = this.getXAt(0);
        var y0 = this.getYAt(0);
        var c = 0;
        for (var d = 1; d < this.getPolyLength() - 1; d++) {
            var dy = this.getYAt(d + 1) - this.getYAt(d);
            var dx = this.getXAt(d + 1) - this.getXAt(d);
            c += dx * (y0 - this.getYAt(d)) - (x0 - this.getXAt(d)) * dy;
        }
        return (c = 0.5 * Math.abs(c));
    }
}
class PolyMath {
    static __name__ = ["PolyMath"];
    constructor() { }
    static PolyIntersection(poly1, poly2) {
        var polyDefault1 = new PolyDefault();
        for (var d = poly1.get_numOfPoints(), e = 0; d > e; e++) {
            polyDefault1.addPoint(poly1.getPointAt(e));
        }
        var polyDefault2 = new PolyDefault();
        for (d = poly2.get_numOfPoints(), e = 0; d > e; e++) {
            polyDefault2.addPoint(poly2.getPointAt(e));
        }

        var g = PolyBase.PolyIntersection(polyDefault1, polyDefault2);
        if (g.isEmpty()) return null;

        var h = g.getPolyCount(),
            i = new Array(0);
        for (e = 0; h > e; e++) {
            var j = g.getPolyAt(e).clonePoly();
            i = null == j ? i.slice() : i.concat(j);
        }
        var k = i.length,
            l = new Array(0),
            m = 0;
        for (e = 0; k > e; e++) {
            var n = i[e],
                o = m > 0 && PolyMath.lS ? l[m - 1] : null;
            if (null != o && PointComparator.EqualPoint(o, n, 0.01)) {

            }
            else {
                var p = new PointEx;
                p.setTo(n.x, n.y);
                l[m] = p;
                ++m;
            }
        }

        if (l.length > 3) {
            PolyMath.PolyRegulate(l);
            var geoPolygon = new GeoPolygon;
            geoPolygon.setTo(l);
            return geoPolygon;
        }
        return null;
    }
    static PolyDifference(a, b) {
        for (var c = new PolyDefault(), d = a.get_numOfPoints(), e = 0, f = 0; d > f;) {
            var g = a.getPointAt(f),
                h = e > 0 ? c.getPointAt(e - 1) : null;
            null != h && PointComparator.EqualPoint(h, g) ? ++f : (c.addPoint(g), ++e, ++f);
        }
        var i = new PolyDefault();
        for (d = b.get_numOfPoints(), e = 0, f = 0; d > f;) {
            var j = b.getPointAt(f),
                k = null;
            e > 0 && ((k = i.getPointAt(e - 1)), PointComparator.EqualPoint(k, j))
                ? ++f
                : (i.addPoint(j), ++e, ++f);
        }
        var l = PolyBase.PolyDifference(c, i).clonePoly(),
            m = l.length,
            n = new Array(0);
        for (e = 0, f = 0; m > f;) {
            var o = l[f],
                p = null;
            e > 0 && ((p = l[e - 1]), PointComparator.EqualPoint(p, o))
                ? ++f
                : ((n[e] = o), ++e, ++f);
        }
        var q = new GeoPolygon;
        return q.setTo(n), q;
    }
    static PolyRegulate(a) {
        for (var len = a.length, c = 0; len > c;) {
            var d = c + 1,
                e = c + 2;
            d >= len && (d -= len);
            e >= len && (e -= len);
            var f = a[c],
                g = a[d],
                h = a[e];
            0 == TriangleMath.calcWinding(f.x, f.y, h.x, h.y, g.x, g.y) && (a.splice(d, 1), --len, --c),
                ++c;
        }
    }
}
PolyMath.lS = true;

export {
    PolyMath
}
