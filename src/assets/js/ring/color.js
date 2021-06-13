/* eslint-disable no-unused-expressions */
var THREE = require("three");

class ColorUtils {
    constructor() { }
    static float32ColorToARGB(a) {
        var b = (4278190080 & a) >>> 24,
            c = (16711680 & a) >>> 16,
            d = (65280 & a) >>> 8,
            e = 255 & a,
            f = [b, c, d, e];
        return f;
    }
    static ARGBtoFloat32(a, b, c, d) {
        return a << 24 | b << 16 | c << 8 | d;
    }
    static componentToHex(a) {
        var b = a.toString(16);
        return 1 == b.length ? "0" + b : b;
    }
    static floatToRGBString(a) {
        var b = (16711680 & a) >>> 16,
            c = (65280 & a) >>> 8,
            d = 255 & a;
        return "rgb(" + b + "," + c + "," + d + ")";
    }
    static RGBToHexString(b) {
        return "#" + ColorUtils.componentToHex(b[1]) + ColorUtils.componentToHex(b[2]) + ColorUtils.componentToHex(b[3]);
    }
    static ARGBToHexString(b) {
        return "#" + ColorUtils.componentToHex(b[0]) + ColorUtils.componentToHex(b[1]) + ColorUtils.componentToHex(b[2]) + ColorUtils.componentToHex(b[3]);
    }
}
class ColorTransform {
    constructor(a, b, c, d, e, f, g, h) {
        null == a && (a = 1),
            null == b && (b = 1),
            null == c && (c = 1),
            null == d && (d = 1),
            null == e && (e = 0),
            null == f && (f = 0),
            null == g && (g = 0),
            null == h && (h = 0),
            this.redMultiplier = a,
            this.greenMultiplier = b,
            this.blueMultiplier = c,
            this.alphaMultiplier = d,
            this.redOffset = e,
            this.greenOffset = f,
            this.blueOffset = g,
            this.alphaOffset = h;
    }
    get color() {
        return this.redOffset << 16 | this.greenOffset << 8 | this.blueOffset
    }
    set color(a) {
        var b = ColorUtils.float32ColorToARGB(a);
        this.redOffset = b[1],
            this.greenOffset = b[2],
            this.blueOffset = b[3],
            this.redMultiplier = 0,
            this.greenMultiplier = 0,
            this.blueMultiplier = 0
    }
    clear() {
        this.redMultiplier = 1,
            this.greenMultiplier = 1,
            this.blueMultiplier = 1,
            this.alphaMultiplier = 1,
            this.redOffset = 0,
            this.greenOffset = 0,
            this.blueOffset = 0,
            this.alphaOffset = 0
    }
    clone() {
        return new ColorTransform(
            this.redMultiplier,
            this.greenMultiplier,
            this.blueMultiplier,
            this.alphaMultiplier,
            this.redOffset,
            this.greenOffset,
            this.blueOffset,
            this.alphaOffset)
    }
    copyFrom(a) {
        this.redMultiplier = a.redMultiplier,
            this.greenMultiplier = a.greenMultiplier,
            this.blueMultiplier = a.blueMultiplier,
            this.alphaMultiplier = a.alphaMultiplier,
            this.redOffset = a.redOffset,
            this.greenOffset = a.greenOffset,
            this.blueOffset = a.blueOffset,
            this.alphaOffset = a.alphaOffset;
    }
    copyTo(a) {
        a.copyFrom(this)
    }
    prepend(a) {
        this.redOffset += a.redOffset * this.redMultiplier,
            this.greenOffset += a.greenOffset * this.greenMultiplier,
            this.blueOffset += a.blueOffset * this.blueMultiplier,
            this.alphaOffset += a.alphaOffset * this.alphaMultiplier,
            this.redMultiplier *= a.redMultiplier,
            this.greenMultiplier *= a.greenMultiplier,
            this.blueMultiplier *= a.blueMultiplier,
            this.alphaMultiplier *= a.alphaMultiplier;
    }
}

export { ColorUtils, ColorTransform };
