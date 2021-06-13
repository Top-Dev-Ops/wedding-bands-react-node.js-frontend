/* eslint-disable no-unused-expressions */
import { ObjMan, StringUtil, Std, Int, Float, Bool } from "./objman.js"
import {
    ImageUtils
} from "./util.js"
import { globalMap, MyMap } from "./map.js"
import {
    MetaDataMap, EnumHX, TextAlign, CutPolyMeta, CutPolyMetaValue,
    EngravingMeta, EngravingMetaValue, ProfileMeta, ProfileMetaValue,
    StampEngravingPlacementConfig, TextEngravingPlacementConfig,
} from "./meta.js"
import {
    EngavingStampImageBuildAsset, EngavingTextImageBuildAsset
} from "./built.js"
import {
    Rectangle, PointEx, Vector3D, Matrix,
    Face4, Face3, SimpleMeshData
} from "./geometry.js"
import { SimpleGeometryDataUtil } from "./util.js"

class SeparatePolyData {
    constructor(a) {
        this.polygon = a;
        this.separateFilterMetas = new MetaDataMap();
        this.additionalMetas = new MetaDataMap();
    }

    polygon = null;
    get_polygon() {
        return this.polygon;
    }
    additionalMetas = null;
    get_additionalMetas() {
        return this.additionalMetas;
    }
    separateFilterMetas = null;
    get_separateFilterMetas() {
        return this.separateFilterMetas;
    }
}
class EngravingImageFactoryBase {
    constructor() { }
    create() {
        var a = this.doCreate();
        return a
    }
    doCreate() {
        throw new Error("doCreate is an abstract method you must override it")
    }
}
class EngravingImage {
    constructor() { }
    getPlacementRect() {
        return this.placementRect
    }
    setPlacementRect(a) {
        this.placementRect != a && (this.placementRect = a)
    }
    getTextureWidth() {
        return this.texture.width
    }
    getTextureHeight() {
        return this.texture.height
    }
    clone() {
        var b = new EngravingImage;
        b.texture = this.texture,
            b.normalMap = this.normalMap,
            b.setPlacementRect(this.getPlacementRect().clone());
        return b;
    }
    dispose() { }
}
class StampEngravingImageFactory extends EngravingImageFactoryBase {
    constructor() {
        super();
    }
    doCreate() {
        var engravingImage = new EngravingImage;
        engravingImage.setPlacementRect(new Rectangle(0, 0, this.stampImageData.width, this.stampImageData.height));
        engravingImage.texture = this.stampImageData;
        engravingImage.normalMap = this.stampNormalData;
        return engravingImage
    }
}
class DisplacementToNormConverter {
    constructor() {
        this.direction = "y",
            this.amplitude = 8
    }
    setDisplacementMapData(a) {
        this.displcamentBitmapData = a
    }
    setDirection(a) {
        this.direction = a
    }
    setAmplitude(a) {
        this.amplitude = a
    }
    getNormalMap() {
        return this.normalMap
    }
    getDisplacement(bmpData, x, y) {
        var d = 4 * (x + y * bmpData.width);
        return bmpData.data[d + 2] / 255
    }
    setNormal(imageData, x, y, normalV) {
        var r, g, b;
        normalV.normalize();
        if ("x" == this.direction) {
            r = normalV.z / 2 + .5;
            g = normalV.x / 2 + .5;
            b = normalV.y / 2 + .5;
        }
        else if ("y" == this.direction) {
            r = normalV.x / 2 + .5;
            g = normalV.z / 2 + .5;
            b = normalV.y / 2 + .5;
        }
        else {
            r = normalV.x / 2 + .5;
            g = normalV.y / 2 + .5;
            b = normalV.z / 2 + .5;
        }
        var id = 4 * (x + y * imageData.width);
        imageData.data[id] = 255 * r;
        imageData.data[id + 1] = 255 * g;
        imageData.data[id + 2] = 255 * b;
        imageData.data[id + 3] = 255
    }
    convertToNormalMap() {
        return null
    }
}
class PlanarDisplacementToNormConverter extends DisplacementToNormConverter {
    constructor() {
        super();
    }
    convertToNormalMap() {
        if (null == this.displcamentBitmapData) throw new Error("displcamentBitmapData is not set");
        var width = this.displcamentBitmapData.width;
        var height = this.displcamentBitmapData.height;
        var imageData = new ImageData(width, height);
        var d = 1 / this.amplitude;
        var normalV = new Vector3D;
        var i, j;
        for (var x = 1; width - 1 > x; x++) {
            for (var y = 1; height - 1 > y; y++) {
                i = -.5 * (this.getDisplacement(this.displcamentBitmapData, x + 1, y) - this.getDisplacement(this.displcamentBitmapData, x - 1, y));
                j = -.5 * (this.getDisplacement(this.displcamentBitmapData, x, y + 1) - this.getDisplacement(this.displcamentBitmapData, x, y - 1));
                normalV.setTo(i, j, d);
                this.setNormal(imageData, x, y, normalV)
            }
        }
        for (x = 1; width - 1 > x; x++) {
            i = -.5 * (this.getDisplacement(this.displcamentBitmapData, x + 1, 0) - this.getDisplacement(this.displcamentBitmapData, x - 1, 0));
            j = -.333333 * (-3 * this.getDisplacement(this.displcamentBitmapData, x, 0) + 4 * this.getDisplacement(this.displcamentBitmapData, x, 1) - this.getDisplacement(this.displcamentBitmapData, x, 2));
            normalV.setTo(i, j, d), this.setNormal(imageData, x, 0, normalV);
            i = -.5 * (this.getDisplacement(this.displcamentBitmapData, x + 1, height - 1) - this.getDisplacement(this.displcamentBitmapData, x - 1, height - 1));
            j = .333333 * (-3 * this.getDisplacement(this.displcamentBitmapData, x, height - 1) + 4 * this.getDisplacement(this.displcamentBitmapData, x, height - 2) - this.getDisplacement(this.displcamentBitmapData, x, height - 3));
            normalV.setTo(i, j, d);
            this.setNormal(imageData, x, height - 1, normalV);
        }
        for (y = 1; height - 1 > y; y++) {
            i = -.333333 * (-3 * this.getDisplacement(this.displcamentBitmapData, 0, y) + 4 * this.getDisplacement(this.displcamentBitmapData, 1, y) - this.getDisplacement(this.displcamentBitmapData, 2, 1));
            j = -.5 * (this.getDisplacement(this.displcamentBitmapData, 0, y + 1) - this.getDisplacement(this.displcamentBitmapData, 0, y - 1));
            normalV.setTo(i, j, d);
            this.setNormal(imageData, 0, y, normalV);
            i = .333333 * (-3 * this.getDisplacement(this.displcamentBitmapData, width - 1, y) + 4 * this.getDisplacement(this.displcamentBitmapData, width - 2, y) - this.getDisplacement(this.displcamentBitmapData, width - 3, 1));
            j = -.5 * (this.getDisplacement(this.displcamentBitmapData, width - 1, y + 1) - this.getDisplacement(this.displcamentBitmapData, width - 1, y - 1));
            normalV.setTo(i, j, d);
            this.setNormal(imageData, width - 1, y, normalV);
        }

        i = -.333333 * (-3 * this.getDisplacement(this.displcamentBitmapData, 0, 0) + 4 * this.getDisplacement(this.displcamentBitmapData, 1, 0) - this.getDisplacement(this.displcamentBitmapData, 2, 0));
        j = -.333333 * (-3 * this.getDisplacement(this.displcamentBitmapData, 0, 0) + 4 * this.getDisplacement(this.displcamentBitmapData, 0, 1) - this.getDisplacement(this.displcamentBitmapData, 0, 2));
        normalV.setTo(i, j, d);
        this.setNormal(imageData, 0, 0, normalV);

        i = -.333333 * (-3 * this.getDisplacement(this.displcamentBitmapData, 0, height - 1) + 4 * this.getDisplacement(this.displcamentBitmapData, 1, height - 1) - this.getDisplacement(this.displcamentBitmapData, 2, height - 1));
        j = .333333 * (-3 * this.getDisplacement(this.displcamentBitmapData, 0, height - 1) + 4 * this.getDisplacement(this.displcamentBitmapData, 0, height - 2) - this.getDisplacement(this.displcamentBitmapData, 0, height - 3));
        normalV.setTo(i, j, d);
        this.setNormal(imageData, 0, height - 1, normalV);

        i = .333333 * (-3 * this.getDisplacement(this.displcamentBitmapData, width - 1, 0) + 4 * this.getDisplacement(this.displcamentBitmapData, width - 2, 0) - this.getDisplacement(this.displcamentBitmapData, width - 3, 0));
        j = -.333333 * (-3 * this.getDisplacement(this.displcamentBitmapData, width - 1, 0) + 4 * this.getDisplacement(this.displcamentBitmapData, width - 1, 1) - this.getDisplacement(this.displcamentBitmapData, width - 1, 2));
        normalV.setTo(i, j, d);
        this.setNormal(imageData, width - 1, 0, normalV);

        i = .333333 * (-3 * this.getDisplacement(this.displcamentBitmapData, width - 1, height - 1) + 4 * this.getDisplacement(this.displcamentBitmapData, width - 2, height - 1) - this.getDisplacement(this.displcamentBitmapData, width - 3, height - 1));
        j = .333333 * (-3 * this.getDisplacement(this.displcamentBitmapData, width - 1, height - 1) + 4 * this.getDisplacement(this.displcamentBitmapData, width - 1, height - 2) - this.getDisplacement(this.displcamentBitmapData, width - 1, height - 3));
        normalV.setTo(i, j, d);
        this.setNormal(imageData, width - 1, height - 1, normalV);

        this.normalMap = imageData;
        return this.normalMap
    }
}
class TextEngraving {
    constructor() { }
    fontSize = null;
    fieldWidth = null;
    fieldHeight = null;
}
class TextEngravingImageFactory extends EngravingImageFactoryBase {
    constructor(b) {
        super();
        (undefined == b) && (b = null);
        this.preferedTextHeight = 100;
        this.maxTextWidth = 2048;
        this.mirrorX = false;
        this.mirrorY = false;
        this.canvasElement = (b || document.createElement("canvas"));
        this.textDrawContext = this.canvasElement.getContext("2d");
        this.normalConverter = new PlanarDisplacementToNormConverter;
        this.normalConverter.setDirection("z");
        this.normalConverter.setAmplitude(10);
    }
    doCreate() {
        var engravingImage = new EngravingImage,
            imgData = this.generateEngravingTextImage(this.text, this.font);
        engravingImage.setPlacementRect(new Rectangle(0, 0, imgData.width, imgData.height));
        var width = ImageUtils.getBestPowerOf2(imgData.width),
            height = ImageUtils.getBestPowerOf2(imgData.height);
        this.canvasElement.width = width,
            this.canvasElement.height = height,
            this.textDrawContext.save(),
            this.textDrawContext.fillStyle = "rgba(0, 0, 0, 0)",
            this.textDrawContext.fillRect(0, 0, width, height),
            this.textDrawContext.putImageData(imgData, 0, 0);
        var texture = this.textDrawContext.getImageData(0, 0, width, height);
        this.normalConverter.setDisplacementMapData(texture);
        var normalMap = this.normalConverter.convertToNormalMap();
        this.textDrawContext.restore();
        engravingImage.texture = texture;
        engravingImage.normalMap = normalMap;
        return engravingImage;
    }
    generateEngravingTextImage(text, font) {
        var d = TextEngravingImageFactory.measureFontForPreferedSize(this.canvasElement, this.textDrawContext, text, font, this.preferedTextHeight, this.maxTextWidth);
        (0 == d.fieldWidth || 0 == d.fieldHeight) && (console && console.warn && console.warn("Font: " + font + " for engraving was not loaded, using default fonts"),
            // font = "Arial, sans-serif",
            d = TextEngravingImageFactory.measureFontForPreferedSize(this.canvasElement, this.textDrawContext, text, font, this.preferedTextHeight, this.maxTextWidth));
        var height = d.fieldHeight,
            width = d.fieldWidth,
            matrix = new Matrix;
        matrix.rotate(Math.PI / 2),
            matrix.translate(height, 0),
            this.mirrorX && this.mirrorY ? (matrix.scale(-1, -1), matrix.translate(height, width)) : this.mirrorX ? (matrix.scale(-1, 1), matrix.translate(height, 0)) : this.mirrorY && (matrix.scale(1, -1), matrix.translate(0, width)),
            this.canvasElement.width = height,
            this.canvasElement.height = width,
            this.textDrawContext.save(),
            this.textDrawContext.fillStyle = "rgba(0, 0, 0, 0)",
            this.textDrawContext.fillRect(0, 0, height, width),
            TextEngravingImageFactory.setDefaultFontproperties(this.textDrawContext, font, d.fontSize),
            this.textDrawContext.fillStyle = "rgba(255, 255, 255, 1)",
            this.textDrawContext.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty),
            this.textDrawContext.fillText(text, 0, 0);
        var imgData = this.textDrawContext.getImageData(0, 0, height, width);
        this.textDrawContext.restore();
        return imgData
    }
    //text, font, this.preferedTextHeight, this.maxTextWidth
    static measureFontForPreferedSize(canvasElement, textDrawContext, text, font, h, maxWidth) {
        TextEngravingImageFactory.setDefaultFontproperties(textDrawContext, font, h);
        var metrics = textDrawContext.measureText(text);
        for (; metrics.width > maxWidth;) {
            h -= 1;
            TextEngravingImageFactory.setDefaultFontproperties(textDrawContext, font, h);
            metrics = textDrawContext.measureText(text);
        }
        var height = TextEngravingImageFactory.getFieldHeightForFontSize(canvasElement, textDrawContext, font, h);
        var textEngraving = new TextEngraving;
        textEngraving.fontSize = h;
        textEngraving.fieldWidth = metrics.width;
        textEngraving.fieldHeight = height;
        return textEngraving
    }
    static getFieldHeightForFontSize(canvasElement, textDrawContext, font, txtSize) {
        var width = canvasElement.width,
            height = canvasElement.height,
            w = 3 * txtSize,
            h = 3 * txtSize;
        canvasElement.width = w;
        canvasElement.height = h;
        textDrawContext.save();
        textDrawContext.fillStyle = "rgba(0, 0, 0, 0)";
        textDrawContext.fillRect(0, 0, w, h);
        TextEngravingImageFactory.setDefaultFontproperties(textDrawContext, font, txtSize);
        textDrawContext.fillStyle = "rgba(0, 0, 0, 1)";
        textDrawContext.fillText("Wq", 0, 0);
        var j = textDrawContext.getImageData(0, 0, w, h);
        var fontSize = 0;
        loop: for (var l = 0; h > l; l++) {
            for (var m = 0; w > m; m++) {
                var n = 4 * (m + l * w);
                if (j.data[n + 3] > 0) {
                    fontSize = l + 1;
                    continue loop
                }
            }
        }
        textDrawContext.restore();
        canvasElement.width = width;
        canvasElement.height = height;
        return fontSize
    }
    static setDefaultFontproperties(drawContext, font, size) {
        drawContext.font = size + "px '" + font + "'";
        drawContext.textAlign = "left";
        drawContext.textBaseline = "top";
    }
}
class StrEncoder {
    constructor(buffer) {
        this.length = buffer.byteLength;
        this.b = new Uint8Array(buffer);
        this.b.bufferValue = buffer;
        buffer.hxBytes = this;
        buffer.bytes = this.b;
    }
    b = null;
    static encode(str) {
        var array = [];
        for (var id = 0; id < str.length;) {
            var char = str.charCodeAt(id++);
            char >= 55296 &&
                56319 >= char &&
                (char = ((char - 55232) << 10) | (1023 & str.charCodeAt(id++))),
                127 >= char
                    ? array.push(char)
                    : 2047 >= char
                        ? (array.push(192 | (char >> 6)), array.push(128 | (63 & char)))
                        : 65535 >= char
                            ? (array.push(224 | (char >> 12)),
                                array.push(128 | ((char >> 6) & 63)),
                                array.push(128 | (63 & char)))
                            : (array.push(240 | (char >> 18)),
                                array.push(128 | ((char >> 12) & 63)),
                                array.push(128 | ((char >> 6) & 63)),
                                array.push(128 | (63 & char)));
        }
        return new StrEncoder(new Uint8Array(array)/*new nextObj(b)*/.buffer);
    }
}
class Encoder {
    constructor() { }
    static encode(a) {
        var encoder = new Encoder();
        return encoder.hex(encoder.doEncode(Encoder.str2blks(a)));
    }
    static str2blks(a) {
        for (
            var b = StrEncoder.encode(a),
            c = ((b.length + 8) >> 6) + 1,
            d = [],
            e = 16 * c,
            f = 0;
            e > f; f++

        )
            d[f] = 0;
        for (var g = 0, h = b.length, i = 8 * h; h > g;)
            (d[g >> 2] |= b.b[g] << (((i + g) % 4) * 8)), ++g;
        d[g >> 2] |= 128 << (((i + g) % 4) * 8);
        var j = 16 * c - 2;
        return (
            (d[j] = 255 & i),
            (d[j] = (d[j] |= ((i >>> 8) & 255) << 8) | (((i >>> 16) & 255) << 16)),
            (d[j] |= ((i >>> 24) & 255) << 24),
            d
        );
    }

