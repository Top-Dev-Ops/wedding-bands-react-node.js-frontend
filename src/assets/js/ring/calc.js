
/* eslint-disable no-unused-expressions */
import { ObjMan, StringUtil, Std, Int, Float, Bool } from "./objman.js"
import {
    CapMeshMeta, CapMeshMetaValue, CutPolyMeta, CutPolyMetaValue, DiamondMeta, DiamondMetaValue,
    EngravingMeta, EngravingMetaValue, GapMeta, GrooveMeta, GrooveMetaValue, ProfileMeta,
    ProfileMetaValue, SegmentMeta, SliceMeta, SliceMetaValue, TranslationMeta, SurfaceMeta,
    DiamondSurfaceType, DiamondPlacementType, DiamondGrooveType
} from "./meta.js"
import { MathConsts } from "./meta.js"
import {
    Type, MetaMan, KeyPair, Iterator, MetaKeyGenerator, MetaDataMap, EnumHX, TextAlign, DiamondProngTypeEnum, DiamondTypeEnum,
    DrillTypeEnum, DiamondGroupConfigOrientationEnum, DiamondGroupConfigSettingEnum, StoneConfigCutEnum,
    ArcGeometryConfigDirectionEnum, SliceConfigOrientationEnum, GapConfigTypeEnum, GrooveConfigTypeEnum, DiaGrooveEnum
} from "./meta.js"
import { globalMap, MyMap, KMap, BMap, ContextsSet } from "./map.js"
import {
    GeoNumComparor, ArcGeometryConfig, LineGeometryConfig,
    DiagonalDiamondChannelConfigTransformer, HorizontalGrooveConfigTransformer,
    Memoire5ConfigTransformer, Memoire6ConfigTransformer
} from "./meta.js"
import {
    Point, Rectangle, PointEx, Vect2, Vector3D, Triangle, Matrix, LineIntersectBuilder,
    Matrix3D, GeoPolygon, FacePolygon, Face4, Face3, TriangleMath,
    SimpleGeometryData, MySimpleGeometryData, SimpleMeshData,
    ArcBase, Arc, Circle, Line, ShapesWrapper, PointComparator,
    SimpleGeometryMergeHandler, SimpleGeometryDataBounds
} from "./geometry.js"
import {
    X_AXIS, Y_AXIS, Z_AXIS
} from "./geometry.js"
import { ArrayTool, NumComparor, StrNumReader, SimpleGeometryDataUtil } from "./util.js"
import { PolyMath } from "./poly.js"
import { Fault, ErrorWrap } from "./error.js"
import { DiamondConfig } from "./config.js"
import {
    DiamondBuildAsset, DiamondDrillBuildAsset, DiamondProngBuildAsset
} from "./built.js"
import { PosWrapper, BorderIndexMath, ShapeMath, RingMath, PosMath } from "./math.js"
import {
    SeparatePolyData, EngravingConfigHelper, EngravingConfigBuilder
} from "./engrave.js"
import {
    ModelFacesCreator, Diamond, DiamondLocator, DiamondGapMaker, DiamondBuilder, DiamondMaker
} from "./diamond.js"
import {
    RingGapMaker, GapBuilder
} from "./gap.js"
import {
    Edges, GrooveColorit, GrooveEdge, GrooveBuilder, GrooveMath
} from "./groove.js"
//////////////////////////////////////////


class FaceCutStruct {
    static __name__ = ["FaceCutStruct"];
    faceCutoutPolygon = null;
    faceCutinArray = null;
    constructor() { }
}
class FaceCutter {
    static __name__ = ["FaceCutter"];
    static intersectPt = null;
    constructor() { }

    isInFacePolygon(face, x, y) {
        if (face.get_boundingRect().contains(x, y)) {
            var indices = face.get_trianglesIndices();
            var size = indices.length;
            for (var id = 0; size > id; id += 3) {
                var result,
                    pt1 = face.getPointAt(indices[id]),
                    pt2 = face.getPointAt(indices[id + 1]),
                    pt3 = face.getPointAt(indices[id + 2]),
                    cross1 = (x - pt2.x) * (pt1.y - pt2.y) - (pt1.x - pt2.x) * (y - pt2.y),
                    cross2 = (x - pt3.x) * (pt2.y - pt3.y) - (pt2.x - pt3.x) * (y - pt3.y),
                    s = 1e-6 >= (cross2 > 0 ? cross2 : 0 - cross2) ? false : 0 > cross2;
                if ((1e-6 >= (cross1 > 0 ? cross1 : 0 - cross1) ? false : 0 > cross1) != s)
                    result = false;
                else {
                    var cross3 = (x - pt1.x) * (pt3.y - pt1.y) - (pt3.x - pt1.x) * (y - pt1.y);
                    result = s == (1e-6 >= (cross3 > 0 ? cross3 : 0 - cross3) ? false : 0 > cross3);
                }
                if (result) return true;
            }
        }
        return false;
    }
    intersects(face, x, y, x1, y1) {
        var count = face.get_numOfPoints();
        for (var id = 0; count > id; id++) {
            var nextPt,
                pt = face.getPointAt(id);
            nextPt = count - 1 > id ? face.getPointAt(id + 1) : face.getPointAt(0);
            var j = LineIntersectBuilder.calcIntersection(pt.x, pt.y, nextPt.x, nextPt.y, x, y, x1, y1, true, false, null);
            if (null != j && !PointComparator.EqualPoint(j, pt) && !PointComparator.EqualPoint(j, nextPt))
                return true;
        }
        return false;
    }
    trimFace(face, x1, y1, x2, y2, bSecondTest, ptArray) { //kkk todo
        var len = ptArray.length;
        var faceSize = face.get_numOfPoints();
        for (var id = 0; faceSize > id; id++) {
            var nextPt,
                curPt = face.getPointAt(id);
            nextPt = (faceSize - 1) > id ? face.getPointAt(id + 1) : face.getPointAt(0);

            var m, equalToNext, tmpEqual;
            if (faceSize - 1 > id) {
                var dx = nextPt.x > x1 ? nextPt.x - x1 : x1 - nextPt.x;
                var dy = nextPt.y > y1 ? nextPt.y - y1 : y1 - nextPt.y;
                if (1e-6 >= dx) {
                    tmpEqual = 1e-6 >= dy;
                }
                else tmpEqual = false;
            }
            else tmpEqual = false;

            if (tmpEqual) equalToNext = true;
            else {
                var dx = nextPt.x > x2 ? nextPt.x - x2 : x2 - nextPt.x;
                var dy = nextPt.y > y2 ? nextPt.y - y2 : y2 - nextPt.y;
                if (1e-6 >= dx) {
                    equalToNext = 1e-6 >= dy;
                }
                else equalToNext = false;
            }
            if (equalToNext) { // one of two points is equal to next point
                m = nextPt;
                ++id;
            }
            else {
                FaceCutter.intersectPt = LineIntersectBuilder.calcIntersection(curPt.x, curPt.y, nextPt.x, nextPt.y, x1, y1, x2, y2, true, bSecondTest, null);
                if (null != FaceCutter.intersectPt) {
                    m = new PointEx;
                    m.setTo(FaceCutter.intersectPt.x, FaceCutter.intersectPt.y);
                }
                else m = null;
            }
            if (null != m) {
                var u = true;
                for (var v = 0; len > v;) { // check input array do not contain the point
                    if (PointComparator.EqualPoint(m, ptArray[v], 0.001)) {
                        u = false;
                        break;
                    }
                    ++v;
                }
                if (u) { // do not contain
                    ptArray[len++] = m;
                    m.set_borderIndex(0);
                    if (BorderIndexMath.check_Left(curPt.get_borderIndex()) && BorderIndexMath.check_Left(nextPt.get_borderIndex())) {
                        m.set_borderIndex(2);
                    }
                    else if (BorderIndexMath.check_Right(curPt.get_borderIndex()) && BorderIndexMath.check_Right(nextPt.get_borderIndex())) {
                        m.set_borderIndex(1);
                    }
                    else if (BorderIndexMath.check_Top(curPt.get_borderIndex()) && BorderIndexMath.check_Top(nextPt.get_borderIndex())) {
                        m.set_borderIndex(4);
                    }
                    else if (BorderIndexMath.check_Bottom(curPt.get_borderIndex()) && BorderIndexMath.check_Bottom(nextPt.get_borderIndex())) {
                        m.set_borderIndex(8);
                    }
                    if (PointComparator.EqualPoint(nextPt, m))
                        ++id;
                }
            }
        }
        return ptArray;
    }
    checkIntersection(face, cutPolygon) {
        return face.get_boundingRect().intersects(cutPolygon.get_boundingRect()) &&
            this.iB(face, cutPolygon)
            ? true
            : false;
    }
    SplitTwoFaceWrappers(face, x, y, x1, y1) {
        var faceCutinArray = new Array(0);
        var ptArray = this.trimFace(face, x, y, x1, y1, false, new Array(0));// kkk todo org:false
        var ptCount = ptArray.length;
        var trimPtArray = null;
        var newTrimPtArray = null;

        faceCutinArray[0] = null;
        faceCutinArray[1] = null;
        if (0 == ptCount) return faceCutinArray;
        else if (1 == ptCount) {
            var l = (x1 - x) * (face.get_centroid().y - y) - (y1 - y) * (face.get_centroid().x - x),
                m = (l > 0 ? l : 0 - l) <= LineIntersectBuilder.tolerance ? 0 : l > 0 ? 1 : -1;
            if (0 > m) {
                faceCutinArray[0] = face;
                faceCutinArray[1] = null;
                return faceCutinArray;
            }
            if (m > 0) {
                faceCutinArray[0] = null;
                faceCutinArray[1] = face;
                return faceCutinArray;
            }
        }
        else {
            if (2 != ptCount) { //kkk todo
                throw new Error("Invalid Trim!" + ptArray.length + ":" + ptArray);
            }
            trimPtArray = ptArray;
            newTrimPtArray = ptArray.slice();
        }
        var ptCount = face.get_numOfPoints();
        for (var id = 0; ptCount > id;) {
            var len1 = trimPtArray.length,
                len2 = newTrimPtArray.length,
                pt = face.getPointAt(id);
            var t = (x1 - x) * (pt.y - y) - (y1 - y) * (pt.x - x);
            var at = t > 0 ? t : 0 - t
            var u = at <= LineIntersectBuilder.tolerance ? 0 : t > 0 ? 1 : -1;
            if (u < 0) {
                trimPtArray[len1++] = pt;
            }
            else {
                newTrimPtArray[len2++] = pt;
            }
            ++id;
        }
        var v = new FacePolygon;
        v.setTo(trimPtArray);
        var w = new FacePolygon;
        w.setTo(newTrimPtArray);

        w.set_winding(face.get_winding()); w.sortPoints();
        v.set_winding(face.get_winding()); v.sortPoints();

        faceCutinArray[0] = v;//left
        faceCutinArray[1] = w;//right
        return faceCutinArray;
    }
    makeFaceWrapper(cutPolygon, face) { //kkk todo
        if (!this.checkIntersection(face, cutPolygon)) return null;

        var faceWrapper = new FaceCutStruct();
        faceWrapper.faceCutinArray = new Array(0);
        // faceWrapper.faceCutoutPolygon = cutPolygon;

        var newFace = face;
        var index = 0,
            cutPolySize = cutPolygon.get_numOfPoints(),
            centroid = cutPolygon.get_centroid();
        for (var id = 0; cutPolySize > id; id++) {
            var nextPt;
            var curPt = cutPolygon.getPointAt(id);
            nextPt = cutPolygon.getPointAt((id + 1) % cutPolySize);
            if (this.isInFacePolygon(newFace, curPt.x, curPt.y) ||
                this.isInFacePolygon(newFace, nextPt.x, nextPt.y) ||
                this.intersects(newFace, curPt.x, curPt.y, nextPt.x, nextPt.y)) {

                var m = this.SplitTwoFaceWrappers(newFace, curPt.x, curPt.y, nextPt.x, nextPt.y),
                    p = (nextPt.x - curPt.x) * (centroid.y - curPt.y) - (nextPt.y - curPt.y) * (centroid.x - curPt.x),
                    q = (p > 0 ? p : 0 - p) <= LineIntersectBuilder.tolerance ? 0 : p > 0 ? 1 : -1;
                if (0 > q) {
                    if (null != m[1]) {
                        faceWrapper.faceCutinArray[index++] = m[1];
                    }
                    if (null == m[0])
                        return faceWrapper;
                    newFace = m[0];
                }
                else { //if (q > 0) 
                    if (null != m[0]) {
                        faceWrapper.faceCutinArray[index++] = m[0];
                    }
                    if (null == m[1])
                        return faceWrapper;
                    newFace = m[1];
                }
            }
        }
        var bInside = false;
        bInside = this.isInFacePolygon(cutPolygon, newFace.get_centroid().x, newFace.get_centroid().y);

        if (bInside) {
            faceWrapper.faceCutoutPolygon = newFace;
            // faceWrapper.faceCutoutPolygon.addMetaData(cutPolygon.getMetadata);
        }
        else {
            faceWrapper.faceCutinArray[index] = newFace;
        }

        return faceWrapper;
    }
    iB(face, cutPolygon) {
        var faceSize = face.get_numOfPoints(), prevId = faceSize - 1;
        for (var id = 0; faceSize > id; id++) {
            var dx = face.getPointAt(id).x - face.getPointAt(prevId).x;
            var dy = face.getPointAt(id).y - face.getPointAt(prevId).y;
            if (this.iX(-dy, dx, face, cutPolygon))
                return false;
            prevId = id;
        }
        return true;
    }
    iX(a, b, face, cutPolygon) {
        return (
            this.i2(a, b, face, FaceCutter.id),
            this.i2(a, b, cutPolygon, FaceCutter.if),
            FaceCutter.id[0] > FaceCutter.if[1] || FaceCutter.if[0] > FaceCutter.id[1] ? true : false
        );
    }
    i2(a, b, polygon, d) {
        var e = a * polygon.getPointAt(0).x + b * polygon.getPointAt(0).y;
        (d[0] = e), (d[1] = e);
        for (var size = polygon.get_numOfPoints(), id = 1; size > id;)
            (e = a * polygon.getPointAt(id).x + b * polygon.getPointAt(id).y),
                e < d[0] ? (d[0] = e) : e > d[1] && (d[1] = e),
                ++id;
    }
}
FaceCutter.id = new Array(2);
FaceCutter.if = new Array(2);
class OrientShapesWrapeer {
    static __name__ = ["OrientShapesWrapeer"];
    shapesWrapper = null;
    orientation = null;
    constructor() {
        this.orientation = "invalid";
    }
}
class OrientShape {
    static __name__ = ["OrientShape"];

    orientation = null;
    shape = null;

    constructor() { }
}
class Ub {
    constructor() { }

    static uE(posArray) {
        var len = posArray.length;
        for (var n = (len / 2) | 0; n > 0;) {
            for (var id = n; len > id; id++) {
                var k = id;
                for (; k >= n && posArray[(k - n) | 0] > posArray[id];) {
                    posArray[k] = posArray[(k - n) | 0];
                    k = (k - n) | 0;
                }
                posArray[k] = posArray[id];
            }
            n = (n / 2.2) | 0;
        }
    }
    static uI(a, b, c) {
        for (var d = b, e = c, f = a[Math.round(0.5 * (b + c))]; e >= d;) {
            for (; a[d] < f;) ++d;
            for (; a[e] > f;) --e;
            if (e >= d) {
                var g = a[d];
                (a[d] = a[e]), ++d, (a[e] = g), --e;
            }
        }
        e > b && Ub.uI(a, b, e);
        c > d && Ub.uI(a, d, c);
    }
}

class ShapeSplitter {
    constructor() { }

