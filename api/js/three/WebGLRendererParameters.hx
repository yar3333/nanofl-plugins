package js.three;

typedef WebGLRendererParameters =
{
	/**
	 * default is true.
	 */
	@:optional
	var alpha : Bool;
	/**
	 * default is false.
	 */
	@:optional
	var antialias : Bool;
	/**
	 * A Canvas where the renderer draws its output.
	 */
	@:optional
	var canvas : js.html.CanvasElement;
	/**
	 * default is 0.
	 */
	@:optional
	var clearAlpha : Float;
	/**
	 * default is 0x000000.
	 */
	@:optional
	var clearColor : Float;
	@:optional
	var devicePixelRatio : Float;
	/**
	 *  shader precision. Can be "highp", "mediump" or "lowp".
	 */
	@:optional
	var precision : String;
	/**
	 * default is true.
	 */
	@:optional
	var premultipliedAlpha : Bool;
	/**
	 * default is false.
	 */
	@:optional
	var preserveDrawingBuffer : Bool;
	/**
	 * default is true.
	 */
	@:optional
	var stencil : Bool;
};