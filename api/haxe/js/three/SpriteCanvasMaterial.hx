package js.three;

@:native("THREE.SpriteCanvasMaterial") extern class SpriteCanvasMaterial extends js.three.Material
{
	function new(?parameters:js.three.SpriteCanvasMaterialParameters) : Void;
	var color : js.three.Color;
	function program(context:Dynamic, color:js.three.Color) : Void;
	@:overload(function() : SpriteCanvasMaterial { })
	override function clone() : js.three.Material;
}