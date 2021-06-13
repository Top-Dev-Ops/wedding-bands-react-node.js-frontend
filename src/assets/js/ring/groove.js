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

class GrooveWrapper {
    __class__ = GrooveWrapper;
    static __name__ = ["GrooveWrapper"];
    constructor() { }

    grooveUID = null;
    grooveShape = null;
    grooveEdge = null;
}
class GrooveBase {
    __class__ = GrooveBase;
    static __name__ = ["GrooveBase"];
    RightBottomPoint = null;
    leftTopPoint = null;
    metaDataMap = null;
    bDepthRelative = null;
    baseProfile = null;
    depth = null;
    width = null;
    constructor(width, depth, baseProfile, bDepthRelative) {
        this.width = width;
        this.depth = depth;
        this.baseProfile = baseProfile;
        this.bDepthRelative = bDepthRelative;
    }

    get_isDepthRelative() {
        return this.bDepthRelative;
    }
    get_baseProfile() {
        return this.baseProfile;
    }
    get_depth() {
        return this.depth;
    }
    get_width() {
        return this.width;
    }
    calcShapesWrapper(posX, b, c) {
        null == c && (c = 1);
        this.leftTopPoint = null;
        this.RightBottomPoint = null;
        var shapesWrapper = this._calcShapesWrapper(posX, b, c);
        var count = shapesWrapper.get_numOfShapes();
        for (var f = 0; count > f; f++)
            this.metaDataMap.copyMetaDatasTo(shapesWrapper.getShapeAt(f));

        return shapesWrapper;
    }
    setMetaDataMap(a) {
        this.metaDataMap = new MetaDataMap();
        a.copyMetaDatasTo(this.metaDataMap);
    }
    getMetaDataMap() {
        return this.metaDataMap;
    }
    _calcShapesWrapper(a, b, c) {
        throw new Error("This is an Abstract Method!");
    }
    addShapeToLeft(shapesWrapper, shape) {
        shape.addMetaData(GrooveMeta.GROOVE_PART, GrooveMetaValue.GROOVE_PART_SIDE_LEFT);
        shapesWrapper.addShape(shape);
    }
    addShapeToRight(shapesWrapper, shape) {
        shape.addMetaData(GrooveMeta.GROOVE_PART, GrooveMetaValue.GROOVE_PART_SIDE_RIGHT);
        shapesWrapper.addShape(shape);
    }
    addShapeToBottom(shapesWrapper, shape) {
        shape.addMetaData(GrooveMeta.GROOVE_PART, GrooveMetaValue.GROOVE_PART_BOTTOM);
        shapesWrapper.addShape(shape);
    }
    calcBoundPoint(a, b) {
        var c = RingMath.extractCircleIntersects(this.get_baseProfile(), a.get_posX(), a.get_posY(), b);
        c.sort(Vect2.comparePosY);
        ArrayTool.clear(c, 2, false);

        for (var h = 0; h < c.length; h++) {
            if (c[h].get_posX() < a.get_posX())
                this.leftTopPoint = c[h];
            else
                this.RightBottomPoint = c[h];
        }
    }
    createLine(x0, y0, x1, y1) {
        var line = new Line;
        line.initParam(x0, y0, x1, y1);
        return line;
    }
}
class GrooveBump extends GrooveBase {
    static __super__ = GrooveBase;
    __class__ = GrooveBump;
    static __name__ = ["GrooveBump"];
    constructor(width, depth, baseProfile, grooveChamfer) {//width, depth, baseProfile, grooveChamfer
        super(width, depth, baseProfile, false),//this.get_isDepthRelative()
            (this.B8 = grooveChamfer),
            (this.B3 = GrooveBump.MAX_NUM_SEGMENTS * this.B8),
            (this.B4 = this.B8 > 0);
    }

    B3 = null;
    B4 = null;
    B7 = null;
    get_rotateByProfile() {
        return this.B7;
    }
    B8 = null;
    get_chamferHeight() {
        return this.B8;
    }
    _calcShapesWrapper(a, b, c) {
        var vAC = new Point;
        var vAB = new Point;
        var vAP = new Point;
        var shapesWrapper = new ShapesWrapper,
            e = RingMath.extractXIntersectTopPoint(this.get_baseProfile(), a),
            f = this.get_width() / 2,
            g = e.get_posX() + f * e.get_normalY(),
            h = e.get_posY() + f * -e.get_normalX(),
            i = e.get_posX() + f * -e.get_normalY(),
            j = e.get_posY() + f * e.get_normalX(),
            k = e.get_normalX() * this.get_depth(),
            l = e.get_normalY() * this.get_depth(),
            m = g - k,
            n = h - l,
            o = i - k,
            p = j - l,
            line1 = this.createLine(i + k, j + l, o, p),
            line2 = this.createLine(m, n, g + k, h + l);
        vAB.setTo(o, p),
            vAC.setTo(
                e.get_posX() - GrooveBump.TOLERANCE * e.get_normalX(),
                e.get_posY() - GrooveBump.TOLERANCE * e.get_normalY()
            ),
            vAP.setTo(m, n);
        var arc = new Arc;
        return (
            ObjMan.__cast(arc, Arc).initFromTriangle(vAB, vAC, vAP),
            arc.set_invertedNormals(false),
            arc.set_resolution(0 | Math.max(4, (arc.get_geometryLength() / GrooveBump.MAX_SEGMENT_LENGTH_ONARC) | 0)),
            arc.set_resolution(arc.get_resolution() > GrooveBump.MAX_NUM_SEGMENTS ? GrooveBump.MAX_NUM_SEGMENTS : arc.get_resolution()),
            this.createLine(vAB.x, vAB.y, vAP.x, vAP.y),
            this.addShapeToRight(shapesWrapper, line1),
            this.addShapeToBottom(shapesWrapper, arc),
            this.addShapeToLeft(shapesWrapper, line2),
            shapesWrapper
        );
    }
}
GrooveBump.TOLERANCE = 1e-4;
GrooveBump.MAX_NUM_SEGMENTS = 10;
GrooveBump.MAX_SEGMENT_LENGTH_ONARC = .5;

class GrooveDiaChannel extends GrooveBase {
    static __super__ = GrooveBase;
    __class__ = GrooveDiaChannel;
    static __name__ = ["GrooveDiaChannel"];
    constructor(a, b, c, d, e, f, g, h) {
        null == h && (h = 0.9),
            null == g && (g = 0.2),
            null == f && (f = true),
            null == e && (e = true),
            super(a, b, c, f),
            (this.B7 = e),
            (this.Ct = g),
            (this.Cs = h),
            (this.B8 = this.Ct / 4),
            (this.B3 = 10 * this.B8),
            (this.B4 = d);
    }