    bitOR(a, b) {
        return (((a >>> 1) | (b >>> 1)) << 1) | ((1 & a) | (1 & b));
    }
    bitXOR(a, b) {
        return (((a >>> 1) ^ (b >>> 1)) << 1) | ((1 & a) ^ (1 & b));
    }
    bitAND(a, b) {
        return (((a >>> 1) & (b >>> 1)) << 1) | (1 & a & (1 & b));
    }
    addme(a, b) {
        var c = (65535 & a) + (65535 & b);
        return (((a >> 16) + (b >> 16) + (c >> 16)) << 16) | (65535 & c);
    }
    hex(a) {
        for (var b = "", c = 0; c < a.length;) {
            var d = a[c];
            ++c;
            for (var e = 0; 4 > e;) {
                var f = e++;
                b +=
                    "0123456789abcdef".charAt((d >> (8 * f + 4)) & 15) +
                    "0123456789abcdef".charAt((d >> (8 * f)) & 15);
            }
        }
        return b;
    }
    rol(a, b) {
        return (a << b) | (a >>> (32 - b));
    }
    cmn(a, b, c, d, e, f) {
        return this.addme(
            this.rol(this.addme(this.addme(b, a), this.addme(d, f)), e),
            c
        );
    }
    ff(a, b, c, d, e, f, g) {
        return this.cmn(
            this.bitOR(this.bitAND(b, c), this.bitAND(~b, d)),
            a,
            b,
            e,
            f,
            g
        );
    }
    gg(a, b, c, d, e, f, g) {
        return this.cmn(
            this.bitOR(this.bitAND(b, d), this.bitAND(c, ~d)),
            a,
            b,
            e,
            f,
            g
        );
    }
    hh(a, b, c, d, e, f, g) {
        return this.cmn(this.bitXOR(this.bitXOR(b, c), d), a, b, e, f, g);
    }
    ii(a, b, c, d, e, f, g) {
        return this.cmn(this.bitXOR(c, this.bitOR(b, ~d)), a, b, e, f, g);
    }
    doEncode(a) {
        for (
            var b = 1732584193, c = -271733879, d = -1732584194, e = 271733878, f = 0;
            f < a.length;

        ) {
            var g = b,
                h = c,
                i = d,
                j = e;
            (b = this.ff(b, c, d, e, a[f], 7, -680876936)),
                (e = this.ff(e, b, c, d, a[f + 1], 12, -389564586)),
                (d = this.ff(d, e, b, c, a[f + 2], 17, 606105819)),
                (c = this.ff(c, d, e, b, a[f + 3], 22, -1044525330)),
                (b = this.ff(b, c, d, e, a[f + 4], 7, -176418897)),
                (e = this.ff(e, b, c, d, a[f + 5], 12, 1200080426)),
                (d = this.ff(d, e, b, c, a[f + 6], 17, -1473231341)),
                (c = this.ff(c, d, e, b, a[f + 7], 22, -45705983)),
                (b = this.ff(b, c, d, e, a[f + 8], 7, 1770035416)),
                (e = this.ff(e, b, c, d, a[f + 9], 12, -1958414417)),
                (d = this.ff(d, e, b, c, a[f + 10], 17, -42063)),
                (c = this.ff(c, d, e, b, a[f + 11], 22, -1990404162)),
                (b = this.ff(b, c, d, e, a[f + 12], 7, 1804603682)),
                (e = this.ff(e, b, c, d, a[f + 13], 12, -40341101)),
                (d = this.ff(d, e, b, c, a[f + 14], 17, -1502002290)),
                (c = this.ff(c, d, e, b, a[f + 15], 22, 1236535329)),
                (b = this.gg(b, c, d, e, a[f + 1], 5, -165796510)),
                (e = this.gg(e, b, c, d, a[f + 6], 9, -1069501632)),
                (d = this.gg(d, e, b, c, a[f + 11], 14, 643717713)),
                (c = this.gg(c, d, e, b, a[f], 20, -373897302)),
                (b = this.gg(b, c, d, e, a[f + 5], 5, -701558691)),
                (e = this.gg(e, b, c, d, a[f + 10], 9, 38016083)),
                (d = this.gg(d, e, b, c, a[f + 15], 14, -660478335)),
                (c = this.gg(c, d, e, b, a[f + 4], 20, -405537848)),
                (b = this.gg(b, c, d, e, a[f + 9], 5, 568446438)),
                (e = this.gg(e, b, c, d, a[f + 14], 9, -1019803690)),
                (d = this.gg(d, e, b, c, a[f + 3], 14, -187363961)),
                (c = this.gg(c, d, e, b, a[f + 8], 20, 1163531501)),
                (b = this.gg(b, c, d, e, a[f + 13], 5, -1444681467)),
                (e = this.gg(e, b, c, d, a[f + 2], 9, -51403784)),
                (d = this.gg(d, e, b, c, a[f + 7], 14, 1735328473)),
                (c = this.gg(c, d, e, b, a[f + 12], 20, -1926607734)),
                (b = this.hh(b, c, d, e, a[f + 5], 4, -378558)),
                (e = this.hh(e, b, c, d, a[f + 8], 11, -2022574463)),
                (d = this.hh(d, e, b, c, a[f + 11], 16, 1839030562)),
                (c = this.hh(c, d, e, b, a[f + 14], 23, -35309556)),
                (b = this.hh(b, c, d, e, a[f + 1], 4, -1530992060)),
                (e = this.hh(e, b, c, d, a[f + 4], 11, 1272893353)),
                (d = this.hh(d, e, b, c, a[f + 7], 16, -155497632)),
                (c = this.hh(c, d, e, b, a[f + 10], 23, -1094730640)),
                (b = this.hh(b, c, d, e, a[f + 13], 4, 681279174)),
                (e = this.hh(e, b, c, d, a[f], 11, -358537222)),
                (d = this.hh(d, e, b, c, a[f + 3], 16, -722521979)),
                (c = this.hh(c, d, e, b, a[f + 6], 23, 76029189)),
                (b = this.hh(b, c, d, e, a[f + 9], 4, -640364487)),
                (e = this.hh(e, b, c, d, a[f + 12], 11, -421815835)),
                (d = this.hh(d, e, b, c, a[f + 15], 16, 530742520)),
                (c = this.hh(c, d, e, b, a[f + 2], 23, -995338651)),
                (b = this.ii(b, c, d, e, a[f], 6, -198630844)),
                (e = this.ii(e, b, c, d, a[f + 7], 10, 1126891415)),
                (d = this.ii(d, e, b, c, a[f + 14], 15, -1416354905)),
                (c = this.ii(c, d, e, b, a[f + 5], 21, -57434055)),
                (b = this.ii(b, c, d, e, a[f + 12], 6, 1700485571)),
                (e = this.ii(e, b, c, d, a[f + 3], 10, -1894986606)),
                (d = this.ii(d, e, b, c, a[f + 10], 15, -1051523)),
                (c = this.ii(c, d, e, b, a[f + 1], 21, -2054922799)),
                (b = this.ii(b, c, d, e, a[f + 8], 6, 1873313359)),
                (e = this.ii(e, b, c, d, a[f + 15], 10, -30611744)),
                (d = this.ii(d, e, b, c, a[f + 6], 15, -1560198380)),
                (c = this.ii(c, d, e, b, a[f + 13], 21, 1309151649)),
                (b = this.ii(b, c, d, e, a[f + 4], 6, -145523070)),
                (e = this.ii(e, b, c, d, a[f + 11], 10, -1120210379)),
                (d = this.ii(d, e, b, c, a[f + 2], 15, 718787259)),
                (c = this.ii(c, d, e, b, a[f + 9], 21, -343485551)),
                (b = this.addme(b, g)),
                (c = this.addme(c, h)),
                (d = this.addme(d, i)),
                (e = this.addme(e, j)),
                (f += 16);
        }
        return [b, c, d, e];
    }
}
class ImageWrapper {
    __class__ = ImageWrapper;
    static __name__ = ["ImageWrapper"];
    image = null;
    uid = null;
    x = null;
    width = null;
    y = null;
    height = null;
    constructor(uid, image, x, y, width, height) {
        (this.uid = uid),
            (this.image = image),
            (this.x = x),
            (this.y = y),
            (this.width = width),
            (this.height = height);
    }

