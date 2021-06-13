/* eslint-disable no-unused-expressions */
class Fault {
    constructor(a, b, c) {
        null == b && (b = 0),
            (this.faultString = null != a ? a : ""),
            (this.faultCode = b),
            (this.faultDetail = c);
    }

    static fromErrorEvent(a) {
        var b = new Fault(a.k);
        return (
            (b.faultCode = a.errorID),
            (b.faultType = Fault.TYPE_ERROR_EVENT),
            (b.rootCause = a),
            (b.faultDetail = a.toString()),
            b
        );
    }
    static fromError(a) {
        var b = new Fault(a.message);
        return (
            (b.faultCode = 0),
            (b.faultType = Fault.TYPE_ERROR),
            (b.rootCause = a),
            (b.faultDetail = a.stack),
            b
        );
    }
    faultCode = null;
    faultString = null;
    rootCause = null;
    faultDetail = null;
    faultType = null;
    toString() {
        var a = "[Fault";
        return (
            (a = "[Fault" + (' faultType="' + this.faultType + '"')),
            (a += ' faultString="' + this.faultString + '"'),
            (a += ' faultCode="' + this.faultCode + '"'),
            (a += ' faultDetail="' + this.faultDetail + '"]')
        );
    }
}
Fault.TYPE_ERROR_EVENT = "errorEvent";
Fault.TYPE_ERROR = "error";

class ErrorWrap extends Error {
    static __super__ = Error;
    __class__ = ErrorWrap;
    static __name__ = ["ErrorWrap"];
    val = null;
    constructor(a) {
        super();
        (this.val = a),
            (this.message = String(a)),
            Error.captureStackTrace && Error.captureStackTrace(this, ErrorWrap);
    }

    static wrap(a) {
        return a instanceof Error ? a : new ErrorWrap(a);
    }
}
class ErrorBase {
    constructor(a) {
        this.message = a,
            this.name = this.constructor.name,
            this.stack = (new Error).stack
    }
}
class ParseError extends ErrorBase {
    constructor(b) {
        null == b && (b = ""),
            super(b);
    }
}
class NotFoundError extends ErrorBase {
    constructor(b) {
        null == b && (b = "");
        super(b);
        this.name = this.constructor.name;
    }
}
class ConfigurationPropertyError extends Error {
    constructor(b) {
        null == b && (b = "");
        super(b);
    }
}

export {
    Fault, ErrorWrap
};
export {
    ParseError, NotFoundError, ConfigurationPropertyError
}