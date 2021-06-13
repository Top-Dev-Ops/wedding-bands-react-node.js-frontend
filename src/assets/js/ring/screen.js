/* eslint-disable no-unused-expressions */
import jQuery from 'jquery';
import * as THREE from 'three';
import * as ThreeEx from './threeEx.js'
import gsap from 'gsap';

import { isMobile } from 'react-device-detect';

import { ColorUtils } from './color';
import {
    CallbackCounter, Timer, TaskQue, UID,
    SettingsKeys, InstanceRegistry, TimeoutCaller, WebGLGlobals
} from "./basic.js"
import {
    MaterialDictionary, TextureMaterialAssembler, AssemblerMaterialRegistry, SingleLevelMaterialAssembler,
    MultiLevelMaterialAssembler, MultiLevelMaterialAssemblerGL, EngravingMaterialAssembler, MultiShaderDiamondMaterialAssembler, DisposeCallDisposer
} from "./assembler.js"
import {
    Event, FaultErrorEvent, TimerEvent,
    AssetEvent, ResourceEvent, EventDispatcher
} from './event.js'
import {
    MaterialMappingAsset, HibridModelManager, LoadableMaterialAssetFactory, Skinnable3DModel,
    HandViewModel, ConfiguratorModel, AssetModel, SettingsModel, DataModel
} from "./model.js"
import {
    Fault
} from "./error.js"
import {
    Point, Vector3D, Matrix, MatrixHelper, RectLayoutElement, Matrix3D, Rectangle
} from "./geometry.js"
import {
    X_AXIS, Y_AXIS, Z_AXIS
} from "./geometry.js"
import {
    GeomUtils
} from "./util.js"
import {
    HorizontalRectLayout
} from "./layout.js"
import {
    BuildAssetRegistry,
} from "./built.js"
import {
    MultiShaderMaterial, diamondcomplex_sparkle_frag, diamondcomplex_sparkle_vert
} from "./glsl.js"
import {
    MathConsts, BlendMode, CoordinateSystemPlane, HandSnapshotConfigParser
} from "./meta.js"
import {
    CapMeshMeta, DiamondMeta, DiamondMetaValue, EngravingMeta, EngravingMetaValue, GrooveMeta, SegmentMeta,
    ShapeRingConfig, ModelRingConfig, ShapeRingSceneConfig, DiagonalDiamondChannelConfigTransformer,
    HorizontalGrooveConfigTransformer, Memoire5ConfigTransformer, Memoire6ConfigTransformer,
    HibridRingSceneConfig, HibridRingSceneConfigParser, HandSceneConfig
} from "./meta.js"
import {
    View3DConfig, HandViewConfig
} from "./config.js"
import {
    Responder, RescourceNames, Delegate, XMLValueParser, Path
} from "./loader.js"
import { TestConfig } from "./const.js"
import {
    PropertySetter, PropertyOverrideHandler, MouseEventDelegate, HoverController, MouseHoverController,
    ConfigurableMouseHoverController, ModelMouseRotator, ConfigurableModelMouseRotator, RequestAnimationFrame
} from "./control.js"
import $ from 'jquery';

class Screen3D {
    constructor(container, scaleRatio) {
        this.scaleRatio = scaleRatio;
        this.updateFlagDirty = true;
        this.cameraFar = 1000;
        this.cameraNear = 0.1;
        this.cameraFieldOfView = 40;
        this.autoUpdate = true;
        this.width = 500;
        this.height = 500;

        this.camera = new THREE.PerspectiveCamera(this.cameraFieldOfView, this.width / this.height, this.cameraNear, this.cameraFar);
        this.screenScene = new THREE.Scene;
        this.renderer = this.createWebGLRenderer();
        this.renderer.setPixelRatio(scaleRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.autoClear = false;
        this.renderer.domElement.oncontextmenu = (a) => {
            return a.preventDefault(), false
        };
        container.appendChild(this.renderer.domElement);

        WebGLGlobals.renderer = this.renderer;
    }
    setCameraController(a) {
        this.cameraController = a;
        a.setTargetObject(this.camera);
        a.update(false);
        this.updateCamera();
        this.updateFlagDirty = true;
    }
    setShaderPasses(renderArray, bNoAddRenderPass) {
        null == bNoAddRenderPass && (bNoAddRenderPass = false);
        this.composer = new ThreeEx.EffectComposer(this.renderer);
        bNoAddRenderPass || this.composer.addPass(new ThreeEx.RenderPass(this.screenScene, this.camera));
        for (var c = 0; c < renderArray.length; c++) {
            var d = renderArray[c];
            this.composer.addPass(d)
        }
        this.composer.setSize(this.width, this.height)
    }
    setLightPicker(a) {
        this.lightPicker = a
    }
    stepToNextFrame() {
        this.cameraController && this.cameraController.update();
        var a = this.updateFlagDirty || this.autoUpdate;
        this.updateFlagDirty = false, a && this.update()
    }
    updateOnNextFrame() {
        this.updateFlagDirty = true;
    }
    update() { this.render() }
    updateCamera() {
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }
    setSize(a, b) {
        (this.width != a || this.height != b) && (this.width = a, this.height = b, this.camera.aspect = a / b, this.camera.updateProjectionMatrix(), this.renderer.setSize(a, b), this.composer && this.composer.setSize(a, b), this.updateFlagDirty = true)
    }
    createWebGLRenderer() {
        return new ExtendedWebGLRenderer({ antialias: true, alpha: true });
    }
    render() {
        try {
            this.cameraController && this.cameraController.update();
            this.renderer.clear(true, true, true);
            if (this.composer) { this.composer.render(); }
            else { this.renderer.render(this.screenScene, this.camera); }
        } catch (a) {
            console.error("Error when rendering: ", a)
        }
    }
    getDataUrl(a, b) {
        if ("image/jpeg" == a) {
            this.utilCanvas = this.utilCanvas || document.createElement("canvas");
            this.utilCanvas.width = this.width;
            this.utilCanvas.height = this.height;
            var ctx = this.utilCanvas.getContext("2d");
            return ctx.fillStyle = "#" + this.backgroundColor.toString(16),
                ctx.fillRect(0, 0, this.width, this.height),
                ctx.drawImage(this.renderer.domElement, 0, 0),
                this.utilCanvas.toDataURL(a, b)
        }
        return this.renderer.domElement.toDataURL(a, b)
    }
    getImageUint8Array() {
        var a = this.renderer.context,
            b = new Uint8Array(a.drawingBufferWidth * a.drawingBufferHeight * 4);
        return a.readPixels(0, 0, a.drawingBufferWidth, a.drawingBufferHeight, a.RGBA, a.UNSIGNED_BYTE, b), b
    }
    //kkk kkk todo
    getImageData(imageData) {
        null == imageData && (imageData = null);
        var b = this.getImageUint8Array(),
            c = this.renderer.context,
            d = c.drawingBufferWidth,
            e = c.drawingBufferHeight;
        if (!imageData)
            try { imageData = new ImageData(d, e) }
            catch (f) {
                var g = document.createElement("canvas"),
                    h = g.getContext("2d");
                imageData = h.createImageData(d, e)
            }
        for (var i = imageData.data.length, j = 0; i > j; j++)
            imageData.data[j] = b[j];
        return imageData
    }
}
class ExtendedWebGLRenderer extends THREE.WebGLRenderer {
    constructor(param) {
        super(param);
        this.renderBufferDirectFunction = this.renderBufferDirect;
        this.renderBufferDirect = this.renderBufferDirectOverride;
    }
    renderBufferDirectOverride(camera, fog, geometry, material, object3D, group) {
        if (material instanceof MultiShaderMaterial) {
            for (var h = 0; h < material.shaderMaterials.length; h++) {
                this.renderBufferDirectFunction(camera, fog, geometry, material.shaderMaterials[h], object3D, group);
            }
        }
        else {
            this.renderBufferDirectFunction(camera, fog, geometry, material, object3D, group);
        }
    }
}
const OcclusionShader = {
    uniforms: {},
    vertexShader: [
        "uniform mat4 modelViewMatrix;",
        "uniform mat4 projectionMatrix;",
        "attribute vec3 position;",
        "void main() {",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "}"].join("\n"),
    fragmentShader: [
        "void main() {",
        "gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);",
        "}"].join("\n")
};

class RingConfigurator3DScreen extends Screen3D {
    constructor(container, scaleRatio, diaSphereMapImage) {
        super(container, scaleRatio);

        this.bloomThreshold = .92;
        this.bloomStrength = 2.7;
        this.bloomRadius = 1.11;
        var viewSize = new THREE.Vector2(this.width, this.height);
        this.unrealBloomPass = new ThreeEx.UnrealBloomPass(
            viewSize,
            this.bloomStrength,
            this.bloomRadius,
            this.bloomThreshold);

        var occMaterial = new THREE.RawShaderMaterial({
            uniforms: OcclusionShader.uniforms,
            vertexShader: OcclusionShader.vertexShader,
            fragmentShader: OcclusionShader.fragmentShader
        });
        occMaterial.colorWrite = false;

        var diaMapping = new THREE.Texture(diaSphereMapImage);
        diaMapping.needsUpdate = true;
        diaMapping.wrapT = THREE.ClampToEdgeWrapping;
        diaMapping.wrapT = THREE.ClampToEdgeWrapping;

        var diaMaterial = new THREE.RawShaderMaterial({
            vertexShader: diamondcomplex_sparkle_vert,
            fragmentShader: diamondcomplex_sparkle_frag,
            uniforms: { sphereMap: { value: diaMapping } }
        });


        var layerRender1 = new ThreeEx.RenderPass(this.screenScene, this.camera);
        // layerRender1.layer = 1,
        layerRender1.clearColor = 0xFFFFFF,
            layerRender1.clearAlpha = 0,
            layerRender1.clear = true,
            layerRender1.renderToScreen = true;

        var layerRender2 = new ThreeEx.RenderPass(this.screenScene, this.camera);
        // layerRender2.layer = 2,
        layerRender2.overrideMaterial = occMaterial,
            layerRender2.clearColor = 0xFFFFFF,
            layerRender2.clearAlpha = 0,
            layerRender2.clear = true,
            layerRender2.renderToScreen = false;

        var layerRender3 = new ThreeEx.RenderPass(this.screenScene, this.camera);
        // layerRender3.layer = 3,
        layerRender3.clearColor = 0xFFFFFF,
            layerRender3.clearAlpha = 0,
            layerRender3.clear = false,
            layerRender3.renderToScreen = false,
            layerRender3.overrideMaterial = diaMaterial;

        this.unrealBloomPass.clear = false;
        this.unrealBloomPass.renderToScreen = true;
        this.setShaderPasses([layerRender1, layerRender2, layerRender3, this.unrealBloomPass], true);
    }
    setSize(b, c) {
        super.setSize(b, c);
    }
    render() {
        null != this.renderBeforeCallback && this.renderBeforeCallback();
        this.separateDiamondAndBody(this.screenScene);
        super.render();
        null != this.renderAfterCallback && this.renderAfterCallback();
    }
    separateDiamondAndBody(scene) {
        for (var id = 0; id < scene.children.length; id++) {
            var mesh = scene.children[id];
            if (mesh instanceof THREE.Mesh) {
                mesh.material && mesh.material instanceof MultiShaderMaterial ?
                    (mesh.layers.enable(1), mesh.layers.enable(3)) :
                    (mesh.layers.enable(1), mesh.layers.enable(2),
                        mesh.castShadow = true,
                        mesh.receiveShadow = true)
            }
            else mesh instanceof THREE.Light ? mesh.layers.enable(1) :
                this.separateDiamondAndBody(scene.children[id])
        }
    }
}
class ResizableView extends EventDispatcher {
    constructor() {
        super();
        this.width = 500;
        this.height = 500;
        this.sizeInvalid = false;
        this.invalidationTimer = new TimeoutCaller(100, this);
    }
    getWidth() { return this.width }
    setWidth(a) { this.width != a && (this.width = a, this.invalidateSize()) }
    getHeight() { return this.height }
    setHeight(a) { this.height != a && (this.height = a, this.invalidateSize()) }
    setSize(a, b) { this.setWidth(a), this.setHeight(b) }
    invalidateSize() {
        this.sizeInvalid = true;
        var a = this;
        this.invalidationTimer.call(a.doValidateSize)
    }
    validateSize() {
        this.doValidateSize(true)
    }
    doValidateSize(a) {
        null == a && (a = false);
        this.sizeInvalid && (this.sizeInvalid = false,
            this.invalidationTimer.clear(),
            this.handleSizeChanged(this.width, this.height),
            this.handleSizeChangedValidatable(this.width, this.height, a),
            this.hasEventListener(Event.RESIZE) && this.dispatchEvent(new Event(Event.RESIZE))
        )
    }
    handleSizeChanged(a, b) { }
    handleSizeChangedValidatable(a, b, c) { }
}
class WebGLDisplayBase extends ResizableView {
    constructor() {
        super();
        this.backgroundColor = NaN;
    }
    initialize(webglConfigLocation, containerElement) {
        if (this.initialized)
            throw new Error("WebGLDisplay already initialized");

        this.containerElement = containerElement;
        this.rootElement = document.createElement("div");
        this.rootElement.className = "ring-webgl-container";
        this.containerElement.appendChild(this.rootElement);

        this.dataModel = InstanceRegistry.getSingleton(DataModel);
        this.dataModel.relativeBasePath = this.relativeBasePath;
        this.dataModel.on(ResourceEvent.FINISHED, this.onResourcesLoaded, this);
        this.dataModel.on(ResourceEvent.FAILED, this.onResourcesFailed, this);

        this.settingsModel = InstanceRegistry.getSingleton(SettingsModel);
        this.assetModel = InstanceRegistry.getSingleton(AssetModel);
        this.assetModel.relativeBasePath = this.relativeBasePath;
        this.assetModel.on(AssetEvent.FAILED, this.onAssetLoadFailed);

        this.dataModel.startInitialLoad(webglConfigLocation);
        this.initialized = true;
    }
    createManager3D() {
        throw new Error("creteManager3D is an abstract method")
    }
    initializeProperties() {
        var a = this.dataModel.getResource(RescourceNames.CONFIG),
            b = a.content;
        this.settingsModel.initialize(b.child("settings").get(0));
        this.assetModel.loadableAssetFactory = new LoadableMaterialAssetFactory(this.dataModel);
        this.assetModel.baseUrl = this.settingsModel.getStringProperty(SettingsKeys.ASSETS_PATH);
        this.assetModel.resolveAssetsFromBase = this.settingsModel.getBooleanProperty(SettingsKeys.RESOLVE_ASSETS_FROM_BASE, false);
    }
    start() {
        this.manager3D = this.createManager3D();
        this.manager3D.resourceStore = this.dataModel;
        this.manager3D.packageRequestFunction = Delegate.create(this.assetModel, this.assetModel.loadPackage);
        this.manager3D.initialize();
        this.manager3D.screen.setSize(this.getWidth(), this.getHeight());
        isNaN(this.backgroundColor) || (this.manager3D.screen.backgroundColor = this.backgroundColor);
    }
    handleSizeChanged(a, b) {
        this.manager3D && this.manager3D.screen.setSize(a, b);
    }
    onAssetLoadFailed(a) {
        console.error("Asset load failed", a.fault.toString());
        this.hasEventListener(FaultErrorEvent.ERROR) && this.dispatchEvent(new FaultErrorEvent(FaultErrorEvent.ERROR, a.fault))
    }
    loadTestConfig(config) {
        var hhh = new HibridRingSceneConfig();
        hhh.shapeSceneConfig = new ShapeRingSceneConfig();
        hhh.shapeSceneConfig.ringModels = new Array(0);
        var testConfig = new TestConfig(config);
        for (var i = 0; i < testConfig.configs.length; i++)
            hhh.shapeSceneConfig.ringModels.push(testConfig.configs[i]); //kkk todo
        this.loadConfiguration(hhh);
    }
    //kkkkkkkkkkkkkkkk
    onResourcesLoaded(a) {
        this.initializeProperties();
        this.start();
        this.dispatchEvent(new Event(Event.INIT));
        //kkk
        this.loadTestConfig(InitDisplay.defaultConfig);
    }
    onResourcesFailed(a) {
        this.hasEventListener(FaultErrorEvent.ERROR) &&
            this.dispatchEvent(new FaultErrorEvent(FaultErrorEvent.ERROR, new Fault("Resource failed")));
    }
}
class ImageDescriptor {
    constructor(type, image) { this.imageType = type, this.image = image }
}
class ConfiguratorWebGLDisplayBase extends WebGLDisplayBase {
    configTransformers = [];
    constructor() {
        super();
        this.configuratorModel = InstanceRegistry.getSingleton(ConfiguratorModel);
    }

