/* eslint-disable no-unused-expressions */
import * as THREE from 'three';
import * as ThreeEx from './threeEx.js'
import {
    UID, LinkedDescriptors, TimeoutCaller, WebGLGlobals
} from "./basic.js"
import { ColorTransform } from "./color.js"
import {
    FaultErrorEvent, EventDispatcher
} from "./event.js"
import {
    Fault, ConfigurationPropertyError
} from "./error.js"
import {
    Responder, AssemblerMaterialDescriptor
} from "./loader.js"
import {
    MultiShaderMaterial, PhysicalShaderMaterial, SingleLevelShaderMaterial,
    DiamondComplexShaderMaterialTop, DiamondComplexShaderMaterialBottom
} from "./glsl.js"
import {
    ImageAsset,
} from "./model.js"


class Dictionary {
    constructor() {
        this.hashValueMap = {};
        this.hashKeyMap = {};
        this.primitiveHashMap = {};
        this.hashCounter = 0;
        this.hashVariableName = "__ring_dic_hash__" + Dictionary.DIC_COUNTER++;
    }
    set(b, c) {
        if (Dictionary.isPrimitive(b))
            this.primitiveHashMap[b] = c;
        else {
            var d;
            if (b[this.hashVariableName]) {
                d = b[this.hashVariableName]
            }
            else {
                d = this.getNextHash();
                b[this.hashVariableName] = d;
            }
            this.hashKeyMap[d] = b;
            this.hashValueMap[d] = c;
        }
    }
    get(b) {
        var c = null;
        if (Dictionary.isPrimitive(b))
            c = this.primitiveHashMap[b];
        else {
            var d = b[this.hashVariableName];
            d && (c = this.hashValueMap[d])
        }
        return null == c ? null : c
    }
    keys() {
        var a = [];
        for (var b in this.hashKeyMap)
            a.push(this.hashKeyMap[b]);
        for (b in this.primitiveHashMap)
            a.push(b);
        return a
    }
    values() {
        var a = [];
        for (var b in this.hashValueMap) a.push(this.hashValueMap[b]);
        for (b in this.primitiveHashMap) a.push(this.primitiveHashMap[b]);
        return a
    }
    remove(b) {
        if (Dictionary.isPrimitive(b)) delete this.primitiveHashMap[b];
        else {
            var c = b[this.hashVariableName];
            if (c) {
                delete this.hashKeyMap[c];
                delete this.hashValueMap[c];
                delete b[this.hashVariableName];
            }
        }
    }
    hasKey(b) {
        if (Dictionary.isPrimitive(b)) {
            return null != this.primitiveHashMap[b];
        }
        var c = b[this.hashVariableName];
        return c ? null != this.hashKeyMap[c] : false;
    }
    dispose() {
        for (var a in this.hashKeyMap) {
            var b = this.hashKeyMap[a];
            delete b[this.hashVariableName]
        }
        this.hashValueMap = null;
        this.hashKeyMap = null;
        this.primitiveHashMap = null;
    }
    getNextHash() {
        return (this.hashCounter++).toString()
    }
    static isPrimitive(a) {
        var b = typeof a;
        return null == a || ("object" != b && "function" != b)
    }
    static DIC_COUNTER = 0;
}
class AssetDictionaryStatus {
    constructor(a, b, c, d) {
        this._addedAssets = a;
        this._removedAssets = b;
        this._addedLength = c;
        this._removedLength = d;
    }
    get removedAssets() { return this._removedAssets }
    get addedAssets() { return this._addedAssets }
    get addedLength() { return this._addedLength }
    get removedLength() { return this._removedLength }
}
class AssetDictionary {
    constructor() {
        this.currentIMaterialbuildAssets = new Dictionary;
    }
    get hasChanges() { return null != this.waitingbuildAssets }
    addbuildAssets(a) {
        this.waitingbuildAssets || (this.waitingbuildAssets = new Dictionary);
        for (var b = a.values(), c = 0; c < b.length; c++) {
            var d = b[c];
            this.waitingbuildAssets.set(d.get_uid(), d)
        }
    }
    addbuildAsset(a) {
        if (!this.waitingbuildAssets) {
            (this.waitingbuildAssets = new Dictionary);
        }
        this.waitingbuildAssets.set(a.get_uid(), a);
    }
    getBuildAsset(a) {
        return this.currentIMaterialbuildAssets.get(a)
    }
    clear() {
        this.waitingbuildAssets = new Dictionary
    }
    commitChanges() {
        if (!this.hasChanges)
            return null;
        var asset, id,
            addedAssets = new Dictionary,
            removedAssets = new Dictionary,
            addedCount = 0,
            removedCount = 0;

        var ccc = this.waitingbuildAssets;
        var assetArray = ccc.values();
        for (id = 0; id < assetArray.length; id++) {
            asset = assetArray[id];
        }
        if (!this.containsBuildAsset(this.currentIMaterialbuildAssets, asset)) {
            addedAssets.set(asset.get_uid(), asset);
        }
        addedCount++;

        var assetArray2 = this.currentIMaterialbuildAssets.values() || [];
        for (id = 0; id < assetArray2.length; id++)
            asset = assetArray2[id];

        if (!this.containsBuildAsset(ccc, asset)) {
            removedAssets.set(asset.get_uid(), asset);
        }
        removedCount++;

        this.waitingbuildAssets = null;
        this.previousbuildAssetStatus = this.currentIMaterialbuildAssets;
        this.currentIMaterialbuildAssets = ccc;
        var status = new AssetDictionaryStatus(addedAssets, removedAssets, addedCount, removedCount);
        return status
    }
    revertLastCommit() {
        if (!this.previousbuildAssetStatus) throw new Error("No previous commit");
        this.currentIMaterialbuildAssets = this.previousbuildAssetStatus;
        this.previousbuildAssetStatus = null;
    }
    containsBuildAsset(a, b) { return a.hasKey(b.get_uid()) }

}
class AssetPackage {
    constructor(responder) {
        if (null == responder) responder = null;
        this._responder = responder;
        this._assetsMap = {};
    }
    get droppable() { return this._droppable }
    set droppable(a) { this._droppable != a && (this._droppable = a) }
    get id() { return this._id }
    set id(a) { this._id != a && (this._id = a) }
    get name() { return this._name }
    set name(a) { this._name != a && (this._name = a) }
    get loaded() { return this._loaded }
    get assetsMap() { return this._assetsMap }
    get data() { return this._data }
    set data(a) { this._data != a && (this._data = a) }
    get async() { return this._async }
    set async(a) { this._async != a && (this._async = a) }
    get responder() { return this._responder }
    addAsset(a) {
        return this._assetsMap[a.assetId] = a, a
    }
    getAsset(a) {
        return this._assetsMap[a]
    }
    setLoaded() {
        this._loaded = true
    }
}
class BuildAssetPackage {
    constructor(a, b, c) {
        this.ownerMap = new Dictionary;
        this.disposables = [];
        this._disposable = a;
        this._content = c;
        this._buildAsset = b;
    }
    get uId() { return this._buildAsset.get_uid() }
    get content() { return this._content }
    get payload() { return this._payload }
    get buildAsset() { return this._buildAsset }
    get disposable() { return this._disposable }
    get ownerCount() { return this._ownerCount }
    addDisposable(a) { this.disposables.push(a) }
    setPayload(a) { this._payload = a }
    dispose() {
        if (!this._disposable) throw new Error("Asset " + this.uId + " is not disposable");
        for (var a = 0; a < this.disposables.length; a++) {
            var b = this.disposables[a];
            b.dispose()
        }
    }
    addOwner(a) { this.ownerMap.hasKey(a); this.ownerMap.set(a, true); this._ownerCount++; }
    removeOwner(a) {
        if (this.ownerMap.hasKey(a)) this.ownerMap.remove(a);
        this._ownerCount--;
    }

}
class MaterialDictionaryStatus {
    constructor(addedMaterials, removedMaterials, addedLength, removedLength) {
        this.addedMaterials = addedMaterials;
        this.removedMaterials = removedMaterials;
        this.addedLength = addedLength;
        this.removedLength = removedLength;
    }
}
class MaterialDictionary {
    constructor() {
        this.currentIMaterialDescriptors = new Dictionary
    }
    get hasChanges() { return null != this.waitingDescriptors }
    addDescriptors(a) {
        this.waitingDescriptors || (this.waitingDescriptors = new Dictionary);
        for (var b = a.values(), c = 0; c < b.length; c++) {
            var d = b[c];
            this.waitingDescriptors.set(d.uId, d)
        }
    }
    commitChanges() {
        if (!this.hasChanges) return null;
        var a, b;
        var waitingDescriptors = this.waitingDescriptors,
            addedMaterials = new Dictionary,
            removedMaterials = new Dictionary,
            addedLength = 0,
            removedLength = 0;
        b = waitingDescriptors.values();
        for (var j = 0; j < b.length; j++) {
            a = b[j];
            if (!this.containsDescriptor(this.currentIMaterialDescriptors, a)) {
                addedMaterials.set(a.uId, a); addedLength++;
            }
        }

        b = this.currentIMaterialDescriptors.values();
        for (var k = 0; k < b.length; k++) {
            a = b[k];
            this.containsDescriptor(waitingDescriptors, a);
            removedMaterials.set(a.uId, a); removedLength++;
        }

        this.waitingDescriptors = null;
        this.previousDescriptorStatus = this.currentIMaterialDescriptors;
        this.currentIMaterialDescriptors = waitingDescriptors;

        return new MaterialDictionaryStatus(addedMaterials, removedMaterials, addedLength, removedLength);
    }
    clear() {
        var removedLength = 0, removedMaterials = new Dictionary, descArray = this.currentIMaterialDescriptors.values();
        for (var id = 0; id < descArray.length; id++) {
            var g = descArray[id];
            removedMaterials.set(g.uId, g);
            removedLength++;
        }
        this.currentIMaterialDescriptors = new Dictionary;

        return new MaterialDictionaryStatus(null, removedMaterials, 0, removedLength)
    }
    revertLastCommit() {
        if (!this.previousDescriptorStatus) throw new Error("No previous commit");
        this.currentIMaterialDescriptors = this.previousDescriptorStatus;
        this.previousDescriptorStatus = null;
    }
    containsDescriptor(a, b) {
        return a.hasKey(b.uId)
    }
}
class MaterialRegistryStore {
    constructor() {
        this.packages = [];
        this.materialPackageMap = new Dictionary();
        this.ownerWaitingMaterialDescriptorsMap = new Dictionary();
        this.sharedAssetMaterialPackageMap = new Dictionary();
        this.sharedAssetList = [];
    }
    prepareMaterials(linkedDescriptor) {
        var dic = new Dictionary;
        this.ownerWaitingMaterialDescriptorsMap.set(linkedDescriptor.owner, dic);
        var descValues = linkedDescriptor.descriptors.values();
        for (var id = 0; id < descValues.length; id++) {
            var dsc = descValues[id];
            dic.set(dsc.uId, dsc)
        }
    }
    clearWaitingDescriptors() {
        this.ownerWaitingMaterialDescriptorsMap = new Dictionary();
    }
    getMissingMaterials() {
        var a = [], b = {}, c = this.ownerWaitingMaterialDescriptorsMap.values();
        for (var id = 0; id < c.length; id++) {
            var e = c[id], f = e.values();
            for (var i = 0; i < f.length; i++) {
                var h = f[i];
                if (b[h.uId]) this.hasPackage(h);
                b[h.uId] = true; a.push(h);
            }
        }
        return a
    }
    addPackage(a) {
        this.removeWaitingDescriptor(a.uid);
        this.materialPackageMap.set(a.uid, a);
        this.mapSharedAssetsToPackage(a);
    }
    retrieveMaterial(assemblerMaterialDescriptor, ShapeRingModelGenerator) {
        return this.retrieveMaterialByUId(assemblerMaterialDescriptor.uId, ShapeRingModelGenerator)
    }
    retrieveMaterialByUId(uId, shapeRingModelGenerator) {
        var c = this.materialPackageMap.get(uId);
        if (c) {
            c.addOwner(shapeRingModelGenerator);
            return c.materialWrapper;
        }
        else if (shapeRingModelGenerator) {
            c = shapeRingModelGenerator.materialDictionary.currentIMaterialDescriptors.get(uId);
            if (c) return new MaterialWrapper(c);
        }
        throw new Error("Material not found with uid:" + uId)
    }
    getMaterialPackageByDescriptor(a, b) {
        var c = this.materialPackageMap.get(a.uId);
        return c && c.addOwner(b), c
    }
    relaseMaterial(a, b) {
        var c = this.materialPackageMap.get(a.uId);
        c && (c.removeOwner(b), 0 == c.usageCount && (this.hasWaitingDescriptor(c.uid) || (this.materialPackageMap.remove(c.uid), c.dispose(), this.deatachAssetsFromPackage(c))))
    }
    getSharedAssetByKey(a) {
        for (var b = this.sharedAssetMaterialPackageMap.keys(), c = 0; c < b.length; c++) {
            var d = b[c];
            if (d.key == a) return d
        }
        return null
    }
    hasWaitingDescriptor(a) {
        for (var b = this.ownerWaitingMaterialDescriptorsMap.values(), c = 0; c < b.length; c++) {
            var d = b[c];
            if (d.get(a))
                return true
        }
        return false
    }
    removeWaitingDescriptor(a) {
        for (var b = this.ownerWaitingMaterialDescriptorsMap.values(), c = 0; c < b.length; c++) {
            var d = b[c];
            d.remove(a)
        }
    }
    mapSharedAssetsToPackage(a) {
        for (var b = 0; b < a.sharedAssets.length; b++) {
            var c = a.sharedAssets[b];
            this.sharedAssetMaterialPackageMap.get(c) || this.sharedAssetMaterialPackageMap.set(c, new Dictionary),
                this.sharedAssetMaterialPackageMap.get(c).set(a.uid, true)
        }
    }
    deatachAssetsFromPackage(a) {
        for (var b = this.sharedAssetMaterialPackageMap.keys(), c = 0; c < b.length; c++) {
            var d = b[c],
                e = this.sharedAssetMaterialPackageMap.get(d);
            e.get(a.uid) && e.remove(a.uid);
            var f = 0 != e.values().length;
            f || (d.dispose(), this.sharedAssetMaterialPackageMap.remove(d))
        }
    }
    hasPackage(a) {
        return null != this.materialPackageMap.get(a.uId)
    }

}
class SharedMaterialAsset {
    constructor(b, c) {
        this._key = b,
            this._content = c,
            this.disposables = [],
            SharedMaterialAsset._liveSharedAssets++
    }
    get liveSharedAssets() { return SharedMaterialAsset._liveSharedAssets };
    get key() { return this._key }
    get content() { return this._content }
    addDisposable(a) {
        if (this.disposed) throw new Error("Shared asset is already disposed");
        this.disposables.push(a)
    }
    dispose() {
        if (!this.disposed) {
            for (var b = 0; b < this.disposables.length; b++) this.disposables[b].dispose();
            this.disposed = true, this.disposables = null, this._content = null, SharedMaterialAsset._liveSharedAssets--
        }
    }
    static _liveSharedAssets = 0;
}
class MaterialAssemblerBase {
    sharedMaterialAssetStore = null;
    session = null;
    constructor() {

    }
    supportsMaterial(a) { throw new Error("supportsMaterial is an abstract method") }
    prepare(a) { }
    getLoadableAssets(a) { throw new Error("getLoadableAssets is an abstract method") }
    assemblePackage(a, b) { throw new Error("assemblePackage is an abstract method") }
    newInstance() { throw new Error("newInstance must be overriden") }
    getSharedMaterialAsset(a, b) {
        var c = this.sharedMaterialAssetStore.getSharedAssetByKey(a);
        return c && b.addSharedAsset(c), c
    }
    hasSharedMaterialAsset(a) {
        return null != this.sharedMaterialAssetStore.getSharedAssetByKey(a)
    }
}
class ConfigurableMaterialAssemblerBase extends MaterialAssemblerBase {
    constructor() {
        super();
        this.materialPropertyRegistry = new MaterialPropertyRegistry;
    }
    supportsMaterial(a) {
        if (a instanceof AssemblerMaterialDescriptor) {
            var b = a;
            return this.assemblerCompatible(b.assembler)
        }
        return false
    }
    prepare(a) {
        var b = a;
        this.materialPropertyRegistry.parseMaterialProperties(b.properties)
    }
    getAssemblerName() { throw new Error("getAssemblerName must be overriden") }
    assemblerCompatible(a) {
        return a == this.getAssemblerName()
    }
    registerProperty(a) {
        this.materialPropertyRegistry.registerProperty(a)
    }
    getNumberPropertyValue(a) {
        return this.materialPropertyRegistry.getNumberPropertyValue(a)
    }
    getBooleanPropertyValue(a) {
        return this.materialPropertyRegistry.getBooleanPropertyValue(a)
    }
    getStringPropertyValue(a) {
        return this.materialPropertyRegistry.getStringPropertyValue(a)
    }
    hasProperty(a) {
        return this.materialPropertyRegistry.hasProperty(a)
    }
    getProperty(a) {
        return this.materialPropertyRegistry.getProperty(a)
    }
}
class MaterialPropertyRegistry {
    constructor() {
        this.configurationProperties = [];
        this.configurationPropertyMap = {};
    }
    parseMaterialProperties(a) {
        var b, c, d = {};
        for (c = 0; c < a.length; c++) b = a[c], d[b.name] = b;
        var f, g = {};
        for (c = 0; c < this.configurationProperties.length; c++)
            f = this.configurationProperties[c],
                g[f.name] = f;
        for (var h in g) {
            f = g[h];
            var i = this.getMatchedMaterialProperties(f, d, true);
            if (0 == i.length && !f.hasDefaultValue && !f.optional)
                throw new ConfigurationPropertyError("Confgiguration property " + f.name + " matches no material properties and has no default value");
            i.length > 0 && f.parseMaterialProperties(i)
        }
        var j = [];
        for (var k in d) b = d[k], b.floating || j.push(b.name);
        if (j.length) throw new ConfigurationPropertyError("No configuration property found for material properties: " + j.join(", "))
    }
    registerProperty(a) {
        if (this.configurationPropertyMap[a.name])
            throw new ConfigurationPropertyError("Configuration property " + a.name + " already registered");
        this.configurationPropertyMap[a.name] = a,
            this.configurationProperties.push(a);
    }
    getNumberPropertyValue(a) {
        var b = this.getProperty(a);
        if (b)
            return b.value;
        throw new ConfigurationPropertyError("Number property name:" + a + " not found");
    }
    getBooleanPropertyValue(a) {
        var b = this.getProperty(a);
        if (b) return b.value;
        throw new ConfigurationPropertyError("Boolean property name:" + a + " not found");
    }
    getStringPropertyValue(a) {
        var b = this.getProperty(a);
        if (b) return b.value;
        throw new ConfigurationPropertyError("String property name:" + a + " not found");
    }
    hasProperty(a) {
        var b = this.getProperty(a);
        return b && (b.hasValue || b.hasDefaultValue) ? true : false;
    }
    getProperty(a) {
        return this.configurationPropertyMap[a];
    }
    getMatchedMaterialProperties(a, b, c) {
        null == c && (c = true);
        var d = [];
        for (var e in b) {
            var f = b[e];
            a.matchesProperty(f) && (d.push(f), c && delete b[f.name]);
        }
        return d;
    }
}
class TreeConfigurableMaterialAssemblerBase extends ConfigurableMaterialAssemblerBase {
    constructor() {
        super();
    }
    prepare(b) {
        var c = b;
        this.currentMaterialDescriptor = c,
            this.dependencyTree = new DependencyBuilderTree;
        this.dependencyTree.materialPropertyRegistry = this.materialPropertyRegistry;
        this.dependencyTree.sharedMaterialAssetStore = this.sharedMaterialAssetStore;
        this.dependencyTree.session = this.session;
        this.buildTree();
        this.dependencyTree.register();
        super.prepare(c);
        this.dependencyTree.prepare();
    }
    getLoadableAssets(a) {
        return this.dependencyTree.loadableAssets
    }
    assemblePackage(a, b) {
        this.dependencyTree.resourceStore = b,
            this.dependencyTree.create();
        var c = this.createMaterialPackage(a, b);
        return c.uid = a.uId,
            c.descriptor = a,
            c.addSharedAssets(this.dependencyTree.usedSharedAssets),
            c
    }
    buildTree() { }
    createMaterialPackage(a, b) {
        throw new Error("createMaterialPackage is an abstract method, you must override it")
    }
    hasPropertyValueByName(a) {
        if (this.currentMaterialDescriptor)
            for (var b = 0; b < this.currentMaterialDescriptor.properties.length; b++) {
                var c = this.currentMaterialDescriptor.properties[b];
                if (c.name == a && null != c.value && "" != c.value)
                    return true
            }
        return false
    }
}
class DependencyBuilderTree {
    materialPropertyRegistry = null;
    sharedMaterialAssetStore = null;
    session = null;
    resourceStore = null;

