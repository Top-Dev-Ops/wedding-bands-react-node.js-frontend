/* eslint-disable no-unused-expressions */
import {
    TimerEvent,
    EventDispatcher
} from './event.js'

class WebGLGlobals {
    constructor() { }
    static renderer;
}
class SettingsKeys {
    constructor() { }
    static RESOLVE_ASSETS_FROM_BASE = "resolveAssetsFromBase";
    static ASSETS_PATH = "assetsPath";
    static USE_BACKGROUND_MASK = "useBackgroundMask";
}
class RescourceInfo {
    constructor() {
        this.type = "";
        this.name = '';
        this.path = '';
        this.content = '';
        this.id = 0;
        this.isDefault = false;
    }
}

class TimeoutCaller {
    constructor(delay, closure) {
        null == delay && (delay = 1e3);
        null == closure && (closure = null);
        this.timeoutId = 0;
        this.delay = 1e3;
        this.closure = closure;
        this.delay = delay;
    }
    setDelay(a) {
        this.delay = a
    }
    getDelay() {
        return this.delay
    }
    clear() {
        clearTimeout(this.timeoutId)
    }
    call(handler, b, closure) {
        null == b && (b = null);
        null == closure && (closure = null);
        this.clear(), b = b || [];
        this.timeoutId = setTimeout(() => {
            closure = closure ? closure : this.closure;
            handler.apply(closure, b)
        }, this.delay);
    }
}
class LinkedDescriptors {
    constructor(a, b) {
        this.descriptors = a,
            this.owner = b
    }
}
class InstanceRegistry {
    constructor() { }
    static getSingleton(b) {
        for (var c = 0; c < InstanceRegistry.instanceArray.length; c++) {
            var obj = InstanceRegistry.instanceArray[c];
            if (obj instanceof b)
                return obj
        }
        var obj = new b;
        InstanceRegistry.instanceArray.push(obj);
        return obj
    }
    static instanceArray = [];
}
class UID {
    constructor() { }
    static create(a) {
        null == a && (a = null);
        var b = (new Date).getTime();
        var c = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
            var c = (b + 16 * Math.random()) % 16 | 0;
            return b = Math.floor(b / 16), ("x" == a ? c : 7 & c | 8).toString(16)
        });
        return c
    }
}
class TaskQue {
    constructor() {
        this.que = [];
    }
    get tasks() { return this.que.concat() }
    addTask(a) {
        this.que.push(a)
    }
    hasNext() {
        return Boolean(this.que.length)
    }
    runNext() {
        if (this.que.length) {
            var a = this.que.shift();
            return a.run(), true
        }
        return false
    }
    clear() {
        this.que = []
    }
}
class Timer extends EventDispatcher {
    constructor(b, c) {
        null == c && (c = 0);
        super();
        this.delay = b,
            this.repeatCount = c,
            this.running = false,
            this.currentCount = 0,
            this.currentTimeoutId = NaN;
    }
    reset() {
        this.stop(),
            this.currentCount = 0
    }
    start() {
        this.running || this.runTimeout()
    }
    stop() {
        this.running && this.stopTimeout()
    }
    runTimeout() {
        var a = this;
        this.running = true,
            this.currentTimeoutId = setTimeout(function () {
                a.handleTimerFired()
            }, this.delay)
    }
    stopTimeout() {
        this.running && (clearTimeout(this.currentTimeoutId), this.running = false)
    }
    handleTimerFired() {
        this.currentCount++,
            this.dispatchEvent(new TimerEvent(TimerEvent.TIMER)),
            0 != this.repeatCount && this.currentCount == this.repeatCount ? (this.running = false, this.dispatchEvent(new TimerEvent(TimerEvent.TIMER_COMPLETE))) : this.runTimeout()
    }
}
class CallbackCounter {
    constructor(a, b) {
        null == b && (b = 1),
            this.callCount = 0,
            this.numCallback = 1,
            this.scope = a,
            this.numCallback = b
    }
    setCallbackFunc(func, args) {
        null == args && (args = null);
        this.callbackFunc = func, this.args = args
    }
    clearCallbackFunc() {
        this.callbackFunc = null;
        this.args = []
    }
    incCallNum(a) {
        null == a && (a = null);
        this.callCount++;
        if (this.callCount == this.numCallback && null != this.callbackFunc) {
            this.callbackFunc.apply(this.scope, this.args); //handleAllRingsReady
            this.reset();
        }
    }
    reset() {
        this.callCount = 0
    }
}
export {
    CallbackCounter, Timer, TaskQue, UID, RescourceInfo, SettingsKeys, InstanceRegistry, LinkedDescriptors, TimeoutCaller, WebGLGlobals
};