    B3 = null;
    B4 = null;
    B7 = null;
    get_rotateByProfile() {
        return this.B7;
    }
    set_rotateByProfile(a) {
        return this.B7 == a ? this.B7 : ((this.B7 = a), this.B7);
    }
    Cs = null;
    get_diamondHolderRatio() {
        return this.Cs;
    }
    B8 = null;
    get_chamferHeight() {
        return this.B8;
    }
    Ct = null;
    get_diamondHolderDepth() {
        return this.Ct;
    }
    _calcShapesWrapper(a, b, c) {
        var d = new ShapesWrapper,
            e = c * this.get_width(),
            f = (e - e * this.Cs) / 2;
        this.B7
            ? this.calcBoundPoint(RingMath.extractXIntersectTopPoint(this.get_baseProfile(), a), e / 2)
            : ((this.leftTopPoint = RingMath.extractXIntersectTopPoint(this.get_baseProfile(), a - e / 2)),
                (this.RightBottomPoint = RingMath.extractXIntersectTopPoint(this.get_baseProfile(), a + e / 2)));
        var g,
            h = this.leftTopPoint.get_posX(),
            i = this.RightBottomPoint.get_posX();
        g = this.get_isDepthRelative()
            ? Math.max(this.leftTopPoint.get_posY(), this.RightBottomPoint.get_posY()) + this.get_depth()
            : this.get_depth();
        var j,
            k = this.leftTopPoint.get_posY() + this.Ct,
            l = this.RightBottomPoint.get_posY() + this.Ct;
        return (
            this.B4
                ? ((j = this.createLine(
                    i - f + this.B3,
                    this.RightBottomPoint.get_posY() + this.get_chamferHeight() - this.B3,
                    i - f,
                    this.RightBottomPoint.get_posY() + this.get_chamferHeight()
                )),
                    this.addShapeToRight(d, j),
                    (j = this.createLine(
                        i - f,
                        this.RightBottomPoint.get_posY() + this.get_chamferHeight(),
                        i - f,
                        l
                    )),
                    this.addShapeToRight(d, j))
                : ((j = this.createLine(i - f, -1, i - f, l)), this.addShapeToRight(d, j)),
            (j = this.createLine(i - f, l, i, l)),
            this.addShapeToRight(d, j),
            (j = this.createLine(i, l, i, g)),
            this.addShapeToRight(d, j),
            (j = this.createLine(i, g, h, g)),
            this.addShapeToBottom(d, j),
            (j = this.createLine(h, g, h, k)),
            this.addShapeToLeft(d, j),
            (j = this.createLine(h, k, h + f, k)),
            this.addShapeToLeft(d, j),
            this.B4
                ? ((j = this.createLine(
                    h + f,
                    k,
                    h + f,
                    this.leftTopPoint.get_posY() + this.get_chamferHeight()
                )),
                    this.addShapeToLeft(d, j),
                    (j = this.createLine(
                        h + f,
                        this.leftTopPoint.get_posY() + this.get_chamferHeight(),
                        h + f - this.B3,
                        this.leftTopPoint.get_posY() + this.get_chamferHeight() - this.B3
                    )),
                    this.addShapeToLeft(d, j))
                : ((j = this.createLine(h + f, k, h + f, -1)), this.addShapeToLeft(d, j)),
            d
        );
    }
}
class GrooveColorit extends GrooveBase {
    static __super__ = GrooveBase;
    __class__ = GrooveColorit;
    static __name__ = ["GrooveColorit"];
    constructor(width, baseProfile) {
        super(width, 0, baseProfile, false);
    }

    _calcShapesWrapper(a, b, c) {
        return null;
    }
}
GrooveColorit.TOLERANCE = .01;
class GrooveDiaCrossPlanar extends GrooveBase {
    static __super__ = GrooveBase;
    __class__ = GrooveDiaCrossPlanar;
    static __name__ = ["GrooveDiaCrossPlanar"];
    constructor(a, b) {
        super(Infinity, a, b, true);
        (this.z2 = b.get_maxX() + 1),
            (this.z1 = b.get_minX() - 1),
            (this.width = this.z2 - this.z1);
    }

    z1 = null;
    z2 = null;
    _calcShapesWrapper(a, b, c) {
        var d = new ShapesWrapper;
        return (
            this.addShapeToRight(d, this.createLine(this.z2, -1, this.z2, this.get_depth())),
            this.addShapeToBottom(d, this.createLine(this.z2, this.get_depth(), this.z1, this.get_depth())),
            this.addShapeToLeft(d, this.createLine(this.z1, this.get_depth(), this.z1, -1)),
            d
        );
    }
}
GrooveDiaCrossPlanar.TOLERANCE = .01;
class GrooveDiaCrossSimple extends GrooveBase {
    static __super__ = GrooveBase;
    __class__ = GrooveDiaCrossSimple;
    static __name__ = ["GrooveDiaCrossSimple"];
    constructor(a, b) {
        super(Infinity, a, b, true);
        (this.z2 = b.get_maxX() + 1),
            (this.z1 = b.get_minX() - 1),
            (this.width = this.z2 - this.z1);
    }

    z1 = null;
    z2 = null;
    _calcShapesWrapper(a, b, c) {
        var d = new ShapesWrapper,
            e = this.get_baseProfile().get_maxX() - this.get_baseProfile().get_minX(),
            f = RingMath.extractXIntersectTopPoint(
                this.get_baseProfile(),
                this.get_baseProfile().get_minX() + 0.2 * e
            ),
            g = RingMath.extractXIntersectTopPoint(
                this.get_baseProfile(),
                this.get_baseProfile().get_minX() + 0.5 * e
            ),
            h = RingMath.extractXIntersectTopPoint(
                this.get_baseProfile(),
                this.get_baseProfile().get_minX() + 0.8 * e
            ),
            i = null;
        if (GeoNumComparor.Equal(g.get_posY(), f.get_posY(), 0.05)) {
            var line = new Line;
            line.initParam(
                this.get_baseProfile().get_maxX() + 0.01,
                h.get_posY() + this.get_depth(),
                this.get_baseProfile().get_minX() - 0.01,
                f.get_posY() + this.get_depth()
            );
            (i = line);
        } else {
            var k = new Point(f.get_posX(), f.get_posY() + this.get_depth()),
                l = new Point(g.get_posX(), g.get_posY() + this.get_depth()),
                m = new Point(h.get_posX(), h.get_posY() + this.get_depth()),
                n = new Circle();
            n.initFromTriangle(k, l, m);
            var o = l.y > k.y,
                p = n.calcPosOnXShape(this.get_baseProfile().get_maxX() + 0.01);
            p.sort(NumComparor.positiveComp);
            var q = n.calcPosOnXShape(this.get_baseProfile().get_minX() - 0.01);
            q.sort(NumComparor.positiveComp);
            var s = o ? p[0] : p[p.length - 1],
                t = o ? q[q.length - 1] : q[0],
                u = new Arc;
            u.initParam(n.get_midX(), n.get_midY(), n.get_radius(), s, t, o ? -1 : 1),
                u.set_invertedNormals(o),
                (i = u);
        }
        var v = new Point(),
            w = new Line;
        i.getPointAtBegin(v), w.initParam(v.x + 1, -1, v.x, v.y);
        var x = new Line;
        return (
            i.getPointAtEnd(v),
            x.initParam(v.x, v.y, v.x - 1, -1),
            i.addMetaData(CutPolyMeta.CUT_FILTER_PART, CutPolyMetaValue.CUT_FILTER_PART_DIAMOND),
            this.addShapeToRight(d, w),
            this.addShapeToBottom(d, i),
            this.addShapeToLeft(d, x),
            d
        );
    }
}
GrooveDiaCrossSimple.TOLERANCE = .01;
class GrooveDiaRect extends GrooveBase {
    static __super__ = GrooveBase;
    __class__ = GrooveDiaRect;
    static __name__ = ["GrooveDiaRect"];
    constructor(a, b, c, d, e) {
        super(a, b, c, false);
        (this.B7 = e),
            (this.B8 = d),
            (this.B3 = 10 * this.B8),
            (this.B4 = this.B8 > 0);
    }

