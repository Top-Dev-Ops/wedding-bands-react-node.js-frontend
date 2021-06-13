/* eslint-disable no-unused-expressions */
import * as THREE from 'three';
import { ColorUtils, ColorTransform } from "./color.js"

// const lights_pars_begin = "uniform vec3 ambientLightColor;\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n    vec3 irradiance = ambientLightColor;\n  #ifndef PHYSICALLY_CORRECT_LIGHTS\n     irradiance *= PI;\n #endif\n    return irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n struct DirectionalLight {\n     vec3 direction;\n       vec3 color;\n       int shadow;\n       float shadowBias;\n     float shadowRadius;\n       vec2 shadowMapSize;\n   };\n    uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n void getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n       directLight.color = directionalLight.color;\n       directLight.direction = directionalLight.direction;\n       directLight.visible = true;\n   }\n#endif\n#if NUM_POINT_LIGHTS > 0\n   struct PointLight {\n       vec3 position;\n        vec3 color;\n       float distance;\n       float decay;\n      int shadow;\n       float shadowBias;\n     float shadowRadius;\n       vec2 shadowMapSize;\n       float shadowCameraNear;\n       float shadowCameraFar;\n    };\n    uniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n   void getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n     vec3 lVector = pointLight.position - geometry.position;\n       directLight.direction = normalize( lVector );\n     float lightDistance = length( lVector );\n      directLight.color = pointLight.color;\n     directLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n        directLight.visible = ( directLight.color != vec3( 0.0 ) );\n   }\n#endif\n#if NUM_SPOT_LIGHTS > 0\n    struct SpotLight {\n        vec3 position;\n        vec3 direction;\n       vec3 color;\n       float distance;\n       float decay;\n      float coneCos;\n        float penumbraCos;\n        int shadow;\n       float shadowBias;\n     float shadowRadius;\n       vec2 shadowMapSize;\n   };\n    uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n  void getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n       vec3 lVector = spotLight.position - geometry.position;\n        directLight.direction = normalize( lVector );\n     float lightDistance = length( lVector );\n      float angleCos = dot( directLight.direction, spotLight.direction );\n       if ( angleCos > spotLight.coneCos ) {\n         float spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n          directLight.color = spotLight.color;\n          directLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n         directLight.visible = true;\n       } else {\n          directLight.color = vec3( 0.0 );\n          directLight.visible = false;\n      }\n }\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n   struct RectAreaLight {\n        vec3 color;\n       vec3 position;\n        vec3 halfWidth;\n       vec3 halfHeight;\n  };\n    uniform sampler2D ltc_1;    uniform sampler2D ltc_2;\n  uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n    struct HemisphereLight {\n      vec3 direction;\n       vec3 skyColor;\n        vec3 groundColor;\n };\n    uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n  vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n     float dotNL = dot( geometry.normal, hemiLight.direction );\n        float hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n      vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n        #ifndef PHYSICALLY_CORRECT_LIGHTS\n         irradiance *= PI;\n     #endif\n        return irradiance;\n    }\n#endif\n";
// const kkk = "#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_textureSize (1024.0)\n#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)\n#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))\n#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)\n#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)\n#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)\nvec4 textureCubeUV(vec3 reflectedDirection, float roughness ) {\n   float roughnessVal = roughness* cubeUV_maxLods3;\n  float r1 = floor(roughnessVal);\n   float r2 = r1 + 1.0;\n  float t = fract(roughnessVal);\n    vec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);\n   float s = mipInfo.y;\n  float level0 = mipInfo.x;\n float level1 = level0 + 1.0;\n  level1 = level1 > 5.0 ? 5.0 : level1;\n level0 += min( floor( s + 0.5 ), 5.0 );\n   vec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);\n   vec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));\n vec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);\n   vec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));\n vec4 result = mix(color10, color20, t);\n   return vec4(result.rgb, 1.0);\n}\n#endif\n";
// const lights_pars_maps = "#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n    vec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n        vec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n      #ifdef ENVMAP_TYPE_CUBE\n           vec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n           #ifdef TEXTURE_LOD_EXT\n                vec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n           #else\n             vec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n         #endif\n            envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n     #elif defined( ENVMAP_TYPE_CUBE_UV )\n          vec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n           vec4 envMapColor = textureCubeUV( queryVec, 1.0 );\n        #else\n         vec4 envMapColor = vec4( 0.0 );\n       #endif\n        return PI * envMapColor.rgb * envMapIntensity;\n    }\n float getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n        float maxMIPLevelScalar = float( maxMIPLevel );\n       float desiredMIPLevel = maxMIPLevelScalar + 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n     return clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n  }\n vec3 getLightProbeIndirectRadiance( const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n       #ifdef ENVMAP_MODE_REFLECTION\n         vec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n      #else\n         vec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n     #endif\n        reflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n     float specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n      #ifdef ENVMAP_TYPE_CUBE\n           vec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n          #ifdef TEXTURE_LOD_EXT\n                vec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n            #else\n             vec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n          #endif\n            envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n     #elif defined( ENVMAP_TYPE_CUBE_UV )\n          vec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n          vec4 envMapColor = textureCubeUV(queryReflectVec, BlinnExponentToGGXRoughness(blinnShininessExponent));\n       #elif defined( ENVMAP_TYPE_EQUIREC )\n          vec2 sampleUV;\n            sampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n         sampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n           #ifdef TEXTURE_LOD_EXT\n                vec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n         #else\n             vec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n           #endif\n            envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n     #elif defined( ENVMAP_TYPE_SPHERE )\n           vec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n           #ifdef TEXTURE_LOD_EXT\n                vec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n           #else\n             vec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n         #endif\n            envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n     #endif\n        return envMapColor.rgb * envMapIntensity;\n }\n#endif\n";

