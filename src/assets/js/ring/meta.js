/* eslint-disable no-unused-expressions */
import {
    ObjMan, StringUtil, Std, Int, Float, Bool
} from "./objman.js"
import {
    globalMap, MyMap
} from "./map.js"
import {
    ErrorWrap
} from "./error.js"
import { Rectangle } from './geometry';
class CapMeshMeta {
    constructor() { }
}
CapMeshMeta.CAP_MESH = "capMesh";

class CapMeshMetaValue {
    constructor() { }
}
CapMeshMetaValue.CAP_START = "capStart";
CapMeshMetaValue.CAP_END = "capEnd";

class CutPolyMeta {
    constructor() { }
}
CutPolyMeta.CUT_FILTER_PART = "cutPolyFilterPart";

class CutPolyMetaValue {
    constructor() { }
}
CutPolyMetaValue.CUT_FILTER_PART_ENGRAVING = "cutPolyFilterEngraving";
CutPolyMetaValue.CUT_FILTER_PART_DIAMOND = "cutPolyFilterDiamond";

class DiamondMeta {
    constructor() { }
}
DiamondMeta.DIAMOND_PART = "diamondPart";
DiamondMeta.DIAMOND_INDEX = "diamondIndex";
DiamondMeta.DIAMOND_GROUP_INDEX = "diamondGroupIndex";

class DiamondMetaValue {
    constructor() { }
}
DiamondMetaValue.DIAMOND_PART_CHANNEL = "channel";
DiamondMetaValue.DIAMOND_PART_SECTION = "section";
DiamondMetaValue.DIAMOND_PART_SOCKET = "socket";
DiamondMetaValue.DIAMOND_PART_HOLE = "middleShape";
DiamondMetaValue.DIAMOND_PART_STONE = "stone";

class EngravingMeta {
    constructor() { }
}
EngravingMeta.ENGRAVING_PART = "engravingPart";
EngravingMeta.ENGRAVING_CARVE_TYPE = "engravingCarveType";
EngravingMeta.ENGRAVING_UID = "engravingUID";

class EngravingMetaValue {
    constructor() { }
}
EngravingMetaValue.ENGRAVING_PART_ENGRAVING = "engraving";
EngravingMetaValue.ENGRAVING_PART_SURFACE = "surface";

class GapMeta {
    constructor() { }
}
GapMeta.GAP_UID = "gapUID";
GapMeta.GAP_TYPE = "gapType";

class GrooveMeta {
    constructor() { }
}
GrooveMeta.GROOVE_UID = "grooveUID";
GrooveMeta.GROOVE_INDEX = "grooveIndex";
GrooveMeta.GROOVE_PART = "groovePart";
GrooveMeta.GROOVE_TYPE = "grooveType";

class GrooveMetaValue {
    constructor() { }
}
GrooveMetaValue.GROOVE_PART_BOTTOM = "bottom";
GrooveMetaValue.GROOVE_PART_CHAMFER = "chamfer";
GrooveMetaValue.GROOVE_PART_SIDE_LEFT = "sideLeft";
GrooveMetaValue.GROOVE_PART_SIDE_RIGHT = "sideRight";

class ProfileMeta {
    constructor() { }
}
ProfileMeta.PROFILE_SURFACE = "profileSurface";
ProfileMeta.PROFILE_HIDDEN = "profileHidden";

class ProfileMetaValue {
    constructor() { }
}
ProfileMetaValue.PROFILE_SURFACE_OUTER = "outer";
ProfileMetaValue.PROFILE_SURFACE_INNER = "inner";

class SegmentMeta {
    constructor() { }
}
SegmentMeta.SEGMENT_INDEX = "segmentIndex";

class SliceMeta {
    constructor() { }
}
SliceMeta.SLICE_V_DIRECTION = "sliceVDirection";
SliceMeta.SLICE_H_DIRECTION = "sliceHDirection";
SliceMeta.SLICE_INDEX = "sliceIndex";

class SliceMetaValue {
    constructor() { }
}
SliceMetaValue.SLICE_V_DIRECTION_RIGHT = "right";
SliceMetaValue.SLICE_V_DIRECTION_LEFT = "left";
SliceMetaValue.SLICE_H_DIRECTION_BOTTOM = "bottom";
SliceMetaValue.SLICE_H_DIRECTION_TOP = "top";

class TranslationMeta {
    constructor() { }
}
TranslationMeta.TRANSLATION_KEY = "translationKey";

class SurfaceMeta {
    constructor() { }
}
SurfaceMeta.SURFACE_ID = "surfaceUID";

class DiamondSurfaceType {
    constructor() { }
}
DiamondSurfaceType.CHANNEL = "channel";
DiamondSurfaceType.RUBBED = "rubbed";
DiamondSurfaceType.SECTION = "section";
DiamondSurfaceType.RUBBED_EDGELESS = "rubbed_edgeless";
DiamondSurfaceType.NULL = "null";
DiamondSurfaceType.MEMOIRE1 = "memoire1";
DiamondSurfaceType.MEMOIRE2 = "memoire2";
DiamondSurfaceType.MEMOIRE3 = "memoire3";
DiamondSurfaceType.MEMOIRE4 = "memoire4";
DiamondSurfaceType.CUSTOM_PRONG = "memoire4";
DiamondSurfaceType.SECTION_INSET = "sectionInset";
DiamondSurfaceType.SECTION_SHARED = "sectionShared";

class DiamondPlacementType {
    constructor() { }
}
DiamondPlacementType.LEFT_SIDE = "leftSide";
DiamondPlacementType.VERTICAL = "vertical";
DiamondPlacementType.HORIZONTAL = "hotizontal";
DiamondPlacementType.RIGHT_SIDE = "rightSide";

class DiamondGrooveType {
    constructor() { }
}
DiamondGrooveType.RECTANGLE = "rectangle";
DiamondGrooveType.ROUND = "round";
DiamondGrooveType.CUSTOM = "custom";

class BlendMode {
    constructor() { }
    static SOURCE_OVER = "source-over";
    static SOURCE_IN = "source-in";
    static SOURCE_OUT = "source-out";
    static SOURCE_ATOP = "source-atop";
    static DESTINATION_OVER = "destination-over";
    static DESTINATION_IN = "destination-in";
    static DESTINATION_OUT = "destination-out";
    static DESTINATION_ATOP = "destination-atop";
    static LIGHTER = "lighter";
    static COPY = "copy";
    static XOR = "xor";
    static MULTIPLY = "multiply";
    static SCREEN = "screen";
    static OVERLAY = "overlay";
    static DARKEN = "darken";
    static LIGHTEN = "lighten";
    static COLOR_DODGE = "color-dodge";
    static COLOR_BURN = "color-burn";
    static HARD_LIGHT = "hard-light";
    static SOFT_LIGHT = "soft-light";
    static DIFFERENCE = "difference";
    static EXCLUSION = "exclusion";
    static HUE = "hue";
    static SATURATION = "saturation";
    static COLOR = "color";
    static LUMINOSITY = "luminosity";
}

class MathConsts {
    constructor() { }
    static TAU = 2 * Math.PI;
    static RAD_TO_DEG = 180 / Math.PI;
    static DEG_TO_RAD = Math.PI / 180;
    static POSITIVE_INFINITY = 1 / 0;
    static NEGATIVE_INFINITY = -1 / 0;
    static INT_MIN = -2147483648;
    static INT_MAX = 2147483647;
    static FLOAT_MIN = -1.79769313486231e308;
    static FLOAT_MAX = 1.79769313486231e308;
}

//////////////////////////////////////////////////////////////////////////////////
class Type {
    constructor() { }
}
Type.getSuperClass = function (a) { return a.__super__ }
Type.getClassName = function (a) {
    var b = a.__name__; return null == b ? null : b.join(".")
}
Type.getInstanceFields = function (a) {
    var b = [];
    for (var c in a.prototype) b.push(c);
    return StringUtil.remove(b, "__class__"), StringUtil.remove(b, "__properties__"), b
};



class EnumHX {
    __class__ = EnumHX;
    static __name__ = ["EnumHX"];

    value = null;
    constructor(a) {
        this.value = a;
        // EnumHX.registerClass(this);
    }

    get_value() {
        return this.value;
    }

    toString() {
        return this.value;
    }

    static forValue(a, b) {
        var c = Type.getClassName(a) + "@" + b,
            d = EnumHX.myMap;
        if (null != (null != globalMap[c] ? d.getReserved(c) : d.map[c])) {
            var e = EnumHX.myMap;
            return null != globalMap[c] ? e.getReserved(c) : e.map[c];
        }
        throw new Error("EnumHX " + c + " not registered");
    }

    static registerClass(a) {
        var b = Type.getClassName(null == a ? null : ObjMan.getClass(a)) + "@" + a.get_value();
        if (null != (null != globalMap[b] ? EnumHX.myMap.getReserved(b) : EnumHX.myMap.map[b]))
            throw new Error("EnumHX " + b + " already registered");
        null != globalMap[b] ? EnumHX.myMap.setReserved(b, a) : (EnumHX.myMap.map[b] = a);
    }
}
EnumHX.myMap = new MyMap;

class CoordinateSystemPlane extends EnumHX {
    __class__ = CoordinateSystemPlane;
    static __super__ = EnumHX;
    static __name__ = ["CoordinateSystemPlane"];
    constructor(a) {
        super(a);
        EnumHX.registerClass(this);
    }
}
CoordinateSystemPlane.XY = new CoordinateSystemPlane("xy");
CoordinateSystemPlane.XZ = new CoordinateSystemPlane("xz");
CoordinateSystemPlane.YZ = new CoordinateSystemPlane("yz");

class TextAlign extends EnumHX {
    __class__ = TextAlign;
    static __super__ = EnumHX;
    static __name__ = ["TextAlign"];
    constructor(a) {
        super(a);
        EnumHX.registerClass(this);
    }
}
TextAlign.Center = new TextAlign("center");
TextAlign.Top = new TextAlign("top");
TextAlign.Bottom = new TextAlign("bottom");
TextAlign.Middle = new TextAlign("middle");

class DiamondProngTypeEnum extends EnumHX {
    __class__ = DiamondProngTypeEnum;
    static __super__ = EnumHX;
    static __name__ = ["DiamondProngTypeEnum"];
    constructor(a) {
        super(a);
        EnumHX.registerClass(this);
    }
}
DiamondProngTypeEnum.SECTION = new DiamondProngTypeEnum(DiamondMetaValue.DIAMOND_PART_SECTION);
DiamondProngTypeEnum.SECTION_INSET = new DiamondProngTypeEnum("sectionInset");
DiamondProngTypeEnum.SECTION_SHARED = new DiamondProngTypeEnum("sectionShared");
DiamondProngTypeEnum.SECTION_SHARED_BASE = new DiamondProngTypeEnum("sectionSharedBase");
DiamondProngTypeEnum.PRONG_SIMPLE = new DiamondProngTypeEnum("prong_simple");
DiamondProngTypeEnum.PRONG_TRIANGLE = new DiamondProngTypeEnum("prong_triangle");