    constructor() {
        this.loadableAssets = [],
            this.usedSharedAssets = [],
            this.usedAssetsMap = new Dictionary,
            this.dependencies = []
    }
    addDependency(node) {
        this.dependencies.push(node),
            node.root = this;
    }
    register() {
        this.registerTreeLeafs(this.dependencies)
    }
    prepare() {
        this.prepareTreeLeafs(this.dependencies)
    }
    create() {
        this.createTreeLeafs(this.dependencies)
    }
    addLoadableAsset(a) {
        this.loadableAssets.push(a)
    }
    findSharedAsset(a) {
        var b = this.sharedMaterialAssetStore.getSharedAssetByKey(a);
        return b || (b = this.session.getData(a)), b
    }
    nodeNeedsPreparation(b) {
        var c = b.generateUId(),
            d = this.findSharedAsset(c);
        if (d) return false;
        var e = this.session.getData(c, DependencyBuilderTree.PREPARE_SESSION_KEY);
        return e ? false : true
    }
    setNodePepared(b) {
        var c = b.generateUId();
        this.session.setData(c, true, DependencyBuilderTree.PREPARE_SESSION_KEY)
    }
    registerUsedAsset(a) {
        this.addUserAssetsOnce(a)
    }
    registerCreatedAsset(a) {
        this.addUserAssetsOnce(a), this.session.setData(a.key, a)
    }
    addUserAssetsOnce(a) {
        this.usedAssetsMap.get(a.key) || (this.usedSharedAssets.push(a), this.usedAssetsMap.set(a.key, a))
    }
    registerTreeLeafs(a) {
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            this.registerTreeLeafs(c.dependencies), c.register()
        }
    }
    prepareTreeLeafs(a) {
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            c.getCreatable() && this.prepareTreeLeafs(c.dependencies);
            c.prepare()
        }
    }
    createTreeLeafs(a) {
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            c.getCreatable() && this.createTreeLeafs(c.dependencies);
            c.create()
        }
    }
    static PREPARE_SESSION_KEY = {};
    static CREATE_SESSION_KEY = {};
}

