/* eslint-disable no-unused-expressions */
import { ArrayTool } from "./util.js"

class GeoPointEx {
    __class__ = GeoPointEx;
    static __name__ = ["GeoPointEx"];
    borderIndex = null;
    posX = null;
    posY = null;
    posZ = null;
    normalX = null;
    normalY = null;
    normalZ = null;
    U = null;
    V = null;
    secondaryU = null;
    secondaryV = null;
    constructor(a, b, c, d, e, f, g, h, i, j) {
        null == c && (c = 0),
            null == b && (b = 0),
            null == a && (a = 0),
            this.initParam(a, b, c, d, e, f, g, h, i, j);
    }

    initParam(posX, posY, posZ, normalX, normalY, normalZ, u, v, secondaryU, secondaryV) {
        null == posZ && (posZ = 0);
        null == posY && (posY = 0);
        null == posX && (posX = 0);
        (this.posX = posX),
            (this.posY = posY),
            (this.posZ = posZ),
            (this.normalX = normalX),
            (this.normalY = normalY),
            (this.normalZ = normalZ),
            (this.U = u),
            (this.V = v),
            (this.secondaryU = secondaryU),
            (this.secondaryV = secondaryV),
            (this.borderIndex = -1);
    }
    clone() {
        var a = new GeoPointEx;
        return (
            a.initParam(
                this.posX,
                this.posY,
                this.posZ,
                this.normalX,
                this.normalY,
                this.normalZ,
                this.U,
                this.V,
                this.secondaryU,
                this.secondaryV
            ),
            a
        );
    }
    reverse() {
        (this.normalX *= -1), (this.normalY *= -1), (this.normalZ *= -1);
    }
    interpolate(geoPointEx, ratio, out) {
        var secondaryU, secondaryV;
        if (!isNaN(this.secondaryU) && !isNaN(geoPointEx.secondaryU)) {
            var f = this.secondaryU;
            secondaryU = (geoPointEx.secondaryU - f) * ratio + f;
        }
        else secondaryU = NaN;
        if (!isNaN(this.secondaryV) && !isNaN(geoPointEx.secondaryV)) {
            var g = this.secondaryV;
            secondaryV = (geoPointEx.secondaryV - g) * ratio + g;
        }
        else secondaryV = NaN;
        null == out && (out = new GeoPointEx);
        var posX = this.posX,
            posY = this.posY,
            posZ = this.posZ,
            normalX = this.normalX,
            normalY = this.normalY,
            normalZ = this.normalZ,
            u = this.U,
            v = this.V;
        return (
            out.initParam(
                (geoPointEx.posX - posX) * ratio + posX,
                (geoPointEx.posY - posY) * ratio + posY,
                (geoPointEx.posZ - posZ) * ratio + posZ,
                (geoPointEx.normalX - normalX) * ratio + normalX,
                (geoPointEx.normalY - normalY) * ratio + normalY,
                (geoPointEx.normalZ - normalZ) * ratio + normalZ,
                (geoPointEx.U - u) * ratio + u,
                (geoPointEx.V - v) * ratio + v,
                secondaryU,
                secondaryV
            ),
            out
        );
    }
    lerp(a, b, c) {
        return (b - a) * c + a;
    }
}
class GeoExFace {
    __class__ = GeoExFace;
    static __name__ = ["GeoExFace"];
    geoExPointArray = null;
    geoExPlane = null;
    constructor() {
        this.geoExPointArray = new Array(0);
        this.geoExPlane = new GeoExPlane();
    }

