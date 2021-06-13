/* eslint-disable no-unused-expressions */
import {
    Dictionary, AssetDictionary, BuildAssetPackage
} from "./assembler.js"
import {
    Encoder, TextEngravingImageFactory, StampEngravingImageFactory
} from "./engrave.js"
import { ObjMan } from "./objman.js"
import { Type } from "./meta.js"
class BuildAssetBase {
    __class__ = BuildAssetBase;
    static __name__ = ["BuildAssetBase"];
    constructor() {
        this.sharable = true;
    }

    sharable = null;
    get_sharable() {
        return this.sharable;
    }
    set_sharable(a) {
        return this.sharable == a ? this.sharable : ((this.sharable = a), this.sharable);
    }
    content = null;
    get_content() {
        return this.content;
    }
    get_uid() {
        return Type.getClassName(ObjMan.getClass(this)) + "@";
    }
    cloneContent() {
        throw new Error("cloneContent is an abstaract method it must be overriden");
    }
    setContent(a) {
        if (this.content) throw new Error("Asset alredy initialized");
        this.content = a;
    }
    dispose() { }
}
class GeometryDataBuildAssetBase extends BuildAssetBase {
    constructor() {
        super();
    }

    DB = null;
    get_geometryDataContent() {
        return this.get_content();
    }
    cloneContent() {
        return this.get_geometryDataContent().clone();
    }
    dispose() {
        this.content = null;
    }
}
class DiamondBuildAsset extends GeometryDataBuildAssetBase {
    static __super__ = GeometryDataBuildAssetBase;
    __class__ = DiamondBuildAsset;
    static __name__ = ["DiamondBuildAsset"];
    constructor() {
        super();
    }

    DD = null;
    get_sinkable() {
        return this.DD;
    }
    set_sinkable(a) {
        return this.DD == a ? this.DD : ((this.DD = a), this.DD);
    }
    type = null;
    get_type() {
        return this.type;
    }
    set_type(a) {
        return this.type == a ? this.type : ((this.type = a), this.type);
    }
    get_uid() {
        return (
            super.get_uid() +
            ":" +
            this.get_type().get_value() +
            ":" +
            (this.DD ? 1 : 0)
        );
    }
}
class DiamondDrillBuildAsset extends GeometryDataBuildAssetBase {
    static __super__ = GeometryDataBuildAssetBase;
    __class__ = DiamondDrillBuildAsset;
    static __name__ = ["DiamondDrillBuildAsset"];
    constructor() {
        super();
    }

    drillType = null;
    get_drillType() {
        return this.drillType;
    }
    set_drillType(a) {
        return this.drillType == a ? this.drillType : ((this.drillType = a), this.drillType);
    }
    get_uid() {
        return (
            super.get_uid() +
            this.get_drillType().get_value()
        );
    }
}
class DiamondProngBuildAsset extends GeometryDataBuildAssetBase {
    static __super__ = GeometryDataBuildAssetBase;
    __class__ = DiamondProngBuildAsset;
    static __name__ = ["DiamondProngBuildAsset"];
    constructor() {
        super();
    }

    type = null;
    get_type() {
        return this.type;
    }
    set_type(a) {
        return this.type == a ? this.type : ((this.type = a), this.type);
    }
    get_uid() {
        return (
            super.get_uid() +
            this.get_type().get_value()
        );
    }
}
class EngravingBuildAssetBase extends BuildAssetBase {
    static __super__ = BuildAssetBase;
    __class__ = EngravingBuildAssetBase;
    static __name__ = ["EngravingBuildAssetBase"];
    constructor() {
        super();
    }

    carveType = null;
    get_carveType() {
        return this.carveType;
    }
    set_carveType(a) {
        return this.carveType == a ? this.carveType : ((this.carveType = a), this.carveType);
    }
    get_engravingImageContent() {
        return this.get_content();
    }
    cloneContent() {
        return this.get_engravingImageContent().clone();
    }
    dispose() {
        this.get_engravingImageContent().dispose(), (this.content = null);
    }
}
class EngavingStampImageBuildAsset extends EngravingBuildAssetBase {
    static __super__ = EngravingBuildAssetBase;
    __class__ = EngavingStampImageBuildAsset;
    static __name__ = ["EngavingStampImageBuildAsset"];
    constructor() {
        super();
    }
    type = null;
    get_type() { return this.type }
    set_type(a) { return this.type == a ? this.type : (this.type = a, this.type) }
    get_uid() { return Encoder.encode(super.get_uid() + this.type) }
}
class EngavingTextImageBuildAsset extends EngravingBuildAssetBase {
    static __super__ = EngravingBuildAssetBase;
    __class__ = EngavingTextImageBuildAsset;
    static __name__ = ["EngavingTextImageBuildAsset"];
    constructor() {
        super();
    }

