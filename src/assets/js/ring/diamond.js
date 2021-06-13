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
    MySimpleGeometryData, SimpleMeshData,
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
import { GapCreator } from "./gap.js"
import { GeoPointEx, GeoExFace } from "./geometryEx.js"

class DiaGapMaker1 {
    constructor() { }
    makeDiaGapWrapper(diamondWrapper, radius) {
        var diaGapWrapper = new DiaGapWrapper();
        (diaGapWrapper.simpleMeshDataArray = new Array(0)), (diaGapWrapper.simpleMeshDataArray2 = new Array(0));
        var d = diamondWrapper.carvingGeometry.clone();
        this.transformGeometryData(d, diamondWrapper.transformation);
        var e;
        if (DiamondPlacementType.LEFT_SIDE == diamondWrapper.orientation)
            e = new Vector3D(1, 0, 0);
        else if (DiamondPlacementType.RIGHT_SIDE == diamondWrapper.orientation)
            e = new Vector3D(-1, 0, 0);
        else {
            var f = new Vector3D(0, 0, 1),
                g = new Vector3D((diamondWrapper.diamondConfig.shiftAngleOnSurface / (radius * MathConsts.TAU)) * 360 + 90, 0, 0);
            if (0 != g.x || 0 != g.y || 0 != g.z) {
                var h,
                    i,
                    j = Math.PI / 180,
                    k = g.x * j,
                    l = g.y * j,
                    m = g.z * j,
                    n = Math.sin(k),
                    o = Math.cos(k),
                    p = Math.sin(l),
                    q = Math.cos(l),
                    r = Math.sin(m),
                    s = Math.cos(m),
                    t = f.x,
                    u = f.y,
                    v = f.z;
                (i = u),
                    (u = i * o + v * -n),
                    (v = i * n + v * o),
                    (h = t),
                    (t = h * q + v * p),
                    (v = h * -p + v * q),
                    (h = t),
                    (t = h * s + u * -r),
                    (u = h * r + u * s),
                    (f.x = t),
                    (f.y = u),
                    (f.z = v);
            }
            e = f;
        }
        var w = new SimpleGeometryMergeHandler();
        var segmentGeoDatasBackup = diamondWrapper.segmentGeoDatasBackup;
        for (var x = 0; x < segmentGeoDatasBackup.length; x++) {
            var z = segmentGeoDatasBackup[x];
            w.addGeometry(z.geometryData);
        }
        var A = w.merge();
        w.clean();

        var B = GapCreator.createGapCreatorFromGeoData(A).fh(GapCreator.createGapCreatorFromGeoData(d), null, true);
        for (var D = 0; diamondWrapper.segmentGeoDatasBackup.length > D; D++) {
            var E = diamondWrapper.segmentGeoDatasBackup[D];
            if (null != E) {
                var F = this.displace(ObjMan.__cast(E.geometryData, MySimpleGeometryData), e),
                    G = null,
                    H = null;
                if (0 != F.length) {
                    var I = GapCreator.createGapCreatorFromGeofaceArray(F);
                    G = B[0].splitFaces(I);
                    H = B[1].splitFaces(I);
                }
                else {
                    G = B[0];
                    H = B[1];
                }
                if (G.gapFaceArray.length > 0) {
                    var J = new SimpleMeshData();
                    J.geometryData = G.makeGeometryData();
                    E.copyMetaDatasTo(J);
                    diaGapWrapper.simpleMeshDataArray2.push(J);
                    G.invalidateAllGeoExPoints();
                }
                if (H.gapFaceArray.length > 0) {
                    var K = new SimpleMeshData();
                    K.geometryData = H.makeGeometryData();
                    E.copyMetaDatasTo(K);
                    K.addMetaData(DiamondMeta.DIAMOND_PART, DiamondMetaValue.DIAMOND_PART_HOLE);
                    diaGapWrapper.simpleMeshDataArray.push(K);
                    H.invalidateAllGeoExPoints();
                }
            }
        }
        return diaGapWrapper;
    }
    displace(mySimpleGeometryData, geoPos) {
        var geoExFaceArray = new Array(0),
            x0 = geoPos.x,
            y0 = geoPos.y,
            z0 = geoPos.z;
        var indexArray = new Array(4);
        var indicesCount = mySimpleGeometryData.indices.length;

        for (var i = 0; indicesCount > i;) {
            var index0 = mySimpleGeometryData.indices[i],
                index1 = mySimpleGeometryData.indices[i + 1],
                index2 = mySimpleGeometryData.indices[i + 2];
            indexArray[0] = index0;
            indexArray[1] = index1;
            indexArray[2] = index2;
            indexArray[3] = index0;
            for (var m = 0; 3 > m;) {
                var n = 0 | mySimpleGeometryData.borderMap.h[indexArray[m]],
                    o = 0 | mySimpleGeometryData.borderMap.h[indexArray[m + 1]];
                if (0 != n && 0 != o)
                    if (n == o || BorderIndexMath.isEquivalent(n, o)) {
                        var curIndex = 3 * indexArray[m],
                            nextIndex = 3 * indexArray[m + 1],
                            x1 = mySimpleGeometryData.vertexPositionData[curIndex],
                            y1 = mySimpleGeometryData.vertexPositionData[curIndex + 1],
                            z1 = mySimpleGeometryData.vertexPositionData[curIndex + 2],
                            x2 = mySimpleGeometryData.vertexPositionData[nextIndex],
                            y2 = mySimpleGeometryData.vertexPositionData[nextIndex + 1],
                            z2 = mySimpleGeometryData.vertexPositionData[nextIndex + 2],
                            geoExPoint0 = new GeoPointEx;
                        geoExPoint0.initParam(x1 - x0, y1 - y0, z1 - z0);
                        var geoExPoint1 = new GeoPointEx;
                        geoExPoint1.initParam(x2, y2, z2);
                        var geoExPoint2 = new GeoPointEx;
                        geoExPoint2.initParam(x1, y1, z1);
                        var B = geoExPoint1.posX - geoExPoint2.posX,
                            C = geoExPoint1.posY - geoExPoint2.posY,
                            D = geoExPoint1.posZ - geoExPoint2.posZ;
                        if (Math.sqrt(B * B + C * C + D * D) < 0.05) ++m;
                        else {
                            var newGeoExFace = new GeoExFace;
                            newGeoExFace.geoExPointArray = new Array(0);
                            newGeoExFace.geoExPointArray[0] = geoExPoint0;
                            newGeoExFace.geoExPointArray[1] = geoExPoint1;
                            newGeoExFace.geoExPointArray[2] = geoExPoint2;
                            var F = false;
                            for (var G = 0; G < geoExFaceArray.length;) {
                                if (geoExFaceArray[G].get_plane().isEqual(newGeoExFace.get_plane())) {
                                    F = true;
                                    break;
                                }
                                ++G;
                            }
                            F || geoExFaceArray.push(newGeoExFace);
                            ++m;
                        }
                    } else ++m;
                else ++m;
            }
            i += 3;
        }
        return geoExFaceArray;
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
class DiaGapMaker2 {
    constructor() { }

    makeDiaGapWrapper(diamondWrapper, radius) {
        var diaGapWrapper = new DiaGapWrapper();
        (diaGapWrapper.simpleMeshDataArray = new Array(0)), (diaGapWrapper.simpleMeshDataArray2 = new Array(0));
        var d = diamondWrapper.carvingGeometry.clone();
        this.transformGeometryData(d, diamondWrapper.transformation);
        var e;
        if (DiamondPlacementType.LEFT_SIDE == diamondWrapper.orientation) e = new Vector3D(1, 0, 0);
        else if (DiamondPlacementType.RIGHT_SIDE == diamondWrapper.orientation) e = new Vector3D(-1, 0, 0);
        else {
            var f = new Vector3D(0, 0, 1),
                g = new Vector3D((diamondWrapper.diamondConfig.shiftAngleOnSurface / (radius * MathConsts.TAU)) * 360 + 90, 0, 0);
            if (0 != g.x || 0 != g.y || 0 != g.z) {
                var h,
                    i,
                    j = Math.PI / 180,
                    k = g.x * j,
                    l = g.y * j,
                    m = g.z * j,
                    n = Math.sin(k),
                    o = Math.cos(k),
                    p = Math.sin(l),
                    q = Math.cos(l),
                    r = Math.sin(m),
                    s = Math.cos(m),
                    t = f.x,
                    u = f.y,
                    v = f.z;
                (i = u),
                    (u = i * o + v * -n),
                    (v = i * n + v * o),
                    (h = t),
                    (t = h * q + v * p),
                    (v = h * -p + v * q),
                    (h = t),
                    (t = h * s + u * -r),
                    (u = h * r + u * s),
                    (f.x = t),
                    (f.y = u),
                    (f.z = v);
            }
            e = f;
        }
        for (
            var w = new SimpleGeometryMergeHandler(), x = 0, y = diamondWrapper.segmentGeoDatasBackup;
            x < y.length;

        ) {
            var z = y[x];
            ++x, w.addGeometry(z.geometryData);
        }
        var A = w.merge();
        w.clean();
        var B = GapCreator.createGapCreatorFromGeoData(A).fh(GapCreator.createGapCreatorFromGeoData(d), null, true),
            C = new SimpleMeshData();
        C.geometryData = B[0].makeGeometryData();
        for (var D = 0, E = diamondWrapper.segmentGeoDatasBackup; D < E.length;) {
            var F = E[D];
            ++D, F.copyMetaDatasTo(C);
        }
        diaGapWrapper.simpleMeshDataArray2.push(C);
        var G = new SimpleMeshData();
        G.geometryData = B[1].makeGeometryData();
        for (var H = 0, I = diamondWrapper.segmentGeoDatasBackup; H < I.length;) {
            var J = I[H];
            ++H, J.copyMetaDatasTo(G);
        }
        G.addMetaData(DiamondMeta.DIAMOND_PART, DiamondMetaValue.DIAMOND_PART_HOLE);
        diaGapWrapper.simpleMeshDataArray.push(G);
        return diaGapWrapper;
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
class DiamondGapMaker {
    constructor() {
        this.diaGapMaker1 = new DiaGapMaker1();
        this.diaGapMaker2 = new DiaGapMaker2();
    }

    diaGapMaker1 = null;
    diaGapMaker2 = null;

    buildHoleGeoDatas(diamondArray, radius, c) {
        null == c && (c = true);
        var count = 0;
        var simpleMeshDataArray = new Array(0);
        for (var g = 0; g < diamondArray.length; g++) {
            var diamond = diamondArray[g];
            if (0 != diamond.segmentGeoDatasBackup.length) {
                var diaGapWrapper = null;
                switch (diamond.carvingType) {
                    case DiamondSurfaceType.MEMOIRE1:
                    case "memoire2":
                    case "memoire3":
                    case "memoire4":
                        diaGapWrapper = this.diaGapMaker2.makeDiaGapWrapper(diamond, radius);
                        break;
                    default:
                        diaGapWrapper = this.diaGapMaker1.makeDiaGapWrapper(diamond, radius);
                }
                for (var j = 0; j < diaGapWrapper.simpleMeshDataArray.length; j++) {
                    var simpleMeshData = diaGapWrapper.simpleMeshDataArray[j];
                    SimpleGeometryDataUtil.setVertexTangents(simpleMeshData.geometryData);
                    simpleMeshDataArray[count++] = simpleMeshData;
                }
                for (j = 0; j < diaGapWrapper.simpleMeshDataArray2.length; j++) {
                    var simpleMeshData = diaGapWrapper.simpleMeshDataArray2[j];
                    SimpleGeometryDataUtil.setVertexTangents(simpleMeshData.geometryData);
                    simpleMeshDataArray[count++] = simpleMeshData;
                }
                var m = diamond.segmentGeoDatasBackup;
                ArrayTool.clear(m);
            }
        }
        return simpleMeshDataArray;
    }
}
class DiamondSepar {
    constructor() { }
    static getDiamondSeparPolygon(diamondConfig, carvingType, c, orientation, ringRadius) {
        var separPolygon,
            depthMargin = 0;
        DiamondSurfaceType.SECTION == carvingType || DiamondSurfaceType.SECTION_INSET == carvingType || DiamondSurfaceType.SECTION_SHARED == carvingType
            ? (depthMargin -= 0.08 * Math.min(diamondConfig.diaWidth, diamondConfig.diaHeight))
            : DiamondSurfaceType.CHANNEL == carvingType && DiamondPlacementType.HORIZONTAL == orientation &&
            (depthMargin -= 0.12 * Math.min(diamondConfig.diaWidth, diamondConfig.diaHeight));

        switch (orientation) {
            case DiamondPlacementType.LEFT_SIDE:
                depthMargin += (ringRadius / (ringRadius - diamondConfig.diaOffset)) * diamondConfig.installWidth - diamondConfig.installWidth;
                separPolygon = DiaLeftSeparator.getDiaSeparPolygon(diamondConfig, depthMargin);
                break;
            case DiamondPlacementType.RIGHT_SIDE:
                depthMargin += (ringRadius / (ringRadius - diamondConfig.diaOffset)) * diamondConfig.installWidth - diamondConfig.installWidth;
                separPolygon = DiaRightSeparator.getDiaSeparPolygon(diamondConfig, depthMargin);
                break;
            case DiamondPlacementType.HORIZONTAL:
            case DiamondPlacementType.VERTICAL:
                if (DiamondGrooveType.RECTANGLE == diamondConfig.stoneType || DiamondGrooveType.CUSTOM == diamondConfig.stoneType)
                    separPolygon = DiaHVSeparator.getDiaSeparPolygon(diamondConfig, depthMargin, depthMargin);
                else {
                    if (DiamondGrooveType.ROUND != diamondConfig.stoneType)
                        throw new Error("Undefined type of diamond stone: " + diamondConfig.stoneType);
                    DiamondSurfaceType.MEMOIRE1 == carvingType
                        ? ((depthMargin = 0.24521072797 * diamondConfig.diaHeight), (separPolygon = DiaHVSeparator.getDiaSeparPolygon(diamondConfig, 10, depthMargin)))
                        : (separPolygon =
                            "memoire2" == carvingType
                                ? DiaHVSeparator.getDiaSeparPolygon(diamondConfig, 10, 0)
                                : "memoire3" == carvingType
                                    ? DiaHVSeparator.getDiaSeparPolygon(diamondConfig, 10, 0)
                                    : "memoire4" == carvingType
                                        ? DiaHVSeparator.getDiaSeparPolygon(diamondConfig, 10, 0)
                                        : DiaCommonSeparator.getDiaSeparPolygon(diamondConfig, depthMargin));
                }
                separPolygon.rotate3D(diamondConfig.zRotationAngle * 360, Z_AXIS); //kkk todo todo
                break;
            default:
                throw new Error("Invalid diamond orientation: " + orientation);
        }
        return separPolygon;
    }
}
class DiaLeftSeparator {
    constructor() { }

    static getDiaSeparPolygon(a, b) {
        var c = a.rightPos.get_posX();
        c = -100;
        var d = a.shiftAngleOnSurface - a.installWidth / 2 - b / 2,
            e = Math.max(a.leftPos.get_posX(), a.rightPos.get_posX()),
            f = a.shiftAngleOnSurface + a.installWidth / 2 + b / 2;
        DiaLeftSeparator.TOLERANCE > e && (e += DiaLeftSeparator.TOLERANCE);
        var g = new PointEx;
        g.setTo(c, d);
        var h = new PointEx;
        h.setTo(c, f);
        var i = new PointEx;
        i.setTo(e, f);
        var j = new PointEx;
        j.setTo(e, d);
        var k = new Array(0);
        k[0] = g;
        k[1] = h;
        k[2] = i;
        k[3] = j;
        var l = new FacePolygon;
        l.setTo(k);
        return l;
    }
}
DiaLeftSeparator.TOLERANCE = .01;
class DiaHVSeparator {
    static getDiaSeparPolygon(diamondConfig, wOffset, hOffset) {
        var x0 = diamondConfig.diaOffset - diamondConfig.diaWidth / 2 - DiaHVSeparator.tolerance - wOffset / 2,
            y0 = diamondConfig.shiftAngleOnSurface - diamondConfig.diaHeight / 2 - DiaHVSeparator.tolerance - hOffset / 2,
            x1 = diamondConfig.diaOffset + diamondConfig.diaWidth / 2 + DiaHVSeparator.tolerance + wOffset / 2,
            y1 = diamondConfig.shiftAngleOnSurface + diamondConfig.diaHeight / 2 + DiaHVSeparator.tolerance + hOffset / 2;

        var h = new PointEx;
        h.setTo(x0, y0);
        var i = new PointEx;
        i.setTo(x0, y1);
        var j = new PointEx;
        j.setTo(x1, y1);
        var k = new PointEx;
        k.setTo(x1, y0);

        var ptArray = new Array(0);
        (ptArray[0] = h), (ptArray[1] = i), (ptArray[2] = j), (ptArray[3] = k);
        var facePolygon = new FacePolygon;
        facePolygon.setTo(ptArray);
        facePolygon.rotate2D(diamondConfig.diaOffset, diamondConfig.shiftAngleOnSurface, diamondConfig.rotationAngle);
        return facePolygon;
    }
}
DiaHVSeparator.tolerance = .05;
class DiaRightSeparator {
    static getDiaSeparPolygon(a, b) {
        var c = Math.min(a.leftPos.get_posX(), a.rightPos.get_posX()) - DiaRightSeparator.TOLERANCE,
            d = a.shiftAngleOnSurface - a.installWidth / 2 - b / 2,
            e = 1e3,
            f = a.shiftAngleOnSurface + a.installWidth / 2 + b / 2,
            g = new PointEx;
        g.setTo(c, d);
        var h = new PointEx;
        h.setTo(c, f);
        var i = new PointEx;
        i.setTo(e, f);
        var j = new PointEx;
        j.setTo(e, d);
        var k = new Array(0);
        k[0] = g;
        k[1] = h;
        k[2] = i;
        k[3] = j;
        var l = new FacePolygon;
        l.setTo(k);
        return l;
    }
}
DiaRightSeparator.TOLERANCE = .01;
class DiaCommonSeparator {
    static getDiaSeparPolygon(diamondConfig, offset) {
        var d = (diamondConfig.diaHeight / 2 + DiaCommonSeparator.tolerance + offset) / DiaCommonSeparator.zB,
            e = diamondConfig.diaOffset,
            f = diamondConfig.shiftAngleOnSurface,
            g = DiaCommonSeparator.zC,
            ptArray = new Array(DiaCommonSeparator.NUM_OF_POLY_SIDES),
            i = MathConsts.TAU / DiaCommonSeparator.NUM_OF_POLY_SIDES;

        for (var j = 0; 12 > j; j++) {
            var k = i * j + g,
                x = Math.cos(k) * d + e,
                y = Math.sin(k) * d + f,
                pt = new PointEx;
            pt.setTo(x, y);
            ptArray[j] = pt;
        }
        var facePolygon = new FacePolygon(ptArray);
        facePolygon.set_winding(1);
        facePolygon.rotate2D(diamondConfig.diaOffset, diamondConfig.shiftAngleOnSurface, diamondConfig.rotationAngle);
        return facePolygon;
    }
}
DiaCommonSeparator.NUM_OF_POLY_SIDES = 12;
DiaCommonSeparator.tolerance = .03;
DiaCommonSeparator.zB = Math.cos(Math.PI / 12);
DiaCommonSeparator.zC = Math.PI / 12;
class DiaCutWrapper {
    simpleMeshData = null;
    segmentGeoDatasBackup = null;
    orientation = null;
    constructor() { }
}
class DiamondWrapper {
    constructor() { }

    orientation = null;
    transformation = null;
    diamondConfig = null;
    simpleMeshData = null;
    carvingGeometry = null;
    segmentGeoDatasBackup = null;
    carvingType = null;
}
class DiaGapWrapper {
    constructor() { }
    simpleMeshDataArray2 = null;
    simpleMeshDataArray = null;
}
class DiaSectionCutWrapper {
    constructor() { }
    simpleMeshData = null;
    sectionSimpleMeshData = null;
    sectionSimpleMeshData90 = null;
    sectionSimpleMeshData270 = null;
    sectionSimpleMeshData180 = null;
    sharedSimpleMeshData = null;
    sharedSimpleMeshData90 = null;
    sharedSimpleMeshData270 = null;
    sharedSimpleMeshData180 = null;
    orientation = null;
}
class Diamond {
    constructor(carvingType, grooveEdge, orientation, groupIndex, lowering, gap, linesGap, extraGrooveData, extraProngData) {
        this.addEnd = 0;
        this.addStart = 0;
        this.wZ = [new Point(), new Point(), new Point(), new Point()];
        this.carvingType = carvingType;
        this.grooveEdge = grooveEdge;
        this.orientation = orientation;
        this.groupIndex = groupIndex;
        this.lowering = lowering;
        this.gap = gap;
        this.linesGap = linesGap;
        this.diaColumnConfigArray = new Array(0);
        this.numOfCols = 1;
        this.minX = 0;
        this.minY = 0;
        this.maxX = 0;
        this.maxY = 0;
        this.midX = 0;
        this.midY = 0;
        this.extraGrooveData = extraGrooveData;
        this.extraProngData = extraProngData;
    }

    static xF(a, b, c, d) {
        var e, start, end;
        if (DiamondPlacementType.VERTICAL == a.get_orientation() || DiamondPlacementType.HORIZONTAL == a.get_orientation()) {
            e = b;
            start = a.get_minY() / b;
            end = a.get_maxY() / b;
        }
        else {
            if (DiamondPlacementType.LEFT_SIDE != a.get_orientation() && DiamondPlacementType.RIGHT_SIDE != a.get_orientation())
                throw new Error("Invalid diamond orientation: " + a.get_orientation());

            e = b - a.get_maxX() * MathConsts.TAU;
            start = a.get_minY() / b;
            end = a.get_maxY() / b;
        }
        GeoNumComparor.Equal(d - c, 1) ||
            (PosWrapper.isTopologyOK(start, end, c, d) ||
                (++start, ++end, PosWrapper.isTopologyOK(start, end, c, d) || ((start -= 2), (end -= 2))),
                (start = Math.max(start, c)),
                (end = Math.min(end, d)));

        var h = 1 - (end - start);
        if (GeoNumComparor.isNotGreater(h, a.get_gap() / e)) {
            start -= h / 2;
            end += h / 2;
        }
        return new PosWrapper(start, end);
    }

    wZ = null;
    diaColumnConfigArray = null;
    numOfStones = null;
    get_numOfStones() {
        return this.numOfStones;
    }
    grooveBottom = null;
    get_grooveBottom() {
        return this.grooveBottom;
    }
    orientation = null;
    get_orientation() {
        return this.orientation;
    }
    midY = null;
    get_midY() {
        return this.midY;
    }
    midX = null;
    get_midX() {
        return this.midX;
    }
    carvingType = null;
    get_carvingType() {
        return this.carvingType;
    }
    maxY = null;
    get_maxY() {
        return this.maxY;
    }
    maxX = null;
    get_maxX() {
        return this.maxX;
    }
    lowering = null;
    get_lowering() {
        return this.lowering;
    }
    groupIndex = null;
    get_groupIndex() {
        return this.groupIndex;
    }
    minY = null;
    get_minY() {
        return this.minY;
    }
    numOfCols = null;
    get_numOfCols() {
        return this.numOfCols;
    }
    set_numOfCols(a) {
        return this.numOfCols == a ? this.numOfCols : ((this.numOfCols = a), this.numOfCols);
    }
    minX = null;
    get_minX() {
        return this.minX;
    }
    gap = null;
    get_gap() {
        return this.gap;
    }
    cutPolys = null;
    get_cutPolys() {
        return this.cutPolys;
    }
    set_cutPolys(a) {
        return this.cutPolys == a ? this.cutPolys : ((this.cutPolys = a), this.cutPolys);
    }
    linesGap = null;
    get_linesGap() {
        return this.linesGap;
    }
    grooveEdge = null;
    get_GrooveEdge() {
        return this.grooveEdge;
    }
    extraGrooveData = null;
    get_extraGrooveData() {
        return this.extraGrooveData;
    }
    extraProngData = null;
    get_extraProngData() {
        return this.extraProngData;
    }
    addStart = null;
    get_addStart() {
        return this.addStart;
    }
    set_addStart(a) {
        return this.addStart == a ? this.addStart : ((this.addStart = a), this.addStart);
    }
    addEnd = null;
    get_addEnd() {
        return this.addEnd;
    }
    set_addEnd(a) {
        return this.addEnd == a ? this.addEnd : ((this.addEnd = a), this.addEnd);
    }
    addDiamondConfig(colConfig) {
        this.diaColumnConfigArray[this.numOfStones++] = colConfig;
    }
    removeDiamondConfig(index) {
        this.numOfStones--;
        var diaConfig = this.diaColumnConfigArray[index];
        this.diaColumnConfigArray.splice(index, 1);
        return diaConfig;
    }
    getDiamondConfig(index) {
        return this.diaColumnConfigArray[index];
    }
    xs() {
        var diaConfig = this.diaColumnConfigArray[0],
            x1 = diaConfig.leftPos.get_posX(),
            y1 = diaConfig.shiftAngleOnSurface - diaConfig.diaHeight / 2,
            x2 = diaConfig.rightPos.get_posX(),
            y2 = y1 + diaConfig.diaHeight;
        return DiamondGrooveType.ROUND != diaConfig.stoneType ||
            ((DiamondSurfaceType.SECTION == this.get_carvingType() ||
                DiamondSurfaceType.SECTION_INSET == this.get_carvingType() ||
                DiamondSurfaceType.SECTION_SHARED == this.get_carvingType()) &&
                0 != diaConfig.rotationAngle)
            ? (this.wZ[0].setTo(x1, y1),
                this.wZ[1].setTo(x2, y1),
                this.wZ[2].setTo(x2, y2),
                this.wZ[3].setTo(x1, y2),
                this.xt(diaConfig.diaOffset, diaConfig.shiftAngleOnSurface, diaConfig.rotationAngle),
                this.wZ.sort((a, b) => { this.comparePointY(a, b) }),
                this.wZ[1].y - this.wZ[0].y)
            : 0;
    }
    xv() {
        var diaConfig = this.diaColumnConfigArray[this.get_numOfStones() - 1],
            x1 = diaConfig.leftPos.get_posX(),
            y1 = diaConfig.shiftAngleOnSurface - diaConfig.diaHeight / 2,
            x2 = diaConfig.rightPos.get_posX(),
            y2 = y1 + diaConfig.diaHeight;
        return DiamondGrooveType.ROUND != diaConfig.stoneType ||
            ((DiamondMetaValue.DIAMOND_PART_SECTION == this.get_carvingType() ||
                "sectionInset" == this.get_carvingType()) &&
                0 != diaConfig.rotationAngle)
            ? (this.wZ[0].setTo(x1, y1),
                this.wZ[1].setTo(x2, y1),
                this.wZ[2].setTo(x2, y2),
                this.wZ[3].setTo(x1, y2),
                this.xt(diaConfig.diaOffset, diaConfig.shiftAngleOnSurface, diaConfig.rotationAngle),
                this.wZ.sort((a, b) => { this.comparePointY(a, b) }),
                this.wZ[3].y - this.wZ[2].y)
            : 0;
    }
    regulate() {
        this.minX = Infinity;
        this.minY = Infinity;
        this.maxX = -Infinity;
        this.maxY = -Infinity;
        this.grooveBottom = -Infinity;
        for (var a = 0; a < this.numOfStones; a++) {
            var diaColumnConfig = this.diaColumnConfigArray[a],
                boundRect = null;
            null != this.cutPolys &&
                this.cutPolys.length > a &&
                null != this.cutPolys[a] &&
                (boundRect = this.cutPolys[a].get_polygon().get_boundingRect());
            var x1 = NaN,
                x2 = NaN;
            DiamondPlacementType.VERTICAL == this.get_orientation() ||
                DiamondPlacementType.HORIZONTAL == this.get_orientation()
                ? null != boundRect
                    ? ((x1 = boundRect.get_left()), (x2 = boundRect.get_right()))
                    : ((x1 = diaColumnConfig.leftPos.get_posX()), (x2 = diaColumnConfig.rightPos.get_posX()))
                : DiamondPlacementType.LEFT_SIDE == this.get_orientation()
                    ? ((x1 = diaColumnConfig.rightPos.get_posY()), (x2 = diaColumnConfig.leftPos.get_posY()))
                    : DiamondPlacementType.RIGHT_SIDE == this.get_orientation() &&
                    ((x1 = diaColumnConfig.leftPos.get_posY()), (x2 = diaColumnConfig.rightPos.get_posY()));
            var y1 = NaN,
                y2 = NaN;
            null == boundRect ||
                (DiamondSurfaceType.RUBBED != this.get_carvingType() &&
                    DiamondSurfaceType.RUBBED_EDGELESS != this.get_carvingType() &&
                    DiamondSurfaceType.MEMOIRE1 != this.get_carvingType() &&
                    "memoire2" != this.get_carvingType() &&
                    "memoire3" != this.get_carvingType() &&
                    "memoire4" != this.get_carvingType())
                ? ((y1 = diaColumnConfig.shiftAngleOnSurface - diaColumnConfig.installWidth / 2), (y2 = y1 + diaColumnConfig.installWidth))
                : ((y1 = boundRect.get_top()), (y2 = boundRect.get_bottom())),
                x1 < this.minX && (this.minX = x1),
                y1 < this.minY && (this.minY = y1),
                x2 > this.maxX && (this.maxX = x2),
                y2 > this.maxY && (this.maxY = y2);
            var h = 0;
            h =
                DiamondSurfaceType.CHANNEL == this.get_carvingType() &&
                    DiamondPlacementType.HORIZONTAL == this.get_orientation()
                    ? this.lowering + 0.4 * diaColumnConfig.depth
                    : (DiamondSurfaceType.SECTION_INSET != this.get_carvingType() &&
                        DiamondSurfaceType.SECTION_SHARED != this.get_carvingType()) ||
                        (DiamondPlacementType.HORIZONTAL != this.get_orientation() &&
                            DiamondPlacementType.VERTICAL != this.get_orientation())
                        ? diaColumnConfig.margin + diaColumnConfig.depth
                        : diaColumnConfig.margin + 0.25 * diaColumnConfig.depth;
            h > this.grooveBottom && (this.grooveBottom = h);
        }
        this.minY -= this.addStart;
        this.maxY += this.addEnd;
        this.midX = this.minX + (this.maxX - this.minX) / 2;
        this.midY = this.minY + (this.maxY - this.minY) / 2;
    }
    xA() {
        var a = NaN;
        if (
            DiamondPlacementType.HORIZONTAL != this.get_orientation() ||
            (DiamondMetaValue.DIAMOND_PART_SECTION != this.get_carvingType() &&
                "sectionInset" != this.get_carvingType())
        ) {
            var min = Infinity;
            var max = -Infinity;
            var d = (this.get_numOfStones() / this.get_numOfCols()) | 0;

            for (var e = 0; e < this.get_numOfCols(); e++) {
                var diaConf = this.getDiamondConfig(d * e);
                min = Math.min(diaConf.diaOffset - diaConf.installHeight / 2, min);
                max = Math.max(diaConf.diaOffset + diaConf.installHeight / 2, max);
            }
            a = max - min;
        }
        else a = this.get_maxX() - this.get_minX();
        return a;
    }
    xt(diaOffset, b, rotationAngle) {
        var sinVal = Math.sin(rotationAngle * MathConsts.TAU);
        var cosVal = Math.cos(rotationAngle * MathConsts.TAU);

        for (var f = 0; 4 > f; f++) {
            var g = this.wZ[f];
            g.setTo(
                diaOffset + (g.x - diaOffset) * cosVal + (g.y - b) * sinVal,
                b + (g.x - diaOffset) * sinVal + (g.y - b) * cosVal
            );
        }
    }
    comparePointY(pt1, pt2) {
        var y1 = pt1.y,
            y2 = pt2.y;
        return y2 > y1 ? -1 : y1 > y2 ? 1 : 0;
    }
}
class DiamondLocator {
    constructor() {
        this.engravingPosWrapper2 = new PosWrapper();
        this.engravingPosWrapper1 = new PosWrapper();
    }

    engravingPosWrapper1 = null;
    engravingPosWrapper2 = null;
    circumference = null;
    get_circumference() {
        return this.circumference;
    }
    set_circumference(a) {
        return this.circumference == a ? this.circumference : ((this.circumference = a), this.circumference);
    }
    segmentStart = null;
    get_segmentStart() {
        return this.segmentStart;
    }
    set_segmentStart(a) {
        return this.segmentStart == a ? this.segmentStart : ((this.segmentStart = a), this.segmentStart);
    }
    segmentEnd = null;
    get_segmentEnd() {
        return this.segmentEnd;
    }
    set_segmentEnd(a) {
        return this.segmentEnd == a ? this.segmentEnd : ((this.segmentEnd = a), this.segmentEnd);
    }
    calcDiamondPlacements(diamond) {
        var myMap = new MyMap(),
            stoneCount = diamond.get_numOfStones(),
            d = GeoNumComparor.Equal(this.get_segmentEnd() - this.get_segmentStart(), 1);
        this.engravingPosWrapper2.set_start(this.get_segmentStart()),
            this.engravingPosWrapper2.set_end(this.get_segmentEnd());
        for (var e = 0; stoneCount > e; e++) {
            var f,
                g,
                diaConf = diamond.getDiamondConfig(e),
                cutPoly = diamond.get_cutPolys()[e],
                diaPlacement = new DiamondPlacement(diaConf, cutPoly);
            DiamondSurfaceType.SECTION == diamond.get_carvingType() ||
                DiamondSurfaceType.SECTION_INSET == diamond.get_carvingType() ||
                DiamondSurfaceType.SECTION_SHARED == diamond.get_carvingType()
                ? ((f = (diaConf.shiftAngleOnSurface - diaConf.diaHeight / 2) / this.get_circumference()),
                    (g = (diaConf.shiftAngleOnSurface + diaConf.diaHeight / 2) / this.get_circumference()))
                : ((f = cutPoly.get_polygon().get_boundingRect().get_top() / this.get_circumference()),
                    (g = cutPoly.get_polygon().get_boundingRect().get_bottom() / this.get_circumference()));

            this.engravingPosWrapper1.set_start(f);
            this.engravingPosWrapper1.set_end(g);
            this.engravingPosWrapper2.set_start(this.get_segmentStart());
            this.engravingPosWrapper2.set_end(this.get_segmentEnd());
            if (!d) {
                if (!PosWrapper.checkTopology(f, g, this.get_segmentStart(), this.get_segmentEnd())) {
                    continue;
                }
                if (!this.engravingPosWrapper1.contains(this.engravingPosWrapper2)) {
                    this.engravingPosWrapper1.set_start(this.engravingPosWrapper1.get_start() + 1);
                    this.engravingPosWrapper1.set_end(this.engravingPosWrapper1.get_end() + 1);
                    if (!this.engravingPosWrapper1.contains(this.engravingPosWrapper2)) {
                        this.engravingPosWrapper1.set_start(this.engravingPosWrapper1.get_start() - 2);
                        this.engravingPosWrapper1.set_end(this.engravingPosWrapper1.get_end() - 2);
                    }
                }
                if (!this.engravingPosWrapper1.isContainedIn(this.engravingPosWrapper2)) {
                    var o = this.engravingPosWrapper1.getIntersection(this.engravingPosWrapper2);
                    diaPlacement.fromAngle = o.get_start();
                    diaPlacement.toAngle = o.get_end();
                }
            }
            diaPlacement.set_key();
            var key = diaPlacement.get_key();
            if (null != (null != globalMap[key] ? myMap.getReserved(key) : myMap.map[key])) {
                var key = diaPlacement.get_key();
                if (!(null != globalMap[key] ? myMap.getReserved(key) : myMap.map[key]).ws(diaPlacement))
                    throw new Error("Cannot merge Rubbed DiamondGroups!");
            }
            else {
                var key = diaPlacement.get_key();
                null != globalMap[key] ? myMap.setReserved(key, diaPlacement) : (myMap.map[key] = diaPlacement);
            }
        }
        var diaPlacementArray = new Array(0);
        var t = new KMap(myMap, myMap.arrayKeys());
        for (; t.hasNext();)
            diaPlacementArray.push(t.next());
        return diaPlacementArray;
    }
}
class DiamondPlacement {
    constructor(stoneData, cutPoly) {
        this.stoneData = stoneData;
        this.cutPoly = cutPoly;
        this.translateYs = new Array(0);
        this.fromAngle = NaN;
        this.toAngle = NaN;
    }

    fromAngle = null;
    toAngle = null;
    stoneData = null;
    get_stoneData() {
        return this.stoneData;
    }
    translateYs = null;
    get_translateYs() {
        return this.translateYs;
    }
    cutPoly = null;
    get_cutPoly() {
        return this.cutPoly;
    }
    key = null;
    get_key() {
        return this.key;
    }
    ws(a) {
        var b = a.get_stoneData().shiftAngleOnSurface - this.get_stoneData().shiftAngleOnSurface;
        return this.key == a.get_key() && GeoNumComparor.isNotLess(Math.abs(b), a.get_stoneData().installWidth)
            ? (this.translateYs.push(b), true)
            : false;
    }
    set_key() {
        this.key = this.calcKey();
    }
    calcKey() {
        var key = "";
        var prc = DiamondPlacement.GROUP_PLACEMENT_PRECISION;
        var sep = DiamondPlacement.separator;
        (key = "" + (StrNumReader.readNumber(this.stoneData.diaOffset, prc) + sep)),
            (key += StrNumReader.readNumber(this.stoneData.diaWidth, prc) + sep),
            (key += StrNumReader.readNumber(this.stoneData.diaHeight, prc) + sep),
            (key += this.stoneData.stoneType + sep),
            (key += StrNumReader.readNumber(this.stoneData.rotationAngle, prc) + sep);

        !isNaN(this.fromAngle) && (key += StrNumReader.readNumber(this.fromAngle, prc) + sep);
        !isNaN(this.toAngle) && (key += StrNumReader.readNumber(this.toAngle, prc) + sep);
        return key;
    }
}
DiamondPlacement.GROUP_PLACEMENT_PRECISION = 4;
DiamondPlacement.separator = ";";
class DiamondTransformBuilder {
    constructor() { }
    calcDiamondTransform(orientation, diaConf, width, depth, ringRadius, bZ_Rotation) {
        null == bZ_Rotation && (bZ_Rotation = true);
        var g,
            h,
            i = (diaConf.shiftAngleOnSurface / (ringRadius * MathConsts.TAU)) * 360,
            scale = diaConf.diaWidth / width;
        DiamondPlacementType.LEFT_SIDE == orientation
            ? ((g = ringRadius - diaConf.diaOffset), (h = diaConf.margin + diaConf.diaPos.get_posX()))
            : DiamondPlacementType.RIGHT_SIDE == orientation
                ? ((g = ringRadius - diaConf.diaOffset), (h = diaConf.diaPos.get_posX() - diaConf.margin))
                : ((g = ringRadius - diaConf.margin), (h = diaConf.diaOffset));

        var transform = new Matrix3D();
        transform.appendScale(scale, scale, diaConf.diaHeight / depth);
        transform.appendRotation(360 * diaConf.rotationAngle, Y_AXIS, new Vector3D(0, 0, 0)); //kkk todo todo
        if (bZ_Rotation)
            transform.appendRotation(360 * diaConf.zRotationAngle, Z_AXIS, new Vector3D(0, 0, 0));
        transform.appendTranslation(h, g, 0);
        transform.appendRotation(i, X_AXIS, new Vector3D(h, 0, 0));
        return transform;
    }
}
class DiamondBuilder {
    constructor() { }

    static makeDiaCommonCutWrapper(diamond, shapesWrapper, ringRadius, diaCutGeometry, diaCarvingGeometry) {
        var diaCount = diamond.get_numOfStones();
        diamond.set_cutPolys(new Array(diaCount));
        var diaWrapperArray = new Array(diaCount);
        for (var id = 0; id < diaCount; id++) {
            var diamondConfig = diamond.getDiamondConfig(id);
            var diaWrapper = new DiamondWrapper();
            diaWrapper.diamondConfig = diamondConfig;
            diaWrapper.segmentGeoDatasBackup = new Array(0);
            diaWrapper.carvingGeometry = diaCarvingGeometry;
            diaWrapper.simpleMeshData = new SimpleMeshData();
            diaWrapper.simpleMeshData.addMetaData(DiamondMeta.DIAMOND_PART, DiamondMetaValue.DIAMOND_PART_STONE);
            diaWrapper.simpleMeshData.addMetaData(DiamondMeta.DIAMOND_INDEX, id);
            diaWrapper.simpleMeshData.addMetaData(DiamondMeta.DIAMOND_GROUP_INDEX, diamond.get_groupIndex());
            diaWrapper.simpleMeshData.geometryData = diaCutGeometry;
            diaWrapper.carvingType = diamond.get_carvingType();
            var bound = new SimpleGeometryDataBounds(
                DiamondSurfaceType.MEMOIRE1 == diamond.get_carvingType() ||
                    DiamondSurfaceType.MEMOIRE2 == diamond.get_carvingType() ||
                    DiamondSurfaceType.MEMOIRE3 == diamond.get_carvingType() ||
                    DiamondSurfaceType.MEMOIRE4 == diamond.get_carvingType()
                    ? diaCutGeometry
                    : diaCarvingGeometry
            );
            //kkk todo todo
            diaWrapper.transformation = DiamondBuilder.diaTransformBuilder.calcDiamondTransform(diamond.get_orientation(), diamondConfig,
                bound.width * 1.0, bound.depth * 1.0, ringRadius);
            var cutPoly = DiamondBuilder.makeDiamondCutPoly(
                diamondConfig,//class DiamondConfig
                id,
                diamond.get_groupIndex(),
                diamond.get_carvingType(),
                diamond.get_orientation(),
                shapesWrapper,
                true,
                ringRadius
            );

            diamond.get_cutPolys()[id] = cutPoly; // kkk todo
            diaWrapper.orientation = diamond.get_orientation();
            diaWrapperArray[id] = diaWrapper;
            diamond.regulate();
            diaWrapper.simpleMeshData.transformation = diaWrapper.transformation;
        }
        return diaWrapperArray;
    }
    static makeDiaNullCutWrapper(diamond, b, c, d) {
        var e = diamond.get_numOfStones(), f = new Array(e);
        for (var g = 0; g < diamond.get_numOfStones(); g++) {
            var diaConf = diamond.getDiamondConfig(g),
                simpleMeshData = new SimpleMeshData();
            simpleMeshData.addMetaData(DiamondMeta.DIAMOND_PART, DiamondMetaValue.DIAMOND_PART_STONE),
                simpleMeshData.addMetaData(DiamondMeta.DIAMOND_INDEX, g),
                simpleMeshData.addMetaData(DiamondMeta.DIAMOND_GROUP_INDEX, diamond.get_groupIndex()),
                (simpleMeshData.geometryData = d);
            var bound = new SimpleGeometryDataBounds(d);
            simpleMeshData.transformation = DiamondBuilder.diaTransformBuilder.calcDiamondTransform(
                diamond.get_orientation(),
                diaConf,
                bound.width,
                bound.depth,
                c
            );
            f[g] = simpleMeshData;
        }
        return f;
    }
    static makeDiaSectionCutWrapper(diamond, shapesWrapper, ringRadius, diaCutGeometry, diaSectionGeometry, diaSharedGeometry) {
        if (DiamondPlacementType.VERTICAL == diamond.get_orientation()) {
            diamond.set_cutPolys(new Array(diamond.get_numOfStones()));
        }
        var stoneCount = diamond.get_numOfStones(),
            diaSectionCutWrapperArray = new Array(stoneCount),
            j = diamond.get_numOfStones() / diamond.get_numOfCols();

        for (var k = 0; k < stoneCount; k++) {
            var diaSectionCutWrapper = new DiaSectionCutWrapper(),
                diaConf = diamond.getDiamondConfig(k);
            diaSectionCutWrapper.simpleMeshData = new SimpleMeshData();
            diaSectionCutWrapper.simpleMeshData.geometryData = diaCutGeometry;
            diaSectionCutWrapper.simpleMeshData.addMetaData(DiamondMeta.DIAMOND_PART, DiamondMetaValue.DIAMOND_PART_STONE);
            diaSectionCutWrapper.simpleMeshData.addMetaData(DiamondMeta.DIAMOND_INDEX, k);
            diaSectionCutWrapper.simpleMeshData.addMetaData(DiamondMeta.DIAMOND_GROUP_INDEX, diamond.get_groupIndex());
            diaSectionCutWrapper.sectionSimpleMeshData = new SimpleMeshData();
            diaSectionCutWrapper.sectionSimpleMeshData.geometryData = diaSectionGeometry;
            diaSectionCutWrapper.sectionSimpleMeshData.addMetaData(DiamondMeta.DIAMOND_PART, DiamondMetaValue.DIAMOND_PART_SECTION);
            diaSectionCutWrapper.sectionSimpleMeshData.addMetaData(DiamondMeta.DIAMOND_INDEX, k);
            diaSectionCutWrapper.sectionSimpleMeshData.addMetaData(DiamondMeta.DIAMOND_GROUP_INDEX, diamond.get_groupIndex());
            diaSectionCutWrapper.sectionSimpleMeshData90 = new SimpleMeshData();
            diaSectionCutWrapper.sectionSimpleMeshData90.geometryData = diaSectionGeometry;
            diaSectionCutWrapper.sectionSimpleMeshData.copyMetaDatasTo(diaSectionCutWrapper.sectionSimpleMeshData90);
            diaSectionCutWrapper.sectionSimpleMeshData270 = new SimpleMeshData();
            diaSectionCutWrapper.sectionSimpleMeshData270.geometryData = diaSectionGeometry;
            diaSectionCutWrapper.sectionSimpleMeshData.copyMetaDatasTo(diaSectionCutWrapper.sectionSimpleMeshData270);
            diaSectionCutWrapper.sectionSimpleMeshData180 = new SimpleMeshData();
            diaSectionCutWrapper.sectionSimpleMeshData180.geometryData = diaSectionGeometry;
            diaSectionCutWrapper.sectionSimpleMeshData.copyMetaDatasTo(diaSectionCutWrapper.sectionSimpleMeshData180);

            var bound = new SimpleGeometryDataBounds(diaCutGeometry);
            var transform = DiamondBuilder.diaTransformBuilder.calcDiamondTransform(diamond.get_orientation(), diaConf, bound.width, bound.depth, ringRadius);

            diaSectionCutWrapper.simpleMeshData.transformation = transform;

            diaSectionCutWrapper.sectionSimpleMeshData.transformation = transform;

            diaSectionCutWrapper.sectionSimpleMeshData90.transformation = new Matrix3D();
            diaSectionCutWrapper.sectionSimpleMeshData90.transformation.appendRotation(90, Y_AXIS, new Vector3D(0, 0, 0));
            diaSectionCutWrapper.sectionSimpleMeshData90.transformation.append(transform);

            diaSectionCutWrapper.sectionSimpleMeshData180.transformation = new Matrix3D();
            diaSectionCutWrapper.sectionSimpleMeshData180.transformation.appendRotation(
                180, Y_AXIS, new Vector3D(0, 0, 0)
            );
            diaSectionCutWrapper.sectionSimpleMeshData180.transformation.append(transform);

            diaSectionCutWrapper.sectionSimpleMeshData270.transformation = new Matrix3D();
            diaSectionCutWrapper.sectionSimpleMeshData270.transformation.appendRotation(
                270, Y_AXIS, new Vector3D(0, 0, 0)
            );
            diaSectionCutWrapper.sectionSimpleMeshData270.transformation.append(transform);

            if (null != diaSharedGeometry) {
                var p = 0.75,
                    q = 1 + (diamond.get_gap() / 2) * (bound.width / diaConf.diaWidth);
                (diaSectionCutWrapper.sharedSimpleMeshData = new SimpleMeshData()),
                    (diaSectionCutWrapper.sharedSimpleMeshData.geometryData = diaSharedGeometry),
                    diaSectionCutWrapper.sectionSimpleMeshData.copyMetaDatasTo(diaSectionCutWrapper.sharedSimpleMeshData),
                    (diaSectionCutWrapper.sharedSimpleMeshData.transformation = new Matrix3D()),
                    diaSectionCutWrapper.sharedSimpleMeshData.transformation.appendTranslation(-p, 0, q),
                    diaSectionCutWrapper.sharedSimpleMeshData.transformation.append(transform),
                    (diaSectionCutWrapper.sharedSimpleMeshData90 = new SimpleMeshData()),
                    (diaSectionCutWrapper.sharedSimpleMeshData90.geometryData = diaSharedGeometry),
                    diaSectionCutWrapper.sectionSimpleMeshData90.copyMetaDatasTo(diaSectionCutWrapper.sharedSimpleMeshData90),
                    (diaSectionCutWrapper.sharedSimpleMeshData90.transformation = new Matrix3D()),
                    diaSectionCutWrapper.sharedSimpleMeshData90.transformation.appendRotation(
                        180, Y_AXIS, new Vector3D(0, 0, 0)
                    ),
                    diaSectionCutWrapper.sharedSimpleMeshData90.transformation.appendTranslation(p, 0, q),
                    diaSectionCutWrapper.sharedSimpleMeshData90.transformation.append(transform),
                    k % j == 0 &&
                    ((diaSectionCutWrapper.sharedSimpleMeshData270 = new SimpleMeshData()),
                        (diaSectionCutWrapper.sharedSimpleMeshData270.geometryData = diaSharedGeometry),
                        diaSectionCutWrapper.sectionSimpleMeshData270.copyMetaDatasTo(diaSectionCutWrapper.sharedSimpleMeshData270),
                        (diaSectionCutWrapper.sharedSimpleMeshData270.transformation = new Matrix3D()),
                        diaSectionCutWrapper.sharedSimpleMeshData270.transformation.appendTranslation(-p, 0, -q),
                        diaSectionCutWrapper.sharedSimpleMeshData270.transformation.append(transform),
                        (diaSectionCutWrapper.sharedSimpleMeshData180 = new SimpleMeshData()),
                        (diaSectionCutWrapper.sharedSimpleMeshData180.geometryData = diaSharedGeometry),
                        diaSectionCutWrapper.sectionSimpleMeshData180.copyMetaDatasTo(diaSectionCutWrapper.sharedSimpleMeshData180),
                        (diaSectionCutWrapper.sharedSimpleMeshData180.transformation = new Matrix3D()),
                        diaSectionCutWrapper.sharedSimpleMeshData180.transformation.appendRotation(
                            180, Y_AXIS, new Vector3D(0, 0, 0)
                        ),
                        diaSectionCutWrapper.sharedSimpleMeshData180.transformation.appendTranslation(p, 0, -q),
                        diaSectionCutWrapper.sharedSimpleMeshData180.transformation.append(transform));
            }

            diaSectionCutWrapper.orientation = diamond.get_orientation();
            if (DiamondPlacementType.VERTICAL == diamond.get_orientation()) {
                var cutPoly = DiamondBuilder.makeDiamondCutPoly(
                    diaConf,
                    k,
                    diamond.get_groupIndex(),
                    diamond.get_carvingType(),
                    diamond.get_orientation(),
                    shapesWrapper,
                    true,
                    ringRadius
                );
                diamond.get_cutPolys()[k] = cutPoly;
            }
            diaSectionCutWrapperArray[k] = diaSectionCutWrapper;
            diamond.regulate();
        }
        return diaSectionCutWrapperArray;
    }
    static makeDiaProngGeoMeshes(diamond, diaSectionGeometry, prongGeometry, ringRadius) {
        var simpleMeshArray = new Array(0),
            extraProngData = diamond.get_extraProngData(),
            diaConf = diamond.getDiamondConfig(0),
            X0 = -diaConf.diaWidth / 2 + extraProngData.sidePadding,
            X1 = diaConf.diaWidth / 2 - extraProngData.sidePadding,
            Y0 = diaConf.diaHeight / 2,
            Y1 = -diaConf.diaHeight / 2;

        if (extraProngData.shared) {
            Y0 += diamond.get_gap() / 2;
            Y1 -= diamond.get_gap() / 2;
        }

        var HScale = diaConf.diaWidth / new SimpleGeometryDataBounds(prongGeometry).width,
            geoData1 = DiamondProngBuilder.makeDiaProngGeoData(extraProngData, X0, Y0, diaSectionGeometry, prongGeometry, HScale),
            sharedGeoData = null;
        diamond.get_numOfStones() > 1 && extraProngData.shared &&
            (sharedGeoData = DiamondProngBuilder.makeDiaProngSharedGeoData(extraProngData, X0, Y0, diaSectionGeometry, prongGeometry, HScale, diamond.get_gap(), diamond.getDiamondConfig(1).shiftAngleOnSurface - diaConf.shiftAngleOnSurface));

        var lastStoneNum = diamond.get_numOfStones() - 1;
        var r = null;
        for (var p = 0; p < diamond.get_numOfStones(); p++) {
            var diaConf = diamond.getDiamondConfig(p),
                diaTransform = DiamondBuilder.diaTransformBuilder.calcDiamondTransform(diamond.get_orientation(), diaConf, diaConf.diaWidth, diaConf.diaHeight, ringRadius);
            if (!extraProngData.shared || 0 == p) {
                var u = new SimpleMeshData();
                (u.geometryData = geoData1),
                    (u.transformation = new Matrix3D()),
                    u.transformation.appendRotation(
                        extraProngData.rotateLeftBottom,
                        Y_AXIS,
                        new Vector3D(0, 0, 0)
                    ),
                    u.transformation.appendScale(extraProngData.size, extraProngData.size, extraProngData.size),
                    u.transformation.appendTranslation(X0, 0, Y1),
                    u.transformation.append(diaTransform);
                var v = new SimpleMeshData();
                (v.geometryData = geoData1),
                    (v.transformation = new Matrix3D()),
                    v.transformation.appendRotation(
                        extraProngData.rotateRightBottom,
                        Y_AXIS,
                        new Vector3D(0, 0, 0)
                    ),
                    v.transformation.appendScale(extraProngData.size, extraProngData.size, extraProngData.size),
                    v.transformation.appendTranslation(X1, 0, Y1),
                    v.transformation.append(diaTransform),
                    simpleMeshArray.push(u),
                    simpleMeshArray.push(v);
            }
            if (extraProngData.shared && null != r) {
                var w = new SimpleMeshData();
                (w.geometryData = sharedGeoData),
                    (w.transformation = new Matrix3D()),
                    w.transformation.appendRotation(
                        extraProngData.rotateLeft,
                        Y_AXIS,
                        new Vector3D(0, 0, 0)
                    ),
                    w.transformation.appendScale(extraProngData.size, extraProngData.size, extraProngData.size),
                    w.transformation.appendTranslation(X0, 0, Y1),
                    w.transformation.append(diaTransform);
                var x = new SimpleMeshData();
                (x.geometryData = sharedGeoData),
                    (x.transformation = new Matrix3D()),
                    x.transformation.appendRotation(
                        extraProngData.rotateRight,
                        Y_AXIS,
                        new Vector3D(0, 0, 0)
                    ),
                    x.transformation.appendScale(extraProngData.size, extraProngData.size, extraProngData.size),
                    x.transformation.appendTranslation(X1, 0, Y1),
                    x.transformation.append(diaTransform),
                    simpleMeshArray.push(w),
                    simpleMeshArray.push(x);
            }
            if (!extraProngData.shared || p == lastStoneNum) {
                var y = new SimpleMeshData();
                (y.geometryData = geoData1),
                    (y.transformation = new Matrix3D()),
                    y.transformation.appendRotation(
                        extraProngData.rotateLeftTop,
                        Y_AXIS,
                        new Vector3D(0, 0, 0)
                    ),
                    y.transformation.appendScale(extraProngData.size, extraProngData.size, extraProngData.size),
                    y.transformation.appendTranslation(X0, 0, Y0),
                    y.transformation.append(diaTransform);
                var z = new SimpleMeshData();
                (z.geometryData = geoData1),
                    (z.transformation = new Matrix3D()),
                    z.transformation.appendRotation(
                        extraProngData.rotateRightTop,
                        Y_AXIS,
                        new Vector3D(0, 0, 0)
                    ),
                    z.transformation.appendScale(extraProngData.size, extraProngData.size, extraProngData.size),
                    z.transformation.appendTranslation(X1, 0, Y0),
                    z.transformation.append(diaTransform),
                    simpleMeshArray.push(y),
                    simpleMeshArray.push(z);
            }
            r = diaConf;
        }
        diamond.set_addStart(extraProngData.addStartLength);
        diamond.set_addEnd(extraProngData.addEndLength);
        diamond.regulate();
        for (var A = 0; A < simpleMeshArray.length; A++) {
            var B = simpleMeshArray[A];
            B.addMetaData(DiamondMeta.DIAMOND_PART, DiamondMetaValue.DIAMOND_PART_SECTION);
            B.addMetaData(DiamondMeta.DIAMOND_GROUP_INDEX, diamond.get_groupIndex());
        }
        return simpleMeshArray;
    }
    static makeDiaChannelCutWrapper(diamond, shapesWrapper, ringRadius, diaCutGeometry) {
        //kkk todo todo
        if (DiamondPlacementType.HORIZONTAL == diamond.get_orientation()) {
            diamond.set_cutPolys(new Array(diamond.get_numOfStones()));
        }
        var stoneCount = diamond.get_numOfStones();
        var diaCutWrapperArray = new Array(stoneCount);
        for (var id = 0; id < stoneCount; id++) {
            var diaConf = diamond.getDiamondConfig(id);
            var diaCutWrapper = new DiaCutWrapper();
            diaCutWrapper.simpleMeshData = new SimpleMeshData();
            diaCutWrapper.simpleMeshData.geometryData = diaCutGeometry;
            diaCutWrapper.simpleMeshData.addMetaData(DiamondMeta.DIAMOND_PART, DiamondMetaValue.DIAMOND_PART_STONE);
            diaCutWrapper.simpleMeshData.addMetaData(DiamondMeta.DIAMOND_INDEX, id);
            diaCutWrapper.simpleMeshData.addMetaData(DiamondMeta.DIAMOND_GROUP_INDEX, diamond.get_groupIndex());
            var bound = new SimpleGeometryDataBounds(diaCutGeometry),
                transformation = DiamondBuilder.diaTransformBuilder.calcDiamondTransform(diamond.get_orientation(), diaConf, bound.width, bound.depth, ringRadius, true);
            diaCutWrapper.simpleMeshData.transformation = transformation;
            diaCutWrapper.orientation = diamond.get_orientation();

            if (DiamondPlacementType.HORIZONTAL == diamond.get_orientation()) {
                var cutPoly = new SeparatePolyData(
                    DiamondSepar.getDiamondSeparPolygon(diaConf, diamond.get_carvingType(), true, diamond.get_orientation(), ringRadius)
                );
                cutPoly.get_additionalMetas().addMetaData(DiamondMeta.DIAMOND_INDEX, id);
                cutPoly.get_additionalMetas()
                    .addMetaData(DiamondMeta.DIAMOND_GROUP_INDEX, diamond.get_groupIndex());
                cutPoly.get_separateFilterMetas()
                    .addMetaData(CutPolyMeta.CUT_FILTER_PART, CutPolyMetaValue.CUT_FILTER_PART_DIAMOND);
                diaCutWrapper.segmentGeoDatasBackup = new Array(0);
                diamond.get_cutPolys()[id] = cutPoly;
            }
            diaCutWrapperArray[id] = diaCutWrapper;
            diamond.regulate();
        }
        return diaCutWrapperArray;
    }
    static makeGroove(diamond, shape) {
        if (DiamondSurfaceType.CHANNEL == diamond.get_carvingType() ||
            DiamondSurfaceType.SECTION == diamond.get_carvingType() ||
            DiamondSurfaceType.SECTION_INSET == diamond.get_carvingType() ||
            DiamondSurfaceType.SECTION_SHARED == diamond.get_carvingType()
        ) {
            return GrooveBuilder.buildDiaGroove(
                DiamondBuilder.decideDiamondGrooveType(diamond),
                DiamondBuilder.calcDiamondLength(diamond),
                diamond.get_grooveBottom(),
                diamond.get_GrooveEdge(),
                shape,
                true,
                false,
                diamond.get_lowering(),
                diamond.get_groupIndex(),
                diamond
            );
        }
        return null != diamond.get_extraGrooveData()
            ? GrooveBuilder.buildDiaGroove(
                EnumHX.forValue(DiaGrooveEnum, diamond.get_extraGrooveData().type),
                DiamondBuilder.calcDiamondLength(diamond),
                diamond.get_extraGrooveData().depth,
                diamond.get_GrooveEdge(),
                shape,
                true,
                false,
                diamond.get_lowering(),
                diamond.get_groupIndex(),
                diamond
            )
            : null;
    }
    static Compare(a, b) {
        var c = a.get_minY(),
            d = b.get_minY();
        return d > c ? -1 : c > d ? 1 : 0;
    }
    static buildDiaSectionCut(diamond, diaSectionCutWrapperArray, sliceWrapperArray, ringRadius, start, end, segmentId) {
        var h = ringRadius * MathConsts.TAU;
        if (null != diaSectionCutWrapperArray) {
            var diaOrient = diamond.get_orientation(),
                sliceOrient = null;
            null != sliceWrapperArray && sliceWrapperArray.length > 0 && (sliceOrient = sliceWrapperArray[0].orientation);
            var sectionMeshDataArray1 = new Array(0);
            var sectionMeshDataArray2 = new Array(0);
            for (var m = 0; m < diaSectionCutWrapperArray.length; m++) {
                var diaSectionCutWrapper = diaSectionCutWrapperArray[m],
                    diaConf = diamond.getDiamondConfig(m),
                    p = (diaConf.shiftAngleOnSurface + diaConf.installWidth / 4) / h,
                    q = (diaConf.shiftAngleOnSurface - diaConf.installWidth / 4) / h,
                    r = PosWrapper.checkTopology(p, p, start, end),
                    s = PosWrapper.checkTopology(q, q, start, end);
                if (r || s) {
                    ArrayTool.clear(sectionMeshDataArray1);
                    ArrayTool.clear(sectionMeshDataArray2);
                    if (r) {
                        diaSectionCutWrapper.sectionSimpleMeshData.addMetaData(SegmentMeta.SEGMENT_INDEX, segmentId);
                        sectionMeshDataArray1.push(diaSectionCutWrapper.sectionSimpleMeshData);
                        diaSectionCutWrapper.sectionSimpleMeshData90.addMetaData(SegmentMeta.SEGMENT_INDEX, segmentId);
                        sectionMeshDataArray2.push(diaSectionCutWrapper.sectionSimpleMeshData90);
                        null != diaSectionCutWrapper.sharedSimpleMeshData &&
                            (diaSectionCutWrapper.sharedSimpleMeshData.addMetaData(SegmentMeta.SEGMENT_INDEX, segmentId), sectionMeshDataArray1.push(diaSectionCutWrapper.sharedSimpleMeshData));
                        null != diaSectionCutWrapper.sharedSimpleMeshData90 &&
                            (diaSectionCutWrapper.sharedSimpleMeshData90.addMetaData(SegmentMeta.SEGMENT_INDEX, segmentId), sectionMeshDataArray2.push(diaSectionCutWrapper.sharedSimpleMeshData90));
                    }
                    if (s) {
                        diaSectionCutWrapper.sectionSimpleMeshData270.addMetaData(SegmentMeta.SEGMENT_INDEX, segmentId);
                        sectionMeshDataArray1.push(diaSectionCutWrapper.sectionSimpleMeshData270);
                        diaSectionCutWrapper.sectionSimpleMeshData180.addMetaData(SegmentMeta.SEGMENT_INDEX, segmentId);
                        sectionMeshDataArray2.push(diaSectionCutWrapper.sectionSimpleMeshData180);
                        null != diaSectionCutWrapper.sharedSimpleMeshData270 &&
                            (diaSectionCutWrapper.sharedSimpleMeshData270.addMetaData(SegmentMeta.SEGMENT_INDEX, segmentId), sectionMeshDataArray1.push(diaSectionCutWrapper.sharedSimpleMeshData270));
                        null != diaSectionCutWrapper.sharedSimpleMeshData180 &&
                            (diaSectionCutWrapper.sharedSimpleMeshData180.addMetaData(SegmentMeta.SEGMENT_INDEX, segmentId), sectionMeshDataArray2.push(diaSectionCutWrapper.sharedSimpleMeshData180));
                    }
                    if (null != sliceWrapperArray && 0 != sliceWrapperArray.length) {
                        var B = NaN,
                            C = NaN;
                        if (sliceOrient == SliceConfigOrientationEnum.VERTICAL) {
                            if (DiamondPlacementType.LEFT_SIDE == diaOrient) {
                                DiamondBuilder.AddMetaData(sectionMeshDataArray1, SliceMeta.SLICE_INDEX, 0);
                                DiamondBuilder.AddMetaData(sectionMeshDataArray1, SliceMeta.SLICE_V_DIRECTION, SliceMetaValue.SLICE_V_DIRECTION_LEFT);
                                DiamondBuilder.AddMetaData(sectionMeshDataArray2, SliceMeta.SLICE_INDEX, 0);
                                DiamondBuilder.AddMetaData(sectionMeshDataArray2, SliceMeta.SLICE_V_DIRECTION, SliceMetaValue.SLICE_V_DIRECTION_LEFT);
                                continue;
                            }
                            if (DiamondPlacementType.RIGHT_SIDE == diaOrient) {
                                DiamondBuilder.AddMetaData(sectionMeshDataArray1, SliceMeta.SLICE_INDEX, sliceWrapperArray.length - 1);
                                DiamondBuilder.AddMetaData(sectionMeshDataArray1, SliceMeta.SLICE_V_DIRECTION, SliceMetaValue.SLICE_V_DIRECTION_RIGHT);
                                DiamondBuilder.AddMetaData(sectionMeshDataArray2, SliceMeta.SLICE_INDEX, sliceWrapperArray.length - 1);
                                DiamondBuilder.AddMetaData(sectionMeshDataArray2, SliceMeta.SLICE_V_DIRECTION, SliceMetaValue.SLICE_V_DIRECTION_RIGHT);
                                continue;
                            }
                            (DiamondPlacementType.HORIZONTAL == diaOrient || DiamondPlacementType.VERTICAL == diaOrient) &&
                                ((B = diaConf.diaPos.get_posX() - diaConf.installHeight / 4),
                                    (C = diaConf.diaPos.get_posX() + diaConf.installHeight / 4));
                        }
                        else if (sliceOrient == SliceConfigOrientationEnum.HORIZONTAL) {
                            if (DiamondPlacementType.HORIZONTAL == diaOrient || DiamondPlacementType.VERTICAL == diaOrient) {
                                DiamondBuilder.AddMetaData(sectionMeshDataArray1, SliceMeta.SLICE_INDEX, 0);
                                DiamondBuilder.AddMetaData(sectionMeshDataArray1, SliceMeta.SLICE_V_DIRECTION, SliceMetaValue.SLICE_V_DIRECTION_LEFT);
                                DiamondBuilder.AddMetaData(sectionMeshDataArray2, SliceMeta.SLICE_INDEX, 0);
                                DiamondBuilder.AddMetaData(sectionMeshDataArray2, SliceMeta.SLICE_V_DIRECTION, SliceMetaValue.SLICE_V_DIRECTION_LEFT);
                                continue;
                            }
                            DiamondPlacementType.LEFT_SIDE == diaOrient
                                ? ((B = diaConf.diaPos.get_posY() + diaConf.installHeight / 4),
                                    (C = diaConf.diaPos.get_posY() - diaConf.installHeight / 4))
                                : DiamondPlacementType.RIGHT_SIDE == diaOrient &&
                                ((B = diaConf.diaPos.get_posY() - diaConf.installHeight / 4),
                                    (C = diaConf.diaPos.get_posY() + diaConf.installHeight / 4));
                        }
                        var D = diaConf.shiftAngleOnSurface / h;
                        for (var E = 0; E < sliceWrapperArray.length; E++) {
                            var F = sliceWrapperArray[E].middleShape.get_SinePos(D);
                            if (B > F) {
                                DiamondBuilder.AddMetaData(sectionMeshDataArray1, SliceMeta.SLICE_INDEX, E);
                                DiamondBuilder.AddMetaData(sectionMeshDataArray1, SliceMeta.SLICE_V_DIRECTION, SliceMetaValue.SLICE_V_DIRECTION_RIGHT);
                            }
                            if (C > F) {
                                DiamondBuilder.AddMetaData(sectionMeshDataArray2, SliceMeta.SLICE_INDEX, E);
                                DiamondBuilder.AddMetaData(sectionMeshDataArray2, SliceMeta.SLICE_V_DIRECTION, SliceMetaValue.SLICE_V_DIRECTION_RIGHT);
                            }
                        }
                    }
                }
            }
        }
    }
    static calcDiamondLength(diamond) {
        var b;
        if (DiamondPlacementType.HORIZONTAL != diamond.get_orientation() ||
            (DiamondSurfaceType.SECTION != diamond.get_carvingType() && DiamondSurfaceType.SECTION_INSET != diamond.get_carvingType() &&
                DiamondSurfaceType.SECTION_SHARED != diamond.get_carvingType())
        ) {
            var min = Infinity,
                max = -Infinity,
                numPerCol = (diamond.get_numOfStones() / diamond.get_numOfCols()) | 0;
            for (var k = 0; k < diamond.get_numOfCols(); k++) {
                var diaConf = diamond.getDiamondConfig(numPerCol * k);
                min = Math.min(diaConf.diaOffset - diaConf.installHeight / 2, min);
                max = Math.max(diaConf.diaOffset + diaConf.installHeight / 2, max);
            }
            b = max - min;
            (DiamondSurfaceType.SECTION_INSET == diamond.get_carvingType() ||
                DiamondSurfaceType.SECTION_SHARED == diamond.get_carvingType()) &&
                (b += diamond.get_linesGap());
        }
        else
            b = diamond.get_maxX() - diamond.get_minX();
        return b;
    }
    static decideDiamondGrooveType(diamond) {
        var diaGrooveEnum;
        switch (diamond.get_orientation()) {
            case DiamondPlacementType.HORIZONTAL:
                switch (diamond.get_carvingType()) {
                    case DiamondSurfaceType.SECTION:
                        diaGrooveEnum = DiaGrooveEnum.CrossSimple;
                        break;
                    case DiamondSurfaceType.SECTION_INSET:
                        diaGrooveEnum = DiaGrooveEnum.SectionDiamond;
                        break;
                    case DiamondSurfaceType.SECTION_SHARED:
                        diaGrooveEnum = DiaGrooveEnum.SectionDiamond;
                        break;
                    case DiamondSurfaceType.CHANNEL:
                        diaGrooveEnum = DiaGrooveEnum.CrossSimple;
                        break;
                    default:
                        diaGrooveEnum = DiaGrooveEnum.Rect;
                }
                break;
            case DiamondPlacementType.LEFT_SIDE:
                switch (diamond.get_carvingType()) {
                    case DiamondSurfaceType.SECTION:
                        diaGrooveEnum = DiaGrooveEnum.LeftChannel;
                        break;
                    case DiamondSurfaceType.SECTION_INSET:
                        diaGrooveEnum = DiaGrooveEnum.SectionDiamondLeft;
                        break;
                    case DiamondSurfaceType.SECTION_SHARED:
                        diaGrooveEnum = DiaGrooveEnum.SectionDiamondLeft;
                        break;
                    default:
                        diaGrooveEnum = DiaGrooveEnum.LeftRect;
                }
                break;
            case DiamondPlacementType.RIGHT_SIDE:
                switch (diamond.get_carvingType()) {
                    case DiamondSurfaceType.SECTION:
                        diaGrooveEnum = DiaGrooveEnum.RightRect;
                        break;
                    case DiamondSurfaceType.SECTION_INSET:
                        diaGrooveEnum = DiaGrooveEnum.SectionDiamondRight;
                        break;
                    case DiamondSurfaceType.SECTION_SHARED:
                        diaGrooveEnum = DiaGrooveEnum.SectionDiamondRight;
                        break;
                    default:
                        diaGrooveEnum = DiaGrooveEnum.RightRect;
                }
                break;
            case DiamondPlacementType.VERTICAL:
                switch (diamond.get_carvingType()) {
                    case DiamondSurfaceType.SECTION:
                        diaGrooveEnum = DiaGrooveEnum.Rect;
                        break;
                    case DiamondSurfaceType.SECTION_INSET:
                        diaGrooveEnum = DiaGrooveEnum.SectionDiamond;
                        break;
                    case DiamondSurfaceType.SECTION_SHARED:
                        diaGrooveEnum = DiaGrooveEnum.SectionDiamond;
                        break;
                    case DiamondSurfaceType.CHANNEL:
                        diaGrooveEnum = DiaGrooveEnum.Channel;
                        break;
                    default:
                        diaGrooveEnum = DiaGrooveEnum.Rect;
                }
                break;
            default:
                throw new Error("Invalid DiamondGroup Orinetation!");
        }
        return diaGrooveEnum;
    }
    static makeDiamondCutPoly(diamondConfig, diamondIndex, groupIndex, carvingType, orientation, shapesWrapper, g, ringRadius) {
        var lineShapeWrapper,
            separPolygon = DiamondSepar.getDiamondSeparPolygon(diamondConfig, carvingType, g, orientation, ringRadius),
            pointArray = new Array(0);
        if (DiamondPlacementType.LEFT_SIDE == orientation) {
            var l = Math.min(
                Math.min(diamondConfig.leftPos.get_posX(), diamondConfig.diaPos.get_posX()),
                diamondConfig.rightPos.get_posX()
            );
            pointArray[0] = new Point(l - DiamondBuilder.BOUNDS_TOLERANCE, diamondConfig.rightPos.get_posY());
            pointArray[1] = new Point(l + diamondConfig.depth, diamondConfig.diaPos.get_posY());
            pointArray[2] = new Point(l - DiamondBuilder.BOUNDS_TOLERANCE, diamondConfig.leftPos.get_posY());
        }
        else if (DiamondPlacementType.RIGHT_SIDE == orientation) {
            var m = Math.max(
                Math.max(diamondConfig.leftPos.get_posX(), diamondConfig.diaPos.get_posX()),
                diamondConfig.rightPos.get_posX()
            );
            pointArray[0] = new Point(m + DiamondBuilder.BOUNDS_TOLERANCE, diamondConfig.leftPos.get_posY());
            pointArray[1] = new Point(m - diamondConfig.depth, diamondConfig.diaPos.get_posY());
            pointArray[2] = new Point(m + DiamondBuilder.BOUNDS_TOLERANCE, diamondConfig.rightPos.get_posY());
        }
        else if (DiamondPlacementType.HORIZONTAL == orientation && DiamondSurfaceType.CHANNEL == carvingType) {
            var n = diamondConfig.margin + diamondConfig.depth;
            pointArray[0] = new Point(shapesWrapper.get_minX() - 1, -0.5);
            pointArray[1] = new Point(shapesWrapper.get_minX() - 1, n);
            pointArray[2] = new Point(shapesWrapper.get_maxX() + 1, n);
            pointArray[3] = new Point(shapesWrapper.get_maxX() + 1, -0.5);
        }
        else if (
            DiamondSurfaceType.MEMOIRE1 == carvingType ||
            "memoire2" == carvingType ||
            "memoire3" == carvingType ||
            "memoire4" == carvingType
        ) {
            var o = diamondConfig.diaPos.get_posY() + diamondConfig.depth;
            pointArray[0] = new Point(separPolygon.get_boundingRect().get_left() - 0.5, -0.5);
            pointArray[1] = new Point(separPolygon.get_boundingRect().get_left() - 0.5, o);
            pointArray[2] = new Point(separPolygon.get_boundingRect().get_right() + 0.5, o);
            pointArray[3] = new Point(separPolygon.get_boundingRect().get_right() + 0.5, -0.5);
        }
        else {
            var minY = Math.min(diamondConfig.diaPos.get_posY(),
                Math.min(diamondConfig.leftPos.get_posY(), diamondConfig.rightPos.get_posY())
            );
            var maxY = Math.max(diamondConfig.diaPos.get_posY(),
                Math.max(diamondConfig.leftPos.get_posY(), diamondConfig.rightPos.get_posY())
            );
            if (maxY - minY > 0.1) {
                (pointArray[0] = new Point(separPolygon.get_boundingRect().get_left() - 0.5, minY - DiamondBuilder.BOUNDS_TOLERANCE));
                (pointArray[1] = new Point(separPolygon.get_boundingRect().get_left() - 0.5, maxY + DiamondBuilder.BOUNDS_TOLERANCE));
                (pointArray[2] = new Point(separPolygon.get_centroid().x, diamondConfig.depth));
                (pointArray[3] = new Point(separPolygon.get_boundingRect().get_right() + 0.5, maxY + DiamondBuilder.BOUNDS_TOLERANCE));
                (pointArray[4] = new Point(separPolygon.get_boundingRect().get_right() + 0.5, minY - DiamondBuilder.BOUNDS_TOLERANCE));
            }
            else {
                (pointArray[0] = new Point(separPolygon.get_boundingRect().get_left() - 0.5, minY - DiamondBuilder.BOUNDS_TOLERANCE));
                (pointArray[1] = new Point(separPolygon.get_centroid().x, diamondConfig.depth));
                (pointArray[2] = new Point(separPolygon.get_boundingRect().get_right() + 0.5, minY - DiamondBuilder.BOUNDS_TOLERANCE));
            }
        }
        lineShapeWrapper = RingMath.makeLineShapeWrapper(pointArray);
        var separatePolyData = new SeparatePolyData(separPolygon);
        separatePolyData.get_additionalMetas().addMetaData(DiamondMeta.DIAMOND_INDEX, diamondIndex);
        separatePolyData.get_additionalMetas().addMetaData(DiamondMeta.DIAMOND_GROUP_INDEX, groupIndex);
        separatePolyData.get_additionalMetas().addMetaData(ProfileMeta.PROFILE_SURFACE, ProfileMetaValue.PROFILE_SURFACE_OUTER); //kkk todo

        var shapesArray = RingMath.findIntersects(shapesWrapper, lineShapeWrapper); //kkk todo
        for (var k = 0; k < shapesArray.length; k++)
            shapesArray[k].addMetaData(CutPolyMeta.CUT_FILTER_PART, CutPolyMetaValue.CUT_FILTER_PART_DIAMOND);

        separatePolyData.get_separateFilterMetas().addMetaData(CutPolyMeta.CUT_FILTER_PART, CutPolyMetaValue.CUT_FILTER_PART_DIAMOND);
        return separatePolyData;
    }
    static AddMetaData(simpleMeshDataArray, metaKey, metaVal) {
        for (var d = 0; d < simpleMeshDataArray.length; d++) simpleMeshDataArray[d].addMetaData(metaKey, metaVal);
    }
}
DiamondBuilder.BOUNDS_TOLERANCE = .01;
DiamondBuilder.diaTransformBuilder = new DiamondTransformBuilder;
class DiamondProngBuilder {
    constructor() { }

    static makeDiaProngGeoData(extraProngData, X0, Y0, diaSectionGeometry, prongGeometry, hScale) {
        var sectionSimpleMeshData = new SimpleMeshData();
        (sectionSimpleMeshData.geometryData = diaSectionGeometry),
            (sectionSimpleMeshData.transformation = new Matrix3D()),
            sectionSimpleMeshData.transformation.appendScale(extraProngData.size, extraProngData.size, extraProngData.size),
            sectionSimpleMeshData.transformation.appendTranslation(X0, 0, Y0);

        var prongSimpleMeshData = new SimpleMeshData();
        (prongSimpleMeshData.geometryData = prongGeometry),
            (prongSimpleMeshData.transformation = new Matrix3D()),
            prongSimpleMeshData.transformation.appendScale(hScale, hScale, hScale);

        var prongMeshDataArray = new Array(0);
        prongMeshDataArray.push(prongSimpleMeshData);
        return DiamondProngBuilder.makeGapGeoData(sectionSimpleMeshData, prongMeshDataArray);
    }
    static makeDiaProngSharedGeoData(extraProngData, X0, Y0, diaSectionGeometry, prongGeometry, hScale, gap, h) {
        var sectionSimpleMeshData = new SimpleMeshData();
        (sectionSimpleMeshData.geometryData = diaSectionGeometry),
            (sectionSimpleMeshData.transformation = new Matrix3D()),
            sectionSimpleMeshData.transformation.appendScale(extraProngData.size, extraProngData.size, extraProngData.size),
            sectionSimpleMeshData.transformation.appendTranslation(X0, 0, Y0);

        var prongSimpleMeshData1 = new SimpleMeshData();
        (prongSimpleMeshData1.geometryData = prongGeometry),
            (prongSimpleMeshData1.transformation = new Matrix3D()),
            prongSimpleMeshData1.transformation.appendScale(hScale, hScale, hScale);

        var prongSimpleMeshData2 = new SimpleMeshData();
        (prongSimpleMeshData2.geometryData = prongGeometry),
            (prongSimpleMeshData2.transformation = new Matrix3D()),
            prongSimpleMeshData2.transformation.appendScale(hScale, hScale, hScale),
            prongSimpleMeshData2.transformation.appendTranslation(0, 0, h);

        var prongMeshDataArray = new Array(0);
        prongMeshDataArray.push(prongSimpleMeshData1);
        prongMeshDataArray.push(prongSimpleMeshData2);

        return DiamondProngBuilder.makeGapGeoData(sectionSimpleMeshData, prongMeshDataArray);
    }
    static makeGapGeoData(sectionSimpleMeshData, prongMeshDataArray) {
        if (null == prongMeshDataArray || null == sectionSimpleMeshData)
            return sectionSimpleMeshData.geometryData;

        var sectionGeometryData = sectionSimpleMeshData.geometryData.clone();
        SimpleGeometryDataUtil.applyTransformation(sectionGeometryData, sectionSimpleMeshData.transformation);
        var newProngSimpleMeshData = null;
        if (1 == prongMeshDataArray.length) {
            var prongSimpleMeshData = prongMeshDataArray[0].geometryData.clone();
            SimpleGeometryDataUtil.applyTransformation(prongSimpleMeshData, prongMeshDataArray[0].transformation);
            newProngSimpleMeshData = prongSimpleMeshData;
        }
        else {
            var mergeHandler = new SimpleGeometryMergeHandler();
            for (var i = 0; i < prongMeshDataArray.length; i++) {
                var prongSimpleMeshData = prongMeshDataArray[i].geometryData.clone();
                SimpleGeometryDataUtil.applyTransformation(prongSimpleMeshData, prongMeshDataArray[i].transformation);
                mergeHandler.addGeometry(prongSimpleMeshData);
            }
            newProngSimpleMeshData = mergeHandler.merge();
            mergeHandler.clean();
        }
        var geoData = GapCreator.createGapCreatorFromGeoData(sectionGeometryData).fa(GapCreator.createGapCreatorFromGeoData(newProngSimpleMeshData)).makeGeometryData(),
            newTransform = sectionSimpleMeshData.transformation.clone();
        newTransform.invert();
        SimpleGeometryDataUtil.applyTransformation(geoData, newTransform);

        return geoData;
    }
}
class DiamondSizeBuilder {
    __class__ = DiamondSizeBuilder;
    static __name__ = ["DiamondSizeBuilder"];
    constructor() { }
    static calcDiamondSize(diaConf, radius, shape) {
        if (diaConf.orientation == DiamondGroupConfigOrientationEnum.CROSS)
            throw new Error("Cross orientation is invalid!");
        var d = radius * MathConsts.TAU;
        diaConf.stonePerRow = Math.floor(d / (diaConf.stone.height + diaConf.gap)) - 1;
        var diamondCreator;
        if (diaConf.orientation == DiamondGroupConfigOrientationEnum.SURFACE)
            diamondCreator = new BasicDiamondCreator(diaConf, radius, shape, 0);
        else {
            if (
                diaConf.orientation != DiamondGroupConfigOrientationEnum.RIGHT &&
                diaConf.orientation != DiamondGroupConfigOrientationEnum.LEFT
            )
                throw new Error("Invalid DiamondGroup Orientation!");
            diamondCreator = new ChannelDiamondCreator(diaConf, radius, shape, 0);
        }
        var diamond = diamondCreator.make();
        var h = 0;
        for (var g = 0; d >= h; g++) {
            diamondCreator.testBuild();
            diamond.regulate();
            h = diamond.get_maxY() - diamond.get_minY();
            if ((g > DiamondSizeBuilder.MAX_ITERATION))
                throw new Error("Max iteration reached!");
        }
        diamond.removeDiamondConfig(diamond.get_numOfStones() - 1);
        diamond.regulate();
        return { length: diamond.get_maxY() - diamond.get_minY(), numStones: diamond.get_numOfStones() };
    }
    static MAX_ITERATION = 1e5;
}
class ModelFacesCreator {
    __class__ = ModelFacesCreator;
    static __name__ = ["ModelFacesCreator"];
    static createModelSliceFacesArray(modelMetaData, radius) {
        if (null == modelMetaData.sliceWrappersArray || 0 == modelMetaData.sliceWrappersArray.length) return null;
        var c = new Array(0);
        for (var d = 0, e = modelMetaData.sliceWrappersArray; d < e.length; d++) {
            var sliceWrapper = e[d];
            sliceWrapper.orientation == SliceConfigOrientationEnum.VERTICAL
                ? c.push(ModelFacesCreator.createModelVertSliceFaceArray(sliceWrapper, modelMetaData, radius))
                : sliceWrapper.orientation == SliceConfigOrientationEnum.HORIZONTAL &&
                c.push(ModelFacesCreator.createModelHorSliceFaceArray(sliceWrapper, modelMetaData, radius));
        }
        return c;
    }
    static createModelSideFaceArray(modelMetaData, radius) {
        if (modelMetaData.toAngle - modelMetaData.fromAngle >= 1) return null;
        var geoExFaceArray = new Array(0),
            x0 = 0,
            x2 = 1,
            tmpAngle = modelMetaData.fromAngle * MathConsts.TAU,
            cosVal = Math.cos(tmpAngle),
            sinVal = Math.sin(tmpAngle),
            y0 = cosVal * radius,
            z0 = sinVal * radius,
            y1 = cosVal * (radius - 2),
            z1 = sinVal * (radius - 2),
            geoExPoint0 = new GeoPointEx;
        geoExPoint0.initParam(x0, y0, z0);
        var geoExPoint1 = new GeoPointEx;
        geoExPoint1.initParam(x0, y1, z1);
        var geoExPoint2 = new GeoPointEx;
        geoExPoint2.initParam(x2, y0, z0);
        var geoExFace = new GeoExFace;
        geoExFace.geoExPointArray = new Array(0);
        geoExFace.geoExPointArray[0] = geoExPoint0;
        geoExFace.geoExPointArray[1] = geoExPoint1;
        geoExFace.geoExPointArray[2] = geoExPoint2;
        geoExFaceArray.push(geoExFace);

        tmpAngle = modelMetaData.toAngle * MathConsts.TAU;
        cosVal = Math.cos(tmpAngle);
        sinVal = Math.sin(tmpAngle);
        y0 = cosVal * radius;
        z0 = sinVal * radius;
        y1 = cosVal * (radius - 2);
        z1 = sinVal * (radius - 2);
        geoExPoint0 = new GeoPointEx;
        geoExPoint0.initParam(x2, y0, z0);
        geoExPoint1 = new GeoPointEx;
        geoExPoint1.initParam(x0, y1, z1);
        geoExPoint2 = new GeoPointEx;
        geoExPoint2.initParam(x0, y0, z0);
        geoExFace = new GeoExFace;
        geoExFace.geoExPointArray = new Array(0);
        geoExFace.geoExPointArray[0] = geoExPoint0;
        geoExFace.geoExPointArray[1] = geoExPoint1;
        geoExFace.geoExPointArray[2] = geoExPoint2;
        geoExFaceArray.push(geoExFace);

        return geoExFaceArray;
    }
    static createModelVertSliceFaceArray(sliceWrapper, modelMetaData, radius) {
        for (
            var geoExFaceArray = new Array(0),
            count = modelMetaData.shapesWrapperArray.length - 1,
            sinePosArray = sliceWrapper.middleShape.get_SinePosArray(count, modelMetaData.fromAngle, modelMetaData.toAngle),
            fromAngle = modelMetaData.fromAngle * MathConsts.TAU,
            deltaAngle = ((modelMetaData.toAngle - modelMetaData.fromAngle) * MathConsts.TAU) / count,
            curAngle = fromAngle,
            nextAngle = fromAngle,
            k = 0;
            count > k; k++
        ) {
            curAngle = nextAngle;
            nextAngle += deltaAngle;
            var sinVal = Math.sin(curAngle),
                cosVal = Math.cos(curAngle),
                x0 = sinePosArray[k],
                x1 = sinePosArray[k + 1],
                y1 = Math.cos(nextAngle) * radius,
                z1 = Math.sin(nextAngle) * radius;
            var geoExPoint0 = new GeoPointEx;
            geoExPoint0.initParam(x0, cosVal * radius, sinVal * radius);
            var geoExPoint1 = new GeoPointEx;
            geoExPoint1.initParam(x1, y1, z1);
            var geoExPoint2 = new GeoPointEx;
            geoExPoint2.initParam(x0, cosVal * (radius + 5), sinVal * (radius + 5));
            var geoExFace = new GeoExFace;
            geoExFace.geoExPointArray = new Array(0);
            geoExFace.geoExPointArray[0] = geoExPoint0;
            geoExFace.geoExPointArray[1] = geoExPoint1;
            geoExFace.geoExPointArray[2] = geoExPoint2;
            var flag = false;
            for (var id = 0; id < geoExFaceArray.length; id++) {
                if (geoExFaceArray[id].get_plane().isEqual(geoExFace.get_plane())) {
                    flag = true;
                    break;
                }
            }
            flag || geoExFaceArray.push(geoExFace);
        }
        return geoExFaceArray;
    }
    static createModelHorSliceFaceArray(sliceWrapper, modelMetaData, radius) {
        for (
            var geoExFaceArray = new Array(0),
            count = modelMetaData.shapesWrapperArray.length,
            sinePosArray = sliceWrapper.middleShape.get_SinePosArray(count - 1, modelMetaData.fromAngle, modelMetaData.toAngle),
            deltaAngle = (modelMetaData.toAngle - modelMetaData.fromAngle) / count,
            h = 0;
            count - 1 > h; h++

        ) {
            var curAngle = modelMetaData.fromAngle + deltaAngle * h,
                nextAngle = curAngle + deltaAngle,
                sinVal = Math.sin(curAngle),
                cosVal = Math.cos(curAngle),
                x0 = sinePosArray[h],
                y0 = cosVal * radius,
                z0 = sinVal * radius,
                x2 = sinePosArray[h + 1],
                y2 = Math.cos(nextAngle) * radius,
                z2 = Math.sin(nextAngle) * radius,
                geoExPoint0 = new GeoPointEx;
            geoExPoint0.initParam(x0, y0, z0);
            var geoExPoint1 = new GeoPointEx;
            geoExPoint1.initParam(x0, y0 + cosVal, z0 + sinVal);
            var geoExPoint2 = new GeoPointEx;
            geoExPoint2.initParam(x2, y2, z2);
            var geoExFace = new GeoExFace;
            geoExFace.geoExPointArray = new Array(0);
            geoExFace.geoExPointArray[0] = geoExPoint0;
            geoExFace.geoExPointArray[1] = geoExPoint1;
            geoExFace.geoExPointArray[2] = geoExPoint2;
            var flag = false;
            for (var id = 0; id < geoExFaceArray.length;) {
                if (geoExFaceArray[id].get_plane().isEqual(geoExFace.get_plane())) {
                    flag = true;
                    break;
                }
                ++id;
            }
            flag || geoExFaceArray.push(geoExFace);
        }
        return geoExFaceArray;
    }
}
class DiamondCreateBase {
    __class__ = DiamondCreateBase;
    static __name__ = ["DiamondCreateBase"];
    constructor(config, radius, shape, index) {
        this.initialize(config, radius, shape, index);
    }

    orientation = null;
    diaGrooveArray = null;
    ringLength = null;
    ringShape = null;
    curDiaGroove = null;
    bStraight = null;
    shiftLength = null;
    diamond = null;
    radius = null;
    config = null;
    initialize(config, radius, shape, index) {
        this.config = config;
        this.radius = radius;
        this.ringShape = shape;
        this.ringLength = radius * MathConsts.TAU;
        this.orientation = this.getOrientation();

        var grooveEdge = GrooveEdge.getInstance(this.config.middleShape);
        ObjMan.__instanceof(grooveEdge, Edges) && ObjMan.__cast(grooveEdge, Edges).v_(config.shiftAngleOnSurface * this.ringLength);

        this.diamond = new Diamond(
            this.getSetting(),
            grooveEdge,
            this.orientation,
            index,
            config.lowering, config.gap, config.linesGap, config.channel, config.prong
        );
        this.shiftLength = config.shiftAngleOnSurface * this.ringLength;
    }
    make() {
        return this.build();
    }
    testBuild() {
        for (var a = 0; a < this.config.rows; a++) {
            this.curDiaGroove = this.diaGrooveArray[a];
            this.curDiaGroove.aO(1 / this.ringLength);
            var diaConfig,
                lastConfig =
                    0 == this.diamond.get_numOfStones()
                        ? null
                        : this.diamond.getDiamondConfig(this.diamond.get_numOfStones() - 1);
            (diaConfig = null != lastConfig && this.bStraight ? lastConfig.clone() : this.getDiaConfig());
            this.makeDiamondConfig(diaConfig, lastConfig, this.config.gap);
            this.addDiamondConfig(diaConfig);
            this.curDiaGroove.aO(this.ringLength);
        }
    }
    addDiamondConfig(colConfig) {
        this.diamond.addDiamondConfig(colConfig);
    }
    build() {
        this.diamond.set_numOfCols(this.config.rows);
        this.bStraight = this.diamond.get_GrooveEdge().get_isStraight();
        this.preBuild();
        for (var rowId = 0; rowId < this.config.rows; rowId++) {
            this.curDiaGroove = this.diaGrooveArray[rowId];
            this.curDiaGroove.aO(1 / this.ringLength);
            var prevDiamondConfig = null;
            for (var stoneId = 0; stoneId < this.config.stonePerRow; stoneId++) {
                var diamondConfig;
                diamondConfig = (null != prevDiamondConfig) && this.bStraight ? prevDiamondConfig.clone() : this.getDiaConfig();
                this.makeDiamondConfig(diamondConfig, prevDiamondConfig, this.config.gap);
                prevDiamondConfig = diamondConfig;
                this.addDiamondConfig(diamondConfig);
            }
            this.curDiaGroove.aO(this.ringLength);
        }
        this.diamond.regulate();
        return this.diamond;
    }
    makeDiamondConfig(diamondConfig, prevDiamondConfig, gap) {
        throw new Error("This is an Abstract Method!");
    }
    getDiaConfig() { //kkk todo
        var diamondConfig;
        if (this.config.stone.cut == StoneConfigCutEnum.DECOR ||
            this.config.stone.cut == StoneConfigCutEnum.BRILLIANT)
            diamondConfig = this.makeRoundDiamondConfig(this.config.stone.height);
        else if (this.config.stone.cut == StoneConfigCutEnum.PRINCESS)
            diamondConfig = this.makeRightRectDiamondConfig(this.config.stone.height, this.config.stone.rotationAngle);
        else if (this.config.stone.cut == StoneConfigCutEnum.BAGUETTE)
            diamondConfig = this.makeRectDiamondConfig(this.config.stone.width, this.config.stone.height, this.config.stone.rotationAngle);
        else {
            if (this.config.stone.cut != StoneConfigCutEnum.CUSTOM)
                throw new Error(
                    "Invalid type of Diamond stone: " + Std.string(this.config.stone.cut)
                );
            diamondConfig = this.makeCustomDiamondConfig(this.config.stone);
        }
        return diamondConfig;
    }
    initPlacement(diamondConfig, placementType, marginOffset) {
        if (!this.bStraight) {
            var d = this.diamond.get_GrooveEdge().get_SinePos(diamondConfig.shiftAngleOnSurface - diamondConfig.installWidth / 2),
                e = this.diamond.get_GrooveEdge().get_SinePos(diamondConfig.shiftAngleOnSurface + diamondConfig.installWidth / 2);
            diamondConfig.zRotationAngle =
                Math.atan(
                    (DiamondPlacementType.LEFT_SIDE == placementType || DiamondPlacementType.RIGHT_SIDE == placementType ? d - e : e - d) / diamondConfig.installWidth
                ) / MathConsts.TAU;
        }
        var f = Math.atan2(
            diamondConfig.leftPos.get_posY() - diamondConfig.rightPos.get_posY(),
            diamondConfig.rightPos.get_posX() - diamondConfig.leftPos.get_posX()
        );
        diamondConfig.zRotationAngle = f / MathConsts.TAU; //kkk todo todo
        if ((DiamondPlacementType.LEFT_SIDE == placementType)) {
            diamondConfig.margin = 0;
            diamondConfig.depth *= Math.sin(f);
        }
        else if (DiamondPlacementType.RIGHT_SIDE == placementType) {
            diamondConfig.margin = 0;
            diamondConfig.depth *= -Math.sin(f);
        }
        else {
            if (DiamondPlacementType.HORIZONTAL != placementType && DiamondPlacementType.VERTICAL != placementType)
                throw new Error("Invalid diamond orientation: " + placementType);
            (diamondConfig.margin = diamondConfig.leftPos.get_posY() - 0.5 * (diamondConfig.leftPos.get_posY() - diamondConfig.rightPos.get_posY()));
            (diamondConfig.margin = Math.max(diamondConfig.margin, diamondConfig.diaPos.get_posY()));
            (diamondConfig.depth *= Math.cos(f));
        }
        diamondConfig.margin += marginOffset;
    }
    preBuild() {
        var rows = this.config.rows;
        this.diaGrooveArray = new Array(rows);
        var halfCount = (this.config.rows / 2) | 0;
        if (this.config.rows % 2 == 1) {
            this.diaGrooveArray[halfCount] = this.diamond.get_GrooveEdge().clone();
            var prevGroove = this.diamond.get_GrooveEdge();
            for (var d = 1; halfCount >= d; d++) {
                var e = RingMath.extractXIntersectTopPoint(this.ringShape, prevGroove.get_startValue()),
                    f = RingMath.extractCircleIntersects(this.ringShape, e.get_posX(), e.get_posY(), this.config.stone.width);
                if (f.length > 2) {
                    f.sort(Vect2.comparePosY);
                    ArrayTool.clear(f, 2);
                }
                for (var k = f[0].get_posX(), l = 1; l < f.length; l++)
                    k = k > f[l].get_posX() ? f[l].get_posX() : k;
                var groove = this.diamond.get_GrooveEdge().clone();
                groove.set_horizontalShift(k - this.config.linesGap);
                (this.diaGrooveArray[halfCount - d] = groove);
                (prevGroove = groove);
            }
            prevGroove = this.diamond.get_GrooveEdge();
            for (var d = 1; halfCount >= d; d++) {
                var n = RingMath.extractXIntersectTopPoint(this.ringShape, prevGroove.get_startValue()),
                    o = RingMath.extractCircleIntersects(this.ringShape, n.get_posX(), n.get_posY(), this.config.stone.width);
                if (o.length > 2) {
                    o.sort(Vect2.comparePosY);
                    ArrayTool.clear(o, 2);
                }
                for (var t = o[0].get_posX(), u = 1; u < o.length;)
                    (t = t < o[u].get_posX() ? o[u].get_posX() : t), ++u;
                var groove = this.diamond.get_GrooveEdge().clone();
                groove.set_horizontalShift(t + this.config.linesGap);
                (this.diaGrooveArray[halfCount + d] = groove);
                (prevGroove = groove);
            }
        }
        else {
            var topPt = RingMath.extractXIntersectTopPoint(this.ringShape, this.diamond.get_GrooveEdge().get_startValue()),
                intersectPts = RingMath.extractCircleIntersects(
                    this.ringShape,
                    topPt.get_posX(), topPt.get_posY(),
                    (this.config.stone.width + this.config.linesGap) / 2
                );
            if (intersectPts.length > 2) {
                intersectPts.sort(Vect2.comparePosY);
                ArrayTool.clear(intersectPts, 2);
            }
            var x1 = intersectPts[0].get_posX();
            for (var D = 1; D < intersectPts.length; D++)
                x1 = x1 > intersectPts[D].get_posX() ? intersectPts[D].get_posX() : x1;

            var groove_0 = this.diamond.get_GrooveEdge().clone();
            groove_0.set_horizontalShift(x1);
            this.diaGrooveArray[halfCount - 1] = groove_0;

            // calc right half grooves
            var prevGroove = this.diaGrooveArray[halfCount - 1];
            for (var G = 0; halfCount > G; G++) {
                topPt = RingMath.extractXIntersectTopPoint(this.ringShape, prevGroove.get_startValue());
                intersectPts = RingMath.extractCircleIntersects(
                    this.ringShape,
                    topPt.get_posX(), topPt.get_posY(),
                    this.config.stone.width + this.config.linesGap);
                if (intersectPts.length > 2) {
                    intersectPts.sort(Vect2.comparePosY);
                    ArrayTool.clear(intersectPts, 2);
                }
                for (x1 = intersectPts[0].get_posX(), D = 1; D < intersectPts.length; D++)
                    x1 = x1 < intersectPts[D].get_posX() ? intersectPts[D].get_posX() : x1;

                var groove = this.diamond.get_GrooveEdge().clone();
                groove.set_horizontalShift(x1);
                this.diaGrooveArray[halfCount + G] = groove;
                prevGroove = groove;
            }

            prevGroove = this.diaGrooveArray[halfCount - 1];
            for (G = 2; halfCount >= G; G++) {
                topPt = RingMath.extractXIntersectTopPoint(this.ringShape, prevGroove.get_startValue());
                intersectPts = RingMath.extractCircleIntersects(this.ringShape, topPt.get_posX(), topPt.get_posY(), this.config.stone.width + this.config.linesGap);
                if (intersectPts.length > 2) {
                    intersectPts.sort(Vect2.comparePosY);
                    ArrayTool.clear(intersectPts, 2);
                }
                for (x1 = intersectPts[0].get_posX(), D = 1; D < intersectPts.length; D++)
                    x1 = x1 > intersectPts[D].get_posX() ? intersectPts[D].get_posX() : x1;

                var groove = this.diamond.get_GrooveEdge().clone();
                groove.set_horizontalShift(x1);
                this.diaGrooveArray[halfCount - G] = groove;
                prevGroove = groove;
            }
        }
    }
    makeRoundDiamondConfig(stoneHeight) {
        var diamondConfig = new DiamondConfig();
        diamondConfig.stoneType = DiamondGrooveType.ROUND;
        diamondConfig.diaHeight = diamondConfig.diaWidth = diamondConfig.installHeight = diamondConfig.installWidth = stoneHeight;
        diamondConfig.depth = 0.455 * stoneHeight;
        diamondConfig.rotationAngle = 0;
        return diamondConfig;
    }
    //this.config.stone.height, this.config.stone.rotationAngle
    makeRightRectDiamondConfig(height, rotationAngle) {
        var diamondConfig = new DiamondConfig();
        diamondConfig.stoneType = DiamondGrooveType.RECTANGLE;
        diamondConfig.diaHeight = diamondConfig.diaWidth = height;
        diamondConfig.depth = 0.65 * height;
        diamondConfig.rotationAngle = rotationAngle;
        diamondConfig.installHeight = diamondConfig.installWidth =
            height * Math.sin(rotationAngle * MathConsts.TAU) + height * Math.cos(rotationAngle * MathConsts.TAU);

        return diamondConfig;
    }
    //this.config.stone.width,this.config.stone.height,this.config.stone.rotationAngle
    makeRectDiamondConfig(width, height, rotationAngle) {
        var diamondConfig = new DiamondConfig();
        diamondConfig.stoneType = DiamondGrooveType.RECTANGLE;
        diamondConfig.diaWidth = width;
        diamondConfig.diaHeight = height;
        diamondConfig.depth = 0.24 * width;
        diamondConfig.rotationAngle = rotationAngle;
        var sinVal = Math.sin(rotationAngle * MathConsts.TAU),
            cosVal = Math.cos(rotationAngle * MathConsts.TAU);
        diamondConfig.installWidth = Math.abs(width * sinVal + height * cosVal);
        diamondConfig.installHeight = Math.abs(height * sinVal + width * cosVal);
        return diamondConfig
    }
    makeCustomDiamondConfig(stone) {
        var diamondConfig = new DiamondConfig();
        diamondConfig.stoneType = DiamondGrooveType.CUSTOM;
        diamondConfig.diaWidth = stone.width;
        diamondConfig.diaHeight = stone.height;
        diamondConfig.depth = stone.depth;
        diamondConfig.rotationAngle = stone.rotationAngle;
        var sinVal = Math.sin(stone.rotationAngle * MathConsts.TAU),
            cosVal = Math.cos(stone.rotationAngle * MathConsts.TAU),
            width = stone.width,
            height = stone.height;
        diamondConfig.installWidth = Math.abs(height * sinVal + width * cosVal);
        diamondConfig.installHeight = Math.abs(width * sinVal + height * cosVal);
        return diamondConfig;
    }
    getSetting() {
        var a;
        if (this.config.setting == DiamondGroupConfigSettingEnum.CHANNEL)
            a = DiamondSurfaceType.CHANNEL;
        else if (this.config.setting == DiamondGroupConfigSettingEnum.SECTION)
            a = DiamondSurfaceType.SECTION;
        else if (this.config.setting == DiamondGroupConfigSettingEnum.SECTION_INSET)
            a = DiamondSurfaceType.SECTION_INSET;
        else if (this.config.setting == DiamondGroupConfigSettingEnum.SECTION_SHARED)
            a = DiamondSurfaceType.SECTION_SHARED;
        else if (this.config.setting == DiamondGroupConfigSettingEnum.RUBBED)
            a = "rubbed";
        else if (this.config.setting == DiamondGroupConfigSettingEnum.RUBBED_EDGELESS)
            a = DiamondSurfaceType.RUBBED_EDGELESS;
        else if (this.config.setting == DiamondGroupConfigSettingEnum.NULL)
            a = DiamondSurfaceType.NULL;
        else if (this.config.setting == DiamondGroupConfigSettingEnum.MEMOIRE1)
            a = DiamondSurfaceType.MEMOIRE1;
        else if (this.config.setting == DiamondGroupConfigSettingEnum.MEMOIRE2)
            a = "memoire2";
        else if (this.config.setting == DiamondGroupConfigSettingEnum.MEMOIRE3)
            a = "memoire3";
        else if (this.config.setting == DiamondGroupConfigSettingEnum.MEMOIRE4)
            a = "memoire4";
        else {
            if (this.config.setting != DiamondGroupConfigSettingEnum.CUSTOM_PRONG)
                throw new Error("Invalid carving type: " + this.config.setting.get_value());
            a = "memoire4";
        }
        return a;
    }
    getOrientation() {
        var a = null;
        return (
            this.config.orientation == DiamondGroupConfigOrientationEnum.LEFT
                ? (a = DiamondPlacementType.LEFT_SIDE)
                : this.config.orientation == DiamondGroupConfigOrientationEnum.RIGHT
                    ? (a = DiamondPlacementType.RIGHT_SIDE)
                    : this.config.orientation == DiamondGroupConfigOrientationEnum.SURFACE
                        ? (a = DiamondPlacementType.VERTICAL)
                        : this.config.orientation == DiamondGroupConfigOrientationEnum.CROSS &&
                        (a = DiamondPlacementType.HORIZONTAL),
            a
        );
    }
}
class ChannelDiamondCreator extends DiamondCreateBase {
    constructor(config, radius, shape, index) {
        super(config, radius, shape, index);

        config.orientation == DiamondGroupConfigOrientationEnum.LEFT
            ? (this.orientation = DiamondPlacementType.LEFT_SIDE)
            : config.orientation == DiamondGroupConfigOrientationEnum.RIGHT &&
            (this.orientation = DiamondPlacementType.RIGHT_SIDE);
    }

    orientation = null;
    makeDiamondConfig(diamondConfig, prevDiamondConfig, gap) {
        var d,
            diaOffset = this.curDiaGroove.get_SinePos(0),
            f = this.radius / (this.radius - diaOffset);
        if (null == prevDiamondConfig)
            d = this.shiftLength + (diamondConfig.installWidth * f) / 2;
        else {
            var g = this.curDiaGroove.calcShiftAngleOnSurface(prevDiamondConfig.shiftAngleOnSurface, prevDiamondConfig.diaOffset, (diamondConfig.installWidth + gap) * f);
            g.sort(NumComparor.negativeComp), (d = g[0]);
        }
        diamondConfig.diaOffset = diaOffset;
        diamondConfig.shiftAngleOnSurface = d;
        if (DiamondPlacementType.LEFT_SIDE == this.orientation) {
            diamondConfig.diaPos = RingMath.extractYIntersectLeftPoint(this.ringShape, diaOffset);
            var h = RingMath.extractCircleIntersects(this.ringShape, diamondConfig.diaPos.get_posX(), diamondConfig.diaPos.get_posY(), diamondConfig.installHeight / 2);
            for (var i = 0; i < h.length; i++)
                h[i].get_posY() > diamondConfig.diaOffset ? (diamondConfig.leftPos = h[i]) : (diamondConfig.rightPos = h[i]);
        }
        else if (DiamondPlacementType.RIGHT_SIDE == this.orientation) {
            diamondConfig.diaPos = RingMath.extractYIntersectRightPoint(this.ringShape, diaOffset);
            var j = RingMath.extractCircleIntersects(this.ringShape, diamondConfig.diaPos.get_posX(), diamondConfig.diaPos.get_posY(), diamondConfig.installHeight / 2);
            for (var k = 0; k < j.length; k++)
                j[k].get_posY() > diamondConfig.diaOffset ? (diamondConfig.rightPos = j[k]) : (diamondConfig.leftPos = j[k]);
        }
        this.initPlacement(diamondConfig, this.orientation, this.diamond.get_lowering());
    }
}
class BasicDiamondCreator extends DiamondCreateBase {
    constructor(config, radius, shape, index) {
        super(config, radius, shape, index);
    }

    makeDiamondConfig(diamondConfig, prevDiamondConfig, gap) {
        var shiftAngleOnSurface, diaOffset;
        // console.log(this.curDiaGroove);
        if (null == prevDiamondConfig) {
            shiftAngleOnSurface = this.shiftLength + diamondConfig.installWidth / 2;
            diaOffset = this.curDiaGroove.get_SinePos(shiftAngleOnSurface);
        }
        else {
            var f = this.curDiaGroove.calcShiftAngleOnSurface(prevDiamondConfig.shiftAngleOnSurface, prevDiamondConfig.diaOffset, diamondConfig.installWidth + gap);
            f.sort(NumComparor.negativeComp);
            var g = f[0];
            diaOffset = this.curDiaGroove.get_SinePos(g);
            shiftAngleOnSurface = g;
        }
        diamondConfig.diaOffset = diaOffset;
        diamondConfig.shiftAngleOnSurface = shiftAngleOnSurface;
        diamondConfig.diaPos = RingMath.extractXIntersectTopPoint(this.ringShape, diaOffset);

        var h = RingMath.extractCircleIntersects(this.ringShape, diamondConfig.diaPos.get_posX(), diamondConfig.diaPos.get_posY(), diamondConfig.installHeight / 2);
        if (h.length > 2) {
            h.sort(Vect2.comparePosY);
            ArrayTool.clear(h, 2);
        }
        for (var k = 0; k < h.length; k++) {
            if (h[k].get_posX() < diamondConfig.diaOffset)
                diamondConfig.leftPos = h[k];
            else
                diamondConfig.rightPos = h[k];
        }
        this.initPlacement(diamondConfig, DiamondPlacementType.VERTICAL, this.diamond.get_lowering());
    }
}
class DiamondMaker {
    constructor() { }
    static make(config, radius, shape, index) {
        var diamondCreator;
        if (config.orientation == DiamondGroupConfigOrientationEnum.CROSS ||
            config.orientation == DiamondGroupConfigOrientationEnum.SURFACE)
            diamondCreator = new BasicDiamondCreator(config, radius, shape, index);
        else {
            if (config.orientation != DiamondGroupConfigOrientationEnum.RIGHT &&
                config.orientation != DiamondGroupConfigOrientationEnum.LEFT)
                throw new Error("Invalid DiamondGroup Orientation!");
            diamondCreator = new ChannelDiamondCreator(config, radius, shape, index);
        }
        return diamondCreator.make();
    }
}

export {
    ModelFacesCreator, Diamond, DiamondLocator, DiamondGapMaker, DiamondBuilder, DiamondMaker
}