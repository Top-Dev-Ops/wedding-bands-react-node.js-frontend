/* eslint-disable no-unused-expressions */
import * as THREE from 'three';
import { EventDispatcher } from './event.js'
import {
    Responder, RescourceNames, Delegate, XMLValueParser
} from "./loader.js"


class PropertySetter {
    constructor(a, b, c, d) {
        this.name = a,
            this.parser = b,
            this.defaultValue = c,
            this.setter = d
    }
    parseValue(a) {
        return this.parser.call(this, a, this.name, this.defaultValue)
    }
    callSetter(a, b) {
        this.setter.call(a, b)
    }
}
class PropertyOverrideHandler {
    constructor(a, b, c, d) {
        this.propertySetters = b,
            this.defaultNode = c,
            this.overridesNode = d,
            this.owner = a,
            this.overrideMode = false,
            this.defaultValues = [],
            this.overrideValues = [];
        for (var e = 0; e < this.propertySetters.length; e++) {
            var f = this.propertySetters[e];
            this.defaultValues[e] = f.parseValue(c), f.callSetter(a, this.defaultValues[e])
        }
        if (d)
            for (var e = 0; e < this.propertySetters.length; e++) {
                var f = this.propertySetters[e],
                    g = d.child(f.name);
                g.length() && (this.overrideValues[e] = f.parseValue(d))
            }
    }
    updateProperty(a) {
        if (this.overrideMode == a) return false;
        for (var b = false, c = 0; c < this.propertySetters.length; c++) {
            var d = this.propertySetters[c];
            null != this.overrideValues[c] && (a ? d.callSetter(this.owner, this.overrideValues[c]) : d.callSetter(this.owner, this.defaultValues[c]), b = true)
        }
        return this.overrideMode = a, b
    }
}
class ControllerBase {
    constructor(target) {
        this._pAutoUpdate = true;
        this.setTargetObject(target);
    }
    getTargetObject() {
        return this._pTargetObject
    }
    setTargetObject(a) {
        this._pTargetObject != a && (this._pTargetObject = a, this.pNotifyUpdate())
    }
    getAutoUpdate() {
        return this._pAutoUpdate
    }
    setAutoUpdate(a) {
        this._pAutoUpdate != a && (this._pAutoUpdate = a)
    }
    pNotifyUpdate() { }
    update(a) {
        throw null == a && (a = true),
        new Error("update is an abstract method")
    }
    updateController() {
        this._pControllerDirty && this._pAutoUpdate && (this._pControllerDirty = false, this.pNotifyUpdate())
    }
}
class LookAtController extends ControllerBase {
    constructor(target, lookPos) {
        null == target && (target = null),
            null == lookPos && (lookPos = null);
        super(target);
        this._pOrigin = new THREE.Vector3(0, 0, 0),
            lookPos ? this.setLookAtObject(lookPos) : this.setLookAtPosition(new THREE.Vector3)
    }
    getLookAtPosition() {
        return this._pLookAtPosition
    }
    setLookAtPosition(a) {
        this._pLookAtObject && (this._pLookAtObject = null),
            this._pLookAtPosition = a,
            this.pNotifyUpdate()
    }
    getLookAtObject() {
        return this._pLookAtObject
    }
    setLookAtObject(a) {
        this._pLookAtPosition && (this._pLookAtPosition = null),
            this._pLookAtObject != a && (this._pLookAtObject = a, this.pNotifyUpdate())
    }
    update(a) {
        null == a && (a = true);
        this._pTargetObject && (this._pLookAtPosition ? this._pTargetObject.lookAt(this._pLookAtPosition) : this._pLookAtObject && this._pTargetObject.lookAt(this._pLookAtObject.position))
    }
}
class HoverController extends LookAtController {
    constructor(target, lookPos, panAngle, tiltAngle, distance, minTiltAngle, maxTiltAngle, i, j, steps, yFactor, wrapPanAngle) {
        null == target && (target = null),
            null == lookPos && (lookPos = null),
            null == panAngle && (panAngle = 0),
            null == tiltAngle && (tiltAngle = 90),
            null == distance && (distance = 1e3),
            null == minTiltAngle && (minTiltAngle = -90),
            null == maxTiltAngle && (maxTiltAngle = 90),
            null == i && (i = null),
            null == j && (j = null),
            null == steps && (steps = 8),
            null == yFactor && (yFactor = 2),
            null == wrapPanAngle && (wrapPanAngle = false);
        super(target, lookPos);
        this._iCurrentPanAngle = 0,
            this._iCurrentTiltAngle = 90,
            this._panAngle = 0,
            this._tiltAngle = 0,
            this.distance = 1e3,
            this._minPanAngle = -(1 / 0),
            this._maxPanAngle = 1 / 0,
            this._minTiltAngle = -(1 / 0),
            this._maxTiltAngle = (1 / 0),
            this._steps = 8,
            this._yFactor = 2,
            this._wrapPanAngle = false,
            this.setDistance(distance),
            this.setPanAngle(panAngle),
            this.setTiltAngle(tiltAngle),
            this.setMinPanAngle(null != i ? i : -(1 / 0)),
            this.setMaxPanAngle(null != j ? j : 1 / 0),
            this.setMinTiltAngle(minTiltAngle),
            this.setMaxTiltAngle(maxTiltAngle),
            this.setSteps(steps),
            this.setYFactor(yFactor),
            this.setWrapPanAngle(wrapPanAngle),
            this._iCurrentPanAngle = this._panAngle,
            this._iCurrentTiltAngle = this._tiltAngle;
    }
    getSteps() {
        return this._steps
    }
    setSteps(a) {
        a = 1 > a ? 1 : a,
            this._steps != a && (this._steps = a, this.pNotifyUpdate())
    }
    getPanAngle() {
        return this._panAngle
    }
    setPanAngle(a) {
        a = Math.max(this._minPanAngle, Math.min(this._maxPanAngle, a)),
            this._panAngle != a && (this._panAngle = a, this.pNotifyUpdate())
    }
    getTiltAngle() {
        return this._tiltAngle
    }
    setTiltAngle(a) {
        a = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, a)),
            this._tiltAngle != a && (this._tiltAngle = a, this.pNotifyUpdate())
    }
    getDistance() {
        return this.distance
    }
    setDistance(a) {
        this.distance != a && (this.distance = a, this.getTargetObject() && (this.getTargetObject().position.z = this.distance), this.pNotifyUpdate())
    }
    getMinPanAngle() {
        return this._minPanAngle
    }
    setMinPanAngle(a) {
        this._minPanAngle != a && (this._minPanAngle = a, this.setPanAngle(Math.max(this._minPanAngle, Math.min(this._maxPanAngle, this._panAngle))))
    }
    getMaxPanAngle() {
        return this._maxPanAngle
    }
    setMaxPanAngle(a) {
        this._maxPanAngle != a && (this._maxPanAngle = a, this.setPanAngle(Math.max(this._minPanAngle, Math.min(this._maxPanAngle, this._panAngle))))
    }
    getMinTiltAngle() {
        return this._minTiltAngle
    }
    setMinTiltAngle(a) {
        this._minTiltAngle != a && (this._minTiltAngle = a, this.setTiltAngle(Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, this._tiltAngle))))
    }
    getMaxTiltAngle() {
        return this._maxTiltAngle
    }
    setMaxTiltAngle(a) {
        this._maxTiltAngle != a && (this._maxTiltAngle = a, this.setTiltAngle(Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, this._tiltAngle))))
    }
    getYFactor() {
        return this._yFactor
    }
    setYFactor(a) {
        this._yFactor != a && (this._yFactor = a, this.pNotifyUpdate())
    }
    getWrapPanAngle() {
        return this._wrapPanAngle
    }
    setWrapPanAngle(a) {
        this._wrapPanAngle != a && (this._wrapPanAngle = a, this.pNotifyUpdate())
    }
    update(a) {
        if (null == a && (a = true),
            this._tiltAngle != this._iCurrentTiltAngle ||
            this._panAngle != this._iCurrentPanAngle) {

            if (this._pControllerDirty = true, this._wrapPanAngle) {
                this._panAngle < 0 ?
                    (this._iCurrentPanAngle += this._panAngle % 360 + 360 - this._panAngle,
                        this._panAngle = this._panAngle % 360 + 360) :
                    (this._iCurrentPanAngle += this._panAngle % 360 - this._panAngle,
                        this._panAngle = this._panAngle % 360);
                for (; this._panAngle - this._iCurrentPanAngle < -180;)
                    this._iCurrentPanAngle -= 360;
                for (; this._panAngle - this._iCurrentPanAngle > 180;)
                    this._iCurrentPanAngle += 360
            }
            a ? (this._iCurrentTiltAngle += (this._tiltAngle - this._iCurrentTiltAngle) / (this.getSteps() + 1), this._iCurrentPanAngle += (this._panAngle - this._iCurrentPanAngle) / (this.getSteps() + 1)) : (this._iCurrentPanAngle = this._panAngle, this._iCurrentTiltAngle = this._tiltAngle), Math.abs(this.getTiltAngle() - this._iCurrentTiltAngle) < .01 && Math.abs(this._panAngle - this._iCurrentPanAngle) < .01 && (this._iCurrentTiltAngle = this._tiltAngle, this._iCurrentPanAngle = this._panAngle)
        }
        var c = this.getLookAtObject() ? this.getLookAtObject().position : this.getLookAtPosition() ? this.getLookAtPosition() : this._pOrigin;
        this.getTargetObject().position.x = c.x - this.getDistance() * Math.sin(this._iCurrentPanAngle * HoverController.DEGREES_TO_RADIANS) * Math.cos(this._iCurrentTiltAngle * HoverController.DEGREES_TO_RADIANS);
        this.getTargetObject().position.y = c.y + this.getDistance() * Math.sin(this._iCurrentTiltAngle * HoverController.DEGREES_TO_RADIANS) * this.getYFactor();
        this.getTargetObject().position.z = c.z + this.getDistance() * Math.cos(this._iCurrentPanAngle * HoverController.DEGREES_TO_RADIANS) * Math.cos(this._iCurrentTiltAngle * HoverController.DEGREES_TO_RADIANS);
        this._pTargetObject && (this._pLookAtPosition ? this._pTargetObject.lookAt(this._pLookAtPosition) :
            this._pLookAtObject && this._pTargetObject.lookAt(this._pLookAtObject.position))
    }
    static DEGREES_TO_RADIANS = Math.PI / 180;
}
class ChangeNotifierHoverController extends HoverController {
    constructor(b, c, d, e, g, h, i, j, k, l, m, n) {
        super(b, c, d, e, g, h, i, j, k, l, m, n);
        this.dispatcher = new EventDispatcher;
    }
    getUpdateNeeded() {
        return this._updateNeeded
    }
    setPanAngle(b) {
        super.setPanAngle(b),
            this.notifyUpdateNeeded()
    }
    setTiltAngle(b) {
        super.setTiltAngle(b),
            this.notifyUpdateNeeded()
    }
    setDistance(b) {
        super.setDistance(b),
            this.notifyUpdateNeeded()
    }
    getUpdatableScreen() {
        return this._updatableScreen
    }
    setUpdatableScreen(a) {
        this._updatableScreen != a && (this._updatableScreen = a)
    }
    update(b) {
        null == b && (b = true),
            super.update(b),
            this._updateNeeded && this._updatableScreen && this._updatableScreen.updateOnNextFrame(),
            this.getPanAngle() == this._iCurrentPanAngle && this.getTiltAngle() == this._iCurrentTiltAngle && this._updateNeeded && (this._updateNeeded = false)
    }
    addEventListener(a, b, c) {
        null == c && (c = false), this.dispatcher.addEventListener(a, b, c)
    }
    removeEventListener(a, b, c) {
        null == c && (c = false), this.dispatcher.removeEventListener(a, b, c)
    }
    dispatchEvent(a) {
        return this.dispatcher.dispatchEvent(a)
    }
    hasEventListener(a) {
        return this.dispatcher.hasEventListener(a)
    }
    willTrigger(a) { return this.dispatcher.willTrigger(a) }
    notifyUpdateNeeded() { this._updateNeeded || (this._updateNeeded = true) }
}
class MouseHoverController extends ChangeNotifierHoverController {
    constructor(target) {
        null == target && (target = null);
        super(target);
        this._mouseWheelResolution = .1,
            this._moveSpeed = .1,
            this.setPanAngle(240),
            this.setTiltAngle(10),
            this.setDistance(600),
            // this.setMinTiltAngle(1),
            // this.setMaxTiltAngle(10),
            this.setLookAtPosition(new THREE.Vector3(0, 50, 0));
        this.altKey = false;
    }
    getPanLock() {
        return this._panLock
    }
    setPanLock(a) {
        this._panLock != a && (this._panLock = a)
    }
    getTiltLock() {
        return this._tiltLock
    }
    setTiltLock(a) {
        this._tiltLock != a && (this._tiltLock = a)
    }
    getMouseWheelEnabled() {
        return this._mouseWheelEnabled
    }
    setMouseWheelEnabled(a) {
        this._mouseWheelEnabled != a && (this._mouseWheelEnabled = a)
    }
    getMouseWheelResolution() {
        return this._mouseWheelResolution
    }
    setMouseWheelResolution(a) {
        this._mouseWheelResolution != a && (this._mouseWheelResolution = a)
    }
    getRelativePanAngle() {
        var a = this.getPanAngle() % 360;
        return 0 > a && (a = 360 + a), a
    }
    handleMouseDown(a, b, c) {
        if (c == null) c = false;
        this.prevMouseX = a;
        this.prevMouseY = b;
        this.altKey = c;
        this.mouseDown = true;
    }
    handleMouseMove(a, b) {
        if (this.mouseDown) {
            if (this.altKey) {
                var pos = this.getLookAtPosition();
                var dx = a - this.prevMouseX;
                var dy = b - this.prevMouseY;
                this.setLookAtPosition(pos.add(new THREE.Vector3(dx / 10, dy / 10, 0)));
                this.notifyUpdateNeeded();
            }
            else {
                this.getPanLock() || this.setPanAngle(this.getPanAngle() + (a - this.prevMouseX) * this.moveSpeed);
                this.getTiltLock() || this.setTiltAngle(this.getTiltAngle() + (b - this.prevMouseY) * this.moveSpeed);
            }
        }
        this.prevMouseX = a;
        this.prevMouseY = b;
    }
    handleMouseUp() {
        this.altKey = false;
        this.mouseDown = false;
    }
    handleMouseLeave(a, b) {
        this.mouseDown = false
    }
    handleMouseWheelChange(a) {
        var newDistance = this.getDistance() - a * this._mouseWheelResolution;
        this.getMouseWheelEnabled() &&
            newDistance > 0.1 &&
            this.setDistance(newDistance)
    }
}
class ConfigurableMouseHoverController extends MouseHoverController {
    constructor(b) {
        super();
        this.propertyMap = [new PropertySetter("yFactor", XMLValueParser.parseNumber, 1, this.setYFactor),
        new PropertySetter("maxTiltAngle", XMLValueParser.parseNumber, 90, this.setMaxTiltAngle),
        new PropertySetter("lookAtPosition", XMLValueParser.parseVector3, new THREE.Vector3(0, 10, 0), this.setLookAtPosition),
        new PropertySetter("distance", XMLValueParser.parseNumber, 70, this.setDistance),
        new PropertySetter("panAngle", XMLValueParser.parseNumber, 200, this.setPanAngle),
        new PropertySetter("tiltAngle", XMLValueParser.parseNumber, 35, this.setTiltAngle),
        new PropertySetter("moveSpeed", XMLValueParser.parseNumber, .2, this.setMoveSpeed),
        new PropertySetter("mouseWheelEnabled", XMLValueParser.parseBoolean, true, this.setMouseWheelEnabled)];
        var d, e = b.child("modelOverrides");
        e.length() && (d = e.get(0)),
            this.propertyOverrideHandler = new PropertyOverrideHandler(this, this.propertyMap, b, d),
            this.setPanLock(true);
    }
    updateToConfig(a) {
        var b = this.propertyOverrideHandler.updateProperty(a.hasModelSceneConfigs());
        b && this.update(false)
    }
    setMoveSpeed(a) {
        this.moveSpeed = a
    }
}
class MouseEventDelegate {
    constructor(handler, b) {
        this.mouseWheelResolution = 1,
            this.listener = handler,
            this.mouseDown = false,
            this.altKey = false;
        this.currentTouchId = null,
            this.disableAreaEvents = false,
            b.addEventListener("mousedown", (a) => {
                return this.onMouseDown(a)
            }),
            b.addEventListener("touchstart", (a) => {
                return this.onMouseDown(a)
            }),
            b.addEventListener("mousemove", (a) => {
                return this.onMouseMove(a)
            }),
            b.addEventListener("touchmove", (a) => {
                return this.onMouseMove(a)
            }),
            b.addEventListener("mouseup", (a) => {
                return this.onMouseUp(a)
            }),
            b.addEventListener("mouseleave", (a) => {
                return this.onMouseUp(a)
            }),
            b.addEventListener("touchend", (a) => {
                return this.onMouseUp(a)
            }),
            b.addEventListener("touchcancel", (a) => {
                return this.onMouseUp(a)
            }),
            b.addEventListener("mousewheel", (a) => {
                return this.onMouseWheel(a)
            })
    }
    getTouchById(a, b) {
        for (var c = 0; c < b.length; c++)
            if (b[c].identifier == a) return b[c];
        return null
    }
    onMouseDown(a) {
        if (!this.mouseDown) {
            this.mouseDown = true;
            this.altKey = a.altKey;
            if (a.touches) {
                var b = a.touches,
                    c = b[0];
                this.currentTouchId = c.identifier,
                    this.listener != null && this.listener.handleMouseDown(c.pageX, c.pageY)
            }
            else if (this.listener != null) {
                this.listener.handleMouseDown(a.clientX, a.clientY, a.altKey);
            }
        }
        return this.disableAreaEvents ? (a.preventDefault(), a.stopPropagation(), false) : null
    }
    onMouseMove(a) {
        if (this.mouseDown)
            if (a.touches) {
                if (null != this.currentTouchId) {
                    var b = this.getTouchById(this.currentTouchId, a.touches);
                    b ? this.listener != null && this.listener.handleMouseMove(b.pageX, b.pageY) : (this.mouseDown = false, this.currentTouchId = null)
                }
            }
            else this.listener != null && this.listener.handleMouseMove(a.clientX, a.clientY);
        return this.disableAreaEvents ? (a.preventDefault(), a.stopPropagation(), false) : null
    }
    onMouseUp(a) {
        this.altKey = false;
        if (this.mouseDown)
            if (a.touches)
                if (null != this.currentTouchId) {
                    var b = this.getTouchById(this.currentTouchId, a.touches);
                    b || (this.mouseDown = false, this.currentTouchId = null, this.listener != null && this.listener.handleMouseUp())
                } else this.mouseDown = false, this.listener != null && this.listener.handleMouseUp();
            else a instanceof MouseEvent && (this.listener != null && this.listener.handleMouseUp(), this.mouseDown = false, this.currentTouchId = null);
        return this.disableAreaEvents ? (a.preventDefault(), a.stopPropagation(), false) : null
    }
    onMouseWheel(a) {
        this.listener != null && this.listener.handleMouseWheelChange(a.wheelDelta * this.mouseWheelResolution),
            a.preventDefault(),
            a.stopPropagation()
    }
}
class ModelMouseRotator {
    constructor() {
        this.angleToRadian = Math.PI / 180,
            this.currentPanAngle = 0,
            this.easeSpeed = 8,
            this.rotationSpeed = .2,
            this._panAngle = 0,
            this.models = [],
            this.frameRequester = new RequestAnimationFrame(this.onEnterFrame, this)
    }
    get panAngle() {
        return this._panAngle;
    }
    set panAngle(a) {
        if (this._panAngle != a) {
            this._panAngle = a, this.currentPanAngle = a;
            for (var b = 0; b < this.models.length; b++) {
                var c = this.models[b];
                c.rotation.y = this.getRotationRadians()
            }
        }
    }
    addModel(a) {
        this.models.push(a), a.rotation.y = this.getRotationRadians()
    }
    getRotationRadians() {
        return this.currentPanAngle * this.angleToRadian
    }
    update() {
        if (this.panAngle != this.currentPanAngle) {
            this.currentPanAngle += (this.panAngle - this.currentPanAngle) / (this.easeSpeed + 1),
                Math.abs(this.panAngle - this.currentPanAngle) < .01 && (this.currentPanAngle = this.panAngle);
            for (var a = 0; a < this.models.length; a++) {
                var b = this.models[a];
                b.rotation.y = this.getRotationRadians()
            }
            this._updatableScreen && this._updatableScreen.updateOnNextFrame()
        } else this.frameRequester.active && this.frameRequester.stop()
    }
    handleMouseDown(a, b, c) {
        this.prevMouseX = a, this.mouseMove = true
    }
    handleMouseMove(a, b) {
        this.mouseMove && (this.panAngle += (a - this.prevMouseX) * this.rotationSpeed,
            this.frameRequester.active || this.frameRequester.start()),
            this.prevMouseX = a
    }
    handleMouseUp() {
        this.mouseMove = false
    }
    handleMouseLeave(a, b) {
        this.mouseMove = false
    }
    handleMouseWheelChange(a) { }
    onEnterFrame(a) { this.update() }
}
class ConfigurableModelMouseRotator extends ModelMouseRotator {
    constructor(b) {
        super();
        this.propertyMap = [new PropertySetter("panAngle", XMLValueParser.parseNumber, 180, this.setPanAngle), new PropertySetter("rotationSpeed", XMLValueParser.parseNumber, .2, this.setRotationSpeed)];
        var d, e = b.child("modelOverrides");
        e.length() && (d = e.get(0)), this.propertyOverrideHandler = new PropertyOverrideHandler(this, this.propertyMap, b, d)
    }
    updateToConfig(a) {
        this.propertyOverrideHandler.updateProperty(a.hasModelSceneConfigs())
    }
    setPanAngle(a) {
        this.panAngle = a
    }
    setRotationSpeed(a) {
        this.rotationSpeed = a
    }
}
class RequestAnimationFrame {
    constructor(callback, context) {
        this.active = false;
        this.argsArray = [];
        this.setCallback(callback, context);
        this.rafUpdateFunction = () => {
            this.active && this.tick()
        };
        this.argsArray.push(this.dt);
    }
    setCallback(callback, context) {
        this.callback = callback;
        this.callbackContext = context;
    }
    start() {
        this.prevTime = this.getTimer(), this.active = true;
        if (RequestAnimationFrame.requestAnimationFrameOverrideFunction)
            this.currentAnimationFunction = RequestAnimationFrame.requestAnimationFrameOverrideFunction;
        else if (window.requestAnimationFrame)
            this.currentAnimationFunction = window.requestAnimationFrame;
        else if (window.mozRequestAnimationFrame)
            this.currentAnimationFunction = window.mozRequestAnimationFrame;
        else if (window.webkitRequestAnimationFrame)
            this.currentAnimationFunction = window.webkitRequestAnimationFrame;
        else {
            if (!window.oRequestAnimationFrame) throw new Error("No requestAnimationFrame function found");
            this.currentAnimationFunction = window.oRequestAnimationFrame
        }
        this.currentAnimationFunction.call(window, this.rafUpdateFunction)
    }
    stop() {
        this.active = false
    }
    tick() {
        this.currentTime = this.getTimer();
        this.dt = this.currentTime - this.prevTime;
        this.argsArray[0] = this.dt;
        this.callback.apply(this.callbackContext, this.argsArray);
        this.currentAnimationFunction.call(window, this.rafUpdateFunction);
        this.prevTime = this.currentTime;
    }
    getTimer() {
        return Date.now();
    }
}

export {
    PropertySetter, PropertyOverrideHandler, MouseEventDelegate, HoverController,
    MouseHoverController, ConfigurableMouseHoverController, ModelMouseRotator,
    ConfigurableModelMouseRotator, RequestAnimationFrame
}