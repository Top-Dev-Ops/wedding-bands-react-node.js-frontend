/* eslint-disable no-unused-expressions */
import * as THREE from 'three';
import {
    UID, RescourceInfo, InstanceRegistry, TimeoutCaller
} from "./basic.js"
import {
    Fault
} from "./error.js"
import {
    Vector3D, SimpleMeshDataOptimizer,
    Matrix3D, CompactGeometry, SimpleMeshData, SimpleGeometryDataBounds
} from "./geometry.js"
import {
    CylindricalHelper, RingConfigBuilder
} from "./calc.js"
import {
    EngravingConfigHelper, EngravingConfigBuilder
} from "./engrave.js"
import {
    StringUtils, GeomUtils, SimpleGeometryDataUtil
} from "./util.js"
import {
    Event, Model3DEvent, IntentLoaderStatusEvent, IntentLoaderProgressEvent,
    IntentLoaderEvent, AssetPackageLoaderEvent, AssetEvent, ResourceEvent,
    IOErrorEvent, IntentLoaderErrorEvent, EventDispatcher
} from './event.js'
import {
    Dictionary, AssetPackage, MaterialDictionary, EngravingMaterialPackage
} from "./assembler.js"
import {
    EngravingMeta, ProfileMeta, SegmentMeta, SliceMeta, ProfileMetaValue, SliceMetaValue, DiamondMeta
} from "./meta.js"
import {
    URLLoader, MMFLoadIntent, FallbackMMFLoadIntent, ImageDataLoadIntent, JSONLoadIntent, XMLLoadIntent,
    URLLoaderDataFormat, MD5, Responder, MaterialMappingLoadIntent, MaterialConfigLoadIntent,
    ResourceIntentFactory, RescourceNames, IntentLoader, Path, URLRequest, URLRequestMethod, URLRequestHeader
} from "./loader.js"


class MaterialAssetWrapper {
    constructor() { }
    simpleMeshDatas;
    meshMesDataMap = null;
    usedMaterialAssets = null;
    meshDataMaterialAssetMap = null;
}
class SimpleMeshDataUtil {
    constructor() { }
    static convertToMeshes(simpleMeshDatas, dic, bFlip, d) {
        null == dic && (dic = null);
        null == bFlip && (bFlip = true);
        null == d && (d = null);
        var meshArray = [];
        var dictionary = new Dictionary;
        for (var id = 0; id < simpleMeshDatas.length; id++) {
            var compactGeoData;
            var simpleGeoData,
                simpleMeshData = simpleMeshDatas[id],
                simpleGeoData = simpleMeshData.geometryData,
                _bFlip = bFlip;
            null != d && (_bFlip = d(simpleMeshData));
            dictionary.get(simpleGeoData) ? compactGeoData = dictionary.get(simpleGeoData) : (
                compactGeoData = SimpleGeometryDataUtil.constructGeometry(simpleGeoData, _bFlip),
                dictionary.set(simpleGeoData, compactGeoData)
            );

            var name = simpleMeshData.getMetadata("name"),
                mesh = new THREE.Mesh(compactGeoData);
            name && (mesh.name = name);//kkk todo
            if (simpleMeshData.transformation) {
                // if (simpleMeshData.hasMetadata(DiamondMeta.DIAMOND_PART)) {
                //     // console.log('xxxx', mesh);
                // }
                // else 
                {
                    var r = GeomUtils.convertMatrix(simpleMeshData.transformation, _bFlip);
                    mesh.applyMatrix(r);
                }
            }
            dic && dic.set(mesh, simpleMeshData);
            meshArray.push(mesh);
        }

        dictionary.dispose();
        return meshArray;
    }
}
class ClassFactory {
    constructor(a, b) {
        null == b && (b = null),
            this.generator = null,
            this.properties = null,
            this.generator = a,
            this.properties = b
    }
    newInstance() {
        var a = new this.generator;
        if (null != this.properties)
            for (var b in this.properties) a[b] = this.properties[b];
        return a
    }
}
class MeasureCriteria {
    constructor() {
        this.minX = NaN,
            this.maxX = NaN,
            this.minY = NaN,
            this.maxY = NaN,
            this.minZ = NaN,
            this.maxZ = NaN
    }
    measure(a, b, c) {
        null == b && (b = 3);
        null == c && (c = 0);
        throw new Error("getMeasuredMinMax is an abstract method you must override it")
    }
}
class TresholdMeasureCriteria extends MeasureCriteria {
    constructor() {
        super();
        this.xTresholdMin = NaN;
        this.xTresholdMax = NaN;
        this.yTresholdMin = NaN;
        this.yTresholdMax = NaN;
        this.zTresholdMin = NaN;
        this.zTresholdMax = NaN;
    }
    measure(positions, unitSize, startNum) {
        null == unitSize && (unitSize = 3), null == startNum && (startNum = 0);
        var count = positions.length;
        if (0 != count) {
            var xMin = isNaN(this.xTresholdMin) ? -Number.MAX_VALUE : this.xTresholdMin,
                xMax = isNaN(this.xTresholdMax) ? Number.MAX_VALUE : this.xTresholdMax,
                yMin = isNaN(this.yTresholdMin) ? -Number.MAX_VALUE : this.yTresholdMin,
                yMax = isNaN(this.yTresholdMax) ? Number.MAX_VALUE : this.yTresholdMax,
                zMin = isNaN(this.zTresholdMin) ? -Number.MAX_VALUE : this.zTresholdMin,
                zMax = isNaN(this.zTresholdMax) ? Number.MAX_VALUE : this.zTresholdMax;
            this.minX = this.maxX = NaN;
            this.minY = this.maxY = NaN;
            this.minZ = this.maxZ = NaN;
            for (var k = 0; count > k; k += unitSize) {
                var x = positions[k + startNum],
                    y = positions[k + startNum + 1],
                    z = positions[k + startNum + 2];

                if (x >= xMin && xMax >= x && y >= yMin && yMax >= y && z >= zMin && zMax >= z) {
                    (x < this.minX || isNaN(this.minX)) && (this.minX = x);
                    (x > this.maxX || isNaN(this.maxX)) && (this.maxX = x),
                        (y < this.minY || isNaN(this.minY)) && (this.minY = y),
                        (y > this.maxY || isNaN(this.maxY)) && (this.maxY = y),
                        (z < this.minZ || isNaN(this.minZ)) && (this.minZ = z),
                        (z > this.maxZ || isNaN(this.maxZ)) && (this.maxZ = z)
                }
            }
        }
    }
}
class MeasureCube {
    constructor() {
        this.minX = NaN,
            this.maxX = NaN,
            this.minY = NaN,
            this.maxY = NaN,
            this.minZ = NaN,
            this.maxZ = NaN
    }
    reset() {
        this.minX = NaN,
            this.maxX = NaN,
            this.minY = NaN,
            this.maxY = NaN,
            this.minZ = NaN,
            this.maxZ = NaN
    }
    //positions, transform, 3, 0, b
    measure(positions, transform, c, d, f) {
        null == transform && (transform = null), null == c && (c = 3), null == d && (d = 0), null == f && (f = false);
        if (null == this.measureCriteria)
            throw new Error("measureCriteria not found");
        this.measureCriteria.measure(positions, c, d);
        if (!(isNaN(this.measureCriteria.minX) ||
            isNaN(this.measureCriteria.minY) ||
            isNaN(this.measureCriteria.minZ) ||
            isNaN(this.measureCriteria.maxX) ||
            isNaN(this.measureCriteria.maxY) ||
            isNaN(this.measureCriteria.maxZ))) {
            var g = new Vector3D(this.measureCriteria.minX, this.measureCriteria.minY, this.measureCriteria.minZ),
                h = new Vector3D(this.measureCriteria.maxX, this.measureCriteria.maxY, this.measureCriteria.maxZ);
            transform && (
                g = transform.transformVector(g, g),
                h = transform.transformVector(h, h)),
                f ? (isNaN(g.x) || (this.minX = isNaN(this.minX) ? g.x : Math.min(this.minX, g.x)), isNaN(h.x) || (this.maxX = isNaN(this.maxX) ? h.x : Math.max(this.maxX, h.x)), isNaN(g.y) || (this.minY = isNaN(this.minY) ? g.y : Math.min(this.minY, g.y)), isNaN(h.y) || (this.maxY = isNaN(this.maxY) ? h.y : Math.max(this.maxY, h.y)), isNaN(g.z) || (this.minZ = isNaN(this.minZ) ? g.z : Math.min(this.minZ, g.z)), isNaN(h.z) || (this.maxZ = isNaN(this.maxZ) ? h.z : Math.max(this.maxZ, h.z))) :
                    (this.minX = g.x, this.maxX = h.x, this.minY = g.y, this.maxY = h.y, this.minZ = g.z, this.maxZ = h.z)
        }
    }
}
class ThreeMeasureCube extends MeasureCube {
    constructor() {
        super();
    }
    measureObjectContainer(objectHolder, b) {
        null == b && (b = false);
        b || this.reset();
        for (var children = objectHolder.children, d = 0; d < children.length; d++) {
            var mesh = children[d];
            mesh instanceof THREE.Mesh ? this.measureMesh(mesh, true) : this.measureObjectContainer(mesh, true)
        }
    }
    measureMesh(mesh, b) {
        null == b && (b = false);
        if (!(mesh.geometry instanceof CompactGeometry))
            throw new Error("Unknown geometry found" + mesh.geometry);
        var transform, geometry = mesh.geometry,
            positions = geometry.positions;
        if (mesh.matrix) {
            var f = mesh.matrix.transpose();
            transform = new Matrix3D(f.toArray())
        }
        this.measure(positions, transform, 3, 0, b)
    }
}
class DataModel extends EventDispatcher {
    constructor() {
        super();
        this.resourceMap = {},
            this.propertyMap = {},
            this.resourceIntentFactory = new ResourceIntentFactory,
            this.intentLoader = new IntentLoader,
            this.intentLoader.useGlobalRegistry = false,
            this.intentLoader.on(IntentLoaderEvent.LOAD_START, this.onLoadingStarted, this),
            this.intentLoader.on(IntentLoaderProgressEvent.LOAD_PROGRESS, this.onIntentLoadProgress, this),
            this.intentLoader.on(IntentLoaderStatusEvent.INTENT_LOAD_START, this.onIntentLoadStarted, this),
            this.intentLoader.on(IntentLoaderStatusEvent.INTENT_LOAD_COMPLETE, this.onIntentLoadComplete, this),
            this.intentLoader.on(IntentLoaderEvent.LOAD_COMPLETE, this.onLoadComplete, this),
            this.intentLoader.on(IntentLoaderErrorEvent.INTENT_LOAD_ERROR, this.onIntentLoadError, this);
    }

    get relativeBasePath() {
        return this.intentLoader.relativeBasePath
    }

    set relativeBasePath(a) {
        this.intentLoader.relativeBasePath = a;
    }

