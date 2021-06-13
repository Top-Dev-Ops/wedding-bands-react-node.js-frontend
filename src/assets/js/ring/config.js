
/* eslint-disable no-unused-expressions */
class DiamondConfig {
    constructor() { }

    diaOffset = null;
    shiftAngleOnSurface = null;
    installHeight = null;
    installWidth = null;
    stoneType = null;
    leftPos = null;
    diaPos = null;
    rightPos = null;
    depth = null;
    diaWidth = null;
    diaHeight = null;
    rotationAngle = 0;
    zRotationAngle = 0;
    margin = null;
    clone() {
        var a = new DiamondConfig();
        (a.diaOffset = this.diaOffset),
            (a.shiftAngleOnSurface = this.shiftAngleOnSurface),
            (a.diaWidth = this.diaWidth),
            (a.diaHeight = this.diaHeight),
            (a.installHeight = this.installHeight),
            (a.installWidth = this.installWidth),
            (a.stoneType = this.stoneType),
            (a.depth = this.depth),
            (a.diaPos = this.diaPos),
            (a.leftPos = this.leftPos),
            (a.rightPos = this.rightPos),
            (a.margin = this.margin),
            (a.rotationAngle = this.rotationAngle);
        (a.zRotationAngle = this.zRotationAngle);
        return a;
    }
}
class View3DConfig {
    constructor() {
        this.initConfig = null;
        this.basePath = null;
        this.version = null;
        this.forceFallback = false;
        this.backgroundConfig = null;
        this.backgroundColor = "#eaeff2";
        this.fullscreen3DAreaWidth = 800;
        this.fullscreen3DAreaHeight = 800;
        this.webglEnabled = false;
        this.webglConfigLocation = null;
        this.requestAnimationFrameOverrideFunction = null;
        this.fallbackDisplayImageIndex = 5;
        this.fallbackShareImageIndex = 5;
        this.fallbackDeviceScrollMode = false;
        this.fallbackUseSnapService = false;
        this.fallbackFadeLayers = true;
        this.fallbackUrl = null;
        this.fallbackUserAgentFadeExlusionRegexes = [/Android/i];
    }
}
class HandViewConfig {
    constructor() {
        this.handImageElement = "div";
    }
}
class VariationConfig {
    constructor() { }

    get materialMappings() { return this._materialMappings }
    set materialMappings(a) { this._materialMappings != a && (this._materialMappings = a) }
    get objectBuilders() { return this._objectBuilders }
    set objectBuilders(a) { this._objectBuilders != a && (this._objectBuilders = a) }
    get metadatas() { return this._metadatas }
    set metadatas(a) { this._metadatas != a && (this._metadatas = a) }
    toString() {
        var a = "VariationConfig[\nmaterialMappings:";
        for (var b in this.materialMappings) {
            var c = this.materialMappings[b];
            a += "\n" + c.toString()
        }
        return a += "\n]"
    }
}
class PlainMaterialConfig {
    constructor() {

    }
    get extendsMaterial() { return this._extendsMaterial }
    set extendsMaterial(a) { this._extendsMaterial != a && (this._extendsMaterial = a) }
    get assembler() { return this._assembler }
    set assembler(a) { this._assembler != a && (this._assembler = a) }
    get materialOverride() { return this._materialOverride }
    set materialOverride(a) { this._materialOverride != a && (this._materialOverride = a) }
    get properties() { return this._properties }
    set properties(a) { this._properties != a && (this._properties = a) }
    getAllReferences() {
        var a = []; return this._extendsMaterial && a.push(this._extendsMaterial), a
    }
    getRootMaterialConfig() {
        return this.extendsMaterial && this.extendsMaterial.materialConfig ?
            this.extendsMaterial.materialConfig.getRootMaterialConfig() : this
    }
}
class PlainVariationConfig {
    constructor() { }
    get objectGroupReference() { return this._objectGroupReference }
    set objectGroupReference(a) { this._objectGroupReference != a && (this._objectGroupReference = a) }
    get materialMappings() { return this._materialMappings }
    set materialMappings(a) { this._materialMappings != a && (this._materialMappings = a) }
    get parametersMap() { return this._parametersMap }
    set parametersMap(a) { this._parametersMap != a && (this._parametersMap = a) }
    get metadatasMap() { return this._metadatasMap }
    set metadatasMap(a) { this._metadatasMap != a && (this._metadatasMap = a) }
    getAllReferences() {
        var a = new Array;
        this.objectGroupReference && a.push(this.objectGroupReference);
        for (var b in this.materialMappings) {
            var c = this.materialMappings[b];
            for (var d in c.references) {
                var e = c.references[d];
                a.push(e)
            }
        }
        return a
    }
    getObjectGroupByName(name) {
        if (this._objectGroupReference &&
            this._objectGroupReference.obectGrouping &&
            this._objectGroupReference.obectGrouping.obejctGroups) {
            for (var b in this._objectGroupReference.obectGrouping.obejctGroups) {
                var c = this._objectGroupReference.obectGrouping.obejctGroups[b];
                if (c.name == name)
                    return c
            }
        }
        return null
    }
}

export {
    DiamondConfig, VariationConfig, PlainMaterialConfig, PlainVariationConfig
};
export {
    View3DConfig, HandViewConfig
}