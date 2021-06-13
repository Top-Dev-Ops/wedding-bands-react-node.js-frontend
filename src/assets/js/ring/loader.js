/* eslint-disable no-unused-expressions */
import {
    Fault, ParseError, NotFoundError
} from "./error.js"
import {
    StringUtils
} from "./util.js"
import {
    Event, LoadIntentProgressEvent, LoadIntentEvent, LoadIntentErrorEvent,
    IntentLoaderStatusEvent, IntentLoaderProgressEvent, IntentLoaderEvent, ProgressEvent,
    HTTPStatusEvent, ErrorEvent, IOErrorEvent, IntentLoaderErrorEvent, EventDispatcher
} from './event.js'
import {
    MMFReader
} from "./dmf.js"
import {
    VariationConfig, PlainMaterialConfig, PlainVariationConfig
} from "./config.js"
import { MetaDataMap } from './meta';
import charenc from 'charenc';
import crypt from 'crypt';
import { EngravingImage } from './engrave';
import * as THREE from 'three';

class md5 {
    constructor(a, b) {

    }
    static g(a, b) {
        a.constructor == String ? a = b && "binary" == b.encoding ? charenc.bin.stringToBytes(a) : charenc.utf8.stringToBytes(a) : Buffer.isBuffer(a) ? a = Array.prototype.slice.call(a, 0) : Array.isArray(a) || (a = a.toString());
        for (var h = crypt.bytesToWords(a), i = 8 * a.length, j = 1732584193, k = -271733879, l = -1732584194, m = 271733878, n = 0; n < h.length; n++)
            h[n] = 16711935 & (h[n] << 8 | h[n] >>> 24) | 4278255360 & (h[n] << 24 | h[n] >>> 8);
        h[i >>> 5] |= 128 << i % 32, h[(i + 64 >>> 9 << 4) + 14] = i;
        for (var o = md5._ff, p = md5._gg, q = md5._hh, r = md5._ii, n = 0; n < h.length; n += 16) {
            var s = j,
                t = k,
                u = l,
                v = m;
            j = o(j, k, l, m, h[n + 0], 7, -680876936),
                m = o(m, j, k, l, h[n + 1], 12, -389564586),
                l = o(l, m, j, k, h[n + 2], 17, 606105819),
                k = o(k, l, m, j, h[n + 3], 22, -1044525330),
                j = o(j, k, l, m, h[n + 4], 7, -176418897),
                m = o(m, j, k, l, h[n + 5], 12, 1200080426),
                l = o(l, m, j, k, h[n + 6], 17, -1473231341),
                k = o(k, l, m, j, h[n + 7], 22, -45705983),
                j = o(j, k, l, m, h[n + 8], 7, 1770035416),
                m = o(m, j, k, l, h[n + 9], 12, -1958414417),
                l = o(l, m, j, k, h[n + 10], 17, -42063),
                k = o(k, l, m, j, h[n + 11], 22, -1990404162),
                j = o(j, k, l, m, h[n + 12], 7, 1804603682),
                m = o(m, j, k, l, h[n + 13], 12, -40341101),
                l = o(l, m, j, k, h[n + 14], 17, -1502002290),
                k = o(k, l, m, j, h[n + 15], 22, 1236535329),
                j = p(j, k, l, m, h[n + 1], 5, -165796510),
                m = p(m, j, k, l, h[n + 6], 9, -1069501632),
                l = p(l, m, j, k, h[n + 11], 14, 643717713),
                k = p(k, l, m, j, h[n + 0], 20, -373897302),
                j = p(j, k, l, m, h[n + 5], 5, -701558691),
                m = p(m, j, k, l, h[n + 10], 9, 38016083),
                l = p(l, m, j, k, h[n + 15], 14, -660478335),
                k = p(k, l, m, j, h[n + 4], 20, -405537848),
                j = p(j, k, l, m, h[n + 9], 5, 568446438),
                m = p(m, j, k, l, h[n + 14], 9, -1019803690),
                l = p(l, m, j, k, h[n + 3], 14, -187363961),
                k = p(k, l, m, j, h[n + 8], 20, 1163531501),
                j = p(j, k, l, m, h[n + 13], 5, -1444681467),
                m = p(m, j, k, l, h[n + 2], 9, -51403784),
                l = p(l, m, j, k, h[n + 7], 14, 1735328473),
                k = p(k, l, m, j, h[n + 12], 20, -1926607734),
                j = q(j, k, l, m, h[n + 5], 4, -378558),
                m = q(m, j, k, l, h[n + 8], 11, -2022574463),
                l = q(l, m, j, k, h[n + 11], 16, 1839030562),
                k = q(k, l, m, j, h[n + 14], 23, -35309556),
                j = q(j, k, l, m, h[n + 1], 4, -1530992060),
                m = q(m, j, k, l, h[n + 4], 11, 1272893353),
                l = q(l, m, j, k, h[n + 7], 16, -155497632),
                k = q(k, l, m, j, h[n + 10], 23, -1094730640),
                j = q(j, k, l, m, h[n + 13], 4, 681279174),
                m = q(m, j, k, l, h[n + 0], 11, -358537222),
                l = q(l, m, j, k, h[n + 3], 16, -722521979),
                k = q(k, l, m, j, h[n + 6], 23, 76029189),
                j = q(j, k, l, m, h[n + 9], 4, -640364487),
                m = q(m, j, k, l, h[n + 12], 11, -421815835),
                l = q(l, m, j, k, h[n + 15], 16, 530742520),
                k = q(k, l, m, j, h[n + 2], 23, -995338651),
                j = r(j, k, l, m, h[n + 0], 6, -198630844),
                m = r(m, j, k, l, h[n + 7], 10, 1126891415),
                l = r(l, m, j, k, h[n + 14], 15, -1416354905),
                k = r(k, l, m, j, h[n + 5], 21, -57434055),
                j = r(j, k, l, m, h[n + 12], 6, 1700485571),
                m = r(m, j, k, l, h[n + 3], 10, -1894986606),
                l = r(l, m, j, k, h[n + 10], 15, -1051523),
                k = r(k, l, m, j, h[n + 1], 21, -2054922799),
                j = r(j, k, l, m, h[n + 8], 6, 1873313359),
                m = r(m, j, k, l, h[n + 15], 10, -30611744),
                l = r(l, m, j, k, h[n + 6], 15, -1560198380),
                k = r(k, l, m, j, h[n + 13], 21, 1309151649),
                j = r(j, k, l, m, h[n + 4], 6, -145523070),
                m = r(m, j, k, l, h[n + 11], 10, -1120210379),
                l = r(l, m, j, k, h[n + 2], 15, 718787259),
                k = r(k, l, m, j, h[n + 9], 21, -343485551),
                j = j + s >>> 0, k = k + t >>> 0,
                l = l + u >>> 0, m = m + v >>> 0
        }
        return crypt.endian([j, k, l, m])
    }
    static _ff(a, b, c, d, e, f, g) {
        var h = a + (b & c | ~b & d) + (e >>> 0) + g;
        return (h << f | h >>> 32 - f) + b
    }
    static _gg(a, b, c, d, e, f, g) {
        var h = a + (b & d | c & ~d) + (e >>> 0) + g;
        return (h << f | h >>> 32 - f) + b
    }
    static _hh(a, b, c, d, e, f, g) {
        var h = a + (b ^ c ^ d) + (e >>> 0) + g;
        return (h << f | h >>> 32 - f) + b
    }
    static _ii(a, b, c, d, e, f, g) {
        var h = a + (c ^ (b | ~d)) + (e >>> 0) + g;
        return (h << f | h >>> 32 - f) + b
    }
    static blocksize = 16;
    static digestsize = 16;
    static hash(a, b) {
        if (null == a || null == a)
            throw new Error("Illegal argument " + a);
        var d = crypt.wordsToBytes(md5.g(a, b));
        return b && b.asBytes ? d : b && b.asString ? charenc.bin.bytesToString(d) : crypt.bytesToHex(d)
    }
}
class MD5 {
    constructor() { }
    static hash(e) {
        return md5.hash(e, null);
    }
    // static hash(e) {
    //     function h(a, b) {
    //         var c, d, e, f, g;
    //         e = a & 2147483648;
    //         f = b & 2147483648;
    //         c = a & 1073741824;
    //         d = b & 1073741824;
    //         g = (a & 1073741823) + (b & 1073741823);
    //         return c & d ? g ^ 2147483648 ^ e ^ f : c | d ? g & 1073741824 ? g ^ 3221225472 ^ e ^ f : g ^ 1073741824 ^ e ^ f : g ^ e ^ f
    //     }

    //     function k(a, b, c, d, e, f, g) {
    //         a = h(a, h(h(b & c | ~b & d, e), g));
    //         return h(a << f | a >>> 32 - f, b)
    //     }

    //     function l(a, b, c, d, e, f, g) {
    //         a = h(a, h(h(b & d | c & ~d, e), g));
    //         return h(a << f | a >>> 32 - f, b)
    //     }

    //     function m(a, b, d, c, e, f, g) {
    //         a = h(a, h(h(b ^ d ^ c, e), g));
    //         return h(a << f | a >>> 32 - f, b)
    //     }

    //     function n(a, b, d, c, e, f, g) {
    //         a = h(a, h(h(d ^ (b | ~c), e), g));
    //         return h(a << f | a >>> 32 - f, b)
    //     }