    splitShapeByShape(shape, shape2, outOrientShapeArray) {
        var shapeIntersectWrapper = ShapeMath.getShapeShapeIntersect(shape, shape2);
        if (
            null != shapeIntersectWrapper.get_intersectionPoints() &&
            0 != shapeIntersectWrapper.get_intersectionPoints().length
        ) {
            this.splitShapeByPos(shape, this.getPosOfPointsOnShape(shape, shapeIntersectWrapper.get_intersectionPoints(), false), outOrientShapeArray);
            for (var e = 0; e < outOrientShapeArray.length; e++)
                outOrientShapeArray[e].orientation = ShapeMath.getShapeShapeOrientation(shape2, outOrientShapeArray[e].shape);
        } else {
            ArrayTool.clear(outOrientShapeArray);
        }
    }
    splitShapeByLine(shape, line, outOrientShapeArray) {
        var d = ShapeMath.getShapeLineIntersect(shape, line);
        if (
            null != d.get_intersectionPoints() &&
            0 != d.get_intersectionPoints().length
        ) {
            this.splitShapeByPos(shape, this.getPosOfPointsOnShape(shape, d.get_intersectionPoints(), false), outOrientShapeArray);
            for (var e = 0; e < outOrientShapeArray.length;) (outOrientShapeArray[e].orientation = ShapeMath.getShapeShapeOrientation(line, outOrientShapeArray[e].shape)), ++e;
        } else {
            ArrayTool.clear(outOrientShapeArray);
        }
    }
    splitShapeByArcBase(shape, arcBase, outOrientShapeArray) {
        var d = ShapeMath.getShapeArcbaseIntersect(shape, arcBase);
        if (
            null != d.get_intersectionPoints() &&
            0 != d.get_intersectionPoints().length
        ) {
            this.splitShapeByPos(shape, this.getPosOfPointsOnShape(shape, d.get_intersectionPoints(), false), outOrientShapeArray);
            for (var e = 0; e < outOrientShapeArray.length; e++)
                outOrientShapeArray[e].orientation = ShapeMath.getShapeShapeOrientation(arcBase, outOrientShapeArray[e].shape);
        } else {
            ArrayTool.clear(outOrientShapeArray);
        }
    }
    splitShapeByArc(shape, arc, outOrientShapeArray) {
        var d = ShapeMath.getShapeArcIntersect(shape, arc);
        if (
            null != d.get_intersectionPoints() &&
            0 != d.get_intersectionPoints().length
        ) {
            this.splitShapeByPos(shape, this.getPosOfPointsOnShape(shape, d.get_intersectionPoints(), false), outOrientShapeArray);
            for (var e = 0; e < outOrientShapeArray.length; e++)
                outOrientShapeArray[e].orientation = ShapeMath.getShapeShapeOrientation(arc, outOrientShapeArray[e].shape);
        } else {
            ArrayTool.clear(outOrientShapeArray);
        }
    }
    splitShapeByY(shape, Y0, outOrientShapeArray) {
        this.splitShapeByPos(shape, shape.calcPosOnYShape(Y0), outOrientShapeArray);
        if (null != outOrientShapeArray)
            for (var d = 0; d < outOrientShapeArray.length; d++) {
                outOrientShapeArray[d].shape.get_midY() < Y0 ?
                    (outOrientShapeArray[d].orientation = SliceMetaValue.SLICE_H_DIRECTION_TOP) :
                    (outOrientShapeArray[d].orientation = SliceMetaValue.SLICE_H_DIRECTION_BOTTOM);
            }
    }
    splitShapeByX(shape, X0, outOrientShapeArray) {
        this.splitShapeByPos(shape, shape.calcPosOnXShape(X0), outOrientShapeArray);
        if (null != outOrientShapeArray) {
            for (var d = 0; d < outOrientShapeArray.length; d++)
                outOrientShapeArray[d].shape.get_midX() < X0 ?
                    (outOrientShapeArray[d].orientation = SliceMetaValue.SLICE_V_DIRECTION_LEFT) :
                    (outOrientShapeArray[d].orientation = SliceMetaValue.SLICE_V_DIRECTION_RIGHT);
        }
    }
    splitShapesByY(shapesWrapper, Y0, outOrientShapeArray) {
        var topShapesWrapper = new ShapesWrapper;
        var bottomShapesWrapper = new ShapesWrapper;
        var count = shapesWrapper.get_numOfShapes();

        for (var g = 0; count > g; g++) {
            var shape = shapesWrapper.getShapeAt(g);
            if (GeoNumComparor.isNotGreater(shape.get_maxY(), Y0)) topShapesWrapper.addShape(shape);
            else if (GeoNumComparor.isNotLess(shape.get_minY(), Y0)) bottomShapesWrapper.addShape(shape);
            else {
                this.splitShapeByY(shape, Y0, ShapeSplitter.gOrientShapeArray);
                for (var i = 0; i < ShapeSplitter.gOrientShapeArray.length; i++) {
                    ShapeSplitter.gOrientShapeArray[i].shape.set_resolution(shape.get_resolution());
                    SliceMetaValue.SLICE_H_DIRECTION_BOTTOM == ShapeSplitter.gOrientShapeArray[i].orientation
                        ? bottomShapesWrapper.addShape(ShapeSplitter.gOrientShapeArray[i].shape)
                        : "top" == ShapeSplitter.gOrientShapeArray[i].orientation && topShapesWrapper.addShape(ShapeSplitter.gOrientShapeArray[i].shape);
                }
            }
        }
        if (0 != topShapesWrapper.get_numOfShapes() && 0 != bottomShapesWrapper.get_numOfShapes()) {
            var j = new OrientShapesWrapeer;
            j.orientation = "top";
            j.shapesWrapper = topShapesWrapper;
            var k = new OrientShapesWrapeer;
            k.orientation = SliceMetaValue.SLICE_H_DIRECTION_BOTTOM;
            k.shapesWrapper = bottomShapesWrapper;
            outOrientShapeArray[0] = j;
            outOrientShapeArray[1] = k;
            outOrientShapeArray.splice(2, outOrientShapeArray.length - 2);
        }
        else {
            ArrayTool.clear(outOrientShapeArray);
        }
    }
    splitShapesByX(shapesWrapper, X0, outArray) {
        var leftShapesWrapper = new ShapesWrapper,
            rightShapesWrapper = new ShapesWrapper,
            count = shapesWrapper.get_numOfShapes();
        for (var g = 0; count > g; g++) {
            var shape = shapesWrapper.getShapeAt(g),
                maxX = shape.get_maxX(),
                nextX0 = X0 + ShapeSplitter.TRIM_TOLERANCE_LENGTH;
            if (1e-6 >= (maxX > nextX0 ? maxX - nextX0 : nextX0 - maxX) ? true : nextX0 > maxX)
                leftShapesWrapper.addShape(shape);
            else {
                var minX = shape.get_minX(),
                    prevX0 = X0 - ShapeSplitter.TRIM_TOLERANCE_LENGTH;
                if (1e-6 >= (minX > prevX0 ? minX - prevX0 : prevX0 - minX) ? true : minX > prevX0)
                    rightShapesWrapper.addShape(shape);
                else {
                    this.splitShapeByX(shape, X0, ShapeSplitter.gOrientShapeArray);
                    for (var m = 0; m < ShapeSplitter.gOrientShapeArray.length; m++) {
                        var n = ShapeSplitter.gOrientShapeArray[m];
                        n.shape.set_resolution(this.u9(shape.get_resolution(), n.shape.get_geometryLength(), shape.get_geometryLength()));
                        SliceMetaValue.SLICE_V_DIRECTION_RIGHT == n.orientation ? rightShapesWrapper.addShape(n.shape) : SliceMetaValue.SLICE_V_DIRECTION_LEFT == n.orientation && leftShapesWrapper.addShape(n.shape);
                    }
                }
            }
        }

        ArrayTool.clear(outArray);

        if (leftShapesWrapper.get_numOfShapes() > 0) {
            var q = new OrientShapesWrapeer();
            q.orientation = SliceMetaValue.SLICE_V_DIRECTION_LEFT;
            q.shapesWrapper = leftShapesWrapper;
            outArray.push(q);
        }
        if (rightShapesWrapper.get_numOfShapes() > 0) {
            var s = new OrientShapesWrapeer();
            s.orientation = SliceMetaValue.SLICE_V_DIRECTION_RIGHT;
            s.shapesWrapper = rightShapesWrapper;
            outArray.push(s);
        }
    }
    vq(shapesWrapper, shapesWrapper2, c) {
        for (
            var shape2, shape, f = new Array(0), g = new ContextsSet(), h = 0;
            h < shapesWrapper2.get_numOfShapes(); h++

        ) {
            shape2 = shapesWrapper2.getShapeAt(h);
            for (
                var i = shape2.get_geometryLength() / shape2.get_resolution(), j = 0;
                j < shapesWrapper.get_numOfShapes(); j++

            ) {
                shape = shapesWrapper.getShapeAt(j);
                var k = shape.get_geometryLength() / shape.get_resolution(),
                    l = ShapeMath.getShapeShapeIntersect(shape, shape2);
                if (
                    null != l.get_intersectionPoints() &&
                    l.get_intersectionPoints().length > 0
                ) {
                    this.splitShapeByPos(shape, this.getPosOfPointsOnShape(shape, l.get_intersectionPoints(), false), ShapeSplitter.gOrientShapeArray);
                    var m = ShapeSplitter.gOrientShapeArray.length,
                        n = m;
                    ArrayTool.clear(f, n);
                    if (0 != m) {
                        for (var s = 0; m > s;) {
                            var t = ShapeSplitter.gOrientShapeArray[s].shape;
                            (f[s] = t),
                                t.set_resolution(Math.ceil(t.get_geometryLength() / k)),
                                (ShapeSplitter.gOrientShapeArray[s].orientation = ShapeMath.getShapeShapeOrientation(shape2, t)),
                                g.set(ShapeSplitter.gOrientShapeArray[s].shape, ShapeSplitter.gOrientShapeArray[s].orientation),
                                ++s;
                        }
                        shapesWrapper.rn(f, j);
                    }
                    else null == g.contextArray[shape.__id__] && g.set(shape, ShapeMath.getShapeShapeOrientation(shape2, shape));
                    this.splitShapeByPos(shape2, this.getPosOfPointsOnShape(shape2, l.get_intersectionPoints(), false), ShapeSplitter.gOrientShapeArray),
                        (m = ShapeSplitter.gOrientShapeArray.length);
                    var u = m;
                    ArrayTool.clear(f, u);
                    if (0 != m) {
                        for (var y = 0; m > y; y++) {
                            var z = ShapeSplitter.gOrientShapeArray[y].shape;
                            (f[y] = z),
                                z.set_resolution(Math.ceil(z.get_geometryLength() / i)),
                                (ShapeSplitter.gOrientShapeArray[y].orientation = ShapeMath.getShapeShapeOrientation(shape, z)),
                                g.set(ShapeSplitter.gOrientShapeArray[y].shape, ShapeSplitter.gOrientShapeArray[y].orientation);
                        }
                        shapesWrapper2.rn(f, h), (shape2 = f[0]);
                    }
                    else null == g.contextArray[shape.__id__] && g.set(shape2, ShapeMath.getShapeShapeOrientation(shape, shape2));
                    c && shapesWrapper2.copyMetaDataFromAllShapes(shape, false);
                }
                else
                    null == g.contextArray[shape.__id__] &&
                        ShapeMath.checkOrientations(shape, shapesWrapper2, "outside", "inside") &&
                        g.set(shape, "outside");
            }
        }
        for (var A = true, B = 0; B < shapesWrapper2.get_numOfShapes();) {
            shape2 = shapesWrapper2.getShapeAt(B);
            var C = g.contextArray[shape2.__id__];
            null != C && (A = "outside" == C), A && (shapesWrapper2.removeShapes(B, 1), --B), ++B;
        }
        var D = new MetaDataMap(),
            E = null;
        A = false;
        var F = false;
        for (B = 0; B < shapesWrapper.get_numOfShapes();) {
            shape = shapesWrapper.getShapeAt(B);
            var G = g.contextArray[shape.__id__];
            null != G && ((F = A ? false : "outside" == G), (A = "outside" == G)),
                A && (shape.copyMetaDatasTo(D, false), shapesWrapper.removeShapes(B, 1), --B),
                F &&
                0 != shapesWrapper2.get_numOfShapes() &&
                ((E = shapesWrapper2.getShapes().slice()),
                    shapesWrapper.insertShapesWrapper(shapesWrapper2, B + 1),
                    (B += shapesWrapper2.get_numOfShapes()),
                    shapesWrapper2.removeShapes(0, shapesWrapper2.get_numOfShapes()),
                    (F = false)),
                ++B;
        }
        if (null != E)
            for (var H = 0; H < E.length;) D.copyMetaDatasTo(E[H], false), ++H;
    }
    splitArcBaseByPos(arcBase, posArray, outOrientShapeArray) {
        if (2 == posArray.length) {
            var d = new Arc;
            arcBase.copyMetaDatasTo(d),
                d.initParam(arcBase.get_centerX(), arcBase.get_centerY(), arcBase.get_radius(), posArray[0], posArray[1]),
                d.set_invertedNormals(arcBase.get_invertedNormals());
            var e = arcBase.get_startU();
            d.set_startU((arcBase.get_endU() - e) * posArray[0] + e);
            var f = arcBase.get_startU();
            d.set_endU((arcBase.get_endU() - f) * posArray[1] + f);
            var g = new Arc;
            arcBase.copyMetaDatasTo(g),
                g.initParam(arcBase.get_centerX(), arcBase.get_centerY(), arcBase.get_radius(), posArray[1], posArray[0]),
                g.set_invertedNormals(arcBase.get_invertedNormals()),
                g.set_startU(d.get_endU()),
                g.set_endU(d.get_startU());
            var h = new OrientShape;
            h.shape = d;
            var i = new OrientShape;
            (i.shape = g), (outOrientShapeArray[0] = h), (outOrientShapeArray[1] = i), outOrientShapeArray.splice(2, outOrientShapeArray.length - 2);
        } else {
            ArrayTool.clear(outOrientShapeArray);
        }
    }
    splitArcByPos(arc, posArray, outOrientShapeArray) {
        var d, e, f, g, h, i;
        if (2 == posArray.length) {
            ShapeSplitter.uK[0] = posArray[0];
            ShapeSplitter.uK[1] = posArray[1];
            Ub.uE(ShapeSplitter.uK);
            var j = arc.getCirclePos(ShapeSplitter.uK[0]),
                k = arc.getCirclePos(ShapeSplitter.uK[1]);
            (ShapeSplitter.uM[0] = arc.get_startParameter()),
                (ShapeSplitter.uM[1] = j),
                (ShapeSplitter.uM[2] = k),
                (ShapeSplitter.uM[3] = arc.get_endParameter()),
                (e = new Arc),
                arc.copyMetaDatasTo(e),
                e.initParam(
                    arc.get_centerX(),
                    arc.get_centerY(),
                    arc.get_radius(),
                    ShapeSplitter.uM[0],
                    ShapeSplitter.uM[1],
                    arc.get_winding()
                ),
                e.set_invertedNormals(arc.get_invertedNormals()),
                e.set_startU(arc.get_startU());
            var l = arc.get_startU();
            e.set_endU((arc.get_endU() - l) * ShapeSplitter.uK[0] + l),
                (g = new Arc),
                arc.copyMetaDatasTo(g),
                g.initParam(
                    arc.get_centerX(),
                    arc.get_centerY(),
                    arc.get_radius(),
                    ShapeSplitter.uM[1],
                    ShapeSplitter.uM[2],
                    arc.get_winding()
                ),
                g.set_invertedNormals(arc.get_invertedNormals()),
                g.set_startU(e.get_endU());
            var m = arc.get_startU();
            g.set_endU((arc.get_endU() - m) * ShapeSplitter.uK[1] + m),
                (i = new Arc),
                arc.copyMetaDatasTo(i),
                i.initParam(
                    arc.get_centerX(),
                    arc.get_centerY(),
                    arc.get_radius(),
                    ShapeSplitter.uM[2],
                    ShapeSplitter.uM[3],
                    arc.get_winding()
                ),
                i.set_invertedNormals(arc.get_invertedNormals()),
                i.set_startU(g.get_endU()),
                i.set_endU(arc.get_endU()),
                (d = new OrientShape),
                (d.shape = e),
                (f = new OrientShape),
                (f.shape = g),
                (h = new OrientShape),
                (h.shape = i),
                (outOrientShapeArray[0] = d),
                (outOrientShapeArray[1] = f),
                (outOrientShapeArray[2] = h),
                outOrientShapeArray.splice(3, outOrientShapeArray.length - 3);
        }
        else if (1 == posArray.length) {
            var n = arc.getCirclePos(posArray[0]);
            (ShapeSplitter.uM[0] = arc.get_startParameter()),
                (ShapeSplitter.uM[1] = n),
                (ShapeSplitter.uM[2] = arc.get_endParameter()),
                arc.get_startParameter(),
                arc.get_endParameter(),
                arc.get_startParameter(),
                (e = new Arc),
                arc.copyMetaDatasTo(e),
                e.initParam(
                    arc.get_centerX(),
                    arc.get_centerY(),
                    arc.get_radius(),
                    ShapeSplitter.uM[0],
                    ShapeSplitter.uM[1],
                    arc.get_winding()
                ),
                e.set_invertedNormals(arc.get_invertedNormals()),
                (g = new Arc),
                arc.copyMetaDatasTo(g),
                g.initParam(
                    arc.get_centerX(),
                    arc.get_centerY(),
                    arc.get_radius(),
                    ShapeSplitter.uM[1],
                    ShapeSplitter.uM[2],
                    arc.get_winding()
                ),
                g.set_invertedNormals(arc.get_invertedNormals()),
                e.set_startU(arc.get_startU());
            var o = arc.get_startU();
            e.set_endU((arc.get_endU() - o) * posArray[0] + o),
                g.set_startU(e.get_endU()),
                g.set_endU(arc.get_endU()),
                (d = new OrientShape),
                (d.shape = e),
                (f = new OrientShape),
                (f.shape = g),
                (outOrientShapeArray[0] = d),
                (outOrientShapeArray[1] = f),
                outOrientShapeArray.splice(2, outOrientShapeArray.length - 2);
        }
        else {
            ArrayTool.clear(outOrientShapeArray);
        }
    }
    splitLineByPos(line, posArray, outOrientShapeArray) {
        var vAC = new Point;
        var vAB = new Point;
        var count = posArray.length;
        outOrientShapeArray.splice(count + 1, outOrientShapeArray.length - (count + 1));
        Ub.uE(posArray);
        var prevPos = 0;
        var prevU = line.get_startU();
        for (var id = 0; count >= id; id++) {
            var curPos = count > id ? posArray[id] : 1,
                curU = (line.get_endU() - line.get_startU()) * curPos + line.get_startU();
            line.getPointAtPos(prevPos, vAB);
            line.getPointAtPos(curPos, vAC);
            var newLine = new Line;
            line.copyMetaDatasTo(newLine);
            newLine.initParam(vAB.x, vAB.y, vAC.x, vAC.y);
            newLine.set_startU(prevU);
            newLine.set_endU(curU);
            prevPos = curPos;
            prevU = curU;
            var orientShape = new OrientShape;
            orientShape.shape = newLine;
            outOrientShapeArray[id] = orientShape;
        }
    }
    splitShapeByPos(shape, posArray, outOrientShapeArray) {
        if (null != posArray && posArray.length > 0)
            if (ObjMan.__instanceof(shape, Arc))
                this.splitArcByPos(ObjMan.__cast(shape, Arc), posArray, outOrientShapeArray);
            else if (ObjMan.__instanceof(shape, ArcBase))
                this.splitArcBaseByPos(ObjMan.__cast(shape, ArcBase), posArray, outOrientShapeArray);
            else {
                if (!ObjMan.__instanceof(shape, Line))
                    throw new Error("Invalid type of shape: " + Std.string(shape));
                this.splitLineByPos(ObjMan.__cast(shape, Line), posArray, outOrientShapeArray);
            }
        else {
            ArrayTool.clear(outOrientShapeArray);
        }
    }
    u9(a, b, c) {
        return Math.ceil((a * b) / c);
    }
    getPosOfPointsOnShape(shape, ptArray, bUnCheck) {
        for (var count = ptArray.length, e = 0, posArray = new Array(0), g = 0; count > g; g++) {
            var h = shape.calcPosOnShape(ptArray[g], false);
            ((h > ShapeSplitter.PARAMETER_TOLERANCE && (1 - ShapeSplitter.PARAMETER_TOLERANCE) > h) || bUnCheck) && (posArray[e++] = h);
        }
        return posArray;
    }
}
ShapeSplitter.uJ = new Array(0);
ShapeSplitter.uK = new Array(0);
ShapeSplitter.TRIM_TOLERANCE_LENGTH = .01;
ShapeSplitter.gOrientShapeArray = new Array(0);
ShapeSplitter.PARAMETER_TOLERANCE = 1e-5;
ShapeSplitter.uM = new Array(0);

class SliceMath {
    static CompareSlice(a, b) {
        var c = a.middleShape.get_startValue(),
            d = b.middleShape.get_startValue();
        return d > c ? -1 : d > c ? 1 : 0;
    }
    static getMiddleShapeSinePos(sliceWrappersArray, angle) {
        if (null == sliceWrappersArray) return null;
        for (var c = sliceWrappersArray.length, d = new Array(c), e = 0; e < sliceWrappersArray.length; e++)
            d[e] = sliceWrappersArray[e].middleShape.get_SinePos(angle);
        return d;
    }
}
class RectangleGeometryWrapper {
    constructor() { }

    LW = null;
    v1 = null;
    v2 = null;
    v3 = null;
    v4 = null;
    pos1 = null;
    L1 = null;
    x1 = null;
    y3 = null;
    z3 = null;
    y1 = null;
    z1 = null;
    posZ1 = null;
    L7 = null;
    posZ2 = null;
    x2 = null;
    pos2 = null;
    u1 = null;
    u2 = null;
    u3 = null;
    u4 = null;
    Mc = null;
    posY1 = null;
    posY2 = null;
    y4 = null;
    z4 = null;
    y2 = null;
    circleLength = null;
    z2 = null;
    normalX = null;
    get_normalX() {
        return this.normalX;
    }
    set_normalX(a) {
        return (this.normalX = a), this.normalX;
    }
    radius = null;
    get_radius() {
        return this.radius;
    }
    set_radius(a) {
        return this.radius == a
            ? this.radius
            : ((this.radius = a), (this.circleLength = this.radius * MathConsts.TAU), this.radius);
    }
    LC = null;
    LE = null;
    LD = null;
    LF = null;
    setVertex1(x1, pos1) {
        (this.x1 = x1), (this.pos1 = pos1);
        var c = (pos1 / this.circleLength) * MathConsts.TAU;
        (this.posZ1 = Math.sin(c));
        (this.posY1 = Math.cos(c));
    }
    setVertex2(a, b) {
        this.x2 = a;
        this.pos2 = b;
        var c = (b / this.circleLength) * MathConsts.TAU;
        this.posZ2 = Math.sin(c);
        this.posY2 = Math.cos(c);
    }
    Ld(a, b, c, d) {
        (this.LW = a), (this.L1 = b), (this.Mc = c), (this.L7 = d);
    }
    setUVs(u1, u2, u3, u4, v1, v2, v3, v4) {
        (this.u1 = u1),
            (this.u2 = u2),
            (this.u3 = u3),
            (this.u4 = u4),
            (this.v1 = v1),
            (this.v2 = v2),
            (this.v3 = v3),
            (this.v4 = v4);
    }
    regulate() {
        var a = this.get_radius() - this.LW,
            b = this.get_radius() - this.L1,
            c = this.get_radius() - this.Mc,
            d = this.get_radius() - this.L7;
        (this.y1 = this.posY1 * a),
            (this.y2 = this.posY1 * b),
            (this.y3 = this.posY2 * c),
            (this.y4 = this.posY2 * d),
            (this.z1 = this.posZ1 * a),
            (this.z2 = this.posZ1 * b),
            (this.z3 = this.posZ2 * c),
            (this.z4 = this.posZ2 * d);
    }
    addWeightedRectGeometry(geoData, weight1, weight2) {
        null == weight2 && (weight2 = 1);
        null == weight1 && (weight1 = 0);
        0 == weight1 && 1 == weight2
            ? this.addRectangleToGeodata(
                this.x1,
                this.x2,
                this.y1,
                this.y2,
                this.y3,
                this.y4,
                this.z1,
                this.z2,
                this.z3,
                this.z4,
                this.u1,
                this.u2,
                this.u3,
                this.u4,
                this.v1,
                this.v2,
                this.v3,
                this.v4,
                this.normalX,
                geoData
            )
            : this.addRectangleToGeodata(
                this.x1 + (this.x2 - this.x1) * weight1,
                this.x1 + (this.x2 - this.x1) * weight2,
                this.y1 + (this.y3 - this.y1) * weight1,
                this.y2 + (this.y4 - this.y2) * weight1,
                this.y1 + (this.y3 - this.y1) * weight2,
                this.y2 + (this.y4 - this.y2) * weight2,
                this.z1 + (this.z3 - this.z1) * weight1,
                this.z2 + (this.z4 - this.z2) * weight1,
                this.z1 + (this.z3 - this.z1) * weight2,
                this.z2 + (this.z4 - this.z2) * weight2,
                this.u1 + (this.u3 - this.u1) * weight1,
                this.u2 + (this.u4 - this.u2) * weight1,
                this.u1 + (this.u3 - this.u1) * weight2,
                this.u2 + (this.u4 - this.u2) * weight2,
                this.v1 + (this.v3 - this.v1) * weight1,
                this.v2 + (this.v4 - this.v2) * weight1,
                this.v1 + (this.v3 - this.v1) * weight2,
                this.v2 + (this.v4 - this.v2) * weight2,
                this.normalX,
                geoData
            );
    }
    addRectangleToGeodata(x1, x2, y1, y2, y3, y4, z1, z2, z3, z4, u1, u2, u3, u4, v1, v2, v3, v4, normalX, geoData) {
        var u = geoData.vertexPositionData.length,
            v = geoData.uvData.length,
            w = (geoData.vertexPositionData.length / 3) | 0,
            indices = geoData.indices,
            len = indices.length;
        if (
            ((indices[len++] = w),
                (indices[len++] = w + 1),
                (indices[len++] = w + 3),
                (indices[len++] = w),
                (indices[len++] = w + 3),
                (indices[len++] = w + 2),
                ObjMan.__instanceof(geoData, MySimpleGeometryData))
        ) {
            var geoData = ObjMan.__cast(geoData, MySimpleGeometryData);
            (geoData.borderMap.h[w] = this.LE),
                (geoData.borderMap.h[w + 1] = this.LC),
                (geoData.borderMap.h[w + 2] = this.LF),
                (geoData.borderMap.h[w + 3] = this.LD);
        }
        (geoData.vertexPositionData[u] = x1),
            (geoData.vertexNormalData[u++] = normalX),
            (geoData.vertexPositionData[u] = y1),
            (geoData.vertexNormalData[u++] = 0),
            (geoData.vertexPositionData[u] = z1),
            (geoData.vertexNormalData[u++] = 0),

            (geoData.vertexPositionData[u] = x1),
            (geoData.vertexNormalData[u++] = normalX),
            (geoData.vertexPositionData[u] = y2),
            (geoData.vertexNormalData[u++] = 0),
            (geoData.vertexPositionData[u] = z2),
            (geoData.vertexNormalData[u++] = 0),

            (geoData.vertexPositionData[u] = x2),
            (geoData.vertexNormalData[u++] = normalX),
            (geoData.vertexPositionData[u] = y3),
            (geoData.vertexNormalData[u++] = 0),
            (geoData.vertexPositionData[u] = z3),
            (geoData.vertexNormalData[u++] = 0),

            (geoData.vertexPositionData[u] = x2),
            (geoData.vertexNormalData[u++] = normalX),
            (geoData.vertexPositionData[u] = y4),
            (geoData.vertexNormalData[u++] = 0),
            (geoData.vertexPositionData[u] = z4),
            (geoData.vertexNormalData[u++] = 0),

            (geoData.uvData[v++] = u1),
            (geoData.uvData[v++] = v1),
            (geoData.uvData[v++] = u2),
            (geoData.uvData[v++] = v2),
            (geoData.uvData[v++] = u3),
            (geoData.uvData[v++] = v3),
            (geoData.uvData[v++] = u4),
            (geoData.uvData[v++] = v4);
    }
}
class GeoDataWrapper extends MetaDataMap {
    constructor() {
        super();
    }

    K8 = null;
    meshDatas = null;
    K9 = null;
    geometryData = null;
    K_ = null;
}
class EngraveBender {
    cutGeoDataArray = null;
    normalFace = null;
    posTriangle = null;
    endPos = null;
    curGeoDataWrapper = null;
    J3 = null;
    vertexFace = null;
    normalTriangle = null;
    benderHelper = null;
    rectangleGeoWrapper = null;
    startPos = null;
    metaMan = null;
    circleLength = null;
    ShapeKeyArray = null;
    cutFaceWrappersArray = null;
    txtPolyDataArray = null;
    contextsSet = null;
    posTriangle = null;
    normalTriangle = null;

    constructor() {
        this.posTriangle = new Triangle();
        this.normalTriangle = new Triangle();
        this.benderHelper = new BenderHelper();
        this.rectangleGeoWrapper = new RectangleGeometryWrapper();
        this.faceCutter = new FaceCutter();
    }