    startInitialLoad(webglConfigLocation) {
        var xmlLoadIntent = new XMLLoadIntent(webglConfigLocation, RescourceNames.CONFIG);
        this.intentLoader.addLoadIntent(xmlLoadIntent);
        this.intentLoader.startLoad(true);
    }
    getResource(name, b) {
        if ((name != null) && (b != null))
            return this.resourceMap[name + ":" + b];

        var subArray = this.getRescources(name);
        if (1 == subArray.length)
            return subArray[0];
        for (var d in subArray) {
            var e = subArray[d];
            if (e.isDefault)
                return e
        }
        return null;
    }
    getRescources(name) {
        var b = [];
        for (var c in this.resourceMap) {
            var d = this.resourceMap[c];
            d.name == name && b.push(d)
        }
        return b
    }
    getPropertyValue(a) { return this.propertyMap[a] }
    parseConfig(a) {
        for (var b = a.child("properties").child("property"), c = 0; c < b.length(); c++) {
            var d = b.get(c),
                e = d.attribute("name").text(),
                f = d.text();
            e && f ? this.propertyMap[e] = f : console.error("Property name or value not found @name, value:", e, f)
        }
        for (var h = a.child("rescources").child("rescource"), i = 0; i < h.length(); i++) {
            var row = h.get(i),
                type = row.attribute("type").text(),
                path = row.attribute("path").text(),
                name = row.attribute("name").text(),
                id = row.attribute("id").text(),
                resInfo = new RescourceInfo;
            resInfo.type = type,
                resInfo.path = path,
                resInfo.name = name,
                resInfo.id = id,
                resInfo.isDefault = "true" == String(row.attribute("default")).toLowerCase();
            var contentID = this.getContentId(resInfo);
            try {
                var intent = this.resourceIntentFactory.getResourceIntent(type, path, contentID, name, id);
                this.intentLoader.addLoadIntent(intent);
                this.resourceMap[contentID] = resInfo;
            }
            catch (r) { console.log("Rescource type not found", type, r.message) }
        }
    }
    sendRescourceComplete(a) {
        var resInfo = this.resourceMap[a.contentId];
        resInfo || (resInfo = new RescourceInfo,
            resInfo.name = a.contentId, this.resourceMap[a.contentId] = resInfo);
        resInfo.content = this.intentLoader.getRegistry().getContent(a.contentId);
        var event = new ResourceEvent(ResourceEvent.RESOURCE_LOADED);
        event.rescourceInfo = resInfo;
        this.dispatchEvent(event)
    }
    getContentId(a) {
        var b;
        return b = a.id ? a.name + ":" + a.id : a.name
    }
    onLoadingStarted(a) {
        this.dispatchEvent(new ResourceEvent(ResourceEvent.STARTED))
    }
    onIntentLoadStarted(a) {
    }
    onIntentLoadComplete(a) {
        a.intent.contentId == RescourceNames.CONFIG && this.parseConfig(this.intentLoader.getRegistry().getContent(RescourceNames.CONFIG));
        this.sendRescourceComplete(a.intent)
    }
    onIntentLoadProgress(a) {
        var b = new ResourceEvent(ResourceEvent.PROGRESS);
        b.progress = a.progress;
        this.dispatchEvent(b);
    }
    onLoadComplete(a) {
        this.dispatchEvent(new ResourceEvent(ResourceEvent.FINISHED));
    }
    onIntentLoadError(a) {
        this.dispatchEvent(new ResourceEvent(ResourceEvent.FAILED))
    }
}
class SettingsModel {
    constructor() {

    }
    getBooleanProperty(a, b) {
        null == b && (b = null);
        var c = this.getProperty(a);
        switch (c.toLowerCase()) {
            case "true":
                return true;
            case "false":
                return false;
            default:
                if (c || null == b) throw new Error("Unkonw boolean value " + c + " for key " + a);
                return b
        }
    }
    hasProperty(a) {
        var b = this.settingsNode.child(a);
        return b.length() > 0
    }
    getStringProperty(a, b) {
        null == b && (b = null);
        var c = this.getProperty(a);
        if (!c) {
            if (null != b) return b; throw new Error("No value found for setting key:" + a)
        } return c
    }
    getXMLProperty(a) {
        var b = this.settingsNode.child(a);
        if (null == b) return this.settingsNode;
        if (0 == b.length()) return this.settingsNode;//throw new Error("No XML property found for key " + a);
        if (b.length() > 1) throw new Error("More then one XML property found for key " + a);
        return b.get(0)
    }
    initialize(a) {
        this.settingsNode = a,
            this.initialized = true
    }
    getProperty(a) {
        if (!this.initialized)
            throw new Error("Settings model is not initialized");
        var b = StringUtils.trim(this.settingsNode.child(a).text());
        return b
    }
}
class AssetQue {
    constructor() {
        this.pacakges = [];
    }
    get length() {
        return this.pacakges.length
    }
    offer(a) {
        for (var b = 0; b < this.pacakges.length; b++) {
            var c = this.pacakges[b];
            if (c.name && c.name == a.name && c.id == a.id && c.droppable) {
                this.pacakges.splice(b, 1);
                break
            }
        }
        this.pacakges.push(a)
    }
    poll() {
        return this.pacakges.shift()
    }
}
class LoadableAsset {
    constructor(a, b, c) {
        null == a && (a = null),
            null == b && (b = null),
            null == c && (c = false),
            this._resolvePathFromBase = null,
            this._assetId = a,
            this._path = b,
            this._cache = c
    }
    get resolvePathFromBase() { return this._resolvePathFromBase }
    set resolvePathFromBase(a) { this._resolvePathFromBase != a && (this._resolvePathFromBase = a) }
    get assetId() { return this._assetId }
    set assetId(a) { this._assetId != a && (this._assetId = a) }
    get path() { return this._path }
    set path(a) { this._path != a && (this._path = a) }
    get content() { return this._content }
    set content(a) { this._content != a && (this._content = a) }
    get cache() { return this._cache }
    set cache(a) { this._cache != a && (this._cache = a) }
    get outputConverter() { return this._outputConverter }
    set outputConverter(a) { this._outputConverter != a && (this._outputConverter = a) }
    get data() { return this._data }
    set data(a) { this._data != a && (this._data = a) }
}
class ImageAsset extends LoadableAsset {
    constructor(b, c, d) {
        null == b && (b = null),
            null == c && (c = null),
            null == d && (d = false),
            super(b, c, d);
    }
}
class JSONAsset extends LoadableAsset {
    constructor(b, c, d) {
        null == b && (b = null),
            null == c && (c = null),
            null == d && (d = false),
            super(b, c, d);
    }
}
class MMFAsset extends LoadableAsset {
    constructor(b, c, d) {
        null == b && (b = null),
            null == c && (c = null),
            null == d && (d = false),
            super(b, c, d);
    }
}
class XMLAsset extends LoadableAsset {
    constructor(b, c, d) {
        null == b && (b = null),
            null == c && (c = null),
            null == d && (d = false),
            super(b, c, d);
    }
}
class FallbackMMFAsset extends LoadableAsset {
    constructor(b, c, d) {
        null == b && (b = null),
            null == c && (c = null),
            null == d && (d = false),
            super(b, c, d);
    }
    get config() { return this._config }
    set config(a) { this._config != a && (this._config = a) }
}
class MaterialConfigAsset extends LoadableAsset {
    constructor(b, c, d) {
        null == b && (b = null),
            null == c && (c = null),
            null == d && (d = false),
            super(b, c, d);
        this._variationParametersMap = {};
    }
    get variationParametersMap() { return this._variationParametersMap }
    setParameter(a, b) {
        this._variationParametersMap[a] = b
    }
}
class MaterialMappingAsset extends LoadableAsset {
    constructor(b, c, d) {
        null == d && (d = null);
        super(b, d, false);
        this._materialXMLPaths = c,
            this._parametersMap = {},
            this.regenerateUid();
    }
    get parametersMap() { return this._parametersMap }
    get materialXMLPaths() { return this._materialXMLPaths }
    get uid() { return this._uid }
    setParameter(a, b) {
        this._parametersMap[a] = b,
            this.regenerateUid()
    }
    regenerateUid() {
        var a, b = [];
        for (a in this._materialXMLPaths) {
            var c = this._materialXMLPaths[a];
            b.push(c)
        }
        c && b.push(c);
        for (a in this._parametersMap) b.push(a + ":" + this._parametersMap[a]);
        b.sort();
        var d = b.join("#");
        this._uid = MD5.hash(d)
    }
}
class LoadableAssetFactory {
    constructor() { }
    getLoadIntent(a, path) {
        if (a instanceof ImageAsset) {
            var c = new ImageDataLoadIntent(path, a.assetId);
            return c
        }
        if (a instanceof XMLAsset) {
            var d = new XMLLoadIntent(path, a.assetId);
            return d
        }
        if (a instanceof JSONAsset)
            return new JSONLoadIntent(path, a.assetId);
        throw new Error("Asset type " + a + " unknown")
    }
}
class LoadableMaterialAssetFactory extends LoadableAssetFactory {
    constructor(b) {
        super();
        this.propertyStore = b;
    }
    getLoadIntent(b, c) {
        if (b instanceof MaterialConfigAsset) {
            var d = b,
                e = new MaterialConfigLoadIntent(b.assetId, c, this.propertyStore, d.variationParametersMap);
            return e;
        }
        if (b instanceof MaterialMappingAsset) {
            var f = b,
                o = new MaterialMappingLoadIntent(f.assetId, f.materialXMLPaths, this.propertyStore, f.parametersMap, c);
            return o;
        }
        if (b instanceof FallbackMMFAsset) {
            var p = b,
                q = new FallbackMMFLoadIntent(p.path, b.assetId);
            q.config = p.config;
            return q;
        }
        if (b instanceof MMFAsset) {
            var r = b,
                s = new MMFLoadIntent(r.path, r.assetId);
            return s;
        }
        return super.getLoadIntent(b, c);
    }
}
class AssetPackageLoader extends EventDispatcher {
    constructor() {
        super();
        this.baseUrl = "",
            this.resolveAssetsFromBase = true,
            this.cachedContentPathMap = {},
            this.loadableAssetFactory = new LoadableMaterialAssetFactory,//LoadableAssetFactory,
            this.intentLoader = new IntentLoader,
            this.intentLoader.useGlobalRegistry = false,
            this.intentLoader.on(IntentLoaderEvent.LOAD_COMPLETE, this.onPackageLoaded, this),
            this.intentLoader.on(IntentLoaderStatusEvent.INTENT_LOAD_COMPLETE, this.onItentLoaded, this),
            this.intentLoader.on(IntentLoaderProgressEvent.LOAD_PROGRESS, this.onPackageLoadProgress, this),
            this.intentLoader.on(IntentLoaderErrorEvent.INTENT_LOAD_ERROR, this.onIntentLoadError, this);
    }