    get_image() {
        return this.image;
    }
    get_uid() {
        return this.uid;
    }
    get_x() {
        return this.x;
    }
    get_width() {
        return this.width;
    }
    get_y() {
        return this.y;
    }
    get_height() {
        return this.height;
    }
}
class EngravePlacement {
    static __name__ = ["SA2"];
    paddingBottom = null;
    paddingRight = null;
    width = null;
    paddingTop = null;
    height = null;
    asset = null;
    paddingLeft = null;
    constructor(asset) {
        this.paddingLeft = 0,
            this.paddingTop = 0,
            this.paddingRight = 0,
            this.paddingBottom = 0,
            this.asset = asset;
    }

    get_paddingBottom() {
        return this.paddingBottom;
    }
    set_paddingBottom(a) {
        return this.paddingBottom == a ? this.paddingBottom : ((this.paddingBottom = a), this.paddingBottom);
    }
    get_paddingRight() {
        return this.paddingRight;
    }
    set_paddingRight(a) {
        return this.paddingRight == a ? this.paddingRight : ((this.paddingRight = a), this.paddingRight);
    }
    get_width() {
        return this.width;
    }
    set_width(a) {
        return this.width == a ? this.width : ((this.width = a), this.width);
    }
    get_paddingTop() {
        return this.paddingTop;
    }
    set_paddingTop(a) {
        return this.paddingTop == a ? this.paddingTop : ((this.paddingTop = a), this.paddingTop);
    }
    get_asset() {
        return this.asset;
    }
    get_paddingLeft() {
        return this.paddingLeft;
    }
    set_paddingLeft(a) {
        return this.paddingLeft == a ? this.paddingLeft : ((this.paddingLeft = a), this.paddingLeft);
    }
    get_height() {
        return this.height;
    }
    set_height(a) {
        return this.height == a ? this.height : ((this.height = a), this.height);
    }
    get_image() {
        return this.asset.get_engravingImageContent();
    }
    get_imageWidthHeightRatio() {
        return (
            this.get_image().getPlacementRect().width /
            this.get_image().getPlacementRect().height
        );
    }
}
class EngravingSetterBase {
    static __name__ = ["EngravingSetterBase"];