    //     function p(a) {
    //         var b = "",
    //             d = "",
    //             c;
    //         for (c = 0; 3 >= c; c++) d = a >>> 8 * c & 255, d = "0" + d.toString(16), b += d.substr(d.length - 2, 2);
    //         return b
    //     }
    //     var f = [],
    //         q, r, s, t, a, b, c, d;
    //     e = function (a) {
    //         a = a.replace(/\r\n/g, "\n");
    //         for (var b = "", d = 0; d < a.length; d++) {
    //             var c = a.charCodeAt(d);
    //             128 > c ? b += String.fromCharCode(c) : (127 < c && 2048 > c ? b += String.fromCharCode(c >> 6 | 192) : (b += String.fromCharCode(c >> 12 | 224), b += String.fromCharCode(c >> 6 & 63 | 128)), b += String.fromCharCode(c & 63 | 128))
    //         }
    //         return b
    //     }(e);
    //     f = function (b) {
    //         var a, c = b.length;
    //         a = c + 8;
    //         for (var d = 16 * ((a - a % 64) / 64 + 1), e = Array(d - 1), f = 0, g = 0; g < c;) a = (g - g % 4) / 4, f = g % 4 * 8, e[a] |= b.charCodeAt(g) << f, g++;
    //         a = (g - g % 4) / 4;
    //         e[a] |= 128 << g % 4 * 8;
    //         e[d - 2] = c << 3;
    //         e[d - 1] = c >>> 29;
    //         return e
    //     }(e);
    //     a = 1732584193;
    //     b = 4023233417;
    //     c = 2562383102;
    //     d = 271733878;
    //     for (e = 0; e < f.length; e += 16) q = a, r = b, s = c, t = d, a = k(a, b, c, d, f[e + 0], 7, 3614090360), d = k(d, a, b, c, f[e + 1], 12, 3905402710), c = k(c, d, a, b, f[e + 2], 17, 606105819), b = k(b, c, d, a, f[e + 3], 22, 3250441966), a = k(a, b, c, d, f[e + 4], 7, 4118548399), d = k(d, a, b, c, f[e + 5], 12, 1200080426), c = k(c, d, a, b, f[e + 6], 17, 2821735955), b = k(b, c, d, a, f[e + 7], 22, 4249261313), a = k(a, b, c, d, f[e + 8], 7, 1770035416), d = k(d, a, b, c, f[e + 9], 12, 2336552879), c = k(c, d, a, b, f[e + 10], 17, 4294925233), b = k(b, c, d, a, f[e + 11], 22, 2304563134), a = k(a, b, c, d, f[e + 12], 7, 1804603682), d = k(d, a, b, c, f[e + 13], 12, 4254626195), c = k(c, d, a, b, f[e + 14], 17, 2792965006), b = k(b, c, d, a, f[e + 15], 22, 1236535329), a = l(a, b, c, d, f[e + 1], 5, 4129170786), d = l(d, a, b, c, f[e + 6], 9, 3225465664), c = l(c, d, a, b, f[e + 11], 14, 643717713), b = l(b, c, d, a, f[e + 0], 20, 3921069994), a = l(a, b, c, d, f[e + 5], 5, 3593408605), d = l(d, a, b, c, f[e + 10], 9, 38016083), c = l(c, d, a, b, f[e + 15], 14, 3634488961), b = l(b, c, d, a, f[e + 4], 20, 3889429448), a = l(a, b, c, d, f[e + 9], 5, 568446438), d = l(d, a, b, c, f[e + 14], 9, 3275163606), c = l(c, d, a, b, f[e + 3], 14, 4107603335), b = l(b, c, d, a, f[e + 8], 20, 1163531501), a = l(a, b, c, d, f[e + 13], 5, 2850285829), d = l(d, a, b, c, f[e + 2], 9, 4243563512), c = l(c, d, a, b, f[e + 7], 14, 1735328473), b = l(b, c, d, a, f[e + 12], 20, 2368359562), a = m(a, b, c, d, f[e + 5], 4, 4294588738), d = m(d, a, b, c, f[e + 8], 11, 2272392833), c = m(c, d, a, b, f[e + 11], 16, 1839030562), b = m(b, c, d, a, f[e + 14], 23, 4259657740), a = m(a, b, c, d, f[e + 1], 4, 2763975236), d = m(d, a, b, c, f[e + 4], 11, 1272893353), c = m(c, d, a, b, f[e + 7], 16, 4139469664), b = m(b, c, d, a, f[e + 10], 23, 3200236656), a = m(a, b, c, d, f[e + 13], 4, 681279174), d = m(d, a, b, c, f[e + 0], 11, 3936430074), c = m(c, d, a, b, f[e + 3], 16, 3572445317), b = m(b, c, d, a, f[e + 6], 23, 76029189), a = m(a, b, c, d, f[e + 9], 4, 3654602809), d = m(d, a, b, c, f[e + 12], 11, 3873151461), c = m(c, d, a, b, f[e + 15], 16, 530742520), b = m(b, c, d, a, f[e + 2], 23, 3299628645), a = n(a, b, c, d, f[e + 0], 6, 4096336452), d = n(d, a, b, c, f[e + 7], 10, 1126891415), c = n(c, d, a, b, f[e + 14], 15, 2878612391), b = n(b, c, d, a, f[e + 5], 21, 4237533241), a = n(a, b, c, d, f[e + 12], 6, 1700485571), d = n(d, a, b, c, f[e + 3], 10, 2399980690), c = n(c, d, a, b, f[e + 10], 15, 4293915773), b = n(b, c, d, a, f[e + 1], 21, 2240044497), a = n(a, b, c, d, f[e + 8], 6, 1873313359), d = n(d, a, b, c, f[e + 15], 10, 4264355552), c = n(c, d, a, b, f[e + 6], 15, 2734768916), b = n(b, c, d, a, f[e + 13], 21, 1309151649), a = n(a, b, c, d, f[e + 4], 6, 4149444226), d = n(d, a, b, c, f[e + 11], 10, 3174756917), c = n(c, d, a, b, f[e + 2], 15, 718787259), b = n(b, c, d, a, f[e + 9], 21, 3951481745), a = h(a, q), b = h(b, r), c = h(c, s), d = h(d, t);
    //     return (p(a) + p(b) + p(c) + p(d)).toLowerCase()
    // }
}
class Responder {
    completeProc = null;
    errorProc = null;
    constructor(completeProc, errorProc) {
        (this.completeProc = completeProc), (this.errorProc = errorProc);
    }
    result(a) {
        this.completeProc(a[0]);
    }
    fault(a) {
        null != this.errorProc && this.errorProc(a[0]);
    }
}
class URLLoaderDataFormat {
    constructor() { }
    static TEXT = "text";
    static XML = "xml";
    static VARIABLES = "variables";
    static BLOB = "blob";
    static ARRAY_BUFFER = "arraybuffer";
    static BINARY = "binary";
}
class URLRequestMethod {
    constructor() { }
    static POST = "POST";
    static GET = "GET";
}
class URLVariables {
    constructor(a) {
        null == a && (a = null),
            this.variables = new Object,
            null != a && this.decode(a);
    }
    decode(a) {
        a = a.split("+").join(" ");
        for (var b, c = /[?&]?([^=]+)=([^&]*)/g; b = c.exec(a);)
            this.variables[decodeURIComponent(b[1])] = decodeURIComponent(b[2])
    }
    toString() {
        return ""
    }
    get formData() {
        var a = new FormData;
        for (var b in this.variables)
            a.append(b, this.variables[b]);
        return a
    }
}
class URLLoader extends EventDispatcher {
    constructor() {
        super();
        this.bytesLoaded = 0,
            this.bytesTotal = 0,
            this.dataFormat = URLLoaderDataFormat.TEXT,
            this.loadError = false;
    }
    load(request) {
        this.request = request;
        this.initXHR();
        request.method == URLRequestMethod.POST ? this.postRequest(request) : this.getRequest(request);
    }
    close() {
        this.XHR.abort();
        this.disposeXHR();
    }
    dispose() {
        this.XHR && this.XHR.abort(),
            this.disposeXHR(),
            this.data = null,
            this.dataFormat = null,
            this.bytesLoaded = null,
            this.bytesTotal = null
    }
    setResponseType(a, responseType) {
        switch (responseType) {
            case URLLoaderDataFormat.ARRAY_BUFFER:
            case URLLoaderDataFormat.BLOB:
            case URLLoaderDataFormat.TEXT:
                a.responseType = responseType;
                break;
            case URLLoaderDataFormat.VARIABLES:
                a.responseType = URLLoaderDataFormat.TEXT;
                break;
            case URLLoaderDataFormat.BINARY:
                a.responseType = ""
        }
    }
    setHeaders(a, b) {
        if (b)
            for (var c = 0; c < b.length; c++) a.setRequestHeader(b[c].name, b[c].value)
    }
    getRequest(a) {
        try {
            this.XHR.open(a.method, a.url, a.async),
                this.setResponseType(this.XHR, this.dataFormat),
                this.setHeaders(this.XHR, a.requestHeaders), this.XHR.send()
        }
        catch (b) {
            this.handleXmlHttpRequestException(b)
        }
    }
    postRequest(request) {
        if (this.loadError = false,
            this.XHR.open(request.method, request.url, request.async),
            this.setHeaders(this.XHR, request.requestHeaders),
            null != request.data)
            if (request.data instanceof URLVariables) {
                var data = request.data;
                try {
                    this.XHR.responseType = "text",
                        this.XHR.send(data.formData)
                }
                catch (c) {
                    this.handleXmlHttpRequestException(c)
                }
            }
            else
                this.setResponseType(this.XHR, this.dataFormat),
                    request.data ? this.XHR.send(request.data) : this.XHR.send();
        else
            this.XHR.send()
    }
    handleXmlHttpRequestException(a) {
        // switch (a.code) {
        //     case 101:
        // }
    }
    initXHR() {
        this.XHR || (this.XHR = new XMLHttpRequest,
            this.XHR.onloadstart = (b) => {
                return this.onLoadStart(b)
            },
            this.XHR.onprogress = (b) => {
                return this.onProgress(b)
            },
            this.XHR.onabort = (b) => {
                return this.onAbort(b)
            },
            this.XHR.onerror = (b) => {
                return this.onLoadError(b)
            },
            this.XHR.onload = (b) => {
                return this.onLoadComplete(b)
            },
            this.XHR.ontimeout = (b) => {
                return this.onTimeOut(b)
            },
            this.XHR.onloadend = (b) => {
                return this.onLoadEnd(b)
            },
            this.XHR.onreadystatechange = (b) => {
                return this.onReadyStateChange(b)
            }
        )
    }
    disposeXHR() {
        null != this.XHR && (this.XHR.onloadstart = null,
            this.XHR.onprogress = null,
            this.XHR.onabort = null,
            this.XHR.onerror = null,
            this.XHR.onload = null,
            this.XHR.ontimeout = null,
            this.XHR.onloadend = null,
            this.XHR = null)
    }
    decodeURLVariables(a) {
        var b = new Object;
        a = a.split("+").join(" ");
        for (var c, d = /[?&]?([^=]+)=([^&]*)/g; c = d.exec(a);)
            b[decodeURIComponent(c[1])] = decodeURIComponent(c[2]);
        return b
    }
    onReadyStateChange(a) {
        if (this.XHR != null && 4 == this.XHR.readyState) {
            404 == this.XHR.status && (this.loadError = true,
                this.loadErrorEvent || (this.loadErrorEvent = new IOErrorEvent(IOErrorEvent.IO_ERROR)),
                this.loadErrorEvent.errorID = this.XHR.status,
                this.loadErrorEvent.text = this.XHR.statusText + " " + this.url,
                this.dispatchEvent(this.loadErrorEvent));
            var b = new HTTPStatusEvent(HTTPStatusEvent.HTTP_STATUS);
            b.status = this.XHR.status, this.dispatchEvent(b)
        }
    }
    onLoadEnd(a) {
        this.loadError == true
    }
    onTimeOut(a) { }
    onAbort(a) { }
    onProgress(a) {
        this.progressEvent || (this.progressEvent = new ProgressEvent(ProgressEvent.PROGRESS)),
            this.progressEvent.bytesTotal = a.total,
            this.progressEvent.bytesLoaded = a.loaded,
            this.dispatchEvent(this.progressEvent);
    }
    onLoadStart(a) {
        this.loadStartEvent || (this.loadStartEvent = new Event(Event.OPEN));
        this.dispatchEvent(this.loadStartEvent);
    }
    onLoadComplete(a) {
        if (this.loadError != true) {
            switch (this.dataFormat) {
                case URLLoaderDataFormat.TEXT:
                    this.data = this.XHR.responseText;
                    break;
                case URLLoaderDataFormat.VARIABLES:
                    this.data = this.decodeURLVariables(this.XHR.responseText);
                    break;
                case URLLoaderDataFormat.BLOB:
                case URLLoaderDataFormat.ARRAY_BUFFER:
                case URLLoaderDataFormat.BINARY:
                    this.data = this.XHR.response;
                    break;
                case URLLoaderDataFormat.XML:
                    this.data = this.XHR.responseXML;
                    break;
                default:
                    this.data = this.XHR.responseText
            }
            this._loadCompleteEvent || (this._loadCompleteEvent = new Event(Event.COMPLETE));
            this.dispatchEvent(this._loadCompleteEvent);
        }
    }
    onLoadError(a) {
        this.loadError = true,
            this.loadErrorEvent || (this.loadErrorEvent = new IOErrorEvent(IOErrorEvent.IO_ERROR)),
            a.message ? this.loadErrorEvent.text = a.message : this.loadErrorEvent.text = "Failed to load url:" + this.request.url,
            this.dispatchEvent(this.loadErrorEvent)
    }
}
class URLRequestHeader {
    constructor(a, b) {
        null == a && (a = null),
            null == b && (b = null),
            this.name = a,
            this.value = b;
    }
}
class URLRequest {
    constructor(url) {
        null == url && (url = null),
            this.method = URLRequestMethod.GET,
            this.async = true,
            this.url = url;
    }
    dispose() {
        this.data = null;
        this.url = null;
    }
}
class Path {
    constructor() { }
    static isAbsolute(b) {
        return Path.ABSOLUTE_PATH_REGEX.test(b)
    }
    static endsWithSlash(b) {
        return Path.ENDS_WITH_SLASH_REGEX.test(b)
    }
    static startsWithSlash(b) {
        return Path.STARTS_WITH_SLASH_REGEX.test(b)
    }
    static combine(b, c) {
        return b || c ? !b && c ? c.trim() : !c && b ? b.trim() : Path.endsWithSlash(b) || Path.startsWithSlash(c) ? b + c : b + "/" + c : ""
    }
    static addBaseToRelative(b, c) {
        return Path.isAbsolute(c) ? c : Path.combine(b, c)
    }
    static ABSOLUTE_PATH_REGEX = /(?:^[a-z]+:\/{1,2})|(?:^\/)|(?:^\\)/i;
    static ENDS_WITH_SLASH_REGEX = /\/$|\\$/;
    static STARTS_WITH_SLASH_REGEX = /^\/|^\\/;
}
class XML {
    constructor(a) {
        this.node = a;
    }
    name() {
        return this.node.nodeName
    }
    child(b) {
        for (var c = this.node.childNodes, d = [], f = 0; f < c.length; f++) {
            var g = c[f];
            g.nodeName == b && d.push(new XML(g))
        }
        return new XMLList(d)
    }
    children() {
        for (var b = this.node.childNodes, c = [], d = 0; d < b.length; d++) {
            var f = b[d];
            1 == f.nodeType && c.push(new XML(f))
        }
        return new XMLList(c)
    }
    childNodes() {
        for (var b = this.node.childNodes, c = [], d = 0; d < b.length; d++) {
            var f = b[d];
            c.push(new XML(f))
        }
        return new XMLList(c)
    }
    attribute(b) {
        for (var c = this.node.attributes, d = [], f = 0; f < c.length; f++) {
            var g = c[f];
            g.nodeName == b && d.push(new XML(g))
        }
        return new XMLList(d)
    }
    text() {
        if (this.node) {
            if (this.node.textContent)
                return this.node.textContent;
            if (this.node.nodeValue)
                return this.node.nodeValue;
            if (this.node.childNodes.length)
                return this.node.childNodes[0].nodeValue
        }
        return ""
    }
    type() {
        return this.node.nodeType
    }
    toString() {
        return this.text()
    }
}
class XMLList {
    constructor(a) {
        this.nodes = a
    }
    text() {
        for (var a = "", b = 0; b < this.nodes.length; b++)
            a += this.nodes[b].text(); return a
    }
    child(b) {
        for (var c = [], d = 0; d < this.nodes.length; d++) {
            var e = this.nodes[d];
            c = c.concat(e.child(b).elements())
        }
        return new XMLList(c)
    }
    length() {
        return this.nodes.length
    }
    get(a) {
        return this.nodes[a]
    }
    attribute(b) {
        for (var c = [], d = 0; d < this.nodes.length; d++) {
            var e = this.nodes[d];
            c = c.concat(e.attribute(b).elements())
        }
        return new XMLList(c)
    }
    childNodes() {
        for (var b = 0; b < this.nodes.length; b++)
            for (var c = this.nodes[b], d = c.childNodes(), e = [], f = d.elements(), g = 0; g < f.length; g++) {
                var h = f[g];
                e.push(h)
            }
        return new XMLList(e)
    }
    elements() {
        return this.nodes
    }
    toString() {
        return this.text()
    }
}
class RescourceNames {
    constructor() { }
    static LOAD_INDICATOR = "load-indicator";
    static CONFIG = "config";
    static DICTIONARY = "dictionary";
    static APPLICATION_ENVIROMENT = "application-enviroment";
    static APPLICATION_MATERIALS = "application-materials";
    static APPLICATION_UI = "application-ui";
    static BACKGROUND = "background";
}
class RescourceType {
    constructor() { }
    static XML = "xml";
    static JSON = "json";
    static TEXT = "text";
    static RSL = "rsl";
    static PLUGIN = "plugin";
    static IMAGE = "image";
    static BINARY = "binary";
    static MMF = "mmf";
    static FONT = "font";
}
class ResourceIntentFactory {
    constructor() { }
    getResourceIntent(type, path, contentId, d, n) {
        switch (type) {
            case RescourceType.XML:
                return new XMLLoadIntent(path, contentId);
            case RescourceType.JSON:
                return new JSONLoadIntent(path, contentId);
            case RescourceType.RSL:
                throw new Error("RSL not implemented");
            case RescourceType.PLUGIN:
                return new ScriptLoadIntent(path);
            case RescourceType.IMAGE:
                return new ImageDataLoadIntent(path, contentId);
            case RescourceType.BINARY:
                var o = new FileLoaderIntent(path, contentId);
                return o.dataFormat = URLLoaderDataFormat.BINARY, o;
            case RescourceType.TEXT:
                var p = new FileLoaderIntent(path, contentId);
                return p.dataFormat = URLLoaderDataFormat.TEXT, p;
            case RescourceType.MMF:
                return new MMFLoadIntent(path, contentId);
            case RescourceType.FONT:
                return new FontLoadIntent(path, d, contentId);
            default:
                throw new Error("ResourceIntent not found for resourceType:" + type)
        }
    }
}