    B3 = null;
    B4 = null;
    B7 = null;
    get_rotateByProfile() {
        return this.B7;
    }
    B8 = null;
    get_chamferHeight() {
        return this.B8;
    }
    _calcShapesWrapper(a, b, c) {
        var d = c * this.get_width(),
            e = RingMath.extractXIntersectTopPoint(this.get_baseProfile(), a);
        this.B7
            ? this.calcBoundPoint(e, d / 2)
            : ((this.leftTopPoint = RingMath.extractXIntersectTopPoint(this.get_baseProfile(), a - d / 2)),
                (this.RightBottomPoint = RingMath.extractXIntersectTopPoint(this.get_baseProfile(), a + d / 2)));
        var f = 0.25 * this.get_depth(),
            g = this.leftTopPoint.get_posX(),
            h = this.RightBottomPoint.get_posX(),
            i = new ShapesWrapper;
        if (this.B4) {
            var j = this.createLine(
                h + this.B3,
                this.RightBottomPoint.get_posY() - this.B3 + this.get_chamferHeight(),
                h,
                this.RightBottomPoint.get_posY() + this.get_chamferHeight()
            );
            this.addShapeToRight(i, j),
                (j = this.createLine(
                    h,
                    this.RightBottomPoint.get_posY() + this.get_chamferHeight(),
                    h,
                    this.RightBottomPoint.get_posY() + f
                )),
                this.addShapeToRight(i, j);
        } else
            this.addShapeToRight(i, this.createLine(h, this.RightBottomPoint.get_posY() - 1, h, this.RightBottomPoint.get_posY() + f));
        var k = this.createLine(h, this.RightBottomPoint.get_posY() + f, g, this.leftTopPoint.get_posY() + f);
        return (
            this.addShapeToBottom(i, k),
            this.B4
                ? ((k = this.createLine(
                    g,
                    this.leftTopPoint.get_posY() + f,
                    g,
                    this.leftTopPoint.get_posY() + this.get_chamferHeight()
                )),
                    this.addShapeToLeft(i, k),
                    (k = this.createLine(
                        g,
                        this.leftTopPoint.get_posY() + this.get_chamferHeight(),
                        g - this.B3,
                        this.leftTopPoint.get_posY() - this.B3 + this.get_chamferHeight()
                    )),
                    this.addShapeToLeft(i, k))
                : ((k = this.createLine(g, this.leftTopPoint.get_posY() + f, g, this.leftTopPoint.get_posY() - 1)),
                    this.addShapeToLeft(i, k)),
            i
        );
    }
}
GrooveDiaRect.TOLERANCE = .01;
class GrooveDiaLeftChanel extends GrooveDiaChannel {
    static __super__ = GrooveBase;
    __class__ = GrooveDiaLeftChanel;
    static __name__ = ["GrooveDiaLeftChanel"];
    constructor(a, b, c, d, e, f, g, h) {
        null == h && (h = 0.9),
            null == g && (g = 0.2),
            null == f && (f = true),
            null == e && (e = true),
            super(a, b, c, d, e, f, g, h);
    }

    _calcShapesWrapper(a, b, c) {
        var d = new ShapesWrapper,
            e = c * this.get_width(),
            f = (e - e * this.Cs) / 2,
            g = null,
            h = null;
        if (this.B7)
            for (
                var i = RingMath.extractYIntersectLeftPoint(this.get_baseProfile(), a),
                j = RingMath.extractCircleIntersects(this.get_baseProfile(), i.get_posX(), i.get_posY(), e / 2),
                k = 0;
                k < j.length;

            )
                j[k].get_posY() > i.get_posY() ? (g = j[k]) : (h = j[k]), ++k;
        else
            (g = RingMath.extractYIntersectLeftPoint(this.get_baseProfile(), a + e / 2)),
                (h = RingMath.extractYIntersectLeftPoint(this.get_baseProfile(), a - e / 2));
        var l = g.get_posY(),
            m = h.get_posY(),
            n = this.get_isDepthRelative()
                ? Math.max(g.get_posX(), h.get_posX()) + this.get_depth()
                : this.get_depth(),
            o = g.get_posX() + this.Ct,
            p = h.get_posX() + this.Ct,
            q = null;
        return (
            this.B4
                ? ((q = this.createLine(
                    p - this.get_chamferHeight() - this.B3,
                    m + f - this.B3,
                    p - this.get_chamferHeight(),
                    m + f
                )),
                    d.addShape(q),
                    (q = this.createLine(p - this.get_chamferHeight(), m + f, p, m + f)),
                    d.addShape(q))
                : ((q = this.createLine(-1, m + f, p, m + f)), d.addShape(q)),
            (q = this.createLine(p, m + f, p, m)),
            d.addShape(q),
            (q = this.createLine(p, m, n, m)),
            d.addShape(q),
            (q = this.createLine(n, m, n, l)),
            d.addShape(q),
            (q = this.createLine(n, l, o, l)),
            d.addShape(q),
            (q = this.createLine(o, l, o, l - f)),
            d.addShape(q),
            this.B4
                ? ((q = this.createLine(o, l - f, o - this.get_chamferHeight(), l - f)),
                    d.addShape(q),
                    (q = this.createLine(
                        o - this.get_chamferHeight(),
                        l - f,
                        o - this.get_chamferHeight() - this.B3,
                        l - f + this.B3
                    )),
                    d.addShape(q))
                : ((q = this.createLine(o, l - f, -1, l - f)), d.addShape(q)),
            d
        );
    }
}
class GrooveRect extends GrooveBase {
    static __super__ = GrooveBase;
    __class__ = GrooveRect;
    static __name__ = ["GrooveRect"];
    constructor(width, depth, baseProfile, grooveChamfer, e, bDepthRelative) {
        super(width, depth, baseProfile, bDepthRelative);
        this.B7 = e;
        this.B8 = grooveChamfer;
        this.B3 = GrooveRect.MAX_NUM_SEGMENTS * this.B8;
        this.B4 = this.B8 > 0;
    }

    B3 = null;
    B4 = null;
    B7 = null;
    get_rotateByProfile() {
        return this.B7;
    }
    B8 = null;
    get_chamferHeight() {
        return this.B8;
    }
    _calcShapesWrapper(posX, b, c) {
        var width = c * this.get_width();
        if (this.B7) {
            this.calcBoundPoint(RingMath.extractXIntersectTopPoint(this.get_baseProfile(), posX), width / 2);
        }
        else {
            this.leftTopPoint = RingMath.extractXIntersectTopPoint(this.get_baseProfile(), posX - width / 2);
            this.RightBottomPoint = RingMath.extractXIntersectTopPoint(this.get_baseProfile(), posX + width / 2);
        }

        var y0, x1, x0;
        if (null != this.leftTopPoint && null != this.RightBottomPoint) {
            if (this.get_isDepthRelative()) {
                y0 = Math.max(this.leftTopPoint.get_posY(), this.RightBottomPoint.get_posY()) + this.get_depth();
            }
            else y0 = this.get_depth();
            x1 = this.leftTopPoint.get_posX();
            x0 = this.RightBottomPoint.get_posX();
        }
        else if (null != this.leftTopPoint) {
            this.B4 = false;
            if (this.get_isDepthRelative()) {
                y0 = this.leftTopPoint.get_posY() + this.get_depth();
            }
            else this.get_depth();
            x1 = this.leftTopPoint.get_posX();
            x0 = RingMath.extractYIntersectRightPoint(this.get_baseProfile(), y0).get_posX() + 0.2;
        }
        else if (null != this.RightBottomPoint) {
            this.B4 = false;
            if (this.get_isDepthRelative()) {
                y0 = this.RightBottomPoint.get_posY() + this.get_depth();
            }
            else this.get_depth();
            x1 = RingMath.extractYIntersectLeftPoint(this.get_baseProfile(), y0).get_posX() - 0.2;
            x0 = this.RightBottomPoint.get_posX();
        }
        else {
            this.B4 = false;
            y0 = this.get_depth();
            var h = RingMath.extractYIntersectedPoints(this.get_baseProfile(), y0);
            x1 = Math.min(h[0].get_posX(), h[1].get_posX()) - 0.2;
            x0 = Math.max(h[0].get_posX(), h[1].get_posX()) + 0.2;
        }
        var shapesWrapper = new ShapesWrapper;
        if (null != this.RightBottomPoint) {
            if (this.B4) {
                var line = this.createLine(
                    x0 + this.B3,
                    this.RightBottomPoint.get_posY() - this.B3 + this.get_chamferHeight(),
                    x0,
                    this.RightBottomPoint.get_posY() + this.get_chamferHeight()
                );
                this.addShapeToRight(shapesWrapper, line);
                line = this.createLine(x0, this.RightBottomPoint.get_posY() + this.get_chamferHeight(), x0, y0);
                this.addShapeToRight(shapesWrapper, line);
            }
            else {
                this.addShapeToRight(shapesWrapper, this.createLine(x0, this.RightBottomPoint.get_posY() - 1, x0, y0));
                // this.addShapeToRight(shapesWrapper, this.createLine(x0, this.RightBottomPoint.get_posY(), x0, y0));
            }
        }

        var bottomLine = this.createLine(x0, y0, x1, y0);
        this.addShapeToBottom(shapesWrapper, bottomLine);
        if (null != this.leftTopPoint)
            if (this.B4) {
                bottomLine = this.createLine(
                    x1,
                    y0,
                    x1,
                    this.leftTopPoint.get_posY() + this.get_chamferHeight()
                );
                this.addShapeToLeft(shapesWrapper, bottomLine);
                bottomLine = this.createLine(
                    x1,
                    this.leftTopPoint.get_posY() + this.get_chamferHeight(),
                    x1 - this.B3,
                    this.leftTopPoint.get_posY() - this.B3 + this.get_chamferHeight()
                );
                this.addShapeToLeft(shapesWrapper, bottomLine);
            }
            else {
                bottomLine = this.createLine(x1, y0, x1, this.leftTopPoint.get_posY() - 1);
                // bottomLine = this.createLine(x1, y0, x1, this.leftTopPoint.get_posY());
                this.addShapeToLeft(shapesWrapper, bottomLine);
            }
        return shapesWrapper;
    }
}
GrooveRect.MAX_NUM_SEGMENTS = 10;
GrooveRect.TOLERANCE = .2;

