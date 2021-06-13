/* eslint-disable no-unused-expressions */
import {
    Matrix3D, TypedSimpleGeometryData, TypedSimpleMeshData
} from "./geometry.js"
// const pako = require("pako");
// import LZMA from 'lzma';
import pako from 'pako';



class MMFData {
    __class__ = MMFData;
    static __name__ = ["MMFData"];
    constructor() {
        this.metaHolder = {};
    }
    hasMetadata(a) {
        return void null != this.metaHolder[a];
    }
    getMetadata(a) {
        var b = this.metaHolder[a];
        return null == b ? null : b;
    }
    removeMetaData(a) {
        delete this.metaHolder[a]
    }
    addMetaData(a, b) {
        this.metaHolder[a] = b
    }
}
const MMFMark = {
    MAIN_GEOMETRY: 0,
    MAIN_MESH: 1,
    META_STRING: 0,
    META_NUMBER: 1,
    META_BOOLEAN: 2,
};
class MMFReader {
    constructor() {
        this.littleEndianMode = this.checkLittleEndian();
    }

    readFormat(buffer, mmfBuilder) {
        this.length = buffer.byteLength;
        this.dataView = new DataView(buffer);
        this.position = 0;
        let format = "";
        if (
            ((format += String.fromCharCode(this.readBtye())),
                (format += String.fromCharCode(this.readBtye())),
                (format += String.fromCharCode(this.readBtye())),
                "MMF" != format)
        )
            throw new Error("File is not valid MMF");

        this.version = this.readUInt32();
        let e,
            compressMethod = this.readBtye(),
            byteArray = new Uint8Array(
                this.dataView.buffer,
                this.position,
                this.length - this.position
            );
        if (1 == compressMethod) {
            let result = pako.inflate(byteArray);
            this.dataView = new DataView(result.buffer);
            this.length = result.length;
            this.position = 0;
            let mmfData = this.readRawData();
            mmfBuilder.result([mmfData]);
        }
        else if (3 == compressMethod) {
            // LZMA.decompress(byteArray, (result, error) => {
            //     // decompress(byteArray, function (a, error) {
            //     if (error) {
            //         // mResponder.fault([Fault.fromError(error)]);
            //     }
            //     else {
            //         let e = new Uint8Array(result);
            //         (this.dataView = new DataView(e.buffer)),
            //             (this.length = e.length),
            //             (this.position = 0);
            //         let mmfData = this.readRawData();
            //         mmfBuilder.result([mmfData]);
            //     }
            // });
        }
        else {
            let mmfData = this.readRawData();
            mmfBuilder.result([mmfData])
        }
    }

    readRawData() {
        var mmfData = new MMFData();
        if (0 == this.version) {
            mmfData.addMetaData("profileWidth", this.readFloat32()),
                mmfData.addMetaData("profileHeight", this.readFloat32()),
                mmfData.addMetaData("circumference", this.readFloat32());
        }
        else {
            if (1 != this.version)
                throw new Error("Unknown MMF version:" + this.version);
            for (let count = this.readUInt32(), i = 0; count > i; i++) {
                let key = this.readFlaggedMetaValue(),
                    val = this.readFlaggedMetaValue();
                mmfData.addMetaData(key, val);
            }
        }
        this.readMainBlock();
        mmfData.simpleMeshDatas = this.simpleMeshDatas;
        return mmfData;
    }

    readFlaggedMetaValue() {
        let a = this.readBtye();
        if (a == MMFMark.META_STRING) {
            let c = "";
            for (let b = this.readUInt32(), d = 0; b > d; d++) {
                c += String.fromCharCode(this.readUInt16());
            }
            return c;
        }
        if (a == MMFMark.META_NUMBER) {
            return this.readFloat32();
        }
        if (a == MMFMark.META_BOOLEAN) {
            let e = this.readBtye();
            if (0 == e) return false;
            if (1 == e) return true;
            throw new Error("Unknown meta boolean value found:" + e);
        }
        throw new Error("Unknown meta flag found");
    }

    readMainBlock() {
        this.geometryDatas = [];
        this.simpleMeshDatas = [];
        for (let i = 0; this.position < this.length;) {
            let mark = this.readBtye();
            if (mark == MMFMark.MAIN_GEOMETRY) {
                let geometry = this.readGeometry();
                this.geometryDatas.push(geometry);
            }
            else {
                if (mark != MMFMark.MAIN_MESH)
                    throw new Error("invalid main flag found");
                let meshdata = this.readMeshData();
                this.simpleMeshDatas.push(meshdata);
                i++;
            }
        }
    }