    loadPackage(a) {
        if (this.loadInProgress) throw new Error("Package load in progress");
        this.currentPackage = a, this.intentLoader.clear();
        for (var b, c = this.getLoadableAssets(a), d = 0; d < c.length; d++) {
            var e = c[d];
            var path = e.assetId;
            path = this.resolveAssetPath(e); // kkk
            var g = this.getContentFromCache(path);//kkk todo
            if (g && !e.cache)
                this.removeContentFromCache(path);
            else if (!g) try {
                var h = this.loadableAssetFactory.getLoadIntent(e, path);
                h.outputConverter = e.outputConverter,
                    this.intentLoader.addLoadIntent(h),
                    b = true
            } catch (i) { throw i }
        }
        b ? (this.loadInProgress = true, this.intentLoader.startLoad(a.async)) : this.onPackageLoaded()
    }
    getLoadableAssets(a) {
        var b = [];
        for (var c in a.assetsMap) {
            var d = a.getAsset(c);
            b.push(d)
        }
        return b
    }
    getContentFromCache(a) {
        return this.cachedContentPathMap[a]
    }
    addContentToCache(a, b) {
        this.cachedContentPathMap[a] = b
    }
    removeContentFromCache(a) {
        delete this.cachedContentPathMap[a]
    }
    resolveAssetPath(a) {
        var b, c;
        c = null != a.resolvePathFromBase ? a.resolvePathFromBase : this.resolveAssetsFromBase,
            b = c ? Path.combine(this.baseUrl, a.path) : a.path;
        return b;
    }
    handleContentReady(a, b) { }
    onPackageLoadProgress(a) {
        var b = new AssetPackageLoaderEvent(AssetPackageLoaderEvent.LOAD_PROGRESS);
        b.progress = a.progress, this.dispatchEvent(b)
    }
    onItentLoaded(a) {
        var b = new AssetPackageLoaderEvent(AssetPackageLoaderEvent.INTENT_LOADED);
        b.intent = a.intent, this.dispatchEvent(b)
    }
    onPackageLoaded(a) {
        null == a && (a = null);
        for (var b in this.currentPackage.assetsMap) {
            var c = this.currentPackage.getAsset(b),
                d = this.resolveAssetPath(c),
                e = this.getContentFromCache(d);
            e ? c.content = e : (c.content = this.intentLoader.getRegistry().getContent(b), c.cache && this.addContentToCache(d, c.content), this.intentLoader.getRegistry().removeContent(b))
        }
        this.currentPackage.setLoaded(), this.currentPackage.responder && this.currentPackage.responder.result([this.currentPackage]), this.loadInProgress = false;
        var f = new AssetPackageLoaderEvent(AssetPackageLoaderEvent.PACKAGE_COMPLETE);
        f.assetPackage = this.currentPackage, this.dispatchEvent(f)
    }
    onIntentLoadError(a) {
        this.loadInProgress = false, this.intentLoader.clear(), this.currentPackage.responder && this.currentPackage.responder.fault([a.fault]);
        var b = new AssetPackageLoaderEvent(AssetPackageLoaderEvent.PACKAGE_FAILED);
        b.fault = a.fault, this.dispatchEvent(b)
    }
}
class AssetModel extends EventDispatcher {
    constructor() {
        super();
        this.assetQue = new AssetQue;
        this.assetPackageLoader = new AssetPackageLoader;
        this.assetPackageLoader.on(AssetPackageLoaderEvent.LOAD_PROGRESS, this.onPackageLoadProgress, this);
        this.assetPackageLoader.on(AssetPackageLoaderEvent.PACKAGE_COMPLETE, this.onPackageLoadCompelete, this);
        this.assetPackageLoader.on(AssetPackageLoaderEvent.PACKAGE_FAILED, this.onPackageLoadFailed, this);
        this.assetPackageLoader.on(AssetPackageLoaderEvent.INTENT_LOADED, this.onIntentLoaded, this);
    }
    get baseUrl() {
        return this.assetPackageLoader.baseUrl;
    }
    set baseUrl(a) {
        this.assetPackageLoader.baseUrl = a;
    }
    get resolveAssetsFromBase() {
        return this.assetPackageLoader.resolveAssetsFromBase;
    }
    set resolveAssetsFromBase(a) {
        this.assetPackageLoader.resolveAssetsFromBase = a;
    }
    get loadableAssetFactory() {
        return this.assetPackageLoader.loadableAssetFactory;
    }
    set loadableAssetFactory(a) {
        this.assetPackageLoader.loadableAssetFactory = a;
    }
    get relativeBasePath() {
        return this.assetPackageLoader.relativeBasePath;
    }
    set relativeBasePath(a) {
        this.assetPackageLoader.relativeBasePath = a;
    }
    loadPackage(a) {
        if (this.assetPackageLoader.loadInProgress)
            // console.debug("Adding package to que name:", a.name),
            this.assetQue.offer(a);
        else {
            // console.debug("Loading package package:", a, a.name);
            var b = new AssetEvent(AssetEvent.STARTED);
            this.dispatchEvent(b),
                this.assetPackageLoader.loadPackage(a)
        }
    }
    onPackageLoadProgress(a) {
        var b = new AssetEvent(AssetEvent.PROGRESS);
        b.progress = a.progress, this.dispatchEvent(b)
    }
    onIntentLoaded(a) {
    }
    onPackageLoadCompelete(a) {
        var b = a.assetPackage;
        if (this.assetQue.length) {
            var c = this.assetQue.poll();
            // console.debug("Loading package que next package:", c.name);
            this.assetPackageLoader.loadPackage(c);
        } else this.dispatchEvent(new AssetEvent(AssetEvent.FINISHED));
        var d = new AssetEvent(AssetEvent.PACKAGE_LOADED);
        d.assetPackage = b, this.dispatchEvent(d)
    }
    onPackageLoadFailed(a) {
        console.error("Package load failed", a.fault);
        var b = new AssetEvent(AssetEvent.FAILED);
        b.fault = a.fault, this.dispatchEvent(b)
    }
}
class BaseModel extends EventDispatcher {
    constructor() {
        super();
        this.loadInProgress = false;
        this.urlLoader = new URLLoader;
        this.urlLoader.dataFormat = URLLoaderDataFormat.TEXT;
        this.urlLoader.on(Event.COMPLETE, this.onLoadComplete, this);
        this.urlLoader.on(IOErrorEvent.IO_ERROR, this.onLoadError, this);
    }
    getGlobalModel(a) {
        return InstanceRegistry.getSingleton(a)
    }
    loadJSONData(a, b, c, d) {
        null == c && (c = null),
            null == d && (d = "json");
        var obj = new Object;
        obj.url = a,
            obj.responder = b,
            obj.data = c,
            obj.dataType = d,
            this.loadInProgress ? (this.pendingLoadData = obj, console.debug("Added pending loadData", obj)) :
                (this.handleJSONLoadStart(a), this.processLoadData(obj), this.loadInProgress = true)
    }
    handleJSONLoadStart(a) { }
    handleJSONLoadSuccess(a) { }
    handleJSONLoadError(a) { }
    processLoadData(a) {
        var b = new URLRequest(a.url);
        b.method = URLRequestMethod.POST,
            b.data = a.data,
            "json" == a.dataType && (b.requestHeaders = [new URLRequestHeader("Content-Type", "application/json")]),
            this.urlLoader.load(b),
            this.currentLoadData = a
    }
    processFault(a) {
        this.currentLoadData.responder && this.currentLoadData.responder.fault([a]),
            this.handleJSONLoadError(a)
    }
    processPendingData() {
        this.pendingLoadData ? (this.processLoadData(this.pendingLoadData), this.pendingLoadData = null) :
            this.loadInProgress = false
    }
    onLoadComplete(a) {
        try {
            var b = JSON.parse(this.urlLoader.data);
            this.currentLoadData.responder && this.currentLoadData.responder.result([b]), this.handleJSONLoadSuccess(b)
        }
        catch (c) {
            this.processFault(Fault.fromError(c))
        }
        this.processPendingData()
    }
    onLoadError(a) {
        this.processFault(Fault.fromErrorEvent(a)),
            this.processPendingData()
    }
}
class ConfiguratorModel extends BaseModel {
    constructor() {
        super();
        this.clientUID = UID.create();
        this.delayedCaller = new TimeoutCaller(200, this);
    }
    getLoadInProgress() {
        return this.loadInProgress
    }
    setLoadInProgress(a) {
        this.loadInProgress != a && (this.loadInProgress = a,
            this.dispatchEvent(new Event(ConfiguratorModel.EVENT_LOAD_IN_PROGRESS_CHANGED)))
    }
    getServerHost() {
        return this.serverHost
    }
    setServerHost(a) {
        this.serverHost != a && (this.serverHost = a)
    }
    getImages() {
        return this.images
    }
    setImages(a) {
        this.images != a && (this.images = a, this.dispatchEvent(new Event(ConfiguratorModel.EVENT_IMAGES_CHANGED)))
    }
    getCurrentSettings() {
        return this.currentSettings
    }
    loadConfigurationDelayed(a) {
        this.delayedCaller.call(this.loadConfiguration, [a])
    }
    loadConfiguration(config) {
        var c = "/createRingShots";
        this.currentSettings != config && (this.getLoadInProgress() ? this.pendingRingConfiguration = config :
            (
                this.currentSettings = config,
                this.setLoadInProgress(true),
                console.debug("Loading config ", { config: config }),
                this.loadJSONData(this.getServerHost() + c,
                    new Responder((a) => {
                        console.debug("data loaded time:", a.genTime, a);
                        var c = this.addBaseUrlToImages(a.images);
                        this.setImages(c),
                            this.setLoadInProgress(false),
                            this.handleRingsLoadComplete()
                    }, (a) => {
                        console.error("Json Data load failed", a),
                            this.setLoadInProgress(false)
                    }, this), config)
            )
        )
    }
    loadConfigurationResponse(a, b) {
        var d = "/createRingShots";
        this.loadJSONData(this.getServerHost() + d,
            new Responder((a) => {
                b.result([this.addBaseUrlToImages(a.images)])
            }, (a) => {
                console.error("Json Data load failed", a);
                b.fault([a]);
            }, this), a)
    }
    loadSnapshotImage(a, b) {
        var d = "/createSnapshots";
        this.loadJSONData(this.getServerHost() + d,
            new Responder((a) => {
                b.result([this.addBaseUrlToImages(a.images)])
            }, (a) => {
                console.error("Json Data load failed", a);
                b.fault([a]);
            }), a)
    }
    loadHandViewImage(settings, b) {
        var d = "/createHandShots";
        this.currentSettings == settings ||
            this.getLoadInProgress() ||
            (this.currentSettings = settings, console.debug("Loading hand config ", { config: settings }),
                this.loadJSONData(this.getServerHost() + d, new Responder((a) => {
                    console.debug("hand data loaded time:", a.genTime, a);
                    var d = { imageType: "url", image: this.serverHost + "/" + a.images[0] };
                    b.result([d])
                }, (a) => { console.error("Json Data load failed", a) }, this), settings))
    }
    reset() {
        this.currentSettings = null
    }
    addBaseUrlToImages(a) {
        for (var b = [], c = 0; c < a.length; c++)
            b[c] = this.getServerHost() + "/" + a[c];
        return b
    }
    handleRingsLoadComplete() {
        if (this.pendingRingConfiguration) {
            var a = this.pendingRingConfiguration;
            this.pendingRingConfiguration = null, this.loadConfiguration(a)
        }
    }
    static EVENT_LOAD_IN_PROGRESS_CHANGED = "loadInProgressChanged";
    static EVENT_IMAGES_CHANGED = "imagesChanged";
}
class HandViewRenderRequest {
    constructor() { }
}
class HandViewModel extends BaseModel {
    constructor() {
        super();
        this.displayedRingCount = 2;
        this.snapshotDataMappings = [];
        this.handSnapshotDatas = [];
    }
    getDisplayedRingCount() {
        return this.displayedRingCount
    }
    setDisplayedRingCount(a) {
        this.displayedRingCount != a && (this.displayedRingCount = a)
    }
    getSnapshotDataMappings() {
        return this.snapshotDataMappings
    }
    setSnapshotDataMappings(a) {
        this.snapshotDataMappings != a && (this.snapshotDataMappings = a)
    }
    getHandSnapshotDatas() {
        return this.handSnapshotDatas
    }
    setHandSnapshotDatas(a) {
        this.handSnapshotDatas != a && (this.handSnapshotDatas = a)
    }
    initialize() { }
    getVisibleDataMappings() {
        return this.filterCombinations(this.snapshotDataMappings, this.displayedRingCount)
    }
    getRenderableSnapShotDatasByMappingId(key, indexArray) {
        null == indexArray && (indexArray = null);
        var snapShotDataMap = this.getMappingById(key);
        var d = [];
        for (var e = 0; e < snapShotDataMap.combinations.length; e++) {
            var f = snapShotDataMap.combinations[e],
                snapShotData = this.getSnapshotDataById(f.shotDataId),
                h = f.ringIndexComponentIndexMap;
            null != indexArray && (h = indexArray),
                d.push({
                    combinationId: f.id,
                    data: snapShotData,
                    ringIndexComponentIndexMap: h,
                    flipped: f.flipped
                })
        }
        return d
    }
    loadRenderableSnapshotDatas(renderableDataArray, snapDrawResponder) {
        var handViewRenderRequest = new HandViewRenderRequest;
        handViewRenderRequest.renderableDatas = renderableDataArray;
        handViewRenderRequest.snapDrawResponder = snapDrawResponder;
        var event = new Event(HandViewModel.EVENT_RENDER_REQUESTED);
        event.data = handViewRenderRequest;
        this.dispatchEvent(event)
    }
    filterCombinations(a, b) {
        for (var c = [], d = 0; d < a.length; d++) {
            var e = a[d];
            e.ringCount == b && c.push(e)
        }
        return c
    }
    getMappingById(id) {
        for (var i = 0; i < this.snapshotDataMappings.length; i++) {
            var snapShotDataMap = this.snapshotDataMappings[i];
            if (snapShotDataMap.id == id)
                return snapShotDataMap;
        }
        return null;
    }
    getSnapshotDataById(id) {
        for (var i = 0; i < this.handSnapshotDatas.length; i++) {
            var handSnapshotData = this.handSnapshotDatas[i];
            if (handSnapshotData.id == id)
                return handSnapshotData;
        }
        return null;
    }
    static EVENT_RENDER_REQUESTED = "renderRequested";
}
class Skinnable3DModel extends THREE.Group {
    constructor() {
        super();
        this.boundsInvalid = true;
        this.shadowEnabled = true;
        this.shadowScaleXRatio = 1.8;
        this.shadowScaleYRatio = .8;
        this.shadowAlpha = 1;
        this.shiftModelBottomToVerticalCenter = true;
        this.shiftModelToHorizontalCenterX = false;
        this.shiftModelToHorizontalCenterZ = false;
        this.frustumCulled = true;
        this.parts = [];
        this.objectHolder = new THREE.Group;
        this.eventBus = new EventDispatcher;
        this.add(this.objectHolder);
        this.boundsMeasureCube = new ThreeMeasureCube;
        this.boundsMeasureCube.measureCriteria = new TresholdMeasureCriteria;
        this.shadowMeasureCube = new ThreeMeasureCube;
        var criteria = new TresholdMeasureCriteria;
        criteria.yTresholdMax = 0;
        this.shadowMeasureCube.measureCriteria = criteria;
    }
    get boundsMeasureCriteria() {
        return this.boundsMeasureCube.measureCriteria
    }
    set boundsMeasureCriteria(a) {
        this.boundsMeasureCube.measureCriteria = a
    }
    get shadowMeasureCriteria() {
        return this.shadowMeasureCube.measureCriteria
    }
    set shadowMeasureCriteria(a) {
        this.shadowMeasureCube.measureCriteria = a
    }
    get innerTransform() {
        return this.objectHolder.matrix
    }
    get minX() {
        return this.validateMesureCube(), this.boundsMeasureCube.minX * this.objectHolder.scale.x
    }
    get maxX() {
        return this.validateMesureCube(), this.boundsMeasureCube.maxX * this.objectHolder.scale.x
    }
    get minY() {
        return this.validateMesureCube(), this.boundsMeasureCube.minY * this.objectHolder.scale.y
    }
    get maxY() {
        return this.validateMesureCube(), this.boundsMeasureCube.maxY * this.objectHolder.scale.y
    }
    get minZ() {
        return this.validateMesureCube(), this.boundsMeasureCube.minZ * this.objectHolder.scale.z
    }
    get maxZ() {
        return this.validateMesureCube(), this.boundsMeasureCube.maxZ * this.objectHolder.scale.z
    }
    get transformedMinX() {
        return this.validateMesureCube(), this.boundsMeasureCube.minX * this.objectHolder.scale.x + this.objectHolder.position.x
    }
    get transformedMaxX() {
        return this.validateMesureCube(), this.boundsMeasureCube.maxX * this.objectHolder.scale.x + this.objectHolder.position.x
    }
    get transformedMinY() {
        return this.validateMesureCube(), this.boundsMeasureCube.minY * this.objectHolder.scale.y + this.objectHolder.position.y
    }
    get transformedMaxY() {
        return this.validateMesureCube(), this.boundsMeasureCube.maxY * this.objectHolder.scale.y + this.objectHolder.position.y
    }
    get transformedMinZ() {
        return this.validateMesureCube(), this.boundsMeasureCube.minZ * this.objectHolder.scale.z + this.objectHolder.position.z
    }
    get transformedMaxZ() {
        return this.validateMesureCube(), this.boundsMeasureCube.maxZ * this.objectHolder.scale.z + this.objectHolder.position.z
    }
    validateMesureCube() {
        return this.boundsInvalid && (this.boundsMeasureCube.measureObjectContainer(this.objectHolder), this.boundsInvalid = false),
            this.boundsMeasureCube
    }
    setModelParts(a, bDispose) {
        null == bDispose && (bDispose = true),
            this.removeAllChildren(bDispose);
        for (var c = 0; c < a.length; c++) {
            var d = a[c];
            this.doAddPart(d)
        }
        this.adjustShift();
        this.adjustShadow();
        this.containsSkin = false;
        this.notifyPartsChanged();
    }
    addPart(a) {
        this.doAddPart(a);
        this.adjustShadow();
        this.notifyPartsChanged();
    }
    hasPart(a) {
        var b = this.getPartsByName(a);
        return b.length > 0
    }
    removePart(name) {
        var b = this.getPartsByName(name);
        if (b.length > 1)
            throw new Error("Multiply parts with name: " + name + " found");
        return 1 == b.length ? (this.removeParts(name), this.notifyPartsChanged(), b[0]) : null
    }
    removeParts(a) {
        for (var b = this.getPartsByName(a), c = 0; c < b.length; c++) {
            var d = b[c];
            this.objectHolder.remove(d);
            var e = this.parts.indexOf(d);
            - 1 != e && this.parts.splice(e, 1)
        }
        return this.boundsInvalid = true, this.notifyPartsChanged(), b
    }
    setMaterialForAll(material) {
        for (var b = 0; b < this.parts.length; b++) {
            var c = this.parts[b];
            c.material = material
        }
    }
    setPartMaterial(name, material, c) {
        null == c && (c = true);
        var d = this.getPartsByName(name);
        if (0 == d.length && c) throw new Error("Part with name: " + name + " not found");
        for (var e = 0; e < d.length; e++) {
            var f = d[e];
            f.material = material
        }
        this.containsSkin = true
    }
    setPartUVScale(a, b, c, d) {
        null == d && (d = true);
        var e = this.getPartsByName(a);
        if (0 == e.length && d) throw new Error("Part with name: " + a + " not found for uv scale");
        for (var f = 0; f < e.length; f++) {
            var g = e[f],
                h = g.geometry;
            h.scaleUV(b, c)
        }
    }
    setPartRotationIfNotRotated(a, b, c, d, e) {
        null == b && (b = NaN),
            null == c && (c = NaN),
            null == d && (d = NaN),
            null == e && (e = true);
        var f = this.getPartsByName(a);
        if (0 == f.length && e) throw new Error("Part with name: " + a + " not found for rotation");
        for (var g = 0; g < f.length; g++) {
            var h = f[g];
            isNaN(b) || 0 != h.rotation.x || (h.rotation.x = b),
                isNaN(c) || 0 != h.rotation.y || (h.rotation.y = c),
                isNaN(d) || 0 != h.rotation.z || (h.rotation.z = d)
        }
        this.boundsInvalid = true
    }
    setPartVisibility(a, b, c) {
        null == c && (c = true);
        var d = this.getPartsByName(a);
        if (0 == d.length && c) throw new Error("Part with name: " + a + " not found for visibility");
        for (var e = 0; e < d.length; e++) {
            var f = d[e];
            f.visible = b
        }
    }
    getPartByName(a) {
        var b = this.getPartsByName(a);
        if (0 == b.length)
            return null;
        if (b.length > 1)
            throw new Error("Multipile parts with name:" + a + " found");
        return b[0]
    }
    getPartsByName(name) {
        for (var b = [], c = 0; c < this.parts.length; c++) {
            var d = this.parts[c];
            d.name == name && b.push(d)
        }
        return b
    }
    getAllParts() {
        return this.parts.concat()
    }
    clear(a) {
        null == a && (a = true);
        this.removeAllChildren(a);
        this.shadowPlane && (this.shadowMaterial.dispose(),
            this.shadowMaterial = null,
            this.shadowTexture.dispose(),
            this.shadowTexture = null,
            this.remove(this.shadowPlane),
            this.shadowPlane = null),
            this.boundsInvalid = true
    }
    moveModelTo(a, b, c) {
        null == a && (a = NaN),
            null == b && (b = NaN),
            null == c && (c = NaN),
            isNaN(a) || (this.objectHolder.position.x = a),
            isNaN(b) || (this.objectHolder.position.y = b),
            isNaN(c) || (this.objectHolder.position.z = c)
    }
    setScale(a, b, c) {
        null == a && (a = NaN),
            null == b && (b = NaN),
            null == c && (c = NaN),
            isNaN(a) || (this.objectHolder.scale.x = a),
            isNaN(b) || (this.objectHolder.scale.y = b),
            isNaN(c) || (this.objectHolder.scale.z = c),
            this.adjustShift()
    }
    rotateModel(a, b, c) {
        null == a && (a = NaN),
            null == b && (b = NaN),
            null == c && (c = NaN),
            isNaN(a) || (this.objectHolder.rotation.x = a),
            isNaN(b) || (this.objectHolder.rotation.y = b),
            isNaN(c) || (this.objectHolder.rotation.z = c)
    }
    doAddPart(a) {
        a.frustumCulled = this.frustumCulled;
        this.parts.push(a);
        this.objectHolder.add(a);
        this.boundsInvalid = true;
    }
    notifyPartsChanged() {
        this.eventBus.dispatchEvent(new Model3DEvent(Model3DEvent.PARTS_CHANGED))
    }
    removeAllChildren(bDispose) {
        null == bDispose && (bDispose = true);
        for (; this.objectHolder.children.length;)
            this.objectHolder.remove(this.objectHolder.children[0]);
        if (bDispose) {
            for (var b = 0; b < this.parts.length; b++) {
                var c = this.parts[b];
                c.geometry.dispose()
            }
        }
        this.parts.splice(0, this.parts.length);
        this.boundsInvalid = true
    }
    adjustShadow() {
        if (this.shadowEnabled) {
            if (!this.shadowPlane) {
                this.shadowMaterial = new THREE.MeshBasicMaterial;
                this.shadowMaterial.transparent = true;
                this.shadowMaterial.opacity = this.shadowAlpha;
                this.shadowMaterial.side = this.shadowBothSides ? THREE.DoubleSide : THREE.FrontSide;
                this.shadowMaterial.depthTest = true;
                this.shadowMaterial.depthWrite = false;
                this.shadowTexture = new THREE.Texture(this.shadowImage);
                this.shadowTexture.needsUpdate = true;
                this.shadowMaterial.map = this.shadowTexture;
                // this.shadowMaterial.side = THREE.DoubleSide;
                var planeGeometry = new THREE.PlaneGeometry(1, 1);
                this.shadowPlane = new THREE.Mesh(planeGeometry, this.shadowMaterial);
                this.shadowPlane.rotateX(- Math.PI / 2);
                this.add(this.shadowPlane);
            }
            this.shadowMeasureCube.measureObjectContainer(this.objectHolder);
            this.shadowPlane.scale.x = (this.shadowMeasureCube.maxX - this.shadowMeasureCube.minX) * this.shadowScaleXRatio;
            this.shadowPlane.scale.y = (this.shadowMeasureCube.maxZ - this.shadowMeasureCube.minZ) * this.shadowScaleYRatio;
            this.shadowPlane.frustumCulled = this.frustumCulled;
        }
    }
    adjustShift() {
        this.shiftModelBottomToVerticalCenter && (this.objectHolder.position.y = -this.minY);
        this.shiftModelToHorizontalCenterX && (this.objectHolder.position.x = -(this.maxX - this.minX) / 2);
        this.shiftModelToHorizontalCenterZ && (this.objectHolder.position.z = -(this.minZ - this.maxZ) / 2);
    }
}
class HibridModelManager {
    constructor(skin3DModel, resourceStore) {
        this.skinnable3DModel = skin3DModel;
        this.shapeRingModelGenerator = this.createShapeRingModelGenerator(skin3DModel, resourceStore);
        this.shapeRingModelGenerator.enableRepositioning = this.enableRepositioning;
        this.modelManager = this.createModelManager(skin3DModel, resourceStore);
        this.enableRepositioning = true;
        this.modelManager.enableRepositioning = this.enableRepositioning;
    }
    get variationName() { return this.modelManager.variationName }
    set variationName(a) { this.modelManager.variationName = a }
    get modelExtension() { return this.modelManager.modelExtension }
    set modelExtension(a) { this.modelManager.modelExtension = a }
    get modelNamePostfix() { return this.modelManager.modelNamePostfix; }
    set modelNamePostfix(a) { this.modelManager.modelNamePostfix = a }
    get modelReferenceConverter() { return this.modelManager.modelReferenceConverter }
    set modelReferenceConverter(a) { this.modelManager.modelReferenceConverter = a }
    get modelRotationX() { return this.modelManager.defaultRotationX }
    set modelRotationX(a) { this.modelManager.defaultRotationX = a }
    get generationInProgress() { return this.shapeRingModelGenerator.generationInProgress || this.modelManager.generationInProgress }
    get model() { return this.skinnable3DModel }
    get currentState() { return this._currentState }
    set currentState(a) { this._currentState != a && (this._currentState = a) }
    get buildAsssetRegistry() { return this._buildAsssetRegistry }
    set buildAsssetRegistry(a) { this._buildAsssetRegistry != a && (this._buildAsssetRegistry = a, this.shapeRingModelGenerator.buildAssetRegistry = a, this.modelManager.buildAssetRegistry = a) }
    get materialAssetMappingFactory() { return this._materialAssetMappingFactory }
    set materialAssetMappingFactory(a) { this._materialAssetMappingFactory != a && (this._materialAssetMappingFactory = a, this.shapeRingModelGenerator.materialAssetMappingFactory = a) }
    get assemblerMaterialRegistry() { return this._assemblerMaterialRegistry }
    set assemblerMaterialRegistry(a) {
        this._assemblerMaterialRegistry != a && (this._assemblerMaterialRegistry = a,
            this.shapeRingModelGenerator.assemblerMaterialRegistry = a, this.modelManager.assemblerMaterialRegistry = a)
    }
    get enableRepositioning() { return this._enableRepositioning }
    set enableRepositioning(a) {
        this._enableRepositioning != a && (this._enableRepositioning = a,
            this.shapeRingModelGenerator.enableRepositioning = a,
            this.modelManager.enableRepositioning = a)
    }

