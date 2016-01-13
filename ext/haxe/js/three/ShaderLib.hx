package js.three;

@:native("THREE.ShaderLib") extern class ShaderLib
{
	static var basic : js.three.Shader;
	static var lambert : js.three.Shader;
	static var phong : js.three.Shader;
	static var particle_basic : js.three.Shader;
	static var dashed : js.three.Shader;
	static var depth : js.three.Shader;
	static var normal : js.three.Shader;
	static var normalmap : js.three.Shader;
	static var cube : js.three.Shader;
	static var equirect : js.three.Shader;
	static var depthRGBA : js.three.Shader;
}