class LoadIntent extends EventDispatcher {
    constructor(name) {
        super();
        null == name && (name = null);
        this.name = name;
        this.relativeBasePath = '';
        this.payload = null;
        this.contentId = 0;
        this.content = null;
        this.outputConverter = null;
        this.parentLoader = null;
    }
    loadStarted() {
        this.dispatchEvent(new LoadIntentEvent(LoadIntentEvent.LOAD_START))
    }
    loadProgress(a) {
        var b = new LoadIntentProgressEvent(LoadIntentProgressEvent.LOAD_PROGRESS);
        b.progress = a, this.dispatchEvent(b)
    }
    loadComplete(a) {
        null == a && (a = null);
        if (this.outputConverter) {
            this.converterResponder ||
                (this.converterResponder = new Responder(this.saveConvertedContent, this.loadError, this));
            try {
                this.outputConverter.convert(a, this.converterResponder)
            }
            catch (b) {
                this.loadError(b)
            }
        }
        else
            this.saveConvertedContent(a)
    }
    loadError(a) {
        var b = new LoadIntentErrorEvent(LoadIntentErrorEvent.LOAD_ERROR);
        a instanceof ErrorEvent ? b.fault = Fault.fromErrorEvent(a) : a instanceof Error ?
            b.fault = Fault.fromError(a) : a instanceof Fault ? b.fault = a : (b.fault = new Fault(String(a)), b.fault.rootCause = a),
            console && console.error && console.log("Error in intent", a), this.dispatchEvent(b)
    }
    saveConvertedContent(a) {
        this.contentId && this.parentLoader && this.parentLoader.getRegistry().addContent(this.contentId, a),
            this.content = a, this.dispatchEvent(new LoadIntentEvent(LoadIntentEvent.LOAD_COMPLETE))
    }
    processPath(a) {
        return this.relativeBasePath ? Path.addBaseToRelative(this.relativeBasePath, a) : a
    }
    setParentLoader(a) {
        this.parentLoader = a
    }
    startLoad() { }
    toString() {
        return "IntentLoader[" + this.name + "]"
    }
    dispose() {
        this.content = null,
            this.parentLoader = null,
            this.removeAllEventListeners()
    }
}
class ImageDataLoadIntent extends LoadIntent {
    constructor(path, contentId) {
        null == path && (path = null);
        null == contentId && (contentId = null);
        super();
        this.path = path;
        this.contentId = contentId;
    }
    startLoad() {
        var htmlElement = document.createElementNS("http://www.w3.org/1999/xhtml", "img");
        htmlElement.crossOrigin = "Anonymous";
        htmlElement.onload = () => {
            var canvas = ImageDataLoadIntent.getDrawCanvas();
            canvas.width = htmlElement.width, canvas.height = htmlElement.height;
            var f = canvas.getContext("2d");
            f.clearRect(0, 0, htmlElement.width, htmlElement.height);
            f.drawImage(htmlElement, 0, 0);
            var g = f.getImageData(0, 0, htmlElement.width, htmlElement.height);
            this.loadComplete(g)
        };
        htmlElement.onerror = () => {
            this.loadError("Could not load image " + this.path)
        };
        htmlElement.src = this.processPath(this.path);
    }
    loadComplete(a) {
        null == a && (a = null);
        super.loadComplete(a);
    }
    static drawCanvas = null;
    static getDrawCanvas() {
        return ImageDataLoadIntent.drawCanvas || (ImageDataLoadIntent.drawCanvas = document.createElement("canvas")),
            ImageDataLoadIntent.drawCanvas
    }
}
class FontLoadIntent extends LoadIntent {
    constructor(b, c, d) {
        super(c);
        this.path = b, this.contentId = d;
    }
    startLoad() {
        var a = this;
        if (window.FontFace) {
            var b = this.processPath(this.path);
            this.fontFace = new window.FontFace(this.name, "url(" + b + ")"),
                this.fontFace.load().then(function (b) {
                    document.fonts.add(b), a.loadComplete(b)
                },
                    function (b) {
                        a.loadError(b)
                    })["catch"](function (b) { a.loadError(b) })
        } else this.loadComplete()
    }
}
class ScriptLoadIntent extends LoadIntent {
    constructor(b) {
        this.path = b
    }
    startLoad() {
        var a = this,
            b = document.createElement("script");
        b.type = "text/javascript",
            b.onload = () => {
                a.loadComplete()
            },
            b.src = this.processPath(this.path),
            document.head.appendChild(b)
    }
}
class FileLoaderIntent extends LoadIntent {
    constructor(path, contentId) {
        null == path && (path = null);
        null == contentId && (contentId = null);
        super(path);
        this.dataFormat = URLLoaderDataFormat.TEXT,
            this.path = path,
            this.contentId = contentId,
            this.urlLoader = new URLLoader,
            this.urlLoader.on(Event.COMPLETE, this.onLoadComplete, this),
            this.urlLoader.on(ProgressEvent.PROGRESS, this.onLoadProgress, this),
            this.urlLoader.on(IOErrorEvent.IO_ERROR, this.onLoadError, this);
    }
    startLoad() {
        this.urlLoader.dataFormat = this.dataFormat;
        this.urlLoader.load(new URLRequest(this.processPath(this.path)));
    }
    toString() {
        return "FileLoaderIntent[" + this.name + ", " + this.path + "]"
    }
    dispose() {
        this.urlLoader.off(Event.COMPLETE, this.onLoadComplete);
        this.urlLoader.off(ProgressEvent.PROGRESS, this.onLoadProgress);
        this.urlLoader.off(IOErrorEvent.IO_ERROR, this.onLoadError);
    }
    handleDataLoaded(a) {
        this.loadComplete(a)
    }
    onLoadComplete(a) {
        this.handleDataLoaded(this.urlLoader.data)
    }
    onLoadProgress(a) {
        this.loadProgress(a.bytesLoaded / a.bytesTotal)
    }
    onLoadError(a) {
        this.loadError(a)
    }
}
class ImageLoadIntent extends FileLoaderIntent {
    constructor(b, c) {
        null == b && (b = null),
            null == c && (c = null);
        super(b, c);
        this._dataFormat = URLLoaderDataFormat.BLOB;
    }
    get dataFormat() { return this._dataFormat }
    set dataFormat(a) { throw new Error("Data format setting not allowed") }
    loadComplete(b) {
        var c = this;
        undefined == b && (b = null);
        var d = document.createElementNS("http://www.w3.org/1999/xhtml", "img");
        d.onload = () => {
            URL.revokeObjectURL(d.src), super.loadComplete(d)
        },
            d.onerror = () => {
                c.loadError("Could not load image " + c.path)
            },
            d.src = URL.createObjectURL(b)
    }
}
class FallbackMMFLoadIntent extends FileLoaderIntent {
    constructor(b, c) {
        null == b && (b = null),
            null == c && (c = null);
        super(b, c);
        this._query = "createModel",
            this._dataFormat = URLLoaderDataFormat.TEXT,
            this.intentLoader = new IntentLoader,
            this.intentLoader.useGlobalRegistry = false,
            this.intentLoader.on(IntentLoaderEvent.LOAD_COMPLETE, this.onIntentsLoadComplete, this);
        this.intentLoader.on(IntentLoaderErrorEvent.INTENT_LOAD_ERROR, this.onIntentLoadError, this);
    }
    get dataFormat() { return this._dataFormat }
    set dataFormat(a) { throw new Error("Data format setting not allowed") }
    get config() { return this._config }
    set config(a) { this._config != a && (this._config = a) }
    get query() { return this._query }
    set query(a) { this._query != a && (this._query = a) }
    startLoad() {
        this.urlLoader.dataFormat = this._dataFormat;
        var a = new URLRequest(this._path + "/" + this.query);
        a.method = URLRequestMethod.POST,
            a.data = JSON.stringify(this._config),
            this.urlLoader.load(a)
    }
    handleDataLoaded(a) {
        undefined == a && (a = null);
        try {
            this.response = JSON.parse(a);
            var b = this.response.images[0];
            if (b) {
                this.intentLoader.clear(true);
                var c = new MMFLoadIntent(this.path + "/" + b, "mmf");
                this.intentLoader.addLoadIntent(c);
                for (var d = 1; d < this.response.images.length; d++) {
                    var e = this.path + "/" + this.response.images[d],
                        f = new ImageLoadIntent(e, this.response.images[d]);
                    this.intentLoader.addLoadIntent(f)
                }
                this.intentLoader.startLoad(true)
            } else this.loadError(new Fault("Can't find model path in fallback response"))
        } catch (g) { this.loadError(Fault.fromError(g)) }
    }
    onIntentsLoadComplete(a) {
        for (var b = this.intentLoader.getRegistry().getContent("mmf"), c = [], d = null, e = 1; e < this.response.images.length; e++) {
            var f = this.response.images[e],
                g = f.split(".")[0].split("_");
            e % 2 == 1 ? (d = new EngravingImage, d.uid = g[2], d.normalMap = this.intentLoader.getRegistry().getContent(f)) : (d.texture = this.intentLoader.getRegistry().getContent(f), c.push(d))
        }
        b.addMetaData("engravingImages", c),
            this.loadComplete(b)
    }
    onIntentLoadError(a) {
        this.loadError(Fault.fromErrorEvent(a))
    }
}
class JSONLoadIntent extends FileLoaderIntent {
    constructor(b, c) {
        null == b && (b = null),
            null == c && (c = null);
        super(b, c);
        this.dataFormat = URLLoaderDataFormat.TEXT;
    }
    loadComplete(b) {
        null == b && (b = null);
        try {
            var c = JSON.parse(b);
            super.loadComplete.call(c)
        } catch (d) { this.loadError(Fault.fromError(d)) }
    }
}

