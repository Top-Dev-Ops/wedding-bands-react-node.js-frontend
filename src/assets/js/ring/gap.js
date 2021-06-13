/* eslint-disable no-unused-expressions */
import { ShapeExtruder, simpleGeometryData, ModelMetaData, ShapeSplitter } from './calc';
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
    Edges, GrooveColorit, GrooveEdge, GrooveBuilder, GrooveMath
} from "./groove.js"
import { GeoPointEx, GeoExFace } from "./geometryEx.js"

class GapParam {
    constructor() { }

    xf = null;
    diaWidth = null;
    diaHeight = null;
    depth = null;
    Ni = null;
    NE = null;
    c5 = null;
}
class GapInfo {
    constructor() { }
    gapUID = null;
    mSimpleMeshData = null;
    mBoundRect = null;
    // ha = null;
    surfaceUIDs = null;
    fromAngle = null;
    toAngle = null;
}
class ModelMeshsCreator {
    constructor() { }
    calcMeshs(modelMetaData, height) {
        var stepSize = modelMetaData.shapesWrapperArray.length - 1,
            totalAngle = modelMetaData.toAngle - modelMetaData.fromAngle,
            deltaAngle = totalAngle / stepSize,
            deltaV = (totalAngle / stepSize) * height,
            g = modelMetaData.fromAngle,
            h = modelMetaData.fromAngle,
            prevV = modelMetaData.fromAngle * height,
            curV = prevV,
            prevShapesWrapper = null,
            prevExtrudeWrappers = null,
            meshDataArray = ShapeExtruder.prepareMeshDatas(modelMetaData, stepSize);
        for (var nStep = 0; stepSize > nStep; nStep++) {
            g = h;
            h += deltaAngle;
            prevV = curV;
            curV += deltaV;
            var o = g * height,
                p = h * height,
                extrudeWrappers = null,
                curShapesWrapper = modelMetaData.shapesWrapperArray[nStep],
                nextShapesWrapper = modelMetaData.shapesWrapperArray[nStep + 1];
            extrudeWrappers = prevShapesWrapper == curShapesWrapper && curShapesWrapper == nextShapesWrapper ? prevExtrudeWrappers : ShapeExtruder.createExtrudeWrappers(curShapesWrapper, nextShapesWrapper);
            for (var t = 0; t < curShapesWrapper.get_numOfShapes(); t++) {
                var extrudeWrapper = extrudeWrappers[t],
                    ptArray = extrudeWrapper.ptArray,
                    dirArray = extrudeWrapper.dirArray,
                    uvArray = extrudeWrapper.uvArray,
                    nextPtArray = extrudeWrapper.nextPtArray,
                    nextDirArray = extrudeWrapper.nextDirArray,
                    nextUVArray = extrudeWrapper.nextUVArray,
                    resolution = extrudeWrapper.resolution;
                var geometryData = meshDataArray[t].geometryData,
                    D = 4 * resolution * nStep,
                    E = 6 * resolution * nStep,
                    F = 3 * D,
                    G = 2 * D,
                    indices = geometryData.indices,
                    vertexPositionData = geometryData.vertexPositionData,
                    vertexNormalData = geometryData.vertexNormalData,
                    uvData = geometryData.uvData;

                for (var L = 0; resolution > L; L++) {
                    var M = (F / 3) | 0;
                    (indices[E++] = M),
                        (indices[E++] = M + 1),
                        (indices[E++] = M + 2),
                        (indices[E++] = M),
                        (indices[E++] = M + 2),
                        (indices[E++] = M + 3);
                    var N = 2 * L,
                        O = N + 1;
                    (vertexPositionData[F] = ptArray[N]),
                        (vertexNormalData[F++] = dirArray[N]),
                        (vertexPositionData[F] = o),
                        (vertexNormalData[F++] = 0),
                        (vertexPositionData[F] = ptArray[O]),
                        (vertexNormalData[F++] = -dirArray[O]),
                        (uvData[G++] = uvArray[L]),
                        (uvData[G++] = prevV),
                        (N = 2 * (L + 1)),
                        (O = N + 1),
                        (vertexPositionData[F] = ptArray[N]),
                        (vertexNormalData[F++] = dirArray[N]),
                        (vertexPositionData[F] = o),
                        (vertexNormalData[F++] = 0),
                        (vertexPositionData[F] = ptArray[O]),
                        (vertexNormalData[F++] = -dirArray[O]),
                        (uvData[G++] = uvArray[L + 1]),
                        (uvData[G++] = prevV),
                        (vertexPositionData[F] = nextPtArray[N]),
                        (vertexNormalData[F++] = nextDirArray[N]),
                        (vertexPositionData[F] = p),
                        (vertexNormalData[F++] = 0),
                        (vertexPositionData[F] = nextPtArray[O]),
                        (vertexNormalData[F++] = -nextDirArray[O]),
                        (uvData[G++] = nextUVArray[L + 1]),
                        (uvData[G++] = curV),
                        (N = 2 * L),
                        (O = N + 1),
                        (vertexPositionData[F] = nextPtArray[N]),
                        (vertexNormalData[F++] = nextDirArray[N]),
                        (vertexPositionData[F] = p),
                        (vertexNormalData[F++] = 0),
                        (vertexPositionData[F] = nextPtArray[O]),
                        (vertexNormalData[F++] = -nextDirArray[O]),
                        (uvData[G++] = nextUVArray[L]),
                        (uvData[G++] = curV);
                }
            }
            prevShapesWrapper = curShapesWrapper;
            prevExtrudeWrappers = extrudeWrappers;
        }

        return meshDataArray;
    }
}
class GapMakerBase {
    //gapParam, shape, radius
    constructor(gapParam, shape, radius) {
        (this.Nh = new ModelMeshsCreator()),
            (this.geometryMergeHandler = new SimpleGeometryMergeHandler()),
            (this.shapesWrapper = shape),
            (this.xf = gapParam.xf),
            (this.diaWidth = gapParam.diaWidth),
            (this.diaHeight = gapParam.diaHeight),
            (this.depth = gapParam.depth),
            (this.Ni = gapParam.Ni),
            (this.c5 = gapParam.c5),
            (this.radius = radius);
    }