    loadShapeRingConfig(ringConfig, responder) {
        this.currentState = HibridModelManager.STATE_SHAPE;
        this.modelManager.reset();
        var d = this.shapeRingModelGenerator.loadConfig(ringConfig, responder);
        d || responder.result([])
    }
    loadModelRingConfig(config, responder) {
        this.currentState = HibridModelManager.STATE_MODEL;
        this.shapeRingModelGenerator.reset();
        var result = this.modelManager.loadConfig(config, responder);
        result || responder.result([])
    }
    loadShapeRingModelData(b, c, d) {
        this.currentState = HibridModelManager.STATE_SHAPE,
            this.modelManager.reset();
        var e = this.shapeRingModelGenerator.loadModelData(b, c, d);
        e || d.result([])
    }
    setModelScale(a, b, c) {
        null == a && (a = NaN),
            null == b && (b = NaN),
            null == c && (c = NaN),
            this.modelManager.setScale(a, b, c)
    }
    clear() {
        this.currentState = null,
            this.modelManager.clear(),
            this.shapeRingModelGenerator.clear(),
            this.skinnable3DModel.clear()
    }
    hasMeta(b) {
        return this.currentState == HibridModelManager.STATE_MODEL ? this.modelManager.hasMetadata(b) : false
    }
    createModelManager(skinnable3DModel, resourceStore) {
        return new DefaultModelManager(skinnable3DModel, resourceStore);
    }
    createShapeRingModelGenerator(model, b) {
        return new DefaultShapeRingModelGenerator(model)
    }
    static STATE_SHAPE = "shape";
    static STATE_MODEL = "model";
}
class MappingSession {
    constructor() { }
    simpleMeshDatas = null;
    engravingImages = null;
    getEngravingImageByUid(uid) {
        for (var id = 0; this.engravingImages && id < this.engravingImages.length; id++) {
            if (this.engravingImages[id].uid === uid) {
                return this.engravingImages[id];
            }
        }
        return null;
    }
}
class ShapeRingGenerationData {
    constructor() { }
}
class MeshWrapper {
    constructor() { }
    assets = null;
    meshMesDataMap = null;
}
class ShapeRingModelGenerator extends EventDispatcher {
    constructor(model) {
        super();
        this.mergeSimpleMeshDatas = false;//true; //kkk org true
        this.model = model;
        this.materialDictionary = new MaterialDictionary;
        this.ringConfigBuilder = new RingConfigBuilder;
        this.simpleMeshDataOptimizer = new SimpleMeshDataOptimizer;
        this.simpleMeshDataOptimizer.set_ignoreReuseGeometries(true);
        this.usedMetaDatas = [SliceMeta.SLICE_INDEX,
        SliceMeta.SLICE_V_DIRECTION,
        SegmentMeta.SEGMENT_INDEX,
        ProfileMeta.PROFILE_SURFACE,
        EngravingMeta.ENGRAVING_UID];
    }
    //get model() { return this.model };
    get assemblerMaterialRegistry() { return this._assemblerMaterialRegistry };
    set assemblerMaterialRegistry(a) { this._assemblerMaterialRegistry != a && (this._assemblerMaterialRegistry = a) };
    get buildAssetRegistry() { return this._buildAssetRegistry };
    set buildAssetRegistry(a) { this._buildAssetRegistry != a && (this._buildAssetRegistry = a) };
    get materialAssetMappingFactory() { return this._materialAssetMappingFactory };
    set materialAssetMappingFactory(a) { this._materialAssetMappingFactory != a && (this._materialAssetMappingFactory = a) };
    get mergeSimpleMeshDatas() { return this._mergeSimpleMeshDatas };
    set mergeSimpleMeshDatas(a) { this._mergeSimpleMeshDatas != a && (this._mergeSimpleMeshDatas = a) };
    // get generationInProgress() { return this.generationInProgress };

