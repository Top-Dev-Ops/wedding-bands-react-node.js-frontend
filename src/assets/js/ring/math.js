/* eslint-disable no-unused-expressions */
import { ObjMan, StringUtil, Std, Int, Float, Bool } from "./objman.js"
import {
    Point, Rectangle, PointEx, Vect2, Vector3D, Triangle, Matrix, LineIntersectBuilder,
    Matrix3D, GeoPolygon, FacePolygon, Face4, Face3, TriangleMath,
    SimpleGeometryData, MySimpleGeometryData, SimpleMeshData,
    ArcBase, Arc, Circle, Line, ShapesWrapper, PointComparator, SimpleGeometryMergeHandler
} from "./geometry.js"
import { GeoNumComparor, ProfileMeta } from './meta';
import { MyMap, globalMap, KMap } from './map';
import { MetaKeyGenerator } from './calc';

class BorderIndexMath {
    static __name__ = ["BorderIndexMath"];
    static isEquivalent(a, b) {
        return (BorderIndexMath.check_Left(a) && BorderIndexMath.check_Left(b)) ||
            (BorderIndexMath.check_Right(a) && BorderIndexMath.check_Right(b)) ||
            (BorderIndexMath.check_Top(a) && BorderIndexMath.check_Top(b))
            ? true
            : BorderIndexMath.check_Bottom(a)
                ? BorderIndexMath.check_Bottom(b)
                : false;
    }
    static check_Right(a) {
        return 0 != (BorderIndexMath.RIGHT & a);
    }
    static check_Left(a) {
        return 0 != (BorderIndexMath.LEFT & a);
    }
    static check_Top(a) {
        return 0 != (BorderIndexMath.TOP & a);
    }
    static check_Bottom(a) {
        return 0 != (BorderIndexMath.BOTTOM & a);
    }
}
BorderIndexMath.NONE = 0;
BorderIndexMath.RIGHT = 1;
BorderIndexMath.LEFT = 2;
BorderIndexMath.TOP = 4;
BorderIndexMath.BOTTOM = 8;

class ShapeIntersectWrapper {
    __class__ = ShapeIntersectWrapper;
    static __name__ = ["ShapeIntersectWrapper"];
    shape = null;
    shape1 = null;
    intersectionPoints = null;
    constructor() {
        this.intersectionPoints = new Array(0);
    }

    get_intersectionPoints() {
        return this.intersectionPoints;
    }
}
class PosWrapper {
    __class__ = PosWrapper;
    static __name__ = ["PosWrapper"];
    constructor(start, end) {
        null == end && (end = 0);
        null == start && (start = 0);
        this.start = start;
        this.end = end;
        this.bChanged = true;
    }

    static isTopologyOK(start, end, start1, end1) {
        return (start > start1 ? start : start1) > (end1 > end ? end : end1) ? false : true;
    }
    static tg(a, b, c, d) {
        return a >= c && d >= b ? true : false;
    }
    static th(a, b, c, d, e) {
        return (
            null == e && (e = 1e-6), GeoNumComparor.isNotLess(a, c, e) && GeoNumComparor.isNotGreater(b, d, e) ? true : false
        );
    }
    static checkTopology(start, end, start1, end1) {
        return PosWrapper.isTopologyOK(start, end, start1, end1)
            ? true
            : (++start, ++end,
                PosWrapper.isTopologyOK(start, end, start1, end1)
                    ? true
                    : ((start -= 2), (end -= 2), PosWrapper.isTopologyOK(start, end, start1, end1) ? true : false));
    }
    static tj(a, b, c, d) {
        return PosWrapper.tg(a, b, c, d)
            ? true
            : (++a,
                ++b,
                PosWrapper.tg(a, b, c, d)
                    ? true
                    : ((a -= 2), (b -= 2), PosWrapper.tg(a, b, c, d) ? true : false));
    }
    static tk(a, b, c, d, e) {
        return (
            null == e && (e = 1e-6),
            PosWrapper.th(a, b, c, d, e)
                ? true
                : (++a,
                    ++b,
                    PosWrapper.th(a, b, c, d, e)
                        ? true
                        : ((a -= 2), (b -= 2), PosWrapper.th(a, b, c, d, e) ? true : false))
        );
    }

