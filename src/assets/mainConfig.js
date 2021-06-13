class ArrayTool {
    static replace(a, b, c) {
        return a.split(b).join(c);
    }
    static clear(array, nLen, bFull) {
        if (array == null) return;
        if (nLen == null) nLen = 0;
        if (bFull == null) bFull = true;

        if (!bFull) nLen = (array.length >= nLen) ? nLen : array.length;
        var len = array.length;
        if (nLen > len) for (var j = len; nLen > j; j++) array.push(null);
        else for (; array.length > nLen;) array.pop();
    }
}
class Metal {
    constructor(s, dir, sine, sineH) {
        this.colorTabNum = s;
        this.sine = 0;
        this.sinH = 0;
        this.dir = 'V';
        switch (this.colorTabNum) {
            case 3:
                this.slice = [1, 1, 1];
                this.gradient = [0, 0, 0];
                this.surface = [0, 0, 0];
                break;
            case 2:
                this.dir = dir;
                this.sine = sine;
                this.sinH = sineH;
                this.slice = [1, 1];
                this.gradient = [0, 0];
                this.surface = [0, 0];
                break;
            default:
                this.slice = [1];
                this.gradient = [0];
                this.surface = [0];
                break;
        }
    }
    setSine(g) {
        this.sine = g;
    }
    setSineH(g) {
        this.sineH = g;
    }
    setGradient(g) {
        ArrayTool.clear(this.gradient);
        this.gradient = g.slice();
    }
    setSurface(g) {
        ArrayTool.clear(this.surface);
        this.surface = g.slice();
    }
    setSlice(g) {
        ArrayTool.clear(this.slice);
        this.slice = g.slice();
    }
    toConfig() {
        if (this.slice.length == 0 || this.gradient.length == 0 || this.surface.length == 0)
            return null;
        if (this.slice.length != this.gradient.length || this.surface.length != this.gradient.length)
            return null;
        return {
            slice: this.slice,
            gradient: this.gradient,
            surface: this.surface,
            sine: this.sine,
            sineH: this.sineH,
            dir: this.dir
        }
    }
}
class Groove {
    constructor() {
        this.type = 'n'
        this.sine = 0;
        this.sineH = 0;
        this.radius = 0;
        this.position = 0.5;
        this.width = 0.35;
        this.dir = 'V';
        this.surface = 'polished';
        this.separation = true;
    }
    isNone() {
        return this.type == 'n';
    }
    isNormal() {
        return this.type != 'n';
    }
    toConfig() {
        return {
            type: this.type,
            width: this.width,
            surface: this.surface,
            sine: this.sine,
            sineH: this.sineH,
            dir: this.dir,
            position: this.position
        }
    }
}
class Grooves {
    constructor() {
        this.grooveArray = new Array(0);
    }
    add(groove) {
        this.grooveArray.push(groove);
    }
    getAt(index) {
        if (index < 0) return new Groove();

        var id = 0;
        for (var i = 0; i < this.grooveArray.length; i++) {
            if (this.grooveArray[i].separation)
                continue;
            else {
                if (id == index) {
                    return this.grooveArray[i];
                }
                else id++;
            }
        }
        return null;
    }
    deleteAt(index) {
        var id = 0;
        for (var i = 0; i < this.grooveArray.length; i++) {
            if (this.grooveArray[i].separation)
                continue;
            else {
                if (id == index) {
                    this.grooveArray.splice(i, 1);
                    break;
                }
                else id++;
            }
        }
        return;
    }
    getDesignCount() {
        var count = 0;
        for (var i = 0; i < this.grooveArray.length; i++) {
            if (!this.grooveArray[i].separation && this.grooveArray[i].isNormal())
                count++;
        }
        return count;
    }
    getSeparateCount() {
        var count = 0;
        for (var i = 0; i < this.grooveArray.length; i++) {
            if (this.grooveArray[i].separation && this.grooveArray[i].isNormal())
                count++;
        }
        return count;
    }
    deleteSeparateGrooves() {
        for (var i = 0; i < this.grooveArray.length; i++) {
            if (this.grooveArray[i].separation && this.grooveArray[i].isNormal()) {
                this.grooveArray.splice(i, 1);
                i--;
            }
        }
    }
    deleteAll() {
        for (var i = 0; i < this.grooveArray.length;) {
            if (!this.grooveArray[i].separation && this.grooveArray[i].isNormal())
                this.grooveArray.splice(i, 1);
            else i++;
        }
        if (this.grooveArray.length == 0) this.grooveArray.push(new Groove());
    }
    isAddable() {
        for (var i = 0; i < this.grooveArray.length; i++) {
            if (this.grooveArray[i].separation && this.grooveArray[i].sine != 0) {
                return false;
            }
        }
        return true;
    }
    reset() {
        ArrayTool.clear(this.grooveArray);
    }
    toConfig() {
        var confArray = [];
        if (this.grooveArray.length == 0) {
            confArray.push(new Groove().toConfig());
        }
        else {
            for (var i = 0; i < this.grooveArray.length; i++) {
                confArray.push(this.grooveArray[i].toConfig());
            }
        }
        return confArray;
    }
}
class Edge {
    constructor() {
        this.type = 'n';
        this.position = 0;
        this.width = 0.35;
        this.surface = 'polished';
    }
    toConfig() {
        return {
            type: this.type,
            width: this.width,
            surface: this.surface,
            position: this.position
        }
    }
}
class Edges {
    constructor() {
        this.leftEdge = new Edge();
        this.rightEdge = new Edge();
    }
    deleteLeft() {
        this.leftEdge.type = 'n';
    }
    deleteRight() {
        this.rightEdge.type = 'n';
    }
    deleteAll() {
        this.leftEdge.type = 'n';
        this.rightEdge.type = 'n';
    }
    toConfig() {
        var confArray = [];
        confArray.push(this.leftEdge.toConfig());
        confArray.push(this.rightEdge.toConfig());
        return confArray;
    }
}
class Diamond {
    constructor(setting, cut) {
        if (setting == null) setting = 'none';
        if (cut == null) cut = 'brilliant';
        this.setting = setting;
        this.cut = cut;
    }
    setting = 'none';
    cut = 'brilliant';
    size = 0.015;
    quality = 'G/SI';
    stonePerRow = 1;
    rows = 1;
    position = 0.5;
    spacing = "next";
    toConfig() {
        return {
            setting: this.setting,
            cut: this.cut,
            size: this.size,
            quality: this.quality,
            stonePerRow: this.stonePerRow,
            rows: this.rows,
            position: this.position,
            spacing: this.spacing
        }
    }