    buildBendedMeshDataArray(modelMetaData, radius) {
        this.vertexFace = new Face3;
        this.vertexFace.initialize(new PointEx, new PointEx, new PointEx);
        this.normalFace = new Face3;
        this.normalFace.initialize(new PointEx, new PointEx, new PointEx);

        this.circleLength = radius * MathConsts.TAU;
        this.startPos = this.circleLength * modelMetaData.fromAngle;
        this.endPos = this.circleLength * modelMetaData.toAngle;
        var bFull = GeoNumComparor.Equal(modelMetaData.toAngle - modelMetaData.fromAngle, 1);
        var stepCount = modelMetaData.shapesWrapperArray.length - 1;
        this.rectangleGeoWrapper.set_radius(radius);

        var cutPolyCount = modelMetaData.txtPolyDatas.length;

        this.cutGeoDataArray = new Array(cutPolyCount);
        this.cutFaceWrappersArray = new Array(cutPolyCount);
        this.contextsSet = new ContextsSet();

        for (var n = 0; cutPolyCount > n; n++) {
            this.cutGeoDataArray[n] = this.createMySimpleGeometryData();
            this.cutFaceWrappersArray[n] = new Array(0);
            this.contextsSet.set(modelMetaData.txtPolyDatas[n], n);
        }

        this.txtPolyDataArray = modelMetaData.txtPolyDatas.slice();
        var newPosWrapper = new PosWrapper();
        var posWrapper = new PosWrapper(this.startPos, this.endPos);

        for (var index = 0; index < this.txtPolyDataArray.length; index++) {
            var polygon = this.txtPolyDataArray[index].get_polygon();
            var boundRect = polygon.get_boundingRect();
            newPosWrapper.set_start(boundRect.get_top());
            newPosWrapper.set_end(boundRect.get_bottom());
            if (posWrapper.contains(newPosWrapper)) {
                newPosWrapper.set_start(newPosWrapper.get_start() - this.circleLength);
                newPosWrapper.set_end(newPosWrapper.get_end() - this.circleLength);
                if (posWrapper.contains(newPosWrapper)) {
                    var newPolygon = polygon.clone(true);
                    newPolygon.translate(0, -this.circleLength);
                    var newSeparatePolyData = new SeparatePolyData(newPolygon);
                    var separatePolyData = this.txtPolyDataArray[index];
                    separatePolyData.get_additionalMetas().copyMetaDatasTo(newSeparatePolyData.get_additionalMetas());
                    separatePolyData.get_separateFilterMetas().copyMetaDatasTo(newSeparatePolyData.get_separateFilterMetas());
                    this.txtPolyDataArray.push(newSeparatePolyData);
                }
            }
            else {
                newPosWrapper.set_start(newPosWrapper.get_start() - this.circleLength);
                newPosWrapper.set_end(newPosWrapper.get_end() - this.circleLength);
                if (posWrapper.contains(newPosWrapper))
                    polygon.translate(0, -this.circleLength);
                else {
                    newPosWrapper.set_start(newPosWrapper.get_start() + 2 * this.circleLength);
                    newPosWrapper.set_end(newPosWrapper.get_end() + 2 * this.circleLength);
                    if (posWrapper.contains(newPosWrapper)) {
                        polygon.translate(0, this.circleLength);
                    }
                    else {
                        this.txtPolyDataArray.splice(index, 1);
                    }
                    --index;
                }
            }
        }
        this.prepareMetaMap(modelMetaData, EngraveBender.Params); //kkk todo

        var angle = modelMetaData.toAngle - modelMetaData.fromAngle,
            stepAngle = (angle * MathConsts.TAU) / stepCount,
            startAngle = modelMetaData.fromAngle * MathConsts.TAU,
            nextAngle = startAngle,
            deltaPos = (this.circleLength * angle) / stepCount,
            startPos = modelMetaData.fromAngle * this.circleLength,
            nextPos = startPos + deltaPos,
            prevShapesWrapper = null,
            prevQWrapperArray = null;

        for (var stepIndex = 0; stepCount > stepIndex; stepIndex++, startPos += deltaPos, startAngle += stepAngle) {
            var bStarted = (!bFull && 0 == stepIndex),
                bFinal = (!bFull && stepIndex == stepCount - 1);

            nextAngle = startAngle + stepAngle;
            nextPos = startPos + deltaPos;

            this.regulatePos(startPos);

            var sinA = Math.sin(startAngle),
                cosA = Math.cos(startAngle),
                sinB = Math.sin(nextAngle),
                cosB = Math.cos(nextAngle),
                shapesWrapper = modelMetaData.shapesWrapperArray[stepIndex],
                nextShapesWrapper = modelMetaData.shapesWrapperArray[stepIndex + 1],
                qWrapperArray = null;
            qWrapperArray = prevShapesWrapper == shapesWrapper && shapesWrapper == nextShapesWrapper
                ? prevQWrapperArray
                : ShapeExtruder.createExtrudeWrappers(shapesWrapper, nextShapesWrapper);

            var shapeCount = shapesWrapper.get_numOfShapes();
            for (var U = 0; shapeCount > U; U++) {
                var surfaceId = shapesWrapper.getShapeAt(U).getMetadata(ProfileMeta.PROFILE_SURFACE);
                var V = this.metaMan.metaMap.get(this.ShapeKeyArray[U]);
                this.curGeoDataWrapper = null != V ? V.value : null;
                var curGeometryData = this.curGeoDataWrapper.geometryData,
                    curIndices = curGeometryData.indices,
                    curVertexPositionData = curGeometryData.vertexPositionData,
                    curVertexNormalData = curGeometryData.vertexNormalData,
                    curUvData = curGeometryData.uvData,

                    qWrapper = qWrapperArray[U],
                    ptArray = qWrapper.ptArray,
                    dirArray = qWrapper.dirArray,
                    uvArray = qWrapper.uvArray,
                    nextPtArray = qWrapper.nextPtArray,
                    nextDirArray = qWrapper.nextDirArray,
                    nextUVArray = qWrapper.nextUVArray,
                    resolution = qWrapper.resolution,

                    ha = (this.curGeoDataWrapper.K8[0] == U) || this.curGeoDataWrapper.K9.h[U],
                    ia = (this.curGeoDataWrapper.K8[this.curGeoDataWrapper.K8.length - 1] == U) || this.curGeoDataWrapper.K_.h[U];
                for (var id = 0; resolution > id; id++) {
                    var firstOK,
                        secondOK,
                        x0_Id = 2 * id,
                        y0_Id = x0_Id + 1,
                        x1_Id = x0_Id + 2,
                        y1_Id = x1_Id + 1,

                        N1 = -dirArray[y0_Id],
                        N3 = -dirArray[y1_Id],
                        nN3 = -nextDirArray[y1_Id],

                        nN1 = -nextDirArray[y0_Id],

                        P1 = radius - ptArray[y0_Id],
                        P3 = radius - ptArray[y1_Id],
                        nP3 = radius - nextPtArray[y1_Id],
                        nP1 = radius - nextPtArray[y0_Id],

                        ya = (id == resolution - 1) && ia,
                        za = (0 == id) && ha;

                    firstOK = false; secondOK = false;

                    if (ptArray[x0_Id] == ptArray[x1_Id]) {
                        this.rectangleGeoWrapper.set_normalX(dirArray[x0_Id]);
                        this.rectangleGeoWrapper.setVertex1(ptArray[x0_Id], startPos);
                        this.rectangleGeoWrapper.setVertex2(nextPtArray[x1_Id], nextPos);
                        this.rectangleGeoWrapper.setUVs(uvArray[id], uvArray[id + 1], nextUVArray[id], nextUVArray[id + 1], startPos, startPos, nextPos, nextPos);
                        this.rectangleGeoWrapper.Ld(ptArray[y0_Id], ptArray[y1_Id], nextPtArray[y0_Id], nextPtArray[y1_Id]);
                        this.rectangleGeoWrapper.regulate();

                        var result = this.addRectGeometry(ptArray[x0_Id], startPos,
                            nextPtArray[x1_Id], nextPos,
                            0, NaN, 0, 0, 0, 0);

                        firstOK = !isNaN(result);
                        secondOK = firstOK; //kkk
                    }
                    else {
                        var winding = ptArray[x0_Id] < ptArray[x1_Id] ? -1 : 1;

                        this.setFaces(
                            ptArray[x0_Id], ptArray[x1_Id], nextPtArray[x1_Id], startPos, startPos, nextPos,
                            uvArray[id], uvArray[id + 1], nextUVArray[id + 1], startPos, startPos, nextPos,
                            winding);
                        this.vertexFace.get_b().set_borderIndex(this.vertexFace.get_c().set_borderIndex(ya ? 2 : 0));
                        this.vertexFace.get_a().set_borderIndex(za ? 1 : 0);
                        if (bStarted) {
                            this.vertexFace.get_a().set_borderIndex(4 | this.vertexFace.get_a().get_borderIndex());
                            this.vertexFace.get_b().set_borderIndex(4 | this.vertexFace.get_b().get_borderIndex());
                        }
                        if (bFinal)
                            this.vertexFace.get_c().set_borderIndex(8 | this.vertexFace.get_c().get_borderIndex());
                        this.benderHelper.setUvTriangles(this.vertexFace, this.normalFace);

                        firstOK = this.cutFace(surfaceId, this.vertexFace, 0);//kkk todo
                        // if (surfaceId == 'outer' && firstOK)
                        //     console.log('cutFace', surfaceId, this.vertexFace);
                        if (firstOK) {
                            this.posTriangle.get_A().setTo(ptArray[x0_Id], cosA * P1, sinA * P1);
                            this.posTriangle.get_B().setTo(ptArray[x1_Id], cosA * P3, sinA * P3);
                            this.posTriangle.get_C().setTo(nextPtArray[x1_Id], cosB * nP3, sinB * nP3);
                            this.posTriangle.regulate();
                            this.normalTriangle.get_A().setTo(dirArray[x0_Id], cosA * N1, sinA * N1);
                            this.normalTriangle.get_B().setTo(dirArray[x1_Id], cosA * N3, sinA * N3);
                            this.normalTriangle.get_C().setTo(nextDirArray[x1_Id], cosB * nN3, sinB * nN3);
                            this.normalTriangle.regulate();
                            this.benderHelper.setTriangles(this.posTriangle, this.normalTriangle);
                            this.makeCutFaceGeoData();//kkk todo
                        }

                        this.setFaces(
                            ptArray[x0_Id], nextPtArray[x1_Id], nextPtArray[x0_Id], startPos, nextPos, nextPos,
                            uvArray[id], nextUVArray[id + 1], nextUVArray[id], startPos, nextPos, nextPos,
                            winding);
                        this.vertexFace.get_b().set_borderIndex(ya ? 2 : 0);
                        this.vertexFace.get_a().set_borderIndex(this.vertexFace.get_c().set_borderIndex(za ? 1 : 0));
                        if (bStarted) {
                            this.vertexFace.get_a().set_borderIndex(4 | this.vertexFace.get_a().get_borderIndex());
                        }
                        if (bFinal) {
                            this.vertexFace.get_b().set_borderIndex(8 | this.vertexFace.get_b().get_borderIndex());
                        }
                        this.vertexFace.get_c().set_borderIndex(8 | this.vertexFace.get_c().get_borderIndex());
                        this.benderHelper.setUvTriangles(this.vertexFace, this.normalFace);

                        secondOK = this.cutFace(surfaceId, this.vertexFace, 0);
                        if (secondOK) {
                            this.posTriangle.get_A().setTo(ptArray[x0_Id], cosA * P1, sinA * P1);
                            this.posTriangle.get_B().setTo(nextPtArray[x1_Id], cosB * nP3, sinB * nP3);
                            this.posTriangle.get_C().setTo(nextPtArray[x0_Id], cosB * nP1, sinB * nP1);
                            this.posTriangle.regulate();
                            this.normalTriangle.get_A().setTo(dirArray[x0_Id], cosA * N1, sinA * N1);
                            this.normalTriangle.get_B().setTo(nextDirArray[x1_Id], cosB * nN3, sinB * nN3);
                            this.normalTriangle.get_C().setTo(nextDirArray[x0_Id], cosB * nN1, sinB * nN1);
                            this.normalTriangle.regulate();
                            this.benderHelper.setTriangles(this.posTriangle, this.normalTriangle);
                            this.makeCutFaceGeoData(); //kkk todo
                        }
                    }

                    var indicesId = 0,
                        posId = 0,
                        indicesVal = 0,
                        uvId = 0;

                    //bending
                    if (!firstOK) {
                        (indicesId = curIndices.length),
                            (posId = curVertexPositionData.length),
                            (indicesVal = (posId / 3) | 0),
                            (uvId = curUvData.length),
                            (curIndices[indicesId++] = indicesVal),
                            (curIndices[indicesId++] = indicesVal + 1),
                            (curIndices[indicesId++] = indicesVal + 2),
                            (curVertexPositionData[posId] = ptArray[x0_Id]),
                            (curVertexNormalData[posId++] = dirArray[x0_Id]),
                            (curVertexPositionData[posId] = cosA * P1),
                            (curVertexNormalData[posId++] = cosA * N1),
                            (curVertexPositionData[posId] = sinA * P1),
                            (curVertexNormalData[posId++] = sinA * N1),
                            (curUvData[uvId++] = uvArray[id]),
                            (curUvData[uvId++] = startPos),
                            (curVertexPositionData[posId] = ptArray[x1_Id]),
                            (curVertexNormalData[posId++] = dirArray[x1_Id]),
                            (curVertexPositionData[posId] = cosA * P3),
                            (curVertexNormalData[posId++] = cosA * N3),
                            (curVertexPositionData[posId] = sinA * P3),
                            (curVertexNormalData[posId++] = sinA * N3),
                            (curUvData[uvId++] = uvArray[id + 1]),
                            (curUvData[uvId++] = startPos),
                            (curVertexPositionData[posId] = nextPtArray[x1_Id]),
                            (curVertexNormalData[posId++] = nextDirArray[x1_Id]),
                            (curVertexPositionData[posId] = cosB * nP3),
                            (curVertexNormalData[posId++] = cosB * nN3),
                            (curVertexPositionData[posId] = sinB * nP3),
                            (curVertexNormalData[posId++] = sinB * nN3),
                            (curUvData[uvId++] = nextUVArray[id + 1]),
                            (curUvData[uvId++] = nextPos);
                    }
                    if (!secondOK) {
                        (indicesId = curIndices.length),
                            (posId = curVertexPositionData.length),
                            (indicesVal = (posId / 3) | 0),
                            (uvId = curUvData.length),
                            (curIndices[indicesId++] = indicesVal),
                            (curIndices[indicesId++] = indicesVal + 1),
                            (curIndices[indicesId++] = indicesVal + 2),
                            (curVertexPositionData[posId] = ptArray[x0_Id]),
                            (curVertexNormalData[posId++] = dirArray[x0_Id]),
                            (curVertexPositionData[posId] = cosA * P1),
                            (curVertexNormalData[posId++] = cosA * N1),
                            (curVertexPositionData[posId] = sinA * P1),
                            (curVertexNormalData[posId++] = sinA * N1),
                            (curUvData[uvId++] = uvArray[id]),
                            (curUvData[uvId++] = startPos),
                            (curVertexPositionData[posId] = nextPtArray[x1_Id]),
                            (curVertexNormalData[posId++] = nextDirArray[x1_Id]),
                            (curVertexPositionData[posId] = cosB * nP3),
                            (curVertexNormalData[posId++] = cosB * nN3),
                            (curVertexPositionData[posId] = sinB * nP3),
                            (curVertexNormalData[posId++] = sinB * nN3),
                            (curUvData[uvId++] = nextUVArray[id + 1]),
                            (curUvData[uvId++] = nextPos),
                            (curVertexPositionData[posId] = nextPtArray[x0_Id]),
                            (curVertexNormalData[posId++] = nextDirArray[x0_Id]),
                            (curVertexPositionData[posId] = cosB * nP1),
                            (curVertexNormalData[posId++] = cosB * nN1),
                            (curVertexPositionData[posId] = sinB * nP1),
                            (curVertexNormalData[posId++] = sinB * nN1),
                            (curUvData[uvId++] = nextUVArray[id]),
                            (curUvData[uvId++] = nextPos);
                    }
                }
                prevShapesWrapper = shapesWrapper;
                prevQWrapperArray = qWrapperArray;
            }
        }
        return this.extractGeoDatas();
    }
    cutFace(surfaceId, face, startId) {
        var result = false;

        var ctx = this.J3.contextArray[this.curGeoDataWrapper.__id__];
        var cutPolyCount = this.txtPolyDataArray.length;
        for (var id = startId; cutPolyCount > id; id++) {
            var separatePolyData = this.txtPolyDataArray[id];
            var curSurfaceId = separatePolyData.get_additionalMetas().getMetadata(ProfileMeta.PROFILE_SURFACE);
            if (surfaceId != curSurfaceId/* || ProfileMetaValue.PROFILE_SURFACE_INNER == curSurfaceId*/) //kkk todo todo
                continue;
            if (ctx.contextArray[separatePolyData.__id__]) {
                var faceWrapper = this.faceCutter.makeFaceWrapper(separatePolyData.get_polygon(), face);
                if (null != faceWrapper) {
                    result = true;
                    this.cutFaceWrappersArray[this.contextsSet.contextArray[separatePolyData.__id__]].push(faceWrapper);
                    var faceCutinArray = faceWrapper.faceCutinArray;

                    if (id + 1 < this.txtPolyDataArray.length) {
                        for (var k = 0; k < faceCutinArray.length; k++) {
                            if (this.cutFace(surfaceId, faceCutinArray[k], id + 1)) {
                                faceCutinArray.splice(k, 1);
                                --k;
                            }
                        }
                    }
                    break;
                }
            }
        }
        return result;
    }
    regulatePos(pos) {
        for (var id = 0; id < this.txtPolyDataArray.length;) {
            var polygon = this.txtPolyDataArray[id].get_polygon();
            if (polygon.get_boundingRect().get_bottom() < pos && polygon.get_boundingRect().get_top() < this.startPos)
                polygon.translate(0, this.circleLength);
            ++id;
        }
    }
    addRectGeometry(x1, y1, x2, y2, startIndex, weight, g, h, i, j) {
        null == j && (j = 0),
            null == i && (i = 0),
            null == h && (h = 0),
            null == g && (g = 0),
            null == startIndex && (startIndex = 0),
            (this.rectangleGeoWrapper.LC = g),
            (this.rectangleGeoWrapper.LD = h),
            (this.rectangleGeoWrapper.LE = i),
            (this.rectangleGeoWrapper.LF = j);

        var ptArray;
        var ctx = this.J3.contextArray[this.curGeoDataWrapper.__id__];
        for (var index = startIndex; index < this.txtPolyDataArray.length;) {
            var separatePolyData = this.txtPolyDataArray[index];
            if (ctx.contextArray[separatePolyData.__id__] != null) {
                var faceCutoutPolygon = separatePolyData.get_polygon();
                ptArray = this.faceCutter.trimFace(faceCutoutPolygon, x1, y1, x2, y2, true, new Array(0));
                if (0 != ptArray.length) {
                    var pt0 = ptArray[0],
                        distance = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)),
                        u = Math.sqrt((pt0.x - x1) * (pt0.x - x1) + (pt0.y - y1) * (pt0.y - y1)),
                        weight2 = u / distance,
                        weight1 = NaN,
                        newWeight = NaN;
                    if (1 == ptArray.length) {
                        this.faceCutter.isInFacePolygon(faceCutoutPolygon, x1, y1) ? (weight1 = 0, newWeight = weight2) : (weight1 = weight2, newWeight = 1);
                    }
                    else if (2 == ptArray.length) {
                        var pt1 = ptArray[1];
                        u = Math.sqrt((pt1.x - x1) * (pt1.x - x1) + (pt1.y - y1) * (pt1.y - y1));
                        var z = u / distance;
                        weight2 > z ? ((weight1 = z), (newWeight = weight2)) : ((weight1 = weight2), (newWeight = z));
                    }
                    if (null == this.curGeoDataWrapper.meshDatas[index].geometryData) {
                        this.curGeoDataWrapper.meshDatas[index].geometryData = this.createMySimpleGeometryData();
                        this.rectangleGeoWrapper.addWeightedRectGeometry(this.curGeoDataWrapper.meshDatas[index].geometryData, weight1, newWeight);
                    }
                    var A = this.addRectGeometry(x1, y1, x2, y2, index + 1, newWeight, g, h, i, j);
                    isNaN(A) && this.rectangleGeoWrapper.addWeightedRectGeometry(this.curGeoDataWrapper.geometryData, newWeight, 1);// A != A //org
                    isNaN(weight)
                        ? this.rectangleGeoWrapper.addWeightedRectGeometry(this.curGeoDataWrapper.geometryData, 0, weight1)
                        : this.rectangleGeoWrapper.addWeightedRectGeometry(this.curGeoDataWrapper.geometryData, weight, weight1); // defVal != defVal //org
                    return weight1;
                }
                if (this.faceCutter.isInFacePolygon(faceCutoutPolygon, x1, y1) && this.faceCutter.isInFacePolygon(faceCutoutPolygon, x2, y2)) {
                    if (null == this.curGeoDataWrapper.meshDatas[index].geometryData)
                        this.curGeoDataWrapper.meshDatas[index].geometryData = this.createMySimpleGeometryData();
                    this.rectangleGeoWrapper.addWeightedRectGeometry(this.curGeoDataWrapper.meshDatas[index].geometryData);
                    return 1;
                }
                ++index;
            } else ++index;
        }
        return NaN;
    }
    makeCutFaceGeoData() {
        var arraySize = this.cutFaceWrappersArray.length;
        for (var index = 0; arraySize > index; index++) {
            var cutFaceWrappers = this.cutFaceWrappersArray[index];
            var size = cutFaceWrappers.length;
            for (var n = 0; size > n; n++) {
                var faceWrapper = cutFaceWrappers.shift();
                var faceCutoutPolygon = faceWrapper.faceCutoutPolygon;
                if (null != faceCutoutPolygon) {
                    if (null == this.curGeoDataWrapper.meshDatas[index].geometryData)
                        this.curGeoDataWrapper.meshDatas[index].geometryData = this.createMySimpleGeometryData();
                    this.addGeoDataFromFacePolygon(faceCutoutPolygon, this.curGeoDataWrapper.meshDatas[index].geometryData);
                    this.curGeoDataWrapper.meshDatas[index].geometryData.testFlag = 1;
                }
                for (var id = 0; faceWrapper.faceCutinArray.length > id; id++) { //kkk todo todo
                    var face = faceWrapper.faceCutinArray[id];
                    this.addGeoDataFromFacePolygon(face, this.curGeoDataWrapper.geometryData);
                }
            }
        }
    }
    addGeoDataFromFacePolygon(facePolygon, geoData) {
        var vertexCount = (geoData.vertexPositionData.length / 3) | 0,
            d = facePolygon.get_trianglesIndices().length,
            indices = geoData.indices,
            indexCount = indices.length;
        var newIndexCount = indices.length + d;
        if (0 > newIndexCount) newIndexCount = 0;

        ArrayTool.clear(indices, newIndexCount);

        for (var k = 0; facePolygon.get_trianglesIndices().length > k; k++) {
            indices[indexCount] = vertexCount + facePolygon.get_trianglesIndices()[k];
            indexCount++;
        };

        this.benderHelper.appendGeometryFromFacePolygon(facePolygon, geoData);

        if (ObjMan.__instanceof(geoData, MySimpleGeometryData)) {
            var borderMap = ObjMan.__cast(geoData, MySimpleGeometryData).borderMap;
            for (k = 0; k < facePolygon.get_numOfPoints(); k++) {
                var m = facePolygon.getPointAt(k).get_borderIndex();
                borderMap.h[vertexCount + k] = m;
            }
        }
    }
    setFaces(ax1, bx1, cx1, ay1, by1, cy1,
        ax2, bx2, cx2, ay2, by2, cy2, winding) {
        this.vertexFace.get_a().setTo(ax1, ay1);
        this.vertexFace.get_b().setTo(bx1, by1);
        this.vertexFace.get_c().setTo(cx1, cy1);

        this.normalFace.get_a().setTo(ax2, ay2);
        this.normalFace.get_b().setTo(bx2, by2);
        this.normalFace.get_c().setTo(cx2, cy2);

        this.vertexFace.get_a().set_borderIndex(
            this.vertexFace.get_b().set_borderIndex(this.vertexFace.get_c().set_borderIndex(0))
        );
        this.vertexFace.set_winding(winding);
        this.vertexFace.invalidate();
        this.normalFace.set_winding(winding);
        this.normalFace.invalidate();
    }
    yS() {
        var a = new SimpleGeometryData();
        return (
            (a.indices = new Array(0)),
            (a.secondaryUvData = new Array(0)),
            (a.uvData = new Array(0)),
            (a.vertexNormalData = new Array(0)),
            (a.vertexPositionData = new Array(0)),
            a
        );
    }
    createMySimpleGeometryData() {
        var a = new MySimpleGeometryData();
        return (
            (a.indices = new Array(0)),
            (a.secondaryUvData = new Array(0)),
            (a.uvData = new Array(0)),
            (a.vertexNormalData = new Array(0)),
            (a.vertexPositionData = new Array(0)),
            (a.borderMap = new BMap()),
            a
        );
    }
    prepareMetaMap(modelMetaData, segmentKeyParams) {
        this.metaMan = new MetaMan();
        var shapesWrapper = modelMetaData.shapesWrapperArray[0],
            shapeCount = shapesWrapper.get_numOfShapes();
        this.ShapeKeyArray = new Array(shapeCount);
        var firstNormal = new Point(),
            lastNormal = new Point();
        this.J3 = new ContextsSet();
        var cutPolySize = modelMetaData.txtPolyDatas.length;
        for (var id = 0; shapeCount > id; id++) {
            var shape = shapesWrapper.getShapeAt(id),
                key = MetaKeyGenerator.generateMetaKey(segmentKeyParams, shape);
            this.ShapeKeyArray[id] = key;
            var k = this.metaMan.metaMap.get(key),
                geoDataWrapper = null != k ? k.value : null;
            if (null == geoDataWrapper) {
                geoDataWrapper = new GeoDataWrapper();
                var meta = this.metaMan.metaMap.get(key);
                if (null == meta) {
                    meta = new KeyPair(key, geoDataWrapper);
                    this.metaMan.metaMap.set(key, meta);
                    this.metaMan.metaArray.push(meta);
                }
                else meta.value = geoDataWrapper;
                geoDataWrapper.geometryData = this.createMySimpleGeometryData();
                geoDataWrapper.K8 = new Array(0);
                geoDataWrapper.K9 = new BMap();
                geoDataWrapper.K_ = new BMap();

                for (var o = 0; o < segmentKeyParams.length; o++) {
                    var keyParam = segmentKeyParams[o];
                    geoDataWrapper.addMetaData(keyParam, shape.getMetadata(keyParam));
                }
                geoDataWrapper.meshDatas = new Array(cutPolySize);
                for (var r = 0; cutPolySize > r; r++) {
                    var simpleMeshData = new SimpleMeshData();
                    geoDataWrapper.copyMetaDatasTo(simpleMeshData);
                    modelMetaData.txtPolyDatas[r].get_additionalMetas().copyMetaDatasTo(simpleMeshData);
                    geoDataWrapper.meshDatas[r] = simpleMeshData;
                }
            }
            else {
                shape.getPointAtPos(0, firstNormal);
                var t = geoDataWrapper.K8[geoDataWrapper.K8.length - 1];
                shapesWrapper.getShapeAt(t).getPointAtPos(1, lastNormal);
                PointComparator.EqualPoint(firstNormal, lastNormal, 0.01) ||
                    ((geoDataWrapper.K_.h[t] = true), (geoDataWrapper.K9.h[id] = true));
            }
            geoDataWrapper.K8.push(id);
            var contextsSet = new ContextsSet();
            this.J3.set(geoDataWrapper, contextsSet);
            for (var w = 0; this.txtPolyDataArray.length > w; w++) {
                var separatePolyData = this.txtPolyDataArray[w];
                contextsSet.set(separatePolyData, separatePolyData.get_separateFilterMetas().hasCommonMeta(geoDataWrapper));
            }
        }
    }
    extractGeoDatas() {
        var geoDatas = new Array(0);
        for (var b = new Iterator(this.metaMan.metaArray); b.hasNext();) {
            var geoDataWrapper = b.next();
            if (0 != geoDataWrapper.geometryData.indices.length) {
                var simpleMeshData = new SimpleMeshData();
                simpleMeshData.geometryData = geoDataWrapper.geometryData;
                geoDataWrapper.copyMetaDatasTo(simpleMeshData);
                geoDatas.push(simpleMeshData);
            }
            //kkk todo
            for (var meshData = geoDataWrapper.meshDatas, f = 0; f < meshData.length; f++) {
                var g = meshData[f];
                if (null != g.geometryData) geoDatas.push(g);
            }
        }
        return geoDatas;
    }
}
EngraveBender.Params = [
    SliceMeta.SLICE_INDEX,
    SliceMeta.SLICE_V_DIRECTION,
    GrooveMeta.GROOVE_INDEX,
    GrooveMeta.GROOVE_TYPE,
    ProfileMeta.PROFILE_SURFACE,
    CutPolyMeta.CUT_FILTER_PART,
    DiamondMeta.DIAMOND_PART,
    DiamondMeta.DIAMOND_GROUP_INDEX,
    ProfileMeta.PROFILE_HIDDEN].slice();