class DependencyBuilderTreeNode {
    constructor() {
        this.uidInvalid = true,
            this.dependencies = [],
            this.registeredProperties = [],
            this.propertyAliases = {};
    }
    get sharedContent() {
        var a = this.getCreatable();
        if (a) {
            var b = this.generateUId();
            return this.root.findSharedAsset(b)
        }
        return null
    }
    get root() {
        return this._root;
    }
    set root(a) {
        if (this._root != a) {
            this._root = a;
            for (var b = 0; b < this.dependencies.length; b++) {
                var c = this.dependencies[b];
                c.root = a
            }
        }
    }
    addDependency(a) {
        this.dependencies.push(a),
            a.root = this._root,
            this.uidInvalid = true
    }
    register() {
        this.registered || (this.doRegister(), this.registered = true)
    }
    prepare() {
        if (!this.prepared) {
            var a = (this.generateUId(), this.getCreatable());
            if (a) {
                var b = this._root.nodeNeedsPreparation(this);
                b && (this.doPrepare(), this.prepared = true, this._root.setNodePepared(this))
            }
            this.prepared = true
        }
    }
    create() {
        if (!this.created) {
            var a = this.generateUId(),
                b = this.getCreatable();
            if (b) {
                var c = this._root.findSharedAsset(a);
                c ? this._root.registerUsedAsset(c) : this.prepared && (c = this.doCreate(), this._root.registerCreatedAsset(c))
            }
            this.created = true
        }
    }
    getCreatedContent() {
        var a = this.generateUId();
        return this._root.findSharedAsset(a)
    }
    getCreatable() {
        throw new Error("getName is an abstract method you must override it")
    }
    getName() {
        throw new Error("getName is an abstract method you must override it")
    }
    doRegister() { }
    doPrepare() { }
    doCreate() {
        throw new Error("doCreate is an abstract method you must override it")
    }
    registerProperty(a, b) {
        null == b && (b = null),
            this.registeredProperties.push(a),
            this._root.materialPropertyRegistry.registerProperty(a),
            b && (this.propertyAliases[a.name] = b)
    }
    getProperty(a) {
        return this._root.materialPropertyRegistry.getProperty(a)
    }
    getNumberPropertyValue(a) {
        return this._root.materialPropertyRegistry.getNumberPropertyValue(a)
    }
    getStringPropertyValue(a) {
        return this._root.materialPropertyRegistry.getStringPropertyValue(a)
    }
    hasProperty(a) {
        return this._root.materialPropertyRegistry.hasProperty(a)
    }
    generateUId() {
        if (!this.uidInvalid) return this.uIdCache;
        for (var a = this.getName() + "::", b = 0; b < this.registeredProperties.length; b++) {
            var c = this.registeredProperties[b];
            if (c.hasValue || c.hasDefaultValue) {
                var d = this.propertyAliases[c.name];
                a += (d || c.name) + ":" + c.value, b + 1 < this.registeredProperties.length && (a += ",")
            }
        }
        if (this.dependencies && this.dependencies.length) {
            a += "[";
            for (var e = 0; e < this.dependencies.length; e++) {
                var f = this.dependencies[e];
                a += f.generateUId(), e + 1 < this.dependencies.length && (a += "|")
            }
            a += "]"
        }
        return this.uidInvalid = false, this.uIdCache = a, a
    }
}
class DisposeCallDisposer {
    constructor(a) {
        this.disposables = a
    }
    dispose() {
        for (var a = 0; a < this.disposables.length; a++)
            this.disposables[a].dispose()
    }
}
class TextureMaterialAssembler extends TreeConfigurableMaterialAssemblerBase {
    constructor() {
        super();
    }
    getAssemblerName() {
        return "TextureMaterialAssembler"
    }
    static newInstance() {
        return new TextureMaterialAssembler
    }
    buildTree() {
        this.textureBuilder = new TextureBuilderDependencyTreeNode(
            new StringConfigurationProperty(TextureMaterialAssembler.PROPERETY_TEXTURE_PATH, true),
            new BooleanConfigurationProperty(TextureMaterialAssembler.PROPERETY_TEXTURE_REPEAT, true, true)
        ),
            this.dependencyTree.addDependency(this.textureBuilder)
    }
    createMaterialPackage(a, b) {
        var _MeshBasicMaterial = new THREE.MeshBasicMaterial,
            _MaterialPackage = new MaterialPackage,
            e = this.textureBuilder.getCreatedContent();

        e && (_MeshBasicMaterial.map = e.content),
            _MaterialPackage.addDisposable(new DisposeCallDisposer([_MeshBasicMaterial])),
            _MaterialPackage.materialWrapper = new MaterialWrapper(_MeshBasicMaterial);
        return _MaterialPackage
    }
    static PROPERETY_TEXTURE_PATH = "texturePath";
    static PROPERETY_TEXTURE_REPEAT = "textureRepeat";
}
class PMREMCubeMapBuilderDepenecyTreeNode extends DependencyBuilderTreeNode {
    constructor(property, enablePmrem) {
        null == enablePmrem && (enablePmrem = false);
        super();
        this.property = property;
        this.enablePmremProperty = enablePmrem;
    }
    doRegister() {
        this.registerProperty(this.property, "pmremCubemap");
        this.enablePmremProperty && this.registerProperty(this.enablePmremProperty, "enablePmrem");
    }
    getCreatable() {
        return this.hasProperty(this.property.name);
    }
    doPrepare() { }
    doCreate() {
        var pathName = this.property.value,
            posx = this.getCubeBitmapImage(pathName + "-posx"),
            negx = this.getCubeBitmapImage(pathName + "-negx"),
            posy = this.getCubeBitmapImage(pathName + "-posy"),
            negy = this.getCubeBitmapImage(pathName + "-negy"),
            posz = this.getCubeBitmapImage(pathName + "-posz"),
            negz = this.getCubeBitmapImage(pathName + "-negz"),
            cubeTexture = new THREE.CubeTexture([posx, negx, posy, negy, posz, negz]);
        cubeTexture.needsUpdate = true;
        var asset, enablePmrem = this.enablePmremProperty ? this.enablePmremProperty.value : false;
        if (enablePmrem) {
            var generator = new ThreeEx.PMREMGenerator(cubeTexture);
            generator.update(WebGLGlobals.renderer);
            var uvPacker = new ThreeEx.PMREMCubeUVPacker(generator.cubeLods);
            uvPacker.update(WebGLGlobals.renderer);
            asset = new SharedMaterialAsset(this.generateUId(), uvPacker.CubeUVRenderTarget.texture);
            cubeTexture.dispose();
            generator.dispose();
            uvPacker.dispose();
            asset.addDisposable(new DisposeCallDisposer([uvPacker.CubeUVRenderTarget.texture]));
        }
        else {
            asset = new SharedMaterialAsset(this.generateUId(), cubeTexture);
            asset.addDisposable(new DisposeCallDisposer([cubeTexture]));
        }
        return asset
    }
    getName() {
        return "PmremCubeMapTexture"
    }
    getCubeBitmapImage(path) {
        var b = this._root.resourceStore,
            c = b.getResource(path).content;
        return c
    }
}
class TextureBuilderDependencyTreeNode extends DependencyBuilderTreeNode {
    constructor(b, c, d) {
        super();
        this.property = b,
            this.repeatProperty = c,
            this.generateMipMapProperty = d;
    }
    doRegister() {
        this.registerProperty(this.property, "path"),
            this.repeatProperty && this.registerProperty(this.repeatProperty, "repeat"),
            this.generateMipMapProperty && this.registerProperty(this.generateMipMapProperty, "genMipmap")
    }
    getCreatable() {
        return this.hasProperty(this.property.name)
    }
    doPrepare() {
        var a = this.property.value;
        this.textureAsset = new ImageAsset(UID.create(this), a),
            this.textureAsset.resolvePathFromBase = false,
            this._root.addLoadableAsset(this.textureAsset)
    }
    doCreate() {
        var a = this.textureAsset.content,
            texture = new THREE.Texture(a);
        texture.needsUpdate = true;
        var repeatProperty = this.repeatProperty ? this.repeatProperty.value : false,
            generateMipmaps = this.generateMipMapProperty ? this.generateMipMapProperty.value : true,
            wrapT = repeatProperty ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
        texture.wrapT = wrapT,
            texture.wrapS = wrapT,
            texture.generateMipmaps = generateMipmaps,
            generateMipmaps || (texture.magFilter = THREE.LinearFilter, texture.minFilter = THREE.LinearFilter);
        var _SharedMaterialAsset = new SharedMaterialAsset(this.generateUId(), texture);

        _SharedMaterialAsset.addDisposable(new DisposeCallDisposer([texture]));
        return _SharedMaterialAsset;
    }
    getName() {
        return "BitmapTexture"
    }
}

class ConfigurationPropertyBase {
    constructor(a, b, defVal) {
        null == b && (b = false),
            null == defVal && (defVal = null),
            this.name = a,
            this.optional = b,
            this.defaultValue = defVal,
            this.parsedValue = null;
    }
    get value() {
        return this.hasValue ? this.parsedValue : this.hasDefaultValue ? this.defaultValue : null
    }
    get hasValue() { throw new Error("hasValue must be overriden") }
    get hasDefaultValue() { throw new Error("hasDefaultValue must be overriden") }
    matchesProperty(a) {
        return this.name == a.name
    }
    parseMaterialProperties(a) {
        var b = a[0];
        if (this.materialProperty = b, "string" == typeof b.value) {
            if (!b.value) throw new Error(b.name + " has no value defined");
            if (!this.validateStringProperty(b))
                throw new Error(b.name + ":" + b.value + " is not valid for property:" + this.getClassName());
            this.parsedValue = this.convertValueStr(b.value),
                this.validateValue(this.parsedValue)
        } else {
            if (!this.valueCompatible(b.value))
                throw new Error(b.name + ":" + b.value + " is not compatible for property:" + this.getClassName());
            this.validateValue(b.value),
                this.parsedValue = b.value
        }
    }
    getClassName() {
        throw new Error("getClassName must be implemented")
    }
    valueCompatible(a) {
        throw new Error("valueCompatible must be overriden")
    }
    getStringValidatorRegExp() {
        return null
    }
    validateStringProperty(a) {
        var b = this.getStringValidatorRegExp();
        return b ? (b.lastIndex = 0, b.test(a.value)) : true
    }
    convertValueStr(a) {
        throw new Error("convertValueStr must be overriden")
    }
    validateValue(a) { }
}
class NumberConfigurationProperty extends ConfigurationPropertyBase {
    constructor(b, c, d, min, max) {
        null == c && (c = false),
            null == d && (d = NaN),
            null == min && (min = NaN),
            null == max && (max = NaN);
        super(b, c, d);
        this.parsedValue = NaN;
        this.min = min, this.max = max;
    }
    get hasValue() { return !isNaN(this.parsedValue) }
    get hasDefaultValue() { return !isNaN(this.defaultValue) }
    getClassName() {
        return "NumberConfigurationProperty"
    }
    valueCompatible(a) {
        return "number" == typeof a
    }
    getStringValidatorRegExp() {
        return NumberConfigurationProperty.VALIDATOR_REGEXP
    }
    convertValueStr(a) {
        var b = parseFloat(a);
        return b
    }
    validateValue(a) {
        if (!isNaN(this.min) && a < this.min)
            throw new ConfigurationPropertyError("property " + this.name + " is smaller then the minimum value of " + this.min);
        if (!isNaN(this.max) && a > this.max)
            throw new ConfigurationPropertyError("property " + this.name + " is bigger then the maximum value of " + this.max)
    }
    static VALIDATOR_REGEXP = /^-?\d*.?\d+$/;
}
class StringConfigurationProperty extends ConfigurationPropertyBase {
    constructor(b, c, d) {
        null == c && (c = false),
            null == d && (d = null),
            super(b, c, d);
    }
    get hasValue() { return Boolean(this.parsedValue) }
    get hasDefaultValue() { return Boolean(this.defaultValue) }
    getClassName() {
        return "StringConfigurationProperty"
    }
    valueCompatible(a) {
        return "string" == typeof a
    }
    convertValueStr(a) {
        return a
    }
}
class StringOptionsConfigurationProperty extends StringConfigurationProperty {
    constructor(b, c, d, e) {
        null == d && (d = false),
            null == e && (e = null);
        super(b, d, e);
        this.options = c;
    }
    getClassName() {
        return "StringOptionsConfigurationProperty"
    }
    validateStringProperty(a) {
        for (var b = 0; b < this.options.length; b++) {
            var c = this.options[b];
            if (c == a.value)
                return true
        }
        return false
    }
}
class BooleanConfigurationProperty extends ConfigurationPropertyBase {
    constructor(b, c, d) {
        null == c && (c = false),
            null == d && (d = null),
            super(b, c, d);
    }
    get hasValue() { return null != this.parsedValue }
    get hasDefaultValue() { return null != this.defaultValue }
    getClassName() {
        return "BooleanConfigurationProperty"
    }
    valueCompatible(a) {
        return "boolean" == typeof a
    }
    getStringValidatorRegExp() {
        return BooleanConfigurationProperty.VALIDATOR_REGEXP
    }
    convertValueStr(a) {
        return "true" == a
    }
    static VALIDATOR_REGEXP = /^(true|false)$/;
}
class ColorConfigurationProperty extends NumberConfigurationProperty {
    constructor(b, c, d) {
        null == c && (c = false),
            null == d && (d = NaN),
            super(b, c, d, 0, 4294967295);
    }
    valueCompatible(a) {
        return "number" == typeof a;
    }
    getStringValidatorRegExp() {
        return ColorConfigurationProperty.COLOR_VALIDATOR_REGEXP
    }
    convertValueStr(a) {
        var b = parseInt(a.substr(1), 16);
        return b
    }
    static COLOR_VALIDATOR_REGEXP = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
}

