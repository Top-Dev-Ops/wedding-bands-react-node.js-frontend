/* eslint-disable no-unused-expressions */
var THREE = require("three");

const CopyShader = {
    uniforms: { tDiffuse: { value: null }, opacity: { value: 1 } },

    vertexShader: [
        "varying vec2 vUv;",
        "void main() {",
        "vUv = uv;",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "}"
    ].join("\n"),

    fragmentShader: [
        "uniform float opacity;",
        "uniform sampler2D tDiffuse;",
        "varying vec2 vUv;",
        "void main() {",
        "vec4 texel = texture2D( tDiffuse, vUv );",
        "gl_FragColor = opacity * texel;",
        "}"
    ].join("\n")
};
const LuminosityHighPassShader = {
    shaderID: "luminosityHighPass",
    uniforms: {
        tDiffuse: { type: "t", value: null },
        luminosityThreshold: { type: "f", value: 1 },
        smoothWidth: { type: "f", value: 1 },
        defaultColor: { type: "c", value: new THREE.Color(0) },
        defaultOpacity: { type: "f", value: 0 }
    },
    vertexShader: [
        "varying vec2 vUv;",
        "void main() {",
        "vUv = uv;",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "}"
    ].join("\n"),
    fragmentShader: [
        "uniform sampler2D tDiffuse;",
        "uniform vec3 defaultColor;",
        "uniform float defaultOpacity;",
        "uniform float luminosityThreshold;",
        "uniform float smoothWidth;",
        "varying vec2 vUv;",
        "void main() {",
        "vec4 texel = texture2D( tDiffuse, vUv );",
        "vec3 luma = vec3( 0.299, 0.587, 0.114 );",
        "float v = dot( texel.xyz, luma );",
        "vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );",
        "float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );",
        "gl_FragColor = mix( outputColor, texel, alpha );",
        "}"
    ].join("\n")
};
const ConvolutionShader = {
    defines: { KERNEL_SIZE_FLOAT: "25.0", KERNEL_SIZE_INT: "25" },
    uniforms: {
        tDiffuse: { value: null },
        uImageIncrement: { value: new THREE.Vector2(.001953125, 0) },
        cKernel: { value: [] }
    },
    vertexShader: ["uniform vec2 uImageIncrement;", "varying vec2 vUv;", "void main() {", "vUv = uv - ( ( KERNEL_SIZE_FLOAT - 1.0 ) / 2.0 ) * uImageIncrement;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform float cKernel[ KERNEL_SIZE_INT ];", "uniform sampler2D tDiffuse;", "uniform vec2 uImageIncrement;", "varying vec2 vUv;", "void main() {", "vec2 imageCoord = vUv;", "vec4 sum = vec4( 0.0, 0.0, 0.0, 0.0 );", "for( int i = 0; i < KERNEL_SIZE_INT; i ++ ) {", "sum += texture2D( tDiffuse, imageCoord ) * cKernel[ i ];", "imageCoord += uImageIncrement;", "}", "gl_FragColor = sum;", "}"].join("\n"),
    buildKernel: function (a) {
        function b(a, b) { return Math.exp(-(a * a) / (2 * b * b)) }
        var c, d, e, f, g = 25,
            h = 2 * Math.ceil(3 * a) + 1;
        for (h > g && (h = g), f = .5 * (h - 1), d = new Array(h), e = 0, c = 0; h > c; ++c) d[c] = b(c - f, a), e += d[c];
        for (c = 0; h > c; ++c) d[c] /= e;
        return d
    }
};
class Pass {
    constructor() {
        this.enabled = true;
        this.needsSwap = true;
        this.clear = false;
        this.renderToScreen = false;
    }
    setSize(a, b) { }
    render(renderer, writeBuffer, readBuffer, delta, maskActive) {
        console.error("Pass: .render() must be implemented in derived pass.");
    }
}
class RenderPass extends Pass {
    constructor(scene, camera, overrideMaterial, clearColor, clearAlpha) {
        super();
        this.scene = scene;
        this.camera = camera;
        this.overrideMaterial = overrideMaterial;
        this.clearColor = clearColor;
        this.clearAlpha = null != clearAlpha ? clearAlpha : 0;
        this.clear = true;
        this.needsSwap = false;
    }
    render(renderer, writeBuffer, readBuffer, delta, maskActive) {
        var oldAutoClear = renderer.autoClear;
        renderer.autoClear = false;

        this.scene.overrideMaterial = this.overrideMaterial;
        var oldClearColor, oldClearAlpha;
        this.clearColor && (
            oldClearColor = renderer.getClearColor().getHex(),
            oldClearAlpha = renderer.getClearAlpha(),
            renderer.setClearColor(this.clearColor, this.clearAlpha)
        );

        renderer.render(this.scene, this.camera, this.renderToScreen ? null : readBuffer, this.clear);

        this.clearColor && renderer.setClearColor(oldClearColor, oldClearAlpha);
        this.scene.overrideMaterial = null;

        renderer.autoClear = oldAutoClear;
    }
}
class LayerRenderPass extends Pass {
    constructor(scene, camera, overrideMaterial, clearColor, clearAlpha, layer) {
        super();
        this.scene = scene,
            this.camera = camera,
            this.overrideMaterial = overrideMaterial,
            this.clearColor = clearColor,
            this.clearAlpha = null != clearAlpha ? clearAlpha : 0,
            this.layer = null != layer ? layer : 0,
            this.clear = true,
            this.needsSwap = false
    }
    render(renderer, writeBuffer, readBuffer, delta, maskActive) {

        var oldAutoClear = renderer.autoClear;
        renderer.autoClear = false;

        this.scene.overrideMaterial = this.overrideMaterial;
        var oldClearColor, oldClearAlpha;
        this.clearColor && (
            oldClearColor = renderer.getClearColor().getHex(),
            oldClearAlpha = renderer.getClearAlpha(),
            renderer.setClearColor(this.clearColor, this.clearAlpha)
        );
        this.camera.layers.set(this.layer);

        renderer.render(this.scene, this.camera, this.renderToScreen ? null : readBuffer, this.clear);
        this.clearColor && renderer.setClearColor(oldClearColor, oldClearAlpha);
        this.scene.overrideMaterial = null;

        renderer.autoClear = oldAutoClear;
    }
}
class ShaderPass extends Pass {
    constructor(material, textureID) {
        super();
        this.textureID = null != textureID ? textureID : "tDiffuse";
        material instanceof THREE.ShaderMaterial ? (this.uniforms = material.uniforms, this.material = material) : material && (
            this.uniforms = THREE.UniformsUtils.clone(material.uniforms),
            this.material = new THREE.ShaderMaterial(
                {
                    defines: material.defines || {},
                    uniforms: this.uniforms,
                    vertexShader: material.vertexShader,
                    fragmentShader: material.fragmentShader
                }
            ),
            this.material.transparent = true
        );
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        this.scene = new THREE.Scene;
        this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
        this.scene.add(this.quad);
    }
    render(renderer, writeBuffer, readBuffer, delta, maskActive) {
        this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = readBuffer.texture);
        this.quad.material = this.material;
        if (this.renderToScreen)
            renderer.render(this.scene, this.camera);
        else {
            renderer.render(this.scene, this.camera, writeBuffer, this.clear);
        }
    }
}
class ClearPass extends Pass {
    constructor(clearColor, clearAlpha) {
        super();
        this.needsSwap = false,
            this.clearColor = null != clearColor ? clearColor : 0,
            this.clearAlpha = null != clearAlpha ? clearAlpha : 0
    }
    render(renderer, writeBuffer, readBuffer, delta, maskActive) {
        var oldClearColor, oldClearAlpha;
        this.clearColor && (
            oldClearColor = renderer.getClearColor().getHex(),
            oldClearAlpha = renderer.getClearAlpha(),
            renderer.setClearColor(this.clearColor, this.clearAlpha)
        );
        renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
        renderer.clear();
        this.clearColor && renderer.setClearColor(oldClearColor, oldClearAlpha);
    }
}