    metaDataMap = null;
    Nh = null;
    geometryMergeHandler = null;
    shapesWrapper = null;
    xf = null;
    diaWidth = null;
    diaHeight = null;
    depth = null;
    Ni = null;
    c5 = null;
    radius = null;
    setMetaDataMap(a) {
        this.metaDataMap = new MetaDataMap();
        a.copyMetaDatasTo(this.metaDataMap);
    }
    makeGapInfo() {
        var gapInfo = new GapInfo();
        gapInfo.gapUID = {};
        this.createGapInfo(gapInfo);
        this.metaDataMap.copyMetaDatasTo(gapInfo.mSimpleMeshData);
        gapInfo.mSimpleMeshData.addMetaData(GapMeta.GAP_UID, gapInfo.gapUID);
        this.makeGapAngles(gapInfo);
        return gapInfo;
    }
    makeGapAngles(gapInfo) {
        var b = MathConsts.TAU * (this.radius - (this.shapesWrapper.get_maxY() - this.shapesWrapper.get_minY()));
        gapInfo.fromAngle = gapInfo.mBoundRect.get_top() / b;
        gapInfo.toAngle = gapInfo.mBoundRect.get_bottom() / b;
    }
    createGapInfo(gapInfo) { }
    makeSimpleMeshData(modelMetaData) {
        var meshDataArray = this.Nh.calcMeshs(modelMetaData, this.diaHeight + GapMakerBase.TOLERANCE);
        for (var c = 0; c < meshDataArray.length; c++)
            this.geometryMergeHandler.addGeometry(meshDataArray[c].geometryData);

        if (this.shapesWrapper.get_maxY() - this.diaHeight + this.c5 > 0) {
            var d = this.GapShapesToCWGeoData(modelMetaData.shapesWrapperArray[0], 0);
            this.geometryMergeHandler.addGeometry(d);
        }

        if (this.c5 < 0) {
            var e = this.GapShapesToCCWGeoData(modelMetaData.shapesWrapperArray[0], this.diaHeight + GapMakerBase.TOLERANCE);
            this.geometryMergeHandler.addGeometry(e);
        }
        var geoData = this.geometryMergeHandler.merge();
        this.geometryMergeHandler.clean();
        var simpleMeshData = new SimpleMeshData();
        simpleMeshData.geometryData = geoData;
        simpleMeshData.transformation = this.calcGapTransformation();
        return simpleMeshData;
    }
    GapShapesToCWGeoData(shapesWrapper, yVal) {
        null == yVal && (yVal = 0);
        var c = RingMath.extractPointExArray(shapesWrapper, true);
        c.reverse();
        var geoPolygon = new GeoPolygon;
        geoPolygon.setTo(c);
        simpleGeometryData = geoPolygon.GeoPolygonToGeomDataXZ(1, yVal);
        return simpleGeometryData;
    }
    GapShapesToCCWGeoData(shapesWrapper, yVal) {
        null == yVal && (yVal = 0);
        var c = RingMath.extractPointExArray(shapesWrapper, true);
        c.reverse();
        var geoPolygon = new GeoPolygon;
        geoPolygon.setTo(c);
        simpleGeometryData = geoPolygon.GeoPolygonToGeomDataXZ(-1, yVal);
        return simpleGeometryData;
    }
    calcGapTransformation() {
        var matrix = new Matrix3D();
        var b = this.shapesWrapper.get_maxY() - this.diaHeight + this.c5;
        matrix.appendTranslation(0,
            this.radius - (this.shapesWrapper.get_maxY() - this.shapesWrapper.get_minY()) + b - GapMakerBase.TOLERANCE,
            0
        );
        matrix.appendRotation(360 * this.Ni, X_AXIS, new Vector3D(0, 0, 0));
        return matrix;
    }
    setGapShapeResolution(shape) {
        shape.set_resolution(Math.ceil(Math.max(shape.get_geometryLength() / 0.4, 3)));
    }
}
GapMakerBase.TOLERANCE = 0.1;
class CrossGapMakerBase extends GapMakerBase {
    //gapParam, shape, radius
    constructor(gapParam, shape, radius) {
        super(gapParam, shape, radius),
            (this.NE = gapParam.NE);
        var d = shape.get_maxX() - shape.get_minX(),
            e = RingMath.extractXIntersectTopPoint(shape, 0.01),
            f = RingMath.extractXIntersectTopPoint(shape, d / 2),
            g = RingMath.extractXIntersectTopPoint(shape, d - 0.01);
        this.NF = Math.max(e.get_posY(), Math.max(f.get_posY(), g.get_posY()));
    }
    NE = null;
    NF = null;
    createGapInfo(gapInfo) {
        var modelMetaData = new ModelMetaData();
        modelMetaData.fromAngle = 0;
        modelMetaData.toAngle = 1;
        modelMetaData.shapesWrapperArray = new Array(0);
        for (var c = this.createGrooveProfile(), d = 0; 10 > d;) {
            d++;
            modelMetaData.shapesWrapperArray.push(c);
        }
        var boundRect = this.NI().get_polygon().get_boundingRect(),
            margin = 0.1;
        boundRect.y -= margin / 2;
        boundRect.height += margin;
        gapInfo.mBoundRect = boundRect;
        gapInfo.mSimpleMeshData = this.makeSimpleMeshData(modelMetaData);
    }
    createGrooveProfile() {
        throw new Error(
            'Abstract method "createGrooveProfile" is not implemented!'
        );
    }
    NI() {
        var a = new Array(0),
            b = this.shapesWrapper.get_maxX() - this.shapesWrapper.get_minX(),
            c = Math.atan(1 / this.xf.get_derivative()),
            d = this.depth / Math.sin(c),
            e = -this.xf.get_horizontalShift() * this.xf.get_derivative(),
            f = (b - this.xf.get_horizontalShift()) * this.xf.get_derivative() - e,
            g = Math.sqrt(d * d - this.depth * this.depth),
            h = Math.sqrt(b * b + f * f) + g;
        a.push(new PointEx(0, 0)),
            a.push(new PointEx(this.depth, 0)),
            a.push(new PointEx(this.depth, h)),
            a.push(new PointEx(0, h));
        var i = MathConsts.TAU * (this.radius - this.diaHeight),
            j = new FacePolygon(a);
        return (
            j.translate(-this.depth / 2, -(g / 2) + e),
            j.rotate2D(0, e, c / MathConsts.TAU),
            j.translate(0, this.Ni * i),
            new SeparatePolyData(j)
        );
    }
    makeGapAngles(a) {
        var b = MathConsts.TAU * (this.radius - this.diaHeight);
        a.fromAngle = a.mBoundRect.get_top() / b;
        a.toAngle = a.mBoundRect.get_bottom() / b;
    }
    makeSimpleMeshData(modelMetaData) {
        for (
            var b = this.shapesWrapper.get_maxX() - this.shapesWrapper.get_minX(),
            c = this.depth / Math.sin(Math.atan(1 / this.xf.get_derivative())),
            d = -this.xf.get_horizontalShift() * this.xf.get_derivative(),
            e = (b - this.xf.get_horizontalShift()) * this.xf.get_derivative() - d,
            f = this.radius / (this.radius - this.diaHeight),
            g = Math.sqrt(c * c - this.depth * this.depth) * f,
            h = (Math.sqrt(b * b + e * e) + g) * f + 2,
            meshDataArray = this.Nh.calcMeshs(modelMetaData, h),
            j = 0;
            j < meshDataArray.length; j++

        ) {
            this.geometryMergeHandler.addGeometry(meshDataArray[j].geometryData);
        }
        var simpleGeoData = this.geometryMergeHandler.merge();
        this.geometryMergeHandler.clean();
        var l = new Matrix3D();
        l.appendTranslation(0, -h, 0),
            l.appendRotation(-90, new Vector3D(1, 0, 0)),
            l.appendTranslation(0, 0, -(g / 2) + d - 1),
            l.appendRotation(
                Math.atan(1 / this.xf.get_derivative()) * MathConsts.RAD_TO_DEG,
                new Vector3D(0, 1, 0)
            ),
            SimpleGeometryDataUtil.applyTransformation(simpleGeoData, l),
            this.correctGeometry(simpleGeoData),
            0 != this.xf.get_derivative() && this.NN(simpleGeoData);
        var simpleMeshData = new SimpleMeshData();
        simpleMeshData.geometryData = simpleGeoData;
        var transMatrix = new Matrix3D();
        transMatrix.appendTranslation(0, this.radius - this.diaHeight, 0);
        transMatrix.appendRotation(360 * this.Ni, X_AXIS, new Vector3D(0, 0, 0));
        simpleMeshData.transformation = transMatrix;
        return simpleMeshData;
    }
    NN(a) {
        for (
            var b = (a, b, c, d) => {
                var e = Math.sin(b),
                    f = Math.cos(b);
                (a.x -= c), (a.y -= d);
                var g = e * a.x + f * a.y;
                (a.x = f * a.x - e * a.y + c), (a.y = g + d);
            },
            c = this.radius * MathConsts.TAU,
            d = 0,
            e = new Point();
            d < a.vertexPositionData.length;

        ) {
            var f = (-a.vertexPositionData[d + 2] / c) * MathConsts.TAU;
            e.setTo(0, a.vertexPositionData[d + 1]),
                b(e, f, 0, -this.radius),
                (a.vertexPositionData[d + 1] = e.y),
                (a.vertexPositionData[d + 2] = e.x),
                e.setTo(a.vertexNormalData[d + 2], a.vertexNormalData[d + 1]),
                b(e, f, 0, 0),
                (a.vertexNormalData[d + 1] = e.y),
                (a.vertexNormalData[d + 2] = e.x),
                (d += 3);
        }
    }
    correctGeometry(simpleGeoData) {
        var b = (pt, angle, centerX, radius) => {
            var sinVal = Math.sin(angle),
                cosVal = Math.cos(angle);
            (pt.x -= centerX), (pt.y -= radius);
            var g = sinVal * pt.x + cosVal * pt.y;
            (pt.x = cosVal * pt.x - sinVal * pt.y + centerX), (pt.y = g + radius);
        };

        var dX = this.shapesWrapper.get_maxX() - this.shapesWrapper.get_minX();
        var shape = RingMath.getMatchedShape(this.shapesWrapper, dX / 2);
        if (!ObjMan.__instanceof(shape, Line)) {
            var arc = ObjMan.__cast(shape, Arc),
                circleLength = arc.get_radius() * MathConsts.TAU,
                centerX = arc.get_centerX(),
                radius = -arc.get_radius();
            -1 == arc.get_winding() && (radius = -radius);

            var dY = arc.get_maxY() - arc.get_minY();
            var newPt = new Point();
            for (var j = 0; j < simpleGeoData.vertexPositionData.length;) {
                var l = ((centerX - simpleGeoData.vertexPositionData[j]) / circleLength) *
                    MathConsts.TAU * arc.get_winding();
                newPt.setTo(centerX, simpleGeoData.vertexPositionData[j + 1]),
                    b(newPt, l, centerX, radius),
                    -1 == arc.get_winding() && (newPt.y -= dY),
                    (simpleGeoData.vertexPositionData[j] = newPt.x),
                    (simpleGeoData.vertexPositionData[j + 1] = newPt.y),
                    newPt.setTo(simpleGeoData.vertexNormalData[j], simpleGeoData.vertexNormalData[j + 1]),
                    b(newPt, l, 0, 0),
                    (simpleGeoData.vertexNormalData[j] = newPt.x),
                    (simpleGeoData.vertexNormalData[j + 1] = newPt.y),
                    (j += 3);
            }
        }
    }
}
CrossGapMakerBase.TOLERANCE = .01;
class CrossRectGapMaker extends CrossGapMakerBase {
    constructor(a, b, c) {
        super(a, b, c);
    }