class DiamondTypeEnum extends EnumHX {
    __class__ = DiamondTypeEnum;
    static __super__ = EnumHX;
    static __name__ = ["DiamondTypeEnum"];
    constructor(a) {
        super(a);
        EnumHX.registerClass(this);
    }
}
DiamondTypeEnum.PRINCESS = new DiamondTypeEnum("princess");
DiamondTypeEnum.BAGUETTE = new DiamondTypeEnum("baguette");
DiamondTypeEnum.ROUND = new DiamondTypeEnum(DiamondGrooveType.ROUND);
DiamondTypeEnum.DECOR = new DiamondTypeEnum("decor");
DiamondTypeEnum.CUSTOM = new DiamondTypeEnum(DiamondGrooveType.CUSTOM);

class DrillTypeEnum extends EnumHX {
    __class__ = DrillTypeEnum;
    static __super__ = EnumHX;
    static __name__ = ["DrillTypeEnum"];
    constructor(a) {
        super(a);
        EnumHX.registerClass(this);
    }
}
DrillTypeEnum.PRINCESS = new DrillTypeEnum("princess");
DrillTypeEnum.BAGUETTE = new DrillTypeEnum("baguette");
DrillTypeEnum.ROUND = new DrillTypeEnum(DiamondGrooveType.ROUND);
DrillTypeEnum.DECOR = new DrillTypeEnum("decor");
DrillTypeEnum.CUSTOM = new DrillTypeEnum(DiamondGrooveType.CUSTOM);
DrillTypeEnum.ROUND_EDGELESS = new DrillTypeEnum("round_edgeless");
DrillTypeEnum.PRINCESS_EDGELESS = new DrillTypeEnum("princess_edgeless");
DrillTypeEnum.BAGUETTE_EDGELESS = new DrillTypeEnum("baguette_edgeless");
DrillTypeEnum.MEMOIRE1 = new DrillTypeEnum(DiamondSurfaceType.MEMOIRE1);
DrillTypeEnum.MEMOIRE2 = new DrillTypeEnum("memoire2");
DrillTypeEnum.MEMOIRE3 = new DrillTypeEnum("memoire3");
DrillTypeEnum.MEMOIRE4 = new DrillTypeEnum("memoire4");

class DiamondGroupConfigOrientationEnum extends EnumHX {
    __class__ = DiamondGroupConfigOrientationEnum;
    static __super__ = EnumHX;
    static __name__ = ["DiamondGroupConfigOrientationEnum"];
    constructor(a) {
        super(a);
        EnumHX.registerClass(this);
    }
}
DiamondGroupConfigOrientationEnum.LEFT = new DiamondGroupConfigOrientationEnum(SliceMetaValue.SLICE_V_DIRECTION_LEFT);
DiamondGroupConfigOrientationEnum.CROSS = new DiamondGroupConfigOrientationEnum("cross");
DiamondGroupConfigOrientationEnum.SURFACE = new DiamondGroupConfigOrientationEnum(EngravingMetaValue.ENGRAVING_PART_SURFACE);
DiamondGroupConfigOrientationEnum.RIGHT = new DiamondGroupConfigOrientationEnum(SliceMetaValue.SLICE_V_DIRECTION_RIGHT);

class DiamondGroupConfigSettingEnum extends EnumHX {
    __class__ = DiamondGroupConfigSettingEnum;
    static __super__ = EnumHX;
    static __name__ = ["DiamondGroupConfigSettingEnum"];
    constructor(a) {
        super(a);
        EnumHX.registerClass(this);
    }
}
DiamondGroupConfigSettingEnum.CHANNEL = new DiamondGroupConfigSettingEnum(DiamondMetaValue.DIAMOND_PART_CHANNEL);
DiamondGroupConfigSettingEnum.RUBBED = new DiamondGroupConfigSettingEnum(DiamondSurfaceType.RUBBED);
DiamondGroupConfigSettingEnum.SECTION = new DiamondGroupConfigSettingEnum(DiamondMetaValue.DIAMOND_PART_SECTION);
DiamondGroupConfigSettingEnum.RUBBED_EDGELESS = new DiamondGroupConfigSettingEnum(DiamondSurfaceType.RUBBED_EDGELESS);
DiamondGroupConfigSettingEnum.NULL = new DiamondGroupConfigSettingEnum(DiamondSurfaceType.NULL);
DiamondGroupConfigSettingEnum.MEMOIRE1 = new DiamondGroupConfigSettingEnum(DiamondSurfaceType.MEMOIRE1);
DiamondGroupConfigSettingEnum.MEMOIRE2 = new DiamondGroupConfigSettingEnum("memoire2");
DiamondGroupConfigSettingEnum.MEMOIRE3 = new DiamondGroupConfigSettingEnum("memoire3");
DiamondGroupConfigSettingEnum.MEMOIRE4 = new DiamondGroupConfigSettingEnum("memoire4");
DiamondGroupConfigSettingEnum.MEMOIRE5 = new DiamondGroupConfigSettingEnum("memoire5");
DiamondGroupConfigSettingEnum.MEMOIRE6 = new DiamondGroupConfigSettingEnum("memoire6");
DiamondGroupConfigSettingEnum.SECTION_INSET = new DiamondGroupConfigSettingEnum("sectionInset");
DiamondGroupConfigSettingEnum.SECTION_SHARED = new DiamondGroupConfigSettingEnum("sectionShared");
DiamondGroupConfigSettingEnum.CUSTOM_PRONG = new DiamondGroupConfigSettingEnum("custom_prong");

class StoneConfigColorEnum extends EnumHX {
    __class__ = StoneConfigColorEnum;
    static __super__ = EnumHX;
    static __name__ = ["StoneConfigColorEnum"];
    constructor(a) {
        super(a);
        EnumHX.registerClass(this);
    }
}
StoneConfigColorEnum.WHITE = new StoneConfigColorEnum("white");

class StoneConfigCutEnum extends EnumHX {
    __class__ = StoneConfigCutEnum;
    static __super__ = EnumHX;
    static __name__ = ["StoneConfigCutEnum"];
    constructor(a) {
        super(a);
        EnumHX.registerClass(this);
    }
}
StoneConfigCutEnum.PRINCESS = new StoneConfigCutEnum("princess");
StoneConfigCutEnum.BAGUETTE = new StoneConfigCutEnum("baguette");
StoneConfigCutEnum.BRILLIANT = new StoneConfigCutEnum("brilliant");
StoneConfigCutEnum.DECOR = new StoneConfigCutEnum("decor");
StoneConfigCutEnum.CUSTOM = new StoneConfigCutEnum(DiamondGrooveType.CUSTOM);

class EngravingLayoutVerticalAlignEnum extends EnumHX {
    __class__ = EngravingLayoutVerticalAlignEnum;
    static __super__ = EnumHX;
    static __name__ = ["EngravingLayoutVerticalAlignEnum"];
    constructor(a) {
        super(a);
        EnumHX.registerClass(this);
    }
}
EngravingLayoutVerticalAlignEnum.TOP = new EngravingLayoutVerticalAlignEnum("top");
EngravingLayoutVerticalAlignEnum.BOTTOM = new EngravingLayoutVerticalAlignEnum(SliceMetaValue.SLICE_H_DIRECTION_BOTTOM);
EngravingLayoutVerticalAlignEnum.MIDDLE = new EngravingLayoutVerticalAlignEnum("middle");

class ArcGeometryConfigDirectionEnum extends EnumHX {
    __class__ = ArcGeometryConfigDirectionEnum;
    static __super__ = EnumHX;
    static __name__ = ["ArcGeometryConfigDirectionEnum"];
    constructor(a) {
        super(a);
        EnumHX.registerClass(this);
    }
}
ArcGeometryConfigDirectionEnum.CW = new ArcGeometryConfigDirectionEnum("cw");
ArcGeometryConfigDirectionEnum.CCW = new ArcGeometryConfigDirectionEnum("ccw");

class SliceConfigOrientationEnum extends EnumHX {
    __class__ = SliceConfigOrientationEnum;
    static __super__ = EnumHX;
    static __name__ = ["SliceConfigOrientationEnum"];
    constructor(a) {
        super(a);
        EnumHX.registerClass(this);
    }
}
SliceConfigOrientationEnum.VERTICAL = new SliceConfigOrientationEnum(DiamondPlacementType.VERTICAL);
SliceConfigOrientationEnum.HORIZONTAL = new SliceConfigOrientationEnum("horizontal");

class GapConfigTypeEnum extends EnumHX {
    __class__ = GapConfigTypeEnum;
    static __super__ = EnumHX;
    static __name__ = ["GapConfigTypeEnum"];
    constructor(a) {
        super(a);
        EnumHX.registerClass(this);
    }
}
GapConfigTypeEnum.SIMPLE = new GapConfigTypeEnum("simple");
GapConfigTypeEnum.SIMPLE2 = new GapConfigTypeEnum("simple2");
GapConfigTypeEnum.TYPE1 = new GapConfigTypeEnum("type1");
GapConfigTypeEnum.TYPE2 = new GapConfigTypeEnum("type2");
GapConfigTypeEnum.DIAGONAL_DIAMOND_CHANNEL = new GapConfigTypeEnum("diagonalDiamondChannel");
GapConfigTypeEnum.CROSS_GROOVE_V = new GapConfigTypeEnum("crossGrooveV");
GapConfigTypeEnum.CROSS_GROOVE_RECT = new GapConfigTypeEnum("crossGrooveRect");
GapConfigTypeEnum.CROSS_GROOVE_U = new GapConfigTypeEnum("crossGrooveU");

class GrooveConfigOrientationEnum extends EnumHX {
    __class__ = GrooveConfigOrientationEnum;
    static __super__ = EnumHX;
    static __name__ = ["GrooveConfigOrientationEnum"];
    constructor(a) {
        super(a);
        EnumHX.registerClass(this);
    }
}
GrooveConfigOrientationEnum.VERTICAL = new GrooveConfigOrientationEnum(DiamondPlacementType.VERTICAL);
GrooveConfigOrientationEnum.HORIZONTAL = new GrooveConfigOrientationEnum("horizontal");

class GrooveConfigTypeEnum extends EnumHX {
    __class__ = GrooveConfigTypeEnum;
    static __super__ = EnumHX;
    static __name__ = ["GrooveConfigTypeEnum"];
    constructor(a) {
        super(a);
        EnumHX.registerClass(this);
    }
}
GrooveConfigTypeEnum.RECT = new GrooveConfigTypeEnum("rect");
GrooveConfigTypeEnum.U = new GrooveConfigTypeEnum("u");
GrooveConfigTypeEnum.V = new GrooveConfigTypeEnum("v");
GrooveConfigTypeEnum.BUMP = new GrooveConfigTypeEnum("bump");
GrooveConfigTypeEnum.FACED_RECT = new GrooveConfigTypeEnum("facedRect");
GrooveConfigTypeEnum.COLORIT = new GrooveConfigTypeEnum("colorit");