    bChanged = null;
    start = null;
    get_start() {
        return this.start;
    }
    set_start(a) {
        return this.start == a ? this.start : ((this.start = a), (this.bChanged = true), this.start);
    }
    length = null;
    get_length() {
        return this.bChanged && this.calcLength(), this.length;
    }
    end = null;
    get_end() {
        return this.end;
    }
    set_end(a) {
        return this.end == a ? this.end : ((this.end = a), (this.bChanged = true), this.end);
    }
    tl(a) {
        return this.get_start() <= a && this.get_end() >= a ? true : false;
    }
    contains(other) {
        var start, end, start1, end1;
        return (
            this.start < this.end
                ? ((start = this.start), (end = this.end))
                : ((start = this.end), (end = this.start)),
            other.get_start() < other.get_end()
                ? ((start1 = other.get_start()), (end1 = other.get_end()))
                : ((start1 = other.get_end()), (end1 = other.get_start())),
            PosWrapper.isTopologyOK(start, end, start1, end1)
        );
    }
    isContainedIn(a) {
        return this.get_start() >= a.get_start() && this.get_end() <= a.get_end()
            ? true
            : false;
    }
    tr(a) {
        return PosWrapper.tj(this.start, this.end, a.get_start(), a.get_end());
    }
    getIntersection(a) {
        var start, end, start1, end1;
        this.start < this.end
            ? ((start = this.start), (end = this.end))
            : ((start = this.end), (end = this.start)),
            a.get_start() < a.get_end()
                ? (start1 = a.get_start(), end1 = a.get_end())
                : (start1 = a.get_end(), end1 = a.get_start());
        var newStart = start > start1 ? start : start1,
            newEnd = end1 > end ? end : end1;
        return (1e-6 >= (newEnd > newStart ? newEnd - newStart : newStart - newEnd) ? false : newStart > newEnd)
            ? null
            : new PosWrapper(newStart, newEnd);
    }
    tt() {
        this.get_start() <= 0 && this.get_end() <= 0
            ? (this.set_start(1 + this.get_start()), this.set_end(1 + this.get_end()))
            : this.get_start() >= 1 &&
            this.get_end() >= 1 &&
            (this.set_start(this.get_start() - 1),
                this.set_end(this.get_end() - 1));
    }
    calcLength() {
        (this.length = this.end - this.start), (this.bChanged = false);
    }
}