class SimpleBender {
    constructor() { }
    buildBendedMeshDataArray(modelMetaData, radius) {
        var stepSize = modelMetaData.shapesWrapperArray.length - 1,
            circleLength = radius * MathConsts.TAU,
            angle = modelMetaData.toAngle - modelMetaData.fromAngle,
            startPos = modelMetaData.fromAngle * MathConsts.TAU,
            deltaAngle = (angle * MathConsts.TAU) / stepSize,
            deltaPos = (angle / stepSize) * circleLength,
            i = startPos,
            j = startPos,
            curPos = modelMetaData.fromAngle * circleLength,
            prevPos = curPos,
            m = null,
            n = null,
            simpleMeshDataArray = ShapeExtruder.prepareMeshDatas(modelMetaData, stepSize);
        for (var id = 0; stepSize > id;) {
            i = j,
                j += deltaAngle,
                curPos = prevPos,
                prevPos += deltaPos;
            var q = null,
                r = Math.sin(i),
                s = Math.cos(i),
                t = Math.sin(j),
                u = Math.cos(j),
                shapesWrapper1 = modelMetaData.shapesWrapperArray[id],
                shapesWrapper2 = modelMetaData.shapesWrapperArray[id + 1];
            q = m == shapesWrapper1 && shapesWrapper1 == shapesWrapper2 ? n : ShapeExtruder.createExtrudeWrappers(shapesWrapper1, shapesWrapper2);
            for (var index = 0; index < shapesWrapper1.get_numOfShapes();) {
                var y = q[index],
                    z = y.ptArray,
                    A = y.dirArray,
                    B = y.uvArray,
                    C = y.nextPtArray,
                    D = y.nextDirArray,
                    E = y.nextUVArray,
                    F = y.resolution,
                    geometryData = simpleMeshDataArray[index].geometryData,
                    H = 4 * F * id,
                    I = 6 * F * id,
                    J = 3 * H,
                    K = 2 * H,
                    indices = geometryData.indices,
                    vertexPositionData = geometryData.vertexPositionData,
                    vertexNormalData = geometryData.vertexNormalData,
                    uvData = geometryData.uvData;
                for (var id0 = 0; F > id0;) {
                    var Q = (J / 3) | 0;
                    (indices[I++] = Q),
                        (indices[I++] = Q + 1),
                        (indices[I++] = Q + 2),
                        (indices[I++] = Q),
                        (indices[I++] = Q + 2),
                        (indices[I++] = Q + 3);
                    var R = 2 * id0,
                        S = R + 1,
                        T = radius - z[S],
                        U = -A[S];
                    (vertexPositionData[J] = z[R]),
                        (vertexNormalData[J++] = A[R]),
                        (vertexPositionData[J] = s * T),
                        (vertexNormalData[J++] = s * U),
                        (vertexPositionData[J] = r * T),
                        (vertexNormalData[J++] = r * U),
                        (uvData[K++] = B[id0]),
                        (uvData[K++] = curPos),
                        (R = 2 * (id0 + 1)),
                        (S = R + 1),
                        (T = radius - z[S]),
                        (U = -A[S]),
                        (vertexPositionData[J] = z[R]),
                        (vertexNormalData[J++] = A[R]),
                        (vertexPositionData[J] = s * T),
                        (vertexNormalData[J++] = s * U),
                        (vertexPositionData[J] = r * T),
                        (vertexNormalData[J++] = r * U),
                        (uvData[K++] = B[id0 + 1]),
                        (uvData[K++] = curPos),
                        (T = radius - C[S]),
                        (U = -D[S]),
                        (vertexPositionData[J] = C[R]),
                        (vertexNormalData[J++] = D[R]),
                        (vertexPositionData[J] = u * T),
                        (vertexNormalData[J++] = u * U),
                        (vertexPositionData[J] = t * T),
                        (vertexNormalData[J++] = t * U),
                        (uvData[K++] = E[id0 + 1]),
                        (uvData[K++] = prevPos),
                        (R = 2 * id0),
                        (S = R + 1),
                        (T = radius - C[S]),
                        (U = -D[S]),
                        (vertexPositionData[J] = C[R]),
                        (vertexNormalData[J++] = D[R]),
                        (vertexPositionData[J] = u * T),
                        (vertexNormalData[J++] = u * U),
                        (vertexPositionData[J] = t * T),
                        (vertexNormalData[J++] = t * U),
                        (uvData[K++] = E[id0]),
                        (uvData[K++] = prevPos),
                        ++id0;
                }
                ++index;
            }
            m = shapesWrapper1,
                n = q,
                ++id;
        }
        return simpleMeshDataArray;
    }
}
class BenderHelper {
    constructor() {
        this.uvDataPt = new Point();
        this.posData = new Vector3D();
        this.normalData = new Vector3D();
        this.hK = new Vector3D();
        this.uvTriangle1 = new UvTriangle();
        this.uvTriangle2 = new UvTriangle();
    }

    posData = null;
    uvTriangle2 = null;
    normalData = null;
    hK = null;
    uvTriangle1 = null;
    posTriangle = null;
    normalTriangle = null;
    uvDataPt = null;
    setUvTriangles(vertexFace, normalFace) {
        this.uvTriangle1.initialize(vertexFace.get_a(), vertexFace.get_b(), vertexFace.get_c());
        this.uvTriangle1.regulate();
        this.uvTriangle2.initialize(normalFace.get_a(), normalFace.get_b(), normalFace.get_c());
        this.uvTriangle2.regulate();
    }
    setTriangles(posTriangle, normalTriangle) {
        this.posTriangle = posTriangle;
        this.normalTriangle = normalTriangle;
    }
    appendGeometryFromFacePolygon(facePolygon, geoData) {
        var posDataLen = geoData.vertexPositionData.length;
        var uvDataLen = geoData.uvData.length;
        var ptCount = facePolygon.get_numOfPoints();
        for (var id = 0; ptCount > id; id++) {
            var pt = facePolygon.getPointAt(id);//kkk todo
            this.uvTriangle1.hV(pt.x, pt.y, this.hK);
            this.uvTriangle2.hW(this.hK, this.uvDataPt);
            this.posTriangle.hW(this.hK, this.posData);
            this.normalTriangle.hW(this.hK, this.normalData);

            var index = 3 * id + posDataLen;
            geoData.vertexPositionData[index] = this.posData.x;
            geoData.vertexPositionData[index + 1] = this.posData.y;
            geoData.vertexPositionData[index + 2] = this.posData.z;
            geoData.vertexNormalData[index] = this.normalData.x;
            geoData.vertexNormalData[index + 1] = this.normalData.y;
            geoData.vertexNormalData[index + 2] = this.normalData.z;

            index = 2 * id + uvDataLen;
            geoData.uvData[index] = this.uvDataPt.x;
            geoData.uvData[index + 1] = this.uvDataPt.y;
        }
    }
}
class UvTriangle {
    constructor() {
        this.vAB = new Point();
        this.vAC = new Point();
        this.vAP = new Point();

        this.ptA = new Point();
        this.ptB = new Point();
        this.ptC = new Point();
    }

    vAC = null;
    hY = null;
    vAB = null;
    h0 = null;
    h1 = null;
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
    hV(x, y, outVertex) {
        this.vAP.setTo(x - this.get_A().x, y - this.get_A().y);
        var d,
            // e = (this.vAB.x * this.vAC.y - this.vAC.x * this.vAB.y);//kkk org
            e = this.vAB.vectorProduct(this.vAC);//(this.vAB.x * this.vAC.y - this.vAC.x * this.vAB.y);
        var vX = this.vAP.vectorProduct(this.vAC) / e;//(this.vAP.x * this.vAC.y - this.vAC.x * this.vAP.y) / e;
        var vY = this.vAB.vectorProduct(this.vAP) / e;//(this.vAB.x * this.vAP.y - this.vAP.x * this.vAB.y) / e;
        var vZ = 1 - vX - vY;
        null != outVertex ? ((d = outVertex), outVertex.setTo(vX, vY, vZ)) : (d = new Vector3D(vX, vY, vZ));
        return d;
    }
    hW(a, outPt) {
        var pt,
            x = this.get_A().x * a.z +
                this.get_B().x * a.x +
                this.get_C().x * a.y,
            y = this.get_A().y * a.z +
                this.get_B().y * a.x +
                this.get_C().y * a.y;
        return null != outPt ? ((pt = outPt), outPt.setTo(x, y)) : (pt = new Point(x, y)), pt;
    }
    initialize(a, b, c) {
        this.ptA = a;
        this.ptB = b;
        this.ptC = c;
        this.regulate();
    }
    regulate() {
        this.vAB.setTo(this.get_B().x - this.get_A().x, this.get_B().y - this.get_A().y);
        this.vAC.setTo(this.get_C().x - this.get_A().x, this.get_C().y - this.get_A().y);
    }
}
class BenderWrapper {
    constructor() { }
    static makeGeometry(modelMetaData, radius) {
        var simpleBender = new SimpleBender;
        var engraveBender = new EngraveBender;
        var c;
        if (null != modelMetaData.txtPolyDatas && 0 != modelMetaData.txtPolyDatas.length)
            c = engraveBender.buildBendedMeshDataArray(modelMetaData, radius); //kkk todo
        else
            c = simpleBender.buildBendedMeshDataArray(modelMetaData, radius);
        for (var id = 0; id < c.length; id++) {
            modelMetaData.copyMetaDatasTo(c[id]);
        }
        return c;
    }
}

class ExtrudeWrapper {
    constructor() { }
    resolution = null;
    ptArray = null;
    dirArray = null;
    uvArray = null;
    nextPtArray = null;
    nextDirArray = null;
    nextUVArray = null;
}
class ShapeExtruder {
    constructor() { }
    static createExtrudeWrappers(shapesWrapper, nextShapesWrapper) {
        var qWrapper,
            shape;
        var shapeCount = shapesWrapper.get_numOfShapes();
        var nextShapeCount = nextShapesWrapper.get_numOfShapes();
        var qWrapperArray = new Array(shapeCount);
        for (var n = 0; shapeCount > n; n++) {
            qWrapper = new ExtrudeWrapper();
            shape = shapesWrapper.getShapeAt(n);
            qWrapper.resolution = shape.get_resolution();
            qWrapper.ptArray = shape.getPointArray(shape.get_resolution());
            qWrapper.dirArray = shape.getDirectionArray(shape.get_resolution());
            qWrapper.uvArray = shape.calcUArray(shape.get_resolution());
            qWrapperArray[n] = qWrapper;
        }
        for (n = 0; nextShapeCount > n; n++) {
            qWrapper = qWrapperArray[n];
            shape = nextShapesWrapper.getShapeAt(n);
            qWrapper.resolution = shape.get_resolution();
            qWrapper.nextPtArray = shape.getPointArray(shape.get_resolution());
            qWrapper.nextDirArray = shape.getDirectionArray(shape.get_resolution());
            qWrapper.nextUVArray = shape.calcUArray(shape.get_resolution());
        }
        return qWrapperArray;
    }
    static prepareMeshDatas(modelMetaData, stepSize) {
        var shapesWrapper = modelMetaData.shapesWrapperArray[0],
            count = shapesWrapper.get_numOfShapes(),
            meshDataArray = new Array(count);
        for (var id = 0; count > id; id++) {
            var shape = shapesWrapper.getShapeAt(id),
                simpleGeoData = new SimpleGeometryData(),
                totalSize = shape.get_resolution() * stepSize;
            simpleGeoData.indices = new Array(0);
            simpleGeoData.vertexPositionData = new Array(3 * totalSize);
            simpleGeoData.uvData = new Array(2 * totalSize);
            simpleGeoData.vertexNormalData = new Array(3 * totalSize);
            var simpleMeshData = new SimpleMeshData();
            simpleMeshData.geometryData = simpleGeoData;
            shape.copyMetaDatasTo(simpleMeshData);
            modelMetaData.copyMetaDatasTo(simpleMeshData);
            meshDataArray[id] = simpleMeshData;
        }
        return meshDataArray;
    }
}
class SegmentCreator {
    constructor() {
        this.translatorArray = new Array(0);
        this.translation = 0;
        this.diamondLocator = new DiamondLocator();
        this.diamondMetaDataMap = new MetaDataMap();
        this.diamondMetaDataMap.addMetaData(CutPolyMeta.CUT_FILTER_PART, CutPolyMetaValue.CUT_FILTER_PART_DIAMOND);
        this.engravingMetaDataMap = new MetaDataMap();
        this.engravingMetaDataMap.addMetaData(CutPolyMeta.CUT_FILTER_PART, CutPolyMetaValue.CUT_FILTER_PART_ENGRAVING);
    }
    static regulateSeparatePolyDatas(segmentWrapperArray, circleLength) {
        for (var id = 0; id < segmentWrapperArray.length;) {
            var segmentWrapper = segmentWrapperArray[id];
            if (null != segmentWrapper.txtPolyDatas && segmentWrapper.txtPolyDatas.length > 0) {
                var newSeparatePolyDatas = new Array(0);
                for (var k = 0; k < segmentWrapper.txtPolyDatas.length; k++) {
                    var separatePolyData = segmentWrapper.txtPolyDatas[k];
                    if (PosWrapper.checkTopology(
                        separatePolyData.get_polygon().get_boundingRect().get_top() / circleLength,
                        separatePolyData.get_polygon().get_boundingRect().get_bottom() / circleLength,
                        segmentWrapper.start, segmentWrapper.end
                    )) {
                        newSeparatePolyDatas.push(separatePolyData);
                    }
                }
                segmentWrapper.txtPolyDatas = null;
                0 != newSeparatePolyDatas.length && (segmentWrapper.txtPolyDatas = newSeparatePolyDatas);
            }
            ++id;
        }
    }

    translation = null;
    translatorArray = null;
    FD = null;
    diamondLocator = null;
    diamondMetaDataMap = null;
    engravingMetaDataMap = null;
    circumference = null;
    get_circumference() {
        return this.circumference;
    }
    set_circumference(a) {
        return this.circumference == a ? this.circumference : ((this.circumference = a), this.circumference);
    }
    get_Translation(geoData) {
        if (!geoData.hasMetadata(TranslationMeta.TRANSLATION_KEY))
            return null;
        var translation = geoData.getMetadata(TranslationMeta.TRANSLATION_KEY);
        return translation >= this.translation ? null : this.translatorArray[translation];
    }
    createDiamondSegmentWrapper(segmentWrapper, diamond) {
        var segmentWrappersArray = this.makeDiamondSegmentWrapper(segmentWrapper, diamond);
        this.FD = true;
        return segmentWrappersArray;
    }
    //kkk todotodo
    makeDiamondSegmentWrapper(segmentWrapper, diamond) {
        var segmentWrappersArray = new Array(0);
        if (
            (DiamondSurfaceType.RUBBED == diamond.get_carvingType() ||
                DiamondSurfaceType.RUBBED_EDGELESS == diamond.get_carvingType() ||
                "memoire2" == diamond.get_carvingType() ||
                "memoire4" == diamond.get_carvingType() ||
                ((DiamondMetaValue.DIAMOND_PART_SECTION == diamond.get_carvingType() ||
                    DiamondSurfaceType.SECTION_INSET == diamond.get_carvingType() ||
                    DiamondSurfaceType.SECTION_SHARED == diamond.get_carvingType()) &&
                    DiamondPlacementType.VERTICAL == diamond.get_orientation() &&
                    1 == diamond.get_numOfCols())) &&
            diamond.get_GrooveEdge().get_isStraight() &&
            this.isNotStraight(segmentWrapper)
        ) {
            var engravingPosWrapper = new PosWrapper(segmentWrapper.start, segmentWrapper.end);
            var shapesArray = RingMath.getMetaMatchedShapes(segmentWrapper.shapesWrapper, this.engravingMetaDataMap);
            if (null != shapesArray && shapesArray.length > 0) {
                var shapesWrapper = new ShapesWrapper;
                for (var i = 0; i < shapesArray.length; i++) {
                    var shape = shapesArray[i];
                    var newShape = shape.clone(null);
                    newShape.addMetaData(ProfileMeta.PROFILE_HIDDEN, true);
                    shapesWrapper.addShape(newShape);
                    shape.removeMetaData(CutPolyMeta.CUT_FILTER_PART);
                }
                var newSegmentWrapper = segmentWrapper.clone();
                newSegmentWrapper.shapesWrapper = shapesWrapper;
                newSegmentWrapper.diamondArray = null;
                segmentWrappersArray.push(newSegmentWrapper);
                for (var m = 0; m < segmentWrapper.txtPolyDatas.length; m++) {
                    if (segmentWrapper.txtPolyDatas[m].get_separateFilterMetas().hasMetadata(CutPolyMeta.CUT_FILTER_PART)) {
                        segmentWrapper.txtPolyDatas.splice(m, 1);
                        --m;
                    }
                }
            }
            var shapesWrapper = segmentWrapper.shapesWrapper;
            this.diamondLocator.set_circumference(this.get_circumference());
            this.diamondLocator.set_segmentStart(engravingPosWrapper.get_start());
            this.diamondLocator.set_segmentEnd(engravingPosWrapper.get_end());

            var diaPlacementArray = this.diamondLocator.calcDiamondPlacements(diamond);
            var engravingPosWrapperArray = new Array(0);
            for (var q = 0; q < diaPlacementArray.length; q++) {
                var diaPlacement = diaPlacementArray[q];
                var fromAngle = diaPlacement.fromAngle;
                if (isNaN(fromAngle)) {//t != t //kkk org
                    if (
                        DiamondSurfaceType.SECTION == diamond.get_carvingType() ||
                        DiamondSurfaceType.SECTION_INSET == diamond.get_carvingType() ||
                        DiamondSurfaceType.SECTION_SHARED == diamond.get_carvingType()
                    ) {
                        var stoneData = diaPlacement.get_stoneData();
                        fromAngle = (stoneData.shiftAngleOnSurface - stoneData.diaHeight / 2) / this.get_circumference() - SegmentCreator.MIN_FILL_PARAM_LENGTH;
                    }
                    else {
                        fromAngle = diaPlacement.get_cutPoly().get_polygon().get_boundingRect().get_top() /
                            this.get_circumference() - SegmentCreator.MIN_FILL_PARAM_LENGTH;
                    }
                }
                var toAngle = diaPlacement.toAngle;
                if (isNaN(toAngle)) {//v != v //kkk org
                    if (
                        DiamondSurfaceType.SECTION == diamond.get_carvingType() ||
                        DiamondSurfaceType.SECTION_INSET == diamond.get_carvingType() ||
                        DiamondSurfaceType.SECTION_SHARED == diamond.get_carvingType()
                    ) {
                        var w = diaPlacement.get_stoneData();
                        toAngle = (w.shiftAngleOnSurface + w.diaHeight / 2) / this.get_circumference() + SegmentCreator.MIN_FILL_PARAM_LENGTH;
                    }
                    else {
                        toAngle = diaPlacement.get_cutPoly().get_polygon().get_boundingRect().get_bottom() /
                            this.get_circumference() + SegmentCreator.MIN_FILL_PARAM_LENGTH;
                    }
                }
                var x = 0,
                    y = 0;
                DiamondSurfaceType.SECTION == diamond.get_carvingType() || DiamondSurfaceType.SECTION_INSET == diamond.get_carvingType()
                    ? ((y = diamond.get_gap() / 2 / this.get_circumference()), (x = y))
                    : DiamondSurfaceType.SECTION_SHARED == diamond.get_carvingType() &&
                    ((y = (diamond.get_gap() / 2 + diamond.getDiamondConfig(0).diaWidth / 2 / 2) / this.get_circumference()),
                        (x = y));
                (fromAngle -= x);
                (toAngle += y);

                var newEngravingPosWrapper = new PosWrapper(fromAngle, toAngle);
                engravingPosWrapper.contains(newEngravingPosWrapper) || newEngravingPosWrapper.tt();
                engravingPosWrapperArray.push(newEngravingPosWrapper);

                var newSegmentWrapper = this.createSegmentWrapper(newEngravingPosWrapper, shapesWrapper);
                newSegmentWrapper.txtPolyDatas = segmentWrapper.txtPolyDatas;
                newSegmentWrapper.grooves = segmentWrapper.grooves;
                newSegmentWrapper.sliceWrappersArray = segmentWrapper.sliceWrappersArray;
                newSegmentWrapper.diamondArray = segmentWrapper.diamondArray;
                newSegmentWrapper.diamondArray[0].set_cutPolys(new Array(0));
                newSegmentWrapper.diamondArray[0].get_cutPolys().push(diaPlacement.get_cutPoly());

                var B = segmentWrapper.txtPolyDatas,
                    C = B.indexOf(diaPlacement.get_cutPoly());
                -1 != C && B.splice(C, 1);
                segmentWrappersArray.push(newSegmentWrapper);

                var D = diaPlacement.get_translateYs().length;
                if (0 != D) {
                    var E = new Array(D);
                    for (var F = 0; D > F; F++) {
                        var G = diaPlacement.get_translateYs()[F] / this.get_circumference(),
                            H = new PosWrapper(fromAngle + G, toAngle + G);
                        engravingPosWrapper.contains(H) || H.tt();
                        engravingPosWrapperArray.push(H);
                        E[F] = new Translator(G, this.get_circumference());
                    }
                    this.translatorArray[this.translation] = E;
                    null == newSegmentWrapper.metaDataMap && (newSegmentWrapper.metaDataMap = new MetaDataMap());
                    newSegmentWrapper.metaDataMap.addMetaData(TranslationMeta.TRANSLATION_KEY, this.translation);
                    this.translation++;
                }
            }

            var newEngravingPosWrapperArray = PosMath.IncludeEngravingPosWrapper(engravingPosWrapper, engravingPosWrapperArray, SegmentCreator.MIN_FILL_PARAM_LENGTH);
            for (var k = 0; k < newEngravingPosWrapperArray.length; k++) {
                var newSegmentWrapper = this.createSegmentWrapper(newEngravingPosWrapperArray[k], shapesWrapper);
                newSegmentWrapper.grooves = segmentWrapper.grooves;
                newSegmentWrapper.sliceWrappersArray = segmentWrapper.sliceWrappersArray;

                (DiamondSurfaceType.SECTION == diamond.get_carvingType() ||
                    DiamondSurfaceType.SECTION_INSET == diamond.get_carvingType() ||
                    DiamondSurfaceType.SECTION_SHARED == diamond.get_carvingType()) &&
                    (newSegmentWrapper.diamondArray = segmentWrapper.diamondArray);
                segmentWrappersArray.push(newSegmentWrapper);
            }
        }
        else {
            segmentWrappersArray[0] = segmentWrapper;
        }
        return segmentWrappersArray;
    }
    isNotStraight(segmentWrapper) {
        if (null != segmentWrapper.sliceWrappersArray) {
            for (var n = 0; n < segmentWrapper.sliceWrappersArray.length;) {
                var sliceWrapper = segmentWrapper.sliceWrappersArray[n];
                ++n;
                if (!sliceWrapper.middleShape.get_isStraight()) return false;
            }
        }
        if (null != segmentWrapper.grooves) {
            for (var e = 0; e < segmentWrapper.grooves.length;) {
                var g = segmentWrapper.grooves[e];
                ++e;
                if (!g.grooveEdge.get_isStraight()) return false;
            }
        }
        return true;
    }
    createSegmentWrapper(engravingPosWrapper, shapesWrapper) {
        var segmentWrapper = new SegmentWrapper();
        segmentWrapper.start = engravingPosWrapper.get_start();
        segmentWrapper.end = engravingPosWrapper.get_end();
        segmentWrapper.shapesWrapper = shapesWrapper;
        segmentWrapper.radius = this.circumference / MathConsts.TAU;
        return segmentWrapper;
    }
}
SegmentCreator.MIN_FILL_PARAM_LENGTH = 1e-4;
class TranslatorBase {
    constructor() { }

    Rotate(a) {
        throw new Error("This is an Abstract method!");
    }
    Translate(a) {
        throw new Error("This is an Abstract method!");
    }
}
class Translator extends TranslatorBase {
    constructor(a, b) {
        super();
        this.rotation = a;
        this.vScale = b;
    }