    initialize(webglConfigLocation, containerElement) {
        super.initialize(webglConfigLocation, containerElement);

        this.assemblerMaterialRegistry = new AssemblerMaterialRegistry;
        this.assemblerMaterialRegistry.autoCommit = true;
        this.assemblerMaterialRegistry.assetModel = this.assetModel;
        this.assemblerMaterialRegistry.resourceStore = this.dataModel;
        this.assemblerMaterialRegistry.addAssembler(new SingleLevelMaterialAssembler);
        this.assemblerMaterialRegistry.addAssembler(new MultiLevelMaterialAssembler);
        this.assemblerMaterialRegistry.addAssembler(new MultiLevelMaterialAssemblerGL);
        this.assemblerMaterialRegistry.addAssembler(new MultiShaderDiamondMaterialAssembler);
        this.assemblerMaterialRegistry.addAssembler(new EngravingMaterialAssembler);
        this.assemblerMaterialRegistry.on(FaultErrorEvent.ERROR, this.onRegistryError, this);
    }
    getHandViewSnapshot(handViewConfig, responder) {
        var handConfig = HandSnapshotConfigParser.parseHandSnapshotConfig(handViewConfig),
            ringConfig = HibridRingSceneConfigParser.get_instance().parseSingleRing(handViewConfig.ringConfig);

        ringConfig = this.transformConfig(ringConfig);

        var handSceneConfig = new HandSceneConfig;
        handSceneConfig.ringConfig = ringConfig;
        handSceneConfig.handConfig = handConfig;

        this.manager3D.renderHandSnapshot(handSceneConfig, new Responder((image) => {
            responder.result([new ImageDescriptor("dataurl", image)])
        }, (a) => { }, this));
    }
    getRingSnapshot(a, b, c) {
        if (c) {
            var d = new Responder((b) => {
                var c = { image: b[0], imageType: "url" };
                a.result([c])
            }, (b) => { a.fault([b]) }, this),
                e = JSON.stringify(b.__source);
            this.configuratorModel.loadSnapshotImage(e, d)
        } else {
            var f = new Responder((b) => {
                var c = { image: b, imageType: "dataurl" };
                a.result([c])
            }, (b) => { a.fault([b]) }, this);
            this.manager3D.renderSnapshot(f)
        }
    }
    //kkk
    loadConfiguration(a) {
        if (!(a instanceof HibridRingSceneConfig))
            throw new Error("Config is not a HibridRingSceneConfig");
        this.manager3D ? this.doLoadConfiguration(a) : this.pendingConfiguration = a
    }
    setProperties(a) { }
    setFullscreenMode(screenWidth, screenHeight, fullscreen3DAreaWidth, fullscreen3DAreaHeight) {
        var w = Math.min(screenWidth, fullscreen3DAreaWidth),
            h = Math.min(screenHeight, fullscreen3DAreaHeight);
        this.previousWidth = this.getWidth();
        this.previousHeight = this.getHeight();
        this.setSize(w, h);
        this.rootElement.style.position = "absolute";
        this.rootElement.style.left = (screenWidth - w) / 2 + "px";
        this.rootElement.style.top = (screenHeight - h) / 2 + "px";
    }
    exitFullscreenMode() {
        this.rootElement.style.position = "";
        this.rootElement.style.left = "";
        this.rootElement.style.top = "";
        this.setSize(this.previousWidth, this.previousHeight);
    }
    clear() {
        var a = this.manager3D;
        a && a.clear()
    }
    start() {
        super.start();
        var manager3D = this.manager3D;
        manager3D.on(Event.COMPLETE, this.dispatchEvent, this);
        manager3D.on(FaultErrorEvent.ERROR, this.dispatchEvent, this);
        this.pendingConfiguration && this.doLoadConfiguration(this.pendingConfiguration);
    }
    doLoadConfiguration(sceneConfig) {
        //kkk
        if (this.configTransformers && this.configTransformers.length) {
            var id, ringConfigs = HibridRingSceneConfigParser.getRingConfigs(sceneConfig);
            for (id = 0; id < ringConfigs.length; id++)
                ringConfigs[id] = this.transformConfig(ringConfigs[id]);
            sceneConfig = new HibridRingSceneConfig(ringConfigs)
        }
        this.manager3D.loadScene(sceneConfig, null)
    }
    transformConfig(conf) {
        if (this.configTransformers && this.configTransformers.length)
            for (var b = 0; b < this.configTransformers.length; b++) {
                var transformer = this.configTransformers[b];
                transformer.acceptsConfig(conf) && (conf = transformer.transform(conf))
            }
        return conf
    }
    onRegistryError(a) {
        console.error("Registry load failed", a.fault.toString())
    }
}
class FullscreenDelegate extends EventDispatcher {
    ''
    constructor(element) {
        super();
        this.element = element;
        for (var e in FullscreenDelegate.apis) {
            if (FullscreenDelegate.apis[e].enabled in document) {
                this.api = FullscreenDelegate.apis[e];
                this.vendor = e;
                // this.fullscreenEnabled = document[this.api.enabled],
                DomUtil.addEventListener(document, this.api.events.change, () => {
                    this.dispatchEvent(new Event("fullscreenchange"), this.element)
                });
                DomUtil.addEventListener(document, this.api.events.error, () => {
                    this.dispatchEvent(new Event("fullscreenerror"), this.element)
                });
                break
            }
        }
        this.fullscreenEnabled = false
    }
    get fullscreenElement() { return document[this.api.element] }
    get fullscreen() { return document[this.api.fullscreen] }
    static get fullscreenEnabled() {
        for (var a in FullscreenDelegate.apis)
            if (FullscreenDelegate.apis[a].enabled in document) return FullscreenDelegate.apis[a].enabled;
        return false
    }
    requestFullscreen() {
        this.element[this.api.request]()
    }
    exitFullscreen() {
        document[this.api.exit]()
    }
    static apis = {
        w3: {
            fullscreen: "fullscreen",
            enabled: "fullscreenEnabled",
            element: "fullscreenElement",
            request: "requestFullscreen",
            exit: "exitFullscreen",
            events: { change: "fullscreenchange", error: "fullscreenerror" }
        },
        webkit: {
            fullscreen: "webkitIsFullScreen",
            enabled: "webkitFullscreenEnabled",
            element: "webkitCurrentFullScreenElement",
            request: "webkitRequestFullscreen",
            exit: "webkitExitFullscreen",
            events: { change: "webkitfullscreenchange", error: "webkitfullscreenerror" }
        },
        moz: {
            fullscreen: "mozFullScreen",
            enabled: "mozFullScreenEnabled",
            element: "mozFullScreenElement",
            request: "mozRequestFullScreen",
            exit: "mozCancelFullScreen",
            events: { change: "mozfullscreenchange", error: "mozfullscreenerror" }
        },
        ms: {
            fullscreen: "",
            enabled: "msFullscreenEnabled",
            element: "msFullscreenElement",
            request: "msRequestFullscreen",
            exit: "msExitFullscreen",
            events: { change: "MSFullscreenChange", error: "MSFullscreenError" }
        }
    };
}
class WebGLUtil {
    constructor() { }
    static webglSupported() {
        try {
            var a = document.createElement("canvas");
            return !(!window.WebGLRenderingContext || !a.getContext("webgl") && !a.getContext("experimental-webgl"))
        }
        catch (b) {
            return false
        }
    }
}
class HandRenderData {
    constructor() { }
}
class HandRenderer {
    constructor(renderableDataArray, snapDrawResponder, display, config) {
        this.snapDrawResponder = snapDrawResponder;
        this.display = display;
        this.renderListDatas = [];
        for (var i = 0; i < renderableDataArray.length; i++) {
            var renderableData = renderableDataArray[i];
            for (var k = 0; k < renderableData.data.rings.length; k++) {
                var ring = renderableData.data.rings[k],
                    index = renderableData.ringIndexComponentIndexMap[k],
                    handRenderData = new HandRenderData;
                handRenderData.modelConfig = config.getRingModelByIndex(index);
                handRenderData.renderData = renderableData;
                handRenderData.ringConfig = ring;
                handRenderData.componentIndex = index;
                this.renderListDatas.push(handRenderData);
            }
        }
    }
    startLoad() {
        this.currentLoadedIndex = 0;
        this.renderedImages = [];
        this.loadNext();
    }
    loadNext() {
        if (this.currentLoadedIndex <= this.renderListDatas.length - 1) {
            var handRenderData = this.renderListDatas[this.currentLoadedIndex];
            this.currentLoadedIndex++;
            this.loadData(handRenderData)
        }
        else
            this.snapDrawResponder.result([this.renderedImages])
    }
    loadData(handRenderData) {
        var ringConfig;
        var responder = new Responder((imageData) => {
            this.renderedImages.push({
                imageData: imageData,
                ringConfig: handRenderData.ringConfig,
                renderableHandSnapshotData: handRenderData.renderData
            });
            this.loadNext()
        }, (a) => { }, this);

        if (handRenderData.modelConfig instanceof ShapeRingConfig) {
            ringConfig = handRenderData.modelConfig.__source;
            ringConfig.configType = "shape";
        }
        else {
            if (!(handRenderData.modelConfig instanceof ModelRingConfig))
                throw new Error("Unknown model config type " + handRenderData.modelConfig);
            ringConfig = handRenderData.modelConfig.__source;
            ringConfig.configType = "model"
        }
        var handViewConfig = {
            ringSnapshotConfig: handRenderData.ringConfig,
            ringConfig: ringConfig,
            flipped: handRenderData.renderData.flipped
        };
        try {
            this.display.getHandViewSnapshot(handViewConfig, responder);
        }
        catch (f) {
        }
    }
}
class DisplayView3DBase extends ResizableView {
    constructor(view3DConfig) {
        super();
        this.view3DConfig = view3DConfig;
        this.configParser = new HibridRingSceneConfigParser;
        this.configuratorModel = InstanceRegistry.getSingleton(ConfiguratorModel);
        this.handViewModel = InstanceRegistry.getSingleton(HandViewModel);
        this.pendingWidth = NaN;
        this.pendigHeight = NaN;
        this.configTransformers = [];
        this.configuratorModel.setServerHost(view3DConfig.fallbackUrl);
        view3DConfig.backgroundConfig && (this.backgroundView = new BackgroundView(view3DConfig.backgroundConfig));
        this.uiView = new UIView;
        this.handViewModel.addEventListener(HandViewModel.EVENT_RENDER_REQUESTED, Delegate.create(this, this.handleHandViewRenderRequested));
    }
    getModalMode() { return this.modalMode }
    setModalMode(a) { this.modalMode != a && (this.modalMode = a) }
    getConfigParser() { return this.configParser }
    setConfigParser(a) { this.configParser != a && (this.configParser = a) }
    getRenderMode() { return this.renderMode }
    addUI(a) { this.uiView.addUI(a) }
    clearUI() { this.uiView.clearUI() }
    clearView() {
        var a = this.getRenderDisplay();
        null != a && a.clear()
    }
    render(container) {
        container.jquery && (container = container.get(0));
        container.innerHTML = "";
        this.containerElement ? container.appendChild(this.containerElement) : (
            this.containerElement = document.createElement("div"),
            container.appendChild(this.containerElement),
            this.containerElement.style.position = "relative",
            this.containerFullscreenDelegate = new FullscreenDelegate(this.containerElement),
            this.containerFullscreenDelegate.on("fullscreenchange", this.handleFullscreenChanged, this),
            this.checkAndLaunchRenderer(),
            this.invalidateSize()
        );
    }
    addConfigTransformer(a) {
        this.configTransformers.push(a)
    }
    loadConfiguration(config) {
        var hhh = new HibridRingSceneConfig();
        hhh.shapeSceneConfig = new ShapeRingSceneConfig();
        hhh.shapeSceneConfig.ringModels = new Array(0);
        var testConfig = new TestConfig(config);
        hhh.shapeSceneConfig.ringModels.push(testConfig.configs[0]);
        hhh.shapeSceneConfig.ringModels.push(testConfig.configs[1]);
        this.currentConfig = hhh;

        //this.currentConfig = this.configParser.parseConfig(config);
    }
    setProperties(a) {
        if (this.renderMode == RenderMode.FALLBACK) this.fallbackDisplay.setProperties(a);
        else if (this.renderMode == RenderMode.WEBGL) this.webGLDidplay.setProperties(a);
        else if (this.pendingProperties)
            for (var b in a) this.pendingProperties[b] = a[b];
        else this.pendingProperties = a
    }
    getShareSnapshot(a) {
        var b = this.getRenderDisplay();
        null != b && b.getRingSnapshot(a, this.currentConfig, this.view3DConfig.fallbackUseSnapService)
    }
    setSize(b, c) {
        this.fullscreenMode ? (this.pendingWidth = b, this.pendigHeight = c) : super.setSize(b, c)
    }
    getSize() {
        return { width: this.getWidth(), height: this.getHeight() };
    }
    getFullScreenEnabled() {
        return FullscreenDelegate.fullscreenEnabled
    }
    requestFullscreen() {
        var element = '<button class="btn-round button-exit-fullscreen"><i icon="close-2" class="svg-icon svg-icon-close-2"><svg id="close-2" viewBox="0 0 30 30" width="30" height="30"><title>close-2</title> <line x1="7.03" y1="6.01" x2="22.91" y2="21.99" fill="#fff" stroke="#000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></line> <line x1="23.03" y1="6.01" x2="6.91" y2="21.99" fill="#fff" stroke="#000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></line></svg></i></button>';
        var b = new UIRenderRequest(element, new Responder((a) => {
            var b;
            b = a.querySelector(".button-exit-fullscreen");
            b.onclick = () => {
                this.uiView.clearUI();
                this.exitFullscreen();
                $(".handview").removeClass("hide");
                $(".zoom-desktop").removeClass("hide");
            };
        }, function (a) { }));
        b.setRenderModes(UIRenderRequest.RENDER_MODE_WEBGL | UIRenderRequest.RENDER_MODE_FALLBACK | UIRenderRequest.RENDER_MODE_FULLSCREEN);
        b.setAlign(UIRenderRequest.ALIGN_TOP_RIGHT);
        this.uiView.addUI(b);
        this.containerFullscreenDelegate.requestFullscreen()
    }
    exitFullscreen() {
        this.containerFullscreenDelegate.exitFullscreen()
    }
    getUsableRenderMode() {
        return this.view3DConfig.forceFallback ? RenderMode.FALLBACK : this.view3DConfig.webglEnabled && WebGLUtil.webglSupported() ? RenderMode.WEBGL : RenderMode.FALLBACK
    }
    handleSizeChangedValidatable(width, height, bValidate) {
        super.handleSizeChanged(width, height);
        isNaN(width) || (this.containerElement.style.width = width + "px"),
            isNaN(height) || (this.containerElement.style.height = height + "px"),
            this.backgroundView && (this.backgroundView.setSize(width, height), bValidate && this.backgroundView.validateSize()),
            this.uiView.setSize(width, height),
            bValidate && this.uiView.validateSize();
        var display = this.getRenderDisplay();
        display && (display.setSize(width, height), bValidate && display.validateSize());
        this.containerElement && (this.containerElement.style.width = width + "px", this.containerElement.style.height = height + "px")
    }
    processHandRenderRequest(handViewRenderRequest) {
        var display = this.getRenderDisplay();
        if (null != display) {
            this.currentRenderListLoader = new HandRenderer(handViewRenderRequest.renderableDatas, handViewRenderRequest.snapDrawResponder, display, this.currentConfig);
            this.currentRenderListLoader.startLoad();
        }
    }
    checkAndLaunchRenderer() {
        if (this.view3DConfig.forceFallback)
            return this.launchRenderer(RenderMode.FALLBACK);
        //kkkkkkkkk
        if (this.view3DConfig.webglEnabled) {
            if (WebGLUtil.webglSupported()) {
                return this.launchRenderer(RenderMode.WEBGL);
            }
            else
                console.log("Webgl is not supported")
        }

        this.launchRenderer(RenderMode.FALLBACK)
    }
    launchRenderer(renderMode) {
        this.renderMode = renderMode;
        this.backgroundView && this.backgroundView.render(this.containerElement, renderMode == RenderMode.FALLBACK);
        if (renderMode == RenderMode.FALLBACK) {
            this.fallbackDisplay = new FallbackDisplay;
            this.fallbackDisplay.setDisplayImageIndex(this.view3DConfig.fallbackDisplayImageIndex);
            this.fallbackDisplay.setShareImageIndex(this.view3DConfig.fallbackShareImageIndex);
            this.view3DConfig.initConfig && this.fallbackDisplay.loadConfiguration(this.view3DConfig.initConfig);
            this.fallbackDisplay.setDeviceScrollMode(this.view3DConfig.fallbackDeviceScrollMode);
            var c = this.matchesUserAgentRegex(this.view3DConfig.fallbackUserAgentFadeExlusionRegexes);
            this.fallbackDisplay.setFadeLayers(this.view3DConfig.fallbackFadeLayers && !c);
            this.fallbackDisplay.render(this.containerElement);
        }
        //kkkkkkkkkkkkkk
        else if (renderMode == RenderMode.WEBGL) {
            this.webGLDidplay = this.createConfiguratorWebGLDisplay();//ConfiguratorWebGLDisplay
            this.webGLDidplay.relativeBasePath = this.view3DConfig.basePath;
            this.webGLDidplay.configTransformers = this.configTransformers;
            this.webGLDidplay.backgroundColor = parseInt(this.view3DConfig.backgroundColor.substr(1), 16);
            this.view3DConfig.requestAnimationFrameOverrideFunction && (
                RequestAnimationFrame.requestAnimationFrameOverrideFunction = this.view3DConfig.requestAnimationFrameOverrideFunction
            );
            this.uiView.setLoadingMode();
            this.webGLDidplay.initialize(this.view3DConfig.webglConfigLocation, this.containerElement);
            this.webGLDidplay.on(Event.COMPLETE, () => {
                this.uiView.exitLoadingMode();
            }, this);
            this.webGLDidplay.on(FaultErrorEvent.ERROR, () => {
                this.uiView.exitLoadingMode()
            }, this);
        }
        this.uiView.render(this.containerElement, renderMode);
        this.invalidateSize();
    }
    getRenderDisplay() {
        var display = null;
        this.renderMode == RenderMode.FALLBACK ? display = this.fallbackDisplay : this.renderMode == RenderMode.WEBGL && (display = this.webGLDidplay);
        return display
    }
    matchesUserAgentRegex(a) {
        if (!a || !a.length) return false;
        for (var b = navigator.userAgent || navigator.vendor, c = 0; c < a.length; c++)
            if (b.match(a[c])) return true;
        return false
    }
    setFullscreenRenderState(fullscreenMode) {
        this.fullscreenMode = fullscreenMode,
            console.debug("Fullscreen mode changed, fullscreen:", fullscreenMode);
        if (fullscreenMode) {
            this.containerElement.style.width = "100%";
            this.containerElement.style.height = "100%";
            this.containerElement.style.background = this.view3DConfig.backgroundColor || "#ffffff";
            this.backgroundView && (this.backgroundView.visible = false);
            this.uiView.setFullScreenMode(Screen.width, Screen.height);
        }
        else {
            this.containerElement.style.background = "";
            this.backgroundView && (this.backgroundView.visible = true);
            this.uiView.exitFullscreenMode();
            if (!isNaN(this.pendingWidth) && !isNaN(this.pendigHeight)) {
                super.setSize(this.pendingWidth, this.pendigHeight);
                this.pendingWidth = NaN;
                this.pendigHeight = NaN;
            }
            this.invalidateSize();
        }
        var display = this.getRenderDisplay();
        if (display) {
            if (fullscreenMode) {
                display.setFullscreenMode(window.innerWidth, window.innerHeight, this.view3DConfig.fullscreen3DAreaWidth, this.view3DConfig.fullscreen3DAreaHeight);
            }
            else
                display.exitFullscreenMode();
        }
    }
    handleFullscreenChanged(view) {
        var fullscreenMode = this.containerFullscreenDelegate.fullscreen;
        if (fullscreenMode) {
            if (this.containerFullscreenDelegate.fullscreenElement == this.containerElement) {
                this.initiatedFullscreen = true;
                this.setFullscreenRenderState(fullscreenMode);
            }
        }
        else {
            if (this.initiatedFullscreen) {
                this.initiatedFullscreen = false;
                this.setFullscreenRenderState(fullscreenMode);
            }
        }
    }
    handleHandViewRenderRequested(event) {
        var b = event.data;
        this.processHandRenderRequest(b);
    }
    handleUIEventArrived(a) {
        this.dispatchEvent(a.clone())
    }
}
class DisplayView3D extends DisplayView3DBase {
    constructor(view3DConfig) {
        super(view3DConfig);
    }
    createConfiguratorWebGLDisplay() {
        return new ConfiguratorWebGLDisplay
    }
}
class ConfiguratorWebGLDisplay extends ConfiguratorWebGLDisplayBase {
    constructor() {
        super();
    }