class ShapeMath {
    constructor() { }
    static isIntersect(shape, shapesWrapper) {
        for (var c = shapesWrapper.get_numOfShapes(), d = 0; c > d; d++) {
            var e = ShapeMath.getShapeShapeIntersect(shape, shapesWrapper.getShapeAt(d));
            if (
                null != e &&
                null != e.get_intersectionPoints() &&
                0 != e.get_intersectionPoints().length
            )
                return true;
        }
        return false;
    }
    static getShapeShapeIntersect(a, b) {
        var shapeIntersectWrapper;
        if (ObjMan.__instanceof(b, Line))
            shapeIntersectWrapper = ShapeMath.getShapeLineIntersect(a, ObjMan.__cast(b, Line));
        else if (ObjMan.__instanceof(b, Arc))
            shapeIntersectWrapper = ShapeMath.getShapeArcIntersect(a, ObjMan.__cast(b, Arc));
        else {
            if (!ObjMan.__instanceof(b, ArcBase))
                throw new Error("Invalid type of shape: " + Std.string(b));
            shapeIntersectWrapper = ShapeMath.getShapeArcbaseIntersect(a, ObjMan.__cast(b, ArcBase));
        }
        return shapeIntersectWrapper;
    }
    static getShapeLineIntersect(a, line) {
        var shapeIntersectWrapper;
        if (ObjMan.__instanceof(a, Line))
            shapeIntersectWrapper = ShapeMath.getLineLineIntersect(ObjMan.__cast(a, Line), line);
        else if (ObjMan.__instanceof(a, Arc))
            shapeIntersectWrapper = ShapeMath.getArcLineIntersect(ObjMan.__cast(a, Arc), line);
        else {
            if (!ObjMan.__instanceof(a, ArcBase))
                throw new Error("Invalid type of shape: " + Std.string(a));
            shapeIntersectWrapper = ShapeMath.getArcbaseLineIntersect(ObjMan.__cast(a, ArcBase), line);
        }
        return shapeIntersectWrapper;
    }
    static getShapeArcbaseIntersect(a, b) {
        var c;
        if (ObjMan.__instanceof(a, Line)) {
            c = ShapeMath.getArcbaseLineIntersect(b, ObjMan.__cast(a, Line));
            var d = c.shape1;
            c.shape1 = c.shape;
            c.shape = d;
        }
        else if (ObjMan.__instanceof(a, Arc))
            c = ShapeMath.getArcArcbaseIntersect(ObjMan.__cast(a, Arc), b);
        else {
            if (!ObjMan.__instanceof(a, ArcBase))
                throw new Error("Invalid type of shape: " + Std.string(a));
            c = ShapeMath.getArcbaseArcbaseIntersect(ObjMan.__cast(a, ArcBase), b);
        }
        return c;
    }
    static getShapeArcIntersect(a, b) {
        var c, d;
        if (ObjMan.__instanceof(a, Line)) {
            c = ShapeMath.getArcLineIntersect(b, ObjMan.__cast(a, Line));
            d = c.shape1;
            c.shape1 = c.shape;
            c.shape = d;
        }
        else if (ObjMan.__instanceof(a, Arc))
            c = ShapeMath.getArcArcIntersect(ObjMan.__cast(a, Arc), b);
        else {
            if (!ObjMan.__instanceof(a, ArcBase))
                throw new Error("Invalid type of shape: " + Std.string(a));
            c = ShapeMath.getArcArcbaseIntersect(b, ObjMan.__cast(a, ArcBase));
            d = c.shape1;
            c.shape1 = c.shape;
            c.shape = d;
        }
        return c;
    }
    static getShapeShapeOrientation(a, b) {
        var c = "invalid";
        if (ObjMan.__instanceof(a, Line))
            c = ShapeMath.getShapeLineOrientation(ObjMan.__cast(a, Line), b);
        else if (ObjMan.__instanceof(a, Arc))
            c = ShapeMath.getShapeArcOrientation(ObjMan.__cast(a, Arc), b);
        else {
            if (!ObjMan.__instanceof(a, ArcBase))
                throw new Error("Invalid type of shape: " + Std.string(a));
            c = ShapeMath.getShapeArcbaseOrientation(ObjMan.__cast(a, ArcBase), b);
        }
        return c;
    }
    static checkOrientations(shape, shapesWrapper, c, d) {
        if (null != d) {
            var tH = new Rectangle;
            var tI = new Rectangle;

            shape.calcBoundingRect(tH, ShapeMath.TOLERANCE);
            shapesWrapper.calcBoundingRect(tI, ShapeMath.TOLERANCE);
            if (!tI.containsRect(tH)) {
                if ("outside" == d) return true;
                if ("inside" == d) return false;
            }
        }
        for (var e = shapesWrapper.get_numOfShapes(), f = 0; e > f; f++) {
            if (ShapeMath.getShapeShapeOrientation(shapesWrapper.getShapeAt(f), shape) != c) return false;
        }
        return true;
    }
    static t1(a, b) {
        var c,
            d = ShapeMath.extractXIntersectedPoints(a, b);
        if (0 == d.length) return null;
        c = d[0];
        for (var e = 1; e < d.length; e++)
            c.get_posY() < d[e].get_posY() && (c = d[e]);
        return c;
    }
    static t2(a, b) {
        var c,
            d = ShapeMath.extractXIntersectedPoints(a, b);
        if (0 == d.length) return null;
        c = d[0];
        for (var e = 1; e < d.length;)
            c.get_posY() > d[e].get_posY() && (c = d[e]), ++e;
        return c;
    }
    static extractXIntersectedPoints(a, b) {
        var c = new Array(0);
        if (a.get_minX() <= b && a.get_maxX() >= b) {
            var d = a.calcPosOnXShape(b);
            if (null == d) return null;
            for (var e = 0; e < d.length; e++)
                c.push(a.getVectorAtPos(d[e]));
        }
        return c;
    }
    static arcInterpolate(a, b, c, d) {
        var e = a.getDirectionAtPos(0),
            f = b.getDirectionAtPos(0),
            g = e.x * c,
            h = e.y * c,
            i = f.x * c,
            j = f.y * c;
        d && ((g *= -1), (h *= -1), (i *= -1), (j *= -1));
        var k = TriangleMath.getLineIntersection(
            a.get_startX() + g,
            a.get_startY() + h,
            a.get_endX() + g,
            a.get_endY() + h,
            b.get_startX() + i,
            b.get_startY() + j,
            b.get_endX() + i,
            b.get_endY() + j,
            false,
            false
        );
        var l = TriangleMath.getLineIntersection(
            a.get_startX(),
            a.get_startY(),
            a.get_endX(),
            a.get_endY(),
            k.x,
            k.y,
            k.x - e.x,
            k.y - e.y,
            false,
            false
        );
        var m = TriangleMath.getLineIntersection(
            k.x,
            k.y,
            k.x - f.x,
            k.y - f.y,
            b.get_startX(),
            b.get_startY(),
            b.get_endX(),
            b.get_endY(),
            false,
            false
        );
        a.initParam(a.get_startX(), a.get_startY(), l.x, l.y);
        b.initParam(m.x, m.y, b.get_endX(), b.get_endY());
        var arc = new Arc;
        arc.makeArcBase(k, l, m, d ? 1 : -1);
        arc.set_invertedNormals(!d);
        return arc;
    }
    static getLineLineIntersect(line, line1) {
        var shapeIntersectWrapper = new ShapeIntersectWrapper;
        shapeIntersectWrapper.shape = line;
        shapeIntersectWrapper.shape1 = line1;
        var tH = new Rectangle;
        var tI = new Rectangle;
        line.calcBoundingRect(tH, ShapeMath.TOLERANCE);
        line1.calcBoundingRect(tI, ShapeMath.TOLERANCE);

        if (!tH.intersects(tI))
            return shapeIntersectWrapper;
        var d = LineIntersectBuilder.calcIntersection(line.get_startX(), line.get_startY(), line.get_endX(), line.get_endY(),
            line1.get_startX(), line1.get_startY(), line1.get_endX(), line1.get_endY(),
            true, true, null
        );
        null != d && (shapeIntersectWrapper.get_intersectionPoints()[0] = d);
        return shapeIntersectWrapper;
    }
    static getArcbaseLineIntersect(arc, line) {
        var shapeIntersectWrapper = new ShapeIntersectWrapper;
        shapeIntersectWrapper.shape = arc;
        shapeIntersectWrapper.shape1 = line;
        var tH = new Rectangle;
        var tI = new Rectangle;
        arc.calcBoundingRect(tH, ShapeMath.TOLERANCE);
        line.calcBoundingRect(tI, ShapeMath.TOLERANCE);
        if (!tH.intersects(tI))
            return shapeIntersectWrapper;
        var d = line.get_startX(),
            e = line.get_startY(),
            f = line.get_endX(),
            g = line.get_endY(),
            h = f - d,
            i = g - e,
            j = Math.sqrt(h * h + i * i),
            k = (d - arc.get_centerX()) * (g - arc.get_centerY()) -
                (f - arc.get_centerX()) * (e - arc.get_centerY()),
            l = arc.get_radius() * arc.get_radius() * j * j - k * k;
        if (0 > l) return shapeIntersectWrapper;
        l = Math.sqrt(l);
        var m = k * i,
            n = l * h,
            o = -k * h,
            p = i * l,
            q = j * j,
            s = (m - n) / q + arc.get_centerX(),
            t = (o - p) / q + arc.get_centerY(),
            pt = new Point;
        pt.setTo(s, t);
        line.isOnShape(pt) && shapeIntersectWrapper.get_intersectionPoints().push(pt);
        if ((l > 0)) {
            var x = (m + n) / q + arc.get_centerX(),
                y = (o + p) / q + arc.get_centerY(),
                pt = new Point;
            pt.setTo(x, y);
            line.isOnShape(pt) && shapeIntersectWrapper.get_intersectionPoints().push(pt);
        }
        return shapeIntersectWrapper;
    }
    static getArcLineIntersect(arc, line) {
        var c = ShapeMath.getArcbaseLineIntersect(arc, line);
        c.shape = arc;
        if (null == c.get_intersectionPoints()) return c;

        for (var d = 0; d < c.get_intersectionPoints().length;)
            arc.isOnShape(c.get_intersectionPoints()[d]) ||
                (c.get_intersectionPoints().splice(d, 1), --d),
                ++d;
        return c;
    }
    static getArcbaseArcbaseIntersect(a, b) {
        var shapeIntersectWrapper = new ShapeIntersectWrapper;
        shapeIntersectWrapper.shape = a;
        shapeIntersectWrapper.shape1 = b;
        var tH = new Rectangle;
        var tI = new Rectangle;
        a.calcBoundingRect(tH, ShapeMath.TOLERANCE);
        b.calcBoundingRect(tI, ShapeMath.TOLERANCE);
        if (!tH.intersects(tI))
            return shapeIntersectWrapper;
        var d = a.get_centerX(),
            e = b.get_centerX(),
            f = a.get_centerY(),
            g = b.get_centerY(),
            h = a.get_radius(),
            i = b.get_radius(),
            j = d - e,
            k = f - g,
            l = j * j + k * k;
        if (0 > l) return shapeIntersectWrapper;
        l = Math.sqrt(l);
        var m = (h * h - i * i + l * l) / (2 * l);
        (j = e - d), (k = g - f);
        var n = m / l,
            o = Math.sqrt(h * h - m * m) / l,
            p = new Point;
        p.setTo(n * j + o * k + d, n * k - o * j + f);
        shapeIntersectWrapper.get_intersectionPoints().push(p);
        if (l > 0) {
            var q = new Point;
            q.setTo(n * j - o * k + d, n * k + o * j + f);
            shapeIntersectWrapper.get_intersectionPoints().push(q);
        }
        return shapeIntersectWrapper;
    }
    static getArcArcbaseIntersect(a, b) {
        var c = ShapeMath.getArcbaseArcbaseIntersect(a, b);
        if (((c.shape = a), null == c.get_intersectionPoints())) return c;
        for (var d = 0; d < c.get_intersectionPoints().length;)
            a.isOnShape(c.get_intersectionPoints()[d]) ||
                (c.get_intersectionPoints().splice(d, 1), --d),
                ++d;
        return c;
    }
    static getArcArcIntersect(a, b) {
        var c = ShapeMath.getArcArcbaseIntersect(a, b);
        c.shape1 = b;
        if (null == c.get_intersectionPoints())
            return c;
        for (var d = 0; d < c.get_intersectionPoints().length; d++) {
            b.isOnShape(c.get_intersectionPoints()[d]) ||
                (c.get_intersectionPoints().splice(d, 1), --d);
        }
        return c;
    }
    static getShapeLineOrientation(line, b) {
        var vAB = new Point;
        b.getPointAtPos(0.5, vAB);
        var startX = line.get_startX(),
            startY = line.get_startY(),
            endX = line.get_endX(),
            endY = line.get_endY(),
            g = (endX - startX) * (vAB.y - startY) - (endY - startY) * (vAB.x - startX),
            h = -((g > 0 ? g : 0 - g) <= LineIntersectBuilder.tolerance ? 0 : g > 0 ? 1 : -1);
        h = line.get_invertedNormals() ? -h : h;
        return ShapeMath.getOrientation(h);
    }
    static getShapeArcbaseOrientation(a, b) {
        var vAB = new Point;
        b.getPointAtPos(0.5, vAB);
        var c = a.get_centerX(),
            d = a.get_centerY(),
            e = a.get_radius(),
            f = vAB.x - c,
            g = vAB.y - d,
            h = f * f + g * g,
            i = e * e;
        return "outside" == ShapeMath.getOrientation(h == i ? 0 : h > i ? -1 : 1)
            ? a.get_invertedNormals()
                ? "inside"
                : "outside"
            : a.get_invertedNormals()
                ? "outside"
                : "inside";
    }
    static getShapeArcOrientation(a, b) {
        var vAC = new Point;
        var vAB = new Point;
        b.getPointAtPos(1e-7, vAB);
        b.getPointAtPos(1 - 1e-7, vAC);
        var c,
            d = a.get_centerX(),
            e = a.get_centerY(),
            f = a.get_radius(),
            g = vAB.x - d,
            h = vAB.y - e,
            i = g * g + h * h,
            j = f * f,
            k = i == j ? 0 : i > j ? -1 : 1,
            l = a.get_centerX(),
            m = a.get_centerY(),
            n = a.get_radius(),
            o = vAC.x - l,
            p = vAC.y - m,
            q = o * o + p * p,
            r = n * n;
        return (
            -1 == k && -1 == (q == r ? 0 : q > r ? -1 : 1)
                ? ((k = a.get_invertedNormals() ? -k : k), (c = ShapeMath.getOrientation(k)))
                : (c = a.get_invertedNormals() ? "outside" : "inside"),
            c
        );
    }
    static getOrientation(a) {
        var b;
        b = 1 == a ? "inside" : -1 == a ? "outside" : "invalid";
        return b;
    }
}
ShapeMath.TOLERANCE = 1e-6;