class CubeMapBuilderDepenecyTreeNode extends DependencyBuilderTreeNode {
    constructor(prop) {
        super();
        this.property = prop;
    }
    doRegister() {
        this.registerProperty(this.property);
    }
    getCreatable() {
        return this.hasProperty(this.property.name);
    }
    doPrepare() { }
    doCreate() {
        var a = this.property.value,
            b = this.getCubeBitmapImage(a + "-posx"),
            c = this.getCubeBitmapImage(a + "-negx"),
            d = this.getCubeBitmapImage(a + "-posy"),
            e = this.getCubeBitmapImage(a + "-negy"),
            g = this.getCubeBitmapImage(a + "-posz"),
            j = this.getCubeBitmapImage(a + "-negz"),
            cubeTexture = new THREE.CubeTexture([b, c, d, e, g, j]);
        cubeTexture.needsUpdate = true;
        var sharedMaterialAsset = new SharedMaterialAsset(this.generateUId(), cubeTexture);
        sharedMaterialAsset.addDisposable(new DisposeCallDisposer([cubeTexture]));
        return sharedMaterialAsset
    }
    getName() {
        return "CubeMapTexture"
    }
    getCubeBitmapImage(path) {
        var b = this._root.resourceStore,
            c = b.getResource(path).content;
        return c
    }
}
class MaterialWrapper {
    constructor(a) {
        this.material = a;
    }
}
class MaterialPackage {
    constructor() {
        this.usageCount = 0,
            this.ownersMap = new Dictionary,
            this.sharedAssets = [],
            this.disposables = [],
            this.materialWrapper = null;
    }
    dispose() {
        for (var a in this.disposables) {
            var b = this.disposables[a];
            b.dispose()
        }
        this.sharedAssets = null
    }
    addOwner(a) {
        this.ownersMap.get(a) || (this.ownersMap.set(a, true),
            this.usageCount++)
    }
    removeOwner(a) {
        this.ownersMap.get(a) && (this.ownersMap.remove(a), this.usageCount--)
    }
    addSharedAsset(a) {
        this.sharedAssets.push(a)
    }
    addSharedAssets(a) {
        this.sharedAssets = this.sharedAssets.concat(a)
    }
    addDisposable(a) {
        this.disposables.push(a)
    }
    addDisposables(a) {
        this.disposables = a.concat(a)
    }
}
class EngravingMaterialPackage extends MaterialPackage {
    constructor() {
        super();
        this.createdMaterialMap = new Dictionary;
    }
    get createdCount() { return this.createdMaterialMap.keys().length }
    get materialFactory() { return this._materialFactory }
    set materialFactory(a) { this._materialFactory != a && (this._materialFactory = a) }
    getOrCreateMaterial(a, b, c) {
        null == c && (c = null);
        var d = c || [];
        d.unshift(b);
        var e = this.materialFactory.apply(null, d);
        return this.createdMaterialMap.set(a, e), e
    }
    dispose() {
        super.dispose(),
            this.createdMaterialMap.dispose(),
            this._materialFactory = null
    }
}
class SingleLevelMaterialAssembler extends TreeConfigurableMaterialAssemblerBase {
    constructor() {
        super();
        this.registerProperty(new NumberConfigurationProperty(SingleLevelMaterialAssembler.PROPERTY_AMBIENT)),
            this.registerProperty(new NumberConfigurationProperty(SingleLevelMaterialAssembler.PROPERTY_SPECULAR)),
            this.registerProperty(new NumberConfigurationProperty(SingleLevelMaterialAssembler.PROPERTY_TRANSFORM_RED_OFFSET, true, 0)),
            this.registerProperty(new NumberConfigurationProperty(SingleLevelMaterialAssembler.PROPERTY_TRANSFORM_GREEN_OFFSET, true, 0)),
            this.registerProperty(new NumberConfigurationProperty(SingleLevelMaterialAssembler.PROPERTY_TRANSFORM_BLUE_OFFSET, true, 0)),
            this.registerProperty(new NumberConfigurationProperty(SingleLevelMaterialAssembler.PROPERTY_TRANSFORM_RED_MULTIPLIER, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(SingleLevelMaterialAssembler.PROPERTY_TRANSFORM_GREEN_MULTIPLIER, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(SingleLevelMaterialAssembler.PROPERTY_TRANSFORM_BLUE_MULTIPLIER, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(SingleLevelMaterialAssembler.PROPERTY_AMBIENT_OCCLUSION_ALPHA, true, 1, 0, 1)),
            this.registerProperty(new NumberConfigurationProperty(SingleLevelMaterialAssembler.PROPERTY_AMBIENT_OCCLUSION_MIN_DARKNESS, true, 0, 0, 1)),
            this.registerProperty(new BooleanConfigurationProperty(SingleLevelMaterialAssembler.PROPERTY_AMBIENT_OCCLUSION_USE_SECONDARY_UV, true, false)),
            this.registerProperty(new NumberConfigurationProperty(SingleLevelMaterialAssembler.PROPERTY_REFLECTION_ALPHA, true, 1));
    }
    getAssemblerName() {
        return "SingleLevelMaterialAssembler"
    }
    newInstance() {
        return new SingleLevelMaterialAssembler
    }
    buildTree() {
        this.aoTextureBuilder = new TextureBuilderDependencyTreeNode(new StringConfigurationProperty(SingleLevelMaterialAssembler.PROPERTY_AMBIENT_OCCLUSION_PATH, true)),
            this.dependencyTree.addDependency(this.aoTextureBuilder),
            this.normalTextureBuilder = new TextureBuilderDependencyTreeNode(new StringConfigurationProperty(SingleLevelMaterialAssembler.PROPERTY_NORMAL_MAP_PATH, true), new BooleanConfigurationProperty(SingleLevelMaterialAssembler.PROPERTY_NORMAL_MAP_REPEAT, true, true)),
            this.dependencyTree.addDependency(this.normalTextureBuilder),
            this.gradientTextureBuilder = new TextureBuilderDependencyTreeNode(new StringConfigurationProperty(SingleLevelMaterialAssembler.PROPERTY_GRADIENT_IMAGE_PATH)),
            this.dependencyTree.addDependency(this.gradientTextureBuilder),
            this.cubeMapBuilder = new CubeMapBuilderDepenecyTreeNode(new StringOptionsConfigurationProperty(SingleLevelMaterialAssembler.PROPERTY_BASEMAP_TYPE, [SingleLevelMaterialAssembler.OPTION_BASEMAP_POLISHED, SingleLevelMaterialAssembler.OPTION_BASEMAP_BLURRED])),
            this.dependencyTree.addDependency(this.cubeMapBuilder),
            this.sphereMapBuilder = new TextureBuilderDependencyTreeNode(new StringConfigurationProperty(SingleLevelMaterialAssembler.PROPERTY_SPHARE_MAP_PATH_PHYSICAL, true)),
            this.dependencyTree.addDependency(this.sphereMapBuilder)
    }
    createMaterialPackage(a, c) {
        var singleLevelShaderMaterial = new SingleLevelShaderMaterial,
            redOffset = this.getNumberPropertyValue(SingleLevelMaterialAssembler.PROPERTY_TRANSFORM_RED_OFFSET),
            greenOffset = this.getNumberPropertyValue(SingleLevelMaterialAssembler.PROPERTY_TRANSFORM_GREEN_OFFSET),
            blueOffset = this.getNumberPropertyValue(SingleLevelMaterialAssembler.PROPERTY_TRANSFORM_BLUE_OFFSET),
            redMultiplier = this.getNumberPropertyValue(SingleLevelMaterialAssembler.PROPERTY_TRANSFORM_RED_MULTIPLIER),
            greenMultiplier = this.getNumberPropertyValue(SingleLevelMaterialAssembler.PROPERTY_TRANSFORM_GREEN_MULTIPLIER),
            blueMultiplier = this.getNumberPropertyValue(SingleLevelMaterialAssembler.PROPERTY_TRANSFORM_BLUE_MULTIPLIER),
            materialPackage = new MaterialPackage,
            n = this.cubeMapBuilder.getCreatedContent();

        if (singleLevelShaderMaterial.envMap = n.content,
            0 != redOffset || 0 != greenOffset || 0 != blueOffset || 1 != redMultiplier || 1 != greenMultiplier || 1 != blueMultiplier) {
            var colorTransform = new ColorTransform;
            colorTransform.redOffset = redOffset,
                colorTransform.greenOffset = greenOffset,
                colorTransform.blueOffset = blueOffset,
                colorTransform.redMultiplier = redMultiplier,
                colorTransform.greenMultiplier = greenMultiplier,
                colorTransform.blueMultiplier = blueMultiplier,
                singleLevelShaderMaterial.colorTransform = colorTransform
        }
        var s = this.aoTextureBuilder.getCreatedContent();
        s && (singleLevelShaderMaterial.aoMap = s.content,
            singleLevelShaderMaterial.aoMapIntensity = this.getNumberPropertyValue(SingleLevelMaterialAssembler.PROPERTY_AMBIENT_OCCLUSION_ALPHA)
        );
        var t = this.normalTextureBuilder.getCreatedContent();
        t && (singleLevelShaderMaterial.normalMap = t.content);

        var u = this.gradientTextureBuilder.getCreatedContent();
        singleLevelShaderMaterial.gradientMap = u.content;

        var v = this.sphereMapBuilder.getCreatedContent();
        v && (singleLevelShaderMaterial.sphereMap = v.content);


        singleLevelShaderMaterial.updateProperties();
        materialPackage.addDisposable(new DisposeCallDisposer([singleLevelShaderMaterial]));
        materialPackage.materialWrapper = new MaterialWrapper(singleLevelShaderMaterial);
        return materialPackage;
    }
    static PROPERTY_AMBIENT_OCCLUSION_PATH = "ambientOcclusionPath";
    static PROPERTY_AMBIENT_OCCLUSION_ALPHA = "ambientOcclusionAlpha";
    static PROPERTY_AMBIENT_OCCLUSION_MIN_DARKNESS = "ambientOcclusionMinDarkness";
    static PROPERTY_AMBIENT_OCCLUSION_USE_SECONDARY_UV = "ambientOcclusionUseSecondaryUV";
    static PROPERTY_GRADIENT_IMAGE_PATH = "gradientImagePath";
    static PROPERTY_BASEMAP_TYPE = "basemapType";
    static PROPERTY_NORMAL_MAP_PATH = "normalMapPath";
    static PROPERTY_NORMAL_MAP_REPEAT = "normalMapRepeat";
    static PROPERTY_REFLECTION_ALPHA = "reflectionAlpha";
    static PROPERTY_AMBIENT = "materialAmbient";
    static PROPERTY_SPECULAR = "materialSpecular";
    static PROPERTY_SPHARE_MAP_PATH_PHYSICAL = "sphereMapPathPhysical";
    static PROPERTY_TRANSFORM_RED_OFFSET = "transformRedOffset";
    static PROPERTY_TRANSFORM_GREEN_OFFSET = "transformGreenOffset";
    static PROPERTY_TRANSFORM_BLUE_OFFSET = "transformBlueOffset";
    static PROPERTY_TRANSFORM_RED_MULTIPLIER = "transformRedMultiplier";
    static PROPERTY_TRANSFORM_GREEN_MULTIPLIER = "transformGreenMultiplier";
    static PROPERTY_TRANSFORM_BLUE_MULTIPLIER = "transformBlueMultiplier";
    static OPTION_BASEMAP_POLISHED = "polished";
    static OPTION_BASEMAP_BLURRED = "blurred";
}
class MultiLevelMaterialAssembler extends TreeConfigurableMaterialAssemblerBase {
    constructor() {
        super();
        this.registerProperty(new StringConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_BASEMAP_TYPE)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_AMBIENT_OCCLUSION_ALPHA, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_BUMP_SCALE_PHYSICAL, true, .03)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_AMBIENT, true)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_SPECULAR, true)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_ALPHA_BRIGHT, true)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_FRESNEL_POWER_BRIGHT, true)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_NORMAL_REFLECTANCE_BRIGHT, true)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_ALPHA_BLUR, true)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_FRESNEL_POWER_BLUR, true)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_NORMAL_REFLECTANCE_BLUR, true)),
            this.registerProperty(new StringConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_REFLECTION_MASK_PATH, true)),
            this.registerProperty(new ColorConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_EMISSIVE_COLOR_PHYSICAL, true, null)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_ROUGHNESS_PHYSICAL, true, .8)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_METALNESS_PHYSICAL, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_ENVMAP_INTENSITY_PHYSICAL, true, 1.8)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_EMISSIVE_INTENSITY_PHYSICAL, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_DISPLACEMNET_SCALE_PHYSICAL, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_NORMAL_SCALE_X_PHYSICAL, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_NORMAL_SCALE_Y_PHYSICAL, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_REFRACTION_RATIO_PHYSICAL, true, .98)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_TRANSFORM_RED_OFFSET, true, 0)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_TRANSFORM_GREEN_OFFSET, true, 0)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_TRANSFORM_BLUE_OFFSET, true, 0)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_TRANSFORM_RED_MULTIPLIER, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_TRANSFORM_GREEN_MULTIPLIER, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_TRANSFORM_BLUE_MULTIPLIER, true, 1));
    }
    getAssemblerName() {
        return "MultiLevelMaterialAssembler"
    }
    newInstance() {
        return new MultiLevelMaterialAssembler
    }
    buildTree() {
        this.aoTextureBuilder = new TextureBuilderDependencyTreeNode(
            new StringConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_AMBIENT_OCCLUSION_PATH, true)
        ),
            this.dependencyTree.addDependency(this.aoTextureBuilder),
            this.hasPropertyValueByName(MultiLevelMaterialAssembler.PROPERTY_BUMP_MAP_PATH_PHYSICAL)
                ?
                (this.bumpMapTextureBuilder = new TextureBuilderDependencyTreeNode(new StringConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_BUMP_MAP_PATH_PHYSICAL, true), new BooleanConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_BUMP_REPEAT_PHYSICAL, true, true)),
                    this.dependencyTree.addDependency(this.bumpMapTextureBuilder),
                    this.registerProperty(new StringConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_NORMAL_MAP_PATH, true)),
                    this.registerProperty(new BooleanConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_NORMAL_MAP_REPEAT, true, true)))
                :
                (this.normalMapTextureBuilder = new TextureBuilderDependencyTreeNode(new StringConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_NORMAL_MAP_PATH, true), new BooleanConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_NORMAL_MAP_REPEAT, true, true)),
                    this.dependencyTree.addDependency(this.normalMapTextureBuilder)),
            this.gradientTextureBuilder = new TextureBuilderDependencyTreeNode(new StringConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_GRADIENT_IMAGE_PATH), null, new BooleanConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_GRADIENT_GENERATE_MIPMAPS, true, false)),
            this.dependencyTree.addDependency(this.gradientTextureBuilder),
            this.cubeMapBuilder = new CubeMapBuilderDepenecyTreeNode(new StringConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_BASEMAP_TYPE_PHYSICAL, true, "polished")),
            this.dependencyTree.addDependency(this.cubeMapBuilder),
            this.sphereMapBuilder = new TextureBuilderDependencyTreeNode(new StringConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_SPHARE_MAP_PATH_PHYSICAL, true)),
            this.dependencyTree.addDependency(this.sphereMapBuilder),
            this.roughnessTextureBuilder = new TextureBuilderDependencyTreeNode(new StringConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_ROUGHNESS_MAP_PATH_PHYSICAL, true), new BooleanConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_ROUGHNESS_MAP_REPEAT_PHYSICAL, true, true)),
            this.dependencyTree.addDependency(this.roughnessTextureBuilder),
            this.metalnessTextureBuilder = new TextureBuilderDependencyTreeNode(new StringConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_METALNESS_MAP_PATH_PHYSICAL, true), new BooleanConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_METALNESS_MAP_REPEAT_PHYSICAL, true, true)),
            this.dependencyTree.addDependency(this.metalnessTextureBuilder),
            this.colorMapTextureBuilder = new TextureBuilderDependencyTreeNode(new StringConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_COLOR_MAP_PHYSICAL, true), new BooleanConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_COLOR_MAP_REPEAT_PHYSICAL, true, true)),
            this.dependencyTree.addDependency(this.colorMapTextureBuilder),
            this.emissiveMapTextureBuilder = new TextureBuilderDependencyTreeNode(new StringConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_EMISSIVE_MAP_PHYSICAL, true), new BooleanConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_EMISSIVE_MAP_REPEAT_PHYSICAL, true, true)),
            this.dependencyTree.addDependency(this.emissiveMapTextureBuilder),
            this.displacementMapTextureBuilder = new TextureBuilderDependencyTreeNode(new StringConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_DISPLACEMNET_MAP_PATH_PHYSICAL, true), new BooleanConfigurationProperty(MultiLevelMaterialAssembler.PROPERTY_DISPLACEMNET_MAP_REPEAT_PHYSICAL, true, true)),
            this.dependencyTree.addDependency(this.displacementMapTextureBuilder)
    }
    createMaterialPackage(a, c) {
        var redOffset = this.getNumberPropertyValue(MultiLevelMaterialAssembler.PROPERTY_TRANSFORM_RED_OFFSET),
            greenOffset = this.getNumberPropertyValue(MultiLevelMaterialAssembler.PROPERTY_TRANSFORM_GREEN_OFFSET),
            blueOffset = this.getNumberPropertyValue(MultiLevelMaterialAssembler.PROPERTY_TRANSFORM_BLUE_OFFSET),
            redMultiplier = this.getNumberPropertyValue(MultiLevelMaterialAssembler.PROPERTY_TRANSFORM_RED_MULTIPLIER),
            greenMultiplier = this.getNumberPropertyValue(MultiLevelMaterialAssembler.PROPERTY_TRANSFORM_GREEN_MULTIPLIER),
            blueMultiplier = this.getNumberPropertyValue(MultiLevelMaterialAssembler.PROPERTY_TRANSFORM_BLUE_MULTIPLIER);
        var physicalShaderMaterial = new PhysicalShaderMaterial;
        var r = this.gradientTextureBuilder.getCreatedContent(),
            s = this.cubeMapBuilder.getCreatedContent();
        physicalShaderMaterial.normalScale = new THREE.Vector2(this.getNumberPropertyValue(MultiLevelMaterialAssembler.PROPERTY_NORMAL_SCALE_X_PHYSICAL),
            this.getNumberPropertyValue(MultiLevelMaterialAssembler.PROPERTY_NORMAL_SCALE_Y_PHYSICAL)),
            physicalShaderMaterial.refractionRatio = this.getNumberPropertyValue(MultiLevelMaterialAssembler.PROPERTY_REFRACTION_RATIO_PHYSICAL),
            physicalShaderMaterial.envMapIntensity = this.getNumberPropertyValue(MultiLevelMaterialAssembler.PROPERTY_ENVMAP_INTENSITY_PHYSICAL),
            physicalShaderMaterial.envMap = s.content,
            physicalShaderMaterial.gradientMap = r.content;

        var emissiveColor = this.getNumberPropertyValue(MultiLevelMaterialAssembler.PROPERTY_EMISSIVE_COLOR_PHYSICAL);
        null != emissiveColor && (physicalShaderMaterial.emissive = new THREE.Color(emissiveColor)),
            physicalShaderMaterial.emissiveIntensity = this.getNumberPropertyValue(MultiLevelMaterialAssembler.PROPERTY_EMISSIVE_INTENSITY_PHYSICAL);

        var emissiveMap = this.emissiveMapTextureBuilder.getCreatedContent();
        emissiveMap && (physicalShaderMaterial.emissiveMap = emissiveMap.content);

        var sphereMap = this.sphereMapBuilder.getCreatedContent();
        sphereMap && (physicalShaderMaterial.sphereMap = sphereMap.content),

            physicalShaderMaterial.roughness = this.getNumberPropertyValue(MultiLevelMaterialAssembler.PROPERTY_ROUGHNESS_PHYSICAL);
        var roughnessMap = this.roughnessTextureBuilder.getCreatedContent();
        roughnessMap && (physicalShaderMaterial.roughnessMap = roughnessMap.content),

            physicalShaderMaterial.metalness = this.getNumberPropertyValue(MultiLevelMaterialAssembler.PROPERTY_METALNESS_PHYSICAL);
        var metalnessMap = this.metalnessTextureBuilder.getCreatedContent();
        metalnessMap && (physicalShaderMaterial.metalnessMap = metalnessMap.content);

        var map = this.colorMapTextureBuilder.getCreatedContent();
        map && (physicalShaderMaterial.map = map.content),

            physicalShaderMaterial.displacementScale = this.getNumberPropertyValue(MultiLevelMaterialAssembler.PROPERTY_DISPLACEMNET_SCALE_PHYSICAL);
        var displacementMap = this.displacementMapTextureBuilder.getCreatedContent();
        displacementMap && (physicalShaderMaterial.displacementMap = displacementMap.content);

        var aoMap = this.aoTextureBuilder.getCreatedContent();
        if (aoMap && (physicalShaderMaterial.aoMap = aoMap.content,
            physicalShaderMaterial.aoMapIntensity = this.getNumberPropertyValue(MultiLevelMaterialAssembler.PROPERTY_AMBIENT_OCCLUSION_ALPHA)),
            this.bumpMapTextureBuilder) {
            var bumpMap = this.bumpMapTextureBuilder.getCreatedContent();
            bumpMap && (physicalShaderMaterial.bumpMap = bumpMap.content, physicalShaderMaterial.bumpScale = this.getNumberPropertyValue(MultiLevelMaterialAssembler.PROPERTY_BUMP_SCALE_PHYSICAL))
        }
        else if (this.normalMapTextureBuilder) {
            var normalMap = this.normalMapTextureBuilder.getCreatedContent();
            normalMap && (physicalShaderMaterial.normalMap = normalMap.content)
        }
        if (0 != redOffset || 0 != greenOffset || 0 != blueOffset || 1 != redMultiplier || 1 != greenMultiplier || 1 != blueMultiplier) {
            var colorTransform = new ColorTransform;
            colorTransform.redOffset = redOffset,
                colorTransform.greenOffset = greenOffset,
                colorTransform.blueOffset = blueOffset,
                colorTransform.redMultiplier = redMultiplier,
                colorTransform.greenMultiplier = greenMultiplier,
                colorTransform.blueMultiplier = blueMultiplier,
                physicalShaderMaterial.colorTransform = colorTransform
        }
        physicalShaderMaterial.updateProperties();

        var materialPackage = new MaterialPackage;
        materialPackage.materialWrapper = new MaterialWrapper(physicalShaderMaterial);
        materialPackage.addDisposable(new DisposeCallDisposer([physicalShaderMaterial]));

        return materialPackage
    }
    static PROPERTY_AMBIENT_OCCLUSION_PATH = "ambientOcclusionPath";
    static PROPERTY_AMBIENT_OCCLUSION_ALPHA = "ambientOcclusionAlpha";
    static PROPERTY_NORMAL_MAP_PATH = "normalMapPath";
    static PROPERTY_NORMAL_MAP_REPEAT = "normalMapRepeat";
    static PROPERTY_GRADIENT_IMAGE_PATH = "gradientImagePath";
    static PROPERTY_GRADIENT_GENERATE_MIPMAPS = "gradientGenerateMipmaps";
    static PROPERTY_AMBIENT = "materialAmbient";
    static PROPERTY_SPECULAR = "materialSpecular";
    static PROPERTY_BASEMAP_TYPE = "basemapType";
    static PROPERTY_ALPHA_BRIGHT = "alphaBright";
    static PROPERTY_FRESNEL_POWER_BRIGHT = "fresnelPowerBright";
    static PROPERTY_NORMAL_REFLECTANCE_BRIGHT = "normalReflactanceBright";
    static PROPERTY_ALPHA_BLUR = "alphaBlur";
    static PROPERTY_FRESNEL_POWER_BLUR = "fresnelPowerBlur";
    static PROPERTY_NORMAL_REFLECTANCE_BLUR = "normalReflactanceBlur";
    static PROPERTY_REFLECTION_MASK_PATH = "reflectionMaskPath";
    static PROPERTY_EMISSIVE_COLOR_PHYSICAL = "emissiveColorPhysical";
    static PROPERTY_NORMAL_SCALE_X_PHYSICAL = "normalScaleXPhysical";
    static PROPERTY_NORMAL_SCALE_Y_PHYSICAL = "normalScaleYPhysical";
    static PROPERTY_BUMP_MAP_PATH_PHYSICAL = "bumpMapPathPhysical";
    static PROPERTY_BUMP_REPEAT_PHYSICAL = "bumpRepeatPhysical";
    static PROPERTY_BUMP_SCALE_PHYSICAL = "bumpScalePhysical";
    static PROPERTY_BASEMAP_TYPE_PHYSICAL = "basemapTypePhysical";
    static PROPERTY_ENVMAP_INTENSITY_PHYSICAL = "envMapIntensityPhysical";
    static PROPERTY_SPHARE_MAP_PATH_PHYSICAL = "sphereMapPathPhysical";
    static PROPERTY_ROUGHNESS_PHYSICAL = "roughnessPhysical";
    static PROPERTY_ROUGHNESS_MAP_PATH_PHYSICAL = "roughnesMapPathPhysical";
    static PROPERTY_ROUGHNESS_MAP_REPEAT_PHYSICAL = "roughnesMapRepeatPhysical";
    static PROPERTY_METALNESS_PHYSICAL = "metalnessPhysical";
    static PROPERTY_METALNESS_MAP_PATH_PHYSICAL = "metalnessMapPathPhysical";
    static PROPERTY_METALNESS_MAP_REPEAT_PHYSICAL = "metalnessMapRepeatPhysical";
    static PROPERTY_COLOR_MAP_PHYSICAL = "colorMapPhysical";
    static PROPERTY_COLOR_MAP_REPEAT_PHYSICAL = "colorMapRepeatPhysical";
    static PROPERTY_EMISSIVE_MAP_PHYSICAL = "emissiveMapPhysical";
    static PROPERTY_EMISSIVE_MAP_REPEAT_PHYSICAL = "emissiveRepeatPhysical";
    static PROPERTY_EMISSIVE_INTENSITY_PHYSICAL = "emissiveIntensityPhysical";
    static PROPERTY_DISPLACEMNET_MAP_PATH_PHYSICAL = "displacementMapPathPhysical";
    static PROPERTY_DISPLACEMNET_MAP_REPEAT_PHYSICAL = "displacementMapRepeatPhysical";
    static PROPERTY_DISPLACEMNET_SCALE_PHYSICAL = "displacementScalePhysical";
    static PROPERTY_REFRACTION_RATIO_PHYSICAL = "refractionRatioPhysical";
    static PROPERTY_TRANSFORM_RED_OFFSET = "transformRedOffset";
    static PROPERTY_TRANSFORM_GREEN_OFFSET = "transformGreenOffset";
    static PROPERTY_TRANSFORM_BLUE_OFFSET = "transformBlueOffset";
    static PROPERTY_TRANSFORM_RED_MULTIPLIER = "transformRedMultiplier";
    static PROPERTY_TRANSFORM_GREEN_MULTIPLIER = "transformGreenMultiplier";
    static PROPERTY_TRANSFORM_BLUE_MULTIPLIER = "transformBlueMultiplier";
}
class MultiLevelMaterialAssemblerGL extends TreeConfigurableMaterialAssemblerBase {
    constructor() {
        super();
        this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_AMBIENT_OCCLUSION_ALPHA, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_BUMP_SCALE, true, .03)),
            this.registerProperty(new ColorConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_EMISSIVE_COLOR, true, null)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_ROUGHNESS, true, .8)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_METALNESS, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_ENVMAP_INTENSITY, true, 1.8)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_EMISSIVE_INTENSITY, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_DISPLACEMNET_SCALE, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_NORMAL_SCALE_X, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_NORMAL_SCALE_Y, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_REFRACTION_RATIO, true, .98)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_TRANSFORM_RED_OFFSET, true, 0)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_TRANSFORM_GREEN_OFFSET, true, 0)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_TRANSFORM_BLUE_OFFSET, true, 0)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_TRANSFORM_RED_MULTIPLIER, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_TRANSFORM_GREEN_MULTIPLIER, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_TRANSFORM_BLUE_MULTIPLIER, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_MAX_BLUR, true, 7));
    }
    getAssemblerName() {
        return "MultiLevelMaterialAssemblerGL"
    }
    newInstance() {
        return new MultiLevelMaterialAssemblerGL
    }
    buildTree() {
        this.aoTextureBuilder = new TextureBuilderDependencyTreeNode(new StringConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_AMBIENT_OCCLUSION_PATH, true)),
            this.dependencyTree.addDependency(this.aoTextureBuilder),
            this.hasPropertyValueByName(MultiLevelMaterialAssemblerGL.PROPERTY_BUMP_MAP_PATH) ? (this.bumpMapTextureBuilder = new TextureBuilderDependencyTreeNode(new StringConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_BUMP_MAP_PATH, true), new BooleanConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_BUMP_REPEAT, true, true)), this.dependencyTree.addDependency(this.bumpMapTextureBuilder), this.registerProperty(new StringConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_NORMAL_MAP_PATH, true)), this.registerProperty(new BooleanConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_NORMAL_MAP_REPEAT, true, true))) : (this.normalMapTextureBuilder = new TextureBuilderDependencyTreeNode(new StringConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_NORMAL_MAP_PATH, true), new BooleanConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_NORMAL_MAP_REPEAT, true, true)),
                this.dependencyTree.addDependency(this.normalMapTextureBuilder)),
            this.gradientTextureBuilder = new TextureBuilderDependencyTreeNode(
                new StringConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_GRADIENT_IMAGE_PATH),
                null,
                new BooleanConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_GRADIENT_GENERATE_MIPMAPS, true, false)
            ),
            this.dependencyTree.addDependency(this.gradientTextureBuilder),
            this.cubeMapBuilder = new PMREMCubeMapBuilderDepenecyTreeNode(new StringConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_BASEMAP_TYPE, true, "polished"),
                new BooleanConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_ENVMAP_ENABLE_PMREM, true, false)),
            this.dependencyTree.addDependency(this.cubeMapBuilder),
            this.sphereMapBuilder = new TextureBuilderDependencyTreeNode(new StringConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_SPHARE_MAP_PATH, true)),
            this.dependencyTree.addDependency(this.sphereMapBuilder),
            this.roughnessTextureBuilder = new TextureBuilderDependencyTreeNode(new StringConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_ROUGHNESS_MAP_PATH, true), new BooleanConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_ROUGHNESS_MAP_REPEAT, true, true)),
            this.dependencyTree.addDependency(this.roughnessTextureBuilder),
            this.metalnessTextureBuilder = new TextureBuilderDependencyTreeNode(new StringConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_METALNESS_MAP_PATH, true), new BooleanConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_METALNESS_MAP_REPEAT, true, true)),
            this.dependencyTree.addDependency(this.metalnessTextureBuilder),
            this.colorMapTextureBuilder = new TextureBuilderDependencyTreeNode(new StringConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_COLOR_MAP, true), new BooleanConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_COLOR_MAP_REPEAT, true, true)),
            this.dependencyTree.addDependency(this.colorMapTextureBuilder),
            this.emissiveMapTextureBuilder = new TextureBuilderDependencyTreeNode(new StringConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_EMISSIVE_MAP, true), new BooleanConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_EMISSIVE_MAP_REPEAT, true, true)),
            this.dependencyTree.addDependency(this.emissiveMapTextureBuilder),
            this.displacementMapTextureBuilder = new TextureBuilderDependencyTreeNode(new StringConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_DISPLACEMNET_MAP_PATH, true), new BooleanConfigurationProperty(MultiLevelMaterialAssemblerGL.PROPERTY_DISPLACEMNET_MAP_REPEAT, true, true)),
            this.dependencyTree.addDependency(this.displacementMapTextureBuilder)
    }
    createMaterialPackage(a, c) {
        var redOffset = this.getNumberPropertyValue(MultiLevelMaterialAssemblerGL.PROPERTY_TRANSFORM_RED_OFFSET),
            greenOffset = this.getNumberPropertyValue(MultiLevelMaterialAssemblerGL.PROPERTY_TRANSFORM_GREEN_OFFSET),
            blueOffset = this.getNumberPropertyValue(MultiLevelMaterialAssemblerGL.PROPERTY_TRANSFORM_BLUE_OFFSET),
            redMultip = this.getNumberPropertyValue(MultiLevelMaterialAssemblerGL.PROPERTY_TRANSFORM_RED_MULTIPLIER),
            greenMultip = this.getNumberPropertyValue(MultiLevelMaterialAssemblerGL.PROPERTY_TRANSFORM_GREEN_MULTIPLIER),
            blueMultip = this.getNumberPropertyValue(MultiLevelMaterialAssemblerGL.PROPERTY_TRANSFORM_BLUE_MULTIPLIER),
            physicalShaderMaterial = new PhysicalShaderMaterial;
        var r = this.gradientTextureBuilder.getCreatedContent(),
            s = this.cubeMapBuilder.getCreatedContent();

        physicalShaderMaterial.normalScale = new THREE.Vector2(this.getNumberPropertyValue(MultiLevelMaterialAssemblerGL.PROPERTY_NORMAL_SCALE_X),
            this.getNumberPropertyValue(MultiLevelMaterialAssemblerGL.PROPERTY_NORMAL_SCALE_Y)),
            physicalShaderMaterial.refractionRatio = this.getNumberPropertyValue(MultiLevelMaterialAssemblerGL.PROPERTY_REFRACTION_RATIO),
            physicalShaderMaterial.envMapIntensity = this.getNumberPropertyValue(MultiLevelMaterialAssemblerGL.PROPERTY_ENVMAP_INTENSITY),
            physicalShaderMaterial.envMap = s.content;

        var t = this.getBooleanPropertyValue(MultiLevelMaterialAssemblerGL.PROPERTY_ENVMAP_ENABLE_PMREM);
        physicalShaderMaterial.flipEnvMap = t ? 1 : -1,
            physicalShaderMaterial.gradientMap = r.content,
            physicalShaderMaterial.maxMipLevel = this.getNumberPropertyValue(MultiLevelMaterialAssemblerGL.PROPERTY_MAX_BLUR);
        var emmisionColor = this.getNumberPropertyValue(MultiLevelMaterialAssemblerGL.PROPERTY_EMISSIVE_COLOR);
        null != emmisionColor && (physicalShaderMaterial.emissive = new THREE.Color(emmisionColor)),
            physicalShaderMaterial.emissiveIntensity = this.getNumberPropertyValue(MultiLevelMaterialAssemblerGL.PROPERTY_EMISSIVE_INTENSITY);
        var v = this.emissiveMapTextureBuilder.getCreatedContent();
        v && (physicalShaderMaterial.emissiveMap = v.content);
        var w = this.sphereMapBuilder.getCreatedContent();
        w && (physicalShaderMaterial.sphereMap = w.content), physicalShaderMaterial.roughness = this.getNumberPropertyValue(MultiLevelMaterialAssemblerGL.PROPERTY_ROUGHNESS);
        var x = this.roughnessTextureBuilder.getCreatedContent();
        x && (physicalShaderMaterial.roughnessMap = x.content), physicalShaderMaterial.metalness = this.getNumberPropertyValue(MultiLevelMaterialAssemblerGL.PROPERTY_METALNESS);
        var y = this.metalnessTextureBuilder.getCreatedContent();
        y && (physicalShaderMaterial.metalnessMap = y.content);
        var z = this.colorMapTextureBuilder.getCreatedContent();
        z && (physicalShaderMaterial.map = z.content), physicalShaderMaterial.displacementScale = this.getNumberPropertyValue(MultiLevelMaterialAssemblerGL.PROPERTY_DISPLACEMNET_SCALE);
        var A = this.displacementMapTextureBuilder.getCreatedContent();
        A && (physicalShaderMaterial.displacementMap = A.content);
        var B = this.aoTextureBuilder.getCreatedContent();
        if (B && (physicalShaderMaterial.aoMap = B.content, physicalShaderMaterial.aoMapIntensity = this.getNumberPropertyValue(MultiLevelMaterialAssemblerGL.PROPERTY_AMBIENT_OCCLUSION_ALPHA)), this.bumpMapTextureBuilder) {
            var C = this.bumpMapTextureBuilder.getCreatedContent();
            C && (physicalShaderMaterial.bumpMap = C.content, physicalShaderMaterial.bumpScale = this.getNumberPropertyValue(MultiLevelMaterialAssemblerGL.PROPERTY_BUMP_SCALE))
        }
        else if (this.normalMapTextureBuilder) {
            var D = this.normalMapTextureBuilder.getCreatedContent();
            D && (physicalShaderMaterial.normalMap = D.content)
        }
        if (0 != redOffset || 0 != greenOffset || 0 != blueOffset || 1 != redMultip || 1 != greenMultip || 1 != blueMultip) {
            var colorTransform = new ColorTransform;
            colorTransform.redOffset = redOffset,
                colorTransform.greenOffset = greenOffset,
                colorTransform.blueOffset = blueOffset, colorTransform.redMultiplier = redMultip, colorTransform.greenMultiplier = greenMultip, colorTransform.blueMultiplier = blueMultip, physicalShaderMaterial.colorTransform = colorTransform
        }

        physicalShaderMaterial.updateProperties();

        var materialPackage = new MaterialPackage;
        materialPackage.materialWrapper = new MaterialWrapper(physicalShaderMaterial);
        materialPackage.addDisposable(new DisposeCallDisposer([physicalShaderMaterial]));
        return materialPackage
    }
    static PROPERTY_AMBIENT_OCCLUSION_PATH = "ambientOcclusionPath";
    static PROPERTY_AMBIENT_OCCLUSION_ALPHA = "ambientOcclusionAlpha";
    static PROPERTY_NORMAL_MAP_PATH = "normalMapPath";
    static PROPERTY_NORMAL_MAP_REPEAT = "normalMapRepeat";
    static PROPERTY_GRADIENT_IMAGE_PATH = "gradientImagePath";
    static PROPERTY_GRADIENT_GENERATE_MIPMAPS = "gradientGenerateMipmaps";
    static PROPERTY_EMISSIVE_COLOR = "emissiveColor";
    static PROPERTY_NORMAL_SCALE_X = "normalScaleX";
    static PROPERTY_NORMAL_SCALE_Y = "normalScaleY";
    static PROPERTY_BUMP_MAP_PATH = "bumpMapPath";
    static PROPERTY_BUMP_REPEAT = "bumpRepeat";
    static PROPERTY_BUMP_SCALE = "bumpScale";
    static PROPERTY_BASEMAP_TYPE = "basemapType";
    static PROPERTY_ENVMAP_INTENSITY = "envMapIntensity";
    static PROPERTY_ENVMAP_ENABLE_PMREM = "envmapEnablePmrem";
    static PROPERTY_SPHARE_MAP_PATH = "sphereMapPath";
    static PROPERTY_ROUGHNESS = "roughness";
    static PROPERTY_ROUGHNESS_MAP_PATH = "roughnesMapPath";
    static PROPERTY_ROUGHNESS_MAP_REPEAT = "roughnesMapRepeat";
    static PROPERTY_METALNESS = "metalness";
    static PROPERTY_METALNESS_MAP_PATH = "metalnessMapPath";
    static PROPERTY_METALNESS_MAP_REPEAT = "metalnessMapRepeat";
    static PROPERTY_COLOR_MAP = "colorMap";
    static PROPERTY_COLOR_MAP_REPEAT = "colorMapRepeat";
    static PROPERTY_EMISSIVE_MAP = "emissiveMap";
    static PROPERTY_EMISSIVE_MAP_REPEAT = "emissiveRepeat";
    static PROPERTY_EMISSIVE_INTENSITY = "emissiveIntensity";
    static PROPERTY_DISPLACEMNET_MAP_PATH = "displacementMapPath";
    static PROPERTY_DISPLACEMNET_MAP_REPEAT = "displacementMapRepeat";
    static PROPERTY_DISPLACEMNET_SCALE = "displacementScale";
    static PROPERTY_REFRACTION_RATIO = "refractionRatio";
    static PROPERTY_MAX_BLUR = "maxBlur";
    static PROPERTY_TRANSFORM_RED_OFFSET = "transformRedOffset";
    static PROPERTY_TRANSFORM_GREEN_OFFSET = "transformGreenOffset";
    static PROPERTY_TRANSFORM_BLUE_OFFSET = "transformBlueOffset";
    static PROPERTY_TRANSFORM_RED_MULTIPLIER = "transformRedMultiplier";
    static PROPERTY_TRANSFORM_GREEN_MULTIPLIER = "transformGreenMultiplier";
    static PROPERTY_TRANSFORM_BLUE_MULTIPLIER = "transformBlueMultiplier";
}
class MultiShaderDiamondMaterialAssembler extends TreeConfigurableMaterialAssemblerBase {
    constructor() {
        super();
        this.registerProperty(new NumberConfigurationProperty(MultiShaderDiamondMaterialAssembler.PROPERTY_TRIANGLES_SCALE, false, 1));
        this.registerProperty(new BooleanConfigurationProperty(MultiShaderDiamondMaterialAssembler.PROPERTY_COLORIZE_ALL, false, false));
    }
    getAssemblerName() {
        return "DiamondMaterialAssembler";
    }
    newInstance() {
        return new MultiShaderDiamondMaterialAssembler;
    }
    buildTree() {
        this.gradientMapBuilder = new TextureBuilderDependencyTreeNode(
            new StringConfigurationProperty(MultiShaderDiamondMaterialAssembler.PROPERTY_GRADIENT_MAP_PATH, true),
            null,
            new BooleanConfigurationProperty(MultiShaderDiamondMaterialAssembler.PROPERTY_GRADIENT_GENERATE_MIPMAPS, true, false)
        ),
            this.dependencyTree.addDependency(this.gradientMapBuilder),
            this.highlightMapBuilder = new TextureBuilderDependencyTreeNode(
                new StringConfigurationProperty(MultiShaderDiamondMaterialAssembler.PROPERTY_HIGHLIGHT_MAP_PATH, false)
            ),
            this.dependencyTree.addDependency(this.highlightMapBuilder),
            this.sparkleMapBuilder = new TextureBuilderDependencyTreeNode(
                new StringConfigurationProperty(MultiShaderDiamondMaterialAssembler.PROPERTY_SPARKLE_MAP_PATH, false)
            ),
            this.dependencyTree.addDependency(this.sparkleMapBuilder),
            this.sphereMapBottomBuilder = new TextureBuilderDependencyTreeNode(
                new StringConfigurationProperty(MultiShaderDiamondMaterialAssembler.PROPERTY_SPHERE_MAP_BOTTOM_PATH, false)
            ),
            this.dependencyTree.addDependency(this.sphereMapBottomBuilder),
            this.trianglesBottomMapBuilder = new TextureBuilderDependencyTreeNode(
                new StringConfigurationProperty(MultiShaderDiamondMaterialAssembler.PROPERTY_TRIANGLES_BOTTOM_MAP_PATH, false),
                new BooleanConfigurationProperty(MultiShaderDiamondMaterialAssembler.PROPERTY_TRIANGLES_BOTTOM_MAP_REPEAT, false, true)
            ),
            this.dependencyTree.addDependency(this.trianglesBottomMapBuilder),
            this.trianglesTopMapBuilder = new TextureBuilderDependencyTreeNode(
                new StringConfigurationProperty(MultiShaderDiamondMaterialAssembler.PROPERTY_TRIANGLES_TOP_MAP_PATH, false),
                new BooleanConfigurationProperty(MultiShaderDiamondMaterialAssembler.PROPERTY_TRIANGLES_TOP_MAP_REPEAT, false, true)
            ),
            this.dependencyTree.addDependency(this.trianglesTopMapBuilder),
            this.fireMapBuilder = new TextureBuilderDependencyTreeNode(
                new StringConfigurationProperty(MultiShaderDiamondMaterialAssembler.PROPERTY_FIRE_MAP_PATH, false),
                new BooleanConfigurationProperty(MultiShaderDiamondMaterialAssembler.PROPERTY_FIRE_MAP_REPEAT, false, true)
            ),
            this.dependencyTree.addDependency(this.fireMapBuilder)
    }
    createMaterialPackage(a, c) {
        var gradient = this.gradientMapBuilder.getCreatedContent(),
            triangleScale = this.getNumberPropertyValue(MultiShaderDiamondMaterialAssembler.PROPERTY_TRIANGLES_SCALE),
            colorizeAll = this.getBooleanPropertyValue(MultiShaderDiamondMaterialAssembler.PROPERTY_COLORIZE_ALL);

        var diamondComplexShaderMaterialBottom = new DiamondComplexShaderMaterialBottom();
        (diamondComplexShaderMaterialBottom.transparent = true),
            (diamondComplexShaderMaterialBottom.side = THREE.BackSide),
            (diamondComplexShaderMaterialBottom.uniforms.sphereMap.value = this.sphereMapBottomBuilder.getCreatedContent().content),
            (diamondComplexShaderMaterialBottom.uniforms.triangles.value = this.trianglesBottomMapBuilder.getCreatedContent().content),
            (diamondComplexShaderMaterialBottom.colorizeAll = colorizeAll),
            (diamondComplexShaderMaterialBottom.uniforms.triangleScale.value = triangleScale);

        var diamondComplexShaderMaterialTop = new DiamondComplexShaderMaterialTop();
        (diamondComplexShaderMaterialTop.transparent = true),
            (diamondComplexShaderMaterialTop.side = THREE.FrontSide),
            (diamondComplexShaderMaterialTop.uniforms.highlightMap.value = this.highlightMapBuilder.getCreatedContent().content),
            (diamondComplexShaderMaterialTop.uniforms.sparkleMap.value = this.sparkleMapBuilder.getCreatedContent().content),
            (diamondComplexShaderMaterialTop.uniforms.triangles.value = this.trianglesTopMapBuilder.getCreatedContent().content),
            (diamondComplexShaderMaterialTop.uniforms.fire.value = this.fireMapBuilder.getCreatedContent().content),
            (diamondComplexShaderMaterialTop.colorizeAll = colorizeAll),
            (diamondComplexShaderMaterialTop.uniforms.triangleScale.value = triangleScale),
            gradient &&
            ((diamondComplexShaderMaterialBottom.uniforms.gradient.value =
                gradient.content),
                (diamondComplexShaderMaterialTop.uniforms.gradient.value =
                    gradient.content));

        var multiShaderMaterial = new MultiShaderMaterial;
        multiShaderMaterial.transparent = false;//true;//kkk todo todo
        multiShaderMaterial.shaderMaterials = [diamondComplexShaderMaterialBottom,
            diamondComplexShaderMaterialTop];

        var materialPackage = new MaterialPackage;

        materialPackage.materialWrapper = new MaterialWrapper(multiShaderMaterial);
        materialPackage.addDisposable(new DisposeCallDisposer([multiShaderMaterial]));

        return materialPackage;
    }
    static PROPERTY_HIGHLIGHT_MAP_PATH = "highlightMapPath";
    static PROPERTY_SPARKLE_MAP_PATH = "sparkleMapPath";
    static PROPERTY_SPHERE_MAP_BOTTOM_PATH = "sphereMapBottomPath";
    static PROPERTY_GRADIENT_MAP_PATH = "gradientMapPath";
    static PROPERTY_GRADIENT_GENERATE_MIPMAPS = "gradientGenerateMipmaps";
    static PROPERTY_COLORIZE_ALL = "colorizeAll";
    static PROPERTY_TRIANGLES_BOTTOM_MAP_PATH = "trianglesBottomMapPath";
    static PROPERTY_TRIANGLES_BOTTOM_MAP_REPEAT = "trianglesBottomMapRepeat";
    static PROPERTY_TRIANGLES_TOP_MAP_PATH = "trianglesTopMapPath";
    static PROPERTY_TRIANGLES_TOP_MAP_REPEAT = "trianglesTopMapRepeat";
    static PROPERTY_TRIANGLES_SCALE = "trianglesScale";
    static PROPERTY_FIRE_MAP_PATH = "fireMapPath";
    static PROPERTY_FIRE_MAP_REPEAT = "fireMapRepeat";
}
class EngravingMaterialAssembler extends TreeConfigurableMaterialAssemblerBase {
    constructor() {
        super();
        this.registerProperty(new NumberConfigurationProperty(EngravingMaterialAssembler.PROPERTY_AMBIENT)),
            this.registerProperty(new NumberConfigurationProperty(EngravingMaterialAssembler.PROPERTY_SPECULAR)),
            this.registerProperty(new StringConfigurationProperty(EngravingMaterialAssembler.PROPERTY_BASEMAP_TYPE, true)),
            this.registerProperty(new NumberConfigurationProperty(EngravingMaterialAssembler.PROPERTY_REFLECTION_ALPHA, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(EngravingMaterialAssembler.PROPERTY_TRANSFORM_RED_OFFSET, true, 0)),
            this.registerProperty(new NumberConfigurationProperty(EngravingMaterialAssembler.PROPERTY_TRANSFORM_GREEN_OFFSET, true, 0)),
            this.registerProperty(new NumberConfigurationProperty(EngravingMaterialAssembler.PROPERTY_TRANSFORM_BLUE_OFFSET, true, 0)),
            this.registerProperty(new NumberConfigurationProperty(EngravingMaterialAssembler.PROPERTY_NORMAL_SCALE_X_PHYSICAL, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(EngravingMaterialAssembler.PROPERTY_NORMAL_SCALE_Y_PHYSICAL, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(EngravingMaterialAssembler.PROPERTY_TRANSFORM_RED_MULTIPLIER, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(EngravingMaterialAssembler.PROPERTY_TRANSFORM_GREEN_MULTIPLIER, true, 1)),
            this.registerProperty(new NumberConfigurationProperty(EngravingMaterialAssembler.PROPERTY_TRANSFORM_BLUE_MULTIPLIER, true, 1));
    }
    getAssemblerName() {
        return "EngravingMaterialAssembler"
    }
    newInstance() {
        return new EngravingMaterialAssembler
    }
    buildTree() {
        this.gradientTextureBuilder = new TextureBuilderDependencyTreeNode(
            new StringConfigurationProperty(EngravingMaterialAssembler.PROPERTY_GRADIENT_IMAGE_PATH),
            null,
            new BooleanConfigurationProperty(EngravingMaterialAssembler.PROPERTY_GRADIENT_GENERATE_MIPMAPS, true, false)
        );
        this.dependencyTree.addDependency(this.gradientTextureBuilder);
        this.normalImageBuilder = new TextureBuilderDependencyTreeNode(
            new StringConfigurationProperty(EngravingMaterialAssembler.PROPERTY_NORMAL_IMAGE_PATH, true),
            new BooleanConfigurationProperty(EngravingMaterialAssembler.PROPERTY_NORMAL_IMAGE_REPEAT, true, false)
        );
        this.dependencyTree.addDependency(this.normalImageBuilder),
            this.maskImageBuilder = new TextureBuilderDependencyTreeNode(
                new StringConfigurationProperty(EngravingMaterialAssembler.PROPERTY_MASK_IMAGE_PATH, true),
                new BooleanConfigurationProperty(EngravingMaterialAssembler.PROPERTY_MASK_IMAGE_REPEAT, true, false)
            );
        this.dependencyTree.addDependency(this.maskImageBuilder);
        this.cubeMapBuilder = new CubeMapBuilderDepenecyTreeNode(
            new StringConfigurationProperty(EngravingMaterialAssembler.PROPERTY_BASEMAP_TYPE_PHYSICAL, true, "polished")
        );
        this.dependencyTree.addDependency(this.cubeMapBuilder);
    }
    createMaterialPackage(a, c) {
        var
            redOffset = this.getNumberPropertyValue(EngravingMaterialAssembler.PROPERTY_TRANSFORM_RED_OFFSET),
            greenOffset = this.getNumberPropertyValue(EngravingMaterialAssembler.PROPERTY_TRANSFORM_GREEN_OFFSET),
            blueOffset = this.getNumberPropertyValue(EngravingMaterialAssembler.PROPERTY_TRANSFORM_BLUE_OFFSET),
            redMultiplier = this.getNumberPropertyValue(EngravingMaterialAssembler.PROPERTY_TRANSFORM_RED_MULTIPLIER),
            greenMultiplier = this.getNumberPropertyValue(EngravingMaterialAssembler.PROPERTY_TRANSFORM_GREEN_MULTIPLIER),
            blueMultiplier = this.getNumberPropertyValue(EngravingMaterialAssembler.PROPERTY_TRANSFORM_BLUE_MULTIPLIER);
        var cubeMap = this.cubeMapBuilder.getCreatedContent();
        var gradient = this.gradientTextureBuilder.getCreatedContent();
        var engravingMaterialPackage = new EngravingMaterialPackage;
        var MaterialFactory = (engravingImage, mapArray) => {
            null == mapArray && (mapArray = []);
            var singleLevelShaderMaterial = new SingleLevelShaderMaterial;
            singleLevelShaderMaterial.colorTransform = new ColorTransform;
            singleLevelShaderMaterial.colorTransform.redOffset = redOffset;
            singleLevelShaderMaterial.colorTransform.greenOffset = greenOffset;
            singleLevelShaderMaterial.colorTransform.blueOffset = blueOffset;
            singleLevelShaderMaterial.colorTransform.redMultiplier = redMultiplier;
            singleLevelShaderMaterial.colorTransform.greenMultiplier = greenMultiplier;
            singleLevelShaderMaterial.colorTransform.blueMultiplier = blueMultiplier;

            var alphaMap = mapArray[1];
            if (alphaMap == null && engravingImage != null) {
                alphaMap = new THREE.Texture(engravingImage.texture);
                alphaMap.wrapS = THREE.RepeatWrapping;
                alphaMap.wrapT = THREE.RepeatWrapping;
                alphaMap.needsUpdate = true;
            }
            singleLevelShaderMaterial.color = new THREE.Color(0xFFFFFF);
            singleLevelShaderMaterial.alphaMap = alphaMap;
            singleLevelShaderMaterial.wireframe = false;
            singleLevelShaderMaterial.transparent = true;
            singleLevelShaderMaterial.envMap = cubeMap.content;
            singleLevelShaderMaterial.gradientMap = gradient.content;

            var normalMap = mapArray[0];
            if (normalMap) {
                singleLevelShaderMaterial.normalMap = normalMap;
            }
            else {
                if (engravingImage.normalMap) {
                    normalMap = new THREE.Texture(engravingImage.normalMap);
                    normalMap.wrapS = THREE.RepeatWrapping;
                    normalMap.wrapT = THREE.RepeatWrapping;
                    normalMap.needsUpdate = true;
                    singleLevelShaderMaterial.normalMap = normalMap;
                }
            }
            singleLevelShaderMaterial.normalScale = new THREE.Vector2(
                this.getNumberPropertyValue(EngravingMaterialAssembler.PROPERTY_NORMAL_SCALE_X_PHYSICAL),
                this.getNumberPropertyValue(EngravingMaterialAssembler.PROPERTY_NORMAL_SCALE_Y_PHYSICAL)
            );
            singleLevelShaderMaterial.updateProperties();
            engravingMaterialPackage.addDisposable(new DisposeCallDisposer([singleLevelShaderMaterial, alphaMap]));
            if (engravingImage && engravingImage.normalMap)
                engravingMaterialPackage.addDisposable(new DisposeCallDisposer([normalMap]));
            return singleLevelShaderMaterial
        };
        engravingMaterialPackage.materialFactory = MaterialFactory;
        var textureImagePath = this.normalImageBuilder.getCreatedContent(),
            maskImagePath = this.maskImageBuilder.getCreatedContent();
        if (textureImagePath && maskImagePath) {
            var w = MaterialFactory(null, [textureImagePath.content, maskImagePath.content]);
            engravingMaterialPackage.materialWrapper = new MaterialWrapper(w);
            engravingMaterialPackage.addDisposable(new DisposeCallDisposer([w]));
        }
        else if (!textureImagePath && maskImagePath || textureImagePath && !maskImagePath)
            throw new Error("both 'textureImagePath' and 'maskImagePath' must be set");

        return engravingMaterialPackage
    }
    static PROPERTY_GRADIENT_IMAGE_PATH = "gradientImagePath";
    static PROPERTY_GRADIENT_GENERATE_MIPMAPS = "gradientGenerateMipmaps";
    static PROPERTY_BASEMAP_TYPE = "basemapType";
    static PROPERTY_NORMAL_IMAGE_PATH = "normalImagePath";
    static PROPERTY_NORMAL_IMAGE_REPEAT = "normalImageRepeat";
    static PROPERTY_MASK_IMAGE_PATH = "maskImagePath";
    static PROPERTY_MASK_IMAGE_REPEAT = "maskImageRepeat";
    static PROPERTY_REFLECTION_ALPHA = "reflectionAlpha";
    static PROPERTY_AMBIENT = "materialAmbient";
    static PROPERTY_SPECULAR = "materialSpecular";
    static PROPERTY_TRANSFORM_RED_OFFSET = "transformRedOffset";
    static PROPERTY_TRANSFORM_GREEN_OFFSET = "transformGreenOffset";
    static PROPERTY_TRANSFORM_BLUE_OFFSET = "transformBlueOffset";
    static PROPERTY_TRANSFORM_RED_MULTIPLIER = "transformRedMultiplier";
    static PROPERTY_TRANSFORM_GREEN_MULTIPLIER = "transformGreenMultiplier";
    static PROPERTY_TRANSFORM_BLUE_MULTIPLIER = "transformBlueMultiplier";
    static PROPERTY_BASEMAP_TYPE_PHYSICAL = "basemapTypePhysical";
    static PROPERTY_NORMAL_SCALE_X_PHYSICAL = "normalScaleXPhysical";
    static PROPERTY_NORMAL_SCALE_Y_PHYSICAL = "normalScaleYPhysical";
}
class DataStoreSession {
    constructor() {
        this.sessionStore = new Dictionary;
    }
    setData(a, b, c) {
        null == c && (c = null);
        c ? (this.sessionStore.get(c) || this.sessionStore.set(c, new Dictionary), this.sessionStore.get(c).set(a, b)) : this.sessionStore.set(a, b)
    }
    getData(a, b) {
        if (null == b && (b = null), b) {
            var c = this.sessionStore.get(b);
            return c ? c.get(a) : null
        }
        return this.sessionStore.get(a)
    }
    clear() {
        this.sessionStore = new Dictionary
    }
}
class MaterialAssemblerFactory {
    constructor() {
        this.assemblers = [];
    }
    addAssembler(a) {
        this.assemblers.push(a);
    }
    getAssembler(a) {
        for (var b = 0; b < this.assemblers.length; b++) {
            var c = this.assemblers[b];
            if (c.supportsMaterial(a))
                return c.newInstance()
        }
        throw new Error("Assembler not found for material: " + a);
    }
}
class AssemblerMaterialRegistry extends EventDispatcher {
    constructor() {
        super();
        this.autoCommit = true;
        this.dictionaryTimoutCaller = new TimeoutCaller(200, this);
        this.responders = [];
        this.materialStore = new MaterialRegistryStore;
        this.materialAssemblerFactory = new MaterialAssemblerFactory;
        this.assemblerDescriptorMap = new Dictionary;
        this.waitingAssemblers = [];
        this.dataStoreSession = new DataStoreSession;
        this.materialPackageResponder = new Responder((a) => { this.onMaterialPackageLoaded(a) }, (a) => { this.onMaterialPackageLoadFailed(a) }, this);
    }
    addAssembler(assembler) {
        this.materialAssemblerFactory.addAssembler(assembler)
    }
    prepareMaterials(addedMaterials, responder, owner) {
        return this.loadingInProgress ? this.addToPending(addedMaterials, responder, owner) :
            (this.materialStore.prepareMaterials(new LinkedDescriptors(addedMaterials, owner)),
                this.responders.push(responder),
                this.autoCommit && this.dictionaryTimoutCaller.call(() => {
                    try {
                        this.commitChanges()
                    }
                    catch (a) {
                        var b = new FaultErrorEvent(FaultErrorEvent.ERROR, Fault.fromError(a));
                        this.dispatchEvent(b)
                    }
                })
            )
    }
    relaseMaterials(a, b) {
        for (var c = a.values(), d = 0; d < c.length; d++) {
            var e = c[d];
            this.materialStore.relaseMaterial(e, b)
        }
    }
    getMaterialByDescriptor(a, b) {
        return this.materialStore.retrieveMaterial(a, b)
    }
    getMaterialByDescriptorUId(a, b) {
        return this.materialStore.retrieveMaterialByUId(a, b)
    }
    getMaterialPackageByDescriptor(a, b) {
        return this.materialStore.getMaterialPackageByDescriptor(a, b)
    }
    commitChanges() {
        this.dictionaryTimoutCaller.clear();
        var a = this.processMissingMaterials();
        a || this.callIfPending();
        return a;
    }
    processMissingMaterials() {
        this.loadingInProgress = true;
        try {
            var missedMaterials = this.materialStore.getMissingMaterials();
            if (missedMaterials.length) {
                var assetPkg = new AssetPackage(this.materialPackageResponder);
                assetPkg.async = true;
                assetPkg.name = "ring-materials";
                this.dataStoreSession.clear();
                for (var id = 0; id < missedMaterials.length; id++) {
                    var d = missedMaterials[id],
                        e = this.materialAssemblerFactory.getAssembler(d);
                    e.sharedMaterialAssetStore = this.materialStore,
                        e.session = this.dataStoreSession,
                        this.assemblerDescriptorMap.set(e, d),
                        this.waitingAssemblers.push(e),
                        e.prepare(d);
                    var assetArray = e.getLoadableAssets(d);
                    if (assetArray)
                        for (var i = 0; i < assetArray.length; i++) {
                            var asset = assetArray[i];
                            asset.data = e, assetPkg.addAsset(asset)
                        }
                }
                this.assetModel.loadPackage(assetPkg);
                return true;
            }
            this.callResponders();
            this.loadingInProgress = false;
            return false;
        }
        catch (err) {
            this.cleanAfterError();
            this.callRespondersFault(Fault.fromError(err));
            this.loadingInProgress = false;
            throw err;
        }
    }
    callResponders() {
        for (var i = 0; i < this.responders.length; i++) {
            var responder = this.responders[i];
            responder.result([]);
        }
        this.responders.splice(0, this.responders.length);
    }
    callRespondersFault(a) {
        for (var b = 0; b < this.responders.length; b++) {
            var c = this.responders[b];
            c.fault([a]);
        }
        this.responders.splice(0, this.responders.length);
    }
    cleanAfterError() {
        this.assemblerDescriptorMap = new Dictionary;
        this.waitingAssemblers = [];
        this.materialStore.clearWaitingDescriptors();
    }
    addToPending(a, b, c) {
        this.pendingDescriptors ||
            (this.pendingDescriptors = []),
            this.pendingResponders || (this.pendingResponders = []),
            this.pendingDescriptors.push(new LinkedDescriptors(a, c)),
            this.pendingResponders.push(b),
            this.hasPendingItems = true;
    }
    callIfPending() {
        if (this.hasPendingItems) {
            for (var a = 0; a < this.pendingDescriptors.length; a++) {
                var linkedDesc = this.pendingDescriptors[a];
                this.materialStore.prepareMaterials(linkedDesc)
            }
            this.responders = this.pendingResponders,
                this.pendingResponders = null,
                this.pendingDescriptors = null,
                this.hasPendingItems = false;
            try { this.commitChanges() } catch (c) {
                var d = new FaultErrorEvent(FaultErrorEvent.ERROR, Fault.fromError(c));
                this.dispatchEvent(d)
            }
        }
    }
    onMaterialPackageLoaded(a) {
        try {
            for (var id = 0; id < this.waitingAssemblers.length; id++) {
                var c = this.waitingAssemblers[id],
                    d = this.assemblerDescriptorMap.get(c),
                    e = c.assemblePackage(d, this.resourceStore);
                this.materialStore.addPackage(e);
            }
            this.callResponders();
            this.assemblerDescriptorMap = new Dictionary;
            this.waitingAssemblers = [];
        }
        catch (err) {
            this.cleanAfterError();
            var fault = Fault.fromError(err);
            this.callRespondersFault(fault);
            var errEvent = new FaultErrorEvent(FaultErrorEvent.ERROR, fault);
            this.dispatchEvent(errEvent)
        }
        this.loadingInProgress = false;
        this.callIfPending()
    }
    onMaterialPackageLoadFailed(a) {
        this.cleanAfterError();
        this.callRespondersFault(a);
        var b = new FaultErrorEvent(FaultErrorEvent.ERROR, a);
        this.dispatchEvent(b), this.loadingInProgress = false
    }

}

export {
    Dictionary, AssetDictionary, AssetPackage, BuildAssetPackage,
    MaterialDictionary, MaterialDictionaryStatus, EngravingMaterialPackage,
    TextureMaterialAssembler, AssemblerMaterialRegistry, SingleLevelMaterialAssembler,
    MultiLevelMaterialAssembler, MultiLevelMaterialAssemblerGL, EngravingMaterialAssembler,
    MultiShaderDiamondMaterialAssembler, DisposeCallDisposer
};