    initialize(webglConfigLocation, containerElement) {
        super.initialize(webglConfigLocation, containerElement);
        this.assemblerMaterialRegistry.addAssembler(TextureMaterialAssembler.newInstance());
    }
    //kkkkkkkkkkkkk
    start() {
        var configTransformers = [];
        configTransformers.push(new DiagonalDiamondChannelConfigTransformer);
        configTransformers.push(new HorizontalGrooveConfigTransformer);
        configTransformers.push(new Memoire5ConfigTransformer);
        configTransformers.push(new Memoire6ConfigTransformer);
        // for (var b = (ConfigTransformerBase),
        //     configTransformers = [], d = 0; d < b.length; d++)
        //     configTransformers.push(new b[d]);
        this.configTransformers = configTransformers;
        super.start();
    }
    createManager3D() {
        var devicePixelRatio = 1 == window.devicePixelRatio ? 2 : window.devicePixelRatio;

        this.manager3D = new ConfiguratorManager3D(this.rootElement, devicePixelRatio);
        this.manager3D.materialRegistry = this.assemblerMaterialRegistry;
        return this.manager3D;
    }
}
class UIView extends ResizableView {
    constructor() {
        super();
        this.fullscreen = false;
        this.pendingUIRequests = [];
        this.uIrenderRequests = [];
        this.currentRoles = UIRenderRequest.ROLE_DEFAULT;
        this.interfaceLayerName = "metrix_user_interface_layer";
    }
    addUI(a) {
        this.rendered ? this.createUserInterface(a, this.currentRenderMode) : this.pendingUIRequests.push(a), this.uIrenderRequests.push(a), this.invalidateSize()
    }
    clearUI() {
        if (this.rendered) {
            var a = this.containerElement.querySelector("." + this.interfaceLayerName);
            a.innerHTML = "";
            a.style.visibility = "hidden";
        }
        this.pendingUIRequests = [];
        this.uIrenderRequests = [];
    }
    render(containerElement, renderMode) {
        this.containerElement = containerElement;
        this.currentRenderMode = renderMode;
        containerElement.appendChild(this.getHtmlContent());
        this.htmlContentAdded(containerElement);
        this.rendered = true;
        this.invalidateSize();
    }
    setFullScreenMode(a, b) {
        this.fullscreen = true,
            this.prevWidth = this.getWidth(),
            this.prevHeight = this.getHeight(),
            this.setSize(a, b), this.invalidateSize();
    }
    exitFullscreenMode() {
        this.fullscreen = false,
            this.setSize(this.prevWidth, this.prevHeight),
            this.invalidateSize();
    }
    setLoadingMode() {
        this.currentRoles = UIRenderRequest.ROLE_LOAD_INDICATOR | UIRenderRequest.ROLE_DEFAULT,
            this.readjustVisibility()
    }
    exitLoadingMode() {
        this.currentRoles = UIRenderRequest.ROLE_DEFAULT,
            this.readjustVisibility()
    }
    handleSizeChanged(b, c) {
        if (super.handleSizeChanged(b, c), this.recalculatePositions(b, c), this.readjustVisibility(), this.rendered) {
            var d = this.containerElement.querySelector("." + this.interfaceLayerName);
            d.style.visibility = "visible"
        }
    }
    recalculatePositions(a, b) {
        if (this.rendered)
            for (var c = 0; c < this.uIrenderRequests.length; c++) {
                var d = this.uIrenderRequests[c];
                if (d.getRenderModes() & this.currentRenderMode && d.getAlign()) {
                    var e = d.getElement(),
                        f = DomUtil.measureElement(e),
                        i = 0,
                        j = 0;
                    switch (d.getAlign()) {
                        case UIRenderRequest.ALIGN_TOP_LEFT:
                            i = 0, j = 0;
                            break;
                        case UIRenderRequest.ALIGN_TOP_RIGHT:
                            i = a - f.x, j = 0;
                            break;
                        case UIRenderRequest.ALIGN_BOTTOM_LEFT:
                            i = 0, j = b - f.y;
                            break;
                        case UIRenderRequest.ALIGN_BOTTOM_RIGHT:
                            i = a - f.x, j = b - f.y;
                            break;
                        case UIRenderRequest.ALIGN_CENTER:
                            i = (a - f.x) / 2, j = (b - f.y) / 2;
                            break;
                        default:
                            var k = new Error("Unknow align value: " + d.getAlign());
                            if (!d.getResponder()) throw k;
                            d.getResponder().fault([k])
                    }
                    e.style.position = "absolute", e.style.left = i + "px", e.style.top = j + "px"
                }
            }
    }
    readjustVisibility() {
        if (this.rendered) {
            for (var a = 0; a < this.uIrenderRequests.length; a++) {
                var b = this.uIrenderRequests[a];
                if (b.getRenderModes() & this.currentRenderMode && b.getAlign()) {
                    var c = b.getElement(),
                        d = false;
                    d = d || b.getRenderModes() & UIRenderRequest.RENDER_MODE_FULLSCREEN && this.fullscreen, d = d || b.getRenderModes() & UIRenderRequest.RENDER_MODE_WINDOW && !this.fullscreen, d = d && !!(b.getRole() & this.currentRoles), null == c.o_metrix_display_prop && (c.o_metrix_display_prop = c.style.display), d ? c.style.display = c.o_metrix_display_prop : c.style.display = "none"
                }
            }
        }
    }
    createUserInterface(a, b) {
        if (a.getRenderModes() & b) {
            var c = this.containerElement.querySelector("." + this.interfaceLayerName),
                d = a.getTemplate();
            if (d) {
                var e = document.createElement("div");
                e.innerHTML = d;
                var f = e.firstChild;
                a.setElement(f), c.appendChild(f), a.getResponder() && a.getResponder().result([c])
            } else {
                if (!a.getResponder() || null == a.getResponder().fault) throw new Error("Template not found in UIRenderRequest");
                a.getResponder().fault([new Error("Template not found in UIRenderRequest")])
            }
        }
    }
    getHtmlContent() {
        var a = document.createElement("div");
        a.style.position = "absolute";
        a.style.top = "0";
        a.style.right = "0";
        a.style.visibility = "visible";
        a.className = this.interfaceLayerName;
        return a
    }
    htmlContentAdded(a) {
        if (this.pendingUIRequests && this.pendingUIRequests.length)
            for (; this.pendingUIRequests.length;)
                this.createUserInterface(this.pendingUIRequests.shift(), this.currentRenderMode)
    }
}
class DomUtil {
    constructor() { }
    static addReadyHandler(b) {
        return DomUtil.readyFired ? void setTimeout(function () {
            b()
        }, 1) : (DomUtil.readyList.push({ fn: b }),
            void ("complete" === document.readyState || !document.attachEvent && "interactive" === document.readyState ? setTimeout(DomUtil.ready, 1) : DomUtil.readyEventHandlersInstalled || (document.addEventListener ? (document.addEventListener("DOMContentLoaded", DomUtil.ready, false), window.addEventListener("load", DomUtil.ready, false)) : (document.attachEvent("onreadystatechange", DomUtil.readyStateChange), window.attachEvent("onload", DomUtil.ready)), DomUtil.readyEventHandlersInstalled = true)))
    }
    static measureElement(a) {
        var b = a.style.visibility,
            c = a.style.display,
            d = a.style.position;
        a.style.visibility = "hidden",
            a.style.display = "block",
            a.style.position = "absolute";
        var f = new Point(a.offsetWidth, a.offsetHeight);
        return a.style.visibility = b,
            a.style.display = c,
            a.style.position = d,
            f
    }
    static addClass(a, b) {
        a.classList ? a.classList.add(b) : a.className += " " + b
    }
    static removeClass(a, b) {
        a.classList ? a.classList.remove(b) : a.className = a.className.replace(new RegExp("(^|\\b)" + b.split(" ").join("|") + "(\\b|$)", "gi"), " ")
    }
    static addEventListener(a, b, c) {
        a.addEventListener ? a.addEventListener(b, c) :
            a.attachEvent("on" + b, function () {
                c.call(a)
            })
    }
    static addEventListeners(b, c, d) {
        for (var e = 0; e < c.length; e++)
            DomUtil.addEventListener(b, c[e], d)
    }
    static ready() {
        if (!DomUtil.readyFired) {
            DomUtil.readyFired = true;
            for (var b = 0; b < DomUtil.readyList.length; b++) DomUtil.readyList[b].fn.call(window);
            DomUtil.readyList = []
        }
    }
    static readyStateChange() {
        "complete" === document.readyState && DomUtil.ready()
    }
    static readyFired = false;
    static readyList = [];
}
class RenderMode {
    static WEBGL = 1;
    static FALLBACK = 4;
    static FULLSCREEN = 8;
    static WINDOW = 16;
}
class UIRenderRequest {
    constructor(b, c) {
        null == b && (b = null),
            null == c && (c = null),
            this.template = b,
            this.responder = c,
            this.renderModes = UIRenderRequest.RENDER_MODE_WEBGL |
            UIRenderRequest.RENDER_MODE_FALLBACK | UIRenderRequest.RENDER_MODE_WINDOW,
            this.role = UIRenderRequest.ROLE_DEFAULT
    }
    getTemplate() {
        return this.template
    }
    setTemplate(a) {
        this.template != a && (this.template = a)
    }
    getResponder() {
        return this.responder
    }
    setResponder(a) {
        this.responder != a && (this.responder = a)
    }
    getRenderModes() {
        return this.renderModes
    }
    setRenderModes(a) {
        this.renderModes != a && (this.renderModes = a)
    }
    getAlign() {
        return this.align
    }
    setAlign(a) {
        this.align != a && (this.align = a)
    }
    getElement() {
        return this.element
    }
    setElement(a) {
        this.element != a && (this.element = a)
    }
    getRole() {
        return this.role
    }
    setRole(a) {
        this.role != a && (this.role = a)
    }
    static RENDER_MODE_WEBGL = RenderMode.WEBGL;
    static RENDER_MODE_FALLBACK = RenderMode.FALLBACK;
    static RENDER_MODE_FULLSCREEN = RenderMode.FULLSCREEN;
    static RENDER_MODE_WINDOW = RenderMode.WINDOW;
    static ALIGN_TOP_LEFT = "TL";
    static ALIGN_TOP_RIGHT = "TR";
    static ALIGN_BOTTOM_LEFT = "metaDataMap";
    static ALIGN_BOTTOM_RIGHT = "BR";
    static ALIGN_CENTER = "C";
    static ROLE_DEFAULT = 1;
    static ROLE_LOAD_INDICATOR = 2;
}
class BackgroundView extends ResizableView {
    constructor(config) {
        super();
        this.visible = true, this.config = config, this.fallbackMode = false;
    }
    render(a, b) {
        this.containerElement = a,
            this.fallbackMode = b,
            a.appendChild(this.getHtml(this.config)),
            this.backgroundContainerElement.style.display = this.visible ? "block" : "none", this.invalidateSize()
    }
    handleSizeChanged(a, b) {
        if (this.backgroundImageElement && !isNaN(a) && !isNaN(a)) {
            var c, d, e, f;
            if (this.fallbackMode) {
                var g = Math.min(a / this.config.fallbackImageWidth, b / this.config.fallbackImageHeight),
                    h = this.config.fallbackImageWidth * g,
                    i = this.config.fallbackImageHeight * g;
                c = h / this.config.rectWidth, d = i / this.config.rectHeight;
                var j = (a - h) / 2;
                e = -this.config.rectX * c + j, f = -this.config.rectY * d
            } else c = a / this.config.rectWidth, d = b / this.config.rectHeight, e = -this.config.rectX * c, f = -this.config.rectY * d;
            var k = this.config.width * c,
                l = this.config.height * d;
            this.backgroundImageElement.style.width = k + "px", this.backgroundImageElement.style.height = l + "px", this.backgroundImageElement.style.left = e + "px", this.backgroundImageElement.style.top = f + "px"
        }
    }
    getHtml(a) {
        this.backgroundContainerElement = document.createElement("div");
        this.backgroundContainerElement.className = "background";
        this.backgroundContainerElement.style.position = "absolute";
        this.backgroundContainerElement.style.top = "0";
        this.backgroundContainerElement.style.left = "0";
        this.backgroundImageElement = document.createElement("img");
        this.backgroundImageElement.className = "background-image";
        this.backgroundImageElement.style.position = "absolute";
        this.backgroundImageElement.style.webkitUserSelect = "none";
        var b = "UserSelect";
        this.backgroundImageElement.style["webkit" + b] = "none";
        this.backgroundImageElement.style["moz" + b] = "none";
        this.backgroundImageElement.style["ms" + b] = "none";
        this.backgroundImageElement.style.userSelect = "none";
        this.backgroundImageElement.src = a.backgroundImagePath;
        this.backgroundImageElement.draggable = false;
        this.backgroundContainerElement.appendChild(this.backgroundImageElement);
        return this.backgroundContainerElement;
    }
}
class ConfiguratorArea {
    constructor(a) {
        this._fadeLayers = true,
            this._fadeDuration = .1,
            this._disableAreaEvents = true,
            this._defaultDisplayImageIndex = 0,
            this.currentLayerIndex = NaN,
            this.layerContainerElement = a,
            this.imageLayerElement = this.layerContainerElement.querySelector(".image_layers"),
            DomUtil.addClass(this.layerContainerElement, "use_cursor"),
            this.mouseEventDelegate = new MouseEventDelegate(this, this.layerContainerElement),
            this.mouseEventDelegate.disableAreaEvents = this._disableAreaEvents
    }
    getFadeLayers() {
        return this._fadeLayers
    }
    setFadeLayers(a) {
        this._fadeLayers != a && (this._fadeLayers = a)
    }
    getDefaultDisplayImageIndex() {
        return this._defaultDisplayImageIndex
    }
    setDefaultDisplayImageIndex(a) {
        this._defaultDisplayImageIndex != a && (this._defaultDisplayImageIndex = a)
    }
    getDisableAreaEvents() {
        return this._disableAreaEvents
    }
    setDisableAreaEvents(a) {
        this._disableAreaEvents != a && (this._disableAreaEvents = a, this.mouseEventDelegate && (this.mouseEventDelegate.disableAreaEvents = a))
    }
    getFadeDuration() { return this._fadeDuration }
    setFadeDuration(a) { this._fadeDuration != a && (this._fadeDuration = a) }
    display(a) {
        var b = this.layers ? this.layers.length : 0;
        b == a.length ? this.displayExisting(a, this.layers) : this.displayNew(a);
    }
    gotoImageIndex(a) { this.stepToLayerIndex(a) }
    clearImages() { this.layers = [], this.imageLayerElement.innerHTML = "" }
    displayExisting(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            c == this.currentLayerIndex ? d.style.visibility = "visible" : d.style.visibility = "hidden", d.querySelector(".image").src = a[c]
        }
    }
    displayNew(a) {
        this.imageLayerElement.innerHTML = "", this.layers = [], this.currentMaxZindex = 3, isNaN(this.currentLayerIndex) && a && (this.currentLayerIndex = this._defaultDisplayImageIndex);
        for (var b = 0; b < a.length; b++) {
            var c = document.createElement("div");
            c.className = "image_layer";
            var d = document.createElement("img");
            d.className = "image", d.src = a[b], d.draggable = false, c.appendChild(d), b == this.currentLayerIndex ? (c.style.display = "block", c.style.visibility = "visible", c.style.zIndex = "2") : (c.style.display = "block", c.style.visibility = "hidden", c.style.zIndex = "1"), this.layers[b] = c, this.imageLayerElement.appendChild(c)
        }
    }
    stepToLayerIndex(a) {
        if (this.layers && this.layers.length) {
            var b = this.layers.length;
            if (0 > a ? a = b - 1 - Math.abs((a + 1) % b) : a %= b, a != this.currentLayerIndex) {
                if (this.getFadeLayers()) {
                    var c = this.layers[this.currentLayerIndex];
                    c.style.zIndex = String(this.currentMaxZindex),
                        this.createFadeOut(c, this._fadeDuration),
                        this.currentMaxZindex++;
                    var d = this.layers[a];
                    d.style.opacity = "0", d.style.zIndex = String(this.currentMaxZindex), this.createFadeIn(d, this._fadeDuration + .05)
                } else {
                    var c = this.layers[this.currentLayerIndex];
                    c.style.display = "none", c.style.visibility = "hidden", c.style.opacity = "0", c.style.zIndex = "1";
                    var d = this.layers[a];
                    d.style.display = "block", d.style.visibility = "visible", d.style.opacity = "1", d.style.zIndex = "2"
                }
                this.currentLayerIndex = a
            }
        }
    }
    normalizeZIndexes(a) {
        if (a) {
            for (var b = [], c = 0; c < a.length; c++) {
                var d = a[c],
                    e = parseInt(d.style.zIndex);
                b.push({ layer: d, index: e })
            }
            b.sort(function (a, b) { return a.index - b.index });
            for (var c = 0; c < b.length; c++) {
                var d = b[c].layer;
                d.style.zIndex = String(c)
            }
            this.currentMaxZindex = b.length
        }
    }
    createFadeIn(a, b) {
        a.tweenAlpha = parseFloat(a.style.opacity) || 0,
            a.style.visibility = "visible",
            gsap.killTweensOf(a),
            gsap.to(a, b, {
                tweenAlpha: 1,
                onUpdate: () => {
                    a.style.opacity = String(a.tweenAlpha)
                },
                onComplete: () => {
                    a.style.opacity = "1",
                        a.style.visibility = "visible"
                }
            })
    }
    createFadeOut(a, b) {
        a.tweenAlpha = parseFloat(a.style.opacity) || 1,
            a.style.visibility = "visible",
            gsap.killTweensOf(a),
            gsap.to(a, b, {
                tweenAlpha: 0,
                delay: b / 4,
                onUpdate: () => {
                    a.style.opacity = String(a.tweenAlpha)
                },
                onComplete: () => {
                    a.style.opacity = "0",
                        a.style.visibility = "hidden"
                }
            })
    }
    handleMouseDown(a, b) {
        this.mouseDownX = a, this.mouseDownIndex = this.currentLayerIndex
    }
    handleMouseMove(a, b) {
        var c = (a - this.mouseDownX) / 40;
        c = Math.round(c), this.stepToLayerIndex(this.mouseDownIndex + c)
    }
    handleMouseUp() {
        this.normalizeZIndexes(this.layers)
    }
    handleMouseWheelChange(a) { }
}