// diamondcomplex_bottom_frag.glsl
const diamondcomplex_bottom_frag = "precision highp float;precision highp int;uniform sampler2D sphereMap;uniform sampler2D triangles;uniform sampler2D gradient;varying vec2 a;varying vec4 b;varying vec3 c[3];varying vec4 d[3];void main(){vec4 u=texture2D(triangles,d[0].xy)+texture2D(triangles,d[0].zw);vec4 v=texture2D(triangles,d[1].xy)+texture2D(triangles,d[1].zw);vec4 w=texture2D(triangles,d[2].xy)+texture2D(triangles,d[2].zw);vec4 x=texture2D(sphereMap,a);v.xy*=c[0].xy;w.xyz*=c[1];w.xyz*=c[2].y;vec4 y=(u+v+w);\n#ifdef USE_GRADIENT\r\n#ifndef COLORIZE_ALL\r\ny=texture2D(gradient,vec2(0,clamp(1.0-y.r,0.0,1.0)));\n#endif\r\n#endif\r\nvec4 z=(b*0.8)+x+y;\n#ifdef USE_GRADIENT\r\n#ifdef COLORIZE_ALL\r\nz=texture2D(gradient,vec2(0,clamp(1.0-z.r,0.0,1.0)));\n#endif\r\n#endif\r\ngl_FragColor=z;}";
// diamondcomplex_bottom_vert.glsl
const diamondcomplex_bottom_vert = "precision highp int;precision highp float;uniform mat4 modelMatrix;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;uniform mat4 viewMatrix;uniform mat3 normalMatrix;uniform vec3 cameraPosition;uniform float triangleScale;attribute vec3 position;attribute vec3 normal;attribute vec2 uv;varying vec2 a;varying vec4 b;varying vec3 c[3];varying vec4 d[3];void main(){vec3 e=-normalize(normalMatrix*normal);vec3 f=normalize((vec4(e,0.0)*viewMatrix).xyz);vec4 g=modelMatrix*vec4(position,1.0);vec4 h=modelViewMatrix*vec4(position,1.0);vec2 i=(vec2(h.x,-h.y)/h.w)*0.5+0.5;vec3 j=normalize(g.xyz-cameraPosition);vec3 k=reflect(j,f);vec3 l=normalize((viewMatrix*vec4(k,0.0)).xyz+vec3(0.0,0.0,1.0));a=l.xy*0.5+0.5;float m=dot(vec3(0.0,0.5,1.0),-f)*0.9;b=clamp(m*vec4(0.90,0.95,1.0,1.0),0.0,1.0);k=abs(k);vec2 n=i*2.0;vec2 o=n-k.zy*1.8+k.zx*1.2;o*=triangleScale;vec2 p=vec2(cos(k.x*2.0)*1.5,cos(k.z*1.1));vec2 q=n-k.yx*3.1+k.xz*1.1;q*=triangleScale;vec2 r=vec2(sin(k.y*2.5),sin(k.z*2.0)*1.3);const vec2 s=vec2(0.5,1.0);const vec2 t=vec2(1.0,0.5);d[0].xy=(o*0.1+p)*s;d[0].zw=(q*0.1+r)*t;d[1].xy=(o*0.2+p)*s;d[1].zw=(q*0.2+r)*t;d[2].xy=(o*0.3+p)*s;d[2].zw=(q*0.3+r)*t;c[0]=clamp(k,0.90,1.0);c[1]=clamp(k,0.75,1.0);c[2]=clamp(k,0.7,1.0);gl_Position=projectionMatrix*h;}";
// diamondcomplex_sparkle_frag.glsl
const diamondcomplex_sparkle_frag = "precision lowp float;precision lowp int;uniform mat4 viewMatrix;uniform vec3 cameraPosition;uniform sampler2D sphereMap;varying vec2 a;varying vec2 b;vec3 j(vec3 k,float j){return ((k-0.5)*j)+0.5;}void main(){vec4 l=texture2D(sphereMap,b);l.xyz=j(l.xyz,1.8);gl_FragColor=l;gl_FragColor.w=1.0;}";
// diamondcomplex_sparkle_vert.glsl
const diamondcomplex_sparkle_vert = "precision lowp float;precision lowp int;uniform mat4 modelMatrix;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;uniform mat4 viewMatrix;uniform mat3 normalMatrix;uniform vec3 cameraPosition;attribute vec3 position;attribute vec3 normal;attribute vec2 uv;varying vec2 a;varying vec2 b;void main(){a=uv;vec3 c=normalize(normalMatrix*normal);vec3 d=normalize((vec4(c,0.0)*viewMatrix).xyz);vec4 e=modelMatrix*vec4(position,1.0);vec4 f=modelViewMatrix*vec4(position,1.0);vec3 g=normalize(e.xyz-cameraPosition);vec3 h=reflect(g,d);vec3 i=normalize((viewMatrix*vec4(h,0.0)).xyz+vec3(0.0,0.0,1.0));b=i.xy*0.5+0.5;gl_Position=projectionMatrix*f;}";
// diamondcomplex_top_frag.glsl
const diamondcomplex_top_frag = "precision highp int;precision highp float;uniform mat4 viewMatrix;uniform vec3 cameraPosition;uniform sampler2D highlightMap;uniform sampler2D sparkleMap;uniform sampler2D triangles;uniform sampler2D fire;uniform sampler2D gradient;varying vec2 a;varying vec2 b;varying vec4 c;varying vec3 d[2];varying vec4 f[3];varying vec2 e;vec3 x(vec3 y,float x){return ((y-0.5)*x)+0.5;}vec4 z(vec4 A,vec4 B){return vec4(A*A.w)+vec4(B*(1.0-A.w));}void main(){const vec3 C=vec3(0.333333333,0.333333333,0.333333333);vec4 D=texture2D(highlightMap,b);vec4 E=texture2D(sparkleMap,b);vec4 F=texture2D(fire,a);vec4 G=texture2D(triangles,f[0].xy)+texture2D(triangles,f[0].zw);vec4 H=texture2D(triangles,f[1].xy)+texture2D(triangles,f[1].zw);vec4 I=texture2D(triangles,f[2].xy)+texture2D(triangles,f[2].zw);vec2 J=clamp(e,0.0,1.0);D.xyz=x(D.xyz,1.8);D.xyz*=d[0];E.xyz=x(E.xyz,1.5);E.xyz*=d[0];I.xyz*=d[1];vec4 K=G+H;K.xyz*=clamp(K.xyz,0.0,0.8);K+=I;K.w=dot(K.xyz,C);vec4 L=texture2D(fire,J);L.w=dot(L.xyz,C);vec4 M=D+E;M.w=dot(M.xyz,C);M.w=clamp(M.w,0.0,0.8);vec4 N=z(M,K);N=z(L,N);\n#ifdef USE_GRADIENT\r\n#ifdef COLORIZE_ALL\r\nN=texture2D(gradient,vec2(0,clamp(1.0-N.r,0.0,1.0)));\n#endif\r\n#endif\r\ngl_FragColor=N;}";
// diamondcomplex_top_vert.glsl
const diamondcomplex_top_vert = "precision highp int;precision highp float;uniform mat4 modelMatrix;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;uniform mat4 viewMatrix;uniform mat3 normalMatrix;uniform vec3 cameraPosition;uniform float triangleScale;attribute vec3 position;attribute vec3 normal;attribute vec2 uv;varying vec2 a;varying vec2 b;varying vec4 c;varying vec3 d[2];varying vec2 e;varying vec4 f[3];void main(){a=uv;vec3 g=normalize(normalMatrix*normal);vec3 h=normalize((vec4(g,0.0)*viewMatrix).xyz);vec4 i=modelMatrix*vec4(position,1.0);vec4 j=modelViewMatrix*vec4(position,1.0);vec2 k=(vec2(j.x,-j.y)/j.w)*0.5+0.5;vec3 l=normalize(i.xyz-cameraPosition);vec3 m=reflect(l,h);vec3 n=normalize((viewMatrix*vec4(m,0.0)).xyz+vec3(0.0,0.0,1.0));b=n.xy*0.5+0.5;float o=dot(vec3(0.0,0.5,1.0),h)*0.9;c=clamp(o*vec4(0.90,0.95,1.0,1.0),0.0,1.0);m=abs(m);vec3 p=(modelMatrix*vec4(l,1.0)).xyz;vec2 q=k*2.0;vec2 r=q-m.zy*1.8;r*=triangleScale;vec2 s=vec2(cos(p.y*0.4+m.x)*0.5,cos(p.x*0.5+m.z));vec2 t=q-m.yx*3.1+m.xz*1.1;t*=triangleScale;vec2 u=vec2(sin(p.z*0.3-m.y),sin(p.x*0.4-m.z)*0.6);const vec2 v=vec2(1.5,1.0);const vec2 w=vec2(1.0,1.5);f[0].xy=(r*0.15+s)*v;f[0].zw=(t*0.15+u)*w;f[1].xy=(r*0.25+s)*v;f[1].zw=(t*0.25+u)*w;f[2].xy=(r*0.45+s)*v;f[2].zw=(t*0.45+u)*w;d[0]=clamp(m.xzy,0.9,1.0);d[1]=clamp(m.xyz,0.8,1.0)*m.z;e=(q+uv)*1.5;e+=s*1.5;e.y*=q.y;gl_Position=projectionMatrix*j;}";
// meshphysical_frag.glsl
//0.98 const meshphysical_frag = "#define PHYSICAL\r\n\r\nuniform vec3 diffuse;\r\nuniform vec3 emissive;\r\nuniform float roughness;\r\nuniform float metalness;\r\nuniform float opacity;\r\n\r\n#ifdef USE_GRADIENT\r\n    uniform sampler2D gradientMap;\r\n#endif\r\n\r\n#ifdef USE_SPHEREMAP\r\n     uniform sampler2D sphereMap;\r\n     varying vec3 eyeSpheremap;\r\n#endif\r\n\r\n#ifdef USE_COLOR_TRANSFORM\r\n    uniform vec4 colorTransformMultiplier;\r\n    uniform vec4 colorTransformOffset;\r\n#endif\r\n\r\n#ifdef USE_AOMAP\r\n    uniform sampler2D aoMap;\r\n    uniform float aoMapIntensity;\r\n#endif\r\n\r\n#ifndef STANDARD\r\n uniform float clearCoat;\r\n    uniform float clearCoatRoughness;\r\n#endif\r\n\r\nvarying vec3 vViewPosition;\r\n\r\n#ifndef FLAT_SHADED\r\n\r\n   varying vec3 vNormal;\r\n\r\n#endif\r\n\r\n#include <common>\r\n#include <packing>\r\n#include <dithering_pars_fragment>\r\n#include <color_pars_fragment>\r\n#include <uv_pars_fragment>\r\n#include <uv2_pars_fragment>\r\n#include <map_pars_fragment>\r\n#include <alphamap_pars_fragment>\r\n#include <lightmap_pars_fragment>\r\n#include <emissivemap_pars_fragment>\r\n#include <envmap_pars_fragment>\r\n#include <fog_pars_fragment>\r\n#include <bsdfs>\r\n#include <cube_uv_reflection_fragment>\r\n#include <lights_pars_begin>\r\n" + kkk + lights_pars_maps /*"#include <lights_pars_maps>"*/ + "\r\n#include <lights_physical_pars_fragment>\r\n#include <shadowmap_pars_fragment>\r\n#include <bumpmap_pars_fragment>\r\n#include <normalmap_pars_fragment>\r\n#include <roughnessmap_pars_fragment>\r\n#include <metalnessmap_pars_fragment>\r\n#include <logdepthbuf_pars_fragment>\r\n#include <clipping_planes_pars_fragment>\r\n\r\nvoid main() {\r\n\r\n  #include <clipping_planes_fragment>\r\n\r\n vec4 diffuseColor = vec4( diffuse, opacity );\r\n   ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\r\n   vec3 totalEmissiveRadiance = emissive;\r\n\r\n  #include <logdepthbuf_fragment>\r\n #include <map_fragment>\r\n #include <color_fragment>\r\n   #include <alphamap_fragment>\r\n    #include <alphatest_fragment>\r\n   #include <roughnessmap_fragment>\r\n    #include <metalnessmap_fragment>\r\n    #include <normal_fragment_begin>\r\n    #include <normal_fragment_maps>\r\n #include <emissivemap_fragment>\r\n\r\n // accumulation\r\n #include <lights_physical_fragment>\r\n #include <lights_fragment_begin>\r\n    #include <lights_fragment_maps>\r\n #include <lights_fragment_end>\r\n\r\n    // modulation\r\n    #ifdef USE_AOMAP\r\n\r\n     float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\r\n\r\n       reflectedLight.indirectDiffuse *= ambientOcclusion;\r\n\r\n     #if defined( USE_ENVMAP ) && defined( PHYSICAL )\r\n\r\n            float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\r\n\r\n         reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\r\n\r\n     #endif\r\n\r\n    #endif\r\n\r\n    vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\r\n\r\n   gl_FragColor = vec4( outgoingLight, diffuseColor.a );\r\n\r\n\r\n   #ifdef USE_COLOR_TRANSFORM\r\n      gl_FragColor.rgba = ( gl_FragColor.rgba * colorTransformMultiplier ) + colorTransformOffset;\r\n        gl_FragColor.rgba = clamp( gl_FragColor.rgba, vec4(0.0, 0.0, 0.0, 0.0),  vec4(1.0, 1.0, 1.0, 1.0));\r\n #endif\r\n\r\n    #ifdef USE_GRADIENT\r\n        gl_FragColor.rgb = texture2D(gradientMap, vec2( 0, clamp(1.0-gl_FragColor.r, 0.0, 1.0))).rgb;\r\n    #endif\r\n\r\n    #ifdef USE_SPHEREMAP\r\n       vec3 reflectionSpheremap = reflect( eyeSpheremap, normal );\r\n       float m = 2. * sqrt( pow( reflectionSpheremap.x, 2.0 ) + pow( reflectionSpheremap.y, 2.0 ) + pow( reflectionSpheremap.z + 1.0, 2.0 ) );\r\n       vec2 vN = reflectionSpheremap.xy / m + 0.5;\r\n       vec3 sphereColor = texture2D( sphereMap, vN ).rgb;\r\n\r\n       gl_FragColor.r = sphereColor.r < 0.5 ? max(gl_FragColor.r + (2.0 * sphereColor.r) - 1.0, 0.0) : min(gl_FragColor.r + (2.0 * (sphereColor.r - 0.5)), 1.0);\r\n       gl_FragColor.g = sphereColor.g < 0.5 ? max(gl_FragColor.g + (2.0 * sphereColor.g) - 1.0, 0.0) : min(gl_FragColor.g + (2.0 * (sphereColor.g - 0.5)), 1.0);\r\n       gl_FragColor.b = sphereColor.b < 0.5 ? max(gl_FragColor.b + (2.0 * sphereColor.b) - 1.0, 0.0) : min(gl_FragColor.b + (2.0 * (sphereColor.b - 0.5)), 1.0);\r\n    #endif\r\n\r\n   #include <tonemapping_fragment>\r\n #include <encodings_fragment>\r\n   #include <fog_fragment>\r\n #include <premultiplied_alpha_fragment>\r\n    #include <dithering_fragment>\r\n}\r\n";
const meshphysical_frag = "#define PHYSICAL\r\n\r\nuniform vec3 diffuse;\r\nuniform vec3 emissive;\r\nuniform float roughness;\r\nuniform float metalness;\r\nuniform float opacity;\r\n\r\n#ifdef USE_GRADIENT\r\n    uniform sampler2D gradientMap;\r\n#endif\r\n\r\n#ifdef USE_SPHEREMAP\r\n     uniform sampler2D sphereMap;\r\n     varying vec3 eyeSpheremap;\r\n#endif\r\n\r\n#ifdef USE_COLOR_TRANSFORM\r\n    uniform vec4 colorTransformMultiplier;\r\n    uniform vec4 colorTransformOffset;\r\n#endif\r\n\r\n#ifdef USE_AOMAP\r\n    uniform sampler2D aoMap;\r\n    uniform float aoMapIntensity;\r\n#endif\r\n\r\n#ifndef STANDARD\r\n uniform float clearCoat;\r\n    uniform float clearCoatRoughness;\r\n#endif\r\n\r\nvarying vec3 vViewPosition;\r\n\r\n#ifndef FLAT_SHADED\r\n\r\n   varying vec3 vNormal;\r\n\r\n#endif\r\n\r\n#include <common>\r\n#include <packing>\r\n#include <dithering_pars_fragment>\r\n#include <color_pars_fragment>\r\n#include <uv_pars_fragment>\r\n#include <uv2_pars_fragment>\r\n#include <map_pars_fragment>\r\n#include <alphamap_pars_fragment>\r\n#include <lightmap_pars_fragment>\r\n#include <emissivemap_pars_fragment>\r\n#include <envmap_pars_fragment>\r\n#include <fog_pars_fragment>\r\n#include <bsdfs>\r\n#include <cube_uv_reflection_fragment>\r\n#include <lights_pars_begin>\r\n#include <lights_pars_maps>\r\n#include <lights_physical_pars_fragment>\r\n#include <shadowmap_pars_fragment>\r\n#include <bumpmap_pars_fragment>\r\n#include <normalmap_pars_fragment>\r\n#include <roughnessmap_pars_fragment>\r\n#include <metalnessmap_pars_fragment>\r\n#include <logdepthbuf_pars_fragment>\r\n#include <clipping_planes_pars_fragment>\r\n\r\nvoid main() {\r\n\r\n  #include <clipping_planes_fragment>\r\n\r\n vec4 diffuseColor = vec4( diffuse, opacity );\r\n   ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\r\n   vec3 totalEmissiveRadiance = emissive;\r\n\r\n  #include <logdepthbuf_fragment>\r\n #include <map_fragment>\r\n #include <color_fragment>\r\n   #include <alphamap_fragment>\r\n    #include <alphatest_fragment>\r\n   #include <roughnessmap_fragment>\r\n    #include <metalnessmap_fragment>\r\n    #include <normal_fragment_begin>\r\n    #include <normal_fragment_maps>\r\n #include <emissivemap_fragment>\r\n\r\n // accumulation\r\n #include <lights_physical_fragment>\r\n #include <lights_fragment_begin>\r\n    #include <lights_fragment_maps>\r\n #include <lights_fragment_end>\r\n\r\n    // modulation\r\n    #ifdef USE_AOMAP\r\n\r\n     float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\r\n\r\n       reflectedLight.indirectDiffuse *= ambientOcclusion;\r\n\r\n     #if defined( USE_ENVMAP ) && defined( PHYSICAL )\r\n\r\n            float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\r\n\r\n         reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\r\n\r\n     #endif\r\n\r\n    #endif\r\n\r\n    vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\r\n\r\n   gl_FragColor = vec4( outgoingLight, diffuseColor.a );\r\n\r\n\r\n   #ifdef USE_COLOR_TRANSFORM\r\n      gl_FragColor.rgba = ( gl_FragColor.rgba * colorTransformMultiplier ) + colorTransformOffset;\r\n        gl_FragColor.rgba = clamp( gl_FragColor.rgba, vec4(0.0, 0.0, 0.0, 0.0),  vec4(1.0, 1.0, 1.0, 1.0));\r\n #endif\r\n\r\n    #ifdef USE_GRADIENT\r\n        gl_FragColor.rgb = texture2D(gradientMap, vec2( 0, clamp(1.0-gl_FragColor.r, 0.0, 1.0))).rgb;\r\n    #endif\r\n\r\n    #ifdef USE_SPHEREMAP\r\n       vec3 reflectionSpheremap = reflect( eyeSpheremap, normal );\r\n       float m = 2. * sqrt( pow( reflectionSpheremap.x, 2.0 ) + pow( reflectionSpheremap.y, 2.0 ) + pow( reflectionSpheremap.z + 1.0, 2.0 ) );\r\n       vec2 vN = reflectionSpheremap.xy / m + 0.5;\r\n       vec3 sphereColor = texture2D( sphereMap, vN ).rgb;\r\n\r\n       gl_FragColor.r = sphereColor.r < 0.5 ? max(gl_FragColor.r + (2.0 * sphereColor.r) - 1.0, 0.0) : min(gl_FragColor.r + (2.0 * (sphereColor.r - 0.5)), 1.0);\r\n       gl_FragColor.g = sphereColor.g < 0.5 ? max(gl_FragColor.g + (2.0 * sphereColor.g) - 1.0, 0.0) : min(gl_FragColor.g + (2.0 * (sphereColor.g - 0.5)), 1.0);\r\n       gl_FragColor.b = sphereColor.b < 0.5 ? max(gl_FragColor.b + (2.0 * sphereColor.b) - 1.0, 0.0) : min(gl_FragColor.b + (2.0 * (sphereColor.b - 0.5)), 1.0);\r\n    #endif\r\n\r\n   #include <tonemapping_fragment>\r\n #include <encodings_fragment>\r\n   #include <fog_fragment>\r\n #include <premultiplied_alpha_fragment>\r\n    #include <dithering_fragment>\r\n}\r\n";
// const meshphysical_frag = "#define PHYSICAL\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n\n#ifdef USE_GRADIENT\n    uniform sampler2D gradientMap;\n#endif\n\n#ifdef USE_SPHEREMAP\n     uniform sampler2D sphereMap;\n     varying vec3 eyeSpheremap;\n#endif\n\n#ifdef USE_COLOR_TRANSFORM\n    uniform vec4 colorTransformMultiplier;\n    uniform vec4 colorTransformOffset;\n#endif\n\n#ifdef USE_AOMAP\n    uniform sampler2D aoMap;\n    uniform float aoMapIntensity;\n#endif\n\n#ifndef STANDARD\n uniform float clearCoat;\n    uniform float clearCoatRoughness;\n#endif\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n   varying vec3 vNormal;\n\n#endif\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <lights_pars_begin>\n#include <lights_pars_maps>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n  #include <clipping_planes_fragment>\n\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.1 ), vec3( 0.1 ), vec3( 0.1 ), vec3( 0.1 ) );\n	vec3 totalEmissiveRadiance = emissive;\n\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <roughnessmap_fragment>\n	#include <metalnessmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n\n	// accumulation\n	#include <lights_physical_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n\n    // modulation\n    #ifdef USE_AOMAP\n\n     float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\n       reflectedLight.indirectDiffuse *= ambientOcclusion;\n\n     #if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\n            float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\n         reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\n     #endif\n	\n    #endif\n\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\n	gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\n   #ifdef USE_COLOR_TRANSFORM\n      gl_FragColor.rgba = ( gl_FragColor.rgba * colorTransformMultiplier ) + colorTransformOffset;\n        gl_FragColor.rgba = clamp( gl_FragColor.rgba, vec4(0.0, 0.0, 0.0, 0.0),  vec4(1.0, 1.0, 1.0, 1.0));\n #endif\n\n    #ifdef USE_GRADIENT\n        gl_FragColor.rgb = texture2D(gradientMap, vec2( 0, clamp(1.0-gl_FragColor.r, 0.0, 1.0))).rgb;\n    #endif\n\n    #ifdef USE_SPHEREMAP\n       vec3 reflectionSpheremap = reflect( eyeSpheremap, normal );\n       float m = 2. * sqrt( pow( reflectionSpheremap.x, 2.0 ) + pow( reflectionSpheremap.y, 2.0 ) + pow( reflectionSpheremap.z + 1.0, 2.0 ) );\n       vec2 vN = reflectionSpheremap.xy / m + 0.5;\n       vec3 sphereColor = texture2D( sphereMap, vN ).rgb;\n\n       gl_FragColor.r = sphereColor.r < 0.5 ? max(gl_FragColor.r + (2.0 * sphereColor.r) - 1.0, 0.0) : min(gl_FragColor.r + (2.0 * (sphereColor.r - 0.5)), 1.0);\n       gl_FragColor.g = sphereColor.g < 0.5 ? max(gl_FragColor.g + (2.0 * sphereColor.g) - 1.0, 0.0) : min(gl_FragColor.g + (2.0 * (sphereColor.g - 0.5)), 1.0);\n       gl_FragColor.b = sphereColor.b < 0.5 ? max(gl_FragColor.b + (2.0 * sphereColor.b) - 1.0, 0.0) : min(gl_FragColor.b + (2.0 * (sphereColor.b - 0.5)), 1.0);\n    #endif\n\n   #include <tonemapping_fragment>\n #include <encodings_fragment>\n   #include <fog_fragment>\n #include <premultiplied_alpha_fragment>\n    #include <dithering_fragment>\n}\n";
// meshphysical_vert.glsl
const meshphysical_vert = "#define PHYSICAL\r\n\r\nvarying vec3 vViewPosition;\r\n\r\n#ifdef USE_SPHEREMAP\r\n    varying vec3 eyeSpheremap;\r\n#endif\r\n\r\n#ifndef FLAT_SHADED\r\n\r\n    varying vec3 vNormal;\r\n\r\n#endif\r\n\r\n#include <common>\r\n#include <uv_pars_vertex>\r\n#include <uv2_pars_vertex>\r\n#include <displacementmap_pars_vertex>\r\n#include <color_pars_vertex>\r\n#include <fog_pars_vertex>\r\n#include <morphtarget_pars_vertex>\r\n#include <skinning_pars_vertex>\r\n#include <shadowmap_pars_vertex>\r\n#include <logdepthbuf_pars_vertex>\r\n#include <clipping_planes_pars_vertex>\r\n\r\nvoid main() {\r\n\r\n   #include <uv_vertex>\r\n    #include <uv2_vertex>\r\n   #include <color_vertex>\r\n\r\n #include <beginnormal_vertex>\r\n   #include <morphnormal_vertex>\r\n   #include <skinbase_vertex>\r\n  #include <skinnormal_vertex>\r\n    #include <defaultnormal_vertex>\r\n\r\n#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\r\n\r\n vNormal = normalize( transformedNormal );\r\n\r\n#endif\r\n\r\n #include <begin_vertex>\r\n #include <morphtarget_vertex>\r\n   #include <skinning_vertex>\r\n  #include <displacementmap_vertex>\r\n   #include <project_vertex>\r\n   #include <logdepthbuf_vertex>\r\n   #include <clipping_planes_vertex>\r\n\r\n   vViewPosition = - mvPosition.xyz;\r\n\r\n   #include <worldpos_vertex>\r\n  #include <shadowmap_vertex>\r\n #include <fog_vertex>\r\n\r\n   #ifdef USE_SPHEREMAP\r\n        eyeSpheremap = normalize( vec3( modelViewMatrix * vec4( position, 1.0 ) ) );\r\n    #endif\r\n\r\n}\r\n";
// meshsinglelevel_frag.glsl
const meshsinglelevel_frag = "uniform vec3 diffuse;\r\nuniform float opacity;\r\n\r\nvarying vec3 vViewPosition;\r\n\r\n#ifndef FLAT_SHADED\r\n varying vec3 vNormal;\r\n#endif\r\n\r\n#ifdef USE_GRADIENT\r\n    uniform sampler2D gradientMap;\r\n#endif\r\n\r\n#ifdef USE_SPHEREMAP\r\n     uniform sampler2D sphereMap;\r\n     varying vec3 eyeSpheremap;\r\n#endif\r\n\r\n#ifdef USE_COLOR_TRANSFORM\r\n    uniform vec4 colorTransformMultiplier;\r\n    uniform vec4 colorTransformOffset;\r\n#endif\r\n\r\n#include <common>\r\n#include <color_pars_fragment>\r\n#include <uv_pars_fragment>\r\n#include <uv2_pars_fragment>\r\n#include <map_pars_fragment>\r\n#include <alphamap_pars_fragment>\r\n#include <aomap_pars_fragment>\r\n#include <envmap_pars_fragment>\r\n#include <fog_pars_fragment>\r\n#include <bumpmap_pars_fragment>\r\n#include <normalmap_pars_fragment>\r\n#include <specularmap_pars_fragment>\r\n#include <logdepthbuf_pars_fragment>\r\n#include <clipping_planes_pars_fragment>\r\n\r\nvoid main() {\r\n\r\n #include <clipping_planes_fragment>\r\n\r\n vec4 diffuseColor = vec4( diffuse, opacity );\r\n\r\n   #include <logdepthbuf_fragment>\r\n #include <map_fragment>\r\n #include <color_fragment>\r\n   #include <alphamap_fragment>\r\n    #include <alphatest_fragment>\r\n   #include <specularmap_fragment>\r\n\r\n ReflectedLight reflectedLight;\r\n  reflectedLight.directDiffuse = vec3( 0.0 );\r\n reflectedLight.directSpecular = vec3( 0.0 );\r\n    reflectedLight.indirectDiffuse = diffuseColor.rgb;\r\n  reflectedLight.indirectSpecular = vec3( 0.0 );\r\n\r\n  #include <aomap_fragment>\r\n\r\n   vec3 outgoingLight = reflectedLight.indirectDiffuse;\r\n\r\n    #include <normal_fragment_begin>\r\n    #include <normal_fragment_maps>\r\n #include <envmap_fragment>\r\n\r\n  gl_FragColor = vec4( outgoingLight, diffuseColor.a );\r\n\r\n    #ifdef USE_COLOR_TRANSFORM\r\n     gl_FragColor.rgba = ( gl_FragColor.rgba * colorTransformMultiplier ) + colorTransformOffset;\r\n        gl_FragColor.rgba = clamp( gl_FragColor.rgba, vec4(0.0, 0.0, 0.0, 0.0),  vec4(1.0, 1.0, 1.0, 1.0));\r\n #endif\r\n\r\n    #ifdef USE_GRADIENT\r\n       gl_FragColor.rgb = texture2D(gradientMap, vec2( 0, clamp(1.0-gl_FragColor.r, 0.0, 1.0))).rgb;\r\n   #endif\r\n\r\n    #ifdef USE_SPHEREMAP\r\n       vec3 reflectionSpheremap = reflect( eyeSpheremap, normal );\r\n       float m = 2. * sqrt( pow( reflectionSpheremap.x, 2.0 ) + pow( reflectionSpheremap.y, 2.0 ) + pow( reflectionSpheremap.z + 1.0, 2.0 ) );\r\n       vec2 vN = reflectionSpheremap.xy / m + 0.5;\r\n       vec3 sphereColor = texture2D( sphereMap, vN ).rgb;\r\n\r\n        /*\r\n       gl_FragColor.r = sphereColor.r < 0.5 ? (2.0 * sphereColor.r * gl_FragColor.r) : (1.0 - 2.0 * (1.0 - sphereColor.r) * (1.0 - gl_FragColor.r));\r\n       gl_FragColor.g = sphereColor.g < 0.5 ? (2.0 * sphereColor.g * gl_FragColor.g) : (1.0 - 2.0 * (1.0 - sphereColor.g) * (1.0 - gl_FragColor.g));\r\n       gl_FragColor.b = sphereColor.b < 0.5 ? (2.0 * sphereColor.b * gl_FragColor.b) : (1.0 - 2.0 * (1.0 - sphereColor.b) * (1.0 - gl_FragColor.b));\r\n       */\r\n\r\n       gl_FragColor.r = sphereColor.r < 0.5 ? max(gl_FragColor.r + (2.0 * sphereColor.r) - 1.0, 0.0) : min(gl_FragColor.r + (2.0 * (sphereColor.r - 0.5)), 1.0);\r\n       gl_FragColor.g = sphereColor.g < 0.5 ? max(gl_FragColor.g + (2.0 * sphereColor.g) - 1.0, 0.0) : min(gl_FragColor.g + (2.0 * (sphereColor.g - 0.5)), 1.0);\r\n       gl_FragColor.b = sphereColor.b < 0.5 ? max(gl_FragColor.b + (2.0 * sphereColor.b) - 1.0, 0.0) : min(gl_FragColor.b + (2.0 * (sphereColor.b - 0.5)), 1.0);\r\n    #endif\r\n\r\n  #include <premultiplied_alpha_fragment>\r\n #include <tonemapping_fragment>\r\n #include <encodings_fragment>\r\n   #include <fog_fragment>\r\n\r\n}\r\n";
// meshsinglelevel_vert.glsl
const meshsinglelevel_vert = "\r\nvarying vec3 vViewPosition;\r\n\r\n#ifndef FLAT_SHADED\r\n    varying vec3 vNormal;\r\n#endif\r\n\r\n#ifdef USE_SPHEREMAP\r\n    varying vec3 eyeSpheremap;\r\n#endif\r\n\r\n#include <common>\r\n#include <uv_pars_vertex>\r\n#include <uv2_pars_vertex>\r\n#include <envmap_pars_vertex>\r\n#include <color_pars_vertex>\r\n#include <morphtarget_pars_vertex>\r\n#include <skinning_pars_vertex>\r\n#include <logdepthbuf_pars_vertex>\r\n#include <clipping_planes_pars_vertex>\r\n\r\nvoid main() {\r\n\r\n  #include <uv_vertex>\r\n    #include <uv2_vertex>\r\n   #include <color_vertex>\r\n #include <skinbase_vertex>\r\n\r\n  #ifdef USE_ENVMAP\r\n\r\n   #include <beginnormal_vertex>\r\n   #include <morphnormal_vertex>\r\n   #include <skinnormal_vertex>\r\n    #include <defaultnormal_vertex>\r\n\r\n #endif\r\n\r\n  #ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\r\n\r\n        vNormal = normalize( transformedNormal );\r\n\r\n    #endif\r\n\r\n #include <begin_vertex>\r\n #include <morphtarget_vertex>\r\n   #include <skinning_vertex>\r\n  #include <project_vertex>\r\n   #include <logdepthbuf_vertex>\r\n\r\n   #include <worldpos_vertex>\r\n  #include <clipping_planes_vertex>\r\n   #include <envmap_vertex>\r\n\r\n    vViewPosition = - mvPosition.xyz;\r\n\r\n    #ifdef USE_SPHEREMAP\r\n        eyeSpheremap = normalize( vec3( modelViewMatrix * vec4( position, 1.0 ) ) );\r\n    #endif\r\n}\r\n";