class MaskPass extends Pass {
    constructor(scene, camera) {
        super();
        this.scene = scene;
        this.camera = camera;

        this.clear = true;
        this.needsSwap = false;

        this.inverse = false;
    }
    render(renderer, writeBuffer, readBuffer, delta, maskActive) {
        var context = renderer.context;
        var state = renderer.state;
        // don't update color or depth
        state.buffers.color.setMask(false);
        state.buffers.depth.setMask(false);
        // lock buffers
        state.buffers.color.setLocked(true);
        state.buffers.depth.setLocked(true);
        // set up stencil
        var writeValue, clearValue;
        if (this.inverse) {
            writeValue = 0;
            clearValue = 1;
        } else {
            writeValue = 1;
            clearValue = 0;
        }
        state.buffers.stencil.setTest(true);
        state.buffers.stencil.setOp(context.REPLACE, context.REPLACE, context.REPLACE);
        state.buffers.stencil.setFunc(context.ALWAYS, writeValue, 0xffffffff);
        state.buffers.stencil.setClear(clearValue);
        // draw into the stencil buffer
        renderer.render(this.scene, this.camera, readBuffer, this.clear);
        renderer.render(this.scene, this.camera, writeBuffer, this.clear);
        // unlock color and depth buffer for subsequent rendering
        state.buffers.color.setLocked(false);
        state.buffers.depth.setLocked(false);
        // only render where stencil is set to 1
        state.buffers.stencil.setFunc(context.EQUAL, 1, 0xffffffff);  // draw if == 1
        state.buffers.stencil.setOp(context.KEEP, context.KEEP, context.KEEP);
    }
}
class ClearMaskPass extends Pass {
    constructor() {
        super();
        this.needsSwap = false;
    }
    render(renderer, writeBuffer, readBuffer, delta, maskActive) {
        renderer.state.buffers.stencil.setTest(false);
    }
}
class UnrealBloomPass extends Pass {
    constructor(resolution, strength, radius, threshold) {
        super();
        this.strength = null != strength ? strength : 1;
        this.radius = radius;
        this.threshold = threshold;
        this.resolution = null != resolution ? new THREE.Vector2(resolution.x, resolution.y) : new THREE.Vector2(256, 256);
        var filter = {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat
        };
        this.renderTargetsHorizontal = [];
        this.renderTargetsVertical = [];
        this.nMips = 5;
        var resx = Math.round(this.resolution.x / 2),
            resy = Math.round(this.resolution.y / 2);
        this.renderTargetBright = new THREE.WebGLRenderTarget(resx, resy, filter);
        this.renderTargetBright.texture.generateMipmaps = false;
        for (var i = 0; i < this.nMips; i++) {
            var hTarget = new THREE.WebGLRenderTarget(resx, resy, filter);
            hTarget.texture.generateMipmaps = false;
            this.renderTargetsHorizontal.push(hTarget);
            var vTarget = new THREE.WebGLRenderTarget(resx, resy, filter);
            vTarget.texture.generateMipmaps = false;
            this.renderTargetsVertical.push(vTarget);
            resx = Math.round(resx / 2);
            resy = Math.round(resy / 2);
        }

        null == LuminosityHighPassShader && console.error("UnrealBloomPass relies on LuminosityHighPassShader");
        this.highPassUniforms = THREE.UniformsUtils.clone(LuminosityHighPassShader.uniforms);
        this.highPassUniforms.luminosityThreshold.value = threshold;
        this.highPassUniforms.smoothWidth.value = .01;
        this.materialHighPassFilter = new THREE.ShaderMaterial(
            {
                uniforms: this.highPassUniforms,
                vertexShader: LuminosityHighPassShader.vertexShader,
                fragmentShader: LuminosityHighPassShader.fragmentShader,
                defines: {}
            }
        );
        this.materialHighPassFilter.transparent = true;
        this.separableBlurMaterials = [];
        var kernelSizeArray = [3, 5, 7, 9, 11];
        var resx = Math.round(this.resolution.x / 2);
        var resy = Math.round(this.resolution.y / 2);
        for (var i = 0; i < this.nMips; i++) {
            this.separableBlurMaterials.push(this.getSeperableBlurMaterial(kernelSizeArray[i]));
            this.separableBlurMaterials[i].uniforms.texSize.value = new THREE.Vector2(resx, resy);
            this.separableBlurMaterials[i].transparent = true;
            resx = Math.round(resx / 2);
            resy = Math.round(resy / 2);
        }

        this.compositeMaterial = this.getCompositeMaterial(this.nMips);
        this.compositeMaterial.uniforms.blurTexture1.value = this.renderTargetsVertical[0].texture;
        this.compositeMaterial.uniforms.blurTexture2.value = this.renderTargetsVertical[1].texture;
        this.compositeMaterial.uniforms.blurTexture3.value = this.renderTargetsVertical[2].texture;
        this.compositeMaterial.uniforms.blurTexture4.value = this.renderTargetsVertical[3].texture;
        this.compositeMaterial.uniforms.blurTexture5.value = this.renderTargetsVertical[4].texture;
        this.compositeMaterial.uniforms.bloomStrength.value = strength;
        this.compositeMaterial.uniforms.bloomRadius.value = .1;
        this.compositeMaterial.needsUpdate = true;
        this.compositeMaterial.transparent = true;
        this.compositeMaterial.blending = THREE.AdditiveBlending;
        var bloomFactors = [1, .8, .6, .4, .2];
        this.compositeMaterial.uniforms.bloomFactors.value = bloomFactors;
        this.bloomTintColors = [
            new THREE.Vector3(1, 1, 1),
            new THREE.Vector3(1, 1, 1),
            new THREE.Vector3(1, 1, 1),
            new THREE.Vector3(1, 1, 1),
            new THREE.Vector3(1, 1, 1)];
        this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors;

        null == CopyShader && console.error("THREE.BloomPass relies on CopyShader");
        this.copyUniforms = THREE.UniformsUtils.clone(CopyShader.uniforms);
        this.copyUniforms.opacity.value = 1;
        this.materialCopy = new THREE.ShaderMaterial(
            {
                uniforms: this.copyUniforms,
                vertexShader: CopyShader.vertexShader,
                fragmentShader: CopyShader.fragmentShader,
                blending: THREE.AdditiveBlending,
                depthTest: false,
                depthWrite: false,
                transparent: true
            }
        );
        this.materialCopy.transparent = true;
        this.enabled = true;
        this.needsSwap = false;
        this.oldClearColor = new THREE.Color;
        this.oldClearAlpha = 1;
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        this.scene = new THREE.Scene;
        this.quadMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
        this.scene.add(this.quadMesh);
    }
    dispose() {
        for (var a = 0; a < this.renderTargetsHorizontal.length(); a++)
            this.renderTargetsHorizontal[a].dispose();
        for (var a = 0; a < this.renderTargetsVertical.length(); a++)
            this.renderTargetsVertical[a].dispose();
        this.renderTargetBright.dispose();
    }
    setSize(a, b) {
        var c = Math.round(a / 2),
            d = Math.round(b / 2);
        this.renderTargetBright.setSize(c, d);
        for (var i = 0; i < this.nMips; i++) {
            this.renderTargetsHorizontal[i].setSize(c, d);
            this.renderTargetsVertical[i].setSize(c, d);
            this.separableBlurMaterials[i].uniforms.texSize.value = new THREE.Vector2(c, d);
            c = Math.round(c / 2);
            d = Math.round(d / 2);
        }
    }