    placementArray = null;
    constructor() {
        this.placementArray = new Array(0);
    }

    get_placementCount() {
        return this.placementArray.length;
    }
    getPlacementAt(a) {
        return this.placementArray[a];
    }
    addPlacement(a) {
        this.placementArray.push(a);
    }
    createImageWrapperArray(left, right, circleLength) {
        throw new Error(
            "measurePlacements is an abstract method you must override it"
        );
    }
}
class EngravingSetter extends EngravingSetterBase {
    static __name__ = ["EngravingSetter"];
    verticalAlign = null;
    startAngle = null;
    horizontalAlign = null;
    gap = null;
    constructor() {
        super();
        (this.gap = 0),
            (this.startAngle = 0),
            (this.horizontalAlign = TextAlign.Center),
            (this.verticalAlign = TextAlign.Top);
    }

    get_verticalAlign() {
        return this.verticalAlign;
    }
    set_verticalAlign(a) {
        return this.verticalAlign == a ? this.verticalAlign : ((this.verticalAlign = a), this.verticalAlign);
    }

    get_startAngle() {
        return this.startAngle;
    }
    set_startAngle(a) {
        return this.startAngle == a ? this.startAngle : ((this.startAngle = a), this.startAngle);
    }

    get_horizontalAlign() {
        return this.horizontalAlign;
    }
    set_horizontalAlign(a) {
        return this.horizontalAlign == a ? this.horizontalAlign : ((this.horizontalAlign = a), this.horizontalAlign);
    }