class GrooveDiaLeftRect extends GrooveRect {
    static __super__ = GrooveRect;
    __class__ = GrooveDiaLeftRect;
    static __name__ = ["GrooveDiaLeftRect"];
    constructor(a, b, c, d, e, f) {
        null == f && (f = true), null == e && (e = false), super(a, b, c, d, e, f);
    }

    _calcShapesWrapper(a, b, c) {
        var d = c * this.get_width(),
            e = null,
            f = null;
        if (this.B7)
            for (
                var g = RingMath.extractYIntersectLeftPoint(this.get_baseProfile(), a),
                h = RingMath.extractCircleIntersects(this.get_baseProfile(), g.get_posX(), g.get_posY(), d / 2),
                i = 0;
                i < h.length;

            )
                h[i].get_posY() > g.get_posY() ? (e = h[i]) : (f = h[i]), ++i;
        else
            (e = RingMath.extractYIntersectLeftPoint(this.get_baseProfile(), a + d / 2)),
                (f = RingMath.extractYIntersectLeftPoint(this.get_baseProfile(), a - d / 2));
        var j = NaN,
            k = NaN,
            l = NaN;
        if (null == e || null == f) throw new Error("Invalid groove shape!");
        (j = Math.max(e.get_posX(), f.get_posX()) + this.get_depth()),
            (k = e.get_posY()),
            (l = f.get_posY());
        var m = new ShapesWrapper;
        return (
            null != f &&
            (this.B4
                ? (m.addShape(
                    this.createLine(
                        f.get_posX() - this.B3 + this.get_chamferHeight(),
                        l - this.B3,
                        f.get_posX() + this.get_chamferHeight(),
                        l
                    )
                ),
                    m.addShape(this.createLine(f.get_posX() + this.get_chamferHeight(), l, j, l)))
                : m.addShape(this.createLine(-1, l, j, l))),
            m.addShape(this.createLine(j, l, j, k)),
            null != e &&
            (this.B4
                ? (m.addShape(this.createLine(j, k, e.get_posX() + this.get_chamferHeight(), k)),
                    m.addShape(
                        this.createLine(
                            e.get_posX() + this.get_chamferHeight(),
                            k,
                            e.get_posX() - this.B3 + this.get_chamferHeight(),
                            k + this.B3
                        )
                    ))
                : m.addShape(this.createLine(j, k, -1, k))),
            m
        );
    }
}
class GrooveDiaRectGrooveCorner extends GrooveBase {
    static __super__ = GrooveBase;
    __class__ = GrooveDiaRectGrooveCorner;
    static __name__ = ["GrooveDiaRectGrooveCorner"];
    constructor(a, b, c, d, e, f) {
        null == f && (f = true),
            null == e && (e = false),
            super(a, b, c, f),
            (this.B7 = e),
            (this.B8 = d),
            (this.B3 = 10 * this.B8),
            (this.B4 = this.B8 > 0);
    }

    B3 = null;
    B4 = null;
    CA = null;
    get_cornerOrientation() {
        return this.CA;
    }
    set_cornerOrientation(a) {
        return (this.CA = a), this.CA;
    }
    B7 = null;
    get_rotateByProfile() {
        return this.B7;
    }
    B8 = null;
    get_chamferHeight() {
        return this.B8;
    }
    CB = null;
    get_isStart() {
        return this.CB;
    }
    set_isStart(a) {
        return (this.CB = a), this.CB;
    }
    _calcShapesWrapper(a, b, c) {
        var d = c * this.get_width();
        if (this.B7) {
            var e = RingMath.extractXIntersectTopPoint(this.get_baseProfile(), a),
                f = RingMath.extractCircleIntersects(this.get_baseProfile(), e.get_posX(), e.get_posY(), d / 2);
            f.sort(Vect2.comparePosY);
            ArrayTool.clear(f, 2, false);
            for (var k = 0; k < f.length;)
                f[k].get_posX() < e.get_posX() ? (this.leftTopPoint = f[k]) : (this.RightBottomPoint = f[k]),
                    ++k;
        }
        var l = this.CB ? d * b : d * (1 - b);
        if (1 == this.get_cornerOrientation())
            if (l > 0)
                for (
                    var m = RingMath.extractCircleIntersects(
                        this.get_baseProfile(),
                        this.leftTopPoint.get_posX(),
                        this.leftTopPoint.get_posY(),
                        l
                    ),
                    n = 0;
                    n < m.length;

                )
                    m[n].get_posX() >= this.leftTopPoint.get_posX() && (this.RightBottomPoint = m[n]), ++n;
            else
                this.RightBottomPoint = new Vect2(
                    this.B4
                        ? this.leftTopPoint.get_posX() - this.get_chamferHeight()
                        : this.leftTopPoint.get_posX(),
                    this.leftTopPoint.get_posY(),
                    this.leftTopPoint.get_normalX(),
                    this.leftTopPoint.get_normalY()
                );
        else if (l > 0)
            for (
                var o = RingMath.extractCircleIntersects(
                    this.get_baseProfile(),
                    this.RightBottomPoint.get_posX(),
                    this.RightBottomPoint.get_posY(),
                    l
                ),
                p = 0;
                p < o.length;

            )
                o[p].get_posX() < this.RightBottomPoint.get_posX() && (this.leftTopPoint = o[p]), ++p;
        else
            this.leftTopPoint = new Vect2(
                this.B4
                    ? this.RightBottomPoint.get_posX() + this.get_chamferHeight()
                    : this.RightBottomPoint.get_posX(),
                this.RightBottomPoint.get_posY(),
                this.RightBottomPoint.get_normalX(),
                this.RightBottomPoint.get_normalY()
            );
        var q, s, t;
        if (null != this.leftTopPoint && null != this.RightBottomPoint)
            (q = this.get_isDepthRelative()
                ? Math.min(this.leftTopPoint.get_posY(), this.RightBottomPoint.get_posY()) + this.get_depth()
                : this.get_depth()),
                (s = this.leftTopPoint.get_posX()),
                (t = this.RightBottomPoint.get_posX());
        else if (null != this.leftTopPoint)
            (q = this.get_isDepthRelative()
                ? this.leftTopPoint.get_posY() + this.get_depth()
                : this.get_depth()),
                (s = this.leftTopPoint.get_posX()),
                (t = RingMath.extractYIntersectRightPoint(this.get_baseProfile(), q).get_posX() + 0.01);
        else if (null != this.RightBottomPoint)
            (q = this.get_isDepthRelative()
                ? this.RightBottomPoint.get_posY() + this.get_depth()
                : this.get_depth()),
                (s = RingMath.extractYIntersectLeftPoint(this.get_baseProfile(), q).get_posX() - 0.01),
                (t = this.RightBottomPoint.get_posX());
        else {
            q = this.get_depth();
            var u = RingMath.extractYIntersectedPoints(this.get_baseProfile(), q);
            (s = Math.min(u[0].get_posX(), u[1].get_posX()) - 0.01),
                (t = Math.max(u[0].get_posX(), u[1].get_posX()) + 0.01);
        }
        var v = new ShapesWrapper;
        return (
            null != this.RightBottomPoint &&
            (this.B4
                ? (v.addShape(
                    this.createLine(
                        t + this.B3,
                        this.RightBottomPoint.get_posY() - this.B3 + this.get_chamferHeight(),
                        t,
                        this.RightBottomPoint.get_posY() + this.get_chamferHeight()
                    )
                ),
                    v.addShape(
                        this.createLine(t, this.RightBottomPoint.get_posY() + this.get_chamferHeight(), t, q)
                    ))
                : v.addShape(this.createLine(t, this.RightBottomPoint.get_posY() - 1, t, q))),
            v.addShape(this.createLine(t, q, s, q)),
            null != this.leftTopPoint &&
            (this.B4
                ? (v.addShape(
                    this.createLine(s, q, s, this.leftTopPoint.get_posY() + this.get_chamferHeight())
                ),
                    v.addShape(
                        this.createLine(
                            s,
                            this.leftTopPoint.get_posY() + this.get_chamferHeight(),
                            s - this.B3,
                            this.leftTopPoint.get_posY() - this.B3 + this.get_chamferHeight()
                        )
                    ))
                : v.addShape(this.createLine(s, q, s, this.leftTopPoint.get_posY() - 1))),
            v
        );
    }
}
GrooveDiaRectGrooveCorner.TOLERANCE = .01;
GrooveDiaRectGrooveCorner.LEFT_CORNER_ORIENTED = 1;
GrooveDiaRectGrooveCorner.RIGHT_CORNER_ORIENTED = 2;
class GrooveDiaRightChannel extends GrooveDiaChannel {
    static __super__ = GrooveDiaChannel;
    __class__ = GrooveDiaRightChannel;
    static __name__ = ["uf"];
    constructor(a, b, c, d, e, f, g, h) {
        null == h && (h = 0.9),
            null == g && (g = 0.2),
            null == f && (f = true),
            null == e && (e = true),
            super(a, b, c, d, e, f, g, h);
    }