    createGrooveProfile() {
        var a = new ShapesWrapper,
            b = this.xf.get_horizontalShift(),
            c = b - this.depth / 2,
            d = b + this.depth / 2,
            e = new Line;
        e.initParam(d, this.diaHeight + 0.01, d, 0), a.addShape(e);
        var f = new Line;
        f.initParam(d, 0, c, 0), a.addShape(f);
        var g = new Line;
        return g.initParam(c, 0, c, this.diaHeight + 0.01), a.addShape(g), a;
    }
}
CrossRectGapMaker.TOLERANCE = .01;
class CrossUGapMaker extends CrossGapMakerBase {
    //gapParam, shape, radius
    constructor(a, b, c) {
        super(a, b, c);
    }
    createGrooveProfile() {
        var shapesWrapper = new ShapesWrapper,
            midX = this.xf.get_horizontalShift(),
            endX = midX - this.depth / 2,
            startX = midX + this.depth / 2;
        var line1 = new Line;
        line1.initParam(startX, this.diaHeight + 0.1, startX, this.diaHeight);
        shapesWrapper.addShape(line1);
        var arc = new Arc;
        arc.initFromTriangle(new Point(startX, this.diaHeight), new Point(midX, 0), new Point(endX, this.diaHeight));
        shapesWrapper.addShape(arc);
        var line2 = new Line;
        line2.initParam(endX, this.diaHeight, endX, this.diaHeight + 0.1);
        shapesWrapper.addShape(line2);
        return shapesWrapper;
    }
}
CrossUGapMaker.TOLERANCE = .1;
class CrossVGapMaker extends CrossGapMakerBase {
    constructor(a, b, c) {
        super(a, b, c);
    }

    createGrooveProfile() {
        var shapesWrapper = new ShapesWrapper,
            midX = this.xf.get_horizontalShift(),
            endX = midX - this.depth / 2,
            startX = midX + this.depth / 2,
            line1 = new Line;
        line1.initParam(startX, this.diaHeight + 0.01, midX, 0);
        shapesWrapper.addShape(line1);
        var line2 = new Line;
        line2.initParam(midX, 0, endX, this.diaHeight + 0.01);
        shapesWrapper.addShape(line2);
        return shapesWrapper;
    }
}
CrossVGapMaker.TOLERANCE = .01;
class ChannelGapMaker extends GapMakerBase {
    //gapParam, shape, radius
    constructor(a, b, c) {
        super(a, b, c), (this.NE = a.NE);
        var d = b.get_maxX() - b.get_minX(),
            e = RingMath.extractXIntersectTopPoint(b, 0.01),
            f = RingMath.extractXIntersectTopPoint(b, d / 2),
            g = RingMath.extractXIntersectTopPoint(b, d - 0.01);
        this.NF = Math.max(e.get_posY(), Math.max(f.get_posY(), g.get_posY()));
    }

    NE = null;
    NF = null;
    createGapInfo(gapInfo) {
        var shapesWrapper = new ShapesWrapper,
            modelMetaData = new ModelMetaData();
        (modelMetaData.fromAngle = 0), (modelMetaData.toAngle = 1), (modelMetaData.shapesWrapperArray = new Array(0));
        var d = this.xf.get_horizontalShift(),
            e = d - this.depth / 2,
            f = d + this.depth / 2,
            g = new Line;
        g.initParam(f, this.depth, f, 0), shapesWrapper.addShape(g);
        var h = new Line;
        h.initParam(f, 0, e, 0), shapesWrapper.addShape(h);
        var i = new Line;
        i.initParam(e, 0, e, this.depth), shapesWrapper.addShape(i);
        for (var j = 0; 10 > j;) {
            j++;
            modelMetaData.shapesWrapperArray.push(shapesWrapper);
        }
        var boundRect = this.NI().get_polygon().get_boundingRect();
        boundRect.y -= 1;
        boundRect.height += 1;
        gapInfo.mBoundRect = boundRect;
        gapInfo.mSimpleMeshData = this.makeSimpleMeshData(modelMetaData);
    }
    NI() {
        var a = new Array(0),
            b = this.shapesWrapper.get_maxX() - this.shapesWrapper.get_minX(),
            c = Math.atan(1 / this.xf.get_derivative()),
            d = this.depth / Math.sin(c),
            e = -this.xf.get_horizontalShift() * this.xf.get_derivative(),
            f = (b - this.xf.get_horizontalShift()) * this.xf.get_derivative() - e,
            g = Math.sqrt(d * d - this.depth * this.depth),
            h = Math.sqrt(b * b + f * f) + g;
        a.push(new PointEx(0, 0)),
            a.push(new PointEx(this.depth, 0)),
            a.push(new PointEx(this.depth, h)),
            a.push(new PointEx(0, h));
        var i = MathConsts.TAU * (this.radius - this.diaHeight),
            j = new FacePolygon(a);
        return (
            j.translate(-this.depth / 2, -(g / 2) + e),
            j.rotate2D(0, e, c / MathConsts.TAU),
            j.translate(0, this.Ni * i),
            new SeparatePolyData(j)
        );
    }
    makeGapAngles(a) {
        var b = MathConsts.TAU * (this.radius - this.diaHeight);
        a.fromAngle = a.mBoundRect.get_top() / b;
        a.toAngle = a.mBoundRect.get_bottom() / b;
    }
    makeSimpleMeshData(modelMetaData) {
        for (
            var b = this.shapesWrapper.get_maxX() - this.shapesWrapper.get_minX(),
            c = this.depth / Math.sin(Math.atan(1 / this.xf.get_derivative())),
            d = -this.xf.get_horizontalShift() * this.xf.get_derivative(),
            e = (b - this.xf.get_horizontalShift()) * this.xf.get_derivative() - d,
            f = this.radius / (this.radius - this.diaHeight),
            g = Math.sqrt(c * c - this.depth * this.depth) * f,
            h = (Math.sqrt(b * b + e * e) + g) * f + 2,
            meshDataArray = this.Nh.calcMeshs(modelMetaData, h),
            j = 0;
            j < meshDataArray.length; j++

        ) {
            this.geometryMergeHandler.addGeometry(meshDataArray[j].geometryData);
        }
        var simpleGeoData = this.geometryMergeHandler.merge();
        this.geometryMergeHandler.clean();
        var transform = new Matrix3D();
        transform.appendTranslation(0, -h, 0),
            transform.appendRotation(-90, new Vector3D(1, 0, 0)),
            transform.appendTranslation(0, 0, -(g / 2) + d - 1),
            transform.appendRotation(
                Math.atan(1 / this.xf.get_derivative()) * MathConsts.RAD_TO_DEG,
                new Vector3D(0, 1, 0)
            ),
            SimpleGeometryDataUtil.applyTransformation(simpleGeoData, transform),
            this.correctGeometry(simpleGeoData),
            0 != this.xf.get_derivative() && this.NN(simpleGeoData);
        var simpleMeshData = new SimpleMeshData();
        simpleMeshData.geometryData = simpleGeoData;
        var transMatrix = new Matrix3D();
        transMatrix.appendTranslation(0, this.radius - this.diaHeight, 0);
        transMatrix.appendRotation(360 * this.Ni, X_AXIS, new Vector3D(0, 0, 0));
        simpleMeshData.transformation = transMatrix;
        return simpleMeshData;
    }
    NN(a) {
        for (
            var b = (a, b, c, d) => {
                var e = Math.sin(b),
                    f = Math.cos(b);
                (a.x -= c), (a.y -= d);
                var g = e * a.x + f * a.y;
                (a.x = f * a.x - e * a.y + c), (a.y = g + d);
            },
            c = this.radius * MathConsts.TAU,
            d = 0,
            e = new Point();
            d < a.vertexPositionData.length;

        ) {
            var f = (-a.vertexPositionData[d + 2] / c) * MathConsts.TAU;
            e.setTo(0, a.vertexPositionData[d + 1]),
                b(e, f, 0, -this.radius),
                (a.vertexPositionData[d + 1] = e.y),
                (a.vertexPositionData[d + 2] = e.x),
                e.setTo(a.vertexNormalData[d + 2], a.vertexNormalData[d + 1]),
                b(e, f, 0, 0),
                (a.vertexNormalData[d + 1] = e.y),
                (a.vertexNormalData[d + 2] = e.x),
                (d += 3);
        }
    }
    correctGeometry(simpleGeoData) {
        var b = (a, b, c, d) => {
            var e = Math.sin(b),
                f = Math.cos(b);
            (a.x -= c), (a.y -= d);
            var g = e * a.x + f * a.y;
            (a.x = f * a.x - e * a.y + c), (a.y = g + d);
        };
        var dX = this.shapesWrapper.get_maxX() - this.shapesWrapper.get_minX();
        var shape = RingMath.getMatchedShape(this.shapesWrapper, dX / 2);
        if (!ObjMan.__instanceof(shape, Line)) {
            var e = ObjMan.__cast(shape, Arc),
                f = e.get_radius() * MathConsts.TAU,
                g = e.get_centerX(),
                h = -e.get_radius();
            -1 == e.get_winding() && (h = -h);
            for (
                var dY = e.get_maxY() - e.get_minY(), j = 0, k = new Point();
                j < simpleGeoData.vertexPositionData.length;

            ) {
                var l =
                    ((g - simpleGeoData.vertexPositionData[j]) / f) *
                    MathConsts.TAU *
                    e.get_winding();
                k.setTo(g, simpleGeoData.vertexPositionData[j + 1]),
                    b(k, l, g, h),
                    -1 == e.get_winding() && (k.y -= dY),
                    (simpleGeoData.vertexPositionData[j] = k.x),
                    (simpleGeoData.vertexPositionData[j + 1] = k.y),
                    k.setTo(simpleGeoData.vertexNormalData[j], simpleGeoData.vertexNormalData[j + 1]),
                    b(k, l, 0, 0),
                    (simpleGeoData.vertexNormalData[j] = k.x),
                    (simpleGeoData.vertexNormalData[j + 1] = k.y),
                    (j += 3);
            }
        }
    }
}
class Derivator {
    constructor() { }
    static derivateBound(boundPtArray, x0, y0, derivateAngle) {
        var sinVal = Math.sin(derivateAngle), cosVal = Math.cos(derivateAngle);
        for (var h = 0; boundPtArray.length > h; h++) {
            var pt = boundPtArray[h],
                dx = pt.x - x0,
                dy = pt.y - y0;
            pt.setTo(x0 + dx * cosVal + dy * sinVal, y0 - dx * sinVal + dy * cosVal);
        }
    }
}
ChannelGapMaker.TOLERANCE = .01;
class Simple2GapMaker extends GapMakerBase {
    constructor(a, b, c) {
        super(a, b, c);
        (this.NE = a.NE), (this.IW = new ShapeSplitter()), (this.NV = new Array(0));
    }
    NE = null;
    IW = null;
    NV = null;
    createGapInfo(gapInfo) {
        var shapesWrapper = new ShapesWrapper,
            modelMetaData = new ModelMetaData();
        (modelMetaData.fromAngle = 0), (modelMetaData.toAngle = 1), (modelMetaData.shapesWrapperArray = new Array(0)), modelMetaData.shapesWrapperArray.push(shapesWrapper), modelMetaData.shapesWrapperArray.push(shapesWrapper);
        var midX = this.xf.get_horizontalShift(),
            e = this.depth / 2,
            diaBoundPtArray = [
                new Point(midX - this.diaWidth / 2, -e),
                new Point(midX - this.diaWidth / 2, e),
                new Point(midX + this.diaWidth / 2, e),
                new Point(midX + this.diaWidth / 2, -e),
            ];
        0 != this.xf.get_derivative() &&
            Derivator.derivateBound(diaBoundPtArray, midX, 0, -Math.atan(this.xf.get_derivative()));
        var linesWrapper = RingMath.makeLinesArray(diaBoundPtArray),
            h = true,
            i = true;
        linesWrapper.getShapeAt(1).addMetaData("extractXIntersectTopPoint", true);
        linesWrapper.getShapeAt(3).addMetaData("extractYIntersectLeftPoint", true);
        var j = linesWrapper;
        if (linesWrapper.get_minX() < this.shapesWrapper.get_minX()) {
            this.IW.splitShapesByX(j, this.shapesWrapper.get_minX(), this.NV),
                (j = new ShapesWrapper);
            for (var k = 0; k < this.NV.length;)
                SliceMetaValue.SLICE_V_DIRECTION_RIGHT == this.NV[k].orientation && j.addShapes(this.NV[k].shapesWrapper), ++k;
            h = false;
        }
        if (linesWrapper.get_maxX() > this.shapesWrapper.get_maxX()) {
            this.IW.splitShapesByX(j, this.shapesWrapper.get_maxX(), this.NV),
                (j = new ShapesWrapper);
            for (var l = 0; l < this.NV.length;)
                SliceMetaValue.SLICE_V_DIRECTION_LEFT == this.NV[l].orientation && j.addShapes(this.NV[l].shapesWrapper), ++l;
            i = false;
        }
        for (var m = null, n = null, o = 0; o < j.get_numOfShapes();) {
            var p = j.getShapeAt(o);
            p.hasMetadata("extractXIntersectTopPoint")
                ? ((m = p), m.removeMetaData("extractXIntersectTopPoint"))
                : p.hasMetadata("extractYIntersectLeftPoint") && ((n = p), n.removeMetaData("extractYIntersectLeftPoint")),
                ++o;
        }
        var line1 = new Line,
            line2 = new Line;
        if (
            (h
                ? line1.initParam(n.get_endX(), n.get_endY(), m.get_startX(), m.get_startY())
                : line1.initParam(
                    m.get_startX(),
                    m.get_startY() + 10,
                    n.get_endX(),
                    n.get_endY() - 10
                ),
                i
                    ? line2.initParam(m.get_endX(), m.get_endY(), n.get_startX(), n.get_startY())
                    : line2.initParam(
                        n.get_startX(),
                        n.get_startY() - 10,
                        m.get_endX(),
                        m.get_endY() + 10
                    ),
                null != this.NE && this.NE.length > 0 && 0 != this.NE[0])
        ) {
            var t = ShapeMath.arcInterpolate(line1, m, this.NE[0], h);
            this.setGapShapeResolution(t), shapesWrapper.addShape(t);
        }
        if ((shapesWrapper.addShape(m), null != this.NE && this.NE.length > 1 && 0 != this.NE[1])) {
            var u = ShapeMath.arcInterpolate(m, line2, this.NE[1], i);
            this.setGapShapeResolution(u), shapesWrapper.addShape(u);
        }
        if (
            (i && shapesWrapper.addShape(line2), null != this.NE && this.NE.length > 2 && 0 != this.NE[2])
        ) {
            var v = ShapeMath.arcInterpolate(line2, n, this.NE[2], i);
            this.setGapShapeResolution(v), shapesWrapper.addShape(v);
        }
        if ((shapesWrapper.addShape(n), null != this.NE && this.NE.length > 3 && 0 != this.NE[3])) {
            var w = ShapeMath.arcInterpolate(n, line1, this.NE[3], h);
            this.setGapShapeResolution(w), shapesWrapper.addShape(w);
        }
        h && shapesWrapper.addShape(line1);
        gapInfo.mSimpleMeshData = this.makeSimpleMeshData(modelMetaData);
        var boundRect = shapesWrapper.calcBoundingRect(null, 0);
        boundRect.offset(
            0,
            (this.radius - (this.shapesWrapper.get_maxY() - this.shapesWrapper.get_minY())) *
            MathConsts.TAU *
            this.Ni
        ),
            (gapInfo.mBoundRect = boundRect);
    }
}
Simple2GapMaker.TOLERANCE = .01;
class SimpleGapMaker extends GapMakerBase {
    constructor(a, b, c) {
        super(a, b, c);
        this.NE = a.NE;
    }