    get_gap() {
        return this.gap;
    }
    set_gap(a) {
        return this.gap == a ? this.gap : ((this.gap = a), this.gap);
    }
    createImageWrapperArray(left, right, circleLength) {
        var imgWrapper,
            imgWrapperArray = new Array(0),
            f = this.gw(),
            g = this.gx(this.startAngle) * circleLength;
        this.get_verticalAlign() == TextAlign.Middle ? (g -= f / 2) : (this.get_verticalAlign() == TextAlign.Bottom) && (g -= f);
        for (var id = 0; id < this.placementArray.length;) {
            var placement = this.placementArray[id],
                width = placement.get_width(),
                height = placement.get_width() / placement.get_imageWidthHeightRatio(),
                center = (right - left - (placement.get_paddingRight() + width + placement.get_paddingLeft())) / 2 + left;
            imgWrapper = new ImageWrapper(
                placement.get_asset().get_uid(),
                placement.get_image(),
                center,
                g + placement.get_paddingTop(),
                width,
                height
            );
            imgWrapperArray.push(imgWrapper);
            g += placement.get_paddingTop() + height + placement.get_paddingBottom() + this.get_gap();
            ++id;
        }
        return imgWrapperArray;
    }
    gw() {
        var a = 0;
        for (var id = 0; id < this.placementArray.length;) {
            var placement = this.placementArray[id];
            if (null == placement.get_image()) throw new Error("Placement image not loaded");
            var d = placement.get_width();
            if (d != d) throw new Error("Placement width must be set");
            var height = placement.get_width() / placement.get_imageWidthHeightRatio();
            a += placement.get_paddingTop() + height + placement.get_paddingBottom();
            id < this.placementArray.length - 1 && (a += this.gap);
            ++id;
        }
        return a;
    }
    gA(a, b) {
        return this.gx(a / b);
    }
    gx(a) {
        return (a %= 1) >= 0 ? a : a + 1;
    }
}
class EngravingImageManager {
    static __name__ = ["SA0"];
    engravingSetterArray = null;
    constructor() {
        this.engravingSetterArray = new Array(0);
    }