    render(renderer, writeBuffer, readBuffer, delta, maskActive) {
        this.oldClearColor.copy(renderer.getClearColor());
        this.oldClearAlpha = renderer.getClearAlpha();
        var oldAutoClear = renderer.autoClear;
        renderer.autoClear = false;

        renderer.setClearColor(new THREE.Color(0, 0, 0), 0);
        maskActive && renderer.context.disable(renderer.context.STENCIL_TEST);
        this.highPassUniforms.tDiffuse.value = readBuffer.texture;
        this.highPassUniforms.luminosityThreshold.value = this.threshold;
        this.quadMesh.material = this.materialHighPassFilter;

        renderer.render(this.scene, this.camera, this.renderTargetBright, true);

        var renderBright = this.renderTargetBright;
        for (var i = 0; i < this.nMips; i++) {
            this.quadMesh.material = this.separableBlurMaterials[i];
            this.separableBlurMaterials[i].uniforms.colorTexture.value = renderBright.texture;
            this.separableBlurMaterials[i].uniforms.direction.value = UnrealBloomPass.BlurDirectionX;

            renderer.render(this.scene, this.camera, this.renderTargetsHorizontal[i], true);

            this.separableBlurMaterials[i].uniforms.colorTexture.value = this.renderTargetsHorizontal[i].texture;
            this.separableBlurMaterials[i].uniforms.direction.value = UnrealBloomPass.BlurDirectionY;

            renderer.render(this.scene, this.camera, this.renderTargetsVertical[i], true);

            renderBright = this.renderTargetsVertical[i];
        }

        this.quadMesh.material = this.compositeMaterial;
        this.compositeMaterial.uniforms.bloomStrength.value = this.strength;
        this.compositeMaterial.uniforms.bloomRadius.value = this.radius;
        this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors;
        maskActive && renderer.context.enable(renderer.context.STENCIL_TEST);

        renderer.render(this.scene, this.camera, this.renderToScreen ? null : readBuffer, this.clear);
        renderer.setClearColor(this.oldClearColor, this.oldClearAlpha);
        renderer.autoClear = oldAutoClear;
    }