class DiaGrooveEnum extends EnumHX {
    __class__ = DiaGrooveEnum;
    static __super__ = EnumHX;
    static __name__ = ["DiaGrooveEnum"];
    constructor(a) {
        super(a);
        EnumHX.registerClass(this);
    }
}
DiaGrooveEnum.LeftRect = new DiaGrooveEnum("leftRect");
DiaGrooveEnum.Rect = new DiaGrooveEnum("rect");
DiaGrooveEnum.Channel = new DiaGrooveEnum("channel");
DiaGrooveEnum.RightRect = new DiaGrooveEnum("rightRect");
DiaGrooveEnum.RectGrooveCorner = new DiaGrooveEnum("rectGrooveCorner");
DiaGrooveEnum.RightChannel = new DiaGrooveEnum("rightChanel");
DiaGrooveEnum.LeftChannel = new DiaGrooveEnum("leftChanel");
DiaGrooveEnum.CrossSimple = new DiaGrooveEnum("crossSimple");
DiaGrooveEnum.CrossPlanar = new DiaGrooveEnum("crossPlanar");
DiaGrooveEnum.SectionDiamond = new DiaGrooveEnum("sectionDiamond");
DiaGrooveEnum.SectionDiamondLeft = new DiaGrooveEnum("sectionDiamondLeft");
DiaGrooveEnum.SectionDiamondRight = new DiaGrooveEnum("sectionDiamondRight");

///////////////////////////////////////////////////////////////////////////////////////////////

class Meta {
    constructor() { }
    static getType(a) {
        var b = Meta.getMeta(a);
        return null == b || null == b.obj ? {} : b.obj;
    }
    static getMeta(a) {
        return a.__meta__;
    }
    static getFields(a) {
        var b = Meta.getMeta(a);
        return null == b || null == b.fields ? {} : b.fields;
    }
}
class Reflect {
    static field(a, b) {
        try {
            return a[b];
        } catch (c) {
            return null;
        }
    }
    static getProperty(a, b) {
        var c;
        if (null == a) return null;
        var d;
        return (
            a.__properties__
                ? ((c = a.__properties__["get_" + b]), (d = c))
                : (d = false),
            d ? a[c]() : a[b]
        );
    }
    static fields(a) {
        var b = [];
        if (null != a) {
            var c = Object.prototype.hasOwnProperty;
            for (var d in a)
                "__id__" != d && "hx__closures__" != d && c.call(a, d) && b.push(d);
        }
        return b;
    }
    static isFunction(a) {
        return "function" == typeof a ? !(a.__name__ || a.__ename__) : false;
    }
}
class GeoNumComparor {
    __class__ = GeoNumComparor;
    static __name__ = ["GeoNumComparor"];
    constructor() { }
    static Equal(a, b, c) {
        return null == c && (c = 1e-6), c >= (a > b ? a - b : b - a);
    }
    static isLess(a, b, c) {
        return (
            null == c && (c = 1e-6), c >= (a > b ? a - b : b - a) ? false : b > a
        );
    }
    static isNotGreater(a, b, c) {
        return null == c && (c = 1e-6), c >= (a > b ? a - b : b - a) ? true : b > a;
    }
    static isGreater(a, b, delta) {
        return (
            null == delta && (delta = 1e-6), delta >= (a > b ? a - b : b - a) ? false : a > b
        );
    }
    static isNotLess(a, b, delta) {
        null == delta && (delta = 1e-6);
        return delta >= (a > b ? a - b : b - a) ? true : a > b;
    }
}
class PropertyChangeInfo {
    static __name__ = "SzZ";
    constructor() {
        this.path = null;
        this.propertyName = null;
        this.source = null;
        this.type = null;
    }

    toString() {
        return (
            '{path:"' +
            this.path +
            '", fieldName:"' +
            this.propertyName +
            '", source:' +
            Std.string(this.source) +
            ', type:"' +
            this.type +
            '"}'
        );
    }
}
class ComparableConfigBaseHX {
    __class__ = ComparableConfigBaseHX;
    static __name__ = ["ComparableConfigBaseHX"];
    static __meta__ = {
        obj: { Comparable: null },
        fields: { __source: { ComparableIgnore: ["true"] } }
    };
    constructor() {
        this.__source = null;
    }
    static compareConfig(config, newConfig, path) {
        var array = new Array(0),
            props = ComparableConfigBaseHX.getCompatibleProps(config, path);
        if (0 == props.length)
            throw new Error(
                "No Comparable properties found1 in '" + path + "' type:" + Std.string(config)
            );
        for (var f = 0; f < props.length;) {
            var prop = props[f];
            ++f;
            var name = prop.propertyName,
                compArray = ComparableConfigBaseHX.compareProp(config, newConfig, prop, name, path + "/" + name);
            0 != compArray.length && (array = null == compArray ? array.slice() : array.concat(compArray));
        }
        return array;
    }

    static compareProp(config, newConfig, prop, name, fullPath) {
        var f,
            aName = null == name ? config : Reflect.getProperty(config, name),
            bName = null == name ? newConfig : Reflect.getProperty(newConfig, name),
            array = new Array(0);
        if (ComparableConfigBaseHX.x4(aName) || ComparableConfigBaseHX.x4(bName))
            aName != bName && aName == aName && bName == bName && array.push(prop);
        else if (ObjMan.__instanceof(aName, EnumHX))
            aName.get_value() != bName.get_value() && array.push(prop);
        else if (ObjMan.__instanceof(aName, ComparableConfigBaseHX)) {
            var k = aName,
                l = bName;
            (null == k ? null : ObjMan.getClass(k)) == (null == l ? null : ObjMan.getClass(l))
                ? ((f = ComparableConfigBaseHX.compareConfig(aName, bName, fullPath)),
                    (array = null == f ? array.slice() : array.concat(f)))
                : array.push(prop);
        } else
            try {
                var m = aName.length;
                if (m != bName.length) array.push(prop);
                else
                    for (var n = 0; m > n;) {
                        var o = new PropertyChangeInfo();
                        o.propertyName = null == n ? "null" : "" + n;
                        var p = aName;
                        (o.source = null == p ? null : ObjMan.getClass(p)),
                            (o.type = prop.type),
                            (o.path = fullPath),
                            (f = ComparableConfigBaseHX.compareProp(
                                aName[n],
                                bName[n],
                                o,
                                null,
                                fullPath + "[" + n + "]"
                            )),
                            0 != f.length && (array = null == f ? array.slice() : array.concat(f)),
                            ++n;
                    }
            } catch (q) {
                throw new Error(
                    "Property " + prop.path + "/" + name + " is a complex object"
                );
            }
        return array;
    }

    static getCompatibleProps(config, path) {
        var c = new Array(0),
            d = false,
            e = null,
            f = config,
            g = null == f ? null : ObjMan.getClass(f),
            i = Meta.getType(g);
        if ((d = Object.prototype.hasOwnProperty.call(i, "Comparable"))) {
            var j = Reflect.field(i, "Comparable");
            e = null == j ? null : j[0];
        }
        for (
            var k = Type.getInstanceFields(g),
            m = ComparableConfigBaseHX.yg(g),
            n = 0;
            n < k.length;

        ) {
            var o = k[n];
            if ((++n, !Reflect.isFunction(Reflect.field(config, o)))) {
                for (
                    var p,
                    prop = Reflect.getProperty(m, o),
                    myMap = new MyMap(),
                    s = Reflect.fields(prop),
                    t = 0;
                    t < s.length;

                ) {
                    var key = s[t];
                    ++t;
                    var val = Reflect.getProperty(prop, key)[0];
                    null != globalMap[key] ? myMap.setReserved(key, val) : (myMap.map[key] = val);
                }
                p = myMap;
                var w = p,
                    x = false,
                    y =
                        null != globalMap.ComparableIgnore
                            ? w.getReserved("ComparableIgnore")
                            : w.map.ComparableIgnore;
                if (
                    (null != y && y.length > 0 && (x = "true" == y.toLowerCase()),
                        (d || !w.keys().hasNext()) && !x)
                ) {
                    var z = new PropertyChangeInfo();
                    (z.propertyName = o),
                        (z.path = path),
                        w.keys().hasNext()
                            ? (z.type =
                                null != globalMap.Comparable
                                    ? w.getReserved("Comparable")
                                    : w.map.Comparable)
                            : (z.type = e);
                    var A = config;
                    (z.source = null == A ? null : ObjMan.getClass(A)), c.push(z);
                }
            }
        }
        return c;
    }

    static x4(a) {
        var b = Type["typeof"](a);
        switch (b[1]) {
            case 0:
                return true;
            case 1:
                return true;
            case 2:
                return true;
            case 3:
                return true;
            case 6:
                return b[2] == String ? true : false;
            case 7:
                return true;
            case 8:
                return true;
            default:
                return false;
        }
    }

    static yg(a, b) {
        var c;
        c = null == b ? {} : b;
        var d = Type.getSuperClass(a);
        return (
            null != d &&
            ComparableConfigBaseHX.yk(c, ComparableConfigBaseHX.yg(d, c)),
            ComparableConfigBaseHX.yk(c, Meta.getFields(a)),
            c
        );
    }

    static yk(a, b) {
        for (var c = Reflect.fields(b), d = 0; d < c.length;) {
            var e = c[d];
            ++d, (a[e] = Reflect.field(b, e));
        }
    }

    getChanges(config) {
        var b = config;
        if ((null == b ? null : ObjMan.getClass(b)) != ObjMan.getClass(this))
            throw new Error("Parameter config class does not match");
        return ComparableConfigBaseHX.compareConfig(this, config, "");
    }
}
ComparableConfigBaseHX.COMPARABLE_META = "Comparable";
ComparableConfigBaseHX.COMPARABLE_IGNORE_META = "ComparableIgnore";