const view_3d_display_css = ".fallback-content {\r\n    margin: auto;\r\n    position: relative;\r\n}\r\n.fallback-content .preloader_layer {\r\n    display: none;\r\n    position: absolute;\r\n}\r\n.fallback-content .image_layers_container {\r\n    width: 100%;\r\n    height: 100%;\r\n    position: relative;\r\n}\r\n.fallback-content .image_layers_container img {\r\n    outline: none;\r\n}\r\n.fallback-content .image_layers_container.use_cursor {\r\n    cursor: move;\r\n}\r\n.fallback-content .image_layers_container .image_layers {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n.fallback-content .image_layers_container .image_layers .image_layer {\r\n    text-align: center;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n.fallback-content .image_layers_container .image_layers .image_layer .image {\r\n    margin: 0 auto;\r\n    max-width: 100%;\r\n    max-height: 100%;\r\n}\r\n.fallback-content {\r\n    -webkit-touch-callout: none;\r\n    -webkit-user-select: none;\r\n    -khtml-user-select: none;\r\n    -moz-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n}\r\n\r\n\r\n.ring-webgl-container{\r\n    position: relative;\r\n}\r\n";
class FallbackDisplay extends ResizableView {
    autoAddStyles = false;
    constructor() {
        super();
        this.shareImageIndex = 0,
            this.displayImageIndex = 0,
            this.animationImageIndexSteps = 2,
            this.introAnimationEnabled = true,
            this.deviceScrollMode = false,
            this.fadeLayers = true,
            this.configuratorModel = InstanceRegistry.getSingleton(ConfiguratorModel),
            this.configuratorModel.addEventListener(ConfiguratorModel.EVENT_IMAGES_CHANGED, Delegate.create(this, this.handleImagesChanged)),
            this.configuratorModel.addEventListener(ConfiguratorModel.EVENT_LOAD_IN_PROGRESS_CHANGED, Delegate.create(this, this.handleLoadInProgressChanged));
    }
    getLoadInProgress() {
        return this.loadInProgress
    }
    setLoadInProgress(a) {
        this.loadInProgress != a && (this.loadInProgress = a, this.dispatchEvent(new Event(Event.EVENT_LOAD_IN_PROGRESS_CHANGED)))
    }
    getShareImageIndex() { return this.shareImageIndex }
    setShareImageIndex(a) { this.shareImageIndex != a && (this.shareImageIndex = a) }
    getDisplayImageIndex() { return this.displayImageIndex }
    setDisplayImageIndex(a) { this.displayImageIndex != a && (this.displayImageIndex = a) }
    getDeviceScrollMode() { return this.deviceScrollMode }
    setDeviceScrollMode(a) { this.deviceScrollMode != a && (this.deviceScrollMode = a) }
    getFadeLayers() { return this.fadeLayers }
    setFadeLayers(a) {
        this.fadeLayers != a && (this.fadeLayers = a, this.configArea && this.configArea.setFadeLayers(a))
    }
    getAnimationImageIndexSteps() { return this.animationImageIndexSteps }
    setAnimationImageIndexSteps(a) {
        this.animationImageIndexSteps != a && (this.animationImageIndexSteps = a)
    }
    getIntroAnimationEnabled() { return this.introAnimationEnabled }
    setIntroAnimationEnabled(a) {
        this.introAnimationEnabled != a && (this.introAnimationEnabled = a)
    }
    render(a) {
        this.containerElement = a;
        var b = document.head || document.getElementsByTagName("head")[0],
            c = document.createElement("style");
        c.type = "text/css", c.styleSheet ? c.styleSheet.cssText = view_3d_display_css : c.appendChild(document.createTextNode(view_3d_display_css)), b.appendChild(c), a.appendChild(this.getHtmlContent()), this.htmlContentAdded(a), this.invalidateSize()
    }
    loadConfiguration(a) {
        var b = JSON.stringify(a.__source);
        this.configuratorModel.loadConfigurationDelayed(b)
    }
    setProperties(a) { }
    getHandViewSnapshot(a, b) {
        var c = JSON.stringify(a);
        this.configuratorModel.loadHandViewImage(c, b)
    }
    getRingSnapshot(a, b, c) {
        null == c && (c = false);
        var d = c ? 0 : this.shareImageIndex,
            e = new Responder((b) => {
                var c = { image: b[d], imageType: "url" };
                a.result([c])
            }, (b) => {
                a.fault([b])
            }, this),
            f = JSON.stringify(b.__source);
        c ? this.configuratorModel.loadSnapshotImage(f, e) : this.configuratorModel.loadConfigurationResponse(f, e)
    }
    setFullscreenMode(a, b, c, d) {
        var e = Math.min(a, c),
            f = Math.min(b, d);
        this.previousWidth = this.getWidth();
        this.previousHeight = this.getHeight();
        this.setSize(e, f);
        this.rootElement.style.position = "absolute";
        this.rootElement.style.left = (a - e) / 2 + "px";
        this.rootElement.style.top = (b - f) / 2 + "px";
    }
    exitFullscreenMode() {
        this.rootElement.style.position = "";
        this.rootElement.style.left = "";
        this.rootElement.style.top = "";
        this.setSize(this.previousWidth, this.previousHeight);
    }
    clear() {
        this.configuratorModel.reset(),
            this.configArea.clearImages()
    }
    getHtmlContent() {
        var element = document.createElement("div");
        element.className = "fallback-content";
        var b = document.createElement("div");
        b.className = "preloader_layer",
            b.style.position = "absolute";
        var c = document.createElement("div");
        c.className = "image_layers_container";
        var d = document.createElement("div");
        d.className = "image_layers",
            c.appendChild(d),
            element.appendChild(c),
            element.appendChild(b);
        return element
    }
    htmlContentAdded(a) {
        this.rootElement = a.querySelector(".fallback-content");
        this.configArea = new ConfiguratorArea(a.querySelector(".image_layers_container"));
        var b = this.introAnimationEnabled ? this.displayImageIndex + this.animationImageIndexSteps : this.displayImageIndex;
        this.configArea.setDefaultDisplayImageIndex(b);
        this.configArea.setFadeLayers(this.fadeLayers);
        this.configArea.setDisableAreaEvents(!this.deviceScrollMode);
    }
    playIntroAnimation() {
        var a = this,
            b = 0,
            c = this.configArea.getFadeDuration();
        this.configArea.setFadeDuration(1.2);
        setTimeout(() => {
            var d = window.setInterval(() => {
                var e = a.displayImageIndex + a.animationImageIndexSteps - ++b;
                a.configArea.gotoImageIndex(e);
                b >= a.animationImageIndexSteps && (clearInterval(d), a.configArea.setFadeDuration(c))
            }, 400)
        }, 600);
        this.introAnimationPlayed = true
    }
    handleSizeChanged(a, b) {
        this.rootElement && (this.rootElement.style.width = a + "px", this.rootElement.style.height = b + "px")
    }
    handleLoadInProgressChanged(a) {
        var b = this.configuratorModel.getLoadInProgress();
        var c = this.containerElement.querySelector(".preloader_layer");
        b ? c.style.display = "block" : c.style.display = "none";
        this.setLoadInProgress(b);
    }
    handleImagesChanged(a) {
        this.configArea.display(this.configuratorModel.getImages());
        this.introAnimationEnabled && !this.introAnimationPlayed && this.playIntroAnimation();
    }
    static EVENT_LOAD_IN_PROGRESS_CHANGED = "loadInProgressChanged";
}