class MMFLoadIntent extends FileLoaderIntent {
    constructor(path, contentId) {
        null == path && (path = null);
        null == contentId && (contentId = null);
        super(path, contentId);
        this.dataFormat = URLLoaderDataFormat.ARRAY_BUFFER;
    }
    loadComplete(b) {
        var c = this;
        null == b && (b = null);
        var mMMFReader = new MMFReader;
        try {
            Date.now();
            mMMFReader.readFormat(b,
                new Responder((b) => {
                    super.loadComplete(b)
                }, (b) => {
                    super.loadError(b)
                }, this)
            );
        }
        catch (e) { this.loadError(Fault.fromError(e)) }
    }
}
class XMLLoadIntent extends FileLoaderIntent {
    constructor(path, id) {
        null == path && (path = null);
        null == id && (id = null);
        super(path, id);
        this.dataFormat = URLLoaderDataFormat.XML;
    }
    loadComplete(b) {
        null == b && (b = null);
        if (b) {
            var c = new XML(b.documentElement);
            super.loadComplete(c);
        }
    }
}

class Delegate {
    constructor() { }
    static create(obj, func) {
        var c = function () {
            return func.apply(obj, arguments);
        };
        return c;
    }
}
class PlainReferenceBase {
    constructor() { }
    get originalPath() { return this._originalPath }
    set originalPath(a) { this._originalPath != a && (this._originalPath = a) }
    get resolvedPath() { return this._resolvedPath }
    set resolvedPath(a) { this._resolvedPath != a && (this._resolvedPath = a) }
    setContent(a) { }
}
class PlainObjectGrouppingReference extends PlainReferenceBase {
    constructor() {
        super();
    }
    get obectGrouping() { return this._obectGrouping }
    set obectGrouping(a) { this._obectGrouping != a && (this._obectGrouping = a) }
    setContent(a) {
        this._obectGrouping = a
    }
}
class PlainMaterialReference extends PlainReferenceBase {
    constructor() {
        super();
    }
    get materialConfig() { return this._materialConfig }
    set materialConfig(a) { this._materialConfig != a && (this._materialConfig = a) }
    setContent(a) {
        this._materialConfig = a
    }
    getRootReference() {
        return this._materialConfig.extendsMaterial ? this._materialConfig.extendsMaterial.getRootReference() : this
    }
    getDepth() {
        return this._materialConfig.extendsMaterial ? this._materialConfig.extendsMaterial.getDepth() + 1 : 0
    }
}
class ContentRegistry {
    constructor() {
        this.contentDict = {}
    }
    addContent(a, b) {
        this.contentDict[a] = b
    }
    getContent(a) {
        return this.contentDict[a]
    }
    removeContent(a) {
        delete this.contentDict[a]
    }
}
class IntentLoader extends EventDispatcher {
    constructor() {
        super();
        this._useGlobalRegistry = true;
        this.intents = [];
        this.loadedIntents = [];
        this.intentQue = [];
        this._loadInProgress = false;
        this._continueAfterError = false;
        this._relativeBasePath = '';
    }
    get intentNum() { return this.intents.length }
    get loadInProgress() { return this._loadInProgress }
    set loadInProgress(a) { this._loadInProgress != a && (this._loadInProgress = a) }
    get continueAfterError() { return this._continueAfterError }
    set continueAfterError(a) { this._continueAfterError != a && (this._continueAfterError = a) }
    get useGlobalRegistry() { return this._useGlobalRegistry }
    set useGlobalRegistry(a) { this._useGlobalRegistry != a && (this._useGlobalRegistry = a) }
    get relativeBasePath() { return this._relativeBasePath }
    set relativeBasePath(a) { this._relativeBasePath != a && (this._relativeBasePath = a) }
    addLoadIntent(a) {
        a.setParentLoader(this);
        this.intents.push(a);
        this.loadInProgress && this.intentQue.push(a);
    }
    startLoad(asyncMode) {
        null == asyncMode && (asyncMode = false), this.asyncMode = asyncMode;
        if (this.loadInProgress)
            throw new Error("Loading already in progress");
        this.intents.length && (this.intentQue = this.intents.slice(0),
            this.loadedIntents = [],
            this.loadInProgress = true,
            this.dispatchEvent(new IntentLoaderEvent(IntentLoaderEvent.LOAD_START)),
            this.loadNext())
    }
    clear(a) {
        if (null == a && (a = true), a)
            for (var b = 0; b < this.intents.length; b++) this.intents[b].dispose();
        this.intents = [],
            this.intentQue = [],
            this.loadedIntents = []
    }
    dispose() {
        for (var a = 0; a < this.intents.length; a++)
            this.intents[a].dispose()
    }
    getRegistry() {
        return this.useGlobalRegistry ? IntentLoader.getMainRegistry() : this.getLocalRegistry()
    }
    getLocalRegistry() {
        return this.localRegistry || (this.localRegistry = new ContentRegistry),
            this.localRegistry
    }
    loadNext() {
        if (this.loadedIntents.length / this.intents.length != 1) {
            if (this.asyncMode)
                for (; this.intentQue.length;) this.loadIntent(this.intentQue.shift());
            else this.loadIntent(this.intentQue.shift());
        }
        else {
            this.loadInProgress = false;
            this.dispatchEvent(new IntentLoaderEvent(IntentLoaderEvent.LOAD_COMPLETE));
        }
    }
    loadIntent(intent) {
        intent.relativeBasePath || (intent.relativeBasePath = this.relativeBasePath);
        intent.on(LoadIntentEvent.LOAD_START, this.onIntentLoadStart, this);
        intent.on(LoadIntentProgressEvent.LOAD_PROGRESS, this.onIntentLoadProgress, this);
        intent.on(LoadIntentEvent.LOAD_COMPLETE, this.onIntentLoadComplete, this);
        intent.on(LoadIntentErrorEvent.LOAD_ERROR, this.onIntentLoadError, this);
        intent.startLoad();
    }
    onIntentLoadStart(a) {
        var b = a.currentTarget,
            c = new IntentLoaderStatusEvent(IntentLoaderStatusEvent.INTENT_LOAD_START);
        c.intentIndex = this.intents.indexOf(b), c.intent = b, this.dispatchEvent(c)
    }
    onIntentLoadProgress(a) {
        var b = new IntentLoaderProgressEvent(IntentLoaderProgressEvent.LOAD_PROGRESS);
        if (this.asyncMode) b.progress = this.loadedIntents.length / this.intents.length;
        else {
            var c = a.progress,
                d = 1 / this.intents.length,
                e = d * this.loadedIntents.length,
                f = d * c;
            b.progress = e + f
        }
        this.dispatchEvent(b)
    }
    onIntentLoadComplete(a) {
        var b = a.currentTarget;
        this.loadedIntents.push(b);
        var c = this.loadedIntents.length / this.intents.length;
        if (this.hasEventListener(IntentLoaderStatusEvent.INTENT_LOAD_COMPLETE)) {
            var d = new IntentLoaderStatusEvent(IntentLoaderStatusEvent.INTENT_LOAD_COMPLETE);
            d.intentIndex = this.intents.indexOf(b), d.intent = b, this.dispatchEvent(d)
        }
        if (this.hasEventListener(IntentLoaderProgressEvent.LOAD_PROGRESS)) {
            var e = new IntentLoaderProgressEvent(IntentLoaderProgressEvent.LOAD_PROGRESS);
            e.progress = c, this.dispatchEvent(e)
        }
        this.loadNext()
    }
    onIntentLoadError(a) {
        var b = a.currentTarget,
            c = new IntentLoaderErrorEvent(IntentLoaderErrorEvent.INTENT_LOAD_ERROR);
        c.intent = b, c.fault = a.fault, this.dispatchEvent(c), this.continueAfterError ? this.loadNext() : this.loadInProgress = false
    }
    onPreloaderFinished(a) {
        this.dispatchEvent(new IntentLoaderEvent(IntentLoaderEvent.LOAD_COMPLETE))
    }
    static mainRegistry = null;
    static getMainRegistry() {
        return IntentLoader.mainRegistry || (IntentLoader.mainRegistry = new ContentRegistry), IntentLoader.mainRegistry
    }
}
class Usage {
    constructor(a, b) { this.usageCount = 0, this.key = a, this.content = b }
    incrementUsage() { this.usageCount++ }
}
class TaggedContentCache {
    constructor() {
        this._minUsageCount = 2
    }
    get minUsageCount() { return this._minUsageCount }
    set minUsageCount(a) {
        this._minUsageCount != a && (this._minUsageCount = a)
    }
    addContentToCache(b, c) {
        var d = new Usage(b, c);
        d.minUsageCount = this._minUsageCount,
            TaggedContentCache.cacheContentMap[b] = d
    }
    getContentFromCache(b) {
        TaggedContentCache.cacheRequestCount++;
        TaggedContentCache.cacheRequestCount >= TaggedContentCache.usageCountCheckRequestCount && (TaggedContentCache.cacheRequestCount = 0, TaggedContentCache.checkUsageCounts());
        var c = TaggedContentCache.cacheContentMap[b];
        return c ? (c.incrementUsage(), c.content) : null
    }
    static checkUsageCounts() {
        for (var b in TaggedContentCache.cacheContentMap) {
            var c = TaggedContentCache.cacheContentMap[b];
            c.usageCount >= c.minUsageCount ? c.usageCount = 0 : delete TaggedContentCache.cacheContentMap[c.key]
        }
    }
    static cacheContentMap = {};
    static cacheRequestCount = 0;
    static usageCountCheckRequestCount = 100;
}
class AssemblerMaterialDescriptor {
    constructor() { }
    get uId() { return this._uId }
    get assembler() { return this._assembler }
    set assembler(a) { this._assembler != a && (this._assembler = a, this.regenerateUId()) }
    get properties() { return this._properties }
    set properties(a) { this._properties != a && (this._properties = a, this.regenerateUId()) }
    toString() {
        var str = "AssemblerMaterialDescriptor[" + this._assembler + "::" + this._uId + "\nproperies:";
        for (var b in this._properties) {
            var c = this._properties[b];
            str += "\n" + c.name + ": " + c.value
        }
        return str += "\n]"
    }
    clone() {
        var b = new AssemblerMaterialDescriptor;
        b._assembler = this._assembler,
            b._properties = this._properties;
        return b;
    }
    serialize() {
        var a = { assembler: this._assembler, properties: this._properties };
        return a
    }
    regenerateUId() {
        var a = "";
        if (a += this._assembler ? this._assembler : "", a += "::", this._properties && this._properties.length) {
            for (var b = [], c = 0; c < this._properties.length; c++) b[c] = this._properties[c].toString();
            b.sort(), a += b.join("#")
        }
        this._uId = MD5.hash(a);
        if (this._uId == "4501c091b0366d76ea3218b6cfdd8097")
            throw new Error('XXXXXXX');
    }
}
class MaterialMapping {
    constructor() {
        this._scaleU = NaN;
        this._scaleV = NaN;
    }
    get objectGroup() { return this._objectGroup }
    set objectGroup(a) { this._objectGroup != a && (this._objectGroup = a) }
    get scaleU() { return this._scaleU }
    set scaleU(a) { this._scaleU != a && (this._scaleU = a) }
    get scaleV() { return this._scaleV }
    set scaleV(a) { this._scaleV != a && (this._scaleV = a) }
    get materialDescriptor() { return this._materialDescriptor }
    set materialDescriptor(a) { this._materialDescriptor != a && (this._materialDescriptor = a) }
    toString() {
        return "MaterialMapping[\ndescriptor" + this._materialDescriptor.toString() + "\n]"
    }
}
class MaterialProperty {
    constructor() { }
    get name() { return this._name }
    set name(a) { this._name != a && (this._name = a) }
    get value() { return this._value }
    set value(a) { this._value != a && (this._value = a) }
    get floating() { return this._floating }
    set floating(a) { this._floating != a && (this._floating = a) }
    toString() {
        return this.name + ":" + this.value
    }
    serialize() {
        var a = { name: this.name, value: this.value };
        return a
    }
}
class AssemblerConfigBuilderBase {
    constructor(a) {
        this.variableResolver = a
    }
    createMaterialMapping(a, filterNames, c, d) {
        undefined == d && (d = null);
        var materialMapping = new MaterialMapping,
            materialDesc = this.buildMaterialDescriptor(a, filterNames, c, d);
        materialMapping.materialDescriptor = materialDesc;
        for (var h in c) {
            var i = c[h];
            materialMapping[i.name] = parseFloat(i.value)
        }
        return materialMapping
    }
    buildMaterialDescriptor(a, filterNames, c, d) {
        null == filterNames && (filterNames = null),
            null == c && (c = null),
            null == d && (d = null);
        var id, h = {},
            assemblerMaterialDescriptor = new AssemblerMaterialDescriptor,
            j = [];
        for (id = a.length - 1; id >= 0; id--) {
            var k = a[id];
            if (k.materialConfig.materialOverride)
                j.push(k);
            else {
                var l = k.getDepth();
                this.mergeProperties(h, k, l, l, d);
                assemblerMaterialDescriptor.assembler || (assemblerMaterialDescriptor.assembler = k.getRootReference().materialConfig.assembler)
            }
        }
        for (id = 0; id < j.length; id++) {
            var m = j[id],
                conf = m.materialConfig;
            for (var o in conf.properties) {
                var p = conf.properties[o];
                p.value = this.variableResolver(p.value, m.resolvedPath);
                h[p.name] = p
            }
        }
        var propArray = [];
        for (var r in h) {
            var s = h[r];
            var prop = new MaterialProperty;
            prop.name = s.name;
            prop.value = s.value;
            prop.floating = s.floating;
            filterNames && -1 != filterNames.indexOf(prop.name) ? c && c.push(prop) : propArray.push(prop);
        }
        assemblerMaterialDescriptor.properties = propArray;
        return assemblerMaterialDescriptor;
    }
    resolveVariable(a, b, c) {
        undefined == c && (c = null);
        var d = this.variableResolver(a, b);
        return null != c ? c(d) : d
    }
    mergeProperties(a, b, c, d, e) {
        undefined == e && (e = null);
        for (var f in b.materialConfig.properties) {
            var g = b.materialConfig.properties[f],
                j = g.clone();
            j.level = c;
            var k = a[j.name];
            if (!k || j.level > k.level) {
                var l = j.value,
                    m = b.resolvedPath;
                if (j.define) try { if (this.variableResolver(j.define.propertyName, m, e), j.define.type == PropertyDefineType.IF_NOT_DEFINED) continue } catch (n) { if (!(n instanceof NotFoundError)) throw n; if (j.define.type == PropertyDefineType.IF_DEFINED) continue } j.value = this.variableResolver(l, m, e), a[j.name] = j
            }
        }
        b.materialConfig.extendsMaterial && this.mergeProperties(a, b.materialConfig.extendsMaterial, c - 1, d, e)
    }
    static FILTERABLE_PROPERTY_NAMES = ["scaleU", "scaleV"];
}
class ObjectGroup {
    constructor() { }