    NE = null;
    createGapInfo(gapInfo) {
        var shapesWrapper = new ShapesWrapper,
            modelMetaData = new ModelMetaData();
        modelMetaData.fromAngle = 0;
        modelMetaData.toAngle = 1;
        modelMetaData.shapesWrapperArray = new Array(0);
        modelMetaData.shapesWrapperArray.push(shapesWrapper);
        modelMetaData.shapesWrapperArray.push(shapesWrapper);
        var d = this.xf.get_horizontalShift(),
            e = Math.max(d - this.diaWidth / 2 - 0.01, this.shapesWrapper.get_minX() - 0.01),
            f = this.xf.get_derivative() * -(d - e),
            g = Math.min(d + this.diaWidth / 2 + 0.01, this.shapesWrapper.get_maxX() + 0.01),
            h = this.xf.get_derivative() * (g - d),
            i = e > this.shapesWrapper.get_minX(),
            j = g < this.shapesWrapper.get_maxX(),
            k = this.depth / 2;
        0 != this.xf.get_derivative() &&
            (k /= Math.sin(Math.PI / 2 - Math.atan(this.xf.get_derivative())));
        var l = new Line;
        l.initParam(e, f + k, g, h + k);
        var m = new Line;
        m.initParam(g, h - k, e, f - k);
        var n = new Line,
            o = new Line;
        if (
            (i
                ? n.initParam(m.get_endX(), m.get_endY(), l.get_startX(), l.get_startY())
                : n.initParam(
                    l.get_startX(),
                    l.get_startY() + 10,
                    m.get_endX(),
                    m.get_endY() - 10
                ),
                j
                    ? o.initParam(l.get_endX(), l.get_endY(), m.get_startX(), m.get_startY())
                    : o.initParam(
                        m.get_startX(),
                        m.get_startY() - 10,
                        l.get_endX(),
                        l.get_endY() + 10
                    ),
                null != this.NE && this.NE.length > 0 && 0 != this.NE[0])
        ) {
            var p = ShapeMath.arcInterpolate(n, l, this.NE[0], i);
            this.setGapShapeResolution(p), shapesWrapper.addShape(p);
        }
        if ((shapesWrapper.addShape(l), null != this.NE && this.NE.length > 1 && 0 != this.NE[1])) {
            var q = ShapeMath.arcInterpolate(l, o, this.NE[1], j);
            this.setGapShapeResolution(q), shapesWrapper.addShape(q);
        }
        if (
            (j && shapesWrapper.addShape(o), null != this.NE && this.NE.length > 2 && 0 != this.NE[2])
        ) {
            var s = ShapeMath.arcInterpolate(o, m, this.NE[2], j);
            this.setGapShapeResolution(s), shapesWrapper.addShape(s);
        }
        if ((shapesWrapper.addShape(m), null != this.NE && this.NE.length > 3 && 0 != this.NE[3])) {
            var t = ShapeMath.arcInterpolate(m, n, this.NE[3], i);
            this.setGapShapeResolution(t), shapesWrapper.addShape(t);
        }
        i && shapesWrapper.addShape(n);
        gapInfo.mSimpleMeshData = this.makeSimpleMeshData(modelMetaData);
        var boundRect = shapesWrapper.calcBoundingRect(null, 0);
        boundRect.offset(
            0,
            (this.radius - (this.shapesWrapper.get_maxY() - this.shapesWrapper.get_minY())) *
            MathConsts.TAU *
            this.Ni
        ),
            (gapInfo.mBoundRect = boundRect);
    }
}
SimpleGapMaker.TOLERANCE = .01;
class Type1GapMaker extends GapMakerBase {
    constructor(a, b, c) {
        super(a, b, c);
        this.NE = a.NE;
    }

