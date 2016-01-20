package js.three;

/**
 * The WebGL renderer displays your beautifully crafted scenes using WebGL, if your device supports it.
 * This renderer has way better performance than CanvasRenderer.
 *
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/renderers/WebGLRenderer.js">src/renderers/WebGLRenderer.js</a>
 */
@:native("THREE.WebGLRenderer") extern class WebGLRenderer implements js.three.Renderer
{
	/**
	 * parameters is an optional object with properties defining the renderer's behaviour. The constructor also accepts no parameters at all. In all cases, it will assume sane defaults when parameters are missing.
	 */
	function new(?parameters:js.three.WebGLRendererParameters) : Void;
	/**
	 * A Canvas where the renderer draws its output.
	 * This is automatically created by the renderer in the constructor (if not provided already); you just need to add it to your page.
	 */
	var domElement : js.html.CanvasElement;
	/**
	 * The HTML5 Canvas's 'webgl' context obtained from the canvas where the renderer will draw.
	 */
	var context : js.html.webgl.RenderingContext;
	/**
	 * Defines whether the renderer should automatically clear its output before rendering.
	 */
	var autoClear : Bool;
	/**
	 * If autoClear is true, defines whether the renderer should clear the color buffer. Default is true.
	 */
	var autoClearColor : Bool;
	/**
	 * If autoClear is true, defines whether the renderer should clear the depth buffer. Default is true.
	 */
	var autoClearDepth : Bool;
	/**
	 * If autoClear is true, defines whether the renderer should clear the stencil buffer. Default is true.
	 */
	var autoClearStencil : Bool;
	/**
	 * Defines whether the renderer should sort objects. Default is true.
	 */
	var sortObjects : Bool;
	var extensions : js.three.WebGLExtensions;
	var gammaFactor : Float;
	/**
	 * Default is false.
	 */
	var gammaInput : Bool;
	/**
	 * Default is false.
	 */
	var gammaOutput : Bool;
	/**
	 * Default is false.
	 */
	var shadowMapEnabled : Bool;
	/**
	 * Defines shadow map type (unfiltered, percentage close filtering, percentage close filtering with bilinear filtering in shader)
	 * Options are THREE.BasicShadowMap, THREE.PCFShadowMap, THREE.PCFSoftShadowMap. Default is THREE.PCFShadowMap.
	 */
	var shadowMapType : js.three.ShadowMapType;
	/**
	 * Default is true
	 */
	var shadowMapCullFace : js.three.CullFace;
	/**
	 * Default is false.
	 */
	var shadowMapDebug : Bool;
	/**
	 * Default is 8.
	 */
	var maxMorphTargets : Float;
	/**
	 * Default is 4.
	 */
	var maxMorphNormals : Float;
	/**
	 * Default is true.
	 */
	var autoScaleCubemaps : Bool;
	/**
	 * An object with a series of statistical information about the graphics board memory and the rendering process. Useful for debugging or just for the sake of curiosity. The object contains the following fields:
	 */
	var info : { var memory : { var geometries : Float; var programs : Float; var textures : Float; }; var render : { var calls : Float; var faces : Int; var points : Float; var vertices : Int; }; };
	var shadowMap : js.three.WebGLShadowMapInstance;
	/**
	 * Return the WebGL context.
	 */
	function getContext() : js.html.webgl.RenderingContext;
	function forceContextLoss() : Void;
	var capabilities : js.three.WebGLCapabilities;
	/**
	 Deprecated, use capabilities instead
	 */
	function supportsVertexTextures() : Bool;
	function supportsFloatTextures() : Bool;
	function supportsStandardDerivatives() : Bool;
	function supportsCompressedTextureS3TC() : Bool;
	function supportsCompressedTexturePVRTC() : Bool;
	function supportsBlendMinMax() : Bool;
	function getPrecision() : String;
	function getMaxAnisotropy() : Int;
	function getPixelRatio() : Float;
	function setPixelRatio(value:Float) : Void;
	function getSize() : { var height : Float; var width : Float; };
	/**
	 * Resizes the output canvas to (width, height), and also sets the viewport to fit that size, starting in (0, 0).
	 */
	function setSize(width:Float, height:Float, ?updateStyle:Bool) : Void;
	/**
	 * Sets the viewport to render from (x, y) to (x + width, y + height).
	 */
	function setViewport(?x:Float, ?y:Float, ?width:Float, ?height:Float) : Void;
	/**
	 * Sets the scissor area from (x, y) to (x + width, y + height).
	 */
	function setScissor(x:Float, y:Float, width:Float, height:Float) : Void;
	/**
	 * Enable the scissor test. When this is enabled, only the pixels within the defined scissor area will be affected by further renderer actions.
	 */
	function enableScissorTest(enable:Bool) : Void;
	/**
	 * Sets the clear color, using color for the color and alpha for the opacity.
	 */
	@:overload(function(color:String, ?alpha:Float) : Void { })
	@:overload(function(color:Int, ?alpha:Float) : Void { })
	function setClearColor(color:js.three.Color, ?alpha:Float) : Void;
	function setClearAlpha(alpha:Float) : Void;
	/**
	 * Sets the clear color, using hex for the color and alpha for the opacity.
	 *
	 * @example
	 * // Creates a renderer with black background
	 * renderer = new THREE.WebGLRenderer();
	 * renderer.setSize(200, 100);
	 * renderer.setClearColorHex(0x000000, 1);
	 */
	function setClearColorHex(hex:Int, alpha:Float) : Void;
	/**
	 * Returns a THREE.Color instance with the current clear color.
	 */
	function getClearColor() : js.three.Color;
	/**
	 * Returns a float with the current clear alpha. Ranges from 0 to 1.
	 */
	function getClearAlpha() : Float;
	/**
	 * Tells the renderer to clear its color, depth or stencil drawing buffer(s).
	 * Arguments default to true
	 */
	function clear(?color:Bool, ?depth:Bool, ?stencil:Bool) : Void;
	function clearColor() : Void;
	function clearDepth() : Void;
	function clearStencil() : Void;
	function clearTarget(renderTarget:js.three.WebGLRenderTarget, color:Bool, depth:Bool, stencil:Bool) : Void;
	function resetGLState() : Void;
	function dispose() : Void;
	/**
	 * Tells the shadow map plugin to update using the passed scene and camera parameters.
	 *
	 * @param scene an instance of Scene
	 * @param camera — an instance of Camera
	 */
	function updateShadowMap(scene:js.three.Scene, camera:js.three.Camera) : Void;
	function renderBufferImmediate(object:js.three.Object3D, program:Dynamic, material:js.three.Material) : Void;
	function renderBufferDirect(camera:js.three.Camera, lights:Array<js.three.Light>, fog:js.three.Fog, material:js.three.Material, geometryGroup:Dynamic, object:js.three.Object3D) : Void;
	function renderBuffer(camera:js.three.Camera, lights:Array<js.three.Light>, fog:js.three.Fog, material:js.three.Material, geometryGroup:Dynamic, object:js.three.Object3D) : Void;
	/**
	 * Render a scene using a camera.
	 * The render is done to the renderTarget (if specified) or to the canvas as usual.
	 * If forceClear is true, the canvas will be cleared before rendering, even if the renderer's autoClear property is false.
	 */
	@:overload(function(scene:Scene, camera:Camera, ?renderTarget:RenderTarget, ?forceClear:Bool) : Void { })
	function render(scene:js.three.Scene, camera:js.three.Camera) : Void;
	function renderImmediateObject(camera:js.three.Camera, lights:Array<js.three.Light>, fog:js.three.Fog, material:js.three.Material, object:js.three.Object3D) : Void;
	/**
	 * Used for setting the gl frontFace, cullFace states in the GPU, thus enabling/disabling face culling when rendering.
	 * If cullFace is false, culling will be disabled.
	 * @param cullFace "back", "front", "front_and_back", or false.
	 * @param frontFace "ccw" or "cw
	 */
	function setFaceCulling(?cullFace:js.three.CullFace, ?frontFace:js.three.FrontFaceDirection) : Void;
	function setMaterialFaces(material:js.three.Material) : Void;
	function setDepthTest(depthTest:Bool) : Void;
	function setDepthWrite(depthWrite:Bool) : Void;
	function setBlending(blending:js.three.Blending, blendEquation:js.three.BlendingEquation, blendSrc:js.three.BlendingSrcFactor, blendDst:js.three.BlendingDstFactor) : Void;
	function uploadTexture(texture:js.three.Texture) : Void;
	function setTexture(texture:js.three.Texture, slot:Float) : Void;
	function setRenderTarget(renderTarget:js.three.RenderTarget) : Void;
	function readRenderTargetPixels(renderTarget:js.three.RenderTarget, x:Float, y:Float, width:Float, height:Float, buffer:Dynamic) : Void;
}