class RingMath {
    constructor() { }
    static sd(a) {
        for (
            var b = new ShapesWrapper,
            count = a.get_numOfPoints(),
            d = 0;
            count > d; d++

        ) {
            var curPt = a.getPointAt(d),
                nextPt = d == count - 1 ? a.getPointAt(0) : a.getPointAt(d + 1),
                line = new Line;
            line.initParam(curPt.x, curPt.y, nextPt.x, nextPt.y);
            b.addShape(line);
        }
        return b;
    }
    static makeLinesArray(ptArray) {
        var shapesWrapper = new ShapesWrapper,
            ptCount = ptArray.length;
        for (var d = 0; ptCount > d; d++) {
            var pt1 = ptArray[d],
                pt2 = d == ptCount - 1 ? ptArray[0] : ptArray[d + 1],
                line = new Line;
            line.initParam(pt1.x, pt1.y, pt2.x, pt2.y);
            shapesWrapper.addShape(line);
        }
        return shapesWrapper;
    }
    static sg(a, b) {
        for (var c = a.get_numOfShapes(), d = 0; c > d;)
            b.hasCommonMeta(a.getShapeAt(d)) && (a.removeShapes(d, 1), --d, --c), ++d;
    }
    static getMetaMatchedShapes(a, engravingMetaDataMap) {
        var shapesArray = new Array(0);
        for (var id = 0; a.get_numOfShapes() > id; id++) {
            var shape = a.getShapeAt(id);
            if (engravingMetaDataMap.hasCommonMeta(shape))
                shapesArray.push(shape);
        }
        return shapesArray;
    }
    static filterProfiles(a, filter) {
        for (var c = new Array(0), d = a.get_numOfShapes(), e = 0; d > e; e++) {
            var f = a.getShapeAt(e);
            f.getMetadata(ProfileMeta.PROFILE_SURFACE) == filter && c.push(f);
        }
        return c;
    }
    static getMatchedShape(shapesWrapper, X0) {
        for (var c = null, prevPt = null, e = shapesWrapper.get_numOfShapes(), f = 0; e > f; f++) {
            var shape = shapesWrapper.getShapeAt(f);
            if (shape.get_minX() <= X0 && shape.get_maxX() >= X0) {
                var posArray = shape.calcPosOnXShape(X0);
                if (null == posArray) {
                    continue;
                }
                for (var i = 0; i < posArray.length; i++) {
                    var curPt = shape.getVectorAtPos(posArray[i]);
                    if (null == prevPt || prevPt.get_posY() > curPt.get_posY()) {
                        prevPt = curPt;
                        c = shape;
                    }
                }
            }
        }
        return c;
    }
    static sp(shapesWrapper, metaKeyArray) {
        var myMap = new MyMap();
        var shapesWrapperArray = new Array(0);
        for (var f = 0; shapesWrapper.get_numOfShapes() > f; f++) {
            var shape = shapesWrapper.getShapeAt(f);
            var key = MetaKeyGenerator.generateMetaKey(metaKeyArray, shape);
            var newShapesWrapper = (null != globalMap[key]) ? myMap.getReserved(key) : myMap.map[key];
            null == newShapesWrapper &&
                (newShapesWrapper = new ShapesWrapper,
                    null != globalMap[key] ? myMap.setReserved(key, newShapesWrapper) : (myMap.map[key] = newShapesWrapper)),
                newShapesWrapper.addShape(shape);
        }
        var kMap = new KMap(myMap, myMap.arrayKeys());
        for (; kMap.hasNext();)
            shapesWrapperArray.push(kMap.next());
        return shapesWrapperArray;
    }
    static getIntersectionShapes(engravingPosWrapper, shapesWrapper) {
        var shapesArray = new Array(0),
            count = shapesWrapper.get_numOfShapes(),
            posWrapper1 = new PosWrapper(),
            posWrapper2 = new PosWrapper();

        for (var id = 0; count > id;) {
            var shape = shapesWrapper.getShapeAt(id);
            posWrapper1.set_start(shape.get_minX());
            posWrapper1.set_end(shape.get_maxX());
            if (engravingPosWrapper.contains(posWrapper1)) {
                for (var i = 0; i < shapesArray.length;) {
                    var shape1 = shapesArray[i];
                    posWrapper2.set_start(shape1.get_minX());
                    posWrapper2.set_end(shape1.get_maxX());
                    if (posWrapper1.contains(posWrapper2) && shape.get_maxY() > shape1.get_maxY()) {
                        shapesArray.splice(i, 1);
                        --i;
                    }
                    ++i;
                }
                shapesArray.push(shape);
            }
            ++id;
        }
        return shapesArray;
    }
    static extractPointExArray(shapesWrapper, bOpen, c) {
        null == c && (c = true);
        null == bOpen && (bOpen = false);
        var exPointArray = new Array(0),
            e = 0,
            count = shapesWrapper.get_numOfShapes();
        c && (shapesWrapper = shapesWrapper.clone(null), shapesWrapper.rH());
        for (var g = 0; count > g; g++) {
            var shape = shapesWrapper.getShapeAt(g),
                i = shape.getPointExs(shape.get_resolution());
            if (bOpen) {
                for (var j = 0; j < i.length; j++) {
                    0 != e
                        ? PointComparator.EqualPoint(i[j], exPointArray[e - 1]) || (exPointArray[e++] = i[j])
                        : (exPointArray[e++] = i[j]);
                }
            }
            else exPointArray = null == i ? exPointArray.slice() : exPointArray.concat(i);
        }
        bOpen && PointComparator.EqualPoint(exPointArray[0], exPointArray[exPointArray.length - 1]) && exPointArray.pop();
        return exPointArray;
    }
    static sC(a, b, c) {
        for (var d = b.get_numOfShapes(), e = 0; d > e;) {
            if (!ShapeMath.checkOrientations(b.getShapeAt(e), a, c)) return false;
            ++e;
        }
        return true;
    }
    static extractCircleIntersects(shapesWrapper, centerX, centerY, radius) {
        var circle = new Circle;
        circle.initParam(radius, centerX, centerY);
        var hh = RingMath.extractShapeIntersectedPoints(shapesWrapper, circle);
        return hh;
    }
    static sN(a, b, c, d) {
        var e = new Array(0),
            f = new Circle;
        f.initParam(d, b, c);
        for (var g = new Point(b, c), h = a.get_numOfShapes(), i = 0; h > i;) {
            var j = a.getShapeAt(i);
            if (Point.distance(j.getPointAtPos(0), g) < d) e.push(j), ++i;
            else if (Point.distance(j.getPointAtPos(1), g) < d) e.push(j), ++i;
            else {
                var k = ShapeMath.getShapeShapeIntersect(j, f);
                null != k.get_intersectionPoints() &&
                    0 != k.get_intersectionPoints().length &&
                    e.push(j),
                    ++i;
            }
        }
        return e;
    }
    static findIntersects(shapesWrapper, lineShapeWrapper, c) {
        null == c && (c = true);
        var pt = new Point;
        var shapeArray = new Array(0);
        var e = shapesWrapper.get_numOfShapes();
        for (var f = 0; e > f; f++) {
            var shape = shapesWrapper.getShapeAt(f);
            if (ShapeMath.isIntersect(shape, lineShapeWrapper))
                shapeArray.push(shape);
            else {
                if (c) {
                    shape.getPointAtPos(0, pt);
                    if (RingMath.sT(lineShapeWrapper, pt.x, pt.y, -1)) {
                        shapeArray.push(shape);
                        continue;
                    }
                    shape.getPointAtPos(1, pt);
                    if (RingMath.sT(lineShapeWrapper, pt.x, pt.y, -1)) {
                        shapeArray.push(shape);
                        continue;
                    }
                } else if (ShapeMath.checkOrientations(shape, lineShapeWrapper, "inside")) {
                    shapeArray.push(shape);
                    continue;
                }
            }
        }
        return shapeArray;
    }
    static sT(a, b, c, d) {
        var vAC = new Point;
        var vAB = new Point;
        for (var e = a.get_numOfShapes(), f = 0; e > f;) {
            var g = ObjMan.__cast(a.getShapeAt(f), Line);
            if (
                (g.getPointAtPos(0, vAB),
                    g.getPointAtPos(1, vAC),
                    d != TriangleMath.calcWinding(vAB.x, vAB.y, vAC.x, vAC.y, b, c))
            )
                return false;
            ++f;
        }
        return true;
    }
    static makeLineShapeWrapper(ptArray) {
        var shapeArray = new ShapesWrapper;
        for (var k = 0; ptArray.length > k; k++) {
            var pt1 = ptArray[k],
                pt2 = k == ptArray.length - 1 ? ptArray[0] : ptArray[k + 1],
                line = new Line;
            line.initParam(pt1.x, pt1.y, pt2.x, pt2.y);
            shapeArray.addShape(line);
        }
        return shapeArray;
    }
    static sO(shapesWrapper, Shape0) {
        for (var c = new Array(0), d = shapesWrapper.get_numOfShapes(), e = 0; d > e; e++) {
            var f = ShapeMath.getShapeShapeIntersect(shapesWrapper.getShapeAt(e), Shape0);
            if (null != f.get_intersectionPoints()) {
                for (var g = 0; g < f.get_intersectionPoints().length; g++)
                    c.push(f.get_intersectionPoints()[g]);
            }
        }
        return c;
    }
    static extractXIntersectBottomPoint(shapesWrapper, X0) {
        var pt,
            ptArray = RingMath.extractXIntersectedPoints(shapesWrapper, X0);
        if (0 == ptArray.length) return null;
        pt = ptArray[0];
        for (var e = 1; e < ptArray.length;)
            pt.get_posY() < ptArray[e].get_posY() && (pt = ptArray[e]), ++e;
        return pt;
    }
    static extractXIntersectTopPoint(shapesWrapper, X0) {
        var pt, ptArray = RingMath.extractXIntersectedPoints(shapesWrapper, X0);
        if (0 == ptArray.length) return null;
        pt = ptArray[0];
        for (var e = 1; e < ptArray.length; e++) {
            if (pt.get_posY() > ptArray[e].get_posY())
                pt = ptArray[e];
        }
        return pt;
    }
    static extractXIntersectedPoints(shapesWrapper, X0) {
        var exPointArray = new Array(0);
        var count = shapesWrapper.get_numOfShapes();
        for (var id = 0; count > id; id++) {
            var shape = shapesWrapper.getShapeAt(id);
            if (shape.get_minX() <= X0 && shape.get_maxX() >= X0) {
                var g = shape.calcPosOnXShape(X0);
                if (null == g) {
                    continue;
                }
                for (var h = 0; h < g.length; h++)
                    exPointArray.push(shape.getVectorAtPos(g[h]));
            }
        }
        return exPointArray;
    }
    static extractYIntersectLeftPoint(shapesWrapper, Y0) {
        var c,
            d = RingMath.extractYIntersectedPoints(shapesWrapper, Y0);
        if (0 == d.length) return null;
        c = d[0];
        for (var e = 1; e < d.length; e++)
            c.get_posX() > d[e].get_posX() && (c = d[e]);
        return c;
    }
    static extractYIntersectRightPoint(shapesWrapper, Y0) {
        var pt,
            ptArray = RingMath.extractYIntersectedPoints(shapesWrapper, Y0);
        if (0 == ptArray.length) return null;
        pt = ptArray[0];
        for (var e = 1; e < ptArray.length; e++)
            pt.get_posX() < ptArray[e].get_posX() && (pt = ptArray[e]);
        return pt;
    }
    static extractYIntersectedPoints(shapesWrapper, Y0) {
        var exPointArray = new Array(0);
        var d = shapesWrapper.get_numOfShapes();
        for (var e = 0; d > e; e++) {
            var shape = shapesWrapper.getShapeAt(e);
            if (shape.get_minY() <= Y0 && shape.get_maxY() >= Y0) {
                var posArray = shape.calcPosOnYShape(Y0);
                if (null == posArray) {
                    continue;
                }
                for (var h = 0; h < posArray.length; h++)
                    exPointArray.push(shape.getVectorAtPos(posArray[h]));
            }
        }
        return exPointArray;
    }
    static extractShapeIntersectedPoints(shapesWrapper, Shape0) {
        for (var c = new Array(0), count = shapesWrapper.get_numOfShapes(), id = 0; count > id;) {
            var shape = shapesWrapper.getShapeAt(id),
                g = ShapeMath.getShapeShapeIntersect(shape, Shape0);
            if (null != g.get_intersectionPoints()) {
                for (var h = 0; h < g.get_intersectionPoints().length; h++) {
                    var pos = shape.calcPosOnShape(g.get_intersectionPoints()[h], false);
                    c.push(shape.getVectorAtPos(pos));
                }
            }
            ++id;
        }
        return c;
    }
}