    getSeperableBlurMaterial(kernelRadius) {
        return new THREE.ShaderMaterial(
            {
                defines: { KERNEL_RADIUS: kernelRadius, SIGMA: kernelRadius },
                uniforms: {
                    colorTexture: { value: null },
                    texSize: { value: new THREE.Vector2(.5, .5) },
                    direction: { value: new THREE.Vector2(.5, .5) }
                },
                vertexShader:
                    "varying vec2 vUv;\n \
                    void main() {\n \
                        vUv = uv;\n \
                        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n \
                    }",
                fragmentShader:
                    "#include <common> \
                    varying vec2 vUv;\n \
                    uniform sampler2D colorTexture;\n \
                    uniform vec2 texSize; \
                    uniform vec2 direction; \
                    float gaussianPdf(in float x, in float sigma) { \
                        return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma; \
                    } \
                    void main() {\n \
                        vec2 invSize = 1.0 / texSize; \
                        float fSigma = float(SIGMA); \
                        float weightSum = gaussianPdf(0.0, fSigma); \
                        vec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum; \
                        for( int i = 1; i < KERNEL_RADIUS; i ++ ) { \
                            float x = float(i); \
                            float w = gaussianPdf(x, fSigma); \
                            vec2 uvOffset = direction * invSize * x; \
                            vec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb; \
                            vec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb; \
                            diffuseSum += (sample1 + sample2) * w; \
                            weightSum += 2.0 * w; \
                        } \
                        gl_FragColor = vec4(diffuseSum/weightSum, 1.0); \
                    }"
            })
    }
    getCompositeMaterial(nMips) {
        return new THREE.ShaderMaterial(
            {
                defines: { NUM_MIPS: nMips },
                uniforms: {
                    blurTexture1: { value: null },
                    blurTexture2: { value: null },
                    blurTexture3: { value: null },
                    blurTexture4: { value: null },
                    blurTexture5: { value: null },
                    dirtTexture: { value: null },
                    bloomStrength: { value: 1 },
                    bloomFactors: { value: null },
                    bloomTintColors: { value: null },
                    bloomRadius: { value: 0 }
                },
                vertexShader:
                    "varying vec2 vUv;\n \
                    void main() {\n \
                        vUv = uv;\n \
                        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n \
                    }",
                fragmentShader:
                    "varying vec2 vUv; \
                    uniform sampler2D blurTexture1; \
                    uniform sampler2D blurTexture2; \
                    uniform sampler2D blurTexture3; \
                    uniform sampler2D blurTexture4; \
                    uniform sampler2D blurTexture5; \
                    uniform sampler2D dirtTexture;  \
                    uniform float bloomStrength;    \
                    uniform float bloomRadius;      \
                    uniform float bloomFactors[NUM_MIPS]; \
                    uniform vec3 bloomTintColors[NUM_MIPS]; \
                    float lerpBloomFactor(const in float factor) { \
                        float mirrorFactor = 1.2 - factor;  \
                        return mix(factor, mirrorFactor, bloomRadius);  \
                    } \
                    void main() { \
                        vec4 col = bloomStrength * \
                                ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) + \
                                lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) + \
                                lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) + \
                                lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +  \
                                lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) ); \
                        gl_FragColor = col; \
                        gl_FragColor.w = (gl_FragColor.x+gl_FragColor.y+gl_FragColor.z)/3.0; \
                    }"
            }
        )
    }
    static BlurDirectionX = new THREE.Vector2(1, 0);
    static BlurDirectionY = new THREE.Vector2(0, 1);
}
class EffectComposer {
    constructor(renderer, renderTarget) {
        this.renderer = renderer;
        if (renderTarget === undefined) {
            var parameters = {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat,
                stencilBuffer: false
            };
            var size = renderer.getDrawingBufferSize();
            renderTarget = new THREE.WebGLRenderTarget(size.width, size.height, parameters);
            renderTarget.texture.name = 'EffectComposer.rt1';
        }
        this.renderTarget1 = renderTarget;
        this.renderTarget2 = renderTarget.clone();
        this.renderTarget2.texture.name = 'EffectComposer.rt2';
        this.writeBuffer = this.renderTarget1;
        this.readBuffer = this.renderTarget2;
        this.passes = [];
        // dependencies
        if (CopyShader === undefined) {
            console.error('EffectComposer relies on CopyShader');
        }
        if (ShaderPass === undefined) {
            console.error('EffectComposer relies on ShaderPass');
        }
        this.copyPass = new ShaderPass(THREE.CopyShader);
    }
    swapBuffers() {
        var tmp = this.readBuffer;
        this.readBuffer = this.writeBuffer;
        this.writeBuffer = tmp;
    }
    addPass(pass) {
        this.passes.push(pass);
        var size = this.renderer.getDrawingBufferSize();
        pass.setSize(size.width, size.height);

    }
    insertPass(pass, index) {
        this.passes.splice(index, 0, pass);
    }
    render(delta) {
        var maskActive = false;
        var pass, i, il = this.passes.length;
        for (i = 0; i < il; i++) {
            pass = this.passes[i];
            if (pass.enabled === false) continue;
            pass.render(this.renderer, this.writeBuffer, this.readBuffer, delta, maskActive);
            if (pass.needsSwap) {
                if (maskActive) {
                    var context = this.renderer.context;
                    context.stencilFunc(context.NOTEQUAL, 1, 0xffffffff);
                    this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, delta);
                    context.stencilFunc(context.EQUAL, 1, 0xffffffff);
                }
                this.swapBuffers();
            }
            if (MaskPass != undefined) {
                if (pass instanceof MaskPass) {
                    maskActive = true;
                } else if (pass instanceof ClearMaskPass) {
                    maskActive = false;
                }
            }
        }
    }
    reset(renderTarget) {
        if (renderTarget === undefined) {
            var size = this.renderer.getDrawingBufferSize();
            renderTarget = this.renderTarget1.clone();
            renderTarget.setSize(size.width, size.height);
        }
        this.renderTarget1.dispose();
        this.renderTarget2.dispose();
        this.renderTarget1 = renderTarget;
        this.renderTarget2 = renderTarget.clone();
        this.writeBuffer = this.renderTarget1;
        this.readBuffer = this.renderTarget2;
    }
    setSize(width, height) {
        this.renderTarget1.setSize(width, height);
        this.renderTarget2.setSize(width, height);
        for (var i = 0; i < this.passes.length; i++) {
            this.passes[i].setSize(width, height);
        }
    }
}
class PMREMGenerator {
    constructor(sourceTexture, samplesPerLevel, resolution) {

        this.sourceTexture = sourceTexture;
        this.resolution = (resolution != undefined) ? resolution : 256; // NODE: 256 is currently hard coded in the glsl code for performance reasons
        this.samplesPerLevel = (samplesPerLevel != undefined) ? samplesPerLevel : 16;

        var monotonicEncoding = (sourceTexture.encoding === THREE.LinearEncoding) ||
            (sourceTexture.encoding === THREE.GammaEncoding) || (sourceTexture.encoding === THREE.sRGBEncoding);

        this.sourceTexture.minFilter = (monotonicEncoding) ? THREE.LinearFilter : THREE.NearestFilter;
        this.sourceTexture.magFilter = (monotonicEncoding) ? THREE.LinearFilter : THREE.NearestFilter;
        this.sourceTexture.generateMipmaps = this.sourceTexture.generateMipmaps && monotonicEncoding;

        this.cubeLods = [];

        var size = this.resolution;
        var params = {
            format: this.sourceTexture.format,
            magFilter: this.sourceTexture.magFilter,
            minFilter: this.sourceTexture.minFilter,
            type: this.sourceTexture.type,
            generateMipmaps: this.sourceTexture.generateMipmaps,
            anisotropy: this.sourceTexture.anisotropy,
            encoding: this.sourceTexture.encoding
        };

        // how many LODs fit in the given CubeUV Texture.
        this.numLods = Math.log(size) / Math.log(2) - 2; // IE11 doesn't support Math.log2

        for (var i = 0; i < this.numLods; i++) {

            var renderTarget = new THREE.WebGLRenderTargetCube(size, size, params);
            renderTarget.texture.name = "PMREMGenerator.cube" + i;
            this.cubeLods.push(renderTarget);
            size = Math.max(16, size / 2);

        }

        this.camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0.0, 1000);