    _calcShapesWrapper(a, b, c) {
        var d = new ShapesWrapper,
            e = c * this.get_width(),
            f = (e - e * this.Cs) / 2,
            g = null,
            h = null;
        if (this.B7)
            for (
                var i = RingMath.extractYIntersectRightPoint(this.get_baseProfile(), a),
                j = RingMath.extractCircleIntersects(this.get_baseProfile(), i.get_posX(), i.get_posY(), e / 2),
                k = 0;
                k < j.length;

            )
                j[k].get_posY() > i.get_posY() ? (g = j[k]) : (h = j[k]), ++k;
        else
            (g = RingMath.extractYIntersectLeftPoint(this.get_baseProfile(), a + e / 2)),
                (h = RingMath.extractYIntersectLeftPoint(this.get_baseProfile(), a - e / 2));
        var l = g.get_posY(),
            m = h.get_posY(),
            n = Math.min(g.get_posX(), h.get_posX()) - this.get_depth(),
            o = g.get_posX() - this.Ct,
            p = h.get_posX() - this.Ct,
            q = null;
        return (
            this.B4
                ? ((q = this.createLine(
                    o + this.get_chamferHeight() + this.B3,
                    l - f + this.B3,
                    o + this.get_chamferHeight(),
                    l - f
                )),
                    d.addShape(q),
                    (q = this.createLine(o + this.get_chamferHeight(), l - f, o, l - f)),
                    d.addShape(q))
                : ((q = this.createLine(g.get_posX() + 1, l - f, o, l - f)), d.addShape(q)),
            (q = this.createLine(o, l - f, o, l)),
            d.addShape(q),
            (q = this.createLine(o, l, n, l)),
            d.addShape(q),
            (q = this.createLine(n, l, n, m)),
            d.addShape(q),
            (q = this.createLine(n, m, p, m + f)),
            d.addShape(q),
            this.B4
                ? ((q = this.createLine(p, m + f, p + this.get_chamferHeight(), m + f)),
                    d.addShape(q),
                    (q = this.createLine(
                        p + this.get_chamferHeight(),
                        m + f,
                        p + this.get_chamferHeight() + this.B3,
                        m + f - this.B3
                    )),
                    d.addShape(q))
                : ((q = this.createLine(p, m + f, h.get_posX() + 1, m + f)), d.addShape(q)),
            d
        );
    }
}
class GrooveDiaRightRect extends GrooveRect {
    static __super__ = GrooveRect;
    __class__ = GrooveDiaRightRect;
    static __name__ = ["GrooveDiaRightRect"];
    constructor(a, b, c, d, e, f) {
        null == f && (f = true), null == e && (e = false), super(a, b, c, d, e, f);
    }

    _calcShapesWrapper(a, b, c) {
        var d = c * this.get_width(),
            e = null,
            f = null;
        if (this.B7)
            for (
                var g = RingMath.extractYIntersectRightPoint(this.get_baseProfile(), a),
                h = RingMath.extractCircleIntersects(this.get_baseProfile(), g.get_posX(), g.get_posY(), d / 2),
                i = 0;
                i < h.length;

            )
                h[i].get_posY() > g.get_posY() ? (e = h[i]) : (f = h[i]), ++i;
        else
            (e = RingMath.extractYIntersectLeftPoint(this.get_baseProfile(), a + d / 2)),
                (f = RingMath.extractYIntersectLeftPoint(this.get_baseProfile(), a - d / 2));
        var j = NaN,
            k = NaN,
            l = NaN;
        if (null == e || null == f) throw new Error("Invalid groove shape!");
        (j = Math.min(e.get_posX(), f.get_posX()) - this.get_depth()),
            (k = e.get_posY()),
            (l = f.get_posY());
        var m = new ShapesWrapper;
        return (
            null != f &&
            (this.B4
                ? (m.addShape(
                    this.createLine(
                        e.get_posX() + this.B3 - this.get_chamferHeight(),
                        k + this.B3,
                        e.get_posX() - this.get_chamferHeight(),
                        k
                    )
                ),
                    m.addShape(this.createLine(e.get_posX() - this.get_chamferHeight(), k, j, k)))
                : m.addShape(this.createLine(e.get_posX() + 1, k, j, k))),
            m.addShape(this.createLine(j, k, j, l)),
            null != e &&
            (this.B4
                ? (m.addShape(this.createLine(j, l, f.get_posX() - this.get_chamferHeight(), l)),
                    m.addShape(
                        this.createLine(
                            f.get_posX() - this.get_chamferHeight(),
                            l,
                            f.get_posX() + this.B3 - this.get_chamferHeight(),
                            l - this.B3
                        )
                    ))
                : m.addShape(this.createLine(j, l, f.get_posX() + 1, l))),
            m
        );
    }
}
class GrooveDiaSectionDiamond extends GrooveBase {
    static __super__ = GrooveBase;
    __class__ = GrooveDiaSectionDiamond;
    static __name__ = ["GrooveDiaSectionDiamond"];
    constructor(a, b, c, d, e) {
        super(a, b, c, false),
            (this.B7 = e),
            (this.B8 = d),
            (this.B3 = 10 * this.B8),
            (this.B4 = this.B8 > 0);
    }
    B3 = null;
    B4 = null;
    B7 = null;
    get_rotateByProfile() {
        return this.B7;
    }
    B8 = null;
    get_chamferHeight() {
        return this.B8;
    }
    _calcShapesWrapper(a, b, c) {
        var d = c * this.get_width(),
            e = RingMath.extractXIntersectTopPoint(this.get_baseProfile(), a);
        this.B7
            ? this.calcBoundPoint(e, d / 2)
            : ((this.leftTopPoint = RingMath.extractXIntersectTopPoint(this.get_baseProfile(), a - d / 2)),
                (this.RightBottomPoint = RingMath.extractXIntersectTopPoint(this.get_baseProfile(), a + d / 2)));
        var f = this.get_depth(),
            g = this.leftTopPoint.get_posX(),
            h = this.RightBottomPoint.get_posX(),
            i = new ShapesWrapper;
        if (this.B4) {
            var j = this.createLine(
                h + this.B3,
                this.RightBottomPoint.get_posY() - this.B3 + this.get_chamferHeight(),
                h,
                this.RightBottomPoint.get_posY() + this.get_chamferHeight()
            );
            this.addShapeToRight(i, j),
                (j = this.createLine(
                    h,
                    this.RightBottomPoint.get_posY() + this.get_chamferHeight(),
                    h,
                    this.RightBottomPoint.get_posY() + f
                )),
                this.addShapeToRight(i, j);
        } else
            this.addShapeToRight(i, this.createLine(h, this.RightBottomPoint.get_posY() - 1, h, this.RightBottomPoint.get_posY() + f));
        var k = this.createLine(h, this.RightBottomPoint.get_posY() + f, g, this.leftTopPoint.get_posY() + f);
        return (
            this.addShapeToBottom(i, k),
            this.B4
                ? ((k = this.createLine(
                    g,
                    this.leftTopPoint.get_posY() + f,
                    g,
                    this.leftTopPoint.get_posY() + this.get_chamferHeight()
                )),
                    this.addShapeToLeft(i, k),
                    (k = this.createLine(
                        g,
                        this.leftTopPoint.get_posY() + this.get_chamferHeight(),
                        g - this.B3,
                        this.leftTopPoint.get_posY() - this.B3 + this.get_chamferHeight()
                    )),
                    this.addShapeToLeft(i, k))
                : ((k = this.createLine(g, this.leftTopPoint.get_posY() + f, g, this.leftTopPoint.get_posY() - 1)),
                    this.addShapeToLeft(i, k)),
            i
        );
    }
}
GrooveDiaSectionDiamond.TOLERANCE = .01;
class GrooveU extends GrooveBase {
    static __super__ = GrooveBase;
    __class__ = GrooveU;
    static __name__ = ["GrooveU"];
    constructor(width, depth, baseProfile, grooveChamfer) {//width, depth, baseProfile, grooveChamfer
        super(width, depth, baseProfile, false),//this.get_isDepthRelative()
            (this.B8 = grooveChamfer),
            (this.B3 = GrooveU.MAX_NUM_SEGMENTS * this.B8),
            (this.B4 = this.B8 > 0);
    }