class HandCanvas {
    constructor(containerElement, renderableData) {
        this.containerElement = containerElement;
        this.renderableData = renderableData;
        this.renderedImages = [];
        this.ringImages = [];
        this.handCanvasElement = containerElement.querySelector(".hand-canvas");
        this.backgroundImageElement = containerElement.querySelector("img.background");
    }
    getShareInfo() {
        for (var a, b = [], c = 0; c < this.renderedImages.length; c++) {
            var d = this.renderedImages[c];
            a = d.imageData.imageType;
            var e, f;
            if (d.renderableHandSnapshotData.flipped) {
                var g = d.renderableHandSnapshotData.data.imageWidth;
                e = g - d.ringConfig.regPointX - d.ringConfig.areaWidth;
            }
            else e = d.ringConfig.regPointX;
            f = d.ringConfig.regPointY;
            var h = { data: d.imageData.image, positionY: f, positionX: e };
            b.push(h);
        }
        var i = this.renderableData.data.id;
        this.renderableData.flipped && (i += "-flipped");
        var j = { containerId: null, imageType: a, images: b, background: i, type: "share" };
        return j;
    }
    placeRenderedImage(ringSnapData) {
        var b, c = ringSnapData.ringConfig.id,
            d = this.containerElement.querySelector("img[data-uid='" + c + "']");
        switch (ringSnapData.imageData.imageType) {
            case "base64":
                b = "data:image/png;base64," + ringSnapData.imageData.image;
                break;
            case "url":
            case "dataurl":
                b = ringSnapData.imageData.image;
                break;
            default:
                throw new Error("Unknown image type " + ringSnapData.imageData.imageType)
        }
        d.src = b;
        this.positionRingImage(d, ringSnapData, 1);
        this.renderedImages.push(ringSnapData);
        this.ringImages.push(d);
    }
    resize(a, b) {
        var c, d, e = this.renderableData.data.imageWidth,
            f = this.renderableData.data.imageHeight,
            g = e / f,
            h = this.renderableData.data.zoomRect;
        this.renderableData.flipped ? (d = -1 * this.renderableData.data.zoomSnap, c = e - (h.x + h.width)) : (d = this.renderableData.data.zoomSnap, c = h.x);
        var i, j, k, l = h.y,
            m = a / h.width,
            n = b / h.height;
        1 > m || 1 > n ? n > m ? (k = m, i = e * k, j = i / g) : (k = n, j = f * k, i = j * g) : (i = e, j = f, k = 1);
        var o = (a - h.width * k) / 2 - c * k,
            p = (b - h.height * k) / 2 - l * k; - 1 == d ? o = Math.min(0, o) : 1 == d ? o = Math.max(o, a - i) : 0 == d && a > i && (i = a, j = i / g, k = i / e, o = 0, p = (b - j) / 2);
        for (var q = 0; q < this.renderedImages.length; q++) {
            var r = this.renderedImages[q],
                s = this.ringImages[q];
            this.positionRingImage(s, r, k)
        }
        this.backgroundImageElement.style.width = i + "px",
            this.backgroundImageElement.style.height = j + "px",
            this.handCanvasElement.style.left = o + "px",
            this.handCanvasElement.style.top = p + "px",
            this.containerElement.style.width = a + "px",
            this.containerElement.style.height = b + "px"
    }
    setVisible(a) {
        a ? this.containerElement.style.display = "block" : this.containerElement.style.display = "none"
    }
    positionRingImage(a, b, c) {
        var d = b.renderableHandSnapshotData.data.imageWidth,
            e = b.ringConfig.areaWidth,
            f = b.ringConfig.areaHeight;
        b.renderableHandSnapshotData.flipped ?
            (a.style.left = (d - b.ringConfig.regPointX - b.ringConfig.areaWidth) * c + "px",
                a.style.top = b.ringConfig.regPointY * c + "px")
            : (a.style.left = b.ringConfig.regPointX * c + "px",
                a.style.top = b.ringConfig.regPointY * c + "px"),
            a.style.width = e * c + "px",
            a.style.height = f * c + "px"
    }
}
class HandView extends EventDispatcher {
    constructor(config, element) {
        super();
        this.width = 500;
        this.height = 500;
        element.jquery ? this.containerElement = element.get(0) : this.containerElement = element;
        this.config = config;
        this.handViewModel = InstanceRegistry.getSingleton(HandViewModel);
        this.handViewModel.setHandSnapshotDatas(config.handSnapshotDatas);
        this.handViewModel.setSnapshotDataMappings(config.snapshotDataMappings);
    }
    setSize(width, height) {
        if (this.width != width || this.height != height) {
            this.width = width;
            this.height = height;
            this.resizeHandImages();
        }
    }
    loadMapping(key, indexArray, responder) {
        var renderableDataArray = this.handViewModel.getRenderableSnapShotDatasByMappingId(key, indexArray);
        this.currentResponder = responder;
        this.createCombinations(renderableDataArray);
        this.handViewModel.loadRenderableSnapshotDatas(renderableDataArray,
            new Responder((ringSnapDatas) => {
                this.drawSnapshotDatasLoaded(ringSnapDatas);
            }, (a) => { this.handleSnapshotDataLoadFailed(a); }, this))
    }
    createCombinations(renderableDataArray) {
        this.handImageContainers = [];
        this.containerElement.innerHTML = "";
        for (var b = 0; b < renderableDataArray.length; b++) {
            var renderableData = renderableDataArray[b],
                handElement = this.getDataItemHtml(renderableData);
            this.containerElement.appendChild(handElement);
            var containerElement = this.containerElement.lastChild,
                handCanvas = new HandCanvas(containerElement, renderableData);
            this.handImageContainers.push(handCanvas)
        }
        this.resizeHandImages()
    }
    getDataItemHtml(renderableData) {
        var handElement = document.createElement(this.config.handImageElement);
        handElement.className = "hand-image";
        handElement.setAttribute("data-uid", renderableData.combinationId);
        handElement.style.overflow = "hidden";

        var divElement = document.createElement("div");
        divElement.className = "hand-canvas";
        divElement.style.position = "relative";

        var path = renderableData.flipped ? renderableData.data.handImageFlipped : renderableData.data.handImage;
        this.config.basePath && (path = Path.combine(this.config.basePath, path));
        var backgroundElement = document.createElement("img");
        backgroundElement.className = "background";
        backgroundElement.src = path;
        backgroundElement.style.position = "absolute";
        backgroundElement.style.left = "0";
        backgroundElement.style.top = "0";
        backgroundElement.draggable = false;

        for (var f = 0; f < renderableData.data.rings.length; f++) {
            var ring = renderableData.data.rings[f],
                ringImgElement = document.createElement("img");
            ringImgElement.className = "ring-image-" + ring.id;
            ringImgElement.setAttribute("data-uid", String(ring.id));
            ringImgElement.style.position = "absolute";
            ringImgElement.style.zIndex = "1";
            ringImgElement.draggable = false;
            divElement.appendChild(ringImgElement);
        }
        divElement.appendChild(backgroundElement);
        handElement.appendChild(divElement);
        return handElement;
    }
    resizeHandImages() {
        if (this.handImageContainers)
            for (var i = 0; i < this.handImageContainers.length; i++) {
                var handImageContainer = this.handImageContainers[i];
                handImageContainer.resize(this.width, this.height);
            }
    }
    placeRenderedImages(ringSnapDataArray) {
        for (var i = 0; i < ringSnapDataArray.length; i++) {
            var ringSnapData = ringSnapDataArray[i];
            var handImageContainer = this.getImageContainerById(ringSnapData.renderableHandSnapshotData.combinationId);
            handImageContainer && handImageContainer.placeRenderedImage(ringSnapData);
        }
    }
    getImageContainerById(combinationId) {
        for (var i = 0; i < this.handImageContainers.length; i++) {
            var handImageContainer = this.handImageContainers[i];
            if (handImageContainer.renderableData.combinationId == combinationId)
                return handImageContainer;
        }
        return null
    }
    drawSnapshotDatasLoaded(ringSnapDataArray) {
        this.placeRenderedImages(ringSnapDataArray);
        this.resizeHandImages();
        this.currentResponder.result([]);
        $('body').removeClass('wait');
    }
    handleSnapshotDataLoadFailed(a) {
        this.currentResponder.fault([a]);
    }
}
class InitDisplay {
    static instance = null;
    static bShowGrid = false;
    static defaultConfig = null;
    ringCount = 2;
    mKYJConfig = {
        "language": "en",
        "store": "1",
        "apiUrl": "https://",
        "baseUrl": "./",
        "display3dUrl": "./",
        "fallback3dUrl": "https://",
        "restApiUrl": "https://",
        "priceApiUrl": "https://",
        "pdfApiUrl": "https://"
    };
    base(b) {
        return this.mKYJConfig.baseUrl + b;
    }
    display3d(b) {
        return this.mKYJConfig.display3dUrl + b;
    }
    fallback3d() {
        return this.mKYJConfig.fallback3dUrl;
    }
    restApi(b) {
        return this.mKYJConfig.restApiUrl + b;
    }
    translationUrl(b) {
        return this.mKYJConfig.apiUrl + "translations/" + b + ".json?" + (new Date().getTime());
    }
    getDisplayView3d() {
        return this.gDisplayView3d;
    }
    getShareSnapshot(a) {
        return this.gDisplayView3d.getShareSnapshot(new Responder(a));
    }
    getSnapshot(a) {
        return this.gDisplayView3d.setShareSnapshot(new Responder(a));
    }
    constructor() {
        var view3DConfig = new View3DConfig;
        view3DConfig.webglEnabled = true;
        view3DConfig.webglConfigLocation = "config-webgl.xml";
        view3DConfig.backgroundColor = "#ffffff";
        view3DConfig.basePath = this.display3d("");
        view3DConfig.fallbackUrl = this.fallback3d("");
        view3DConfig.fallbackDisplayImageIndex = 0;
        view3DConfig.fallbackShareImageIndex = 0;
        view3DConfig.fallbackUseSnapService = true;
        view3DConfig.fallbackDeviceScrollMode = false;
        view3DConfig.forceFallback = view3DConfig.fallbackDeviceScrollMode = false;

        this.gDisplayView3d = new DisplayView3D(view3DConfig);
        this.initialized = true;
        this.ringCount = 2;
    }
    static get_instance() {
        return (
            null == InitDisplay.instance &&
            (InitDisplay.instance = new InitDisplay()),
            InitDisplay.instance
        );
    }
    registerConfig(ringConfig) {
        this.gDisplayView3d.loadConfiguration(ringConfig);
    }
    init(viewId, width, ringConfig) {
        this.ringCount = ringConfig.shapeRingScene.ringModels.length;
        InitDisplay.defaultConfig = ringConfig;
        var $ = jQuery;

        this.registerConfig(ringConfig);

        this.gDisplayView3d.render($(viewId));
        this.gDisplayView3d.setSize(width, width);
    }
    getSize() {
        return this.gDisplayView3d.getSize();
    }
    setSize(w, h) {
        return this.gDisplayView3d.setSize(w, h);
    }
    loadConfiguration(configuration) {
        this.gDisplayView3d.loadConfiguration(configuration);
    }
    switchRing(ringConfig) {
        this.ringCount = ringConfig.shapeRingScene.ringModels.length;

        var webGLDisplay = this.gDisplayView3d.webGLDidplay;
        if (webGLDisplay != null) {
            this.registerConfig(ringConfig);
            webGLDisplay.loadTestConfig(ringConfig);
        }
    }
    switchTestRing(index) {
        var size = TestConfig.testConfigArray.length;
        var ringConfig = TestConfig.testConfigArray[index % size];
        this.ringCount = ringConfig.shapeRingScene.ringModels.length;

        var webGLDisplay = this.gDisplayView3d.webGLDidplay;
        if (webGLDisplay != null) {
            this.registerConfig(ringConfig);
            webGLDisplay.loadTestConfig(ringConfig);
        }
    }
    requestFullscreen() {
        this.gDisplayView3d.requestFullscreen();
    }
    testHandView(handVConfig) {
        this.setHandView(handVConfig);
    }
    setHandView(handVConfig) {
        if (handVConfig.handSnapshotDatas[0].rings.length == 2) {
            this.loadHandView(handVConfig, "man/woman", [1, 0]);
        }
        else if (handVConfig.handSnapshotDatas[0].rings.length == 1) {
            this.loadHandView(handVConfig, "man/woman", [0]);
        }
    }
    loadHandView(respondData, key, ringNumArray) {
        var handViewConfig;
        handViewConfig = new HandViewConfig;
        handViewConfig.handSnapshotDatas = respondData.handSnapshotDatas;
        handViewConfig.snapshotDataMappings = respondData.snapshotDataMappings;
        this.handView = new HandView(handViewConfig, $("#handview_container"));
        if (isMobile) { this.handView.setSize(350, 350); }
        else { this.handView.setSize(respondData.handSnapshotDatas[0].imageWidth / 2, respondData.handSnapshotDatas[0].imageHeight / 2); }
        this.handView.loadMapping(key, ringNumArray, new Responder(() => {
            return this.load = false;
        }, () => {
            return console.log("HandLoad failed")
        }, this));
    }
}
class Manager3DBase extends EventDispatcher {
    constructor(container, scaleRatio) {
        super();
        this.container = container;
        this.scaleRatio = scaleRatio;
        this.renderTaskQue = new TaskQue;
        this.renderQueTimer = new Timer(100);
        this.renderQueTimer.on(TimerEvent.TIMER, this.onRenderQueTimer, this);
    }
    initialize() {
        this.screen = this.createScreen(this.container, this.scaleRatio);
        this.frameTimer = new RequestAnimationFrame(this.onEnterFrame, this);
        this.frameTimer.start();
    }
    requestPackage(a) {
        null != this.packageRequestFunction && this.packageRequestFunction(a)
    }
    createScreen(container, scaleRatio) {
        return new Screen3D(container, scaleRatio)
    }
    startRenderQueTimer() {
        this.renderQueTimer.running || this.renderQueTimer.start()
    }
    stopRenderQueTimer() {
        this.renderQueTimer.running && this.renderQueTimer.stop()
    }
    areRingsGenerating() {
        throw new Error("areRingsGenerating is an abstract method you must override it")
    }
    onEnterFrame() {
        this.screen.stepToNextFrame()
    }
    onRenderQueTimer(a) {
        if (this.renderTaskQue.hasNext()) {
            if (!this.areRingsGenerating())
                try { this.renderTaskQue.runNext() }
                catch (b) { console.error("Error when runing task", b) }
        }
        else this.stopRenderQueTimer()
    }
}
class SnapshotGenerator {
    constructor(screen3D, modelGroup) {
        this.angleToRadian = Math.PI / 180,
            this._lookAtPosition = new THREE.Vector3(0, 10, 0),
            this._distance = 100, this._panAngle = 205,
            this._modelRotationY = 0,
            this._tiltAngle = 45,
            this._imageWidth = 550,
            this._imageHeight = 500,
            this.screen3D = screen3D,
            this.modelContainer = modelGroup,
            this.cameraController = new HoverController,
            this.cameraController.setYFactor(1),
            this.cameraController.setMaxTiltAngle(90),
            this.cameraController.setAutoUpdate(false),
            this.cameraController.setLookAtPosition(this._lookAtPosition),
            this.cameraController.setDistance(this._distance),
            this.cameraController.setPanAngle(this._panAngle),
            this.cameraController.setTiltAngle(this._tiltAngle)
    }
    get lookAtPosition() {
        return this._lookAtPosition
    }
    set lookAtPosition(a) {
        this._lookAtPosition != a && (this._lookAtPosition = a, this.cameraController.setLookAtPosition(a))
    }
    get distance() {
        return this._distance
    }
    set distance(a) {
        this._distance != a && (this._distance = a, this.cameraController.setDistance(a))
    }
    get panAngle() {
        return this._panAngle
    }
    set panAngle(a) {
        this._panAngle != a && (this._panAngle = a, this.cameraController.setPanAngle(a))
    }
    get modelRotationY() {
        return this._modelRotationY
    }
    set modelRotationY(a) {
        this._modelRotationY != a && (this._modelRotationY = a)
    }
    get tiltAngle() {
        return this._tiltAngle
    }
    set tiltAngle(a) {
        this._tiltAngle != a && (this._tiltAngle = a, this.cameraController.setTiltAngle(a))
    }
    get imageWidth() { return this._imageWidth }
    set imageWidth(a) { this._imageWidth != a && (this._imageWidth = a) }
    get imageHeight() { return this._imageHeight }
    set imageHeight(a) { this._imageHeight != a && (this._imageHeight = a) }
    createSnaphot(a, b) {
        this.activateScene();
        this.cameraController.update(false);
        this.screen3D.render();
        var c = this.screen3D.getDataUrl(a, b);
        this.deactivateScene();
        this.screen3D.render();
        return c;
    }
    createMultiSnaphot(a, b, c) {
        this.activateScene()
        var d = [];
        this.cameraController.update(false);
        for (var e = 0; e < a.length; e++) {
            var f = a[e];
            this.modelContainer.rotation.y = f * this.angleToRadian, this.screen3D.render();
            var g = this.screen3D.getDataUrl(b, c);
            d.push(g)
        }
        this.deactivateScene();
        this.screen3D.render();
        return d
    }
    activateScene() {
        this.prevCameraController = this.screen3D.cameraController,
            this.prevViewWidth = this.screen3D.width,
            this.prevViewHeight = this.screen3D.height,
            this.prevModelRotation = this.modelContainer.rotation.y,
            this.screen3D.setCameraController(this.cameraController),
            this.screen3D.setSize(this._imageWidth / this.screen3D.scaleRatio, this._imageHeight / this.screen3D.scaleRatio),
            this.modelContainer.rotation.y = this._modelRotationY * this.angleToRadian
    }
    deactivateScene() {
        this.screen3D.setCameraController(this.prevCameraController),
            this.screen3D.setSize(this.prevViewWidth, this.prevViewHeight),
            this.modelContainer.rotation.y = this.prevModelRotation
    }
}
class ConfigurableSnapshotGenerator extends SnapshotGenerator {
    constructor(b, c, d) {
        super(b, c);
        this.propertyMap = [new PropertySetter("lookAtPosition", XMLValueParser.parseVector3, new THREE.Vector3(0, 12, 0), this.setLookAtPosition), new PropertySetter("distance", XMLValueParser.parseNumber, 170, this.setDistance), new PropertySetter("panAngle", XMLValueParser.parseNumber, 205, this.setPanAngle), new PropertySetter("modelRotationY", XMLValueParser.parseNumber, 180, this.setModelRotationY), new PropertySetter("tiltAngle", XMLValueParser.parseNumber, 10, this.setTiltAngle), new PropertySetter("imageWidth", XMLValueParser.parseNumber, 800, this.setImageWidth), new PropertySetter("imageHeight", XMLValueParser.parseNumber, 800, this.setImageHeight)];
        var g, k = d.child("modelOverrides");
        k.length() && (g = k.get(0)),
            this.propertyOverrideHandler = new PropertyOverrideHandler(this, this.propertyMap, d, g);
    }
    updateToConfig(a) {
        this.propertyOverrideHandler.updateProperty(a.hasModelSceneConfigs())
    }
    setLookAtPosition(a) {
        this.lookAtPosition = a
    }
    setDistance(a) {
        this.distance = a
    }
    setPanAngle(a) {
        this.panAngle = a
    }
    setModelRotationY(a) {
        this.modelRotationY = a
    }
    setTiltAngle(a) {
        this.tiltAngle = a
    }
    setImageWidth(a) {
        this.imageWidth = a
    }
    setImageHeight(a) {
        this.imageHeight = a
    }
}
class ReloadSceneTask {
    constructor(reloadFunc, config, path, obj) {
        this.reloadFunction = reloadFunc,
            this.sceneConfig = config,
            this.path = path,
            this.scope = obj
    }
    run() {
        this.reloadFunction.call(this.scope, this.sceneConfig, this.path)
    }
}
class RenderSnapshotTask {
    constructor(a, b) {
        this.snapshotGenerator = a;
        this.responder = b;
    }
    run() {
        var a = this.snapshotGenerator.createSnaphot();
        this.responder.result([a])
    }
}
class RenderHandTask {
    constructor(generator, handDataConfig, responder) {
        this.generator = generator;
        this.handData = handDataConfig;
        this.responder = responder;
    }
    run() {
        this.generator.createSnapshot(this.handData, this.responder);
    }
}
class ClearTask {
    constructor(a, b) {
        this.clearFunction = a,
            this.scope = b
    }
    run() {
        this.clearFunction.call(this.scope)
    }
}
class ConfiguratorManager3DBase extends Manager3DBase {
    skin3DModels = [];
    constructor(container, scaleRatio) {
        super(container, scaleRatio);
        this.settingsModel = InstanceRegistry.getSingleton(SettingsModel),
            this.materialDictionary = new MaterialDictionary,
            this.callbackCounter = new CallbackCounter(this),
            this.resultCallbackCounter = new CallbackCounter(this),
            this.resultCallbackCounter.setCallbackFunc(this.handleAllRingsReady);
    }
    get assemblerMaterialRegistry() { return this.materialRegistry }
    loadScene(config, path) {
        this.doClear();//kkk add
        var task = new ReloadSceneTask(this.doReloadSceneConfig, config, path, this);
        this.renderTaskQue.addTask(task);
        this.startRenderQueTimer();
    }
    renderSnapshot(a) {
        var b = new RenderSnapshotTask(this.snapshotGenerator, a);
        this.renderTaskQue.addTask(b), this.startRenderQueTimer()
    }
    renderHandSnapshot(handSceneConfig, reponder) {
        var task = new RenderHandTask(this.handViewGenerator, handSceneConfig, reponder);
        this.renderTaskQue.addTask(task);
        this.startRenderQueTimer()
    }
    clear() {
        this.renderTaskQue.clear();
        var a = new ClearTask(this.doClear, this);
        this.renderTaskQue.addTask(a), this.startRenderQueTimer()
    }
    initialize() {
        super.initialize();
        this.modelContainer = new THREE.Group;

        this.sceneHandler = this.createSceneHandler();
        this.sceneHandler && this.sceneHandler.initialize(this.screen, this.modelContainer, this.resourceStore, this.settingsModel, false);

        this.hoverController = this.createHoverController();
        this.hoverControllerMouseDelegate = new MouseEventDelegate(this.hoverController, this.container);
        this.hoverControllerMouseDelegate.disableAreaEvents = true;
        this.hoverControllerMouseDelegate.mouseWheelResolution = .5;
        this.modelMouseRotator = this.createModelMouseRotator();
        new MouseEventDelegate(this.modelMouseRotator, this.container);

        this.screen.cameraFieldOfView = 40;
        this.screen.cameraNear = 0.1;
        this.screen.cameraFar = 400;
        this.screen.autoUpdate = false;

        this.screen.setCameraController(this.hoverController);

        this.sceneHandler && this.sceneHandler.beforeRingsCreated();
        this.createRings();
        this.sceneHandler && this.sceneHandler.afterRingsCreated(this.hibridModelManagers);
        this.assemblerMaterialRegistry.on(FaultErrorEvent.ERROR, this.onRegistryFault, this);
    }
    createSceneHandler() {
        return null
    }
    createScreen(container, scaleRatio) {
        var c = this.resourceStore.getResource("sparklemap").content;
        return new RingConfigurator3DScreen(container, scaleRatio, c)
    }
    areRingsGenerating() {
        for (var a = 0; a < this.hibridModelManagers.length; a++) {
            var b = this.hibridModelManagers[a];
            if (b.generationInProgress)
                return true
        }
        return false
    }
    createHoverController() {
        var a = new MouseHoverController;
        return a.setYFactor(1),
            a.setMaxTiltAngle(90),
            a.setLookAtPosition(new THREE.Vector3(0, 12, 0)),
            a.setDistance(170),
            a.setPanLock(true),
            a.setPanAngle(360),
            a.moveSpeed = .2,
            a.setMouseWheelEnabled(true),
            a.setUpdatableScreen(this.screen),
            a
    }
    createSnapshotGenerator(screen, modelContainer) {
        var snapshotGenerator = new SnapshotGenerator(screen, modelContainer);
        return snapshotGenerator.lookAtPosition = new THREE.Vector3(0, 12, 0),
            snapshotGenerator.distance = 170,
            snapshotGenerator.panAngle = 205,
            snapshotGenerator.tiltAngle = 10,
            snapshotGenerator.imageWidth = 800,
            snapshotGenerator.imageHeight = 800,
            snapshotGenerator.modelRotationY = 180,
            snapshotGenerator
    }
    createModelMouseRotator() {
        var a = new ModelMouseRotator;
        return a.panAngle = 180,
            a.updatableScreen = this.screen,
            a.rotationSpeed = .2,
            a
    }
    createHibridModelManager(skinModel, b, c, d) {
        var hibridModelManager = new HibridModelManager(skinModel, this.resourceStore);

        hibridModelManager.variationName = "variation-gl",
            hibridModelManager.modelNamePostfix = ".gl",
            hibridModelManager.buildAsssetRegistry = c,
            hibridModelManager.assemblerMaterialRegistry = this.assemblerMaterialRegistry,
            hibridModelManager.materialAssetMappingFactory = d;
        return hibridModelManager
    }
    createHandViewGenerator(skin3DModels, assetRegistry, mappingFactory) {
        var generator = new HandViewGenerator(this.screen, skin3DModels, this.resourceStore);
        generator.modelManager.modelNamePostfix = ".gl";
        generator.modelManager.variationName = "variation-gl";
        generator.innerShadowColor = 0x8C6552;
        generator.setAssemblerMaterialRegistry(this.assemblerMaterialRegistry);
        generator.buildAsssetRegistry = assetRegistry;
        generator.materialAssetMappingFactory = mappingFactory;
        return generator;
    }
    createRings(ringCount) {
        null == ringCount && (ringCount = 3);
        this.hibridModelManagers = [];
        this.skin3DModels = [];
        this.snapshotGenerator = this.createSnapshotGenerator(this.screen, this.modelContainer);
        var assetRegistry = this.createBuildAssetRegistry();
        assetRegistry.resourceStore = this.resourceStore;
        assetRegistry.assetModel = this.assemblerMaterialRegistry.assetModel;

        var meshDataAssetMappingFactory = this.createMeshDataAssetMappingFactory(),
            shadowImage = this.resourceStore.getResource("shadow").content;
        for (var i = 0; i < ringCount; i++) {
            var skinModel = new Skinnable3DModel();
            skinModel.frustumCulled = false;
            skinModel.shadowAlpha = 1;
            skinModel.shadowEnabled = true;
            skinModel.shadowImage = shadowImage;
            this.skin3DModels[i] = skinModel;
            skinModel.shadowScaleXRatio = 6;
            skinModel.shadowScaleYRatio = 2;
            this.hibridModelManagers[i] = this.createHibridModelManager(skinModel, this.resourceStore, assetRegistry, meshDataAssetMappingFactory);
            this.modelContainer.add(skinModel);
        }
        this.modelContainer.children[0].translateX(-8);
        this.modelContainer.children[0].rotateY(Math.PI / 3);
        this.modelContainer.children[1].translateX(8);

        this.handViewGenerator = this.createHandViewGenerator(this.skin3DModels, assetRegistry, meshDataAssetMappingFactory);
        this.ringLayout = this.createRingLayout(this.hibridModelManagers);
        this.ringLayout.on(Event.CHANGE, this.handleLayoutChange, this);

        this.screen.screenScene.add(this.modelContainer);
        this.modelMouseRotator.addModel(this.modelContainer);
    }
    doReloadSceneConfig(sceneConfig, b) {
        var id, modelManager;
        var configs = HibridRingSceneConfigParser.getRingConfigs(sceneConfig);

        var len = configs.length;//Object.keys(configs).length,//
        var modelRingMode = sceneConfig.hasModelSceneConfigs();

        this.ringLayout.modelRingMode = modelRingMode;
        this.ringLayout.setRingCount(len);
        this.resultCallbackCounter.reset();
        this.resultCallbackCounter.numCallback = len;
        this.sceneHandler && this.sceneHandler.handleLoadConfig(sceneConfig);

        for (var id = 0; id < this.hibridModelManagers.length; id++) {
            modelManager = this.hibridModelManagers[id];
            if (id >= len) {
                modelManager.skinnable3DModel.clear();
                // this.modelContainer.remove(modelManager.skinnable3DModel);
                modelManager.clear();
            }
        }

        for (id = 0; len > id; id++) {
            var ringConfig = configs[id];
            modelManager = this.hibridModelManagers[id];

            try {
                if (ringConfig instanceof ShapeRingConfig) {
                    modelManager.loadShapeRingConfig(ringConfig,
                        new Responder((a) => {
                            this.resultCallbackCounter.incCallNum()
                        }, (a) => {
                            console.error("Fault while loading config:", a),
                                this.hasEventListener(FaultErrorEvent.ERROR) && this.dispatchEvent(new FaultErrorEvent(FaultErrorEvent.ERROR, a))
                        }, this));
                }
                else if (ringConfig instanceof ModelRingConfig) {
                    modelManager.loadModelRingConfig(ringConfig, new Responder(() => {
                        this.resultCallbackCounter.incCallNum()
                    }, (a) => {
                        console.error("Error when loading model config", a)
                    }, this));
                }
            }
            catch (o) { console.error("Error when loading config", o) }
        }
    }
    doClear() {
        for (var a = 0; a < this.hibridModelManagers.length; a++) {
            var b = this.hibridModelManagers[a];
            b.clear()
        }
        this.screen.updateOnNextFrame()
    }
    static bShowGrid = false;
    showGrid() {
        ConfiguratorManager3DBase.bShowGrid = !ConfiguratorManager3DBase;
    }
    handleAllRingsReady() {
        $('body').removeClass('wait');

        if (InitDisplay.get_instance().ringCount > 1) {
            if (this.modelContainer.children[0].position.x == 0) {
                this.modelContainer.children[0].translateX(-8);
                this.modelContainer.children[0].rotateY(Math.PI / 3);
            }
        }
        else {
            var posX = this.modelContainer.children[0].position.x;
            if (posX != 0) {
                this.modelContainer.children[0].rotateY(-Math.PI / 3);
                this.modelContainer.children[0].translateX(-posX);
            }
        }

        for (var whitch = 0; whitch < 0; whitch++) {
            var len = this.modelContainer.children[whitch].children[0].children.length;
            var color = [0x0000ff, 0xff0000, 0x00ff00, 0];
            var k = 0;
            for (var i = 0; i < len; i++) {
                if (true) {
                    this.modelContainer.children[whitch].children[0].children[i].material = new THREE.MeshBasicMaterial({
                        color: color[i % 4],
                        wireframe: true
                    });
                    // this.modelContainer.children[whitch].children[0].children[i].material.side = DoubleSide;
                }
            }
        }
        this.screen.updateOnNextFrame();
    }
    handleLayoutChange(a) {
        this.screen.updateOnNextFrame()
    }
    onRegistryFault(a) {
        console.error(a.fault.toString()),
            this.hasEventListener(FaultErrorEvent.ERROR) && this.dispatchEvent(new FaultErrorEvent(FaultErrorEvent.ERROR, a.fault))
    }
}
class MeshDataAssetMappingFactoryBase {
    constructor() {
        this.usedMetaDatas = [],
            this.usedMetaDataMap = {}
    }
    getMappingAsset(surfaceOverride, gradientOverride, activeSimpleMeshData, config) {
        this.activeSimpleMeshData = activeSimpleMeshData;
        return this.doGetMappingAsset(surfaceOverride, gradientOverride, config);
    }
    registerMetaData(a) {
        this.usedMetaDataMap[a] || (this.usedMetaDataMap[a] = true, this.usedMetaDatas.push(a))
    }
    hasMetaData(a) {
        if (!this.usedMetaDataMap[a]) throw new Error("metadata " + a + " was not registered");
        return this.activeSimpleMeshData.hasMetadata(a)
    }
    getMetadata(a) {
        if (!this.usedMetaDataMap[a]) throw new Error("metadata " + a + " was not registered");
        return this.activeSimpleMeshData.getMetadata(a)
    }
    equalsMeta(a, b) {
        if (!this.usedMetaDataMap[a]) throw new Error("metadata " + a + " was not registered");
        return this.activeSimpleMeshData.getMetadata(a) == b
    }
}
class MeshDataAssetMappingFactory extends MeshDataAssetMappingFactoryBase {
    constructor() {
        super();
        this.registerMetaData(SegmentMeta.SEGMENT_INDEX);
        this.registerMetaData(GrooveMeta.GROOVE_INDEX);
        this.registerMetaData(DiamondMeta.DIAMOND_GROUP_INDEX);
        this.registerMetaData(DiamondMeta.DIAMOND_PART);
        this.registerMetaData(CapMeshMeta.CAP_MESH);
        this.registerMetaData(EngravingMeta.ENGRAVING_PART);
        this.registerMetaData(EngravingMeta.ENGRAVING_UID);
        this.registerMetaData(EngravingMeta.ENGRAVING_CARVE_TYPE);
    }
    doGetMappingAsset(surfaceOverride, gradientOverride, config) {
        var matMappingAsset, diamondGroup,
            diamondMetaValue = this.getMetadata(DiamondMeta.DIAMOND_PART),
            bGrooveOverride = false,
            bGrooveSurfaceOverride = false,
            segmentIndex = this.getMetadata(SegmentMeta.SEGMENT_INDEX) || 0,
            segment = config.segments[segmentIndex];

        if (this.hasMetaData(GrooveMeta.GROOVE_INDEX)) {
            var groove = segment.grooves[this.getMetadata(GrooveMeta.GROOVE_INDEX)];
            groove.materialOverride && groove.materialOverride.surfaceOverride && (surfaceOverride = groove.materialOverride.surfaceOverride, bGrooveSurfaceOverride = true);
            groove.materialOverride && groove.materialOverride.gradientOverride && (gradientOverride = groove.materialOverride.gradientOverride);
            bGrooveOverride = true;
        }
        else if (this.hasMetaData(DiamondMeta.DIAMOND_GROUP_INDEX)) {
            diamondGroup = config.diamondGroups[this.getMetadata(DiamondMeta.DIAMOND_GROUP_INDEX)];
            diamondGroup.materialOverride && diamondGroup.materialOverride.surfaceOverride && (surfaceOverride = diamondGroup.materialOverride.surfaceOverride);
            diamondGroup.materialOverride && diamondGroup.materialOverride.gradientOverride && (gradientOverride = diamondGroup.materialOverride.gradientOverride);
        }

        if (diamondMetaValue == DiamondMetaValue.DIAMOND_PART_STONE) {
            diamondGroup = config.diamondGroups[this.getMetadata(DiamondMeta.DIAMOND_GROUP_INDEX)];
            matMappingAsset = diamondGroup.stone.color ? "decor" == diamondGroup.stone.color ? new MaterialMappingAsset(UID.create(MaterialMappingAsset), ["@materials/material_polished.xml"])
                : new MaterialMappingAsset(UID.create(MaterialMappingAsset), ["@materials/diamond_" + diamondGroup.stone.color + ".xml"])
                : new MaterialMappingAsset(UID.create(MaterialMappingAsset), ["@materials/diamond.xml"]);
        }
        else if (diamondMetaValue == DiamondMetaValue.DIAMOND_PART_HOLE) {
            matMappingAsset = new MaterialMappingAsset(UID.create(MaterialMappingAsset), ["@materials/material_polished.xml"]);
        }
        else if (diamondMetaValue == DiamondMetaValue.DIAMOND_PART_CHANNEL) {
            matMappingAsset = new MaterialMappingAsset(UID.create(MaterialMappingAsset), ["@materials/material_diamond-channel.xml"]);
        }
        else if (this.hasMetaData(CapMeshMeta.CAP_MESH)) {
            matMappingAsset = new MaterialMappingAsset(UID.create(MaterialMappingAsset), ["@materials/material_polished.xml"]);
        }
        else if (this.getMetadata(EngravingMeta.ENGRAVING_PART) == EngravingMetaValue.ENGRAVING_PART_ENGRAVING) {
            var engravingCarveType = this.getMetadata(EngravingMeta.ENGRAVING_CARVE_TYPE);
            if (!this.getMetadata(EngravingMeta.ENGRAVING_UID))
                throw new Error("engraving uid not found on engraving part");
            var xmlPath = engravingCarveType ? "@materials/engraving_" + engravingCarveType + ".xml" : "@materials/engraving.xml";
            matMappingAsset = new MaterialMappingAsset(UID.create(MaterialMappingAsset), [xmlPath]),
                matMappingAsset.data = this.getMetadata(EngravingMeta.ENGRAVING_UID);
        }
        else {
            var matConfXmlArray = ["@materials/material_" + surfaceOverride + ".xml"];
            if (bGrooveOverride && !bGrooveSurfaceOverride)
                matConfXmlArray.unshift("@materials/override_groove.xml");
            matMappingAsset = new MaterialMappingAsset(UID.create(MaterialMappingAsset), matConfXmlArray);
        }
        matMappingAsset.setParameter("gradient", gradientOverride);
        return matMappingAsset;
    }
}
class SceneHandlerBase {
    constructor() { }
    initialize(screen, modelGroup, resourceStore, settingsModel, fallbackMode) {
        this.screen = screen;
        this.modelContainer = modelGroup;
        this.resourceStore = resourceStore;
        this.settingsModel = settingsModel;
        this.fallbackMode = fallbackMode;
    }
    beforeRingsCreated() {
    }
    afterRingsCreated(a) {
    }
    handleLoadConfig(a) {
    }
    handleAllRingsReady() {
    }
    handleState(a) {
        for (var b = [], c = 1; c < arguments.length; c++)
            b[c - 1] = arguments[c];
    }
}
class ImageUtils {
    constructor() { }
    static isImage2DValid(b) {
        return null == b ? true : ImageUtils.isDimensionValid(b.width) && ImageUtils.isDimensionValid(b.height)
    }
    static isHTMLImageElementValid(b) {
        return null == b ? true : ImageUtils.isDimensionValid(b.width) && ImageUtils.isDimensionValid(b.height)
    }
    static isDimensionValid(b) {
        return b >= 1 && b <= ImageUtils.MAX_SIZE && ImageUtils.isPowerOfTwo(b)
    }
    static isPowerOfTwo(a) {
        return a ? (a & -a) == a : false
    }
    static getBestPowerOf2(b) {
        for (var c = 1; b > c;) c <<= 1; return c > ImageUtils.MAX_SIZE && (c = ImageUtils.MAX_SIZE), c
    }
    static MAX_SIZE = 2048;
}
class Image2D {
    constructor(a, b, c) {
        undefined == c && (c = true),
            this._powerOfTwo = true,
            this._rect = new Rectangle(0, 0, a, b),
            this._powerOfTwo = c,
            this._testDimensions()
    }
    get height() { return this._rect.height }
    set height(a) { this._rect.height != a && this._setSize(this._rect.width, a) }
    get rect() { return this._rect }
    get width() { return this._rect.width }
    set width(a) { this._rect.width != a && this._setSize(a, this._rect.height) }
    get powerOfTwo() { return this._powerOfTwo }
    set powerOfTwo(a) {
        this._powerOfTwo != a && (this._powerOfTwo = a, this._testDimensions())
    }
    _setSize(a, b) {
        this._rect.width = a,
            this._rect.height = b,
            this._testDimensions()
    }
    _testDimensions() {
        if (this._powerOfTwo &&
            (!ImageUtils.isDimensionValid(this._rect.width) || !ImageUtils.isDimensionValid(this._rect.height)))
            throw new Error("Invalid dimension: Width and height must be power of 2 and cannot exceed 2048")
    }
}
class BitmapImage2D extends Image2D {
    constructor(b, c, d, e, f, g) {
        undefined == d && (d = true),
            undefined == e && (e = null),
            undefined == f && (f = false),
            undefined == g && (g = null);
        super(b, c, f);
        this._locked = false,
            this._transparent = d,
            this._imageCanvas = g || document.createElement("canvas"),
            this._imageCanvas.width != b && (this._imageCanvas.width = b),
            this._imageCanvas.height != c && (this._imageCanvas.height = c),
            this._context = this._imageCanvas.getContext("2d"),
            null != e && this.fillRect(this._rect, e)
    }
    get transparent() { return this._transparent }
    set transparent(a) { this._transparent = a }
    clone() {
        var a = new BitmapImage2D(this.width, this.height, this.transparent, null, this.powerOfTwo);
        return a.draw(this), a
    }
    colorTransform(a, b) {
        this._locked || (this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height));
        var i, j, index, imgData = this._imageData.data;
        for (i = 0; i < a.width; ++i)
            for (j = 0; j < a.height; ++j)
                index = 4 * (i + a.x + (j + a.y) * this.width),
                    imgData[index] = imgData[index] * b.redMultiplier + b.redOffset,
                    imgData[index + 1] = imgData[index + 1] * b.greenMultiplier + b.greenOffset,
                    imgData[index + 2] = imgData[index + 2] * b.blueMultiplier + b.blueOffset,
                    imgData[index + 3] = imgData[index + 3] * b.alphaMultiplier + b.alphaOffset;
        this._locked || (this._context.putImageData(this._imageData, 0, 0), this._imageData = null)
    }
    copyChannel(a, c, d, e, f) {
        this._locked || (this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height));
        var g;
        a instanceof BitmapImage2D ? g = a.getImageData() : a instanceof ImageData && (g = a), BitmapImage2D.copyChannel(g, this._imageData, c, d, e, f), this._locked || (this._context.putImageData(this._imageData, 0, 0), this._imageData = null)
    }
    copyPixels(a, c, d) {
        a instanceof BitmapImage2D && (a = a.getCanvas()),
            this._locked ? (this._context.putImageData(this._imageData, 0, 0),
                BitmapImage2D.copyPixels(this._context, a, c, d),
                this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height)) :
                BitmapImage2D.copyPixels(this._context, a, c, d)
    }
    dispose() {
        this._context = null, this._imageCanvas = null,
            this._imageData = null,
            this._rect = null, this._transparent = null, this._locked = null
    }
    draw(a, c, d, e, f) {
        a instanceof BitmapImage2D && (a = a.getCanvas()),
            this._locked ? (this._context.putImageData(this._imageData, 0, 0),
                BitmapImage2D.draw(this._context, a, c, d, e, f),
                this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height)) :
                BitmapImage2D.draw(this._context, a, c, d, e, f)
    }
    fillRect(a, c) {
        this._locked ? (this._imageData && this._context.putImageData(this._imageData, 0, 0),
            BitmapImage2D.fillRect(this._context, a, c, this._transparent),
            this._imageData && (this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height))) :
            BitmapImage2D.fillRect(this._context, a, c, this._transparent)
    }
    getPixel(a, b) {
        var c, d, e, f;
        if (this._locked) {
            var g = 4 * (a + b * this._imageCanvas.width);
            c = this._imageData.data[g + 0], d = this._imageData.data[g + 1], e = this._imageData.data[g + 2], f = this._imageData.data[g + 3]
        }
        else {
            var h = this._context.getImageData(a, b, 1, 1);
            c = h.data[0], d = h.data[1], e = h.data[2], f = h.data[3]
        }
        return f ? (c << 16 | d << 8 | e) : 0;
    }
    getPixel32(a, b) {
        var c, d, e, f;
        if (this._locked) {
            var g = 4 * (a + b * this._imageCanvas.width);
            c = this._imageData.data[g + 0], d = this._imageData.data[g + 1], e = this._imageData.data[g + 2], f = this._imageData.data[g + 3]
        } else {
            var h = this._context.getImageData(a, b, 1, 1);
            c = h.data[0], d = h.data[1], e = h.data[2], f = h.data[3]
        }
        return f << 24 | c << 16 | d << 8 | e
    }
    lock() {
        this._locked || (this._locked = true, this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height))
    }
    setArray(a, b) {
        this._locked || (this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height));
        var c, d, e, f;
        for (c = 0; c < a.width; ++c)
            for (d = 0; d < a.height; ++d) f = ColorUtils.float32ColorToARGB(b[c + d * a.width]), e = 4 * (c + a.x + (d + a.y) * this._imageCanvas.width), this._imageData.data[e + 0] = f[1], this._imageData.data[e + 1] = f[2], this._imageData.data[e + 2] = f[3], this._imageData.data[e + 3] = f[0];
        this._locked || (this._context.putImageData(this._imageData, 0, 0), this._imageData = null)
    }
    setPixel(a, b, c) {
        var d = ColorUtils.float32ColorToARGB(c);
        this._locked || (this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height));
        var e = 4 * (a + b * this._imageCanvas.width);
        this._imageData.data[e + 0] = d[1], this._imageData.data[e + 1] = d[2], this._imageData.data[e + 2] = d[3], this._imageData.data[e + 3] = 255, this._locked || (this._context.putImageData(this._imageData, 0, 0), this._imageData = null)
    }
    setPixel32(a, b, c) {
        var d = ColorUtils.float32ColorToARGB(c);
        this._locked || (this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height));
        var e = 4 * (a + b * this._imageCanvas.width);
        this._imageData.data[e + 0] = d[1], this._imageData.data[e + 1] = d[2], this._imageData.data[e + 2] = d[3], this._imageData.data[e + 3] = d[0], this._locked || (this._context.putImageData(this._imageData, 0, 0), this._imageData = null)
    }
    unlock() {
        this._locked && (this._locked = false, this._context.putImageData(this._imageData, 0, 0), this._imageData = null)
    }
    setImageData(a, b, c) {
        if (undefined == b && (b = false), undefined == c && (c = false), a.width != this._imageCanvas.width || a.height != this._imageCanvas.height) throw new Error("Image data must be the same size as the bitmap canvas IDAT:" + a.width + "/" + a.height + " CANV:" + this._imageCanvas.width + "/" + this._imageCanvas.height);
        this._context.putImageData(a, 0, 0), (b || c) && (this._context.save(), this._context.globalCompositeOperation = "copy", this._context.scale(b ? -1 : 1, c ? -1 : 1), this._context.translate(a.width * (b ? -1 : 0), a.height * (c ? -1 : 0)), this._context.drawImage(this._context.canvas, 0, 0), this._context.restore())
    }
    createImageData(a, b) {
        return a = void 0 == a ? this.width : a, b = void 0 == b ? this.height : b, this._context.createImageData(a, b)
    }
    getImageData() {
        return this._locked ? this._imageData : this._context.getImageData(0, 0, this._rect.width, this._rect.height)
    }
    getDataURL(a, b) {
        return this._imageCanvas.toDataURL(a, b)
    }
    getCanvas() {
        return this._imageCanvas
    }
    getContext() {
        return this._context
    }
    _setSize(b, c) {
        this._locked && this._context.putImageData(this._imageData, 0, 0),
            this._imageCanvas.width = b,
            this._imageCanvas.height = c,
            super._setSize(b, c),
            this._locked && (this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height))
    }
    static copyChannel(a, b, c, d, e, f) {
        var g, h, i, j, k = a.data,
            l = b.data,
            m = Math.round(Math.log(e) / Math.log(2)),
            n = Math.round(Math.log(f) / Math.log(2));
        for (g = 0; g < c.width; ++g)
            for (h = 0; h < c.height; ++h) i = 4 * (g + c.x + (h + c.y) * a.width), j = 4 * (g + d.x + (h + d.y) * a.width), l[j + n] = k[i + m]
    }
    static copyPixels(a, b, c, d) {
        a.drawImage(b, c.x, c.y, c.width, c.height, d.x, d.y, d.width, d.height)
    }
    static draw(a, b, c, d, e, f) {
        undefined == f && (f = false),
            a.save(),
            a.globalCompositeOperation = d,
            a.mozImageSmoothingEnabled = f,
            a.webkitImageSmoothingEnabled = f,
            a.msImageSmoothingEnabled = f,
            a.imageSmoothingEnabled = f,
            a.imageSmoothingQuality = "high",
            null != c && a.setTransform(c.a, c.b, c.c, c.d, c.tx, c.ty),
            null != e ? a.drawImage(b, e.x, e.y, e.width, e.height) : a.drawImage(b, 0, 0),
            a.restore()
    }
    static fillRect(a, b, c, d) {
        if (0 == c && d)
            a.clearRect(b.x, b.y, b.width, b.height);
        else {
            var e = ColorUtils.float32ColorToARGB(c);
            d ? a.fillStyle = "rgba(" + e[1] + "," + e[2] + "," + e[3] + "," + e[0] / 255 + ")" : a.fillStyle = "rgba(" + e[1] + "," + e[2] + "," + e[3] + ",1)",
                a.fillRect(b.x, b.y, b.width, b.height)
        }
    }
}
class HandViewGeneratorBase {
    constructor(screen3D, skin3DModels, b) {
        this.skin3DModels = skin3DModels;
        this.anglesToRadians = Math.PI / 180;
        this.shotScaleFactor = 4;
        this.addShadow = true;
        this.fingerRadiusOffset = .2;
        this.innerShadowColor = 7024429;
        this.showFingerMaterial = false;
        this.darkenGradientBlendMode = BlendMode.MULTIPLY;
        this.screen3D = screen3D;
        var occlusionMaterial = new THREE.RawShaderMaterial({ uniforms: OcclusionShader.uniforms, vertexShader: OcclusionShader.vertexShader, fragmentShader: OcclusionShader.fragmentShader });
        this.occlusionMaterial = occlusionMaterial;

        this.handViewCamera = this.createCamera();
        this.handViewScene = new THREE.Scene;
        this.handViewContainer = new THREE.Group;
        this.handViewScene.add(this.handViewContainer);
        this.handViewScene.add(this.handViewCamera);
        this.ringModel = this.createSkinnableModel();

        this.initialize();
    }
    createSnapshot(handSceneConfig, responder) {
        this.currentConfiguration = handSceneConfig;
        this.currentResponder = responder;

        // kkk todo todo
        // this.loadRingConfig(handSceneConfig.ringConfig, new Responder(() => {
        //     Date.now();
        //     this.doCreateSnapshot(handSceneConfig.handConfig);
        // }, (a) => { responder.fault([a]) }, this));

        this.doCreateSnapshot(handSceneConfig.handConfig);
    }
    initialize() { }
    createCamera() {
        var camera = new THREE.PerspectiveCamera(15, 1, 1, 4e3);
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 1100;
        return camera;
    }
    createSkinnableModel() {
        var skinnable3DModel = new Skinnable3DModel;
        skinnable3DModel.shiftModelBottomToVerticalCenter = false;
        skinnable3DModel.shadowEnabled = false;
        return skinnable3DModel
    }
    disposeScene() {
        for (; this.handViewContainer.children.length;) {
            this.handViewContainer.remove(this.handViewContainer.children[0]);
        }
        if (this.handViewDisposables) {
            for (var a = 0; a < this.handViewDisposables.length; a++)
                this.handViewDisposables[a].dispose();
        }
        this.handViewDisposables = null;
    }
    activateScene(handSnapshotConfig) {
        this.prevComposer = this.screen3D.composer;
        this.prevCamera = this.screen3D.camera;
        this.prevScene = this.screen3D.screenScene;
        this.prevBackgroundAlpha = this.screen3D.backgroundAlpha;
        this.prevBackgroundColor = this.screen3D.backgroundColor;
        this.prevViewWidth = this.screen3D.width;
        this.prevViewHeight = this.screen3D.height;

        this.screen3D.composer = null;
        this.screen3D.camera = this.handViewCamera;
        this.screen3D.screenScene = this.handViewScene;
        this.screen3D.backgroundAlpha = 0;
        this.screen3D.backgroundColor = 0;
        this.screen3D.setSize(800, 800);
    }
    deactivateScene() {
        this.screen3D.camera = this.prevCamera;
        this.screen3D.screenScene = this.prevScene;
        this.screen3D.backgroundAlpha = this.prevBackgroundAlpha;
        this.screen3D.backgroundColor = this.prevBackgroundColor;
        this.screen3D.setSize(this.prevViewWidth, this.prevViewHeight);
        this.screen3D.composer = this.prevComposer;
    }
    //kkk kkk todo
    doCreateSnapshot(handSnapshotConfig) {
        //move to hand state
        this.createScene(handSnapshotConfig.handConfiguation, handSnapshotConfig.id);
        this.activateScene(handSnapshotConfig);
        var scaleRatio = this.screen3D.scaleRatio,
            scale = scaleRatio * this.shotScaleFactor,
            bitmap1 = new BitmapImage2D(this.screen3D.renderer.context.drawingBufferWidth, this.screen3D.renderer.context.drawingBufferHeight, true, 0);

        this.screen3D.render();

        var imageData = this.screen3D.getImageData(bitmap1.createImageData());
        bitmap1.setImageData(imageData, handSnapshotConfig.flipped, true);
        var bitmap2 = new BitmapImage2D(handSnapshotConfig.viewArea.width, handSnapshotConfig.viewArea.height),
            transform = new Matrix;
        transform.translate(-Math.floor((bitmap1.width - handSnapshotConfig.viewArea.width * scale) / 2),
            -Math.floor((bitmap1.height - handSnapshotConfig.viewArea.height * scale) / 2));
        transform.scale(1 / scale, 1 / scale);
        bitmap2.draw(bitmap1, transform, null, null, true);
        bitmap1.dispose();
        if (handSnapshotConfig.darkenGradientConfig) {
            var drakenGradientImageData = this.createDarkenGradientImage(bitmap2.width, bitmap2.height, handSnapshotConfig.darkenGradientConfig),
                imageData2 = bitmap2.getImageData(),
                bitmap3 = new BitmapImage2D(bitmap2.width, bitmap2.height);
            bitmap3.setImageData(drakenGradientImageData);
            bitmap2.draw(bitmap3, null, this.darkenGradientBlendMode, null, true);
            var k = bitmap2.getImageData();
            var l = k.width * k.height * 4;
            for (var m = 0; l > m; m += 4)
                k.data[m + 3] = imageData2.data[m + 3];
            bitmap2.setImageData(k);
            bitmap3.dispose()
        }
        if (this.addShadow) {
            var p = 2,
                canvas = document.createElement("canvas");
            canvas.width = bitmap2.width, canvas.height = bitmap2.height;
            var ctx = canvas.getContext("2d");
            ctx.save(),
                ctx.shadowOffsetX = 0,
                ctx.shadowOffsetY = 0,
                ctx.shadowColor = ColorUtils.floatToRGBString(this.innerShadowColor),
                ctx.shadowBlur = 3 * p,
                ctx.drawImage(bitmap2.getCanvas(), 0, 0),
                ctx.restore();
            var bitmap = new BitmapImage2D(bitmap2.width, bitmap2.height, true, 0);
            bitmap.setImageData(ctx.getImageData(0, 0, bitmap2.width, bitmap2.height));
            bitmap2 = bitmap
        }

        this.deactivateScene();
        this.disposeScene();

        this.screen3D.render();

        //resore original state
        if (this.currentResponder) {
            // HandView.drawSnapshotDatasLoaded
            this.currentResponder.result([bitmap2.getDataURL()]);
            bitmap2.dispose();
        }
    }
    testCreateSnapshot(handSnapshotConfig) {
        //move to hand state
        this.createScene(handSnapshotConfig.handConfiguation);
        this.activateScene(handSnapshotConfig);
        this.screen3D.render();
    }
    createScene(handConfiguation, ringId) {
        this.ringModel = this.skin3DModels[ringId].clone();

        this.handViewDisposables = [];
        var geometry, maskMesh, ringFinger;
        for (var id = 0; id < handConfiguation.fingers.length; id++) {
            var finger = handConfiguation.fingers[id];
            geometry = new THREE.CylinderGeometry(
                (finger.radius + this.fingerRadiusOffset + finger.radiusOffset) * this.shotScaleFactor,
                (finger.radius + this.fingerRadiusOffset + finger.radiusOffset) * this.shotScaleFactor,
                finger.height * this.shotScaleFactor,
                100, 1);

            var material;
            // this.showFingerMaterial = true;
            this.showFingerMaterial ? (material = new THREE.MeshBasicMaterial({ color: 255 }),
                material.transparent = true, material.opacity = .5) :
                material = this.occlusionMaterial;

            maskMesh = new THREE.Mesh(geometry, material);

            // material.wireframe = true;

            var matrix = new Matrix3D;
            matrix.appendTranslation(finger.x * this.shotScaleFactor + finger.offsetX,
                finger.y * this.shotScaleFactor + finger.offsetY,
                finger.z * this.shotScaleFactor + finger.offsetZ);
            matrix.appendRotation(finger.rotationX, new Vector3D(1, 0, 0));
            matrix.appendRotation(finger.rotationY, new Vector3D(0, 1, 0));
            matrix.appendRotation(finger.rotationZ, new Vector3D(0, 0, 1));
            maskMesh.matrixAutoUpdate = false;
            maskMesh.matrix = GeomUtils.convertMatrix(matrix, true);

            this.handViewDisposables.push(new DisposeCallDisposer([geometry]));
            this.handViewContainer.add(maskMesh);

            finger.ringFinger && (ringFinger = finger)
        }
        if (!ringFinger) throw new Error("Ring finger not found");

        var innerRadious = this.getInnerRadious(),
            scale = ringFinger.radius * this.shotScaleFactor / innerRadious,
            transform = new Matrix3D;
        transform.appendTranslation(0, -innerRadious, 0);
        transform.appendRotation(90, new Vector3D(0, 0, 1));
        transform.appendRotation(-90, new Vector3D(0, 1, 0));
        transform.appendRotation(ringFinger.rotationX, new Vector3D(1, 0, 0));
        transform.appendRotation(ringFinger.rotationY, new Vector3D(0, 1, 0));
        transform.appendRotation(ringFinger.rotationZ, new Vector3D(0, 0, 1));
        transform.appendScale(scale, scale, scale);
        var matrix4 = GeomUtils.convertMatrix(transform, true);
        matrix4.decompose(this.ringModel.position, this.ringModel.quaternion, this.ringModel.scale);

        this.handViewContainer.add(this.ringModel);

        // const testGeometry = new THREE.BoxGeometry(50, 50, 50);
        // const testMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
        // const cube = new THREE.Mesh(testGeometry, testMaterial);
        // this.handViewContainer.add(cube);

    }
    testCreateScene(handConfiguation) {
        const testGeometry = new THREE.BoxGeometry(50, 50, 50);
        const testMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
        const cube = new THREE.Mesh(testGeometry, testMaterial);
        this.handViewContainer.add(cube);
    }
    createDarkenGradientImage(width, height, c) {
        var canvas = document.createElement("canvas");
        canvas.width = width, canvas.height = height;
        var ctx = canvas.getContext("2d"),
            centerPt = new Point(width / 2, height / 2),
            pt1 = new Point(0, height / 2),
            pt2 = new Point(width, height / 2);
        pt1 = GeomUtils.rotatePointAroundCenter(pt1, centerPt, c.rotation);
        pt2 = GeomUtils.rotatePointAroundCenter(pt2, centerPt, c.rotation);
        for (var i = ctx.createLinearGradient(pt1.x, pt1.y, pt2.x, pt2.y), j = 0; j < c.colors.length; j++) {
            var k = c.colors[j],
                l = c.alphas[j],
                n = c.ratios[j],
                o = ColorUtils.float32ColorToARGB(k);
            i.addColorStop(n / 255, "rgba(" + o[1] + "," + o[2] + "," + o[3] + "," + l + ")")
        }
        ctx.fillStyle = i, ctx.fillRect(0, 0, width, height);
        var r = ctx.getImageData(0, 0, width, height);
        return r
    }
}
class HandViewGenerator extends HandViewGeneratorBase {
    constructor(screen3D, skin3DModels, resourceStore) {
        super(screen3D, skin3DModels, resourceStore);
        this.modelManager = this.createModelManager(this.ringModel, resourceStore);
        this.modelManager.enableRepositioning = false;
    }
    setAssemblerMaterialRegistry(b) {
        this.modelManager.assemblerMaterialRegistry = b;
        //kkk
        // super.setAssemblerMaterialRegistry(b);
    }
    get modelReferenceConverter() { return this._modelReferenceConverter }
    set modelReferenceConverter(a) { this._modelReferenceConverter != a && (this._modelReferenceConverter = a, this.modelManager.modelReferenceConverter = a) }
    get buildAsssetRegistry() { return this._buildAsssetRegistry }
    set buildAsssetRegistry(a) { this._buildAsssetRegistry != a && (this._buildAsssetRegistry = a, this.modelManager.buildAsssetRegistry = a) }
    get materialAssetMappingFactory() { return this._materialAssetMappingFactory }
    set materialAssetMappingFactory(a) { this._materialAssetMappingFactory != a && (this._materialAssetMappingFactory = a, this.modelManager.materialAssetMappingFactory = a) }
    getGenerationInProgress() {
        return this.modelManager.generationInProgress
    }
    createModelManager(ringModel, resourceStore) {
        return new HibridModelManager(ringModel, resourceStore);
    }
    loadRingConfig(ringConfig, responder) {
        if (ringConfig instanceof ModelRingConfig) {
            var c = ringConfig;
            this.modelManager.loadModelRingConfig(c, responder)
        } else {
            if (!(ringConfig instanceof ShapeRingConfig)) throw new Error("Unknown config " + ringConfig);
            var config = ringConfig;
            this.modelManager.loadShapeRingConfig(config, responder)
        }
    }
    getInnerRadious() {
        if (this.currentConfiguration.ringConfig instanceof ModelRingConfig)
            return this.currentConfiguration.ringConfig.circumference / (2 * Math.PI);
        if (this.currentConfiguration.ringConfig instanceof ShapeRingConfig)
            return this.currentConfiguration.ringConfig.circumference / (2 * Math.PI);
        throw new Error("Unknown configuration")
    }
    disposeScene() {
        super.disposeScene(), this.modelManager.clear()
    }
}
class ConfiguratorManager3D extends ConfiguratorManager3DBase {
    constructor(container, scaleRatio) {
        super(container, scaleRatio);
        var introXML = this.settingsModel.getXMLProperty("intro");
        this.introEnabled = XMLValueParser.parseBoolean(introXML, "enabled", false);//kkk
        this.introFadeRotation = XMLValueParser.parseNumber(introXML, "fadeRotation", 25);
        this.introDelay = XMLValueParser.parseNumber(introXML, "delay", .5);
        this.introDuration = XMLValueParser.parseNumber(introXML, "duration", .5);
    }
    createSceneHandler() {
        return new SceneHandlerBase;
    }
    createRings(count) {
        null == count && (count = 3);
        var maxRingCount = this.settingsModel.getStringProperty("maxRingCount");
        maxRingCount ? super.createRings(parseInt(maxRingCount)) : super.createRings(count)
    }
    createHoverController() {
        var c = this.settingsModel.getXMLProperty("hoverController");
        var mouseHoverController = new ConfigurableMouseHoverController(c);
        mouseHoverController.setUpdatableScreen(this.screen);
        return mouseHoverController
    }
    createSnapshotGenerator(b, c) {
        var e = this.settingsModel.getXMLProperty("snapshotGenerator");
        var _SnapshotGenerator = new ConfigurableSnapshotGenerator(b, c, e);
        return _SnapshotGenerator
    }
    createModelMouseRotator() {
        var c = this.settingsModel.getXMLProperty("modelRotator");
        var b = new ConfigurableModelMouseRotator(c);
        b.updatableScreen = this.screen;
        return b;
    }
    createHibridModelManager(b, c, d, e) {
        var f = new HibridModelManager(b, this.resourceStore);
        f.buildAsssetRegistry = d;
        f.assemblerMaterialRegistry = this.assemblerMaterialRegistry;
        f.materialAssetMappingFactory = e;
        return f;
    }
    createHandViewGenerator(skin3DModels, assetRegistry, meshDataAssetMappingFactory) {
        var handViewGenerator = new HandViewGenerator(this.screen, skin3DModels, this.resourceStore);
        handViewGenerator.setAssemblerMaterialRegistry(this.assemblerMaterialRegistry);
        handViewGenerator.buildAsssetRegistry = assetRegistry;
        handViewGenerator.materialAssetMappingFactory = meshDataAssetMappingFactory;
        return handViewGenerator;
    }
    createBuildAssetRegistry() {
        return new BuildAssetRegistry
    }
    createMeshDataAssetMappingFactory() {
        return new MeshDataAssetMappingFactory
    }
    createRingLayout(models) {
        // return new RingLayout(models);
        var laySetting = this.settingsModel.getXMLProperty("ringLayout");
        var d = laySetting.attribute("type").text();
        if ("simple" == d)
            return new ConfigurableRingLayout(laySetting, models);
        throw new Error("Unknown layout type " + d);
    }
    doReloadSceneConfig(sceneConfig, c) {
        super.doReloadSceneConfig(sceneConfig, c);
        this.hoverController instanceof ConfigurableMouseHoverController && this.hoverController.updateToConfig(sceneConfig),
            this.modelMouseRotator instanceof ConfigurableModelMouseRotator && this.modelMouseRotator.updateToConfig(sceneConfig),
            this.snapshotGenerator instanceof ConfigurableSnapshotGenerator && this.snapshotGenerator.updateToConfig(sceneConfig)
    }
    handleAllRingsReady() {
        super.handleAllRingsReady();
        if (this.introEnabled && !this.introPlayed) {
            var c = this.modelMouseRotator._panAngle;
            this.modelMouseRotator._panAngle = c + this.introFadeRotation;
            gsap.to(this.modelMouseRotator, this.introDuration, {
                panAngle: c,
                delay: this.introDelay,
                onUpdate: () => {
                    this.screen.updateOnNextFrame()
                },
                onComplete: () => {
                    this.sceneHandler && this.sceneHandler.handleState("introComplete")
                }
            });
            this.introPlayed = true;
        }
    }
}
class RingLayoutBase extends EventDispatcher {
    modelRingMode = null;
    constructor(models) {
        super();
        this.hoverController = new MouseHoverController;
        this.angleToRadian = Math.PI / 180;
        this.models = models;
        this.activeModels = models.slice(0);
        this.ringCount = models.length;
        this.validationTimer = new TimeoutCaller(100, this);
    }
    invalidateLayout(a) {
        null == a && (a = true);
        this.layoutDirtyFlag = true;
        a && this.validationTimer.call(this.validateLayout);
    }
    validateNow() {
        this.validateLayout()
    }
    setActiveModels(a) {
        this.activeModels.length = 0;
        for (var b = 0; b < this.ringCount; b++) {
            var c = 1 << b;
            c & a && this.activeModels.push(this.models[b])
        }
        this.invalidateLayout()
    }
    setRingCount(a) {
        if (!(this.ringCount <= this.models.length)) throw new Error("Invalid ring count " + a);
        this.ringCount = a, this.activeModels = this.models.slice(0, a)
    }
    validateLayout() {
        this.validationTimer.clear();//kkk
        this.layoutDirtyFlag && (
            this.doValidateLayout(),
            this.dispatchEvent(new Event(Event.CHANGE)),
            this.layoutDirtyFlag = false)
    }
}
class LayoutPartBase {
    constructor(name, def) {
        if (name == null) { name = null; }
        if (def == null) { def = false; }
        this.name = name;
        this.default = def;
    }
    setCamera(hoverController, modelRotator, snapshotgenerator, models, activeModels, layoutSwitch) {
    }
    layout(models, activeModels) {
    }
    rorateElement(layoutElement, degrees, shiftDir) {
        if (shiftDir == null) { shiftDir = 1; }
        layoutElement.get_baseTransformation().translate(0, layoutElement.height * (shiftDir / 2));
        layoutElement.get_baseTransformation().rotate(MathConsts.DEG_TO_RAD * degrees);
        layoutElement.get_baseTransformation().translate(0, layoutElement.height * -(shiftDir / 2));
    }
}
class BaseLayoutPart extends LayoutPartBase {
    constructor() {
        super(null, true);
    }
    setCamera(hoverController, modelRotator, snapshotgenerator, models, activeModels, layoutSwitch) {
        if (activeModels.length == 4) {
            snapshotgenerator && (snapshotgenerator.distance = 190);
            hoverController.setDistance(190);
        }
        else {
            snapshotgenerator && (snapshotgenerator.distance = 170);
            hoverController.setDistance(170);
        }
    }
    layout(models, activeModels) {
        var ringModelManager;
        var ringModel;
        var horizontalLayout = new HorizontalRectLayout();
        var activeIndex = 0;
        for (var i = 0; i < models.length; i++) {
            ringModelManager = models[i];
            ringModel = ringModelManager.model;
            if (activeModels.indexOf(ringModelManager) != -1) {
                var ringWidth = ringModel.transformedMaxX - ringModel.transformedMinX;
                var ringHeight = ringModel.transformedMaxZ - ringModel.transformedMinZ;
                var layoutElement = new RectLayoutElement(ringModel.transformedMinX, ringModel.transformedMinZ, ringWidth, ringHeight);
                horizontalLayout.addElement(layoutElement);
                if (activeIndex == 0) {
                }
                else if (activeIndex == 1) {
                    layoutElement.gapLeft = 5.5;
                }
                else if (activeIndex == 2) {
                    layoutElement.gapLeft = 2;
                }
                else if (activeIndex == 3) {
                    layoutElement.gapLeft = 0.5;
                    layoutElement.get_baseTransformation().translate(0, layoutElement.height / 2);
                    layoutElement.get_baseTransformation().rotate(MathConsts.DEG_TO_RAD * -10);
                    layoutElement.get_baseTransformation().translate(0, -layoutElement.height / 2);
                }
                ringModel.visible = true;
                activeIndex++;
            }
            else {
                ringModel.visible = false;
            }
        }
        horizontalLayout.update();
        var layoutBounds = horizontalLayout.get_bounds();
        var center = new Point(layoutBounds.x + (layoutBounds.width / 2), layoutBounds.y + (layoutBounds.height / 2));
        activeIndex = 0;
        for (i = 0; i < models.length; i++) {
            ringModelManager = models[i];
            ringModel = ringModelManager.model;
            if (activeModels.indexOf(ringModelManager) != -1) {
                var element = horizontalLayout.getElement(activeIndex);
                var ringTransform2D = element.get_baseTransformation().clone();
                ringTransform2D.concat(element.get_transformation());
                var mat3 = MatrixHelper.matrix2DTo3D(ringTransform2D, CoordinateSystemPlane.XZ);
                mat3.appendTranslation(-center.x, 0, center.y);
                mat3.appendRotation(305, Y_AXIS);
                var threeMatrix = GeomUtils.convertMatrix(mat3, true);
                ringModel.matrix.identity();
                ringModel.applyMatrix4(threeMatrix);
                ringModel.rotateModel(MathConsts.DEG_TO_RAD * 60);
                activeIndex++;
            }
        }
    }
}
class SideLayoutPart extends LayoutPartBase {
    constructor(name, def) {
        if (def == null) { def = false; }
        super(name, def);
    }
    setCamera(hoverController, modelRotator, snapshotgenerator, models, activeModels, layoutSwitch) {
        if (layoutSwitch) {
            hoverController.setTiltAngle(50);
            snapshotgenerator.tiltAngle = 50;
        }
        if (activeModels.length == 4) {
            hoverController.setDistance(190);
            snapshotgenerator.distance = 190;
        }
        else {
            hoverController.setDistance(170);
            snapshotgenerator.distance = 170;
        }
    }
    layout(models, activeModels) {
        var ringModelManager;
        var ringModel;
        var ringCount = activeModels.length;
        var horizontalLayout = new HorizontalRectLayout();
        var activeIndex = 0;
        for (var i = 0; i < models.length; i++) {
            ringModelManager = models[i];
            ringModel = ringModelManager.model;
            if (activeModels.indexOf(ringModelManager) != -1) {
                var ringWidth = ringModel.transformedMaxX - ringModel.transformedMinX;
                var ringHeight = ringModel.transformedMaxZ - ringModel.transformedMinZ;
                var layoutElement = new RectLayoutElement(ringModel.transformedMinX, ringModel.transformedMinZ, ringWidth, ringHeight);
                horizontalLayout.addElement(layoutElement);
                if (ringCount == 1) {
                    if (activeIndex == 0) {
                        this.rorateElement(layoutElement, 0, -1);
                    }
                }
                else if (ringCount == 2) {
                    if (activeIndex == 0) {
                        this.rorateElement(layoutElement, -5, -1);
                    }
                    else if (activeIndex == 1) {
                        layoutElement.gapLeft = 1;
                        this.rorateElement(layoutElement, 5, -1);
                    }
                }
                else if (ringCount == 3) {
                    if (activeIndex == 0) {
                        this.rorateElement(layoutElement, -7, -1);
                    }
                    else if (activeIndex == 1) {
                        layoutElement.gapLeft = 0.5;
                    }
                    else if (activeIndex == 2) {
                        layoutElement.gapLeft = 0.5;
                        this.rorateElement(layoutElement, 7, -1);
                    }
                }
                else if (ringCount == 4) {
                    if (activeIndex == 0) {
                        this.rorateElement(layoutElement, -10, -1);
                    }
                    else if (activeIndex == 1) {
                        layoutElement.gapLeft = 0.5;
                        this.rorateElement(layoutElement, -5, -1);
                    }
                    else if (activeIndex == 2) {
                        layoutElement.gapLeft = 0.5;
                        this.rorateElement(layoutElement, 5, -1);
                    }
                    else if (activeIndex == 3) {
                        layoutElement.gapLeft = 0.5;
                        this.rorateElement(layoutElement, 10, -1);
                    }
                }
                ringModel.visible = true;
                activeIndex++;
            }
            else {
                ringModel.visible = false;
            }
        }
        horizontalLayout.update();
        var layoutBounds = horizontalLayout.get_bounds();
        var center = new Point(layoutBounds.x + (layoutBounds.width / 2), layoutBounds.y + (layoutBounds.height / 2));
        activeIndex = 0;
        for (i = 0; i < models.length; i++) {
            ringModelManager = models[i];
            ringModel = ringModelManager.model;
            if (activeModels.indexOf(ringModelManager) != -1) {
                var element = horizontalLayout.getElement(activeIndex);
                var ringTransform2D = element.get_baseTransformation().clone();
                ringTransform2D.concat(element.get_transformation());
                var mat3 = MatrixHelper.matrix2DTo3D(ringTransform2D, CoordinateSystemPlane.XZ);
                mat3.appendTranslation(-center.x, 0, center.y);
                mat3.appendRotation(340, Y_AXIS);
                var threeMatrix = GeomUtils.convertMatrix(mat3, true);
                ringModel.matrix.identity();
                ringModel.applyMatrix4(threeMatrix);
                ringModel.rotateModel(0);
                activeIndex++;
            }
        }
    }
}
class Side2LayoutPart extends LayoutPartBase {
    constructor(name, def) {
        if (def == null) { def = false; }
        super(name, def);
    }
    setCamera(hoverController, modelRotator, snapshotgenerator, models, activeModels, layoutSwitch) {
        if (layoutSwitch) {
            hoverController.setPanAngle(220);
            hoverController.setTiltAngle(50);
            snapshotgenerator.panAngle = 220;
            snapshotgenerator.tiltAngle = 50;
        }
        if (activeModels.length == 4) {
            hoverController.setDistance(190);
            snapshotgenerator.distance = 190;
        }
        else {
            hoverController.setDistance(170);
            snapshotgenerator.distance = 170;
        }
    }
    layout(models, activeModels) {
        var ringModelManager;
        var ringModel;
        var ringCount = activeModels.length;
        var horizontalLayout = new HorizontalRectLayout();
        var activeIndex = 0;
        for (var i = 0; i < models.length; i++) {
            ringModelManager = models[i];
            ringModel = ringModelManager.model;
            if (activeModels.indexOf(ringModelManager) != -1) {
                var ringWidth = ringModel.transformedMaxX - ringModel.transformedMinX;
                var ringHeight = ringModel.transformedMaxZ - ringModel.transformedMinZ;
                var layoutElement = new RectLayoutElement(ringModel.transformedMinX, ringModel.transformedMinZ, ringWidth, ringHeight);
                horizontalLayout.addElement(layoutElement);
                if (ringCount == 1) {
                    if (activeIndex == 0) {
                        this.rorateElement(layoutElement, 0, -1);
                    }
                }
                else if (ringCount == 2) {
                    if (activeIndex == 0) {
                        this.rorateElement(layoutElement, -5, -1);
                    }
                    else if (activeIndex == 1) {
                        layoutElement.gapLeft = 1;
                        this.rorateElement(layoutElement, 5, -1);
                    }
                }
                else if (ringCount == 3) {
                    if (activeIndex == 0) {
                        this.rorateElement(layoutElement, -7, -1);
                    }
                    else if (activeIndex == 1) {
                        layoutElement.gapLeft = 0.5;
                    }
                    else if (activeIndex == 2) {
                        layoutElement.gapLeft = 0.5;
                        this.rorateElement(layoutElement, 7, -1);
                    }
                }
                else if (ringCount == 4) {
                    if (activeIndex == 0) {
                        this.rorateElement(layoutElement, -10, -1);
                    }
                    else if (activeIndex == 1) {
                        layoutElement.gapLeft = 0.5;
                        this.rorateElement(layoutElement, -5, -1);
                    }
                    else if (activeIndex == 2) {
                        layoutElement.gapLeft = 0.5;
                        this.rorateElement(layoutElement, 5, -1);
                    }
                    else if (activeIndex == 3) {
                        layoutElement.gapLeft = 0.5;
                        this.rorateElement(layoutElement, 10, -1);
                    }
                }
                ringModel.visible = true;
                activeIndex++;
            }
            else {
                ringModel.visible = false;
            }
        }
        horizontalLayout.update();
        var layoutBounds = horizontalLayout.get_bounds();
        var center = new Point(layoutBounds.x + (layoutBounds.width / 2), layoutBounds.y + (layoutBounds.height / 2));
        activeIndex = 0;
        for (i = 0; i < models.length; i++) {
            ringModelManager = models[i];
            ringModel = ringModelManager.model;
            if (activeModels.indexOf(ringModelManager) != -1) {
                var element = horizontalLayout.getElement(activeIndex);
                var ringTransform2D = element.get_baseTransformation().clone();
                ringTransform2D.concat(element.get_transformation());
                var mat3 = MatrixHelper.matrix2DTo3D(ringTransform2D, CoordinateSystemPlane.XZ);
                mat3.appendTranslation(-center.x, 0, center.y);
                mat3.appendRotation(340, Y_AXIS);
                var threeMatrix = GeomUtils.convertMatrix(mat3, true);
                ringModel.matrix.identity();
                ringModel.applyMatrix4(threeMatrix);
                ringModel.rotateModel(0);
                activeIndex++;
            }
        }
    }
}
class FrontLayoutPart extends LayoutPartBase {
    constructor(name, def) {
        if (def == null) { def = false; }
        super(name, def);
    }
    setCamera(hoverController, modelRotator, snapshotgenerator, models, activeModels, layoutSwitch) {
        if (layoutSwitch) {
            hoverController.setTiltAngle(30);
            snapshotgenerator.tiltAngle = 30;
        }
        if (activeModels.length == 3 || activeModels.length == 4) {
            hoverController.setDistance(190);
            snapshotgenerator.distance = 190;
        }
        else {
            hoverController.setDistance(170);
            snapshotgenerator.distance = 170;
        }
    }
    layout(models, activeModels) {
        var ringModelManager;
        var ringModel;
        var ringCount = activeModels.length;
        var horizontalLayout = new HorizontalRectLayout();
        var activeIndex = 0;
        for (var i = 0; i < models.length; i++) {
            ringModelManager = models[i];
            ringModel = ringModelManager.model;
            if (activeModels.indexOf(ringModelManager) != -1) {
                var ringWidth = ringModel.transformedMaxX - ringModel.transformedMinX;
                var ringHeight = ringModel.transformedMaxZ - ringModel.transformedMinZ;
                var layoutElement = new RectLayoutElement(ringModel.transformedMinX, ringModel.transformedMinZ, ringWidth, ringHeight);
                horizontalLayout.addElement(layoutElement);
                if (ringCount == 1) {
                    if (activeIndex == 0) {
                        this.rorateElement(layoutElement, -25, 0);
                    }
                }
                else if (ringCount == 2) {
                    if (activeIndex == 0) {
                        this.rorateElement(layoutElement, 30, 1);
                        layoutElement.get_baseTransformation().translate(0, -5);
                    }
                    else if (activeIndex == 1) {
                        layoutElement.gapLeft = 0;
                        this.rorateElement(layoutElement, -25, 1);
                        layoutElement.get_baseTransformation().translate(0, 5);
                    }
                }
                else if (ringCount == 3) {
                    if (activeIndex == 0) {
                        this.rorateElement(layoutElement, 40, 1);
                        layoutElement.get_baseTransformation().translate(0, -8);
                    }
                    else if (activeIndex == 1) {
                        layoutElement.gapLeft = 0;
                    }
                    else if (activeIndex == 2) {
                        layoutElement.gapLeft = 0;
                        this.rorateElement(layoutElement, -10, 1);
                    }
                }
                else if (ringCount == 4) {
                    if (activeIndex == 0) {
                        this.rorateElement(layoutElement, 40, 1);
                        layoutElement.get_baseTransformation().translate(0, -8);
                    }
                    else if (activeIndex == 1) {
                        layoutElement.gapLeft = 0;
                    }
                    else if (activeIndex == 2) {
                        layoutElement.gapLeft = 0;
                        this.rorateElement(layoutElement, -10, 1);
                    }
                    else if (activeIndex == 3) {
                        layoutElement.gapLeft = 0;
                        this.rorateElement(layoutElement, -15, 1);
                    }
                }
                activeIndex++;
                ringModel.visible = true;
            }
            else {
                ringModel.visible = false;
            }
        }
        horizontalLayout.update();
        var layoutBounds = horizontalLayout.get_bounds();
        var center = new Point(layoutBounds.x + (layoutBounds.width / 2), layoutBounds.y + (layoutBounds.height / 2));
        activeIndex = 0;
        for (i = 0; i < models.length; i++) {
            ringModelManager = models[i];
            ringModel = ringModelManager.model;
            if (activeModels.indexOf(ringModelManager) != -1) {
                var element = horizontalLayout.getElement(activeIndex);
                var ringTransform2D = element.get_baseTransformation().clone();
                ringTransform2D.concat(element.get_transformation());
                var mat3 = MatrixHelper.matrix2DTo3D(ringTransform2D, CoordinateSystemPlane.XZ);
                mat3.appendTranslation(-center.x, 0, center.y);
                mat3.appendRotation(280, Y_AXIS);
                var threeMatrix = GeomUtils.convertMatrix(mat3, true);
                ringModel.matrix.identity();
                ringModel.applyMatrix4(threeMatrix);
                ringModel.rotateModel(MathConsts.DEG_TO_RAD * 60);
                activeIndex++;
            }
        }
    }
}
class Front2LayoutPart extends LayoutPartBase {
    constructor(name, def) {
        if (def == null) { def = false; }
        super(name, def);
    }
    setCamera(hoverController, modelRotator, snapshotgenerator, models, activeModels, layoutSwitch) {
        if (layoutSwitch) {
            hoverController.setTiltAngle(30);
            snapshotgenerator.tiltAngle = 30;
        }
        if (activeModels.length == 3 || activeModels.length == 4) {
            hoverController.setDistance(190);
            snapshotgenerator.distance = 190;
        }
        else {
            hoverController.setDistance(170);
            snapshotgenerator.distance = 170;
        }
    }
    layout(models, activeModels) {
        var ringModelManager;
        var ringModel;
        var ringCount = activeModels.length;
        var horizontalLayout = new HorizontalRectLayout();
        var activeIndex = 0;
        for (var i = models.length - 1; i >= 0; i--) {
            ringModelManager = models[i];
            ringModel = ringModelManager.model;
            if (activeModels.indexOf(ringModelManager) != -1) {
                var ringWidth = ringModel.transformedMaxX - ringModel.transformedMinX;
                var ringHeight = ringModel.transformedMaxZ - ringModel.transformedMinZ;
                var layoutElement = new RectLayoutElement(ringModel.transformedMinX, ringModel.transformedMinZ, ringWidth, ringHeight);
                horizontalLayout.addElement(layoutElement);
                if (ringCount == 1) {
                    if (activeIndex == 0) {
                        this.rorateElement(layoutElement, 0, 0);
                    }
                }
                else if (ringCount == 2) {
                    if (activeIndex == 0) {
                        this.rorateElement(layoutElement, 30, 1);
                        layoutElement.get_baseTransformation().translate(0, 5);
                    }
                    else if (activeIndex == 1) {
                        layoutElement.gapLeft = 0;
                        this.rorateElement(layoutElement, -25, 1);
                        layoutElement.get_baseTransformation().translate(0, -5);
                    }
                }
                else if (ringCount == 3) {
                    if (activeIndex == 0) {
                        this.rorateElement(layoutElement, 10, 1);
                    }
                    else if (activeIndex == 1) {
                        layoutElement.gapLeft = 0;
                    }
                    else if (activeIndex == 2) {
                        layoutElement.gapLeft = 0;
                        this.rorateElement(layoutElement, -30, 1);
                        layoutElement.get_baseTransformation().translate(0, -8);
                    }
                }
                else if (ringCount == 4) {
                    if (activeIndex == 0) {
                        this.rorateElement(layoutElement, 15, 1);
                    }
                    else if (activeIndex == 1) {
                        layoutElement.gapLeft = 0;
                        this.rorateElement(layoutElement, 10, 1);
                    }
                    else if (activeIndex == 2) {
                        layoutElement.gapLeft = 0;
                        this.rorateElement(layoutElement, 0, 1);
                    }
                    else if (activeIndex == 3) {
                        layoutElement.gapLeft = 0;
                        this.rorateElement(layoutElement, -30, 1);
                        layoutElement.get_baseTransformation().translate(0, -8);
                    }
                }
                activeIndex++;
                ringModel.visible = true;
            }
            else {
                ringModel.visible = false;
            }
        }
        horizontalLayout.update();
        var layoutBounds = horizontalLayout.get_bounds();
        var center = new Point(layoutBounds.x + (layoutBounds.width / 2), layoutBounds.y + (layoutBounds.height / 2));
        activeIndex = 0;
        for (i = models.length - 1; i >= 0; i--) {
            ringModelManager = models[i];
            ringModel = ringModelManager.model;
            if (activeModels.indexOf(ringModelManager) != -1) {
                var element = horizontalLayout.getElement(activeIndex);
                var ringTransform2D = element.get_baseTransformation().clone();
                ringTransform2D.concat(element.get_transformation());
                var mat3 = MatrixHelper.matrix2DTo3D(ringTransform2D, CoordinateSystemPlane.XZ);
                mat3.appendTranslation(-center.x, 0, center.y);
                mat3.appendRotation(280, Y_AXIS);
                var threeMatrix = GeomUtils.convertMatrix(mat3, true);
                ringModel.matrix.identity();
                ringModel.applyMatrix4(threeMatrix);
                ringModel.rotateModel(MathConsts.DEG_TO_RAD * 60);
                activeIndex++;
            }
        }
    }
}
class RingParam {
    constructor() { }
}
class RingLayout extends RingLayoutBase {
    constructor(models) {
        super(models);
        this.layouts = [
            new BaseLayoutPart(),
            new SideLayoutPart("side"),
            new Side2LayoutPart("side2"),
            new FrontLayoutPart("front"),
            new Front2LayoutPart("front2")
        ];
    }
    doValidateLayout() {
        var layout = this.getLayout(this.config && this.config.layoutName);
        var layoutSwitch = this.activeLayout != layout;
        if (layoutSwitch) {
            this.hoverController.setMaxTiltAngle(90);
            this.hoverController.setLookAtPosition(new THREE.Vector3(0, 12, 0));
            this.hoverController.setPanAngle(280);
            this.hoverController.setTiltAngle(10);
            this.hoverController.setDistance(170);
            this.hoverController.setMouseWheelEnabled(false);
            if (this.hoverController instanceof MouseHoverController) {
                this.hoverController.moveSpeed = 0.2;
            }
            this.snapshotgenerator.tiltAngle = 10;
            this.snapshotgenerator.panAngle = 280;
            this.snapshotgenerator.distance = 170;
            this.snapshotgenerator.lookAtPosition = new THREE.Vector3(0, 12, 0);
            this.snapshotgenerator.modelRotationY = 0;
            this.modelRotator.panAngle = 0;
        }
        layout.setCamera(this.hoverController, this.modelRotator, this.snapshotgenerator, this.models, this.activeModels, layoutSwitch);
        layout.layout(this.models, this.activeModels);
        this.hoverController.update(false);
        this.activeLayout = layout;
    }
    getLayout(name) {
        var defaultLayout;
        for (var i = 0; i < this.layouts.length; i++) {
            var layoutPart = this.layouts[i];
            if (layoutPart.name == name) {
                return layoutPart;
            }
            if (layoutPart.default) {
                defaultLayout = layoutPart;
            }
        }
        if (defaultLayout) {
            return defaultLayout;
        }
        else {
            throw new Error("No default layout part found");
        }
    }
}
class ConfigurableRingLayout extends RingLayoutBase {
    constructor(config, models) {
        super(models);
        this.ringNumPartMap = [];
        var itemList = config.child("part");
        for (var f = 0; f < itemList.length(); f++) {
            var item = itemList.get(f),
                ringParam = new RingParam;
            ringParam.ringNum = parseInt(item.attribute("ringNum").text()),
                ringParam.posX = XMLValueParser.parseNumberArray(item, "posX", 0),
                ringParam.posZ = XMLValueParser.parseNumberArray(item, "posZ", 0),
                ringParam.widthMultiplierAdditions = XMLValueParser.parseNumberArray(item, "widthMultiplierAdditions", 0),
                ringParam.rotationY = XMLValueParser.parseNumberArray(item, "rotationY", 0),
                ringParam.rotationX = XMLValueParser.parseNumberArray(item, "rotationX", 0),
                ringParam.modelRingRotationX = XMLValueParser.parseNumberArray(item, "modelRingRotationX", 0),
                this.ringNumPartMap[ringParam.ringNum] = ringParam
        }
    }
    doValidateLayout() {
        var a = this.activeModels.length,
            b = this.ringNumPartMap[a];
        if (!b) throw new Error("No valid Layout part found for activeRingCount:" + a);
        for (var c = 0, d = 0; d < this.models.length; d++) {
            var e = this.models[d],
                f = e.model;
            if (-1 != this.activeModels.indexOf(e)) {
                var h = f.maxX - f.minX;
                f.position.x = b.posX[c] + b.widthMultiplierAdditions[c] * h,
                    f.position.z = b.posZ[c],
                    f.rotation.y = b.rotationY[c] * this.angleToRadian,
                    e.currentState == HibridModelManager.STATE_MODEL ? f.rotateModel(b.modelRingRotationX[c]) : f.rotateModel(b.rotationX[c] * this.angleToRadian),
                    f.visible = true,
                    c++
            }
            else f.visible = false
        }
    }
}
export {
    InitDisplay
};