    addEngravingSetter(engravingSetter) {
        this.engravingSetterArray.push(engravingSetter);
    }
    removeAllEngravingSetters() {
        this.engravingSetterArray.splice(0, this.engravingSetterArray.length);
    }
    createPlacementMetrics(left, right, circleLength) {
        var d = new Array(0);
        for (var id = 0; id < this.engravingSetterArray.length;) {
            var engravingSetter = this.engravingSetterArray[id];
            ++id;
            var h = engravingSetter.createImageWrapperArray(left, right, circleLength);
            d = null == h ? d.slice() : d.concat(h);
        }
        return d;
    }
}
class EngravingConfigBuilder {
    constructor() {
        this.engravingImgManager = new EngravingImageManager();
    }
    engravingAssetsMap = null;
    circleLength = null;
    engravingImgManager = null;
    imageWrappersMap = null;
    placementMetrics = null;
    get_placementMetrics() {
        return this.placementMetrics;
    }
    update(circleLength, left, right) {
        this.circleLength = circleLength;
        this.placementMetrics = this.engravingImgManager.createPlacementMetrics(left, right, circleLength);

        this.imageWrappersMap = new MyMap();
        var size = this.get_placementMetrics().length;
        for (var id = 0; id < size;) {
            var placement = this.get_placementMetrics()[id],
                uid = placement.get_uid();
            null != globalMap[uid] ? this.imageWrappersMap.setReserved(uid, placement) : (this.imageWrappersMap.map[uid] = placement), ++id;
        }
    }
    collectAndBuildEngraving(engravingLayouts) {
        var assetsArray = new Array(0);
        this.engravingImgManager.removeAllEngravingSetters();
        this.engravingAssetsMap = new MyMap();
        for (var c = 0; c < engravingLayouts.length;) {
            var engravingLay = engravingLayouts[c];
            ++c;
            var engravingSetter = new EngravingSetter();
            engravingSetter.set_verticalAlign(EnumHX.forValue(TextAlign, engravingLay.verticalAlign.get_value()));
            // e.set_verticalAlign(engravingLay.verticalAlign);
            engravingSetter.set_gap(engravingLay.gap);
            engravingSetter.set_startAngle(engravingLay.startAngle);
            for (var id = 0, g = engravingLay.children; id < g.length;) {
                var conf = g[id];
                ++id;
                var engavingImageBuildAsset;
                if (ObjMan.__instanceof(conf, TextEngravingPlacementConfig)) {
                    var textImageBuildAsset = new EngavingTextImageBuildAsset();
                    textImageBuildAsset.set_font(conf.font);
                    textImageBuildAsset.set_text(conf.text);
                    textImageBuildAsset.set_carveType(conf.carveType);
                    engavingImageBuildAsset = textImageBuildAsset;
                } else {
                    if (!ObjMan.__instanceof(conf, StampEngravingPlacementConfig))
                        throw new Error(
                            "Unknown engraving placement config " + Std.string(conf)
                        );
                    var stampImageBuildAsset = new EngavingStampImageBuildAsset();
                    stampImageBuildAsset.set_type(conf.stampForm);
                    engavingImageBuildAsset = stampImageBuildAsset;
                }
                var engravePlacement = new EngravePlacement(engavingImageBuildAsset);
                engravePlacement.set_paddingLeft(conf.paddingLeft);
                engravePlacement.set_paddingRight(conf.paddingRight);
                engravePlacement.set_paddingTop(conf.paddingTop);
                engravePlacement.set_paddingBottom(conf.paddingBottom);
                engravePlacement.set_width(conf.height);
                engravingSetter.addPlacement(engravePlacement);
                var uid = engavingImageBuildAsset.get_uid();
                null != globalMap[uid] ? this.engravingAssetsMap.setReserved(uid, engavingImageBuildAsset) : (this.engravingAssetsMap.map[uid] = engavingImageBuildAsset);
                assetsArray.push(engavingImageBuildAsset);
            }
            this.engravingImgManager.addEngravingSetter(engravingSetter);
        }
        return assetsArray;
    }
    makeEngravingPlate(simpleMeshData) {
        var uid = simpleMeshData.getMetadata(EngravingMeta.ENGRAVING_UID),
            engravingAsset = null != globalMap[uid] ? this.engravingAssetsMap.getReserved(uid) : this.engravingAssetsMap.map[uid],
            imageContent = engravingAsset.get_engravingImageContent(),
            carveType = engravingAsset.get_carveType(),
            imageWrapper = null != globalMap[uid] ? this.imageWrappersMap.getReserved(uid) : this.imageWrappersMap.map[uid],
            meshData = new SimpleMeshData(),
            geometry = SimpleGeometryDataUtil.cloneGeometry(simpleMeshData.geometryData);
        meshData.geometryData = geometry;
        var minPosX = Infinity, maxPosX = -Infinity, m = geometry.vertexPositionData.length;
        for (var id = 0; m > id;) {
            var posData = geometry.vertexPositionData[id];
            minPosX = posData > minPosX ? minPosX : posData;
            maxPosX = maxPosX > posData ? maxPosX : posData;
            id += 3;
        }
        var uvBoundRect = SimpleGeometryDataUtil.getUVBounds(geometry),
            rect = new Rectangle(imageWrapper.get_x(), imageWrapper.get_y(), imageWrapper.get_width(), imageWrapper.get_height()),
            wScale = (maxPosX - minPosX) / rect.width,
            xScale = (minPosX - rect.x) / rect.width,
            hScale = uvBoundRect.height / rect.height,
            yScale = (uvBoundRect.y - rect.y) / rect.height,
            placementRect = imageContent.getPlacementRect(),
            textureWScale = placementRect.width / imageContent.getTextureWidth(),
            textureHScale = placementRect.height / imageContent.getTextureHeight(),
            uvLength = geometry.uvData.length;
        for (id = 0; uvLength > id;) {
            var uVal = geometry.uvData[id],
                vVal = geometry.uvData[id + 1];
            if (vVal + 0.1 < rect.get_top()) {
                vVal += this.circleLength;
            }
            else {
                vVal - 0.1 > rect.get_bottom() && (vVal -= this.circleLength);
            }
            uVal = 1 - (uVal - uvBoundRect.get_left()) / uvBoundRect.width;
            vVal = (vVal - uvBoundRect.get_top()) / uvBoundRect.height;
            geometry.uvData[id] = (uVal * wScale + xScale) * textureWScale;
            geometry.uvData[id + 1] = (vVal * hScale + yScale) * textureHScale;
            id += 2;
        }
        return (
            SimpleGeometryDataUtil.scaleGeom(geometry, 1, 0.995, 0.995),
            simpleMeshData.copyMetaDatasTo(meshData),
            meshData.addMetaData(EngravingMeta.ENGRAVING_PART, EngravingMetaValue.ENGRAVING_PART_ENGRAVING),
            meshData.addMetaData(EngravingMeta.ENGRAVING_CARVE_TYPE, carveType),
            meshData
        );
    }
}
class EngravingConfigHelper {
    static createPlacementRectDatas(placementMetrics) {
        var len = placementMetrics.length;
        if (0 == len) return null;
        var array = new Array(len);
        for (var id = 0; len > id;) {
            var placement = placementMetrics[id];
            var rectPoly = EngravingConfigHelper.createFace4(
                placement.get_x(),
                placement.get_y(),
                placement.get_width(),
                placement.get_height()
            );
            var separatePolyData = new SeparatePolyData(rectPoly);
            separatePolyData.get_separateFilterMetas().addMetaData(CutPolyMeta.CUT_FILTER_PART, CutPolyMetaValue.CUT_FILTER_PART_ENGRAVING);
            separatePolyData.get_additionalMetas().addMetaData(EngravingMeta.ENGRAVING_PART, EngravingMetaValue.ENGRAVING_PART_SURFACE);
            separatePolyData.get_additionalMetas().addMetaData(EngravingMeta.ENGRAVING_UID, placement.get_uid());
            separatePolyData.get_additionalMetas().addMetaData(ProfileMeta.PROFILE_SURFACE, ProfileMetaValue.PROFILE_SURFACE_INNER);
            array[id] = separatePolyData;
            ++id;
        }
        return array;
    }
    static createFace4(left, top, width, height) {
        var leftTop = new PointEx;
        leftTop.setTo(left, top);
        var leftBottom = new PointEx;
        leftBottom.setTo(left, top + height);
        var rightBottom = new PointEx;
        rightBottom.setTo(left + width, top + height);
        var rightTop = new PointEx;
        rightTop.setTo(left + width, top);
        var rectPoly = new Face4;
        if (rectPoly) rectPoly.initialize(leftTop, rightTop, rightBottom, leftBottom);
        return rectPoly;
    }
}

export {
    SeparatePolyData, Encoder, TextEngravingImageFactory, StampEngravingImageFactory,
    EngravingConfigHelper, EngravingConfigBuilder, EngravingImage
}