package js.three;

@:native("THREE.WebGLProgram") extern class WebGLProgram
{
	function new(renderer:js.three.WebGLRenderer, code:String, material:js.three.ShaderMaterial, parameters:js.three.WebGLRendererParameters) : Void;
	function getUniforms() : Dynamic;
	function getAttributes() : Dynamic;
	/**
	 Deprecated, use getUniforms
	 */
	var uniforms : Dynamic;
	/**
	 Deprecated, use getAttributes
	 */
	var attributes : Dynamic;
	var id : Int;
	var code : String;
	var usedTimes : Float;
	var program : Dynamic;
	var vertexShader : js.three.WebGLShader;
	var fragmentShader : js.three.WebGLShader;
}