    B3 = null;
    B4 = null;
    B5 = null;
    B6 = null;
    B7 = null;
    get_rotateByProfile() {
        return this.B7;
    }
    B8 = null;
    get_chamferHeight() {
        return this.B8;
    }
    _calcShapesWrapper(a, b, c) {
        var vAC = new Point;
        var vAB = new Point;
        var vAP = new Point;
        var shapesWrapper = new ShapesWrapper,
            e = RingMath.extractXIntersectTopPoint(this.get_baseProfile(), a),
            f = e.get_posY() - this.get_width() / 2 + this.get_depth(),
            g = null,
            h = null,
            i = f + 0.011;
        if (f <= e.get_posY())
            for (
                var j = RingMath.extractCircleIntersects(this.get_baseProfile(), a, f, this.get_width() / 2),
                k = 0;
                k < j.length;

            ) {
                var l = j[k];
                ++k, l.get_posX() < a ? (g = l) : (h = l);
            }
        else
            (h = RingMath.extractXIntersectTopPoint(this.get_baseProfile(), a + this.get_width() / 2)),
                (g = RingMath.extractXIntersectTopPoint(this.get_baseProfile(), a - this.get_width() / 2));
        h.get_posY() < i
            ? vAB.setTo(h.get_posX(), i)
            : vAB.setTo(h.get_posX(), h.get_posY() + 0.011),
            vAC.setTo(e.get_posX(), e.get_posY() + this.get_depth()),
            g.get_posY() < i
                ? vAP.setTo(g.get_posX(), i)
                : vAP.setTo(g.get_posX(), g.get_posY() + 0.011);
        var shape = this.createLine(vAB.x + 0.011, -0.1, vAB.x, vAB.y);
        return (
            this.addShapeToRight(shapesWrapper, shape),
            shape = new Arc,
            ObjMan.__cast(shape, Arc).initFromTriangle(vAB, vAC, vAP),
            shape.set_invertedNormals(true),
            shape.set_resolution(0 | Math.max(3, (shape.get_geometryLength() / 0.1) | 0)),
            shape.set_resolution(shape.get_resolution() > 10 ? 10 : shape.get_resolution()),
            this.addShapeToBottom(shapesWrapper, shape),
            shape = this.createLine(vAP.x, vAP.y, vAP.x - 0.011, -0.1),
            this.addShapeToLeft(shapesWrapper, shape),
            shapesWrapper
        );
    }
}
GrooveU.MAX_SEGMENT_LENGTH_ONARC = .1;
GrooveU.MAX_NUM_SEGMENTS = 10;
GrooveU.TOLERANCE = .01;

class GrooveV extends GrooveBase {
    static __super__ = GrooveBase;
    __class__ = GrooveV;
    static __name__ = ["GrooveV"];
    constructor(width, depth, baseProfile, angle) {
        super(width, depth, baseProfile, true);
        this.B0 = angle;
        var e = (MathConsts.DEG_TO_RAD * angle) / 2;
        (this.mr = Math.sin(e)), (this.ms = Math.cos(e)), (this.ie = new Point());
    }

    ie = null;
    mr = null;
    ms = null;
    B0 = null;
    get_angle() {
        return this.B0;
    }
    _calcShapesWrapper(a, b, c) {
        var d = c * this.get_width();
        try {
            this.leftTopPoint = RingMath.extractXIntersectTopPoint(this.get_baseProfile(), a - d / 2);
        } catch (e) { }
        try {
            this.RightBottomPoint = RingMath.extractXIntersectTopPoint(this.get_baseProfile(), a + d / 2);
        } catch (f) { }
        var g = new ShapesWrapper;
        if (null != this.leftTopPoint && null != this.RightBottomPoint) {
            TriangleMath.getLineIntersection(
                this.leftTopPoint.get_posX(),
                this.leftTopPoint.get_posY(),
                this.leftTopPoint.get_posX() + this.mr,
                this.leftTopPoint.get_posY() + this.ms,
                this.RightBottomPoint.get_posX(),
                this.RightBottomPoint.get_posY(),
                this.RightBottomPoint.get_posX() - this.mr,
                this.RightBottomPoint.get_posY() + this.ms,
                false,
                false,
                this.ie
            );
            var h = this.createLine(this.RightBottomPoint.get_posX(), this.RightBottomPoint.get_posY(), a, this.ie.y);
            this.addShapeToRight(g, h),
                (h = this.createLine(a, this.ie.y, this.leftTopPoint.get_posX(), this.leftTopPoint.get_posY())),
                this.addShapeToLeft(g, h);
        } else if (null != this.leftTopPoint)
            this.addShapeToLeft(
                g,
                this.createLine(
                    this.leftTopPoint.get_posX() + 10 * this.mr,
                    this.leftTopPoint.get_posY() + 10 * this.ms,
                    this.leftTopPoint.get_posX(),
                    this.leftTopPoint.get_posY()
                )
            );
        else {
            if (null == this.RightBottomPoint) throw new Error("Invalid V groove cut!");
            this.addShapeToRight(
                g,
                this.createLine(
                    this.RightBottomPoint.get_posX(),
                    this.RightBottomPoint.get_posY(),
                    this.RightBottomPoint.get_posX() - 10 * this.mr,
                    this.RightBottomPoint.get_posY() + 10 * this.ms
                )
            );
        }
        return g;
    }
}
class GrooveMath {
    __class__ = GrooveMath;
    static __name__ = ["GrooveMath"];
    constructor() { }
    static CompareGroove(a, b) {
        var c = a.grooveEdge.get_startValue(),
            d = b.grooveEdge.get_startValue();
        return d > c ? -1 : c > d ? 1 : 0;
    }
    static regulateGrooves(engravingPosWrapper, grooves) {
        var tmpPosWrapper = new PosWrapper();
        for (var d = 0; d < grooves.length;) {
            var groove = grooves[d],
                start = groove.grooveEdge.get_startValue(),
                end = start + groove.grooveShape.get_width() / 2;
            tmpPosWrapper.set_start(start - groove.grooveShape.get_width() / 2);
            tmpPosWrapper.set_end(end);
            tmpPosWrapper.contains(engravingPosWrapper) && (grooves.splice(d, 1), --d);
            ++d;
        }
    }
    static extractGrooveShapes(shapesWrapper, grooveUID) {
        var myMap = new MyMap();
        var d = new Array(0);
        var count = shapesWrapper.get_numOfShapes();
        for (var id = 0; count > id; id++) {
            var shape = shapesWrapper.getShapeAt(id);
            if (shape.getMetadata(GrooveMeta.GROOVE_UID) == grooveUID) {
                var key = MetaKeyGenerator.generateMetaKey(GrooveMath.BA, shape);
                var newShapesWrapper = (null != globalMap[key]) ? myMap.getReserved(key) : myMap.map[key];
                if (null == newShapesWrapper) {
                    newShapesWrapper = new ShapesWrapper;
                    null != globalMap[key] ? myMap.setReserved(key, newShapesWrapper) : myMap.map[key] = newShapesWrapper;
                }
                newShapesWrapper.addShape(shape);
            }
        }
        var kMap = new KMap(myMap, myMap.arrayKeys());
        for (; kMap.hasNext();)
            d.push(kMap.next());

        return d;
    }
}
GrooveMath.BA = [SliceMeta.SLICE_INDEX, SliceMeta.SLICE_V_DIRECTION];