    readGeometry() {
        var _TypedSimpleGeometryData = new TypedSimpleGeometryData();
        _TypedSimpleGeometryData.vertexPositionData = this.readFloat32Array(),
            _TypedSimpleGeometryData.indices = this.readUInt16Array(),
            _TypedSimpleGeometryData.vertexNormalData = this.readFloat32Array(),
            _TypedSimpleGeometryData.uvData = this.readFloat32Array(),
            _TypedSimpleGeometryData.secondaryUvData = this.readFloat32Array(),
            _TypedSimpleGeometryData.vertexTangentData = this.readFloat32Array();
        return _TypedSimpleGeometryData;
    }

    readMeshData() {
        var _TypedSimpleMeshData = new TypedSimpleMeshData(),
            geoIndex = this.readUInt16(),
            _geometryData = this.geometryDatas[geoIndex];
        if (!_geometryData)
            throw new Error("Geometry index: " + geoIndex + " not found");

        _TypedSimpleMeshData.geometryData = _geometryData;
        var floatArray = this.readFloat32Array();
        if (floatArray) {
            var transMatrix = new Matrix3D(floatArray);
            _TypedSimpleMeshData.transformation = transMatrix
        }
        for (var count = this.readUInt32(), i = 0; i < count; i++) {
            var key = this.readFlaggedMetaValue(),
                val = this.readFlaggedMetaValue();
            _TypedSimpleMeshData.addMetaData(key, val);
        }
        return _TypedSimpleMeshData;
    }

    readBtye() {
        let code = this.dataView.getUint8(this.position);
        this.position += 1;
        return code;
    }
    readUInt16() {
        let code = this.dataView.getUint16(this.position, this.littleEndianMode);
        this.position += 2;
        return code;
    }

    readUInt32() {
        let code = this.dataView.getUint32(this.position, this.littleEndianMode);
        this.position += 4;
        return code;
    }

    readFloat32() {
        let code = this.dataView.getFloat32(this.position, this.littleEndianMode);
        this.position += 4;
        return code;
    }

    readFloat32Array() {
        let readCount = this.readUInt32();
        if (!readCount)
            return null;
        try {
            let array;
            if (this.littleEndianMode) {
                let buffer = new ArrayBuffer(4 * readCount),
                    srcBuffer = new Uint8Array(this.dataView.buffer, this.position, 4 * readCount),
                    dstBuffer = new Uint8Array(buffer, 0, 4 * readCount);
                return (
                    dstBuffer.set(srcBuffer), (array = new Float32Array(buffer, 0, readCount)), (this.position += 4 * readCount), array
                );
            }
            array = new Float32Array(readCount);
            for (let i = 0; readCount > i; i++) {
                array[i] = this.readFloat32();
            }
            return array;
        }
        catch (err) {
            let error = new Error(err.message + " size:" + readCount + " pos:" + this.position);
            throw ((error.stack = err.stack), error);
        }
    }

    readUInt16Array() {
        let readCount = this.readUInt32();
        if (!readCount) return null;
        try {
            let array;
            if (this.littleEndianMode) {
                let buffer = new ArrayBuffer(2 * readCount),
                    srcBuffer = new Uint8Array(this.dataView.buffer, this.position, 2 * readCount),
                    dstBuffer = new Uint8Array(buffer, 0, 2 * readCount);
                return (
                    dstBuffer.set(srcBuffer), (array = new Uint16Array(buffer, 0, readCount)), (this.position += 2 * readCount), array
                );
            }
            array = new Uint16Array(readCount);
            for (let i = 0; readCount > i; i++)
                array[i] = this.readUInt16();
            return array;
        }
        catch (err) {
            let error = new Error(err.message + " size:" + readCount + " pos:" + this.position);
            throw ((error.stack = err.stack), error);
        }
    }

    checkLittleEndian() {
        let a = new ArrayBuffer(4),
            b = new Uint8Array(a),
            c = new Uint16Array(a);
        (b[0] = 17), (b[1] = 34);
        return 8721 == c[0];
    }
}

export {
    MMFReader
}