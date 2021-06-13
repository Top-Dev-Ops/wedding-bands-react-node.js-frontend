/* eslint-disable no-unused-expressions */
class Event {
    constructor(type, bubbles, cancelable) {
        null == bubbles && (bubbles = false),
            null == cancelable && (cancelable = false),
            this.type = type,
            this.bubbles = bubbles,
            this.cancelable = cancelable,
            this.timeStamp = (new Date).getTime(),
            this.target = null,
            this.currentTarget = null,
            this.eventPhase = 0,
            this.defaultPrevented = false,
            this.propagationStopped = false,
            this.immediatePropagationStopped = false,
            this.removed = false
    }

    preventDefault() { this.defaultPrevented = true }
    stopPropagation() { this.propagationStopped = true }
    stopImmediatePropagation() {
        this.immediatePropagationStopped = this.propagationStopped = true
    }
    remove() { this.removed = true }
    clone() {
        var b = new Event(this.type, this.bubbles, this.cancelable);
        return b.data = this.data, b
    }
    toString() {
        return "[Event (type=" + this.type + ")]"
    }
    static ACTIVATE = "activate";
    static ADDED = "added";
    static CANCEL = "cancel";
    static CHANGE = "change";
    static CLEAR = "clear";
    static CLOSE = "close";
    static CLOSING = "closing";
    static COMPLETE = "complete";
    static CONNECT = "connect";
    static DEACTIVATE = "deactivate";
    static DISPLAYING = "displaying";
    static ENTER_FRAME = "enterFrame";
    static EXIT_FRAME = "exitFrame";
    static EXITING = "exiting";
    static FULLSCREEN = "fullScreen";
    static INIT = "init";
    static LOCATION_CHANGE = "locationChange";
    static OPEN = "open";
    static REMOVED = "removed";
    static RENDER = "render";
    static RESIZE = "resize";
    static SCROLL = "scroll";
    static SELECT = "select";
    static SELECT_ALL = "selectAll";
    static UNLOAD = "unload";
}
class EventDispatcher {
    constructor() {
        this.listeners = null;
        this.captureListeners = null;
    }
    addEventListener(eventName, listenFunction, bCapture) {
        null == bCapture && (bCapture = false);
        var d;
        d = bCapture ? this.captureListeners = this.captureListeners || {} : this.listeners = this.listeners || {};
        var e = d[eventName];
        return e && this.removeEventListener(eventName, listenFunction, bCapture),
            e = d[eventName],
            e ? e.push(listenFunction) : d[eventName] = [listenFunction],
            listenFunction
    }
    on(eventName, eventProc, obj, bRemove, e, bCapture) {
        return null == obj && (obj = null),
            null == bRemove && (bRemove = false),
            null == e && (e = null),
            null == bCapture && (bCapture = false),
            eventProc.handleEvent && (obj = obj || eventProc, eventProc = eventProc.handleEvent),
            obj = obj || this,
            this.addEventListener(eventName, function (a) {
                eventProc.call(obj, a, e),
                    bRemove && a.remove()
            }, bCapture)
    }
    removeEventListener(eventName, listenFunction, bCapture) {
        null == bCapture && (bCapture = false);
        var d = bCapture ? this.captureListeners : this.listeners;
        if (d) {
            var e = d[eventName];
            if (e)
                for (var f = 0, g = e.length; g > f; f++)
                    if (e[f] == listenFunction) { 1 == g ? delete d[eventName] : e.splice(f, 1); break }
        }
    }
    off(a, b, c) {
        null == c && (c = false), this.removeEventListener(a, b, c)
    }
    removeAllEventListeners(a) {
        null == a && (a = null), a ? (this.listeners && delete this.listeners[a],
            this.captureListeners && delete this.captureListeners[a]) : this.listeners = this.captureListeners = null
    }
    _dispatchEvent(event, eventPhase) {
        var queLength,
            listeners = (1 == eventPhase) ? this.captureListeners : this.listeners;
        if (event && listeners) {
            var e = listeners[event.type];
            if (!e || !(queLength = e.length)) return;
            event.currentTarget = this, event.eventPhase = eventPhase, event.removed = false, e = e.slice();
            for (var i = 0; queLength > i && !event.immediatePropagationStopped; i++) {
                var g = e[i];
                g.handleEvent ? g.handleEvent(event) : g(event);
                event.removed && (this.off(event.type, g, 1 == eventPhase), event.removed = false)
            }
        }
    }
    dispatchEvent(_event, target) {
        null == target && (target = null);
        var event;
        if ("string" == typeof _event) {
            var d = this.listeners;
            if (!d || !d[_event]) return false;
            event = new Event(_event)
        }
        else event = _event;
        if (target != null) event.target = target;
        else event.target = this;
        if (event.bubbles && this.parent) {
            for (var f = this, g = [f]; f.parent;)
                g.push(f = f.parent);
            var h, i = g.length;
            for (h = i - 1; h >= 0 && !event.propagationStopped; h--)
                g[h]._dispatchEvent(event, 1 + (0 == h ? 1 : 0));
            for (h = 1; i > h && !event.propagationStopped; h++)
                g[h]._dispatchEvent(event, 3)
        }
        else {
            this._dispatchEvent(event, 2);
        }

        return event.defaultPrevented
    }
    hasEventListener(a) {
        var b = this.listeners,
            c = this.captureListeners;
        return !!(b && b[a] || c && c[a])
    }
    willTrigger(a) {
        for (var b = this; b;) {
            if (b.hasEventListener(a)) return true;
            b = b.parent
        }
        return false
    }
    toString() {
        return "[EventDispatcher]"
    }
}
class ResourceEvent extends Event {
    constructor(type, bubbles, cancelable) {
        null == bubbles && (bubbles = false);
        null == cancelable && (cancelable = false);
        super(type, { "bubbles": bubbles, "cancelable": cancelable });
    }
    clone() {
        var a = new ResourceEvent(this.type, this.bubbles, this.cancelable);
        a.progress = this.progress;
        return a;
    }
    static STARTED = "started";
    static PROGRESS = "progress";
    static RESOURCE_LOADED = "resourceLoaded";
    static FINISHED = "finsihed";
    static FAILED = "failed";
}
class AssetEvent extends Event {
    constructor(type, bubbles, cancelable) {
        null == bubbles && (bubbles = false);
        null == cancelable && (cancelable = false);
        super(type, { "bubbles": bubbles, "cancelable": cancelable });
    }
    clone() {
        var a = new AssetEvent(this.type, this.bubbles, this.cancelable);
        a.progress = this.progress;
        a.assetPackage = this.assetPackage;
        a.fault = this.fault;
        return a;
    }
    static STARTED = "started";
    static PROGRESS = "progress";
    static FINISHED = "finsihed";
    static PACKAGE_LOADED = "packageLoaded";
    static FAILED = "failed";
}
class ErrorEvent extends Event {
    constructor(type, bubbles, cancelable, text, errorID) {
        null == bubbles && (bubbles = false);
        null == cancelable && (cancelable = false);
        null == text && (text = "");
        null == errorID && (errorID = 0);
        super(type, { "bubbles": bubbles, "cancelable": cancelable });
        this.text = text, this.errorID = errorID;
    }
    clone() {
        var a = new ErrorEvent(this.type, this.bubbles, this.cancelable, this.text, this.errorID);
        return a;
    }
    static ERROR = "error";
}
class FaultErrorEvent extends ErrorEvent {
    constructor(type, fault, bubbles, cancelable) {
        null == bubbles && (bubbles = false);
        null == cancelable && (cancelable = false);
        super(type, bubbles, cancelable, fault.faultString, fault.faultCode);
        this.fault = fault;
    }
    static ERROR = "error";
}
class HTTPStatusEvent extends Event {
    status = null;
    constructor(type, bubbles, cancelable) {
        null == bubbles && (bubbles = false);
        null == cancelable && (cancelable = false);
        super(type, { "bubbles": bubbles, "cancelable": cancelable });
    }
    clone() {
        var a = new HTTPStatusEvent(this.type, this.bubbles, this.cancelable);
        a.status = this.status;
        return a;
    }
    static HTTP_STATUS = "httpStatus";
}
class ProgressEvent extends Event {
    bytesLoaded = null;
    bytesTotal = null;
    constructor(type, bubbles, cancelable) {
        null == bubbles && (bubbles = false);
        null == cancelable && (cancelable = false);
        super(type, { "bubbles": bubbles, "cancelable": cancelable });
    }
    clone() {
        var a = new ProgressEvent(this.type, this.bubbles, this.cancelable);
        a.bytesLoaded = this.bytesLoaded;
        a.bytesTotal = this.bytesTotal;
        return a;
    }
    static PROGRESS = "progress";
}
class TimerEvent extends Event {
    constructor(type, bubbles, cancelable) {
        null == bubbles && (bubbles = false);
        null == cancelable && (cancelable = false);
        super(type, { "bubbles": bubbles, "cancelable": cancelable });
    }
    static TIMER = "timer";
    static TIMER_COMPLETE = "timerComplete";
}
class UIEvent extends Event {
    name = '';
    data = null;
    constructor(type, bubbles, cancelable) {
        null == bubbles && (bubbles = false);
        null == cancelable && (cancelable = false);
        super(type, { "bubbles": bubbles, "cancelable": cancelable });
    }
    clone() {
        var a = new UIEvent(this.type, this.bubbles, this.cancelable);
        a.data = this.data;
        a.name = this.name;
        return a
    }
    static ITEM_SELECTED = "itemSelected";
}
class AssetPackageLoaderEvent extends Event {
    progress = null;
    intent = null;
    assetPackage = null;
    fault = null;
    constructor(type, bubbles, cancelable) {
        null == bubbles && (bubbles = false);
        null == cancelable && (cancelable = false);
        super(type, { "bubbles": bubbles, "cancelable": cancelable });
    }
    clone() {
        var a = new AssetPackageLoaderEvent(this.type, this.bubbles, this.cancelable);
        a.progress = this.progress;
        a.intent = this.intent;
        a.assetPackage = this.assetPackage;
        a.fault = this.fault;
        return a;
    }
    static LOAD_PROGRESS = "loadProgress";
    static INTENT_LOADED = "intentLoaded";
    static PACKAGE_COMPLETE = "packageComplete";
    static PACKAGE_FAILED = "packageFailed";
}
class IntentLoaderEvent extends Event {
    constructor(type, bubbles, cancelable) {
        null == bubbles && (bubbles = false);
        null == cancelable && (cancelable = false);
        super(type, { "bubbles": bubbles, "cancelable": cancelable });
    }
    clone() {
        var a = new ProgressEvent(this.type, this.bubbles, this.cancelable);
        return a;
    }
    static LOAD_START = "loadStart";
    static LOAD_COMPLETE = "loadComplete";
}
class IntentLoaderProgressEvent extends Event {
    progress = null;
    constructor(type, bubbles, cancelable) {
        null == bubbles && (bubbles = false);
        null == cancelable && (cancelable = false);
        super(type, { "bubbles": bubbles, "cancelable": cancelable });
    }
    clone() {
        var a = new ProgressEvent(this.type, this.bubbles, this.cancelable);
        a.progress = this.progress;
        return a;
    }
    static LOAD_PROGRESS = "loadProgress";
}
class IntentLoaderStatusEvent extends Event {
    intentIndex = 0;
    intent = null;
    constructor(type, bubbles, cancelable) {
        null == bubbles && (bubbles = false);
        null == cancelable && (cancelable = false);
        super(type, { "bubbles": bubbles, "cancelable": cancelable });
    }
    clone() {
        var a = new ProgressEvent(this.type, this.bubbles, this.cancelable);
        a.intentIndex = this.intentIndex, a.intent = this.intent;
        return a;
    }
    static INTENT_LOAD_START = "intentLoadStart";
    static INTENT_LOAD_COMPLETE = "intentLoadComplete";
}
class LoadIntentErrorEvent extends Event {
    fault = null;
    constructor(type, bubbles, cancelable) {
        null == bubbles && (bubbles = false);
        null == cancelable && (cancelable = false);
        super(type, { "bubbles": bubbles, "cancelable": cancelable });
    }
    clone() {
        var a = new ProgressEvent(this.type, this.bubbles, this.cancelable);
        a.fault = this.fault;
        return a;
    }
    static LOAD_ERROR = "loadError";
}
class LoadIntentEvent extends Event {
    constructor(type, bubbles, cancelable) {
        null == bubbles && (bubbles = false);
        null == cancelable && (cancelable = false);
        super(type, { "bubbles": bubbles, "cancelable": cancelable });
    }
    clone() {
        var a = new ProgressEvent(this.type, this.bubbles, this.cancelable);
        return a;
    }
    static LOAD_START = "loadStart";
    static LOAD_COMPLETE = "loadComplete";
}
class LoadIntentProgressEvent extends Event {
    progress = null;
    constructor(type, bubbles, cancelable) {
        null == bubbles && (bubbles = false);
        null == cancelable && (cancelable = false);
        super(type, { "bubbles": bubbles, "cancelable": cancelable });
    }
    clone() {
        var a = new ProgressEvent(this.type, this.bubbles, this.cancelable);
        a.progress = this.progress;
        return a;
    }
    static LOAD_PROGRESS = "loadProgress";
}
class Model3DEvent extends Event {
    constructor(type, bubbles, cancelable) {
        null == bubbles && (bubbles = false);
        null == cancelable && (cancelable = false);
        super(type, { "bubbles": bubbles, "cancelable": cancelable });
    }
    clone() {
        var a = new ProgressEvent(this.type, this.bubbles, this.cancelable);
        return a;
    }
    static PARTS_CHANGED = "partsChanged";
}
class IntentLoaderErrorEvent extends ErrorEvent {
    static INTENT_LOAD_ERROR = "intentLoadError";
    constructor(b, c, d) {
        null == c && (c = false),
            null == d && (d = false),
            super(b, c, d);
    }
    clone() {
        var a = new IntentLoaderErrorEvent(this.type, this.bubbles, this.cancelable);
        a.intent = this.intent,
            a.fault = this.fault;
        return a
    }
}
class IOErrorEvent extends ErrorEvent {
    constructor(type, bubbles, cancelable, text, errorID) {
        null == bubbles && (bubbles = false),
            null == cancelable && (cancelable = false),
            null == text && (text = ""),
            null == errorID && (errorID = 0);
        super(type, bubbles, cancelable, text, errorID);
    }
    static IO_ERROR = "ioError";
}
export {
    Event, FaultErrorEvent, Model3DEvent, LoadIntentProgressEvent,
    LoadIntentEvent, LoadIntentErrorEvent, IntentLoaderStatusEvent, IntentLoaderProgressEvent,
    IntentLoaderEvent, AssetPackageLoaderEvent, UIEvent, TimerEvent, ProgressEvent,
    HTTPStatusEvent, ErrorEvent, AssetEvent, ResourceEvent, IOErrorEvent, IntentLoaderErrorEvent, EventDispatcher
};