    loadModelData(config, b, c) {
        null == c && (c = null);
        var e = true;
        if (this.currentConfig) {
            //kkk
            var f = this.currentConfig.getChanges(config);
            if (!f.length) return false;
            e = !this.onlyMaterialChanged(f)
        }
        this.currentConfig = config;
        var fallbackMMFAsset;
        if (e) {
            this.generationInProgress = true;
            var assetPkg = new AssetPackage(new Responder(() => {
                var b = fallbackMMFAsset.content;
                this.currentData = b,
                    this.curentSession = new MappingSession,
                    this.curentSession.simpleMeshDatas = b.simpleMeshDatas,
                    this.curentSession.engravingImages = b.getMetadata("engravingImages"),
                    this.reAdjustModel(this.curentSession, config, true, c)
            }, (a) => {
                console.error("Error when loading ring model", a)
            }, this));
            fallbackMMFAsset = new FallbackMMFAsset(UID.create(), b),
                fallbackMMFAsset.config = config.__source,
                assetPkg.addAsset(fallbackMMFAsset),
                this.assemblerMaterialRegistry.assetModel.loadPackage(assetPkg)
        }
        else
            this.reAdjustModel(this.curentSession, this.currentConfig, false, c);
        return true
    }
    //kch ShapeRingModelGenerator:loadConfig
    loadConfig(config, responder, bRefresh) {
        null == responder && (responder = null);
        null == bRefresh && (bRefresh = false);
        var bLoad = true;
        if (this.currentConfig && !bRefresh) {
            //kkk
            var f = this.currentConfig.getChanges(config);
            if (!f.length) return false;
            bLoad = !this.onlyMaterialChanged(f)
        }
        this.generationInProgress = true;
        bRefresh || (this.currentConfig = config);
        if (bLoad || bRefresh) {
            var buildAssets = this.ringConfigBuilder.prepareBuild(config);
            this.buildAssetRegistry.currentConfig = config;
            buildAssets = this.buildAssetRegistry.resolveBuildAssets(buildAssets, this);
            this.ringConfigBuilder.build(config, buildAssets, new Responder((meshDatas) => { //kkk todo
                if (this.mergeSimpleMeshDatas) {
                    this.simpleMeshDataOptimizer.set_metaFilters(this.getAllUsedMetaDatas());
                    meshDatas = this.simpleMeshDataOptimizer.mergeMeshDatas(meshDatas);
                }
                if (bRefresh) {
                    this.generationInProgress = false;
                    var generatedData = new ShapeRingGenerationData;
                    generatedData.meshDatas = meshDatas;
                    generatedData.buildAssets = buildAssets;
                    responder.result([generatedData])
                }
                else {
                    this.curentSession = new MappingSession;
                    this.curentSession.simpleMeshDatas = meshDatas;
                    this.reAdjustModel(this.curentSession, config, true, responder);
                }
            }, (err) => {
                console.error("Error when generating ring", err),
                    this.generationInProgress = false,
                    responder.fault([err])
            }, this))
        }
        else
            this.reAdjustModel(this.curentSession, config, false, responder);
        return true
    }
    reset() { this.currentConfig = null }
    clear(a) {
        null == a && (a = true), this.currentConfig = null, this.model.clear(a);
        var b = this.materialDictionary.clear();
        this.assemblerMaterialRegistry && this.assemblerMaterialRegistry.relaseMaterials(b.removedMaterials, this)
    }
    recalculatePosition() {
        var a = this.currentConfig.circumference / (2 * Math.PI);
        this.model.moveModelTo(-this.currentConfig.profileWidth / 2, a + this.currentConfig.profileHeight, NaN)
    }
    reAdjustModel(session, config, bGenerateMeshMeta, responder) {
        null == responder && (responder = null);
        var matAssetWrapper = this.createMaterialAssetWrapper(session.simpleMeshDatas, config);
        var assetPkg = new AssetPackage(new Responder((b) => {
            var meshArray = null;
            if (bGenerateMeshMeta) {
                var meshWrapper = this.generateMeshes(session.simpleMeshDatas);
                session.meshMesDataMap = meshWrapper.meshMesDataMap;
                meshArray = meshWrapper.assets;
            }
            var dic = new Dictionary;
            for (var i = 0; i < matAssetWrapper.usedMaterialAssets.length; i++) {
                var j = matAssetWrapper.usedMaterialAssets[i],
                    k = j.content,
                    materialDesc = k.materialDescriptor;
                dic.set(materialDesc.uId, materialDesc)
            }
            this.readjustModelSkin(dic, session, meshArray, responder)
        }, (err) => {
            console.error("Error when loading material packages", err);
            this.generationInProgress = false;
            responder.fault([err]);
        }, this));
        for (var id = 0; id < matAssetWrapper.usedMaterialAssets.length; id++) {
            var matAsset = matAssetWrapper.usedMaterialAssets[id];
            assetPkg.addAsset(matAsset)
        }
        session.usedMaterialAssets = matAssetWrapper.usedMaterialAssets;
        session.meshDataMaterialAssetMap = matAssetWrapper.meshDataMaterialAssetMap;
        this.assemblerMaterialRegistry.assetModel.loadPackage(assetPkg);
    }
    getAllUsedMetaDatas() {
        var a, b, c = this.materialAssetMappingFactory.usedMetaDatas,
            d = this.usedMetaDatas,
            e = [],
            f = {};
        for (b = 0; b < c.length; b++) a = c[b], f[a] = true;
        for (b = 0; b < d.length; b++) a = d[b], f[a] = true;
        for (var g in f) e.push(g);
        return e
    }
    onlyMaterialChanged(a) {
        for (var b = 0; b < a.length; b++) {
            var c = a[b]; if ("m" != c.type)
                return false
        }
        return true
    }
    createMaterialAssetWrapper(meshArray, config) {
        var c = {}, dic = new Dictionary, e = [];
        for (var id = 0; id < meshArray.length; id++) {
            var diskID, meshData = meshArray[id];
            if (meshData.hasMetadata(SliceMeta.SLICE_INDEX)) {
                var n = meshData.getMetadata(SliceMeta.SLICE_INDEX),
                    o = meshData.getMetadata(SliceMeta.SLICE_V_DIRECTION);
                if (o == SliceMetaValue.SLICE_V_DIRECTION_LEFT)
                    diskID = n;
                else {
                    if (o != SliceMetaValue.SLICE_V_DIRECTION_RIGHT) throw new Error("Slice direction unknown " + o);
                    diskID = n + 1
                }
            }
            else diskID = 0;

            var material,
                q = meshData.getMetadata(SegmentMeta.SEGMENT_INDEX) || 0,
                segment = config.segments[q],
                disk = segment.disks[diskID],
                t = meshData.getMetadata(ProfileMeta.PROFILE_SURFACE);
            material = t == ProfileMetaValue.PROFILE_SURFACE_OUTER ? disk.outerMaterial : disk.innerMaterial;
            var v = this.materialAssetMappingFactory.getMappingAsset(material.surface, material.gradient, meshData, config);
            var w = v.uid;
            c[w] ? v = c[w] : (c[w] = v, e.push(v)), dic.set(meshData, v)
        }
        var matAssetWrapper = new MaterialAssetWrapper;
        matAssetWrapper.usedMaterialAssets = e;
        matAssetWrapper.meshDataMaterialAssetMap = dic;
        return matAssetWrapper;
    }
    generateMeshes(simpleMeshDatas) {
        var meshArray = [],
            dic = new Dictionary;
        meshArray = SimpleMeshDataUtil.convertToMeshes(simpleMeshDatas, dic);
        var meshWrapper = new MeshWrapper;
        meshWrapper.assets = meshArray;
        meshWrapper.meshMesDataMap = dic;
        return meshWrapper;
    }
    //ShapeRingModelGenerator
    readjustModelSkin(dic, config, modelParts, responder) {
        null == modelParts && (modelParts = null),
            null == responder && (responder = null);
        this.materialDictionary.addDescriptors(dic);
        var status = this.materialDictionary.commitChanges();
        this.assemblerMaterialRegistry.prepareMaterials(status.addedMaterials, new Responder(() => {
            try {
                modelParts && this.setModelParts(modelParts),
                    this.remapMaterials(config),
                    this.assemblerMaterialRegistry && this.assemblerMaterialRegistry.relaseMaterials(status.removedMaterials, this),
                    this.generationInProgress = false, responder && responder.result([])
            } catch (a) {
                console.error("Error when generating rings:", a),
                    this.generationInProgress = false,
                    responder && responder.fault([Fault.fromError(a)])
            }
        }, (a) => {
            console.error("Error when readjusting skin:", a),
                modelParts && this.setModelParts(modelParts),
                this.materialDictionary.revertLastCommit(),
                this.generationInProgress = false, responder && responder.fault([a])
        }, this), this)
    }
    setModelParts(a) {
        this.model.setModelParts(a),
            this.recalculatePosition()
    }
    lookUpMaterial(a) {
        var b = this.assemblerMaterialRegistry.getMaterialByDescriptor(a, this).material;
        return b
    }
    lookUpMaterialPackage(a) {
        return this.assemblerMaterialRegistry.getMaterialPackageByDescriptor(a, this)
    }
    remapMaterials(mappingSession) {
        var partArray = this.model.getAllParts();
        for (var id = 0; id < partArray.length; id++) {
            var d, part = partArray[id],
                f = mappingSession.meshMesDataMap.get(part),
                g = mappingSession.meshDataMaterialAssetMap.get(f),
                h = g.content,
                i = h.materialDescriptor,
                j = this.lookUpMaterialPackage(i);
            if (j instanceof EngravingMaterialPackage) {
                var k = j,
                    engravingUid = f.getMetadata(EngravingMeta.ENGRAVING_UID),
                    image = mappingSession.getEngravingImageByUid(engravingUid);
                if (image == null) image = this.buildAssetRegistry.getAssetContentByUid(engravingUid);
                if (!image)
                    throw new Error("Engraving image by ID " + engravingUid + " not found");
                var _material = k.getOrCreateMaterial(engravingUid, image);
                part.material = _material
            } else {
                d = this.lookUpMaterial(i),
                    part.material = d,
                    this.adjustUVScale(part, h.scaleU, h.scaleV)
            }
        }
    }
    adjustUVScale(a, b, c) {
        if (null != b && !isNaN(b) || null != c && !isNaN(c)) {
            var d = a.geometry;
            b = null != b && isNaN(b) ? d.scaleU : b, c = null != c && isNaN(c) ? d.scaleV : c, d.scaleUV(b, c)
        }
    }
}
class DefaultShapeRingModelGenerator extends ShapeRingModelGenerator {
    constructor(b) {
        super(b);
    }
    recalculatePosition() {
        if (this.enableRepositioning) {
            var radius = this.currentConfig.circumference / (2 * Math.PI);
            this.model.moveModelTo(-this.currentConfig.profileWidth / 2,
                radius + this.currentConfig.profileHeight, NaN)
        }
    }
    reAdjustModel(b, c, d, e) {
        null == e && (e = null);
        super.reAdjustModel(b, c, d, e)
    }
}
class Skinnable3DModelGenerator extends EventDispatcher {
    constructor(model) {
        super();
        this.defaultScaleU = NaN,
            this.defaultScaleV = NaN,
            this.model = model,
            this.materialDictionary = new MaterialDictionary,
            this.materialPreprocessors = [];
    }
    get assemblerMaterialRegistry() { return this._assemblerMaterialRegistry }
    set assemblerMaterialRegistry(a) { this._assemblerMaterialRegistry != a && (this._assemblerMaterialRegistry = a) }
    get uvMethodFactory() { return this._uvMethodFactory }
    set uvMethodFactory(a) { this._uvMethodFactory != a && (this._uvMethodFactory = a) }
    get defaultScaleU() { return this._defaultScaleU }
    set defaultScaleU(a) { this._defaultScaleU != a && (this._defaultScaleU = a) }
    get defaultScaleV() { return this._defaultScaleV }
    set defaultScaleV(a) { this._defaultScaleV != a && (this._defaultScaleV = a) }
    get defaultRotationX() { return this._defaultRotationX }
    set defaultRotationX(a) { this._defaultRotationX != a && (this._defaultRotationX = a) }
    get defaultRotationY() { return this._defaultRotationY }
    set defaultRotationY(a) { this._defaultRotationY != a && (this._defaultRotationY = a) }
    get defaultRotationZ() { return this._defaultRotationZ }
    set defaultRotationZ(a) { this._defaultRotationZ != a && (this._defaultRotationZ = a) }
    get generationInProgress() { return this._generationInProgress }
    set generationInProgress(a) { this._generationInProgress != a && (this._generationInProgress = a) }  /// ppp