    NE = null;
    createGapInfo(gapInfo) {
        var shapeWrapper = new ShapesWrapper,
            modelMetaData = new ModelMetaData();
        modelMetaData.fromAngle = 0;
        modelMetaData.toAngle = 1;
        modelMetaData.shapesWrapperArray = new Array(0);
        modelMetaData.shapesWrapperArray.push(shapeWrapper);
        modelMetaData.shapesWrapperArray.push(shapeWrapper);
        var d = this.depth / 2,
            e = this.xf.get_horizontalShift(),
            f = Math.max(e - this.diaWidth / 2 - 0.01, this.shapesWrapper.get_minX() - 0.01),
            g = e - f,
            h = this.xf.get_derivative() * g + d,
            i = this.xf.get_derivative() * -g - d,
            j = Math.min(e + this.diaWidth / 2 + 0.01, this.shapesWrapper.get_maxX() + 0.01),
            k = j - e,
            l = this.xf.get_derivative() * k + d,
            m = this.xf.get_derivative() * -k - d,
            n = f > this.shapesWrapper.get_minX(),
            o = j < this.shapesWrapper.get_maxX();
        0 != this.xf.get_derivative() &&
            (d /= Math.sin(Math.PI / 2 - Math.atan(this.xf.get_derivative())));
        var p = null,
            q = null,
            s = null,
            t = null,
            line1 = new Line,
            line2 = new Line,
            w = GeoNumComparor.isGreater(e, this.shapesWrapper.get_minX(), 0.01),
            x = GeoNumComparor.isLess(e, this.shapesWrapper.get_maxX(), 0.01);
        w &&
            ((p = new Line),
                p.initParam(f, h, e, d),
                (t = new Line),
                t.initParam(e, -d, f, i)),
            x &&
            ((q = new Line),
                q.initParam(e, d, j, l),
                (s = new Line),
                s.initParam(j, m, e, -d));
        var y = null == p ? q : p,
            z = null == t ? s : t,
            A = null == q ? p : q,
            B = null == s ? t : s;
        if (
            (n
                ? line1.initParam(z.get_endX(), z.get_endY(), y.get_startX(), y.get_startY())
                : line1.initParam(
                    y.get_startX(),
                    y.get_startY() + 10,
                    z.get_endX(),
                    z.get_endY() - 10
                ),
                o
                    ? line2.initParam(A.get_endX(), A.get_endY(), B.get_startX(), B.get_startY())
                    : line2.initParam(
                        B.get_startX(),
                        B.get_startY() - 10,
                        A.get_endX(),
                        A.get_endY() + 10
                    ),
                null != this.NE && this.NE.length > 0 && 0 != this.NE[0])
        ) {
            var C = ShapeMath.arcInterpolate(line1, null == p ? q : p, this.NE[0], n);
            this.setGapShapeResolution(C), shapeWrapper.addShape(C);
        }
        if (
            null != p &&
            (shapeWrapper.addShape(p),
                null != q && null != this.NE && this.NE.length > 1 && 0 != this.NE[1])
        ) {
            var D = ShapeMath.arcInterpolate(p, q, this.NE[1], this.xf.get_derivative() < 0);
            this.setGapShapeResolution(D), shapeWrapper.addShape(D);
        }
        if (
            (null != q && shapeWrapper.addShape(q),
                null != this.NE && this.NE.length > 2 && 0 != this.NE[2])
        ) {
            var E = ShapeMath.arcInterpolate(null == q ? p : q, line2, this.NE[2], o);
            this.setGapShapeResolution(E), shapeWrapper.addShape(E);
        }
        if (
            (o && shapeWrapper.addShape(line2), null != this.NE && this.NE.length > 3 && 0 != this.NE[3])
        ) {
            var F = ShapeMath.arcInterpolate(line2, null == s ? t : s, this.NE[3], o);
            this.setGapShapeResolution(F), shapeWrapper.addShape(F);
        }
        if ((null != s && shapeWrapper.addShape(s), null != t)) {
            if (
                null != s &&
                null != this.NE &&
                this.NE.length > 4 &&
                0 != this.NE[4]
            ) {
                var G = ShapeMath.arcInterpolate(s, t, this.NE[1], this.xf.get_derivative() < 0);
                this.setGapShapeResolution(G), shapeWrapper.addShape(G);
            }
            shapeWrapper.addShape(t);
        }
        if (null != this.NE && this.NE.length > 5 && 0 != this.NE[5]) {
            var H = ShapeMath.arcInterpolate(null == t ? s : t, line1, this.NE[5], n);
            this.setGapShapeResolution(H), shapeWrapper.addShape(H);
        }
        n && shapeWrapper.addShape(line1);
        gapInfo.mSimpleMeshData = this.makeSimpleMeshData(modelMetaData);
        var boundRect = shapeWrapper.calcBoundingRect(null, 0);
        boundRect.offset(
            0,
            (this.radius - (this.shapesWrapper.get_maxY() - this.shapesWrapper.get_minY())) *
            MathConsts.TAU *
            this.Ni
        ),
            (gapInfo.mBoundRect = boundRect);
    }
}
Type1GapMaker.TOLERANCE = .01;
class Type2GapMaker extends GapMakerBase {
    constructor(a, b, c) {
        super(a, b, c);
        this.NE = a.NE;
    }

    NE = null;
    createGapInfo(gapInfo) {
        var shapesWrapper = new ShapesWrapper,
            modelMetaData = new ModelMetaData();
        modelMetaData.fromAngle = 0;
        modelMetaData.toAngle = 1;
        modelMetaData.shapesWrapperArray = new Array(0);
        modelMetaData.shapesWrapperArray.push(shapesWrapper);
        modelMetaData.shapesWrapperArray.push(shapesWrapper);
        var d = this.depth / 2,
            e = this.xf.get_horizontalShift(),
            f = Math.max(e - this.diaWidth / 2 - 0.01, this.shapesWrapper.get_minX() - 0.01),
            g = e - f,
            h = this.xf.get_derivative() * g + d,
            i = this.xf.get_derivative() * g - d,
            j = Math.min(e + this.diaWidth / 2 + 0.01, this.shapesWrapper.get_maxX() + 0.01),
            k = j - e,
            l = this.xf.get_derivative() * k + d,
            m = this.xf.get_derivative() * k - d,
            n = f > this.shapesWrapper.get_minX(),
            o = j < this.shapesWrapper.get_maxX();
        0 != this.xf.get_derivative() &&
            (d /= Math.sin(Math.PI / 2 - Math.atan(this.xf.get_derivative())));
        var line3 = null,
            line5 = null,
            line6 = null,
            line4 = null,
            line1 = new Line,
            line2 = new Line,
            w = GeoNumComparor.isGreater(e, this.shapesWrapper.get_minX(), 0.01),
            x = GeoNumComparor.isLess(e, this.shapesWrapper.get_maxX(), 0.01);
        w &&
            ((line3 = new Line),
                line3.initParam(f, h, e, d),
                (line4 = new Line),
                line4.initParam(e, -d, f, i)),
            x &&
            ((line5 = new Line),
                line5.initParam(e, d, j, l),
                (line6 = new Line),
                line6.initParam(j, m, e, -d));
        var line7 = null == line3 ? line5 : line3,
            line8 = null == line4 ? line6 : line4,
            line9 = null == line5 ? line3 : line5,
            line10 = null == line6 ? line4 : line6;
        if (
            (n
                ? line1.initParam(line8.get_endX(), line8.get_endY(), line7.get_startX(), line7.get_startY())
                : line1.initParam(
                    line7.get_startX(),
                    line7.get_startY() + 10,
                    line8.get_endX(),
                    line8.get_endY() - 10
                ),
                o
                    ? line2.initParam(line9.get_endX(), line9.get_endY(), line10.get_startX(), line10.get_startY())
                    : line2.initParam(
                        line10.get_startX(),
                        line10.get_startY() - 10,
                        line9.get_endX(),
                        line9.get_endY() + 10
                    ),
                null != this.NE && this.NE.length > 0 && 0 != this.NE[0])
        ) {
            var C = ShapeMath.arcInterpolate(line1, null == line3 ? line5 : line3, this.NE[0], n);
            this.setGapShapeResolution(C), shapesWrapper.addShape(C);
        }
        if (
            null != line3 &&
            (shapesWrapper.addShape(line3),
                null != line5 && null != this.NE && this.NE.length > 1 && 0 != this.NE[1])
        ) {
            var D = ShapeMath.arcInterpolate(line3, line5, this.NE[1], this.xf.get_derivative() < 0);
            this.setGapShapeResolution(D), shapesWrapper.addShape(D);
        }
        if (
            (null != line5 && shapesWrapper.addShape(line5),
                null != this.NE && this.NE.length > 2 && 0 != this.NE[2])
        ) {
            var E = ShapeMath.arcInterpolate(null == line5 ? line3 : line5, line2, this.NE[2], o);
            this.setGapShapeResolution(E), shapesWrapper.addShape(E);
        }
        if (
            (o && shapesWrapper.addShape(line2), null != this.NE && this.NE.length > 3 && 0 != this.NE[3])
        ) {
            var F = ShapeMath.arcInterpolate(line2, null == line6 ? line4 : line6, this.NE[3], o);
            this.setGapShapeResolution(F), shapesWrapper.addShape(F);
        }
        if ((null != line6 && shapesWrapper.addShape(line6), null != line4)) {
            if (
                null != line6 &&
                null != this.NE &&
                this.NE.length > 4 &&
                0 != this.NE[4]
            ) {
                var G = ShapeMath.arcInterpolate(line6, line4, this.NE[1], this.xf.get_derivative() > 0);
                this.setGapShapeResolution(G), shapesWrapper.addShape(G);
            }
            shapesWrapper.addShape(line4);
        }
        if (null != this.NE && this.NE.length > 5 && 0 != this.NE[5]) {
            var H = ShapeMath.arcInterpolate(null == line4 ? line6 : line4, line1, this.NE[5], n);
            this.setGapShapeResolution(H), shapesWrapper.addShape(H);
        }
        n && shapesWrapper.addShape(line1);
        gapInfo.mSimpleMeshData = this.makeSimpleMeshData(modelMetaData);
        var boundRect = shapesWrapper.calcBoundingRect(null, 0);
        boundRect.offset(
            0,
            (this.radius - (this.shapesWrapper.get_maxY() - this.shapesWrapper.get_minY())) *
            MathConsts.TAU *
            this.Ni
        ),
            (gapInfo.mBoundRect = boundRect);
    }
}
Type2GapMaker.TOLERANCE = .01;