class GeometryConfig extends ComparableConfigBaseHX {
    static __super__ = ComparableConfigBaseHX;
    __class__ = GeometryConfig;
    static __name__ = ["GeometryConfig"];
    static __meta__ = { obj: { Comparable: null } };
    constructor() {
        super();
    }
    endY = null;
    endX = null;
    startY = null;
    startX = null;
}
class ArcGeometryConfig extends GeometryConfig {
    static __super__ = GeometryConfig;
    __class__ = ArcGeometryConfig;
    static __name__ = ["ArcGeometryConfig"];
    static __meta__ = { obj: { Comparable: null } };
    constructor() {
        super();
    }
    centerY = null;
    centerX = null;
    direction = null;
}
class LineGeometryConfig extends GeometryConfig {
    static __super__ = GeometryConfig;
    __class__ = LineGeometryConfig;
    static __name__ = ["LineGeometryConfig"];
    static __meta__ = {
        obj: { Comparable: null }
    };
    constructor() {
        super();
    }
}
class ConfigProperty extends ComparableConfigBaseHX {
    static __meta__ = { obj: { Comparable: null } };
    constructor() {
        super();
    }
    static __name__ = null;
    value = null;
}
class DiskConfig extends ComparableConfigBaseHX {
    static __meta__ = {
        obj: { Comparable: null },
        fields: {
            outerMaterial: { Comparable: ["m"] },
            innerMaterial: { Comparable: ["m"] }
        }
    };
    constructor() {
        super();
    }
    outerMaterial = null;
    innerMaterial = null;
}
class HibridRingSceneConfig extends ComparableConfigBaseHX {
    constructor(a) {
        super();
        if (null != a) {
            this.comibed = true;
            this.configs = a;
        }
    }
    modelSceneConfig = null;
    shapeSceneConfig = null;
    comibed = null;
    configs = null;
    hasShapeSceneConfigs() {
        if (this.comibed) {
            for (var a = 0; a < this.configs.length;) {
                if (ObjMan.__instanceof(this.configs[a], ShapeRingConfig)) return true;
                ++a;
            }
            return false;
        }
        return null != this.shapeSceneConfig
            ? 0 != this.shapeSceneConfig.ringModels.length
            : false;
    }
    hasModelSceneConfigs() {
        if (this.comibed) {
            for (var a = 0; a < this.configs.length;) {
                if (ObjMan.__instanceof(this.configs[a], ModelRingConfig)) return true;
                ++a;
            }
            return false;
        }
        return null != this.modelSceneConfig
            ? 0 != this.modelSceneConfig.modelConfigs.length
            : false;
    }
    getRingModelByIndex(id) {
        if (this.comibed) {
            if (this.configs.length > id) return this.configs[id];
            throw new Error("Invalid index: " + id);
        }
        var b = id;
        if (
            null != this.shapeSceneConfig &&
            null != this.shapeSceneConfig.ringModels &&
            0 != this.shapeSceneConfig.ringModels.length
        ) {
            if (id < this.shapeSceneConfig.ringModels.length)
                return this.shapeSceneConfig.ringModels[id];
            b = id - (this.shapeSceneConfig.ringModels.length - 1);
        }
        try {
            return this.modelSceneConfig.modelConfigs[b];
        } catch (c) {
            throw new Error("Invalid index: " + id);
        }
    }
}
class MaterialConfig extends ComparableConfigBaseHX {
    static __meta__ = { obj: { Comparable: ["m"] } };
    constructor() {
        super();
    }

    surface = null;
    gradient = null;
}
class MaterialOverrideConfig extends ComparableConfigBaseHX {
    static __meta__ = { obj: { Comparable: ["m"] } };
    constructor() {
        super();
    }

    surfaceOverride = null;
    gradientOverride = null;
}
class MiddleShapeConfig extends ComparableConfigBaseHX {
    static __meta__ = { obj: { Comparable: null } };
    constructor() {
        super();
    }

    offset = null;
    derivative = null;
    sine = null;
}
class ModelRingConfig extends ComparableConfigBaseHX {
    static __meta__ = { obj: { Comparable: null }, fields: { surfaces: { Comparable: ["m"] }, colors: { Comparable: ["m"] } } };
    constructor() {
        super();
    }
    engravingLayouts = null;
    path = null;
    alloys = null;
    surfaces = null;
    circumference = null;
    static __name__ = null;
    colors = null;
}
class ModelRingSceneConfig extends ComparableConfigBaseHX {
    constructor() {
        super();
    }
    modelConfigs = null;
    getRingModelByIndex(a) {
        try {
            return this.modelConfigs[a];
        } catch (b) {
            throw new Error("Invalid index: " + a);
        }
    }
}
class SegmentConfig extends ComparableConfigBaseHX {
    static __meta__ = { obj: { Comparable: null } };
    constructor() {
        super();
    }
    slices = null;
    grooves = null;
    disks = null;
    start = null;
    end = null;
}
class ShapeRingConfig extends ComparableConfigBaseHX {
    static __super__ = ComparableConfigBaseHX;
    __class__ = ShapeRingConfig;
    static __name__ = ["ShapeRingConfig"];
    static __meta__ = {
        obj: { Comparable: null },
        fields: { configProperties: { ComparableIgnore: ["true"] } }
    };
    constructor(conf) {
        super();
        if (conf != null) {
            this.profileWidth = conf.profileWidth;
            this.engravingLayouts = conf.engravingLayouts;
            this.circumference = conf.circumference;
            this.configProperties = conf.configProperties;
            this.outerProfileShapes = conf.outerProfileShapes;
            this.innerProfileShapes = conf.innerProfileShapes;
            this.profileHeight = conf.profileHeight;
            this.segments = conf.segments;
            this.diamondGroups = conf.diamondGroups;
            this.gaps = conf.gaps;
        }
    }
    profileWidth = null;
    engravingLayouts = null;
    circumference = null;
    configProperties = null;
    outerProfileShapes = null;
    innerProfileShapes = null;
    profileHeight = null;
    segments = null;
    diamondGroups = null;
    gaps = null;
    getConfigPropertyValueByName(name) {
        for (var id = 0, c = this.configProperties; id < c.length;) {
            var d = c[id];
            if ((++id, d.name == name)) return d.value;
        }
        return null;
    }
}
class ShapeRingSceneConfig extends ComparableConfigBaseHX {
    static __meta__ = { obj: { Comparable: null } };
    constructor() {
        super();
    }

    ringModels = null;
    getRingModelByIndex(a) {
        try {
            return this.ringModels[a];
        } catch (b) {
            throw new Error("Invalid index: " + a);
        }
    }
}
class SineConfig extends ComparableConfigBaseHX {
    static __meta__ = { obj: { Comparable: null } };
    constructor() {
        super();
    }

    amplitude = null;
    shiftAngle = null;
    numberOfCycles = null;
}
class SliceConfig extends ComparableConfigBaseHX {
    static __meta__ = { obj: { Comparable: null } };
    constructor() {
        super();
    }

    middleShape = null;
    orientation = null;
}
class ChannelConfig extends ComparableConfigBaseHX {
    static __meta__ = { obj: { Comparable: null } };
    constructor() {
        super();
    }
    type = null;
    depth = null;
}
class DiamondGroupConfig extends ComparableConfigBaseHX {
    static __meta__ = { obj: { Comparable: null } };
    constructor() {
        super();
    }
    middleShape = null;
    linesGap = null;
    orientation = null;
    gap = null;
    lowering = null;
    rows = null;
    stonePerRow = null;
    shiftAngleOnSurface = null;
    stone = null;
    prong = null;
    channel = null;
    materialOverride = null;
    setting = null;
}
class ProngConfig extends ComparableConfigBaseHX {
    static __meta__ = { obj: { Comparable: null } };
    constructor() {
        super();
    }
    model = null;
    shared = null;
    size = null;
    sidePadding = null;
    rotateLeftBottom = null;
    rotateRightBottom = null;
    rotateLeft = null;
    rotateRight = null;
    rotateLeftTop = null;
    rotateRightTop = null;
    addStartLength = null;
    addEndLength = null;
}
class StoneConfig extends ComparableConfigBaseHX {
    static __meta__ = { obj: { Comparable: null } };
    constructor() {
        super();
    }

    cut = null;
    color = null;
    rotationAngle = null;
    width = null;
    height = null;
    depth = null;
}
class EngravingPlacementBaseConfig extends ComparableConfigBaseHX {
    static __meta__ = { obj: { Comparable: null } };
    constructor(config) {
        super(config);
        if (config != null) {
            this.paddingBottom = config.paddingBottom;
            this.paddingRight = config.paddingRight;
            this.paddingTop = config.paddingTop;
            this.paddingLeft = config.paddingLeft;
            this.height = config.height;
        }
    }

    paddingBottom = null;
    paddingRight = null;
    paddingTop = null;
    paddingLeft = null;
    height = null;
}
class VerticalEngravingLayoutConfig extends ComparableConfigBaseHX {
    static __meta__ = { obj: { Comparable: null } };
    constructor(config) {
        super();
        if (config != null) {
            this.verticalAlign = config.verticalAlign;
            this.startAngle = config.startAngle;
            this.children = config.children;
            this.gap = config.gap;
        }
    }

    verticalAlign = null;
    startAngle = null;
    children = null;
    gap = null;
}
class GrooveConfig extends ComparableConfigBaseHX {
    static __meta__ = { obj: { Comparable: null } };
    constructor() {
        super();
    }
    middleShape = null;
    orientation = null;
    depth = null;
    width = null;
    angle = null;
    type = null;
    materialOverride = null;
}
class GapConfig extends ComparableConfigBaseHX {
    static __meta__ = { obj: { Comparable: null } };
    constructor() {
        super();
    }
    middleShape = null;
    width = null;
    height = null;
    depth = null;
    offsetY = null;
    shiftAngleOnSurface = null;
    edges = null;
    type = null;
}

class StampEngravingPlacementConfig extends EngravingPlacementBaseConfig {
    static __super__ = EngravingPlacementBaseConfig;
    __class__ = StampEngravingPlacementConfig;
    static __name__ = ["StampEngravingPlacementConfig"];
    static __meta__ = { obj: { Comparable: null } };
    constructor(config) {
        super();
        if (config != null) {
            this.stampForm = config.stampForm;
        }
    }

    stampForm = null;
}
class TextEngravingPlacementConfig extends EngravingPlacementBaseConfig {
    static __super__ = EngravingPlacementBaseConfig;
    __class__ = TextEngravingPlacementConfig;
    static __name__ = ["TextEngravingPlacementConfig"];
    static __meta__ = { obj: { Comparable: null } };
    constructor(config) {
        super();
        if (config != null) {
            this.text = config.text;
            this.font = config.font;
            this.carveType = config.carveType;
        }
    }

    text = null;
    font = null;
    carveType = null;
}
class DarkenGradientConfig {
    constructor() { }