    addMaterialPreprocessor(a) {
        var b = a.newInstance();
        b.initialize(this.model), this.materialPreprocessors.push(b)
    }
    getProcessorByType(a) {
        for (var b = 0; b < this.materialPreprocessors.length; b++) {
            var c = this.materialPreprocessors[b];
            if (c instanceof a) return c
        }
        return null
    }
    clear(a) {
        null == a && (a = true);
        this.model.clear(a);
        var b = this.materialDictionary.clear();
        this.assemblerMaterialRegistry && this.assemblerMaterialRegistry.relaseMaterials(b.removedMaterials, this);
    }
    //Skinnable3DModelGenerator
    readjustModelSkin(config, meshArray, c) {
        null == meshArray && (meshArray = null),
            null == c && (c = null),
            this.generationInProgress = true;
        for (var dic = new Dictionary, e = 0; e < config.materialMappings.length; e++) {
            var f = config.materialMappings[e];
            dic.set(f.materialDescriptor.uId, f.materialDescriptor)
        }
        this.materialDictionary.addDescriptors(dic);
        var g = this.materialDictionary.commitChanges();
        this.assemblerMaterialRegistry.prepareMaterials(g.addedMaterials, new Responder(() => {
            try {
                meshArray && this.setModelParts(meshArray, config),
                    this.remapMaterials(config),
                    this.assemblerMaterialRegistry && this.assemblerMaterialRegistry.relaseMaterials(g.removedMaterials, this),
                    c && c.result([])
            }
            catch (d) {
                console.error("Error when generating rings:", d),
                    c && c.fault([Fault.fromError(d)])
            }
            this.generationInProgress = false
        }, (d) => {
            console.error("Error when generating rings:{}", d),
                meshArray && this.setModelParts(meshArray, config),
                this.materialDictionary.revertLastCommit(),
                this.generationInProgress = false, c && c.fault([d])
        }, this), this)
    }
    lookUpMaterial(a) {
        var wrapper = this.assemblerMaterialRegistry.getMaterialByDescriptor(a, this);
        if (!wrapper) throw new Error("Material not found for " + a);
        return wrapper.material
    }
    setModelParts(a, b) {
        for (var c = 0; c < this.materialPreprocessors.length; c++) {
            var d = this.materialPreprocessors[c];
            a = d.setParts(a, b)
        }
        this.model.setModelParts(a)
    }
    remapMaterials(a) {
        this.startProcessorSession(a);
        for (var b, c, d, e = [], f = 0; f < a.materialMappings.length; f++) {
            c = a.materialMappings[f],
                b = c.materialDescriptor,
                d = this.assemblerMaterialRegistry.getMaterialPackageByDescriptor(b, this),
                e.push(d);
        }
        this.handleProcessorMaterialPackages(e);
        for (var g = 0; g < a.materialMappings.length; g++) {
            c = a.materialMappings[g],
                b = c.materialDescriptor,
                d = this.assemblerMaterialRegistry.getMaterialPackageByDescriptor(b, this);
            var h = c.objectGroup;
            a: for (var i = 0; i < h.groupedObjectReferences.length; i++) {
                for (var j = h.groupedObjectReferences[i], k = 0; k < this.materialPreprocessors.length; k++) {
                    var l = this.materialPreprocessors[k],
                        m = l.processMaterial(h, j, d);
                    if (m) continue a
                }
                var n, o, p;
                if (this.uvMethodFactory && (j.uvRecalcualte || j.uvRemapMethod)) {
                    var q = this.model.getPartByName(j.name);
                    if (q)
                        if (j.uvRecalcualte) {
                            var r = this.uvMethodFactory.getUVCalculator(),
                                s = r.calculateUV(q);
                            n = s.x, o = s.y, isNaN(j.scaleU) || (n *= j.scaleU), isNaN(j.scaleV) || (o *= j.scaleV), p = true
                        }
                        else {
                            var t = q.geometry,
                                u = t.geometryData,
                                v = this.uvMethodFactory.getUVMapper(j.uvRemapMethod);
                            v.remap(u), t.updateUVData(u.uvData)
                        }
                    else if (!j.optional) throw new Error("Part with name: " + j.name + " not found")
                }
                p || (n = isNaN(j.scaleU) ? this.defaultScaleU : j.scaleU, o = isNaN(j.scaleV) ? this.defaultScaleV : j.scaleV);
                var material = this.lookUpMaterial(b),
                    x = isNaN(j.rotationX) ? this.defaultRotationX : j.rotationX,
                    y = isNaN(j.rotationY) ? this.defaultRotationY : j.rotationY,
                    z = isNaN(j.rotationZ) ? this.defaultRotationZ : j.rotationZ;
                this.model.setPartMaterial(j.name, material, !j.optional),
                    isNaN(n) || isNaN(o) || this.model.setPartUVScale(j.name, n, o, !j.optional),
                    this.model.setPartRotationIfNotRotated(j.name, x, y, z, !j.optional)
            }
        }
        this.endProcessorSession(a)
    }
    startProcessorSession(a) {
        for (var b = 0; b < this.materialPreprocessors.length; b++) {
            var c = this.materialPreprocessors[b];
            c.sessionStarted(a)
        }
    }
    handleProcessorMaterialPackages(a) {
        for (var b = 0; b < this.materialPreprocessors.length; b++) {
            var c = this.materialPreprocessors[b];
            c.handleMaterialPackages(a)
        }
    }
    endProcessorSession(a) {
        for (var b = 0; b < this.materialPreprocessors.length; b++) {
            var c = this.materialPreprocessors[b];
            c.sessionEnded(a)
        }
    }
}
class MaterialPreProcessorBase {
    constructor() { }
    initialize(a) { this.model = a }
    setParts(a, b) { return a }
    sessionStarted(a) { }
    handleMaterialPackages(a) { }
    processMaterial(a, b, c) {
        return false
    }
    sessionEnded(a) { }
}
class EngravingMaterialPreprocessor extends MaterialPreProcessorBase {
    constructor() {
        super();
        this.engravingOffset = -.04;
        this.engravingConfigBuilder = new EngravingConfigBuilder;
    }
    get partNameRegex() { return this._partNameRegex };
    set partNameRegex(a) { this._partNameRegex != a && (this._partNameRegex = a) };
    get innerCircumference() { return this._innerCircumference };
    set innerCircumference(a) { this._innerCircumference != a && (this._innerCircumference = a) };
    get engravingOffset() { return this._engravingOffset };
    set engravingOffset(a) { this._engravingOffset != a && (this._engravingOffset = a) };
    get buildAssetRegistry() { return this._buildAssetRegistry };
    set buildAssetRegistry(a) { this._buildAssetRegistry != a && (this._buildAssetRegistry = a) };
    get materialResolver() { return this._materialResolver };
    set materialResolver(a) { this._materialResolver != a && (this._materialResolver = a) };
    addLayouts(a) {
        this.engravinLaoutConfigs = a, this.hasEngraving = a && a.length;
        var b = this.engravingConfigBuilder.collectAndBuildEngraving(a);
        if (!this.buildAssetRegistry) throw new Error("buildAssetRegistry not set");
        b = this.buildAssetRegistry.resolveBuildAssets(b, this)
    }
    clear() {
        if (this.engravingParts) {
            for (var a = 0; a < this.engravingParts.length; a++) {
                var b = this.engravingParts[a];
                b.geometry.dispose()
            }
            this.engravingParts.length = 0
        }
        this.engravinLaoutConfigs && (this.engravinLaoutConfigs.length = 0)
    }
    setParts(a, b) {
        this.engravingParts = [];
        for (var c = [], d = 0; d < a.length; d++) {
            var e = a[d];
            this.partNameEngravable(e.name) ? this.engravingParts.push(e) : c.push(e)
        }
        return c
    }
    sessionStarted(a) {
        this.engravingPlateMinX = NaN,
            this.engravingPlateMaxX = NaN;
        var b;
        for (b = 0; b < this.engravingParts.length; b++) {
            var c = this.engravingParts[b],
                d = new ThreeMeasureCube;
            d.measureCriteria = new TresholdMeasureCriteria,
                d.measureMesh(c),
                this.engravingPlateMinX = isNaN(this.engravingPlateMinX) ? d.minX : Math.min(d.minX, this.engravingPlateMinX), this.engravingPlateMaxX = isNaN(this.engravingPlateMaxX) ? d.maxX : Math.max(d.maxX, this.engravingPlateMaxX)
        }
        this.hasEngraving && (this.engravingConfigBuilder.update(this.innerCircumference, this.engravingPlateMinX, this.engravingPlateMaxX), this.engravingCutRects = EngravingConfigHelper.createPlacementRectDatas(this.engravingConfigBuilder.get_placementMetrics()))
    }
    handleMaterialPackages(a) { }
    processMaterial(a, b, c) {
        if (c instanceof EngravingMaterialPackage) {
            var d = c,
                e = this.getEngrvingPartByName(b.name);
            if (e && this.hasEngraving)
                for (var _SimpleGeometryData, mesh, id = 0; id < this.engravingCutRects.length; id++) {
                    var m = this.engravingCutRects[id],
                        metaData = m.get_additionalMetas().getMetadata(EngravingMeta.ENGRAVING_UID),
                        _material = this.resolveMaterial(d, metaData),
                        name = b.name + "_" + metaData;
                    if (this.model.hasPart(name))
                        mesh = this.model.getPartByName(name),
                            mesh.material = _material;
                    else {
                        if (!_SimpleGeometryData) {
                            _SimpleGeometryData = SimpleGeometryDataUtil.toUntyped(e.geometry.geometryData);
                            var _SimpleGeometryDataBounds = new SimpleGeometryDataBounds(_SimpleGeometryData);
                            CylindricalHelper.addCylindricalTopology(_SimpleGeometryData,
                                _SimpleGeometryDataBounds.midY,
                                _SimpleGeometryDataBounds.midZ,
                                -1,
                                this.innerCircumference,
                                .5),
                                _SimpleGeometryData.uvData = _SimpleGeometryData.vertexTopologyData.concat()
                        }
                        var _geometryData = CylindricalHelper.cutPolygonByTopology(_SimpleGeometryData,
                            m.get_polygon(),
                            this.innerCircumference);
                        if (_geometryData.vertexPositionData && _geometryData.vertexPositionData.length) {
                            var v = new SimpleMeshData;
                            v.geometryData = _geometryData;
                            m.get_additionalMetas().copyMetaDatasTo(v);
                            _geometryData = this.engravingConfigBuilder.makeEngravingPlate(v).geometryData;
                            var geometry = SimpleGeometryDataUtil.constructGeometry(_geometryData);
                            SimpleGeometryDataUtil.nonUniformScale(geometry, this.engravingOffset);
                            mesh = new THREE.Mesh(geometry, _material);
                            mesh.name = name;
                            this.model.addPart(mesh);
                        }
                    }
                }
        }
        return this.partNameEngravable(b.name);
    }
    resolveMaterial(a, b) {
        var c;
        if (this.materialResolver) return this.materialResolver.resolve(a, b);
        var d = this.buildAssetRegistry.getAssetContentByUid(b);
        return c = a.getOrCreateMaterial(b, d)
    }
    clearEngravingPlate(a) {
        if (this.model.hasPart(a)) {
            var b = this.model.removePart(a);
            b.geometry.dispose()
        }
    }
    getEngrvingPartByName(a) {
        for (var b = 0; b < this.engravingParts.length; b++) {
            var c = this.engravingParts[b];
            if (c.name == a)
                return c
        }
        return null
    }
    partNameEngravable(a) {
        this.partNameRegex.lastIndex = 0;
        return true
    }
}
class ModelReference {
    constructor(a, b, c, d) {
        undefined == a && (a = null),
            undefined == b && (b = null),
            undefined == c && (c = null),
            undefined == d && (d = null),
            this._basePath = a,
            this._modelName = b,
            this._variationName = c,
            this._namePostfix = "",
            this._extension = d,
            this._paramatersMap = {}
    }
    get basePath() { return this._basePath }
    set basePath(a) { this._basePath != a && (this._basePath = a) }
    get modelName() { return this._modelName }
    set modelName(a) { this._modelName != a && (this._modelName = a) }
    get variationName() { return this._variationName }
    set variationName(a) { this._variationName != a && (this._variationName = a) }
    get namePostfix() { return this._namePostfix }
    set namePostfix(a) { this._namePostfix != a && (this._namePostfix = a) }
    get extension() { return this._extension }
    set extension(a) { this._extension != a && (this._extension = a) }
    get paramatersMap() { return this._paramatersMap }
    set paramatersMap(a) { this._paramatersMap != a && (this._paramatersMap = a) }
    get circumference() { return this._circumference }
    set circumference(a) { this._circumference != a && (this._circumference = a) }
    getFullModelPath() {
        return this._basePath + "/" + this._modelName + this._namePostfix + "." + this._extension
    }
    getFullVariationPath() {
        return this._basePath + "/" + this.variationName + ".xml"
    }
    clearParameters() {
        this._paramatersMap = {}
    }
    setParameter(a, b) {
        this._paramatersMap[a] = b
    }
    copyParameters(a) {
        for (var b in this._paramatersMap)
            a.setParameter(b, this._paramatersMap[b]);
        a.setParameter("model", this._modelName + this._namePostfix)
    }
}
class ModelManager extends Skinnable3DModelGenerator {
    constructor(c, d) {
        super(c);
        this.modelExtension = ModelManager.EXTENSION_MMF;
        this.mergeSimpleMeshDatas = false;//true; //kkk org true
        var f = new ClassFactory(EngravingMaterialPreprocessor, { partNameRegex: d });
        this.simpleMeshDataOptimizer = new SimpleMeshDataOptimizer;
        this.simpleMeshDataOptimizer.set_ignoreReuseGeometries(true);
        this.addMaterialPreprocessor(f);
    }
    get circumference() { return this._circumference }
    set circumference(a) { this._circumference != a && (this._circumference = a) }
    get modelReferenceConverter() { return this._modelReferenceConverter }
    set modelReferenceConverter(a) { this._modelReferenceConverter != a && (this._modelReferenceConverter = a) };
    get modelNamePostfix() { return this._modelNamePostfix }
    set modelNamePostfix(a) { this._modelNamePostfix != a && (this._modelNamePostfix = a) }
    get modelExtension() { return this._modelExtension }
    set modelExtension(a) { this._modelExtension != a && (this._modelExtension = a) }
    get mergeSimpleMeshDatas() { return this._mergeSimpleMeshDatas }
    set mergeSimpleMeshDatas(a) { this._mergeSimpleMeshDatas != a && (this._mergeSimpleMeshDatas = a) }
    get buildAssetRegistry() { return this._buildAssetRegistry };
    set buildAssetRegistry(a) { this._buildAssetRegistry != a && (this._buildAssetRegistry = a) };