    vScale = null;
    rotation = null;
    get_Rotation() {
        return this.rotation;
    }
    Rotate(geoData) {
        var simpleMeshData = new SimpleMeshData();
        geoData.copyMetaDatasTo(simpleMeshData);
        simpleMeshData.geometryData = SimpleGeometryDataUtil.cloneGeometry(geoData.geometryData);
        null != geoData.transformation
            ? (simpleMeshData.transformation = geoData.transformation.clone())
            : (simpleMeshData.transformation = new Matrix3D());
        simpleMeshData.transformation.appendRotation(
            360 * this.get_Rotation(),
            X_AXIS, new Vector3D());

        var vOffset = this.vScale * this.get_Rotation(),
            uvData = simpleMeshData.geometryData.uvData,
            uvLength = uvData.length;

        for (var f = 0; uvLength > f;) {
            uvData[f + 1] = uvData[f + 1] + vOffset;
            f += 2;
        }
        return simpleMeshData;
    }
    Translate(a) {
        var b = a.clone();
        b.fromAngle += this.get_Rotation();
        b.toAngle += this.get_Rotation();
        return b;
    }
}
class CylindricalHelper {
    constructor() { }
    static projectToZeroPlane(a) {
        for (var b = a.length, c = new Array(0), d = 0; b > d;) {
            var e = a[d + 1],
                f = a[d + 2];
            (c[(d / 3) | 0] = new Point(a[d], Math.sqrt(e * e + f * f))), (d += 3);
        }
        return c;
    }
    static addCylindricalTopology(
        simpleGeometryData,
        midY,
        midZ,
        xDir,
        yDir,
        step,
        isTangent
    ) {
        null == isTangent && (isTangent = false),
            null == step && (step = 0.25),
            null == yDir && (yDir = 1),
            null == xDir && (xDir = 1),
            null == midZ && (midZ = 0),
            null == midY && (midY = 0);
        for (
            var h = 0.5,
            topoYLimit = h + step,
            topoCount = (simpleGeometryData.vertexPositionData.length / 3) | 0,
            _vertexTopologyData = new Array(2 * topoCount),
            l = simpleGeometryData.indices.length,
            m = 0;
            l > m;

        ) {
            var n = simpleGeometryData.indices[m],
                index = 3 * n,
                x1 = simpleGeometryData.vertexPositionData[index],
                y1 = simpleGeometryData.vertexPositionData[index + 1],
                z1 = simpleGeometryData.vertexPositionData[index + 2],
                tX1 = x1,
                tY1 = Math.atan2(z1 - midZ, y1 - midY) / (2 * Math.PI) + 0.5 + step;

            (n = simpleGeometryData.indices[m + 1]), (index = 3 * n);
            var x2 = simpleGeometryData.vertexPositionData[index],
                y2 = simpleGeometryData.vertexPositionData[index + 1],
                z2 = simpleGeometryData.vertexPositionData[index + 2],
                tX2 = x2,
                tY2 = Math.atan2(z2 - midZ, y2 - midY) / (2 * Math.PI) + 0.5 + step;

            (n = simpleGeometryData.indices[m + 2]), (index = 3 * n);
            var x3 = simpleGeometryData.vertexPositionData[index],
                y3 = simpleGeometryData.vertexPositionData[index + 1],
                z3 = simpleGeometryData.vertexPositionData[index + 2],
                tX3 = x3,
                tY3 = Math.atan2(z3 - midZ, y3 - midY) / (2 * Math.PI) + 0.5 + step;

            if (
                ((n = simpleGeometryData.indices[m]),
                    (index = 2 * n),
                    (_vertexTopologyData[index] = tX1 * xDir),
                    (_vertexTopologyData[index + 1] = tY1 * yDir),
                    (n = simpleGeometryData.indices[m + 1]),
                    (index = 2 * n),
                    (_vertexTopologyData[index] = tX2 * xDir),
                    (_vertexTopologyData[index + 1] = tY2 * yDir),
                    (n = simpleGeometryData.indices[m + 2]),
                    (index = 2 * n),
                    (_vertexTopologyData[index] = tX3 * xDir),
                    (_vertexTopologyData[index + 1] = tY3 * yDir),
                    Math.max(tY1, Math.max(tY2, tY3)) - Math.min(tY1, Math.min(tY2, tY3)) >
                    h)
            ) {
                tY1 > topoYLimit && --tY1,
                    tY2 > topoYLimit && --tY2,
                    tY3 > topoYLimit && --tY3,
                    (n = simpleGeometryData.indices[m]),
                    (index = 3 * n);
                var nX1 = simpleGeometryData.vertexNormalData[index],
                    nY1 = simpleGeometryData.vertexNormalData[index + 1],
                    nZ1 = simpleGeometryData.vertexNormalData[index + 2];
                (n = simpleGeometryData.indices[m + 1]), (index = 3 * n);
                var nX2 = simpleGeometryData.vertexNormalData[index],
                    nY2 = simpleGeometryData.vertexNormalData[index + 1],
                    nZ2 = simpleGeometryData.vertexNormalData[index + 2];
                (n = simpleGeometryData.indices[m + 2]), (index = 3 * n);
                var nX3 = simpleGeometryData.vertexNormalData[index],
                    nY3 = simpleGeometryData.vertexNormalData[index + 1],
                    nZ3 = simpleGeometryData.vertexNormalData[index + 2];

                (simpleGeometryData.indices[m] = topoCount++),
                    (simpleGeometryData.indices[m + 1] = topoCount++),
                    (simpleGeometryData.indices[m + 2] = topoCount++),
                    simpleGeometryData.vertexPositionData.push(x1),
                    simpleGeometryData.vertexPositionData.push(y1),
                    simpleGeometryData.vertexPositionData.push(z1),
                    simpleGeometryData.vertexPositionData.push(x2),
                    simpleGeometryData.vertexPositionData.push(y2),
                    simpleGeometryData.vertexPositionData.push(z2),
                    simpleGeometryData.vertexPositionData.push(x3),
                    simpleGeometryData.vertexPositionData.push(y3),
                    simpleGeometryData.vertexPositionData.push(z3),
                    simpleGeometryData.vertexNormalData.push(nX1),
                    simpleGeometryData.vertexNormalData.push(nY1),
                    simpleGeometryData.vertexNormalData.push(nZ1),
                    simpleGeometryData.vertexNormalData.push(nX2),
                    simpleGeometryData.vertexNormalData.push(nY2),
                    simpleGeometryData.vertexNormalData.push(nZ2),
                    simpleGeometryData.vertexNormalData.push(nX3),
                    simpleGeometryData.vertexNormalData.push(nY3),
                    simpleGeometryData.vertexNormalData.push(nZ3),
                    _vertexTopologyData.push(tX1 * xDir),
                    _vertexTopologyData.push(tY1 * yDir),
                    _vertexTopologyData.push(tX2 * xDir),
                    _vertexTopologyData.push(tY2 * yDir),
                    _vertexTopologyData.push(tX3 * xDir),
                    _vertexTopologyData.push(tY3 * yDir);
            }
            m += 3;
        }
        (simpleGeometryData.vertexTopologyData = _vertexTopologyData),
            isTangent &&
            SimpleGeometryDataUtil.setVertexTangents(simpleGeometryData, true);
    }
    static cutPolygonByTopology(a, b, c) {
        var faceCutter = new FaceCutter;
        var benderHelper = new BenderHelper;
        var _SimpleGeometryData = new SimpleGeometryData();
        (_SimpleGeometryData.indices = new Array(0)),
            (_SimpleGeometryData.vertexPositionData = new Array(0)),
            (_SimpleGeometryData.uvData = new Array(0)),
            (_SimpleGeometryData.vertexNormalData = new Array(0));
        var e = new Face3(new PointEx(), new PointEx(), new PointEx());
        e.set_winding(1);
        var f = new Face3(new PointEx(), new PointEx(), new PointEx());
        f.set_winding(1), b.set_winding(-1);
        var g = new Triangle(), h = new Triangle(), i = a.indices.length;
        for (var j = 0; i > j;) {
            var k = a.indices[j],
                l = 3 * k;
            g.get_A().setTo(
                a.vertexPositionData[l],
                a.vertexPositionData[l + 1],
                a.vertexPositionData[l + 2]
            ),
                h.get_A().setTo(
                    a.vertexNormalData[l],
                    a.vertexNormalData[l + 1],
                    a.vertexNormalData[l + 2]
                ),
                (l = 2 * k),
                e.get_a().setTo(a.vertexTopologyData[l], a.vertexTopologyData[l + 1]),
                f.get_a().setTo(a.uvData[l], a.uvData[l + 1]),
                (k = a.indices[j + 1]),
                (l = 3 * k),
                g.get_B().setTo(
                    a.vertexPositionData[l],
                    a.vertexPositionData[l + 1],
                    a.vertexPositionData[l + 2]
                ),
                h.get_B().setTo(
                    a.vertexNormalData[l],
                    a.vertexNormalData[l + 1],
                    a.vertexNormalData[l + 2]
                ),
                (l = 2 * k),
                e.get_b().setTo(a.vertexTopologyData[l], a.vertexTopologyData[l + 1]),
                f.get_b().setTo(a.uvData[l], a.uvData[l + 1]),
                (k = a.indices[j + 2]),
                (l = 3 * k),
                g.get_C().setTo(
                    a.vertexPositionData[l],
                    a.vertexPositionData[l + 1],
                    a.vertexPositionData[l + 2]
                ),
                h.get_C().setTo(
                    a.vertexNormalData[l],
                    a.vertexNormalData[l + 1],
                    a.vertexNormalData[l + 2]
                ),
                (l = 2 * k),
                e.get_c().setTo(a.vertexTopologyData[l], a.vertexTopologyData[l + 1]),
                f.get_c().setTo(a.uvData[l], a.uvData[l + 1]),
                g.regulate(),
                h.regulate(),
                e.invalidate(),
                benderHelper.setUvTriangles(e, f),
                benderHelper.setTriangles(g, h);
            var m = 0,
                n =
                    ((e.get_boundingRect().get_top() -
                        b.get_boundingRect().get_bottom()) /
                        c) |
                    0;
            (m =
                0 != n
                    ? n * c
                    : (((e.get_boundingRect().get_bottom() -
                        b.get_boundingRect().get_top()) /
                        c) |
                        0) *
                    c),
                b.translate(0, m);
            var o = faceCutter.makeFaceWrapper(b, e);
            null != o &&
                null != o.faceCutoutPolygon &&
                CylindricalHelper.addGeoDataFromFacePolygon(o.faceCutoutPolygon, _SimpleGeometryData),
                (j += 3);
        }
        return _SimpleGeometryData;
    }

    static addGeoDataFromFacePolygon(faceCutoutPolygon, geoData) {
        var benderHelper = new BenderHelper;
        var c = (geoData.vertexPositionData.length / 3) | 0,
            d = faceCutoutPolygon.get_trianglesIndices().length,
            e = geoData.indices,
            f = e.length,
            g = e.length + d;
        0 > g && (g = 0);
        ArrayTool.clear(e, g);
        for (var k = 0; d > k; k++)
            e[f++] = c + faceCutoutPolygon.get_trianglesIndices()[k];
        benderHelper.appendGeometryFromFacePolygon(faceCutoutPolygon, geoData);
    }
}

class ModelMetaBuilderBase {
    __class__ = ModelMetaBuilderBase;
    static __name__ = ["ModelMetaBuilderBase"];
    constructor(resolution) {
        this.resolution = resolution;
        this.grooveRegulator = new ModelGrooveRegulator();
        this.slice2Regulator = new ModelSlice2Regulator();
        this.sliceRegulator = new ModelSliceRegulator();
    }

    slice2Regulator = null;
    sliceRegulator = null;
    grooveRegulator = null;
    resolution = null;
    build(segmentWrapper) {
        var modelMetaData = new ModelMetaData();
        modelMetaData.fromAngle = segmentWrapper.start;
        modelMetaData.toAngle = segmentWrapper.end;

        var steps = (this.resolution * (segmentWrapper.end - segmentWrapper.start)) | 0;
        steps = steps > 1 ? steps : 1;
        modelMetaData.shapesWrapperArray = new Array(steps);
        for (var n = 0; steps >= n; n++) {
            modelMetaData.shapesWrapperArray[n] = segmentWrapper.shapesWrapper;
        }

        if (null != segmentWrapper.grooves && 0 != segmentWrapper.grooves.length) {
            this.grooveRegulator.setGrooves(segmentWrapper.grooves);
            modelMetaData = this.grooveRegulator.regulateModelMetaData(modelMetaData);
        }

        if (null != segmentWrapper.sliceWrappersArray && 0 != segmentWrapper.sliceWrappersArray.length) {
            if (segmentWrapper.sliceWrappersArray[0].orientation == SliceConfigOrientationEnum.HORIZONTAL) {
                this.sliceRegulator.setSlices(segmentWrapper.sliceWrappersArray);
                modelMetaData = this.sliceRegulator.regulateModelMetaData(modelMetaData);
            }
            else {
                this.slice2Regulator.setSlices(segmentWrapper.sliceWrappersArray);
                modelMetaData = this.slice2Regulator.regulateModelMetaData(modelMetaData);
            }
        }

        ModelOperator.equalizeResolution(modelMetaData);

        if (null != modelMetaData) {
            modelMetaData.txtPolyDatas = segmentWrapper.txtPolyDatas;
            modelMetaData.grooves = segmentWrapper.grooves;
            modelMetaData.sliceWrappersArray = segmentWrapper.sliceWrappersArray;
        }
        if (null != segmentWrapper.metaDataMap)
            segmentWrapper.metaDataMap.copyMetaDatasTo(modelMetaData);

        return modelMetaData;
    }
}
class ModelMetaBuilder extends ModelMetaBuilderBase {
    static __super__ = ModelMetaBuilderBase;
    __class__ = ModelMetaBuilder;
    static __name__ = ["ModelMetaBuilder"];
    constructor(resolution) {
        super(resolution);
    }

    build(segmentWrapper) {
        var newSeparatePolyDatas = null;
        null != segmentWrapper.txtPolyDatas && (newSeparatePolyDatas = segmentWrapper.txtPolyDatas.slice());
        var orgGrooves = null;
        null != segmentWrapper.grooves && (orgGrooves = segmentWrapper.grooves.slice());
        var grooves = new Array(0);

        // kkk add diamond cut poygons //kkk todo
        if (null != segmentWrapper.diamondArray) {
            for (var n = 0; n < segmentWrapper.diamondArray.length; n++) {
                var diamond = segmentWrapper.diamondArray[n];
                var diaCutPolyDatas = diamond.get_cutPolys();
                if (null != diaCutPolyDatas) { // kkk todo todo
                    if (null != newSeparatePolyDatas) {
                        newSeparatePolyDatas = newSeparatePolyDatas.concat(diaCutPolyDatas);
                    }
                    else
                        newSeparatePolyDatas = diaCutPolyDatas.slice();
                }
                var diagrooves = DiamondBuilder.makeGroove(diamond, segmentWrapper.shapesWrapper);
                null != diagrooves && grooves.push(diagrooves);
            }
        }

        if (null != orgGrooves) {
            for (var j = 0; j < grooves.length; j++) {
                var groove = grooves[j];
                var start = groove.grooveEdge.get_startValue();
                var posWrapper = new PosWrapper(start - groove.grooveShape.get_width() / 2, start + groove.grooveShape.get_width() / 2);
                GrooveMath.regulateGrooves(posWrapper, orgGrooves);
            }
            grooves = null == orgGrooves ? grooves.slice() : grooves.concat(orgGrooves);
        }
        segmentWrapper.grooves = grooves;
        segmentWrapper.txtPolyDatas = newSeparatePolyDatas;

        return super.build(segmentWrapper);
    }
}
class SliceWrapper {
    __class__ = SliceWrapper;
    static __name__ = ["SliceWrapper"];
    constructor() { }
    middleShape = null;
    orientation = null;
}
class SegmentWrapper {
    __class__ = SegmentWrapper;
    static __name__ = ["SegmentWrapper"];
    constructor() { }
    shapesWrapper = null;
    sliceWrappersArray = null;
    txtPolyDatas = null;
    start = null;
    end = null;
    diamondArray = null;
    metaDataMap = null;
    radius = null;
    grooves = null;
    clone() {
        var newSegmentWrapper = new SegmentWrapper();
        newSegmentWrapper.shapesWrapper = this.shapesWrapper.clone(null, true);
        null != this.grooves && (newSegmentWrapper.grooves = this.grooves.slice());
        null != this.sliceWrappersArray && (newSegmentWrapper.sliceWrappersArray = this.sliceWrappersArray.slice());
        null != this.txtPolyDatas && (newSegmentWrapper.txtPolyDatas = this.txtPolyDatas.slice());
        null != this.diamondArray && (newSegmentWrapper.diamondArray = this.diamondArray.slice());
        null != this.metaDataMap && (newSegmentWrapper.metaDataMap = new MetaDataMap(), this.metaDataMap.copyMetaDatasTo(newSegmentWrapper.metaDataMap));
        newSegmentWrapper.start = this.start;
        newSegmentWrapper.end = this.end;
        newSegmentWrapper.radius = this.radius;
        return newSegmentWrapper;
    }
}
class ModelMetaData extends MetaDataMap {
    static __super__ = MetaDataMap;
    __class__ = ModelMetaData;
    static __name__ = ["ModelMetaData"];
    constructor() {
        super();
    }

    sliceWrappersArray = null;
    fromAngle = null;
    toAngle = null;
    grooves = null;
    shapesWrapperArray = null;
    txtPolyDatas = null;
    Fv = null;
    Fw = null;
    clone() {
        var modelMetaData = new ModelMetaData();
        (modelMetaData.sliceWrappersArray = this.sliceWrappersArray),
            (modelMetaData.fromAngle = this.fromAngle),
            (modelMetaData.grooves = this.grooves),
            (modelMetaData.shapesWrapperArray = this.shapesWrapperArray),
            (modelMetaData.txtPolyDatas = this.txtPolyDatas),
            (modelMetaData.toAngle = this.toAngle),
            (modelMetaData.Fv = this.Fv),
            (modelMetaData.Fw = this.Fw),
            this.copyMetaDatasTo(modelMetaData);
        return modelMetaData;
    }
}
class ModelOperator {
    __class__ = ModelOperator;
    static __name__ = ["ModelOperator"];
    constructor() { }

    static equalizeResolution(modelMetaData) {
        var len = modelMetaData.shapesWrapperArray.length;
        var count = modelMetaData.shapesWrapperArray[0].get_numOfShapes();
        for (var id = 0; count > id; id++) {
            var shape, max_resolution = 0;
            for (var g = 0; len > g; g++) {
                shape = modelMetaData.shapesWrapperArray[g].getShapeAt(id);
                max_resolution = shape.get_resolution() > max_resolution ? shape.get_resolution() : max_resolution;
            }
            for (g = 0; len > g; g++) {
                shape = modelMetaData.shapesWrapperArray[g].getShapeAt(id);
                shape.set_resolution(max_resolution);
            }
        }
        //kkk todo todo
        // var shape, max_resolution = 0;
        // var len = modelMetaData.shapesWrapperArray.length;
        // for (var k = 0; len > k; k++) {
        //     var count = modelMetaData.shapesWrapperArray[k].get_numOfShapes();
        //     for (var id = 0; count > id; id++) {
        //         shape = modelMetaData.shapesWrapperArray[k].getShapeAt(id);
        //         max_resolution = shape.get_resolution() > max_resolution ? shape.get_resolution() : max_resolution;
        //     }
        // }
        // for (var k = 0; len > k; k++) {
        //     var count = modelMetaData.shapesWrapperArray[k].get_numOfShapes();
        //     for (var id = 0; count > id; id++) {
        //         shape = modelMetaData.shapesWrapperArray[k].getShapeAt(id);
        //         shape.set_resolution(max_resolution);
        //     }
        // }
    }
    static getFirstShapesWrapper(modelMetaData) {
        return modelMetaData.shapesWrapperArray[0];
    }
    static getLastShapesWrapper(modelMetaData) {
        return modelMetaData.shapesWrapperArray[modelMetaData.shapesWrapperArray.length - 1];
    }
    static getFirstPolygon(modelMetaData) {
        var b = ModelOperator.getFirstShapesWrapper(modelMetaData),
            c = new GeoPolygon;
        c.setTo(RingMath.extractPointExArray(b, true));
        return c;
    }
    static getLastPolygon(modelMetaData) {
        var b = ModelOperator.getLastShapesWrapper(modelMetaData),
            c = new GeoPolygon;
        return c.setTo(RingMath.extractPointExArray(b, true)), c;
    }
    static compare(a, b) {
        return b.fromAngle > a.fromAngle ? -1 : a.fromAngle > b.fromAngle ? 1 : 0;
    }
    static HQ(a, b) {
        return b.start > a.start ? -1 : a.start > b.start ? 1 : 0;
    }
}
class ModelRegulator {
    __class__ = ModelRegulator;
    static __name__ = ["ModelRegulator"];
    constructor() { }
    regulateModelMetaData(modelMetaData) {
        throw new Error("This is an abstract method, you must to override it");
    }
}
class ModelGrooveRegulator extends ModelRegulator {
    static __super__ = ModelRegulator;
    __class__ = ModelGrooveRegulator;
    static __name__ = ["ModelGrooveRegulator"];
    constructor() {
        super();
        this.IW = new ShapeSplitter();
    }