class DiamondComplexShaderMaterialBottom extends THREE.RawShaderMaterial {
    constructor() {
        super();
        this.colorizeAll = false,
            this.vertexShader = diamondcomplex_bottom_vert,
            this.fragmentShader = diamondcomplex_bottom_frag,
            this.uniforms = {
                sphereMap: { value: null },
                triangles: { value: null },
                gradient: { value: null },
                triangleScale: { value: 1 }
            }
    }
}
class DiamondComplexShaderMaterialTop extends THREE.RawShaderMaterial {
    constructor() {
        super();
        this.colorizeAll = false;
        this.vertexShader = diamondcomplex_top_vert;
        this.fragmentShader = diamondcomplex_top_frag;
        this.uniforms = {
            triangles: { value: null },
            triangleScale: { value: 1 },
            highlightMap: { value: null },
            sparkleMap: { value: null },
            gradient: { value: null },
            fire: { value: null }
        };
    }
}
class PhysicalShaderMaterial extends THREE.ShaderMaterial {
    constructor() {
        super();

        this.color = new THREE.Color(0xFFFFFF),
            this.roughness = .5,
            this.metalness = .5,
            this.maxMipLevel = 7,
            this.map = null,
            this.sphereMap = null,
            this.lightMap = null,
            this.lightMapIntensity = 1,
            this.aoMap = null,
            this.aoMapIntensity = 1,
            this.emissive = new THREE.Color(0),
            this.emissiveIntensity = 1,
            this.emissiveMap = null,
            this.bumpMap = null,
            this.bumpScale = 1,
            this.normalMap = null,
            this.normalScale = new THREE.Vector2(1, 1),
            this.displacementMap = null,
            this.displacementScale = 1,
            this.displacementBias = 0,
            this.roughnessMap = null,
            this.metalnessMap = null,
            this.alphaMap = null,
            this.envMap = null,
            this.envMapIntensity = 1,
            this.flipEnvMap = -1,
            this.gradientMap = null,
            this.refractionRatio = .98,
            this.colorTransform = null,
            this.wireframe = false,
            this.wireframeLinewidth = 1,
            this.wireframeLinecap = "round",
            this.wireframeLinejoin = "round",
            this.skinning = false,
            this.morphTargets = false,
            this.morphNormals = false,
            this.lights = true,
            this.fog = true,
            this.defines = { STANDARD: ""/*, USE_ENVMAP: "", ENVMAP_TYPE_CUBE_UV: ""*/ },
            this.vertexShader = meshphysical_vert,
            this.fragmentShader = meshphysical_frag,
            this.uniforms = THREE.UniformsUtils.merge([
                THREE.ShaderLib.standard.uniforms,
                {
                    gradientMap: { value: null },
                    sphereMap: { value: null }
                }
            ]);
        this.side = THREE.DoubleSide;
        this.lights = true;
    }
    updateProperties() {
        this.uniforms.opacity.value = this.opacity,
            this.uniforms.diffuse.value = this.color,
            this.uniforms.maxMipLevel.value = this.maxMipLevel,
            this.emissive && this.uniforms.emissive.value.copy(this.emissive).multiplyScalar(this.emissiveIntensity),
            this.uniforms.map.value = this.map,
            this.uniforms.alphaMap.value = this.alphaMap,
            this.aoMap && (this.uniforms.aoMap.value = this.aoMap,
                this.uniforms.aoMapIntensity.value = this.aoMapIntensity),
            this.uniforms.envMap.value = this.envMap,
            this.uniforms.flipEnvMap.value = this.flipEnvMap,
            this.uniforms.refractionRatio.value = this.refractionRatio,
            this.uniforms.roughness.value = this.roughness,
            this.uniforms.metalness.value = this.metalness,
            this.roughnessMap && (this.uniforms.roughnessMap.value = this.roughnessMap),
            this.metalnessMap && (this.uniforms.metalnessMap.value = this.metalnessMap),
            this.lightMap && (this.uniforms.lightMap.value = this.lightMap, this.uniforms.lightMapIntensity.value = this.lightMapIntensity),
            this.emissiveMap && (this.uniforms.emissiveMap.value = this.emissiveMap),
            this.bumpMap && (this.uniforms.bumpMap.value = this.bumpMap, this.uniforms.bumpScale.value = this.bumpScale),
            this.normalMap && (this.uniforms.normalMap.value = this.normalMap, this.uniforms.normalScale.value.copy(this.normalScale)),
            this.displacementMap && (this.uniforms.displacementMap.value = this.displacementMap, this.uniforms.displacementScale.value = this.displacementScale, this.uniforms.displacementBias.value = this.displacementBias),
            this.envMap && (this.uniforms.envMapIntensity.value = this.envMapIntensity),
            this.sphereMap && (this.defines.USE_SPHEREMAP = "", this.uniforms.sphereMap.value = this.sphereMap),
            this.gradientMap && (this.defines.USE_GRADIENT = "", this.uniforms.gradientMap.value = this.gradientMap),
            this.colorTransform && (this.defines.USE_COLOR_TRANSFORM = "",
                this.uniforms.colorTransformMultiplier = {
                    value: new THREE.Vector4(this.colorTransform.redMultiplier,
                        this.colorTransform.greenMultiplier,
                        this.colorTransform.blueMultiplier,
                        this.colorTransform.alphaMultiplier)
                },
                this.uniforms.colorTransformOffset = {
                    value: new THREE.Vector4(this.colorTransform.redOffset / 255,
                        this.colorTransform.greenOffset / 255,
                        this.colorTransform.blueOffset / 255,
                        this.colorTransform.alphaOffset / 255)
                });
    }
}