    rotation = null;
    colors = null;
    alphas = null;
    ratios = null;
}
class FingerConfig {
    constructor() { }
    radius = null;
    radiusOffset = null;
    height = null;
    ringFinger = null;
    x = null;
    y = null;
    z = null;
    rotationX = null;
    rotationY = null;
    rotationZ = null;
    offsetX = null;
    offsetY = null;
    offsetZ = null;
}
class HandConfig {
    constructor() { }
    fingers = null;
}
class HandSceneConfig {
    constructor() { }
    ringConfig = null;
    handConfig = null;
}
class HandSnapshotConfig {
    constructor() { }
    id = null;
    regPointX = null;
    regPointY = null;
    viewArea = null;
    handConfiguation = null;
    darkenGradientConfig = null;
    flipped = null;
}
class ConfigParserBase {
    constructor() { }
    parseConfig(a) {
        throw new Error("parseConfig must be implemented");
    }
    parseSingleRing(a) {
        throw new Error("parseSingleRing must be implemented");
    }
    removeEngraving(a) {
        throw new Error("removeEngraving must be implemented");
    }
    parseConfigProperty(a) {
        var b = new Array(0);
        if (null != a)
            for (var c = Reflect.fields(a), d = 0; d < c.length;) {
                var e = c[d];
                ++d;
                var f = new ConfigProperty();
                (f.name = e), (f.value = Reflect.field(a, e)), b.push(f);
            }
        return b;
    }
    parseEngravingLayout(a) {
        for (var b = new Array(0), c = 0; c < a.length;) {
            var d = a[c];
            if ((++c, DiamondPlacementType.VERTICAL != d.type))
                throw new Error("Unknow engraving layout type ");
            var e = new VerticalEngravingLayoutConfig();
            (e.verticalAlign = this.D0(
                d,
                "verticalAlign",
                EngravingLayoutVerticalAlignEnum,
                EngravingLayoutVerticalAlignEnum.TOP.get_value()
            )),
                (e.startAngle = this.extractField(d, "startAngle", 0)),
                (e.gap = this.extractField(d, "gap", 0));
            var f = new Array(0),
                g = d.children;
            if (null != g)
                for (var h = 0; h < g.length;) {
                    var i = g[h];
                    ++h,
                        f.push(this.parseEngravingPlacementConfig(i));
                }
            (e.children = f), b.push(e);
        }
        return b;
    }
    parseEngravingPlacementConfig(a) {
        var b = this.extractField(a, "type"),
            c = null;
        if ("text" == b) {
            var d = new TextEngravingPlacementConfig();
            (d.text = this.extractField(a, "text")),
                (d.carveType = this.extractField(a, "carveType")),
                (d.font = this.extractField(a, "font")),
                (c = d);
        }
        else if ("stamp" == b) {
            var e = new StampEngravingPlacementConfig();
            (e.stampForm = this.extractField(a, "stampForm")), (c = e);
        }
        return (
            (c.height = this.extractField(a, "height")),
            (c.paddingRight = this.extractField(a, "paddingRight", 0)),
            (c.paddingLeft = this.extractField(a, "paddingLeft", 0)),
            (c.paddingTop = this.extractField(a, "paddingTop", 0)),
            (c.paddingBottom = this.extractField(a, "paddingBottom", 0)),
            c
        );
    }
    extractField(a, key, defVal) {
        var val = Reflect.field(a, key);
        if (("string" == typeof val && "" == val && (val = null), null != val)) return val;
        if (null != defVal) return defVal;
        throw new Error(
            "No value found for key: " + key + " and there is no default value"
        );
    }
    D0(a, b, c, d) {
        return EnumHX.forValue(c, this.extractField(a, b, d));
    }
}
class HandSnapshotConfigParser {
    constructor() { }
    static parseHandSnapshotConfig(config) {
        var handSnapshotConfig = new HandSnapshotConfig();
        handSnapshotConfig.flipped = HandSnapshotConfigParser.parseField(config, "flipped");
        var snapshotConfig = HandSnapshotConfigParser.parseField(config, "ringSnapshotConfig");
        handSnapshotConfig.id = HandSnapshotConfigParser.parseField(snapshotConfig, "id");
        handSnapshotConfig.viewArea = new Rectangle(
            0,
            0,
            HandSnapshotConfigParser.parseField(snapshotConfig, "areaWidth"),
            HandSnapshotConfigParser.parseField(snapshotConfig, "areaHeight")
        );
        handSnapshotConfig.regPointX = HandSnapshotConfigParser.parseField(snapshotConfig, "regPointX");
        handSnapshotConfig.regPointY = HandSnapshotConfigParser.parseField(snapshotConfig, "regPointY");

        var fingerArray = HandSnapshotConfigParser.parseField(HandSnapshotConfigParser.parseField(snapshotConfig, "handConfig"), "fingers"),
            handConfig = new HandConfig(),
            fingerConfigArray = new Array(0);
        for (var g = 0; g < fingerArray.length; g++) {
            var finger = fingerArray[g],
                fingerConfig = new FingerConfig();
            (fingerConfig.radius = HandSnapshotConfigParser.parseField(finger, "radius")),
                (fingerConfig.radiusOffset = HandSnapshotConfigParser.parseField(finger, "radiusOffset", 0)),
                (fingerConfig.height = HandSnapshotConfigParser.parseField(finger, "height")),
                (fingerConfig.ringFinger = HandSnapshotConfigParser.parseField(finger, "ringFinger")),
                (fingerConfig.x = HandSnapshotConfigParser.parseField(finger, "x")),
                (fingerConfig.y = HandSnapshotConfigParser.parseField(finger, "y")),
                (fingerConfig.z = HandSnapshotConfigParser.parseField(finger, "z")),
                (fingerConfig.rotationX = HandSnapshotConfigParser.parseField(finger, "rotationX")),
                (fingerConfig.rotationY = HandSnapshotConfigParser.parseField(finger, "rotationY")),
                (fingerConfig.rotationZ = HandSnapshotConfigParser.parseField(finger, "rotationZ")),
                (fingerConfig.offsetX = HandSnapshotConfigParser.parseField(finger, "offsetX", 0)),
                (fingerConfig.offsetY = HandSnapshotConfigParser.parseField(finger, "offsetY", 0)),
                (fingerConfig.offsetZ = HandSnapshotConfigParser.parseField(finger, "offsetZ", 0)),
                fingerConfigArray.push(fingerConfig);
        }
        handConfig.fingers = fingerConfigArray;
        var darkenGradient = Reflect.field(snapshotConfig, "darkenGradient");
        if (null != darkenGradient) {
            var darkenGradientConfig = new DarkenGradientConfig();
            (darkenGradientConfig.rotation = HandSnapshotConfigParser.parseField(darkenGradient, "rotation"));
            (darkenGradientConfig.colors = HandSnapshotConfigParser.parseField(darkenGradient, "colors"));
            (darkenGradientConfig.alphas = HandSnapshotConfigParser.parseField(darkenGradient, "alphas"));
            (darkenGradientConfig.ratios = HandSnapshotConfigParser.parseField(darkenGradient, "ratios"));
            (handSnapshotConfig.darkenGradientConfig = darkenGradientConfig);
        }
        handSnapshotConfig.handConfiguation = handConfig;
        return handSnapshotConfig;
    }
    static parseField(a, b, c) {
        var d = Reflect.field(a, b);
        if (("string" == typeof d && "" == d && (d = null), null != d))
            return d;
        if (null != c) return c;
        throw new Error(
            "No value found for key: " + b + " and there is no default value"
        );
    }
}
class HibridRingSceneConfigParser extends ConfigParserBase {
    constructor() {
        super();
    }

    static instance = null;
    static get_instance() {
        return (
            null == HibridRingSceneConfigParser.instance &&
            (HibridRingSceneConfigParser.instance = new HibridRingSceneConfigParser()),
            HibridRingSceneConfigParser.instance
        );
    }
    static getRingConfigs(sceneConfig) {
        var b = 0,
            c = new Array(0);
        if (sceneConfig.comibed) {
            return sceneConfig.configs;
        }
        if (null != sceneConfig.shapeSceneConfig && null != sceneConfig.shapeSceneConfig.ringModels)
            for (b = 0; b < sceneConfig.shapeSceneConfig.ringModels.length;)
                c.push(sceneConfig.shapeSceneConfig.ringModels[b]), ++b;
        if (null != sceneConfig.modelSceneConfig && null != sceneConfig.modelSceneConfig.modelConfigs)
            for (b = 0; b < sceneConfig.modelSceneConfig.modelConfigs.length;)
                c.push(sceneConfig.modelSceneConfig.modelConfigs[b]), ++b;
        return c;
    }

    parseConfig(conf) {
        if (null != conf.configs) {
            for (var configs = new Array(0), c = conf.configs, id = 0; id < c.length;) {
                var e = c[id];
                ++id;
                var f = null;
                if (null != e.shapeRing)
                    f = ShapeRingConfigParser.get_instance().parseSingleRing(e.shapeRing);
                else {
                    if (null == e.modelRing)
                        throw new Error("Unknown config type " + Std.string(e));
                    f = ModelRingConfigParser.get_instance().parseSingleRing(e.modelRing);
                }
                configs.push(f);
            }
            var ringConfig = new HibridRingSceneConfig();
            return (ringConfig.comibed = true),
                (ringConfig.configs = configs),
                (ringConfig.__source = conf),
                ringConfig;
        }
        var modelRingScene = ModelRingConfigParser.get_instance().parseConfig(conf.modelRingScene),
            shapeRingScene = ShapeRingConfigParser.get_instance().parseConfig(conf.shapeRingScene),
            ringSceneConfig = new HibridRingSceneConfig();
        return (
            (ringSceneConfig.modelSceneConfig = modelRingScene),
            (ringSceneConfig.shapeSceneConfig = shapeRingScene),
            (ringSceneConfig.__source = conf),
            ringSceneConfig
        );
    }
    parseSingleRing(a) {
        var b = a.configType;
        if ("shape" == b)
            return ShapeRingConfigParser.get_instance().parseSingleRing(a);
        if ("model" == b)
            return ModelRingConfigParser.get_instance().parseSingleRing(a);
        throw new Error("Unknown config type " + b);
    }
    removeEngraving(a) {
        a.ringConfig.engravingLayouts = [];
    }
}
class ModelRingConfigParser extends ConfigParserBase {
    constructor() {
        super();
    }

    static D9 = null;
    static get_instance() {
        null == ModelRingConfigParser.D9 &&
            (ModelRingConfigParser.D9 = new ModelRingConfigParser());
        return ModelRingConfigParser.D9;
    }

    parseConfig(a) {
        var b = new ModelRingSceneConfig(),
            c = new Array(0);
        if (null != a)
            if (null != a.ringModels)
                for (var d = a.ringModels, e = 0; e < d.length;) {
                    var f = d[e];
                    ++e, c.push(ObjMan.__cast(this.parseSingleRing(f), ModelRingConfig));
                }
            else
                c.push(ObjMan.__cast(this.parseSingleRing(a.model1), ModelRingConfig)),
                    c.push(ObjMan.__cast(this.parseSingleRing(a.model2), ModelRingConfig));
        return (b.modelConfigs = c), b;
    }
    parseSingleRing(a) {
        var b = new ModelRingConfig();
        (b.name = this.extractField(a, "name")),
            (b.path = this.extractField(a, "path")),
            (b.circumference = this.extractField(a, "circumference")),
            (b.engravingLayouts = this.parseEngravingLayout(a.engravingLayouts)),
            (b.surfaces = this.cloneArray(a.surfaces)),
            (b.colors = this.cloneArray(a.colors)),
            (b.alloys = this.cloneArray(a.alloys)),
            (b.__source = a);
        return b;
    }
    removeEngraving(a) {
        a.ringConfig.engravingLayouts = [];
    }
    cloneArray(a) {
        var b = new Array(0);
        if (null == a) return b;
        for (var c = 0; c < a.length;) b.push(a[c]), ++c;
        return b;
    }
}
class ShapeRingConfigParser extends ConfigParserBase {
    constructor() {
        super();
    }