class RingGapWrapper {
    constructor() { }
    simpleMeshDataArray2 = null;
    simpleMeshDataArray = null;
}
class GeometryLink {
    __class__ = GeometryLink;
    static __name__ = ["GeometryLink"];
    geoPlane = null;
    frontGeoLink = null;
    backGeoLink = null;
    splitedGeoExFaceArray = null;
    abcArray = null;
    backGeoExFaceArray = null;
    frontGeoExFaceArray1 = null;
    frontGeoExFaceArray = null;
    backGeoExFaceArray1 = null;
    constructor() {
        this.backGeoExFaceArray1 = new Array(0);
        this.frontGeoExFaceArray = new Array(0);
        this.frontGeoExFaceArray1 = new Array(0);
        this.backGeoExFaceArray = new Array(0);
        this.splitedGeoExFaceArray = new Array(0);
    }

    reverse() {
        for (var a = this.abcArray.length, b = 0; a > b; b++) {
            for (var c = this.abcArray[b], d = c.splitedGeoExFaceArray, e = d.length, f = 0; e > f; f++)
                d[f].reverse();
            var g = c.frontGeoLink;
            c.frontGeoLink = c.backGeoLink;
            c.backGeoLink = g;
            c.geoPlane.reverse();
        }
    }
    split(geoExFaceArray) {
        if (null == this.geoPlane) return geoExFaceArray.slice(0, 0xffffff);

        ArrayTool.clear(this.frontGeoExFaceArray1);
        ArrayTool.clear(this.backGeoExFaceArray1);

        for (var h = geoExFaceArray.length, i = 0; h > i; i++)
            this.geoPlane.calcFaceIntersections(geoExFaceArray[i], this.frontGeoExFaceArray1, this.backGeoExFaceArray1, this.frontGeoExFaceArray1, this.backGeoExFaceArray1);

        if (null != this.frontGeoLink)
            this.frontGeoExFaceArray1 = this.frontGeoLink.split(this.frontGeoExFaceArray1);
        if (null != this.backGeoLink)
            this.backGeoExFaceArray1 = this.backGeoLink.split(this.backGeoExFaceArray1);
        else
            ArrayTool.clear(this.backGeoExFaceArray1);

        return null == this.backGeoExFaceArray1 ? this.frontGeoExFaceArray1.slice() : this.frontGeoExFaceArray1.concat(this.backGeoExFaceArray1);
    }
    splitFaces(geoLink) {
        for (var c = 0; this.abcArray.length > c; c++) {
            this.abcArray[c].splitedGeoExFaceArray = geoLink.split(this.abcArray[c].splitedGeoExFaceArray);
        }
    }
    getAllGeoExFaces() {
        var len = this.abcArray.length;
        var b = this.splitedGeoExFaceArray;
        for (var c = 1; len > c; c++) {
            var d = this.abcArray[c].splitedGeoExFaceArray;
            b = null == d ? b.slice() : b.concat(d);
        }
        return b;
    }
    recursiveSplit(geoExFaceArray, b) {
        var count = geoExFaceArray.length;
        if (0 != count) {
            if (null == this.geoPlane)
                this.geoPlane = geoExFaceArray[0].get_plane().clone();

            ArrayTool.clear(this.frontGeoExFaceArray);
            ArrayTool.clear(this.backGeoExFaceArray);

            for (var j = 0; count > j; j++)
                this.geoPlane.calcFaceIntersections(geoExFaceArray[j], this.splitedGeoExFaceArray, this.splitedGeoExFaceArray, this.frontGeoExFaceArray, this.backGeoExFaceArray);
            this.abcArray[this.abcArray.length] = this;
            if (null == this.frontGeoLink && 0 != this.frontGeoExFaceArray.length) {
                this.frontGeoLink = new GeometryLink;
                this.frontGeoLink.abcArray = this.abcArray;
                this.frontGeoLink.recursiveSplit(this.frontGeoExFaceArray, b);
            }
            if (null == this.backGeoLink && 0 != this.backGeoExFaceArray.length) {
                this.backGeoLink = new GeometryLink;
                this.backGeoLink.abcArray = this.abcArray;
                this.backGeoLink.recursiveSplit(this.backGeoExFaceArray, b);
            }
        }
    }
}
class GeoPointAdder {
    __class__ = GeoPointAdder;
    static __name__ = ["GeoPointAdder"];
    geoExPointArray = null;
    ptCount = null;
    constructor() {
        this.geoExPointArray = new Array(0);
        this.ptCount = 0;
    }

    addGeoExPoint(geoExPoint) {
        -1 == geoExPoint.borderIndex && (geoExPoint.borderIndex = this.ptCount, this.geoExPointArray[this.ptCount++] = geoExPoint);
        return geoExPoint.borderIndex;
    }
}
class GapCreator {
    __class__ = GapCreator;
    static __name__ = ["SAN"];
    gapFaceArray = null;
    constructor(geoExFaceArray) {
        null != geoExFaceArray ? (this.gapFaceArray = geoExFaceArray) : (this.gapFaceArray = new Array(0));
    }

    static createGapCreatorFromGeofaceArray(geoExFaceArray) {
        var b = new GapCreator();
        b.gapFaceArray = geoExFaceArray;
        return b;
    }
    static fi(geometryLink1, geometryLink2, geoPlaneArray, bDoubleSize) {
        null == bDoubleSize && (bDoubleSize = true);
        if (null != geoPlaneArray) {
            for (var e = 0; e < geoPlaneArray.length; e++) {
                var geoPlane = geoPlaneArray[e];
                var g = new GeometryLink;
                g.abcArray = new Array(0);
                g.geoPlane = geoPlane;
                geometryLink2.splitFaces(g);
            }
        }
        geometryLink1.reverse();
        geometryLink1.splitFaces(geometryLink2);
        geometryLink2.splitFaces(geometryLink1);
        bDoubleSize ? (geometryLink2.reverse(), geometryLink2.splitFaces(geometryLink1), geometryLink1.reverse()) : (geometryLink2.reverse(), geometryLink1.reverse());

        var h = new Array(0);
        h[0] = geometryLink1;
        h[1] = geometryLink2;
        return h;
    }
    static fl(geometryLink1, geometryLink2, geometryLink, d) {
        null == d && (d = true),
            geometryLink2.splitFaces(geometryLink),
            geometryLink1.reverse(),
            geometryLink1.splitFaces(geometryLink2),
            geometryLink2.splitFaces(geometryLink1),
            d ? (geometryLink2.reverse(), geometryLink2.splitFaces(geometryLink1), geometryLink1.reverse()) : (geometryLink2.reverse(), geometryLink1.reverse());
        var e = new Array(0);
        return (e[0] = geometryLink1), (e[1] = geometryLink2), e;
    }
    static makeGeoDataFromFaces(geoExFaceArray) {
        var geoPointAdder = new GeoPointAdder(),
            len = geoExFaceArray.length,
            borderIndices = new Array(0),
            indices = new Array(0),
            f = 0,
            g = 0;
        for (var h = 0; len > h; h++) {
            var geoExPointArray = geoExFaceArray[h].geoExPointArray,
                j = g,
                count = geoExPointArray.length,
                l = borderIndices.length + count;

            ArrayTool.clear(borderIndices, l);

            for (var p = 0; count > p; p++)
                borderIndices[g++] = geoPointAdder.addGeoExPoint(geoExPointArray[p]);

            ArrayTool.clear(indices, indices.length + 3 * (count - 2));

            for (var u = 2; count > u; u++) {
                indices[f++] = borderIndices[j];
                indices[f++] = borderIndices[j + u - 1];
                indices[f++] = borderIndices[j + u];
            }
        }

        var vertexPositionData = new Array(3 * geoPointAdder.ptCount),
            vertexNormalData = new Array(3 * geoPointAdder.ptCount),
            uvData = new Array(2 * geoPointAdder.ptCount),
            secondaryUvData = new Array(2 * geoPointAdder.ptCount);

        for (h = 0; h < geoPointAdder.ptCount; h++) {
            var geoPointEx = geoPointAdder.geoExPointArray[h];
            vertexPositionData[3 * h] = geoPointEx.posX;
            vertexPositionData[3 * h + 1] = geoPointEx.posY;
            vertexPositionData[3 * h + 2] = geoPointEx.posZ;
            vertexNormalData[3 * h] = geoPointEx.normalX;
            vertexNormalData[3 * h + 1] = geoPointEx.normalY;
            vertexNormalData[3 * h + 2] = geoPointEx.normalZ;
            uvData[2 * h] = geoPointEx.U;
            uvData[2 * h + 1] = geoPointEx.V;
            secondaryUvData[2 * h] = geoPointEx.secondaryU;
            secondaryUvData[2 * h + 1] = geoPointEx.secondaryV;
        }

        var simpleGeoData = new SimpleGeometryData();
        simpleGeoData.vertexPositionData = vertexPositionData;
        simpleGeoData.vertexNormalData = vertexNormalData;
        simpleGeoData.uvData = uvData;
        simpleGeoData.secondaryUvData = secondaryUvData;
        simpleGeoData.indices = indices;

        return simpleGeoData;
    }
    static createGapCreatorFromGeoData(geoData) {
        var b = GapCreator.convertGeoDataToGeoExFaceArray(
            geoData.indices,
            geoData.vertexPositionData,
            geoData.vertexNormalData,
            geoData.uvData,
            geoData.secondaryUvData
        );
        var c = new GapCreator();
        c.gapFaceArray = b;
        return c;
    }
    static convertGeoDataToGeoExFaceArray(indices, vertexPositionData, vertexNormalData, uvData, secondaryUvData) {
        for (var f = (indices.length / 3) | 0, geoExFaceArray = new Array(f), h = 0, i = 0; i < indices.length;) {
            var geoExFace = new GeoExFace;
            geoExFaceArray[h++] = geoExFace;
            for (var l = 0, m = 0; 3 > m; m++) {
                var U,
                    V,
                    p = 3 * indices[i + m],
                    q = 2 * indices[i + m];
                null != uvData && 0 != uvData.length
                    ? ((U = uvData[q]), (V = uvData[q + 1]))
                    : ((U = NaN), (V = NaN));
                var secondU, secondV;
                null != secondaryUvData && secondaryUvData.length > q
                    ? ((secondU = secondaryUvData[q]), (secondV = secondaryUvData[q + 1]))
                    : ((secondU = NaN), (secondV = NaN));
                var geoPointEx = new GeoPointEx;
                geoPointEx.initParam(vertexPositionData[p], vertexPositionData[p + 1], vertexPositionData[p + 2],
                    vertexNormalData[p], vertexNormalData[p + 1], vertexNormalData[p + 2],
                    U, V, secondU, secondV);
                geoExFace.geoExPointArray[l++] = geoPointEx;
            }
            i += 3;
        }
        return geoExFaceArray;
    }