class GrooveEdgeBase {
    __class__ = GrooveEdgeBase;
    static __name__ = ["GrooveEdgeBase"];
    endValue = 0;
    isStraight = 0;
    startValue = 0;
    horizontalShift = 0;

    constructor() {
    }
    get_endValue() { return this.endValue }
    get_isStraight() { return this.isStraight }
    get_startValue() { return this.startValue }
    get_horizontalShift() { return this.horizontalShift }
    set_horizontalShift(a) {
        this.horizontalShift = a;
        this.startValue = this.get_SinePos(0);
        this.endValue = this.get_SinePos(1);
        return this.horizontalShift
    }
    get_SinePos(a) {
        throw new Error("This is an abstract method, you must override this!")
    }
    clone() {
        throw new Error("This is an abstract method, you must override this!")
    }
    calcShiftAngleOnSurface(prevShiftAngle, prevOffset, gapDistance) {
        throw new Error("This is an abstract method, you must override this!")
    }
    getDerivative(a) {
        throw new Error("This is an abstract method, you must override this!")
    }
    get_SinePosArray(count, fromAngle, toAngle) {
        null == toAngle && (toAngle = 1);
        null == fromAngle && (fromAngle = 0);
        var d = new Array(0);
        var delta = (toAngle - fromAngle) / count;
        for (var k = 0; count >= k; k++)
            d[k] = this.get_SinePos(fromAngle + delta * k);
        return d
    };
    vW(a, b, c) {
        null == c && (c = 1),
            null == b && (b = 0);
        for (var d = new Array(0), e = (c - b) / a, f = 0; a >= f;)
            d[f] = this.getDerivative(b + e * f), ++f;
        return d
    }
    vX(a) { throw new Error("This is an abstract method, you must override this!") }
    aO(a) { throw new Error("This is an abstract method, you must override this!") }
}
class Edges extends GrooveEdgeBase {
    static __super__ = GrooveEdgeBase;
    __class__ = Edges;
    static __name__ = ["Edges"];
    constructor(derivative, horizontalShift) {
        super();
        this.derivative = derivative;
        this.horizontalShift = horizontalShift;
        this.startValue = this.get_SinePos(0);
        this.endValue = this.get_SinePos(1);
        this.isStraight = (0 == derivative);
    }
    static v2(a, b, c, d) {
        if (a == c) throw new Error("Ax != setMetaDataMap: " + a + " - " + c);
        var e = (d - b) / (c - a);
        return new Edges(e, -e * a + b)
    }
    derivative = 0;
    get_derivative() { return this.derivative }
    set_derivative(a) { return this.derivative = a, this.derivative }
    get_SinePos(a) {
        var horizontalShift = (this.horizontalShift == NaN) ? 0 : this.horizontalShift;
        return a * this.derivative + horizontalShift;
    }
    calcShiftAngleOnSurface(prevShiftAngle, prevOffset, gapDistance) {
        var d = this.derivative * this.derivative + 1,
            e = 2 * (this.derivative * this.horizontalShift - this.derivative * prevOffset - prevShiftAngle),
            f = e * e - 4 * d * (prevOffset * prevOffset - gapDistance * gapDistance + prevShiftAngle * prevShiftAngle - 2 * this.horizontalShift * prevOffset + this.horizontalShift * this.horizontalShift);

        if (0 > f) return null;
        var g, h = Math.sqrt(f),
            i = 2 * d,
            j = (-e + h) / i;
        0 == f ? (g = new Array(1), g[0] = j) : (g = new Array(2), g[0] = j, g[1] = (-e - h) / i);
        return g
    }
    getDerivative(a) { return this.derivative }
    clone() { return new Edges(this.derivative, this.horizontalShift) }
    aO(a) { }
    vX(a) {
        this.set_horizontalShift(this.get_horizontalShift() + a)
    }
    v_(a) {
        this.set_horizontalShift(this.horizontalShift - this.derivative * a)
    }
}
class Grooves extends GrooveEdgeBase {
    static __super__ = GrooveEdgeBase;
    __class__ = Grooves;
    static __name__ = ["Grooves"];
    amplitude = null;
    numOfCicles = null;
    verticalShift = null;
    constructor(a, b, c, d) {
        super();
        this.numOfCicles = a,
            this.amplitude = b,
            this.horizontalShift = c,
            this.verticalShift = d,
            this.startValue = this.get_SinePos(0),
            this.endValue = this.get_SinePos(1),
            this.isStraight = 0 == a || 0 == b
    }
    get_amplitude() { return this.amplitude }
    get_numOfCicles() { return this.numOfCicles }
    get_verticalShift() { return this.verticalShift }
    get_SinePos(a) {
        return Math.sin(a * this.numOfCicles * MathConsts.TAU + this.verticalShift) * this.amplitude + this.horizontalShift
    }
    calcShiftAngleOnSurface(prevShiftAngle, prevOffset, gapDistance) {
        new Array(0);
        var delta = gapDistance, bias = gapDistance, criteria = gapDistance * gapDistance;
        for (var iterNum = 0; 10 > iterNum; iterNum++) {
            var shiftAngle = prevShiftAngle + delta,
                dAngle = shiftAngle - prevShiftAngle,
                dOffset = this.get_SinePos(shiftAngle) - prevOffset,
                dist = dAngle * dAngle + dOffset * dOffset;
            bias /= 2;
            if (dist > criteria)
                delta -= bias;
            else {
                if (!(criteria > dist))
                    break;
                delta += bias
            }
        }
        var l = new Array(1);
        l[0] = prevShiftAngle + delta;
        return l
    }
    getDerivative(a) {
        return MathConsts.TAU * this.amplitude * this.numOfCicles * Math.cos(a * this.numOfCicles * MathConsts.TAU + this.verticalShift)
    }
    clone() {
        return new Grooves(this.numOfCicles, this.amplitude, this.horizontalShift, this.verticalShift)
    }
    aO(a) { this.numOfCicles *= a }
}
class GrooveEdge {
    __class__ = GrooveEdge;
    static __name__ = ["GrooveEdge"];
    static getInstance(middleShape) {
        var b;
        if (null != middleShape.sine && 0 != middleShape.sine.amplitude && middleShape.sine.numberOfCycles > 0) {
            b = new Grooves(middleShape.sine.numberOfCycles, middleShape.sine.amplitude, middleShape.offset, middleShape.sine.shiftAngle)
        }
        else {
            b = new Edges(middleShape.derivative, middleShape.offset);
        }
        return b
    }
}
class GrooveBuilder {
    static makeGrooves(grooveConfigs, shapesWrapper) {
        if (null == grooveConfigs || 0 == grooveConfigs.length) return null;
        var count = grooveConfigs.length;
        var grooveArray = new Array(count);
        for (var k = 0; k < grooveConfigs.length; k++) {
            var groove = grooveConfigs[k],
                grooveEdge = GrooveEdge.getInstance(groove.middleShape);
            grooveArray[k] = GrooveBuilder.buildGroove(
                groove.type, k, groove.width, groove.depth,
                grooveEdge, shapesWrapper, groove.angle,
                false, true, GrooveBuilder.DEFAULT_GROOVE_CHAMFER
            );
        }
        grooveArray.sort(GrooveMath.CompareGroove);
        return grooveArray;
    }
    static buildDiaGroove(grooveType, sizeX, sizeY, grooveEdge, midLine, shape, g, h, diamondGroupIndex, diamond) {
        var grooveWrapper = new GrooveWrapper();
        grooveWrapper.grooveEdge = grooveEdge;
        var metaDataMap = new MetaDataMap();
        grooveWrapper.grooveUID = diamond;
        metaDataMap.addMetaData(GrooveMeta.GROOVE_UID, grooveWrapper.grooveUID);
        metaDataMap.addMetaData(DiamondMeta.DIAMOND_GROUP_INDEX, diamondGroupIndex);
        if (grooveType == DiaGrooveEnum.Rect)
            grooveWrapper.grooveShape = new GrooveDiaRect(sizeX, sizeY, midLine, 0.05, shape);
        else if (grooveType == DiaGrooveEnum.Channel) {
            grooveWrapper.grooveShape = new GrooveDiaChannel(sizeX, sizeY, midLine, true, shape, g, h);
            metaDataMap.addMetaData(DiamondMeta.DIAMOND_PART, DiamondMetaValue.DIAMOND_PART_CHANNEL);
        }
        else if (grooveType == DiaGrooveEnum.CrossSimple) {
            (grooveWrapper.grooveShape = new GrooveDiaCrossSimple(sizeY, midLine));
            metaDataMap.addMetaData(DiamondMeta.DIAMOND_PART, DiamondMetaValue.DIAMOND_PART_CHANNEL);
        }
        else if (grooveType == DiaGrooveEnum.CrossPlanar)
            grooveWrapper.grooveShape = new GrooveDiaCrossPlanar(sizeY, midLine);
        else if (grooveType == DiaGrooveEnum.LeftRect) {
            (grooveWrapper.grooveShape = new GrooveDiaLeftRect(sizeX, sizeY, midLine, 0.05, shape, g));
            metaDataMap.addMetaData(DiamondMeta.DIAMOND_PART, DiamondMetaValue.DIAMOND_PART_SOCKET);
        }
        else if (grooveType == DiaGrooveEnum.LeftChannel) {
            (grooveWrapper.grooveShape = new GrooveDiaLeftChanel(sizeX, sizeY, midLine, true, shape, true, h));
            metaDataMap.addMetaData(DiamondMeta.DIAMOND_PART, DiamondMetaValue.DIAMOND_PART_CHANNEL);
        }
        else if (grooveType == DiaGrooveEnum.RightRect) {
            (grooveWrapper.grooveShape = new GrooveDiaRightRect(sizeX, sizeY, midLine, 0.05, shape, g));
            metaDataMap.addMetaData(DiamondMeta.DIAMOND_PART, DiamondMetaValue.DIAMOND_PART_SOCKET);
        }
        else if (grooveType == DiaGrooveEnum.RightChannel) {
            (grooveWrapper.grooveShape = new GrooveDiaRightChannel(sizeX, sizeY, midLine, true, shape, true, h));
            metaDataMap.addMetaData(DiamondMeta.DIAMOND_PART, DiamondMetaValue.DIAMOND_PART_CHANNEL);
        }
        else if (grooveType == DiaGrooveEnum.RectGrooveCorner) {
            (grooveWrapper.grooveShape = new GrooveDiaRectGrooveCorner(sizeX, sizeY, midLine, 0.05, shape, g));
            metaDataMap.addMetaData(DiamondMeta.DIAMOND_PART, DiamondMetaValue.DIAMOND_PART_SOCKET);
        }
        else if (grooveType == DiaGrooveEnum.SectionDiamond) {
            (grooveWrapper.grooveShape = new GrooveDiaSectionDiamond(sizeX, sizeY, midLine, 0.2, shape)),
                metaDataMap.addMetaData(DiamondMeta.DIAMOND_PART, DiamondMetaValue.DIAMOND_PART_SOCKET);
        }
        else if (grooveType == DiaGrooveEnum.SectionDiamondLeft) {
            (grooveWrapper.grooveShape = new GrooveDiaLeftRect(sizeX, sizeY, midLine, 0.2, shape, g));
            metaDataMap.addMetaData(DiamondMeta.DIAMOND_PART, DiamondMetaValue.DIAMOND_PART_SOCKET);
        }
        else {
            if (grooveType != DiaGrooveEnum.SectionDiamondRight)
                throw new Error("Invalid profile type: " + Std.string(grooveType));
            (grooveWrapper.grooveShape = new GrooveDiaRightRect(sizeX, sizeY, midLine, 0.2, shape, g));
            metaDataMap.addMetaData(DiamondMeta.DIAMOND_PART, DiamondMetaValue.DIAMOND_PART_SOCKET);
        }
        grooveWrapper.grooveShape.setMetaDataMap(metaDataMap);
        return grooveWrapper;
    }
    static buildGroove(grooveType, grooveIndex, width, depth, grooveEdge, baseProfile, angle, h, bDepthRelative, grooveChamfer) {
        var grooveWrapper = new GrooveWrapper();
        grooveWrapper.grooveEdge = grooveEdge;
        var metaDataMap = new MetaDataMap();
        grooveWrapper.grooveUID = {};
        metaDataMap.addMetaData(GrooveMeta.GROOVE_UID, grooveWrapper.grooveUID);
        metaDataMap.addMetaData(GrooveMeta.GROOVE_INDEX, grooveIndex);
        metaDataMap.addMetaData(GrooveMeta.GROOVE_TYPE, grooveType);
        if (grooveType == GrooveConfigTypeEnum.RECT)
            grooveWrapper.grooveShape = new GrooveRect(width, depth, baseProfile, grooveChamfer, h, bDepthRelative);
        else if (grooveType == GrooveConfigTypeEnum.FACED_RECT)
            grooveWrapper.grooveShape = new GrooveRect(width, depth, baseProfile, grooveChamfer, h, bDepthRelative);
        else if (grooveType == GrooveConfigTypeEnum.V)
            grooveWrapper.grooveShape = new GrooveV(width, depth, baseProfile, angle);
        else if (grooveType == GrooveConfigTypeEnum.U)
            grooveWrapper.grooveShape = new GrooveU(width, depth, baseProfile, grooveChamfer);
        else if (grooveType == GrooveConfigTypeEnum.BUMP)
            grooveWrapper.grooveShape = new GrooveBump(width, depth, baseProfile, grooveChamfer);
        else {
            if (grooveType != GrooveConfigTypeEnum.COLORIT)
                throw new Error("Invalid profile type: " + grooveType.get_value());
            grooveWrapper.grooveShape = new GrooveColorit(width, baseProfile);
        }
        grooveWrapper.grooveShape.setMetaDataMap(metaDataMap);
        return grooveWrapper;
    }
}
GrooveBuilder.DEFAULT_GROOVE_CHAMFER = .05;

export {
    Edges, GrooveColorit, GrooveEdge, GrooveBuilder, GrooveMath
}