    static D9 = null;
    static get_instance() {
        null == ShapeRingConfigParser.D9 &&
            (ShapeRingConfigParser.D9 = new ShapeRingConfigParser());
        return ShapeRingConfigParser.D9;
    }

    parseConfig(a) {
        var b = new ShapeRingSceneConfig(),
            c = new Array(0),
            d = Reflect.field(a, "ringModels");
        if (null != d)
            for (var e = 0; e < d.length;) {
                var f = d[e];
                ++e, c.push(ObjMan.__cast(this.parseSingleRing(f), ShapeRingConfig));
            }
        return (b.ringModels = c), b;
    }
    parseSingleRing(a) {
        var shapeRingConfig = new ShapeRingConfig();
        //kkk
        (shapeRingConfig.configProperties = this.parseConfigProperty(Reflect.field(a, "configProperties"))),
            (shapeRingConfig.circumference = this.extractField(a, "circumference")),
            (shapeRingConfig.profileWidth = this.extractField(a, "profileWidth")),
            (shapeRingConfig.profileHeight = this.extractField(a, "profileHeight")),
            (shapeRingConfig.outerProfileShapes = this.parseProfileShapes(
                Reflect.field(a, "outerProfileShapes"),
                shapeRingConfig.circumference
            )),
            (shapeRingConfig.innerProfileShapes = this.parseProfileShapes(
                Reflect.field(a, "innerProfileShapes"),
                shapeRingConfig.circumference
            )),
            (shapeRingConfig.segments = this.parseSegments(Reflect.field(a, "segments"))),
            (shapeRingConfig.diamondGroups = this.parseDiamondGroups(Reflect.field(a, "diamondGroups"))),
            (shapeRingConfig.gaps = this.parseGaps(a.gaps)),
            (shapeRingConfig.engravingLayouts = this.parseEngravingLayout(Reflect.field(a, "engravingLayouts"))),
            (shapeRingConfig.__source = a);
        return shapeRingConfig;
    }
    removeEngraving(a) {
        a.engravingLayouts = [];
    }
    parseSegments(configs) {
        var segmentConfArray = new Array(0);
        for (var k = 0; k < configs.length; k++) {
            var d = configs[k];
            var segmentConfig = new SegmentConfig();
            segmentConfig.disks = this.parseDisks(d.disks);
            segmentConfig.slices = this.parseSlices(d.slices);
            segmentConfig.grooves = this.parseGrooves(d.grooves);
            segmentConfig.start = this.extractField(d, "start", 0);
            segmentConfig.end = this.extractField(d, "end", 1);
            segmentConfig.__source = d;
            segmentConfArray.push(segmentConfig);
        }
        return segmentConfArray;
    }
    parseGrooves(a) {
        var grooveConfigArray = new Array(0);
        if (null != a)
            for (var c = 0; c < a.length; c++) {
                var d = a[c];
                var grooveConfig = new GrooveConfig();
                grooveConfig.orientation = ObjMan.__cast(
                    EnumHX.forValue(GrooveConfigOrientationEnum, d.orientation),
                    GrooveConfigOrientationEnum
                );
                grooveConfig.type = ObjMan.__cast(
                    EnumHX.forValue(GrooveConfigTypeEnum, d.type),
                    GrooveConfigTypeEnum
                );
                grooveConfig.width = d.width;
                grooveConfig.depth = d.depth;
                grooveConfig.angle = d.angle;
                var middleShape = d.middleShape;
                if (!middleShape) throw new Error("Groove middle shape not found on index " + c);
                grooveConfig.middleShape = MiddleShapeParser.get_instance().parseConfig(middleShape);
                grooveConfig.materialOverride = MaterialOverrideParser.get_instance().parseConfig(d.materialOverride);
                grooveConfig.__source = d;
                grooveConfigArray.push(grooveConfig);
            }
        return grooveConfigArray;
    }
    parseGaps(a) {
        var b = new Array(0);
        if (null != a)
            for (var c = 0; c < a.length;) {
                var d = a[c],
                    gapConfig = new GapConfig();
                (gapConfig.type = ObjMan.__cast(
                    EnumHX.forValue(GapConfigTypeEnum, d.type),
                    GapConfigTypeEnum
                )),
                    (gapConfig.width = d.width),
                    (gapConfig.height = d.height),
                    (gapConfig.depth = d.depth),
                    (gapConfig.offsetY = this.extractField(d, "offsetY", 0)),
                    (gapConfig.shiftAngleOnSurface = d.shiftAngleOnSurface),
                    (gapConfig.edges = null == d.edges ? null : d.edges.slice());
                var f = d.middleShape;
                if (!f) throw new Error("Groove middle shape not found on index " + c);
                (gapConfig.middleShape = MiddleShapeParser.get_instance().parseConfig(f)),
                    (gapConfig.__source = d),
                    b.push(gapConfig),
                    ++c;
            }
        return b;
    }
    parseSlices(a) {
        var b = new Array(0);
        if (null != a)
            for (var c = 0; c < a.length;) {
                var d = a[c],
                    e = new SliceConfig();
                e.orientation = ObjMan.__cast(
                    EnumHX.forValue(SliceConfigOrientationEnum, d.orientation),
                    SliceConfigOrientationEnum
                );
                var f = d.middleShape;
                if (!f) throw new Error("Slice middle shape not found on index " + c);
                (e.middleShape = MiddleShapeParser.get_instance().parseConfig(f)),
                    (e.__source = d),
                    b.push(e),
                    ++c;
            }
        return b;
    }
    parseDiamondGroups(a) {
        for (var b = new Array(0), c = 0; c < a.length;) {
            var d = a[c];
            ++c, b.push(DiamondGroupParser.get_instance().parseConfig(d));
        }
        return b;
    }
    parseDisks(a) {
        var b = new Array(0);
        if (null != a)
            for (var k = 0; k < a.length; k++) {
                var d = a[k];
                var diskConfig = new DiskConfig();
                var outerMaterial = d.outerMaterial;
                var outerMaterialConfig = null;
                if (null != outerMaterial) {
                    outerMaterialConfig = new MaterialConfig();
                    outerMaterialConfig.gradient = this.extractField(outerMaterial, "gradient");
                    outerMaterialConfig.surface = this.extractField(outerMaterial, EngravingMetaValue.ENGRAVING_PART_SURFACE);//outerMaterial.surface;
                    outerMaterialConfig.__source = outerMaterial;
                }
                var innerMaterial = d.innerMaterial;
                var innerMaterialConfig = null;
                if (null != innerMaterial) {
                    innerMaterialConfig = new MaterialConfig();
                    innerMaterialConfig.gradient = this.extractField(innerMaterial, "gradient");
                    innerMaterialConfig.surface = this.extractField(innerMaterial, EngravingMetaValue.ENGRAVING_PART_SURFACE);//innerMaterial.surface;
                    innerMaterialConfig.__source = innerMaterial;
                }
                diskConfig.outerMaterial = outerMaterialConfig;
                diskConfig.innerMaterial = innerMaterialConfig;
                diskConfig.__source = d;
                b.push(diskConfig);
            }
        return b;
    }
    parseProfileShapes(a, b) {
        var c = new Array(0);
        if (null != a)
            for (var d = 0; d < a.length;) {
                var e = a[d];
                if (null != e.arc) {
                    var f = e.arc,
                        g = new ArcGeometryConfig();
                    this.Fo(f, g, b),
                        (g.centerX = this.extractField(f, "cx")),
                        (g.centerY = this.extractField(f, "cy")),
                        (g.direction = ObjMan.__cast(
                            EnumHX.forValue(
                                ArcGeometryConfigDirectionEnum,
                                Std.string(f.dir).toLowerCase()
                            ),
                            ArcGeometryConfigDirectionEnum
                        )),
                        c.push(g);
                } else {
                    if (null == e.segment)
                        throw new Error("Unknow shape found at index " + d);
                    var h = new LineGeometryConfig();
                    this.Fo(e.segment, h, b), c.push(h);
                }
                ++d;
            }
        return c;
    }
    Fo(a, b, c) {
        b.startX = this.extractField(a, "p1x");
        b.startY = this.extractField(a, "p1y");
        b.endX = this.extractField(a, "p2x");
        b.endY = this.extractField(a, "p2y");
        b.__source = a;
    }
}
class ChannelParser extends ConfigParserBase {
    constructor() {
        super();
    }

    static D9 = null;
    static get_instance() {
        return (
            null == ChannelParser.D9 && (ChannelParser.D9 = new ChannelParser()),
            ChannelParser.D9
        );
    }

    parseConfig(a) {
        if (null == a) return null;
        var channelConfig = new ChannelConfig();
        channelConfig.type = a.type;
        channelConfig.depth = this.extractField(a, "depth");
        channelConfig.__source = a;
        return channelConfig;
    }
}
class DiamondGroupParser extends ConfigParserBase {
    constructor() {
        super();
    }

    static D9 = null;
    static get_instance() {
        return (
            null == DiamondGroupParser.D9 &&
            (DiamondGroupParser.D9 = new DiamondGroupParser()),
            DiamondGroupParser.D9
        );
    }

    parseConfig(a) {
        var diamondGroupConfig = new DiamondGroupConfig();
        return (
            (diamondGroupConfig.setting = ObjMan.__cast(
                EnumHX.forValue(DiamondGroupConfigSettingEnum, a.setting),
                DiamondGroupConfigSettingEnum
            )),
            (diamondGroupConfig.stone = StoneParser.get_instance().parseConfig(a.stone)),
            (diamondGroupConfig.prong = ProngParser.get_instance().parseConfig(a.prong)),
            (diamondGroupConfig.channel = ChannelParser.get_instance().parseConfig(a.channel)),
            (diamondGroupConfig.orientation = ObjMan.__cast(
                EnumHX.forValue(DiamondGroupConfigOrientationEnum, a.orientation),
                DiamondGroupConfigOrientationEnum
            )),
            (diamondGroupConfig.middleShape = MiddleShapeParser.get_instance().parseConfig(
                a.middleShape
            )),
            (diamondGroupConfig.lowering = a.lowering),
            (diamondGroupConfig.gap = a.gap),
            (diamondGroupConfig.linesGap = this.extractField(a, "linesGap", 0)),
            (diamondGroupConfig.rows = a.rows),
            (diamondGroupConfig.shiftAngleOnSurface = a.shiftAngleOnSurface),
            (diamondGroupConfig.stonePerRow = a.stonePerRow),
            (diamondGroupConfig.materialOverride = MaterialOverrideParser.get_instance().parseConfig(
                a.materialOverride
            )),
            (diamondGroupConfig.__source = a),
            diamondGroupConfig
        );
    }
}
class ProngParser extends ConfigParserBase {
    constructor() {
        super();
    }