    clone() {
        var a = new GapCreator(),
            b = this.gapFaceArray.length;
        a.gapFaceArray = new Array(b);
        for (var c = 0; c < this.gapFaceArray.length;) (a.gapFaceArray[c] = this.gapFaceArray[c].clone()), ++c;
        return a;
    }
    e3() {
        for (var a = this.clone(), b = 0, c = a.gapFaceArray; b < c.length;) {
            var d = c[b];
            ++b, d.reverse();
        }
        return a;
    }
    e4() {
        var geometryLink = new GeometryLink;
        geometryLink.abcArray = new Array(0);
        geometryLink.recursiveSplit(this.gapFaceArray, null);
        geometryLink.reverse();
        return GapCreator.createGapCreatorFromGeofaceArray(geometryLink.getAllGeoExFaces());
    }
    reverse() {
        for (var a = 0, b = this.gapFaceArray; a < b.length; a++) {
            var c = b[a];
            c.reverse();
        }
    }
    getGapFaceArray() {
        return this.gapFaceArray;
    }
    makeGeometryData() {
        return GapCreator.makeGeoDataFromFaces(this.gapFaceArray);
    }
    invalidateAllGeoExPoints() {
        for (var a = 0, b = this.gapFaceArray; a < b.length; a++) {
            var c = b[a];
            for (var d = 0, e = c.geoExPointArray; d < e.length; d++) {
                var f = e[d];
                f.borderIndex = -1;
            }
        }
    }
    PolyUnion(a) {
        var b = new GeometryLink;
        b.abcArray = new Array(0);
        b.recursiveSplit(this.clone().gapFaceArray, null);

        var c = new GeometryLink;
        c.abcArray = new Array(0);
        c.recursiveSplit(a.clone().gapFaceArray, null);

        b.splitFaces(c);
        c.splitFaces(b);
        c.reverse();
        c.splitFaces(b);
        c.reverse();
        b.recursiveSplit(c.getAllGeoExFaces());

        return GapCreator.createGapCreatorFromGeofaceArray(b.getAllGeoExFaces());
    }
    fa(gapCreator) {
        var b = new GeometryLink;
        b.abcArray = new Array(0);
        b.recursiveSplit(this.clone().gapFaceArray, null);

        var c = new GeometryLink;
        c.abcArray = new Array(0);
        c.recursiveSplit(gapCreator.clone().gapFaceArray, null);

        b.splitFaces(c);
        c.splitFaces(b);
        c.reverse();
        c.splitFaces(b);
        b.reverse();
        return GapCreator.createGapCreatorFromGeofaceArray(b.getAllGeoExFaces());
    }
    fb(a) {
        var b = new GeometryLink;
        (b.abcArray = new Array(0)),
            b.recursiveSplit(this.clone().gapFaceArray, null);
        var c = new GeometryLink;
        c.abcArray = new Array(0);
        c.recursiveSplit(a.clone().gapFaceArray, null);
        c.reverse();
        b.splitFaces(c);
        c.splitFaces(b);
        c.reverse();
        c.splitFaces(b);
        b.reverse();
        return GapCreator.createGapCreatorFromGeofaceArray(b.getAllGeoExFaces());
    }
    splitFaces(a) {
        var b = new GeometryLink;
        b.abcArray = new Array(0);
        b.recursiveSplit(this.clone().gapFaceArray, null);

        var c = new GeometryLink;
        c.abcArray = new Array(0);
        c.recursiveSplit(a.clone().gapFaceArray, null);

        b.splitFaces(c);

        return GapCreator.createGapCreatorFromGeofaceArray(b.getAllGeoExFaces());
    }
    ff(a, b, c) {
        null == c && (c = true);
        var d = new GeometryLink;
        (d.abcArray = new Array(0)),
            d.recursiveSplit(this.clone().gapFaceArray, null);
        var e = new GeometryLink;
        if (
            ((e.abcArray = new Array(0)),
                e.recursiveSplit(a.clone().gapFaceArray, null),
                null != b)
        )
            for (var f = 0; f < b.length;) {
                var g = b[f];
                ++f;
                var h = new GeometryLink;
                (h.abcArray = new Array(0)), (h.geoPlane = g), e.splitFaces(h);
            }
        d.reverse();
        d.splitFaces(e);
        e.splitFaces(d);
        c && (e.reverse(), e.splitFaces(d), e.reverse());
        d.recursiveSplit(e.getAllGeoExFaces());
        d.reverse();
        return GapCreator.createGapCreatorFromGeofaceArray(d.getAllGeoExFaces());
    }
    fh(gapCreator, geoPlaneArray, bDoubleSize) {
        null == bDoubleSize && (bDoubleSize = true);
        var d = new GeometryLink;
        d.abcArray = new Array(0);
        d.recursiveSplit(this.clone().gapFaceArray, null);
        var e = new GeometryLink;
        e.abcArray = new Array(0);
        e.recursiveSplit(gapCreator.clone().gapFaceArray, null);
        var f = new Array(0),
            g = GapCreator.fi(d, e, geoPlaneArray, bDoubleSize);
        f[0] = GapCreator.createGapCreatorFromGeofaceArray(g[0].getAllGeoExFaces());
        f[1] = GapCreator.createGapCreatorFromGeofaceArray(g[1].getAllGeoExFaces());
        return f;
    }
    fk(a, b, c) {
        null == c && (c = true);
        var d = new GeometryLink;
        (d.abcArray = new Array(0)),
            d.recursiveSplit(this.clone().gapFaceArray, null);
        var e = new GeometryLink;
        (e.abcArray = new Array(0)),
            e.recursiveSplit(a.clone().gapFaceArray, null);
        var f = new Array(0),
            g = new GeometryLink;
        (g.abcArray = new Array(0)),
            g.recursiveSplit(b, null);
        var h = GapCreator.fl(d, e, g, c);
        f[0] = GapCreator.createGapCreatorFromGeofaceArray(h[0].getAllGeoExFaces());
        f[1] = GapCreator.createGapCreatorFromGeofaceArray(h[1].getAllGeoExFaces());
        return f;
    }
    fm(a) {
        var b = new GeometryLink;
        (b.abcArray = new Array(0)),
            b.recursiveSplit(this.clone().gapFaceArray, null);
        var c = new GeometryLink;
        c.abcArray = new Array(0);
        c.recursiveSplit(a.clone().gapFaceArray, null);
        b.reverse();
        c.reverse();
        b.splitFaces(c);
        c.splitFaces(b);
        b.recursiveSplit(c.getAllGeoExFaces());
        b.reverse();
        return GapCreator.createGapCreatorFromGeofaceArray(b.getAllGeoExFaces());
    }
}
class GapMaker {
    __class__ = GapMaker;
    static __name__ = ["GapMaker"];
    constructor() { }
    makeRingGapWrapper(gapWrapper) {
        var ringGapWrapper = new RingGapWrapper();
        (ringGapWrapper.simpleMeshDataArray = new Array(0)), (ringGapWrapper.simpleMeshDataArray2 = new Array(0));
        var c = gapWrapper.gapSimpleMeshData.geometryData.clone();
        this.transformGeometryData(c, gapWrapper.gapSimpleMeshData.transformation);
        var d = GapCreator.createGapCreatorFromGeoData(c);
        null != gapWrapper.geoFacesArray2 && gapWrapper.geoFacesArray2.length > 0 && (d = d.fa(GapCreator.createGapCreatorFromGeofaceArray(gapWrapper.geoFacesArray2)));
        for (var e = 0, f = gapWrapper.segmentGeoDatasBackup; e < f.length;) {
            var g = f[e];
            ++e;
            var h = GapCreator.createGapCreatorFromGeoData(g.geometryData).fa(d),
                i = new SimpleMeshData();
            (i.geometryData = h.makeGeometryData()),
                i.geometryData.indices.length > 0 &&
                (g.copyMetaDatasTo(i), ringGapWrapper.simpleMeshDataArray2.push(i));
        }
        for (
            var j = new SimpleGeometryMergeHandler(), k = 0, l = gapWrapper.segmentGeoDatasBackup;
            k < l.length;

        ) {
            var m = l[k];
            ++k, j.addGeometry(m.geometryData);
        }
        var n = j.merge();
        j.clean();
        var o = GapCreator.createGapCreatorFromGeoData(n);
        o.reverse();
        d = d.fa(o);
        d.reverse();
        if (null != gapWrapper.geoFacesArray1 && gapWrapper.geoFacesArray1.length > 0) {
            for (var p = 0; p < gapWrapper.geoFacesArray1.length; p++) {
                var q = GapCreator.createGapCreatorFromGeofaceArray(gapWrapper.geoFacesArray1[p]),
                    r = d.clone().fa(q).makeGeometryData();
                if (r.indices.length > 0) {
                    var s = new SimpleMeshData();
                    (s.geometryData = r),
                        s.addMetaData(SliceMeta.SLICE_INDEX, p),
                        s.addMetaData(SliceMeta.SLICE_V_DIRECTION, SliceMetaValue.SLICE_V_DIRECTION_LEFT),
                        ringGapWrapper.simpleMeshDataArray.push(s);
                }
                q.reverse(), (d = d.fa(q));
            }
            var t = d.makeGeometryData();
            if (t.indices.length > 0) {
                var u = new SimpleMeshData();
                (u.geometryData = t),
                    u.addMetaData(SliceMeta.SLICE_INDEX, p - 1),
                    u.addMetaData(SliceMeta.SLICE_V_DIRECTION, SliceMetaValue.SLICE_V_DIRECTION_RIGHT),
                    ringGapWrapper.simpleMeshDataArray.push(u);
            }
        } else {
            var v = d.makeGeometryData();
            if (v.indices.length > 0) {
                var w = new SimpleMeshData();
                (w.geometryData = v), ringGapWrapper.simpleMeshDataArray.push(w);
            }
        }
        return ringGapWrapper;
    }
    transformGeometryData(geometryData, transform) {
        var c = new Vector3D(),
            d = transform.clone();
        d.invert(), d.transpose();
        for (var e = 0; e < geometryData.vertexPositionData.length;) {
            c.setTo(
                geometryData.vertexPositionData[e],
                geometryData.vertexPositionData[e + 1],
                geometryData.vertexPositionData[e + 2]
            );
            var f = transform.rawData,
                g = c.x,
                h = c.y,
                i = c.z;
            c.setTo(
                g * f[0] + h * f[4] + i * f[8] + f[12],
                g * f[1] + h * f[5] + i * f[9] + f[13],
                g * f[2] + h * f[6] + i * f[10] + f[14]
            ),
                (c.w = g * f[3] + h * f[7] + i * f[11] + f[15]),
                (geometryData.vertexPositionData[e] = c.x),
                (geometryData.vertexPositionData[e + 1] = c.y),
                (geometryData.vertexPositionData[e + 2] = c.z),
                c.setTo(
                    geometryData.vertexNormalData[e],
                    geometryData.vertexNormalData[e + 1],
                    geometryData.vertexNormalData[e + 2]
                );
            var j = d.rawData,
                k = c.x,
                l = c.y,
                m = c.z;
            c.setTo(
                k * j[0] + l * j[4] + m * j[8] + j[12],
                k * j[1] + l * j[5] + m * j[9] + j[13],
                k * j[2] + l * j[6] + m * j[10] + j[14]
            ),
                (c.w = k * j[3] + l * j[7] + m * j[11] + j[15]),
                c.normalize(),
                (geometryData.vertexNormalData[e] = c.x),
                (geometryData.vertexNormalData[e + 1] = c.y),
                (geometryData.vertexNormalData[e + 2] = c.z),
                (e += 3);
        }
    }
}
class RingGapMaker {
    __class__ = RingGapMaker;
    static __name__ = ["RingGapMaker"];
    constructor() {
        this.gapMaker = new GapMaker();
    }