    ringText = null;
    get_text() {
        return this.ringText;
    }
    set_text(a) {
        return this.ringText == a ? this.ringText : ((this.ringText = a), this.ringText);
    }
    font = null;
    get_font() {
        return this.font;
    }
    set_font(a) {
        return this.font == a ? this.font : ((this.font = a), this.font);
    }
    get_uid() {
        return Encoder.encode(super.get_uid() + this.font + "/" + this.ringText);
    }
}
class BuildAssetRegistryBase {
    constructor() {
        this.buildAssetIdContentMap = new Dictionary;
        this.ownerAssetDictionaryMap = new Dictionary;
    }
    resolveBuildAssets(buildAssets, owner) {
        var assetDictionary = this.ownerAssetDictionaryMap.get(owner);
        assetDictionary || (assetDictionary = new AssetDictionary, this.ownerAssetDictionaryMap.set(owner, assetDictionary));

        var asset, assetPackage;
        if (buildAssets && buildAssets.length) {
            for (var id = 0; id < buildAssets.length; id++) {
                asset = buildAssets[id];
                assetPackage = this.resolveBuildAssetPackage(asset);
                assetPackage.addOwner(owner);
                asset.setContent(assetPackage.content);
                assetDictionary.addbuildAsset(asset);
            }
        }
        else assetDictionary.clear();

        var array = assetDictionary.commitChanges();
        if (array) {
            for (var i = array.removedAssets.values(), id = 0; id < i.length; id++) {
                asset = i[id];
                assetPackage = this.resolveBuildAssetPackage(asset);
                assetPackage.removeOwner(owner);
                if (0 == assetPackage.ownerCount && assetPackage.disposable) {
                    assetPackage.dispose();
                    this.buildAssetIdContentMap.remove(assetPackage.uId);
                }
            }
        }
        return buildAssets
    }
    clear(a) {
        var b = this.ownerAssetDictionaryMap.get(a);
        b && b.clear()
    }
    getAssetContentByUid(a) {
        var b = this.buildAssetIdContentMap.get(a);
        return b ? b.content : null
    }
    getBuildAssetByUid(a) {
        var b = this.buildAssetIdContentMap.get(a);
        return b ? b.buildAsset : null
    }
    getAssetPayloadByUid(a) {
        var b = this.buildAssetIdContentMap.get(a);
        return b ? b.payload : null
    }
    setPayload(a, b, c) {
        null == c && (c = null);
        var d = this.buildAssetIdContentMap.get(a);
        if (d) {
            if (d.payload) throw new Error("Package payload already exists for uid " + a);
            d.setPayload(b), c && d.addDisposable(c)
        }
    }
    resolveBuildAssetPackage(model) {
        var assetPackage = this.buildAssetIdContentMap.get(model.get_uid());
        if (assetPackage) return assetPackage;
        if (assetPackage = this.createBuildAssetPackage(model), !assetPackage) throw new Error("No build asset was created");
        return this.buildAssetIdContentMap.set(model.get_uid(), assetPackage),
            assetPackage
    }
}
class BuildAssetRegistry extends BuildAssetRegistryBase {
    constructor() {
        super();
        this.stampEngravingImageFactory = new StampEngravingImageFactory;
        this.textEngravingImageFactory = new TextEngravingImageFactory;
    }
    createBuildAssetPackage(model) {
        var assetPackage, path;
        if (model instanceof GeometryDataBuildAssetBase) {
            var res;
            if (model instanceof DiamondBuildAsset) {
                path = "diamond_" + model.get_type().get_value();
                model.get_sinkable() && (path += "_sinkable");
                res = this.resourceStore.getResource(path);
            }
            else if (model instanceof DiamondProngBuildAsset)
                path = "diamond-prong_" + model.get_type().get_value(),
                    res = this.resourceStore.getResource(path);
            else {
                if (!(model instanceof DiamondDrillBuildAsset)) throw new Error("Unknow Geometry build asset");
                path = "diamond-drill_" + model.get_drillType().get_value(),
                    res = this.resourceStore.getResource(path)
            }
            if (null == res) throw new Error("Resource with name " + path + " not found");
            assetPackage = new BuildAssetPackage(false, model, this.getSimpleGeometryDataFromMMF(res.content))
        }
        else {
            if (!(model instanceof EngravingBuildAssetBase))
                throw new Error("Build asset not found");
            var engravingImage;
            var bText = true;
            if (model instanceof EngavingTextImageBuildAsset) {
                this.textEngravingImageFactory.font = model.get_font(),
                    this.textEngravingImageFactory.text = model.get_text(),
                    this.textEngravingImageFactory.mirrorX = true,
                    this.textEngravingImageFactory.mirrorY = true,
                    engravingImage = this.textEngravingImageFactory.create();
            }
            else {
                if (!(model instanceof EngavingStampImageBuildAsset))
                    throw new Error("Not implemented");
                var type = model.get_type();
                var stamp_mask = this.resourceStore.getResource("stamp_" + type + "_mask");
                var stamp_normal = this.resourceStore.getResource("stamp_" + type + "_normal");
                (stamp_mask != null) ? stamp_mask = stamp_mask.content : stamp_mask = null;
                (stamp_normal != null) ? stamp_normal = stamp_normal.content : stamp_normal = null;
                if (stamp_mask) {
                    this.stampEngravingImageFactory.stampImageData = stamp_mask;
                }
                else
                    throw new Error("Could not find resource stamp_" + type + "_mask"); //kkk
                if (stamp_normal) {
                    this.stampEngravingImageFactory.stampNormalData = stamp_normal;
                }
                else
                    throw new Error("Could not find resource stamp_" + type + "_normal"); //kkk
                engravingImage = this.stampEngravingImageFactory.create();
                bText = false;
            }
            assetPackage = new BuildAssetPackage(bText, model, engravingImage);
            bText && assetPackage.addDisposable(engravingImage);
        }
        return assetPackage;
    }
    getSimpleGeometryDataFromMMF(a) {
        var b = a.simpleMeshDatas[0];
        return b.geometryData
    }
}

export {
    DiamondBuildAsset, DiamondDrillBuildAsset, DiamondProngBuildAsset,
    EngavingStampImageBuildAsset, EngavingTextImageBuildAsset, BuildAssetRegistry
}