    static D9 = null;
    static get_instance() {
        return (
            null == ProngParser.D9 && (ProngParser.D9 = new ProngParser()),
            ProngParser.D9
        );
    }

    parseConfig(a) {
        if (null == a) return null;
        var b = new ProngConfig();
        return (
            (b.model = this.extractField(a, "model")),
            (b.shared = this.extractField(a, "shared")),
            (b.size = this.extractField(a, "size")),
            (b.sidePadding = this.extractField(a, "sidePadding")),
            (b.rotateLeftBottom = this.extractField(a, "rotateLeftBottom")),
            (b.rotateRightBottom = this.extractField(a, "rotateRightBottom")),
            (b.rotateLeft = this.extractField(a, "rotateLeft")),
            (b.rotateRight = this.extractField(a, "rotateRight")),
            (b.rotateLeftTop = this.extractField(a, "rotateLeftTop")),
            (b.rotateRightTop = this.extractField(a, "rotateRightTop")),
            (b.addStartLength = this.extractField(a, "addStartLength")),
            (b.addEndLength = this.extractField(a, "addEndLength")),
            (b.__source = a),
            b
        );
    }
}
class StoneParser extends ConfigParserBase {
    constructor() {
        super();
    }

    static D9 = null;
    static get_instance() {
        return (
            null == StoneParser.D9 && (StoneParser.D9 = new StoneParser()),
            StoneParser.D9
        );
    }

    parseConfig(a) {
        var stoneConfig = new StoneConfig();
        return (
            (stoneConfig.cut = ObjMan.__cast(
                EnumHX.forValue(StoneConfigCutEnum, a.cut),
                StoneConfigCutEnum
            )),
            (stoneConfig.color = this.extractField(a, "color")),
            (stoneConfig.rotationAngle = this.extractField(a, "rotationAngle")),
            (stoneConfig.width = this.extractField(a, "width")),
            (stoneConfig.height = this.extractField(a, "height")),
            (stoneConfig.depth = this.extractField(a, "height", 0)),
            (stoneConfig.__source = a),
            stoneConfig
        );
    }
}
class MaterialOverrideParser extends ConfigParserBase {
    constructor() {
        super();
    }

    static instance = null;
    static get_instance() {
        return (
            null == MaterialOverrideParser.instance &&
            (MaterialOverrideParser.instance = new MaterialOverrideParser()),
            MaterialOverrideParser.instance
        );
    }

    parseConfig(a) {
        var matOverrideConfig = null;
        if (null != a) {
            matOverrideConfig = new MaterialOverrideConfig();
            matOverrideConfig.surfaceOverride = a.surfaceOverride;
            matOverrideConfig.gradientOverride = a.gradientOverride;
            matOverrideConfig.__source = a;
        }
        return matOverrideConfig;
    }
}
class MiddleShapeParser extends ConfigParserBase {
    constructor() {
        super();
    }
    static D9 = null;
    static get_instance() {
        return (
            null == MiddleShapeParser.D9 &&
            (MiddleShapeParser.D9 = new MiddleShapeParser()),
            MiddleShapeParser.D9
        );
    }

    parseConfig(a) {
        var middleShapeConfig = new MiddleShapeConfig();
        (middleShapeConfig.offset = this.extractField(a, "offset")),
            (middleShapeConfig.derivative = this.extractField(a, "derivative", 0)),
            (middleShapeConfig.__source = a);
        var c = a.sine;
        if (null != c) {
            var _SineConfig = new SineConfig();
            (_SineConfig.amplitude = this.extractField(c, "amplitude")),
                (_SineConfig.numberOfCycles = this.extractField(c, "numberOfCycles")),
                (_SineConfig.shiftAngle = this.extractField(c, "shiftAngle")),
                (middleShapeConfig.sine = _SineConfig);
        }
        return middleShapeConfig;
    }
}

class ConfigTransformerBase {
    constructor() { }

    transform(a) {
        throw new Error("Abstract Method error!");
    }
    acceptsConfig(a) {
        throw new Error("Abstract Method error!");
    }
}
class DiagonalDiamondChannelConfigTransformer extends ConfigTransformerBase {
    constructor() {
        super();
    }

    transform(a) {
        for (
            var shapeRingConfig = ObjMan.__cast(a, ShapeRingConfig), c = 0, d = shapeRingConfig.diamondGroups;
            c < d.length;

        ) {
            var e = d[c];
            if (
                (++c,
                    !GeoNumComparor.Equal(e.middleShape.derivative, 0) &&
                    e.setting == DiamondGroupConfigSettingEnum.CHANNEL)
            ) {
                e.setting = DiamondGroupConfigSettingEnum.RUBBED_EDGELESS;
                var gap = this.parseGap(e);
                shapeRingConfig.gaps = null == shapeRingConfig.gaps ? new Array(0) : shapeRingConfig.gaps;
                shapeRingConfig.gaps.push(gap);
            }
        }
        return shapeRingConfig;
    }
    acceptsConfig(conf) {
        var b = ObjMan.__cast(conf, ShapeRingConfig);
        if (b != null && null != b.diamondGroups)
            for (var c = 0, d = b.diamondGroups; c < d.length;) {
                var e = d[c];
                if (
                    (++c,
                        !GeoNumComparor.Equal(e.middleShape.derivative, 0) &&
                        e.setting == DiamondGroupConfigSettingEnum.CHANNEL)
                )
                    return true;
            }
        return false;
    }
    parseGap(a) {
        var gap = new GapConfig();
        return (
            (gap.middleShape = new MiddleShapeConfig()),
            (gap.middleShape.derivative = 1 / a.middleShape.derivative),
            (gap.middleShape.offset = a.middleShape.offset),
            (gap.type = GapConfigTypeEnum.DIAGONAL_DIAMOND_CHANNEL),
            (gap.depth = a.stone.width - 0.25),
            (gap.height = 0.33 * a.stone.width),
            (gap.shiftAngleOnSurface = a.shiftAngleOnSurface),
            gap
        );
    }
}
class HorizontalGrooveConfigTransformer extends ConfigTransformerBase {
    constructor() {
        super();
    }

    transform(config) {
        var shapeRingConfig = ObjMan.__cast(config, ShapeRingConfig);
        for (var k = 0, segments = shapeRingConfig.segments; k < segments.length; k++) {
            var segment = segments[k];
            for (var n = 0; n < segment.grooves.length; n++) {
                var groove = segment.grooves[n];
                if (groove.orientation == GrooveConfigOrientationEnum.HORIZONTAL)  //kkk todo
                {
                    var gap = this.parseGap(groove);
                    shapeRingConfig.gaps.push(gap), segment.grooves.splice(n, 1), --n;
                }
            }
        }
        return shapeRingConfig;
    }
    acceptsConfig(config) {
        var shapeRingConfig = ObjMan.__cast(config, ShapeRingConfig);
        if (shapeRingConfig == null || shapeRingConfig.segments == null) return false;
        var conf = shapeRingConfig.segments;
        for (var b = 0; b < conf.length; b++) {
            var d = conf[b];
            for (var k = 0; k < d.grooves.length; k++) {
                var g = d.grooves[k];
                if (g.orientation == GrooveConfigOrientationEnum.HORIZONTAL)
                    return true;
            }
        }
        return false; //kkk todo org: false
    }
    parseGap(groove) {
        var gap = new GapConfig();
        if (groove.type == GrooveConfigTypeEnum.V)
            gap.type = GapConfigTypeEnum.CROSS_GROOVE_V;
        else if (groove.type == GrooveConfigTypeEnum.U)
            gap.type = GapConfigTypeEnum.CROSS_GROOVE_U;
        else {
            if (groove.type != GrooveConfigTypeEnum.RECT)
                throw new Error(
                    "Not implemented: Horizontal " + gap.type.get_value() + " groove type!"
                );
            gap.type = GapConfigTypeEnum.CROSS_GROOVE_RECT;
        }
        (gap.middleShape = new MiddleShapeConfig()), (gap.middleShape.offset = 0);
        var c = groove.middleShape.derivative;
        isNaN(c)
            ? (gap.middleShape.derivative = 0)
            : (gap.middleShape.derivative = groove.middleShape.derivative);
        (gap.depth = groove.width);
        groove.type == GrooveConfigTypeEnum.V
            ? (gap.height = groove.width / 2 / Math.tan((groove.angle / 2) * MathConsts.DEG_TO_RAD))
            : (gap.height = groove.depth);
        (gap.shiftAngleOnSurface = groove.middleShape.offset);
        return gap;
    }
}
class Memoire5ConfigTransformer extends ConfigTransformerBase {
    constructor() {
        super();
    }
    transform(a) {
        for (
            var b = ObjMan.__cast(a, ShapeRingConfig), c = 0, d = b.diamondGroups;
            c < d.length;

        ) {
            var e = d[c];
            if ((++c, e.setting == DiamondGroupConfigSettingEnum.MEMOIRE5)) {
                e.setting = DiamondGroupConfigSettingEnum.RUBBED_EDGELESS;
                var f = e.stone.width;
                (e.prong = new ProngConfig()),
                    (e.prong.size = 0.4 * f),
                    (e.prong.sidePadding = e.prong.size / 2 + 0.05),
                    (e.prong.shared = true),
                    (e.prong.model = "prong_simple"),
                    (e.prong.rotateLeftBottom = 270),
                    (e.prong.rotateRightBottom = 180),
                    (e.prong.rotateLeft = 0),
                    (e.prong.rotateRight = 180),
                    (e.prong.rotateLeftTop = 0),
                    (e.prong.rotateRightTop = 90),
                    (e.prong.addStartLength = e.prong.size / 2 + e.gap / 2),
                    (e.prong.addEndLength = e.prong.size / 2 + e.gap / 2),
                    (e.channel = new ChannelConfig()),
                    (e.channel.depth = 0.25 * f),
                    (e.channel.type = "crossPlanar");
            }
        }
        return b;
    }
    acceptsConfig(a) {
        var shapeRingConfig = ObjMan.__cast(a, ShapeRingConfig);
        if (shapeRingConfig == null) return false;
        var b = 0;
        var c = shapeRingConfig.diamondGroups;
        if (c == null) return false;
        for (; b < c.length;) {
            var d = c[b];
            if ((++b, d.setting == DiamondGroupConfigSettingEnum.MEMOIRE5))
                return true;
        }
        return false;
    }
}
class Memoire6ConfigTransformer extends ConfigTransformerBase {
    constructor() {
        super();
    }
    transform(a) {
        for (
            var b = ObjMan.__cast(a, ShapeRingConfig), c = 0, d = b.diamondGroups;
            c < d.length;

        ) {
            var e = d[c];
            ++c,
                e.setting == DiamondGroupConfigSettingEnum.MEMOIRE6 &&
                ((e.setting = DiamondGroupConfigSettingEnum.CHANNEL),
                    (e.prong = new ProngConfig()),
                    (e.prong.size = 0.5 * e.stone.width),
                    (e.prong.sidePadding = 0),
                    (e.prong.shared = true),
                    (e.prong.model = "prong_triangle"),
                    (e.prong.rotateLeftBottom = 0),
                    (e.prong.rotateRightBottom = 180),
                    (e.prong.rotateLeft = 0),
                    (e.prong.rotateRight = 180),
                    (e.prong.rotateLeftTop = 0),
                    (e.prong.rotateRightTop = 180),
                    (e.prong.addStartLength = 0),
                    (e.prong.addEndLength = 0));
        }
        return b;
    }
    acceptsConfig(a) {
        var shapeRingConfig = ObjMan.__cast(a, ShapeRingConfig);
        if (shapeRingConfig == null) return false;
        var b = 0, c = shapeRingConfig.diamondGroups;
        if (c == null) return false;
        for (; b < c.length;) {
            var d = c[b];
            if ((++b, d.setting == DiamondGroupConfigSettingEnum.MEMOIRE6))
                return true;
        }
        return false;
    }
}