    grooves = null;
    IW = null;
    setGrooves(a) {
        this.grooves = a;
    }
    regulateColorit(modelMetaData, groove) {
        var count = modelMetaData.shapesWrapperArray.length;
        var stepAngle = (modelMetaData.toAngle - modelMetaData.fromAngle) / (count - 1);
        var width = groove.grooveShape.get_width() / 2;
        var prevShapesWrapper = null;
        var prevPosX = NaN;

        for (var h = 0; count > h; h++) {
            var shapesWrapper = modelMetaData.shapesWrapperArray[h],
                posX = groove.grooveEdge.get_SinePos(modelMetaData.fromAngle + stepAngle * h);
            if (shapesWrapper != prevShapesWrapper || posX != prevPosX) {
                prevShapesWrapper = shapesWrapper;
                if (posX != prevPosX) {
                    shapesWrapper = shapesWrapper.clone(null, true);
                    modelMetaData.shapesWrapperArray[h] = shapesWrapper;
                }
                var k = posX - width;
                var l = posX + width;
                var m = RingMath.filterProfiles(shapesWrapper, ProfileMetaValue.PROFILE_SURFACE_OUTER);
                var n = new Array(0);
                for (var o = 0; o < m.length; o++) {
                    var p = m[o],
                        q = p.get_geometryLength() / p.get_resolution(),
                        s = null;
                    if (GeoNumComparor.isGreater(l, p.get_minX()) && GeoNumComparor.isLess(l, p.get_maxX())) {
                        this.IW.splitShapeByX(p, l, n);
                        for (var u = 0; n.length > u; u++) {
                            var v = n[u].shape;
                            if (SliceMetaValue.SLICE_V_DIRECTION_LEFT == n[u].orientation)
                                p = v;
                            else {
                                if (SliceMetaValue.SLICE_V_DIRECTION_RIGHT != n[u].orientation) throw new Error("Invalid trim");
                                s = v;
                            }
                        }
                        ArrayTool.clear(n);
                    }
                    var A = null;
                    if (GeoNumComparor.isGreater(k, p.get_minX()) && GeoNumComparor.isLess(k, p.get_maxX())) {
                        this.IW.splitShapeByX(p, k, n);
                        for (var C = 0; n.length > C; C++) {
                            var D = n[C].shape;
                            if (SliceMetaValue.SLICE_V_DIRECTION_LEFT == n[C].orientation)
                                A = D;
                            else {
                                if (SliceMetaValue.SLICE_V_DIRECTION_RIGHT != n[C].orientation) throw new Error("Invalid trim");
                                p = D;
                            }
                        }
                        ArrayTool.clear(n);
                    }
                    var I = groove.grooveShape.getMetaDataMap();
                    if (null != A || null != s) {
                        var J = new Array(0);
                        null != A && (J.push(p), J.push(A)),
                            null != s && (null == A && J.push(p), J.unshift(s));
                        for (var K = 0; K < J.length; K++) {
                            var L = J[K];
                            L.set_resolution(Math.ceil(L.get_geometryLength() / q));
                        }
                        I.copyMetaDatasTo(p);
                        shapesWrapper.rn(J, shapesWrapper.shapes.indexOf(m[o], 0));
                    }
                    else if (GeoNumComparor.isNotLess(p.get_minX(), k) && GeoNumComparor.isNotGreater(p.get_maxX(), l))
                        I.copyMetaDatasTo(p);
                }
                prevPosX = posX;
            }
            else {
                modelMetaData.shapesWrapperArray[h] = modelMetaData.shapesWrapperArray[h - 1];
            }
        }
    }
    regulateGroove(modelMetaData, groove) {
        var stepCount = modelMetaData.shapesWrapperArray.length,
            stepAngle = (modelMetaData.toAngle - modelMetaData.fromAngle) / (stepCount - 1),
            prevShapesWrapper = null,
            prevPos = NaN;
        for (var g = 0; stepCount > g; g++) {
            var angle = modelMetaData.fromAngle + stepAngle * g,
                pos = groove.grooveEdge.get_SinePos(angle),
                shapesWrapper = modelMetaData.shapesWrapperArray[g];
            if (shapesWrapper != prevShapesWrapper || pos != prevPos) {
                prevShapesWrapper = shapesWrapper;
                pos != prevPos && (shapesWrapper = shapesWrapper.clone(null, true));
                var k = 1 / Math.cos((groove.grooveEdge.getDerivative(angle) / 2) * MathConsts.DEG_TO_RAD),
                    l = groove.grooveShape.calcShapesWrapper(pos, angle, k);
                l.rR();
                this.IW.vq(shapesWrapper, l, true);
                if (null == shapesWrapper) {
                    RingMath.sC(l, shapesWrapper, "outside") && (modelMetaData.shapesWrapperArray = null);
                    break;
                }
                modelMetaData.shapesWrapperArray[g] = shapesWrapper;
                prevPos = pos;
            }
            else
                modelMetaData.shapesWrapperArray[g] = modelMetaData.shapesWrapperArray[g - 1];
        }
    }
    regulateModelMetaData(modelMetaData) {
        for (var b = this.grooves.length, c = 0; b > c; c++) {
            var groove = this.grooves[c];
            ObjMan.__instanceof(groove.grooveShape, GrooveColorit) ? this.regulateColorit(modelMetaData, groove) : this.regulateGroove(modelMetaData, groove);
        }
        return modelMetaData;
    }
}
class ModelSliceRegulator extends ModelRegulator {
    static __super__ = ModelRegulator;
    __class__ = ModelSliceRegulator;
    static __name__ = ["ModelSliceRegulator"];
    constructor() {
        super();
        this.IW = new ShapeSplitter();
    }
    sliceWrappersArray = null;
    IW = null;
    setSlices(a) {
        this.sliceWrappersArray = a;
    }
    regulateModelMetaData(modelMetaData) {
        for (
            var b = modelMetaData.shapesWrapperArray,
            c = b.length,
            d = new Array(0),
            e = this.sliceWrappersArray.length,
            f = b.slice(),
            g = 0;
            e > g;

        ) {
            for (
                var h = this.sliceWrappersArray[g].middleShape.get_SinePosArray(c - 1, modelMetaData.fromAngle, modelMetaData.toAngle), i = null, j = NaN, k = 0;
                c > k;

            ) {
                var l,
                    m = f[k];
                l =
                    0 != g
                        ? d[k]
                        : new ShapesWrapper;
                var n = h[k];
                if (m != i || n != j) {
                    this.IW.splitShapesByY(m, n, ModelSliceRegulator.u5);
                    for (var o = 0; o < ModelSliceRegulator.u5.length;) {
                        var p = ModelSliceRegulator.u5[o].shapesWrapper;
                        if ("top" == ModelSliceRegulator.u5[o].orientation)
                            p.addMetaDataToAllShapes(SliceMeta.SLICE_INDEX, g), p.addMetaDataToAllShapes(SliceMeta.SLICE_V_DIRECTION, SliceMetaValue.SLICE_V_DIRECTION_LEFT), l.addShapes(p);
                        else {
                            if (SliceMetaValue.SLICE_H_DIRECTION_BOTTOM != ModelSliceRegulator.u5[o].orientation) throw new Error("Invalid trim");
                            m = p;
                        }
                        ++o;
                    }
                    m.addMetaDataToAllShapes(SliceMeta.SLICE_INDEX, e - 1),
                        m.addMetaDataToAllShapes(SliceMeta.SLICE_V_DIRECTION, SliceMetaValue.SLICE_V_DIRECTION_RIGHT),
                        (i = f[k]),
                        (f[k] = m),
                        (d[k] = l),
                        (j = n),
                        ++k;
                } else (f[k] = f[k - 1]), (d[k] = d[k - 1]), ++k;
            }
            ++g;
        }
        for (var q = null, s = 0; c > s;) {
            var t = f[s],
                u = d[s];
            u != q ? (u.addShapes(t), (q = u), ++s) : ((d[s] = d[s - 1]), ++s);
        }
        var newModelMetaData = new ModelMetaData();
        newModelMetaData.fromAngle = modelMetaData.fromAngle;
        newModelMetaData.toAngle = modelMetaData.toAngle;
        newModelMetaData.shapesWrapperArray = d;
        return newModelMetaData;
    }
}
ModelSliceRegulator.u5 = new Array(0);
class ModelSlice2Regulator extends ModelRegulator {
    static __super__ = ModelRegulator;
    __class__ = ModelSlice2Regulator;
    static __name__ = ["ModelSlice2Regulator"];
    constructor() {
        super();
        this.IW = new ShapeSplitter();
    }

    sliceWrappersArray = null;
    IW = null;
    setSlices(a) {
        this.sliceWrappersArray = a;
    }
    regulateModelMetaData(modelMetaData) {
        for (
            var b = modelMetaData.shapesWrapperArray,
            c = b.length,
            d = new Array(0),
            e = this.sliceWrappersArray.length,
            f = b.slice(),
            g = 0;
            e > g;

        ) {
            for (
                var h = this.sliceWrappersArray[g].middleShape.get_SinePosArray(c - 1, modelMetaData.fromAngle, modelMetaData.toAngle), i = null, j = NaN, k = 0;
                c > k;

            ) {
                var l,
                    m = f[k];
                l =
                    0 != g
                        ? d[k]
                        : new ShapesWrapper;
                var n = h[k];
                if (m != i || n != j) {
                    this.IW.splitShapesByX(m, n, ModelSlice2Regulator.u5), (m = null);
                    for (var o = 0; o < ModelSlice2Regulator.u5.length;) {
                        var p = ModelSlice2Regulator.u5[o].shapesWrapper;
                        if (SliceMetaValue.SLICE_V_DIRECTION_LEFT == ModelSlice2Regulator.u5[o].orientation)
                            p.addMetaDataToAllShapes(SliceMeta.SLICE_INDEX, g), p.addMetaDataToAllShapes(SliceMeta.SLICE_V_DIRECTION, SliceMetaValue.SLICE_V_DIRECTION_LEFT), l.addShapes(p);
                        else {
                            if (SliceMetaValue.SLICE_V_DIRECTION_RIGHT != ModelSlice2Regulator.u5[o].orientation) throw new Error("Invalid trim");
                            m = p;
                        }
                        ++o;
                    }
                    null != m &&
                        (m.addMetaDataToAllShapes(SliceMeta.SLICE_INDEX, e - 1),
                            m.addMetaDataToAllShapes(SliceMeta.SLICE_V_DIRECTION, SliceMetaValue.SLICE_V_DIRECTION_RIGHT),
                            (f[k] = m),
                            (i = m)),
                        (d[k] = l),
                        (j = n),
                        ++k;
                } else (f[k] = f[k - 1]), (d[k] = d[k - 1]), ++k;
            }
            ++g;
        }
        for (var q = null, s = 0; c > s;) {
            var t = f[s],
                u = d[s];
            u != q ? (u.addShapes(t), (q = u), ++s) : ((d[s] = d[s - 1]), ++s);
        }
        var newModelMetaData = new ModelMetaData();
        newModelMetaData.fromAngle = modelMetaData.fromAngle;
        newModelMetaData.toAngle = modelMetaData.toAngle;
        newModelMetaData.shapesWrapperArray = d;
        return newModelMetaData;
    }
}
ModelSlice2Regulator.u5 = new Array(0);

// function clear() {
//     var canvas = document.getElementById('testCanvas');
//     var ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// }
// function drawPoly(x0, y0, scale, poly, color) {
//     var canvas = document.getElementById('testCanvas');
//     var ctx = canvas.getContext('2d');
//     var ptArray = poly.pointArray;

//     ctx.lineWidth = '1px';
//     ctx.strokeStyle = color;
//     ctx.beginPath();
//     ctx.moveTo(x0 + scale * ptArray[0].x, y0 + scale * ptArray[0].y);
//     for (var i = 1; i < ptArray.length; i++)
//         ctx.lineTo(x0 + scale * ptArray[i].x, y0 + scale * ptArray[i].y);
//     ctx.stroke();
// }

class SliceBuilder {
    __class__ = SliceBuilder;
    static __name__ = ["SliceBuilder"];
    constructor() { }

    radius = null;
    get_radius() {
        return this.radius;
    }
    set_radius(a) {
        return this.radius == a ? this.radius : ((this.radius = a), this.radius);
    }
    getFirstIntersectMeshs(modelMetaData, modelMetaData2) {
        if (null != modelMetaData.grooves && 0 != modelMetaData.grooves.length &&
            this.checkNeighborhood(modelMetaData, modelMetaData2, 0.001)) {
            var simpleMeshDataArray = new Array(0),
                lastPolygon2 = ModelOperator.getLastPolygon(modelMetaData2),
                pos = SliceMath.getMiddleShapeSinePos(modelMetaData.sliceWrappersArray, modelMetaData.fromAngle);
            var f = true;
            if (null != modelMetaData.sliceWrappersArray && 1 == modelMetaData.sliceWrappersArray.length &&
                modelMetaData.sliceWrappersArray[0].orientation == SliceConfigOrientationEnum.HORIZONTAL)
                f = false;

            var grooves = modelMetaData.grooves;
            for (var g = 0; g < grooves.length; g++) {
                var groove = grooves[g];
                var bNeedCheck = false;
                if (null == modelMetaData2.grooves || !this.isContainGroove(groove.gapUID, modelMetaData2.grooves))
                    bNeedCheck = true;
                bNeedCheck = true; //kkk todo todo
                var shapesWrapperArray = GrooveMath.extractGrooveShapes(ModelOperator.getFirstShapesWrapper(modelMetaData), groove.gapUID);
                for (var l = 0; l < shapesWrapperArray.length; l++) {
                    var shapesWrapper = shapesWrapperArray[l];
                    if (bNeedCheck) {
                        var simpleMeshData = this.Hc(shapesWrapper, modelMetaData.fromAngle, pos, lastPolygon2, f);
                        if (null != simpleMeshData)
                            simpleMeshDataArray.push(simpleMeshData);
                    }
                }
            }
            return simpleMeshDataArray;
        }
        return null;
    }
    getSecondIntersectMeshs(modelMetaData, modelMetaData2) {
        if (null != modelMetaData.grooves &&
            0 != modelMetaData.grooves.length &&
            this.checkNeighborhood2(modelMetaData, modelMetaData2, 0.001)) {
            var simpleMeshDataArray = new Array(0),
                firstPolygon2 = ModelOperator.getFirstPolygon(modelMetaData2),
                pos = SliceMath.getMiddleShapeSinePos(modelMetaData.sliceWrappersArray, modelMetaData.toAngle);
            var f = true;
            if (null != modelMetaData.sliceWrappersArray && 1 == modelMetaData.sliceWrappersArray.length &&
                modelMetaData.sliceWrappersArray[0].orientation == SliceConfigOrientationEnum.HORIZONTAL) {
                f = false;
            }
            var grooves = modelMetaData.grooves;
            for (var g = 0; g < grooves.length; g++) {
                var groove = grooves[g];
                var bNeedCheck = (null == modelMetaData2.grooves) || !this.isContainGroove(groove.gapUID, modelMetaData2.grooves);
                bNeedCheck = true; //kkk todo todo
                var shapesWrapperArray = GrooveMath.extractGrooveShapes(ModelOperator.getLastShapesWrapper(modelMetaData), groove.gapUID);
                for (var l = 0; l < shapesWrapperArray.length; l++) {
                    var shapesWrapper = shapesWrapperArray[l];
                    if (bNeedCheck) {
                        var simpleMeshData = this.Hm(shapesWrapper, modelMetaData.toAngle, pos, firstPolygon2, f);
                        if (null != simpleMeshData) simpleMeshDataArray.push(simpleMeshData);
                    }
                }
            }
            return simpleMeshDataArray;
        }
        return null;
    }
    ModelMetaDataToCCWSimpleMeshArray(modelMetaData) {
        var shapesWrapperArray = RingMath.sp(ModelOperator.getFirstShapesWrapper(modelMetaData), SliceBuilder.SliceKeys),
            simpleMeshDataArray = new Array(0),
            transform = new Matrix3D();
        transform.appendTranslation(0, this.get_radius(), 0),
            transform.appendRotation(360 * modelMetaData.fromAngle, X_AXIS, new Vector3D(0, 0, 0));
        for (var e = 0; e < shapesWrapperArray.length; e++) {
            var shapesWrapper = shapesWrapperArray[e];
            var geoPolygon = new GeoPolygon,
                ptArray = RingMath.extractPointExArray(shapesWrapper, true);
            ptArray.reverse();
            geoPolygon.setTo(ptArray);
            var simpleMeshData = new SimpleMeshData();
            (simpleMeshData.geometryData = geoPolygon.GeoPolygonToGeomDataXY(-1)),
                (simpleMeshData.transformation = transform),
                simpleMeshData.addMetaData(CapMeshMeta.CAP_MESH, CapMeshMetaValue.CAP_START),
                simpleMeshData.removeMetaData(GrooveMeta.GROOVE_UID),
                simpleMeshData.removeMetaData(GrooveMeta.GROOVE_PART),
                simpleMeshDataArray.push(simpleMeshData);
        }
        return simpleMeshDataArray;
    }
    ModelMetaDataToCWSimpleMeshArray(modelMetaData) {
        var shapesWrapperArray = RingMath.sp(ModelOperator.getLastShapesWrapper(modelMetaData), SliceBuilder.SliceKeys),
            simpleMeshDataArray = new Array(0),
            transform = new Matrix3D();
        transform.appendTranslation(0, this.get_radius(), 0),
            transform.appendRotation(360 * modelMetaData.toAngle, X_AXIS, new Vector3D(0, 0, 0));
        for (var e = 0; e < shapesWrapperArray.length; e++) {
            var shapesWrapper = shapesWrapperArray[e];
            var geoPolygon = new GeoPolygon,
                ptArray = RingMath.extractPointExArray(shapesWrapper, true);
            ptArray.reverse();
            geoPolygon.setTo(ptArray);
            var simpleMeshData = new SimpleMeshData();
            (simpleMeshData.geometryData = geoPolygon.GeoPolygonToGeomDataXY(1)),
                (simpleMeshData.transformation = transform),
                simpleMeshData.addMetaData(CapMeshMeta.CAP_MESH, CapMeshMetaValue.CAP_START),
                simpleMeshData.removeMetaData(GrooveMeta.GROOVE_UID),
                simpleMeshData.removeMetaData(GrooveMeta.GROOVE_PART),
                simpleMeshDataArray.push(simpleMeshData);
        }
        return simpleMeshDataArray;
    }
    checkNeighborhood(modelMetaData, modelMetaData2, tolerance) {
        return GeoNumComparor.Equal(modelMetaData2.toAngle, modelMetaData.fromAngle, tolerance) || GeoNumComparor.Equal(modelMetaData2.toAngle - 1, modelMetaData.fromAngle, tolerance)
            ? true
            : GeoNumComparor.Equal(modelMetaData2.toAngle + 1, modelMetaData.fromAngle, tolerance);
    }
    checkNeighborhood2(a, b, c) {
        if (b == null) return false;
        return GeoNumComparor.Equal(b.fromAngle, a.toAngle, c) || GeoNumComparor.Equal(b.fromAngle - 1, a.toAngle, c)
            ? true
            : GeoNumComparor.Equal(b.fromAngle + 1, a.toAngle, c);
    }
    isContainGroove(gapUid, grooves) {
        if (grooves == null) return false;
        for (var c = 0; c < grooves.length;) {
            var d = grooves[c];
            if ((++c, d.gapUID == gapUid)) return true;
        }
        return false;
    }
    Hc(shapesWrapper, fromAngle, c, poly, e) {
        var exPtArray = RingMath.extractPointExArray(shapesWrapper, true);
        e ? this.Hx(exPtArray, c) : this.Hy(exPtArray, c);
        var geoPolygon = new GeoPolygon;
        geoPolygon.setTo(exPtArray);
        var intersectionPoly = PolyMath.PolyIntersection(poly, geoPolygon);
        if (null == intersectionPoly) return null;

        // clear();
        // drawPoly(20, 0, 20, poly, 'red');
        // drawPoly(20, 40, 20, geoPolygon, 'blue');
        // drawPoly(150, 0, 20, intersectionPoly, 'black');

        var simpleMeshData = new SimpleMeshData();
        simpleMeshData.geometryData = intersectionPoly.GeoPolygonToGeomDataXY(-1);
        var transform = new Matrix3D();
        transform.appendTranslation(0, this.get_radius(), 0);
        transform.appendRotation(360 * fromAngle, X_AXIS, new Vector3D(0, 0, 0));
        simpleMeshData.transformation = transform;
        for (var k = shapesWrapper.get_numOfShapes(), l = 0; k > l; l++)
            shapesWrapper.getShapeAt(l).copyMetaDatasTo(simpleMeshData);
        simpleMeshData.addMetaData(CapMeshMeta.CAP_MESH, CapMeshMetaValue.CAP_START);
        simpleMeshData.removeMetaData(GrooveMeta.GROOVE_UID);
        simpleMeshData.removeMetaData(GrooveMeta.GROOVE_PART);
        return simpleMeshData;
    }
    Hm(shapesWrapper, toAngle, c, poly, e) {
        var exPtArray = RingMath.extractPointExArray(shapesWrapper, true);
        e ? this.Hx(exPtArray, c) : this.Hy(exPtArray, c);
        var geoPolygon = new GeoPolygon;
        geoPolygon.setTo(exPtArray);
        var intersectionPoly = PolyMath.PolyIntersection(poly, geoPolygon);

        // drawPoly(20, 80, 20, poly, 'red');
        // drawPoly(20, 120, 20, geoPolygon, 'blue');
        // drawPoly(150, 80, 20, intersectionPoly, 'black');

        if (null == intersectionPoly || intersectionPoly.get_numOfPoints() < 3) return null;
        var simpleMeshData = new SimpleMeshData();
        simpleMeshData.geometryData = intersectionPoly.GeoPolygonToGeomDataXY(1);
        var transform = new Matrix3D();
        transform.appendTranslation(0, this.get_radius(), 0);
        transform.appendRotation(360 * toAngle, X_AXIS, new Vector3D(0, 0, 0));
        simpleMeshData.transformation = transform;
        var k = shapesWrapper.get_numOfShapes();
        for (var l = 0; k > l; l++)
            shapesWrapper.getShapeAt(l).copyMetaDatasTo(simpleMeshData);

        simpleMeshData.addMetaData(CapMeshMeta.CAP_MESH, CapMeshMetaValue.CAP_END);
        simpleMeshData.removeMetaData(GrooveMeta.GROOVE_UID);
        simpleMeshData.removeMetaData(GrooveMeta.GROOVE_PART);
        return simpleMeshData;
    }
    Hy(exPtArray, posYArray) {
        var pt0 = new PointEx,
            pt1 = new PointEx,
            pt2 = new PointEx,
            pt3 = new PointEx,
            flag = true;
        if (null != posYArray && 1 == posYArray.length) {
            var posY0 = posYArray[0];
            for (var i = 0; i < exPtArray.length; i++) {
                var pt = exPtArray[i];
                var y = pt.y;
                if (1e-6 >= (posY0 > y ? posY0 - y : y - posY0) ? false : posY0 > y) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                pt0.setTo(10, 10), pt1.setTo(10, posYArray[0]), pt2.setTo(-1, posYArray[0]), pt3.setTo(-1, 10);
            }
            else {
                pt0.setTo(10, -1), pt1.setTo(10, posYArray[0]), pt2.setTo(-1, posYArray[0]), pt3.setTo(-1, -1);
            }
        }
        else {
            var maxY = 0;
            for (var i = 0; i < exPtArray.length; i++) {
                var pt = exPtArray[i];
                maxY = Math.max(pt.y, maxY);
            }
            pt0.setTo(10, -1), pt1.setTo(10, maxY), pt2.setTo(-1, maxY), pt3.setTo(-1, -1);
        }
        ArrayTool.clear(exPtArray);
        exPtArray.push(pt0), exPtArray.push(pt1), exPtArray.push(pt2), exPtArray.push(pt3);
    }
    Hx(exPtArray, posXArray) {
        var headAdded = false,
            tailAdded = false,
            firstPt = exPtArray[0],
            lastPt = exPtArray[exPtArray.length - 1];
        if (null != posXArray) {
            for (var g = 0; g < posXArray.length; g++) {
                var bSame;
                if (headAdded) bSame = false;
                else {
                    var x = posXArray[g],
                        x0 = firstPt.x;
                    bSame = 1e-6 >= (x > x0 ? x - x0 : x0 - x);
                }
                if (bSame) {
                    headAdded = true;
                    var k = new PointEx;
                    k.setTo(firstPt.x, -1);
                    exPtArray.unshift(k);
                }
                else {
                    var l;
                    if (tailAdded) l = false;
                    else {
                        var m = posXArray[g],
                            n = lastPt.x;
                        l = 1e-6 >= (m > n ? m - n : n - m);
                    }
                    if (l) {
                        tailAdded = true;
                        var o = new PointEx;
                        o.setTo(lastPt.x, -1);
                        exPtArray.push(o);
                    }
                }
            }
        }
        var pt, x, y;
        if (!headAdded) {
            pt = exPtArray[1];
            x = firstPt.x + 10 * (firstPt.x - pt.x);
            y = firstPt.y + 10 * (firstPt.y - pt.y);
            exPtArray.unshift(new PointEx(x, y));
            if (y > -1) {
                exPtArray.unshift(new PointEx(x, -1));
            }
        }
        if (!tailAdded) {
            pt = exPtArray[exPtArray.length - 2];
            x = lastPt.x + 10 * (lastPt.x - pt.x);
            y = lastPt.y + 10 * (lastPt.y - pt.y);
            exPtArray.push(new PointEx(x, y));
            if (y > -1) {
                exPtArray.push(new PointEx(x, -1));
            }
        }
    }
}
SliceBuilder.SliceKeys = [SliceMeta.SLICE_INDEX, SliceMeta.SLICE_V_DIRECTION];
class FacetsBuilder {
    __class__ = FacetsBuilder;
    static __name__ = ["FacetsBuilder"];
    constructor() {
        this.normalArray = new Array(0);
    }

    normalArray = null;
    deltaAngle = null;
    normalCount = null;
    get_numFacets() {
        return this.normalCount;
    }
    set_numFacets(count) {
        if (3 > count) throw new Error("Invalid num of facets: " + count);
        this.normalCount = count;
        ArrayTool.clear(this.normalArray, this.normalCount);
        this.deltaAngle = (2 * Math.PI) / this.normalCount;
        var angle = 0;
        for (var h = 0; h < this.normalArray.length; h++) {
            this.normalArray[h] = new Point(Math.sin(angle), Math.cos(angle));
            angle += this.deltaAngle;
        }
    }
    regulateNormalData(geometryData) {
        for (var id = 0; id < geometryData.indices.length;) {
            var index1 = 3 * geometryData.indices[id],
                index2 = 3 * geometryData.indices[id + 1],
                index3 = 3 * geometryData.indices[id + 2],
                x2 = geometryData.vertexPositionData[index2],
                y2 = geometryData.vertexPositionData[index2 + 1],
                z2 = geometryData.vertexPositionData[index2 + 2],
                dx21 = x2 - geometryData.vertexPositionData[index1],
                dx32 = geometryData.vertexPositionData[index3] - x2,
                nX1 = (z2 - geometryData.vertexPositionData[index1 + 2]) * dx32 -
                    dx21 * (geometryData.vertexPositionData[index3 + 2] - z2),
                nY1 = dx21 * (geometryData.vertexPositionData[index3 + 1] - y2) -
                    (y2 - geometryData.vertexPositionData[index1 + 1]) * dx32,
                idNum = Math.ceil(Math.atan2(nX1, nY1) / this.deltaAngle);
            0 > idNum && (idNum = this.normalCount + idNum);
            var normal = this.normalArray[idNum];
            nX1 = normal.x;
            nY1 = normal.y;
            geometryData.vertexNormalData[index1 + 1] = nX1;
            geometryData.vertexNormalData[index1 + 2] = nY1;
            geometryData.vertexNormalData[index2 + 1] = nX1;
            geometryData.vertexNormalData[index2 + 2] = nY1;
            geometryData.vertexNormalData[index3 + 1] = nX1;
            geometryData.vertexNormalData[index3 + 2] = nY1;
            id += 3;
        }
        return geometryData;
    }
}
class SegmentBuilder {
    __class__ = SegmentBuilder;
    static __name__ = ["SegmentBuilder"];
    constructor(engravingConfigBuilder, resolution) {
        this.modelMetaBuilder = new ModelMetaBuilder(resolution);
        this.sliceBuilder = new SliceBuilder();
        this.engravingConfigBuilder = engravingConfigBuilder;
        this.facetsBuilder = new FacetsBuilder();
        this.facetsBuilder.set_numFacets(20);
    }