    get name() { return this._name }
    set name(a) { this._name != a && (this._name = a) }
    get groupedObjectReferences() { return this._groupedObjectReferences }
    set groupedObjectReferences(a) { this._groupedObjectReferences != a && (this._groupedObjectReferences = a) }


}
class PartBuilderBase {
    constructor() { }
    get repeatCount() { return this._repeatCount }
    set repeatCount(a) { this._repeatCount != a && (this._repeatCount = a) }
    get startAngle() { return this._startAngle }
    set startAngle(a) { this._startAngle != a && (this._startAngle = a) }
    get endAngle() { return this._endAngle }
    set endAngle(a) { this._endAngle != a && (this._endAngle = a) }
    get repeatPercent() { return this._repeatPercent }
    set repeatPercent(a) { this._repeatPercent != a && (this._repeatPercent = a) }
}
class PartBuilder extends PartBuilderBase {
    constructor() {
        super();
    }
    get partName() { return this._partName }
    set partName(a) { this._partName != a && (this._partName = a) }
}
class PartBuilderGroup extends PartBuilderBase {
    constructor() {
        super();
    }
    get parts() { return this._parts }
    set parts(a) { this._parts != a && (this._parts = a) }
}
class ObjectBuildDescriptor {
    constructor() { }
    get center() { return this._center }
    set center(a) { this._center != a && (this._center = a) }
    get partBuilders() { return this._partBuilders }
    set partBuilders(a) { this._partBuilders != a && (this._partBuilders = a) }
}
class PlainPartBuilderBase {
    constructor() { }
    get repeatCount() { return this._repeatCount }
    set repeatCount(a) { this._repeatCount != a && (this._repeatCount = a) }
    get startAngle() { return this._startAngle }
    set startAngle(a) { this._startAngle != a && (this._startAngle = a) }
    get endAngle() { return this._endAngle }
    set endAngle(a) { this._endAngle != a && (this._endAngle = a) }
    get repeatPercent() { return this._repeatPercent }
    set repeatPercent(a) { this._repeatPercent != a && (this._repeatPercent = a) }
    get plainConditions() { return this._plainConditions }
    set plainConditions(a) { this._plainConditions != a && (this._plainConditions = a) }
    allConditionsMet(a, b) {
        throw new Error("allConditionsMet must be overriden")
    }
}
class PlainPartBuilder extends PlainPartBuilderBase {
    constructor() {
        super();
    }
    get objectReference() { return this._objectReference }
    set objectReference(a) { this._objectReference != a && (this._objectReference = a) }
    allConditionsMet(a, b) {
        for (var c in this._plainConditions) {
            var d = this._plainConditions[c];
            if (!d.conditionMet(a, b + "/" + this._objectReference))
                return false
        }
        return true
    }
}
class PlainPartBuilderGroup extends PlainPartBuilderBase {
    constructor() {
        super();
    }
    get parts() { return this._parts }
    set parts(a) { this._parts != a && (this._parts = a) }
    getActiveBuilders(a, b) {
        var c = [];
        for (var d in this._parts) {
            var e = this._parts[d];
            e.allConditionsMet(a, b) && c.push(e)
        }
        return c
    }
    allConditionsMet(a, b) {
        for (var c in this._plainConditions) {
            var d = this._plainConditions[c];
            if (!d.conditionMet(a, b + "/group"))
                return false
        }
        return true
    }
}
class PlainObjectBuildDescriptor {
    constructor() { }
    get center() { return this._center }
    set center(a) { this._center != a && (this._center = a) }
    get partBuilders() { return this._partBuilders }
    set partBuilders(a) { this._partBuilders != a && (this._partBuilders = a) }
    getActiveBuilders(a, b) {
        var c = [];
        for (var d in this._partBuilders) {
            var e = this._partBuilders[d];
            e.allConditionsMet(a, b) && c.push(e)
        }
        return c
    }
}
class PlainCondition {
    constructor() { }
    get value() { return this._value }
    set value(a) { this._value != a && (this._value = a) }
    get operators() { return this._operators }
    set operators(a) { this._operators != a && (this._operators = a) }
    conditionMet(a, b) {
        var c = a(this._value, b),
            d = parseFloat(c);
        for (var e in this._operators) {
            var f = this._operators[e],
                g = a(f.value, b),
                h = parseFloat(g),
                i = f.compareFunction;
            if (!i(d, h)) return false
        }
        return true
    }
}
class PlainConditionOperator {
    constructor() { }
    get value() { return this._value }
    set value(a) { this._value != a && (this._value = a) }
    get compareFunction() { return this._compareFunction }
    set compareFunction(a) { this._compareFunction != a && (this._compareFunction = a) }
    static less = function (a, b) { return b > a }
    static lessEqual = function (a, b) { return b >= a }
    static grater = function (a, b) { return a > b }
    static graterEqual = function (a, b) { return a >= b }
    static equal = function (a, b) { return a == b }
}

class VariationConfigBuilder extends AssemblerConfigBuilderBase {
    constructor(b) {
        super(b)
    }