class KeyPair {
    constructor(a, b) {
        (this.key = a), (this.value = b);
    }
    key = null;
    value = null;
}
class Iterator {
    constructor(array) {
        (this.iterIndex = 0), (this.array = array);
    }
    iterIndex = null;
    array = null;
    hasNext() {
        return this.iterIndex < this.array.length;
    }
    next() {
        return this.array[this.iterIndex++].value;
    }
}
class MetaManBase {
    constructor() {
        this.metaArray = new Array(0);
    }

    metaMap = null;
    metaArray = null;
    get_length() {
        return this.metaArray.length;
    }
    set(metaKey, val) {
        var c = this.metaMap.get(metaKey);
        null == c
            ? ((c = new KeyPair(metaKey, val)), this.metaMap.set(metaKey, c), this.metaArray.push(c))
            : (c.value = val);
    }
    get(a) {
        var b = this.metaMap.get(a);
        return null != b ? b.value : null;
    }
    iterator() {
        return new Iterator(this.metaArray);
    }
    remove(a) {
        var b = this.metaMap.get(a);
        if (null != b) {
            var c = this.metaArray,
                d = c.indexOf(b);
            -1 != d && c.splice(d, 1);
        }
        return this.metaMap.remove(a);
    }
    exists(a) {
        return this.metaMap.exists(a);
    }
    keys() {
        return this.metaMap.keys();
    }
}
class MetaMan extends MetaManBase {
    constructor() {
        super();
        this.metaMap = new MyMap();
    }
}

class EReg {
    constructor(a, b) {
        this.regExp = new RegExp(a, b.split("u").join(""));
    }

    regExp = null;
    match(a) {
        return (
            this.regExp.global && (this.regExp.lastIndex = 0),
            (this.regExp.m = this.regExp.exec(a)),
            (this.regExp.s = a),
            null != this.regExp.m
        );
    }
    matched(a) {
        if (null != this.regExp.m && a >= 0 && a < this.regExp.m.length) return this.regExp.m[a];
        throw new ErrorWrap("EReg::matched");
    }
    matchedPos() {
        if (null == this.regExp.m) throw new ErrorWrap("No string matched");
        return { pos: this.regExp.m.index, len: this.regExp.m[0].length };
    }
    matchSub(a, b, c) {
        if ((null == c && (c = -1), this.regExp.global)) {
            this.regExp.lastIndex = b;
            var d = this.regExp,
                e = 0 > c ? a : StringUtil.substr(a, 0, b + c);
            this.regExp.m = d.exec(e);
            var f = null != this.regExp.m;
            return f && (this.regExp.s = a), f;
        }
        var h = this.match(0 > c ? StringUtil.substr(a, b, null) : StringUtil.substr(a, b, c));
        return h && ((this.regExp.s = a), (this.regExp.m.index += b)), h;
    }
    map(a, b) {
        for (var c = 0, d = ""; ;) {
            if (c >= a.length) break;
            if (!this.matchSub(a, c)) {
                d += Std.string(StringUtil.substr(a, c, null));
                break;
            }
            var e = this.matchedPos();
            if (
                ((d += Std.string(StringUtil.substr(a, c, e.pos - c))),
                    (d += Std.string(b(this))),
                    0 == e.len
                        ? ((d += Std.string(StringUtil.substr(a, e.pos, 1))), (c = e.pos + 1))
                        : (c = e.pos + e.len),
                    !this.regExp.global)
            )
                break;
        }
        return (
            !this.regExp.global &&
            c > 0 &&
            c < a.length &&
            (d += Std.string(StringUtil.substr(a, c, null))),
            d
        );
    }
}
class MetaKeyGenerator {
    static generateMetaKey(keyArray, b) {
        for (var c = "", d = 0; d < keyArray.length; d++) {
            var key = keyArray[d];
            c += Std.string(b.getMetadata(key)) + "_";
        }
        return c;
    }
    static generateNameByMetas(a, b) {
        for (var c = "", d = 0; d < a.length;) {
            var e = a[d];
            ++d;
            var f = b.getMetadata(e);
            null != f &&
                0 != f.length &&
                (c += e + "-" + Std.string(b.getMetadata(e)) + "_");
        }
        return c;
    }
    static generateShortedNameByMetas(a, b, c) {
        for (var d = "", e = 0; e < a.length;) {
            var f = a[e];
            ++e;
            var g = b.getMetadata(f);
            null != g &&
                0 != g.length &&
                (0 != d.length ? (d += "_") : (d = d),
                    (d +=
                        MetaKeyGenerator.tD(f, false, c) +
                        "-" +
                        MetaKeyGenerator.tD(b.getMetadata(f), false, c)));
        }
        return d;
    }
    static tD(a, b, c) {
        var d = new EReg("(^[a-z]|[A-Z0-9])[a-z]*", "g"),
            e = "";
        return (
            (e =
                "" +
                d.map(a, function (a) {
                    var b = d.matched(0);
                    return b.length > c ? StringUtil.substr(b, 0, c) : b;
                })),
            b && (e = e.charAt(0).toUpperCase()),
            e
        );
    }
}
MetaKeyGenerator.separator = "_";

class MetaDataMap {
    __class__ = MetaDataMap;
    static __name__ = ["MetaDataMap"];
    constructor() {
        this.metaMap = new MyMap();
    }
    names() {
        for (var a = new Array(0), b = this.metaMap.keys(); b.hasNext();)
            a.push(b.next());
        return a;
    }
    hasMetadata(a) {
        var b = this.metaMap;
        return null != globalMap[a] ? b.existsReserved(a) : b.map.hasOwnProperty(a);
    }
    getMetadata(a) {
        var b = this.metaMap;
        return null != globalMap[a] ? b.getReserved(a) : b.map[a];
    }
    removeMetaData(a) {
        this.metaMap.remove(a);
    }
    addMetaData(key, val) {
        null != globalMap[key] ? this.metaMap.setReserved(key, val) : (this.metaMap.map[key] = val);
    }
    copyMetaDatasTo(a, b) {
        null == b && (b = true);
        for (var c = this.metaMap.keys(); c.hasNext();) {
            var d = c.next(),
                e = this.metaMap;
            if (
                null != (null != globalMap[d] ? e.getReserved(d) : e.map[d]) &&
                (b || !a.hasMetadata(d))
            ) {
                var f = this.metaMap;
                a.addMetaData(d, null != globalMap[d] ? f.getReserved(d) : f.map[d]);
            }
        }
    }
    hasCommonMeta(a) {
        for (var iter = this.metaMap.keys(); iter.hasNext();) {
            var key = iter.next();
            var value = null != globalMap[key] ? this.metaMap.getReserved(key) : this.metaMap.map[key];
            if (value != a.getMetadata(key))
                return false;
        }
        return true;
    }
    metaEquals(a) {
        return this.hasCommonMeta(a) ? a.hasCommonMeta(this) : false;
    }
    toString() {
        for (var a = "MeataDataMap[", b = this.metaMap.keys(); b.hasNext();) {
            var c = b.next(),
                d = this.metaMap;
            a +=
                c + ":" + Std.string(null != globalMap[c] ? d.getReserved(c) : d.map[c]) + ", ";
        }
        return (a += "]");
    }
}

/////////////////////////////////////////////////////////////////////////////////////////

export {
    CapMeshMeta, CapMeshMetaValue, CutPolyMeta, CutPolyMetaValue, DiamondMeta, DiamondMetaValue,
    EngravingMeta, EngravingMetaValue, GapMeta, GrooveMeta, GrooveMetaValue, ProfileMeta,
    ProfileMetaValue, SegmentMeta, SliceMeta, SliceMetaValue, TranslationMeta, SurfaceMeta,
    DiamondSurfaceType, DiamondPlacementType, DiamondGrooveType
};
export {
    MathConsts, BlendMode
};

export {
    Type, KeyPair, Iterator, MetaMan, MetaKeyGenerator, MetaDataMap, EnumHX, CoordinateSystemPlane, TextAlign, DiamondProngTypeEnum, DiamondTypeEnum,
    DrillTypeEnum, DiamondGroupConfigOrientationEnum, DiamondGroupConfigSettingEnum,
    StoneConfigColorEnum, StoneConfigCutEnum, EngravingLayoutVerticalAlignEnum,
    ArcGeometryConfigDirectionEnum, SliceConfigOrientationEnum, GapConfigTypeEnum,
    GrooveConfigOrientationEnum, GrooveConfigTypeEnum, DiaGrooveEnum
};

export {
    GeoNumComparor, ArcGeometryConfig, LineGeometryConfig, HibridRingSceneConfig,
    ModelRingConfig, ModelRingSceneConfig, ShapeRingConfig, ShapeRingSceneConfig,
    StampEngravingPlacementConfig, TextEngravingPlacementConfig, HibridRingSceneConfigParser,
    ModelRingConfigParser, ShapeRingConfigParser, DiagonalDiamondChannelConfigTransformer, HorizontalGrooveConfigTransformer, HandSceneConfig,
    Memoire5ConfigTransformer, Memoire6ConfigTransformer, HandSnapshotConfigParser
}