    ringRadius = null;
    grooves = null;
    gaps = null;
    shapesWrapper = null;
    start = null;
    end = null;
    sliceInstance = null;
    index = null;
    filteredDiamondArray = null;
    diamondArray = null;
    gapWrappersArray = null;
    txtPolyDatas = null;
    segmentCreator = null;
    engravingConfigBuilder = null;
    HV = null;
    HW = null;
    modelMetaBuilder = null;
    HY = null;
    circleLength = null;
    HZ = null;
    segmentBuilderWrapper = null;
    sliceBuilder = null;
    facetsBuilder = null;

    makeSegmentGeoDatas() {
        this.circleLength = this.ringRadius * MathConsts.TAU;
        this.HZ = (this.ringRadius - this.shapesWrapper.get_maxY()) * MathConsts.TAU;
        this.HY = 0.01 / this.circleLength;
        this.sliceBuilder.set_radius(this.ringRadius);
        this.start < 0 && this.end < 0
            ? ((this.start += 1), (this.end += 1))
            : this.start > 1 && this.end > 1 && ((this.start -= 1), (this.end -= 1));

        var geoDatas = new Array(0);

        this.initParams();

        var subGeoDatas = new Array(0);

        for (var index = 0; index < this.segmentBuilderWrapper.modelMetaDataArray.length; index++) {
            var modelMetaData = this.segmentBuilderWrapper.modelMetaDataArray[index];
            var translationKey = -1;
            modelMetaData.hasMetadata(TranslationMeta.TRANSLATION_KEY) && (translationKey = modelMetaData.getMetadata(TranslationMeta.TRANSLATION_KEY));

            var surfaceUID = modelMetaData.getMetadata(SurfaceMeta.SURFACE_ID);
            if (null != surfaceUID && null != this.gaps) {
                for (var n = 0; n < this.gaps.length; n++) {
                    var gap = this.gaps[n];
                    if (-1 != gap.surfaceUIDs.indexOf(surfaceUID, 0)) {
                        var gapWrapper = new GapWrapper();
                        gapWrapper.gapSimpleMeshData = gap.mSimpleMeshData;
                        gapWrapper.geoFacesArray1 = ModelFacesCreator.createModelSliceFacesArray(modelMetaData, this.ringRadius);
                        gapWrapper.geoFacesArray2 = ModelFacesCreator.createModelSideFaceArray(modelMetaData, this.ringRadius);
                        gapWrapper.gapSurfaceUID = surfaceUID;
                        this.gapWrappersArray[n].push(gapWrapper);
                    }
                }
            }

            var simpleMeshDataArray = BenderWrapper.makeGeometry(modelMetaData, this.ringRadius);

            for (var id = 0; id < simpleMeshDataArray.length; id++) {
                var simpleMeshData = simpleMeshDataArray[id];
                simpleMeshData.addMetaData(SegmentMeta.SEGMENT_INDEX, this.index);
                translationKey > -1 && simpleMeshData.addMetaData(TranslationMeta.TRANSLATION_KEY, translationKey);
                if (simpleMeshData.getMetadata(GrooveMeta.GROOVE_TYPE) == GrooveConfigTypeEnum.FACED_RECT &&
                    SliceMetaValue.SLICE_H_DIRECTION_BOTTOM == simpleMeshData.getMetadata(GrooveMeta.GROOVE_PART) && !simpleMeshData.hasMetadata(DiamondMeta.DIAMOND_PART)) {

                    simpleMeshData.geometryData = this.facetsBuilder.regulateNormalData(simpleMeshData.geometryData);
                }
                SimpleGeometryDataUtil.setVertexTangents(simpleMeshData.geometryData);
                if (simpleMeshData.hasMetadata(EngravingMeta.ENGRAVING_PART)) {
                    var geoData = this.engravingConfigBuilder.makeEngravingPlate(simpleMeshData);
                    geoData.addMetaData(ProfileMeta.PROFILE_HIDDEN, false);
                    subGeoDatas.push(geoData);
                    simpleMeshData.removeMetaData(EngravingMeta.ENGRAVING_PART);
                    simpleMeshData.removeMetaData(EngravingMeta.ENGRAVING_UID);
                    simpleMeshData.removeMetaData(EngravingMeta.ENGRAVING_CARVE_TYPE);
                }
                if (!simpleMeshData.getMetadata(ProfileMeta.PROFILE_HIDDEN))
                    subGeoDatas.push(simpleMeshData);
            }
        }
        if (((geoDatas = null == subGeoDatas ? geoDatas.slice() : geoDatas.concat(subGeoDatas)), null != this.segmentBuilderWrapper.simpleMeshDataArray)) {
            var o = this.segmentBuilderWrapper.simpleMeshDataArray;
            geoDatas = null == o ? geoDatas.slice() : geoDatas.concat(o);
        }
        return geoDatas;
    }
    initParams() {
        this.segmentBuilderWrapper = new SegmentBuilderWrapper();
        var segmentWrapperArray = new Array(0);
        this.segmentCreator.set_circumference(this.circleLength);
        segmentWrapperArray.push(this.createSegmentWrapper(this.start, this.end));
        //regulate segmentWrapperArray for diamonds
        for (var id = 0; id < this.filteredDiamondArray.length; id++) {
            var diamond = this.filteredDiamondArray[id];
            var engravingPosWrapper = Diamond.xF(diamond, this.circleLength, this.start, this.end);
            engravingPosWrapper.tt();
            var start = engravingPosWrapper.get_start(),
                end = engravingPosWrapper.get_end(),
                h = 0,
                i = 0;

            if (DiamondSurfaceType.SECTION == diamond.get_carvingType() || DiamondSurfaceType.SECTION_INSET == diamond.get_carvingType()) {
                i = diamond.get_gap() / 2 / this.circleLength;
                h = i;
                //kkk todo todo
                start -= h;
                end += i;
            }
            else if (DiamondSurfaceType.SECTION_SHARED == diamond.get_carvingType()) {
                i = (diamond.get_gap() / 2 + diamond.getDiamondConfig(0).diaWidth / 2 / 2) / this.circleLength;
                h = i;
                start -= h;
                end += i;
            }

            var j = end - start - 1;
            if (j > 0) {
                start += j / 2;
                end -= j / 2;
            }
            else if (GeoNumComparor.isNotGreater(-j, diamond.get_gap() / this.circleLength)) {
                start += j / 2;
                end -= j / 2;
            }

            var newSegmentWrapperArray = this.regulateSegmentWrapperArray(segmentWrapperArray, start, end);
            for (var k = 0; k < newSegmentWrapperArray.length; k++) {
                var segmentWrapper = newSegmentWrapperArray[k];
                if (null == segmentWrapper.diamondArray)
                    segmentWrapper.diamondArray = new Array(0);
                segmentWrapper.diamondArray.push(diamond);
            }
        }
        //regulate segmentWrapperArray for gaps
        if (null != this.gaps) {
            for (var n = 0; n < this.gaps.length; n++) {
                var gap = this.gaps[n];
                var newSegmentWrapperArray = this.regulateSegmentWrapperArray(segmentWrapperArray, gap.fromAngle, gap.toAngle);
                for (var k = 0; k < newSegmentWrapperArray.length; k++) {
                    var segmentWrapper = newSegmentWrapperArray[k];
                    if (null == segmentWrapper.metaDataMap)
                        segmentWrapper.metaDataMap = new MetaDataMap();
                    segmentWrapper.metaDataMap.addMetaData(GapMeta.GAP_UID, gap.gapUID);
                }
            }
            for (var n = 0; n < this.gaps.length; n++) {
                var gap = this.gaps[n];
                gap.surfaceUIDs = new Array(0);
                for (var k = 0; k < segmentWrapperArray.length; k++) {
                    var segmentWrapper = segmentWrapperArray[k];
                    if (PosWrapper.tk(segmentWrapper.start, segmentWrapper.end, gap.fromAngle, gap.toAngle, 0.001) && null != segmentWrapper.metaDataMap) {
                        var y;
                        segmentWrapper.metaDataMap.hasMetadata(SurfaceMeta.SURFACE_ID)
                            ? (y = segmentWrapper.metaDataMap.getMetadata(SurfaceMeta.SURFACE_ID))
                            : ((y = {}), segmentWrapper.metaDataMap.addMetaData(SurfaceMeta.SURFACE_ID, y));
                        gap.surfaceUIDs.push(y);
                    }
                }
            }
        }
        //kkk add segmentWrapperArray for diamonds
        if (
            1 == this.filteredDiamondArray.length &&
            this.filteredDiamondArray[0].get_GrooveEdge().get_isStraight() &&
            this.filteredDiamondArray[0].get_numOfStones() > 1 &&
            null == this.filteredDiamondArray[0].get_extraProngData() &&
            null == this.filteredDiamondArray[0].get_extraGrooveData() &&
            1 == this.filteredDiamondArray[0].get_numOfCols() &&
            GeoNumComparor.Equal(this.end - this.start, 1)
        ) {
            var newSegmentWrapperArray = new Array(0);
            for (var n = 0; n < segmentWrapperArray.length; n++) {
                var segmentWrapper = segmentWrapperArray[n];
                if (null != segmentWrapper.diamondArray && (null == segmentWrapper.metaDataMap || !segmentWrapper.metaDataMap.hasMetadata(GapMeta.GAP_UID))) {
                    var newSegmentWrapper = this.segmentCreator.createDiamondSegmentWrapper(segmentWrapper, this.filteredDiamondArray[0]);
                    newSegmentWrapperArray = null == newSegmentWrapper ? newSegmentWrapperArray.slice() : newSegmentWrapperArray.concat(newSegmentWrapper);
                    segmentWrapperArray.splice(n, 1);
                    --n;
                }
            }
            segmentWrapperArray = null == newSegmentWrapperArray ? segmentWrapperArray.slice() : segmentWrapperArray.concat(newSegmentWrapperArray);
        }

        SegmentCreator.regulateSeparatePolyDatas(segmentWrapperArray, this.circleLength);

        //regulate start and end of all segmentWrappers
        var D = 0.01 / this.circleLength;
        for (var n = 0; n < segmentWrapperArray.length; n++) {
            var segmentWrapper = segmentWrapperArray[n];
            if (null != segmentWrapper.diamondArray &&
                GeoNumComparor.isLess(segmentWrapper.end - segmentWrapper.start, 1)) {
                segmentWrapper.start -= D;
                segmentWrapper.end += D;
            }
        }

        this.segmentBuilderWrapper.modelMetaDataArray = new Array(0);
        for (var n = 0; n < segmentWrapperArray.length; n++) {
            var segmentWrapper = segmentWrapperArray[n];

            var modelMetaData = this.modelMetaBuilder.build(segmentWrapper);

            null != segmentWrapper.diamondArray &&
                1 == segmentWrapper.diamondArray.length &&
                (DiamondSurfaceType.MEMOIRE1 == segmentWrapper.diamondArray[0].get_carvingType() ||
                    "memoire3" == segmentWrapper.diamondArray[0].get_carvingType()) &&
                segmentWrapper.end - segmentWrapper.start < 1 &&
                (modelMetaData.Fv = true, modelMetaData.Fw = true);

            this.segmentBuilderWrapper.modelMetaDataArray.push(modelMetaData);
        }
        this.segmentBuilderWrapper.modelMetaDataArray.sort(ModelOperator.compare);

        this.segmentBuilderWrapper.simpleMeshDataArray = new Array(0);
        for (var n = 0; n < this.segmentBuilderWrapper.modelMetaDataArray.length; n++) {
            var modelMetaData = this.segmentBuilderWrapper.modelMetaDataArray[n];
            var translations = this.segmentCreator.get_Translation(modelMetaData);
            if (null != translations && translations.length > 0) {
                modelMetaData = translations[translations.length - 1].Translate(modelMetaData);
                modelMetaData.fromAngle = Math.min(modelMetaData.fromAngle, modelMetaData.fromAngle);
                modelMetaData.toAngle = Math.max(modelMetaData.toAngle, modelMetaData.toAngle);
            }
            if (modelMetaData.Fv) {
                var simpleMeshDataArray = this.sliceBuilder.ModelMetaDataToCCWSimpleMeshArray(modelMetaData);
                var T = null == simpleMeshDataArray ? this.segmentBuilderWrapper.simpleMeshDataArray.slice() : this.segmentBuilderWrapper.simpleMeshDataArray.concat(simpleMeshDataArray);
                this.segmentBuilderWrapper.simpleMeshDataArray = T;
            }
            if (modelMetaData.Fw) {
                var simpleMeshDataArray = this.sliceBuilder.ModelMetaDataToCWSimpleMeshArray(modelMetaData);
                var W = null == simpleMeshDataArray ? this.segmentBuilderWrapper.simpleMeshDataArray.slice() : this.segmentBuilderWrapper.simpleMeshDataArray.concat(simpleMeshDataArray);
                this.segmentBuilderWrapper.simpleMeshDataArray = W;
            }
            for (var k = 0; k < this.segmentBuilderWrapper.modelMetaDataArray.length; k++) {
                if (n == k) continue;
                var Z = this.sliceBuilder.getFirstIntersectMeshs(modelMetaData, this.segmentBuilderWrapper.modelMetaDataArray[k]);
                if (null != Z && Z.length > 0) {
                    for (var nn = 0; nn < Z.length; nn++) {
                        this.segmentBuilderWrapper.simpleMeshDataArray.push(Z[nn]);
                    }
                }
                var aa = this.sliceBuilder.getSecondIntersectMeshs(modelMetaData, this.segmentBuilderWrapper.modelMetaDataArray[k]);
                if (null != aa && aa.length > 0) {
                    for (var ba = 0; ba < aa.length; ba++) {
                        this.segmentBuilderWrapper.simpleMeshDataArray.push(aa[ba]);
                    }
                }
            }
        }
        for (var k = 0; k < this.segmentBuilderWrapper.simpleMeshDataArray.length; k++) {
            this.segmentBuilderWrapper.simpleMeshDataArray[k].addMetaData(SegmentMeta.SEGMENT_INDEX, this.index);
        }
    }
    regulateSegmentWrapperArray(segmentWrapperArray, b, c) {
        var delta = 1e-5,
            newSegmentWrapperArray = new Array(0),
            tmpPosWrapper = new PosWrapper(b, c);
        tmpPosWrapper.tt();
        for (var g = 0; g < segmentWrapperArray.length;) {
            var segmentWrapper = segmentWrapperArray[g];
            if (GeoNumComparor.Equal(tmpPosWrapper.get_length(), 1)) {
                GeoNumComparor.Equal(c - b, 1) && ((segmentWrapper.start = b), (segmentWrapper.end = c)),
                    newSegmentWrapperArray.push(segmentWrapper);
                ++g;
            }
            else if (
                (GeoNumComparor.isNotLess(segmentWrapper.start, tmpPosWrapper.get_start(), delta) && GeoNumComparor.isNotGreater(segmentWrapper.end, tmpPosWrapper.get_end(), delta)) ||
                (GeoNumComparor.isNotLess(segmentWrapper.start, tmpPosWrapper.get_start() + 1, delta) && GeoNumComparor.isNotGreater(segmentWrapper.end, tmpPosWrapper.get_end() + 1, delta)) ||
                (GeoNumComparor.isNotLess(segmentWrapper.start, tmpPosWrapper.get_start() - 1, delta) && GeoNumComparor.isNotGreater(segmentWrapper.end, tmpPosWrapper.get_end() - 1, delta))
            ) {
                newSegmentWrapperArray.push(segmentWrapper);
                ++g;
            }
            else {
                var newPosWrapper = new PosWrapper(segmentWrapper.start, segmentWrapper.end);
                if (1 != newPosWrapper.get_length() || 1 != tmpPosWrapper.get_length()) {
                    var j = PosMath.getPosXORs(newPosWrapper, tmpPosWrapper, 0);
                    if (j.length > 0) {
                        segmentWrapperArray.splice(g, 1);
                        g--;
                        for (var k = 0; k < j.length; k++) {
                            var l = j[k];
                            if (l.get_length() > delta) {
                                l.tt();
                                var m = segmentWrapper.clone();
                                m.start = l.get_start();
                                m.end = l.get_end();
                                segmentWrapperArray.splice(g, 0, m);
                                ++g;
                            } else if (GeoNumComparor.Equal(l.get_end(), tmpPosWrapper.get_start())) {
                                tmpPosWrapper.set_start(tmpPosWrapper.get_start() - l.get_length());
                            } else if (GeoNumComparor.Equal(l.get_start(), tmpPosWrapper.get_end())) {
                                tmpPosWrapper.set_end(tmpPosWrapper.get_end() + l.get_length());
                            }
                        }
                        var p = PosMath.getPosIntersections(newPosWrapper, tmpPosWrapper);
                        for (var q = 0; q < p.length; q++) {
                            var r = p[q];
                            if (!(r.get_length() <= delta)) {
                                r.tt();
                                var newSegmentWrapper = segmentWrapper.clone();
                                newSegmentWrapper.start = r.get_start();
                                newSegmentWrapper.end = r.get_end();
                                newSegmentWrapperArray.push(newSegmentWrapper);
                                segmentWrapperArray.splice(g, 0, newSegmentWrapper);
                                ++g;
                            }
                        }
                        // --g;
                    }
                    ++g;
                }
                else {
                    segmentWrapper.start = tmpPosWrapper.get_start();
                    segmentWrapper.end = tmpPosWrapper.get_end();
                    newSegmentWrapperArray.push(segmentWrapper);
                    ++g;
                }
            }
        }
        return newSegmentWrapperArray;
    }
    IG(a) {
        for (var b = new Array(0), c = 0; c < a.length;) {
            var d = a[c],
                e = this.segmentCreator.get_Translation(d);
            if (null != e) for (var f = 0; f < e.length;) b.push(e[f].Translate(d)), ++f;
            ++c;
        }
        return b;
    }
    createSegmentWrapper(start, end, diamondArray) {
        var segmentWrapper = new SegmentWrapper();
        segmentWrapper.shapesWrapper = this.shapesWrapper.clone(null, true);
        segmentWrapper.shapesWrapper.addMetaDataToAllShapes(ProfileMeta.PROFILE_HIDDEN, false);
        segmentWrapper.grooves = this.grooves;
        segmentWrapper.sliceWrappersArray = this.sliceInstance;
        segmentWrapper.txtPolyDatas = this.txtPolyDatas;
        segmentWrapper.start = start;
        segmentWrapper.end = end;
        segmentWrapper.diamondArray = diamondArray;
        segmentWrapper.radius = this.ringRadius;
        return segmentWrapper;
    }
}
SegmentBuilder.TOLERANCE_LENGHT = .01;
class SegmentBuilderWrapper {
    __class__ = SegmentBuilderWrapper;
    static __name__ = ["SegmentBuilderWrapper"];
    constructor() { }
    modelMetaDataArray = null;
    index = null;
    simpleMeshDataArray = null;
}
class GapWrapper {
    constructor() { }
    gapSimpleMeshData = null;
    segmentGeoDatasBackup = null;
    geoFacesArray1 = null;
    geoFacesArray2 = null;
    gapSurfaceUID = null;
}
class SliceWrapperMaker {
    static make(a) {
        if (null == a || 0 == a.length) return null;
        var sliceWrapperArray = new Array(0);
        for (var id = 0; id < a.length;) {
            var d = a[id],
                middleShape = GrooveEdge.getInstance(d.middleShape),
                sliceWrapper = new SliceWrapper();
            sliceWrapper.middleShape = middleShape;
            sliceWrapper.orientation = d.orientation;
            sliceWrapperArray[id] = sliceWrapper;
            ++id;
        }
        sliceWrapperArray.sort(SliceMath.CompareSlice);
        return sliceWrapperArray;
    }
}
class ShapeConfigBuilder {
    static buildShape(outerProfileShapes, innerProfileShapes) {
        var shape,
            id,
            shapesWrapper = new ShapesWrapper;
        if (null != outerProfileShapes) {
            for (id = 0; id < outerProfileShapes.length;) {
                shape = ShapeConfigBuilder.makeShape(outerProfileShapes[id]);
                if (null != shape) {
                    shape.addMetaData(ProfileMeta.PROFILE_SURFACE, ProfileMetaValue.PROFILE_SURFACE_OUTER);
                    shapesWrapper.addShape(shape);
                }
                ++id;
            }
        }
        if (null != innerProfileShapes) {
            for (id = 0; id < innerProfileShapes.length;) {
                shape = ShapeConfigBuilder.makeShape(innerProfileShapes[id]);
                if (null != shape) {
                    shape.addMetaData(ProfileMeta.PROFILE_SURFACE, ProfileMetaValue.PROFILE_SURFACE_INNER);
                    shapesWrapper.addShape(shape);
                }
                ++id;
            }
        }
        shapesWrapper.rR();
        return shapesWrapper;
    }

    static makeShape(config) {
        var shape;
        if (ObjMan.__instanceof(config, LineGeometryConfig)) {
            var line = ObjMan.__cast(config, LineGeometryConfig);
            shape = new Line;
            ObjMan.__cast(shape, Line).initParam(line.startX, line.startY, line.endX, line.endY);
        } else {
            if (!ObjMan.__instanceof(config, ArcGeometryConfig))
                throw new Error("Invalid Shape Type!");
            var arc = ObjMan.__cast(config, ArcGeometryConfig),
                startPt = new Point(arc.startX, arc.startY),
                endPt = new Point(arc.endX, arc.endY);
            if (PointComparator.EqualPoint(startPt, endPt)) {
                return null;
            }
            var centerPt = new Point(arc.centerX, arc.centerY),
                winding = ObjMan.__cast(config, ArcGeometryConfig).direction ==
                    ArcGeometryConfigDirectionEnum.CCW
                    ? -1
                    : 1;
            Point.distance(startPt, centerPt) > 200
                ? ((shape = new Line),
                    ObjMan.__cast(shape, Line).initParam(startPt.x, startPt.y, endPt.x, endPt.y))
                : ((shape = new Arc),
                    ObjMan.__cast(shape, Arc).makeArcBase(centerPt, startPt, endPt, winding),
                    shape.set_invertedNormals(-1 == winding),
                    shape.set_resolution(0 | Math.max(3, (shape.get_geometryLength() / 0.2) | 0)),
                    shape.set_resolution(shape.get_resolution() > 10 ? 10 : shape.get_resolution()));
        }
        return shape.get_geometryLength() < 0.01 ? null : shape;
    }
}
ShapeConfigBuilder.MAX_ARC_RADIUS = 200;
ShapeConfigBuilder.MAX_NUM_SEGMENTS = 10;
ShapeConfigBuilder.MAX_SEGMENT_LENGTH_ON_ARC = .2;
ShapeConfigBuilder.MIN_SHAPE_LENGTH = .01;

class RingBuilder {
    constructor() {
        this.engravingConfigBuilder = new EngravingConfigBuilder();
        this.segmentBuilder = new SegmentBuilder(this.engravingConfigBuilder, RingBuilder.SEGMENT_RESOLUTION);
        this.diamondGapMaker = new DiamondGapMaker();
        this.ringGapMaker = new RingGapMaker();
    }