class PosMath {
    __class__ = PosMath;
    static __name__ = ["PosMath"];
    constructor() { }

    static IncludeEngravingPosWrapper(engravingPosWrapper, engravingPosWrapperArray, tolerence) {
        null == tolerence && (tolerence = 0);
        var newEngravingPosWrapperArray = new Array(0),
            engravingPosWrapperArray1 = engravingPosWrapperArray.slice();

        engravingPosWrapperArray1.sort(PosMath.EngravingStartPosCompare);
        var lastEngravingPosWrapper = engravingPosWrapperArray1[engravingPosWrapperArray1.length - 1],
            firstEngravingPosWrapper = engravingPosWrapperArray1[0];

        lastEngravingPosWrapper.get_start() <= 1 && lastEngravingPosWrapper.get_end() >= 1
            ? engravingPosWrapperArray1.unshift(new PosWrapper(lastEngravingPosWrapper.get_start() - 1, lastEngravingPosWrapper.get_end() - 1))
            : firstEngravingPosWrapper.get_start() <= 0 && firstEngravingPosWrapper.get_end() >= 0 &&
            engravingPosWrapperArray1.push(new PosWrapper(firstEngravingPosWrapper.get_start() + 1, firstEngravingPosWrapper.get_end() + 1));

        var start = engravingPosWrapper.get_start();
        for (var i = 0; i < engravingPosWrapperArray1.length;) {
            var posWrapper = engravingPosWrapperArray1[i];
            if (engravingPosWrapper.tl(start)) {
                var tmpPosWrapper = new PosWrapper(start, posWrapper.get_start());
                tmpPosWrapper.get_length() > tolerence && newEngravingPosWrapperArray.push(tmpPosWrapper);
            }
            start = posWrapper.get_end();
            ++i;
        }
        var posWrapper = new PosWrapper(start, engravingPosWrapper.get_end());
        posWrapper.get_length() > tolerence && newEngravingPosWrapperArray.push(posWrapper);
        return newEngravingPosWrapperArray;
    }
    static getPosXORs(a, b, minLength) {
        null == minLength && (minLength = 0);
        var d = new Array(0),
            e = new PosWrapper(b.get_start() - 1, b.get_end() - 1),
            f = new PosWrapper(b.get_start() + 1, b.get_end() + 1);
        if (b.isContainedIn(a)) {
            var g = new PosWrapper(a.get_start(), b.get_start());
            g.get_length() > minLength && d.push(g);
            var h = new PosWrapper(b.get_end(), a.get_end());
            h.get_length() > minLength && d.push(h);
        }
        else if (e.isContainedIn(a)) {
            var i = new PosWrapper(a.get_start(), e.get_start());
            i.get_length() > minLength && d.push(i);
            var j = new PosWrapper(e.get_end(), a.get_end());
            j.get_length() > minLength && d.push(j);
        }
        else if (f.isContainedIn(a)) {
            var k = new PosWrapper(a.get_start(), f.get_start());
            k.get_length() > minLength && d.push(k);
            var l = new PosWrapper(f.get_end(), a.get_end());
            l.get_length() > minLength && d.push(l);
        }
        else {
            var m = new PosWrapper(a.get_start(), a.get_end());
            b.tl(a.get_start())
                ? m.set_start(b.get_end())
                : b.tl(a.get_start() - 1)
                    ? m.set_start(b.get_end() + 1)
                    : b.tl(a.get_start() + 1) && m.set_start(b.get_end() - 1),
                b.tl(a.get_end())
                    ? m.set_end(b.get_start())
                    : b.tl(a.get_end() - 1)
                        ? m.set_end(b.get_start() + 1)
                        : b.tl(a.get_end() + 1) && m.set_end(b.get_start() - 1),
                m.get_length() > minLength && a.get_length() - m.get_length() > minLength && d.push(m);
        }
        return d;
    }
    static getPosIntersections(posWrapper1, posWrapper2) {
        var c = new Array(0);
        if (posWrapper1.get_length() >= 1)
            return c.push(new PosWrapper(posWrapper2.get_start(), posWrapper2.get_end())), c;
        if (posWrapper2.get_length() >= 1)
            return c.push(new PosWrapper(posWrapper1.get_start(), posWrapper1.get_end())), c;

        var newPosWrapper1 = new PosWrapper(posWrapper1.get_start(), posWrapper1.get_end()),
            e = newPosWrapper1.getIntersection(posWrapper2);
        null != e && c.push(e);

        newPosWrapper1.set_start(newPosWrapper1.get_start() + 1);
        newPosWrapper1.set_end(newPosWrapper1.get_end() + 1);
        e = newPosWrapper1.getIntersection(posWrapper2);
        null != e && c.push(e);

        newPosWrapper1.set_start(newPosWrapper1.get_start() - 2);
        newPosWrapper1.set_end(newPosWrapper1.get_end() - 2);
        (e = newPosWrapper1.getIntersection(posWrapper2));
        null != e && c.push(e);
        return c;
    }
    static EngravingStartPosCompare(a, b) {
        return a.get_start() > b.get_start()
            ? 1
            : a.get_start() < b.get_start()
                ? -1
                : 0;
    }
    static EngravingEndPosCompare(a, b) {
        return a.get_end() > b.get_end() ? 1 : a.get_end() < b.get_end() ? -1 : 0;
    }
}

export {
    PosWrapper, BorderIndexMath, ShapeMath, RingMath, PosMath
}