    gapMaker = null;
    buildGapGeoDatas(gapWrappers, b) {
        null == b && (b = true);
        var k = 0;
        var geoDatas = new Array(0);
        for (var id = 0; id < gapWrappers.length; id++) {
            var gapWrapper = gapWrappers[id];
            if (0 != gapWrapper.segmentGeoDatasBackup.length) {
                var ringGapWrapper = this.gapMaker.makeRingGapWrapper(gapWrapper);
                for (var i = 0; i < ringGapWrapper.simpleMeshDataArray.length; i++) {
                    var simpleMeshData1 = ringGapWrapper.simpleMeshDataArray[i];
                    SimpleGeometryDataUtil.setVertexTangents(simpleMeshData1.geometryData);
                    simpleMeshData1.addMetaData(SurfaceMeta.SURFACE_ID, gapWrapper.gapSurfaceUID);
                    simpleMeshData1.addMetaData(GapMeta.GAP_UID, gapWrapper.gapSimpleMeshData.getMetadata(GapMeta.GAP_UID));
                    geoDatas[k++] = simpleMeshData1;
                }
                for (i = 0; i < ringGapWrapper.simpleMeshDataArray2.length; i++) {
                    var simpleMeshData2 = ringGapWrapper.simpleMeshDataArray2[i];
                    SimpleGeometryDataUtil.setVertexTangents(simpleMeshData2.geometryData);
                    simpleMeshData2.addMetaData(SurfaceMeta.SURFACE_ID, gapWrapper.gapSurfaceUID);
                    geoDatas[k++] = simpleMeshData2;
                }
                var l = gapWrapper.segmentGeoDatasBackup;
                ArrayTool.clear(l);
            }
        }
        return geoDatas;
    }
}
class GapBuilder {
    constructor() { }

    static makeGaps(configs, shape, radius) {
        if (null == configs || 0 == configs.length) return null;
        for (var len = configs.length, gapArray = new Array(len), id = 0; id < configs.length;) {
            var conf = configs[id],
                h = GrooveEdge.getInstance(conf.middleShape),
                gapParam = new GapParam();
            (gapParam.xf = h),
                (gapParam.diaWidth = conf.width),
                (gapParam.diaHeight = conf.height),
                (gapParam.depth = conf.depth),
                (gapParam.c5 = conf.offsetY),
                (gapParam.NE = conf.edges),
                (gapParam.Ni = conf.shiftAngleOnSurface),
                (gapArray[id] = GapBuilder.makeGap(conf.type, id, gapParam, shape, radius)),
                ++id;
        }
        return gapArray;
    }
    static makeGap(type, b, gapParam, shape, radius) {
        var gapMaker;
        if (type == GapConfigTypeEnum.SIMPLE) gapMaker = new SimpleGapMaker(gapParam, shape, radius);
        else if (type == GapConfigTypeEnum.SIMPLE2) gapMaker = new Simple2GapMaker(gapParam, shape, radius);
        else if (type == GapConfigTypeEnum.TYPE1) gapMaker = new Type1GapMaker(gapParam, shape, radius);
        else if (type == GapConfigTypeEnum.TYPE2) gapMaker = new Type2GapMaker(gapParam, shape, radius);
        else if (type == GapConfigTypeEnum.DIAGONAL_DIAMOND_CHANNEL)
            gapMaker = new ChannelGapMaker(gapParam, shape, radius);
        else if (type == GapConfigTypeEnum.CROSS_GROOVE_V) gapMaker = new CrossVGapMaker(gapParam, shape, radius);
        else if (type == GapConfigTypeEnum.CROSS_GROOVE_RECT) gapMaker = new CrossRectGapMaker(gapParam, shape, radius);
        else {
            if (type != GapConfigTypeEnum.CROSS_GROOVE_U)
                throw new Error("Invalid gap type: " + type.get_value());
            gapMaker = new CrossUGapMaker(gapParam, shape, radius);
        }
        var metaDataMap = new MetaDataMap();
        metaDataMap.addMetaData(GapMeta.GAP_TYPE, type);
        gapMaker.setMetaDataMap(metaDataMap);
        return gapMaker.makeGapInfo();
    }
}

export {
    GapCreator, RingGapMaker, GapBuilder
}