    diaCutAsset = null;
    diaSectionAsset = null;
    diaSharedAsset = null;
    diaCarvingAsset = null;
    contextsSet = null;
    segmentBuilder = null;
    diamondGapMaker = null;
    ringGapMaker = null;
    segmentCreator = null;
    engravingConfigBuilder = null;
    get_engravingConfigBuilder() {
        return this.engravingConfigBuilder;
    }
    prepareDiamondAssets(diaGroupConfigs) {
        var assetArray = new Array(0),
            len = diaGroupConfigs.length;
        this.diaCutAsset = new Array(len);
        this.diaSectionAsset = new Array(len);
        this.diaSharedAsset = new Array(len);
        this.diaCarvingAsset = new Array(len);
        this.contextsSet = new ContextsSet();

        if (0 == len)
            return assetArray;

        for (var id = 0; len > id; id++) {
            var groupConfig = diaGroupConfigs[id];
            var diaAsset = new DiamondBuildAsset();
            if (groupConfig.stone.cut == StoneConfigCutEnum.BRILLIANT)
                diaAsset.set_type(DiamondTypeEnum.ROUND);
            else if (groupConfig.stone.cut == StoneConfigCutEnum.PRINCESS)
                diaAsset.set_type(DiamondTypeEnum.PRINCESS);
            else if (groupConfig.stone.cut == StoneConfigCutEnum.BAGUETTE)
                diaAsset.set_type(DiamondTypeEnum.BAGUETTE);
            else if (groupConfig.stone.cut == StoneConfigCutEnum.DECOR)
                diaAsset.set_type(DiamondTypeEnum.DECOR);
            else {
                if (groupConfig.stone.cut != StoneConfigCutEnum.CUSTOM)
                    throw new Error(
                        "Invalid diamond cut type: " + groupConfig.stone.cut.get_value()
                    );
                diaAsset.set_type(DiamondTypeEnum.CUSTOM);
            }
            this.diaCutAsset[id] = diaAsset;
            assetArray.push(diaAsset);

            // drill
            if (groupConfig.setting == DiamondGroupConfigSettingEnum.RUBBED) {
                var diaDrillAsset = new DiamondDrillBuildAsset();
                if (groupConfig.stone.cut == StoneConfigCutEnum.DECOR ||
                    groupConfig.stone.cut == StoneConfigCutEnum.BRILLIANT) {
                    diaDrillAsset.set_drillType(DrillTypeEnum.ROUND);
                }
                else if (groupConfig.stone.cut == StoneConfigCutEnum.PRINCESS)
                    diaDrillAsset.set_drillType(DrillTypeEnum.PRINCESS);
                else if (groupConfig.stone.cut == StoneConfigCutEnum.BAGUETTE)
                    diaDrillAsset.set_drillType(DrillTypeEnum.BAGUETTE);
                else {
                    if (groupConfig.stone.cut != StoneConfigCutEnum.CUSTOM)
                        throw new Error(
                            "Invalid diamond cut type: " + groupConfig.stone.cut.get_value()
                        );
                    diaDrillAsset.set_drillType(DrillTypeEnum.CUSTOM);
                }
                this.diaCarvingAsset[id] = diaDrillAsset;
                assetArray.push(diaDrillAsset);
            }
            else if (groupConfig.setting == DiamondGroupConfigSettingEnum.RUBBED_EDGELESS) {
                var diaDrillAsset = new DiamondDrillBuildAsset();
                if (groupConfig.stone.cut == StoneConfigCutEnum.BRILLIANT)
                    diaDrillAsset.set_drillType(DrillTypeEnum.ROUND_EDGELESS);
                else if (groupConfig.stone.cut == StoneConfigCutEnum.PRINCESS)
                    diaDrillAsset.set_drillType(DrillTypeEnum.PRINCESS_EDGELESS);
                else {
                    if (groupConfig.stone.cut != StoneConfigCutEnum.BAGUETTE)
                        throw new Error(
                            "Invalid diamond cut type: " + groupConfig.stone.cut.get_value()
                        );
                    diaDrillAsset.set_drillType(DrillTypeEnum.BAGUETTE_EDGELESS);
                }
                this.diaCarvingAsset[id] = diaDrillAsset;
                assetArray.push(diaDrillAsset);
            }
            else if (groupConfig.setting == DiamondGroupConfigSettingEnum.MEMOIRE1) {
                var diaDrillAsset = new DiamondDrillBuildAsset();
                if (groupConfig.stone.cut != StoneConfigCutEnum.BRILLIANT)
                    throw new Error(
                        "Invalid diamond cut type: " + groupConfig.stone.cut.get_value()
                    );
                diaDrillAsset.set_drillType(DrillTypeEnum.MEMOIRE1);
                this.diaCarvingAsset[id] = diaDrillAsset;
                assetArray.push(diaDrillAsset);
            }
            else if (groupConfig.setting == DiamondGroupConfigSettingEnum.MEMOIRE2) {
                var diaDrillAsset = new DiamondDrillBuildAsset();
                if (groupConfig.stone.cut != StoneConfigCutEnum.BRILLIANT)
                    throw new Error(
                        "Invalid diamond cut type: " + groupConfig.stone.cut.get_value()
                    );
                diaDrillAsset.set_drillType(DrillTypeEnum.MEMOIRE2);
                this.diaCarvingAsset[id] = diaDrillAsset;
                assetArray.push(diaDrillAsset);
            }
            else if (groupConfig.setting == DiamondGroupConfigSettingEnum.MEMOIRE3) {
                var diaDrillAsset = new DiamondDrillBuildAsset();
                if (groupConfig.stone.cut != StoneConfigCutEnum.BRILLIANT)
                    throw new Error(
                        "Invalid diamond cut type: " + groupConfig.stone.cut.get_value()
                    );
                diaDrillAsset.set_drillType(DrillTypeEnum.MEMOIRE3);
                this.diaCarvingAsset[id] = diaDrillAsset;
                assetArray.push(diaDrillAsset);
            }
            else if (groupConfig.setting == DiamondGroupConfigSettingEnum.MEMOIRE4) {
                var diaDrillAsset = new DiamondDrillBuildAsset();
                if (groupConfig.stone.cut != StoneConfigCutEnum.BRILLIANT)
                    throw new Error(
                        "Invalid diamond cut type: " + groupConfig.stone.cut.get_value()
                    );
                diaDrillAsset.set_drillType(DrillTypeEnum.MEMOIRE4);
                this.diaCarvingAsset[id] = diaDrillAsset;
                assetArray.push(diaDrillAsset);
            }

            //section
            if (groupConfig.setting == DiamondGroupConfigSettingEnum.SECTION) {
                var diaSectionAsset = new DiamondProngBuildAsset();
                diaSectionAsset.set_type(DiamondProngTypeEnum.SECTION);
                this.diaSectionAsset[id] = diaSectionAsset;
                assetArray.push(diaSectionAsset);
            }
            else if (groupConfig.setting == DiamondGroupConfigSettingEnum.SECTION_INSET) {
                var diaSectionAsset = new DiamondProngBuildAsset();
                diaSectionAsset.set_type(DiamondProngTypeEnum.SECTION_INSET);
                this.diaSectionAsset[id] = diaSectionAsset;
                assetArray.push(diaSectionAsset);
            }
            else if (groupConfig.setting == DiamondGroupConfigSettingEnum.SECTION_SHARED) {
                var diaSectionAsset = new DiamondProngBuildAsset();
                diaSectionAsset.set_type(DiamondProngTypeEnum.SECTION_SHARED);
                this.diaSectionAsset[id] = diaSectionAsset;
                assetArray.push(diaSectionAsset);
                var diaSharedAsset = new DiamondProngBuildAsset();
                diaSharedAsset.set_type(DiamondProngTypeEnum.SECTION_SHARED_BASE);
                this.diaSharedAsset[id] = diaSharedAsset;
                assetArray.push(diaSharedAsset);
            }

            var prong = groupConfig.prong;
            if (null != prong) {
                if (null == this.contextsSet.h.__keys__[prong.__id__]) {
                    var s = new DiamondDrillBuildAsset();
                    if (groupConfig.stone.cut == StoneConfigCutEnum.BRILLIANT)
                        s.set_drillType(DrillTypeEnum.ROUND_EDGELESS);
                    else if (groupConfig.stone.cut == StoneConfigCutEnum.PRINCESS)
                        s.set_drillType(DrillTypeEnum.PRINCESS_EDGELESS);
                    else {
                        if (groupConfig.stone.cut != StoneConfigCutEnum.BAGUETTE)
                            throw new Error(
                                "Invalid diamond cut type: " + groupConfig.stone.cut.get_value()
                            );
                        s.set_drillType(DrillTypeEnum.BAGUETTE_EDGELESS);
                    }
                    assetArray.push(s);
                    this.contextsSet.set(prong, s);
                }
                var t = new DiamondProngBuildAsset();
                t.set_type(EnumHX.forValue(DiamondProngTypeEnum, prong.model));
                this.diaSectionAsset[id] = t;
                assetArray.push(t);
            }
        }
        return assetArray;
    }
    //kkk todo
    makeGeometryDatas(segments, diamondArray, gaps, shapesWrapper, ringRadius) {
        var geoDatas = new Array(0);
        var ringLength = ringRadius * MathConsts.TAU;
        var txtPolyDataArray = null;

        // works with placementMetrics 
        var placementMetrics = this.get_engravingConfigBuilder().get_placementMetrics();
        if (null != placementMetrics && placementMetrics.length > 0) {
            txtPolyDataArray = EngravingConfigHelper.createPlacementRectDatas(placementMetrics);
            this.decideCutpolyShapes(txtPolyDataArray, shapesWrapper);
        }

        // prepare gaps
        if (null != gaps && gaps.length > 0) {
            var gapsCount = gaps.length;
            this.segmentBuilder.gapWrappersArray = new Array(gapsCount);
            for (var k = 0; k < gapsCount; k++) {
                this.segmentBuilder.gapWrappersArray[k] = new Array(0);
            }
        }
        //works with diamonds
        diamondArray.sort(DiamondBuilder.Compare);
        var diaLength = diamondArray.length,
            diaSectionCutWrapperArrays = new Array(diaLength);
        this.segmentBuilder.diamondArray = new Array(diaLength);
        //kkk make stones
        // console.log(diamondArray);
        for (var id = 0; diaLength > id; id++) {
            var diamond = diamondArray[id],
                groupIndex = diamond.get_groupIndex(),
                diaCarvingAsset = this.diaCarvingAsset[groupIndex],
                diaCarvingGeometry = null != diaCarvingAsset
                    ? SimpleGeometryDataUtil.cloneGeometry(diaCarvingAsset.get_geometryDataContent())
                    : null,
                diaSectionAsset = this.diaSectionAsset[groupIndex],
                diaSectionGeometry = null != diaSectionAsset
                    ? SimpleGeometryDataUtil.cloneGeometry(diaSectionAsset.get_geometryDataContent())
                    : null,
                diaSharedAsset = this.diaSharedAsset[groupIndex],
                diaSharedGeometry = null != diaSharedAsset
                    ? SimpleGeometryDataUtil.cloneGeometry(diaSharedAsset.get_geometryDataContent())
                    : null,
                diaCutAsset = this.diaCutAsset[groupIndex],
                diaCutGeometry = null != diaCutAsset
                    ? SimpleGeometryDataUtil.cloneGeometry(diaCutAsset.get_geometryDataContent())
                    : null;

            if (0 != diamond.get_numOfStones()) {
                if (DiamondSurfaceType.RUBBED == diamond.get_carvingType() ||
                    DiamondSurfaceType.RUBBED_EDGELESS == diamond.get_carvingType() ||
                    DiamondSurfaceType.MEMOIRE1 == diamond.get_carvingType() ||
                    DiamondSurfaceType.MEMOIRE2 == diamond.get_carvingType() ||
                    DiamondSurfaceType.MEMOIRE3 == diamond.get_carvingType() ||
                    DiamondSurfaceType.MEMOIRE4 == diamond.get_carvingType()
                ) {
                    var z = DiamondBuilder.makeDiaCommonCutWrapper(diamond, shapesWrapper, ringRadius, diaCutGeometry, diaCarvingGeometry);
                    this.segmentBuilder.diamondArray[groupIndex] = z;
                    for (var k = 0; k < z.length; k++) {
                        geoDatas.push(z[k].simpleMeshData);
                    }
                }
                else if (DiamondSurfaceType.NULL == diamond.get_carvingType()) {
                    var B = DiamondBuilder.makeDiaNullCutWrapper(diamond, shapesWrapper, ringRadius, diaCutGeometry);
                    for (var k = 0; k < B.length; k++) {
                        geoDatas.push(B[k]);
                    }
                }
                else if (
                    DiamondSurfaceType.SECTION == diamond.get_carvingType() ||
                    DiamondSurfaceType.SECTION_INSET == diamond.get_carvingType() ||
                    DiamondSurfaceType.SECTION_SHARED == diamond.get_carvingType()
                ) {
                    var diaSectionCutWrapperArray = DiamondBuilder.makeDiaSectionCutWrapper(diamond, shapesWrapper, ringRadius, diaCutGeometry, diaSectionGeometry, diaSharedGeometry);
                    diaSectionCutWrapperArrays[groupIndex] = diaSectionCutWrapperArray;
                    for (var k = 0; k < diaSectionCutWrapperArray.length; k++) {
                        var diaSectionCutWrapper = diaSectionCutWrapperArray[k];
                        geoDatas.push(diaSectionCutWrapper.simpleMeshData);
                        geoDatas.push(diaSectionCutWrapper.sectionSimpleMeshData);
                        geoDatas.push(diaSectionCutWrapper.sectionSimpleMeshData90);
                        geoDatas.push(diaSectionCutWrapper.sectionSimpleMeshData270);
                        geoDatas.push(diaSectionCutWrapper.sectionSimpleMeshData180);
                        null != diaSectionCutWrapper.sharedSimpleMeshData && geoDatas.push(diaSectionCutWrapper.sharedSimpleMeshData);
                        null != diaSectionCutWrapper.sharedSimpleMeshData90 && geoDatas.push(diaSectionCutWrapper.sharedSimpleMeshData90);
                        null != diaSectionCutWrapper.sharedSimpleMeshData270 && geoDatas.push(diaSectionCutWrapper.sharedSimpleMeshData270);
                        null != diaSectionCutWrapper.sharedSimpleMeshData180 && geoDatas.push(diaSectionCutWrapper.sharedSimpleMeshData180);
                    }
                }
                else {
                    if (DiamondSurfaceType.CHANNEL != diamond.get_carvingType())
                        throw new Error(
                            "This setting is not implemented yet: " + diamond.get_carvingType()
                        );
                    var diaCutWrapperArray = DiamondBuilder.makeDiaChannelCutWrapper(diamond, shapesWrapper, ringRadius, diaCutGeometry);
                    for (var H = 0; H < diaCutWrapperArray.length; H++) {
                        geoDatas.push(diaCutWrapperArray[H].simpleMeshData);
                    }
                }

                if (null != diamond.get_extraProngData()) {
                    var I = this.contextsSet.h[diamond.get_extraProngData().__id__],
                        J = DiamondBuilder.makeDiaProngGeoMeshes(diamond, diaSectionGeometry,
                            null != I
                                ? SimpleGeometryDataUtil.cloneGeometry(I.get_geometryDataContent())
                                : null,
                            ringRadius
                        );
                    geoDatas = (null == J) ? geoDatas.slice() : geoDatas.concat(J);
                }
            }
        }

        //kkk make segments
        for (var id = 0; id < segments.length; id++) {
            var segment = segments[id];
            var sliceWrapperArray = SliceWrapperMaker.make(segment.slices);
            var grooveArray = GrooveBuilder.makeGrooves(segment.grooves, shapesWrapper);
            var filteredDiamondArray = this.extractDiamonds(diamondArray, ringLength, segment.start, segment.end, id);

            this.segmentCreator = new SegmentCreator();
            this.segmentBuilder.shapesWrapper = shapesWrapper;
            this.segmentBuilder.ringRadius = ringRadius;
            this.segmentBuilder.start = segment.start;
            this.segmentBuilder.end = segment.end;
            this.segmentBuilder.index = id;
            this.segmentBuilder.filteredDiamondArray = filteredDiamondArray;
            this.segmentBuilder.grooves = grooveArray;
            this.segmentBuilder.gaps = gaps;
            this.segmentBuilder.sliceInstance = sliceWrapperArray;
            this.segmentBuilder.segmentCreator = this.segmentCreator;

            var tmpPolyDatas = null == txtPolyDataArray ? new Array(0) : txtPolyDataArray.slice();
            this.segmentBuilder.txtPolyDatas = tmpPolyDatas; //kkk todo

            var segmentGeoDatas = this.segmentBuilder.makeSegmentGeoDatas();
            for (var k = 0; k < segmentGeoDatas.length; k++) {
                var geoData = segmentGeoDatas[k];
                if (geoData.hasMetadata(DiamondMeta.DIAMOND_INDEX)) {
                    var diaGroupIndex = geoData.getMetadata(DiamondMeta.DIAMOND_GROUP_INDEX),
                        diaIndex = geoData.getMetadata(DiamondMeta.DIAMOND_INDEX);
                    this.segmentBuilder.diamondArray.length > diaGroupIndex &&
                        null != this.segmentBuilder.diamondArray[diaGroupIndex] &&
                        this.segmentBuilder.diamondArray[diaGroupIndex].length > diaIndex &&
                        null != this.segmentBuilder.diamondArray[diaGroupIndex][diaIndex] &&
                        this.segmentBuilder.diamondArray[diaGroupIndex][diaIndex].segmentGeoDatasBackup.push(geoData),
                        segmentGeoDatas.splice(k, 1),
                        --k;
                }
            }
            for (var k = 0; k < filteredDiamondArray.length; k++) {
                var diamond = filteredDiamondArray[k];
                if (DiamondSurfaceType.SECTION == diamond.get_carvingType() ||
                    DiamondSurfaceType.SECTION_INSET == diamond.get_carvingType() ||
                    DiamondSurfaceType.SECTION_SHARED == diamond.get_carvingType()
                ) {
                    DiamondBuilder.buildDiaSectionCut(diamond, diaSectionCutWrapperArrays[diamond.get_groupIndex()], sliceWrapperArray, ringRadius, segment.start, segment.end, id);
                }
                else if (
                    DiamondSurfaceType.RUBBED == diamond.get_carvingType() ||
                    DiamondSurfaceType.RUBBED_EDGELESS == diamond.get_carvingType() ||
                    DiamondSurfaceType.MEMOIRE1 == diamond.get_carvingType() ||
                    DiamondSurfaceType.MEMOIRE2 == diamond.get_carvingType() ||
                    DiamondSurfaceType.MEMOIRE3 == diamond.get_carvingType() ||
                    DiamondSurfaceType.MEMOIRE4 == diamond.get_carvingType()
                ) {
                    var holeGeoDatas = this.diamondGapMaker.buildHoleGeoDatas(this.segmentBuilder.diamondArray[diamond.get_groupIndex()], ringRadius);
                    segmentGeoDatas = null == holeGeoDatas ? segmentGeoDatas.slice() : segmentGeoDatas.concat(holeGeoDatas);
                }
            }

            if (null != this.segmentBuilder.gapWrappersArray && this.segmentBuilder.gapWrappersArray.length > 0) {
                for (var n = 0; n < this.segmentBuilder.gapWrappersArray.length; n++) {
                    var gapWrappers = this.segmentBuilder.gapWrappersArray[n];
                    for (var k = 0; k < gapWrappers.length; k++) {
                        gapWrappers[k].segmentGeoDatasBackup = new Array(0);
                        for (var m = 0; m < segmentGeoDatas.length; m++) {
                            var ba = segmentGeoDatas[m];
                            if (ba.getMetadata(SurfaceMeta.SURFACE_ID) == gapWrappers[k].gapSurfaceUID) {
                                gapWrappers[k].segmentGeoDatasBackup.push(ba);
                                segmentGeoDatas.splice(m, 1);
                                --m;
                            }
                        }
                    }
                    var gapGeoDatas = this.ringGapMaker.buildGapGeoDatas(gapWrappers);
                    for (k = 0; k < gapGeoDatas.length; k++) {
                        gapGeoDatas[k].addMetaData(SegmentMeta.SEGMENT_INDEX, this.segmentBuilder.index);
                    }
                    segmentGeoDatas = null == gapGeoDatas ? segmentGeoDatas.slice() : segmentGeoDatas.concat(gapGeoDatas);
                }
            }

            geoDatas = null == segmentGeoDatas ? geoDatas.slice() : geoDatas.concat(segmentGeoDatas);

            var fa = this.Translate(segmentGeoDatas);
            for (var idx = 0; idx < fa.length; idx++) {
                var ha = fa[idx];
                if (null != ha.transformation) {
                    SimpleGeometryDataUtil.applyTransformation(ha.geometryData, ha.transformation);
                }
                ha.transformation = null;
            }
            geoDatas = null == fa ? geoDatas.slice() : geoDatas.concat(fa);
        }
        return geoDatas;
    }
    extractDiamonds(diamondArray, ringLength, start, end, index) {
        var array = new Array(0);
        if (null == diamondArray) return array;
        for (var id = 0; id < diamondArray.length; id++) {
            var diamond = diamondArray[id];
            var bOK = PosWrapper.checkTopology(start, end, diamond.get_minY() / ringLength, diamond.get_maxY() / ringLength);
            if (bOK) array.push(diamond);
        }
        return array;
    }
    Translate(geoDataArray) {
        var array = new Array(0);
        for (var id = 0; id < geoDataArray.length;) {
            var geoData = geoDataArray[id];
            var translation = this.segmentCreator.get_Translation(geoData);
            if (null != translation) {
                for (var i = 0; i < translation.length;) {
                    array.push(translation[i].Rotate(geoData));
                    ++i;
                }
            }
            ++id;
        }
        return array;
    }
    decideCutpolyShapes(txtPolyDataArray, shapesWrapper) {
        if (null != txtPolyDataArray) {
            var engravingPosWrapper = new PosWrapper();
            for (var id = 0; id < txtPolyDataArray.length;) {
                var polygon = txtPolyDataArray[id].get_polygon();
                engravingPosWrapper.set_start(polygon.get_boundingRect().get_left());
                engravingPosWrapper.set_end(polygon.get_boundingRect().get_right());
                var filteredShapesArray = RingMath.getIntersectionShapes(engravingPosWrapper, shapesWrapper);
                for (var k = 0; k < filteredShapesArray.length;) {
                    var shape = filteredShapesArray[k];
                    shape.addMetaData(CutPolyMeta.CUT_FILTER_PART, CutPolyMetaValue.CUT_FILTER_PART_ENGRAVING);
                    ++k;
                }
                ++id;
            }
        }
    }
}
RingBuilder.SEGMENT_RESOLUTION = 100;

class RingConfigBuilder {
    constructor() {
        this.ringBuilder = new RingBuilder()
        this.configTransformers = new Array(0);
        this.configTransformers.push(new DiagonalDiamondChannelConfigTransformer());
        this.configTransformers.push(new Memoire5ConfigTransformer());
        this.configTransformers.push(new Memoire6ConfigTransformer());
        this.configTransformers.push(new HorizontalGrooveConfigTransformer());
    }

    ringBuilder = null;
    configTransformers = null;
    // kkk todo
    prepareBuild(config) {
        var assetsArray = null;
        this.ConfigTransform(config);
        var diamondAssetsArray = this.ringBuilder.prepareDiamondAssets(config.diamondGroups);
        var engravingAssetsArray = this.ringBuilder.get_engravingConfigBuilder().collectAndBuildEngraving(config.engravingLayouts);

        if (null == engravingAssetsArray) {
            assetsArray = diamondAssetsArray.slice();
        }
        else {
            assetsArray = diamondAssetsArray.concat(engravingAssetsArray);
        }
        return assetsArray;
    }
    build(config, buildAssets, responder) {
        try {
            var startTime = new Date().getTime() / 1e3;
            var builtedGeoDatas = new Array(0);

            // make ring shapes
            var shapesWrapper = ShapeConfigBuilder.buildShape(config.outerProfileShapes, config.innerProfileShapes);
            var ringRadius = config.circumference / MathConsts.TAU + config.profileHeight;

            // make diamonds
            var diamondArray = new Array(0);
            if (null != config.diamondGroups && 0 != config.diamondGroups.length) {
                for (var i = 0; i < config.diamondGroups.length; i++) {
                    diamondArray[i] = DiamondMaker.make(config.diamondGroups[i], ringRadius, shapesWrapper, i);
                }
            }

            // update engraving bounds
            this.ringBuilder.get_engravingConfigBuilder().update(ringRadius * MathConsts.TAU, 0, config.profileWidth);

            // make gaps
            var gaps = GapBuilder.makeGaps(config.gaps, shapesWrapper, ringRadius);

            // make ring geometries
            var geoDatas = this.ringBuilder.makeGeometryDatas(config.segments, diamondArray, gaps, shapesWrapper, ringRadius);//kkk todo

            builtedGeoDatas = null == geoDatas ? builtedGeoDatas.slice() : builtedGeoDatas.concat(geoDatas);
            this.checkGeometryData(builtedGeoDatas);

            console.log('Generation Time: ', new Date().getTime() / 1e3 - startTime, ' sec');
            responder.result([builtedGeoDatas]);
        }
        catch (err) {
            if ((err instanceof ErrorWrap && (err = err.val), !ObjMan.__instanceof(err, Error))) throw err;
            responder.fault([Fault.fromError(err)]);
        }
    }
    ConfigTransform(config) {
        //kkk todo
        for (var k = 0; k < this.configTransformers.length; k++) {
            if (this.configTransformers[k].acceptsConfig(config)) {
                this.configTransformers[k].transform(config);
            }
        }
    }
    checkGeometryData(a) {
        for (var b = a.length, c = 0; b > c; c++) {
            if (0 == a[c].geometryData.indices.length)
                throw new Error("Invalid (Empty) Geometry!");
        }
    }
}

export {
    RingConfigBuilder, CylindricalHelper, ShapeExtruder, ModelMetaData, ShapeSplitter, MetaKeyGenerator
};