    build(a, c) {
        var d = new VariationConfig,
            e = [],
            f = a.objectGroupReference.obectGrouping;
        this.checkAllGroupNamesMapped(a, c);
        for (var h = 0; h < a.materialMappings.length; h++) {
            var j = a.materialMappings[h],
                k = new ObjectGroup,
                m = a.getObjectGroupByName(j.groupName);
            if (!m) throw new ParseError("Could not find referenced object group:" + j.groupName);
            k.name = m.name, k.groupedObjectReferences = m.groupedObjectReferences, this.checkRootReferencesValid(j);
            var n = [],
                o = this.createMaterialMapping(j.references, VariationConfigBuilder.FILTERABLE_PROPERTY_NAMES, n, j.paramaterMappings);
            o.objectGroup = k, this.resolveSpecialProperties(f, m, n, VariationConfigBuilder.MAPPABLE_PROPERTY_NAMES),
                e.push(o)
        }
        var q = new MetaDataMap;
        for (var r in a.metadatasMap) q.addMetaData(r, a.metadatasMap[r]);
        return d.metadatas = q, d.materialMappings = e, d.objectBuilders = this.getObjectBuilders(f, c), d
    }
    getObjectBuilders(a, b) {
        for (var c = [], d = 0; d < a.objectBuilders.length; d++) {
            var e = a.objectBuilders[d],
                f = e.getActiveBuilders(this.variableResolver, b);
            if (f.length) {
                var g = new ObjectBuildDescriptor;
                g.center = e.center, g.partBuilders = this.parsePartBuilders(f, b), c.push(g)
            }
        }
        return c
    }
    parsePartBuilders(a, b) {
        for (var c = [], d = 0; d < a.length; d) {
            var e, f = a[d];
            if (f instanceof PlainPartBuilder) {
                var g = new PartBuilder,
                    h = f;
                g.partName = h.objectReference, this.parsePartBuilderBaseProperties(g, h, b), e = g
            } else if (f instanceof PlainPartBuilderGroup) {
                var i = new PartBuilderGroup,
                    l = f,
                    o = l.getActiveBuilders(this.variableResolver, b);
                if (this.parsePartBuilderBaseProperties(i, l, b), !o.length) continue;
                if (i.parts = this.parsePartBuilders(o, b), isNaN(i.startAngle) || isNaN(i.endAngle)) {
                    for (var p = NaN, q = NaN, r = 0; r < i.parts.length; r++) {
                        var s = i.parts[r];
                        if (isNaN(s.startAngle)) throw new Error("parent group has no startAngle and one of the children has it not set at " + b);
                        if (isNaN(s.endAngle)) throw new Error("parent group has no endAngle and one of the children has it not set at " + b);
                        p = isNaN(p) ? s.startAngle : Math.min(p, s.startAngle), q = isNaN(q) ? s.endAngle : Math.max(q, s.endAngle)
                    }
                    i.startAngle = p, i.endAngle = q
                }
                e = i
            }
            c.push(e)
        }
        return c
    }
    parsePartBuilderBaseProperties(a, b, c) {
        if (b.startAngle && b.endAngle && (b.startAngle && (a.startAngle = this.resolveVariable(b.startAngle, c + "/startAngle", parseFloat)), b.endAngle && (a.endAngle = this.resolveVariable(b.endAngle, c + "/endAngle", parseFloat)), !isNaN(a.startAngle) && !isNaN(a.endAngle) && a.startAngle > a.endAngle)) throw new ParseError("startAngle is bigger then endAngle in " + c);
        b.repeatCount && (a.repeatCount = this.resolveVariable(b.repeatCount, c + "/repeatCount", parseInt)), b.repeatPercent && (a.repeatPercent = this.resolveVariable(b.repeatPercent, c + "/repeatPercent", parseFloat))
    }
    resolveSpecialProperties(a, b, c, d) {
        for (var e, f = {}, g = 0; g < c.length; g++) e = c[g], f[e.name] = e;
        for (var h = 0; h < b.groupedObjectReferences.length; h++)
            for (var i = b.groupedObjectReferences[h], j = 0; j < d.length; j++) {
                var k = d[j];
                e = f[k], e ? i[k] = e.value : isNaN(i[k]) && (isNaN(b[k]) ? isNaN(a[k]) || (i[k] = a[k]) : i[k] = b[k])
            }
    }
    checkAllGroupNamesMapped(a, b) {
        var c;
        if (!a.materialMappings || !a.materialMappings.length) throw new ParseError("No material mapping found in:" + b);
        if (!a.objectGroupReference.obectGrouping.obejctGroups || !a.objectGroupReference.obectGrouping.obejctGroups.length) throw new ParseError("No object groups found in:" + a.objectGroupReference.resolvedPath);
        var d = a.materialMappings,
            e = {};
        for (c = 0; c < d.length; c++) { var f = d[c]; if (e[f.groupName]) { if (!f.allowMultiMap) throw new ParseError("Group name:" + f.groupName + " was present more then one times in " + b) } else e[f.groupName] = true }
        var g = a.objectGroupReference.obectGrouping.obejctGroups,
            h = {};
        for (c = 0; c < g.length; c++) {
            var i = g[c];
            if (h[i.name]) throw new ParseError("Object Group name:" + i.name + " was present more then one times in " + a.objectGroupReference.resolvedPath);
            h[i.name] = true
        }
        for (var j in e) {
            if (!h[j]) throw new ParseError("No group was found for mapping name:" + j + " referenced from:" + b + " to:" + a.objectGroupReference.resolvedPath);
            delete h[j]
        }
        for (var k in h) throw new ParseError("No mapping was added for group:" + k + " located in:" + a.objectGroupReference.resolvedPath + " from:" + b)
    }
    checkRootReferencesValid(a) {
        for (var b, c, d = 0; d < a.references.length; d++) {
            var e = a.references[d],
                f = e.getRootReference(),
                g = f.materialConfig;
            if (!g.materialOverride) { if (!g.assembler) throw new ParseError("Root material config has no assembler defined in:" + f.resolvedPath); if (b) { if (g.assembler != b) throw new ParseError("Root material asemblers must match in:" + e.resolvedPath + " and in:" + c.resolvedPath) } else b = g.assembler, c = e }
        }
    }
    static MAPPABLE_PROPERTY_NAMES = ["scaleU", "scaleV", "rotationX", "rotationY", "rotationZ"]
}
class MaterialMappingBuilder extends AssemblerConfigBuilderBase {
    constructor(b) {
        super(b);
    }
    build(a) {
        var c = [],
            d = this.createMaterialMapping(a, AssemblerConfigBuilderBase.FILTERABLE_PROPERTY_NAMES, c);
        return d
    }
}
class MaterialConfigAssetContent {
    constructor() { }
    get variationConfig() {
        return this._variationConfig;
    }
    set variationConfig(a) {
        this._variationConfig != a && (this._variationConfig = a)
    }
}
class MaterialLoadIntentBase extends LoadIntent {
    constructor(b, c, d, e) {
        super(b);
        this.contentId = c,
            this.propertyStore = d,
            this.parametersMap = e,
            this._resourceIntentFactory = new ResourceIntentFactory,
            this.pendingReferenceMap = {},
            this.loadedReferencesMap = {},
            this.contentCache = new TaggedContentCache,
            this.intentLoader = new IntentLoader,
            this.intentLoader.on(IntentLoaderStatusEvent.INTENT_LOAD_COMPLETE, this.onIntentLoadComplete, this),
            this.intentLoader.on(IntentLoaderProgressEvent.LOAD_PROGRESS, this.onIntentLoadProgress, this),
            this.intentLoader.on(IntentLoaderEvent.LOAD_COMPLETE, this.onLoadComplete, this),
            this.intentLoader.on(IntentLoaderErrorEvent.INTENT_LOAD_ERROR, this.onIntentLoadError, this);
    }
    get resourceIntentFactory() { return this._resourceIntentFactory }
    set resourceIntentFactory(a) { this._resourceIntentFactory != a && (this._resourceIntentFactory = a) }
    startLoad() {
        throw new Error("startLoad is an abstract class it must be overriden")
    }
    dispose() {
        this.intentLoader.dispose(),
            super.dispose();
    }
    addReferencesToLoad(a, b) {
        var c = {};
        for (var d in a) {
            var e = a[d];
            e.resolvedPath = this.resolveVariables(e.originalPath, b);
            var f = this.loadedReferencesMap[e.resolvedPath];
            if (f) e.setContent(f);
            else {
                var g = this.pendingReferenceMap[e.resolvedPath];
                g || (g = [], this.pendingReferenceMap[e.resolvedPath] = g, c[e.resolvedPath] = true), g.push(e)
            }
        }
        for (var d in c) this.addLoadableContent(d, d)
    }
    addLoadableContent(a, b) {
        var c = this.contentCache.getContentFromCache(a);
        return c ? (/*console.debug("Content retrieved from cache", a),*/
            this.parseLoadedXML(c, a, a), true) : (this.intentLoader.addLoadIntent(new XMLLoadIntent(a, b)),
                this.intentLoader.loadInProgress || this.intentLoader.startLoad(), false)
    }
    addParsedToReference(a, b) {
        var c = this.pendingReferenceMap[a];
        for (var d in c) {
            var e = c[d];
            e.setContent(b)
        }
        this.loadedReferencesMap[a] = b, delete this.pendingReferenceMap[a]
    }
    resolveVariables(a, c, d) {
        undefined == d && (d = null), MaterialLoadIntentBase.ALIAS_REGEX.lastIndex = 0;
        var e = MaterialLoadIntentBase.ALIAS_REGEX.exec(a);
        if (e) {
            var f = e[0],
                g = e[1],
                h = this.propertyStore.getPropertyValue(g);
            if (!h) throw new ParseError("No alias value found for " + f + " in path: " + c);
            a = a.replace(f, h)
        } else if (0 == a.indexOf("@")) {
            var i = this.getBasePath();
            if (null == i) throw new Error("Base path not defined but referenced");
            a = a.replace("@", i)
        }
        MaterialLoadIntentBase.PARAMETER_REGEX.lastIndex = 0;
        var j = MaterialLoadIntentBase.PARAMETER_REGEX.exec(a);
        if (j) {
            var k = j[0],
                l = j[1];
            if (d) {
                var m = d[l];
                m && (c += "<mapped from:" + l + " to:" + m + ">", l = m)
            }
            var n = this.getParameterValue(l);
            if (!n) { var o = new NotFoundError("No parameter value found for " + k + " in path: " + c); throw o } a = a.replace(k, n)
        }
        return a
    }
    getParameterValue(a) {
        return this.parametersMap[a]
    }
    getBasePath() {
        throw new Error("getBasePath is an abstract class it must be overriden")
    }
    parseLoadedXML(a, b, c) {
        throw new Error("parseLoadedXML is an abstract class it must be overriden")
    }
    handleIntentLoadFinished() {
        throw new Error("parseLoadedXML is an abstract class it must be overriden")
    }
    onIntentLoadProgress(a) {
        this.loadProgress(a.progress)
    }
    onIntentLoadComplete(a) {
        var b = a.intent;
        var c = b.content,
            d = b.path,
            e = b.contentId;
        this.contentCache.addContentToCache(d, c), this.parseLoadedXML(c, d, e)
    }
    onLoadComplete(a) {
        this.handleIntentLoadFinished()
    }
    onIntentLoadError(a) {
        this.loadError(a.fault)
    }
    static ALIAS_REGEX = /@([\w\d]+)/g;
    static PARAMETER_REGEX = /\${([\w\d]+)}/g;
}
class MaterialMappingLoadIntent extends MaterialLoadIntentBase {
    constructor(b, c, d, e, f) {
        null == f && (f = null);
        super("MaterialLoadIntent", b, d, e);
        this._basePath = f,
            this.materialXMLPaths = c;
    }
    get basePath() { return this._basePath }
    set basePath(a) { this._basePath != a && (this._basePath = a) }
    startLoad() {
        this.loadStarted(), this.intentLoader.clear();
        var a = [];
        this.materialReferences = [];
        for (var b = 0; b < this.materialXMLPaths.length; b++) {
            var c = new PlainMaterialReference;
            c.originalPath = this.materialXMLPaths[b], a.push(c), this.materialReferences.push(c)
        }
        try { this.addReferencesToLoad(a, this.name), this.intentLoader.loadInProgress || this.handleIntentLoadFinished() } catch (d) { this.loadError(Fault.fromError(d)) }
    }
    parseLoadedXML(a, b, c) {
        try {
            var d = a.name();
            if ("material" == d) {
                var e = MaterialXMLParser.parse(a, b);
                this.addParsedToReference(c, e), this.addReferencesToLoad(e.getAllReferences(), b)
            } else {
                if ("material-override" != d) throw new Error("Unknown node: " + d);
                var g = MaterialOverrideXMLParser.parse(a, b);
                this.addParsedToReference(c, g)
            }
        } catch (h) { this.intentLoader.clear(), this.loadError(Fault.fromError(h)) }
    }
    getBasePath() { return this._basePath }
    handleIntentLoadFinished() {
        this.createMaterialMappingBuilder()
    }
    createMaterialMappingBuilder() {
        var materialMappingBuilder = new MaterialMappingBuilder(Delegate.create(this, this.resolveVariables));
        try {
            var b = materialMappingBuilder.build(this.materialReferences);
            this.loadComplete(b)
        } catch (c) {
            this.loadError(Fault.fromError(c))
        }
    }
}
class MaterialConfigLoadIntent extends MaterialLoadIntentBase {
    constructor(b, c, d, e) {
        super("MaterialConfigLoadIntent", b, d, e);
        this._variationXMLPath = c
    }
    plainVariationConfig = null;
    get variationXMLPath() { return this._variationXMLPath }
    set variationXMLPath(a) { this._variationXMLPath != a && (this._variationXMLPath = a) }
    startLoad() {
        this.loadStarted(),
            this.intentLoader.clear(),
            this.addLoadableContent(this.variationXMLPath, this.variationXMLPath),
            this.intentLoader.loadInProgress || this.handleIntentLoadFinished()
    }
    parseLoadedXML(a, b, c) {
        try {
            var d = a.name();
            if ("variation" == d) this.plainVariationConfig = VariationXMLParser.parse(a, b),
                this.addReferencesToLoad(this.plainVariationConfig.getAllReferences(), b);
            else if ("object-grouping" == d) {
                var e = ObjectGroupingXMLParser.parse(a, b);
                this.addParsedToReference(c, e)
            } else if ("material" == d) {
                var g = MaterialXMLParser.parse(a, b);
                this.addParsedToReference(c, g), this.addReferencesToLoad(g.getAllReferences(), b)
            } else {
                if ("material-override" != d) throw new Error("Unknown node: " + d);
                var h = MaterialOverrideXMLParser.parse(a, b);
                this.addParsedToReference(c, h)
            }
        }
        catch (i) { this.intentLoader.clear(), this.loadError(Fault.fromError(i)) }
    }
    getParameterValue(b) {
        return this.plainVariationConfig && null != this.plainVariationConfig.parametersMap[b] ? this.plainVariationConfig.parametersMap[b] : super.getParameterValue(b)
    }
    getBasePath() {
        var a = Math.max(this._variationXMLPath.lastIndexOf("/"),
            this._variationXMLPath.lastIndexOf("\\"));
        if (-1 != a) { var b = this._variationXMLPath.substring(0, a); return b } return ""
    }
    handleIntentLoadFinished() {
        this.createVariationConfig()
    }
    createVariationConfig() {
        var a = new VariationConfigBuilder(Delegate.create(this, this.resolveVariables));
        try {
            var b = a.build(this.plainVariationConfig, this.variationXMLPath),
                c = new MaterialConfigAssetContent;
            c.variationConfig = b, console.debug("All references loaded"), this.loadComplete(c)
        } catch (d) { this.loadError(Fault.fromError(d)) }
    }
}