        this.shader = this.getShader();
        this.shader.defines['SAMPLES_PER_LEVEL'] = this.samplesPerLevel;
        this.planeMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2, 0), this.shader);
        this.planeMesh.material.side = THREE.DoubleSide;
        this.scene = new THREE.Scene();
        this.scene.add(this.planeMesh);
        this.scene.add(this.camera);

        this.shader.uniforms['envMap'].value = this.sourceTexture;
        this.shader.envMap = this.sourceTexture;

    }
    update(renderer) {

        this.shader.uniforms['envMap'].value = this.sourceTexture;
        this.shader.envMap = this.sourceTexture;

        var gammaInput = renderer.gammaInput;
        var gammaOutput = renderer.gammaOutput;
        var toneMapping = renderer.toneMapping;
        var toneMappingExposure = renderer.toneMappingExposure;
        var currentRenderTarget = renderer.getRenderTarget();

        renderer.toneMapping = THREE.LinearToneMapping;
        renderer.toneMappingExposure = 1.0;
        renderer.gammaInput = false;
        renderer.gammaOutput = false;

        for (var i = 0; i < this.numLods; i++) {

            var r = i / (this.numLods - 1);
            this.shader.uniforms['roughness'].value = r * 0.9; // see comment above, pragmatic choice
            this.shader.uniforms['queryScale'].value.x = (i == 0) ? - 1 : 1;
            var size = this.cubeLods[i].width;
            this.shader.uniforms['mapSize'].value = size;
            this.renderToCubeMapTarget(renderer, this.cubeLods[i]);

            if (i < 5) this.shader.uniforms['envMap'].value = this.cubeLods[i].texture;

        }

        renderer.setRenderTarget(currentRenderTarget);
        renderer.toneMapping = toneMapping;
        renderer.toneMappingExposure = toneMappingExposure;
        renderer.gammaInput = gammaInput;
        renderer.gammaOutput = gammaOutput;

    }
    renderToCubeMapTarget(renderer, renderTarget) {

        for (var i = 0; i < 6; i++) {

            this.renderToCubeMapTargetFace(renderer, renderTarget, i);

        }

    }
    renderToCubeMapTargetFace(renderer, renderTarget, faceIndex) {

        renderTarget.activeCubeFace = faceIndex;
        this.shader.uniforms['faceIndex'].value = faceIndex;
        renderer.render(this.scene, this.camera, renderTarget, true);

    }
    getShader() {

        var shaderMaterial = new THREE.ShaderMaterial({

            defines: {
                "SAMPLES_PER_LEVEL": 20,
            },

            uniforms: {
                "faceIndex": { value: 0 },
                "roughness": { value: 0.5 },
                "mapSize": { value: 0.5 },
                "envMap": { value: null },
                "queryScale": { value: new THREE.Vector3(1, 1, 1) },
                "testColor": { value: new THREE.Vector3(1, 1, 1) },
            },

            vertexShader:
                "varying vec2 vUv;\n\
				void main() {\n\
					vUv = uv;\n\
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\
				}",

            fragmentShader:
                "#include <common>\n\
				varying vec2 vUv;\n\
				uniform int faceIndex;\n\
				uniform float roughness;\n\
				uniform samplerCube envMap;\n\
				uniform float mapSize;\n\
				uniform vec3 testColor;\n\
				uniform vec3 queryScale;\n\
				\n\
				float GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\
					float a = ggxRoughness + 0.0001;\n\
					a *= a;\n\
					return ( 2.0 / a - 2.0 );\n\
				}\n\
				vec3 ImportanceSamplePhong(vec2 uv, mat3 vecSpace, float specPow) {\n\
					float phi = uv.y * 2.0 * PI;\n\
					float cosTheta = pow(1.0 - uv.x, 1.0 / (specPow + 1.0));\n\
					float sinTheta = sqrt(1.0 - cosTheta * cosTheta);\n\
					vec3 sampleDir = vec3(cos(phi) * sinTheta, sin(phi) * sinTheta, cosTheta);\n\
					return vecSpace * sampleDir;\n\
				}\n\
				vec3 ImportanceSampleGGX( vec2 uv, mat3 vecSpace, float Roughness )\n\
				{\n\
					float a = Roughness * Roughness;\n\
					float Phi = 2.0 * PI * uv.x;\n\
					float CosTheta = sqrt( (1.0 - uv.y) / ( 1.0 + (a*a - 1.0) * uv.y ) );\n\
					float SinTheta = sqrt( 1.0 - CosTheta * CosTheta );\n\
					return vecSpace * vec3(SinTheta * cos( Phi ), SinTheta * sin( Phi ), CosTheta);\n\
				}\n\
				mat3 matrixFromVector(vec3 n) {\n\
					float a = 1.0 / (1.0 + n.z);\n\
					float b = -n.x * n.y * a;\n\
					vec3 b1 = vec3(1.0 - n.x * n.x * a, b, -n.x);\n\
					vec3 b2 = vec3(b, 1.0 - n.y * n.y * a, -n.y);\n\
					return mat3(b1, b2, n);\n\
				}\n\
				\n\
				vec4 testColorMap(float Roughness) {\n\
					vec4 color;\n\
					if(faceIndex == 0)\n\
						color = vec4(1.0,0.0,0.0,1.0);\n\
					else if(faceIndex == 1)\n\
						color = vec4(0.0,1.0,0.0,1.0);\n\
					else if(faceIndex == 2)\n\
						color = vec4(0.0,0.0,1.0,1.0);\n\
					else if(faceIndex == 3)\n\
						color = vec4(1.0,1.0,0.0,1.0);\n\
					else if(faceIndex == 4)\n\
						color = vec4(0.0,1.0,1.0,1.0);\n\
					else\n\
						color = vec4(1.0,0.0,1.0,1.0);\n\
					color *= ( 1.0 - Roughness );\n\
					return color;\n\
				}\n\
				void main() {\n\
					vec3 sampleDirection;\n\
					vec2 uv = vUv*2.0 - 1.0;\n\
					float offset = -1.0/mapSize;\n\
					const float a = -1.0;\n\
					const float b = 1.0;\n\
					float c = -1.0 + offset;\n\
					float d = 1.0 - offset;\n\
					float bminusa = b - a;\n\
					uv.x = (uv.x - a)/bminusa * d - (uv.x - b)/bminusa * c;\n\
					uv.y = (uv.y - a)/bminusa * d - (uv.y - b)/bminusa * c;\n\
					if (faceIndex==0) {\n\
						sampleDirection = vec3(1.0, -uv.y, -uv.x);\n\
					} else if (faceIndex==1) {\n\
						sampleDirection = vec3(-1.0, -uv.y, uv.x);\n\
					} else if (faceIndex==2) {\n\
						sampleDirection = vec3(uv.x, 1.0, uv.y);\n\
					} else if (faceIndex==3) {\n\
						sampleDirection = vec3(uv.x, -1.0, -uv.y);\n\
					} else if (faceIndex==4) {\n\
						sampleDirection = vec3(uv.x, -uv.y, 1.0);\n\
					} else {\n\
						sampleDirection = vec3(-uv.x, -uv.y, -1.0);\n\
					}\n\
					mat3 vecSpace = matrixFromVector(normalize(sampleDirection * queryScale));\n\
					vec3 rgbColor = vec3(0.0);\n\
					const int NumSamples = SAMPLES_PER_LEVEL;\n\
					vec3 vect;\n\
					float weight = 0.0;\n\
					for( int i = 0; i < NumSamples; i ++ ) {\n\
						float sini = sin(float(i));\n\
						float cosi = cos(float(i));\n\
						float r = rand(vec2(sini, cosi));\n\
						vect = ImportanceSampleGGX(vec2(float(i) / float(NumSamples), r), vecSpace, roughness);\n\
						float dotProd = dot(vect, normalize(sampleDirection));\n\
						weight += dotProd;\n\
						vec3 color = envMapTexelToLinear(textureCube(envMap,vect)).rgb;\n\
						rgbColor.rgb += color;\n\
					}\n\
					rgbColor /= float(NumSamples);\n\
					//rgbColor = testColorMap( roughness ).rgb;\n\
					gl_FragColor = linearToOutputTexel( vec4( rgbColor, 1.0 ) );\n\
				}",

            blending: THREE.NoBlending

        });

        shaderMaterial.type = 'PMREMGenerator';

        return shaderMaterial;

    }
    dispose() {

        for (var i = 0, l = this.cubeLods.length; i < l; i++) {

            this.cubeLods[i].dispose();

        }

        this.planeMesh.geometry.dispose();
        this.planeMesh.material.dispose();

    }
}
class PMREMCubeUVPacker {
    constructor(cubeTextureLods) {

        this.cubeLods = cubeTextureLods;
        var size = cubeTextureLods[0].width * 4;

        var sourceTexture = cubeTextureLods[0].texture;
        var params = {
            format: sourceTexture.format,
            magFilter: sourceTexture.magFilter,
            minFilter: sourceTexture.minFilter,
            type: sourceTexture.type,
            generateMipmaps: sourceTexture.generateMipmaps,
            anisotropy: sourceTexture.anisotropy,
            encoding: (sourceTexture.encoding === THREE.RGBEEncoding) ? THREE.RGBM16Encoding : sourceTexture.encoding
        };

        if (params.encoding === THREE.RGBM16Encoding) {

            params.magFilter = THREE.LinearFilter;
            params.minFilter = THREE.LinearFilter;

        }

        this.CubeUVRenderTarget = new THREE.WebGLRenderTarget(size, size, params);
        this.CubeUVRenderTarget.texture.name = "PMREMCubeUVPacker.cubeUv";
        this.CubeUVRenderTarget.texture.mapping = THREE.CubeUVReflectionMapping;
        this.camera = new THREE.OrthographicCamera(- size * 0.5, size * 0.5, - size * 0.5, size * 0.5, 0, 1); // top and bottom are swapped for some reason?

        this.scene = new THREE.Scene();

        this.objects = [];

        var geometry = new THREE.PlaneBufferGeometry(1, 1);

        var faceOffsets = [];
        faceOffsets.push(new THREE.Vector2(0, 0));
        faceOffsets.push(new THREE.Vector2(1, 0));
        faceOffsets.push(new THREE.Vector2(2, 0));
        faceOffsets.push(new THREE.Vector2(0, 1));
        faceOffsets.push(new THREE.Vector2(1, 1));
        faceOffsets.push(new THREE.Vector2(2, 1));

        var textureResolution = size;
        size = cubeTextureLods[0].width;

        var offset2 = 0;
        var c = 4.0;
        this.numLods = Math.log(cubeTextureLods[0].width) / Math.log(2) - 2; // IE11 doesn't support Math.log2
        for (var i = 0; i < this.numLods; i++) {

            var offset1 = (textureResolution - textureResolution / c) * 0.5;
            if (size > 16) c *= 2;
            var nMips = size > 16 ? 6 : 1;
            var mipOffsetX = 0;
            var mipOffsetY = 0;
            var mipSize = size;

            for (var j = 0; j < nMips; j++) {

                // Mip Maps
                for (var k = 0; k < 6; k++) {

                    // 6 Cube Faces
                    var material = this.getShader();
                    material.uniforms['envMap'].value = this.cubeLods[i].texture;
                    material.envMap = this.cubeLods[i].texture;
                    material.uniforms['faceIndex'].value = k;
                    material.uniforms['mapSize'].value = mipSize;

                    var planeMesh = new THREE.Mesh(geometry, material);
                    planeMesh.position.x = faceOffsets[k].x * mipSize - offset1 + mipOffsetX;
                    planeMesh.position.y = faceOffsets[k].y * mipSize - offset1 + offset2 + mipOffsetY;
                    planeMesh.material.side = THREE.BackSide;
                    planeMesh.scale.setScalar(mipSize);
                    this.scene.add(planeMesh);
                    this.objects.push(planeMesh);

                }
                mipOffsetY += 1.75 * mipSize;
                mipOffsetX += 1.25 * mipSize;
                mipSize /= 2;

            }
            offset2 += 2 * size;
            if (size > 16) size /= 2;

        }

    }
    update(renderer) {

        var gammaInput = renderer.gammaInput;
        var gammaOutput = renderer.gammaOutput;
        var toneMapping = renderer.toneMapping;
        var toneMappingExposure = renderer.toneMappingExposure;
        var currentRenderTarget = renderer.getRenderTarget();

        renderer.gammaInput = false;
        renderer.gammaOutput = false;
        renderer.toneMapping = THREE.LinearToneMapping;
        renderer.toneMappingExposure = 1.0;
        renderer.render(this.scene, this.camera, this.CubeUVRenderTarget, false);

        renderer.setRenderTarget(currentRenderTarget);
        renderer.toneMapping = toneMapping;
        renderer.toneMappingExposure = toneMappingExposure;
        renderer.gammaInput = gammaInput;
        renderer.gammaOutput = gammaOutput;

    }
    getShader() {

        var shaderMaterial = new THREE.ShaderMaterial({

            uniforms: {
                "faceIndex": { value: 0 },
                "mapSize": { value: 0 },
                "envMap": { value: null },
                "testColor": { value: new THREE.Vector3(1, 1, 1) }
            },

            vertexShader:
                "precision highp float;\
				varying vec2 vUv;\
				void main() {\
					vUv = uv;\
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\
				}",

            fragmentShader:
                "precision highp float;\
				varying vec2 vUv;\
				uniform samplerCube envMap;\
				uniform float mapSize;\
				uniform vec3 testColor;\
				uniform int faceIndex;\
				\
				void main() {\
					vec3 sampleDirection;\
					vec2 uv = vUv;\
					uv = uv * 2.0 - 1.0;\
					uv.y *= -1.0;\
					if(faceIndex == 0) {\
						sampleDirection = normalize(vec3(1.0, uv.y, -uv.x));\
					} else if(faceIndex == 1) {\
						sampleDirection = normalize(vec3(uv.x, 1.0, uv.y));\
					} else if(faceIndex == 2) {\
						sampleDirection = normalize(vec3(uv.x, uv.y, 1.0));\
					} else if(faceIndex == 3) {\
						sampleDirection = normalize(vec3(-1.0, uv.y, uv.x));\
					} else if(faceIndex == 4) {\
						sampleDirection = normalize(vec3(uv.x, -1.0, -uv.y));\
					} else {\
						sampleDirection = normalize(vec3(-uv.x, uv.y, -1.0));\
					}\
					vec4 color = envMapTexelToLinear( textureCube( envMap, sampleDirection ) );\
					gl_FragColor = linearToOutputTexel( color );\
				}",

            blending: THREE.NoBlending

        });

        shaderMaterial.type = 'PMREMCubeUVPacker';

        return shaderMaterial;

    }
    dispose() {

        for (var i = 0, l = this.objects.length; i < l; i++) {

            this.objects[i].material.dispose();

        }

        this.objects[0].geometry.dispose();

    }
}

export {
    EffectComposer, RenderPass, LayerRenderPass, UnrealBloomPass,
    PMREMGenerator, PMREMCubeUVPacker
};