    get engravingMaterialResolver() {
        var a = this.getProcessorByType(EngravingMaterialPreprocessor);
        return a.materialResolver
    }
    set engravingMaterialResolver(a) {
        var b = this.getProcessorByType(EngravingMaterialPreprocessor);
        b.materialResolver = a
    }
    //kch ModelManager:loadConfig
    loadConfig(config, b) {
        null == b && (b = null);
        var c = true;
        if (this.currentConfig) {
            //kkk
            var d = this.currentConfig.getChanges(config);
            if (!d.length) return false;
            c = !this.onlyMaterialChanged(d)
        }
        var e = this.createModelReference(config);
        return this._generationInProgress = true,
            c ? this.reLoadModel(e, b) : this.reloadVariation(e, b),
            this.currentConfig = config,
            true
    }
    refresh(a, b) {
        if (null == b && (b = null), this.currentConfig) {
            var c = this.createModelReference(this.currentConfig);
            a ? this.reLoadModel(c, b) : this.reloadVariation(c, b)
        }
    }
    setScale(a, b, c) {
        null == a && (a = NaN),
            null == b && (b = NaN),
            null == c && (c = NaN),
            this.model.setScale(a, b, c),
            this.recalculatePosition()
    }
    reset() {
        this.currentConfig = null,
            this.currentVariationConfig = null
    }
    getMetadata(a) {
        return this.currentVariationConfig ? this.currentVariationConfig.metadatas.getMetadata(a) : null
    }
    hasMetadata(a) {
        return this.currentVariationConfig ? this.currentVariationConfig.metadatas.hasMetadata(a) : false
    }
    setModelParts(b, c) {
        super.setModelParts(b, c), this.recalculatePosition()
    }
    clear(b) {
        null == b && (b = true),
            super.clear(b),
            this.currentConfig = null,
            this.currentVariationConfig = null
    }
    recalculatePosition() { }
    onlyMaterialChanged(a) {
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            if ("m" != c.type)
                return false
        }
        return true
    }
    reLoadModel(a, c) {
        null == c && (c = null);
        var assetPkg = new AssetPackage(new Responder(() => {
            var d = e.content;
            this.currentVariationConfig = d.variationConfig;
            var meshArray;
            if (a.extension != ModelManager.EXTENSION_MMF)
                throw new Error("Unsupported asset extension " + a.extension);
            var h = f.content,
                j = h.simpleMeshDatas;
            this._mergeSimpleMeshDatas &&
                this.simpleMeshDatasOptimizable(j) &&
                (this.simpleMeshDataOptimizer.set_metaFilters(["name"]),
                    j = this.simpleMeshDataOptimizer.mergeMeshDatas(j)),
                meshArray = SimpleMeshDataUtil.convertToMeshes(j),
                this.uvMethodFactory && (this.uvMethodFactory.circumference = a.circumference);
            try {
                var engravingPreprocessor = this.getProcessorByType(EngravingMaterialPreprocessor);
                engravingPreprocessor.buildAssetRegistry = this.buildAssetRegistry;
                engravingPreprocessor.innerCircumference = a.circumference;
                engravingPreprocessor.clear();
                engravingPreprocessor.addLayouts(this.currentConfig.engravingLayouts);
                this.readjustModelSkin(d.variationConfig, meshArray, c)
            } catch (e) {
                console.error("Error when creating engraving layouts: ", e),
                    this._generationInProgress = false, c.fault([Fault.fromError(e)])
            }
        }, (a) => {
            this._generationInProgress = false, c.fault([a])
        }, this)),
            e = new MaterialConfigAsset(UID.create(), a.getFullVariationPath());
        a.copyParameters(e), e.resolvePathFromBase = false, assetPkg.addAsset(e);
        var f;
        a.extension == ModelManager.EXTENSION_MMF && (f = new MMFAsset(UID.create(), a.getFullModelPath()), f.resolvePathFromBase = false, assetPkg.addAsset(f)),
            this.assemblerMaterialRegistry.assetModel.loadPackage(assetPkg)
    }
    simpleMeshDatasOptimizable(a) {
        for (var b = 0, c = {}, d = 0; d < a.length; d++) {
            var e = a[d],
                f = e.getMetadata("name");
            if (!f) throw new Error("SimpleMeshData has no name metadata");
            c[f] = c[f] || 0, c[f]++, c[f] > 1 && b++
        }
        return b > 0
    }
    reloadVariation(a, b) {
        null == b && (b = null);
        var assetPkg = new AssetPackage(new Responder(() => {
            var a = materialConfigAsset.content;
            this.currentVariationConfig = a.variationConfig;
            this.readjustModelSkin(a.variationConfig, null, b);
        }, (a) => {
            this._generationInProgress = false,
                b.fault([a])
        }, this));
        var materialConfigAsset = new MaterialConfigAsset(UID.create(), a.getFullVariationPath());
        a.copyParameters(materialConfigAsset);
        materialConfigAsset.resolvePathFromBase = false;
        assetPkg.addAsset(materialConfigAsset);
        this.assemblerMaterialRegistry.assetModel.loadPackage(assetPkg);
    }
    createModelReference(a) {
        throw new Error("createModelReference is an abstract method you must override it")
    }
    static EXTENSION_MMF = "mmf";
}
class DefaultModelManager extends ModelManager {
    constructor(a, b) {
        super(a, b);
        this.variationName = "variation";
        this.modelExtension = ModelManager.EXTENSION_MMF;
    }
    get enableRepositioning() { return this._enableRepositioning };
    set enableRepositioning(a) { this._enableRepositioning != a && (this._enableRepositioning = a) };
    get variationName() { return this._variationName };
    set variationName(a) { this._variationName != a && (this._variationName = a) };
    createModelReference(a) {
        var b = new ModelReference(a.path, a.name, this.variationName, this.modelExtension);
        b.circumference = a.circumference,
            this.modelNamePostfix && (b.namePostfix = this.modelNamePostfix);
        var c;
        for (c = 0; c < a.colors.length; c++) {
            var d = a.colors[c],
                e = d;
            a.alloys && a.alloys.length && (e = d + "-" + a.alloys[c]), b.setParameter("gradient" + c, e)
        }
        for (c = 0; c < a.surfaces.length; c++) {
            var f = a.surfaces[c];
            b.setParameter("surface" + c, f)
        }
        return null != this.modelReferenceConverter && (b = this.modelReferenceConverter.call(this, b)), b
    }
    recalculatePosition() {
        this.enableRepositioning && this.model.moveModelTo(0, -this.model.minY, NaN)
    }
}
export {
    MaterialMappingAsset, ImageAsset,
    LoadableMaterialAssetFactory,
    HibridModelManager,
    Skinnable3DModel,
    HandViewModel,
    ConfiguratorModel,
    AssetModel,
    SettingsModel,
    DataModel
};