class ParserBase {
    constructor() { }
    static mapXMLAttributesIfExists(a, b, c, d) {
        for (var e in b) {
            var f = b[e];
            a.hasOwnProperty("@" + f) && (c[f] = d(a.attribute(f)))
        }
    }
    static parseBoolean(a, b, c) {
        if (undefined == c && (c = null), a = StringUtils.trim(a).toLowerCase(), "true" == a)
            return true;
        if ("false" == a)
            return false;
        if ("" == a) {
            if (null == c)
                throw new ParseError("Empty boolean value:" + a + " at " + b);
            return c
        }
        throw new ParseError("Unknown boolean value:" + a + " at " + b)
    }
}
class ObjectGroupingXMLParser extends ParserBase {
    constructor() {
        super()
    }

    static parse(a, c) {
        var d = new PlainObjectGrouping,
            e = [],
            g = ["scaleU", "scaleV", "rotationX", "rotationY", "rotationZ"];
        this.mapXMLAttributesIfExists(a, g, d, parseFloat);
        for (var h = a.child("object-group"), i = {}, l = 0; l < h.length(); l++) {
            var m = h.get(l),
                n = new PlainObjectGroup;
            n.name = m.attribute("name").text(), this.mapXMLAttributesIfExists(m, g, n, parseFloat);
            for (var p = m.child("object"), q = [], r = 0; r < p.length(); r++) {
                var s = p.get(r),
                    t = new ObjectReference;
                t.name = s.attribute("name").text(), t.optional = this.parseBoolean(s.attribute("optional").text(), c + "/" + t.name + "/@optional", false), t.uvRecalcualte = this.parseBoolean(s.attribute("uvRecalcualte").text(), c + "/" + t.name + "/@uvRecalcualte", false), t.uvRemapMethod = s.attribute("uvRemapMethod").text() ? s.attribute("uvRemapMethod").text() : null;
                var u = i[t.name];
                if (u) throw new ParseError("Object name:" + t.name + " in group:" + n.name + " is already used in group:" + u);
                i[t.name] = n.name, q.push(t)
            }
            n.groupedObjectReferences = q, e.push(n)
        }
        return d.obejctGroups = e, d.objectBuilders = ObjectGroupingXMLParser.parseObjectBuilders(a, i, c), d
    }
    static parseObjectBuilders(a, c, d) {
        for (var e = a.child("object-build-descriptor"), f = [], g = 0; g < e.length(); g++) {
            var h = e.get(g),
                j = new PlainObjectBuildDescriptor;
            j.center = this.parseBoolean(h.attribute("center").text(), d + "/@center");
            var k = [],
                l = h.child("part-builder"),
                n = h.child("part-group");
            if (0 == l.length() && 0 == n.length()) throw new ParseError("object-build-descriptor dose not contain a part builder or a part-group at " + d);
            k = k.concat(ObjectGroupingXMLParser.parsePartBuilders(l, c, d));
            for (var p = 0; p < n.length(); p++) {
                var q = n.get(p),
                    r = new PlainPartBuilderGroup;
                if (ObjectGroupingXMLParser.parsePartBuilderBase(r, q, d + "/group"), !r.repeatCount && !r.repeatPercent) throw new ParseError("repeatCount or repeatPercent must be set for builder group at: " + d);
                var s = q.child("part-builder");
                r.parts = ObjectGroupingXMLParser.parsePartBuilders(s, c, d), k.push(r)
            }
            j.partBuilders = k, f.push(j)
        }
        return f
    }
    static parsePartBuilders(a, c, d) {
        for (var e = [], f = 0; f < a.length(); f++) {
            var g = a[f],
                h = new PlainPartBuilder;
            if (h.objectReference = g.attribute("object-reference").text(), ObjectGroupingXMLParser.parsePartBuilderBase(h, g, d + "/" + h.objectReference), !h.objectReference) throw new ParseError("objectReference must be set for builder at: " + d);
            if (!c[h.objectReference]) throw new ParseError("referenced object nor found in builder named: " + h.objectReference + " at: " + d);
            e.push(h)
        }
        return e
    }
    static parsePartBuilderBase(a, b, c) {
        a.repeatCount = b.attribute("repeat-count").text(), a.startAngle = b.attribute("start-angle").text(), a.endAngle = b.attribute("end-angle").text(), a.repeatPercent = b.attribute("repeat-percent").text();
        for (var d = [], e = b.child("condition"), f = 0; f < e.length(); f++) {
            var i = e.get(f),
                j = new PlainCondition;
            if (j.value = i.attribute("value").text(), !j.value) throw new ParseError("Condition has no value at " + c);
            var k = [],
                l = i.children();
            if (0 == l.length()) throw new ParseError("condition in referencing:" + c + " contans no operators");
            for (var m = 0; m < l.length(); m++) {
                var n = l.get(m),
                    p = new PlainConditionOperator;
                if (p.value = n.attribute("value").text(), !p.value) throw new ParseError("Operator has no value at " + c);
                var q = n.name().toLowerCase();
                switch (q) {
                    case "less":
                        p.compareFunction = PlainConditionOperator.less;
                        break;
                    case "lessequal":
                        p.compareFunction = PlainConditionOperator.lessEqual;
                        break;
                    case "grater":
                        p.compareFunction = PlainConditionOperator.grater;
                        break;
                    case "graterequal":
                        p.compareFunction = PlainConditionOperator.graterEqual;
                        break;
                    case "equal":
                        p.compareFunction = PlainConditionOperator.equal;
                        break;
                    default:
                        throw new ParseError("Unknow operator " + q + " in builder, reference at: " + c)
                }
                k.push(p)
            }
            j.operators = k, d.push(j)
        }
        a.plainConditions = d
    }
}
class MaterialXMLParserBase extends ParserBase {
    constructor() {
        super();
    }
    static parsePropertiesNode(a, b) {
        for (var c = a.child("properties").childNodes(), d = [], e = null, f = 0; f < c.length(); f++) {
            var k = c.get(f),
                l = k.name().trim().toLowerCase(),
                m = k.type();
            if (1 == m) {
                if ("property" != l) throw new ParseError("Unknown property node name: " + l + " at:" + b);
                var n = new PlainMaterialProperty;
                if (n.name = k.attribute("name").text(), n.floating = this.parseBoolean(k.attribute("floating").text(), b + "/" + n.name + "/@floating", false), !n.name) throw new ParseError("Property name missing in:" + b);
                if (n.value = k.attribute("value").text(), !n.value) throw new ParseError("Property value missing in:" + b);
                n.define = e, d.push(n)
            } else if (7 == m) switch (l) {
                case "ifdef":
                case "ifndef":
                    if (e) throw new ParseError("No nested defines are possible. " + b);
                    var o = k.text().trim();
                    e = new PropertyDefine("ifdef" == l ? PropertyDefineType.IF_DEFINED : PropertyDefineType.IF_NOT_DEFINED, o);
                    break;
                case "else":
                    if (!e) throw new ParseError("No ifdef or ifndef before of else at:" + b);
                    e = e.clone(), e.type = e.type == PropertyDefineType.IF_DEFINED ? PropertyDefineType.IF_NOT_DEFINED : PropertyDefineType.IF_DEFINED;
                    break;
                case "endif":
                    if (!e) throw new ParseError("No ifdef or ifndef before of endif at:" + b);
                    e = null;
                    break;
                default:
                    throw new ParseError("Unknow define node: " + l + " at:" + b)
            }
        }
        if (e) throw new ParseError("Define property " + e.propertyName + " not terminated at:" + b);
        return d
    }
}
class MaterialXMLParser extends MaterialXMLParserBase {
    constructor() {
        super();
    }
    static parse(a, b) {
        var c = new PlainMaterialConfig,
            d = a.attribute("extends");
        if (d.length()) {
            var e = new PlainMaterialReference;
            e.originalPath = d.get(0).text(), c.extendsMaterial = e
        }
        var f = a.attribute("assembler");
        if (f.length()) {
            if (d.length()) throw new ParseError("Material xml can't define an assembler when extends another in:" + b);
            c.assembler = f.get(0).text()
        }
        if (!d.length() && !f.length()) throw new ParseError("Material xml must define an extends or assembler attribute in:" + b);
        return c.properties = this.parsePropertiesNode(a, b), c
    }
}
class MaterialOverrideXMLParser extends MaterialXMLParserBase {
    constructor() {
        super();
    }
    static parse(a, b) {
        var c = new PlainMaterialConfig;
        return c.materialOverride = true,
            c.properties = this.parsePropertiesNode(a, b),
            c
    }
}
class PlainObjectGrouping {
    constructor() { this._scaleU = NaN, this._scaleV = NaN, this._rotationX = NaN, this._rotationY = NaN, this._rotationZ = NaN }