class SingleLevelShaderMaterial extends THREE.ShaderMaterial {
    constructor() {
        super();

        this.color = new THREE.Color(0xFFFFFF),
            this.map = null,
            this.sphereMap = null,
            this.aoMap = null,
            this.aoMapIntensity = 1,
            this.specularMap = null,
            this.alphaMap = null,
            this.envMap = null,
            this.normalMap = null,
            this.normalScale = new THREE.Vector2(1, 1),
            this.bumpMap = null,
            this.bumpScale = 1,
            this.combine = THREE.MultiplyOperation,
            this.reflectivity = 1,
            this.refractionRatio = .98,
            this.colorTransform = null,
            this.gradientMap = null,
            this.wireframe = false,
            this.wireframeLinewidth = 1,
            this.wireframeLinecap = "round",
            this.wireframeLinejoin = "round",
            this.skinning = false,
            this.morphTargets = false,
            this.lights = false,
            this.vertexShader = meshsinglelevel_vert,
            this.fragmentShader = meshsinglelevel_frag,
            this.uniforms = THREE.UniformsUtils.merge([
                THREE.ShaderLib.basic.uniforms,
                {
                    gradientMap: { value: null },
                    normalMap: { value: null },
                    normalScale: { value: new THREE.Vector2(1, 1) },
                    bumpMap: { value: null },
                    bumpScale: { value: 1 },
                    sphereMap: { value: null }
                }
            ]);
    }
    updateProperties() {
        this.uniforms.opacity.value = this.opacity,
            this.uniforms.diffuse.value = this.color,
            this.uniforms.map.value = this.map,
            this.uniforms.specularMap.value = this.specularMap,
            this.uniforms.alphaMap.value = this.alphaMap,
            this.aoMap && (this.uniforms.aoMap.value = this.aoMap,
                this.uniforms.aoMapIntensity.value = this.aoMapIntensity),
            this.uniforms.envMap.value = this.envMap,
            this.uniforms.flipEnvMap.value = -1,
            this.uniforms.reflectivity.value = this.reflectivity,
            this.uniforms.refractionRatio.value = this.refractionRatio,
            this.uniforms.diffuse.value = this.color,
            this.uniforms.opacity.value = this.opacity,
            this.normalMap && (this.defines.USE_NORMALMAP = "",
                this.uniforms.normalMap.value = this.normalMap,
                this.uniforms.normalScale.value.copy(this.normalScale)),
            this.bumpMap && (this.defines.USE_BUMPMAP = "",
                this.uniforms.bumpMap.value = this.bumpMap,
                this.uniforms.bumpScale.value = this.bumpScale),
            this.gradientMap && (this.defines.USE_GRADIENT = "",
                this.uniforms.gradientMap.value = this.gradientMap),
            this.sphereMap && (this.defines.USE_SPHEREMAP = "",
                this.uniforms.sphereMap.value = this.sphereMap),
            this.colorTransform && (this.defines.USE_COLOR_TRANSFORM = "",
                this.uniforms.colorTransformMultiplier = {
                    value: new THREE.Vector4(this.colorTransform.redMultiplier,
                        this.colorTransform.greenMultiplier, this.colorTransform.blueMultiplier, this.colorTransform.alphaMultiplier)
                },
                this.uniforms.colorTransformOffset = {
                    value: new THREE.Vector4(this.colorTransform.redOffset / 255,
                        this.colorTransform.greenOffset / 255, this.colorTransform.blueOffset / 255, this.colorTransform.alphaOffset / 255)
                }
            );
    }
}
class MultiShaderMaterial extends THREE.Material {//Material
    constructor() {
        super();
        this.shaderMaterials = [];
    }
    dispose() {
        for (var i = 0; i < this.shaderMaterials.length; i++)
            this.shaderMaterials[i].dispose();
    }
}
export {
    MultiShaderMaterial, PhysicalShaderMaterial, SingleLevelShaderMaterial, DiamondComplexShaderMaterialTop, DiamondComplexShaderMaterialBottom,
    diamondcomplex_bottom_frag, diamondcomplex_bottom_vert, diamondcomplex_sparkle_frag, diamondcomplex_sparkle_vert,
    diamondcomplex_top_frag, diamondcomplex_top_vert, meshphysical_frag, meshphysical_vert, meshsinglelevel_frag, meshsinglelevel_vert
};