    static brilliantDiaSize = [
        { s: 0.005, h: 1.1, w: 1.1, a: 0 },
        { s: 0.006, h: 1.15, w: 1.15, a: 0 },
        { s: 0.007, h: 1.2, w: 1.2, a: 0 },
        { s: 0.008, h: 1.25, w: 1.25, a: 0 },
        { s: 0.009, h: 1.3, w: 1.3, a: 0 },
        { s: 0.01, h: 1.35, w: 1.35, a: 0 },
        { s: 0.015, h: 1.5, w: 1.5, a: 0 },
        { s: 0.02, h: 1.7, w: 1.7, a: 0 },
        { s: 0.03, h: 2, w: 2, a: 0 },
        { s: 0.04, h: 2.2, w: 2.2, a: 0 },
        { s: 0.05, h: 2.4, w: 2.4, a: 0 },
        { s: 0.06, h: 2.5, w: 2.5, a: 0 },
        { s: 0.07, h: 2.6, w: 2.6, a: 0 },
        { s: 0.08, h: 2.7, w: 2.7, a: 0 }
    ];
    static princessDiaSize = [
        { s: 0.025, h: 1.6, w: 1.6, a: 0 },
        { s: -0.025, h: 1.6, w: 1.6, a: 45 },
        { s: 0.04, h: 1.8, w: 1.8, a: 0 },
        { s: -0.04, h: 1.8, w: 1.8, a: 45 }
    ];
    static baguetteDiaSize = [
        { s: 0.055, h: 3, w: 1.5, a: 0 },
        { s: -0.055, h: 3, w: 1.5, a: 90 },
        { s: 0.085, h: 3.5, w: 1.75, a: 0 },
        { s: -0.085, h: 3.5, w: 1.75, a: 90 }
    ];