    get obejctGroups() {
        return this._obejctGroups;
    }

    set obejctGroups(a) {
        this._obejctGroups != a && (this._obejctGroups = a)
    }

    get objectBuilders() {
        return this._objectBuilders;
    }

    set objectBuilders(a) {
        this._objectBuilders != a && (this._objectBuilders = a)
    }

    get scaleU() {
        return this._scaleU;
    }

    set scaleU(a) {
        this._scaleU != a && (this._scaleU = a)
    }
    get scaleV() {
        return this._scaleV;
    }

    set scaleV(a) {
        this._scaleV != a && (this._scaleV = a)
    }

    get rotationX() {
        return this._rotationX;
    }

    set rotationX(a) {
        this._rotationX != a && (this._rotationX = a)
    }

    get rotationY() {
        return this._rotationY;
    }

    set rotationY(a) {
        this._rotationY != a && (this._rotationY = a)
    }

    get rotationZ() {
        return this._rotationZ;
    }

    set rotationZ(a) {
        this._rotationZ != a && (this._rotationZ = a)
    }

    get data() {
        return this._data;
    }

    set data(a) {
        this._data != a && (this._data = a)
    }


}
class PlainObjectGroup {
    constructor() {
        this._scaleU = NaN, this._scaleV = NaN, this._rotationX = NaN, this._rotationY = NaN, this._rotationZ = NaN
    }

    get name() { return this._name }
    set name(a) { this._name != a && (this._name = a) }
    get groupedObjectReferences() { return this._groupedObjectReferences }
    set groupedObjectReferences(a) { this._groupedObjectReferences != a && (this._groupedObjectReferences = a) }
    get scaleU() { return this._scaleU }
    set scaleU(a) { this._scaleU != a && (this._scaleU = a) }
    get scaleV() { return this._scaleV }
    set scaleV(a) { this._scaleV != a && (this._scaleV = a) }
    get rotationX() { return this._rotationX }
    set rotationX(a) { this._rotationX != a && (this._rotationX = a) }
    get rotationY() { return this._rotationY }
    set rotationY(a) { this._rotationY != a && (this._rotationY = a) }
    get rotationZ() { return this._rotationZ }
    set rotationZ(a) { this._rotationZ != a && (this._rotationZ = a) }
    get data() { return this._data }
    set data(a) { this._data != a && (this._data = a) }


}
class ObjectReference {
    constructor(a) {
        undefined == a && (a = null),
            this._scaleU = NaN,
            this._scaleV = NaN,
            this._rotationX = NaN,
            this._rotationY = NaN,
            this._rotationZ = NaN,
            this._name = a
    }

    get name() { return this._name }
    set name(a) { this._name != a && (this._name = a) }
    get optional() { return this._optional }
    set optional(a) { this._optional != a && (this._optional = a) }
    get scaleU() { return this._scaleU }
    set scaleU(a) { this._scaleU != a && (this._scaleU = a) }
    get scaleV() { return this._scaleV }
    set scaleV(a) { this._scaleV != a && (this._scaleV = a) }
    get rotationX() { return this._rotationX }
    set rotationX(a) { this._rotationX != a && (this._rotationX = a) }
    get rotationY() { return this._rotationY }
    set rotationY(a) { this._rotationY != a && (this._rotationY = a) }
    get rotationZ() { return this._rotationZ }
    set rotationZ(a) { this._rotationZ != a && (this._rotationZ = a) }
    get uvRecalculate() { return this._uvRecalculate }
    set uvRecalculate(a) { this._uvRecalculate != a && (this._uvRecalculate = a) }
    get uvRemapMethod() { return this._uvRemapMethod }
    set uvRemapMethod(a) { this._uvRemapMethod != a && (this._uvRemapMethod = a) }
}
class PlainMaterialProperty {
    constructor() {
        this._level = 0
    }
    get name() { return this._name }
    set name(a) { this._name != a && (this._name = a) }
    get value() { return this._value }
    set value(a) { this._value != a && (this._value = a) }
    get floating() { return this._floating }
    set floating(a) { this._floating != a && (this._floating = a) }
    get level() { return this._level }
    set level(a) { this._level != a && (this._level = a) }
    get define() { return this._define }
    set define(a) { this._define != a && (this._define = a) }
    clone() {
        var b = new PlainMaterialProperty;
        return b.name = this._name,
            b.value = this._value, b.floating = this._floating,
            b.level = this._level, b.define = this._define, b
    }
}
class PropertyDefine {
    constructor(a, b) {
        null == a && (a = null),
            null == b && (b = null),
            this._type = a,
            this._propertyName = b
    }
    get type() { return this._type }
    set type(a) { this._type != a && (this._type = a) }
    get propertyName() { return this._propertyName }
    set propertyName(a) { this._propertyName != a && (this._propertyName = a) }
    clone() {
        var b = new PropertyDefine(this._type, this._propertyName); return b
    }
}
class PropertyDefineType {
    constructor() {

    }
    static IF_DEFINED = "IF_DEFINED";
    static IF_NOT_DEFINED = "IF_NOT_DEFINED";
}
class PlainMaterialMapping {
    constructor() {

    }
    get groupName() { return this._groupName }
    set groupName(a) { this._groupName != a && (this._groupName = a) }
    get references() { return this._references }
    set references(a) { this._references != a && (this._references = a) }
    get paramaterMappings() { return this._paramaterMappings }
    set paramaterMappings(a) { this._paramaterMappings != a && (this._paramaterMappings = a) }
    get allowMultiMap() { return this._allowMultiMap }
    set allowMultiMap(a) { this._allowMultiMap != a && (this._allowMultiMap = a) }
}
class VariationXMLParser extends ParserBase {
    constructor() {
        super();
    }
    static parse(a, c) {
        var d = new PlainVariationConfig,
            e = a.child("object-grouping");
        if (!e.length()) throw new ParseError("No object-grouping reference in:" + c);
        var k = e.get(0),
            m = new PlainObjectGrouppingReference;
        if (m.originalPath = k.text(), !m.originalPath) throw new ParseError("Empty object-grouping reference in:" + c);
        d.objectGroupReference = m;
        for (var n = a.child("paramaters").child("parameter"), o = {}, p = 0; p < n.length(); p++) {
            var q = n.get(p);
            o[StringUtils.trim(q.attribute("name").text())] = StringUtils.trim(q.attribute("value").text())
        }
        d.parametersMap = o;
        for (var r = a.child("metadatas").child("metadata"), s = {}, t = 0; t < r.length(); t++) {
            var u = r.get(t),
                v = StringUtils.trim(u.attribute("value").text());
            s[StringUtils.trim(u.attribute("name").text())] = v
        }
        d.metadatasMap = s;
        for (var w = [], x = a.child("material-mappings").child("material-mapping"), y = 0; y < x.length(); y++) {
            var z = x.get(y),
                A = new PlainMaterialMapping;
            A.groupName = z.attribute("group-name").text();
            A.allowMultiMap = this.parseBoolean(z.attribute("allow-multi-map").text(), c + "/" + A.groupName + "/@allowMultiMap", false);
            var B = z.attribute("paramater-mapping").text();
            A.paramaterMappings = VariationXMLParser.parseParameterMappings(B, c + "/@paramater-mapping");
            for (var C = [], D = z.child("material"), E = 0; E < D.length(); E++) {
                var F = D.get(E),
                    G = new PlainMaterialReference;
                G.originalPath = F.text(), C.push(G)
            }
            A.references = C, w.push(A)
        }
        return d.materialMappings = w, d
    }
    static parseParameterMappings(a, b) {
        var c = {};
        if (a)
            for (var d = a.split(";"), e = 0; e < d.length; e++) {
                var f = d[e];
                if (f) {
                    var g = f.split(":");
                    if (2 != g.length) throw new ParseError("paramerer mapping name value pair is invalid at " + b);
                    var h = StringUtils.trim(g[0]),
                        i = StringUtils.trim(g[1]);
                    c[h] = i
                }
            }
        return c
    }
}
class XMLValueParser {
    constructor() { }
    static parseNumber(b, c, d) {
        return null == d && (d = null),
            XMLValueParser.parseValue(b, c, parseFloat, d)
    }
    static parseBoolean(b, c, d) {
        return null == d && (d = null),
            XMLValueParser.parseValue(b, c, XMLValueParser.parseBooleanValue, d)
    }
    static parseVector3(b, c, d) {
        return null == d && (d = null),
            XMLValueParser.parseValue(b, c, XMLValueParser.parseVector3Value, d)
    }
    static parseNumberArray(item, key, d) {
        return null == d && (d = null),
            XMLValueParser.parseValue(item, key, XMLValueParser.parseNumberArrayValue, d)
    }
    static parseValue(a, b, convertFunc, defVal) {
        null == defVal && (defVal = null);
        var e = a.child(b),
            f = null;
        if (1 == e.length()) f = e.get(0).text();
        else if (e.length() > 1) throw new Error("More then one value found for " + b + " in xml value parser");
        if (f == null) { if (null != defVal) return defVal; throw new Error("No valid value found for " + b) }
        try { return convertFunc(f) } catch (g) { throw new Error("Error when parsing property " + b + " error:" + g.message) }
    }
    static parseNumberArrayValue(a) {
        for (var b = [], c = a.trim().split(","), d = 0; d < c.length; d++) {
            var e = parseFloat(c[d]);
            if (isNaN(e)) throw new Error("Parsed number at index " + d + " in number array is NaN");
            b[d] = e
        }
        return b
    }
    static parseBooleanValue(a) {
        if ("true" == a.trim().toLowerCase())
            return true;
        if ("false" == a.trim().toLowerCase())
            return false;
        throw new Error("Unknown boolean value found: " + a)
    }
    static parseVector3Value(b) {
        var c = XMLValueParser.parseNumberArrayValue(b);
        if (3 == c.length)
            return new THREE.Vector3(c[0], c[1], c[2]);
        throw new Error("Invalid vector item length when parsing")
    }
}

export {
    MD5, Delegate, RescourceNames, XMLValueParser, IntentLoader, AssemblerMaterialDescriptor, MaterialMappingLoadIntent, MaterialConfigLoadIntent, ResourceIntentFactory,
    PlainObjectGrouppingReference, PlainMaterialReference, Path
}
export {
    MMFReader
};
export {
    URLLoaderDataFormat, URLRequestMethod, URLVariables, URLLoader, URLRequestHeader, URLRequest
};
export {
    Responder, LoadIntent, ImageDataLoadIntent, FontLoadIntent, ScriptLoadIntent, FileLoaderIntent,
    ImageLoadIntent, FallbackMMFLoadIntent, JSONLoadIntent, MMFLoadIntent, XMLLoadIntent
};