    get_plane() {
        var a = this.geoExPointArray[0],
            b = this.geoExPointArray[1],
            c = this.geoExPointArray[2];
        this.geoExPlane.constructGeoPlane(a.posX, a.posY, a.posZ, b.posX, b.posY, b.posZ, c.posX, c.posY, c.posZ);
        return this.geoExPlane;
    }
    clone() {
        var a = new GeoExFace,
            b = this.geoExPointArray.length,
            c = a.geoExPointArray;
        ArrayTool.clear(c);
        for (var h = 0; b > h; h++) a.geoExPointArray[h] = this.geoExPointArray[h].clone();
        return a;
    }
    reverse() {
        this.geoExPointArray.reverse();
        for (var a = this.geoExPointArray.length, b = 0; a > b;) {
            var c = this.geoExPointArray[b];
            (c.normalX *= -1), (c.normalY *= -1), (c.normalZ *= -1), ++b;
        }
    }
}
class GeoExPlane {
    __class__ = GeoExPlane;
    static __name__ = ["GeoExPlane"];
    distance = null;
    normalX = null;
    normalY = null;
    normalZ = null;
    constructor() { }
    initParam(a, b, c, d) {
        this.normalX = a;
        this.normalY = b;
        this.normalZ = c;
        this.distance = d;
    }
    constructGeoPlane(x0, y0, z0, x1, y1, z1, x2, y2, z2) {
        var j = x1 - x0,
            k = y1 - y0,
            l = z1 - z0,
            m = x2 - x0,
            n = y2 - y0,
            o = z2 - z0;
        (this.normalX = k * o - n * l),
            (this.normalY = l * m - o * j),
            (this.normalZ = j * n - m * k);
        var p = Math.sqrt(
            this.normalX * this.normalX + this.normalY * this.normalY + this.normalZ * this.normalZ
        );
        (this.normalX /= p),
            (this.normalY /= p),
            (this.normalZ /= p),
            (this.distance = x0 * this.normalX + y0 * this.normalY + z0 * this.normalZ);
    }
    create(normal, pt) {
        (this.normalX = normal.x),
            (this.normalY = normal.y),
            (this.normalZ = normal.z),
            (this.distance = normal.x * pt.x + normal.y * pt.y + normal.z * pt.z);
    }
    isEqual(a) {
        var b,
            c,
            d,
            e = this.distance,
            f = a.distance;
        if (1e-6 >= (e > f ? e - f : f - e)) {
            var g = this.normalX,
                h = a.normalX;
            d = 1e-6 >= (g > h ? g - h : h - g);
        } else d = false;
        if (d) {
            var i = this.normalY,
                j = a.normalY;
            c = 1e-6 >= (i > j ? i - j : j - i);
        } else c = false;
        if (c) {
            var k = this.normalZ,
                l = a.normalZ;
            b = 1e-6 >= (k > l ? k - l : l - k);
        } else b = false;
        return b ? true : false;
    }
    clone() {
        var a = new GeoExPlane;
        return a.initParam(this.normalX, this.normalY, this.normalZ, this.distance), a;
    }
    reverse() {
        (this.normalX *= -1), (this.normalY *= -1), (this.normalZ *= -1), (this.distance *= -1);
    }
    calcFaceIntersections(face, aboveFacesArray, belowFacesArray, frontFacesArray, backFacesArray) {
        var f,
            ratio,
            curId,
            geoExPointArray = face.geoExPointArray,
            flag = 0,
            k = frontFacesArray.length,
            l = backFacesArray.length,
            count = geoExPointArray.length,
            n = GeoExPlane.flagArray;

        ArrayTool.clear(n);

        for (curId = 0; count > curId; curId++) {
            var geoExPoint = geoExPointArray[curId];
            ratio = this.normalX * geoExPoint.posX + this.normalY * geoExPoint.posY + this.normalZ * geoExPoint.posZ - this.distance;
            f = -GeoExPlane.EPSILON > ratio ? GeoExPlane.BACK : ratio > GeoExPlane.EPSILON ? GeoExPlane.FRONT : GeoExPlane.COPLANAR;
            flag |= f;
            GeoExPlane.flagArray[curId] = f;
        }
        if (GeoExPlane.COPLANAR == flag) {
            var plane = face.get_plane();
            this.normalX * plane.normalX + this.normalY * plane.normalY + this.normalZ * plane.normalZ > 0
                ? (aboveFacesArray[aboveFacesArray.length] = face)
                : (belowFacesArray[belowFacesArray.length] = face);
        }
        else if (GeoExPlane.FRONT == flag)
            frontFacesArray[k++] = face;
        else if (GeoExPlane.BACK == flag)
            backFacesArray[l++] = face;
        else if (GeoExPlane.SPANNING == flag) {
            var geoFace1 = new GeoExFace(),
                geoFace2 = new GeoExFace(),
                geoExPointArray1 = geoFace1.geoExPointArray,
                geoExPointArray2 = geoFace2.geoExPointArray,
                count1 = 0,
                count2 = 0;
            for (count = geoExPointArray.length, curId = 0; count > curId; curId++) {
                var nextId = (curId + 1) % count,
                    flag = GeoExPlane.flagArray[curId],
                    nextFlag = GeoExPlane.flagArray[nextId],
                    geoExPoint = geoExPointArray[curId],
                    nextGeoExPoint = geoExPointArray[nextId];

                GeoExPlane.BACK != flag && (geoExPointArray1[count1++] = geoExPoint);
                GeoExPlane.FRONT != flag && (geoExPointArray2[count2++] = 2 != flag ? geoExPoint.clone() : geoExPoint);

                if (GeoExPlane.SPANNING == (flag | nextFlag)) {
                    ratio =
                        (this.distance - (this.normalX * geoExPoint.posX + this.normalY * geoExPoint.posY + this.normalZ * geoExPoint.posZ)) /
                        (this.normalX * (nextGeoExPoint.posX - geoExPoint.posX) + this.normalY * (nextGeoExPoint.posY - geoExPoint.posY) + this.normalZ * (nextGeoExPoint.posZ - geoExPoint.posZ));
                    var secondaryU,
                        secondaryV,
                        newGeoPointEx = null;
                    if (geoExPoint.secondaryU == geoExPoint.secondaryU && nextGeoExPoint.secondaryU == nextGeoExPoint.secondaryU) {
                        var H = geoExPoint.secondaryU;
                        secondaryU = (nextGeoExPoint.secondaryU - H) * ratio + H;
                    }
                    else secondaryU = NaN;
                    if (geoExPoint.secondaryV == geoExPoint.secondaryV && nextGeoExPoint.secondaryV == nextGeoExPoint.secondaryV) {
                        var I = geoExPoint.secondaryV;
                        secondaryV = (nextGeoExPoint.secondaryV - I) * ratio + I;
                    }
                    else secondaryV = NaN;

                    null == newGeoPointEx && (newGeoPointEx = new GeoPointEx);
                    var posX = geoExPoint.posX,
                        posY = geoExPoint.posY,
                        posZ = geoExPoint.posZ,
                        normalX = geoExPoint.normalX,
                        normalY = geoExPoint.normalY,
                        normalZ = geoExPoint.normalZ,
                        U = geoExPoint.U,
                        V = geoExPoint.V;
                    newGeoPointEx.initParam(
                        (nextGeoExPoint.posX - posX) * ratio + posX,
                        (nextGeoExPoint.posY - posY) * ratio + posY,
                        (nextGeoExPoint.posZ - posZ) * ratio + posZ,
                        (nextGeoExPoint.normalX - normalX) * ratio + normalX,
                        (nextGeoExPoint.normalY - normalY) * ratio + normalY,
                        (nextGeoExPoint.normalZ - normalZ) * ratio + normalZ,
                        (nextGeoExPoint.U - U) * ratio + U,
                        (nextGeoExPoint.V - V) * ratio + V,
                        secondaryU,
                        secondaryV
                    );
                    geoExPointArray1[count1++] = newGeoPointEx;
                    geoExPointArray2[count2++] = newGeoPointEx.clone();
                }
            }
            count1 >= 3 && (frontFacesArray[k++] = geoFace1);
            count2 >= 3 && (backFacesArray[l++] = geoFace2);
        }
    }
}
GeoExPlane.EPSILON = 1e-4;
GeoExPlane.COPLANAR = 0;
GeoExPlane.FRONT = 1;
GeoExPlane.BACK = 2;
GeoExPlane.SPANNING = 3;
GeoExPlane.flagArray = new Array(0);

export {
    GeoPointEx, GeoExFace
}