    static settingArray = ['none', 'rubbed', 'section', 'channel', 'cross_channel'];
    static cutArray = ['brilliant', 'princess', 'baguette'];
    static spacing = ['next', 'halfStone', 'singleStone', 'doubleStone', 'thirdRing', 'halfRing', 'rightSpaced'];
}
function drawGroove(start, ringConfig, which) {
    var canvas = document.getElementById('grooveCanvas');
    var ctx = canvas.getContext('2d');
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    var vcanvas = document.createElement('canvas');
    vcanvas.width = canvasWidth;
    vcanvas.height = 2 * (canvasHeight - 20) + 20;
    var vHeight = 2 * (canvasHeight - 20);
    var vctx = vcanvas.getContext('2d');

    vctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
    vctx.fillStyle = "#FFD700";
    vctx.fillRect(vcanvas.width / 2, 0, vcanvas.width / 2, vHeight);
    drawGrooveGrid(vcanvas, vctx, vHeight);

    var rectWidth = vcanvas.width / 2;
    for (var k = 0; k < ringConfig.grooves.grooveArray.length; k++) {
        var fillColor = 'black'
        var groove = ringConfig.grooves.grooveArray[k];
        if (!groove.isNormal()) continue;

        var position = groove.position;
        if (k == which) {
            fillColor = 'red';
        }

        var w = rectWidth * groove.width / ringConfig.width;
        var X0 = vcanvas.width / 2 + rectWidth * position;
        var color = 'red';

        if (groove.sine == 0 || groove.sineH == 0) {
            var p1, p2;
            p1 = { x: X0, y: 0 };
            p2 = { x: X0, y: vHeight };
            drawGrooveLine(vctx, p1, p2, color, w);
        }
        else if (groove.sine == 0) {
            var p1, p2;
            p1 = { x: X0, y: 0 };
            p2 = { x: X0, y: vHeight };
            drawGrooveLine(vctx, p1, p2, color, w);
        }
        else if (groove.sine != 0 && groove.sineH != 0) {
            vctx.lineJoin = "round"
            vctx.strokeStyle = color;
            vctx.globalAlpha = "0.2";
            vctx.lineWidth = w;
            vctx.globalCompositeOperation = "source-over";

            vctx.beginPath();
            for (var i = 0; i <= 360; i++) {
                var x = X0 + Math.sin(groove.sine * i * Math.PI / 180) * (rectWidth / 2 * groove.sineH);
                var y = i * vHeight / 360;
                if (i == 0) vctx.moveTo(x, y);
                else vctx.lineTo(x, y);
            }
            vctx.stroke();
        }

        vctx.strokeStyle = 'gray';
        vctx.lineWidth = 1;
        vctx.beginPath();
        vctx.moveTo(X0, 0);
        vctx.lineTo(X0, vHeight);
        vctx.closePath();
        vctx.stroke();

        vctx.strokeStyle = '#000000';
        vctx.fillStyle = fillColor;
        vctx.beginPath();
        vctx.moveTo(X0, vHeight);
        vctx.lineTo(X0 - 10, vHeight + 10);
        vctx.lineTo(X0 + 10, vHeight + 10);
        vctx.closePath();
        vctx.fill();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var startY = start * vHeight / 360;
    ctx.drawImage(vcanvas, 0, -startY);
    ctx.drawImage(vcanvas, 0, vHeight - startY);

    ctx.clearRect(0, canvas.height - 20, canvas.width, 20);

    ctx.drawImage(vcanvas, 0, vHeight, vcanvas.width, 20, 0, canvas.height - 20, canvas.width, 20);
}
class RingConfig {
    constructor(profile, width, height, circumference, txt) {
        this.profile = profile;
        this.width = width;
        this.height = height;
        this.circumference = circumference;
        this.visibility = true;
        this.engrave = new Engrave(txt);
        this.grooves = new Grooves();
        this.edges = new Edges();
        this.metal = new Metal(1);
        this.diamond = new Diamond('rubbed');
    }
    displayGroove(start, which) {
        if (which == null) which = this.grooves.grooveArray.length - 1;
        drawGroove(start, this, which);
    }
}
class Engrave {
    constructor(txt) {
        this.txt = txt;
    }
    txt = '18K';
    font = 'hallmark';
    carveType = 'laser'
    toConfig() {
        return {
            txt: this.txt,
            font: this.font,
            carveType: this.carveType
        }
    }
}
function drawGrooveLine(ctx, p1, p2, color, width) {
    if (width != 0) {
        ctx.lineJoin = "round"
        ctx.strokeStyle = color;
        ctx.globalAlpha = "0.2";
        ctx.lineWidth = width;
        ctx.globalCompositeOperation = "source-over";
    }
    else {
        ctx.strokeStyle = color;
    }

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.closePath();
    ctx.stroke();
}
function drawGrooveGrid(canvas, ctx, height) {
    var p1, p2;
    var dw = 16;
    var X0 = canvas.width / 2;
    var dH = height * 45 / 360;
    var Y0 = 0;
    for (var step = 0; step <= 360; step += 45) {
        p1 = { x: X0 - 4, y: Y0 };
        p2 = { x: X0 - dw, y: Y0 };
        drawGrooveLine(ctx, p1, p2, 'gray', 0);
        ctx.fillStyle = 'black';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText("" + (step % 360), X0 - dw - 2, Y0);
        Y0 += dH;
    }
}

export {
    ArrayTool, Metal, Groove, Grooves, Edge, Edges, Diamond, RingConfig
}
